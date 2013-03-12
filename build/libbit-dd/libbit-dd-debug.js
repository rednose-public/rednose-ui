YUI.add('libbit-dd', function (Y, NAME) {

var DD, BubbleTarget;

BubbleTarget = Y.Base.create('bubbleTarget', Y.Base, [], {});

// NOT GENERIC YET: Dropenterglobal morphing
DD = Y.Base.create('dd', Y.View, [], {

    /**
     * Hover events, handling complex, stacked hovers
     */
    events: {
        '.libbit-dd-drag': {
            mouseenter: '_handleMouseEnter',
            mouseleave: '_handleMouseLeave'
        }
    },

    initializer: function() {
        // Set the cursor for drag proxies.
        Y.DD.DDM.set('dragCursor', 'default');

        this.on('drag:start', this._handleStart, this);
        this.on('drag:end', this._handleEnd, this);

        this.on('drop:over', this._dropOver, this);
        this.on('drop:enter', this._dropEnter, this);

        // Pass the event through a bubble target, so we get the first event in the chain
        this.bubbleTarget = new BubbleTarget();
        this.bubbleTarget.addTarget(this);
        this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);
    },

    _libbitDropHit: function (e) {
        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble
        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode
        // of the drag node being null.
        if (e.drag.get('node').get('parentNode') === null) {
            e.stopImmediatePropagation();
        }
    },

// -- Node setup ---------------------------------------------------------------

    /**
     * Create a new drag instance from a DOM node.
     */
    createDrag: function (node, groups) {
        node.addClass('libbit-dd-drag');

        var dd = new Y.DD.Drag({
            node         : node,
            groups: groups,
            bubbleTargets: this,
            target       : true
        });

        dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups) {
        node.addClass('libbit-dd-drop');

        var dd = new Y.DD.Drop({
            node        : node,
            //padding     : '20 0',
            groups: groups,
            bubbleTargets: this
        });

        return dd;
    },

    bindGlobalDrop: function (groups) {
        var container = this.get('container'),
            drop;

        container.addClass('libbit-global-drop');

        // Global drop object.
        drop = new Y.DD.Drop({
            node   : container,
            groups: groups,
            bubbleTargets: this.bubbleTarget
            // bubbleTargets: this
        });

        // Bind the global drop object.
        drop.on('drop:enter', this._dropEnterGlobal, this);
        drop.on('drop:over', this._handleScroll, this);
    },

// -- Event handlers -----------------------------------------------------------

    _handleStart: function (e) {
        var drag = e.target;

        var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        drag.get('node').addClass('libbit-dd-drag-placeholder');
    },

    /**
     * Handles the end of a drag event.
     */
    _handleEnd: function (e) {
        var drag = e.target;

        // Remove the original event bindings and connect them to this object.
        Y.Array.each(drag.getTargets(), function (n) {
            drag.removeTarget(n);
        });

        drag.addTarget(this);

        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.
        drag.detach('drag:end', this._handleEnd);

        // Reprep since we (potentially) have changed the drag node
        drag._unprep();
        drag._prep();

        drag.get('node').addClass('libbit-dd-drag');

        drag.get('node').removeClass('libbit-dd-drag-placeholder');
        drag.get('dragNode').set('innerHTML', '');
    },

    /**
     * Triggered when a drag item is dragged over a drop item
     */
    _dropOver: function (e) {
        var drop = e.drop.get('node'),
            drag = e.drag.get('node');

        if (drop.hasClass('libbit-global-drop')) {
            return;
        }

        if (drop.get('tagName').toLowerCase() !== 'li') {
            if (!drop.contains(drag)) {
                drop.appendChild(drag);
                Y.Lang.later(50, Y, function () {
                    Y.DD.DDM.syncActiveShims(true);
                });
            }
        }
    },

    /**
     * Handles dragging into a drop region.
     */
    _dropEnter: function (e) {
        var drag = e.drag,
            drop = e.drop,
            dragNode = drag.get('node'),
            dropNode = drop.get('node'),
            append = false,
            //padding = 5,
            padding = 10,
            xy = drag.mouseXY,
            region = drop.region,
            middle1 = region.top + ((region.bottom - region.top) / 2),
            middle2 = region.left + ((region.right - region.left) / 2),
            dir = false,
            dir1 = false,
            dir2 = false,
            next,
            ul;

        if (dropNode.hasClass('libbit-global-drop')) {
            return;
        }

        // Resize the proxy if necessary
        if (dropNode.get('tagName').toLowerCase() !== 'ul') {
            // Traverse up to find the ul node
            ul = dropNode.ancestor('ul');
        } else {
            ul = dropNode;
        }

        if (ul) {
            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging
            var node = Y.DD.DDM.activeDrag.get('dragNode');
            var width = ul.get('offsetWidth');

            Y.Libbit.Anim.width(node, width);
        }

        // Insert the placeholder at the correct index
        if ((xy[1] < (region.top + padding))) {
            dir1 = 'top';
        }

        if ((region.bottom - padding) < xy[1]) {
            dir1 = 'bottom';
        }

        if ((region.right - padding) < xy[0]) {
            dir2 = 'right';
        }

        if ((xy[0] < (region.left + padding))) {
            dir2 = 'left';
        }

        dir = dir2;

        if (dir2 === false) {
            dir = dir1;
        }

        switch (dir) {
            case 'top':
                next = dropNode.get('nextSibling');
                if (next) {
                    dropNode = next;
                } else {
                    append = true;
                }
                break;

            case 'bottom':
                break;

            case 'right':
            case 'left':
                break;
        }

        if ((dropNode !== null) && dir) {
            if (dropNode && dropNode.get('parentNode')) {
                if (!append) {
                    dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                } else {
                    dropNode.get('parentNode').appendChild(dragNode);
                }
            }
        }
    },

    _dropEnterGlobal: function (e) {
        if (Y.DD.DDM.activeDrag) {
            var drag = Y.DD.DDM.activeDrag,
                dragNode = drag.get('dragNode'),
                obj  = drag.get('data'),
                container,
                templateItem;

            if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {
                // Bind to the document's end drag handler
                drag.on('drag:end', this._handleEnd, this);

                // Render the item
                var templateItem = new Y.TB.TemplateItem({
                    asset: obj
                });

                var tiView = new Y.TB.TemplateItemView({
                    model: templateItem
                });

                tiView.templateModel = this.get('model');

                container = tiView.render().get('container');

                // FIXME: The context menu doesn't get bound from tiView.render() for some reason
                container.plug(Y.Libbit.ContextMenu, {
                    content: [
                        { title: 'Remove from template', id: 'removeTemplateItem' },
                        { title: '-' },
                        { title: 'Properties', id: 'templateItemProperties', disabled: true }
                    ],
                    bubbleTarget: tiView
                });

                var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');

                container.addClass('libbit-dd-drag-placeholder');

                // Store a reference to the model so we can access it from the DOM
                container.setData({ model: templateItem });

                // Cleanup the old node to prevent orphans in the DOM
                drag.get('node').remove();
                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)
                drag.set('node', container);

                // Update the dragNode
                Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);
            }
        }
    },

// -- Hover Event handlers -----------------------------------------------------------

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseEnter: function (e) {
        var target = e.currentTarget;

        if (target.ancestor('.libbit-dd-drag-hover')) {
            target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');
        }

        if (target.one('.libbit-dd-drag-hover')) {
            target.addClass('libbit-dd-drag-hover-disabled');
        } else {
            target.addClass('libbit-dd-drag-hover');
        }
    },

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseLeave: function (e) {
        var target = e.currentTarget;

        if (target.hasClass('libbit-dd-drag-hover')) {
            target.removeClass('libbit-dd-drag-hover');
        }

        if (target.ancestor('.libbit-dd-drag-hover-disabled')) {
            target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');
        }
    },

// -- Scroll handler for the global drop region --------------------------------------

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleScroll: function (e) {
        var dropNode    = e.drop.get('node'),
            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),
            parent      = dropNode.get('offsetParent'),
            // nodeOffsetY = dropNode.get('offsetTop'),
            // nodeHeight  = dropNode.get('offsetHeight'),
            nodeHeight  = Y.one('#main').get('offsetHeight'),
            relativeY,
            node,
            anim,
            dir;

        var buffer = 30;
        var delay = 235;
        var marginTop = 40;

        if (dragY < prevY) {
            dir = 'up';
        } else {
            dir = 'down';
        }

        // GLOBAL
        prevY = dragY;

        if (dragY - marginTop < buffer && dir === 'up') {
            // Scroll up
            node = parent;
            anim = new Y.Anim({
                node: node,
                to: {
                    scroll: function(node) {
                        return [node.get('scrollTop') + node.get('offsetHeight'), 0];
                    }
                },
                easing: Y.Easing.easeOut
            });

            anim.run();
        }

        if (dragY - marginTop > nodeHeight - buffer && dir === 'down') {
            // Scroll down
            node = parent;
            anim = new Y.Anim({
                node: node,
                to: {
                    scroll: function(node) {
                        return [0, node.get('scrollTop') + node.get('offsetHeight')];
                    }
                },
                easing: Y.Easing.easeOut
            });

            anim.run();
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["view", "libbit-dd-css"]});
