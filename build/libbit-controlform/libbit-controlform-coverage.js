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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","    model: null,","","    render: function(formsModel)","    {","        var self = this;","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","","        self.model = formsModel;","    },","","    renderForm: function(formItem)","    {","        var self = this;","        var container = this.get('formContainer');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","        legend.on('dblclick', function() {","            self.editLabel(legend);","        });","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroups, function(group) {","            self.addFieldGroup(formElement, group);","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        if (container.one('.' + directionClassName) != null) {","            container.one('.' + directionClassName).append(formElement);","        } else {","            container.append(formElement);","        }","    },","","    addFieldGroup: function(formElement, fieldGroup)","    {","        var list = Y.Node.create('<ol>');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        list.set('id', fieldGroup['id']);","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        formElement.append(list);","    },","","    addFieldGroupToModel: function(formId, fieldGroup)","    {","        this.model.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm)","    {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm)","    {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup, true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    editLabel: function(legend)","    {","        var self = this;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.model.each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    }","}, {","    ATTRS: {","        formContainer: { value: null },","        formsModel: { value: null }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {\"requires\": [\"node\", \"model-list\", \"model\", \"base\", \"libbit-dialog\"]});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"10":0,"12":0,"13":0,"15":0,"18":0,"19":0,"22":0,"27":0,"28":0,"29":0,"30":0,"32":0,"33":0,"35":0,"36":0,"37":0,"40":0,"41":0,"43":0,"44":0,"47":0,"49":0,"50":0,"52":0,"58":0,"59":0,"61":0,"62":0,"64":0,"67":0,"69":0,"70":0,"71":0,"72":0,"74":0,"76":0,"78":0,"79":0,"81":0,"84":0,"89":0,"90":0,"91":0,"93":0,"100":0,"102":0,"103":0,"104":0,"107":0,"113":0,"114":0,"115":0,"117":0,"118":0,"119":0,"123":0,"124":0,"126":0,"127":0,"129":0,"130":0,"134":0,"139":0,"140":0,"142":0,"146":0,"147":0,"148":0,"150":0,"151":0,"155":0,"168":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"(anonymous 2):18":0,"render:8":0,"(anonymous 3):36":0,"(anonymous 4):43":0,"renderForm:25":0,"(anonymous 5):69":0,"addFieldGroup:56":0,"(anonymous 6):89":0,"addFieldGroupToModel:87":0,"ddOver:98":0,"ddDrop:111":0,"(anonymous 8):146":0,"(anonymous 7):145":0,"editLabel:137":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 75;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 15;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 1);
YUI.add('libbit-controlform', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 3);
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 5);
ControlForm = Y.Base.create('controlForm', Y.Base, [], {
    model: null,

    render: function(formsModel)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 8);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 10);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 12);
if (formsModel == null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 13);
formsModel = this.get('formsModel');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 15);
this.set('formsModel', formsModel);
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 18);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 18);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 19);
self.renderForm(formItem);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 22);
self.model = formsModel;
    },

    renderForm: function(formItem)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 25);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 27);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 28);
var container = this.get('formContainer');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 29);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 30);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 32);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 33);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 35);
legend.set('innerHTML', form.get('caption'));
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 36);
legend.on('dblclick', function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 36);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 37);
self.editLabel(legend);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 40);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 41);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 43);
Y.Array.each(fieldGroups, function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 4)", 43);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 44);
self.addFieldGroup(formElement, group);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 47);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 49);
if (container.one('.' + directionClassName) != null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 50);
container.one('.' + directionClassName).append(formElement);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 52);
container.append(formElement);
        }
    },

    addFieldGroup: function(formElement, fieldGroup)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 56);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 58);
var list = Y.Node.create('<ol>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 59);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 61);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 62);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 64);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 67);
list.set('id', fieldGroup['id']);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 69);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 5)", 69);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 70);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 71);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 72);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 74);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 76);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 78);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 79);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 81);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 84);
formElement.append(list);
    },

    addFieldGroupToModel: function(formId, fieldGroup)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 87);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 89);
this.model.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 6)", 89);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 90);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 91);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 93);
fieldGroups.push(fieldGroup);
            }
        });
    },

    ddOver: function(e, referenceForm)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 98);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 100);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 102);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 103);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 104);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 107);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 111);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 113);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 114);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 115);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 117);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 118);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 119);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 123);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 124);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 126);
self.addFieldGroup(formNode, fieldGroup, true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 127);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 129);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 130);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 134);
formNode.removeClass('ddOver');
    },

    editLabel: function(legend)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 137);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 139);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 140);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 142);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 145);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 146);
self.model.each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 146);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 147);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 148);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 150);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 151);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 155);
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


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 168);
Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {"requires": ["node", "model-list", "model", "base", "libbit-dialog"]});
