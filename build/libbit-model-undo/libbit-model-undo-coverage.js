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
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-model-undo/libbit-model-undo.js",
    code: []
};
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"].code=["YUI.add('libbit-model-undo', function (Y, NAME) {","","var Undo;","","Undo = Y.Base.create('undo', Y.Model, [], {","","    _revisions: [],","","    _index: 0,","","    initializer: function () {","        var self = this;","        this.on('init', function () {","            self.revisions = [];","            self._index = 0;","","            self.addAction();","        });","    },","","    addAction: function (label, action) {","        var undo = null,","            redo = null;","","        undo = Y.JSON.stringify(this.toJSON());","","        if (typeof action === 'function') {","            action();","        }","","        redo = Y.JSON.stringify(this.toJSON());","","        if (this._index < this._revisions.length) {","            this._revisions.splice(this._index, this._revisions.length - this._index);","        }","","        this._revisions.push({","            label: label,","            undo: undo,","            redo: redo","        });","","        this._index = this._revisions.length;","        this.fire('change');","    },","","    undo: function () {","        var newIndex;","","        if (this.canUndo()) {","            this._index--;","            this.setAttrs(Y.JSON.parse(this._revisions[this._index].undo));","","            return true;","        }","","        return false;","    },","","    redo: function () {","        var newIndex;","","        if (this.canRedo()) {","            this._index++;","            this.setAttrs(Y.JSON.parse(this._revisions[this._index - 1].redo));","","            return true;","        }","","        return false;","    },","","    canUndo: function () {","        return this._index > 1;","    },","","    canRedo: function () {","        return (this._revisions[this._index] !== null) && this._index < this._revisions.length;","    },","","    getUndo: function () {","        if (this.canUndo()) {","            return this._revisions[this._index - 1].label;","        }","","        return null;","    },","","    getRedo: function () {","        if (this.canRedo()) {","            return this._revisions[this._index].label;","        }","","        return null;","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.Model').Undo = Undo;","","","}, '1.0.0', {\"requires\": [\"model\"]});"];
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"].lines = {"1":0,"3":0,"5":0,"12":0,"13":0,"14":0,"15":0,"17":0,"22":0,"25":0,"27":0,"28":0,"31":0,"33":0,"34":0,"37":0,"43":0,"44":0,"48":0,"50":0,"51":0,"52":0,"54":0,"57":0,"61":0,"63":0,"64":0,"65":0,"67":0,"70":0,"74":0,"78":0,"82":0,"83":0,"86":0,"90":0,"91":0,"94":0,"99":0};
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"].functions = {"(anonymous 2):13":0,"initializer:11":0,"addAction:21":0,"undo:47":0,"redo:60":0,"canUndo:73":0,"canRedo:77":0,"getUndo:81":0,"getRedo:89":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"].coveredLines = 39;
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"].coveredFunctions = 10;
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 1);
YUI.add('libbit-model-undo', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 3);
var Undo;

_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 5);
Undo = Y.Base.create('undo', Y.Model, [], {

    _revisions: [],

    _index: 0,

    initializer: function () {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "initializer", 11);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 12);
var self = this;
        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 13);
this.on('init', function () {
            _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "(anonymous 2)", 13);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 14);
self.revisions = [];
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 15);
self._index = 0;

            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 17);
self.addAction();
        });
    },

    addAction: function (label, action) {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "addAction", 21);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 22);
var undo = null,
            redo = null;

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 25);
undo = Y.JSON.stringify(this.toJSON());

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 27);
if (typeof action === 'function') {
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 28);
action();
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 31);
redo = Y.JSON.stringify(this.toJSON());

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 33);
if (this._index < this._revisions.length) {
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 34);
this._revisions.splice(this._index, this._revisions.length - this._index);
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 37);
this._revisions.push({
            label: label,
            undo: undo,
            redo: redo
        });

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 43);
this._index = this._revisions.length;
        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 44);
this.fire('change');
    },

    undo: function () {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "undo", 47);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 48);
var newIndex;

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 50);
if (this.canUndo()) {
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 51);
this._index--;
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 52);
this.setAttrs(Y.JSON.parse(this._revisions[this._index].undo));

            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 54);
return true;
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 57);
return false;
    },

    redo: function () {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "redo", 60);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 61);
var newIndex;

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 63);
if (this.canRedo()) {
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 64);
this._index++;
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 65);
this.setAttrs(Y.JSON.parse(this._revisions[this._index - 1].redo));

            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 67);
return true;
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 70);
return false;
    },

    canUndo: function () {
        _yuites