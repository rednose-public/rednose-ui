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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var Form;","","Form = Y.Base.create('form', Y.Model, [], {","","    removeFieldGroup: function(fgId) {","        for (var i in this.get('fieldGroups')) {","            if (this.get('fieldGroups')[i]['id'] == fgId) {","                var fieldGroups = this.get('fieldGroups');","","                fieldGroups.splice(i, 1);","","                this.set('fieldGroups', fieldGroups);","            }","        }","    },","","    getFieldGroup: function(fgId) {","        for (var i in this.get('fieldGroups')) {","            if (this.get('fieldGroups')[i]['id'] == fgId) {","                return this.get('fieldGroups')[i];","            }","        }","","        return false;","    }","","}, {","    ATTRS: {","        caption: { value: '' },","        fieldGroups: { value: [] }","    }","});","","Y.namespace('ControlForm').Form = Form;","var FormItem;","","FormItem = Y.Base.create('formItem', Y.Model, [], {","    ","}, {","    ATTRS: {","        template: { value: null },","        sortOrder: { value: 0 },","        direction: { value: 'left' },","        controlForm: { value: null },","        fieldGroupOrder: { value: [] }","    }","});","","Y.namespace('ControlForm').FormItem = FormItem;","var FormItem = Y.ControlForm.FormItem,","    Form = Y.ControlForm.Form,","    FormItems;","","FormItems = Y.Base.create('formItems', Y.ModelList, [], {","    model: FormItem,","","    parse: function (response) {","        return response.map(function (controlFormItem) {","            if (controlFormItem.controlForm !== null) {","                controlFormItem.controlForm = new Form(controlFormItem.controlForm);","            }","","            return controlFormItem;","        });","    },","","    sync: function (action, options, callback) {","        var self = this;","","        if (action === 'read') {","            Y.io(Routing.generate('libbit_docgen_forms_list', options), {","                method: 'GET',","                on: {","                    success: function (tx, r) {","                        self.set('templateId', options['templateId']);","","                        callback(null, Y.JSON.parse(r.responseText));","                    }","                }","            });","        }","    },","","    comparator: function (model) {","        return model.get('sortOrder');","    },","","    setPosition: function(formId, sortOrder, direction) {","        this.updateProperty(formId, 'sortOrder', sortOrder);","        this.updateProperty(formId, 'direction', direction);","    },","","    updateProperty: function(formId, property, value) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.set(property, value);","            }","        });","    },","","    isModified: function() {","        // TODO...","        return true;","    },","","    addForm: function(title) {","        var self = this;","        var newForm = {","            id: 'tmp_' + Math.round((new Date()).getTime() / 1000) + (Math.round(Math.random()) * 999999),","            direction: 'left',","            controlForm: new self.model({","                caption: title,","                fieldGroups: []","            }),","            sortOrder: self.size(),","            template: self.get('templateId')","        };","","        self.add(newForm);","    },","","    deleteForm: function(formId) {","        var self = this;","","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                self.remove(formItem);","            }","        });","    },","","    getFieldGroup: function(fgId) {","        var fgId = parseInt(fgId);","        var fg = null;","","        this.each(function(formItem) {","            if (formItem.get('controlForm').getFieldGroup(fgId)) {","                fg = formItem.get('controlForm').getFieldGroup(fgId);","            }","        });","","        return fg;","    },","","    deleteFieldGroup: function(formId, fgId) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.get('controlForm').removeFieldGroup(fgId);","            }","        });","    }","}, {","    ATTRS: {","        templateId: { value: null }","    }","});","","Y.namespace('ControlForm').FormItems = FormItems;","var fieldContent;","","fieldContent = Y.Base.create('fieldContent', Y.Model, [], {","","","","}, {","    ATTRS: {","        field: { value: null },","        content: { value: '' }","    }","});","","Y.namespace('ControlForm').fieldContent = fieldContent;","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","","    viewTemplate:","        '<div class=\"formContainer\">' +","        '   <div class=\"formContainer_left\">&nbsp;</div>' +","        '   <div class=\"formContainer_right\">&nbsp;</div>' +","        '   <div class=\"formContainer_proxy\">' +","        '   </div>' +","        '</div>',","","","    initializer: function() {","        var self = this;","","        this.on('contextMenu:editLabel', this.editLabel);","        this.on('contextMenu:deleteForm', this.deleteForm);","        this.on('contextMenu:deleteFieldGroup', this.deleteFieldGroup);","        this.on('contextMenu:editFieldGroup', this.editFieldGroup);","    },","","    render: function(formsModel) {","        var self = this;","        var container = this.get('srcNode');","","        container.setHTML(this.viewTemplate);","        container.one('.formContainer').removeClass('formContainer').addClass(this.get('className'));","        container.one('.formContainer_left').removeClass('formContainer_left').addClass(this.get('className') + '_left');","        container.one('.formContainer_right').removeClass('formContainer_right').addClass(this.get('className') + '_right');","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self._renderForm(formItem);","        });","","        this.fire('rendered');","    },","","    _renderForm: function(formItem) {","        var self = this;","        var container = this.get('srcNode').one('div');","        var fieldGroupOrder = formItem.get('fieldGroupOrder');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","","        if (this.get('editMode')) {","            formElement.addClass('editMode');","","            legend.plug(Y.Libbit.ContextMenu, {","                content: [","                    { title: 'Rename', id: 'editLabel' },","                    { title: '-' },","                    { title: 'Remove', id: 'deleteForm' }","                ],","                bubbleTarget: self","            });","        }","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroupOrder, function(groupId) {","            Y.Array.each(fieldGroups, function(group) {","                if (groupId == group['id']) {","                    self.addFieldGroup(formElement, group);","                }","            });","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        container.one('.' + directionClassName).append(formElement);","    },","","    addFieldGroup: function(formElement, fieldGroup) {","        var self = this;","        var list = Y.Node.create('<ol />');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        if (this.get('editMode')) {","            var fieldGroupDD = new Y.DD.Drag({","                node: list,","                group: ['fieldGroup']","            }).plug(Y.Plugin.DDConstrained, {","                constrain2node: formElement","            }).plug(Y.Plugin.DDProxy, {","                moveOnEnd: false","            });","","            fieldGroupDD.on('drag:start', function(e) {","                e.target.get('dragNode').setHTML('');","            });","            fieldGroupDD.on('drag:drag', function(e) {","                self.reOrderFieldGroupDD(e, formElement, list);","            });","            fieldGroupDD.on('drag:end', function(e) {","                self.reOrderFieldGroup(formElement);","            });","        }","","        list.set('id', fieldGroup['id']);","        list.setAttribute('name', fieldGroup['name']);","        list.on(['mouseover', 'mouseout'], function(e) {","            if (e.type == 'mouseover') {","                list.addClass('fieldGroupHighlight');","            } else {","                list.removeClass('fieldGroupHighlight');","            }","        });","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","            controlContainer.setData(control.field);","","            list.append(controlContainer);","        });","","        if (this.get('editMode')) {","            list.plug(Y.Libbit.ContextMenu, {","                content: [","                    { title: 'Edit', id: 'editFieldGroup' },","                    { title: '-' },","                    { title: 'Remove', id: 'deleteFieldGroup' }","                ],","                bubbleTarget: self","            });","        }","","        formElement.append(list);","    },","","    reOrderFieldGroupDD: function(e, formElement, sender) {","        var y = e.currentTarget.mouseXY[1];","        var hit = false;","","        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend","        // the dragNode before that element.","        formElement.all('ol').each(function(group) {","            if (sender.get('id') !== group.get('id')) { // Is this myself?","                var groupTop = group.getY();","                var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));","","                if (y > groupTop && y < groupBottom) {","                    sender.insertBefore(sender, group);","","                    hit = true;","                }","            }","        });","","        // If you are dragging at the bottom of the form, append the dragNode to the bottom.","        if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {","            formElement.append(sender);","        }","    },","","    reOrderFieldGroup: function(formElement) {","        var formsModel = this.get('formsModel');","        var formId = formElement.get('name');","        var fieldGroupOrder = [];","","        formElement.all('ol').each(function() {","            fieldGroupOrder.push(this.get('id'));","        });","","        formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);","    },","","    addFieldGroupToModel: function(formId, fieldGroup) {","        var self = this;","        var formsModel = this.get('formsModel');","","        formsModel.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm) {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm) {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","            self.reOrderFieldGroup(formNode);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    toJSON: function() {","        var formsModel = this.get('formsModel');","","        return Y.JSON.stringify(formsModel);","    },","","    addForm: function(title) {","        var formsModel = this.get('formsModel');","","        formsModel.addForm(title);","","        this.render();","    },","","    deleteForm: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formId = e.node.get('parentNode').get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the form \"' + e.node.get('innerHTML') + '\" and all its fieldgroups?',","            function() {","                formsModel.deleteForm(formId);","                self.render();","            }","        );","    },","","    editFieldGroup: function(e) {","        var fg = this.get('formsModel').getFieldGroup(e.node.get('id'));","","        this.fire('editFieldGroup', { 'fieldGroup': fg });","    },","","    deleteFieldGroup: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formElement = e.node.get('parentNode');","        var formId = formElement.get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the fieldgroup \"' + e.node.getAttribute('name') + '\"',","            function() {","                formsModel.deleteFieldGroup(formId, e.node.get('id'));","","                e.node.remove();","                self.reOrderFieldGroup(formElement);","            }","        );","    },","","    editLabel: function(e) {","        var self = this;","        var legend = e.node;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.get('formsModel').each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    },","","    getFieldContent: function() {","        var buffer = [];","        var listCollection = this.get('srcNode').all('ol');","","        listCollection.each(function(list) {","            list.all('li').each(function(control) {","                var fieldContent = new Y.ControlForm.fieldContent({","                    field: control.getData(),","                    content: control.one('input, textarea, select').get('value')","                });","","                buffer.push(fieldContent);","            });","        });","","        return buffer;","    }","","}, {","    ATTRS: {","        srcNode: { value: null },","        formsModel: { value: null },","        className: { value: 'formContainer' },","        editMode: { value: false }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {","    \"requires\": [","        \"dd-proxy\",","        \"dd-constrain\",","        \"node\",","        \"model-list\",","        \"model\",","        \"base\",","        \"libbit-dialog\",","        \"libbit-contextmenu\"","    ]","});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"9":0,"10":0,"12":0,"14":0,"20":0,"21":0,"22":0,"26":0,"36":0,"37":0,"39":0,"51":0,"52":0,"56":0,"60":0,"61":0,"62":0,"65":0,"70":0,"72":0,"73":0,"77":0,"79":0,"87":0,"91":0,"92":0,"96":0,"97":0,"98":0,"105":0,"109":0,"110":0,"121":0,"125":0,"127":0,"128":0,"129":0,"135":0,"136":0,"138":0,"139":0,"140":0,"144":0,"148":0,"149":0,"150":0,"160":0,"161":0,"163":0,"174":0,"175":0,"177":0,"189":0,"191":0,"192":0,"193":0,"194":0,"198":0,"199":0,"201":0,"202":0,"203":0,"204":0,"206":0,"207":0,"209":0,"212":0,"213":0,"214":0,"217":0,"221":0,"222":0,"223":0,"224":0,"225":0,"227":0,"228":0,"230":0,"232":0,"233":0,"235":0,"245":0,"246":0,"248":0,"249":0,"250":0,"251":0,"256":0,"258":0,"262":0,"263":0,"264":0,"266":0,"267":0,"269":0,"272":0,"273":0,"282":0,"283":0,"285":0,"286":0,"288":0,"289":0,"293":0,"294":0,"295":0,"296":0,"297":0,"299":0,"303":0,"304":0,"305":0,"306":0,"308":0,"310":0,"312":0,"313":0,"314":0,"316":0,"319":0,"320":0,"330":0,"334":0,"335":0,"339":0,"340":0,"341":0,"342":0,"344":0,"345":0,"347":0,"353":0,"354":0,"359":0,"360":0,"361":0,"363":0,"364":0,"367":0,"371":0,"372":0,"374":0,"375":0,"376":0,"378":0,"384":0,"386":0,"387":0,"388":0,"391":0,"396":0,"397":0,"398":0,"400":0,"401":0,"402":0,"406":0,"407":0,"409":0,"410":0,"411":0,"413":0,"414":0,"418":0,"422":0,"424":0,"428":0,"430":0,"432":0,"436":0,"437":0,"438":0,"440":0,"443":0,"444":0,"450":0,"452":0,"456":0,"457":0,"458":0,"459":0,"461":0,"464":0,"466":0,"467":0,"473":0,"474":0,"475":0,"477":0,"481":0,"482":0,"483":0,"485":0,"486":0,"490":0,"497":0,"498":0,"500":0,"501":0,"502":0,"507":0,"511":0,"524":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"removeFieldGroup:7":0,"getFieldGroup:19":0,"(anonymous 2):60":0,"parse:59":0,"success:76":0,"sync:69":0,"comparator:86":0,"setPosition:90":0,"(anonymous 3):96":0,"updateProperty:95":0,"isModified:103":0,"addForm:108":0,"(anonymous 4):127":0,"deleteForm:124":0,"(anonymous 5):138":0,"getFieldGroup:134":0,"(anonymous 6):148":0,"deleteFieldGroup:147":0,"initializer:188":0,"(anonymous 7):213":0,"render:197":0,"(anonymous 9):249":0,"(anonymous 8):248":0,"_renderForm:220":0,"(anonymous 10):282":0,"(anonymous 11):285":0,"(anonymous 12):288":0,"(anonymous 13):295":0,"(anonymous 14):303":0,"addFieldGroup:261":0,"(anonymous 15):339":0,"reOrderFieldGroupDD:333":0,"(anonymous 16):363":0,"reOrderFieldGroup:358":0,"(anonymous 17):374":0,"addFieldGroupToModel:370":0,"ddOver:383":0,"ddDrop:395":0,"toJSON:421":0,"addForm:427":0,"(anonymous 18):442":0,"deleteForm:435":0,"editFieldGroup:449":0,"(anonymous 19):463":0,"deleteFieldGroup:455":0,"(anonymous 21):481":0,"(anonymous 20):480":0,"editLabel:472":0,"(anonymous 23):501":0,"(anonymous 22):500":0,"getFieldContent:496":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 207;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 52;
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
var fieldContent;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 163);
fieldContent = Y.Base.create('fieldContent', Y.Model, [], {



}, {
    ATTRS: {
        field: { value: null },
        content: { value: '' }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 174);
Y.namespace('ControlForm').fieldContent = fieldContent;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 175);
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 177);
ControlForm = Y.Base.create('controlForm', Y.Base, [], {

    viewTemplate:
        '<div class="formContainer">' +
        '   <div class="formContainer_left">&nbsp;</div>' +
        '   <div class="formContainer_right">&nbsp;</div>' +
        '   <div class="formContainer_proxy">' +
        '   </div>' +
        '</div>',


    initializer: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "initializer", 188);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 189);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 191);
this.on('contextMenu:editLabel', this.editLabel);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 192);
this.on('contextMenu:deleteForm', this.deleteForm);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 193);
this.on('contextMenu:deleteFieldGroup', this.deleteFieldGroup);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 194);
this.on('contextMenu:editFieldGroup', this.editFieldGroup);
    },

    render: function(formsModel) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 197);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 198);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 199);
var container = this.get('srcNode');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 201);
container.setHTML(this.viewTemplate);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 202);
container.one('.formContainer').removeClass('formContainer').addClass(this.get('className'));
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 203);
container.one('.formContainer_left').removeClass('formContainer_left').addClass(this.get('className') + '_left');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 204);
container.one('.formContainer_right').removeClass('formContainer_right').addClass(this.get('className') + '_right');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 206);
if (formsModel == null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 207);
formsModel = this.get('formsModel');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 209);
this.set('formsModel', formsModel);
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 212);
formsModel.sort();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 213);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 213);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 214);
self._renderForm(formItem);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 217);
this.fire('rendered');
    },

    _renderForm: function(formItem) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "_renderForm", 220);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 221);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 222);
var container = this.get('srcNode').one('div');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 223);
var fieldGroupOrder = formItem.get('fieldGroupOrder');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 224);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 225);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 227);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 228);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 230);
legend.set('innerHTML', form.get('caption'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 232);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 233);
formElement.addClass('editMode');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 235);
legend.plug(Y.Libbit.ContextMenu, {
                content: [
                    { title: 'Rename', id: 'editLabel' },
                    { title: '-' },
                    { title: 'Remove', id: 'deleteForm' }
                ],
                bubbleTarget: self
            });
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 245);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 246);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 248);
Y.Array.each(fieldGroupOrder, function(groupId) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 248);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 249);
Y.Array.each(fieldGroups, function(group) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 9)", 249);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 250);
if (groupId == group['id']) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 251);
self.addFieldGroup(formElement, group);
                }
            });
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 256);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 258);
container.one('.' + directionClassName).append(formElement);
    },

    addFieldGroup: function(formElement, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 261);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 262);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 263);
var list = Y.Node.create('<ol />');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 264);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 266);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 267);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 269);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 272);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 273);
var fieldGroupDD = new Y.DD.Drag({
                node: list,
                group: ['fieldGroup']
            }).plug(Y.Plugin.DDConstrained, {
                constrain2node: formElement
            }).plug(Y.Plugin.DDProxy, {
                moveOnEnd: false
            });

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 282);
fieldGroupDD.on('drag:start', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 10)", 282);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 283);
e.target.get('dragNode').setHTML('');
            });
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 285);
fieldGroupDD.on('drag:drag', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 11)", 285);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 286);
self.reOrderFieldGroupDD(e, formElement, list);
            });
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 288);
fieldGroupDD.on('drag:end', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 12)", 288);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 289);
self.reOrderFieldGroup(formElement);
            });
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 293);
list.set('id', fieldGroup['id']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 294);
list.setAttribute('name', fieldGroup['name']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 295);
list.on(['mouseover', 'mouseout'], function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 13)", 295);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 296);
if (e.type == 'mouseover') {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 297);
list.addClass('fieldGroupHighlight');
            } else {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 299);
list.removeClass('fieldGroupHighlight');
            }
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 303);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 14)", 303);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 304);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 305);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 306);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 308);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 310);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 312);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 313);
controlContainer.append(controlElement);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 314);
controlContainer.setData(control.field);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 316);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 319);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 320);
list.plug(Y.Libbit.ContextMenu, {
                content: [
                    { title: 'Edit', id: 'editFieldGroup' },
                    { title: '-' },
                    { title: 'Remove', id: 'deleteFieldGroup' }
                ],
                bubbleTarget: self
            });
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 330);
formElement.append(list);
    },

    reOrderFieldGroupDD: function(e, formElement, sender) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroupDD", 333);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 334);
var y = e.currentTarget.mouseXY[1];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 335);
var hit = false;

        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend
        // the dragNode before that element.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 339);
formElement.all('ol').each(function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 15)", 339);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 340);
if (sender.get('id') !== group.get('id')) { // Is this myself?
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 341);
var groupTop = group.getY();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 342);
var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 344);
if (y > groupTop && y < groupBottom) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 345);
sender.insertBefore(sender, group);

                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 347);
hit = true;
                }
            }
        });

        // If you are dragging at the bottom of the form, append the dragNode to the bottom.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 353);
if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 354);
formElement.append(sender);
        }
    },

    reOrderFieldGroup: function(formElement) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroup", 358);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 359);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 360);
var formId = formElement.get('name');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 361);
var fieldGroupOrder = [];

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 363);
formElement.all('ol').each(function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 16)", 363);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 364);
fieldGroupOrder.push(this.get('id'));
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 367);
formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 370);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 371);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 372);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 374);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 17)", 374);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 375);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 376);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 378);
fieldGroups.push(fieldGroup);
            }
        });
    },

    ddOver: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 383);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 384);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 386);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 387);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 388);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 391);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 395);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 396);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 397);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 398);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 400);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 401);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 402);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 406);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 407);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 409);
self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 410);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 411);
self.reOrderFieldGroup(formNode);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 413);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 414);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 418);
formNode.removeClass('ddOver');
    },

    toJSON: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "toJSON", 421);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 422);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 424);
return Y.JSON.stringify(formsModel);
    },

    addForm: function(title) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addForm", 427);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 428);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 430);
formsModel.addForm(title);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 432);
this.render();
    },

    deleteForm: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 435);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 436);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 437);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 438);
var formId = e.node.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 440);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the form "' + e.node.get('innerHTML') + '" and all its fieldgroups?',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 18)", 442);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 443);
formsModel.deleteForm(formId);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 444);
self.render();
            }
        );
    },

    editFieldGroup: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editFieldGroup", 449);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 450);
var fg = this.get('formsModel').getFieldGroup(e.node.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 452);
this.fire('editFieldGroup', { 'fieldGroup': fg });
    },

    deleteFieldGroup: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteFieldGroup", 455);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 456);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 457);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 458);
var formElement = e.node.get('parentNode');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 459);
var formId = formElement.get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 461);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the fieldgroup "' + e.node.getAttribute('name') + '"',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 19)", 463);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 464);
formsModel.deleteFieldGroup(formId, e.node.get('id'));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 466);
e.node.remove();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 467);
self.reOrderFieldGroup(formElement);
            }
        );
    },

    editLabel: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 472);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 473);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 474);
var legend = e.node;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 475);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 477);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 20)", 480);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 481);
self.get('formsModel').each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 21)", 481);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 482);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 483);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 485);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 486);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 490);
return true;
            },
            legend.get('text')
        );
    },

    getFieldContent: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "getFieldContent", 496);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 497);
var buffer = [];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 498);
var listCollection = this.get('srcNode').all('ol');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 500);
listCollection.each(function(list) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 22)", 500);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 501);
list.all('li').each(function(control) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 23)", 501);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 502);
var fieldContent = new Y.ControlForm.fieldContent({
                    field: control.getData(),
                    content: control.one('input, textarea, select').get('value')
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 507);
buffer.push(fieldContent);
            });
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 511);
return buffer;
    }

}, {
    ATTRS: {
        srcNode: { value: null },
        formsModel: { value: null },
        className: { value: 'formContainer' },
        editMode: { value: false }
    }
});


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 524);
Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {
    "requires": [
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
