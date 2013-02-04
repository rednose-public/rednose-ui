var Anim;

/**
 * Y.Libbit.TreeView widget extension to provide animations.
 */
Anim = Y.Base.create('anim', Y.Base, [], {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        this.on('expend', this._afterExpand, this);
        this.on('collapse', this._afterCollapse, this);
    },

    /**
     * Handles the collapse event.
     */
    _afterCollapse: function (e) {
        var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        this._animateSlideIn(children);
    },

    /**
     * Handles the expand event.
     */
    _afterExpand: function (e) {
        var treeNode = e.node,
            children = this._getChildrenElement(treeNode);

        this._animateSlideOut(children);
    },

    /**
     * Animates a slide in of an collapsed element as a post process.
     */
    _animateSlideIn: function (el) {
        // Animate the object to a height of 0.
        el.transition({
            duration: 0.3,
            easing: 'ease-in',
            height: '0px'
        }, function() {
            // Restore the 'display' style attribute and reset the height to 100%.
            el.setStyle('display', 'none');
            el.setStyle('height', '100%');
        });
    },

    /**
     * Animates a slide in of an expanded element as a post process.
     */
    _animateSlideOut: function (el) {
        // Hide potential scrollbars
        el.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');

        // Make sure the chileElement is not hidden, otherwise height cannot be
        // calculated.
        el.setStyle('display', 'block');

        var height = el.getComputedStyle('height');

        el.setStyle('height', '15px');
        el.transition({
            duration: 0.3,
            easing: 'ease-out',
            height: height
        });
    },

    /**
     * Retrieve the DOM element containing the children of a given TreeView node.
     */
    _getChildrenElement: function (node) {
        var domNode = this.get('tree').getHTMLNode(node);
        var ul = Y.Node('#' + domNode.getAttribute('id')).one('ul');

        return ul;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').Anim = Anim;
