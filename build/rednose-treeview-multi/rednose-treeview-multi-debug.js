YUI.add('rednose-treeview-multi', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var MultiTreeView = Y.Base.create('multiTreeView', Y.View, [], {
    initializer: function () {
        this._treeViews = [];

        this.after('treeView:select', this._afterTreeViewSelect);
        this.after('treesChange', this._afterTreesChange);
    },

    destructor: function () {
        for (var i = 0, len = this._treeViews.length; i < len; i++) {
            this._treeViews[i].destroy();
        }

        this._treeViews = [];
    },

    render: function () {
        var self      = this,
            container = this.get('container'),
            trees     = this.get('trees'),
            config    = this.get('config');

        Y.Array.each(trees, function (tree) {
            var subContainer = Y.Node.create('<div class="rednose-treeview"><div></div></div>');

            container.append(subContainer);

            var treeView = new Y.Rednose.TreeView(Y.mix({
                container : subContainer,
                nodes     : tree.nodes,
                header    : tree.type
            }, config));

            self._treeViews.push(treeView);

            treeView.addTarget(self);
            treeView.render();
        });

        return this;
    },

    open: function () {
        Y.Array.each(this._treeViews, function (treeView) {
            treeView.set('animated', false);
            treeView.open();
            treeView.set('animated', true);
        });
    },

    /**
     * @return {Tree.Node}
     */
    getFirstNode: function () {
        var treeViews = this._treeViews;

        if (!treeViews) {
            return;
        }

        for (var i = 0, len = treeViews.length; i < len; i++) {
            var node = treeViews[i].children[0];

            if (node) {
                return node;
            }
        }

        return null;
    },

    /**
     * @return {Tree.Node[]}
     */
    getSelectedNodes: function () {
        var nodes = [];

        Y.Array.each(this._treeViews, function (treeView) {
            nodes = nodes.concat(treeView.getSelectedNodes());
        });

        return nodes;
    },

    /**
     * @param {String} id
     *
     * @return {Tree.Node[]}
     */
    getNodeById: function (id) {
        for (var i = 0, len = this._treeViews.length; i < len; i++) {
            var node = this._treeViews[i].getNodeById(id);

            if (node) {
                return node;
            }
        }

        return null;
    },

    _afterTreeViewSelect: function (e) {
        Y.Array.each(this._treeViews, function (treeView) {
            if (e.target !== treeView) {
                treeView.unselect();
            }
        });
    },

    _afterTreesChange: function () {
        var container = this.get('container');

        for (var i = 0, len = this._treeViews.length; i < len; i++) {
            this._treeViews[i].destroy();
        }

        this._treeViews = [];

        container.empty();

        this.render();
    }
}, {
    ATTRS: {
        /**
         * @type {Array}
         */
        trees: {
            value: []
        },

        /**
         * @type {Object}
         */
        config: {
            value: {}
        }
    }
});

Y.namespace('Rednose.TreeView').Multi = MultiTreeView;


}, '1.5.0-DEV', {"requires": ["rednose-treeview"]});
