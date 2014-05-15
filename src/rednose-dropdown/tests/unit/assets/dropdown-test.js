YUI.add('dropdown-test', function (Y) {

    var Assert = Y.Assert,
        suite;

    suite = new Y.Test.Suite('Dropdown');

    suite.add(new Y.Test.Case({
        name: 'Config',

        setUp: function () {
            Y.one('#container').append(Y.Node.create('<div class="menu"></div>'));
        },

        tearDown: function () {
            Y.one('.menu').remove();
        },

        'Default `href` attribute should be hash': function () {
            var menu = Y.one('.menu');

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', title: 'Test Item 1' }
                ]
            }).render().open();

            Assert.areEqual('#', menu.one('a').getAttribute('href'));
        },

        '`url` should set the `href` attribute': function () {
            var menu = Y.one('.menu');

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', title: 'Test Item 1', url: 'http://wwww.rednose.nl' }
                ]
            }).render().open();

            Assert.areEqual('http://wwww.rednose.nl', menu.one('a').getAttribute('href'));
        },

        '`html` property should assign an id if none is provided': function () {
            var menu = Y.one('.menu'),
                html = '<a href="http://www.rednose.nl"><div>You joined the folder <strong>Demo user\'s shared folder</strong></div><div><small class="muted">39 minutes ago</small></div></a>';

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { html: html }
                ]
            }).render().open();

            Assert.isTrue(menu.one('a').hasAttribute('data-id'));
            Assert.isInstanceOf(Y.Rednose.Dropdown.Item, dropdown.getItemById(menu.one('a').getAttribute('data-id')));
        },

        '`html` property should render custom HTML': function () {
            var menu = Y.one('.menu'),
                html = '<a href="http://www.rednose.nl"><div>You joined the folder <strong>Demo user\'s shared folder</strong></div><div><small class="muted">39 minutes ago</small></div></a>';

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { html: html }
                ]
            }).render().open();

            menu.one('a').removeAttribute('data-id');
            Assert.areEqual(html, menu.one('a').get('outerHTML'));
        }
    }));

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
            }).render().open();

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
            }).render().open();

            Assert.isTrue(menu.hasClass('open'));

            menu.one('a').simulate('click');

            Assert.isFalse(menu.hasClass('open'));

            dropdown.destroy();
        },

        'Dropdown should fire `select` when an item is clicked': function () {
            var calls = 0,
                menu  = Y.one('.menu');

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', title: 'Test Item 1' },
                    { id: 'testItem2', title: 'Test Item 2' }
                ]
            }).render().open();

            dropdown.on('select', function (e) {
                calls++;
            });

            menu.one('a').simulate('click');

            Assert.areEqual(1, calls);
        },

        'Dropdown should fire `select#id` when an item is clicked': function () {
            var calls = 0,
                menu  = Y.one('.menu');

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', title: 'Test Item 1' },
                    { id: 'testItem2', title: 'Test Item 2' }
                ]
            }).render().open();

            dropdown.on('select#testItem1', function (e) {
                calls++;
            });

            menu.one('a').simulate('click');

            Assert.areEqual(1, calls);
        },

        'Dropdown should fire `select` when an icon is clicked': function () {
            var calls = 0,
                menu  = Y.one('.menu');

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', title: 'Test Item 1', icon: 'icon-test' },
                    { id: 'testItem2', title: 'Test Item 2', icon: 'icon-test' }
                ]
            }).render().open();

            dropdown.on('select', function (e) {
                calls++;
            });

            menu.one('i').simulate('click');

            Assert.areEqual(1, calls);
        },

        'Dropdown should set `url` for items with custom HTML': function () {
            var menu = Y.one('.menu');

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', html: '<a href="testUrl"></a>' }
                ]
            }).render().open();

            Assert.areEqual('testUrl', dropdown.getItemById('testItem1').url);
        },

        'Dropdown should preserve explicit `url` for items with custom HTML': function () {
            var menu = Y.one('.menu');

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', html: '<a href="testUrl"></a>', url: 'explicitUrl' }
                ]
            }).render().open();

            Assert.areEqual('explicitUrl', dropdown.getItemById('testItem1').url);
        },

        'The `select` event payload should contain the origin event': function () {
            var menu = Y.one('.menu'),
                event,
                originEvent;

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', title: 'Test Item 1' },
                    { id: 'testItem2', title: 'Test Item 2' }
                ]
            }).render().open();

            menu.one('a').on('click', function (e) {
                originEvent = e;
            });

            dropdown.on('select', function (e) {
                event = e;
            });

            menu.one('a').simulate('click');

            Assert.areSame(originEvent.target, event.originEvent.target);
        },

        'The `select#id` event payload should contain the origin event': function () {
            var menu = Y.one('.menu'),
                event,
                originEvent;

            var dropdown = new Y.Rednose.Dropdown({
                container: menu,
                items: [
                    { id: 'testItem1', title: 'Test Item 1' },
                    { id: 'testItem2', title: 'Test Item 2' }
                ]
            }).render().open();

            menu.one('a').on('click', function (e) {
                originEvent = e;
            });

            dropdown.on('select#testItem1', function (e) {
                event = e;
            });

            menu.one('a').simulate('click');

            Assert.areSame(originEvent.target, event.originEvent.target);
        }
    }));

    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['rednose-dropdown', 'test', 'node-event-simulate']
});
