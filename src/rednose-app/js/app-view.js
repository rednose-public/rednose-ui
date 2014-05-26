/*jshint boss:true, expr:true, onevar:false */

var AppView = Y.Base.create('appView', Y.View, [], {
    // -- Public Properties ----------------------------------------------------

    /**
     * @property app
     * @type Rednose.App
     */

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        config || (config = {});

        var AppConstructor = config.appConstructor,
            container      = this.get('container');

        delete config.appConstructor;

        this.app = new AppConstructor(Y.merge(config, {
            container  : container,
            transitions: true
        }));
    },

    destructor: function () {
        this.app.destroy();
        this.app = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @see View.render()
     */
    render: function () {
        this.app.render();

        return this;
    },

    /**
     * @see Rednose.App.Base
     */
    sizeView: function (parent) {
        if (this.app && typeof this.app.sizeView === 'function') {
            this.app.sizeView(parent);
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').AppView = AppView;
