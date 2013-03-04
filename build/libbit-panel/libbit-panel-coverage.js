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
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].code=["YUI.add('libbit-panel', function (Y, NAME) {","","var Panel;","","Panel = Y.Base.create('panel', Y.Panel, [], {","","    initializer: function() {","        var container = this.get('boundingBox');","        var self = this;","","        this.after('render', function() {","            // Remove the first header (close button).","            var closeButton = container.one('.yui3-button-close');","","            if (closeButton) {","                closeButton.ancestor('.yui3-widget-hd').remove();","            }","","            // Re-align the modal panel.","            self.move(1, 1);","            self.centered();","        });","    }","","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Panel = Panel;","","","}, '1.0.0', {\"requires\": [\"panel\"]});"];
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].lines = {"1":0,"3":0,"5":0,"8":0,"9":0,"11":0,"13":0,"15":0,"16":0,"20":0,"21":0,"28":0};
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].functions = {"(anonymous 2):11":0,"initializer:7":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].coveredLines = 12;
_yuitest_coverage["build/libbit-panel/libbit-panel.js"].coveredFunctions = 3;
_yuitest_coverline("build/libbit-panel/libbit-panel.js", 1);
YUI.add('libbit-panel', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-panel/libbit-panel.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-panel/libbit-panel.js", 3);
var Panel;

_yuitest_coverline("build/libbit-panel/libbit-panel.js", 5);
Panel = Y.Base.create('panel', Y.Panel, [], {

    initializer: function() {
        _yuitest_coverfunc("build/libbit-panel/libbit-panel.js", "initializer", 7);
_yuitest_coverline("build/libbit-panel/libbit-panel.js", 8);
var container = this.get('boundingBox');
        _yuitest_coverline("build/libbit-panel/libbit-panel.js", 9);
var self = this;

        _yuitest_coverline("build/libbit-panel/libbit-panel.js", 11);
this.after('render', function() {
            // Remove the first header (close button).
            _yuitest_coverfunc("build/libbit-panel/libbit-panel.js", "(anonymous 2)", 11);
_yuitest_coverline("build/libbit-panel/libbit-panel.js", 13);
var closeButton = container.one('.yui3-button-close');

            _yuitest_coverline("build/libbit-panel/libbit-panel.js", 15);
if (closeButton) {
                _yuitest_coverline("build/libbit-panel/libbit-panel.js", 16);
closeButton.ancestor('.yui3-widget-hd').remove();
            }

            // Re-align the modal panel.
            _yuitest_coverline("build/libbit-panel/libbit-panel.js", 20);
self.move(1, 1);
            _yuitest_coverline("build/libbit-panel/libbit-panel.js", 21);
self.centered();
        });
    }

});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-panel/libbit-panel.js", 28);
Y.namespace('Libbit').Panel = Panel;


}, '1.0.0', {"requires": ["panel"]});
