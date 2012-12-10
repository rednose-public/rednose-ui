YUI.add('libbit-panel', function (Y, NAME) {

var Panel;

Panel = Y.Base.create('panel', Y.Widget, [
    Y.WidgetPosition,

    Y.WidgetAutohide,
    Y.WidgetModality,
    Y.WidgetPositionAlign,
    Y.WidgetPositionConstrain,
    Y.WidgetStack
]);

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Panel = Panel;


}, '1.0.0', {
    "requires": [
        "panel",
        "widget",
        "widget-autohide",
        "widget-modality",
        "widget-position",
        "widget-position-align",
        "widget-position-constrain",
        "widget-stack"
    ]
});
