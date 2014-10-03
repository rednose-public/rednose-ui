YUI.add('rednose-navbar-recent', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides a navigation bar plugin to show a list of recent entries.
 *
 * @module rednose-navbar-recent
 */
var TXT_CLEAR_ITEMS = 'Clear Items',
    COOKIE_NAME     = 'recent',
    MAX_MENU_SIZE   = 5;

/**
 * Fired when a recent item is clicked.
 *
 * @event click
 * @param {String} id
 * @param {EventFacade} originEvent Original item event.
 */
var EVT_CLICK_RECENT = 'clickRecent';

/**
 * Provides a navigation bar plugin to show a list of recent entries.
 *
 * @class NavbarRecent
 * @namespace Rednose.Plugin
 * @constructor
 * @extends Plugin.Base
 * @extensionfor Rednose.NavBar
 */
var Recent = Y.Base.create('navbar', Y.Plugin.Base, [], {
    /**
     * The node identifier for this recent items set.
     *
     * @property {String} _node
     * @protected
     */

    /**
     * The unique identifier for this recent items set.
     *
     * @property {String} _scope
     * @protected
     */

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        this._scope   = config.scope;
        this._node    = config.node;

        var host = this.get('host');

        host.after('click', this._afterItemClick, this);
        host.after('click#clear-items', this._afterRecentClear, this);

        Y.Do.after(this._renderMenu, host, 'render', this);

        this.addTarget(host);
    },

    destructor: function () {
        var host = this.get('host');

        this.removeTarget(host);

        this._scope = null;
        this._node  = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @method add
     * @param {String} id Unique id
     * @param {String} label Menu entry label
     * @public
     */
    add: function (id, label) {
        var cookie     = Y.Cookie.getSub(COOKIE_NAME, this._scope),
            attrs      = { id: id, title: label },
            cookieData = Y.JSON.parse(cookie) || [];

        // Remove duplicate elements.
        Y.each(cookieData, function (el, key) {
            if (el.id === attrs.id) {
                cookieData.splice(key, 1);
            }
        });

        // Prepend.
        cookieData.unshift(attrs);

        // Keep the maximum size.
        if (cookieData.length > MAX_MENU_SIZE) {
            cookieData.pop();
        }

        // JSON encode the cookie data.
        cookie = Y.JSON.stringify(cookieData);

        Y.Cookie.setSub(COOKIE_NAME, this._scope, cookie);

        if (this.get('host').rendered) {
            this._renderMenu();
        }
    },

    /**
     * @method clear
     * @public
     */
    clear: function () {
        Y.Cookie.setSub(COOKIE_NAME, this._scope, null);

        if (this.get('host').rendered) {
            this._renderMenu();
        }
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * @method _renderMenu
     * @protected
     */
    _renderMenu: function () {
        var host       = this.get('host'),
            item       = host.getItemById(this._node);
            cookieData = Y.JSON.parse(Y.Cookie.getSub(COOKIE_NAME, this._scope)) || [];

        if (cookieData.length > 0) {
            cookieData.push({ type: 'divider' });
        }

        cookieData.push({
            id      : 'clear-items',
            title   : TXT_CLEAR_ITEMS,
            disabled: cookieData.length === 0
        });

        item.resetChildren(cookieData);
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @protected
     */
    _afterItemClick: function (e) {
        var item = e.item,
            node = this._node;

        if (item && item.parent && item.parent.id === node && item.id !== 'clear-items') {
            this.fire(EVT_CLICK_RECENT, {
                id         : item.id,
                originEvent: e
            });
        }
    },

    /**
     * @protected
     */
    _afterRecentClear: function () {
        this.clear();
    }
}, {
    NS: 'recent'
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Plugin').NavbarRecent = Recent;


}, '1.6.0-dev', {"requires": ["cookie", "plugin", "rednose-navbar-base"]});
