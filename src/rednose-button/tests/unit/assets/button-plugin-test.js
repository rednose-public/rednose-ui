YUI.add('rednose-button-plugin-test', function (Y) {

    var Assert = Y.Assert,
        suite;

    suite = new Y.Test.Suite('Plugin.Dropdown');

    suite.add(new Y.Test.Case({
        name: 'Lifecycle',

        setUp: function () {
            Y.one('#container').append(Y.Node.create('<button id="button">Test</button>'));
        },

        tearDown: function () {
            Y.one('#button').remove();
        },

        '`plug()` should bind the menu': function () {
            var button = Y.one('#button');

            button.plug(Y.Rednose.ContextMenu);

            Assert.isInstanceOf(Y.Rednose.ContextMenu, button.hasPlugin('dropdown'));

            button.unplug('dropdown');
        },

        '`unplug()` should purge the menu': function () {
            var button = Y.one('#button');

            button.plug(Y.Rednose.ContextMenu);

            button.unplug('dropdown');

            Assert.isUndefined(button.hasPlugin('dropdown'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['rednose-dropdown-plugin', 'test']
});
