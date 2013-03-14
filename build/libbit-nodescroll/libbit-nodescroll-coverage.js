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
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].code=["YUI.add('libbit-nodescroll', function (Y, NAME) {","","var NodeScroll;","","NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {","    anim: null,","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        var groups = [];","","        // Y.Array.each(this.get('targets', function (target) {","        //     Y.Array.each(target.get('groups')) {","        //         console.log(group);","        //     }","        // }));","        // scroll.addTarget(this);","        this._bindDD(this.get('container'), this.get('groups'));","","        this.on('drop:over', this._handle, this);","    },","","    _bindDD: function (node, groups) {","        new Y.DD.Drop({","            node         : node,","            bubbleTargets: this,","            groups       : groups","        });","    },","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handle: function (e) {","        var dropNode    = e.drop.get('node'),","            dragY       = e.drag.mouseXY[1],","            nodeHeight  = dropNode.get('offsetHeight'),","            margin      = 25,","            relativeY   = dragY - margin,","            self        = this,","            node,","            scrollFunc;","","        // Determine scrolling direction (if needed)","        if (relativeY > nodeHeight) {","            scrollFunc = function() {","                return [0, node.get('scrollTop') + node.get('offsetHeight')];","            };","        } else if (relativeY < 25) {","            scrollFunc = function() {","                return [0, node.get('scrollTop') - node.get('offsetHeight')];","            };","        } else {","            if (this.anim) {","                if (this.anim.get('running')) {","                    this.anim.stop();","                    Y.DD.DDM.syncActiveShims(true);","                }","            }","        }","","        // Scroll","        if (scrollFunc) {","            node = dropNode;","","            if (this.anim === null) {","                this.anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: scrollFunc","                    },","                    easing: Y.Easing.easeOut,","                    duration: (0.01 * node.get('offsetHeight'))","                });","            }","","            this.anim.set('to', { scroll: scrollFunc });","            this.anim.run();","            this.anim.on('tween', function() {","                self.fire('scrolling');","            });","            this.anim.on('end', function() {","                Y.DD.DDM.syncActiveShims(true);","            });","        }","    }","}, {","    ATTRS : {","        container: null,","        nodeSelector: { value: '' },","        groups: { value: [] }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').NodeScroll = NodeScroll;","","","}, '1.0.0', {\"requires\": [\"node\", \"event\", \"dd\", \"anim\"]});"];
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].lines = {"1":0,"3":0,"5":0,"12":0,"20":0,"22":0,"26":0,"37":0,"47":0,"48":0,"49":0,"51":0,"52":0,"53":0,"56":0,"57":0,"58":0,"59":0,"65":0,"66":0,"68":0,"69":0,"79":0,"80":0,"81":0,"82":0,"84":0,"85":0,"98":0};
_yuitest_coverage["build/libbit-nodescroll/libbit-nodescroll.js"].functions = {"initializer:11":0,"_bindDD:25":0,"scrollFunc:48":0,"scrollFunc:52":0,"(anonymous 2):81":0,"(anonymous 3):84":0,"_handle:36":0,"(anonymous 1):1":0};
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
var groups = [];

        // Y.Array.each(this.get('targets', function (target) {
        //     Y.Array.each(target.get('groups')) {
        //         console.log(group);
        //     }
        // }));
        // scroll.addTarget(this);
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 20);
this._bindDD(this.get('container'), this.get('groups'));

        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 22);
this.on('drop:over', this._handle, this);
    },

    _bindDD: function (node, groups) {
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_bindDD", 25);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 26);
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
        _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "_handle", 36);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 37);
var dropNode    = e.drop.get('node'),
            dragY       = e.drag.mouseXY[1],
            nodeHeight  = dropNode.get('offsetHeight'),
            margin      = 25,
            relativeY   = dragY - margin,
            self        = this,
            node,
            scrollFunc;

        // Determine scrolling direction (if needed)
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 47);
if (relativeY > nodeHeight) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 48);
scrollFunc = function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "scrollFunc", 48);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 49);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
            };
        } else {_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 51);
if (relativeY < 25) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 52);
scrollFunc = function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "scrollFunc", 52);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 53);
return [0, node.get('scrollTop') - node.get('offsetHeight')];
            };
        } else {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 56);
if (this.anim) {
                _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 57);
if (this.anim.get('running')) {
                    _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 58);
this.anim.stop();
                    _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 59);
Y.DD.DDM.syncActiveShims(true);
                }
            }
        }}

        // Scroll
        _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 65);
if (scrollFunc) {
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 66);
node = dropNode;

            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 68);
if (this.anim === null) {
                _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 69);
this.anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: scrollFunc
                    },
                    easing: Y.Easing.easeOut,
                    duration: (0.01 * node.get('offsetHeight'))
                });
            }

            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 79);
this.anim.set('to', { scroll: scrollFunc });
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 80);
this.anim.run();
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 81);
this.anim.on('tween', function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 2)", 81);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 82);
self.fire('scrolling');
            });
            _yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 84);
this.anim.on('end', function() {
                _yuitest_coverfunc("build/libbit-nodescroll/libbit-nodescroll.js", "(anonymous 3)", 84);
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 85);
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
_yuitest_coverline("build/libbit-nodescroll/libbit-nodescroll.js", 98);
Y.namespace('Libbit').NodeScroll = NodeScroll;


}, '1.0.0', {"requires": ["node", "event", "dd", "anim"]});
