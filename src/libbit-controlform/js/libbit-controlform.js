var ControlForm;

ControlForm = Y.Base.create('controlForm', Y.Base, [], {

    render: function(formsModel) {
        var self = this;

        if (formsModel == null) {
            formsModel = this.get('formsModel');
        } else {
            this.set('formsModel', formsModel);
        }

        formsModel.sort();
        formsModel.each(function(formItem) {
            self.renderForm(formItem);
        });
    },

    renderForm: function(formItem) {
        var self = this;
        var container = this.get('formContainer');
        var form = formItem.get('controlForm');
        var fieldGroups = form.get('fieldGroups');

        var formElement = Y.Node.create('<fieldset>');
        var legend = Y.Node.create('<legend>');

        legend.set('innerHTML', form.get('caption'));
        legend.on('dblclick', function() {
            self.editLabel(legend);
        });

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

    addFieldGroup: function(formElement, fieldGroup) {
        var self = this;
        var list = Y.Node.create('<ol>');
        var fieldGroupItems;

        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        var fieldGroupDD = new Y.DD.Drag({
            node: list,
            group: ['fieldGroup']
        }).plug(Y.Plugin.DDConstrained, {
            constrain2node: formElement
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd: false
        });

        fieldGroupDD.on('drag:start', function(e) {
            e.target.get('dragNode').setHTML('');
        });
        fieldGroupDD.on('drag:drag', function(e) {
            self.reOrderFieldGroupDD(e, formElement, list);
        });
        fieldGroupDD.on('drag:end', function(e) {
            self.reOrderFieldGroup(formElement);
        });

        list.set('id', fieldGroup['id']);
        list.on(['mouseover', 'mouseout'], function(e) {
            if (e.type == 'mouseover') {
                list.addClass('fieldGroupHighlight');
            } else {
                list.removeClass('fieldGroupHighlight');
            }
        });

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

    reOrderFieldGroupDD: function(e, formElement, sender) {
        var y = e.currentTarget.mouseXY[1];
        var hit = false;

        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend
        // the dragNode before that element.
        formElement.all('ol').each(function(group) {
            if (sender.get('id') !== group.get('id')) { // Is this myself?
                var groupTop = group.getY();
                var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));

                if (y > groupTop && y < groupBottom) {
                    sender.insertBefore(sender, group);

                    hit = true;
                }
            }
        });

        // If you are dragging at the bottom of the form, append the dragNode to the bottom.
        if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {
            formElement.append(sender);
        }
    },

    reOrderFieldGroup: function(formElement) {
        var formsModel = this.get('formsModel');

        if (typeof(formElement.get) != 'undefined') {
            formsModel.updateFieldGroupOrder(formElement.get('name'));
        } else {
            formsModel.updateFieldGroupOrder(formElement.getAttribute('name'));
        }
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
        var formsModel = this.get('formsModel');

        formsModel.each(function(formItem) {
            if (formItem.get('id') == formId) {
                var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                fieldGroups.push(fieldGroup);
                formsModel.updateFieldGroupOrder(formId);
            }
        });
    },

    ddOver: function(e, referenceForm) {
        var formNode = Y.one('#' + referenceForm.get('id'));

        if (e.type == 'drop:over') {
            if (formNode.hasClass('ddOver') === false) {
                formNode.addClass('ddOver');
            }
        } else {
            formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm) {
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

    toJSON: function() {
        var formsModel = this.get('formsModel');

        return Y.JSON.stringify(formsModel);
    },

    editLabel: function(legend) {
        var self = this;
        var formId = legend.get('parentNode').get('name');

        Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                self.get('formsModel').each(function(formItem) {
                    if (formItem.get('id') == formId) {
                        var form = formItem.get('controlForm');

                        form.set('caption', value);
                        legend.set('text', form.get('caption'));
                    }
                });

                return true;
            },
            legend.get('text')
        );
    }
}, {
    ATTRS: {
        formContainer: { value: null },
        formsModel: { value: null }
    }
});


Y.namespace('Libbit').ControlForm = ControlForm;
