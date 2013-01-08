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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","    model: null,","","    render: function(formsModel)","    {","        var self = this;","","        if (formsModel == null) {","            formsModel = this.get('formsModel');","        } else {","            this.set('formsModel', formsModel);","        }","","        formsModel.sort();","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","","        self.model = formsModel;","    },","","    renderForm: function(formItem)","    {","        var self = this;","        var container = this.get('formContainer');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","        legend.on('dblclick', function() {","            self.editLabel(legend);","        });","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroups, function(group) {","            self.addFieldGroup(formElement, group);","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        if (container.one('.' + directionClassName) != null) {","            container.one('.' + directionClassName).append(formElement);","        } else {","            container.append(formElement);","        }","    },","","    addFieldGroup: function(formElement, fieldGroup)","    {","        var list = Y.Node.create('<ol>');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        list.set('id', fieldGroup['id']);","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        formElement.append(list);","    },","","    addFieldGroupToModel: function(formId, fieldGroup)","    {","        this.model.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm)","    {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm)","    {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup, true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    editLabel: function(legend)","    {","        var self = this;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.model.each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    }","}, {","    ATTRS: {","        formContainer: { value: null },","        formsModel: { value: null }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {\"requires\": [\"node\", \"model-list\", \"model\", \"base\", \"libbit-dialog\"]});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"10":0,"12":0,"13":0,"15":0,"18":0,"19":0,"20":0,"23":0,"28":0,"29":0,"30":0,"31":0,"33":0,"34":0,"36":0,"37":0,"38":0,"41":0,"42":0,"44":0,"45":0,"48":0,"50":0,"51":0,"53":0,"59":0,"60":0,"62":0,"63":0,"65":0,"68":0,"70":0,"71":0,"72":0,"73":0,"75":0,"77":0,"79":0,"80":0,"82":0,"85":0,"90":0,"91":0,"92":0,"94":0,"101":0,"103":0,"104":0,"105":0,"108":0,"114":0,"115":0,"116":0,"118":0,"119":0,"120":0,"124":0,"125":0,"127":0,"128":0,"130":0,"131":0,"135":0,"140":0,"141":0,"143":0,"147":0,"148":0,"149":0,"151":0,"152":0,"156":0,"169":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"(anonymous 2):19":0,"render:8":0,"(anonymous 3):37":0,"(anonymous 4):44":0,"renderForm:26":0,"(anonymous 5):70":0,"addFieldGroup:57":0,"(anonymous 6):90":0,"addFieldGroupToModel:88":0,"ddOver:99":0,"ddDrop:112":0,"(anonymous 8):147":0,"(anonymous 7):146":0,"editLabel:138":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 76;
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
formsModel.sort();
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 19);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 19);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 20);
self.renderForm(formItem);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 23);
self.model = formsModel;
    },

    renderForm: function(formItem)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 26);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 28);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 29);
var container = this.get('formContainer');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 30);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 31);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 33);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 34);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 36);
legend.set('innerHTML', form.get('caption'));
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 37);
legend.on('dblclick', function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 37);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 38);
self.editLabel(legend);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 41);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 42);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 44);
Y.Array.each(fieldGroups, function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 4)", 44);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 45);
self.addFieldGroup(formElement, group);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 48);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 50);
if (container.one('.' + directionClassName) != null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 51);
container.one('.' + directionClassName).append(formElement);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 53);
container.append(formElement);
        }
    },

    addFieldGroup: function(formElement, fieldGroup)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 57);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 59);
var list = Y.Node.create('<ol>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 60);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 62);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 63);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 65);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 68);
list.set('id', fieldGroup['id']);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 70);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 5)", 70);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 71);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 72);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 73);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 75);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 77);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 79);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 80);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 82);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 85);
formElement.append(list);
    },

    addFieldGroupToModel: function(formId, fieldGroup)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 88);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 90);
this.model.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 6)", 90);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 91);
if (formItem.get('id') == formId) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 92);
var fieldGroups = formItem.get('controlForm').get('fieldGroups');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 94);
fieldGroups.push(fieldGroup);
            }
        });
    },

    ddOver: function(e, referenceForm)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 99);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 101);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 103);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 104);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 105);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 108);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 112);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 114);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 115);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 116);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 118);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 119);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 120);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 124);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 125);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 127);
self.addFieldGroup(formNode, fieldGroup, true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 128);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 130);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 131);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 135);
formNode.removeClass('ddOver');
    },

    editLabel: function(legend)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 138);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 140);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 141);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 143);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 146);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 147);
self.model.each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 147);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 148);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 149);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 151);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 152);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 156);
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


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 169);
Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {"requires": ["node", "model-list", "model", "base", "libbit-dialog"]});
