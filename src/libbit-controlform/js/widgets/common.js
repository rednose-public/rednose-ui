var Common;

Common = Y.Base.create('common', Y.Widget, [ ], {

    initializer: function() {
    },

    render: function() {
        var rules = this.get('rules');
        var container = this.get('srcNode');

        if (typeof(rules['input_method']) === 'undefined') {
            this._renderInput();

            return;
        }

        switch (rules['input_method'].inputElement) {
            case 'input':
                this._renderInput();
                break;

            case 'textarea':
                this._renderInput(true);
                break;

            case 'dropdown':
                this._renderDropdown();
                break;

            case 'checkbox':
                this._renderCheckbox();
                break;

            case 'radio':
                this._renderRadio();
                break;
        }
    },

    _renderInput: function(textarea) {
        this.get('srcNode').append(
            Y.Node.create(textarea ? '<textarea />' : '<input />')
        );
    },

    _renderDropdown: function() {
        var select = Y.Node.create('<select />');

        this.get('srcNode').append(select);
    },

    _renderCheckbox: function() {
        var checkbox = Y.Node.create('<input type="checkbox" />');

        this.get('srcNode').append(checkbox);
    },

    _renderRadio: function() {
        var name = 'rand' + Math.floor(Math.random() * 1010101) + (new Date().getTime());
        var radio = Y.Node.create('<input type="radio" />');

        radio.setAttribute('name', name);

        this.get('srcNode').append(radio);
    }
}, {
    ATTRS: {
        rules: { value: {} },
    }
});

Y.namespace('Libbit').ControlFormCommon = Common;
