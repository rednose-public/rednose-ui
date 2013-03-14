YUI.add('libbit-nodescroll', function (Y, NAME) {

var NodeScroll;

NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {
    anim: null,

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        this._bindDD(this.get('container'), this.get('groups'));

        this.on('drop:over', this._handle, this);
    },

    _bindDD: function (node, groups) {
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
        var dropNode    = e.drop.get('node'),
            dragY       = e.drag.mouseXY[1],
            nodeHeight  = dropNode.get('offsetHeight'),
            margin      = 25,
            relativeY   = dragY - margin,
            self        = this,
            node,
            scrollFunc;

        // Determine scrolling direction (if needed)
        if (relativeY > nodeHeight) {
            scrollFunc = function() {
                return [0, node.get('scrollTop') + node.get('offsetHeight')];
            };
        } else if (relativeY < 25) {
            scrollFunc = function() {
                return [0, node.get('scrollTop') - node.get('offsetHeight')];
            };
        } else {
            if (this.anim) {
                if (this.anim.get('running')) {
                    this.anim.stop();
                    Y.DD.DDM.syncActiveShims(true);
                }
            }
        }

        // Scroll
        if (scrollFunc) {
            node = dropNode;

            if (this.anim === null) {
                this.anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: scrollFunc
                    },
                    easing: Y.Easing.easeOut,
                    duration: (0.01 * node.get('offsetHeight'))
                });
            }

            this.anim.set('to', { scroll: scrollFunc });
            this.anim.run();
            this.anim.on('tween', function() {
                self.fire('scrolling');
            });
            this.anim.on('end', function() {
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
Y.namespace('Libbit').NodeScroll = NodeScroll;


}, '1.0.0', {"requires": ["node", "event", "dd", "anim"]});
