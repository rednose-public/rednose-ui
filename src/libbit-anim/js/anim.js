var Anim;

/**
 * Several animation class methods to be used throughout the LiBBiT framework.
 */
function Anim() {
    Anim.superclass.constructor.apply(this);
}

/**
 * Animates a slide-in of an collapsed element as a post process.
 */
Anim.slideInY = function (node) {
    // Animate the object to a height of 0.
    node.transition({
        duration: 0.25,
        easing: 'ease-in',
        height: '0px'
    }, function() {
        // Restore the 'display' style attribute and reset the height to 100%.
        node.setStyle('display', 'none');
        node.setStyle('height', '100%');
    });
}

/**
 * Animates a slide-out of an expanded element as a post process.
 */
Anim.slideOutY = function (node) {
    // Hide potential scrollbars
    node.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');

    // Make sure the chileElement is not hidden, otherwise height cannot be
    // calculated.
    node.setStyle('display', 'block');

    var height = node.getComputedStyle('height');

    node.setStyle('height', 0);

    node.transition({
        duration: 0.25,
        easing: 'ease-out',
        height: height
    }, function() {
        node.setStyle('height', null);
    });
}

/**
 * Clone the node, position it on top of the original for secondary animation.
 */
Anim.fadeOut = function (node) {
    var n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute'),
        anim;

    Y.one('body').appendChild(n);
    n.setXY(node.getXY());

    anim = new Y.Anim({
        node    : n,
        to      : { opacity: 0 },
        duration: '.25',
        easing  : Y.Easing.easeOut
    });

    anim.on('end', function () {
        n.remove();
    });

    anim.run();
}

/**
 * Animate a slide in of a node.
 */
Anim.slideIn = function (node) {
    var width  = node.get('offsetWidth'),
        height = node.get('offsetHeight'),
        anim;

    node.setStyle('width', '0');
    node.setStyle('height', '0');

    anim = new Y.Anim({
        node    : node,
        duration: '.25',
        easing  : Y.Easing.easeOut,
        to      : {
            width: width,
            height: height
        }
    });

    anim.run();
}

/**
 * Animate a node to a given width
 */
Anim.width = function (node, width) {
    var anim = new Y.Anim({
        node    : node,
        to      : { width: width },
        duration: '.25',
        easing  : Y.Easing.easeOut
    });

    anim.run();
}

/**
 * Morphs between two nodes.
 */
Anim.morph = function (oldNode, newNode, animOut, animIn) {
    animOut(oldNode);
    oldNode.set('innerHTML', newNode.get('outerHTML'));
    animIn(oldNode);
}

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Anim = Anim;
