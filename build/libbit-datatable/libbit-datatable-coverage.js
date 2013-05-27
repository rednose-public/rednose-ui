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
_yuitest_coverage["build/libbit-datatable/libbit-datatable.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-datatable/libbit-datatable.js",
    code: []
};
_yuitest_coverage["build/libbit-datatable/libbit-datatable.js"].code=["YUI.add('libbit-datatable', function (Y, NAME) {","","var DataTable;","","DataTable = Y.Base.create('dataTable', Y.DataTable.Base, [ Y.DataTable.Scrollable, Y.DataTable.Sortable ]);","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DataTable = DataTable;","","","}, '1.0.0', {\"requires\": [\"datatable-base\", \"datatable-scroll\", \"datatable-sort\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-datatable/libbit-datatable.js"].lines = {"1":0,"3":0,"5":0,"8":0};
_yuitest_coverage["build/libbit-datatable/libbit-datatable.js"].functions = {"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-datatable/libbit-datatable.js"].coveredLines = 4;
_yuitest_coverage["build/libbit-datatable/libbit-datatable.js"].coveredFunctions = 1;
_yuitest_coverline("build/libbit-datatable/libbit-datatable.js", 1);
YUI.add('libbit-datatable', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-datatable/libbit-datatable.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-datatable/libbit-datatable.js", 3);
var DataTable;

_yuitest_coverline("build/libbit-datatable/libbit-datatable.js", 5);
DataTable = Y.Base.create('dataTable', Y.DataTable.Base, [ Y.DataTable.Scrollable, Y.DataTable.Sortable ]);

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-datatable/libbit-datatable.js", 8);
Y.namespace('Libbit').DataTable = DataTable;


}, '1.0.0', {"requires": ["datatable-base", "datatable-scroll", "datatable-sort"], "skinnable": true});
