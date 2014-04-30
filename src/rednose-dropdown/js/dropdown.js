/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the Y.Rednose.Dropdown widget.
 *
 * @module rednose-dropdown
 */

/**
 * Dropdown widget.
 *
 * @class Menu
 * @constructor
 * @param {Object} [config] Config options.
 * @param {HTMLElement|Node|String} [config.sourceNode] Source node.
 * @extends View
 */

/**
 * Fired when a menu item is clicked.
 *
 * You can subscribe to specific menu item through the following event: "select#id".
 *
 * @event select
 * @param {id} the item id that was clicked.
 * @param {EventFacade} originEvent Original click event.
 */
var EVT_SELECT = 'select';

var Dropdown = Y.Base.create('dropdown', Y.View, [], {
    // -- Lifecycle methods ----------------------------------------------------

    initializer: function (config) {
        var sourceNode = this.get('sourceNode');
//        var node      = this._node;
//            menuNode  = null,
//            direction = this.config.dropup ? 'dropup' : 'dropdown';

//        this.node = node;

//        node.wrap('<div class="dropdown-wrapper ' + direction + '"></div>');

//        parentNode.addClass('dropdown');
//
//        this._node.addClass('dropdown-toggle');
//        this._node.setAttribute('data-toggle', 'dropdown');

        // From markup
        var parentNode = sourceNode.get('parentNode');

        sourceNode.on('click', this._handleAnchorClick, this);

        parentNode.delegate('click', this._handleItemClick, '.dropdown-menu a', this);

//        menuNode = node.get('parentNode');
//        menuNode.append(this._buildHTML(
//            this.get('content')
//        ));
//
//        // Close the dropdown on click.
//        menuNode.delegate('click', function(e) {
//            e.preventDefault();
//
//            if (e.target.hasClass('disabled') !== true) {
//                if (e.target.getAttribute('data-id')) {
//                    node.dropdown.fire(e.target.getAttribute('data-id'));
//                }
//
//                node.dropdown.toggle();
//            } else {
//                e.target.blur();
//            }
//        }, 'a');
//
//        this.set('node', menuNode);
    },

    destructor: function () {
//        this.get('node').replace(this._node);

//        this._node.removeClass('dropdown-toggle');
//        this._node.removeAttribute('data-toggle');
//
//        delete this._node;
    },

    // -- Public methods -------------------------------------------------------

    toggle: function() {
        var target = this.get('sourceNode').get('parentNode');

        target.toggleClass('open');

        target.once('clickoutside', function(e) {
            target.toggleClass('open');
        });
    },

    enable: function (id) {
        // FIXME: Shouldn't we rename this to toggle?
        this.disable(id);
    },

    disable: function (id) {
        var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        if (node.ancestor('li').hasClass('disabled')) {
            node.removeClass('disabled');
            node.ancestor('li').removeClass('disabled');
        } else {
            node.addClass('disabled');
            node.ancestor('li').addClass('disabled');
        }
    },

    rename: function (id, title) {
        var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        node.setHTML(title);
    },

    // -- Protected methods ----------------------------------------------------

    _buildHTML: function (content) {
        var template = '<ul class="dropdown-menu"></ul>';
        var node = Y.Node.create(template);

        if (content === '') {
            return content;
        }

        Y.Array.each(content, function (item) {
            var elLi = Y.Node.create('<li>');
            var elA = Y.Node.create('<a href="#">');
            var html = item.title;

            if (item.className) {
                elLi.addClass(item.className);
            }

            if (item.title !== '-') {
                if (item.icon) {
                    html = '<i class="icon ' + item.icon + '"></i> ' + html;
                }

                elA.set('innerHTML', html);
                elA.setAttribute('data-id', item.id);

                elLi.append(elA);

                if (item.disabled === true) {
                    elLi.addClass('disabled');
                    elA.addClass('disabled');
                }
            } else {
                elLi.addClass('divider');
            }

            node.append(elLi);
        });

        return node.get('outerHTML');
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param e {EventFacade}
     * @private
     */
    _handleAnchorClick: function (e) {
        e.preventDefault();

        this.toggle();
    },

    /**
     * @param e {EventFacade}
     * @private
     */
    _handleItemClick: function (e) {
        e.preventDefault();

        var target = e.target;

        if (target.get('parentNode').hasClass('disabled')) {
            return;
        }

        this.toggle();

        this.fire(EVT_SELECT, {
            originEvent: e.originEvent,
            id         : target.hasAttribute('data-id') ? target.getAttribute('data-id') : null
        });

        if (target.hasAttribute('data-id')) {
            this.fire(EVT_SELECT + '#' + target.getAttribute('data-id'), {
                originEvent: e.originEvent,
                id         : target.getAttribute('data-id')
            });
        }
    }
}, {
    NS: 'dropdown',

    ATTRS: {
        /**
         * @attribute sourceNode
         * @type Node|HTMLElement|String
         * @initOnly
         */
        sourceNode: {
            setter: Y.one,
            writeOnce: 'initOnly'
        },

        /**
         * @type Array
         */
        content: {
            value: null
        },

        /**
         * @type Node
         */
        node: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Dropdown = Dropdown;
