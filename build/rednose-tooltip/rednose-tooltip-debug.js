YUI.add('rednose-tooltip', function (Y, NAME) {

var Tooltip,

	ATTR_STYLE_BOOTSTRAP_ZINDEX_TOOLTIP = '1030';

Tooltip = Y.Base.create('tooltip', Y.Bootstrap.Tooltip, [], {
    // -- Lifecycle methods ----------------------------------------------------

    initializer: function () {
        // Correct the z-index because the superclass set's it to 0.
        // Value is taken from Bootstrap's '@zindexTooltip' variable.
        this.set('zIndex', ATTR_STYLE_BOOTSTRAP_ZINDEX_TOOLTIP);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Tooltip = Tooltip;


}, '1.0.0', {"requires": ["gallery-bootstrap-tooltip"]});
