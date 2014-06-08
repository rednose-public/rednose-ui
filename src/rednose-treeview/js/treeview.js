/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the `Y.Rednose.TreeView` widget.
 *
 * @module rednose-treeview
 */

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
    Y.TreeView.Sortable,
    Y.Rednose.Tree.Comparable,
    Y.Rednose.Tree.Icon,
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
    templates: Y.Rednose.TreeView.Templates,

    rednoseClassNames: {
        'outer' : 'rednose-treeview-outer-container',
        'inner' : 'rednose-treeview-inner-container',
        'icon'  : 'rednose-treeview-icon',
        'header': 'nav-header'
    },

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

        Y.mix(this.classNames, this.rednoseClassNames, true);

        config.sortComparator || (config.sortComparator = function (node) {
            return node.label;
        });

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
            subContainer  = Y.Node.create('<div class="' + this.classNames.inner + '"></div>');

        container.addClass(this.classNames.treeview);
        container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

        // Append a subcontainer to render the tree.
        container.addClass(this.classNames.outer);
        container.append(subContainer);

        if (header) {
            subContainer.append('<div class="' + this.classNames.header + '">' + header + '</div>');
        }

        this._childrenNode = this.renderChildren(this.rootNode, {
            // Pass the subcontainer.
            container: subContainer
        });

        this.rendered = true;

        return this;
    },

    /**
     * Renames a treenode.
     *
     * @method renameNode
     * @param {Tree.Node} node Tree node.
     * @param {String} label The new value.
     */
    renameNode: function (node, label) {
        node.label = label;

        var labelNode;

        if (labelNode = node._htmlNode.one('.' + this.classNames.label)) {
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
        this._treeViewEvents || (this._treeViewEvents = []);

        // var model = this.get('model');

        this._treeViewEvents.push(
            this.on('open', this._onExpand, this),
            this.on('close', this._onCollapse, this),

            this.after(['open', 'close'], this._afterToggle, this)

            // model.after('change', this._handleModelChange, this)
        );
    },

    // State
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

    // Model
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

    // Icon
    _afterToggle: function (e) {
        if (this.rendered === false) {
            return;
        }

        var node     = e.node,
            htmlNode = this.getHTMLNode(e.node);

        if (node.icon) {
            htmlNode.one('.' + this.classNames.icon).set('className',
                this.classNames.icon + ' ' + node.getIcon()
            );
        }
    },

    // State
    _onExpand: function (e) {
         var id    = this.generateRednoseRecordId(e.node.data),
             index = this._stateMap.indexOf(id);

        if (index === -1) {
            this._stateMap.push(id);
        }
    },

    _onCollapse: function (e) {
        var id    = this.generateRednoseRecordId(e.node.data),
            index = this._stateMap.indexOf(id);

        if (index !== -1) {
            this._stateMap.splice(index, 1);
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.Rednose.TreeView = Y.mix(TreeView, Y.Rednose.TreeView);
