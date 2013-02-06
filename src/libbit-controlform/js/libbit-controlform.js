var ControlForm;

ControlForm = Y.Base.create('controlForm', Y.Base, [], {

    initializer: function() {
        this.on('contextMenu:editLabel', this.editLabel);
        this.on('contextMenu:deleteForm', this.deleteForm);
    },

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
        var fieldGroupOrder = formItem.get('fieldGroupOrder');
        var form = formItem.get('controlForm');
        var fieldGroups = form.get('fieldGroups');

        var formElement = Y.Node.create('<fieldset>');
        var legend = Y.Node.create('<legend>');

        legend.set('innerHTML', form.get('caption'));
        legend.plug(Y.Libbit.ContextMenu, {
            content: [
                { label: 'Rename', eventName: 'editLabel' },
                { label: '-' },
                { label: 'Remove', eventName: 'deleteForm' }
            ],
            bubbleTarget: self
        });

        formElement.append(legend);
        formElement.set('name', formItem.get('id'));

        Y.Array.each(fieldGroupOrder, function(groupId) {
            Y.Array.each(fieldGroups, function(group) {
                if (groupId == group['id']) {
                    self.addFieldGroup(formElement, group);
                }
            });
        });

        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        // If a direction container is found, append the form to it.
        if (container.one('.' + directionClassName) != null) {
            container.one('.' + directionClassName).append(formElement);
        } else {
            // And if not ...
            container.append(formElement);
        }
    },

    addFieldGroup: function(formElement, fieldGroup) {
        var self = this;
        var list = Y.Node.create('<ol />');
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
        var formId = formElement.get('name');
        var fieldGroupOrder = [];

        formElement.all('ol').each(function() {
            fieldGroupOrder.push(this.get('id'));
        });

        formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
        var self = this;
        var formsModel = this.get('formsModel');

        formsModel.each(function(formItem) {
            if (formItem.get('id') == formId) {
                var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                fieldGroups.push(fieldGroup);
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

            self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);
            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
            self.reOrderFieldGroup(formNode);
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

    deleteForm: function(e) {
        var self = this;
        var formsModel = this.get('formsModel');
        var formId = e.node.get('parentNode').get('name');

        Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the form "' + e.node.get('innerHTML') + '" and all its fieldgroups?',
            function() {
                formsModel.deleteForm(formId);
                self.render();
            }
        );
    },

    editLabel: function(e) {
        var self = this;
        var legend = e.node;
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
