/*jshint boss:true, expr:true, onevar:false */

var Nav,

    CSS_MAGIC_PREFIX = 'rednose',
    CSS_VIEW_NAV     = 'rednose-view-nav',

    CSS_BOOTSTRAP_BTN         = 'btn',
    CSS_BOOTSTRAP_BTN_PRIMARY = 'btn-primary',
    CSS_BOOTSTRAP_DISABLED    = 'disabled',
    CSS_BOOTSTRAP_FLOAT_LEFT  = 'float-left',
    CSS_BOOTSTRAP_FLOAT_RIGHT = 'float-right',
    CSS_BOOTSTRAP_CLOSE       = 'close',

    CSS_YUI3_WIDGET_BD = 'yui3-widget-bd',
    CSS_YUI3_WIDGET_FT = 'yui3-widget-ft';

    EVT_BUTTON_CLOSE = 'buttonClose',

/**
 * View extension to wrap the container into a panel with a header and footer navigation bar.
 */
Nav = Y.Base.create('nav', Y.View, [], {
    // -- Public Properties ----------------------------------------------------

    /**
     * Title property, sets the panel's header content.
     */
    title : null,

    /**
     * Buttons property, sets the panel's footer buttons.
     */
    buttons : null,

    /**
     * Optional close button in the header.
     */
    close : false,

    // -- Protected Properties -------------------------------------------------

    /**
     * Contains the footer DOM node.
     */
    _footer: null,

    /**
     * Stores references to the created nodes
     */
    _buttonMap: {},

    // -- Lifecycle ------------------------------------------------------------

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        this._viewNavEventHandles || (this._viewNavEventHandles = []);

        this._viewNavEventHandles.push(
            Y.Do.after(this._afterRender, this, 'render', this)
        );

        this._buildFooter();
    },

    destructor: function () {
        (new Y.EventHandle(this._viewNavEventHandles)).detach();

        this.title      = null;
        this.buttons    = null;
        this._footer    = null;
        this._buttonMap = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Get a button node by name.
     */
    getButton: function (name) {
        return this._buttonMap[name];
    },

    // -- Protected Methods ----------------------------------------------------

    _repositionPanel: function (panel) {
        panel.move(1, 1);
        panel.centered();
    },

    /**
     * Build the footer buttons and bind them to fire events
    */
    _buildFooter: function () {
        var self    = this,
            buttons = this.buttons;
            footer  = Y.Node.create('<div></div>');

        Y.Object.each(buttons, function (button, key) {
            var value     = button.value,
                primary   = button.primary,
                position  = button.position ? button.position : 'left',
                disabled  = button.disabled,
                className = button.className,
                icon      = button.icon,
                // Format the action event by prepending 'button', for example the event
                // fired for 'cancel' will be 'buttonCancel'
                action    = 'button' + self._capitalizeFirstLetter(key),
                node      = Y.Node.create('<button class="' + CSS_BOOTSTRAP_BTN + '"></button>');

            if (value) {
                node.set('text', value);
            }

            if (icon) {
                node.append(Y.Node.create('<i class="' + icon + '"></i>'));
            }

            if (primary) {
                node.addClass(CSS_BOOTSTRAP_BTN_PRIMARY);
            }

            if (disabled) {
                node.addClass(CSS_BOOTSTRAP_DISABLED);
            }

            if (className) {
                node.addClass(className);
            }

            if (position === 'left') {
                node.addClass(CSS_BOOTSTRAP_FLOAT_LEFT);
            }

            if (position === 'right') {
                node.addClass(CSS_BOOTSTRAP_FLOAT_RIGHT);
            }

            node.on('click', function (e) {
                var btn = e.target;

                if (btn.hasClass(CSS_BOOTSTRAP_DISABLED) === false) {
                    self.fire(action);
                }
            });

            footer.append(node);

            self._buttonMap[key] = node;
        });

        this._footer = footer;
    },

    /**
     * Capitalize the first letter of a given string
     */
    _capitalizeFirstLetter: function (value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    },

    /**
     * Magic method to update the buttons properties
     */
    _setButtons: function (value) {
        var self    = this,
            footer  = this.get('container').one('.' + CSS_YUI3_WIDGET_FT),
            buttons = this.buttons;

        Y.Object.each(value, function (properties, key) {
            self.buttons[key] = Y.merge(buttons[key], properties);
        });

        // TODO: Update instead of rerendering.
        this._buildFooter();
        footer.one('div').replace(this._footer);
    },

    /**
     * Magic method to get the current button properties
     */
     _getButtons: function () {
        return this.buttons;
    },

    /**
    Formatting helper method.

    @method _camelCaseToDash
    @param {String} string The string to convert.
    @protected
    **/
    _camelCaseToDash: function (string) {
        return string.replace(/([A-Z])/g, function ($1) {
            return '-' + $1.toLowerCase();
        });
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Wrap the view into a panel after it's rendered.
     */
    _afterRender: function () {
        var container = this.get('container'),
            title     = this.title,
            body      = Y.Node.create('<div></div>'),
            footer    = this._footer,
            config    = { bodyContent: body },
            close     = this.close,
            self      = this,
            panel;

        container.addClass(CSS_VIEW_NAV);

        // Transfer the child nodes from the view container to the new body container.
        container.get('children').each(function (c) {
            body.append(c);
        });

        if (title !== null) {
            var header = Y.Node.create('<div>' + title + '</div>');

            if (close) {
                header.append(Y.Node.create('<button class="' + CSS_BOOTSTRAP_CLOSE + '">×</button>'));

                header.one('.' + CSS_BOOTSTRAP_CLOSE).on('click', function () {
                    self.fire(EVT_BUTTON_CLOSE);
                });
            }

            config.headerContent = header;
        }

        if (footer !== null) {
            config.footerContent = footer;
        }

        panel = new Y.Rednose.NavContainer(config);

        // Render the panel within the view container.
        panel.render(container);

        if (this.panel) {
            this._repositionPanel(this.panel);
        }

        // Add a magic CSS handle to the widget-body.
        panel.get('boundingBox').one('.' + CSS_YUI3_WIDGET_BD).addClass(CSS_MAGIC_PREFIX + '-' + this._camelCaseToDash(this.name));
    }
}, {
    ATTRS: {
        buttons: {
            setter: '_setButtons',
            getter: '_getButtons'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View').Nav = Nav;
