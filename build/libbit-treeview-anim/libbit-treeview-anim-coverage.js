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
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview-anim/libbit-treeview-anim.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].code=["YUI.add('libbit-treeview-anim', function (Y, NAME) {","","var Anim;","","/**"," * Y.Libbit.TreeView widget extension to provide animations."," */","Anim = function () {};","","// TODO: Prevent animation stacking.","Anim.prototype = {","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        this.on('collapseComplete', this._afterCollapse, this);","        this.on('expandComplete', this._afterExpand, this);","    },","","    /**","     * Handles the collapse event.","     */","    _afterCollapse: function (e) {","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        this._animateSlideIn(children);","    },","","    /**","     * Handles the expand event.","     */","    _afterExpand: function (e) {","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        this._animateSlideOut(children);","    },","","    /**","     * Animates a slide in of an collapsed element as a post process.","     */","    _animateSlideIn: function (el) {","        var anim;","","        // The element has been hidden by the tree, show it by removing the 'display' style attribute.","        el.setStyle('display', null);","","        // Animate the object to a height of 0.","        anim = new Y.Anim({","            node    : el,","            to      : { height: 0 },","            duration: '.25',","            easing  : Y.Easing.easeOut","        });","","        // Restore the 'display' style attribute and reset the height to 100%.","        anim.on('end', function () {","            el.setStyle('display', 'none');","            el.setStyle('height', '100%');","        });","","        anim.run();","    },","","    /**","     * Animates a slide in of an expanded element as a post process.","     */","    _animateSlideOut: function (el) {","        var height = el.getComputedStyle('height'),","            anim;","","        // The element is visible, set the height to 0.","        el.setStyle('height', '0px');","","        // Animate the object back to it's original height.","        anim = new Y.Anim({","            node     : el,","            to       : { height: height },","            duration: '.25'","        });","","        // Remove the 'height' style attribute, so it doesn't constrain expanding child objects.","        anim.on('end', function () {","            el.setStyle('height', null);","        });","","        anim.run();","    },","","    /**","     * Retrieve the DOM element containing the children of a given TreeView node.","     */","    _getChildrenElement: function (node) {","        var boundingBox = this.get('boundingBox'),","            id          = node.contentElId.substring(13);","","        return boundingBox.one('#ygtvc' + id);","    }","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Anim = Anim;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].lines = {"1":0,"3":0,"8":0,"11":0,"17":0,"18":0,"25":0,"28":0,"35":0,"38":0,"45":0,"48":0,"51":0,"59":0,"60":0,"61":0,"64":0,"71":0,"75":0,"78":0,"85":0,"86":0,"89":0,"96":0,"99":0,"104":0};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].functions = {"initializer:16":0,"_afterCollapse:24":0,"_afterExpand:34":0,"(anonymous 2):59":0,"_animateSlideIn:44":0,"(anonymous 3):85":0,"_animateSlideOut:70":0,"_getChildrenElement:95":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].coveredLines = 26;
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].coveredFunctions = 9;
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 1);
YUI.add('libbit-treeview-anim', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 3);
var Anim;

/**
 * Y.Libbit.TreeView widget extension to provide animations.
 */
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 8);
Anim = function () {};

// TODO: Prevent animation stacking.
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 11);
Anim.prototype = {

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "initializer", 16);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 17);
this.on('collapseComplete', this._afterCollapse, this);
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 18);
this.on('expandComplete', this._afterExpand, this);
    },

    /**
     * Handles the collapse event.
     */
    _afterCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_afterCollapse", 24);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 25);
var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 28);
this._animateSlideIn(children);
    },

    /**
     * Handles the expand event.
     */
    _afterExpand: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_afterExpand", 34);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 35);
var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 38);
this._animateSlideOut(children);
    },

    /**
     * Animates a slide in of an collapsed element as a post process.
     */
    _animateSlideIn: function (el) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_animateSlideIn", 44);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 45);
var anim;

        // The element has been hidden by the tree, show it by removing the 'display' style attribute.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 48);
el.setStyle('display', null);

        // Animate the object to a height of 0.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 51);
anim = new Y.Anim({
            node    : el,
            to      : { height: 0 },
            duration: '.25',
            easing  : Y.Easing.easeOut
        });

        // Restore the 'display' style attribute and reset the height to 100%.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 59);
anim.on('end', function () {
            _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "(anonymous 2)", 59);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 60);
el.setStyle('display', 'none');
            _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 61);
el.setStyle('height', '100%');
        });

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 64);
anim.run();
    },

    /**
     * Animates a slide in of an expanded element as a post process.
     */
    _animateSlideOut: function (el) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_animateSlideOut", 70);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 71);
var height = el.getComputedStyle('height'),
            anim;

        // The element is visible, set the height to 0.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 75);
el.setStyle('height', '0px');

        // Animate the object back to it's original height.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 78);
anim = new Y.Anim({
            node     : el,
            to       : { height: height },
            duration: '.25'
        });

        // Remove the 'height' style attribute, so it doesn't constrain expanding child objects.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 85);
anim.on('end', function () {
            _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "(anonymous 3)", 85);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 86);
el.setStyle('height', null);
        });

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 89);
anim.run();
    },

    /**
     * Retrieve the DOM element containing the children of a given TreeView node.
     */
    _getChildrenElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_getChildrenElement", 95);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 96);
var boundingBox = this.get('boundingBox'),
            id          = node.contentElId.substring(13);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 99);
return boundingBox.one('#ygtvc' + id);
    }
};

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 104);
Y.namespace('Libbit.TreeView').Anim = Anim;


}, '1.0.0');
