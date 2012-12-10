YUI.add('libbit-treeview-base-test', function (Y) {

var Assert = Y.Assert,
    suite;

// -- Suite --------------------------------------------------------------------
suite = new Y.Test.Suite('treeview');


// -- Widget ----------------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Basic',

    setUp : function () {
        var container  = Y.one('#container'),
            model = new Y.Libbit.ModelTree(),
            items;

        items = [
             {
                 label   : "Category 1",
                 data    : new Y.Model(),
                 children: [
                     {
                         label   : "Field group 1",
                         data    : new Y.Model(),
                         children: []
                     }
                 ]
             }
         ];

        model.set('items', items);

        // FIXME: Shouldn't need an extra node
        treeNode = Y.Node.create('<div class="libbit-tree-container"></div>');
        container.append(treeNode);

        this.tree = new Y.Libbit.TreeView({
            srcNode   : treeNode,
            data      : model,
            height    : '100%',
            dragdrop  : false,
            selectable: true
        });

        this.tree.render();
    },

    tearDown: function () {
        this.tree.destroy();
        delete this.tree;
    },

    'Smoke test, tree should contain items': function () {
        var tree   = this.tree,
            labels = tree.get('contentBox').all('.ygtvlabel');

        Assert.areEqual('Category 1', labels.item(0).get('innerHTML'));
        Assert.areEqual('Field group 1', labels.item(1).get('innerHTML'));
    },

    'Selecting an item should add class `treeview-highlight`': function () {
        var tree = this.tree,
            cb   = tree.get('contentBox'),
            item;

        item = cb.one('span');

        Assert.areEqual(0, cb.all('.treeview-highlight').size());

        Assert.isNull(tree.get('selectedItem'));

        Assert.isFalse(item.ancestor('table').hasClass('treeview-highlight'));

        // Simulate the button click
        item.simulate('click');

        Assert.areEqual(1, cb.all('.treeview-highlight').size());

        Assert.isTrue(item.ancestor('table').hasClass('treeview-highlight'));

        Assert.isInstanceOf(Y.Model, tree.get('selectedItem').getData('model'));
    }
}));

// -- Config tests ----------------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Config',

    setUp : function () {
    },

    tearDown: function () {
        Y.one("#container").empty(true);
    },

    'Passing `height` and `width` attributes in with the config will size the view': function() {
        var container  = Y.one('#container');

        // FIXME: Shouldn't need an extra node
        treeNode = Y.Node.create('<div class="libbit-tree-container"></div>');
        container.append(treeNode);

        tree = new Y.Libbit.TreeView({
            srcNode   : treeNode,
            width     : '50px',
            height    : '50px'
        });

        Assert.areEqual('50px', tree.get('contentBox').getStyle('width'));
        Assert.areEqual('50px', tree.get('contentBox').getStyle('height'));
    }
}));

Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['test', 'node-event-simulate']
});
