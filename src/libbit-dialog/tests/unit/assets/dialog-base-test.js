YUI.add('dialog-base-test', function (Y) {

var Assert = Y.Assert,
    suite;

// -- Suite --------------------------------------------------------------------
suite = new Y.Test.Suite('dialog');


// -- Widget ----------------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Basic',

    setUp : function () {
    },

    tearDown: function () {
    },

    '`config()` should render the confirmation dialog correctly': function () {
        var dialog = new Y.Libbit.Dialog();

        var title      = 'Test Title';
        var message    = 'Test message body.';
        var confirmVal = 'Confirm!';

        dialog.confirm(title, message, undefined, undefined, confirmVal);

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
    },

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

Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['libbit-dialog', 'test']
});
