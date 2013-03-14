if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-navbar/libbit-navbar.js",
    code: []
};
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].code=["YUI.add('libbit-navbar', function (Y, NAME) {","","var Navbar;","","Navbar = Y.Base.create('navbar', Y.Widget, [ ], {","","    template:","        '<div class=\"navbar navbar-inverse\">' +","        '   <div class=\"navbar-inner\" style=\"-webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0;\">' +","        '       <a class=\"brand brand-navbar\" href=\"#\">{{ title }}</a>' +","        '       <ul class=\"nav\">' +","        '       </ul>' +","        '       <ul class=\"nav pull-right\">' +","        '       </ui>' +","        '   </div>' +","        '</div>',","","    dropdownTemplate:","            '<li class=\"dropdown{{ submenu }}\">' +","            '  <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">{{ title }} <{{ caret }}></b></a>' +","            '  <ul class=\"dropdown-menu\">' +","            '  </ul>' +","            '</li>',","","    renderUI: function() {","        this.template = Y.Handlebars.compile(this.template);","        this.dropdownTemplate = Y.Handlebars.compile(this.dropdownTemplate);","","        this.get('contentBox').setHTML(","            this.template({ title: this.get('title') })","        );","","        this._appendMenu(this.get('menu'), false);","        this._appendMenu(this.get('menuSecondary'), true);","    },","","    bindUI: function() {","        var self = this;","        var container = this.get('contentBox');","","        // Prevent default URL behaviour","        container.all('a').on('click', function (e) {","            e.preventDefault();","        });","","        container.all('.dropdown-toggle').plug(Y.Bootstrap.Dropdown);","        container.all('.dropdown-menu > li > a').each(function() {","            this.on('click', function () {","                console.log(e);","","                if (this.ancestor('li').hasClass('disabled')) {","                    this.blur();","","                    return;","                }","","                var id = this.getAttribute('data-id');","","                if (id !== '') {","                    self.fire(id);","                }","","                this.ancestor('.dropdown').one('.dropdown-toggle').simulate('click');","            });","        });","    },","","    _appendMenu: function(menu, secondary, parentMenu) {","        var container = this.get('contentBox');","        var navBarHTML = '';","","        for (var m in menu) {","            var dropdown = Y.Node.create(","                this.dropdownTemplate({","                    title: menu[m].title,","                    submenu: (typeof(parentMenu) !== 'undefined' ? '-submenu' : ''),","                    caret: (typeof(parentMenu) === 'undefined' ? \"b class=caret\" : 'b')","                })","            );","","            for (i in menu[m].items) {","                var li = Y.Node.create ('<li tabindex=\"-1\"></li>');","","                if (menu[m].items[i].title == '-') {","                    li.addClass('divider');","","                } else if (typeof(menu[m].items[i].children) === 'object') {","                    var subMenu = [ { title: menu[m].items[i].title, items: menu[m].items[i].children } ];","","                    this._appendMenu(subMenu, secondary, dropdown);","                } else {","                    var a  = Y.Node.create('<a tabindex=\"-1\" href=\"#\">' + menu[m].items[i].title + '</a>');","","                    if (typeof(menu[m].items[i].disabled) !== 'undefined') {","                        li.addClass('disabled');","                    }","","                    li.append(a);","","                    if (typeof(menu[m].items[i].id) !== 'undefined') {","                        a.setAttribute('data-id', menu[m].items[i].id);","                    }","                }","","                dropdown.one('.dropdown-menu').append(li);","            }","","            if (typeof(parentMenu) === 'undefined') {","                container.one(secondary === false ? '.nav' : '.pull-right').append(dropdown);","            } else {","                parentMenu.one('.dropdown-menu').append(dropdown);","            }","        }","    },","","    enable: function(id) {","        this.disable(id);","    },","","    disable: function(id) {","        var container = this.get('contentBox'),","            node = container.one('[data-id=' + id + ']');","","        if (node.ancestor('li').hasClass('disabled')) {","            node.ancestor('li').removeClass('disabled');","        } else {","            node.ancestor('li').addClass('disabled');","        }","    },","","    rename: function(id, title) {","        var container = this.get('contentBox'),","            node = container.one('[data-id=' + id + ']');","","        node.setHTML(title);","    }","","","}, {","    ATTRS: {","        title: { value: 'No title' },","        menu: { value: [] },","        menuSecondary: { value: [] }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Navbar = Navbar;","","","}, '1.0.0', {\"requires\": [\"handlebars\", \"gallery-bootstrap-dropdown\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].lines = {"1":0,"3":0,"5":0,"26":0,"27":0,"29":0,"33":0,"34":0,"38":0,"39":0,"42":0,"43":0,"46":0,"47":0,"48":0,"49":0,"51":0,"52":0,"54":0,"57":0,"59":0,"60":0,"63":0,"69":0,"70":0,"72":0,"73":0,"81":0,"82":0,"84":0,"85":0,"87":0,"88":0,"90":0,"92":0,"94":0,"95":0,"98":0,"100":0,"101":0,"105":0,"108":0,"109":0,"111":0,"117":0,"121":0,"124":0,"125":0,"127":0,"132":0,"135":0,"148":0};
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].functions = {"renderUI:25":0,"(anonymous 2):42":0,"(anonymous 4):48":0,"(anonymous 3):47":0,"bindUI:37":0,"_appendMenu:68":0,"enable:116":0,"disable:120":0,"rename:131":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].coveredLines = 52;
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].coveredFunctions = 10;
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 1);
YUI.add('libbit-navbar', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 3);
var Navbar;

_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 5);
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
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "renderUI", 25);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 26);
this.template = Y.Handlebars.compile(this.template);
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 27);
this.dropdownTemplate = Y.Handlebars.compile(this.dropdownTemplate);

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 29);
this.get('contentBox').setHTML(
            this.template({ title: this.get('title') })
        );

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 33);
this._appendMenu(this.get('menu'), false);
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 34);
this._appendMenu(this.get('menuSecondary'), true);
    },

    bindUI: function() {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "bindUI", 37);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 38);
var self = this;
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 39);
var container = this.get('contentBox');

        // Prevent default URL behaviour
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 42);
container.all('a').on('click', function (e) {
            _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "(anonymous 2)", 42);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 43);
e.preventDefault();
        });

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 46);
container.all('.dropdown-toggle').plug(Y.Bootstrap.Dropdown);
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 47);
container.all('.dropdown-menu > li > a').each(function() {
            _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "(anonymous 3)", 47);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 48);
this.on('click', function () {
                _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "(anonymous 4)", 48);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 49);
console.log(e);

                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 51);
if (this.ancestor('li').hasClass('disabled')) {
                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 52);
this.blur();

                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 54);
return;
                }

                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 57);
var id = this.getAttribute('data-id');

                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 59);
if (id !== '') {
                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 60);
self.fire(id);
                }

                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 63);
this.ancestor('.dropdown').one('.dropdown-toggle').simulate('click');
            });
        });
    },

    _appendMenu: function(menu, secondary, parentMenu) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "_appendMenu", 68);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 69);
var container = this.get('contentBox');
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 70);
var navBarHTML = '';

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 72);
for (var m in menu) {
            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 73);
var dropdown = Y.Node.create(
                this.dropdownTemplate({
                    title: menu[m].title,
                    submenu: (typeof(parentMenu) !== 'undefined' ? '-submenu' : ''),
                    caret: (typeof(parentMenu) === 'undefined' ? "b class=caret" : 'b')
                })
            );

            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 81);
for (i in menu[m].items) {
                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 82);
var li = Y.Node.create ('<li tabindex="-1"></li>');

                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 84);
if (menu[m].items[i].title == '-') {
                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 85);
li.addClass('divider');

                } else {_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 87);
if (typeof(menu[m].items[i].children) === 'object') {
                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 88);
var subMenu = [ { title: menu[m].items[i].title, items: menu[m].items[i].children } ];

                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 90);
this._appendMenu(subMenu, secondary, dropdown);
                } else {
                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 92);
var a  = Y.Node.create('<a tabindex="-1" href="#">' + menu[m].items[i].title + '</a>');

                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 94);
if (typeof(menu[m].items[i].disabled) !== 'undefined') {
                        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 95);
li.addClass('disabled');
                    }

                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 98);
li.append(a);

                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 100);
if (typeof(menu[m].items[i].id) !== 'undefined') {
                        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 101);
a.setAttribute('data-id', menu[m].items[i].id);
                    }
                }}

                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 105);
dropdown.one('.dropdown-menu').append(li);
            }

            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 108);
if (typeof(parentMenu) === 'undefined') {
                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 109);
container.one(secondary === false ? '.nav' : '.pull-right').append(dropdown);
            } else {
                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 111);
parentMenu.one('.dropdown-menu').append(dropdown);
            }
        }
    },

    enable: function(id) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "enable", 116);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 117);
this.disable(id);
    },

    disable: function(id) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "disable", 120);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 121);
var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 124);
if (node.ancestor('li').hasClass('disabled')) {
            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 125);
node.ancestor('li').removeClass('disabled');
        } else {
            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 127);
node.ancestor('li').addClass('disabled');
        }
    },

    rename: function(id, title) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "rename", 131);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 132);
var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 135);
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
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 148);
Y.namespace('Libbit').Navbar = Navbar;


}, '1.0.0', {"requires": ["handlebars", "gallery-bootstrap-dropdown"], "skinnable": true});
