/* jshint newcap:false */

YUI.add('rednose-toolbar-base-test', function (Y) {

    var Assert = Y.Assert,

        ToolbarBase = Y.Rednose.Toolbar.Base,

        mainSuite = Y.Rednose.ToolbarBaseTestSuite = new Y.Test.Suite('Toolbar.Base');

// -- Y.Rednose.Toolbar.Base ---------------------------------------------------
var toolbarBaseSuite = new Y.Test.Suite('Toolbar.Base');
mainSuite.add(toolbarBaseSuite);

// -- Lifecycle ----------------------------------------------------------------
toolbarBaseSuite.add(new Y.Test.Case({
    name: 'Lifecycle',

    'constructor should work without a config object': function () {
        var toolbarBase = new ToolbarBase();

        Assert.isInstanceOf(ToolbarBase, toolbarBase, 'toolbarBase should be an instance of ToolbarBase');
        Assert.areSame(0, toolbarBase._buttonGroupMap.length, 'toolbarBase should contain zero button groups');
    },

    'destructor should free references to allow garbage collection': function () {
        var toolbarBase = new ToolbarBase();
        toolbarBase.destroy();

        Assert.isNull(toolbarBase._buttonGroupMap, '_buttonGroupMap should be null');
        Assert.isNull(toolbarBase._published, '_published should be null');
    }
}));

}, '@VERSION@', {
    requires: ['rednose-toolbar-base', 'test']
});
