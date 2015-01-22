YUI.add('rednose-navbar-base', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides a navigation bar.
 *
 * @module rednose-navbar
 * @submodule rednose-navbar-base
 */

/**
 * Provides a navigation bar.
 *
 * @class NavBar.Base
 * @namespace Rednose
 * @constructor
 * @extends View
 */

/**
 * Fired when a button in the toolbar is clicked.
 *
 * You can subscribe to specific items through the following event: "click#id".
 *
 * @event click
 * @param {Rednose.Dropdown.Item} item The dropdown item that was clicked.
 * @param {EventFacade} originEvent Original item event.
 */
var EVT_CLICK = 'click';

var NavbarBase = Y.Base.create('navbar', Y.View, [], {
    // -- Public Properties ----------------------------------------------------

    /**
     * Default template.
     *
     * @property templateContainer
     * @type String
     * @public
      */
    templateContainer: '<div class="navbar navbar-inverse navbar-fixed-top">' +
                           '<div class="navbar-inner">' +
                               '<div class="container">' +
                                   '<a class="brand brand-navbar" href="{url}">{title}</a>' +
                                   '<ul class="nav rednose-menu-primary"></ul>' +
                                   '<ul class="nav pull-right rednose-menu-secondary"></ui>' +
                               '</div>' +
                           '</div>' +
                       '</div>',

    /**
     * Column template, used when attribute `columnLayout` is true.
     *
     * @property templateColumn
     * @type String
     * @public
     */
    templateColumn: '<div class="navbar navbar-inverse navbar-fixed-top rednose-navbar-column">' +
                        '<div class="navbar-inner">' +
                            '<a class="brand brand-navbar rednose-brand" data-url="{url}" href="#">{title}</a>' +
                            '<ul class="nav rednose-menu-primary"></ul>' +
                            '<ul class="nav pull-right rednose-menu-secondary"></ui>' +
                        '</div>' +
                    '</div>',

    /**
     * @property itemTemplate
     * @type String
     * @public
     */
    itemTemplate: '<li class="dropdown" id="{id}">' +
                      '<a href="#" class="dropdown-toggle" data-toggle="dropdown">{icon}<span>{title}</span> <b class="caret"></a>' +
                  '</li>',

    /**
     * Hash of navbar events.
     *
     * @property {Object} _navbarEvents
     * @protected
     */

    /**
     * Hash of published custom events.
     *
     * @property {Object} _published
     * @protected
     */

    /**
     * Map of menu dropdowns.
     *
     * @property {Array} _dropdownMap
     * @protected
     */

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this._navbarEvents || (this._navbarEvents = []);

        this._published   = {};
        this._dropdownMap = [];

        var container = this.get('container');

        this._navbarEvents.push(
            this.after({
                'dropdown:click': this._afterDropdownClick
            }),

            container.delegate('click', this._onBrandClick, '.brand', this)
        );
    },

    destructor: function () {
        (new Y.EventHandle(this._navbarEvents)).detach();

        this.templateContainer = null;
        this.templateColumn    = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @chainable
     * @public
     */
    render: function() {
        var menuLeft  = this.get('menu'),
            menuRight = this.get('menuSecondary'),
            template  = this.get('columnLayout') ? this.templateColumn : this.templateContainer,
            title     = this.get('title'),
            url       = this.get('url'),
            self      = this;

        this.get('container').setHTML(Y.Lang.sub(template, {
            title : title,
            url   : url
        }));

        Y.Array.each(menuLeft, function (menu) {
            self._renderItem(menu);
        });

        Y.Array.each(menuRight, function (menu) {
            self._renderItem(menu, 'right');
        });

        return this;
    },

    /**
     * @method enable
     * @param {String} id Menu entry id
     * @public
     */
    enable: function (id) {
        if (Y.Lang.isArray(id)) {

            Y.each(id, function (v) {
                this.enable(v);
            }, this);

            return this;
        }

        var item = this.getItemById(id);

        if (item) {
            item.enable();
        }
    },

    /**
     * @method disable
     * @param {String} id Menu entry id
     */
    disable: function (id) {
        if (Y.Lang.isArray(id)) {

            Y.each(id, function (v) {
                this.disable(v);
            }, this);

            return this;
        }

        var item = this.getItemById(id);

        if (item) {
            item.disable();
        }
    },

    /**
     * @method activate
     * @param {String} id Menu entry id
     */
    activate: function (id) {
        if (Y.Lang.isArray(id)) {

            Y.each(id, function (v) {
                this.activate(v);
            }, this);

            return this;
        }

        var item = this.getItemById(id);

        if (item) {
            item.activate();
        }
    },

    /**
     * @method deactivate
     * @param {String} id Menu entry id
     */
    deactivate: function (id) {
        if (Y.Lang.isArray(id)) {

            Y.each(id, function (v) {
                this.deactivate(v);
            }, this);

            return this;
        }

        var item = this.getItemById(id);

        if (item) {
            item.deactivate();
        }
    },

    /**
     * @method rename
     * @param {String} id Menu entry id
     * @param {Array} value The new name
     */
    rename: function (id, value) {
        var item = this.getItemById(id);

        if (item) {
            if (item.rename) {
                item.rename(value);
            } else {
                item.one('a > span').set('text', value);
            }
        }
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * Renders a menu item.
     *
     * @param {Object} config
     * @param {String} [position='left']
     * @protected
     */
    _renderItem: function (config, position) {
        position || (position = 'left');

        var container = this.get('container'),
            parent    = container.one(position === 'left' ? '.rednose-menu-primary' : '.rednose-menu-secondary');

        var item = Y.Node.create(Y.Lang.sub(this.itemTemplate, {
            id    : config.id ? config.id  : Y.guid(),
            title : config.title,
            icon  : config.icon ? '<i class="icon icon-white ' + config.icon + '"></i> ' : ''
        }));

        if (config.large) {
            item.addClass('rednose-dropdown-large');
        }

        parent.append(item);

        if (config.items) {
            var anchor = item.one('a');

            anchor.plug(Y.Rednose.Plugin.Dropdown, {
                showCaret: false,
                items    : config.items
            });

            anchor.dropdown.addTarget(this);

            this._dropdownMap.push(anchor.dropdown);
        }
    },

    /**
     * @param {String} id
     * @return {Rednose.Dropdown.Item}
     */
    getItemById: function (id) {
        var container = this.get('container');

        if (item = container.one('[id=' + id + ']')) {
            return item;
        }

        for (var i = 0, len = this._dropdownMap.length; i < len; i++) {
            var dropdown = this._dropdownMap[i],
                item     = dropdown.getItemById(id);

            if (item) {
                return item;
            }
        }

        return null;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _onBrandClick: function (e) {
        var anchor = e.currentTarget;

        if (anchor.getAttribute('href') === '#') {
            e.preventDefault();
        }
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterDropdownClick: function (e) {
        var item = e.item,
            evt  = EVT_CLICK + '#' + item.id;

        if (!this._published[evt]) {
            this._published[evt] = this.publish(evt, {
                defaultFn: this._defItemClickFn
            });
        }

        this.fire(evt, {
            originEvent: e,
            item       : item
        });
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _defItemClickFn: function (e) {
        this.fire(EVT_CLICK, {
            originEvent: e.originEvent,
            item       : e.item
        });
    }
}, {
    ATTRS: {
        /**
         * @attribute title
         * @type String
         */
        title: {
            value: null
        },

        /**
         * @attribute title url
         * @type String
         */
        url: {
            value: '#'
        },

        /**
         * @attribute menu
         * @type Array
         */
        menu: {
            value: []
        },

        /**
         * @attribute menuSecondary
         * @type Array
         */
        menuSecondary: {
            value: []
        },

        /**
         * @attribute columnLayout
         * @type Boolean
         */
        columnLayout: {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Navbar').Base = NavbarBase;

/**
 * @class Navbar
 * @constructor
 * @extends Rednose.Navbar.Base
 * @uses Rednose.Navbar.Keys
 * @namespace Rednose
 */
Y.Rednose.Navbar = Y.mix(Y.Base.create('navbar', NavbarBase, []), Y.Rednose.Navbar, true);


}, '@VERSION@', {"requires": ["json", "node-pluginhost", "rednose-dropdown-plugin", "view"]});
