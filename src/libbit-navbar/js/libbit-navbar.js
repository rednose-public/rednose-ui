var Navbar;

Navbar = Y.Base.create('navbar', Y.Widget, [ ], {

    template:
        '<div class="navbar navbar-inverse">' +
        '   <div class="navbar-inner">' +
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

        this.appendMenu(this.get('menu'), false);
        this.appendMenu(this.get('menuSecondary'), true);
    },

    bindUI: function() {
        var self = this;
        var container = this.get('contentBox');

        container.all('.dropdown-toggle').plug(Y.Bootstrap.Dropdown);
        container.all('.dropdown-menu > li > a').each(function() {
            this.on('click', function() {
                var eventName = this.getAttribute('data-eventname');

                if (eventName !== '') {
                    self.fire(eventName);
                }

                this.ancestor('.dropdown').one('.dropdown-toggle').simulate('click');
            });
        });
    },

    appendMenu: function(menu, secondary, parentMenu) {
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
                var li = Y.Node.create ('<li></li>');

                if (menu[m].items[i].title == '-') {
                    li.addClass('divider');

                } else if (typeof(menu[m].items[i].children) === 'object') {
                    var subMenu = [ { title: menu[m].items[i].title, items: menu[m].items[i].children } ];

                    this.appendMenu(subMenu, secondary, dropdown);
                } else {
                    var a  = Y.Node.create('<a href="#">' + menu[m].items[i].title + '</a>');

                    li.append(a);

                    if (typeof(menu[m].items[i].eventName) !== 'undefined') {
                        a.setAttribute('data-eventname', menu[m].items[i].eventName);
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

}, {
    ATTRS: {
        title: { value: 'No title' },
        menu: { value: [] },
        menuSecondary: { value: [] }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Navbar = Navbar;
