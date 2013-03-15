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
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].code=["YUI.add('libbit-nodescroll', function (Y, NAME) {","","var NodeScroll;","","NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {","    // -- Protected Properties -------------------------------------------------","","    _anim: null,","","    // -- Lifecycle Methods ----------------------------------------------------","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        this._bindDD(this.get('container'), this.get('groups'));","        this.on('drop:over', this._handle, this);","    },","","    // -- Protected Methods ----------------------------------------------------","","    _bindDD: function (node, groups) {","        new Y.DD.Drop({","            node         : node,","            bubbleTargets: this,","            groups       : groups","        });","    },","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handle: function (e) {","        var dropNode    = e.drop.get('node'),","            dragY       = e.drag.mouseXY[1],","            nodeHeight  = dropNode.get('offsetHeight'),","            margin      = 25,","            relativeY   = dragY - margin,","            self        = this,","            node,","            scrollFunc;","","        // Determine scrolling direction (if needed)","        if (relativeY > nodeHeight) {","            scrollFunc = function() {","                return [0, node.get('scrollTop') + node.get('offsetHeight')];","            };","        } else if (relativeY < 25) {","            scrollFunc = function() {","                return [0, node.get('scrollTop') - node.get('offsetHeight')];","            };","        } else {","            if (this._anim) {","                if (this._anim.get('running')) {","                    this._anim.stop();","                    Y.DD.DDM.syncActiveShims(true);","                }","            }","        }","","        // Scroll","        if (scrollFunc) {","            node = dropNode;","","            if (this._anim === null) {","                this._anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: scrollFunc","                    },","                    easing: Y.Easing.easeOut,","                    duration: (0.01 * node.get('offsetHeight'))","                });","            }","","            this._anim.set('to', { scroll: scrollFunc });","            this._anim.run();","            this._anim.on('tween', function() {","                self.fire('scrolling');","            });","            this._anim.on('end', function() {","                Y.DD.DDM.syncActiveShims(true);","            });","        }","    }","}, {","    ATTRS : {","        container: {","            value: null","        },","","        /**","         * The DD groups that can interact with this scroll instance.","         * @attribute {Array}","         */","        groups: {","            value: []","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').NodeScroll = NodeScroll;","","","}, '1.0.0', {\"requires\": [\"node\", \"event\", \"dd\", \"anim\"]});"];
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].lines = {"1":0,"3":0,"5":0,"16":0,"17":0,"23":0,"34":0,"44":0,"45":0,"46":0,"48":0,"49":0,"50":0,"53":0,"54":0,"55":0,"56":0,"62":0,"63":0,"65":0,"66":0,"76":0,"77":0,"78":0,"79":0,"81":0,"82":0,"103":0};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].functions = {"initializer:15":0,"_bindDD:22":0,"scrollFunc:45":0,"scrollFunc:49":0,"(anonymous 2):78":0,"(anonymous 3):81":0,"_handle:33":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].coveredLines = 28;
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].coveredFunctions = 8;
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 1);
YUI.add('libbit-nodescroll', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 3);
var NodeScroll;

_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 5);
NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {
    // -- Protected Properties -------------------------------------------------

    _anim: null,

    // -- Lifecycle Methods ----------------------------------------------------

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "initializer", 15);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 16);
this._bindDD(this.get('container'), this.get('groups'));
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 17);
this.on('drop:over', this._handle, this);
    },

    // -- Protected Methods ----------------------------------------------------

    _bindDD: function (node, groups) {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_bindDD", 22);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 23);
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
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_handle", 33);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 34);
var dropNode    = e.drop.get('node'),
            dragY       = e.drag.mouseXY[1],
            nodeHeight  = dropNode.get('offsetHeight'),
            margin      = 25,
            relativeY   = dragY - margin,
            self        = this,
            node,
            scrollFunc;

        // Determine scrolling direction (if needed)
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 44);
if (relativeY > nodeHeight) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 45);
scrollFunc = function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "scrollFunc", 45);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 46);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
            };
        } else {_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 48);
if (relativeY < 25) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 49);
scrollFunc = function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "scrollFunc", 49);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 50);
return [0, node.get('scrollTop') - node.get('offsetHeight')];
            };
        } else {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 53);
if (this._anim) {
                _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 54);
if (this._anim.get('running')) {
                    _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 55);
this._anim.stop();
                    _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 56);
Y.DD.DDM.syncActiveShims(true);
                }
            }
        }}

        // Scroll
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 62);
if (scrollFunc) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 63);
node = dropNode;

            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 65);
if (this._anim === null) {
                _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 66);
this._anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: scrollFunc
                    },
                    easing: Y.Easing.easeOut,
                    duration: (0.01 * node.get('offsetHeight'))
                });
            }

            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 76);
this._anim.set('to', { scroll: scrollFunc });
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 77);
this._anim.run();
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 78);
this._anim.on('tween', function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 2)", 78);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 79);
self.fire('scrolling');
            });
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 81);
this._anim.on('end', function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 3)", 81);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 82);
Y.DD.DDM.syncActiveShims(true);
            });
        }
    }
}, {
    ATTRS : {
        container: {
            value: null
        },

        /**
         * The DD groups that can interact with this scroll instance.
         * @attribute {Array}
         */
        groups: {
            value: []
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 103);
Y.namespace('Libbit').NodeScroll = NodeScroll;


}, '1.0.0', {"requires": ["node", "event", "dd", "anim"]});
