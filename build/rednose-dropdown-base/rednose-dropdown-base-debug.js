YUI.add('rednose-dropdown-base', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides Rednose.Dropdown.Base
 *
 * @module rednose-dropdown
 * @submodule rednose-dropdown-base
 */

/**
 * Base dropdown functionality.
 *
 * @class Rednose.Dropdown.Base
 * @constructor
 * @param {Object} [config] Config object.
 *     @param {Object[]} [config.items] Array of dropdown config objects.
 * @extends Base
 */

/**
 * @event enable
 * @param {Rednose.Dropdown.Item}
 * @preventable _defEnableFn
 */
var EVT_ENABLE = 'enable';

/**
 * @event disable
 * @param {Rednose.Dropdown.Item}
 * @preventable _defDisableFn
 */
var EVT_DISABLE = 'disable';

/**
 * @event rename
 * @param {Rednose.Dropdown.Item}
 * @preventable _defRenameFn
 */
var EVT_RENAME = 'rename';

/**
 * Fired when the dropdown is closed.
 *
 * @event close
 * @preventable _defCloseFn
 */
var EVT_CLOSE = 'close';

/**
 * Fired when the dropdown is opened.
 *
 * @event open
 * @param {Dropdown} dropdown The dropdown instance.
 * @param {Node} node The node the dropdown is bound to.
 * @preventable _defOpenFn
 */
var EVT_OPEN = 'open';

/**
 * @event activate
 * @param {Rednose.Dropdown.Item}
 * @preventable _defActivateFn
 */
var EVT_ACTIVATE = 'activate';

/**
 * @event deactivate
 * @param {Rednose.Dropdown.Item}
 * @preventable _defDeactivateFn
 */
var EVT_DEACTIVATE = 'deactivate';

/**
 * Fired when the dropdown items are reset.
 *
 * @event reset
 * @param {Rednose.Dropdown.Item}
 * @param {Array} items Array of new dropdown config objects
 * @preventable _defResetFn
 */
var EVT_RESET = 'reset';

/**
 * @event resetChildren
 * @param {Rednose.Dropdown.Item}
 * @param {Array} items Array of new dropdown config objects
 * @preventable _defResetChildrenFn
 */
var EVT_RESET_CHILDREN = 'resetChildren';

var DropdownBase = Y.Base.create('dropdownBase', Y.Base, [], {

    /**
     * Whether the dropdown is currently open or not.
     *
     * @property {Boolean} open
     * @default false
     * @protected
     */
    _open: false,

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
        this._id        = Y.stamp(this);
        this._published = {};

        if (config.items) {
            this.reset(config.items);
        }
    },

    destructor: function () {
        if (DropdownBase.instance === this) {
            delete DropdownBase.instance;
        }

        this._rootItems = null;
        this._itemMap   = null;
        this._published = null;
    },

    // -- Public methods -------------------------------------------------------

    /**
     * Resets the items in this dropdown.
     *
     * @param {Array} items
     * @chainable
     */
    reset: function (items) {
        return this._fireDropdownEvent(EVT_RESET, {
            items: items
        }, {
            defaultFn: this._defResetFn
        });
    },

    /**
     * Opens the dropdown.
     *
     * @chainable
     */
    open: function () {
        if (!this.isOpen()) {
            this._fireDropdownEvent(EVT_OPEN, {dropdown: this, node: this.get('host')}, {
                defaultFn: this._defOpenFn
            });
        }

        return this;
    },

    /**
     * Closes the dropdown.
     *
     * @chainable
     */
    close: function () {
        if (this.isOpen()) {
            this._fireDropdownEvent(EVT_CLOSE, {}, {
                defaultFn: this._defCloseFn
            });
        }

        return this;
    },

    /**
     * Toggles the dropdown.
     *
     * @chainable
     */
    toggle: function () {
        return this[this.isOpen() ? 'close' : 'open']();
    },

    /**
     * Whether the dropdown is currenty open or not.
     *
     * @return {Boolean}
     */
    isOpen: function () {
        return this._open;
    },

    /**
     * @param {String} id
     * @return {Rednose.Dropdown.Item}
     * @private
     */
    getItemById: function (id) {
        return this._itemMap[id];
    },

    /**
     * @return {Rednose.Dropdown.Item[]}
     * @private
     */
    getItems: function () {
        return Y.Object.values(this._itemMap);
    },

    /**
     * @param {Rednose.Dropdown.Item} item
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
     * @param {Rednose.Dropdown.Item} item
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
     * @param {Rednose.Dropdown.Item} item
     * @chainable
     */
    activateItem: function (item) {
        if (!item.isActive()) {
            this._fireDropdownEvent(EVT_ACTIVATE, {item: item}, {
                defaultFn: this._defActivateFn
            });
        }

        return this;
    },

    /**
     * @param {Rednose.Dropdown.Item} item
     * @chainable
     */
    deactivateItem: function (item) {
        if (item.isActive()) {
            this._fireDropdownEvent(EVT_DEACTIVATE, {item: item}, {
                defaultFn: this._defDeactivateFn
            });
        }

        return this;
    },

    /**
     * @param {Rednose.Dropdown.Item} item
     * @param {String} title
     * @chainable
     */
    renameItem: function (item, title) {
        this._fireDropdownEvent(EVT_RENAME, {item: item, title: title}, {
            defaultFn: this._defRenameFn
        });

        return this;
    },

    /**
     * @param {Rednose.Dropdown.Item} item
     * @param {Object[]} children
     * @chainable
     */
    resetItemChildren: function (item, children) {
        this._fireDropdownEvent(EVT_RESET_CHILDREN, {item: item, children: children}, {
            defaultFn: this._defResetChildrenFn
        });

        return this;
    },

    // -- Protected methods ----------------------------------------------------

    /**
     * Create a dropdown item.
     *
     * @param {Object} config
     * @return {Rednose.Dropdown.Item}
     * @private
     */
    _createItem: function (config) {
        var dropdownItem = new Y.Rednose.Dropdown.Item(this, config);

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
     * Create a dropdown item.
     *
     * @param {Rednose.Dropdown.Item} item
     * @private
     */
    _destroyItem: function (item) {
        if (item.hasChildren()) {
            for (var i = 0, len = item.children.length; i < len; i++) {
                this._destroyItem(item.children[i]);
            }
        }

        item.dropdown = null;
        item.children = null;
        item.parent   = null;

        delete this._itemMap[item.id];
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
    _defResetFn: function (e) {
        var items = e.items;

        if (this._rootItems && this._rootItems.length > 0) {
            for (var i = 0; i < this._rootItems.length; i++) {
                this._destroyItem(this._rootItems[i]);
            }
        }

        this._rootItems = [];
        this._itemMap   = {};

        if (items) {
            for (var j = 0; j < items.length; j++) {
                this._rootItems.push(this._createItem(items[j]));
            }
        }
    },

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
    },

    /**
     * @private
     */
    _defOpenFn: function () {
        // Keep a reference to the last open node so we can close it when a new one opens.
        // We can't use event propagation to block parent listeners, because the contextmenu listener on the body
        // won't be reached.
        DropdownBase.instance && DropdownBase.instance.close();
        DropdownBase.instance = this;

        this._open = true;
    },

    /**
     * @private
     */
    _defCloseFn: function () {
        this._open = false;
    },

    _defActivateFn: function (e) {
        e.item.active = true;
    },

    _defDeactivateFn: function (e) {
        delete e.item.active;
    },

    /**
     * @private
     */
    _defResetChildrenFn: function (e) {
        var item     = e.item,
            children = e.children;

        if (item.children && item.children.length > 0) {
            for (var i = 0; i < item.children.length; i++) {
                this._destroyItem(item.children[i]);
            }
        }

        item.children = [];

        if (children) {
            for (var j = 0; j < children.length; j++) {
                item.addChild(this._createItem(children[j]));
            }
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Dropdown').Base = DropdownBase;


}, '1.6.0', {"requires": ["rednose-dropdown-item"]});
