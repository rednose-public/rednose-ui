YUI.add('rednose-treeview-anim', function (Y, NAME) {

var Anim;

/**
 * Y.Rednose.TreeView widget extension to provide animations.
 */
Anim = Y.Base.create('anim', Y.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this.after('open', this._afterExpand, this);
        this.after('close', this._afterCollapse, this);
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * Retrieve the DOM element containing the children of a given TreeView node.
     */
    _getChildrenElement: function (node) {
        var domNode = this.getHTMLNode(node);

        return Y.Node('#' + domNode.getAttribute('id')).one('ul');
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Handles the collapse event.
     */
    _afterCollapse: function (e) {
        var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        children.setStyle('display', 'block');
        Y.Rednose.Anim.slideInY(children);
    },

    /**
     * Handles the expand event.
     */
    _afterExpand: function (e) {
        var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        // Hide potential scrollbars
        children.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');
        children.setStyle('display', 'block');
        Y.Rednose.Anim.slideOutY(children);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.TreeView').Anim = Anim;


}, '1.0.0', {"requires": ["rednose-anim", "rednose-treeview", "transition"]});