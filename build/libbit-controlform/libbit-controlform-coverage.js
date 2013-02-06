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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","","    initializer: function() {","        this.on('contextMenu:editLabel', this.editLabel);","        this.on('contextMenu:deleteForm', this.deleteForm);","    },","","    render: function(formsModel) {","        var self = this;","console.log('call');","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","    },","","    renderForm: function(formItem) {","        var self = this;","        var container = this.get('formContainer');","        var fieldGroupOrder = formItem.get('fieldGroupOrder');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","        legend.plug(Y.Libbit.ContextMenu, {","            content: [","                { label: 'Rename', eventName: 'editLabel' },","                { label: '-' },","                { label: 'Remove', eventName: 'deleteForm' }","            ],","            bubbleTarget: self","        });","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroupOrder, function(groupId) {","            Y.Array.each(fieldGroups, function(group) {","                if (groupId == group['id']) {","                    self.addFieldGroup(formElement, group);","                }","            });","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        // If a direction container is found, append the form to it.","        if (container.one('.' + directionClassName) != null) {","            container.one('.' + directionClassName).append(formElement);","        } else {","            // And if not ...","            container.append(formElement);","        }","    },","","    addFieldGroup: function(formElement, fieldGroup) {","        var self = this;","        var list = Y.Node.create('<ol />');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        var fieldGroupDD = new Y.DD.Drag({","            node: list,","            group: ['fieldGroup']","        }).plug(Y.Plugin.DDConstrained, {","            constrain2node: formElement","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd: false","        });","","        fieldGroupDD.on('drag:start', function(e) {","            e.target.get('dragNode').setHTML('');","        });","        fieldGroupDD.on('drag:drag', function(e) {","            self.reOrderFieldGroupDD(e, formElement, list);","        });","        fieldGroupDD.on('drag:end', function(e) {","            self.reOrderFieldGroup(formElement);","        });","","        list.set('id', fieldGroup['id']);","        list.on(['mouseover', 'mouseout'], function(e) {","            if (e.type == 'mouseover') {","                list.addClass('fieldGroupHighlight');","            } else {","                list.removeClass('fieldGroupHighlight');","            }","        });","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        formElement.append(list);","    },","","    reOrderFieldGroupDD: function(e, formElement, sender) {","        var y = e.currentTarget.mouseXY[1];","        var hit = false;","","        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend","        // the dragNode before that element.","        formElement.all('ol').each(function(group) {","            if (sender.get('id') !== group.get('id')) { // Is this myself?","                var groupTop = group.getY();","                var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));","","                if (y > groupTop && y < groupBottom) {","                    sender.insertBefore(sender, group);","","                    hit = true;","                }","            }","        });","","        // If you are dragging at the bottom of the form, append the dragNode to the bottom.","        if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {","            formElement.append(sender);","        }","    },","","    reOrderFieldGroup: function(formElement) {","        var formsModel = this.get('formsModel');","        var formId = formElement.get('name');","        var fieldGroupOrder = [];","","        formElement.all('ol').each(function() {","            fieldGroupOrder.push(this.get('id'));","        });","","        formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);","    },","","    addFieldGroupToModel: function(formId, fieldGroup) {","        var self = this;","        var formsModel = this.get('formsModel');","","        formsModel.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm) {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm) {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","            self.reOrderFieldGroup(formNode);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    toJSON: function() {","        var formsModel = this.get('formsModel');","","        return Y.JSON.stringify(formsModel);","    },","","    deleteForm: function(e) {","        var self = this;","        var formsModel = this.get('formsModel');","        var formId = e.node.get('parentNode').get('name');","","        Y.Libbit.Dialog.confirm(","            'Delete', 'Delete the form \"' + e.node.get('innerHTML') + '\" and all its fieldgroups?',","            function() {","                formsModel.deleteForm(formId);","                self.render();","            }","        );","    },","","    editLabel: function(e) {","        var self = this;","        var legend = e.node;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.get('formsModel').each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    }","}, {","    ATTRS: {","        formContainer: { value: null },","        formsModel: { value: null }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {","    \"requires\": [","        \"dd-proxy\",","        \"dd-constrain\",","        \"node\",","        \"model-list\",","        \"model\",","        \"base\",","        \"libbit-dialog\",","        \"libbit-contextmenu\"","    ]","});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"9":0,"13":0,"14":0,"15":0,"16":0,"18":0,"21":0,"22":0,"23":0,"28":0,"29":0,"30":0,"31":0,"32":0,"34":0,"35":0,"37":0,"38":0,"47":0,"48":0,"50":0,"51":0,"52":0,"53":0,"58":0,"61":0,"62":0,"65":0,"70":0,"71":0,"72":0,"74":0,"75":0,"77":0,"80":0,"89":0,"90":0,"92":0,"93":0,"95":0,"96":0,"99":0,"100":0,"101":0,"102":0,"104":0,"108":0,"109":0,"110":0,"111":0,"113":0,"115":0,"117":0,"118":0,"120":0,"123":0,"127":0,"128":0,"132":0,"133":0,"134":0,"135":0,"137":0,"138":0,"140":0,"146":0,"147":0,"152":0,"153":0,"154":0,"156":0,"157":0,"160":0,"164":0,"165":0,"167":0,"168":0,"169":0,"171":0,"177":0,"179":0,"180":0,"181":0,"184":0,"189":0,"190":0,"191":0,"193":0,"194":0,"195":0,"199":0,"200":0,"202":0,"203":0,"204":0,"206":0,"207":0,"211":0,"215":0,"217":0,"221":0,"222":0,"223":0,"225":0,"228":0,"229":0,"235":0,"236":0,"237":0,"239":0,"243":0,"244":0,"245":0,"247":0,"248":0,"252":0,"265":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"initializer:7":0,"(anonymous 2):22":0,"render:12":0,"(anonymous 4):51":0,"(anonymous 3):50":0,"renderForm:27":0,"(anonymous 5):89":0,"(anonymous 6):92":0,"(anonymous 7):95":0,"(anonymous 8):100":0,"(anonymous 9):108":0,"addFieldGroup:69":0,"(anonymous 10):132":0,"reOrderFieldGroupDD:126":0,"(anonymous 11):156":0,"reOrderFieldGroup:151":0,"(anonymous 12):167":0,"addFieldGroupToModel:163":0,"ddOver:176":0,"ddDrop:188":0,"toJSON:214":0,"(anonymous 13):227":0,"deleteForm:220":0,"(anonymous 15):243":0,"(anonymous 14):242":0,"editLabel:234":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 121;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 27;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 1);
YUI.add('libbit-controlform', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 3);
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 5);
ControlForm = Y.Base.create('controlForm', Y.Base, [], {

    initializer: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "initializer", 7);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 8);
this.on('contextMenu:editLabel', this.editLabel);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 9);
this.on('contextMenu:deleteForm', this.deleteForm);
    },

    render: function(formsModel) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 12);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 13);
var self = this;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 14);
console.log('call');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 15);
if (formsModel == null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 16);
formsModel = this.get('formsModel');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 18);
this.set('formsModel', formsModel);
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 21);
formsModel.sort();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 22);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 22);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 23);
self.renderForm(formItem);
        });
    },

    renderForm: function(formItem) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 27);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 28);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 29);
var container = this.get('formContainer');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 30);
var fieldGroupOrder = formItem.get('fieldGroupOrder');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 31);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 32);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 34);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 35);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 37);
legend.set('innerHTML', form.get('caption'));
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 38);
legend.plug(Y.Libbit.ContextMenu, {
            content: [
                { label: 'Rename', eventName: 'editLabel' },
                { label: '-' },
                { label: 'Remove', eventName: 'deleteForm' }
            ],
            bubbleTarget: self
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 47);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 48);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 50);
Y.Array.each(fieldGroupOrder, function(groupId) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 50);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 51);
Y.Array.each(fieldGroups, function(group) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 4)", 51);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 52);
if (groupId == group['id']) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 53);
self.addFieldGroup(formElement, group);
                }
            });
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 58);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        // If a direction container is found, append the form to it.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 61);
if (container.one('.' + directionClassName) != null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 62);
container.one('.' + directionClassName).append(formElement);
        } else {
            // And if not ...
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 65);
container.append(formElement);
        }
    },

    addFieldGroup: function(formElement, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 69);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 70);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 71);
var list = Y.Node.create('<ol />');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 72);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 74);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 75);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 77);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 80);
var fieldGroupDD = new Y.DD.Drag({
            node: list,
            group: ['fieldGroup']
        }).plug(Y.Plugin.DDConstrained, {
            constrain2node: formElement
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd: false
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 89);
fieldGroupDD.on('drag:start', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 5)", 89);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 90);
e.target.get('dragNode').setHTML('');
        });
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 92);
fieldGroupDD.on('drag:drag', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 6)", 92);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 93);
self.reOrderFieldGroupDD(e, formElement, list);
        });
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 95);
fieldGroupDD.on('drag:end', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 95);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 96);
self.reOrderFieldGroup(formElement);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 99);
list.set('id', fieldGroup['id']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 100);
list.on(['mouseover', 'mouseout'], function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 100);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 101);
if (e.type == 'mouseover') {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 102);
list.addClass('fieldGroupHighlight');
            } else {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 104);
list.removeClass('fieldGroupHighlight');
            }
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 108);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 9)", 108);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 109);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 110);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 111);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 113);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 115);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 117);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 118);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 120);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 123);
formElement.append(list);
    },

    reOrderFieldGroupDD: function(e, formElement, sender) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroupDD", 126);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 127);
var y = e.currentTarget.mouseXY[1];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 128);
var hit = false;

        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend
        // the dragNode before that element.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 132);
formElement.all('ol').each(function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 10)", 132);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 133);
if (sender.get('id') !== group.get('id')) { // Is this myself?
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 134);
var groupTop = group.getY();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 135);
var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 137);
if (y > groupTop && y < groupBottom) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 138);
sender.insertBefore(sender, group);

                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 140);
hit = true;
                }
            }
        });

        // If you are dragging at the bottom of the form, append the dragNode to the bottom.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 146);
if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 147);
formElement.append(sender);
        }
    },

    reOrderFieldGroup: function(formElement) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroup", 151);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 152);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 153);
var formId = formElement.get('name');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 154);
var fieldGroupOrder = [];

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 156);
formElement.all('ol').each(function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 11)", 156);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 157);
fieldGroupOrder.push(this.get('id'));
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 160);
formsModel.updateProperty(formId, 'fieldGroupOrder', fieldGroupOrder);
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 163);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 164);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 165);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 167);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 12)", 167);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 168);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 169);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 171);
fieldGroups.push(fieldGroup);
            }
        });
    },

    ddOver: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 176);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 177);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 179);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 180);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 181);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 184);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 188);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 189);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 190);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 191);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 193);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 194);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 195);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 199);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 200);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 202);
self.addFieldGroup(formNode, fieldGroup.getAttrs(), true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 203);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 204);
self.reOrderFieldGroup(formNode);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 206);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 207);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 211);
formNode.removeClass('ddOver');
    },

    toJSON: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "toJSON", 214);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 215);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 217);
return Y.JSON.stringify(formsModel);
    },

    deleteForm: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "deleteForm", 220);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 221);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 222);
var formsModel = this.get('formsModel');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 223);
var formId = e.node.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 225);
Y.Libbit.Dialog.confirm(
            'Delete', 'Delete the form "' + e.node.get('innerHTML') + '" and all its fieldgroups?',
            function() {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 13)", 227);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 228);
formsModel.deleteForm(formId);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 229);
self.render();
            }
        );
    },

    editLabel: function(e) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 234);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 235);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 236);
var legend = e.node;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 237);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 239);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 14)", 242);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 243);
self.get('formsModel').each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 15)", 243);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 244);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 245);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 247);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 248);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 252);
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


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 265);
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
