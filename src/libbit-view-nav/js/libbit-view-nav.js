var Nav;

/**
 * Y.View extension to wrap the container into a panel with a header and footer navigation bar.
 */
Nav = Y.Base.create('nav', Y.View, [], {
    /**
     * Title property, sets the panel's header content.
     */
    title : null,

    /**
     * Buttons property, sets the panel's footer buttons.
     */
    buttons : null,

    /**
     * Contains the footer DOM node.
     */
    _footer: null,

    /**
     * Stores references to the created nodes
     */
    _buttonMap: {},

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        Y.Do.after(this._afterRender, this, 'render', this);
        this._buildFooter();
    },

    /**
     * Get a button node by name.
     */
    getButton: function (name) {
        return this._buttonMap[name];
    },

    /**
     * Wrap the view into a panel after it's rendered.
     */
    _afterRender: function () {
        var container = this.get('container'),
            header    = this.title,
            body      = Y.Node.create('<div></div>'),
            footer    = this._footer,
            panel;

        // Transfer the child nodes from the view container to the new body container.
        container.get('children').each(function (c) {
            body.append(c);
        });

        panel = new Y.Libbit.NavContainer({
            headerContent: header,
            bodyContent  : body,
            footerContent: footer
        });

        // Render the panel within the view container.
        panel.render(container);
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
                title     = button.title ? button.title : (value ? value : null),
                disabled  = button.disabled,
                className = button.className,
                icon      = button.icon,
                // Format the action event by prepending 'button', for example the event
                // fired for 'cancel' will be 'buttonCancel'
                action    = 'button' + self._capitalizeFirstLetter(key),
                node      = Y.Node.create('<button class="btn"></button>');

            if (value) {
                node.set('text', value);
            }

            if (title) {
                node.set('title', title);
            }

            if (icon) {
                node.append(Y.Node.create('<i class="' + icon + '"></i>'));
            }

            if (primary) {
                node.addClass('btn-primary');
            }

            if (disabled) {
                node.addClass('disabled');
            }

            if (className) {
                node.addClass(className);
            }

            node.addClass('float-' + position);

            node.on('click', function (e) {
                var btn = e.target;

                if (btn.hasClass('disabled') === false) {
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
     * Magic function to update the buttons properties
     */
    _setButtons: function (value) {
        var self    = this,
            footer  = this.get('container').one('.yui3-widget-ft'),
            buttons = this.buttons;

        Y.Object.each(value, function (properties, key) {
            self.buttons[key] = Y.merge(buttons[key], properties);
        });

        // TODO: Update instead of rerendering.
        footer.one('div').replace(self._buildFooter());
    },

    /**
     * Magic function to get the current button properties
     */
     _getButtons: function () {
        return this.buttons;
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
Y.namespace('Libbit.View').Nav = Nav;
