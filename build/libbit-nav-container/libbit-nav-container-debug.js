YUI.add('libbit-nav-container', function (Y, NAME) {

var NavContainer;

NavContainer = Y.Base.create('nav', Y.Widget, [Y.WidgetStdMod, Y.WidgetButtons]);

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').NavContainer = NavContainer;


}, '1.0.0', {"requires": ["widget", "widget-buttons", "widget-stdmod"]});
