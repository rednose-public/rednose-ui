YUI.add('libbit-treeview', function (Y, NAME) {

/**
 * Provides the `Y.Libbit.TreeView` widget.
 *
 * @module libbit-treeview
 */

var TreeView;

/**
 * A TreeView widget, implementing Y.View.
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new Y.Libbit.TreeView({
 *    model     : model,
 *    dragdrop  : true,
 *    selectable: true,
 *    groups    : ['libbit-treeview'],
 *    header    : 'LiBBiT TreeView'
 * });
 * </code></pre>
 *
 * @class TreeView
 * @param {Object} [config] The following configuration properties are required:
 *
 *     @param {Object} [config.container] The container to bind the treeView to.
 *     @param {Boolean} [config.dragdrop] Enable standalone drag and drop for this instance.
 *     @param {Boolean} [config.selectable] Enables selection of tree nodes. Only single selection
 *         is supported for now
 *     @param {Y.Libbit.ModelTree} [config.model] A LiBBiT Tree model. Change events are bound to update
 *         the view when the model changes.
 *     @param {Array} [config.groups] The DD groups that can interact with this
 *         TreeView instance.
 *     @param {String} [config.header] An optional header, needed for global dropping on the root node
 *
 * @constructor
 * @extends Y.TreeView
 */
TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {
    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the state of the opened tree nodes.
     *
     * @property {Array} _stateMap
     * @protected
     */
    _stateMap: [],

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        // Hook into the initializer chain to set the nodes.
        config.nodes = config.model.get('items');

        if (config.header) {
            this.header = config.header;
        }

        // Initialize the state map so it doesn't contain any garbage from previous instances.
        this._stateMap = [];

        this.set('model', config.model);

        this._attachEventHandles();
    },

    destructor: function () {
        this._detachEventHandles();

        // Free the reference so the property is eligible for garbage collection.
        this._stateMap = null;

        // Remove the container from the DOM and destroy it.
        this._destroyContainer();
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Overrides TreeView's `render()` method to wrap the container into a parent container,
     * and hook into the rendering process.
     *
     * @method render
     * @chainable
     * @see Y.TreeView.render()
     */
    render: function () {
        var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win,
            header        = this.header,
            subContainer  = Y.Node.create('<div class="libbit-treeview-inner-container"></div>');

        container.addClass(this.classNames.treeview);
        container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

        // Append a subcontainer to render the tree.
        container.addClass('libbit-treeview-outer-container');
        container.append(subContainer);

        if (header) {
            subContainer.append('<div class="nav-header">' + header + '</div>');
        }

        this._childrenNode = this.renderChildren(this.rootNode, {
            // Pass the subcontainer.
            container: subContainer
        });

        this.rendered = true;

        return this;
    },

    /**
     * Return a CSS class string, modified by the given tree node and it's associated model.
     *
     * @method icon
     * @param  {Y.Tree.Node} node Tee Node.
     * @return {String} A composed CSS string.
     */
    icon: function (node) {
        var model     = node.data,
            icons     = this.get('model').get('icons'),
            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');

        if (icons && model instanceof Y.Model  && icons[model.name]) {
            var icon = icons[model.name];

            if (Y.Lang.isString(icon)) {
                return className + ' ' + icon;
            }

            if (Y.Lang.isArray(icon)) {
                return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);
            }
        }

        return className;
    },

    /**
     * Generate a unique LiBBiT record ID, composed of the class type and the model ID.
     *
     * @method generateLibbitRecordID
     * @param  {Y.Model} model A model instance.
     * @return {String} A unique ID.
     */
    generateLibbitRecordId: function (model) {
        if (model instanceof Y.Model) {
            return model.name + '_' + model.get('id');
        }

        return null;
    },

    /**
     * Parse a unique LiBBiT model id.
     *
     * @method parseLibbitRecordID
     * @param  {String} id A LiBBiT record ID.
     * @return {Array} An array containing type and ID.
     */
    parseLibbitRecordId: function (id) {
        return id.split('_');
    },

    // -- Protected Methods ----------------------------------------------------

    _attachEventHandles: function () {
        this._eventHandles || (this._eventHandles = []);

        var model = this.get('model');

        this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            this.after(['open', 'close'], this._handleToggle, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    _detachEventHandles: function () {
        (new Y.EventHandle(this._eventHandles)).detach();
    },

    _restoreTreeOpenState: function () {
        var self     = this,
            rootNode = this.rootNode;

        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            Y.Array.each(rootNode.children, function (node) {
                self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         var id    = this.generateLibbitRecordId(node.data),
             index = this._stateMap.indexOf(id);

         if (index !== -1) {
            node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        if (node.hasChildren()) {
            Y.Array.each(node.children, function (child) {
                this._restoreNodeOpenState(child);
            }, this);
        }
    },

    // _fixWidth: function (node) {
    //     var li = this.getHTMLNode(node);
    //     var count = 0;
    //     var current = li.ancestor('.' + this.classNames.children);

    //     while (current.ancestor('.' + this.classNames.children)) {
    //         count++;
    //         current = current.ancestor('.' + this.classNames.children);
    //     }

    //     if (count > 0) {
    //         var ml = count * 20;


    //         if (ml) {
    //             li.setStyle('marginLeft', -ml);
    //             li.one('div').setStyle('paddingLeft', ml + 20);
    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);
    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);
    //         }
    //     }
    // },

    // -- Protected Event Handlers ---------------------------------------------

    _handleModelChange: function () {
        var nodes = this.get('model').get('items');

        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the
        // events to our animation listeners etc.
        this.clear(false, {silent: true});

        // Clean up, normally this would be handled by the original Treeview's handler, but we are clearing
        // the tree silently.
        if (this.rendered) {
            delete this._childrenNode;

            this.get('container').empty();
        }

        // Build a new tree silently, and trigger a new render if needed.
        if (nodes) {
            // Returns an array of references to the created tree nodes.
            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            this._restoreTreeOpenState(treeNodes);
        }

        this.rendered && this.render();
    },

    _handleToggle: function (e) {
        var node      = e.node,
            htmlNode  = this.getHTMLNode(e.node);

        htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));
    },

    _handleExpand: function (e) {
         var id    = this.generateLibbitRecordId(e.node.data),
             index = this._stateMap.indexOf(id);

        if (index === -1) {
            this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        var id    = this.generateLibbitRecordId(e.node.data),
            index = this._stateMap.indexOf(id);

        if (index !== -1) {
            this._stateMap.splice(index, 1);
        }
    },

    /**
     * Removes the `container` from the DOM and purges all its event listeners.
     *
     * @method _destroyContainer
     * @protected
     */
    _destroyContainer: function () {
        var container = this.get('container');
        container && container.remove(true);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "gallery-sm-treeview",
        "libbit-model-tree",
        "libbit-treeview-anim",
        "libbit-treeview-dd",
        "libbit-treeview-templates",
        "libbit-treeview-select"
    ],
    "supersedes": [
        "gallery-sm-treeview-templates"
    ],
    "skinnable": true
});
