YUI.add('rednose-app-template', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * @constructor
 */
Y.namespace('Rednose').App.SingleView = Y.Base.create('app', Y.Rednose.App, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.SingleView,
    Y.Rednose.View.Template.Toolbar,
    Y.Rednose.App.ViewTemplate
]);

/**
 * @constructor
 */
Y.namespace('Rednose').App.TwoColumn = Y.Base.create('app', Y.Rednose.App, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.TwoColumn,
    Y.Rednose.View.Template.Toolbar,
    Y.Rednose.App.ViewTemplate
]);

/**
 * @constructor
 */
Y.namespace('Rednose').App.ThreeColumn = Y.Base.create('app', Y.Rednose.App, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.ThreeColumn,
    Y.Rednose.View.Template.Toolbar,
    Y.Rednose.App.ViewTemplate
]);

/**
 * @constructor
 */
Y.namespace('Rednose').App.MasterDetail = Y.Base.create('app', Y.Rednose.App, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.MasterDetail,
    Y.Rednose.View.Template.Toolbar,
    Y.Rednose.App.ViewTemplate
]);


}, '1.5.0-DEV', {"requires": ["rednose-app-base", "rednose-app-view-template", "rednose-view-templates"]});
