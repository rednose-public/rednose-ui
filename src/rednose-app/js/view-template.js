/*jshint boss:true, expr:true, onevar:false */

/**
 * @constructor
 */
Y.namespace('Rednose').View.Splitview = Y.Base.create('view', Y.View, [
    Y.Rednose.View.Template.SplitView
]);

/**
 * @constructor
 */
Y.namespace('Rednose').View.SingleView = Y.Base.create('view', Y.View, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.SingleView,
    Y.Rednose.View.Template.Toolbar,
    Y.Rednose.View.Template.SplitView
]);

/**
 * @constructor
 */
Y.namespace('Rednose').View.TwoColumn = Y.Base.create('view', Y.View, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.TwoColumn,
    Y.Rednose.View.Template.Toolbar,
    Y.Rednose.View.Template.SplitView
]);

/**
 * @constructor
 */
Y.namespace('Rednose').View.ThreeColumn = Y.Base.create('view', Y.View, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.ThreeColumn,
    Y.Rednose.View.Template.Toolbar,
    Y.Rednose.View.Template.SplitView
]);

/**
 * @constructor
 */
Y.namespace('Rednose').View.MasterDetail = Y.Base.create('view', Y.View, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.MasterDetail,
    Y.Rednose.View.Template.Toolbar,
    Y.Rednose.View.Template.SplitView
]);
