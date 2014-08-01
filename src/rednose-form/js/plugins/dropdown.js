/*jshint boss:true, expr:true, onevar:false */

var Dropdown = Y.Base.create('dropdown', Y.Base, [], {
    EMPTY_TEMPLATE: '<option value>...</option>',

    OPTION_TEMPLATE: '<option data-record="{guid}" value="{value}">{text}</option>',

    initializer: function (config) {
        this._recordMap || (this._recordMap = {});
        this.record = null;

        this.host        = config.host;
        this.datasource  = config.datasource;
        this.parent      = config.parent;
        this.parentField = config.parentField;
        this.required    = config.required;
        this.map         = config.map;

        if (!config.parent) {
            this._queryDatasource(null);
        }

        this.host.after('change', this._afterHostChange, this);

        if (this.parent) {
            var parentNode = Y.one('[data-name=' + this.parent.id + ']');

            parentNode.after('change', this._afterParentChange, this);

            // FIXME: Set value in the case of prefilled forms.
            this._processParent();
        }
    },

    _queryDatasource: function (parameters) {
        var self = this;

        this.datasource.query(parameters).then(function (data) {
            self._renderOptions(data);
        });
    },

    _emptyNode: function () {
        var node     = this.host,
            required = this.required;

        node.empty();

        if (!required) {
            node.append(Y.Node.create(this.EMPTY_TEMPLATE));
        }
    },

    _renderOptions: function (data) {
        var self = this,
            node = this.host,
            map  = this.map;

        this._recordMap = {};

        node.set('disabled', false);
        this._emptyNode();

        Y.Array.each(data, function (record) {
            var guid = Y.stamp(record);

            self._recordMap[guid] = record;

            node.append(Y.Lang.sub(self.OPTION_TEMPLATE, {
                value: record[map.value],
                text : record[map.text],
                guid : guid
            }));
        });
    },

    _processParent: function () {
        var node       = this.host,
            config     = this.parent,
            parentNode = Y.one('[data-name=' + config.id + ']'),
            value      = parentNode.get('value'),
            parameters = {};

        node.set('disabled', true);

        if (value === '') {
            return;
        }

        parameters[config.field] = value;

        this._queryDatasource(parameters);
    },

    _afterHostChange: function (e) {
        var selected = e.target.get('options').item(e.target.get('selectedIndex')),
            record   = this._recordMap[selected.getData('record')],
            value    = e.target.get('value');

        this.fire('select', {
            value: value,
            raw  : record ? Y.clone(record) : null
        });
    },

    _afterParentChange: function () {
        this._emptyNode();
        this._processParent();
    }
}, {
    NS: 'dropdown'
});

Y.namespace('Rednose.Plugin.Form').Dropdown = Dropdown;
