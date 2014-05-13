YUI.add('rednose-button-test', function (Y) {
    var Assert = Y.Assert,
        suite;

    suite = new Y.Test.Suite('Button');

    suite.add(new Y.Test.Case({
        name: 'Basic',

        setUp: function () {
            this.button = new Y.Rednose.Button({
                value: 'Test Button',
                title: 'Test Button Title'
            });
        },

        tearDown: function () {
            this.button.destroy();
        },

        '`default` button should not toggle when clicked': function () {
            var button    = this.button,
                container = button.get('container');

            container.simulate('click');

            Assert.isFalse(button.isActive());
        },

        '`toggle` set to `true` should toggle the button when clicked': function () {
            var button    = this.button,
                container = button.get('container');

            button.toggle = true;

            Assert.isFalse(button.isActive());

            container.simulate('click');

            Assert.isTrue(button.isActive());
        },
    }));

    suite.add(new Y.Test.Case({
        name: 'Events',

        setUp: function () {
            this.button = new Y.Rednose.Button({
                value: 'Test Button',
                title: 'Test Button Title'
            });
        },

        tearDown: function () {
            this.button.destroy();
        },

        'Button should fire `click` when it\'s clicked': function () {
            var button    = this.button,
                container = button.get('container'),
                calls     = 0;

            button.on('click', function (e) {
                calls++;
            });

            container.simulate('click');

            Assert.areEqual(1, calls);
        },

        'The `click` event payload should contain the button object': function () {
            var button    = this.button,
                container = button.get('container'),
                event;

            button.on('click', function (e) {
                event = e;
            });

            container.simulate('click');

            Assert.areSame(button, event.button);
        },

        'The `click` event payload should contain the origin event': function () {
            var button    = this.button,
                container = button.get('container'),
                event,
                originEvent;

            container.on('click', function (e) {
                originEvent = e;
            });

            button.on('click', function (e) {
                event = e;
            });

            container.simulate('click');

            Assert.areSame(originEvent.target, event.originEvent.target);
        }
    }));

    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['rednose-button', 'test', 'node-event-simulate']
});
