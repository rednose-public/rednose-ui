/* jshint newcap:false */

YUI.add('rednose-toolbar-test', function (Y) {

    var Assert = Y.Assert,

        Toolbar = Y.Rednose.Toolbar,

        mainSuite = Y.Rednose.ToolbarTestSuite = new Y.Test.Suite('Toolbar');

// -- Y.Rednose.Toolbar  -------------------------------------------------------
var toolbarSuite = new Y.Test.Suite('Toolbar');
mainSuite.add(toolbarSuite);

// -- Lifecycle ----------------------------------------------------------------
toolbarSuite.add(new Y.Test.Case({
    name: 'Lifecycle',

    'constructor should work without a config object': function () {
        var toolbar = new Toolbar();

        Assert.isInstanceOf(Toolbar, toolbar, 'toolbar should be an instance of Toolbar');
        Assert.isFalse(toolbar.rendered, 'toolbar should not be rendered');
    }
}));

}, '@VERSION@', {
    requires: ['rednose-toolbar', 'test']
});
