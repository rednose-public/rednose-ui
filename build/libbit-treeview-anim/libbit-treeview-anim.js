YUI.add('libbit-treeview-anim', function (Y, NAME) {

var Anim;

/**
 * Y.Libbit.TreeView widget extension to provide animations.
 */
Anim = function () {};

// TODO: Prevent animation stacking.
Anim.prototype = {

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        this.on('collapseComplete', this._afterCollapse, this);
        this.on('expandComplete', this._afterExpand, this);
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
        var anim;

        // The element has been hidden by the tree, show it by removing the 'display' style attribute.
        el.setStyle('display', null);

        // Animate the object to a height of 0.
        anim = new Y.Anim({
            node    : el,
            to      : { height: 0 },
            duration: '.25',
            easing  : Y.Easing.easeOut
        });

        // Restore the 'display' style attribute and reset the height to 100%.
        anim.on('end', function () {
            el.setStyle('display', 'none');
            el.setStyle('height', '100%');
        });

        anim.run();
    },

    /**
     * Animates a slide in of an expanded element as a post process.
     */
    _animateSlideOut: function (el) {
        var height = el.getComputedStyle('height'),
            anim;

        // The element is visible, set the height to 0.
        el.setStyle('height', '0px');

        // Animate the object back to it's original height.
        anim = new Y.Anim({
            node     : el,
            to       : { height: height },
            duration: '.25'
        });

        // Remove the 'height' style attribute, so it doesn't constrain expanding child objects.
        anim.on('end', function () {
            el.setStyle('height', null);
        });

        anim.run();
    },

    /**
     * Retrieve the DOM element containing the children of a given TreeView node.
     */
    _getChildrenElement: function (node) {
        var boundingBox = this.get('boundingBox'),
            id          = node.contentElId.substring(13);

        return boundingBox.one('#ygtvc' + id);
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').Anim = Anim;


}, '1.0.0');
