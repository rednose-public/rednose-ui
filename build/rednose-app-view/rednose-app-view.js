YUI.add('rednose-app-view', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var AppView = Y.Base.create('appView', Y.View, [], {
    // -- Protected Properties -------------------------------------------------

    /**
     * @property _app
     * @type Rednose.App
     */
    _app: null,

    /**
     * @property _config
     * @type Object
     */
    _config: null,

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        config || (config = {});

        this._config = config;
    },

    destructor: function () {
        this._app.destroy();
        this._app = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @see View.render()
     */
    render: function () {
        var Constructor = this.get('constructor'),
            container   = this.get('container');

            console.log(Constructor);
        this._app = new Constructor(Y.merge(this._config, {
            container  : container,
            transitions: true
        }, true)).render();

        this._app.addTarget(this);

        return this;
    },

    /**
     * @see Rednose.App.Base
     */
    sizeView: function (parent) {
        if (this._app && typeof this._app.sizeView === 'function') {
            this._app.sizeView(parent);
        }
    }
}, {
    ATTRS: {
        /**
         * @attribute constructor
         * @type Rednose.App
         */
        constructor: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').AppView = AppView;


}, '1.5.0-DEV', {"requires": ["view"]});
