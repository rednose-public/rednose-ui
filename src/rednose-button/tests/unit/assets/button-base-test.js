YUI.add('rednose-button-base-test', function (Y) {

    var Assert = Y.Assert,
        suite;

    suite = new Y.Test.Suite('Button.Base');

    suite.add(new Y.Test.Case({
        name: 'Basic',

        setUp: function () {
            this.button = new Y.Rednose.Button.Base({
                value: 'Test Button',
                title: 'Test Button Title'
            });
        },

        tearDown: function () {
            this.button.destroy();
        },

        '`disable` should disable the button': function () {
            var button = this.button;

            Assert.isFalse(button.isDisabled());

            button.disable();

            Assert.isTrue(button.isDisabled());
        },

        '`enable` should enable the button': function () {
            var button = this.button;

            button.disable();
            button.enable();

            Assert.isFalse(button.isDisabled());
        },

        '`activate` should activate the button': function () {
            var button = this.button;

            Assert.isFalse(button.isActive());

            button.activate();

            Assert.isTrue(button.isActive());
        },

        '`deactivate` should deactivate the button': function () {
            var button = this.button;

            button.activate();
            button.deactivate();

            Assert.isFalse(button.isActive());
        },

        '`toggleActive` should toggle the button active state': function () {
            var button = this.button;

            Assert.isFalse(button.isActive());

            button.toggleActive();

            Assert.isTrue(button.isActive());

            button.toggleActive();

            Assert.isFalse(button.isActive());
        },

        '`rename` should rename the button': function () {
            var button = this.button;

            Assert.areEqual('Test Button', button.value);

            button.rename('Renamed Button');

            Assert.areEqual('Renamed Button', button.value);
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Events',

        setUp: function () {
            this.button = new Y.Rednose.Button.Base({
                value: 'Test Button',
                title: 'Test Button Title'
            });
        },

        tearDown: function () {
            this.button.destroy();
        },

        '`enable` event should fire when the button is enabled': function () {
            var calls  = 0,
                button = this.button.disable();

            button.on('enable', function (e) {
                calls++;
            });

            button.enable();

            Assert.areEqual(1, calls);
        },

        '`disable` event should fire when the button is disabled': function () {
            var calls  = 0,
                button = this.button;

            button.on('disable', function (e) {
                calls++;
            });

            button.disable();

            Assert.areEqual(1, calls);
        },

        '`activate` event should fire when the button is activated': function () {
            var calls  = 0,
                button = this.button;

            button.on('activate', function (e) {
                calls++;
            });

            button.activate();

            Assert.areEqual(1, calls);
        },

        '`deactivate` event should fire when the button is deactivated': function () {
            var calls  = 0,
                button = this.button.activate();

            button.on('deactivate', function (e) {
                calls++;
            });

            button.deactivate();

            Assert.areEqual(1, calls);
        },

        '`rename` event should fire when the button is renamed': function () {
            var calls  = 0,
                button = this.button,
                value;

            button.on('rename', function (e) {
                Assert.areEqual('Renamed Button', e.value);

                calls++;
            });

            button.rename('Renamed Button');

            Assert.areEqual(1, calls);
        }
    }));

    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['rednose-button-base', 'test']
});
