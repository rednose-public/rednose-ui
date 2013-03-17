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
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].code=["YUI.add('libbit-treeview-anim', function (Y, NAME) {","","var Anim;","","/**"," * Y.Libbit.TreeView widget extension to provide animations."," */","Anim = Y.Base.create('anim', Y.Base, [], {","    // -- Lifecycle Methods ----------------------------------------------------","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        this.after('open', this._afterExpand, this);","        this.after('close', this._afterCollapse, this);","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","     * Retrieve the DOM element containing the children of a given TreeView node.","     */","    _getChildrenElement: function (node) {","        var domNode = this.getHTMLNode(node);","","        return Y.Node('#' + domNode.getAttribute('id')).one('ul');","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","     * Handles the collapse event.","     */","    _afterCollapse: function (e) {","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        children.setStyle('display', 'block');","        Y.Libbit.Anim.slideInY(children);","    },","","    /**","     * Handles the expand event.","     */","    _afterExpand: function (e) {","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        // Hide potential scrollbars","        children.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');","        children.setStyle('display', 'block');","        Y.Libbit.Anim.slideOutY(children);","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Anim = Anim;","","","}, '1.0.0', {\"requires\": [\"libbit-anim\", \"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].lines = {"1":0,"3":0,"8":0,"15":0,"16":0,"25":0,"27":0,"36":0,"39":0,"40":0,"47":0,"51":0,"52":0,"53":0,"58":0};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].functions = {"initializer:14":0,"_getChildrenElement:24":0,"_afterCollapse:35":0,"_afterExpand:46":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].coveredLines = 15;
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].coveredFunctions = 5;
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 1);
YUI.add('libbit-treeview-anim', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 3);
var Anim;

/**
 * Y.Libbit.TreeView widget extension to provide animations.
 */
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 8);
Anim = Y.Base.create('anim', Y.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "initializer", 14);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 15);
this.after('open', this._afterExpand, this);
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 16);
this.after('close', this._afterCollapse, this);
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * Retrieve the DOM element containing the children of a given TreeView node.
     */
    _getChildrenElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_getChildrenElement", 24);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 25);
var domNode = this.getHTMLNode(node);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 27);
return Y.Node('#' + domNode.getAttribute('id')).one('ul');
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Handles the collapse event.
     */
    _afterCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_afterCollapse", 35);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 36);
var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 39);
children.setStyle('display', 'block');
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 40);
Y.Libbit.Anim.slideInY(children);
    },

    /**
     * Handles the expand event.
     */
    _afterExpand: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_afterExpand", 46);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 47);
var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        // Hide potential scrollbars
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 51);
children.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 52);
children.setStyle('display', 'block');
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 53);
Y.Libbit.Anim.slideOutY(children);
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 58);
Y.namespace('Libbit.TreeView').Anim = Anim;


}, '1.0.0', {"requires": ["libbit-anim", "libbit-treeview"]});
