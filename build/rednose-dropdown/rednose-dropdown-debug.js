YUI.add('rednose-dropdown', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
 * @class Rednose.DropdownItem
 * @param {Rednose.Dropdown} dropdown
 * @param {Object} [config]
 * @constructor
 */
function DropdownItem(dropdown, config) {
    config || (config = {});

    this.dropdown = dropdown;
    this.id       = config.id || Y.stamp(this);
    this.children = [];

    Y.mix(this, config);
}

DropdownItem.prototype = {
    /**
     * The id for this node.
     *
     * @property {string} title
     * @readOnly
     */

    /**
     * The dropdown instance.
     *
     * @property {Rednose.Dropdown} dropdown
     * @readOnly
     */

    /**
     * This node's children.
     *
     * @property {Array} children
     * @readOnly
     */

    /**
     * This node's type.
     *
     * @property {String} type
     * @readOnly
     */

    /**
     * Whether this node is disabled or not.
     *
     * @property {Boolean} disabled
     * @readOnly
     */

    /**
     * The icon for this node.
     *
     * @property {Boolean} disabled
     * @readOnly
     */

    /**
     * The title for this node.
     *
     * @property {String} title
     * @readOnly
     */

    // -- Public Methods -------------------------------------------------------

    /**
     * Enables this item.
     */
    enable: function () {
        this.dropdown.enableItem(this);

        return this;
    },

    /**
     * Disables this item.
     *
     * @chainable
     */
    disable: function () {
        this.dropdown.disableItem(this);

        return this;
    },

    /**
     * Renames this item.
     *
     * @param {String} title
     */
    rename: function (title) {
        this.dropdown.renameItem(this, title);

        return this;
    },

    /**
     * Whether this node is disabled or not.
     */
    isDisabled: function () {
        return this.disabled;
    },

    /**
     * Whether this node has children or not.
     */
    hasChildren: function () {
        return this.children && this.children.length > 0;
    },

    /**
     * Adds a child to this node.
     *
     * @param {Rednose.DropdownItem} child
     */
    addChild: function (child) {
        this.children.push(child);
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DropdownItem = DropdownItem;
/*jshint boss:true, expr:true, onevar:false */

/**
 * @event enable
 * @param {Rednose.DropdownItem}
 * @preventable _defEnableFn
 */
var EVT_ENABLE = 'enable';

/**
 * @event disable
 * @param {Rednose.DropdownItem}
 * @preventable _defDisableFn
 */
var EVT_DISABLE = 'disable';

/**
 * @event rename
 * @param {Rednose.DropdownItem}
 * @preventable _defRenameFn
 */
var EVT_RENAME = 'rename';

var DropdownBase = Y.Base.create('dropdownBase', Y.Base, [], {

    /**
     * Root items for this dropdown.
     *
     * @property {Array} _rootItems
     * @protected
     */

    /**
     * Mapping of item ids to item instances.
     *
     * @property {Object} _itemMap
     * @protected
     */

    // -- Lifecycle methods ----------------------------------------------------

    initializer: function (config) {
        this._rootItems = [];
        this._itemMap   = {};
        this._published = {};

        if (config.items) {
            for (var i = 0, len = config.items.length; i < len; i++) {
                this._rootItems.push(this._createItem(config.items[i]));
            }
        }
    },

    destructor: function () {
        this._rootItems = null;
        this._itemMap   = null;
        this._published = null;
    },

    // -- Public methods -------------------------------------------------------

    /**
     * @param {String} id
     * @return {Rednose.DropdownItem}
     * @private
     */
    getItemById: function (id) {
        return this._itemMap[id];
    },

    /**
     * @param {Rednose.DropdownItem} item
     * @chainable
     */
    enableItem: function (item) {
        if (item.isDisabled()) {
            this._fireDropdownEvent(EVT_ENABLE, {item: item}, {
                defaultFn: this._defEnableFn
            });
        }

        return this;
    },

    /**
     * @param {Rednose.DropdownItem} item
     * @chainable
     */
    disableItem: function (item) {
        if (!item.isDisabled()) {
            this._fireDropdownEvent(EVT_DISABLE, {item: item}, {
                defaultFn: this._defDisableFn
            });
        }

        return this;
    },

    /**
     * @param {Rednose.DropdownItem} item
     * @param {String} title
     * @chainable
     */
    renameItem: function (item, title) {
        this._fireDropdownEvent(EVT_RENAME, {item: item, title: title}, {
            defaultFn: this._defRenameFn
        });

        return this;
    },

    // -- Protected methods ----------------------------------------------------

    /**
     * Create a dropdown item.
     *
     * @param {Object} config
     * @return {Rednose.DropdownItem}
     * @private
     */
    _createItem: function (config) {
        var dropdownItem = new Y.Rednose.DropdownItem(this, config);

        if (config.children) {
            for (var i = 0, len = config.children.length; i < len; i++) {
                dropdownItem.addChild(this._createItem(config.children[i]));
            }
        }

        if (dropdownItem.id in this._itemMap) {
            dropdownItem.id = Y.stamp(dropdownItem);
        }

        this._itemMap[dropdownItem.id] = dropdownItem;

        return dropdownItem;
    },

    /**
     * Utility method for lazily publishing events,
     *
     * @param {String} name
     * @param {Object} facade
     * @param {Object} options
     * @chainable
     * @private
     */
    _fireDropdownEvent: function (name, facade, options) {
        if (options && options.defaultFn && !this._published[name]) {
            this._published[name] = this.publish(name, {
                defaultFn: options.defaultFn
            });
        }

        this.fire(name, facade);

        return this;
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _defDisableFn: function (e) {
        e.item.disabled = true;
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defEnableFn: function (e) {
        e.item.disabled = false;
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defRenameFn: function (e) {
        e.item.title = e.title;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DropdownBase = DropdownBase;
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
 * @class Dropdown
 * @constructor
 * @param {Object} [config] Config options.
 * @param {Array} [config.items] Dropdown items.
 * @extends Rednose.DropdownBase
 * @uses View
 */

/**
 * Fired when a menu item is clicked.
 *
 * You can subscribe to specific menu item through the following event: "select#id".
 *
 * @event select
 * @param {Rednose.DropdownItem} item The item that was clicked.
 * @param {EventFacade} originEvent Original click event.
 * @preventable _defSelectFn
 */
var EVT_SELECT = 'select';

var Dropdown = Y.Base.create('dropdown', Y.Rednose.DropdownBase, [Y.View], {

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
                        '<% if (data.item.isDisabled()) { %>' +
                            '<%= data.classNames.disabled %> ' +
                        '<% } %>' +
                        '<% if (data.item.hasChildren()) { %>' +
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
        ),

        content: Micro.compile(
            '<% if (data.item.icon) { %>' +
                '<i class="<%= data.classNames.icon %> <%= data.item.icon %>"></i> ' +
                '<% } %>' +
            '<%= data.item.title %>'
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

    initializer: function (config) {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.addClass(classNames.dropdown);

        this.set('dropdownContainer', container);

        this._attachEvents();
    },

    destructor: function () {
        this._detachEvents();
    },

    // -- Public methods -------------------------------------------------------

    /**
     * @param {Rednose.DropdownItem} item
     * @return {Node}
     * @private
     */
    getHTMLNode: function (item) {
        var container = this.get('dropdownContainer');

        return container.one('[data-id="' + item.id + '"]');
    },

    /**
     * @chainable
     */
    render: function () {
        var container  = this.get('dropdownContainer'),
            items      = this.get('items');

        if (items) {
            container.append(this._renderMenu(this._rootItems));
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

    // -- Protected methods ----------------------------------------------------

    _attachEvents: function () {
        this._events || (this._events = []);

        var container  = this.get('dropdownContainer'),
            classNames = this.classNames;

        this._events.push(
            this.after({
                enable : this._afterEnable,
                disable: this._afterDisable,
                rename : this._afterRename
            }),

            container.delegate('click', this._handleItemClick, '.' + classNames.menu + ' a', this)
        );
    },

    _detachEvents: function () {
        (new Y.EventHandle(this._events)).detach();
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
     * @param {Rednose.DropdownItem} item
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

        var target      = e.target,
            originEvent = e.originEvent,
            item        = this.getItemById(target.getAttribute('data-id')),
            itemEvent   = EVT_SELECT + '#' + item.id;

        if (item.isDisabled() || item.hasChildren()) {
            return;
        }

        if (!this._published[itemEvent]) {
            this._published[itemEvent] = this.publish(itemEvent, {
                defaultFn: this._defItemSelectFn
            });
        }

        if (!this._published[EVT_SELECT]) {
            this._published[EVT_SELECT] = this.publish(EVT_SELECT, {
                defaultFn: this._defSelectFn
            });
        }

        this.fire(itemEvent, {
            originEvent: originEvent,
            item       : item
        });
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterEnable: function (e) {
        var node = this.getHTMLNode(e.item);

        if (node) {
            node.get('parentNode').removeClass(this.classNames.disabled);
        }
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterDisable: function (e) {
        var node = this.getHTMLNode(e.item);

        if (node) {
            node.get('parentNode').addClass(this.classNames.disabled);
        }
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterRename: function (e) {
        var node = this.getHTMLNode(e.item);

        if (node) {
            node.setContent(this.templates.content({
                classNames: this.classNames,
                item      : e.item
            }));
        }
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _defSelectFn: function (e) {
        e.item.dropdown.toggle();
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defItemSelectFn: function (e) {
        this.fire(EVT_SELECT, {
            originEvent: e.originEvent,
            item       : e.item
        });
    }
}, {
    NS: 'dropdown',

    ATTRS: {
        /**
         * @attribute dropdownContainer
         * @type {Node}
         */
        dropdownContainer: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Dropdown = Dropdown;
/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the `Y.Rednose.Plugin.Dropdown` Node plugin.
 *
 * @module rednose-dropdown
 */

/**
 * @class Rednose.Plugin.Dropdown
 * @constructor
 * @extends Rednose.Dropdown
 * @uses Plugin.Base
 */
Y.namespace('Rednose.Plugin').Dropdown = Y.Base.create('dropdown', Y.Rednose.Dropdown, [Y.Plugin.Base], {

    // -- Life Cycle Methods ---------------------------------------------------

    initializer: function (config) {
        var host       = config.host,
            container  = host.get('parentNode'),
            dropup     = this.get('dropup'),
            classNames = this.classNames;

        container.addClass(classNames.dropdown);

        dropup && container.addClass(classNames.dropup);

        if (this.get('showOnContext')) {
            host.on('contextmenu', this._handleAnchorContextMenu, this);

            return;
        }

        host.addClass(classNames.toggle);

        this.set('dropdownContainer', container);

        if (this.get('showCaret')) {
            host.setHTML(this.templates.caret({
                classNames: classNames,
                content   : host.getHTML()
            }));
        }

        container.delegate('click', this._handleItemClick, '.' + classNames.menu + ' a', this);

        host.on('click', this._handleAnchorClick, this);
    }
}, {
    NS: 'dropdown',

    ATTRS: {

        /**
         * If `true`, a caret will be rendered within the anchor node.
         *
         * @attribute {Boolean} showCaret
         * @default true
         * @initOnly
         */
        showCaret: {
            value: true,
            writeOnce: 'initOnly'
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
         * If `true`, the menu will be rendered upwards from the anchor node.
         *
         * @attribute {Boolean} dropup
         * @default false
         */
        dropup: {
            value: false
        }
    }
});


}, '1.4.0', {"requires": ["base", "node", "template-micro", "view", "node-pluginhost", "plugin"]});
