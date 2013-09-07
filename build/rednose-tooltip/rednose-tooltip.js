YUI.add('rednose-tooltip', function (Y, NAME) {

var Tooltip;

Tooltip = Y.Base.create('tooltip', Y.Bootstrap.Tooltip, [], {
    // -- Lifecycle methods ----------------------------------------------------

    initializer: function () {
        this.set('zIndex', 2000);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Tooltip = Tooltip;


}, '1.0.0', {"requires": ["gallery-bootstrap-tooltip"]});
