YUI.add('rednose-treeview', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the `Y.Rednose.TreeView` widget.
 *
 * @module rednose-treeview
 */
var CSS_OUTER_CONTAINER = 'rednose-treeview-outer-container',
    CSS_INNER_CONTAINER = 'rednose-treeview-inner-container',
    CSS_TREEVIEW_ICON   = 'rednose-treeview-icon',

    CSS_BOOTSTRAP_NAV_HEADER = 'nav-header';

/**
 * A TreeView widget, implementing Y.View.
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new Y.Rednose.TreeView({
 *    model     : model,
 *    dragdrop  : true,
 *    selectable: true,
 *    groups    : ['rednose-treeview'],
 *    header    : 'RedNose TreeView'
 * });
 * </code></pre>
 *
 * @class TreeView
 * @namespace Rednose
 * @param {Object} [config] The following configuration properties are required:
 *
 *     @param {Object} [config.container] The container to bind the treeView to.
 *     @param {Boolean} [config.dragdrop] Enable standalone drag and drop for this instance.
 *     @param {Boolean} [config.selectable] Enables selection of tree nodes. Only single selection
 *         is supported for now
 *     @param {Rednose.ModelTree} [config.model] A RedNose Tree model. Change events are bound to update
 *         the view when the model changes.
 *     @param {Array} [config.groups] The DD groups that can interact with this
 *         TreeView instance.
 *     @param {String} [config.header] An optional header, needed for global dropping on the root node
 *
 * @constructor
 * @uses Rednose.TreeView.Anim
 * @uses Rednose.TreeView.Selectable
 * @uses Rednose.TreeView.DD
 * @extends TreeView
 */
var TreeView = Y.Base.create('treeView', Y.TreeView, [
    Y.Rednose.Tree.Comparable,
    Y.Rednose.TreeView.Anim,
    Y.Rednose.TreeView.DD,
    Y.Rednose.TreeView.Selectable
], {

    // -- Public Properties -------------------------------------------------

    /**
     * Overwrite the default templates used to render this TreeView.
     *
     * @property {Object} templates
     */
    templates: Y.TreeView.Templates,

    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the state of the opened tree nodes.
     *
     * @property {Array} _stateMap
     * @protected
     */

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        config || (config = {});

        // Hook into the initializer chain to set the nodes.
        if (config.model) {
            config.nodes = config.model.get('items');

            this.set('model', config.model);
        }

        if (config.header) {
            this.header = config.header;
        }

        // Initialize the state map so it doesn't contain any garbage from previous instances.
        this._stateMap = [];

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
     * @see TreeView.render()
     */
    render: function () {
        var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win,
            header        = this.header,
            subContainer  = Y.Node.create('<div class="' + CSS_INNER_CONTAINER + '"></div>');

        container.addClass(this.classNames.treeview);
        container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

        // Append a subcontainer to render the tree.
        container.addClass(CSS_OUTER_CONTAINER);
        container.append(subContainer);

        if (header) {
            subContainer.append('<div class="' + CSS_BOOTSTRAP_NAV_HEADER + '">' + header + '</div>');
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
     * If no icon is found on the model, the `icon` property of the node will be checked.
     *
     * @method icon
     * @param  {Tree.Node} node Tee Node.
     * @return {String} A composed CSS string.
     */
    icon: function (node) {
        var className = CSS_TREEVIEW_ICON;
        // var model     = node.data,
            // icons     = this.get('model').get('icons'),
            // className = CSS_TREEVIEW_ICON;

        // Check the model icon definitions.
        // if (icons && model instanceof Y.Model && icons[model.name] &&
        //     Y.Lang.isString(node.icon) === false
        //     && Y.Lang.isString(model.get('icon')) === false) {

        //     var icon = icons[model.name];

        //     if (Y.Lang.isString(icon)) {
        //         return className + ' ' + icon;
        //     }

        //     if (Y.Lang.isArray(icon)) {
        //         return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);
        //     }
        // }

        // // Check the icon property on the model.
        // if (Y.Lang.isString(model.get('icon'))) {
        //     return className + ' ' + model.get('icon');
        // }

        if (node.icon) {
            if (Y.Lang.isArray(node.icon)) {
                return className + ' ' + (node.isOpen() ? node.icon[0] : node.icon[1]);
            }

            return className + ' ' + node.icon;
        }

        return className;
    },

    /**
     * Renames a treenode
     *
     * @method renameNode
     * @param  {Tree.Node} node Tree node.
     * @param {String} label The new value.
     *
     * @return void
     */
    renameNode: function (node, label) {
        var labelNode;

        node.label = label;

        if (labelNode = node._htmlNode.one('.yui3-treeview-label')) {
            labelNode.set('text', node.label);
        }
    },

    /**
     * Generate a unique RedNose record ID, composed of the class type and the model ID.
     *
     * @method generateRednoseRecordID
     * @param  {Model} model A model instance.
     * @return {String} A unique ID.
     */
    generateRednoseRecordId: function (model) {
        if (model instanceof Y.Model) {
            return model.name + '_' + model.get('id');
        }

        return null;
    },

    /**
     * Parse a unique RedNose model id.
     *
     * @method parseRednoseRecordID
     * @param  {String} id A RedNose record ID.
     * @return {Array} An array containing type and ID.
     */
    parseRednoseRecordId: function (id) {
        return id.split('_');
    },

    // -- Protected Methods ----------------------------------------------------

    _attachEventHandles: function () {
        this._eventHandles || (this._eventHandles = []);

        // var model = this.get('model');

        this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            this.after(['open', 'close'], this._handleToggle, this)

            // model.after('change', this._handleModelChange, this)
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
         var id    = this.generateRednoseRecordId(node.data),
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

    /**
     * Removes the `container` from the DOM and purges all its event listeners.
     *
     * @method _destroyContainer
     * @protected
     */
    _destroyContainer: function () {
        var container = this.get('container');
        container && container.remove(true);
    },

    // -- Protected Event Handlers ---------------------------------------------

    _handleModelChange: function () {
        var nodes = this.get('model').get('items');

        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the
        // events to our animation listeners etc.
        this.clear(false, {silent: true});

        // Clean up, normally this would be handled by the original Treeview's handler, but we are clearing
        // the tree silently.
       if (this.rendered) {
            var childNodes = this.get('container').get('childNodes');

            delete this._childrenNode;

            childNodes.remove();

            // Fix for DD. YUI creates the shims on a 100 ms timer after DD init, so if we destroy
            // the node within 100 ms after initialization, the internal node property points to NULL and
            // we get an error.
            Y.later(150, Y, function () {
                childNodes.destroy(true);
            });
        }

        // Build a new tree silently, and trigger a new render if needed.
        if (nodes) {
            // Returns an array of references to the created tree nodes.
            treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            this._restoreTreeOpenState();
        }

        this.rendered && this.render();
    },

    _handleToggle: function (e) {
        if (this.rendered === false) {
            return;
        }

        var node     = e.node,
            htmlNode = this.getHTMLNode(e.node);

        htmlNode.one('.' + CSS_TREEVIEW_ICON).set('className', this.icon(node));
    },

    _handleExpand: function (e) {
         var id    = this.generateRednoseRecordId(e.node.data),
             index = this._stateMap.indexOf(id);

        if (index === -1) {
            this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        var id    = this.generateRednoseRecordId(e.node.data),
            index = this._stateMap.indexOf(id);

        if (index !== -1) {
            this._stateMap.splice(index, 1);
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.Rednose.TreeView = Y.mix(TreeView, Y.Rednose.TreeView);


}, '1.5.0-DEV', {
    "requires": [
        "gallery-sm-treeview",
        "rednose-model-tree",
        "rednose-tree",
        "rednose-treeview-anim",
        "rednose-treeview-dd",
        "rednose-treeview-templates",
        "rednose-treeview-select",
        "node"
    ],
    "supersedes": [
        "gallery-sm-treeview-templates"
    ],
    "rollup": 1
});
