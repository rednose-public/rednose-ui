var Tooltip;

Tooltip = Y.Base.create('tooltip', Y.Bootstrap.Tooltip, [], {
    // -- Lifecycle methods ----------------------------------------------------

    initializer: function () {
        this.set('zIndex', 2000);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Tooltip = Tooltip;
