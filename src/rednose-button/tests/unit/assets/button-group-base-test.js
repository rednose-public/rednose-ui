YUI.add('rednose-button-group-base-test', function (Y) {

    var Assert = Y.Assert,
        suite;

    suite = new Y.Test.Suite('ButtonGroup.Base');

    suite.add(new Y.Test.Case({
        name: 'Basic',

        setUp: function () {
            this.btnGroup = new Y.Rednose.ButtonGroup.Base({
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

        '`getButtonById` should return a button instance with the correct values': function () {
            var btnGroup = this.btnGroup,
                btn;

            btn = btnGroup.getButtonById('button1');

            Assert.isInstanceOf(Y.Rednose.Button, btn);

            Assert.areEqual('button1', btn.id);
            Assert.areEqual('Button 1', btn.value);
        }
    }));

    Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['rednose-button-group-base', 'test']
});
