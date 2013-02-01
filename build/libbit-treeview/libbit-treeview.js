YUI.add('libbit-treeview', function (Y, NAME) {

var TreeView;

// TODO: Bind model events
// TODO: Table support, style odd/even
// TODO: Fix overflow CSS for Firefox
// TODO: Implement sorting
// TODO: Document data input
// TODO: Add scrollable
// TODO: Disable text selection within treenodes
TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    /**
    * Selected node
    **/
    selectedNode: null,

    /**
    * Reference pointer to events
    */
    afterEvent: null,
    openEvent: null,
    closeEvent: null,
    selectEvent: null,

    initializer: function () {
        var contentBox = this.get('contentBox'),
            width      = this.get('width'),
            height     = this.get('height'),
            model      = this.get('data');

        contentBox.setStyle('width', width);
        contentBox.setStyle('height', height);
        contentBox.setStyle('overflow', 'auto');

        if (model) {
            this.afterEvent = model.after('load', this._refresh, this);
        }
    },

    renderUI: function () {
        var src        = this.get('srcNode'),
            container  = Y.Node.create('<div class="libbit-treeview-content"></div>'),
            sID        = Y.stamp(container);

        container.set('id', sID);
        src.append(container);

        this.set('treeContainer', container);

        this._renderTree();
    },

    _renderTree: function () {
        var model = this.get('data'),
            tree;

        items = model.get('items');

        if (this.get('tree')) {
            tree = this.get('tree');

            this.openEvent.detach();
            this.closeEvent.detach();
            this.selectEvent.detach();

            while (tree.rootNode.children.length > 0) {
                tree.removeNode(tree.rootNode.children[0]);
            }

            for (var i in items) {
                tree.insertNode(tree.rootNode, items[i]);
            }
        } else {
            tree = new Y.TreeView({
                container: this.get('srcNode'),
                nodes: items
            });

            this.set('tree', tree);
        }

        tree.render();

        this._updateIcons();
        this._processTree(tree.rootNode);
        this._bindEvents();
    },

    _bindEvents: function() {
        var tree = this.get('tree');
        var self = this;

        this.openEvent = tree.on('open', function(e) {
            var li = tree.getHTMLNode(e.node);

            self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));
        });

        this.closeEvent = tree.on('close', function(e) {
            var li = tree.getHTMLNode(e.node);
            var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));

            delete self._stateMap[stateIndex];
        });

        this.selectEvent = tree.on('select', function(e) {
            var li = tree.getHTMLNode(e.node);

            self.selectedNode = parseInt(li.getAttribute('data-yui3-modelId'));
        });
    },

    /**
    * Folderstate icons
    **/
    bindUI: function () {
        var tree = this.get('tree');

        tree.on(['open', 'close'], function(e) {
            var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');

            if (e.type == 'treeView:close') {
                iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');
            }

            if (iconEl) {
                if (e.type == 'treeView:close') {
                    iconEl.removeClass('icon-folder-open');
                    iconEl.addClass('icon-folder-close');
                } else {
                    iconEl.removeClass('icon-folder-close');
                    iconEl.addClass('icon-folder-open');
                }
            }
        });
    },

    _refresh: function () {
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

        rootNode.open();

        // Attach data to the nodes
        for (var i in rootNode.children) {
            var treeNode = rootNode.children[i],
                li = tree.getHTMLNode(treeNode);
                model = treeNode.data;

            if (Y.instanceOf(model, Y.Model)) {
                li.setAttribute('data-yui3-modelId', model.get('id'));
                li.setAttribute('data-yui3-record', model.get('clientId'));
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
    _updateIcons: function() {
        Y.all('.yui3-treeview-icon').each(function() {
            this.removeClass('yui3-treeview-icon');

            if (this.ancestor("li").hasClass('yui3-treeview-can-have-children')) {
                this.addClass('icon-folder-close');
            } else {
                // Custom icons...
            }
        });
    },

    /**
     * Add the tooltips and render the icons in the treeview.
     */
    /*_enhanceCells: function () {
        var self        = this,
            boundingBox = this.get('boundingBox');

        boundingBox.all('.ygtvlabel').each(function (node) {
            var model         = self._getModelFromLabelNode(node),
                content       = node.getContent(),
                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),
                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),
                contentNode,
                icon;

            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.
            if (Y.TB) {
                if (Y.instanceOf(model, Y.TB.Category)) {
                    icon = 'icon-folder-close';
                } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {
                    icon = 'icon-align-left';
                } else if (Y.instanceOf(model, Y.TB.Image)) {
                    icon = 'icon-picture';
                } else if (Y.instanceOf(model, Y.DocGen.Table)) {
                    icon = 'icon-th';
                }
            }

            if (icon) {
                contentNode = Y.Node.create('<span class="label-container"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                node.setContent(contentNode);
            }

            node.ancestor('.ygtvtable').set('title', content);

            // Set the expand/colllapse items if necessary.
            if (collapsedNode) {
                self._setCollapsedIcon(collapsedNode);
            }

            if (expandedNode) {
                self._setExpandedIcon(expandedNode);
            }
        });
    },*/

}, {
    ATTRS: {
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
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "anim",
        "libbit-model-tree",
        "libbit-treeview-filter",
        "libbit-treeview-anim",
        "libbit-treeview-select",
        "libbit-treeview-dd",
        "widget",
        "gallery-sm-treeview"
    ],
    "skinnable": true
});
