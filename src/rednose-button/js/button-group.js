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
     * Button group type: `default`, `radio` or `checkbox`.
     *
     * @property {String} type
     * @default 'default'
     * @readOnly
     */

    /**
     * Button group position: `left` or `right`.
     *
     * @property {String} position
     * @default 'right'
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
        vertical: 'btn-group-vertical',
        left    : 'pull-left',
        right   : 'pull-right'
    },

    // -- Life Cycle Methods ---------------------------------------------------

    initializer: function (config) {
        this.type     = config.type || 'default';
        this.position = config.position || 'left';
        this._value   = null;

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
                this.after('button:click', this._afterButtonClick, this),
                this.after('button:activate', this._afterButtonActivate, this)
            );
        }

        this._buttonGroupEvents.push(
            this.after(['button:show', 'button:hide'], this._afterButtonVisibilityChange, this)
        );
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

        container.addClass(this.position === 'right' ? classNames.right : classNames.left);

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
                button.toggleActive();

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

    _afterButtonActivate: function (e) {
        this._prevButton = e.button;
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @private
     */
    _defClickFn: function () {
        var value = this.getValue();

        if (value !== this._prevVal) {
            this.fire(EVT_CHANGE, {
                value: this.getValue()
            });
        }

        this._prevVal = value;
    },

    /**
     * @private
     */
    _afterButtonVisibilityChange: function () {
        var first = false,
            last  = null;

        Y.Object.each(this._buttonMap, function (button) {
            var buttonContainer = button.get('container');

            if (button.hidden === false && first === false) {
                buttonContainer.addClass('first');

                first = true;
            } else {
                buttonContainer.removeClass('first');
            }

            if (button.visible === true) {
                last = buttonContainer;
            }

            buttonContainer.removeClass('last');
        });

        if (last) {
            last.addClass('last');
        }
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

Y.Rednose.ButtonGroup = Y.mix(ButtonGroup, Y.Rednose.ButtonGroup);
