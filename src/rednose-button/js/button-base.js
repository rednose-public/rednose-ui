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
            if (!this._published[EVT_ENABLE]) {
                this._published[EVT_ENABLE] = this.publish(EVT_ENABLE, {
                    defaultFn: this._defEnableFn
                });
            }

            this.fire(EVT_ENABLE, {
                item: this
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
            if (!this._published[EVT_DISABLE]) {
                this._published[EVT_DISABLE] = this.publish(EVT_DISABLE, {
                    defaultFn: this._defDisableFn
                });
            }

            this.fire(EVT_DISABLE, {
                item: this
            });
        }

        return this;
    },

    /**
     * Renames this button.
     *
     * @param {String} title
     *
     * @chainable
     */
    rename: function (value) {
        if (!this._published[EVT_RENAME]) {
            this._published[EVT_RENAME] = this.publish(EVT_RENAME, {
                defaultFn: this._defRenameFn
            });
        }

        this.fire(EVT_RENAME, {
            item : this,
            value: value
        });

        return this;
    },

    /**
     * Whether this node is disabled or not.
     *
     * @return {Boolean}
     */
    isDisabled: function () {
        return this.disabled === true;
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
    _defRenameFn: function (e) {
        this.value = e.value;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').ButtonBase = ButtonBase;
