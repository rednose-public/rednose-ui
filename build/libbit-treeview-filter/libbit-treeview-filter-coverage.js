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
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview-filter/libbit-treeview-filter.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].code=["YUI.add('libbit-treeview-filter', function (Y, NAME) {","","var Filter;","","Filter = Y.Base.create('filter', Y.Base, [], {","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        // console.log(this.get('filter'));","            this.get('model').after('change', function() { console.log('filter'); }, this);","    },","","    _applyFilter: function (filter) {","        console.log(this._nodeMap);","    },","","    _setFilter: function (value) {","        if (value !== this.get('filter')) {","            this._applyFilter(value);","        }","","        return value;","    }","","}, {","    ATTRS: {","        filter: {","            setter: '_setFilter',","            value : null","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Filter = Filter;","","","}, '1.0.0', {\"requires\": [\"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].lines = {"1":0,"3":0,"5":0,"10":0,"14":0,"18":0,"19":0,"22":0,"35":0};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].functions = {"(anonymous 2):10":0,"initializer:8":0,"_applyFilter:13":0,"_setFilter:17":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].coveredLines = 9;
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].coveredFunctions = 5;
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 1);
YUI.add('libbit-treeview-filter', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 3);
var Filter;

_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 5);
Filter = Y.Base.create('filter', Y.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        // console.log(this.get('filter'));
            _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "initializer", 8);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 10);
this.get('model').after('change', function() { _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "(anonymous 2)", 10);
console.log('filter'); }, this);
    },

    _applyFilter: function (filter) {
        _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "_applyFilter", 13);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 14);
console.log(this._nodeMap);
    },

    _setFilter: function (value) {
        _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "_setFilter", 17);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 18);
if (value !== this.get('filter')) {
            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 19);
this._applyFilter(value);
        }

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 22);
return value;
    }

}, {
    ATTRS: {
        filter: {
            setter: '_setFilter',
            value : null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 35);
Y.namespace('Libbit.TreeView').Filter = Filter;


}, '1.0.0', {"requires": ["libbit-treeview"]});
