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
