YUI.add('rednose-treeview', function (Y, NAME) {

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
 *    nodes     : nodes,
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
 *     @param {Array} [config.nodes] The tree nodes.
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

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        config || (config = {});

        Y.mix(this.classNames, this.rednoseClassNames, true);

        config.sortComparator || (config.sortComparator = function (node) {
            return node.label;
        });

        if (config.header) {
            this.header = config.header;
        }

        this._attachEventHandles();

        this.onceAfter('initializedChange', function () {
            // Let the setter handle the node initialization.
            if (config.nodes) {
                this.set('nodes', config.nodes);

                delete config.nodes;
            }
        });
    },

    destructor: function () {
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

    // -- Protected Methods ----------------------------------------------------

    _attachEventHandles: function () {
        this._treeViewEvents || (this._treeViewEvents = []);

        this._treeViewEvents.push(
            this.after(['open', 'close'], this._afterToggle, this)
        );
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

    /**
     * @param {Array} value
     */
    _setNodes: function (value) {
        this.clear(null, {silent: false});

        if (value) {
            this.insertNode(this.rootNode, value, {silent: false});
        }
    },

    /**
     * @return {Array}
     */
    _getNodes: function () {
        return this.rootNode.toJSON().children || [];
    },

    // -- Protected Event Handlers ---------------------------------------------

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
}, {
    ATTRS: {
        /**
         * @attribute {Array} nodes
         */
        nodes: {
            value : [],
            setter: '_setNodes',
            getter: '_getNodes'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.Rednose.TreeView = Y.mix(TreeView, Y.Rednose.TreeView);


}, '1.5.0-DEV', {
    "requires": [
        "gallery-sm-treeview-sortable",
        "rednose-tree",
        "rednose-treeview-anim",
        "rednose-treeview-datasource",
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
