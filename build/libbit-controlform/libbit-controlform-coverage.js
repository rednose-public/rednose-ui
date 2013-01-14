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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","","    render: function(formsModel) {","        var self = this;","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","    },","","    renderForm: function(formItem) {","        var self = this;","        var container = this.get('formContainer');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","        legend.on('dblclick', function() {","            self.editLabel(legend);","        });","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroups, function(group) {","            self.addFieldGroup(formElement, group);","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        if (container.one('.' + directionClassName) != null) {","            container.one('.' + directionClassName).append(formElement);","        } else {","            container.append(formElement);","        }","    },","","    addFieldGroup: function(formElement, fieldGroup) {","        var self = this;","        var list = Y.Node.create('<ol>');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        var fieldGroupDD = new Y.DD.Drag({","            node: list,","            group: ['fieldGroup']","        }).plug(Y.Plugin.DDConstrained, {","            constrain2node: formElement","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd: false","        });","","        fieldGroupDD.on('drag:start', function(e) {","            e.target.get('dragNode').setHTML('');","        });","        fieldGroupDD.on('drag:drag', function(e) {","            self.reOrderFieldGroupDD(e, formElement, list);","        });","        fieldGroupDD.on('drag:end', function(e) {","            self.reOrderFieldGroup(formElement);","        });","","        list.set('id', fieldGroup['id']);","        list.on(['mouseover', 'mouseout'], function(e) {","            if (e.type == 'mouseover') {","                list.addClass('fieldGroupHighlight');","            } else {","                list.removeClass('fieldGroupHighlight');","            }","        });","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        formElement.append(list);","    },","","    reOrderFieldGroupDD: function(e, formElement, sender) {","        var y = e.currentTarget.mouseXY[1];","        var hit = false;","","        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend","        // the dragNode before that element.","        formElement.all('ol').each(function(group) {","            if (sender.get('id') !== group.get('id')) { // Is this myself?","                var groupTop = group.getY();","                var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));","","                if (y > groupTop && y < groupBottom) {","                    sender.insertBefore(sender, group);","","                    hit = true;","                }","            }","        });","","        // If you are dragging at the bottom of the form, append the dragNode to the bottom.","        if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {","            formElement.append(sender);","        }","    },","","    reOrderFieldGroup: function(formElement) {","        var formsModel = this.get('formsModel');","","        if (typeof(formElement.get) != 'undefined') {","            formsModel.updateFieldGroupOrder(formElement.get('name'));","        } else {","            formsModel.updateFieldGroupOrder(formElement.getAttribute('name'));","        }","    },","","    addFieldGroupToModel: function(formId, fieldGroup) {","        var formsModel = this.get('formsModel');","","        formsModel.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","                formsModel.updateFieldGroupOrder(formId);","            }","        });","    },","","    ddOver: function(e, referenceForm) {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm) {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup, true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    toJSON: function() {","        var formsModel = this.get('formsModel');","","        return Y.JSON.stringify(formsModel);","    },","","    editLabel: function(legend) {","        var self = this;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.get('formsModel').each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    }","}, {","    ATTRS: {","        formContainer: { value: null },","        formsModel: { value: null }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {\"requires\": [\"dd-proxy\", \"dd-constrain\", \"node\", \"model-list\", \"model\", \"base\", \"libbit-dialog\"]});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"10":0,"11":0,"13":0,"16":0,"17":0,"18":0,"23":0,"24":0,"25":0,"26":0,"28":0,"29":0,"31":0,"32":0,"33":0,"36":0,"37":0,"39":0,"40":0,"43":0,"45":0,"46":0,"48":0,"53":0,"54":0,"55":0,"57":0,"58":0,"60":0,"63":0,"72":0,"73":0,"75":0,"76":0,"78":0,"79":0,"82":0,"83":0,"84":0,"85":0,"87":0,"91":0,"92":0,"93":0,"94":0,"96":0,"98":0,"100":0,"101":0,"103":0,"106":0,"110":0,"111":0,"115":0,"116":0,"117":0,"118":0,"120":0,"121":0,"123":0,"129":0,"130":0,"135":0,"137":0,"138":0,"140":0,"145":0,"147":0,"148":0,"149":0,"151":0,"152":0,"158":0,"160":0,"161":0,"162":0,"165":0,"170":0,"171":0,"172":0,"174":0,"175":0,"176":0,"180":0,"181":0,"183":0,"184":0,"186":0,"187":0,"191":0,"195":0,"197":0,"201":0,"202":0,"204":0,"208":0,"209":0,"210":0,"212":0,"213":0,"217":0,"230":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"(anonymous 2):17":0,"render:7":0,"(anonymous 3):32":0,"(anonymous 4):39":0,"renderForm:22":0,"(anonymous 5):72":0,"(anonymous 6):75":0,"(anonymous 7):78":0,"(anonymous 8):83":0,"(anonymous 9):91":0,"addFieldGroup:52":0,"(anonymous 10):115":0,"reOrderFieldGroupDD:109":0,"reOrderFieldGroup:134":0,"(anonymous 11):147":0,"addFieldGroupToModel:144":0,"ddOver:157":0,"ddDrop:169":0,"toJSON:194":0,"(anonymous 13):208":0,"(anonymous 12):207":0,"editLabel:200":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 106;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 23;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 1);
YUI.add('libbit-controlform', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 3);
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 5);
ControlForm = Y.Base.create('controlForm', Y.Base, [], {

    render: function(formsModel) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 7);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 8);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 10);
if (formsModel == null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 11);
formsModel = this.get('formsModel');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 13);
this.set('formsModel', formsModel);
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 16);
formsModel.sort();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 17);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 17);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 18);
self.renderForm(formItem);
        });
    },

    renderForm: function(formItem) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 22);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 23);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 24);
var container = this.get('formContainer');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 25);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 26);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 28);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 29);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 31);
legend.set('innerHTML', form.get('caption'));
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 32);
legend.on('dblclick', function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 32);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 33);
self.editLabel(legend);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 36);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 37);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 39);
Y.Array.each(fieldGroups, function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 4)", 39);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 40);
self.addFieldGroup(formElement, group);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 43);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 45);
if (container.one('.' + directionClassName) != null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 46);
container.one('.' + directionClassName).append(formElement);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 48);
container.append(formElement);
        }
    },

    addFieldGroup: function(formElement, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 52);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 53);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 54);
var list = Y.Node.create('<ol>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 55);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 57);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 58);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 60);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 63);
var fieldGroupDD = new Y.DD.Drag({
            node: list,
            group: ['fieldGroup']
        }).plug(Y.Plugin.DDConstrained, {
            constrain2node: formElement
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd: false
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 72);
fieldGroupDD.on('drag:start', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 5)", 72);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 73);
e.target.get('dragNode').setHTML('');
        });
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 75);
fieldGroupDD.on('drag:drag', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 6)", 75);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 76);
self.reOrderFieldGroupDD(e, formElement, list);
        });
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 78);
fieldGroupDD.on('drag:end', function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 78);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 79);
self.reOrderFieldGroup(formElement);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 82);
list.set('id', fieldGroup['id']);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 83);
list.on(['mouseover', 'mouseout'], function(e) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 83);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 84);
if (e.type == 'mouseover') {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 85);
list.addClass('fieldGroupHighlight');
            } else {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 87);
list.removeClass('fieldGroupHighlight');
            }
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 91);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 9)", 91);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 92);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 93);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 94);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 96);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 98);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 100);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 101);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 103);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 106);
formElement.append(list);
    },

    reOrderFieldGroupDD: function(e, formElement, sender) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroupDD", 109);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 110);
var y = e.currentTarget.mouseXY[1];
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 111);
var hit = false;

        // If your mousecursor hovers over a fieldGroup (ol element) while dragging, prepend
        // the dragNode before that element.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 115);
formElement.all('ol').each(function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 10)", 115);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 116);
if (sender.get('id') !== group.get('id')) { // Is this myself?
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 117);
var groupTop = group.getY();
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 118);
var groupBottom = (groupTop + parseInt(group.getComputedStyle('height')));

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 120);
if (y > groupTop && y < groupBottom) {
                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 121);
sender.insertBefore(sender, group);

                    _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 123);
hit = true;
                }
            }
        });

        // If you are dragging at the bottom of the form, append the dragNode to the bottom.
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 129);
if (hit == false && y > (formElement.getY() + parseInt(formElement.getComputedStyle('height')))) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 130);
formElement.append(sender);
        }
    },

    reOrderFieldGroup: function(formElement) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "reOrderFieldGroup", 134);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 135);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 137);
if (typeof(formElement.get) != 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 138);
formsModel.updateFieldGroupOrder(formElement.get('name'));
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 140);
formsModel.updateFieldGroupOrder(formElement.getAttribute('name'));
        }
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 144);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 145);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 147);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 11)", 147);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 148);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 149);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 151);
fieldGroups.push(fieldGroup);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 152);
formsModel.updateFieldGroupOrder(formId);
            }
        });
    },

    ddOver: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 157);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 158);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 160);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 161);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 162);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 165);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 169);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 170);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 171);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 172);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 174);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 175);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 176);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 180);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 181);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 183);
self.addFieldGroup(formNode, fieldGroup, true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 184);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 186);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 187);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 191);
formNode.removeClass('ddOver');
    },

    toJSON: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "toJSON", 194);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 195);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 197);
return Y.JSON.stringify(formsModel);
    },

    editLabel: function(legend) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 200);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 201);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 202);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 204);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 12)", 207);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 208);
self.get('formsModel').each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 13)", 208);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 209);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 210);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 212);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 213);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 217);
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


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 230);
Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {"requires": ["dd-proxy", "dd-constrain", "node", "model-list", "model", "base", "libbit-dialog"]});
