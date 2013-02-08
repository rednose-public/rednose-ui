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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var Form;","","Form = Y.Base.create('form', Y.Model, [], {","","}, {","    ATTRS: {","        caption: { value: '' },","        fieldGroups: { value: [] }","    }","});","","Y.namespace('ControlForm').Form = Form;","var FormItem;","","FormItem = Y.Base.create('formItem', Y.Model, [], {","","","}, {","    ATTRS: {","        template: { value: null },","        sortOrder: { value: 0 },","        direction: { value: 'left' },","        controlForm: { value: null },","        fieldGroupOrder: { value: [] }","    }","});","","Y.namespace('ControlForm').FormItem = FormItem;","var FormItem = Y.ControlForm.FormItem,","    Form = Y.ControlForm.Form,","    FormItems;","","FormItems = Y.Base.create('formItems', Y.ModelList, [], {","    model: FormItem,","","    parse: function (response) {","        return response.map(function (controlFormItem) {","            if (controlFormItem.controlForm !== null) {","                controlFormItem.controlForm = new Form(controlFormItem.controlForm);","            }","","            return controlFormItem;","        });","    },","","    sync: function (action, options, callback) {","        var self = this;","","        if (action === 'read') {","            Y.io(Routing.generate('libbit_docgen_forms_list', options), {","                method: 'GET',","                on: {","                    success: function (tx, r) {","                        self.set('templateId', options['templateId']);","","                        callback(null, Y.JSON.parse(r.responseText));","                    }","                }","            });","        }","    },","","    comparator: function (model) {","        return model.get('sortOrder');","    },","","    setPosition: function(formId, sortOrder, direction) {","        this.updateProperty(formId, 'sortOrder', sortOrder);","        this.updateProperty(formId, 'direction', direction);","    },","","    updateProperty: function(formId, property, value) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.set(property, value);","            }","        });","    },","","    isModified: function() {","        // TODO...","        return true;","    },","","    addForm: function(title) {","        var self = this;","        var newForm = {","            id: 'tmp_' + Math.round((new Date()).getTime() / 1000) + (Math.round(Math.random()) * 999999),","            direction: 'left',","            controlForm: new self.model({","                caption: title,","                fieldGroups: []","            }),","            sortOrder: self.size(),","            template: self.get('templateId')","        };","","        self.add(newForm);","    },","","    deleteForm: function(formId) {","        var self = this;","","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                self.remove(formItem);","            }","        });","    }","}, {","    ATTRS: {","        templateId: { value: null }","    }","});","","Y.namespace('ControlForm').FormItems = FormItems;","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","","    viewTemplate:","        '<div class=\"formContainer\">' +","        '   <div class=\"formContainer_left\">&nbsp;</div>' +","        '   <div class=\"formContainer_right\">&nbsp;</div>' +","        '   <div class=\"formContainer_proxy\">' +","        '       <div class=\"formContainer_proxy_arrow\"></div>' +","        '   </div>' +","        '</div>',","","","    initializer: function() {","        this.on('contextMenu:editLabel', this.editLabel);","        this.on('contextMenu:deleteForm', this.deleteForm);","    },","","    render: function(formsModel) {","        var self = this;","","        this.get('srcNode').setHTML(this.viewTemplate);","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","","        this.fire('rendered');","    },","","    renderForm: function(formItem) {","        var self = this;","        var container = this.get('srcNode').one('div');","        var fieldGroupOrder = formItem.get('fieldGroupOrder');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","        legend.plug(Y.Libbit.ContextMenu, {","            content: [","                { label: 'Rename', eventName: 'editLabel' },","                { label: '-' },","                { label: 'Remove', eventName: 'deleteForm' }","            ],","            bubbleTarget: self","        });","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroupOrder, function(groupId) {","            Y.Array.each(fieldGroups, function(group) {","                if (groupId == group['id']) {","                    self.addFieldGroup(formElement, group);","                }","            });","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        container.one('.' + directionClassName).append(formElement);","    },","","    addFieldGroup: function(formElement, fieldGroup) {","        var self = this;","        var list = Y.Node.create('<ol />');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        var fieldGroupDD = new Y.DD.Drag({","            node: list,","            group: ['fieldGroup']","        }).plug(Y.Plugin.DDConstrained, {","            constrain2node: formElement","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd: false","        });","","        fieldGroupDD.on('drag:start', function(e) {","            e.target.get('dragNode').setHTML('');","        });","        fieldGroupDD.on('drag:drag', function(e) {","            self.reOrderFieldGroupDD(e, formElement, list);","        });","        fieldGroupDD.on('drag:end', function(e) {","            self.reOrderFieldGroup(formElement);","        });","","        list.set('id', fieldGroup['id']);","        list.on(['mouseover', 'mouseout'], function(e) {","            if (e.type == 'mouseover') {","                list.addClass('fieldGroupHighlight');","            } else {","                list.removeClass('fieldGroupHighlight');","            }","        });","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        formElement.append(list);","    },","","    reOrderFieldGroupDD: function(e, formElement, sender) {","        var y = e.currentTarget.mouseXY[1];","        var hit = false;","","        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend","        // the dragNode before that element.","        formElement.all('ol').each(function(group) {","            if (sender.get('id') !== group.get('id')) { // Is this myself?","                var groupTop = group.getY();","                var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));","","                if (y > groupTop && y < groupBottom) {","                    sender.insertBefore(sender, group);","","                    hit = true;","                }","            }","        });","","        // If you are dragging at the bottom of the form, append the dragNode to the bottom.","        if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {","            formElement.append(sender);","        }","    },","","    reOrderFieldGroup: function(formElement) {","        var formsModel = this.get('formsModel');","        var formId = formElement.get('name');","        var fieldGroupOrder = [];","","        formElement.all('ol').each(function() {","            fieldGroupOrder.push(this.get('id'));","        });","","        formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);","    },","","    addFieldGroupToModel: function(formId, fieldGroup) {","        var self = this;","        var formsModel = this.get('formsModel');","","        formsModel.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm) {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm) {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","            self.reOrderFieldGroup(formNode);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    toJSON: function() {","        var formsModel = this.get('formsModel');","","        return Y.JSON.stringify(formsModel);","    },","","    addForm: function(title) {","        var formsModel = this.get('formsModel');","","        formsModel.addForm(title);","","        this.render();","    },","","    deleteForm: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formId = e.node.get('parentNode').get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the form \"' + e.node.get('innerHTML') + '\" and all its fieldgroups?',","            function() {","                formsModel.deleteForm(formId);","                self.render();","            }","        );","    },","","    editLabel: function(e) {","        var self = this;","        var legend = e.node;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.get('formsModel').each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    }","}, {","    ATTRS: {","        srcNode: { value: null },","        formsModel: { value: null },","        editMode: { value: false }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {","    \"requires\": [","        \"dd-proxy\",","        \"dd-constrain\",","        \"node\",","        \"model-list\",","        \"model\",","        \"base\",","        \"libbit-dialog\",","        \"libbit-contextmenu\"","    ]","});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"14":0,"15":0,"17":0,"30":0,"31":0,"35":0,"39":0,"40":0,"41":0,"44":0,"49":0,"51":0,"52":0,"56":0,"58":0,"66":0,"70":0,"71":0,"75":0,"76":0,"77":0,"84":0,"88":0,"89":0,"100":0,"104":0,"106":0,"107":0,"108":0,"118":0,"119":0,"121":0,"134":0,"135":0,"139":0,"141":0,"143":0,"144":0,"146":0,"149":0,"150":0,"151":0,"154":0,"158":0,"159":0,"160":0,"161":0,"162":0,"164":0,"165":0,"167":0,"168":0,"177":0,"178":0,"180":0,"181":0,"182":0,"183":0,"188":0,"190":0,"194":0,"195":0,"196":0,"198":0,"199":0,"201":0,"204":0,"213":0,"214":0,"216":0,"217":0,"219":0,"220":0,"223":0,"224":0,"225":0,"226":0,"228":0,"232":0,"233":0,"234":0,"235":0,"237":0,"239":0,"241":0,"242":0,"244":0,"247":0,"251":0,"252":0,"256":0,"257":0,"258":0,"259":0,"261":0,"262":0,"264":0,"270":0,"271":0,"276":0,"277":0,"278":0,"280":0,"281":0,"284":0,"288":0,"289":0,"291":0,"292":0,"293":0,"295":0,"301":0,"303":0,"304":0,"305":0,"308":0,"313":0,"314":0,"315":0,"317":0,"318":0,"319":0,"323":0,"324":0,"326":0,"327":0,"328":0,"330":0,"331":0,"335":0,"339":0,"341":0,"345":0,"347":0,"349":0,"353":0,"354":0,"355":0,"357":0,"360":0,"361":0,"367":0,"368":0,"369":0,"371":0,"375":0,"376":0,"377":0,"379":0,"380":0,"384":0,"398":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"(anonymous 2):39":0,"parse:38":0,"success:55":0,"sync:48":0,"comparator:65":0,"setPosition:69":0,"(anonymous 3):75":0,"updateProperty:74":0,"isModified:82":0,"addForm:87":0,"(anonymous 4):106":0,"deleteForm:103":0,"initializer:133":0,"(anonymous 5):150":0,"render:138":0,"(anonymous 7):181":0,"(anonymous 6):180":0,"renderForm:157":0,"(anonymous 8):213":0,"(anonymous 9):216":0,"(anonymous 10):219":0,"(anonymous 11):224":0,"(anonymous 12):232":0,"addFieldGroup:193":0,"(anonymous 13):256":0,"reOrderFieldGroupDD:250":0,"(anonymous 14):280":0,"reOrderFieldGroup:275":0,"(anonymous 15):291":0,"addFieldGroupToModel:287":0,"ddOver:300":0,"ddDrop:312":0,"toJSON:338":0,"addForm:344":0,"(anonymous 16):359":0,"deleteForm:352":0,"(anonymous 18):375":0,"(anonymous 17):374":0,"editLabel:366":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 155;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 40;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 1);
YUI.add('libbit-controlform', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 3);
var Form;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 5);
Form = Y.Base.create('form', Y.Model, [], {

}, {
    ATTRS: {
        caption: { value: '' },
        fieldGroups: { value: [] }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 14);
Y.namespace('ControlForm').Form = Form;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 15);
var FormItem;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 17);
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

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 30);
Y.namespace('ControlForm').FormItem = FormItem;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 31);
var FormItem = Y.ControlForm.FormItem,
    Form = Y.ControlForm.Form,
    FormItems;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 35);
FormItems = Y.Base.create('formItems', Y.ModelList, [], {
    model: FormItem,

    parse: function (response) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "parse", 38);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 39);
return response.map(function (controlFormItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 39);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 40);
if (controlFormItem.controlForm !== null) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 41);
controlFormItem.controlForm = new Form(controlFormItem.controlForm);
            }

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 44);
return controlFormItem;
        });
    },

    sync: function (action, options, callback) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "sync", 48);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 49);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 51);
if (action === 'read') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 52);
Y.io(Routing.generate('libbit_docgen_forms_list', options), {
                method: 'GET',
                on: {
                    success: function (tx, r) {
                        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "success", 55);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 56);
self.set('templateId', options['templateId']);

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 58);
callback(null, Y.JSON.parse(r.responseText));
                    }
                }
            });
        }
    },

    comparator: function (model) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "comparator", 65);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 66);
return model.get('sortOrder');
    },

    setPosition: function(formId, sortOrder, direction) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "setPosition", 69);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 70);
this.updateProperty(formId, 'sortOrder', sortOrder);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 71);
this.updateProperty(formId, 'direction', direction);
    },

    updateProperty: function(formId, property, value) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "updateProperty", 74);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 75);
this.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 75);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 76);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 77);
formItem.set(property, value);
            }
        });
    },

    isModified: function() {
        // TODO...
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "isModified", 82);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 84);
return true;
    },

    addForm: function(title) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addForm", 87);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 88);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 89);
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

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 100);
self.add(newForm);
    },

    deleteForm: function(formId) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 103);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 104);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 106);
this.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 4)", 106);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 107);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 108);
self.remove(formItem);
            }
        });
    }
}, {
    ATTRS: {
        templateId: { value: null }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 118);
Y.namespace('ControlForm').FormItems = FormItems;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 119);
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 121);
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
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "initializer", 133);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 134);
this.on('contextMenu:editLabel', this.editLabel);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 135);
this.on('contextMenu:deleteForm', this.deleteForm);
    },

    render: function(formsModel) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 138);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 139);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 141);
this.get('srcNode').setHTML(this.viewTemplate);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 143);
if (formsModel == null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 144);
formsModel = this.get('formsModel');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 146);
this.set('formsModel', formsModel);
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 149);
formsModel.sort();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 150);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 5)", 150);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 151);
self.renderForm(formItem);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 154);
this.fire('rendered');
    },

    renderForm: function(formItem) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 157);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 158);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 159);
var container = this.get('srcNode').one('div');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 160);
var fieldGroupOrder = formItem.get('fieldGroupOrder');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 161);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 162);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 164);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 165);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 167);
legend.set('innerHTML', form.get('caption'));
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 168);
legend.plug(Y.Libbit.ContextMenu, {
            content: [
                { label: 'Rename', eventName: 'editLabel' },
                { label: '-' },
                { label: 'Remove', eventName: 'deleteForm' }
            ],
            bubbleTarget: self
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 177);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 178);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 180);
Y.Array.each(fieldGroupOrder, function(groupId) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 6)", 180);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 181);
Y.Array.each(fieldGroups, function(group) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 181);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 182);
if (groupId == group['id']) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 183);
self.addFieldGroup(formElement, group);
                }
            });
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 188);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 190);
container.one('.' + directionClassName).append(formElement);
    },

    addFieldGroup: function(formElement, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 193);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 194);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 195);
var list = Y.Node.create('<ol />');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 196);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 198);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 199);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 201);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 204);
var fieldGroupDD = new Y.DD.Drag({
            node: list,
            group: ['fieldGroup']
        }).plug(Y.Plugin.DDConstrained, {
            constrain2node: formElement
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd: false
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 213);
fieldGroupDD.on('drag:start', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 213);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 214);
e.target.get('dragNode').setHTML('');
        });
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 216);
fieldGroupDD.on('drag:drag', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 9)", 216);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 217);
self.reOrderFieldGroupDD(e, formElement, list);
        });
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 219);
fieldGroupDD.on('drag:end', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 10)", 219);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 220);
self.reOrderFieldGroup(formElement);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 223);
list.set('id', fieldGroup['id']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 224);
list.on(['mouseover', 'mouseout'], function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 11)", 224);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 225);
if (e.type == 'mouseover') {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 226);
list.addClass('fieldGroupHighlight');
            } else {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 228);
list.removeClass('fieldGroupHighlight');
            }
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 232);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 12)", 232);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 233);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 234);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 235);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 237);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 239);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 241);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 242);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 244);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 247);
formElement.append(list);
    },

    reOrderFieldGroupDD: function(e, formElement, sender) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroupDD", 250);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 251);
var y = e.currentTarget.mouseXY[1];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 252);
var hit = false;

        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend
        // the dragNode before that element.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 256);
formElement.all('ol').each(function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 13)", 256);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 257);
if (sender.get('id') !== group.get('id')) { // Is this myself?
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 258);
var groupTop = group.getY();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 259);
var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 261);
if (y > groupTop && y < groupBottom) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 262);
sender.insertBefore(sender, group);

                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 264);
hit = true;
                }
            }
        });

        // If you are dragging at the bottom of the form, append the dragNode to the bottom.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 270);
if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 271);
formElement.append(sender);
        }
    },

    reOrderFieldGroup: function(formElement) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroup", 275);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 276);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 277);
var formId = formElement.get('name');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 278);
var fieldGroupOrder = [];

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 280);
formElement.all('ol').each(function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 14)", 280);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 281);
fieldGroupOrder.push(this.get('id'));
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 284);
formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 287);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 288);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 289);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 291);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 15)", 291);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 292);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 293);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 295);
fieldGroups.push(fieldGroup);
            }
        });
    },

    ddOver: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 300);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 301);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 303);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 304);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 305);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 308);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 312);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 313);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 314);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 315);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 317);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 318);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 319);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 323);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 324);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 326);
self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 327);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 328);
self.reOrderFieldGroup(formNode);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 330);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 331);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 335);
formNode.removeClass('ddOver');
    },

    toJSON: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "toJSON", 338);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 339);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 341);
return Y.JSON.stringify(formsModel);
    },

    addForm: function(title) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addForm", 344);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 345);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 347);
formsModel.addForm(title);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 349);
this.render();
    },

    deleteForm: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 352);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 353);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 354);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 355);
var formId = e.node.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 357);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the form "' + e.node.get('innerHTML') + '" and all its fieldgroups?',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 16)", 359);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 360);
formsModel.deleteForm(formId);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 361);
self.render();
            }
        );
    },

    editLabel: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 366);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 367);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 368);
var legend = e.node;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 369);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 371);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 17)", 374);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 375);
self.get('formsModel').each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 18)", 375);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 376);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 377);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 379);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 380);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 384);
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


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 398);
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
