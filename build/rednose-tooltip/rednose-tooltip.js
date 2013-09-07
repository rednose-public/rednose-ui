YUI.add('rednose-tooltip', function (Y, NAME) {

var Tooltip;

Tooltip = Y.Base.create('tooltip', Y.Bootstrap.Tooltip, [], {
    // -- Lifecycle methods ----------------------------------------------------

    initializer: function () {
        // Correct the z-index because the parent class set's it to 0.
        // Value is taken from Bootstrap's '@zindexTooltip' variable.
        this.set('zIndex', 1030);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Tooltip = Tooltip;


}, '1.0.0', {"requires": ["gallery-bootstrap-tooltip"]});
