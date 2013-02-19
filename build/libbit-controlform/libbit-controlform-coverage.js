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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var Form;","","Form = Y.Base.create('form', Y.Model, [], {","","    removeFieldGroup: function(fgId) {","        for (var i in this.get('fieldGroups')) {","            if (this.get('fieldGroups')[i]['id'] == fgId) {","                var fieldGroups = this.get('fieldGroups');","                ","                fieldGroups.splice(i, 1);","","                this.set('fieldGroups', fieldGroups);","            }","        }","    }","","}, {","    ATTRS: {","        caption: { value: '' },","        fieldGroups: { value: [] }","    }","});","","Y.namespace('ControlForm').Form = Form;","var FormItem;","","FormItem = Y.Base.create('formItem', Y.Model, [], {","    ","}, {","    ATTRS: {","        template: { value: null },","        sortOrder: { value: 0 },","        direction: { value: 'left' },","        controlForm: { value: null },","        fieldGroupOrder: { value: [] }","    }","});","","Y.namespace('ControlForm').FormItem = FormItem;","var FormItem = Y.ControlForm.FormItem,","    Form = Y.ControlForm.Form,","    FormItems;","","FormItems = Y.Base.create('formItems', Y.ModelList, [], {","    model: FormItem,","","    parse: function (response) {","        return response.map(function (controlFormItem) {","            if (controlFormItem.controlForm !== null) {","                controlFormItem.controlForm = new Form(controlFormItem.controlForm);","            }","","            return controlFormItem;","        });","    },","","    sync: function (action, options, callback) {","        var self = this;","","        if (action === 'read') {","            Y.io(Routing.generate('libbit_docgen_forms_list', options), {","                method: 'GET',","                on: {","                    success: function (tx, r) {","                        self.set('templateId', options['templateId']);","","                        callback(null, Y.JSON.parse(r.responseText));","                    }","                }","            });","        }","    },","","    comparator: function (model) {","        return model.get('sortOrder');","    },","","    setPosition: function(formId, sortOrder, direction) {","        this.updateProperty(formId, 'sortOrder', sortOrder);","        this.updateProperty(formId, 'direction', direction);","    },","","    updateProperty: function(formId, property, value) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.set(property, value);","            }","        });","    },","","    isModified: function() {","        // TODO...","        return true;","    },","","    addForm: function(title) {","        var self = this;","        var newForm = {","            id: 'tmp_' + Math.round((new Date()).getTime() / 1000) + (Math.round(Math.random()) * 999999),","            direction: 'left',","            controlForm: new self.model({","                caption: title,","                fieldGroups: []","            }),","            sortOrder: self.size(),","            template: self.get('templateId')","        };","","        self.add(newForm);","    },","","    deleteForm: function(formId) {","        var self = this;","","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                self.remove(formItem);","            }","        });","    },","    ","    deleteFieldGroup: function(formId, fgId) {","        this.each(function(formItem) {","            if (formItem.get('id') == formId) {","                formItem.get('controlForm').removeFieldGroup(fgId);","            }","        });","    }","}, {","    ATTRS: {","        templateId: { value: null }","    }","});","","Y.namespace('ControlForm').FormItems = FormItems;","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","","    viewTemplate:","        '<div class=\"formContainer\">' +","        '   <div class=\"formContainer_left\">&nbsp;</div>' +","        '   <div class=\"formContainer_right\">&nbsp;</div>' +","        '   <div class=\"formContainer_proxy\">' +","        '       <div class=\"formContainer_proxy_arrow\"></div>' +","        '   </div>' +","        '</div>',","","","    initializer: function() {","        this.on('contextMenu:editLabel', this.editLabel);","        this.on('contextMenu:deleteForm', this.deleteForm);","        this.on('contextMenu:deleteFieldGroup', this.deleteFieldGroup);","    },","","    render: function(formsModel) {","        var self = this;","","        this.get('srcNode').setHTML(this.viewTemplate);","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","","        this.fire('rendered');","    },","","    renderForm: function(formItem) {","        var self = this;","        var container = this.get('srcNode').one('div');","        var fieldGroupOrder = formItem.get('fieldGroupOrder');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","        legend.plug(Y.Libbit.ContextMenu, {","            content: [","                { label: 'Rename', eventName: 'editLabel' },","                { label: '-' },","                { label: 'Remove', eventName: 'deleteForm' }","            ],","            bubbleTarget: self","        });","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroupOrder, function(groupId) {","            Y.Array.each(fieldGroups, function(group) {","                if (groupId == group['id']) {","                    self.addFieldGroup(formElement, group);","                }","            });","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        container.one('.' + directionClassName).append(formElement);","    },","","    addFieldGroup: function(formElement, fieldGroup) {","        var self = this;","        var list = Y.Node.create('<ol />');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        var fieldGroupDD = new Y.DD.Drag({","            node: list,","            group: ['fieldGroup']","        }).plug(Y.Plugin.DDConstrained, {","            constrain2node: formElement","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd: false","        });","","        fieldGroupDD.on('drag:start', function(e) {","            e.target.get('dragNode').setHTML('');","        });","        fieldGroupDD.on('drag:drag', function(e) {","            self.reOrderFieldGroupDD(e, formElement, list);","        });","        fieldGroupDD.on('drag:end', function(e) {","            self.reOrderFieldGroup(formElement);","        });","","        list.set('id', fieldGroup['id']);","        list.setAttribute('name', fieldGroup['name']);","        list.on(['mouseover', 'mouseout'], function(e) {","            if (e.type == 'mouseover') {","                list.addClass('fieldGroupHighlight');","            } else {","                list.removeClass('fieldGroupHighlight');","            }","        });","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        list.plug(Y.Libbit.ContextMenu, {","            content: [","                { label: 'Edit', eventName: 'editFieldGroup' },","                { label: '-' },","                { label: 'Remove', eventName: 'deleteFieldGroup' }","            ],","            bubbleTarget: self","        });","","        formElement.append(list);","    },","","    reOrderFieldGroupDD: function(e, formElement, sender) {","        var y = e.currentTarget.mouseXY[1];","        var hit = false;","","        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend","        // the dragNode before that element.","        formElement.all('ol').each(function(group) {","            if (sender.get('id') !== group.get('id')) { // Is this myself?","                var groupTop = group.getY();","                var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));","","                if (y > groupTop && y < groupBottom) {","                    sender.insertBefore(sender, group);","","                    hit = true;","                }","            }","        });","","        // If you are dragging at the bottom of the form, append the dragNode to the bottom.","        if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {","            formElement.append(sender);","        }","    },","","    reOrderFieldGroup: function(formElement) {","        var formsModel = this.get('formsModel');","        var formId = formElement.get('name');","        var fieldGroupOrder = [];","","        formElement.all('ol').each(function() {","            fieldGroupOrder.push(this.get('id'));","        });","","        formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);","    },","","    addFieldGroupToModel: function(formId, fieldGroup) {","        var self = this;","        var formsModel = this.get('formsModel');","","        formsModel.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm) {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm) {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","            self.reOrderFieldGroup(formNode);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    toJSON: function() {","        var formsModel = this.get('formsModel');","","        return Y.JSON.stringify(formsModel);","    },","","    addForm: function(title) {","        var formsModel = this.get('formsModel');","","        formsModel.addForm(title);","","        this.render();","    },","","    deleteForm: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formId = e.node.get('parentNode').get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the form \"' + e.node.get('innerHTML') + '\" and all its fieldgroups?',","            function() {","                formsModel.deleteForm(formId);","                self.render();","            }","        );","    },","","    deleteFieldGroup: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formElement = e.node.get('parentNode');","        var formId = formElement.get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the fieldgroup \"' + e.node.getAttribute('name') + '\"',","            function() {","                formsModel.deleteFieldGroup(formId, e.node.get('id'));","","                e.node.remove();","                self.reOrderFieldGroup(formElement);","            }","        );","    },","","    editLabel: function(e) {","        var self = this;","        var legend = e.node;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.get('formsModel').each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    }","}, {","    ATTRS: {","        srcNode: { value: null },","        formsModel: { value: null },","        editMode: { value: false }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {","    \"requires\": [","        \"dd-proxy\",","        \"dd-constrain\",","        \"node\",","        \"model-list\",","        \"model\",","        \"base\",","        \"libbit-dialog\",","        \"libbit-contextmenu\"","    ]","});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"9":0,"10":0,"12":0,"14":0,"26":0,"27":0,"29":0,"41":0,"42":0,"46":0,"50":0,"51":0,"52":0,"55":0,"60":0,"62":0,"63":0,"67":0,"69":0,"77":0,"81":0,"82":0,"86":0,"87":0,"88":0,"95":0,"99":0,"100":0,"111":0,"115":0,"117":0,"118":0,"119":0,"125":0,"126":0,"127":0,"137":0,"138":0,"140":0,"153":0,"154":0,"155":0,"159":0,"161":0,"163":0,"164":0,"166":0,"169":0,"170":0,"171":0,"174":0,"178":0,"179":0,"180":0,"181":0,"182":0,"184":0,"185":0,"187":0,"188":0,"197":0,"198":0,"200":0,"201":0,"202":0,"203":0,"208":0,"210":0,"214":0,"215":0,"216":0,"218":0,"219":0,"221":0,"224":0,"233":0,"234":0,"236":0,"237":0,"239":0,"240":0,"243":0,"244":0,"245":0,"246":0,"247":0,"249":0,"253":0,"254":0,"255":0,"256":0,"258":0,"260":0,"262":0,"263":0,"265":0,"268":0,"277":0,"281":0,"282":0,"286":0,"287":0,"288":0,"289":0,"291":0,"292":0,"294":0,"300":0,"301":0,"306":0,"307":0,"308":0,"310":0,"311":0,"314":0,"318":0,"319":0,"321":0,"322":0,"323":0,"325":0,"331":0,"333":0,"334":0,"335":0,"338":0,"343":0,"344":0,"345":0,"347":0,"348":0,"349":0,"353":0,"354":0,"356":0,"357":0,"358":0,"360":0,"361":0,"365":0,"369":0,"371":0,"375":0,"377":0,"379":0,"383":0,"384":0,"385":0,"387":0,"390":0,"391":0,"397":0,"398":0,"399":0,"400":0,"402":0,"405":0,"407":0,"408":0,"414":0,"415":0,"416":0,"418":0,"422":0,"423":0,"424":0,"426":0,"427":0,"431":0,"445":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"removeFieldGroup:7":0,"(anonymous 2):50":0,"parse:49":0,"success:66":0,"sync:59":0,"comparator:76":0,"setPosition:80":0,"(anonymous 3):86":0,"updateProperty:85":0,"isModified:93":0,"addForm:98":0,"(anonymous 4):117":0,"deleteForm:114":0,"(anonymous 5):125":0,"deleteFieldGroup:124":0,"initializer:152":0,"(anonymous 6):170":0,"render:158":0,"(anonymous 8):201":0,"(anonymous 7):200":0,"renderForm:177":0,"(anonymous 9):233":0,"(anonymous 10):236":0,"(anonymous 11):239":0,"(anonymous 12):245":0,"(anonymous 13):253":0,"addFieldGroup:213":0,"(anonymous 14):286":0,"reOrderFieldGroupDD:280":0,"(anonymous 15):310":0,"reOrderFieldGroup:305":0,"(anonymous 16):321":0,"addFieldGroupToModel:317":0,"ddOver:330":0,"ddDrop:342":0,"toJSON:368":0,"addForm:374":0,"(anonymous 17):389":0,"deleteForm:382":0,"(anonymous 18):404":0,"deleteFieldGroup:396":0,"(anonymous 20):422":0,"(anonymous 19):421":0,"editLabel:413":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 174;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 45;
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
    }

}, {
    ATTRS: {
        caption: { value: '' },
        fieldGroups: { value: [] }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 26);
Y.namespace('ControlForm').Form = Form;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 27);
var FormItem;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 29);
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

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 41);
Y.namespace('ControlForm').FormItem = FormItem;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 42);
var FormItem = Y.ControlForm.FormItem,
    Form = Y.ControlForm.Form,
    FormItems;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 46);
FormItems = Y.Base.create('formItems', Y.ModelList, [], {
    model: FormItem,

    parse: function (response) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "parse", 49);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 50);
return response.map(function (controlFormItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 50);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 51);
if (controlFormItem.controlForm !== null) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 52);
controlFormItem.controlForm = new Form(controlFormItem.controlForm);
            }

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 55);
return controlFormItem;
        });
    },

    sync: function (action, options, callback) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "sync", 59);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 60);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 62);
if (action === 'read') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 63);
Y.io(Routing.generate('libbit_docgen_forms_list', options), {
                method: 'GET',
                on: {
                    success: function (tx, r) {
                        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "success", 66);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 67);
self.set('templateId', options['templateId']);

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 69);
callback(null, Y.JSON.parse(r.responseText));
                    }
                }
            });
        }
    },

    comparator: function (model) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "comparator", 76);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 77);
return model.get('sortOrder');
    },

    setPosition: function(formId, sortOrder, direction) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "setPosition", 80);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 81);
this.updateProperty(formId, 'sortOrder', sortOrder);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 82);
this.updateProperty(formId, 'direction', direction);
    },

    updateProperty: function(formId, property, value) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "updateProperty", 85);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 86);
this.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 86);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 87);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 88);
formItem.set(property, value);
            }
        });
    },

    isModified: function() {
        // TODO...
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "isModified", 93);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 95);
return true;
    },

    addForm: function(title) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addForm", 98);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 99);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 100);
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

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 111);
self.add(newForm);
    },

    deleteForm: function(formId) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 114);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 115);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 117);
this.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 4)", 117);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 118);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 119);
self.remove(formItem);
            }
        });
    },
    
    deleteFieldGroup: function(formId, fgId) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteFieldGroup", 124);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 125);
this.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 5)", 125);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 126);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 127);
formItem.get('controlForm').removeFieldGroup(fgId);
            }
        });
    }
}, {
    ATTRS: {
        templateId: { value: null }
    }
});

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 137);
Y.namespace('ControlForm').FormItems = FormItems;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 138);
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 140);
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
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "initializer", 152);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 153);
this.on('contextMenu:editLabel', this.editLabel);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 154);
this.on('contextMenu:deleteForm', this.deleteForm);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 155);
this.on('contextMenu:deleteFieldGroup', this.deleteFieldGroup);
    },

    render: function(formsModel) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 158);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 159);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 161);
this.get('srcNode').setHTML(this.viewTemplate);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 163);
if (formsModel == null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 164);
formsModel = this.get('formsModel');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 166);
this.set('formsModel', formsModel);
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 169);
formsModel.sort();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 170);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 6)", 170);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 171);
self.renderForm(formItem);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 174);
this.fire('rendered');
    },

    renderForm: function(formItem) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 177);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 178);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 179);
var container = this.get('srcNode').one('div');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 180);
var fieldGroupOrder = formItem.get('fieldGroupOrder');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 181);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 182);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 184);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 185);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 187);
legend.set('innerHTML', form.get('caption'));
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 188);
legend.plug(Y.Libbit.ContextMenu, {
            content: [
                { label: 'Rename', eventName: 'editLabel' },
                { label: '-' },
                { label: 'Remove', eventName: 'deleteForm' }
            ],
            bubbleTarget: self
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 197);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 198);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 200);
Y.Array.each(fieldGroupOrder, function(groupId) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 200);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 201);
Y.Array.each(fieldGroups, function(group) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 201);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 202);
if (groupId == group['id']) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 203);
self.addFieldGroup(formElement, group);
                }
            });
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 208);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 210);
container.one('.' + directionClassName).append(formElement);
    },

    addFieldGroup: function(formElement, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 213);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 214);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 215);
var list = Y.Node.create('<ol />');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 216);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 218);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 219);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 221);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 224);
var fieldGroupDD = new Y.DD.Drag({
            node: list,
            group: ['fieldGroup']
        }).plug(Y.Plugin.DDConstrained, {
            constrain2node: formElement
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd: false
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 233);
fieldGroupDD.on('drag:start', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 9)", 233);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 234);
e.target.get('dragNode').setHTML('');
        });
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 236);
fieldGroupDD.on('drag:drag', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 10)", 236);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 237);
self.reOrderFieldGroupDD(e, formElement, list);
        });
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 239);
fieldGroupDD.on('drag:end', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 11)", 239);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 240);
self.reOrderFieldGroup(formElement);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 243);
list.set('id', fieldGroup['id']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 244);
list.setAttribute('name', fieldGroup['name']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 245);
list.on(['mouseover', 'mouseout'], function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 12)", 245);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 246);
if (e.type == 'mouseover') {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 247);
list.addClass('fieldGroupHighlight');
            } else {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 249);
list.removeClass('fieldGroupHighlight');
            }
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 253);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 13)", 253);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 254);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 255);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 256);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 258);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 260);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 262);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 263);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 265);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 268);
list.plug(Y.Libbit.ContextMenu, {
            content: [
                { label: 'Edit', eventName: 'editFieldGroup' },
                { label: '-' },
                { label: 'Remove', eventName: 'deleteFieldGroup' }
            ],
            bubbleTarget: self
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 277);
formElement.append(list);
    },

    reOrderFieldGroupDD: function(e, formElement, sender) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroupDD", 280);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 281);
var y = e.currentTarget.mouseXY[1];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 282);
var hit = false;

        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend
        // the dragNode before that element.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 286);
formElement.all('ol').each(function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 14)", 286);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 287);
if (sender.get('id') !== group.get('id')) { // Is this myself?
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 288);
var groupTop = group.getY();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 289);
var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 291);
if (y > groupTop && y < groupBottom) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 292);
sender.insertBefore(sender, group);

                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 294);
hit = true;
                }
            }
        });

        // If you are dragging at the bottom of the form, append the dragNode to the bottom.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 300);
if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 301);
formElement.append(sender);
        }
    },

    reOrderFieldGroup: function(formElement) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroup", 305);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 306);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 307);
var formId = formElement.get('name');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 308);
var fieldGroupOrder = [];

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 310);
formElement.all('ol').each(function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 15)", 310);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 311);
fieldGroupOrder.push(this.get('id'));
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 314);
formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 317);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 318);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 319);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 321);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 16)", 321);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 322);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 323);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 325);
fieldGroups.push(fieldGroup);
            }
        });
    },

    ddOver: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 330);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 331);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 333);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 334);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 335);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 338);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 342);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 343);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 344);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 345);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 347);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 348);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 349);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 353);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 354);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 356);
self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 357);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 358);
self.reOrderFieldGroup(formNode);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 360);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 361);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 365);
formNode.removeClass('ddOver');
    },

    toJSON: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "toJSON", 368);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 369);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 371);
return Y.JSON.stringify(formsModel);
    },

    addForm: function(title) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addForm", 374);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 375);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 377);
formsModel.addForm(title);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 379);
this.render();
    },

    deleteForm: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 382);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 383);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 384);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 385);
var formId = e.node.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 387);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the form "' + e.node.get('innerHTML') + '" and all its fieldgroups?',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 17)", 389);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 390);
formsModel.deleteForm(formId);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 391);
self.render();
            }
        );
    },

    deleteFieldGroup: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteFieldGroup", 396);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 397);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 398);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 399);
var formElement = e.node.get('parentNode');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 400);
var formId = formElement.get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 402);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the fieldgroup "' + e.node.getAttribute('name') + '"',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 18)", 404);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 405);
formsModel.deleteFieldGroup(formId, e.node.get('id'));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 407);
e.node.remove();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 408);
self.reOrderFieldGroup(formElement);
            }
        );
    },

    editLabel: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 413);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 414);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 415);
var legend = e.node;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 416);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 418);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 19)", 421);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 422);
self.get('formsModel').each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 20)", 422);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 423);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 424);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 426);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 427);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 431);
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


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 445);
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
