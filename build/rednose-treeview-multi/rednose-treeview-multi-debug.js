YUI.add('rednose-treeview-multi', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var MultiTreeView = Y.Base.create('multTreeView', Y.View, [], {
    initializer: function () {
        this._treeViews = [];

        this.after('treeView:select', this._afterTreeViewSelect);
    },

    render: function () {
        var self      = this,
            container = this.get('container'),
            list      = this.get('list');

        list.each(function (tree) {
            var subContainer = Y.Node.create('<div class="rednose-treeview"></div>'),
                type         = tree.get('type');

            subContainer.setAttribute('data-type', tree.get('type'));
            container.append(subContainer);

            // // TODO: Cleanup instances.
            var treeView = new Y.Rednose.TreeView({
                container : subContainer,
                model     : tree,
                selectable: true,
                dragdrop  : true,
                groups    : ['docgenamin-assetlibrary'],
                header    : type,

                ddTest: function (data) {
                    return (data.name !== 'category');
                }
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


}, '1.5.0-DEV', {"requires": ["rednose-treeview"]});
