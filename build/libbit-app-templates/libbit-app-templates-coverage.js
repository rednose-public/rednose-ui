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
_yuitest_coverage["build/libbit-app-templates/libbit-app-templates.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-app-templates/libbit-app-templates.js",
    code: []
};
_yuitest_coverage["build/libbit-app-templates/libbit-app-templates.js"].code=["YUI.add('libbit-app-templates', function (Y, NAME) {","","/**"," * LiBBiT framework app/view templates"," */","function Templates() {","    Templates.superclass.constructor.apply(this);","}","","/**"," * Basic master-detail app view"," */","Templates.masterDetailApp =","    '<div class=\"yui3-g libbit-app-master-detail-container\">' +","        '<div class=\"yui3-u libbit-app-master-view\"></div>' +","        '<div class=\"yui3-u libbit-app-detail-view\"></div>' +","    '</div>';","","/**"," * Basic master-detail grid subview"," */","Templates.masterDetailGrid =","    '<div class=\"yui3-g libbit-grid-master-detail-container\">' +","        '<div class=\"yui3-u libbit-grid-master-view\"></div>' +","        '<div class=\"yui3-u libbit-grid-detail-view\"></div>' +","    '</div>';","","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Templates = Templates;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-app-templates/libbit-app-templates.js"].lines = {"1":0,"6":0,"7":0,"13":0,"22":0,"30":0};
_yuitest_coverage["build/libbit-app-templates/libbit-app-templates.js"].functions = {"Templates:6":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-app-templates/libbit-app-templates.js"].coveredLines = 6;
_yuitest_coverage["build/libbit-app-templates/libbit-app-templates.js"].coveredFunctions = 2;
_yuitest_coverline("build/libbit-app-templates/libbit-app-templates.js", 1);
YUI.add('libbit-app-templates', function (Y, NAME) {

/**
 * LiBBiT framework app/view templates
 */
_yuitest_coverfunc("build/libbit-app-templates/libbit-app-templates.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-app-templates/libbit-app-templates.js", 6);
function Templates() {
    _yuitest_coverfunc("build/libbit-app-templates/libbit-app-templates.js", "Templates", 6);
_yuitest_coverline("build/libbit-app-templates/libbit-app-templates.js", 7);
Templates.superclass.constructor.apply(this);
}

/**
 * Basic master-detail app view
 */
_yuitest_coverline("build/libbit-app-templates/libbit-app-templates.js", 13);
Templates.masterDetailApp =
    '<div class="yui3-g libbit-app-master-detail-container">' +
        '<div class="yui3-u libbit-app-master-view"></div>' +
        '<div class="yui3-u libbit-app-detail-view"></div>' +
    '</div>';

/**
 * Basic master-detail grid subview
 */
_yuitest_coverline("build/libbit-app-templates/libbit-app-templates.js", 22);
Templates.masterDetailGrid =
    '<div class="yui3-g libbit-grid-master-detail-container">' +
        '<div class="yui3-u libbit-grid-master-view"></div>' +
        '<div class="yui3-u libbit-grid-detail-view"></div>' +
    '</div>';


// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-app-templates/libbit-app-templates.js", 30);
Y.namespace('Libbit').Templates = Templates;


}, '1.0.0');
