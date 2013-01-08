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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","","    render: function(formsModel) {","        var self = this;","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","    },","","    renderForm: function(formItem) {","        var self = this;","        var container = this.get('formContainer');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","        legend.on('dblclick', function() {","            self.editLabel(legend);","        });","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroups, function(group) {","            self.addFieldGroup(formElement, group);","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        if (container.one('.' + directionClassName) != null) {","            container.one('.' + directionClassName).append(formElement);","        } else {","            container.append(formElement);","        }","    },","","    addFieldGroup: function(formElement, fieldGroup) {","        var list = Y.Node.create('<ol>');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        list.set('id', fieldGroup['id']);","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        formElement.append(list);","    },","","    addFieldGroupToModel: function(formId, fieldGroup) {","        this.get('formsModel').each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm) {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm) {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup, true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    toJSON: function() {","        var formsModel = this.get('formsModel');","","        return Y.JSON.stringify(formsModel);","    },","","    editLabel: function(legend) {","        var self = this;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.get('formsModel').each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    }","}, {","    ATTRS: {","        formContainer: { value: null },","        formsModel: { value: null }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {\"requires\": [\"node\", \"model-list\", \"model\", \"base\", \"libbit-dialog\"]});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"10":0,"11":0,"13":0,"16":0,"17":0,"18":0,"23":0,"24":0,"25":0,"26":0,"28":0,"29":0,"31":0,"32":0,"33":0,"36":0,"37":0,"39":0,"40":0,"43":0,"45":0,"46":0,"48":0,"53":0,"54":0,"56":0,"57":0,"59":0,"62":0,"64":0,"65":0,"66":0,"67":0,"69":0,"71":0,"73":0,"74":0,"76":0,"79":0,"83":0,"84":0,"85":0,"87":0,"93":0,"95":0,"96":0,"97":0,"100":0,"105":0,"106":0,"107":0,"109":0,"110":0,"111":0,"115":0,"116":0,"118":0,"119":0,"121":0,"122":0,"126":0,"130":0,"132":0,"136":0,"137":0,"139":0,"143":0,"144":0,"145":0,"147":0,"148":0,"152":0,"165":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"(anonymous 2):17":0,"render:7":0,"(anonymous 3):32":0,"(anonymous 4):39":0,"renderForm:22":0,"(anonymous 5):64":0,"addFieldGroup:52":0,"(anonymous 6):83":0,"addFieldGroupToModel:82":0,"ddOver:92":0,"ddDrop:104":0,"toJSON:129":0,"(anonymous 8):143":0,"(anonymous 7):142":0,"editLabel:135":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 77;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 16;
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
var list = Y.Node.create('<ol>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 54);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 56);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 57);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 59);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 62);
list.set('id', fieldGroup['id']);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 64);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 5)", 64);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 65);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 66);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 67);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 69);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 71);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 73);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 74);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 76);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 79);
formElement.append(list);
    },

    addFieldGroupToModel: function(formId, fieldGroup) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 82);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 83);
this.get('formsModel').each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 6)", 83);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 84);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 85);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 87);
fieldGroups.push(fieldGroup);
            }
        });
    },

    ddOver: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 92);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 93);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 95);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 96);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 97);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 100);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 104);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 105);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 106);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 107);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 109);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 110);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 111);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 115);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 116);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 118);
self.addFieldGroup(formNode, fieldGroup, true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 119);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 121);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 122);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 126);
formNode.removeClass('ddOver');
    },

    toJSON: function() {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "toJSON", 129);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 130);
var formsModel = this.get('formsModel');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 132);
return Y.JSON.stringify(formsModel);
    },

    editLabel: function(legend) {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 135);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 136);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 137);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 139);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 142);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 143);
self.get('formsModel').each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 143);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 144);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 145);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 147);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 148);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 152);
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


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 165);
Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {"requires": ["node", "model-list", "model", "base", "libbit-dialog"]});
