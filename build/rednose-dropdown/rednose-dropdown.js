YUI.add('rednose-dropdown', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the Y.Rednose.Dropdown widget.
 *
 * @module rednose-dropdown
 */

var Micro = Y.Template.Micro;

/**
 * Dropdown widget.
 *
 * @class Menu
 * @constructor
 * @param {Object} [config] Config options.
 * @param {HTMLElement|Node|String} [config.srcNode] Source node.
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

    /**
     * Templates used by this dropdown.
     *
     * @property {Object} templates
     */
    templates: {
        wrapper: Micro.compile(
            '<div class="<%= data.classNames.wrapper %>"></div>'
        ),

        caret: Micro.compile(
            '<%== data.content %> <span class="<%= data.classNames.caret %>"></span>'
        )
    },

    /**
     * CSS class names used by this dropdown.
     *
     * @property {Object} classNames
     */
    classNames: {
        wrapper : 'rednose-dropdown-wrapper',
        disabled: 'disabled',
        caret   : 'caret',
        menu    : 'dropdown-menu',
        toggle  : 'dropdown-toggle',
        open    : 'open',
        divider : 'divider',
        dropdown: 'dropdown',
        dropup  : 'dropup'
    },

    /**
     * Whether or not this dropdown has been rendered.
     *
     * @property {Boolean} rendered
     * @default false
     */
    rendered: false,

    // -- Lifecycle methods ----------------------------------------------------

    initializer: function () {
        var srcNode    = this.get('srcNode'),
            anchorNode = this.get('anchorNode'),
            dropup     = this.get('dropup'),

            classNames = this.classNames,
            templates  = this.templates;

        // From markup
        if (srcNode) {
            this.parentnode = srcNode.get('parentNode');

            this.set('anchorNode', srcNode);
        } else {
            if (this.get('showOnContext')) {
                this.parentnode = Y.Node.create(templates.wrapper({
                    classNames: classNames
                }));

                Y.one('body').append(this.parentnode);
            } else {
                this.parentnode = anchorNode.get('parentNode');

                anchorNode.addClass(classNames.toggle);
                anchorNode.setAttribute('data-toggle', 'dropdown');

                if (this.get('showCaret')) {
                    anchorNode.setHTML(templates.caret({
                        classNames: classNames,
                        content   : anchorNode.getHTML()
                    }));
                }
            }

            this.parentnode.addClass(dropup ? classNames.dropup : classNames.dropdown);
        }

        if (this.get('showOnContext')) {
            this.get('anchorNode').on('contextmenu', this._handleAnchorContextMenu, this);
        } else {
            this.get('anchorNode').on('click', this._handleAnchorClick, this);
        }

        this.parentnode.delegate('click', this._handleItemClick, '.' + classNames.menu + ' a', this);
    },

    destructor: function () {
//        this.get('node').replace(this._node);

//        this._node.removeClass('dropdown-toggle');
//        this._node.removeAttribute('data-toggle');
//
//        delete this._node;
    },

    // -- Public methods -------------------------------------------------------

    render: function () {
        var items = this.get('items');

        this.parentnode.append(this._buildHTML(items));

        this.rendered = true;

        return this;
    },

    toggle: function (point) {
        if (!this.rendered) {
            this.render();
        }

        var target     = this.parentnode,
            classNames = this.classNames;

        target.toggleClass(classNames.open);

        if (Y.Lang.isArray(point)) {
            target.setStyles({
                position: 'absolute',
                left    : point[0],
                top     : point[1]
            });
        }

        target.once('clickoutside', function(e) {
            target.toggleClass(classNames.open);
        });
    },

    enable: function (id) {
        this.disable(id);
    },

    disable: function (id) {
        var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        if (node.ancestor('li').hasClass(this.classNames.disabled)) {
            node.removeClass(this.classNames.disabled);
            node.ancestor('li').removeClass(this.classNames.disabled);
        } else {
            node.addClass(this.classNames.disabled);
            node.ancestor('li').addClass(this.classNames.disabled);
        }
    },

    rename: function (id, title) {
        var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        node.setHTML(title);
    },

    // -- Protected methods ----------------------------------------------------

    _buildHTML: function (items) {
        var template = '<ul class="dropdown-menu"></ul>';
        var node = Y.Node.create(template);

        Y.Array.each(items, function (item) {
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
    _handleAnchorContextMenu: function (e) {
        if (e.shiftKey) {
            return;
        }

        e.preventDefault();

        this.toggle([ e.pageX, e.pageY ]);
    },

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

        if (target.get('parentNode').hasClass(this.classNames.disabled)) {
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
         * @attribute srcNode
         * @type Node|HTMLElement|String
         * @initOnly
         */
        srcNode: {
            setter: Y.one,
            writeOnce: 'initOnly'
        },

        /**
         * @attribute anchorNode
         * @type Node|HTMLElement|String
         */
        anchorNode: {
            setter: Y.one
        },

        /**
         * @attribute items
         * @type Array
         */
        items: {
            value: null
        },

        /**
         * If `true`, a caret will be rendered within the anchor node.
         *
         * @attribute {Boolean} showCaret
         * @default true
         */
        showCaret: {
            value: true
        },

        /**
         * If `true`, this menu will be triggered and rendered on the contextmenu event.
         *
         * @attribute {Boolean} showOnContext
         * @default false
         * @initOnly
         */
        showOnContext: {
            value: false,
            writeOnce: 'initOnly'
        },

        /**
         * If `true`, the menu will be rendered upwards.
         *
         * @attribute {Boolean} dropup
         * @default false
         */
        dropup: {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Dropdown = Dropdown;


}, '1.4.0', {"requires": ["base", "node", "template-micro", "view"]});
