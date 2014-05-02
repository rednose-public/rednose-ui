YUI.add('dropdown-base-test', function (Y) {

    var Assert = Y.Assert,
        suite;

    suite = new Y.Test.Suite('DropdownBase');

    suite.add(new Y.Test.Case({
        name: 'Basic',

        setUp: function () {
            this.dropdown = new Y.Rednose.DropdownBase({
                items: [
                    { id: 'testItem1', title: 'Test Item 1' },
                    { id: 'testItem2', title: 'Test Item 2' }
                ]
            });
        },

        tearDown: function () {
            this.dropdown.destroy();
        },

        '`open` should enable the dropdown open state': function () {
            var dropdown = this.dropdown;

            Assert.isFalse(dropdown.isOpen());

            dropdown.open();

            Assert.isTrue(dropdown.isOpen());
        },

        '`close` should disable the dropdown open state': function () {
            var dropdown = this.dropdown;

            dropdown.open();

            Assert.isTrue(dropdown.isOpen());

            dropdown.close();

            Assert.isFalse(dropdown.isOpen());
        },

        '`toggle` should toggle the dropdown open state': function () {
            var dropdown = this.dropdown;

            Assert.isFalse(dropdown.isOpen());

            dropdown.toggle();

            Assert.isTrue(dropdown.isOpen());

            dropdown.toggle();

            Assert.isFalse(dropdown.isOpen());
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Events',

        setUp: function () {
            this.dropdown = new Y.Rednose.DropdownBase({
                items: [
                    { id: 'testItem1', title: 'Test Item 1' },
                    { id: 'testItem2', title: 'Test Item 2' }
                ]
            });
        },

        tearDown: function () {
            this.dropdown.destroy();
        },

        '`open` event should fire when the dropdown opens': function () {
            var calls    = 0,
                dropdown = this.dropdown;

            dropdown.on('open', function (e) {
                calls++;
            });

            dropdown.open();

            Assert.areEqual(1, calls);
        },

        '`close` event should fire when the dropdown opens': function () {
            var calls    = 0,
                dropdown = this.dropdown;

            dropdown.on('open', function (e) {
                calls++;
            });

            dropdown.open().close();

            Assert.areEqual(1, calls);
        }
    }));

    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['rednose-dropdown', 'test', 'node-event-simulate']
});
