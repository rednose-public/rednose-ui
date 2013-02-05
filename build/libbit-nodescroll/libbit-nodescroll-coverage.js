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
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-nodescroll/libbit-nodescroll.js",
    code: []
};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].code=["YUI.add('libbit-nodescroll', function (Y, NAME) {","","var NodeScroll;","","NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        var self = this;","","        var event = Y.delegate('DOMNodeInserted', function(e) {","            event.detach();","","            self._bindDD(e);","        }, 'body', this.get('nodeSelector'));","    },","","    _bindDD: function(e) {","        var self = this;","        var dd = new Y.DD.Drop({","            node         : e.currentTarget,","            bubbleTargets: this,","            groups       : this.get('groups')","        });","        dd.on('drop:over', function(e) {","            self._handle(e);","        });","    },","","    _handle: function(e) {","        console.log(e);","    }","}, {","    ATTRS : {","        nodeSelector: { value: '' },","        groups: { value: [] }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').NodeScroll = NodeScroll;","","","}, '1.0.0', {\"requires\": [\"node\", \"event\"]});"];
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].lines = {"1":0,"3":0,"5":0,"10":0,"12":0,"13":0,"15":0,"20":0,"21":0,"26":0,"27":0,"32":0,"42":0};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].functions = {"(anonymous 2):12":0,"initializer:9":0,"(anonymous 3):26":0,"_bindDD:19":0,"_handle:31":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].coveredLines = 13;
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].coveredFunctions = 6;
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 1);
YUI.add('libbit-nodescroll', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 3);
var NodeScroll;

_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 5);
NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "initializer", 9);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 10);
var self = this;

        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 12);
var event = Y.delegate('DOMNodeInserted', function(e) {
            _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 2)", 12);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 13);
event.detach();

            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 15);
self._bindDD(e);
        }, 'body', this.get('nodeSelector'));
    },

    _bindDD: function(e) {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_bindDD", 19);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 20);
var self = this;
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 21);
var dd = new Y.DD.Drop({
            node         : e.currentTarget,
            bubbleTargets: this,
            groups       : this.get('groups')
        });
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 26);
dd.on('drop:over', function(e) {
            _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 3)", 26);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 27);
self._handle(e);
        });
    },

    _handle: function(e) {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_handle", 31);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 32);
console.log(e);
    }
}, {
    ATTRS : {
        nodeSelector: { value: '' },
        groups: { value: [] }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 42);
Y.namespace('Libbit').NodeScroll = NodeScroll;


}, '1.0.0', {"requires": ["node", "event"]});
