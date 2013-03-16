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
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].code=["YUI.add('libbit-treeview-filter', function (Y, NAME) {","","","","}, '1.0.0', {\"requires\": [\"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].lines = {"1":0};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].functions = {};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].coveredLines = 1;
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].coveredFunctions = 0;
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 1);
YUI.add('libbit-treeview-filter', function (Y, NAME) {



}, '1.0.0', {"requires": ["libbit-treeview"]});
