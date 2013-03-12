YUI.add('libbit-dd', function (Y, NAME) {

var DD;

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
            // groups: ['template', 'table-tree', 'image-tree', 'fieldgroup-tree'],
            groups: groups,
            // Do not bubble, we don't want to drop into the global region, just catch the enter event.
            bubbleTargets: null
        });

        // Bind the global drop object.
        drop.on('drop:enter', this._dropEnterGlobal, this);
        // drop.on('drop:over', this._handleScroll, this);
    },

// -- Event handlers -----------------------------------------------------------

    _handleStart: function (e) {
        var drag = e.target;

        var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        drag.get('node').addClass('libbit-dd-drag-placeholder');
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
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["view", "libbit-dd-css"]});
