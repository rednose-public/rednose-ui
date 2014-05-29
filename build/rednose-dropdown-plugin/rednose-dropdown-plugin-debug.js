YUI.add('rednose-dropdown-plugin', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the `Y.Rednose.Plugin.Dropdown` Node plugin.
 *
 * @module rednose-dropdown
 * @submodule rednose-dropdown-plugin
 */

var Micro = Y.Template.Micro;

/**
 * Node plugin that attaches a dropdown to the given node.
 *
 * @class Rednose.Plugin.Dropdown
 * @constructor
 * @extends Rednose.Dropdown
 * @uses Plugin.Base
 */
Y.namespace('Rednose.Plugin').Dropdown = Y.Base.create('dropdown', Y.Rednose.Dropdown, [Y.Plugin.Base], {

    // -- Life Cycle Methods ---------------------------------------------------

    initializer: function (config) {
        this._host = config.host;

        var container  = this.get('container'),
            dropup     = this.get('dropup'),
            classNames = Y.Rednose.Dropdown.ClassNames,
            templates  = Y.Rednose.Dropdown.Templates;

        container.addClass(classNames.dropdown);

        dropup && container.addClass(classNames.dropup);

        if (this.get('showOnContext')) {
            this._host.on('contextmenu', this._onAnchorContextMenu, this);

            return;
        }

        this._host.addClass(classNames.toggle);

        if (this.get('showCaret')) {
            this._host.setHTML(templates.caret({
                classNames: classNames,
                content   : this._host.getHTML()
            }));
        }

        this._host.on('click', this._onAnchorClick, this);
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * @param {Number} x
     * @param {Number} y
     * @private
     */
    _positionContainer: function (x, y) {
        var container = this.get('container');

        container.setStyles({
            position: 'absolute',
            left    : x,
            top     : y
        });
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param e {EventFacade}
     * @private
     */
    _onAnchorContextMenu: function (e) {
        if (e.shiftKey) {
            return;
        }

        e.preventDefault();

        this._positionContainer(e.pageX, e.pageY);

        this.open();
    },

    /**
     * @param e {EventFacade}
     * @private
     */
    _onAnchorClick: function (e) {
        e.preventDefault();

        this.toggle();
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
         * @initOnly
         */
        dropup: {
            value: false,
            writeOnce: 'initOnly'
        },

        /**
         * Overrides the container, in case a button plug-in the parent node acts
         * as container.
         *
         * The getter should only be called once all extensions have been initialized.
         *
         * @attribute {Node} container
         */
        container: {
            getter: function (value) {
                if (this.get('showOnContext')) {
                    return this._getContainer(value);
                }

                return this._host.get('parentNode');
            }
        }
    }
});

Y.mix(Y.Rednose.Dropdown.ClassNames, {
    caret : 'caret',
    dropup: 'dropup'
});

Y.mix(Y.Rednose.Dropdown.Templates, {
    caret: Micro.compile(
        '<%== data.content %> <span class="<%= data.classNames.caret %>"></span>'
    )
});


}, '1.5.0-DEV', {"requires": ["rednose-dropdown", "node-pluginhost", "plugin"]});
