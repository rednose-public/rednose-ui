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
_yuitest_coverage["build/libbit-panel/libbit-panel.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-panel/libbit-panel.js",
    code: []
};
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].code=["YUI.add('libbit-panel', function (Y, NAME) {","","var Panel;","","Panel = Y.Base.create('panel', Y.Widget, [","    Y.WidgetPosition,","","    Y.WidgetAutohide,","    Y.WidgetModality,","    Y.WidgetPositionAlign,","    Y.WidgetPositionConstrain,","    Y.WidgetStack","]);","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Panel = Panel;","","","}, '1.0.0', {","    \"requires\": [","        \"panel\",","        \"widget\",","        \"widget-autohide\",","        \"widget-modality\",","        \"widget-position\",","        \"widget-position-align\",","        \"widget-position-constrain\",","        \"widget-stack\"","    ]","});"];
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].lines = {"1":0,"3":0,"5":0,"16":0};
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].functions = {"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].coveredLines = 4;
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].coveredFunctions = 1;
_yuitest_coverline("build/libbit-panel/libbit-panel.js", 1);
YUI.add('libbit-panel', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-panel/libbit-panel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-panel/libbit-panel.js", 3);
var Panel;

_yuitest_coverline("build/libbit-panel/libbit-panel.js", 5);
Panel = Y.Base.create('panel', Y.Widget, [
    Y.WidgetPosition,

    Y.WidgetAutohide,
    Y.WidgetModality,
    Y.WidgetPositionAlign,
    Y.WidgetPositionConstrain,
    Y.WidgetStack
]);

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-panel/libbit-panel.js", 16);
Y.namespace('Libbit').Panel = Panel;


}, '1.0.0', {
    "requires": [
        "panel",
        "widget",
        "widget-autohide",
        "widget-modality",
        "widget-position",
        "widget-position-align",
        "widget-position-constrain",
        "widget-stack"
    ]
});
