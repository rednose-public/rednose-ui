YUI.add('dropdown-test', function (Y) {

    var Assert = Y.Assert,
        suite;

    suite = new Y.Test.Suite('Dropdown');

    suite.add(new Y.Test.Case({
        name: 'Events',

        setUp: function () {
            Y.one('#container').append(Y.Node.create('<div class="menu"></div>'));
        },

        tearDown: function () {
            Y.one('.menu').remove();
        },

        'Dropdown should hide when clicked outside': function () {
            var menu = Y.one('.menu');

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', title: 'Test Item 1' },
                    { id: 'testItem2', title: 'Test Item 2' }
                ]
            }).render().toggle();

            Assert.isTrue(menu.hasClass('open'));

            Y.one('body').simulate('click');
            Assert.isFalse(menu.hasClass('open'));

            dropdown.destroy();
        },

        'Dropdown should hide when an item is clicked': function () {
            var menu = Y.one('.menu');

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', title: 'Test Item 1' },
                    { id: 'testItem2', title: 'Test Item 2' }
                ]
            }).render().toggle();

            Assert.isTrue(menu.hasClass('open'));

            menu.one('a').simulate('click');

            Assert.isFalse(menu.hasClass('open'));

            dropdown.destroy();
        }
    }));

    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['rednose-dropdown', 'test', 'node-event-simulate']
});
