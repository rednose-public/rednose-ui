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

var Button = Y.Base.create('button', Y.Rednose.Button.Base, [Y.View], {
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
            originEvent: e,
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

Y.Rednose.Button = Y.mix(Button, Y.Rednose.Button);
