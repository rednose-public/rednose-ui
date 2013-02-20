YUI.add('libbit-nodescroll', function (Y, NAME) {

var NodeScroll;

NodeScroll = Y.Base.create('nodescroll', Y.Base, [], {
    anim: null,

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        var self = this;

        var event = Y.delegate('DOMNodeInserted', function(e) {
            event.detach();

            self._bindDD(e);
        }, 'body', this.get('nodeSelector'));
    },

    _bindDD: function(e) {
        var self = this;
        var dd = new Y.DD.Drop({
            node         : e.currentTarget,
            bubbleTargets: this,
            groups       : this.get('groups')
        });

        dd.on('drop:over', function(e) {
            self._handle(e);
        });
    },

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handle: function (e) {
        var dropNode    = e.drop.get('node'),
            dragY       = e.drag.mouseXY[1],
            nodeOffsetY = dropNode.get('offsetTop'),
            nodeHeight  = dropNode.get('offsetHeight'),
            self        = this,
            relativeY,
            node,
            scrollFunc;

        // Determain scrolling direction (if needed)
        relativeY = dragY - nodeOffsetY - 25; /* Margin top */
        if (relativeY > nodeHeight) {
            scrollFunc = function() {
                return [0, node.get('scrollTop') + node.get('offsetHeight')]
            };
        } else if (relativeY < 25) {
            scrollFunc = function() {
                return [0, node.get('scrollTop') - node.get('offsetHeight')]
            };
        } else {
            if (this.anim) {
                if (this.anim.get('running')) {
                    this.anim.stop();
                }
            }
        }

        // Scroll
        if (scrollFunc) {
            node = dropNode;

            if (this.anim == null) {
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
        }
    },
}, {
    ATTRS : {
        nodeSelector: { value: '' },
        groups: { value: [] }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').NodeScroll = NodeScroll;


}, '1.0.0', {"requires": ["node", "event", "dd", "anim"]});
