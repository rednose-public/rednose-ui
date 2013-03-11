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
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].code=["YUI.add('libbit-treeview-anim', function (Y, NAME) {","","var Anim;","","/**"," * Y.Libbit.TreeView widget extension to provide animations."," */","Anim = Y.Base.create('anim', Y.Base, [], {","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        this.on('expend', this._afterExpand, this);","        this.on('collapse', this._afterCollapse, this);","    },","","    /**","     * Handles the collapse event.","     */","    _afterCollapse: function (e) {","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        this.animSlideInY(children);","    },","","    /**","     * Handles the expand event.","     */","    _afterExpand: function (e) {","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        this.animSlideOutY(children);","    },","","    /**","     * Animates a slide in of an collapsed element as a post process.","     */","    animSlideInY: function (node) {","        // Animate the object to a height of 0.","        node.transition({","            duration: 0.3,","            easing: 'ease-in',","            height: '0px'","        }, function() {","            // Restore the 'display' style attribute and reset the height to 100%.","            node.setStyle('display', 'none');","            node.setStyle('height', '100%');","        });","    },","","    /**","     * Animates a slide in of an expanded element as a post process.","     */","    animSlideOutY: function (node) {","        // Hide potential scrollbars","        node.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');","","        // Make sure the chileElement is not hidden, otherwise height cannot be","        // calculated.","        node.setStyle('display', 'block');","","        var height = node.getComputedStyle('height');","","        node.setStyle('height', 0);","","        node.transition({","            duration: 0.3,","            easing: 'ease-out',","            height: height","        }, function() {","            node.setStyle('height', null);","        });","    },","","    /**","     * Retrieve the DOM element containing the children of a given TreeView node.","     */","    _getChildrenElement: function (node) {","        var domNode = this.get('tree').getHTMLNode(node);","        var ul = Y.Node('#' + domNode.getAttribute('id')).one('ul');","","        return ul;","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Anim = Anim;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].lines = {"1":0,"3":0,"8":0,"13":0,"14":0,"21":0,"24":0,"31":0,"34":0,"42":0,"48":0,"49":0,"58":0,"62":0,"64":0,"66":0,"68":0,"73":0,"81":0,"82":0,"84":0,"89":0};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].functions = {"initializer:12":0,"_afterCollapse:20":0,"_afterExpand:30":0,"(anonymous 2):46":0,"animSlideInY:40":0,"(anonymous 3):72":0,"animSlideOutY:56":0,"_getChildrenElement:80":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-anim/libbit-treeview-anim.js"].coveredLines = 22;
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
Anim = Y.Base.create('anim', Y.Base, [], {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "initializer", 12);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 13);
this.on('expend', this._afterExpand, this);
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 14);
this.on('collapse', this._afterCollapse, this);
    },

    /**
     * Handles the collapse event.
     */
    _afterCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_afterCollapse", 20);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 21);
var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 24);
this.animSlideInY(children);
    },

    /**
     * Handles the expand event.
     */
    _afterExpand: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_afterExpand", 30);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 31);
var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 34);
this.animSlideOutY(children);
    },

    /**
     * Animates a slide in of an collapsed element as a post process.
     */
    animSlideInY: function (node) {
        // Animate the object to a height of 0.
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "animSlideInY", 40);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 42);
node.transition({
            duration: 0.3,
            easing: 'ease-in',
            height: '0px'
        }, function() {
            // Restore the 'display' style attribute and reset the height to 100%.
            _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "(anonymous 2)", 46);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 48);
node.setStyle('display', 'none');
            _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 49);
node.setStyle('height', '100%');
        });
    },

    /**
     * Animates a slide in of an expanded element as a post process.
     */
    animSlideOutY: function (node) {
        // Hide potential scrollbars
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "animSlideOutY", 56);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 58);
node.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');

        // Make sure the chileElement is not hidden, otherwise height cannot be
        // calculated.
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 62);
node.setStyle('display', 'block');

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 64);
var height = node.getComputedStyle('height');

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 66);
node.setStyle('height', 0);

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 68);
node.transition({
            duration: 0.3,
            easing: 'ease-out',
            height: height
        }, function() {
            _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "(anonymous 3)", 72);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 73);
node.setStyle('height', null);
        });
    },

    /**
     * Retrieve the DOM element containing the children of a given TreeView node.
     */
    _getChildrenElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview-anim/libbit-treeview-anim.js", "_getChildrenElement", 80);
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 81);
var domNode = this.get('tree').getHTMLNode(node);
        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 82);
var ul = Y.Node('#' + domNode.getAttribute('id')).one('ul');

        _yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 84);
return ul;
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-anim/libbit-treeview-anim.js", 89);
Y.namespace('Libbit.TreeView').Anim = Anim;


}, '1.0.0');
