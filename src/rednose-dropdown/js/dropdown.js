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
        ),

        menu: Micro.compile(
            '<ul class="<%= data.classNames.menu %>"></ul>'
        ),

        item: Micro.compile(
            '<% if (data.item.type === "divider") { %>' +
                '<li class="<%= data.classNames.divider %>"></li>' +
            '<% } else { %>' +
                    '<li class="' +
                        '<% if (data.item.disabled) { %>' +
                            '<%= data.classNames.disabled %> ' +
                        '<% } %>' +
                        '<% if (data.item.children) { %>' +
                            '<%= data.classNames.submenu %>' +
                        '<% } %>' +
                    '">' +
                    '<a href="#" data-id="<%= data.item.id %>">' +
                        '<% if (data.item.icon) { %>' +
                            '<i class="<%= data.classNames.icon %> <%= data.item.icon %>"></i> ' +
                        '<% } %>' +
                        '<%= data.item.title %>' +
                    '</a>' +
                '</li>' +
            '<% } %>'
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
        dropup  : 'dropup',
        icon    : 'icon',
        submenu : 'dropdown-submenu'
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
        var container  = this.get('container'),
            classNames = this.classNames;

        container.addClass(classNames.dropdown);

        container.delegate('click', this._handleItemClick, '.' + classNames.menu + ' a', this);

        this.set('dropdownContainer', container);
    },

    destructor: function () {
        // TODO: Detach events.
    },

    // -- Public methods -------------------------------------------------------

    /**
     * @chainable
     */
    render: function () {
        var container  = this.get('dropdownContainer'),
            items      = this.get('items');

        if (items) {
            container.append(this._renderMenu(items));
        }

        if (!container.inDoc()) {
            Y.one('body').append(container);
        }

        this.rendered = true;

        return this;
    },

    /**
     * @param {Object} [point] X / Y anchor point, optional.
     */
    toggle: function (point) {
        if (!this.rendered) {
            this.render();
        }

        var container  = this.get('dropdownContainer'),
            classNames = this.classNames;

        container.toggleClass(classNames.open);

        if (Y.Lang.isArray(point)) {
            container.setStyles({
                position: 'absolute',
                left    : point[0],
                top     : point[1]
            });
        }

        container.once('clickoutside', function() {
            container.toggleClass(classNames.open);
        });
    },

    enable: function (id) {
        var node = this._getNodeByID(id);

        if (node.hasClass(this.classNames.disabled)) {
            node.removeClass(this.classNames.disabled);
        }
    },

    disable: function (id) {
        var node = this._getNodeByID(id);

        node.addClass(this.classNames.disabled);
    },

    rename: function (id, title) {
        // TODO: Implement method.
    },

    // -- Protected methods ----------------------------------------------------

    /**
     * @param {String} id
     * @return {Node}
     * @private
     */
    _getNodeByID: function (id) {
        var container = this.get('dropdownContainer');

        return container.one('[data-id=' + id + ']').get('parentNode');
    },

    /**
     * @param {Array} items
     * @return {Node}
     * @private
     */
    _renderMenu: function (items) {
        var menuNode = Y.Node.create(this.templates.menu({
            classNames: this.classNames
        }));

        for (var i = 0, len = items.length; i < len; i++) {
            menuNode.append(this._renderItem(items[i]));
        }

        return menuNode;
    },

    /**
     * @param {Object} item
     * @return {Node}
     * @private
     */
    _renderItem: function (item) {
        var itemNode = Y.Node.create(this.templates.item({
            classNames: this.classNames,
            item      : item
        }));

        if (item.children) {
            itemNode.append(this._renderMenu(item.children));
        }

        return itemNode;
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

        if (target.get('parentNode').hasClass(this.classNames.submenu)) {
            return;
        }

        if (target.get('parentNode').hasClass(this.classNames.disabled)) {
            return;
        }

        this.toggle();

        this.fire(EVT_SELECT, {
            originEvent: e.originEvent,
            id         : target.hasAttribute('data-id') ? target.getAttribute('data-id') : null
        });

        if (target.hasAttribute('data-id')) {
            var event = EVT_SELECT + '#' + target.getAttribute('data-id');
            
            this.fire(event, {
                originEvent: e.originEvent,
                id         : target.getAttribute('data-id')
            });
        }
    }
}, {
    NS: 'dropdown',

    ATTRS: {
        /**
         * @attribute items
         * @type Array
         */
        items: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Dropdown = Dropdown;
