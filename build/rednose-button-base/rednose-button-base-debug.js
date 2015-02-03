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
 * @event show
 * @param {Rednose.Button}
 * @preventable _defShowFn
 */
var EVT_SHOW = 'show';

/**
 * @event hide
 * @param {Rednose.Button}
 * @preventable _defHideFn
 */
var EVT_HIDE = 'hide';

/**
 * @event rename
 * @param {Rednose.Button}
 * @param {String} value
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
     * The id for this button.
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
     * @property {Boolean} active
     * @readOnly
     */

    /**
     * @property {Boolean} hidden
     * @readOnly
     */

    /**
     * @property {String} value
     * @readOnly
     */

    /**
     * @property {String} title
     * @readOnly
     */

    // -- Lifecycle methods ----------------------------------------------------

    initializer: function (config) {
        this._published = {};

        this.type     = config.type || 'default';
        this.disabled = config.disabled || false;
        this.hidden   = config.hidden || false;
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
     * Shows this button.
     *
     * @chainable
     */
    show: function () {
        this._fireButtonEvent(EVT_SHOW, { button: this }, {
            defaultFn: this._defShowFn
        });

        return this;
    },

    /**
     * Hides this button.
     *
     * @chainable
     */
    hide: function () {
        this._fireButtonEvent(EVT_HIDE, { button: this }, {
            defaultFn: this._defHideFn
        });

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
     * Deactivates this button.
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
    toggleActive: function () {
        return this[this.isActive() ? 'deactivate' : 'activate']();
    },

    /**
     * Renames this button.
     *
     * @param {String} value
     *
     * @chainable
     */
    rename: function (value) {
        return this._fireButtonEvent(EVT_RENAME, {button: this, value: value}, {
            defaultFn: this._defRenameFn
        });
    },

    /**
     * Whether this button is disabled or not.
     *
     * @return {Boolean}
     */
    isDisabled: function () {
        return this.disabled === true;
    },

    /**
     * Whether this button is activated or not.
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
     * @private
     */
    _defDisableFn: function () {
        this.disabled = true;
    },

    /**
     * @private
     */
    _defEnableFn: function () {
        this.disabled = false;
    },

    /**
     * @private
     */
    _defHideFn: function () {
        this.visible = false;
    },

    /**
     * @private
     */
    _defShowFn: function () {
        this.visible = true;
    },

    /**
     * @private
     */
    _defActivateFn: function () {
        this.active = true;
    },

    /**
     * @private
     */
    _defDeactivateFn: function () {
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


}, '@VERSION@', {"requires": ["base"]});
