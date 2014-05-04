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
        disabled: 'disabled'
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
                enable : this._afterEnable,
                disable: this._afterDisable,
                rename : this._afterRename
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
