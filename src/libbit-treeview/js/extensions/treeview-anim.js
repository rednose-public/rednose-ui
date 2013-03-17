var Anim;

/**
 * Y.Libbit.TreeView widget extension to provide animations.
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
        Y.Libbit.Anim.slideInY(children);
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
        Y.Libbit.Anim.slideOutY(children);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').Anim = Anim;
