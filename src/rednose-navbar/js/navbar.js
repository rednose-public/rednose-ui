var Navbar;

Navbar = Y.Base.create('navbar', Y.Widget, [], {
    // -- Public Properties ----------------------------------------------------

    template: Y.Handlebars.compile(
        '<div class="navbar navbar-inverse">' +
            '<div class="navbar-inner" style="-webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0;">' +
                '<a class="brand brand-navbar" href="#">{{ title }}</a>' +
                '<ul class="nav"></ul>' +
                '<ul class="nav pull-right"></ui>' +
            '</div>' +
        '</div>'
    ),

    dropdownTemplate: Y.Handlebars.compile(
        '<li class="dropdown{{ submenu }}">' +
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown">{{ title }} <{{ caret }}></b></a>' +
                '<ul class="dropdown-menu">' +
            '</ul>' +
        '</li>'
    ),

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        var container = this.get('contentBox');

        // Prevent default URL behaviour.
        container.delegate('click', this._prevent, 'a', this);

        // Bind the handler for clicking on menu items.
        container.delegate('click', this._handleClick, '.dropdown-menu a', this);
    },

    // -- Public Methods -------------------------------------------------------

    renderUI: function() {
        var menuLeft  = this.get('menu'),
            menuRight = this.get('menuSecondary'),
            template  = this.template,
            title     = this.get('title');

        this.get('contentBox').setHTML(template({ title: title }));

        this._appendMenu(menuLeft, false);
        this._appendMenu(menuRight, true);
    },

    bindUI: function() {
        var container = this.get('contentBox');

        container.all('.dropdown-toggle').plug(Y.Bootstrap.Dropdown);
    },

    getNode: function (id) {
        var container = this.get('contentBox');

        return container.one('[data-id=' + id + ']');
    },

    enable: function (id) {
        this.disable(id, true);
    },

    disable: function (id, _enable) {
        var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        if (_enable) {
            node.ancestor('li').removeClass('disabled');
        } else {
            node.ancestor('li').addClass('disabled');
        }
    },

    rename: function (id, title) {
        var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        node.setHTML(title);
    },

    // -- Protected Methods ----------------------------------------------------

    _appendMenu: function (menu, secondary, parentMenu) {
        var container = this.get('contentBox');

        for (var m in menu) {
            var dropdown = Y.Node.create(
                this.dropdownTemplate({
                    title: menu[m].title,
                    submenu: (typeof(parentMenu) !== 'undefined' ? '-submenu' : ''),
                    caret: (typeof(parentMenu) === 'undefined' ? "b class=caret" : 'b')
                })
            );

            for (var i in menu[m].items) {
                var li = Y.Node.create ('<li tabindex="-1"></li>');

                if (menu[m].items[i].title === '-') {
                    li.addClass('divider');

                } else if (typeof(menu[m].items[i].children) === 'object') {
                    var subMenu = [ { title: menu[m].items[i].title, items: menu[m].items[i].children } ];

                    this._appendMenu(subMenu, secondary, dropdown);
                } else {
                    var a  = Y.Node.create('<a tabindex="-1" href="#">' + menu[m].items[i].title + '</a>');

                    if (typeof(menu[m].items[i].disabled) !== 'undefined') {
                        li.addClass('disabled');
                    }

                    li.append(a);

                    if (typeof(menu[m].items[i].id) !== 'undefined') {
                        a.setAttribute('data-id', menu[m].items[i].id);
                    }
                }

                dropdown.one('.dropdown-menu').append(li);
            }

            if (typeof(parentMenu) === 'undefined') {
                container.one(secondary === false ? '.nav' : '.pull-right').append(dropdown);
            } else {
                parentMenu.one('.dropdown-menu').append(dropdown);
            }
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    _handleClick: function (e) {
        var node = e.currentTarget,
            id   = node.getAttribute('data-id');

        // Ignore clicks on disabled nodes and submenus.
        if (node.ancestor('li').hasClass('disabled') || node.ancestor('li').hasClass('dropdown-submenu')) {
            node.blur();

            return;
        }

        if (id) {
            this.fire(id);
        }

        node.ancestor('.dropdown').one('.dropdown-toggle').simulate('click');
    },

    _prevent: function (e) {
        e.preventDefault();
    }
}, {
    ATTRS: {
        title: {
            value: 'No title'
        },

        menu: {
            value: []
        },

        menuSecondary: {
            value: []
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Navbar = Navbar;
