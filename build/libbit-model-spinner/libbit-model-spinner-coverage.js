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
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-model-spinner/libbit-model-spinner.js",
    code: []
};
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].code=["YUI.add('libbit-model-spinner', function (Y, NAME) {","","var Spinner;","","Spinner = Y.Base.create('undo', Y.Model, [], {","","    destroy: function (options, callback) {","       var self = this;","","        // Allow callback as only arg.","        if (typeof options === 'function') {","            callback = options;","            options  = {};","        }","","        Y.Libbit.App.showSpinner();","","        this.constructor.superclass.destroy.apply(this, [ options, function () {","            Y.Libbit.App.hideSpinner();","","            if (typeof callback === 'function') {","                callback();","            }","        } ]);","    },","","    save: function (options, callback) {","       var self = this;","","        // Allow callback as only arg.","        if (typeof options === 'function') {","            callback = options;","            options  = {};","        }","","        Y.Libbit.App.showSpinner();","","        this.constructor.superclass.save.apply(this, [ options, function () {","            Y.Libbit.App.hideSpinner();","","            if (typeof callback === 'function') {","                callback();","            }","        } ]);","    },","","    load: function (options, callback) {","       var self = this;","","        // Allow callback as only arg.","        if (typeof options === 'function') {","            callback = options;","            options  = {};","        }","","        Y.Libbit.App.showSpinner();","","        this.constructor.superclass.load.apply(this, [ options, function () {","            Y.Libbit.App.hideSpinner();","","            if (typeof callback === 'function') {","                callback();","            }","        } ]);","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.Model').Spinner = Spinner;","","","}, '1.0.0', {\"requires\": [\"libbit-app-base\", \"model\"]});"];
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].lines = {"1":0,"3":0,"5":0,"8":0,"11":0,"12":0,"13":0,"16":0,"18":0,"19":0,"21":0,"22":0,"28":0,"31":0,"32":0,"33":0,"36":0,"38":0,"39":0,"41":0,"42":0,"48":0,"51":0,"52":0,"53":0,"56":0,"58":0,"59":0,"61":0,"62":0,"69":0};
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].functions = {"(anonymous 2):18":0,"destroy:7":0,"(anonymous 3):38":0,"save:27":0,"(anonymous 4):58":0,"load:47":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].coveredLines = 31;
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].coveredFunctions = 7;
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 1);
YUI.add('libbit-model-spinner', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 3);
var Spinner;

_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 5);
Spinner = Y.Base.create('undo', Y.Model, [], {

    destroy: function (options, callback) {
       _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "destroy", 7);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 8);
var self = this;

        // Allow callback as only arg.
        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 11);
if (typeof options === 'function') {
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 12);
callback = options;
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 13);
options  = {};
        }

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 16);
Y.Libbit.App.showSpinner();

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 18);
this.constructor.superclass.destroy.apply(this, [ options, function () {
            _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "(anonymous 2)", 18);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 19);
Y.Libbit.App.hideSpinner();

            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 21);
if (typeof callback === 'function') {
                _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 22);
callback();
            }
        } ]);
    },

    save: function (options, callback) {
       _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "save", 27);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 28);
var self = this;

        // Allow callback as only arg.
        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 31);
if (typeof options === 'function') {
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 32);
callback = options;
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 33);
options  = {};
        }

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 36);
Y.Libbit.App.showSpinner();

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 38);
this.constructor.superclass.save.apply(this, [ options, function () {
            _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "(anonymous 3)", 38);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 39);
Y.Libbit.App.hideSpinner();

            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 41);
if (typeof callback === 'function') {
                _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 42);
callback();
            }
        } ]);
    },

    load: function (options, callback) {
       _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "load", 47);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 48);
var self = this;

        // Allow callback as only arg.
        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 51);
if (typeof options === 'function') {
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 52);
callback = options;
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 53);
options  = {};
        }

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 56);
Y.Libbit.App.showSpinner();

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 58);
this.constructor.superclass.load.apply(this, [ options, function () {
            _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "(anonymous 4)", 58);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 59);
Y.Libbit.App.hideSpinner();

            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 61);
if (typeof callback === 'function') {
                _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 62);
callback();
            }
        } ]);
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 69);
Y.namespace('Libbit.Model').Spinner = Spinner;


}, '1.0.0', {"requires": ["libbit-app-base", "model"]});
