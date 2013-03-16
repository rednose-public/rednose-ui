var TreeView;

// TODO: Bind model events
// TODO: Table support, style odd/even
// TODO: Fix overflow CSS for Firefox
// TODO: Implement sorting
// TODO: Document data input
// TODO: Disable text selection within treenodes
TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter, Y.Libbit.TreeView.DD ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    /**
    * Reference to all nodes (for use in extensions)
    **/
    _treeNodes: [],

    /**
    * Selected node
    **/
    selectedNode: null,

    /**
    * Icon (className) mapping for diffrent types of models
    **/
    _iconMap: [],

    /**
     * Reference pointer to events
     */
    afterEvent: null,
    openEvent: null,
    closeEvent: null,

    initializer: function () {
        var contentBox = this.get('contentBox'),
            width      = this.get('width'),
            height     = this.get('height'),
            model      = this.get('data');

        contentBox.setStyle('width', width);
        contentBox.setStyle('height', height);
        contentBox.setStyle('overflow', 'auto');

        if (model.get('icons')) {
            this._iconMap = model.get('icons');
        }

        this.tc = Y.Node.create('<div class="tc"></div>');
    },

    destroy: function () {
        this.get('tree').destroy({ remove: true });
    },

    getNodes: function() {
        return this._treeNodes;
    },

    renderUI: function () {
        this.get('boundingBox').addClass('libbit-treeview-outer-container');
        this.get('srcNode').append(this.tc).addClass('libbit-treeview-inner-container');

        if (this.get('header')) {
            this.tc.prepend('<div class="nav-header">' + this.get('header') + '</div>');
        }
        this._renderTree();
    },

    _renderTree: function () {
        var filter = this.get('filter'),
            model  = this.get('data'),
            items,
            tree;

        items = filter && filter.type ? model.filterByAttr(filter.type, filter.attr, filter.value) : model.get('items');

        this._treeNodes = [];

        if (this.get('tree')) {
            tree = this.get('tree');

            tree.detach('open', this._handleExpand);
            tree.detach('close', this._handleCollapse);

            while (tree.rootNode.children.length > 0) {
                tree.removeNode(tree.rootNode.children[0]);
            }

            for (var i in items) {
                tree.insertNode(tree.rootNode, items[i]);
            }
        } else {
            tree = new Y.TreeView({
                container: this.get('srcNode').one('.tc'),
                nodes: items
            });

            this.set('tree', tree);

            tree.render();
        }

        this._processTree(tree.rootNode);
        this._bindEvents();
    },

    _bindEvents: function() {
        var tree = this.get('tree');

        tree.on('open', this._handleExpand, this);
        tree.on('close', this._handleCollapse, this);

        this.fire('Finished');
    },

    _handleExpand: function (e) {
        var tree = this.get('tree');
        var li = tree.getHTMLNode(e.node);

        this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));
        this.fire('expand', e);
    },

    _handleCollapse: function (e) {
        var tree = this.get('tree');
        var li = tree.getHTMLNode(e.node);
        var stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));

        delete this._stateMap[stateIndex];
        this.fire('collapse', e);
    },

    /**
    * Folderstate icons
    **/
    bindUI: function () {
        var tree = this.get('tree');

        tree.on(['open', 'close'], function(e) {
            var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');

            if (e.type === 'treeView:close') {
                iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');
            }

            if (iconEl) {
                if (e.type === 'treeView:close') {
                    iconEl.removeClass('icon-folder-open');
                    iconEl.addClass('icon-folder-close');
                } else {
                    iconEl.removeClass('icon-folder-close');
                    iconEl.addClass('icon-folder-open');
                }
            }
        });
    },

    refresh: function () {
        this._renderTree();
        this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        var self = this,
            tree = this.get('tree');

        if (rootNode.children.length) {
            rootNode.open();
        }

        // Attach data to the nodes
        for (var i in rootNode.children) {
            var treeNode = rootNode.children[i],
                li = tree.getHTMLNode(treeNode);
                model = treeNode.data;

            self._treeNodes.push(treeNode);

            // Fix the width to be 100%.
            var count = 0;
            var current = li.ancestor('.yui3-treeview-children');

            while (current.ancestor('.yui3-treeview-children')) {
                count++;
                current = current.ancestor('.yui3-treeview-children');
            }

            if (count > 0) {
                var ml = count * 20;

                if (ml) {
                    li.setStyle('marginLeft', -ml);
                    li.one('div').setStyle('paddingLeft', ml + 20);
                    li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);
                    li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);
                }
            }

            if (Y.instanceOf(model, Y.Model)) {
                li.setAttribute('data-yui3-modelId', model.get('id'));
                li.setAttribute('data-yui3-record', model.get('clientId'));

                // Set the title for mouseovers on long labels
                li.set('title', treeNode.label);

                if (typeof(self._iconMap[model.name]) !== 'undefined') {
                    self._setIcon(li, self._iconMap[model.name]);
                }

                li.setData({ model: model });
            }

            if (treeNode.children) {
                // Walk through the tree recursively
                self._processTree(treeNode);
            }
        }

        // Restore state of this node.
        if (rootNode !== tree.rootNode) {
            if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {
                rootNode.close();
            }

            if (self.selectedNode === rootNode.data.get('id')) {
                rootNode.select();
            }
        }
    },

    /**
     * Update the icon classes
     */
    _setIcon: function(node, className) {
        if (node) {
            iconNode = node.one('.yui3-treeview-icon');

            if (iconNode) {
                iconNode.removeClass('yui3-treeview-icon');
                iconNode.addClass(className);
                iconNode.addClass('libbit-treeview-icon');
            }
        }
    }

}, {
    ATTRS: {
        // Tree header, optional.
        header : {
            value: null
        },

        // The data object containing the models.
        data : {
            value: null
        },

        // The original tree object.
        tree : {
            value: null
        },

        width : {
            value: null
        },

        height : {
            value: null
        },

        // Wether to render all nodes or just branches.
        renderLeaves: {
            value: true
        },

        // State attribute.
        iconClicked : {
            value: false
        },

        /**
         * A filter to apply to the tree
         *
         * @attribute {Object} filter
         */
        filter: {
            value : {
                type: null,
                attr: null,
                value: []
            }
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').TreeView = TreeView;
