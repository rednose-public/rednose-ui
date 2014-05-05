YUI.add('rednose-button-group-base', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * @event reset
 * @param {Array} buttons
 * @preventable _defResetFn
 */
var EVT_RESET = 'reset';

var ButtonGroupBase = Y.Base.create('buttonGroupBase', Y.Base, [], {

    /**
     * Mapping of button ids to button instances.
     *
     * @property {Object} _buttonMap
     * @protected
     */

    // -- Lifecycle methods ----------------------------------------------------

    initializer: function (config) {
        this._published = {};

        if (config.buttons) {
            this.reset(config.buttons);
        }
    },

    destructor: function () {
        if (this._buttonMap && this._buttonMap.length > 0) {
            for (var i = 0; i < this._buttonMap.length; i++) {
                this._destroyButton(this._buttonMap[i]);
            }
        }

        this._buttonMap = null;
        this._published = null;
    },

    // -- Public methods -------------------------------------------------------

    /**
     * Resets the items in this dropdown.
     *
     * @param {Array} buttons
     * @chainable
     */
    reset: function (buttons) {
        if (!this._published[EVT_RESET]) {
            this._published[EVT_RESET] = this.publish(EVT_RESET, {
                defaultFn: this._defResetFn
            });
        }

        this.fire(EVT_RESET, {
            buttons: buttons
        });

        return this;
    },

    /**
     * @param {String} id
     * @return {Rednose.Button}
     * @private
     */
    getButtonById: function (id) {
        return this._buttonMap[id];
    },

    // -- Protected methods ----------------------------------------------------

    /**
     * @param {Object} config
     * @return {Rednose.Button}
     * @private
     */
    _createButton: function (config) {
        var button = new Y.Rednose.Button(config);

        this._buttonMap[button.id] = button;

        button.addTarget(this);

        return button;
    },

    /**
     * @param {Rednose.Button} button
     * @private
     */
    _destroyButton: function (button) {
        button.destroy();

        button.removeTarget(this);

        delete this._buttonMap[button.id];
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _defResetFn: function (e) {
        var buttons = e.buttons, i;

        if (this._buttonMap && this._buttonMap.length > 0) {
            for (i = 0; i < this._buttonMap.length; i++) {
                this._destroyButton(this._buttonMap[i]);
            }
        }

        this._buttonMap = {};

        if (buttons) {
            for (i = 0; i < buttons.length; i++) {
                this._createButton(buttons[i]);
            }
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.ButtonGroup').Base = ButtonGroupBase;


}, '1.4.0', {"requires": ["rednose-button"]});
