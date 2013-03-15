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
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].code=["YUI.add('libbit-nodescroll', function (Y, NAME) {","","var NodeScroll;","","NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {","    anim: null,","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        this._bindDD(this.get('container'), this.get('groups'));","        this.on('drop:over', this._handle, this);","    },","","    _bindDD: function (node, groups) {","        new Y.DD.Drop({","            node         : node,","            bubbleTargets: this,","            groups       : groups","        });","    },","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handle: function (e) {","        console.log('handle');","        var dropNode    = e.drop.get('node'),","            dragY       = e.drag.mouseXY[1],","            nodeHeight  = dropNode.get('offsetHeight'),","            margin      = 25,","            relativeY   = dragY - margin,","            self        = this,","            node,","            scrollFunc;","","        // Determine scrolling direction (if needed)","        if (relativeY > nodeHeight) {","            scrollFunc = function() {","                return [0, node.get('scrollTop') + node.get('offsetHeight')];","            };","        } else if (relativeY < 25) {","            scrollFunc = function() {","                return [0, node.get('scrollTop') - node.get('offsetHeight')];","            };","        } else {","            if (this.anim) {","                if (this.anim.get('running')) {","                    this.anim.stop();","                    Y.DD.DDM.syncActiveShims(true);","                }","            }","        }","","        // Scroll","        if (scrollFunc) {","            node = dropNode;","","            if (this.anim === null) {","                this.anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: scrollFunc","                    },","                    easing: Y.Easing.easeOut,","                    duration: (0.01 * node.get('offsetHeight'))","                });","            }","","            this.anim.set('to', { scroll: scrollFunc });","            this.anim.run();","            this.anim.on('tween', function() {","                self.fire('scrolling');","            });","            this.anim.on('end', function() {","                Y.DD.DDM.syncActiveShims(true);","            });","        }","    }","}, {","    ATTRS : {","        container: null,","        nodeSelector: { value: '' },","        groups: { value: [] }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').NodeScroll = NodeScroll;","","","}, '1.0.0', {\"requires\": [\"node\", \"event\", \"dd\", \"anim\"]});"];
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].lines = {"1":0,"3":0,"5":0,"12":0,"13":0,"17":0,"28":0,"29":0,"39":0,"40":0,"41":0,"43":0,"44":0,"45":0,"48":0,"49":0,"50":0,"51":0,"57":0,"58":0,"60":0,"61":0,"71":0,"72":0,"73":0,"74":0,"76":0,"77":0,"90":0};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].functions = {"initializer:11":0,"_bindDD:16":0,"scrollFunc:40":0,"scrollFunc:44":0,"(anonymous 2):73":0,"(anonymous 3):76":0,"_handle:27":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].coveredLines = 29;
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].coveredFunctions = 8;
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 1);
YUI.add('libbit-nodescroll', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 3);
var NodeScroll;

_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 5);
NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {
    anim: null,

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "initializer", 11);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 12);
this._bindDD(this.get('container'), this.get('groups'));
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 13);
this.on('drop:over', this._handle, this);
    },

    _bindDD: function (node, groups) {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_bindDD", 16);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 17);
new Y.DD.Drop({
            node         : node,
            bubbleTargets: this,
            groups       : groups
        });
    },

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handle: function (e) {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_handle", 27);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 28);
console.log('handle');
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 29);
var dropNode    = e.drop.get('node'),
            dragY       = e.drag.mouseXY[1],
            nodeHeight  = dropNode.get('offsetHeight'),
            margin      = 25,
            relativeY   = dragY - margin,
            self        = this,
            node,
            scrollFunc;

        // Determine scrolling direction (if needed)
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 39);
if (relativeY > nodeHeight) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 40);
scrollFunc = function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "scrollFunc", 40);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 41);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
            };
        } else {_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 43);
if (relativeY < 25) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 44);
scrollFunc = function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "scrollFunc", 44);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 45);
return [0, node.get('scrollTop') - node.get('offsetHeight')];
            };
        } else {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 48);
if (this.anim) {
                _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 49);
if (this.anim.get('running')) {
                    _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 50);
this.anim.stop();
                    _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 51);
Y.DD.DDM.syncActiveShims(true);
                }
            }
        }}

        // Scroll
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 57);
if (scrollFunc) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 58);
node = dropNode;

            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 60);
if (this.anim === null) {
                _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 61);
this.anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: scrollFunc
                    },
                    easing: Y.Easing.easeOut,
                    duration: (0.01 * node.get('offsetHeight'))
                });
            }

            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 71);
this.anim.set('to', { scroll: scrollFunc });
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 72);
this.anim.run();
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 73);
this.anim.on('tween', function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 2)", 73);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 74);
self.fire('scrolling');
            });
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 76);
this.anim.on('end', function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 3)", 76);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 77);
Y.DD.DDM.syncActiveShims(true);
            });
        }
    }
}, {
    ATTRS : {
        container: null,
        nodeSelector: { value: '' },
        groups: { value: [] }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 90);
Y.namespace('Libbit').NodeScroll = NodeScroll;


}, '1.0.0', {"requires": ["node", "event", "dd", "anim"]});
