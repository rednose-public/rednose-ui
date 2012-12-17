YUI.add('libbit-controlform', function (Y, NAME) {

var ControlForm;

ControlForm = Y.Base.create('controlForm', Y.Base, [], {
    model: null,

    render: function(formsModel)
    {
        var self = this;

        formsModel.each(function(formItem) {
            self.renderForm(formItem);
        });

        self.model = formsModel;
    },

    renderForm: function(formItem)
    {
        var self = this;
        var container = this.get('formContainer');
        var form = formItem.get('controlForm');
        var fieldGroups = form.get('fieldGroups');

        var formElement = Y.Node.create('<fieldset>');
        var legend = Y.Node.create('<legend>');

        legend.set('innerHTML', form.get('caption'));

        formElement.append(legend);
        formElement.set('name', formItem.get('id'));

        Y.Array.each(fieldGroups, function(group) {
            self.addFieldGroup(formElement, group);
        });

        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        if (container.one('.' + directionClassName) != null) {
            container.one('.' + directionClassName).append(formElement);
        } else {
            container.append(formElement);
        }
    },

    addFieldGroup: function(formElement, fieldGroup)
    {
        var list = Y.Node.create('<ol>');
        var fieldGroupItems;

        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        list.set('id', fieldGroup['id']);

        Y.Array.each(fieldGroupItems, function(control) {
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
    },

    addFieldGroupToModel: function(formId, fieldGroup)
    {
        this.model.each(function(formItem) {
            if (formItem.get('id') == formId) {
                var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                fieldGroups.push(fieldGroup);

                formItem.save();
            }
        });
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
        var self = this;
        var drag = Y.DD.DDM.activeDrag;
        var formNode = Y.one('#' + referenceForm.get('id'));

        if (!Y.TB.FieldGroup) {
            if (console.exception) {
                console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            fieldGroup = drag.get('data');

            self.addFieldGroup(formNode, fieldGroup, true);
            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
        } else {
            if (console.exception) {
                console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        formNode.removeClass('ddOver');
    },
}, {
    ATTRS: {
        formContainer: { value: '' }
    }
});


Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {"requires": ["node", "model-list", "model", "base"]});
