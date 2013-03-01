YUI.add('libbit-navbar', function (Y, NAME) {

var Navbar;

Navbar = Y.Base.create('navbar', Y.Widget, [ ], {

    template:
        '<div class="navbar navbar-inverse">' +
        '   <div class="navbar-inner" style="-webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0;">' +
        '       <a class="brand brand-navbar" href="#">{{ title }}</a>' +
        '       <ul class="nav">' +
        '       </ul>' +
        '       <ul class="nav pull-right">' +
        '       </ui>' +
        '   </div>' +
        '</div>',

    dropdownTemplate:
            '<li class="dropdown{{ submenu }}">' +
            '  <a href="#" class="dropdown-toggle" data-toggle="dropdown">{{ title }} <{{ caret }}></b></a>' +
            '  <ul class="dropdown-menu">' +
            '  </ul>' +
            '</li>',

    renderUI: function() {
        this.template = Y.Handlebars.compile(this.template);
        this.dropdownTemplate = Y.Handlebars.compile(this.dropdownTemplate);

        this.get('contentBox').setHTML(
            this.template({ title: this.get('title') })
        );

        this._appendMenu(this.get('menu'), false);
        this._appendMenu(this.get('menuSecondary'), true);
    },

    bindUI: function() {
        var self = this;
        var container = this.get('contentBox');

        container.all('.dropdown-toggle').plug(Y.Bootstrap.Dropdown);
        container.all('.dropdown-menu > li > a').each(function() {
            this.on('click', function() {
                if (this.ancestor('li').hasClass('disabled')) {
                    this.blur();

                    return;
                }

                var id = this.getAttribute('data-id');

                if (id !== '') {
                    self.fire(id);
                }

                this.ancestor('.dropdown').one('.dropdown-toggle').simulate('click');
            });
        });
    },

    _appendMenu: function(menu, secondary, parentMenu) {
        var container = this.get('contentBox');
        var navBarHTML = '';

        for (var m in menu) {
            var dropdown = Y.Node.create(
                this.dropdownTemplate({
                    title: menu[m].title,
                    submenu: (typeof(parentMenu) !== 'undefined' ? '-submenu' : ''),
                    caret: (typeof(parentMenu) === 'undefined' ? "b class=caret" : 'b')
                })
            );

            for (i in menu[m].items) {
                var li = Y.Node.create ('<li tabindex="-1"></li>');

                if (menu[m].items[i].title == '-') {
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

    enable: function(id) {
        this.disable(id);
    },

    disable: function(id) {
        var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        if (node.ancestor('li').hasClass('disabled')) {
            node.ancestor('li').removeClass('disabled');
        } else {
            node.ancestor('li').addClass('disabled');
        }
    },

    rename: function(id, title) {
        var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        node.setHTML(title);
    }


}, {
    ATTRS: {
        title: { value: 'No title' },
        menu: { value: [] },
        menuSecondary: { value: [] }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Navbar = Navbar;


}, '1.0.0', {"requires": ["handlebars", "gallery-bootstrap-dropdown"], "skinnable": true});
