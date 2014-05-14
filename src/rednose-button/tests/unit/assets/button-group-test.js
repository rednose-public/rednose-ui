YUI.add('rednose-button-group-test', function (Y) {

    var Assert = Y.Assert,
        suite;

    suite = new Y.Test.Suite('ButtonGroup');

    suite.add(new Y.Test.Case({
        name: 'Basic',

        setUp: function () {
            this.btnGroup = new Y.Rednose.ButtonGroup({
                buttons: [
                    {
                        id   : 'button1',
                        value: 'Button 1'
                    },
                    {
                        id   : 'button2',
                        value: 'Button 2'
                    },
                    {
                        id   : 'button3',
                        value: 'Button 3'
                    }
                ]
            });
        },

        tearDown: function () {
            this.btnGroup.destroy();
        },

        'Default button group should not render vertically': function () {
            var btnGroup  = this.btnGroup.render(),
                container = btnGroup.get('container');

            Assert.isFalse(container.hasClass('btn-group-vertical'));
        },

        '`vertical` attribute set to `true` should render the group vertically': function () {
            this.btnGroup = new Y.Rednose.ButtonGroup({
                vertical: true,
                buttons: [{
                    id   : 'button1',
                    value: 'Button 1'
                }]
            });

            var container = this.btnGroup.render().get('container');

            Assert.isTrue(container.hasClass('btn-group-vertical'));
        }
    }));

    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['rednose-button-group', 'test', 'node-event-simulate']
});
