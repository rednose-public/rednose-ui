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
