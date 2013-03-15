YUI.add('libbit-nodescroll', function (Y, NAME) {

var NodeScroll;

NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {
    // -- Protected Properties -------------------------------------------------

    _anim: null,

    // -- Lifecycle Methods ----------------------------------------------------

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        this._bindDD(this.get('container'), this.get('groups'));
        this.on('drop:over', this._handle, this);
    },

    // -- Protected Methods ----------------------------------------------------

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
            if (this._anim) {
                if (this._anim.get('running')) {
                    this._anim.stop();
                    Y.DD.DDM.syncActiveShims(true);
                }
            }
        }

        // Scroll
        if (scrollFunc) {
            node = dropNode;

            if (this._anim === null) {
                this._anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: scrollFunc
                    },
                    easing: Y.Easing.easeOut,
                    duration: (0.01 * node.get('offsetHeight'))
                });
            }

            this._anim.set('to', { scroll: scrollFunc });
            this._anim.run();
            this._anim.on('tween', function() {
                self.fire('scrolling');
            });
            this._anim.on('end', function() {
                Y.DD.DDM.syncActiveShims(true);
            });
        }
    }
}, {
    ATTRS : {
        container: {
            value: null
        },

        /**
         * The DD groups that can interact with this scroll instance.
         * @attribute {Array}
         */
        groups: {
            value: []
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').NodeScroll = NodeScroll;


}, '1.0.0', {"requires": ["node", "event", "dd", "anim"]});
