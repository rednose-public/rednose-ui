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
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].code=["YUI.add('libbit-navbar', function (Y, NAME) {","","var Navbar;","","Navbar = Y.Base.create('navbar', Y.Widget, [], {","    // -- Public Properties ----------------------------------------------------","","    template: Y.Handlebars.compile(","        '<div class=\"navbar navbar-inverse\">' +","            '<div class=\"navbar-inner\" style=\"-webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0;\">' +","                '<a class=\"brand brand-navbar\" href=\"#\">{{ title }}</a>' +","                '<ul class=\"nav\"></ul>' +","                '<ul class=\"nav pull-right\"></ui>' +","            '</div>' +","        '</div>'","    ),","","    dropdownTemplate: Y.Handlebars.compile(","        '<li class=\"dropdown{{ submenu }}\">' +","            '<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">{{ title }} <{{ caret }}></b></a>' +","                '<ul class=\"dropdown-menu\">' +","            '</ul>' +","        '</li>'","    ),","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        var container = this.get('contentBox');","","        // Prevent default URL behaviour.","        container.delegate('click', this._prevent, 'a', this);","","        // Bind the handler for clicking on menu items.","        container.delegate('click', this._handleClick, '.dropdown-menu a', this);","    },","","    // -- Public Methods -------------------------------------------------------","","    renderUI: function() {","        var menuLeft  = this.get('menu'),","            menuRight = this.get('menuSecondary'),","            template  = this.template,","            title     = this.get('title');","","        this.get('contentBox').setHTML(template({ title: title }));","","        this._appendMenu(menuLeft, false);","        this._appendMenu(menuRight, true);","    },","","    bindUI: function() {","        var container = this.get('contentBox');","","        container.all('.dropdown-toggle').plug(Y.Bootstrap.Dropdown);","    },","","    getNode: function (id) {","        var container = this.get('contentBox');","","        return container.one('[data-id=' + id + ']');","    },","","    enable: function (id) {","        this.disable(id);","    },","","    disable: function (id) {","        var container = this.get('contentBox'),","            node = container.one('[data-id=' + id + ']');","","        if (node.ancestor('li').hasClass('disabled')) {","            node.ancestor('li').removeClass('disabled');","        } else {","            node.ancestor('li').addClass('disabled');","        }","    },","","    rename: function (id, title) {","        var container = this.get('contentBox'),","            node = container.one('[data-id=' + id + ']');","","        node.setHTML(title);","    },","","    // -- Protected Methods ----------------------------------------------------","","    _appendMenu: function (menu, secondary, parentMenu) {","        var container = this.get('contentBox');","","        for (var m in menu) {","            var dropdown = Y.Node.create(","                this.dropdownTemplate({","                    title: menu[m].title,","                    submenu: (typeof(parentMenu) !== 'undefined' ? '-submenu' : ''),","                    caret: (typeof(parentMenu) === 'undefined' ? \"b class=caret\" : 'b')","                })","            );","","            for (var i in menu[m].items) {","                var li = Y.Node.create ('<li tabindex=\"-1\"></li>');","","                if (menu[m].items[i].title === '-') {","                    li.addClass('divider');","","                } else if (typeof(menu[m].items[i].children) === 'object') {","                    var subMenu = [ { title: menu[m].items[i].title, items: menu[m].items[i].children } ];","","                    this._appendMenu(subMenu, secondary, dropdown);","                } else {","                    var a  = Y.Node.create('<a tabindex=\"-1\" href=\"#\">' + menu[m].items[i].title + '</a>');","","                    if (typeof(menu[m].items[i].disabled) !== 'undefined') {","                        li.addClass('disabled');","                    }","","                    li.append(a);","","                    if (typeof(menu[m].items[i].id) !== 'undefined') {","                        a.setAttribute('data-id', menu[m].items[i].id);","                    }","                }","","                dropdown.one('.dropdown-menu').append(li);","            }","","            if (typeof(parentMenu) === 'undefined') {","                container.one(secondary === false ? '.nav' : '.pull-right').append(dropdown);","            } else {","                parentMenu.one('.dropdown-menu').append(dropdown);","            }","        }","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleClick: function (e) {","        var node = e.currentTarget,","            id   = node.getAttribute('data-id');","","        // Ignore clicks on disabled nodes and submenus.","        if (node.ancestor('li').hasClass('disabled') || node.ancestor('li').hasClass('dropdown-submenu')) {","            node.blur();","","            return;","        }","","        if (id) {","            this.fire(id);","        }","","        node.ancestor('.dropdown').one('.dropdown-toggle').simulate('click');","    },","","    _prevent: function (e) {","        e.preventDefault();","    }","}, {","    ATTRS: {","        title: {","            value: 'No title'","        },","","        menu: {","            value: []","        },","","        menuSecondary: {","            value: []","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Navbar = Navbar;","","","}, '1.0.0', {\"requires\": [\"handlebars\", \"gallery-bootstrap-dropdown\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].lines = {"1":0,"3":0,"5":0,"29":0,"32":0,"35":0,"41":0,"46":0,"48":0,"49":0,"53":0,"55":0,"59":0,"61":0,"65":0,"69":0,"72":0,"73":0,"75":0,"80":0,"83":0,"89":0,"91":0,"92":0,"100":0,"101":0,"103":0,"104":0,"106":0,"107":0,"109":0,"111":0,"113":0,"114":0,"117":0,"119":0,"120":0,"124":0,"127":0,"128":0,"130":0,"138":0,"142":0,"143":0,"145":0,"148":0,"149":0,"152":0,"156":0,"175":0};
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].functions = {"initializer:28":0,"renderUI:40":0,"bindUI:52":0,"getNode:58":0,"enable:64":0,"disable:68":0,"rename:79":0,"_appendMenu:88":0,"_handleClick:137":0,"_prevent:155":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].coveredLines = 50;
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].coveredFunctions = 11;
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 1);
YUI.add('libbit-navbar', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 3);
var Navbar;

_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 5);
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
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "initializer", 28);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 29);
var container = this.get('contentBox');

        // Prevent default URL behaviour.
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 32);
container.delegate('click', this._prevent, 'a', this);

        // Bind the handler for clicking on menu items.
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 35);
container.delegate('click', this._handleClick, '.dropdown-menu a', this);
    },

    // -- Public Methods -------------------------------------------------------

    renderUI: function() {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "renderUI", 40);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 41);
var menuLeft  = this.get('menu'),
            menuRight = this.get('menuSecondary'),
            template  = this.template,
            title     = this.get('title');

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 46);
this.get('contentBox').setHTML(template({ title: title }));

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 48);
this._appendMenu(menuLeft, false);
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 49);
this._appendMenu(menuRight, true);
    },

    bindUI: function() {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "bindUI", 52);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 53);
var container = this.get('contentBox');

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 55);
container.all('.dropdown-toggle').plug(Y.Bootstrap.Dropdown);
    },

    getNode: function (id) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "getNode", 58);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 59);
var container = this.get('contentBox');

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 61);
return container.one('[data-id=' + id + ']');
    },

    enable: function (id) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "enable", 64);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 65);
this.disable(id);
    },

    disable: function (id) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "disable", 68);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 69);
var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 72);
if (node.ancestor('li').hasClass('disabled')) {
            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 73);
node.ancestor('li').removeClass('disabled');
        } else {
            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 75);
node.ancestor('li').addClass('disabled');
        }
    },

    rename: function (id, title) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "rename", 79);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 80);
var container = this.get('contentBox'),
            node = container.one('[data-id=' + id + ']');

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 83);
node.setHTML(title);
    },

    // -- Protected Methods ----------------------------------------------------

    _appendMenu: function (menu, secondary, parentMenu) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "_appendMenu", 88);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 89);
var container = this.get('contentBox');

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 91);
for (var m in menu) {
            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 92);
var dropdown = Y.Node.create(
                this.dropdownTemplate({
                    title: menu[m].title,
                    submenu: (typeof(parentMenu) !== 'undefined' ? '-submenu' : ''),
                    caret: (typeof(parentMenu) === 'undefined' ? "b class=caret" : 'b')
                })
            );

            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 100);
for (var i in menu[m].items) {
                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 101);
var li = Y.Node.create ('<li tabindex="-1"></li>');

                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 103);
if (menu[m].items[i].title === '-') {
                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 104);
li.addClass('divider');

                } else {_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 106);
if (typeof(menu[m].items[i].children) === 'object') {
                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 107);
var subMenu = [ { title: menu[m].items[i].title, items: menu[m].items[i].children } ];

                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 109);
this._appendMenu(subMenu, secondary, dropdown);
                } else {
                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 111);
var a  = Y.Node.create('<a tabindex="-1" href="#">' + menu[m].items[i].title + '</a>');

                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 113);
if (typeof(menu[m].items[i].disabled) !== 'undefined') {
                        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 114);
li.addClass('disabled');
                    }

                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 117);
li.append(a);

                    _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 119);
if (typeof(menu[m].items[i].id) !== 'undefined') {
                        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 120);
a.setAttribute('data-id', menu[m].items[i].id);
                    }
                }}

                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 124);
dropdown.one('.dropdown-menu').append(li);
            }

            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 127);
if (typeof(parentMenu) === 'undefined') {
                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 128);
container.one(secondary === false ? '.nav' : '.pull-right').append(dropdown);
            } else {
                _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 130);
parentMenu.one('.dropdown-menu').append(dropdown);
            }
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    _handleClick: function (e) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "_handleClick", 137);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 138);
var node = e.currentTarget,
            id   = node.getAttribute('data-id');

        // Ignore clicks on disabled nodes and submenus.
        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 142);
if (node.ancestor('li').hasClass('disabled') || node.ancestor('li').hasClass('dropdown-submenu')) {
            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 143);
node.blur();

            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 145);
return;
        }

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 148);
if (id) {
            _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 149);
this.fire(id);
        }

        _yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 152);
node.ancestor('.dropdown').one('.dropdown-toggle').simulate('click');
    },

    _prevent: function (e) {
        _yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "_prevent", 155);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 156);
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
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 175);
Y.namespace('Libbit').Navbar = Navbar;


}, '1.0.0', {"requires": ["handlebars", "gallery-bootstrap-dropdown"], "skinnable": true});
