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
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"].code=["YUI.add('libbit-model-undo', function (Y, NAME) {","","var Undo;","","Undo = Y.Base.create('undo', Y.Model, [], {","","    _revisions: [],","","    _index: 0,","","    initializer: function () {","        var self = this;","        this.on('init', function () {","            self.revisions = [];","            self._index = 0;","","            self.addAction();","        });","    },","","    addAction: function (label, action) {","        var undo = null,","            redo = null;","","        undo = Y.JSON.stringify(this.toJSON());","","        if (typeof action === 'function') {","            action();","            redo = Y.JSON.stringify(this.toJSON());","        }","","        if (this._index < this._revisions.length) {","            this._revisions.splice(this._index, this._revisions.length - this._index);","        }","","        this._revisions.push({","            label: label,","            undo: undo,","            redo: redo","        });","","        this._index = this._revisions.length;","        this.fire('change');","    },","","    undo: function () {","        if (this.canUndo()) {","            this._index--;","            this.setAttrs(Y.JSON.parse(this._revisions[this._index].undo));","","            return true;","        }","","        return false;","    },","","    redo: function () {","        if (this.canRedo()) {","            this._index++;","            this.setAttrs(Y.JSON.parse(this._revisions[this._index - 1].redo));","","            return true;","        }","","        return false;","    },","","    canUndo: function () {","        return this._index > 1;","    },","","    canRedo: function () {","        return (this._revisions[this._index] !== null) && this._index < this._revisions.length;","    },","","    getUndo: function () {","        if (this.canUndo()) {","            return this._revisions[this._index - 1].label;","        }","","        return null;","    },","","    getRedo: function () {","        if (this.canRedo()) {","            return this._revisions[this._index].label;","        }","","        return null;","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.Model').Undo = Undo;","","","}, '1.0.0', {\"requires\": [\"model\"]});"];
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"].lines = {"1":0,"3":0,"5":0,"12":0,"13":0,"14":0,"15":0,"17":0,"22":0,"25":0,"27":0,"28":0,"29":0,"32":0,"33":0,"36":0,"42":0,"43":0,"47":0,"48":0,"49":0,"51":0,"54":0,"58":0,"59":0,"60":0,"62":0,"65":0,"69":0,"73":0,"77":0,"78":0,"81":0,"85":0,"86":0,"89":0,"94":0};
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"].functions = {"(anonymous 2):13":0,"initializer:11":0,"addAction:21":0,"undo:46":0,"redo:57":0,"canUndo:68":0,"canRedo:72":0,"getUndo:76":0,"getRedo:84":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-model-undo/libbit-model-undo.js"].coveredLines = 37;
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
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 29);
redo = Y.JSON.stringify(this.toJSON());
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 32);
if (this._index < this._revisions.length) {
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 33);
this._revisions.splice(this._index, this._revisions.length - this._index);
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 36);
this._revisions.push({
            label: label,
            undo: undo,
            redo: redo
        });

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 42);
this._index = this._revisions.length;
        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 43);
this.fire('change');
    },

    undo: function () {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "undo", 46);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 47);
if (this.canUndo()) {
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 48);
this._index--;
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 49);
this.setAttrs(Y.JSON.parse(this._revisions[this._index].undo));

            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 51);
return true;
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 54);
return false;
    },

    redo: function () {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "redo", 57);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 58);
if (this.canRedo()) {
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 59);
this._index++;
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 60);
this.setAttrs(Y.JSON.parse(this._revisions[this._index - 1].redo));

            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 62);
return true;
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 65);
return false;
    },

    canUndo: function () {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "canUndo", 68);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 69);
return this._index > 1;
    },

    canRedo: function () {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "canRedo", 72);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 73);
return (this._revisions[this._index] !== null) && this._index < this._revisions.length;
    },

    getUndo: function () {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "getUndo", 76);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 77);
if (this.canUndo()) {
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 78);
return this._revisions[this._index - 1].label;
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 81);
return null;
    },

    getRedo: function () {
        _yuitest_coverfunc("build/libbit-model-undo/libbit-model-undo.js", "getRedo", 84);
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 85);
if (this.canRedo()) {
            _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 86);
return this._revisions[this._index].label;
        }

        _yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 89);
return null;
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-model-undo/libbit-model-undo.js", 94);
Y.namespace('Libbit.Model').Undo = Undo;


}, '1.0.0', {"requires": ["model"]});
