/*jshint boss:true, expr:true, onevar:false */

var Dropdown = Y.Base.create('dropdown', Y.Base, [], {
    EMPTY_TEMPLATE: '<option value>...</option>',

    OPTION_TEMPLATE: '<option value="{value}">{text}</option>',

    initializer: function (config) {
        this.record = null;

        this.host        = config.host;
        this.datasource  = config.datasource;
        this.parent      = config.parent;
        this.required    = config.required;
        this.map         = config.map;

        this.host.after('change', this._afterHostChange, this);

        if (this.parent && this.parent.id && this.parent.field) {
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

        node.set('disabled', false);
        this._emptyNode();

        Y.Array.each(data, function (record) {
            var option = Y.Node.create(Y.Lang.sub(self.OPTION_TEMPLATE, {
                value: record[map.value],
                text : record[map.text],
            }));

            option.setAttribute('data-record', Y.JSON.stringify(record));

            node.append(option);
        });
    },

    _processParent: function () {
        var node       = this.host,
            config     = this.parent,
            parentNode = Y.one('[data-name=' + config.id + ']'),
            value      = parentNode.get('value'),
            parameters = {};

        if (value === '') {
            node.set('disabled', true);
            return;
        }

        parameters[config.field] = value;

        this._queryDatasource(parameters);
    },

    _afterHostChange: function (e) {
        var selected = e.target.get('options').item(e.target.get('selectedIndex')),
            record   = selected.getData('record') ? Y.JSON.parse(selected.getData('record')) : null,
            value    = e.target.get('value');

        this.fire('select', {
            value: value,
            raw  : record
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
