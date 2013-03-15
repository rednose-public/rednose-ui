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
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].code=["YUI.add('libbit-navbar-recent', function (Y, NAME) {","","Y.namespace('Libbit.Navbar').Recent = Y.Base.create('recentNavbarPlugin', Y.Plugin.Base, [], {","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        this._host = config.host;","","        var node = this._host.getNode(config.node);","        this.node = node;","        var parent = node.get('parentNode');","","        parent.addClass('dropdown-submenu');","        parent.append(Y.Node.create('<ul class=\"dropdown-menu\"></ul>'));","","        this._updateMenuEntries(node);","    },","","    // -- Public Methods -------------------------------------------------------","","    // TODO: Unique cookie","    // TODO: Specify size as config param","    addEntry: function (id, label) {","        var cookie   = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),","            attrs    = { id: id, label: label },","            obj      = Y.JSON.parse(cookie) || [];","","        // Remove duplicate elements.","        Y.each(obj, function (el, key) {","            if (el.id === attrs.id) {","                obj.splice(key, 1);","            }","        });","","        // Prepend.","        obj.unshift(attrs);","","        // Keep the size.","        if (obj.length > 5) {","            obj.pop();","        }","","        // JSON encode the cookie data.","        cookie = Y.JSON.stringify(obj);","","        // Set the sub-cookie.","        Y.Cookie.setSub('docgenadmin', 'templatebuilder', cookie);","","        this._updateMenuEntries(this.node);","    },","","    _updateMenuEntries: function (node) {","        // Cookie","        var self   = this,","            cookie = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),","            ul     = node.ancestor('li').one('ul'),","            obj;","","        ul.empty();","","        if (cookie) {","            obj = Y.JSON.parse(cookie);","","            Y.each(obj, function (item) {","                var li = Y.Node.create('<li><a tabindex=\"-1\" href=\"#\"></a></li>');","","                li.one('a').setContent(item.label);","                ul.append(li);","","                li.one('a').on('click', function (e) {","                    self._host.fire(self.node.getAttribute('data-id'), { id: item.id });","                });","            });","","            if (obj) {","                ul.append(Y.Node.create('<li class=\"divider\"></li>'));","            }","","            var clear = Y.Node.create('<li><a class=\"menu-clearitems\" tabindex=\"-1\" href=\"#\">' + Y.Intl.get('docgenadmin-core').clearitems + '</a></li>');","","            if (!Y.Object.size(obj)) {","                clear.addClass('disabled');","            }","","            ul.append(clear);","","            ul.one('.menu-clearitems').on('click', function (e) {","                // Disable the default URL behaviour.","                e.preventDefault();","","                var target = e.currentTarget;","","                // Ignore clicking on a disabled node.","                if (target.ancestor('li').hasClass('disabled')) {","                    node.blur();","","                    return;","                }","","                // Reset cookie and update.","                Y.Cookie.setSub('docgenadmin', 'templatebuilder', null);","                self._updateMenuEntries(node);","            });","        }","    }","}, {","    NS: 'recent'","});","","","}, '1.0.0', {\"requires\": [\"plugin\", \"libbit-navbar\"]});"];
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].lines = {"1":0,"3":0,"7":0,"9":0,"10":0,"11":0,"13":0,"14":0,"16":0,"24":0,"29":0,"30":0,"31":0,"36":0,"39":0,"40":0,"44":0,"47":0,"49":0,"54":0,"59":0,"61":0,"62":0,"64":0,"65":0,"67":0,"68":0,"70":0,"71":0,"75":0,"76":0,"79":0,"81":0,"82":0,"85":0,"87":0,"89":0,"91":0,"94":0,"95":0,"97":0,"101":0,"102":0};
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].functions = {"initializer:6":0,"(anonymous 2):29":0,"addEntry:23":0,"(anonymous 4):70":0,"(anonymous 3):64":0,"(anonymous 5):87":0,"_updateMenuEntries:52":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].coveredLines = 43;
_yuitest_coverage["build/libbit-navbar-recent/libbit-navbar-recent.js"].coveredFunctions = 8;
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 1);
YUI.add('libbit-navbar-recent', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 3);
Y.namespace('Libbit.Navbar').Recent = Y.Base.create('recentNavbarPlugin', Y.Plugin.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "initializer", 6);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 7);
this._host = config.host;

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 9);
var node = this._host.getNode(config.node);
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 10);
this.node = node;
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 11);
var parent = node.get('parentNode');

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 13);
parent.addClass('dropdown-submenu');
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 14);
parent.append(Y.Node.create('<ul class="dropdown-menu"></ul>'));

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 16);
this._updateMenuEntries(node);
    },

    // -- Public Methods -------------------------------------------------------

    // TODO: Unique cookie
    // TODO: Specify size as config param
    addEntry: function (id, label) {
        _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "addEntry", 23);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 24);
var cookie   = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),
            attrs    = { id: id, label: label },
            obj      = Y.JSON.parse(cookie) || [];

        // Remove duplicate elements.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 29);
Y.each(obj, function (el, key) {
            _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 2)", 29);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 30);
if (el.id === attrs.id) {
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 31);
obj.splice(key, 1);
            }
        });

        // Prepend.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 36);
obj.unshift(attrs);

        // Keep the size.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 39);
if (obj.length > 5) {
            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 40);
obj.pop();
        }

        // JSON encode the cookie data.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 44);
cookie = Y.JSON.stringify(obj);

        // Set the sub-cookie.
        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 47);
Y.Cookie.setSub('docgenadmin', 'templatebuilder', cookie);

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 49);
this._updateMenuEntries(this.node);
    },

    _updateMenuEntries: function (node) {
        // Cookie
        _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "_updateMenuEntries", 52);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 54);
var self   = this,
            cookie = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),
            ul     = node.ancestor('li').one('ul'),
            obj;

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 59);
ul.empty();

        _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 61);
if (cookie) {
            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 62);
obj = Y.JSON.parse(cookie);

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 64);
Y.each(obj, function (item) {
                _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 3)", 64);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 65);
var li = Y.Node.create('<li><a tabindex="-1" href="#"></a></li>');

                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 67);
li.one('a').setContent(item.label);
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 68);
ul.append(li);

                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 70);
li.one('a').on('click', function (e) {
                    _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 4)", 70);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 71);
self._host.fire(self.node.getAttribute('data-id'), { id: item.id });
                });
            });

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 75);
if (obj) {
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 76);
ul.append(Y.Node.create('<li class="divider"></li>'));
            }

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 79);
var clear = Y.Node.create('<li><a class="menu-clearitems" tabindex="-1" href="#">' + Y.Intl.get('docgenadmin-core').clearitems + '</a></li>');

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 81);
if (!Y.Object.size(obj)) {
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 82);
clear.addClass('disabled');
            }

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 85);
ul.append(clear);

            _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 87);
ul.one('.menu-clearitems').on('click', function (e) {
                // Disable the default URL behaviour.
                _yuitest_coverfunc("build/libbit-navbar-recent/libbit-navbar-recent.js", "(anonymous 5)", 87);
_yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 89);
e.preventDefault();

                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 91);
var target = e.currentTarget;

                // Ignore clicking on a disabled node.
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 94);
if (target.ancestor('li').hasClass('disabled')) {
                    _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 95);
node.blur();

                    _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 97);
return;
                }

                // Reset cookie and update.
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 101);
Y.Cookie.setSub('docgenadmin', 'templatebuilder', null);
                _yuitest_coverline("build/libbit-navbar-recent/libbit-navbar-recent.js", 102);
self._updateMenuEntries(node);
            });
        }
    }
}, {
    NS: 'recent'
});


}, '1.0.0', {"requires": ["plugin", "libbit-navbar"]});
