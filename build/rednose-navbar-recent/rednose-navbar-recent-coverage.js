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
_yuitest_coverage["build/rednose-navbar-recent/rednose-navbar-recent.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/rednose-navbar-recent/rednose-navbar-recent.js",
    code: []
};
_yuitest_coverage["build/rednose-navbar-recent/rednose-navbar-recent.js"].code=["YUI.add('rednose-navbar-recent', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**","Provides a navigation bar plugin to show a list of recent entries.","","@module rednose-navbar-recent","**/","","/**","Provides a navigation bar plugin to show a list of recent entries.","","@class Recent","@namespace Rednose.NavBar","@constructor","@extends Plugin.Base","@extensionfor Rednose.NavBar","**/","Y.namespace('Rednose.Navbar').Recent = Y.Base.create('recentNavbarPlugin', Y.Plugin.Base, [], {","    // -- Lifecycle Methods ----------------------------------------------------","","    /**","    @method initializer","    @protected","    **/","    initializer: function (config) {","        // TODO: Remove dependency on docgenadmin.","        this._host = config.host;","","        var node = this._host.getNode(config.node);","        this.node = node;","","        var parent = node.get('parentNode');","","        parent.addClass('dropdown-submenu');","        parent.append(Y.Node.create('<ul class=\"dropdown-menu\"></ul>'));","","        this._updateMenuEntries(node);","    },","","    /**","    @method destructor","    @protected","    **/","    destructor: function () {","        this.node = null;","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","    @method addEntry","    @param {String} id Unique id","    @param {String} label Menu entry label","    @public","    **/","    addEntry: function (id, label) {","        // TODO: Unique cookie.","        // TODO: Specify the number of items as config param.","        var cookie   = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),","            attrs    = { id: id, label: label },","            obj      = Y.JSON.parse(cookie) || [];","","        // Remove duplicate elements.","        Y.each(obj, function (el, key) {","            if (el.id === attrs.id) {","                obj.splice(key, 1);","            }","        });","","        // Prepend.","        obj.unshift(attrs);","","        // Keep the size.","        if (obj.length > 5) {","            obj.pop();","        }","","        // JSON encode the cookie data.","        cookie = Y.JSON.stringify(obj);","","        // Set the sub-cookie.","        Y.Cookie.setSub('docgenadmin', 'templatebuilder', cookie);","","        this._updateMenuEntries(this.node);","    },","","    /**","    @method _updateMenuEntries","    @param {Node} node Parent node","    @protected","    **/","    _updateMenuEntries: function (node) {","        // XXX: WIP","        var self   = this,","            cookie = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),","            ul     = node.ancestor('li').one('ul'),","            obj;","","        ul.empty();","","        if (cookie) {","            obj = Y.JSON.parse(cookie);","","            Y.each(obj, function (item) {","                var li = Y.Node.create('<li><a tabindex=\"-1\" href=\"#\"></a></li>');","","                li.one('a').setContent(item.label);","                ul.append(li);","","                li.one('a').on('click', function () {","                    self._host.fire(self.node.getAttribute('data-id'), { id: item.id });","                });","            });","","            if (obj) {","                ul.append(Y.Node.create('<li class=\"divider\"></li>'));","            }","","            var clear = Y.Node.create(","                '<li>' +","                    '<a class=\"menu-clearitems\" tabindex=\"-1\" href=\"#\">' + Y.Intl.get('docgenadmin-core').clearitems + '</a>' +","                '</li>'","            );","","            if (!Y.Object.size(obj)) {","                clear.addClass('disabled');","            }","","            ul.append(clear);","","            ul.one('.menu-clearitems').on('click', function (e) {","                // Disable the default URL behaviour.","                e.preventDefault();","","                var target = e.currentTarget;","","                // Ignore clicking on a disabled node.","                if (target.ancestor('li').hasClass('disabled')) {","                    node.blur();","","                    return;","                }","","                // Reset cookie and update.","                Y.Cookie.setSub('docgenadmin', 'templatebuilder', null);","                self._updateMenuEntries(node);","            });","        }","    }","}, {","    NS: 'recent'","});","","","}, '1.1.0-DEV', {\"requires\": [\"cookie\", \"plugin\", \"rednose-navbar\"]});"];
_yuitest_coverage["build/rednose-navbar-recent/rednose-navbar-recent.js"].lines = {"1":0,"20":0,"29":0,"31":0,"32":0,"34":0,"36":0,"37":0,"39":0,"47":0,"61":0,"66":0,"67":0,"68":0,"73":0,"76":0,"77":0,"81":0,"84":0,"86":0,"96":0,"101":0,"103":0,"104":0,"106":0,"107":0,"109":0,"110":0,"112":0,"113":0,"117":0,"118":0,"121":0,"127":0,"128":0,"131":0,"133":0,"135":0,"137":0,"140":0,"141":0,"143":0,"147":0,"148":0};
_yuitest_coverage["build/rednose-navbar-recent/rednose-navbar-recent.js"].functions = {"initializer:27":0,"destructor:46":0,"(anonymous 2):66":0,"addEntry:58":0,"(anonymous 4):112":0,"(anonymous 3):106":0,"(anonymous 5):133":0,"_updateMenuEntries:94":0,"(anonymous 1):1":0};
_yuitest_coverage["build/rednose-navbar-recent/rednose-navbar-recent.js"].coveredLines = 44;
_yuitest_coverage["build/rednose-navbar-recent/rednose-navbar-recent.js"].coveredFunctions = 9;
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 1);
YUI.add('rednose-navbar-recent', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
Provides a navigation bar plugin to show a list of recent entries.

@module rednose-navbar-recent
**/

/**
Provides a navigation bar plugin to show a list of recent entries.

@class Recent
@namespace Rednose.NavBar
@constructor
@extends Plugin.Base
@extensionfor Rednose.NavBar
**/
_yuitest_coverfunc("build/rednose-navbar-recent/rednose-navbar-recent.js", "(anonymous 1)", 1);
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 20);
Y.namespace('Rednose.Navbar').Recent = Y.Base.create('recentNavbarPlugin', Y.Plugin.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------

    /**
    @method initializer
    @protected
    **/
    initializer: function (config) {
        // TODO: Remove dependency on docgenadmin.
        _yuitest_coverfunc("build/rednose-navbar-recent/rednose-navbar-recent.js", "initializer", 27);
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 29);
this._host = config.host;

        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 31);
var node = this._host.getNode(config.node);
        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 32);
this.node = node;

        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 34);
var parent = node.get('parentNode');

        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 36);
parent.addClass('dropdown-submenu');
        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 37);
parent.append(Y.Node.create('<ul class="dropdown-menu"></ul>'));

        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 39);
this._updateMenuEntries(node);
    },

    /**
    @method destructor
    @protected
    **/
    destructor: function () {
        _yuitest_coverfunc("build/rednose-navbar-recent/rednose-navbar-recent.js", "destructor", 46);
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 47);
this.node = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
    @method addEntry
    @param {String} id Unique id
    @param {String} label Menu entry label
    @public
    **/
    addEntry: function (id, label) {
        // TODO: Unique cookie.
        // TODO: Specify the number of items as config param.
        _yuitest_coverfunc("build/rednose-navbar-recent/rednose-navbar-recent.js", "addEntry", 58);
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 61);
var cookie   = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),
            attrs    = { id: id, label: label },
            obj      = Y.JSON.parse(cookie) || [];

        // Remove duplicate elements.
        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 66);
Y.each(obj, function (el, key) {
            _yuitest_coverfunc("build/rednose-navbar-recent/rednose-navbar-recent.js", "(anonymous 2)", 66);
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 67);
if (el.id === attrs.id) {
                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 68);
obj.splice(key, 1);
            }
        });

        // Prepend.
        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 73);
obj.unshift(attrs);

        // Keep the size.
        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 76);
if (obj.length > 5) {
            _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 77);
obj.pop();
        }

        // JSON encode the cookie data.
        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 81);
cookie = Y.JSON.stringify(obj);

        // Set the sub-cookie.
        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 84);
Y.Cookie.setSub('docgenadmin', 'templatebuilder', cookie);

        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 86);
this._updateMenuEntries(this.node);
    },

    /**
    @method _updateMenuEntries
    @param {Node} node Parent node
    @protected
    **/
    _updateMenuEntries: function (node) {
        // XXX: WIP
        _yuitest_coverfunc("build/rednose-navbar-recent/rednose-navbar-recent.js", "_updateMenuEntries", 94);
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 96);
var self   = this,
            cookie = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),
            ul     = node.ancestor('li').one('ul'),
            obj;

        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 101);
ul.empty();

        _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 103);
if (cookie) {
            _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 104);
obj = Y.JSON.parse(cookie);

            _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 106);
Y.each(obj, function (item) {
                _yuitest_coverfunc("build/rednose-navbar-recent/rednose-navbar-recent.js", "(anonymous 3)", 106);
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 107);
var li = Y.Node.create('<li><a tabindex="-1" href="#"></a></li>');

                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 109);
li.one('a').setContent(item.label);
                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 110);
ul.append(li);

                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 112);
li.one('a').on('click', function () {
                    _yuitest_coverfunc("build/rednose-navbar-recent/rednose-navbar-recent.js", "(anonymous 4)", 112);
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 113);
self._host.fire(self.node.getAttribute('data-id'), { id: item.id });
                });
            });

            _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 117);
if (obj) {
                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 118);
ul.append(Y.Node.create('<li class="divider"></li>'));
            }

            _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 121);
var clear = Y.Node.create(
                '<li>' +
                    '<a class="menu-clearitems" tabindex="-1" href="#">' + Y.Intl.get('docgenadmin-core').clearitems + '</a>' +
                '</li>'
            );

            _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 127);
if (!Y.Object.size(obj)) {
                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 128);
clear.addClass('disabled');
            }

            _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 131);
ul.append(clear);

            _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 133);
ul.one('.menu-clearitems').on('click', function (e) {
                // Disable the default URL behaviour.
                _yuitest_coverfunc("build/rednose-navbar-recent/rednose-navbar-recent.js", "(anonymous 5)", 133);
_yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 135);
e.preventDefault();

                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 137);
var target = e.currentTarget;

                // Ignore clicking on a disabled node.
                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 140);
if (target.ancestor('li').hasClass('disabled')) {
                    _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 141);
node.blur();

                    _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 143);
return;
                }

                // Reset cookie and update.
                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 147);
Y.Cookie.setSub('docgenadmin', 'templatebuilder', null);
                _yuitest_coverline("build/rednose-navbar-recent/rednose-navbar-recent.js", 148);
self._updateMenuEntries(node);
            });
        }
    }
}, {
    NS: 'recent'
});


}, '1.1.0-DEV', {"requires": ["cookie", "plugin", "rednose-navbar"]});
