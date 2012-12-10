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
