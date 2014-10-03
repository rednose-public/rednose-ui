YUI.add('rednose-dropdown-delegate', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the `Y.Rednose.Plugin.Dropdown` Delegate.
 *
 * @module rednose-dropdown
 * @submodule rednose-dropdown-delegate
 */

/**
 * @class Rednose.Dropdown.Delegate
 * @constructor
 * @extends Base
 */
var Delegate = Y.Base.create('dropdown', Y.Base, [], {

    /**
     * @property {Rednose.Dropdown[]} _instances
     * @protected
     */

    // -- Life Cycle Methods ---------------------------------------------------

    initializer: function () {
        this._eventHandles || (this._eventHandles = []);

        this._instances = [];

        var container = this.get('container'),
            nodes     = this.get('nodes');

        this._eventHandles.push(
            container.delegate('contextmenu', this._handleContextMenu, nodes, this)
        );
    },

    destructor: function () {
        (new Y.EventHandle(this._eventHandles)).detach();

        Y.Array.each(this._instances, function (instance) {
            instance.destroy();
        });

        this._instances = null;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param e {EventFacade}
     * @private
     */
    _handleContextMenu: function (e) {
        if (e.shiftKey) {
            return;
        }

        // Prevent default context menu.
        e.preventDefault();
        e.stopPropagation();

        var node = e.currentTarget;

        if (!node.dropdown) {
            node.plug(Y.Rednose.Plugin.Dropdown, {
                showOnContext: true,
                propagate    : false
            });

            this._instances.push(node.dropdown);
            node.dropdown.addTarget(this);
        }

        node.dropdown._onAnchorContextMenu.apply(node.dropdown, arguments);
    }
}, {
    NS: 'dropdown',

    ATTRS: {

        /**
         * @attribute {Node} container
         * @default null
         * @initOnly
         */
        container: {
            value: Y.one('body'),
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {String} nodes
         * @default null
         * @initOnly
         */
        nodes: {
            value: '.rednose-dropdown',
            writeOnce: 'initOnly'
        }
    }
});

Y.namespace('Rednose.Dropdown').Delegate = Delegate;


}, '1.6.0-dev', {"requires": ["rednose-dropdown-plugin"]});
