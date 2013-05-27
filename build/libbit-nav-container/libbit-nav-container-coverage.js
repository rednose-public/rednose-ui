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
_yuitest_coverage["build/libbit-nav-container/libbit-nav-container.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-nav-container/libbit-nav-container.js",
    code: []
};
_yuitest_coverage["build/libbit-nav-container/libbit-nav-container.js"].code=["YUI.add('libbit-nav-container', function (Y, NAME) {","","var NavContainer;","","NavContainer = Y.Base.create('nav', Y.Widget, [Y.WidgetStdMod, Y.WidgetButtons]);","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').NavContainer = NavContainer;","","","}, '1.0.0', {\"requires\": [\"widget\", \"widget-buttons\", \"widget-stdmod\"]});"];
_yuitest_coverage["build/libbit-nav-container/libbit-nav-container.js"].lines = {"1":0,"3":0,"5":0,"8":0};
_yuitest_coverage["build/libbit-nav-container/libbit-nav-container.js"].functions = {"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-nav-container/libbit-nav-container.js"].coveredLines = 4;
_yuitest_coverage["build/libbit-nav-container/libbit-nav-container.js"].coveredFunctions = 1;
_yuitest_coverline("build/libbit-nav-container/libbit-nav-container.js", 1);
YUI.add('libbit-nav-container', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-nav-container/libbit-nav-container.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-nav-container/libbit-nav-container.js", 3);
var NavContainer;

_yuitest_coverline("build/libbit-nav-container/libbit-nav-container.js", 5);
NavContainer = Y.Base.create('nav', Y.Widget, [Y.WidgetStdMod, Y.WidgetButtons]);

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-nav-container/libbit-nav-container.js", 8);
Y.namespace('Libbit').NavContainer = NavContainer;


}, '1.0.0', {"requires": ["widget", "widget-buttons", "widget-stdmod"]});
