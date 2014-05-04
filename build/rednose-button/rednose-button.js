YUI.add('rednose-button', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var ButtonBase = Y.Base.create('buttonBase', Y.Base, [], {
    // -- Lifecycle methods ----------------------------------------------------

    initializer: function (config) {
        this._published = {};
    },

    destructor: function () {
        this._published = null;
    }
}, {
    ATTRS: {
        /**
         * @attribute {String} id
         * @default null
         * @initOnly
         */
        id: {
            value: null,
            writeOnce: 'initOnly'
        },

        /**
         * Button type: `button` or `link`.
         *
         * @attribute {String} type
         * @default 'button'
         * @initOnly
         */
        type: {
            value: 'button',
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {String} icon
         * @default null
         * @initOnly
         */
        icon: {
            value: null,
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {Boolean} disabled
         * @default false
         * @initOnly
         */
        disabled: {
            value: false,
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {String} value
         * @default null
         * @initOnly
         */
        value: {
            value: null,
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {String} disabled
         * @default null
         * @initOnly
         */
        title: {
            value: null,
            writeOnce: 'initOnly'
        }
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
            '<% if (data.icon) { %>' +
                '<i class="<%= data.classNames.icon %> <%= data.icon %>"></i> ' +
            '<% } %>' +
            '<%= data.value %>'
        )
    },

    classNames: {
        btn     : 'btn',
        btnLink : 'btn-link',
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

        if (this.get('title')) {
            container.setAttribute('title', this.get('title'));
        }

        if (this.get('type') === 'link') {
            container.addClass(classNames.btnLink);
        }

        container.setContent(this.templates.content({
            classNames: this.classNames,
            icon      : this.get('icon'),
            value     : this.get('value')
        }));

        return this;
    },

    // -- Protected Methods ----------------------------------------------------

    _attachButtonEvents: function () {
        this._buttonEvents || (this._buttonEvents = []);

        var container  = this.get('container');

        this._buttonEvents.push(
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
    }

    // -- Default Event Handlers -----------------------------------------------
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Button = Button;


}, '1.4.0', {"requires": ["base", "template", "view"]});
