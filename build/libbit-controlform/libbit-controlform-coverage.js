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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var Form;","","Form = Y.Base.create('form', Y.Model, [], {","","    removeFieldGroup: function(fgId) {","        for (var i in this.get('fieldGroups')) {","            if (this.get('fieldGroups')[i]['id'] == fgId) {","                var fieldGroups = this.get('fieldGroups');","","                fieldGroups.splice(i, 1);","","                this.set('fieldGroups', fieldGroups);","            }","        }","    },","","    getFieldGroup: function(fgId) {","        for (var i in this.get('fieldGroups')) {","            if (this.get('fieldGroups')[i]['id'] == fgId) {","                return this.get('fieldGroups')[i];","            }","        }","","        return false;","    }","","}, {","    ATTRS: {","        caption: { value: '' },","        fieldGroups: { value: [] }","    }","});","","Y.namespace('ControlForm').Form = Form;","var FormItem;","","FormItem = Y.Base.create('formItem', Y.Model, [], {","    ","}, {","    ATTRS: {","        template: { value: null },","        sortOrder: { value: 0 },","        direction: { value: 'left' },","        controlForm: { value: null },","        fieldGroupOrder: { value: [] }","    }","});","","Y.namespace('ControlForm').FormItem = FormItem;","var FormItem = Y.ControlForm.FormItem,","    Form = Y.ControlForm.Form,","    FormItems;","","FormItems = Y.Base.create('formItems', Y.ModelList, [], {","    model: FormItem,","","    parse: function (response) {","        return response.map(function (controlFormItem) {","            if (controlFormItem.controlForm !== null) {","                controlFormItem.controlForm = new Form(controlFormItem.controlForm);","            }","","            return controlFormItem;","        });","    },","","    sync: function (action, options, callback) {","        var self = this;","","        if (action === 'read') {","            Y.io(Routing.generate('libbit_docgen_forms_list', options), {","                method: 'GET',","                on: {","                    success: function (tx, r) {","                        self.set('templateId', options['templateId']);","","                        callback(null, Y.JSON.parse(r.responseText));","                    }","                }","            });","        }","    },","","    comparator: function (model) {","        return model.get('sortOrder');","    },","","    setPosition: function(formId, sortOrder, direction) {","        this.updateProperty(formId, 'sortOrder', sortOrder);","        this.updateProperty(formId, 'direction', direction);","    },","","    updateProperty: function(formId, property, value) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.set(property, value);","            }","        });","    },","","    isModified: function() {","        // TODO...","        return true;","    },","","    addForm: function(title) {","        var self = this;","        var newForm = {","            id: 'tmp_' + Math.round((new Date()).getTime() / 1000) + (Math.round(Math.random()) * 999999),","            direction: 'left',","            controlForm: new self.model({","                caption: title,","                fieldGroups: []","            }),","            sortOrder: self.size(),","            template: self.get('templateId')","        };","","        self.add(newForm);","    },","","    deleteForm: function(formId) {","        var self = this;","","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                self.remove(formItem);","            }","        });","    },","","    getFieldGroup: function(fgId) {","        var fgId = parseInt(fgId);","        var fg = null;","","        this.each(function(formItem) {","            if (formItem.get('controlForm').getFieldGroup(fgId)) {","                fg = formItem.get('controlForm').getFieldGroup(fgId);","            }","        });","","        return fg;","    },","","    deleteFieldGroup: function(formId, fgId) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.get('controlForm').removeFieldGroup(fgId);","            }","        });","    }","}, {","    ATTRS: {","        templateId: { value: null }","    }","});","","Y.namespace('ControlForm').FormItems = FormItems;","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","","    viewTemplate:","        '<div class=\"formContainer\">' +","        '   <div class=\"formContainer_left\">&nbsp;</div>' +","        '   <div class=\"formContainer_right\">&nbsp;</div>' +","        '   <div class=\"formContainer_proxy\">' +","        '       <div class=\"formContainer_proxy_arrow\"></div>' +","        '   </div>' +","        '</div>',","","","    initializer: function() {","        var self = this;","","        this.on('contextMenu:editLabel', this.editLabel);","        this.on('contextMenu:deleteForm', this.deleteForm);","        this.on('contextMenu:deleteFieldGroup', this.deleteFieldGroup);","        this.on('contextMenu:editFieldGroup', this.editFieldGroup);","    },","","    render: function(formsModel) {","        var self = this;","","        this.get('srcNode').setHTML(this.viewTemplate);","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","","        this.fire('rendered');","    },","","    renderForm: function(formItem) {","        var self = this;","        var container = this.get('srcNode').one('div');","        var fieldGroupOrder = formItem.get('fieldGroupOrder');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","","        if (this.get('editMode')) {","            formElement.addClass('editMode');","","            legend.plug(Y.Libbit.ContextMenu, {","                content: [","                    { title: 'Rename', id: 'editLabel' },","                    { title: '-' },","                    { title: 'Remove', id: 'deleteForm' }","                ],","                bubbleTarget: self","            });","        }","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroupOrder, function(groupId) {","            Y.Array.each(fieldGroups, function(group) {","                if (groupId == group['id']) {","                    self.addFieldGroup(formElement, group);","                }","            });","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        container.one('.' + directionClassName).append(formElement);","    },","","    addFieldGroup: function(formElement, fieldGroup) {","        var self = this;","        var list = Y.Node.create('<ol />');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        if (this.get('editMode')) {","            var fieldGroupDD = new Y.DD.Drag({","                node: list,","                group: ['fieldGroup']","            }).plug(Y.Plugin.DDConstrained, {","                constrain2node: formElement","            }).plug(Y.Plugin.DDProxy, {","                moveOnEnd: false","            });","","            fieldGroupDD.on('drag:start', function(e) {","                e.target.get('dragNode').setHTML('');","            });","            fieldGroupDD.on('drag:drag', function(e) {","                self.reOrderFieldGroupDD(e, formElement, list);","            });","            fieldGroupDD.on('drag:end', function(e) {","                self.reOrderFieldGroup(formElement);","            });","        }","","        list.set('id', fieldGroup['id']);","        list.setAttribute('name', fieldGroup['name']);","        list.on(['mouseover', 'mouseout'], function(e) {","            if (e.type == 'mouseover') {","                list.addClass('fieldGroupHighlight');","            } else {","                list.removeClass('fieldGroupHighlight');","            }","        });","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        if (this.get('editMode')) {","            list.plug(Y.Libbit.ContextMenu, {","                content: [","                    { title: 'Edit', id: 'editFieldGroup' },","                    { title: '-' },","                    { title: 'Remove', id: 'deleteFieldGroup' }","                ],","                bubbleTarget: self","            });","        }","","        formElement.append(list);","    },","","    reOrderFieldGroupDD: function(e, formElement, sender) {","        var y = e.currentTarget.mouseXY[1];","        var hit = false;","","        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend","        // the dragNode before that element.","        formElement.all('ol').each(function(group) {","            if (sender.get('id') !== group.get('id')) { // Is this myself?","                var groupTop = group.getY();","                var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));","","                if (y > groupTop && y < groupBottom) {","                    sender.insertBefore(sender, group);","","                    hit = true;","                }","            }","        });","","        // If you are dragging at the bottom of the form, append the dragNode to the bottom.","        if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {","            formElement.append(sender);","        }","    },","","    reOrderFieldGroup: function(formElement) {","        var formsModel = this.get('formsModel');","        var formId = formElement.get('name');","        var fieldGroupOrder = [];","","        formElement.all('ol').each(function() {","            fieldGroupOrder.push(this.get('id'));","        });","","        formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);","    },","","    addFieldGroupToModel: function(formId, fieldGroup) {","        var self = this;","        var formsModel = this.get('formsModel');","","        formsModel.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm) {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm) {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","            self.reOrderFieldGroup(formNode);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    toJSON: function() {","        var formsModel = this.get('formsModel');","","        return Y.JSON.stringify(formsModel);","    },","","    addForm: function(title) {","        var formsModel = this.get('formsModel');","","        formsModel.addForm(title);","","        this.render();","    },","","    deleteForm: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formId = e.node.get('parentNode').get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the form \"' + e.node.get('innerHTML') + '\" and all its fieldgroups?',","            function() {","                formsModel.deleteForm(formId);","                self.render();","            }","        );","    },","","    editFieldGroup: function(e) {","        var fg = this.get('formsModel').getFieldGroup(e.node.get('id'));","","        this.fire('editFieldGroup', { 'fieldGroup': fg });","    },","","    deleteFieldGroup: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formElement = e.node.get('parentNode');","        var formId = formElement.get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the fieldgroup \"' + e.node.getAttribute('name') + '\"',","            function() {","                formsModel.deleteFieldGroup(formId, e.node.get('id'));","","                e.node.remove();","                self.reOrderFieldGroup(formElement);","            }","        );","    },","","    editLabel: function(e) {","        var self = this;","        var legend = e.node;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.get('formsModel').each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    }","}, {","    ATTRS: {","        srcNode: { value: null },","        formsModel: { value: null },","        editMode: { value: false }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {","    \"requires\": [","        \"dd-proxy\",","        \"dd-constrain\",","        \"node\",","        \"model-list\",","        \"model\",","        \"base\",","        \"libbit-dialog\",","        \"libbit-contextmenu\"","    ]","});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"9":0,"10":0,"12":0,"14":0,"20":0,"21":0,"22":0,"26":0,"36":0,"37":0,"39":0,"51":0,"52":0,"56":0,"60":0,"61":0,"62":0,"65":0,"70":0,"72":0,"73":0,"77":0,"79":0,"87":0,"91":0,"92":0,"96":0,"97":0,"98":0,"105":0,"109":0,"110":0,"121":0,"125":0,"127":0,"128":0,"129":0,"135":0,"136":0,"138":0,"139":0,"140":0,"144":0,"148":0,"149":0,"150":0,"160":0,"161":0,"163":0,"176":0,"178":0,"179":0,"180":0,"181":0,"185":0,"187":0,"189":0,"190":0,"192":0,"195":0,"196":0,"197":0,"200":0,"204":0,"205":0,"206":0,"207":0,"208":0,"210":0,"211":0,"213":0,"215":0,"216":0,"218":0,"228":0,"229":0,"231":0,"232":0,"233":0,"234":0,"239":0,"241":0,"245":0,"246":0,"247":0,"249":0,"250":0,"252":0,"255":0,"256":0,"265":0,"266":0,"268":0,"269":0,"271":0,"272":0,"276":0,"277":0,"278":0,"279":0,"280":0,"282":0,"286":0,"287":0,"288":0,"289":0,"291":0,"293":0,"295":0,"296":0,"298":0,"301":0,"302":0,"312":0,"316":0,"317":0,"321":0,"322":0,"323":0,"324":0,"326":0,"327":0,"329":0,"335":0,"336":0,"341":0,"342":0,"343":0,"345":0,"346":0,"349":0,"353":0,"354":0,"356":0,"357":0,"358":0,"360":0,"366":0,"368":0,"369":0,"370":0,"373":0,"378":0,"379":0,"380":0,"382":0,"383":0,"384":0,"388":0,"389":0,"391":0,"392":0,"393":0,"395":0,"396":0,"400":0,"404":0,"406":0,"410":0,"412":0,"414":0,"418":0,"419":0,"420":0,"422":0,"425":0,"426":0,"432":0,"434":0,"438":0,"439":0,"440":0,"441":0,"443":0,"446":0,"448":0,"449":0,"455":0,"456":0,"457":0,"459":0,"463":0,"464":0,"465":0,"467":0,"468":0,"472":0,"486":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"removeFieldGroup:7":0,"getFieldGroup:19":0,"(anonymous 2):60":0,"parse:59":0,"success:76":0,"sync:69":0,"comparator:86":0,"setPosition:90":0,"(anonymous 3):96":0,"updateProperty:95":0,"isModified:103":0,"addForm:108":0,"(anonymous 4):127":0,"deleteForm:124":0,"(anonymous 5):138":0,"getFieldGroup:134":0,"(anonymous 6):148":0,"deleteFieldGroup:147":0,"initializer:175":0,"(anonymous 7):196":0,"render:184":0,"(anonymous 9):232":0,"(anonymous 8):231":0,"renderForm:203":0,"(anonymous 10):265":0,"(anonymous 11):268":0,"(anonymous 12):271":0,"(anonymous 13):278":0,"(anonymous 14):286":0,"addFieldGroup:244":0,"(anonymous 15):321":0,"reOrderFieldGroupDD:315":0,"(anonymous 16):345":0,"reOrderFieldGroup:340":0,"(anonymous 17):356":0,"addFieldGroupToModel:352":0,"ddOver:365":0,"ddDrop:377":0,"toJSON:403":0,"addForm:409":0,"(anonymous 18):424":0,"deleteForm:417":0,"editFieldGroup:431":0,"(anonymous 19):445":0,"deleteFieldGroup:437":0,"(anonymous 21):463":0,"(anonymous 20):462":0,"editLabel:454":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 192;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 49;
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
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 163);
ControlForm = Y.Base.create('controlForm', Y.Base, [], {

    viewTemplate:
        '<div class="formContainer">' +
        '   <div class="formContainer_left">&nbsp;</div>' +
        '   <div class="formContainer_right">&nbsp;</div>' +
        '   <div class="formContainer_proxy">' +
        '       <div class="formContainer_proxy_arrow"></div>' +
        '   </div>' +
        '</div>',


    initializer: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "initializer", 175);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 176);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 178);
this.on('contextMenu:editLabel', this.editLabel);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 179);
this.on('contextMenu:deleteForm', this.deleteForm);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 180);
this.on('contextMenu:deleteFieldGroup', this.deleteFieldGroup);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 181);
this.on('contextMenu:editFieldGroup', this.editFieldGroup);
    },

    render: function(formsModel) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 184);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 185);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 187);
this.get('srcNode').setHTML(this.viewTemplate);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 189);
if (formsModel == null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 190);
formsModel = this.get('formsModel');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 192);
this.set('formsModel', formsModel);
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 195);
formsModel.sort();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 196);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 196);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 197);
self.renderForm(formItem);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 200);
this.fire('rendered');
    },

    renderForm: function(formItem) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 203);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 204);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 205);
var container = this.get('srcNode').one('div');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 206);
var fieldGroupOrder = formItem.get('fieldGroupOrder');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 207);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 208);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 210);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 211);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 213);
legend.set('innerHTML', form.get('caption'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 215);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 216);
formElement.addClass('editMode');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 218);
legend.plug(Y.Libbit.ContextMenu, {
                content: [
                    { title: 'Rename', id: 'editLabel' },
                    { title: '-' },
                    { title: 'Remove', id: 'deleteForm' }
                ],
                bubbleTarget: self
            });
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 228);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 229);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 231);
Y.Array.each(fieldGroupOrder, function(groupId) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 231);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 232);
Y.Array.each(fieldGroups, function(group) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 9)", 232);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 233);
if (groupId == group['id']) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 234);
self.addFieldGroup(formElement, group);
                }
            });
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 239);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 241);
container.one('.' + directionClassName).append(formElement);
    },

    addFieldGroup: function(formElement, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 244);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 245);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 246);
var list = Y.Node.create('<ol />');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 247);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 249);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 250);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 252);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 255);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 256);
var fieldGroupDD = new Y.DD.Drag({
                node: list,
                group: ['fieldGroup']
            }).plug(Y.Plugin.DDConstrained, {
                constrain2node: formElement
            }).plug(Y.Plugin.DDProxy, {
                moveOnEnd: false
            });

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 265);
fieldGroupDD.on('drag:start', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 10)", 265);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 266);
e.target.get('dragNode').setHTML('');
            });
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 268);
fieldGroupDD.on('drag:drag', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 11)", 268);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 269);
self.reOrderFieldGroupDD(e, formElement, list);
            });
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 271);
fieldGroupDD.on('drag:end', function(e) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 12)", 271);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 272);
self.reOrderFieldGroup(formElement);
            });
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 276);
list.set('id', fieldGroup['id']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 277);
list.setAttribute('name', fieldGroup['name']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 278);
list.on(['mouseover', 'mouseout'], function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 13)", 278);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 279);
if (e.type == 'mouseover') {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 280);
list.addClass('fieldGroupHighlight');
            } else {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 282);
list.removeClass('fieldGroupHighlight');
            }
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 286);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 14)", 286);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 287);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 288);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 289);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 291);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 293);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 295);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 296);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 298);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 301);
if (this.get('editMode')) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 302);
list.plug(Y.Libbit.ContextMenu, {
                content: [
                    { title: 'Edit', id: 'editFieldGroup' },
                    { title: '-' },
                    { title: 'Remove', id: 'deleteFieldGroup' }
                ],
                bubbleTarget: self
            });
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 312);
formElement.append(list);
    },

    reOrderFieldGroupDD: function(e, formElement, sender) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroupDD", 315);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 316);
var y = e.currentTarget.mouseXY[1];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 317);
var hit = false;

        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend
        // the dragNode before that element.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 321);
formElement.all('ol').each(function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 15)", 321);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 322);
if (sender.get('id') !== group.get('id')) { // Is this myself?
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 323);
var groupTop = group.getY();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 324);
var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 326);
if (y > groupTop && y < groupBottom) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 327);
sender.insertBefore(sender, group);

                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 329);
hit = true;
                }
            }
        });

        // If you are dragging at the bottom of the form, append the dragNode to the bottom.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 335);
if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 336);
formElement.append(sender);
        }
    },

    reOrderFieldGroup: function(formElement) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroup", 340);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 341);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 342);
var formId = formElement.get('name');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 343);
var fieldGroupOrder = [];

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 345);
formElement.all('ol').each(function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 16)", 345);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 346);
fieldGroupOrder.push(this.get('id'));
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 349);
formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 352);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 353);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 354);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 356);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 17)", 356);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 357);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 358);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 360);
fieldGroups.push(fieldGroup);
            }
        });
    },

    ddOver: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 365);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 366);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 368);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 369);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 370);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 373);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 377);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 378);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 379);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 380);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 382);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 383);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 384);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 388);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 389);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 391);
self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 392);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 393);
self.reOrderFieldGroup(formNode);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 395);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 396);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 400);
formNode.removeClass('ddOver');
    },

    toJSON: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "toJSON", 403);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 404);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 406);
return Y.JSON.stringify(formsModel);
    },

    addForm: function(title) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addForm", 409);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 410);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 412);
formsModel.addForm(title);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 414);
this.render();
    },

    deleteForm: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 417);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 418);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 419);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 420);
var formId = e.node.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 422);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the form "' + e.node.get('innerHTML') + '" and all its fieldgroups?',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 18)", 424);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 425);
formsModel.deleteForm(formId);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 426);
self.render();
            }
        );
    },

    editFieldGroup: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editFieldGroup", 431);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 432);
var fg = this.get('formsModel').getFieldGroup(e.node.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 434);
this.fire('editFieldGroup', { 'fieldGroup': fg });
    },

    deleteFieldGroup: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteFieldGroup", 437);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 438);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 439);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 440);
var formElement = e.node.get('parentNode');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 441);
var formId = formElement.get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 443);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the fieldgroup "' + e.node.getAttribute('name') + '"',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 19)", 445);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 446);
formsModel.deleteFieldGroup(formId, e.node.get('id'));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 448);
e.node.remove();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 449);
self.reOrderFieldGroup(formElement);
            }
        );
    },

    editLabel: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 454);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 455);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 456);
var legend = e.node;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 457);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 459);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 20)", 462);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 463);
self.get('formsModel').each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 21)", 463);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 464);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 465);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 467);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 468);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 472);
return true;
            },
            legend.get('text')
        );
    }
}, {
    ATTRS: {
        srcNode: { value: null },
        formsModel: { value: null },
        editMode: { value: false }
    }
});


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 486);
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
