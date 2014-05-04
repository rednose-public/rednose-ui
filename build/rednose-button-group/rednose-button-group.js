YUI.add('rednose-button-group', function (Y, NAME) {

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
/*jshint boss:true, expr:true, onevar:false */

/**
 * Fired when a button in this group is clicked.
 *
 * @event click
 * @param {Rednose.Button} button The button that was clicked.
 * @preventable _defClickFn
 */
var EVT_CLICK = 'click';

/**
 * Fired when the group value changes.
 *
 * @event change
 * @param {String|Array} string or array of active button ids.
 */
var EVT_CHANGE = 'change';

var ButtonGroup = Y.Base.create('buttonGroup', Y.Rednose.ButtonGroup.Base, [Y.View], {

    /**
     * Button group type: `default`, `radio`, `checkbox`.
     *
     * @property {String} type
     * @default 'default'
     * @readOnly
     */

    /**
     * @property {Rednose.Button} _prevButton
     * @protected
     */

    /**
     * @property {String|Array} _prevVal
     * @protected
     */

    classNames: {
        group   : 'btn-group',
        vertical: 'btn-group-vertical'
    },

    // -- Life Cycle Methods ---------------------------------------------------

    initializer: function (config) {
        this.type   = config.type || 'default';
        this._value = null;

        this._attachButtonGroupEvents();
    },

    destructor: function () {
        this._detachButtonGroupEvents();
    },

    // -- Protected Methods ----------------------------------------------------

    _attachButtonGroupEvents: function () {
        this._buttonGroupEvents || (this._buttonGroupEvents = []);

        if (this.type !== 'default') {
            this._buttonGroupEvents.push(
                this.after('button:click', this._afterButtonClick, this)
            );
        }
    },

    _detachButtonGroupEvents: function () {
        (new Y.EventHandle(this._buttonGroupEvents)).detach();
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @chainable
     */
    render: function () {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.addClass(classNames.group);

        if (this.get('vertical')) {
            container.addClass(classNames.vertical);
        }

        Y.Object.each(this._buttonMap, function (button) {
            container.append(button.render().get('container'));
        });

        return this;
    },

    /**
     * Returns a collection of active item ids.
     *
     * @returns {String|Array}
     */
    getValue: function () {
        var values = [];

        Y.Object.each(this._buttonMap, function (button) {
            if (button.isActive()) {
                values.push(button.id);
            }
        });

        if (this.type === 'radio') {
            return values[0] || null;
        }

        return values;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterButtonClick: function (e) {
        var button = e.button;

        switch (this.type) {
            case 'radio':
                this._prevButton && this._prevButton.deactivate();

                button.activate();

                break;
            case 'checkbox':
                button.toggle();

                break;
        }

        if (!this._published[EVT_CLICK]) {
            this._published[EVT_CLICK] = this.publish(EVT_CLICK, {
                defaultFn: this._defClickFn
            });
        }

        this.fire(EVT_CLICK, {
            button: button
        });

        this._prevButton = button;
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _defClickFn: function (e) {
        var value = this.getValue();

        if (value !== this._prevVal) {
            this.fire(EVT_CHANGE, {
                value: this.getValue()
            });

        }

        this._prevVal = value;
    }
}, {
    ATTRS: {
        /**
         * If `true`, the button group will be rendered vertically.
         *
         * @attribute {Boolean} vertical
         * @default false
         * @initOnly
         */
        vertical: {
            value: false,
            writeOnce: 'initOnly'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').ButtonGroup = ButtonGroup;


}, '1.4.0', {"requires": ["rednose-button"]});
