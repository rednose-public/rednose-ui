YUI.add('rednose-dropdown-keys', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the Y.Rednose.Dropdown.Keys extension.
 *
 * @module rednose-dropdown
 * @submodule rednose-dropdown-keys
 */

var Micro = Y.Template.Micro,
    Util  = Y.Rednose.Util;

/**
 * @class Rednose.Dropdown.Keys
 * @constructor
 * @extensionfor Rednose.Dropdown
 */

function DropdownKeys() {}

DropdownKeys.prototype = {
    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        Y.Do.after(this._appendKeyCode, this, '_renderContent', this);
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @param {String} keyCode
     * @return {String}
     */
    formatKeyCode: function (keyCode) {
        var parts = keyCode.split('+').map(function (part) {
            return Util.capitalizeFirstLetter(part);
        });

        return parts.join('+');
    },

    // -- AOP Methods ----------------------------------------------------------

    /**
     * @param {Rednose.Dropdown.Item} item
     */
    _appendKeyCode: function (item) {
        if (!item.keyCode) {
            return;
        }

        var node       = Y.Do.originalRetVal,
            templates  = Y.Rednose.Dropdown.Templates,
            classNames = Y.Rednose.Dropdown.ClassNames;

        node.append(Y.Node.create(templates.keyCode({
            classNames: classNames,
            keyCode   : this.formatKeyCode(item.keyCode)
        })));
    }
};

// -- Namespace ----------------------------------------------------------------
Y.Rednose.Dropdown.Keys = DropdownKeys;
Y.Base.mix(Y.Rednose.Dropdown, [DropdownKeys]);

Y.mix(Y.Rednose.Dropdown.ClassNames, {
    keyCode: 'rednose-menu-item-key-code'
});

Y.mix(Y.Rednose.Dropdown.Templates, {
    keyCode: Micro.compile(
        '<span class="<%= data.classNames.keyCode %>"><%= data.keyCode %></span>'
    )
});


}, '1.8.0', {"requires": ["rednose-dropdown", "rednose-util"]});
