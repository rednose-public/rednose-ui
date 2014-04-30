/*jshint boss:true, expr:true, onevar:false */

/**
Provides a dropdown plugin with custom event binding.

@module rednose-dropdown
**/
var Dropdown;

/**
Provides a context menu plugin with custom event binding.

@class Dropdown
@namespace Rednose
@constructor
@extends Widget
**/
Dropdown = Y.Base.create('dropdown', Y.Widget, [], {
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

        if (target.get('parentNode').hasClass('disabled') || !target.hasAttribute('data-id')) {
            return;
        }

        this.fire('select', { id: target.getAttribute('data-id') });
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
