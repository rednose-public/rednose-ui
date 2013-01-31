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

    /*
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
            self  = this,
            tree;

        items = model.get('items');

        if (this.get('tree')) {
            tree = this.get('tree');

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

        if (this.openEvent) {
            this.openEvent.detach();
            this.closeEvent.detach();
        }

        this._processTree(tree.rootNode);

        this.openEvent = tree.on('open', function(e) {
            var li = tree.getHTMLNode(e.node);

            self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));
        });
        this.closeEvent = tree.on('close', function(e) {
            var li = tree.getHTMLNode(e.node);
            var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));

            delete self._stateMap[stateIndex];
        });

        //this._enhanceCells();
    },

    /*bindUI: function () {
        var self = this,
            tree = this.get('tree'),
            nodes;

        // Forward tree events so extensions and plugins can subscribe to them.
        tree.subscribe('collapseComplete', function (node) {
            var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');

            // Update the icon.
            self._setCollapsedIcon(el);

            self.fire('collapseComplete', { node: node });
        });

        tree.subscribe('expandComplete', function (node) {
            var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');

            // Update the icon.
            self._setExpandedIcon(el);

            self.fire('expandComplete', { node: node });
        });

        // Disable the default expand/collapse behaviour, only allow
        // expanding and collapsing when clicking the icon.
        tree.subscribe('expand',   function () { return self.get('iconClicked'); });
        tree.subscribe('collapse', function () { return self.get('iconClicked'); });

        nodes = tree.getNodesBy(function () { return true; });

        Y.each(nodes, function (node) {
            var table = self._getTableElement(node);

            // Rebind the click event.
            table.on('click', function (e) {
                var el = e.target.get('parentNode').get('parentNode');

                // Check if an expand/collapse icon was clicked.
                if (el.hasClass('ygtvtp') ||
                        el.hasClass('ygtvtph') ||
                        el.hasClass('ygtvlp') ||
                        el.hasClass('ygtvlph')) {

                    self.set('iconClicked', true);
                    node.expand();
                    self.set('iconClicked', false);

                } else if (el.hasClass('ygtvtm') ||
                        el.hasClass('ygtvtmh') ||
                        el.hasClass('ygtvlm') ||
                        el.hasClass('ygtvlmh')) {

                    self.set('iconClicked', true);
                    node.collapse();
                    self.set('iconClicked', false);
                }
            });
        });
    },*/

    _refresh: function () {
        this._renderTree();
        //this.bindUI();

        this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes.
     */
    _processTree: function (rootNode) {
        var self = this,
            tree = this.get('tree');

        rootNode.open();

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
                self._processTree(treeNode);
            }
        }

        if (rootNode !== tree.rootNode) {
            console.log(self._stateMap);
            if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {
                rootNode.close();
            }
        }
    },

    /**
     * Add the tooltips and render the icons in the treeview.
     */
    _enhanceCells: function () {
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
    },


    /**
     * Add an icon node or update an existing one.
     */
    _setCollapsedIcon: function (el) {
        var a = el.one('a');

        if (a.one('i')) {
            a.one('i').removeClass('icon-chevron-down');
            a.one('i').addClass('icon-chevron-right');
        } else {
            a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-right"></i>'));
        }
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setExpandedIcon: function (el) {
        var a = el.one('a');

        if (a.one('i')) {
            a.one('i').removeClass('icon-chevron-right');
            a.one('i').addClass('icon-chevron-down');
        } else {
            a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-down"></i>'));
        }
    }

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
