/*jshint boss:true, expr:true, onevar:false */

/**
Provides a navigation bar.

@module rednose-navbar
**/
var Navbar;

/**
Provides a navigation bar.

@class NavBar
@namespace Rednose
@constructor
@extends Widget
**/
Navbar = Y.Base.create('navbar', Y.Widget, [], {
    // -- Public Properties ----------------------------------------------------

    /**
    Default template.

    @property templateContainer
    @type String
    @public
    **/
    templateContainer: '<div class="navbar navbar-inverse navbar-fixed-top">' +
                           '<div class="navbar-inner">' +
                               '<div class="container">' +
                                   '<a class="brand brand-navbar" data-url="{url}" href="#">{title}</a>' +
                                   '<ul class="nav rednose-menu-primary"></ul>' +
                                   '<ul class="nav pull-right rednose-menu-secondary"></ui>' +
                               '</div>' +
                           '</div>' +
                       '</div>',

    /**
    Column template, used when attribute `columnLayout` is true.

    @property templateColumn
    @type String
    @public
    **/
    templateColumn: '<div class="navbar navbar-inverse navbar-fixed-top rednose-navbar-column">' +
                        '<div class="navbar-inner">' +
                            '<a class="brand brand-navbar rednose-brand" data-url="{url}" href="#">{title}</a>' +
                            '<ul class="nav rednose-menu-primary"></ul>' +
                            '<ul class="nav pull-right rednose-menu-secondary"></ui>' +
                        '</div>' +
                    '</div>',

    /**
    @property itemTemplate
    @type String
    @public
    **/
    itemTemplate: '<li class="dropdown">' +
                      '<a href="#" class="dropdown-toggle" data-toggle="dropdown">{icon}{title} <b class="caret"></a>' +
                  '</li>',

    // -- Lifecycle Methods ----------------------------------------------------

    /**
    @method initializer
    @protected
    **/
    initializer: function () {
        var container = this.get('contentBox');

        // Prevent default URL behaviour.
        container.delegate('click', this._prevent, 'a', this);

        // Bind the handler for clicking on menu items.
        container.delegate('click', this._handleClick, '.dropdown-menu a', this);
        container.delegate('click', this._handleClick, 'ul.nav > li.nav-item > a', this);

        // Bind the handler for clicking on the brand.
        container.delegate('click', this._handleClick, 'a.brand', this);
    },

    /**
    @method destructor
    @protected
    **/
    destructor: function () {
        this.templateContainer = null;
        this.templateColumn    = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    @method renderUI
    @public
    **/
    renderUI: function() {
        var menuLeft  = this.get('menu'),
            menuRight = this.get('menuSecondary'),
            template  = this.get('columnLayout') ? this.templateColumn : this.templateContainer,
            title     = this.get('title'),
            url       = this.get('url'),
            self      = this;

        this.get('contentBox').setHTML(Y.Lang.sub(template, {
            title: title,
            url  : url
        }));

        Y.Array.each(menuLeft, function (menu) {
            self._renderItem(menu);
        });

        Y.Array.each(menuRight, function (menu) {
            self._renderItem(menu, 'right');
        });
    },

    /**
    @method bindUI
    @public
    **/
    bindUI: function() {
//        this._userDropdown.plug(Y.Rednose.Plugin.Dropdown, {
//            showCaret: false,
//
//            items: [
//                { title: this.get('strings.user_settings'), url: YUI.Env.routing.settings },
//                { type: 'divider' },
//                { title: this.get('strings.user_sign_out'), url: YUI.Env.routing.logout }
//            ]
//        });

//        var container = this.get('contentBox');
//
//        container.all('.dropdown-toggle').each(function (node) {
//            node.plug(Y.Bootstrap.Dropdown);
//        });
    },

    /**
    @method getNode
    @param {String} id Menu entry id
    @return {Node}
    @public
    **/
    getNode: function (id) {
        var container = this.get('contentBox');

        return container.one('[data-id=' + id + ']');
    },

    /**
    @method enable
    @param {String} id Menu entry id
    @public
    **/
    enable: function (id) {
        this.disable(id, true);
    },

    /**
    @method disable
    @param {String} id Menu entry id
    @param {Boolean} _enable Toggle the enabled state
    **/
    disable: function (id, _enable) {
        var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        if (_enable) {
            node.ancestor('li').removeClass('disabled');
        } else {
            node.ancestor('li').addClass('disabled');
        }
    },

    /**
    @method rename
    @param {String} id Menu entry id
    @param {Array} title The new name
    **/
    rename: function (id, title) {
        var container = this.get('contentBox'),
            node      = container.one('[data-id=' + id + ']');

        node.setHTML(title);
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

        var container = this.get('contentBox'),
            parent    = container.one(position === 'left' ? '.rednose-menu-primary' : '.rednose-menu-secondary');

        var item = Y.Node.create(Y.Lang.sub(this.itemTemplate, {
            title: config.title,
            icon : config.icon ? '<i class="icon icon-white ' + m.icon + '"></i> ' : ''
        }));

        parent.append(item);

        if (config.items) {
            var anchor = item.one('a');

            anchor.plug(Y.Rednose.Plugin.Dropdown, {
                showCaret: false,
                items    : config.items
            });

            anchor.dropdown.addTarget(this);
        }
    },

    /**
    @method _appendMenu
    @param {Array} menu Menu config
    @param {Array} secondary Secondary menu config
    @param {Node} parentMenu node
    @protected
    **/
    _appendMenu: function (menu, secondary, parentMenu) {
        var container = this.get('contentBox'),
            self      = this;

        Y.Array.each(menu, function (m) {
            if (m.items) {
                var dropdown = Y.Node.create(
                    Y.Lang.sub(self.dropdownTemplate, {
                        title  : m.title,
                        icon   : m.icon ? '<i class="icon icon-white ' + m.icon + '"></i> ' : '',
                        submenu: (typeof(parentMenu) !== 'undefined' ? '-submenu' : ''),
                        caret  : (typeof(parentMenu) === 'undefined' ? "b class=caret" : 'b')
                    })
                );

                Y.Array.each(m.items, function (i) {
                    li = self._createLi(i, dropdown);

                    dropdown.one('.dropdown-menu').append(li);
                });

                if (typeof(parentMenu) === 'undefined') {
                    container.one(secondary === false ? '.nav' : '.pull-right').append(dropdown);
                } else {
                    parentMenu.one('.dropdown-menu').append(dropdown);
                }
            } else {
                var li = self._createLi(m);

                li.addClass('nav-item');

                container.one(secondary === false ? '.nav' : '.pull-right').append(li);
            }
        });
    },

    /**
    @method _createLi
    @param {Object} item
    @param {Object} dropdown
    @protected
    **/
    _createLi: function(item, dropdown) {
        var li = Y.Node.create ('<li tabindex="-1"></li>');

        if (item.title === '-') {
            li.addClass('divider');

            return li;
        }

        if (typeof(item.items) === 'object') {
            return this._appendMenu([ item ], null, dropdown);
        }

        if (item.node instanceof Y.Node && item.node.test('a')) {
            li.append(item.node);

            return li;
        }

        li.append(this._createListItem(item));

        if (typeof(item.disabled) !== 'undefined') {
            li.addClass('disabled');
        }

        return li;
    },

    /**
    @method _createListItem
    @param {Object} item
    @protected
    **/
    _createListItem: function (item) {
        var a    = Y.Node.create('<a tabindex="-1" href="#"></a>'),
            html = item.node || item.title;

        if (item.icon) {
            html = '<i class="icon ' + item.icon + '"></i> ' + html;
        }

        a.set('innerHTML', html);

        if (typeof(item.id) !== 'undefined') {
            a.setAttribute('data-id', item.id);
        }

        if (typeof(item.url) !== 'undefined') {
            a.setAttribute('data-url', item.url);
        }

        if (typeof(item.value) !== 'undefined') {
            a.setAttribute('data-value', item.value);
        }

        return a;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    @method _handleClick
    @param {EventFacade} e Event
    @protected
    **/
    _handleClick: function (e) {
        var node   = e.currentTarget,
            id     = node.getAttribute('data-id'),
            url    = node.getAttribute('data-url'),
            value  = node.getAttribute('data-value');

        if (node.hasClass('dropdown')) {
            return;
        }

        // Ignore clicks on disabled nodes and submenus.
        if (node.ancestor('li')) {
            if (node.ancestor('li').hasClass('disabled') || node.ancestor('li').hasClass('dropdown-submenu')) {
                node.blur();

                return;
            }
        }

        if (id) {
            this.fire(id, { value: value });
        }

        if (node.ancestor('.dropdown')) {
            node.ancestor('.dropdown').one('.dropdown-toggle').simulate('click');
        }

        if (url) {
            document.location.href = url;
        }
    },

    /**
    @method _prevent
    @param {EventFacade} e Event
    @protected
    **/
    _prevent: function (e) {
        e.currentTarget.getAttribute('href') === '#' && e.preventDefault();
    }
}, {
    ATTRS: {
        /**
        @attribute title
        @type String
        **/
        title: {
            value: null
        },

        /**
        @attribute title url
        @type String
        **/
        url: {
            value: ''
        },

        /**
        @attribute menu
        @type Array
        **/
        menu: {
            value: []
        },

        /**
        @attribute menuSecondary
        @type Array
        **/
        menuSecondary: {
            value: []
        },

        /**
        @attribute columnLayout
        @type Boolean
        **/
        columnLayout: {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Navbar = Navbar;
