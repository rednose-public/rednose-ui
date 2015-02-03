YUI.add('rednose-navbar-keys', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the Y.Rednose.Navbar.Keys extension.
 *
 * @module rednose-navbar
 * @submodule rednose-navbar-keys
 */

/**
 * @class Rednose.Navbar.Keys
 * @constructor
 * @extensionfor Rednose.Navbar
 */

function NavbarKeys() {}

NavbarKeys.prototype = {
  // -- Protected Properties -------------------------------------------------

  /**
   * @property _keyCodeItemMap
   * @type {Object}
   */

  /**
   * @property _ignoreKeyCodes
   * @type {Object}
   */
   _ignoreKeyCodes: {
      16 : 'shift',
      17 : 'ctrl',
      18 : 'alt',
      91 : 'leftmeta',
      93 : 'rightmeta',
      224: 'meta'
   },

   /**
    * @property _keyCodeMap
    * @type {Object}
    */
   _keyCodeMap: {
       8  : 'backspace',
       9  : 'tab',
       13 : 'enter',
       27 : 'esc',
       32 : 'space'
   },

  // -- Lifecycle Methods ----------------------------------------------------

  initializer: function () {
      this._keyCodeItemMap || (this._keyCodeItemMap = {});

      this._navbarKeyEvents = [
          Y.Do.after(this._afterRender, this, 'render', this),
          Y.one('doc').on('keydown', this._onKeydown, this)
      ];
  },

  destructor: function () {
      (new Y.EventHandle(this._navbarKeyEvents)).detach();

      this._navbarKeyEvents   = null;
      this._keyCodeMapItemMap = null;
      this._ignoreKeyCodes    = null;
      this._keyCodeMap        = null;
  },

// -- Protected Methods ----------------------------------------------------

/**
 * @param {Rednose.Dropdown.Item} item
 * @param {EventFacade} originEvent
 */
_handleItemEvent: function (item, originEvent) {
    if (item.isDisabled()) {
        return;
    }

    var evt = 'click' + '#' + item.id;

    item.toggle && item.toggleActive();

    if (!this._published[evt]) {
        this._published[evt] = this.publish(evt, {
            defaultFn: this._defItemClickFn
        });
    }

    this.fire(evt, {
        originEvent: originEvent,
        item       : item
    });
},

// -- Protected Event Handlers ---------------------------------------------

_onKeydown: function (e) {
    var delegate = this.get('delegate'),
        keyCode  = e.keyCode;

    if (this._ignoreKeyCodes[keyCode]) {
        return;
    }

    // Allow a delegate class to interrupt keyboard events.
    if (delegate && typeof delegate.shouldRespondToKeyboardEvents === 'function') {
        if (!delegate.shouldRespondToKeyboardEvents()) {
            return;
        }
    }

    // Build key combination hash in the following order: 'alt+shift+ctrl+o'
    var isMac   = (Y.UA.os === 'macintosh'),
        command = [];

    if (e.altKey) {
        command.push('alt');
    }

    if (e.shiftKey) {
        command.push('shift');
    }

    if ((isMac && e.metaKey) || (!isMac && e.ctrlKey)) {
        command.push('ctrl');
    }

    command.push(this._keyCodeMap[keyCode] || String.fromCharCode(keyCode).toLowerCase());

    var item = this._keyCodeItemMap[command.join('+')];

    if (item) {
        e.preventDefault();

        this._handleItemEvent(item, e);
    }
},

    // -- AOP Methods ----------------------------------------------------------

    _afterRender: function () {
        var self = this;

        Y.Array.each(this._dropdownMap, function (dropdown) {
            Y.Array.each(dropdown.getItems(), function (item) {
                if (item.keyCode) {
                    self._keyCodeItemMap[item.keyCode] = item;
                }
            });
        });
    }
};

NavbarKeys.ATTRS = {
    /**
     * @attribute delegate
     * @type {Object}
     */
    delegate: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.Rednose.Navbar.Keys = NavbarKeys;
Y.Base.mix(Y.Rednose.Navbar, [NavbarKeys]);


}, '@VERSION@', {"requires": ["event-custom", "rednose-dropdown-keys", "rednose-navbar-base"]});
