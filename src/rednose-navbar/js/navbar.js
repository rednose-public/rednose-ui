/*jshint boss:true, expr:true, onevar:false */

/**
Provides a navigation bar.

@module rednose-navbar
**/
var Navbar,

    DEFAULT_TITLE = 'No title';

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
    @property template
    @type String
    @public
    **/
    template: '<div class="navbar navbar-inverse navbar-fixed-top">' +
                  '<div class="navbar-inner">' +
                      '<div class="container">' +
                          '<a class="brand brand-navbar" data-url="{url}" href="#">{title}</a>' +
                          '<ul class="nav"></ul>' +
                          '<ul class="nav pull-right"></ui>' +
                      '</div>' +
                  '</div>' +
              '</div>',

    /**
    @property dropdownTemplate
    @type String
    @public
    **/
    dropdownTemplate: '<li class="dropdown{submenu}">' +
                          '<a href="#" class="dropdown-toggle" data-toggle="dropdown">{title} <{caret}></a>' +
                          '<ul class="dropdown-menu">' +
                          '</ul>' +
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
        this.template         = null;
        this.dropdownTemplate = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    @method renderUI
    @public
    **/
    renderUI: function() {
        var menuLeft  = this.get('menu'),
            menuRight = this.get('menuSecondary'),
            template  = this.template,
            title     = this.get('title'),
            url       = this.get('url');

        this.get('contentBox').setHTML(Y.Lang.sub(template, { title: title, url: url }));

        this._appendMenu(menuLeft, false);
        this._appendMenu(menuRight, true);
    },

    /**
    @method bindUI
    @public
    **/
    bindUI: function() {
        var container = this.get('contentBox');

        container.all('.dropdown-toggle').each(function (node) {
            node.plug(Y.Bootstrap.Dropdown);
        });
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
    @public
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
    @public
    **/
    rename: function (id, title) {
        var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        node.setHTML(title);
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    @method _appendMenu
    @param {Array} menu Menu config
    @param {Array} secondary Secondary menu config
    @param {Node} Parent node
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

    // -- Protected Event Handlers ---------------------------------------------

    /**
    @method _createLi
    @param {Object} item
    @protected
    **/
    _createLi: function(i, dropdown) {
        var self =  this;
        var li = Y.Node.create ('<li tabindex="-1"></li>');

        if (i.title === '-') {
            li.addClass('divider');

        } else if (typeof(i.items) === 'object') {
            self._appendMenu(Array(i), null, dropdown);

            return;
        } else {
            var a = Y.Node.create('<a tabindex="-1" href="#">' + i.title + '</a>');

            if (typeof(i.disabled) !== 'undefined') {
                li.addClass('disabled');
            }

            li.append(a);

            if (typeof(i.id) !== 'undefined') {
                a.setAttribute('data-id', i.id);
            }

            if (typeof(i.url) !== 'undefined') {
                a.setAttribute('data-url', i.url);
            }
        }

        return li;
    },

    /**
    @method _handleClick
    @param {EventFacade} e Event
    @protected
    **/
    _handleClick: function (e) {
        var node = e.currentTarget,
            id   = node.getAttribute('data-id'),
            url  = node.getAttribute('data-url');

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

        if (url) {
            document.location.href = url;

            return;
        }

        if (id) {
            this.fire(id);
        }

        if (node.ancestor('.dropdown')) {
            node.ancestor('.dropdown').one('.dropdown-toggle').simulate('click');
        }
    },

    /**
    @method _prevent
    @param {EventFacade} e Event
    @protected
    **/
    _prevent: function (e) {
        e.preventDefault();
    }
}, {
    ATTRS: {
        /**
        @attribute title
        @type String
        **/
        title: {
            value: DEFAULT_TITLE,
        },

        /**
        @attribute title url
        @type String
        **/
        url: {
            value: '',
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
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Navbar = Navbar;
