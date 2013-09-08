YUI.add('treeview-test', function (Y) {

var Assert = Y.Assert,
    suite;

suite = new Y.Test.Suite('Treeview');

suite.add(new Y.Test.Case({
    name: 'Lifecycle',

    setUp: function () {
        Y.one('#container').append('<div id="treeview"></div>');
    },

    'constructor should work without a treemodel': function () {
        var treeView = new Y.Rednose.TreeView();

        Assert.isInstanceOf(Y.Rednose.TreeView, treeView);

        treeView.destroy();
    },

    'destructor should destroy the container from the DOM': function () {
        var treeView = new Y.Rednose.TreeView({
            container: Y.one('#treeview')
        });

        treeView.render();
        treeView.destroy();

        Assert.isUndefined(treeView.get('#treeview'));
    },

    'destructor should free references to allow garbage collection': function () {
        var treeView = new Y.Rednose.TreeView();

        treeView.destroy();

        Assert.isNull(treeView._stateMap);
    }
}));

suite.add(new Y.Test.Case({
    name: 'Basic',

    setUp: function () {
        Y.one('#container').append('<div id="treeview"></div>');
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
