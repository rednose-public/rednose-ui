YUI.add('libbit-controlform', function (Y, NAME) {

var Form;

Form = Y.Base.create('form', Y.Model, [], {

    removeFieldGroup: function(fgId) {
        for (var i in this.get('fieldGroups')) {
            if (this.get('fieldGroups')[i]['id'] == fgId) {
                var fieldGroups = this.get('fieldGroups');

                fieldGroups.splice(i, 1);

                this.set('fieldGroups', fieldGroups);
            }
        }
    },

    getFieldGroup: function(fgId) {
        for (var i in this.get('fieldGroups')) {
            if (this.get('fieldGroups')[i]['id'] == fgId) {
                return this.get('fieldGroups')[i];
            }
        }

        return false;
    }

}, {
    ATTRS: {
        caption: { value: '' },
        fieldGroups: { value: [] }
    }
});

Y.namespace('ControlForm').Form = Form;
var FormItem;

FormItem = Y.Base.create('formItem', Y.Model, [], {
    
}, {
    ATTRS: {
        template: { value: null },
        sortOrder: { value: 0 },
        direction: { value: 'left' },
        controlForm: { value: null },
        fieldGroupOrder: { value: [] }
    }
});

Y.namespace('ControlForm').FormItem = FormItem;
var FormItem = Y.ControlForm.FormItem,
    Form = Y.ControlForm.Form,
    FormItems;

FormItems = Y.Base.create('formItems', Y.ModelList, [], {
    model: FormItem,

    parse: function (response) {
        return response.map(function (controlFormItem) {
            if (controlFormItem.controlForm !== null) {
                controlFormItem.controlForm = new Form(controlFormItem.controlForm);
            }

            return controlFormItem;
        });
    },

    sync: function (action, options, callback) {
        var self = this;

        if (action === 'read') {
            Y.io(Routing.generate('libbit_docgen_forms_list', options), {
                method: 'GET',
                on: {
                    success: function (tx, r) {
                        self.set('templateId', options['templateId']);

                        callback(null, Y.JSON.parse(r.responseText));
                    }
                }
            });
        }
    },

    comparator: function (model) {
        return model.get('sortOrder');
    },

    setPosition: function(formId, sortOrder, direction) {
        this.updateProperty(formId, 'sortOrder', sortOrder);
        this.updateProperty(formId, 'direction', direction);
    },

    updateProperty: function(formId, property, value) {
        this.each(function(formItem) {
            if (formItem.get('id') == formId) {
                formItem.set(property, value);
            }
        });
    },

    isModified: function() {
        // TODO...
        return true;
    },

    addForm: function(title) {
        var self = this;
        var newForm = {
            id: 'tmp_' + Math.round((new Date()).getTime() / 1000) + (Math.round(Math.random()) * 999999),
            direction: 'left',
            controlForm: new self.model({
                caption: title,
                fieldGroups: []
            }),
            sortOrder: self.size(),
            template: self.get('templateId')
        };

        self.add(newForm);
    },

    deleteForm: function(formId) {
        var self = this;

        this.each(function(formItem) {
            if (formItem.get('id') == formId) {
                self.remove(formItem);
            }
        });
    },

    getFieldGroup: function(fgId) {
        var fgId = parseInt(fgId);
        var fg = null;

        this.each(function(formItem) {
            if (formItem.get('controlForm').getFieldGroup(fgId)) {
                fg = formItem.get('controlForm').getFieldGroup(fgId);
            }
        });

        return fg;
    },

    deleteFieldGroup: function(formId, fgId) {
        this.each(function(formItem) {
            if (formItem.get('id') == formId) {
                formItem.get('controlForm').removeFieldGroup(fgId);
            }
        });
    }
}, {
    ATTRS: {
        templateId: { value: null }
    }
});

Y.namespace('ControlForm').FormItems = FormItems;
var FieldContent;

FieldContent = Y.Base.create('fieldContent', Y.Model, [], {



}, {
    ATTRS: {
        field: { value: null },
        content: { value: '' }
    }
});

Y.namespace('ControlForm').FieldContent = FieldContent;
<<<<<<< HEAD
=======
var Datepicker;

Datepicker = Y.Base.create('datepicker', Y.Calendar, [ ], {

    initializer: function() {
        var self = this;

        this.after('render', function() {
            var wrapper = Y.Node.create('<span />');
            var input = Y.Node.create('<input />');
            var icon = Y.Node.create('<span />');
            var container = this.get('contentBox');

            icon.addClass('icon-calendar');

            input.addClass('dialogCalendar');
            input.setAttribute('readonly', 'true');
            input.on('click', function() {
                self.showCalendar(input, wrapper);
            });

            wrapper.addClass('calendarWrapper');
            wrapper.hide();
            wrapper.append(container.one('.yui3-calendar-pane'));
            wrapper.one('.yui3-calendar-pane').addClass('dialogCalendarPane');

            container.append(input);
            container.append(icon);
            container.append(wrapper);

            this.set('wrapper', wrapper);

            self.dateSelected({date: new Date() });
        });

        this.on('dateClick', self.dateSelected);
    },

    showCalendar: function(sender) {
        var wrapper = this.get('wrapper');
        var rules = this.get('rules');

        if (typeof(rules['is_date']['accepts_input']) == 'undefined') {
            return;
        }

        // Events
        var activateHide = false;

        wrapper.detach('clickoutside');
        wrapper.on('clickoutside', function() {
            if (activateHide === false) {
                activateHide = true;
            } else {
                wrapper.hide();
            }
        });

        // Show and set position
        wrapper.show();
        wrapper.setX(sender.getX());
        wrapper.setY(sender.getY() + parseInt(sender.getStyle('height')) + 5);
    },

    dateSelected: function(e) {
        var wrapper = this.get('wrapper');
        var input = wrapper.ancestor().one('input')

        input.set('value', e.date.toLocaleDateString());
        input.setAttribute('data-unixtime', e.date.getTime());

        wrapper.hide();
    }

}, {
    ATTRS: {
        wrapper: { value: null },
        rules: { value: [] },
    }
});

Y.namespace('Libbit').ControlFormDatepicker = Datepicker;
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
var ControlForm;

ControlForm = Y.Base.create('controlForm', Y.Base, [], {

    viewTemplate:
        '<div class="formContainer">' +
        '   <div class="formContainer_left">&nbsp;</div>' +
        '   <div class="formContainer_right">&nbsp;</div>' +
        '   <div class="formContainer_proxy">' +
        '   </div>' +
        '</div>',


    initializer: function() {
        var self = this;

        this.on('contextMenu:editLabel', this._editLabel);
        this.on('contextMenu:deleteForm', this.deleteForm);
        this.on('contextMenu:deleteFieldGroup', this._deleteFieldGroup);
        this.on('contextMenu:editFieldGroup', this._editFieldGroup);
    },

    render: function(formsModel) {
        var self = this;
        var container = this.get('srcNode');

        container.setHTML(this.viewTemplate);
        container.one('.formContainer').removeClass('formContainer').addClass(this.get('className'));
        container.one('.formContainer_left').removeClass('formContainer_left').addClass(this.get('className') + '_left');
        container.one('.formContainer_right').removeClass('formContainer_right').addClass(this.get('className') + '_right');

        if (formsModel == null) {
            formsModel = this.get('formsModel');
        } else {
            this.set('formsModel', formsModel);
        }

        formsModel.sort();
        formsModel.each(function(formItem) {
            self._renderForm(formItem);
        });

        this.fire('rendered');
    },

    _renderForm: function(formItem) {
        var self = this;
        var container = this.get('srcNode').one('div');
        var fieldGroupOrder = formItem.get('fieldGroupOrder');
        var form = formItem.get('controlForm');
        var fieldGroups = form.get('fieldGroups');

        var formElement = Y.Node.create('<fieldset>');
        var legend = Y.Node.create('<legend>');

        legend.set('innerHTML', form.get('caption'));

        if (this.get('editMode')) {
            formElement.addClass('editMode');

            legend.plug(Y.Libbit.ContextMenu, {
                content: [
                    { title: 'Rename', id: 'editLabel' },
                    { title: '-' },
                    { title: 'Remove', id: 'deleteForm' }
                ],
                bubbleTarget: self
            });
        }

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

        container.one('.' + directionClassName).append(formElement);
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

        if (this.get('editMode')) {
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
        }

        list.set('id', fieldGroup['id']);
        list.setAttribute('name', fieldGroup['name']);
        list.on(['mouseover', 'mouseout'], function(e) {
            list.toggleClass('fieldGroupHighlight');
        });

        Y.Array.each(fieldGroupItems, function(control) {
            var label = Y.Node.create('<label>');
            var controlContainer = Y.Node.create('<li>');

<<<<<<< HEAD
            var controlElement = Y.Node.create('<input />');
=======
            controlElement = self._createInputElement(control.rules);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
            controlElement.data = control;
            label.set('innerHTML', control.field.name);

            var draft = self.get('draft');

            if (draft !== null) {
                var content = draft.getValue(control.field.id);
                controlElement.set('value', content);
            }

            controlContainer.append(label);
            controlContainer.append(controlElement);
            controlContainer.setData(control.field);
            controlContainer.on('click', function(e) {
                controlContainer.addClass('controlSelected');

                self.fire('controlSelected', { 'controlContainer': controlContainer });
            });

            list.append(controlContainer);
        });

        if (this.get('editMode')) {
            list.plug(Y.Libbit.ContextMenu, {
                content: [
                    { title: 'Edit', id: 'editFieldGroup' },
                    { title: '-' },
                    { title: 'Remove', id: 'deleteFieldGroup' }
                ],
                bubbleTarget: self
            });
        }

        formElement.append(list);
    },

    _createInputElement: function(rules) {
        var node;

        if (rules.is_date) {
            node = Y.Node.create('<span />');

            new Y.Libbit.ControlFormDatepicker({ srcNode: node, rules: rules }).render();
        } else {
            node = Y.Node.create('<input />');
        }

        return node;
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

    addForm: function(title) {
        var formsModel = this.get('formsModel');

        formsModel.addForm(title);

        this.render();
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

    _editFieldGroup: function(e) {
        var fg = this.get('formsModel').getFieldGroup(e.node.get('id'));

        this.fire('editFieldGroup', { 'fieldGroup': fg });
    },

    _deleteFieldGroup: function(e) {
        var self = this;
        var formsModel = this.get('formsModel');
        var formElement = e.node.get('parentNode');
        var formId = formElement.get('name');

        Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the fieldgroup "' + e.node.getAttribute('name') + '"',
            function() {
                formsModel.deleteFieldGroup(formId, e.node.get('id'));

                e.node.remove();
                self.reOrderFieldGroup(formElement);
            }
        );
    },

    _editLabel: function(e) {
        var self = this;
        var dialog = new Y.Libbit.Dialog();
        var legend = e.node;
        var formId = legend.get('parentNode').get('name');

        dialog.prompt(
            'Form title',
            'Value',
            legend.get('text'),
            function(node) {
                var value = '';

                self.get('formsModel').each(function(formItem) {
                    if (formItem.get('id') == formId) {
                        var form = formItem.get('controlForm');

                        value = node.one('input').get('value');

                        if (value !== '') {
                            form.set('caption', value);
                            legend.set('text', form.get('caption'));
                        }
                    }
                });

                if (value !== '') {
                    return true;
                } else {
                    dialog.set('error', { path: 'input', message: ''});
                }
            }
        );
    },

    getFieldContent: function() {
        var buffer = [];
        var listCollection = this.get('srcNode').all('ol');

        listCollection.each(function(list) {
            list.all('li').each(function(control) {
                var fieldContent = new Y.ControlForm.FieldContent({
                    field: control.getData(),
                    content: control.one('input, textarea, select').get('value')
                });

                buffer.push(fieldContent);
            });
        });

        return buffer;
    }

}, {
    ATTRS: {
        srcNode: { value: null },
        formsModel: { value: null },
        className: { value: 'formContainer' },
        editMode: { value: false },
<<<<<<< HEAD
        draft: { value: null }
=======
        draftId: { value: null }
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
    }
});

Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {
    "requires": [
        "calendar",
        "dd-proxy",
        "dd-constrain",
        "node",
        "model-list",
        "model",
        "base",
        "libbit-dialog",
        "libbit-contextmenu"
    ]
});
