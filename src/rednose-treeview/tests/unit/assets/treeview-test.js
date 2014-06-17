YUI.add('treeview-test', function (Y) {

var Assert = Y.Assert,
    suite;

suite = new Y.Test.Suite('Treeview');

suite.add(new Y.Test.Case({
    name: 'Lifecycle',

    setUp: function () {
        Y.one('#container').append('<div id="treeview"></div>');
    },

    'constructor should work without nodes': function () {
        var treeView = new Y.Rednose.TreeView();

        Assert.isInstanceOf(Y.Rednose.TreeView, treeView);

        treeView.destroy();
    },

    'destructor should remove the container from the DOM': function () {
        var treeView = new Y.Rednose.TreeView({
            container: Y.one('#treeview')
        });

        treeView.render();
        treeView.destroy();

        Assert.isUndefined(treeView.get('#treeview'));
    }
}));

suite.add(new Y.Test.Case({
    name: 'Basic',

    setUp: function () {
        Y.one('#container').append('<div id="treeview"></div>');

        this.nodes = [{
            label: 'Home',
            children: [
                {
                    label: 'Folder 1',
                    children: [
                        {
                            label: 'Subfolder 1'
                        },
                        {
                            label: 'Subfolder 2'
                        }
                    ]
                },
                {
                    label: 'Folder 2'
                },
                {
                    label: 'Folder 3'
                },
                {
                    label: 'Folder 4'
                }
            ]
        }];
    },

    tearDown: function () {
        Y.one('#treeview').remove(true);
        this.nodes = null;
    },

    'nodes can be opened silently before the treeview is rendered': function () {
        var treeView = new Y.Rednose.TreeView({
            container: Y.one('#treeview'),
            nodes: this.nodes
        });

        console.log(this.nodes);
        var node = treeView.rootNode.children[0];
        node.open({ silent: true });

        treeView.render();

        Assert.isNotNull(treeView.getHTMLNode(node.children[0]));
    },

    'nodes can be opened non-silently before the treeview is rendered': function () {
        var treeView = new Y.Rednose.TreeView({
            container: Y.one('#treeview'),
            nodes: this.nodes
        });

        var node = treeView.rootNode.children[0];
        node.open();

        treeView.render();

        Assert.isNotNull(treeView.getHTMLNode(node.children[0]));
    },

    'render should render the TreeView into the DOM': function () {
        var treeView = new Y.Rednose.TreeView({
            container: Y.one('#treeview')
        });

        treeView.render();

        Assert.isTrue(Y.one('#treeview').hasClass('yui3-treeview'));

        treeView.destroy();
    }
}));

Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['rednose-treeview', 'test', 'node-event-simulate']
});
