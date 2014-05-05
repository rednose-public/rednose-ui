YUI.add('rednose-button-base', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * @event enable
 * @param {Rednose.Button}
 * @preventable _defEnableFn
 */
var EVT_ENABLE = 'enable';

/**
 * @event disable
 * @param {Rednose.Button}
 * @preventable _defDisableFn
 */
var EVT_DISABLE = 'disable';

/**
 * @event rename
 * @param {Rednose.Button}
 * @param {String value}
 * @preventable _defRenameFn
 */
var EVT_RENAME = 'rename';

/**
 * @event activate
 * @param {Rednose.Button}
 * @preventable _defActivateFn
 */
var EVT_ACTIVATE = 'activate';

/**
 * @event deactivate
 * @param {Rednose.Button}
 * @preventable _defDeactivateFn
 */
var EVT_DEACTIVATE = 'deactivate';

var ButtonBase = Y.Base.create('buttonBase', Y.Base, [], {
    /**
     * The id for this node.
     *
     * @property {string} id
     * @readOnly
     */

    /**
     * Button type: `default`, `primary`, `info`, `success`, `warning`, `danger`, `inverse` or `link`.
     *
     * @property {String} type
     * @default 'default'
     * @readOnly
     */

    /**
     * @property {String} icon
     * @readOnly
     */

    /**
     * @property {Boolean} disabled
     * @readOnly
     */

    /**
     * @property {String} value
     * @readOnly
     */

    /**
     * @property {String} disabled
     * @readOnly
     */

    // -- Lifecycle methods ----------------------------------------------------

    initializer: function (config) {
        this._published = {};

        this.type     = config.type || 'default';
        this.disabled = config.disabled || false;
        this.active   = config.active || false;

        Y.mix(this, config);
    },

    destructor: function () {
        this._published = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Enables this button.
     *
     * @chainable
     */
    enable: function () {
        if (this.isDisabled()) {
            this._fireButtonEvent(EVT_ENABLE, {button: this}, {
                defaultFn: this._defEnableFn
            });
        }

        return this;
    },

    /**
     * Disables this button.
     *
     * @chainable
     */
    disable: function () {
        if (!this.isDisabled()) {
            this._fireButtonEvent(EVT_DISABLE, {button: this}, {
                defaultFn: this._defDisableFn
            });
        }

        return this;
    },


    /**
     * Activates this button.
     *
     * @chainable
     */
    activate: function () {
        if (!this.isActive()) {
            this._fireButtonEvent(EVT_ACTIVATE, {button: this}, {
                defaultFn: this._defActivateFn
            });
        }

        return this;
    },

    /**
     * Deativates this button.
     *
     * @chainable
     */
    deactivate: function () {
        if (this.isActive()) {
            this._fireButtonEvent(EVT_DEACTIVATE, {button: this}, {
                defaultFn: this._defDeactivateFn
            });
        }

        return this;
    },


    /**
     * Toggles the active state.
     *
     * @chainable
     */
    toggle: function () {
        return this[this.isActive() ? 'deactivate' : 'activate']();
    },

    /**
     * Renames this button.
     *
     * @param {String} title
     *
     * @chainable
     */
    rename: function (value) {
        return this._fireButtonEvent(EVT_RENAME, {button: this, value: value}, {
            defaultFn: this._defRenameFn
        });
    },

    /**
     * Whether this node is disabled or not.
     *
     * @return {Boolean}
     */
    isDisabled: function () {
        return this.disabled === true;
    },

    /**
     * Whether this node is activated or not.
     *
     * @return {Boolean}
     */
    isActive: function () {
        return this.active === true;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * Utility method for lazily publishing events,
     *
     * @param {String} name
     * @param {Object} facade
     * @param {Object} options
     * @chainable
     * @private
     */
    _fireButtonEvent: function (name, facade, options) {
        if (options && options.defaultFn && !this._published[name]) {
            this._published[name] = this.publish(name, {
                defaultFn: options.defaultFn
            });
        }

        this.fire(name, facade);

        return this;
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _defDisableFn: function (e) {
        this.disabled = true;
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defEnableFn: function (e) {
        this.disabled = false;
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defActivateFn: function (e) {
        this.active = true;
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defDeactivateFn: function (e) {
        this.active = false;
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defRenameFn: function (e) {
        this.value = e.value;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Button').Base = ButtonBase;


}, '1.4.0', {"requires": ["base"]});
