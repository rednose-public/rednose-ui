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
        var rules = this.get('rules');

        if (typeof(rules.input_restrictions) !== 'undefined') {
            for (var i in rules.input_restrictions) {
                var restrictions = rules.input_restrictions[i];
                var option = Y.Node.create('<option>' + restrictions.name + '</option>');

                if (restrictions.value === '') {
                    option.setAttribute('value', restrictions.name);
                } else {
                    option.setAttribute('value', restrictions.value);
                }

                select.append(option);
            }
        }

        this.get('srcNode').append(select);
    },

    _renderCheckbox: function() {
        var checkbox = Y.Node.create('<input type="checkbox" />');

        this.get('srcNode').append(checkbox);
    },

    _renderRadio: function() {
        var name = 'rand' + Math.floor(Math.random() * 1010101) + (new Date().getTime());
        var rules = this.get('rules');
        var container = Y.Node.create('<span class="radioGroup" id="' + name + '" />');

        if (typeof(rules.input_restrictions) !== 'undefined') {
            for (var i in rules.input_restrictions) {
                var restrictions = rules.input_restrictions[i];
                var radio = Y.Node.create('<input type="radio" />' + restrictions.name);

                radio.setAttribute('name', name);

                if (restrictions.value === '') {
                    radio.setAttribute('value', restrictions.name);
                } else {
                    radio.setAttribute('value', restrictions.value);
                }

                container.append(radio);
                container.append(Y.Node.create('<br />'));
            }

            this.get('srcNode').append(container);
        }
    }
}, {
    ATTRS: {
        rules: { value: {} },
    }
});

Y.namespace('Libbit').ControlFormCommon = Common;
