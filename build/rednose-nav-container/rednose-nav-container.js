YUI.add('rednose-nav-container', function (Y, NAME) {

var NavContainer;

NavContainer = Y.Base.create('nav', Y.Widget, [Y.WidgetStdMod, Y.WidgetButtons]);

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').NavContainer = NavContainer;


}, '1.0.0', {"requires": ["widget", "widget-buttons", "widget-stdmod"]});
