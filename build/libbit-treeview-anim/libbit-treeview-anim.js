YUI.add('libbit-treeview-anim', function (Y, NAME) {

var Anim;

/**
 * Y.Libbit.TreeView widget extension to provide animations.
 */
Anim = Y.Base.create('anim', Y.Base, [], {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        this.on('expand', this._afterExpand, this);
        this.on('collapse', this._afterCollapse, this);
    },

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
    },

    /**
     * Retrieve the DOM element containing the children of a given TreeView node.
     */
    _getChildrenElement: function (node) {
        var domNode = this.get('tree').getHTMLNode(node);

        return Y.Node('#' + domNode.getAttribute('id')).one('ul');
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').Anim = Anim;


}, '1.0.0', {"requires": ["libbit-anim"]});
