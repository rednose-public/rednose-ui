YUI.add('rednose-dd', function (Y, NAME) {

var DD, BubbleTarget;

BubbleTarget = Y.Base.create('bubbleTarget', Y.Base, [], {});

// NOT GENERIC YET: Dropenterglobal morphing
DD = Y.Base.create('dd', Y.View, [], {

    dropHighlight: false,

    /**
     * Hover events, handling complex, stacked hovers
     */
    events: {
        '.rednose-dd-drag': {
            mouseenter: '_handleMouseEnter',
            mouseleave: '_handleMouseLeave'
        }
    },

    initializer: function() {
        this._ddMap || (this._ddMap = []);

        // Set the cursor for drag proxies.
        Y.DD.DDM.set('dragCursor', 'default');

        // Pass the event through a bubble target, so we get the first event in the chain
        this.bubbleTarget = new BubbleTarget();
        this.bubbleTarget.addTarget(this);
        this.bubbleTarget.on('drop:hit', this._rednoseDropHit, this);
    },

    destructor: function () {
        for (var i in this._ddMap) {
            this._ddMap[i].destroy();
        }

        this._ddMap = [];
    },

    // -- Node setup ---------------------------------------------------------------

    /**
     * Create a new drag instance from a DOM node.
     */
    createDrag: function (node, groups, data) {
        node.addClass('rednose-dd-drag');

        var dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: this,
            target       : true
        });

        dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        this._ddMap.push(dd);

        return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups, data) {
        node.addClass('rednose-dd-drop');

        var dd = new Y.DD.Drop({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: this
        });

        this._ddMap.push(dd);

        return dd;
    },

    bindGlobalDrop: function (groups, container) {
        container = container || this.get('container');

        var dd;

        container.addClass('rednose-global-drop');

        // Global drop object.
        dd = new Y.DD.Drop({
            node   : container,
            groups: groups,
            bubbleTargets: this.bubbleTarget
        });

        this._ddMap.push(dd);

        // Bind the global drop object.
        dd.on('drop:enter', this._dropEnterGlobal, this);
    },

    _rednoseDropHit: function (e) {
        // Workaround: We can't detect the rednose-global-drop node from e.drop.get('node'), because it doesn't bubble
        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode
        // of the drag node being null.
        if (e.drag.get('node').get('parentNode') === null) {
            e.stopImmediatePropagation();
        }
    },

    // -- Event handlers -----------------------------------------------------------

    _handleStart: function (e) {
        var drag = e.target;
        var proxy = drag.get('node').cloneNode(true).addClass('rednose-dd-drag-proxy');

        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        drag.get('node').addClass('rednose-dd-drag-placeholder');

        drag.get('node').setStyle('visibility', 'hidden');
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

        drag.get('node').addClass('rednose-dd-drag');

        drag.get('node').removeClass('rednose-dd-drag-placeholder');
        drag.get('dragNode').set('innerHTML', '');

        drag.get('node').setStyle('visibility', '');
    },

    /**
     * Triggered when a drag item is dragged over a drop item
     */
    _dropOver: function (e) {
        var drop = e.drop.get('node'),
            drag = e.drag.get('node');

        if (drop.hasClass('rednose-global-drop')) {
            return;
        }

        if (drop.get('tagName').toLowerCase() !== 'li') {
            if (!drop.contains(drag)) {
                drop.appendChild(drag);
                Y.DD.DDM.syncActiveShims(true);
            }
        }
    },

    /**
     * Handles dragging into a drop region.
     */
    _dropEnter: function (e) {
        if (!e.drag || !e.drop || (e.drop !== e.target)) {
            return false;
        }
        if (e.drop.get('node').get('tagName').toLowerCase() === 'li') {
            this._moveItem(e.drag, e.drop);
        }
    },

    _moveItem: function(drag, drop) {
        var dragNode = drag.get('node'),
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

        if (dropNode.hasClass('rednose-global-drop')) {
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

            Y.Rednose.Anim.width(node, width);
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
                // next = dropNode.get('nextSibling');
                // if (next) {
                //     dropNode = next;
                // } else {
                //     append = true;
                // }
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
                    // var clone = dragNode.cloneNode(true);
                    var clone = Y.Node.create(dragNode.get('innerHTML'));

                    if (dir === 'top') {
                        dropNode.get('parentNode').insertBefore(clone, dragNode);

                        if (dropNode.get('previousSibling') && dropNode.get('nextSibling')) {
                            dropNode = dropNode.get('nextSibling');
                        }

                        if (dropNode.get('nextSibling')) {
                            dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                        } else {
                            dropNode.get('parentNode').appendChild(dragNode);
                        }
                    } else {
                        dropNode.get('parentNode').insertBefore(clone, dragNode);
                        dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                    }

                    var height = dragNode.get('scrollHeight');

                    dragNode.setStyle('height', 0);

                    clone.setStyle('overflow', 'hidden');

                    clone.setStyle('visibility', 'hidden');

                    var anim = new Y.Anim({
                        node: dragNode,
                        to: {
                            height: height
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut
                    });
                    anim.run();

                    var anim2 = new Y.Anim({
                        node: clone,
                        to: {
                            height: 0
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut
                    });
                    anim2.on('end', function () {
                        clone.remove();
                    });
                    anim2.run();

                    // dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                } else {
                    dropNode.get('parentNode').appendChild(dragNode);
                }
                //Resync all the targets because something moved.
                Y.DD.DDM.syncActiveShims(true);
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
                container.plug(Y.Rednose.ContextMenu, {
                    content: [
                        { title: 'Remove from template', id: 'removeTemplateItem' },
                        { title: '-' },
                        { title: 'Properties', id: 'templateItemProperties', disabled: true }
                    ],
                    bubbleTarget: tiView
                });

                var proxy = container.cloneNode(true).addClass('rednose-dd-drag-proxy');

                container.addClass('rednose-dd-drag-placeholder');

                // Store a reference to the model so we can access it from the DOM
                container.setData({ model: templateItem });

                // Cleanup the old node to prevent orphans in the DOM
                drag.get('node').remove();
                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)
                drag.set('node', container);

                // Update the dragNode
                Y.Rednose.Anim.morph(dragNode, proxy, Y.Rednose.Anim.fadeOut, Y.Rednose.Anim.slideIn);
            }
        }
    },

    // -- Hover Event handlers -----------------------------------------------------------

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseEnter: function (e) {
        var target = e.currentTarget;

        if (target.ancestor('.rednose-dd-drag-hover')) {
            target.ancestor('.rednose-dd-drag-hover').replaceClass('rednose-dd-drag-hover', 'rednose-dd-drag-hover-disabled');
        }

        if (target.one('.rednose-dd-drag-hover')) {
            target.addClass('rednose-dd-drag-hover-disabled');
        } else {
            target.addClass('rednose-dd-drag-hover');
        }
    },

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseLeave: function (e) {
        var target = e.currentTarget;

        if (target.hasClass('rednose-dd-drag-hover')) {
            target.removeClass('rednose-dd-drag-hover');
        }

        if (target.ancestor('.rednose-dd-drag-hover-disabled')) {
            target.ancestor('.rednose-dd-drag-hover-disabled').replaceClass('rednose-dd-drag-hover-disabled', 'rednose-dd-drag-hover');
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DD = DD;


}, '1.0.0', {"requires": ["rednose-anim", "rednose-dd-css", "view"]});
