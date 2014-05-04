YUI.add('rednose-button', function (Y, NAME) {

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
Y.namespace('Rednose').ButtonBase = ButtonBase;
/*jshint boss:true, expr:true, onevar:false */

var Micro = Y.Template.Micro;

/**
 * Fired when a button is clicked.
 *
 * @event click
 * @param {Rednose.Button} button The button that was clicked.
 * @param {EventFacade} originEvent Original click event.
 */
var EVT_CLICK = 'click';

var Button = Y.Base.create('button', Y.Rednose.ButtonBase, [Y.View], {
    containerTemplate: '<button />',

    templates: {
        content: Micro.compile(
            '<% if (data.button.icon) { %>' +
                '<i class="<%= data.classNames.icon %> <%= data.button.icon %>"></i> ' +
            '<% } %>' +
            '<%= data.button.value %>'
        )
    },

    classNames: {
        btn     : 'btn',
        icon    : 'icon',
        disabled: 'disabled',
        active  : 'active'
    },

    // -- Life Cycle Methods ---------------------------------------------------

    initializer: function () {
        this._attachButtonEvents();
    },

    destructor: function () {
        this._detachButtonEvents();
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @chainable
     */
    render: function () {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.addClass(this.classNames.btn);

        if (this.title) {
            container.setAttribute('title', this.title);
        }

        if (this.disabled) {
            container.addClass(classNames.disabled);
        }

        if (this.active) {
            container.addClass(classNames.active);
        }

        if (this.type !== 'default') {
            container.addClass(classNames.btn + '-' + this.type);
        }

        container.setContent(this.templates.content({
            classNames: this.classNames,
            button    : this
        }));

        return this;
    },

    // -- Protected Methods ----------------------------------------------------

    _attachButtonEvents: function () {
        this._buttonEvents || (this._buttonEvents = []);

        var container  = this.get('container');

        this._buttonEvents.push(
            this.after({
                enable    : this._afterEnable,
                disable   : this._afterDisable,
                rename    : this._afterRename,
                activate  : this._afterActivate,
                deactivate: this._afterDeactivate
            }),

            container.on('click', this._onButtonClick, this)
        );
    },

    _detachButtonEvents: function () {
        (new Y.EventHandle(this._buttonEvents)).detach();
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _onButtonClick: function (e) {
        this.fire(EVT_CLICK, {
            originEvent: e.originEvent,
            button     : this
        });
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterEnable: function (e) {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.removeClass(classNames.disabled);
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterDisable: function (e) {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.addClass(classNames.disabled);
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterActivate: function (e) {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.addClass(classNames.active);
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterDeactivate: function (e) {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.removeClass(classNames.active);
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterRename: function (e) {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.setContent(this.templates.content({
            classNames: classNames,
            button    : this
        }));
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Button = Button;


}, '1.4.0', {"requires": ["base", "template", "view"]});
