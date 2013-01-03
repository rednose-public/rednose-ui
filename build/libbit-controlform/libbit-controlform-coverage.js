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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","    model: null,","","    render: function(formsModel)","    {","        var self = this;","","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","","        self.model = formsModel;","    },","","    renderForm: function(formItem)","    {","        var self = this;","        var container = this.get('formContainer');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","","        legend.set('innerHTML', form.get('caption'));","        legend.on('dblclick', function() {","            self.editLabel(legend);","        });","","        formElement.append(legend);","        formElement.set('name', formItem.get('id'));","","        Y.Array.each(fieldGroups, function(group) {","            self.addFieldGroup(formElement, group);","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        if (container.one('.' + directionClassName) != null) {","            container.one('.' + directionClassName).append(formElement);","        } else {","            container.append(formElement);","        }","    },","","    addFieldGroup: function(formElement, fieldGroup)","    {","        var list = Y.Node.create('<ol>');","        var fieldGroupItems;","","        if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {","            fieldGroupItems = fieldGroup.get('fieldGroupItems');","        } else {","            fieldGroupItems = fieldGroup['fieldGroupItems'];","        }","","        list.set('id', fieldGroup['id']);","","        Y.Array.each(fieldGroupItems, function(control) {","            var label = Y.Node.create('<label>');","            var controlContainer = Y.Node.create('<li>');","            var controlElement = null;","","            controlElement = Y.Node.create('<input />');","","            label.set('innerHTML', control.field.name);","","            controlContainer.append(label);","            controlContainer.append(controlElement);","","            list.append(controlContainer);","        });","","        formElement.append(list);","    },","","    addFieldGroupToModel: function(formId, fieldGroup)","    {","        this.model.each(function(formItem) {","            if (formItem.get('id') == formId) {","                var fieldGroups = formItem.get('controlForm').get('fieldGroups');","","                fieldGroups.push(fieldGroup);","            }","        });","    },","","    ddOver: function(e, referenceForm)","    {","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (e.type == 'drop:over') {","            if (formNode.hasClass('ddOver') === false) {","                formNode.addClass('ddOver');","            }","        } else {","            formNode.removeClass('ddOver');","        }","    },","","    ddDrop: function(e, referenceForm)","    {","        var self = this;","        var drag = Y.DD.DDM.activeDrag;","        var formNode = Y.one('#' + referenceForm.get('id'));","","        if (!Y.TB.FieldGroup) {","            if (console.exception) {","                console.exception('Dependancy error Y.TB.Field not found');","            }","        }","","        if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {","            fieldGroup = drag.get('data');","","            self.addFieldGroup(formNode, fieldGroup, true);","            self.addFieldGroupToModel(formNode.get('name'), fieldGroup);","        } else {","            if (console.exception) {","                console.exception('DD Error: Expected a Y.TB.FieldGroup');","            }","        }","","        formNode.removeClass('ddOver');","    },","","    editLabel: function(legend)","    {","        var self = this;","        var formId = legend.get('parentNode').get('name');","","        Y.Libbit.Dialog.prompt(","            'Form title',","            'Value',","            function(value) {","                self.model.each(function(formItem) {","                    if (formItem.get('id') == formId) {","                        var form = formItem.get('controlForm');","","                        form.set('caption', value);","                        legend.set('text', form.get('caption'));","                    }","                });","","                return true;","            },","            legend.get('text')","        );","    }","}, {","    ATTRS: {","        formContainer: { value: '' }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {\"requires\": [\"node\", \"model-list\", \"model\", \"base\", \"libbit-dialog\"]});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"10":0,"12":0,"13":0,"16":0,"21":0,"22":0,"23":0,"24":0,"26":0,"27":0,"29":0,"30":0,"31":0,"34":0,"35":0,"37":0,"38":0,"41":0,"43":0,"44":0,"46":0,"52":0,"53":0,"55":0,"56":0,"58":0,"61":0,"63":0,"64":0,"65":0,"66":0,"68":0,"70":0,"72":0,"73":0,"75":0,"78":0,"83":0,"84":0,"85":0,"87":0,"94":0,"96":0,"97":0,"98":0,"101":0,"107":0,"108":0,"109":0,"111":0,"112":0,"113":0,"117":0,"118":0,"120":0,"121":0,"123":0,"124":0,"128":0,"133":0,"134":0,"136":0,"140":0,"141":0,"142":0,"144":0,"145":0,"149":0,"161":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"(anonymous 2):12":0,"render:8":0,"(anonymous 3):30":0,"(anonymous 4):37":0,"renderForm:19":0,"(anonymous 5):63":0,"addFieldGroup:50":0,"(anonymous 6):83":0,"addFieldGroupToModel:81":0,"ddOver:92":0,"ddDrop:105":0,"(anonymous 8):140":0,"(anonymous 7):139":0,"editLabel:131":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 72;
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
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 12);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 13);
self.renderForm(formItem);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 16);
self.model = formsModel;
    },

    renderForm: function(formItem)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 19);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 21);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 22);
var container = this.get('formContainer');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 23);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 24);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 26);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 27);
var legend = Y.Node.create('<legend>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 29);
legend.set('innerHTML', form.get('caption'));
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 30);
legend.on('dblclick', function() {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 30);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 31);
self.editLabel(legend);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 34);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 35);
formElement.set('name', formItem.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 37);
Y.Array.each(fieldGroups, function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 4)", 37);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 38);
self.addFieldGroup(formElement, group);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 41);
var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 43);
if (container.one('.' + directionClassName) != null) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 44);
container.one('.' + directionClassName).append(formElement);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 46);
container.append(formElement);
        }
    },

    addFieldGroup: function(formElement, fieldGroup)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroup", 50);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 52);
var list = Y.Node.create('<ol>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 53);
var fieldGroupItems;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 55);
if (typeof(fieldGroup['fieldGroupItems']) == 'undefined') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 56);
fieldGroupItems = fieldGroup.get('fieldGroupItems');
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 58);
fieldGroupItems = fieldGroup['fieldGroupItems'];
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 61);
list.set('id', fieldGroup['id']);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 63);
Y.Array.each(fieldGroupItems, function(control) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 5)", 63);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 64);
var label = Y.Node.create('<label>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 65);
var controlContainer = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 66);
var controlElement = null;

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 68);
controlElement = Y.Node.create('<input />');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 70);
label.set('innerHTML', control.field.name);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 72);
controlContainer.append(label);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 73);
controlContainer.append(controlElement);

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 75);
list.append(controlContainer);
        });

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 78);
formElement.append(list);
    },

    addFieldGroupToModel: function(formId, fieldGroup)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "addFieldGroupToModel", 81);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 83);
this.model.each(function(formItem) {
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

    ddOver: function(e, referenceForm)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddOver", 92);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 94);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 96);
if (e.type == 'drop:over') {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 97);
if (formNode.hasClass('ddOver') === false) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 98);
formNode.addClass('ddOver');
            }
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 101);
formNode.removeClass('ddOver');
        }
    },

    ddDrop: function(e, referenceForm)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "ddDrop", 105);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 107);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 108);
var drag = Y.DD.DDM.activeDrag;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 109);
var formNode = Y.one('#' + referenceForm.get('id'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 111);
if (!Y.TB.FieldGroup) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 112);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 113);
console.exception('Dependancy error Y.TB.Field not found');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 117);
if (Y.instanceOf(drag.get('data'), Y.TB.FieldGroup)) {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 118);
fieldGroup = drag.get('data');

            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 120);
self.addFieldGroup(formNode, fieldGroup, true);
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 121);
self.addFieldGroupToModel(formNode.get('name'), fieldGroup);
        } else {
            _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 123);
if (console.exception) {
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 124);
console.exception('DD Error: Expected a Y.TB.FieldGroup');
            }
        }

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 128);
formNode.removeClass('ddOver');
    },

    editLabel: function(legend)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "editLabel", 131);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 133);
var self = this;
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 134);
var formId = legend.get('parentNode').get('name');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 136);
Y.Libbit.Dialog.prompt(
            'Form title',
            'Value',
            function(value) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 7)", 139);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 140);
self.model.each(function(formItem) {
                    _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 8)", 140);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 141);
if (formItem.get('id') == formId) {
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 142);
var form = formItem.get('controlForm');

                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 144);
form.set('caption', value);
                        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 145);
legend.set('text', form.get('caption'));
                    }
                });

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 149);
return true;
            },
            legend.get('text')
        );
    }
}, {
    ATTRS: {
        formContainer: { value: '' }
    }
});


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 161);
Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {"requires": ["node", "model-list", "model", "base", "libbit-dialog"]});
