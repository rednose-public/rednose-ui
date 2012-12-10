// Global YAHOO object, fixes multiple instances of YAHOO treeview
YAHOO = Y.YUI2;

var TreeView;

// TODO: Bind model events
// TODO: Table support, style odd/even
// TODO: Fix overflow CSS for Firefox
// TODO: Implement sorting
// TODO: Document data input
// TODO: Add scrollable
// TODO: Disable text selection within treenodes
TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.DD ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    initializer: function () {
        var contentBox = this.get('contentBox'),
            width      = this.get('width'),
            height     = this.get('height'),
            model      = this.get('data');

        contentBox.setStyle('width', width);
        contentBox.setStyle('height', height);
        contentBox.setStyle('overflow', 'auto');

        if (model) {
            model.after('load', this._refresh, this);
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
        var model         = this.get('data'),
            treeContainer = this.get('treeContainer'),
            tree;

        if (this.get('tree')) {
            this.get('tree').destroy();
        }

        // Clone the data object as the TreeView messes with it's internal structure.
        items = this.get('renderLeaves') ? Y.clone(model.get('items')) : Y.clone(model.getBranches());

        tree = new YAHOO.widget.TreeView(treeContainer.get('id'), items);
        tree.render();

        this.set('tree', tree);

        // XXX: Hide the tree while postprocessing?
        this._attachData();

        // TODO: Persist selection
        this._restoreState();

        this._enhanceCells();
    },

    bindUI: function () {
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
    },

    _refresh: function () {
        var self  = this,
            tree  = this.get('tree'),
            nodes = tree.getNodesBy(function (node) { return node.expanded; });

        // Store the state. Store by label for now, clientID seems bugged.
        Y.Array.each(nodes, function (node) {
            self._stateMap.push(node.label);
        });

        this._renderTree();
        this.bindUI();

        this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node.
     */
    _attachData: function () {
        var self = this,
            tree = this.get('tree');

        tree.expandAll();

        nodes = tree.getNodesBy(function () { return true; });

        Y.each(nodes, function (node) {
            var table = self._getTableElement(node);
                model = node.data;

            if (Y.instanceOf(model, Y.Model)) {
                table.setAttribute('data-yui3-record', model.get('clientId'));
                table.setData({ model: model });
            }
        });

        tree.collapseAll();
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
     * Restores the current tree state if it's set.
     */
     _restoreState: function () {
        var self = this,
            tree = this.get('tree'),
            nodes;

        if (this._stateMap.length > 0) {
            nodes = tree.getNodesBy(function (node) {
                return self._stateMap.indexOf(node.label) > -1;
            });

            Y.Array.each(nodes, function (node) {
                node.expand();
            });

            this._stateMap = [];
        }
    },

    /**
     * Retrieves the model corresponding to a label DOM node.
     */
    _getModelFromLabelNode: function (node) {
        return node.ancestor('table').getData().model;
    },

    /**
     * Retrieve the DOM element containing the main table of a given TreeView node.
     */
    _getTableElement: function (node) {
        var boundingBox = this.get('boundingBox'),
            id          = node.labelElId;

        return boundingBox.one('#' + id).ancestor('table');
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
