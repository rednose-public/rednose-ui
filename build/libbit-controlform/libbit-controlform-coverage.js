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
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].code=["YUI.add('libbit-controlform', function (Y, NAME) {","","var ControlForm;","","ControlForm = Y.Base.create('controlForm', Y.Base, [], {","    render: function(formsModel)","    {","        var self = this;","","        formsModel.each(function(formItem) {","            self.renderForm(formItem);","        });","    },","","    renderForm: function(formItem)","    {","        var container = this.get('formContainer');","        var form = formItem.get('controlForm');","        var fieldGroups = form.get('fieldGroups');","","        var formElement = Y.Node.create('<fieldset>');","        var legend = Y.Node.create('<legend>');","        var list = Y.Node.create('<ol>');","","        legend.set('innerHTML', form.get('caption'));","","        formElement.append(legend);","        formElement.append(list);","","        Y.Array.each(fieldGroups, function(group) {","            Y.Array.each(group['fieldGroupItems'], function(control) {","                var label = Y.Node.create('<label>');","                var controlContainer = Y.Node.create('<li>');","                var controlElement = null;","","                controlElement = Y.Node.create('<input />');","","                label.set('innerHTML', control.field.name);","","                controlContainer.append(label);","                controlContainer.append(controlElement);","","                list.append(controlContainer);","            });","        });","","        var directionClassName = container.getAttribute('class') + '_' + formItem.get('direction');","","        if (container.one('.' + directionClassName) != null) {","            container.one('.' + directionClassName).append(formElement);","        } else {","            container.append(formElement);","        }","    }","}, {","    ATTRS: {","        formContainer: { value: '' }","    }","});","","","Y.namespace('Libbit').ControlForm = ControlForm;","","","}, '1.0.0', {\"requires\": [\"node\", \"model-list\", \"model\", \"base\"]});"];
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].lines = {"1":0,"3":0,"5":0,"8":0,"10":0,"11":0,"17":0,"18":0,"19":0,"21":0,"22":0,"23":0,"25":0,"27":0,"28":0,"30":0,"31":0,"32":0,"33":0,"34":0,"36":0,"38":0,"40":0,"41":0,"43":0,"47":0,"49":0,"50":0,"52":0,"62":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].functions = {"(anonymous 2):10":0,"render:6":0,"(anonymous 4):31":0,"(anonymous 3):30":0,"renderForm:15":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredLines = 30;
_yuitest_coverage["build/libbit-controlform/libbit-controlform.js"].coveredFunctions = 6;
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 1);
YUI.add('libbit-controlform', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 3);
var ControlForm;

_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 5);
ControlForm = Y.Base.create('controlForm', Y.Base, [], {
    render: function(formsModel)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "render", 6);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 8);
var self = this;

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 10);
formsModel.each(function(formItem) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 2)", 10);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 11);
self.renderForm(formItem);
        });
    },

    renderForm: function(formItem)
    {
        _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "renderForm", 15);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 17);
var container = this.get('formContainer');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 18);
var form = formItem.get('controlForm');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 19);
var fieldGroups = form.get('fieldGroups');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 21);
var formElement = Y.Node.create('<fieldset>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 22);
var legend = Y.Node.create('<legend>');
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 23);
var list = Y.Node.create('<ol>');

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 25);
legend.set('innerHTML', form.get('caption'));

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 27);
formElement.append(legend);
        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 28);
formElement.append(list);

        _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 30);
Y.Array.each(fieldGroups, function(group) {
            _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 3)", 30);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 31);
Y.Array.each(group['fieldGroupItems'], function(control) {
                _yuitest_coverfunc("build/libbit-controlform/libbit-controlform.js", "(anonymous 4)", 31);
_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 32);
var label = Y.Node.create('<label>');
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 33);
var controlContainer = Y.Node.create('<li>');
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 34);
var controlElement = null;

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 36);
controlElement = Y.Node.create('<input />');

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 38);
label.set('innerHTML', control.field.name);

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 40);
controlContainer.append(label);
                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 41);
controlContainer.append(controlElement);

                _yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 43);
list.append(controlContainer);
            });
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
    }
}, {
    ATTRS: {
        formContainer: { value: '' }
    }
});


_yuitest_coverline("build/libbit-controlform/libbit-controlform.js", 62);
Y.namespace('Libbit').ControlForm = ControlForm;


}, '1.0.0', {"requires": ["node", "model-list", "model", "base"]});
