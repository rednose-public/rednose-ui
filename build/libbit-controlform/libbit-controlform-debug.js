YUI.add('libbit-controlform', function (Y, NAME) {

var ControlForm;

ControlForm = Y.Base.create('controlForm', Y.Base, [], {
    model: null,

    render: function(formsModel)
    {
        var self = this;

        self.model = formsModel;

        formsModel.each(function(formItem) {
            self.renderForm(formItem);
        });
    },

    renderForm: function(formItem)
    {
        var container = this.get('formContainer');
        var form = formItem.get('controlForm');
        var fieldGroups = form.get('fieldGroups');

        var formElement = Y.Node.create('<fieldset>');
        var legend = Y.Node.create('<legend>');

        legend.set('innerHTML', form.get('caption'));

        formElement.append(legend);

        Y.Array.each(fieldGroups, function(group) {
            var list = Y.Node.create('<ol>');

            Y.Array.each(group['fieldGroupItems'], function(control) {
                var label = Y.Node.create('<label>');
                var controlContainer = Y.Node.create('<li>');
                var controlElement = null;

                controlElement = Y.Node.create('<input />');

                label.set('innerHTML', control.field.name);

                controlContainer.append(label);
                controlContainer.append(controlElement);

                list.append(controlContainer);
            });

            formElement.append(list);
        });

        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        if (container.one('.' + directionClassName) != null) {
            container.one('.' + directionClassName).append(formElement);
        } else {
            container.append(formElement);
        }
    },

    ddOver: function(e, referenceForm)
    {
        var formNode = Y.one('#' + referenceForm.get('id'));

        if (e.type == 'drop:over') {
            if (formNode.hasClass('ddOver') === false) {
                formNode.addClass('ddOver');
            }
        } else {
            formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm)
    {
        var formNode = Y.one('#' + referenceForm.get('id'));

        console.warn(e);

        formNode.removeClass('ddOver');
    },
}, {
    ATTRS: {
        formContainer: { value: '' }
    }
});


Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {"requires": ["node", "model-list", "model", "base"]});
