YUI.add('rednose-dropdown', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the Y.Rednose.Dropdown widget.
 *
 * @module rednose-dropdown
 * @main rednose-dropdown
 */

var Micro = Y.Template.Micro;

/**
 * Dropdown widget.
 *
 * @class Rednose.Dropdown
 * @constructor
 * @param {Object} [config] Config options.
 * @param {Array} [config.items] Dropdown items.
 * @extends Rednose.Dropdown.Base
 * @uses View
 */

/**
 * Fired when a menu item is clicked.
 *
 * You can subscribe to specific menu item through the following event: "click#id".
 *
 * @event click
 * @param {Rednose.Dropdown.Item} item The item that was clicked.
 * @param {Node} node The node the dropdown is bound to.
 * @param {EventFacade} originEvent Original click event.
 * @preventable _defClickFn
 */
var EVT_CLICK = 'click';

var Dropdown = Y.Base.create('dropdown', Y.Rednose.Dropdown.Base, [Y.View], {

    /**
     * Whether or not this dropdown has been rendered.
     *
     * @property {Boolean} rendered
     * @default false
     */
    rendered: false,

    // -- Lifecycle methods ----------------------------------------------------

    initializer: function () {
        var classNames = Y.Rednose.Dropdown.ClassNames;

        // Allow all extensions to initialize in case they provide custom getters for the container.
        this.onceAfter('initializedChange', function () {
            this.get('container').addClass(classNames.dropdown);

            this._attachDropdownEvents();
        });
    },

    destructor: function () {
        this._detachDropdownEvents();
    },

    // -- Public methods -------------------------------------------------------

    /**
     * @param {Rednose.Dropdown.Item} item
     * @return {Node}
     * @private
     */
    getHTMLNode: function (item) {
        var container = this.get('container');

        return container.one('[data-id="' + item.id + '"]');
    },

    /**
     * @chainable
     */
    render: function () {
        var container = this.get('container');

        if (this._rootItems) {
            container.append(this._renderMenu(this._rootItems));
        }

        if (!container.inDoc()) {
            Y.one('body').append(container);
        }

        this.rendered = true;

        return this;
    },

    // -- Protected methods ----------------------------------------------------

    _attachDropdownEvents: function () {
        this._events || (this._events = []);

        var container  = this.get('container'),
            classNames = Y.Rednose.Dropdown.ClassNames;

        this._events.push(
            this.after({
                open         : this._afterOpen,
                close        : this._afterClose,
                enable       : this._afterEnable,
                disable      : this._afterDisable,
                activate     : this._afterActivate,
                deactivate   : this._afterDeactivate,
                rename       : this._afterRename,
                reset        : this._afterReset,
                resetChildren: this._afterReset
            }),

            container.delegate('click', this._afterItemClick, '.' + classNames.menu + ' a', this),

            container.on('clickoutside', this._onClickOutside, this),
            container.on('mouseupoutside', this._onMouseUpOutside, this),

            Y.one('body').on('contextmenu', this._onBodyContextMenu, this)
        );
    },

    _detachDropdownEvents: function () {
        (new Y.EventHandle(this._events)).detach();
    },

    /**
     * @param {Array} items
     * @return {Node}
     * @private
     */
    _renderMenu: function (items) {
        var menuNode = Y.Node.create(Y.Rednose.Dropdown.Templates.menu({
            classNames: Y.Rednose.Dropdown.ClassNames
        }));

        for (var i = 0, len = items.length; i < len; i++) {
            menuNode.append(this._renderItem(items[i]));
        }

        return menuNode;
    },

    /**
     * @param {Rednose.Dropdown.Item} item
     * @return {Node}
     * @private
     */
    _renderItem: function (item) {
        var itemNode = Y.Node.create(Y.Rednose.Dropdown.Templates.item({
            classNames: Y.Rednose.Dropdown.ClassNames,
            item      : item,
            dropdown  : this
        }));

        if (item.html) {
            itemNode.one('a') && itemNode.one('a').setAttribute('data-id', item.id);

            return itemNode;
        }

        if (item.type === 'item') {
            itemNode.append(this._renderContent(item));
        }

        if (item.children) {
            itemNode.append(this._renderMenu(item.children));
        }

        return itemNode;
    },

    /**
     * @param {Rednose.Dropdown.Item} item
     * @return {Node}
     * @private
     */
    _renderContent: function (item) {
        var templates  = Y.Rednose.Dropdown.Templates,
            classNames = Y.Rednose.Dropdown.ClassNames;

        return Y.Node.create(templates.content({
            classNames: classNames,
            item      : item
        }));
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param e {EventFacade}
     * @private
     */
    _onClickOutside: function (e) {
        // Don't allow the right mouse button to hide the dropdown.
        // In some cases a browser (tested on FF17) will fire false positives and
        // immediately hide the drodpown again.
        if (e.button !== 3) {
            this.close();
        }
    },

    /**
     * @param e {EventFacade}
     * @private
     */
    _onBodyContextMenu: function (e) {
        var node = this._host || this.get('container');

        if (!node.contains(e.target)) {
            this.close();
        }
    },

    /**
     * @param e {EventFacade}
     * @private
     */
    _afterItemClick: function (e) {
        var target = e.currentTarget;

        var item      = this.getItemById(target.getAttribute('data-id')),
            itemEvent = EVT_CLICK + '#' + item.id;

        if (item.isDisabled() || item.url === '#') {
            e.preventDefault();
        }

        if (item.isDisabled() || item.hasChildren()) {
            return;
        }

        item.toggle && item.toggleActive();

        if (!this._published[itemEvent]) {
            this._published[itemEvent] = this.publish(itemEvent, {
                defaultFn: this._defItemClickFn
            });
        }

        if (!this._published[EVT_CLICK]) {
            this._published[EVT_CLICK] = this.publish(EVT_CLICK, {
                defaultFn: this._defClickFn
            });
        }

        this.fire(itemEvent, {
            originEvent: e,
            dropdown   : this,
            item       : item,
            node       : this.get('host')
        });
    },

    /**
     * @private
     */
    _afterOpen: function () {
        if (!this.rendered) {
            this.render();
        }

        var container  = this.get('container'),
            classNames = Y.Rednose.Dropdown.ClassNames;

        container.addClass(classNames.open);
    },

    /**
     * @private
     */
    _afterClose: function () {
        var container  = this.get('container'),
            classNames = Y.Rednose.Dropdown.ClassNames;

        container.removeClass(classNames.open);
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterEnable: function (e) {
        var node       = this.getHTMLNode(e.item),
            classNames = Y.Rednose.Dropdown.ClassNames;

        if (node) {
            node.get('parentNode').removeClass(classNames.disabled);
        }
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterDisable: function (e) {
        var node       = this.getHTMLNode(e.item),
            classNames = Y.Rednose.Dropdown.ClassNames;

        if (node) {
            node.get('parentNode').addClass(classNames.disabled);
        }
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterActivate: function (e) {
        var node = this.getHTMLNode(e.item);

        if (node) {
            node.replace(this._renderContent(e.item));
        }
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterDeactivate: function (e) {
        var node = this.getHTMLNode(e.item);

        if (node) {
            node.replace(this._renderContent(e.item));
        }
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterRename: function (e) {
        var node = this.getHTMLNode(e.item);

        if (node) {
            node.replace(this._renderContent(e.item));
        }
    },

    /**
     * @private
     */
    _afterReset: function () {
        if (!this.rendered) {
            return;
        }

        var container  = this.get('container'),
            classNames = Y.Rednose.Dropdown.ClassNames;

        container.one('.' + classNames.menu).remove();

        this.render();
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _defClickFn: function (e) {
        e.item.dropdown.toggle();
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defItemClickFn: function (e) {
        this.fire(EVT_CLICK, {
            originEvent: e.originEvent,
            dropdown   : this,
            item       : e.item,
            node       : this.get('host')
        });
    }
});

// -- Namespace ----------------------------------------------------------------
Y.Rednose.Dropdown = Y.mix(Dropdown, Y.Rednose.Dropdown);

/**
 * CSS classes used by `Y.Rednose.Dropdown`
 *
 * @property ClassNames
 * @type Object
 * @static
 */
Y.Rednose.Dropdown.ClassNames = {
    disabled  : 'disabled',
    menu      : 'dropdown-menu',
    toggle    : 'dropdown-toggle',
    open      : 'open',
    divider   : 'divider',
    dropdown  : 'dropdown',
    icon      : 'glyphicon',
    submenu   : 'dropdown-submenu',
    iconToggle: 'glyphicon-ok',
    item      : 'rednose-menu-item'
};

/**
 * Templates used by `Y.Rednose.Dropdown`.
 *
 * @property Templates
 * @type Object
 * @static
 */
Y.Rednose.Dropdown.Templates = {
    menu: Micro.compile(
        '<ul class="<%= data.classNames.menu %>"></ul>'
    ),

    item: Micro.compile(
        '<% if (data.item.type === "divider") { %>' +
            '<li class="<%= data.classNames.divider %>"></li>' +
        '<% } else { %>' +
            '<li class="' +
                '<% if (data.item.isDisabled()) { %>' +
                    '<%= data.classNames.disabled %> ' +
                '<% } %>' +
                '<% if (data.item.hasChildren()) { %>' +
                    '<%= data.classNames.submenu %>' +
                '<% } %>' +
            '">' +
                '<% if (data.item.html) { %>' +
                    '<%== data.item.html %>' +
                '<% } %>' +
            '</li>' +
        '<% } %>'
    ),

    content: Micro.compile(
        '<a href="<%= data.item.url %>" data-id="<%= data.item.id %>">' +
            '<% if (data.item.icon) { %>' +
                '<i class="<%= data.classNames.icon %> <%= data.item.icon %>"></i> ' +
            '<% } else if (data.item.isActive()) { %>' +
                '<i class="<%= data.classNames.icon %> <%= data.classNames.iconToggle %>"></i> ' +
            '<% } %>' +
            '<span class="<%= data.classNames.item %>"><%= data.item.title %></span> ' +
        '</a>'
    )
};


}, '@VERSION@', {"requires": ["event-outside", "node", "rednose-dropdown-base", "template-micro", "view"]});
