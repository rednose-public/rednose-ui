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
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].code=["YUI.add('libbit-model-spinner', function (Y, NAME) {","","var Spinner;","","Spinner = Y.Base.create('undo', Y.Model, [], {","","    destroy: function (options, callback) {","        // Allow callback as only arg.","        if (typeof options === 'function') {","            callback = options;","            options  = {};","        }","","        Y.Libbit.App.showSpinner();","","        this.constructor.superclass.destroy.apply(this, [ options, function (err) {","            Y.Libbit.App.hideSpinner();","","            if (typeof callback === 'function') {","                callback(err);","            }","        } ]);","    },","","    save: function (options, callback) {","        // Allow callback as only arg.","        if (typeof options === 'function') {","            callback = options;","            options  = {};","        }","","        Y.Libbit.App.showSpinner();","","        this.constructor.superclass.save.apply(this, [ options, function (err) {","            Y.Libbit.App.hideSpinner();","","            if (typeof callback === 'function') {","                callback(err);","            }","        } ]);","    },","","    load: function (options, callback) {","        // Allow callback as only arg.","        if (typeof options === 'function') {","            callback = options;","            options  = {};","        }","","        Y.Libbit.App.showSpinner();","","        this.constructor.superclass.load.apply(this, [ options, function (err) {","            Y.Libbit.App.hideSpinner();","","            if (typeof callback === 'function') {","                callback(err);","            }","        } ]);","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.Model').Spinner = Spinner;","","","}, '1.0.0', {\"requires\": [\"libbit-app-base\", \"model\"]});"];
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].lines = {"1":0,"3":0,"5":0,"9":0,"10":0,"11":0,"14":0,"16":0,"17":0,"19":0,"20":0,"27":0,"28":0,"29":0,"32":0,"34":0,"35":0,"37":0,"38":0,"45":0,"46":0,"47":0,"50":0,"52":0,"53":0,"55":0,"56":0,"63":0};
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].functions = {"(anonymous 2):16":0,"destroy:7":0,"(anonymous 3):34":0,"save:25":0,"(anonymous 4):52":0,"load:43":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].coveredLines = 28;
_yuitest_coverage["build/libbit-model-spinner/libbit-model-spinner.js"].coveredFunctions = 7;
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 1);
YUI.add('libbit-model-spinner', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 3);
var Spinner;

_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 5);
Spinner = Y.Base.create('undo', Y.Model, [], {

    destroy: function (options, callback) {
        // Allow callback as only arg.
        _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "destroy", 7);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 9);
if (typeof options === 'function') {
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 10);
callback = options;
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 11);
options  = {};
        }

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 14);
Y.Libbit.App.showSpinner();

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 16);
this.constructor.superclass.destroy.apply(this, [ options, function (err) {
            _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "(anonymous 2)", 16);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 17);
Y.Libbit.App.hideSpinner();

            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 19);
if (typeof callback === 'function') {
                _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 20);
callback(err);
            }
        } ]);
    },

    save: function (options, callback) {
        // Allow callback as only arg.
        _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "save", 25);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 27);
if (typeof options === 'function') {
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 28);
callback = options;
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 29);
options  = {};
        }

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 32);
Y.Libbit.App.showSpinner();

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 34);
this.constructor.superclass.save.apply(this, [ options, function (err) {
            _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "(anonymous 3)", 34);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 35);
Y.Libbit.App.hideSpinner();

            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 37);
if (typeof callback === 'function') {
                _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 38);
callback(err);
            }
        } ]);
    },

    load: function (options, callback) {
        // Allow callback as only arg.
        _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "load", 43);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 45);
if (typeof options === 'function') {
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 46);
callback = options;
            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 47);
options  = {};
        }

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 50);
Y.Libbit.App.showSpinner();

        _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 52);
this.constructor.superclass.load.apply(this, [ options, function (err) {
            _yuitest_coverfunc("build/libbit-model-spinner/libbit-model-spinner.js", "(anonymous 4)", 52);
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 53);
Y.Libbit.App.hideSpinner();

            _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 55);
if (typeof callback === 'function') {
                _yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 56);
callback(err);
            }
        } ]);
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-model-spinner/libbit-model-spinner.js", 63);
Y.namespace('Libbit.Model').Spinner = Spinner;


}, '1.0.0', {"requires": ["libbit-app-base", "model"]});
