YUI.add('rednose-button-test', function (Y) {
    var Assert = Y.Assert,
        suite;

    suite = new Y.Test.Suite('Button');

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
