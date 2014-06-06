/*jshint boss:true, expr:true, onevar:false */

var MultiTreeView = Y.Base.create('multTreeView', Y.View, [], {
    initializer: function () {
        this._treeViews = [];

        this.after('treeView:select', this._afterTreeViewSelect);
    },

    render: function () {
        var self      = this,
            container = this.get('container'),
            trees     = this.get('trees');

        Y.Object.each(trees, function (nodes, type) {
            var subContainer = Y.Node.create('<div class="rednose-treeview"></div>');

            container.append(subContainer);

            // TODO: Cleanup instances.
            var treeView = new Y.Rednose.TreeView({
                container : subContainer,
                nodes     : nodes,
                selectable: true,
                header    : type
            });

            self._treeViews.push(treeView);

            Y.Array.each(treeView.children, function (node) {
                node.open();
            });

            treeView.addTarget(self);
            treeView.render();
        });

        return this;
    },

    _afterTreeViewSelect: function (e) {
        Y.Array.each(this._treeViews, function (treeView) {
            if (e.target !== treeView) {
                treeView.unselect();
            }
        });
    }
});

Y.namespace('Rednose.TreeView').Multi = MultiTreeView;
