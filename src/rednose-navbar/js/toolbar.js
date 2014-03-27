/*jshint boss:true, expr:true, onevar:false */

var CSS_BOOTSTRAP_BTN         = 'btn',
    CSS_BOOTSTRAP_BTN_GROUP   = 'btn-group',
    CSS_BOOTSTRAP_ACTIVE      = 'active',
    CSS_BOOTSTRAP_BTN_PRIMARY = 'btn-primary',
    CSS_BOOTSTRAP_DISABLED    = 'disabled',
    CSS_BOOTSTRAP_FLOAT_LEFT  = 'float-left',
    CSS_BOOTSTRAP_FLOAT_RIGHT = 'float-right',
    CSS_BOOTSTRAP_CLOSE       = 'close';

var Toolbar = Y.Base.create('toolbar', Y.View, [], {
    /**
     Stores references to the created nodes.

     @property _buttonMap
     @type Object
     @protected
     **/
    _buttonMap: {},

    _evtPrefix: null,

    initializer: function (config) {
        config || (config = {});

        this._evtPrefix = config.evtPrefix || Toolbar.NAME;
    },

    destructor: function () {
        this._buttonMap = null;
    },

    render: function () {
        var self      = this,
            buttons   = this.get('buttons'),
            container = this.get('container');

        Y.Object.each(buttons, function (button, key) {
            var value     = button.value,
                primary   = button.primary,
                position  = button.position ? button.position : 'left',
                disabled  = button.disabled,
                className = button.className,
                icon      = button.icon,
                title     = button.title,
                hidden    = button.hidden;

            var node, action;

            // TODO: Refactor, DRY
            if (button.type === 'choice') {
                node = Y.Node.create('<div class="' + CSS_BOOTSTRAP_BTN_GROUP + '"></div>');

                if (disabled) {
                    node.addClass(CSS_BOOTSTRAP_DISABLED);
                }

                if (className) {
                    node.addClass(className);
                }

                if (hidden) {
                    node.hide();
                }

                if (position === 'left') {
                    node.addClass(CSS_BOOTSTRAP_FLOAT_LEFT);
                }

                if (position === 'right') {
                    node.addClass(CSS_BOOTSTRAP_FLOAT_RIGHT);
                }

                Y.Object.each(button.choices, function (choice, key) {
                    var buttonNode = Y.Node.create('<button class="' + CSS_BOOTSTRAP_BTN + '"></button>');

                    if (choice.icon) {
                        buttonNode.append(Y.Node.create('<i class="' + choice.icon + '"></i>'));
                    }

                    if (value === key) {
                        buttonNode.addClass(CSS_BOOTSTRAP_ACTIVE);
                    }

                    if (choice.title) {
                        buttonNode.set('title', choice.title);
                    }

                    buttonNode.on('click', function (e) {
                        var btn = e.currentTarget;

                        action = 'button' + Y.Rednose.Util.capitalizeFirstLetter(key);

                        if (btn.hasClass(CSS_BOOTSTRAP_ACTIVE) === false) {
                            btn.get('parentNode').get('children').each(function (child) {
                                if (child.hasClass(CSS_BOOTSTRAP_ACTIVE)) {
                                    child.removeClass(CSS_BOOTSTRAP_ACTIVE);
                                }
                            });

                            btn.addClass(CSS_BOOTSTRAP_ACTIVE);

                            self.fire(self._evtPrefix + ':' + action);
                        }
                    });

                    node.append(buttonNode);
                });
            } else {
                // Format the action event by prepending 'button', for example the event
                // fired for 'cancel' will be 'buttonCancel'
                action = 'button' + Y.Rednose.Util.capitalizeFirstLetter(key);
                node   = Y.Node.create('<button class="' + CSS_BOOTSTRAP_BTN + '"></button>');

                if (primary) {
                    node.addClass(CSS_BOOTSTRAP_BTN_PRIMARY);
                }

                if (disabled) {
                    node.addClass(CSS_BOOTSTRAP_DISABLED);
                }

                if (className) {
                    node.addClass(className);
                }

                if (title) {
                    node.set('title', title);
                }

                if (hidden) {
                    node.hide();
                }

                if (position === 'left') {
                    node.addClass(CSS_BOOTSTRAP_FLOAT_LEFT);
                }

                if (position === 'right') {
                    node.addClass(CSS_BOOTSTRAP_FLOAT_RIGHT);
                }

                if (value) {
                    node.set('text', value);
                }

                if (icon) {
                    node.append(Y.Node.create('<i class="' + icon + '"></i>'));
                }

                node.on('click', function (e) {
                    var btn = e.currentTarget;

                    if (btn.hasClass(CSS_BOOTSTRAP_DISABLED) === false) {
                        self.fire(self._evtPrefix + ':' + action);
                    }
                });
            }

            container.append(node);

            self._buttonMap[key] = node;
        });

        return this;
    },

    /**
     Get a button node by name.

     @method getButton
     @param {String} name The name of the button.
     **/
    getButton: function (name) {
        if (!this._buttonMap) {
            return false;
        }

        if (!this._buttonMap[name]) {
            return false;
        }

        return this._buttonMap[name];
    },

    /**
     Setter to update the buttons properties.

     @method _setButtons
     @param {Object} value The button config object
     @protected
     **/
    _setButtons: function (value) {
        var self    = this,
            footer  = this.get('container').one('.' + CSS_YUI3_WIDGET_FT),
            buttons = this.buttons;

        Y.Object.each(value, function (properties, key) {
            self.buttons[key] = Y.merge(buttons[key], properties);
        });

        // TODO: Update instead of rerendering.
        this._buildFooter();

        this._rendered && footer.one('div').replace(this._footer);
    },

    /**
     Getter to get the current button properties.

     @method _getButtons
     @protected
     **/
    _getButtons: function () {
        return this.buttons;
    }
}, {
    ATTRS: {
        /**
        @attribute buttons
        @type Object
        **/
        buttons: {
            value: {}
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Toolbar = Toolbar;
