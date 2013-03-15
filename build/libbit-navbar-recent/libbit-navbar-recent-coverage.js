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
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-navbar-recent/libbit-navbar-recent.js",
    code: []
};
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].code=["YUI.add('libbit-navbar-recent', function (Y, NAME) {","","// WIP","","Y.namespace('Libbit.Navbar').Recent = Y.Base.create('recentNavbarPlugin', Y.Plugin.Base, [], {","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        this._host = config.host;","","        var node = this._host.getNode(config.node);","        this.node = node;","        var parent = node.get('parentNode');","","        parent.addClass('dropdown-submenu');","        parent.append(Y.Node.create('<ul class=\"dropdown-menu\"></ul>'));","","        this._updateMenuEntries(node);","    },","","    // -- Public Methods -------------------------------------------------------","","    // TODO: Unique cookie.","    // TODO: Specify the number of items as config param.","    addEntry: function (id, label) {","        var cookie   = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),","            attrs    = { id: id, label: label },","            obj      = Y.JSON.parse(cookie) || [];","","        // Remove duplicate elements.","        Y.each(obj, function (el, key) {","            if (el.id === attrs.id) {","                obj.splice(key, 1);","            }","        });","","        // Prepend.","        obj.unshift(attrs);","","        // Keep the size.","        if (obj.length > 5) {","            obj.pop();","        }","","        // JSON encode the cookie data.","        cookie = Y.JSON.stringify(obj);","","        // Set the sub-cookie.","        Y.Cookie.setSub('docgenadmin', 'templatebuilder', cookie);","","        this._updateMenuEntries(this.node);","    },","","    _updateMenuEntries: function (node) {","        var self   = this,","            cookie = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),","            ul     = node.ancestor('li').one('ul'),","            obj;","","        ul.empty();","","        if (cookie) {","            obj = Y.JSON.parse(cookie);","","            Y.each(obj, function (item) {","                var li = Y.Node.create('<li><a tabindex=\"-1\" href=\"#\"></a></li>');","","                li.one('a').setContent(item.label);","                ul.append(li);","","                li.one('a').on('click', function () {","                    self._host.fire(self.node.getAttribute('data-id'), { id: item.id });","                });","            });","","            if (obj) {","                ul.append(Y.Node.create('<li class=\"divider\"></li>'));","            }","","            var clear = Y.Node.create('<li><a class=\"menu-clearitems\" tabindex=\"-1\" href=\"#\">' + Y.Intl.get('docgenadmin-core').clearitems + '</a></li>');","","            if (!Y.Object.size(obj)) {","                clear.addClass('disabled');","            }","","            ul.append(clear);","","            ul.one('.menu-clearitems').on('click', function (e) {","                // Disable the default URL behaviour.","                e.preventDefault();","","                var target = e.currentTarget;","","                // Ignore clicking on a disabled node.","                if (target.ancestor('li').hasClass('disabled')) {","                    node.blur();","","                    return;","                }","","                // Reset cookie and update.","                Y.Cookie.setSub('docgenadmin', 'templatebuilder', null);","                self._updateMenuEntries(node);","            });","        }","    }","}, {","    NS: 'recent'","});","","","}, '1.0.0', {\"requires\": [\"cookie\", \"plugin\", \"libbit-navbar\"]});"];
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].lines = {"1":0,"5":0,"9":0,"11":0,"12":0,"13":0,"15":0,"16":0,"18":0,"26":0,"31":0,"32":0,"33":0,"38":0,"41":0,"42":0,"46":0,"49":0,"51":0,"55":0,"60":0,"62":0,"63":0,"65":0,"66":0,"68":0,"69":0,"71":0,"72":0,"76":0,"77":0,"80":0,"82":0,"83":0,"86":0,"88":0,"90":0,"92":0,"95":0,"96":0,"98":0,"102":0,"103":0};
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].functions = {"initializer:8":0,"(anonymous 2):31":0,"addEntry:25":0,"(anonymous 4):71":0,"(anonymous 3):65":0,"(anonymous 5):88":0,"_updateMenuEntries:54":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].coveredLines = 43;
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].coveredFunctions = 8;
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 1);
YUI.add('libbit-navbar-recent', function (Y, NAME) {

// WIP

_yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 5);
Y.namespace('Libbit.Navbar').Recent = Y.Base.create('recentNavbarPlugin', Y.Plugin.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "initializer", 8);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 9);
this._host = config.host;

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 11);
var node = this._host.getNode(config.node);
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 12);
this.node = node;
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 13);
var parent = node.get('parentNode');

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 15);
parent.addClass('dropdown-submenu');
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 16);
parent.append(Y.Node.create('<ul class="dropdown-menu"></ul>'));

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 18);
this._updateMenuEntries(node);
    },

    // -- Public Methods -------------------------------------------------------

    // TODO: Unique cookie.
    // TODO: Specify the number of items as config param.
    addEntry: function (id, label) {
        _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "addEntry", 25);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 26);
var cookie   = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),
            attrs    = { id: id, label: label },
            obj      = Y.JSON.parse(cookie) || [];

        // Remove duplicate elements.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 31);
Y.each(obj, function (el, key) {
            _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 2)", 31);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 32);
if (el.id === attrs.id) {
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 33);
obj.splice(key, 1);
            }
        });

        // Prepend.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 38);
obj.unshift(attrs);

        // Keep the size.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 41);
if (obj.length > 5) {
            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 42);
obj.pop();
        }

        // JSON encode the cookie data.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 46);
cookie = Y.JSON.stringify(obj);

        // Set the sub-cookie.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 49);
Y.Cookie.setSub('docgenadmin', 'templatebuilder', cookie);

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 51);
this._updateMenuEntries(this.node);
    },

    _updateMenuEntries: function (node) {
        _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "_updateMenuEntries", 54);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 55);
var self   = this,
            cookie = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),
            ul     = node.ancestor('li').one('ul'),
            obj;

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 60);
ul.empty();

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 62);
if (cookie) {
            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 63);
obj = Y.JSON.parse(cookie);

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 65);
Y.each(obj, function (item) {
                _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 3)", 65);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 66);
var li = Y.Node.create('<li><a tabindex="-1" href="#"></a></li>');

                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 68);
li.one('a').setContent(item.label);
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 69);
ul.append(li);

                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 71);
li.one('a').on('click', function () {
                    _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 4)", 71);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 72);
self._host.fire(self.node.getAttribute('data-id'), { id: item.id });
                });
            });

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 76);
if (obj) {
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 77);
ul.append(Y.Node.create('<li class="divider"></li>'));
            }

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 80);
var clear = Y.Node.create('<li><a class="menu-clearitems" tabindex="-1" href="#">' + Y.Intl.get('docgenadmin-core').clearitems + '</a></li>');

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 82);
if (!Y.Object.size(obj)) {
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 83);
clear.addClass('disabled');
            }

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 86);
ul.append(clear);

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 88);
ul.one('.menu-clearitems').on('click', function (e) {
                // Disable the default URL behaviour.
                _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 5)", 88);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 90);
e.preventDefault();

                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 92);
var target = e.currentTarget;

                // Ignore clicking on a disabled node.
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 95);
if (target.ancestor('li').hasClass('disabled')) {
                    _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 96);
node.blur();

                    _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 98);
return;
                }

                // Reset cookie and update.
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 102);
Y.Cookie.setSub('docgenadmin', 'templatebuilder', null);
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 103);
self._updateMenuEntries(node);
            });
        }
    }
}, {
    NS: 'recent'
});


}, '1.0.0', {"requires": ["cookie", "plugin", "libbit-navbar"]});
