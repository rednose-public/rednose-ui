if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-controlform/libbit-controlform.js",
    code: []
};
<<<<<<< HEAD
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var Form;","","Form = Y.Base.create('form', Y.Model, [], {","","    removeFieldGroup: function(fgId) {","        for (var i in this.get('fieldGroups')) {","            if (this.get('fieldGroups')[i]['id'] == fgId) {","                var fieldGroups = this.get('fieldGroups');","","                fieldGroups.splice(i, 1);","","                this.set('fieldGroups', fieldGroups);","            }","        }","    },","","    getFieldGroup: function(fgId) {","        for (var i in this.get('fieldGroups')) {","            if (this.get('fieldGroups')[i]['id'] == fgId) {","                return this.get('fieldGroups')[i];","            }","        }","","        return false;","    }","","}, {","    ATTRS: {","        caption: { value: '' },","        fieldGroups: { value: [] }","    }","});","","Y.namespace('ControlForm').Form = Form;","var FormItem;","","FormItem = Y.Base.create('formItem', Y.Model, [], {","    ","}, {","    ATTRS: {","        template: { value: null },","        sortOrder: { value: 0 },","        direction: { value: 'left' },","        controlForm: { value: null },","        fieldGroupOrder: { value: [] }","    }","});","","Y.namespace('ControlForm').FormItem = FormItem;","var FormItem = Y.ControlForm.FormItem,","    Form = Y.ControlForm.Form,","    FormItems;","","FormItems = Y.Base.create('formItems', Y.ModelList, [], {","    model: FormItem,","","    parse: function (response) {","        return response.map(function (controlFormItem) {","            if (controlFormItem.controlForm !== null) {","                controlFormItem.controlForm = new Form(controlFormItem.controlForm);","            }","","            return controlFormItem;","        });","    },","","    sync: function (action, options, callback) {","        var self = this;","","        if (action === 'read') {","            Y.io(Routing.generate('libbit_docgen_forms_list', options), {","                method: 'GET',","                on: {","                    success: function (tx, r) {","                        self.set('templateId', options['templateId']);","","                        callback(null, Y.JSON.parse(r.responseText));","                    }","                }","            });","        }","    },","","    comparator: function (model) {","        return model.get('sortOrder');","    },","","    setPosition: function(formId, sortOrder, direction) {","        this.updateProperty(formId, 'sortOrder', sortOrder);","        this.updateProperty(formId, 'direction', direction);","    },","","    updateProperty: function(formId, property, value) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.set(property, value);","            }","        });","    },","","    isModified: function() {","        // TODO...","        return true;","    },","","    addForm: function(title) {","        var self = this;","        var newForm = {","            id: 'tmp_' + Math.round((new Date()).getTime() / 1000) + (Math.round(Math.random()) * 999999),","            direction: 'left',","            controlForm: new self.model({","                caption: title,","                fieldGroups: []","            }),","            sortOrder: self.size(),","            template: self.get('templateId')","        };","","        self.add(newForm);","    },","","    deleteForm: function(formId) {","        var self = this;","","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                self.remove(formItem);","            }","        });","    },","","    getFieldGroup: function(fgId) {","        var fgId = parseInt(fgId);","        var fg = null;","","        this.each(function(formItem) {","            if (formItem.get('controlForm').getFieldGroup(fgId)) {","                fg = formItem.get('controlForm').getFieldGroup(fgId);","            }","        });","","        return fg;","    },","","    deleteFieldGroup: function(formId, fgId) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.get('controlForm').removeFieldGroup(fgId);","            }","        });","    }","}, {","    ATTRS: {","        templateId: { value: null }","    }","});","","Y.namespace('ControlForm').FormItems = FormItems;","var FieldContent;","","FieldContent = Y.Base.create('fieldContent', Y.Model, [], {","","","","}, {","    ATTRS: {","        field: { value: null },","        content: { value: '' }","    }","});","","Y.namespace('ControlForm').FieldContent = FieldContent;","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","","    viewTemplate:","        '<div class=\"formContainer\">' +","        '   <div class=\"formContainer_left\">&nbsp;</div>' +","        '   <div class=\"formContainer_right\">&nbsp;</div>' +","        '   <div class=\"formContainer_proxy\">' +","        '   </div>' +","        '</div>',","","","    initializer: function() {","        var self = this;","","        this.on('contextMenu:editLabel', this.editLabel);","        this.on('contextMenu:deleteForm', this.deleteForm);","        this.on('contextMenu:deleteFieldGroup', this.deleteFieldGroup);","        this.on('contextMenu:editFieldGroup', this.editFieldGroup);","    },","","    render: function(formsModel) {","        var self = this;","        var container = this.get('srcNode');","","        container.setHTML(this.viewTemplate);","        container.one('.formContainer').removeClass('formContainer').addClass(this.get('className'));","        container.one('.formContainer_left').removeClass('formContainer_left').addClass(this.get('className') + '_left');","        container.one('.formContainer_right').removeClass('formContainer_right').addClass(this.get('className') + '_right');","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self._renderForm(formItem);","        });","","        this.fire('rendered');","    },","","    _renderForm: function(formItem) {","        var self = this;","        var container = this.get('srcNode').one('div');","        var fieldGroupOrder = formItem.get('fieldGroupOrder');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","","        if (this.get('editMode')) {","            formElement.addClass('editMode');","","            legend.plug(Y.Libbit.ContextMenu, {","                content: [","                    { title: 'Rename', id: 'editLabel' },","                    { title: '-' },","                    { title: 'Remove', id: 'deleteForm' }","                ],","                bubbleTarget: self","            });","        }","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroupOrder, function(groupId) {","            Y.Array.each(fieldGroups, function(group) {","                if (groupId == group['id']) {","                    self.addFieldGroup(formElement, group);","                }","            });","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        container.one('.' + directionClassName).append(formElement);","    },","","    addFieldGroup: function(formElement, fieldGroup) {","        var self = this;","        var list = Y.Node.create('<ol />');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        if (this.get('editMode')) {","            var fieldGroupDD = new Y.DD.Drag({","                node: list,","                group: ['fieldGroup']","            }).plug(Y.Plugin.DDConstrained, {","                constrain2node: formElement","            }).plug(Y.Plugin.DDProxy, {","                moveOnEnd: false","            });","","            fieldGroupDD.on('drag:start', function(e) {","                e.target.get('dragNode').setHTML('');","            });","            fieldGroupDD.on('drag:drag', function(e) {","                self.reOrderFieldGroupDD(e, formElement, list);","            });","            fieldGroupDD.on('drag:end', function(e) {","                self.reOrderFieldGroup(formElement);","            });","        }","","        list.set('id', fieldGroup['id']);","        list.setAttribute('name', fieldGroup['name']);","        list.on(['mouseover', 'mouseout'], function(e) {","            list.toggleClass('fieldGroupHighlight');","        });","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","","            var controlElement = Y.Node.create('<input />');","            controlElement.data = control;","            label.set('innerHTML', control.field.name);","","            var draft = self.get('draft');","","            if (draft !== null) {","                var content = draft.getValue(control.field.id);","                controlElement.set('value', content);","            }","","            controlContainer.append(label);","            controlContainer.append(controlElement);","            controlContainer.setData(control.field);","            controlContainer.on('click', function(e) {","                controlContainer.addClass('controlSelected');","","                self.fire('controlSelected', { 'controlContainer': controlContainer });","            });","","            list.append(controlContainer);","        });","","        if (this.get('editMode')) {","            list.plug(Y.Libbit.ContextMenu, {","                content: [","                    { title: 'Edit', id: 'editFieldGroup' },","                    { title: '-' },","                    { title: 'Remove', id: 'deleteFieldGroup' }","                ],","                bubbleTarget: self","            });","        }","","        formElement.append(list);","    },","","    reOrderFieldGroupDD: function(e, formElement, sender) {","        var y = e.currentTarget.mouseXY[1];","        var hit = false;","","        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend","        // the dragNode before that element.","        formElement.all('ol').each(function(group) {","            if (sender.get('id') !== group.get('id')) { // Is this myself?","                var groupTop = group.getY();","                var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));","","                if (y > groupTop && y < groupBottom) {","                    sender.insertBefore(sender, group);","","                    hit = true;","                }","            }","        });","","        // If you are dragging at the bottom of the form, append the dragNode to the bottom.","        if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {","            formElement.append(sender);","        }","    },","","    reOrderFieldGroup: function(formElement) {","        var formsModel = this.get('formsModel');","        var formId = formElement.get('name');","        var fieldGroupOrder = [];","","        formElement.all('ol').each(function() {","            fieldGroupOrder.push(this.get('id'));","        });","","        formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);","    },","","    addFieldGroupToModel: function(formId, fieldGroup) {","        var self = this;","        var formsModel = this.get('formsModel');","","        formsModel.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm) {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm) {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","            self.reOrderFieldGroup(formNode);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    toJSON: function() {","        var formsModel = this.get('formsModel');","","        return Y.JSON.stringify(formsModel);","    },","","    addForm: function(title) {","        var formsModel = this.get('formsModel');","","        formsModel.addForm(title);","","        this.render();","    },","","    deleteForm: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formId = e.node.get('parentNode').get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the form \"' + e.node.get('innerHTML') + '\" and all its fieldgroups?',","            function() {","                formsModel.deleteForm(formId);","                self.render();","            }","        );","    },","","    editFieldGroup: function(e) {","        var fg = this.get('formsModel').getFieldGroup(e.node.get('id'));","","        this.fire('editFieldGroup', { 'fieldGroup': fg });","    },","","    deleteFieldGroup: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formElement = e.node.get('parentNode');","        var formId = formElement.get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the fieldgroup \"' + e.node.getAttribute('name') + '\"',","            function() {","                formsModel.deleteFieldGroup(formId, e.node.get('id'));","","                e.node.remove();","                self.reOrderFieldGroup(formElement);","            }","        );","    },","","    editLabel: function(e) {","        var self = this;","        var dialog = new Y.Libbit.Dialog();","        var legend = e.node;","        var formId = legend.get('parentNode').get('name');","","        dialog.prompt(","            'Form title',","            'Value',","            legend.get('text'),","            function(node) {","                var value = '';","","                self.get('formsModel').each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        value = node.one('input').get('value');","","                        if (value !== '') {","                            form.set('caption', value);","                            legend.set('text', form.get('caption'));","                        }","                    }","                });","","                if (value !== '') {","                    return true;","                } else {","                    dialog.set('error', { path: 'input', message: ''});","                }","            }","        );","    },","","    getFieldContent: function() {","        var buffer = [];","        var listCollection = this.get('srcNode').all('ol');","","        listCollection.each(function(list) {","            list.all('li').each(function(control) {","                var fieldContent = new Y.ControlForm.FieldContent({","                    field: control.getData(),","                    content: control.one('input, textarea, select').get('value')","                });","","                buffer.push(fieldContent);","            });","        });","","        return buffer;","    }","","}, {","    ATTRS: {","        srcNode: { value: null },","        formsModel: { value: null },","        className: { value: 'formContainer' },","        editMode: { value: false },","        draft: { value: null }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {","    \"requires\": [","        \"dd-proxy\",","        \"dd-constrain\",","        \"node\",","        \"model-list\",","        \"model\",","        \"base\",","        \"libbit-dialog\",","        \"libbit-contextmenu\"","    ]","});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"9":0,"10":0,"12":0,"14":0,"20":0,"21":0,"22":0,"26":0,"36":0,"37":0,"39":0,"51":0,"52":0,"56":0,"60":0,"61":0,"62":0,"65":0,"70":0,"72":0,"73":0,"77":0,"79":0,"87":0,"91":0,"92":0,"96":0,"97":0,"98":0,"105":0,"109":0,"110":0,"121":0,"125":0,"127":0,"128":0,"129":0,"135":0,"136":0,"138":0,"139":0,"140":0,"144":0,"148":0,"149":0,"150":0,"160":0,"161":0,"163":0,"174":0,"175":0,"177":0,"189":0,"191":0,"192":0,"193":0,"194":0,"198":0,"199":0,"201":0,"202":0,"203":0,"204":0,"206":0,"207":0,"209":0,"212":0,"213":0,"214":0,"217":0,"221":0,"222":0,"223":0,"224":0,"225":0,"227":0,"228":0,"230":0,"232":0,"233":0,"235":0,"245":0,"246":0,"248":0,"249":0,"250":0,"251":0,"256":0,"258":0,"262":0,"263":0,"264":0,"266":0,"267":0,"269":0,"272":0,"273":0,"282":0,"283":0,"285":0,"286":0,"288":0,"289":0,"293":0,"294":0,"295":0,"296":0,"299":0,"300":0,"301":0,"303":0,"304":0,"305":0,"307":0,"309":0,"310":0,"311":0,"314":0,"315":0,"316":0,"317":0,"318":0,"320":0,"323":0,"326":0,"327":0,"337":0,"341":0,"342":0,"346":0,"347":0,"348":0,"349":0,"351":0,"352":0,"354":0,"360":0,"361":0,"366":0,"367":0,"368":0,"370":0,"371":0,"374":0,"378":0,"379":0,"381":0,"382":0,"383":0,"385":0,"391":0,"393":0,"394":0,"395":0,"398":0,"403":0,"404":0,"405":0,"407":0,"408":0,"409":0,"413":0,"414":0,"416":0,"417":0,"418":0,"420":0,"421":0,"425":0,"429":0,"431":0,"435":0,"437":0,"439":0,"443":0,"444":0,"445":0,"447":0,"450":0,"451":0,"457":0,"459":0,"463":0,"464":0,"465":0,"466":0,"468":0,"471":0,"473":0,"474":0,"480":0,"481":0,"482":0,"483":0,"485":0,"490":0,"492":0,"493":0,"494":0,"496":0,"498":0,"499":0,"500":0,"505":0,"506":0,"508":0,"515":0,"516":0,"518":0,"519":0,"520":0,"525":0,"529":0,"543":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"removeFieldGroup:7":0,"getFieldGroup:19":0,"(anonymous 2):60":0,"parse:59":0,"success:76":0,"sync:69":0,"comparator:86":0,"setPosition:90":0,"(anonymous 3):96":0,"updateProperty:95":0,"isModified:103":0,"addForm:108":0,"(anonymous 4):127":0,"deleteForm:124":0,"(anonymous 5):138":0,"getFieldGroup:134":0,"(anonymous 6):148":0,"deleteFieldGroup:147":0,"initializer:188":0,"(anonymous 7):213":0,"render:197":0,"(anonymous 9):249":0,"(anonymous 8):248":0,"_renderForm:220":0,"(anonymous 10):282":0,"(anonymous 11):285":0,"(anonymous 12):288":0,"(anonymous 13):295":0,"(anonymous 15):317":0,"(anonymous 14):299":0,"addFieldGroup:261":0,"(anonymous 16):346":0,"reOrderFieldGroupDD:340":0,"(anonymous 17):370":0,"reOrderFieldGroup:365":0,"(anonymous 18):381":0,"addFieldGroupToModel:377":0,"ddOver:390":0,"ddDrop:402":0,"toJSON:428":0,"addForm:434":0,"(anonymous 19):449":0,"deleteForm:442":0,"editFieldGroup:456":0,"(anonymous 20):470":0,"deleteFieldGroup:462":0,"(anonymous 22):492":0,"(anonymous 21):489":0,"editLabel:479":0,"(anonymous 24):519":0,"(anonymous 23):518":0,"getFieldContent:514":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 218;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 53;
=======
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var Form;","","Form = Y.Base.create('form', Y.Model, [], {","","    removeFieldGroup: function(fgId) {","        for (var i in this.get('fieldGroups')) {","            if (this.get('fieldGroups')[i]['id'] == fgId) {","                var fieldGroups = this.get('fieldGroups');","","                fieldGroups.splice(i, 1);","","                this.set('fieldGroups', fieldGroups);","            }","        }","    },","","    getFieldGroup: function(fgId) {","        for (var i in this.get('fieldGroups')) {","            if (this.get('fieldGroups')[i]['id'] == fgId) {","                return this.get('fieldGroups')[i];","            }","        }","","        return false;","    }","","}, {","    ATTRS: {","        caption: { value: '' },","        fieldGroups: { value: [] }","    }","});","","Y.namespace('ControlForm').Form = Form;","var FormItem;","","FormItem = Y.Base.create('formItem', Y.Model, [], {","    ","}, {","    ATTRS: {","        template: { value: null },","        sortOrder: { value: 0 },","        direction: { value: 'left' },","        controlForm: { value: null },","        fieldGroupOrder: { value: [] }","    }","});","","Y.namespace('ControlForm').FormItem = FormItem;","var FormItem = Y.ControlForm.FormItem,","    Form = Y.ControlForm.Form,","    FormItems;","","FormItems = Y.Base.create('formItems', Y.ModelList, [], {","    model: FormItem,","","    parse: function (response) {","        return response.map(function (controlFormItem) {","            if (controlFormItem.controlForm !== null) {","                controlFormItem.controlForm = new Form(controlFormItem.controlForm);","            }","","            return controlFormItem;","        });","    },","","    sync: function (action, options, callback) {","        var self = this;","","        if (action === 'read') {","            Y.io(Routing.generate('libbit_docgen_forms_list', options), {","                method: 'GET',","                on: {","                    success: function (tx, r) {","                        self.set('templateId', options['templateId']);","","                        callback(null, Y.JSON.parse(r.responseText));","                    }","                }","            });","        }","    },","","    comparator: function (model) {","        return model.get('sortOrder');","    },","","    setPosition: function(formId, sortOrder, direction) {","        this.updateProperty(formId, 'sortOrder', sortOrder);","        this.updateProperty(formId, 'direction', direction);","    },","","    updateProperty: function(formId, property, value) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.set(property, value);","            }","        });","    },","","    isModified: function() {","        // TODO...","        return true;","    },","","    addForm: function(title) {","        var self = this;","        var newForm = {","            id: 'tmp_' + Math.round((new Date()).getTime() / 1000) + (Math.round(Math.random()) * 999999),","            direction: 'left',","            controlForm: new self.model({","                caption: title,","                fieldGroups: []","            }),","            sortOrder: self.size(),","            template: self.get('templateId')","        };","","        self.add(newForm);","    },","","    deleteForm: function(formId) {","        var self = this;","","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                self.remove(formItem);","            }","        });","    },","","    getFieldGroup: function(fgId) {","        var fgId = parseInt(fgId);","        var fg = null;","","        this.each(function(formItem) {","            if (formItem.get('controlForm').getFieldGroup(fgId)) {","                fg = formItem.get('controlForm').getFieldGroup(fgId);","            }","        });","","        return fg;","    },","","    deleteFieldGroup: function(formId, fgId) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.get('controlForm').removeFieldGroup(fgId);","            }","        });","    }","}, {","    ATTRS: {","        templateId: { value: null }","    }","});","","Y.namespace('ControlForm').FormItems = FormItems;","var FieldContent;","","FieldContent = Y.Base.create('fieldContent', Y.Model, [], {","","","","}, {","    ATTRS: {","        field: { value: null },","        content: { value: '' }","    }","});","","Y.namespace('ControlForm').FieldContent = FieldContent;","var Datepicker;","","Datepicker = Y.Base.create('datepicker', Y.Widget, [ ], {","","    render: function() {","        var rules = this.get('rules')","","        if (rules['is_date']['accepts_input']) {","            this._renderField();","        }","    },","","    _renderField: function() {","        var container = this.get('srcNode');","        var floatingDiv = Y.Node.create('<div />');","","        floatingDiv.setStyle('position', 'absolute');","        floatingDiv.setStyle('top', '0px');","        floatingDiv.setStyle('left', '0px');","container.setHTML('hoi');","","        container.append(floatingDiv);","","        var calendar = new Y.Calendar({","            contentBox: floatingDiv,","            showPrevMonth: true,","            showNextMonth: true,","            date: new Date()","        });","","        this.set('calendar', calendar);","    }","}, {","    ATTRS: {","        rules: { value: [] },","        calendar: { value: null }","    }","});","","Y.namespace('Libbit').ControlFormDatepicker = Datepicker;","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","","    viewTemplate:","        '<div class=\"formContainer\">' +","        '   <div class=\"formContainer_left\">&nbsp;</div>' +","        '   <div class=\"formContainer_right\">&nbsp;</div>' +","        '   <div class=\"formContainer_proxy\">' +","        '   </div>' +","        '</div>',","","","    initializer: function() {","        var self = this;","","        this.on('contextMenu:editLabel', this._editLabel);","        this.on('contextMenu:deleteForm', this.deleteForm);","        this.on('contextMenu:deleteFieldGroup', this._deleteFieldGroup);","        this.on('contextMenu:editFieldGroup', this._editFieldGroup);","    },","","    render: function(formsModel) {","        var self = this;","        var container = this.get('srcNode');","","        container.setHTML(this.viewTemplate);","        container.one('.formContainer').removeClass('formContainer').addClass(this.get('className'));","        container.one('.formContainer_left').removeClass('formContainer_left').addClass(this.get('className') + '_left');","        container.one('.formContainer_right').removeClass('formContainer_right').addClass(this.get('className') + '_right');","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self._renderForm(formItem);","        });","","        this.fire('rendered');","    },","","    _renderForm: function(formItem) {","        var self = this;","        var container = this.get('srcNode').one('div');","        var fieldGroupOrder = formItem.get('fieldGroupOrder');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","","        if (this.get('editMode')) {","            formElement.addClass('editMode');","","            legend.plug(Y.Libbit.ContextMenu, {","                content: [","                    { title: 'Rename', id: 'editLabel' },","                    { title: '-' },","                    { title: 'Remove', id: 'deleteForm' }","                ],","                bubbleTarget: self","            });","        }","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroupOrder, function(groupId) {","            Y.Array.each(fieldGroups, function(group) {","                if (groupId == group['id']) {","                    self.addFieldGroup(formElement, group);","                }","            });","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        container.one('.' + directionClassName).append(formElement);","    },","","    addFieldGroup: function(formElement, fieldGroup) {","        var self = this;","        var list = Y.Node.create('<ol />');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        if (this.get('editMode')) {","            var fieldGroupDD = new Y.DD.Drag({","                node: list,","                group: ['fieldGroup']","            }).plug(Y.Plugin.DDConstrained, {","                constrain2node: formElement","            }).plug(Y.Plugin.DDProxy, {","                moveOnEnd: false","            });","","            fieldGroupDD.on('drag:start', function(e) {","                e.target.get('dragNode').setHTML('');","            });","            fieldGroupDD.on('drag:drag', function(e) {","                self.reOrderFieldGroupDD(e, formElement, list);","            });","            fieldGroupDD.on('drag:end', function(e) {","                self.reOrderFieldGroup(formElement);","            });","        }","","        list.set('id', fieldGroup['id']);","        list.setAttribute('name', fieldGroup['name']);","        list.on(['mouseover', 'mouseout'], function(e) {","            list.toggleClass('fieldGroupHighlight');","        });","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = self._createInputElement(control.rules);","            controlElement.data = control;","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","            controlContainer.setData(control.field);","            controlContainer.on('click', function(e) {","                controlContainer.addClass('controlSelected');","","                self.fire('controlSelected', { 'controlContainer': controlContainer });","            });","","            list.append(controlContainer);","        });","","        if (this.get('editMode')) {","            list.plug(Y.Libbit.ContextMenu, {","                content: [","                    { title: 'Edit', id: 'editFieldGroup' },","                    { title: '-' },","                    { title: 'Remove', id: 'deleteFieldGroup' }","                ],","                bubbleTarget: self","            });","        }","","        formElement.append(list);","    },","","    _createInputElement: function(rules) {","        var node;","","        if (rules.is_date) {","            node = Y.Node.create('<span />');","","            new Y.Libbit.ControlFormDatepicker({ srcNode: node, rules: rules }).render();","        } else {","            node = Y.Node.create('<input />');","        }","","        return node;","    },","","    reOrderFieldGroupDD: function(e, formElement, sender) {","        var y = e.currentTarget.mouseXY[1];","        var hit = false;","","        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend","        // the dragNode before that element.","        formElement.all('ol').each(function(group) {","            if (sender.get('id') !== group.get('id')) { // Is this myself?","                var groupTop = group.getY();","                var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));","","                if (y > groupTop && y < groupBottom) {","                    sender.insertBefore(sender, group);","","                    hit = true;","                }","            }","        });","","        // If you are dragging at the bottom of the form, append the dragNode to the bottom.","        if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {","            formElement.append(sender);","        }","    },","","    reOrderFieldGroup: function(formElement) {","        var formsModel = this.get('formsModel');","        var formId = formElement.get('name');","        var fieldGroupOrder = [];","","        formElement.all('ol').each(function() {","            fieldGroupOrder.push(this.get('id'));","        });","","        formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);","    },","","    addFieldGroupToModel: function(formId, fieldGroup) {","        var self = this;","        var formsModel = this.get('formsModel');","","        formsModel.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm) {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm) {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","            self.reOrderFieldGroup(formNode);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    toJSON: function() {","        var formsModel = this.get('formsModel');","","        return Y.JSON.stringify(formsModel);","    },","","    addForm: function(title) {","        var formsModel = this.get('formsModel');","","        formsModel.addForm(title);","","        this.render();","    },","","    deleteForm: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formId = e.node.get('parentNode').get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the form \"' + e.node.get('innerHTML') + '\" and all its fieldgroups?',","            function() {","                formsModel.deleteForm(formId);","                self.render();","            }","        );","    },","","    _editFieldGroup: function(e) {","        var fg = this.get('formsModel').getFieldGroup(e.node.get('id'));","","        this.fire('editFieldGroup', { 'fieldGroup': fg });","    },","","    _deleteFieldGroup: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formElement = e.node.get('parentNode');","        var formId = formElement.get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the fieldgroup \"' + e.node.getAttribute('name') + '\"',","            function() {","                formsModel.deleteFieldGroup(formId, e.node.get('id'));","","                e.node.remove();","                self.reOrderFieldGroup(formElement);","            }","        );","    },","","    _editLabel: function(e) {","        var self = this;","        var dialog = new Y.Libbit.Dialog();","        var legend = e.node;","        var formId = legend.get('parentNode').get('name');","","        dialog.prompt(","            'Form title',","            'Value',","            legend.get('text'),","            function(node) {","                var value = '';","","                self.get('formsModel').each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        value = node.one('input').get('value');","","                        if (value !== '') {","                            form.set('caption', value);","                            legend.set('text', form.get('caption'));","                        }","                    }","                });","","                if (value !== '') {","                    return true;","                } else {","                    dialog.set('error', { path: 'input', message: ''});","                }","            }","        );","    },","","    getFieldContent: function() {","        var buffer = [];","        var listCollection = this.get('srcNode').all('ol');","","        listCollection.each(function(list) {","            list.all('li').each(function(control) {","                var fieldContent = new Y.ControlForm.FieldContent({","                    field: control.getData(),","                    content: control.one('input, textarea, select').get('value')","                });","","                buffer.push(fieldContent);","            });","        });","","        return buffer;","    }","","}, {","    ATTRS: {","        srcNode: { value: null },","        formsModel: { value: null },","        className: { value: 'formContainer' },","        editMode: { value: false },","        draftId: { value: null }","    }","});","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {","    \"requires\": [","        \"calendar\",","        \"dd-proxy\",","        \"dd-constrain\",","        \"node\",","        \"model-list\",","        \"model\",","        \"base\",","        \"libbit-dialog\",","        \"libbit-contextmenu\"","    ]","});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"9":0,"10":0,"12":0,"14":0,"20":0,"21":0,"22":0,"26":0,"36":0,"37":0,"39":0,"51":0,"52":0,"56":0,"60":0,"61":0,"62":0,"65":0,"70":0,"72":0,"73":0,"77":0,"79":0,"87":0,"91":0,"92":0,"96":0,"97":0,"98":0,"105":0,"109":0,"110":0,"121":0,"125":0,"127":0,"128":0,"129":0,"135":0,"136":0,"138":0,"139":0,"140":0,"144":0,"148":0,"149":0,"150":0,"160":0,"161":0,"163":0,"174":0,"175":0,"177":0,"180":0,"182":0,"183":0,"188":0,"189":0,"191":0,"192":0,"193":0,"194":0,"196":0,"198":0,"205":0,"214":0,"215":0,"217":0,"229":0,"231":0,"232":0,"233":0,"234":0,"238":0,"239":0,"241":0,"242":0,"243":0,"244":0,"246":0,"247":0,"249":0,"252":0,"253":0,"254":0,"257":0,"261":0,"262":0,"263":0,"264":0,"265":0,"267":0,"268":0,"270":0,"272":0,"273":0,"275":0,"285":0,"286":0,"288":0,"289":0,"290":0,"291":0,"296":0,"298":0,"302":0,"303":0,"304":0,"306":0,"307":0,"309":0,"312":0,"313":0,"322":0,"323":0,"325":0,"326":0,"328":0,"329":0,"333":0,"334":0,"335":0,"336":0,"339":0,"340":0,"341":0,"342":0,"344":0,"345":0,"347":0,"349":0,"350":0,"351":0,"352":0,"353":0,"355":0,"358":0,"361":0,"362":0,"372":0,"376":0,"378":0,"379":0,"381":0,"383":0,"386":0,"390":0,"391":0,"395":0,"396":0,"397":0,"398":0,"400":0,"401":0,"403":0,"409":0,"410":0,"415":0,"416":0,"417":0,"419":0,"420":0,"423":0,"427":0,"428":0,"430":0,"431":0,"432":0,"434":0,"440":0,"442":0,"443":0,"444":0,"447":0,"452":0,"453":0,"454":0,"456":0,"457":0,"458":0,"462":0,"463":0,"465":0,"466":0,"467":0,"469":0,"470":0,"474":0,"478":0,"480":0,"484":0,"486":0,"488":0,"492":0,"493":0,"494":0,"496":0,"499":0,"500":0,"506":0,"508":0,"512":0,"513":0,"514":0,"515":0,"517":0,"520":0,"522":0,"523":0,"529":0,"530":0,"531":0,"532":0,"534":0,"539":0,"541":0,"542":0,"543":0,"545":0,"547":0,"548":0,"549":0,"554":0,"555":0,"557":0,"564":0,"565":0,"567":0,"568":0,"569":0,"574":0,"578":0,"591":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"removeFieldGroup:7":0,"getFieldGroup:19":0,"(anonymous 2):60":0,"parse:59":0,"success:76":0,"sync:69":0,"comparator:86":0,"setPosition:90":0,"(anonymous 3):96":0,"updateProperty:95":0,"isModified:103":0,"addForm:108":0,"(anonymous 4):127":0,"deleteForm:124":0,"(anonymous 5):138":0,"getFieldGroup:134":0,"(anonymous 6):148":0,"deleteFieldGroup:147":0,"render:179":0,"_renderField:187":0,"initializer:228":0,"(anonymous 7):253":0,"render:237":0,"(anonymous 9):289":0,"(anonymous 8):288":0,"_renderForm:260":0,"(anonymous 10):322":0,"(anonymous 11):325":0,"(anonymous 12):328":0,"(anonymous 13):335":0,"(anonymous 15):352":0,"(anonymous 14):339":0,"addFieldGroup:301":0,"_createInputElement:375":0,"(anonymous 16):395":0,"reOrderFieldGroupDD:389":0,"(anonymous 17):419":0,"reOrderFieldGroup:414":0,"(anonymous 18):430":0,"addFieldGroupToModel:426":0,"ddOver:439":0,"ddDrop:451":0,"toJSON:477":0,"addForm:483":0,"(anonymous 19):498":0,"deleteForm:491":0,"_editFieldGroup:505":0,"(anonymous 20):519":0,"_deleteFieldGroup:511":0,"(anonymous 22):541":0,"(anonymous 21):538":0,"_editLabel:528":0,"(anonymous 24):568":0,"(anonymous 23):567":0,"getFieldContent:563":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 236;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 56;
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 1);
YUI.add('libbit-controlform', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 3);
var Form;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 5);
Form = Y.Base.create('form', Y.Model, [], {

    removeFieldGroup: function(fgId) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "removeFieldGroup", 7);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 8);
for (var i in this.get('fieldGroups')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 9);
if (this.get('fieldGroups')[i]['id'] == fgId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 10);
var fieldGroups = this.get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 12);
fieldGroups.splice(i, 1);

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 14);
this.set('fieldGroups', fieldGroups);
            }
        }
    },

    getFieldGroup: function(fgId) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "getFieldGroup", 19);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 20);
for (var i in this.get('fieldGroups')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 21);
if (this.get('fieldGroups')[i]['id'] == fgId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 22);
return this.get('fieldGroups')[i];
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 26);
return false;
    }

}, {
    ATTRS: {
        caption: { value: '' },
        fieldGroups: { value: [] }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 36);
Y.namespace('ControlForm').Form = Form;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 37);
var FormItem;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 39);
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

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 51);
Y.namespace('ControlForm').FormItem = FormItem;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 52);
var FormItem = Y.ControlForm.FormItem,
    Form = Y.ControlForm.Form,
    FormItems;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 56);
FormItems = Y.Base.create('formItems', Y.ModelList, [], {
    model: FormItem,

    parse: function (response) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "parse", 59);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 60);
return response.map(function (controlFormItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 60);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 61);
if (controlFormItem.controlForm !== null) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 62);
controlFormItem.controlForm = new Form(controlFormItem.controlForm);
            }

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 65);
return controlFormItem;
        });
    },

    sync: function (action, options, callback) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "sync", 69);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 70);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 72);
if (action === 'read') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 73);
Y.io(Routing.generate('libbit_docgen_forms_list', options), {
                method: 'GET',
                on: {
                    success: function (tx, r) {
                        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "success", 76);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 77);
self.set('templateId', options['templateId']);

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 79);
callback(null, Y.JSON.parse(r.responseText));
                    }
                }
            });
        }
    },

    comparator: function (model) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "comparator", 86);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 87);
return model.get('sortOrder');
    },

    setPosition: function(formId, sortOrder, direction) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "setPosition", 90);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 91);
this.updateProperty(formId, 'sortOrder', sortOrder);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 92);
this.updateProperty(formId, 'direction', direction);
    },

    updateProperty: function(formId, property, value) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "updateProperty", 95);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 96);
this.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 96);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 97);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 98);
formItem.set(property, value);
            }
        });
    },

    isModified: function() {
        // TODO...
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "isModified", 103);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 105);
return true;
    },

    addForm: function(title) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addForm", 108);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 109);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 110);
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

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 121);
self.add(newForm);
    },

    deleteForm: function(formId) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 124);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 125);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 127);
this.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 4)", 127);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 128);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 129);
self.remove(formItem);
            }
        });
    },

    getFieldGroup: function(fgId) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "getFieldGroup", 134);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 135);
var fgId = parseInt(fgId);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 136);
var fg = null;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 138);
this.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 5)", 138);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 139);
if (formItem.get('controlForm').getFieldGroup(fgId)) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 140);
fg = formItem.get('controlForm').getFieldGroup(fgId);
            }
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 144);
return fg;
    },

    deleteFieldGroup: function(formId, fgId) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteFieldGroup", 147);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 148);
this.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 6)", 148);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 149);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 150);
formItem.get('controlForm').removeFieldGroup(fgId);
            }
        });
    }
}, {
    ATTRS: {
        templateId: { value: null }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 160);
Y.namespace('ControlForm').FormItems = FormItems;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 161);
var FieldContent;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 163);
FieldContent = Y.Base.create('fieldContent', Y.Model, [], {



}, {
    ATTRS: {
        field: { value: null },
        content: { value: '' }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 174);
Y.namespace('ControlForm').FieldContent = FieldContent;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 175);
var Datepicker;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 177);
Datepicker = Y.Base.create('datepicker', Y.Widget, [ ], {

    render: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 179);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 180);
var rules = this.get('rules')

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 182);
if (rules['is_date']['accepts_input']) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 183);
this._renderField();
        }
    },

    _renderField: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "_renderField", 187);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 188);
var container = this.get('srcNode');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 189);
var floatingDiv = Y.Node.create('<div />');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 191);
floatingDiv.setStyle('position', 'absolute');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 192);
floatingDiv.setStyle('top', '0px');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 193);
floatingDiv.setStyle('left', '0px');
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 194);
container.setHTML('hoi');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 196);
container.append(floatingDiv);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 198);
var calendar = new Y.Calendar({
            contentBox: floatingDiv,
            showPrevMonth: true,
            showNextMonth: true,
            date: new Date()
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 205);
this.set('calendar', calendar);
    }
}, {
    ATTRS: {
        rules: { value: [] },
        calendar: { value: null }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 214);
Y.namespace('Libbit').ControlFormDatepicker = Datepicker;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 215);
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 217);
ControlForm = Y.Base.create('controlForm', Y.Base, [], {

    viewTemplate:
        '<div class="formContainer">' +
        '   <div class="formContainer_left">&nbsp;</div>' +
        '   <div class="formContainer_right">&nbsp;</div>' +
        '   <div class="formContainer_proxy">' +
        '   </div>' +
        '</div>',


    initializer: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "initializer", 228);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 229);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 231);
this.on('contextMenu:editLabel', this._editLabel);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 232);
this.on('contextMenu:deleteForm', this.deleteForm);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 233);
this.on('contextMenu:deleteFieldGroup', this._deleteFieldGroup);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 234);
this.on('contextMenu:editFieldGroup', this._editFieldGroup);
    },

    render: function(formsModel) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 237);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 238);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 239);
var container = this.get('srcNode');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 241);
container.setHTML(this.viewTemplate);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 242);
container.one('.formContainer').removeClass('formContainer').addClass(this.get('className'));
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 243);
container.one('.formContainer_left').removeClass('formContainer_left').addClass(this.get('className') + '_left');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 244);
container.one('.formContainer_right').removeClass('formContainer_right').addClass(this.get('className') + '_right');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 246);
if (formsModel == null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 247);
formsModel = this.get('formsModel');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 249);
this.set('formsModel', formsModel);
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 252);
formsModel.sort();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 253);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 253);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 254);
self._renderForm(formItem);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 257);
this.fire('rendered');
    },

    _renderForm: function(formItem) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "_renderForm", 260);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 261);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 262);
var container = this.get('srcNode').one('div');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 263);
var fieldGroupOrder = formItem.get('fieldGroupOrder');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 264);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 265);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 267);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 268);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 270);
legend.set('innerHTML', form.get('caption'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 272);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 273);
formElement.addClass('editMode');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 275);
legend.plug(Y.Libbit.ContextMenu, {
                content: [
                    { title: 'Rename', id: 'editLabel' },
                    { title: '-' },
                    { title: 'Remove', id: 'deleteForm' }
                ],
                bubbleTarget: self
            });
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 285);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 286);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 288);
Y.Array.each(fieldGroupOrder, function(groupId) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 288);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 289);
Y.Array.each(fieldGroups, function(group) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 9)", 289);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 290);
if (groupId == group['id']) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 291);
self.addFieldGroup(formElement, group);
                }
            });
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 296);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 298);
container.one('.' + directionClassName).append(formElement);
    },

    addFieldGroup: function(formElement, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 301);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 302);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 303);
var list = Y.Node.create('<ol />');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 304);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 306);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 307);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 309);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 312);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 313);
var fieldGroupDD = new Y.DD.Drag({
                node: list,
                group: ['fieldGroup']
            }).plug(Y.Plugin.DDConstrained, {
                constrain2node: formElement
            }).plug(Y.Plugin.DDProxy, {
                moveOnEnd: false
            });

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 322);
fieldGroupDD.on('drag:start', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 10)", 322);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 323);
e.target.get('dragNode').setHTML('');
            });
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 325);
fieldGroupDD.on('drag:drag', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 11)", 325);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 326);
self.reOrderFieldGroupDD(e, formElement, list);
            });
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 328);
fieldGroupDD.on('drag:end', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 12)", 328);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 329);
self.reOrderFieldGroup(formElement);
            });
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 333);
list.set('id', fieldGroup['id']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 334);
list.setAttribute('name', fieldGroup['name']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 335);
list.on(['mouseover', 'mouseout'], function(e) {
<<<<<<< HEAD
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 13)", 295);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 296);
list.toggleClass('fieldGroupHighlight');
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 299);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 14)", 299);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 300);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 301);
var controlContainer = Y.Node.create('<li>');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 303);
var controlElement = Y.Node.create('<input />');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 304);
controlElement.data = control;
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 305);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 307);
var draft = self.get('draft');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 309);
if (draft !== null) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 310);
var content = draft.getValue(control.field.id);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 311);
controlElement.set('value', content);
            }

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 314);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 315);
controlContainer.append(controlElement);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 316);
controlContainer.setData(control.field);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 317);
controlContainer.on('click', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 15)", 317);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 318);
controlContainer.addClass('controlSelected');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 320);
self.fire('controlSelected', { 'controlContainer': controlContainer });
            });

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 323);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 326);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 327);
=======
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 13)", 335);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 336);
list.toggleClass('fieldGroupHighlight');
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 339);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 14)", 339);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 340);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 341);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 342);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 344);
controlElement = self._createInputElement(control.rules);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 345);
controlElement.data = control;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 347);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 349);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 350);
controlContainer.append(controlElement);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 351);
controlContainer.setData(control.field);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 352);
controlContainer.on('click', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 15)", 352);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 353);
controlContainer.addClass('controlSelected');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 355);
self.fire('controlSelected', { 'controlContainer': controlContainer });
            });

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 358);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 361);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 362);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
list.plug(Y.Libbit.ContextMenu, {
                content: [
                    { title: 'Edit', id: 'editFieldGroup' },
                    { title: '-' },
                    { title: 'Remove', id: 'deleteFieldGroup' }
                ],
                bubbleTarget: self
            });
        }

<<<<<<< HEAD
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 337);
=======
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 372);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
formElement.append(list);
    },

    _createInputElement: function(rules) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "_createInputElement", 375);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 376);
var node;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 378);
if (rules.is_date) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 379);
node = Y.Node.create('<span />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 381);
new Y.Libbit.ControlFormDatepicker({ srcNode: node, rules: rules }).render();
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 383);
node = Y.Node.create('<input />');
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 386);
return node;
    },

    reOrderFieldGroupDD: function(e, formElement, sender) {
<<<<<<< HEAD
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroupDD", 340);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 341);
var y = e.currentTarget.mouseXY[1];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 342);
=======
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroupDD", 389);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 390);
var y = e.currentTarget.mouseXY[1];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 391);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
var hit = false;

        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend
        // the dragNode before that element.
<<<<<<< HEAD
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 346);
formElement.all('ol').each(function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 16)", 346);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 347);
if (sender.get('id') !== group.get('id')) { // Is this myself?
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 348);
var groupTop = group.getY();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 349);
var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 351);
if (y > groupTop && y < groupBottom) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 352);
sender.insertBefore(sender, group);

                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 354);
=======
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 395);
formElement.all('ol').each(function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 16)", 395);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 396);
if (sender.get('id') !== group.get('id')) { // Is this myself?
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 397);
var groupTop = group.getY();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 398);
var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 400);
if (y > groupTop && y < groupBottom) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 401);
sender.insertBefore(sender, group);

                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 403);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
hit = true;
                }
            }
        });

        // If you are dragging at the bottom of the form, append the dragNode to the bottom.
<<<<<<< HEAD
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 360);
if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 361);
=======
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 409);
if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 410);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
formElement.append(sender);
        }
    },

    reOrderFieldGroup: function(formElement) {
<<<<<<< HEAD
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroup", 365);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 366);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 367);
var formId = formElement.get('name');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 368);
var fieldGroupOrder = [];

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 370);
formElement.all('ol').each(function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 17)", 370);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 371);
fieldGroupOrder.push(this.get('id'));
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 374);
=======
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroup", 414);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 415);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 416);
var formId = formElement.get('name');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 417);
var fieldGroupOrder = [];

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 419);
formElement.all('ol').each(function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 17)", 419);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 420);
fieldGroupOrder.push(this.get('id'));
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 423);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
<<<<<<< HEAD
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 377);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 378);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 379);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 381);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 18)", 381);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 382);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 383);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 385);
=======
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 426);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 427);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 428);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 430);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 18)", 430);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 431);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 432);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 434);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
fieldGroups.push(fieldGroup);
            }
        });
    },

    ddOver: function(e, referenceForm) {
<<<<<<< HEAD
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 390);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 391);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 393);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 394);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 395);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 398);
=======
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 439);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 440);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 442);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 443);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 444);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 447);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm) {
<<<<<<< HEAD
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 402);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 403);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 404);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 405);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 407);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 408);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 409);
=======
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 451);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 452);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 453);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 454);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 456);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 457);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 458);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

<<<<<<< HEAD
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 413);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 414);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 416);
self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 417);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 418);
self.reOrderFieldGroup(formNode);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 420);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 421);
=======
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 462);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 463);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 465);
self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 466);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 467);
self.reOrderFieldGroup(formNode);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 469);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 470);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

<<<<<<< HEAD
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 425);
=======
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 474);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
formNode.removeClass('ddOver');
    },

    toJSON: function() {
<<<<<<< HEAD
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "toJSON", 428);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 429);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 431);
=======
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "toJSON", 477);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 478);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 480);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
return Y.JSON.stringify(formsModel);
    },

    addForm: function(title) {
<<<<<<< HEAD
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addForm", 434);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 435);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 437);
formsModel.addForm(title);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 439);
=======
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addForm", 483);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 484);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 486);
formsModel.addForm(title);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 488);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
this.render();
    },

    deleteForm: function(e) {
<<<<<<< HEAD
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 442);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 443);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 444);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 445);
var formId = e.node.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 447);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the form "' + e.node.get('innerHTML') + '" and all its fieldgroups?',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 19)", 449);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 450);
formsModel.deleteForm(formId);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 451);
=======
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 491);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 492);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 493);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 494);
var formId = e.node.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 496);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the form "' + e.node.get('innerHTML') + '" and all its fieldgroups?',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 19)", 498);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 499);
formsModel.deleteForm(formId);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 500);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
self.render();
            }
        );
    },

<<<<<<< HEAD
    editFieldGroup: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editFieldGroup", 456);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 457);
var fg = this.get('formsModel').getFieldGroup(e.node.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 459);
this.fire('editFieldGroup', { 'fieldGroup': fg });
    },

    deleteFieldGroup: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteFieldGroup", 462);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 463);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 464);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 465);
var formElement = e.node.get('parentNode');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 466);
var formId = formElement.get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 468);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the fieldgroup "' + e.node.getAttribute('name') + '"',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 20)", 470);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 471);
formsModel.deleteFieldGroup(formId, e.node.get('id'));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 473);
e.node.remove();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 474);
=======
    _editFieldGroup: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "_editFieldGroup", 505);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 506);
var fg = this.get('formsModel').getFieldGroup(e.node.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 508);
this.fire('editFieldGroup', { 'fieldGroup': fg });
    },

    _deleteFieldGroup: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "_deleteFieldGroup", 511);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 512);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 513);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 514);
var formElement = e.node.get('parentNode');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 515);
var formId = formElement.get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 517);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the fieldgroup "' + e.node.getAttribute('name') + '"',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 20)", 519);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 520);
formsModel.deleteFieldGroup(formId, e.node.get('id'));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 522);
e.node.remove();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 523);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
self.reOrderFieldGroup(formElement);
            }
        );
    },

<<<<<<< HEAD
    editLabel: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 479);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 480);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 481);
var dialog = new Y.Libbit.Dialog();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 482);
var legend = e.node;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 483);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 485);
=======
    _editLabel: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "_editLabel", 528);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 529);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 530);
var dialog = new Y.Libbit.Dialog();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 531);
var legend = e.node;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 532);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 534);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
dialog.prompt(
            'Form title',
            'Value',
            legend.get('text'),
            function(node) {
<<<<<<< HEAD
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 21)", 489);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 490);
var value = '';

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 492);
self.get('formsModel').each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 22)", 492);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 493);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 494);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 496);
value = node.one('input').get('value');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 498);
if (value !== '') {
                            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 499);
form.set('caption', value);
                            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 500);
=======
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 21)", 538);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 539);
var value = '';

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 541);
self.get('formsModel').each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 22)", 541);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 542);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 543);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 545);
value = node.one('input').get('value');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 547);
if (value !== '') {
                            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 548);
form.set('caption', value);
                            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 549);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
legend.set('text', form.get('caption'));
                        }
                    }
                });

<<<<<<< HEAD
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 505);
if (value !== '') {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 506);
return true;
                } else {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 508);
=======
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 554);
if (value !== '') {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 555);
return true;
                } else {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 557);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
dialog.set('error', { path: 'input', message: ''});
                }
            }
        );
    },

    getFieldContent: function() {
<<<<<<< HEAD
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "getFieldContent", 514);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 515);
var buffer = [];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 516);
var listCollection = this.get('srcNode').all('ol');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 518);
listCollection.each(function(list) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 23)", 518);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 519);
list.all('li').each(function(control) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 24)", 519);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 520);
=======
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "getFieldContent", 563);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 564);
var buffer = [];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 565);
var listCollection = this.get('srcNode').all('ol');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 567);
listCollection.each(function(list) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 23)", 567);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 568);
list.all('li').each(function(control) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 24)", 568);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 569);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
var fieldContent = new Y.ControlForm.FieldContent({
                    field: control.getData(),
                    content: control.one('input, textarea, select').get('value')
                });

<<<<<<< HEAD
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 525);
=======
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 574);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
buffer.push(fieldContent);
            });
        });

<<<<<<< HEAD
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 529);
=======
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 578);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
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
    }
});


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 543);
=======
        draftId: { value: null }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 591);
>>>>>>> a9f0d7372d497289dd6917dc9a874eed789573bd
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
