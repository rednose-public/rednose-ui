/*jshint boss:true, expr:true, onevar:false */

var Dropdown = Y.Base.create('dropdown', Y.Base, [], {
    EMPTY_TEMPLATE: '<option value>...</option>',

    OPTION_TEMPLATE: '<option value="{value}">{text}</option>',

    initializer: function (config) {
        this.host        = config.host;
        this.datasource  = config.datasource;
        this.parent      = config.parent;
        this.parentField = config.parentField;
        this.required    = config.required;
        this.map         = config.map;

        var self = this;

        if (config.load === true) {
            var parameters = null;

            this.datasource.query(parameters).then(function (data) {
                self._renderOptions(data);
            });
        }

        this.host.after('change', this._afterHostChange, this);
    },

    _renderOptions: function (data) {
        var self     = this,
            node     = this.host,
            map      = this.map,
            required = this.required;

        node.empty();

        if (!required) {
            node.append(Y.Node.create(this.EMPTY_TEMPLATE));
        }

        Y.Array.each(data, function (record) {
            node.append(Y.Lang.sub(self.OPTION_TEMPLATE, {
                value: record[map.value],
                text : record[map.text]
            }));
        });
    },

    _afterHostChange: function (e) {
        var value = e.target.get('value');

        console.log(value);
    }
}, {
    NS: 'dropdown'
});

Y.namespace('Rednose.Plugin.Form').Dropdown = Dropdown;
