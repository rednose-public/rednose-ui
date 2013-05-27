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
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].code=["YUI.add('libbit-nodescroll', function (Y, NAME) {","","/**"," * Node scroll utility - Configures a node containing DD nodes to automatically scroll when dragging."," *"," * @module libbit-nodescroll"," */","","var NodeScroll;","","/**"," * A base class for Nodescroll, providing:"," * <ul>"," *    <li>Adds the needed scrolling CSS to the node</li>"," *    <li>Binds to the provided DD groups</li>"," * </ul>"," *"," * Quick Example:<br/>"," *"," * <pre><code>var instance = new Y.Libbit.NodeScroll({"," *     container: this.get('container').one('.libbit-scroll-view'),"," *     groups: ['libbit-treeview']"," * });"," * </code></pre>"," *"," * @class NodeScroll"," * @param {Object} [config] The following configuration properties are required:"," *"," *     @param {Object} [config.container] The container to bind the scrollview to."," *     @param {Array} [config.groups] The DD groups that can interact with this"," *         scrollview instance."," *"," * @constructor"," * @extends Base"," */","NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {","    // -- Protected Properties -------------------------------------------------","","    /**","     * Reference to the currently active animation instance.","     *","     * @property {Anim} _anim","     * @default null","     * @protected","     */","    _anim: null,","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        this._bindDD(this.get('container'), this.get('groups'));","        this.on('drop:over', this._handle, this);","    },","","    // -- Protected Methods ----------------------------------------------------","","    _bindDD: function (node, groups) {","        new Y.DD.Drop({","            node         : node,","            bubbleTargets: this,","            groups       : groups","        });","    },","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handle: function (e) {","        var dropNode    = e.drop.get('node'),","            dragY       = e.drag.mouseXY[1],","            nodeHeight  = dropNode.get('offsetHeight'),","            margin      = 25,","            relativeY   = dragY - margin,","            self        = this,","            node,","            scrollFunc;","","        // Determine scrolling direction (if needed)","        if (relativeY > nodeHeight) {","            scrollFunc = function() {","                return [0, node.get('scrollTop') + node.get('offsetHeight')];","            };","        } else if (relativeY < 25) {","            scrollFunc = function() {","                return [0, node.get('scrollTop') - node.get('offsetHeight')];","            };","        } else {","            if (this._anim) {","                if (this._anim.get('running')) {","                    this._anim.stop();","                    Y.DD.DDM.syncActiveShims(true);","                }","            }","        }","","        // Scroll","        if (scrollFunc) {","            node = dropNode;","","            if (this._anim === null) {","                this._anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: scrollFunc","                    },","                    easing: Y.Easing.easeOut,","                    duration: (0.01 * node.get('offsetHeight'))","                });","            }","","            this._anim.set('to', { scroll: scrollFunc });","            this._anim.run();","            this._anim.on('tween', function() {","                self.fire('scrolling');","            });","            this._anim.on('end', function() {","                Y.DD.DDM.syncActiveShims(true);","            });","        }","    }","}, {","    ATTRS : {","        /**","         * The scrollable container.","         *","         * @attribute {Object}","         * @default null","         */","        container: {","            value: null","        },","","        /**","         * The DD groups that can interact with this scroll instance.","         *","         * @attribute {Array}","         * @default []","         */","        groups: {","            value: []","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').NodeScroll = NodeScroll;","","","}, '1.0.0', {\"requires\": [\"node\", \"event\", \"dd\", \"anim\"]});"];
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].lines = {"1":0,"9":0,"36":0,"51":0,"52":0,"58":0,"69":0,"79":0,"80":0,"81":0,"83":0,"84":0,"85":0,"88":0,"89":0,"90":0,"91":0,"97":0,"98":0,"100":0,"101":0,"111":0,"112":0,"113":0,"114":0,"116":0,"117":0,"146":0};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].functions = {"initializer:50":0,"_bindDD:57":0,"scrollFunc:80":0,"scrollFunc:84":0,"(anonymous 2):113":0,"(anonymous 3):116":0,"_handle:68":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].coveredLines = 28;
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].coveredFunctions = 8;
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 1);
YUI.add('libbit-nodescroll', function (Y, NAME) {

/**
 * Node scroll utility - Configures a node containing DD nodes to automatically scroll when dragging.
 *
 * @module libbit-nodescroll
 */

_yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 9);
var NodeScroll;

/**
 * A base class for Nodescroll, providing:
 * <ul>
 *    <li>Adds the needed scrolling CSS to the node</li>
 *    <li>Binds to the provided DD groups</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new Y.Libbit.NodeScroll({
 *     container: this.get('container').one('.libbit-scroll-view'),
 *     groups: ['libbit-treeview']
 * });
 * </code></pre>
 *
 * @class NodeScroll
 * @param {Object} [config] The following configuration properties are required:
 *
 *     @param {Object} [config.container] The container to bind the scrollview to.
 *     @param {Array} [config.groups] The DD groups that can interact with this
 *         scrollview instance.
 *
 * @constructor
 * @extends Base
 */
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 36);
NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {
    // -- Protected Properties -------------------------------------------------

    /**
     * Reference to the currently active animation instance.
     *
     * @property {Anim} _anim
     * @default null
     * @protected
     */
    _anim: null,

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "initializer", 50);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 51);
this._bindDD(this.get('container'), this.get('groups'));
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 52);
this.on('drop:over', this._handle, this);
    },

    // -- Protected Methods ----------------------------------------------------

    _bindDD: function (node, groups) {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_bindDD", 57);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 58);
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
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_handle", 68);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 69);
var dropNode    = e.drop.get('node'),
            dragY       = e.drag.mouseXY[1],
            nodeHeight  = dropNode.get('offsetHeight'),
            margin      = 25,
            relativeY   = dragY - margin,
            self        = this,
            node,
            scrollFunc;

        // Determine scrolling direction (if needed)
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 79);
if (relativeY > nodeHeight) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 80);
scrollFunc = function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "scrollFunc", 80);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 81);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
            };
        } else {_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 83);
if (relativeY < 25) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 84);
scrollFunc = function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "scrollFunc", 84);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 85);
return [0, node.get('scrollTop') - node.get('offsetHeight')];
            };
        } else {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 88);
if (this._anim) {
                _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 89);
if (this._anim.get('running')) {
                    _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 90);
this._anim.stop();
                    _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 91);
Y.DD.DDM.syncActiveShims(true);
                }
            }
        }}

        // Scroll
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 97);
if (scrollFunc) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 98);
node = dropNode;

            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 100);
if (this._anim === null) {
                _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 101);
this._anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: scrollFunc
                    },
                    easing: Y.Easing.easeOut,
                    duration: (0.01 * node.get('offsetHeight'))
                });
            }

            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 111);
this._anim.set('to', { scroll: scrollFunc });
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 112);
this._anim.run();
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 113);
this._anim.on('tween', function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 2)", 113);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 114);
self.fire('scrolling');
            });
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 116);
this._anim.on('end', function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 3)", 116);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 117);
Y.DD.DDM.syncActiveShims(true);
            });
        }
    }
}, {
    ATTRS : {
        /**
         * The scrollable container.
         *
         * @attribute {Object}
         * @default null
         */
        container: {
            value: null
        },

        /**
         * The DD groups that can interact with this scroll instance.
         *
         * @attribute {Array}
         * @default []
         */
        groups: {
            value: []
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 146);
Y.namespace('Libbit').NodeScroll = NodeScroll;


}, '1.0.0', {"requires": ["node", "event", "dd", "anim"]});
