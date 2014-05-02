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

/**
 * Fired when the dropdown is closed.
 *
 * @event close
 * @preventable _defCloseFn
 */
var EVT_CLOSE = 'close';

/**
 * Fired the dropdown is opened.
 *
 * @event open
 * @preventable _defOpenFn
 */
var EVT_OPEN = 'open';

var DropdownBase = Y.Base.create('dropdownBase', Y.Base, [], {

    /**
     * Whether the dropdown is currenty open or not.
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
     * Opens the dropdown.
     *
     * @chainable
     */
    open: function () {
        if (!this.isOpen()) {
            this._fireDropdownEvent(EVT_OPEN, {}, {
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
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defOpenFn: function (e) {
        this._open = true;
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defCloseFn: function (e) {
        this._open = false;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DropdownBase = DropdownBase;
