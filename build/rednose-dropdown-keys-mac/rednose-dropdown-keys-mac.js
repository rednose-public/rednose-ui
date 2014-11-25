YUI.add('rednose-dropdown-keys-mac', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the Y.Rednose.Dropdown.KeysMac extension.
 *
 * @module rednose-dropdown
 * @submodule rednose-dropdown-keys-mac
 */

var Util = Y.Rednose.Util;

/**
 * @class Rednose.Dropdown.KeysMac
 * @constructor
 * @extensionfor Rednose.Dropdown
 */

function DropdownKeysMac() {}

DropdownKeysMac.prototype = {
    // -- Protected Properties -------------------------------------------------

    /**
     * @property _keyMap
     * @type {Object}
     */
    _keyMap: {
        'alt'  : '⌥',
        'ctrl' : '⌘',
        'shift': '⇧'
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @see Rednose.Dropdown.Keys
     */
    formatKeyCode: function (keyCode) {
        var self = this,
            parts;

        parts = keyCode.split('+').map(function (part) {
            return self._keyMap[part] || Util.capitalizeFirstLetter(part);
        });

        return parts.join('');
    }
};

// -- Namespace ----------------------------------------------------------------
Y.Rednose.Dropdown.KeysMac = DropdownKeysMac;
Y.Base.mix(Y.Rednose.Dropdown, [DropdownKeysMac]);


}, '1.6.0');
