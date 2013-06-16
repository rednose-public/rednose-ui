YUI.add('dialog-base-test', function (Y) {

var Assert = Y.Assert,
    suite;

suite = new Y.Test.Suite('Dialog');

suite.add(new Y.Test.Case({
    name: 'Lifecycle',

    '`destroy()` should destroy the view': function () {
        var dialog = new Y.Libbit.Dialog();

        dialog.error('Test title', 'Test message body.', true);

        Assert.isFalse(dialog.get('destroyed'));
        Assert.isObject(Y.one('.libbit-dialog'));

        dialog.destroy();

        Assert.isTrue(dialog.get('destroyed'));
        Assert.isNull(Y.one('.libbit-dialog'));
    },

    '`destroy()` shouldn\'t throw an error when called before the dialog is shown': function () {
        var dialog = new Y.Libbit.Dialog();

        Assert.isFalse(dialog.get('destroyed'));

        dialog.destroy();

        Assert.isTrue(dialog.get('destroyed'));
    }
}));

suite.add(new Y.Test.Case({
    name: 'Basic',

    '`confirm()` should render the confirmation dialog correctly': function () {
        var dialog = new Y.Libbit.Dialog();

        var title      = 'Test Title';
        var message    = 'Test message body.';
        var confirmVal = 'Confirm!';

        dialog.confirm(title, message, undefined, false, confirmVal);

        var titleNode   = Y.one('.libbit-dialog').one('.yui3-widget-hd');
        var messageNode = Y.one('.libbit-dialog').one('.yui3-widget-bd').one('p');
        var primaryNode = Y.one('.libbit-dialog').one('.yui3-widget-ft').one('.btn-primary');

        Assert.areEqual(titleNode.get('text'), title);
        Assert.areEqual(messageNode.get('text'), message);
        Assert.areEqual(primaryNode.get('text'), confirmVal);

        dialog.destroy();
    },

    '`error()` should render the error dialog correctly': function () {
        var dialog = new Y.Libbit.Dialog();

        var title      = 'Test Title';
        var message    = 'Test message body.';

        dialog.error(title, message, false);

        var titleNode   = Y.one('.libbit-dialog').one('.yui3-widget-hd');
        var messageNode = Y.one('.libbit-dialog').one('.yui3-widget-bd').one('p');

        Assert.areEqual(titleNode.get('text'), title);
        Assert.areEqual(messageNode.get('text'), message);

        dialog.destroy();
    }
}));

suite.add(new Y.Test.Case({
    name: 'Callbacks',

    '`confirm()` should close on cancel': function () {
        var dialog = new Y.Libbit.Dialog();

        var title   = 'Test Title';
        var message = 'Test message body.';

        dialog.confirm(title, message);

        Y.one('.yui3-widget-buttons').one('.btn').simulate('click');

        Assert.isNull(Y.one('.libbit-dialog'));
    },

    '`confirm()` should execute confirm callback method': function () {
        var dialog = new Y.Libbit.Dialog(),
            mock   = Y.Mock;

        var title   = 'Test Title';
        var message = 'Test message body.';

        Y.Mock.expect(mock, { method: "callback", args: [] });

        dialog.confirm(title, message, mock.callback);

        Y.one('.yui3-widget-buttons').one('.btn-primary').simulate('click');

        Y.Mock.verify(mock);
        Assert.isNull(Y.one('.libbit-dialog'));
    }
}));

suite.add(new Y.Test.Case({
    name: 'Element focus',

    'Default button should be focussed': function () {
        var dialog;

        dialog = Y.Libbit.Dialog.error('Test Title', 'Test message body.');
        Y.Assert.areSame(Y.one('.yui3-widget-buttons').one('.btn').getDOMNode(), document.activeElement);
        dialog.destroy();

        dialog = Y.Libbit.Dialog.confirm('Test Title', 'Test message body.');
        Y.Assert.areSame(Y.one('.yui3-widget-buttons').one('.btn-primary').getDOMNode(), document.activeElement);
        dialog.destroy();
    }
}));

suite.add(new Y.Test.Case({
    name: 'Keyboard events',

    '`escape` key should close the dialog': function () {
        var dialog;

        dialog = Y.Libbit.Dialog.error('Test Title', 'Test message body.');

        Y.one('.yui3-panel-content').simulate('keydown', {keyCode: 27});
        Assert.isNull(Y.one('.libbit-dialog'));
    }
}));

Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['libbit-dialog', 'test']
});
