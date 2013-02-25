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
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-contextmenu/libbit-contextmenu.js",
    code: []
};
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].code=["YUI.add('libbit-contextmenu', function (Y, NAME) {","","var ContextMenu;","","ContextMenu = Y.Base.create('contextMenu', Y.Plugin.Base, [], {","    /**","     * State variable, holds a possible active instance.","     */","    _contextMenu: null,","","    /**","     * A model to send with the event, optional.","     */","    model: null,","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function (config) {","        var node         = config.host,","            content      = config.content ? config.content : '',","            bubbleTarget = config.bubbleTarget;","","        this._node = node;","        this._content = this._buildHTML(content);","        this.addTarget(bubbleTarget);","","        if (typeof config.model !== 'undefined') {","            this.model = model;","        }","","        node.on('contextmenu', this._handleContextMenu, this);","    },","","    _buildHTML: function(content) {","        var template = '<div class=\"dropdown open\"><ul class=\"dropdown-menu\"></ul></div>';","        var node = Y.Node.create(template);","        var ul = node.one('ul');","","        if (content == '') {","            return content;","        }","","        for (var i in content) {","            var elLi = Y.Node.create('<li>');","            var elA = Y.Node.create('<a href=\"#\">');","","            if (content[i].label !== '-') {","                elA.set('innerHTML', content[i].label);","                elA.setAttribute('data-event', content[i].eventName);","","                elLi.append(elA);","            } else {","                elLi.addClass('divider');","            }","","            ul.append(elLi);","        }","","        return node.get('outerHTML');","    },","","    _handleContextMenu: function (e) {","        var node        = this._node,","            contextMenu = this._contextMenu,","            content     = this._content;","","        // Remove a previous context menu if it exists, ideally we prolly wanna toggle it.","        Y.all('.libbit-context-open').each(function (node) {","            node.removeClass('.libbit-context-open');","            node.contextMenu.destroy();","        });","","        e.preventDefault();","","        contextMenu = new Y.Overlay({","            bodyContent: content,","            visible: false,","            constrain: true,","            zIndex: Y.all('*').size(),","            render: true","        });","","        node.addClass('libbit-context-open');","        node.contextMenu = contextMenu;","","        contextMenu.get('boundingBox').addClass('libbit-context-menu');","","        contextMenu.get('boundingBox').setStyle('left', e.pageX);","        contextMenu.get('boundingBox').setStyle('top', e.pageY);","        contextMenu.show();","","        this._contextMenu = contextMenu;","        this._bindContextMenu();","    },","","    _bindContextMenu: function () {","        var self         = this,","            node         = this._node,","            contextMenu  = this._contextMenu;","","        // Bind the menu events","        contextMenu.get('boundingBox').all('a').each(function() {","            this.on(['click', 'contextmenu'], function (e) {","                var target = e.currentTarget,","                    args = { node: node };","","                e.preventDefault();","","                if (self.model !== null) {","                    args.model = self.model;","                }","","                self.fire(target.getAttribute('data-event'), args);","","                contextMenu.destroy();","            });","        });","","        contextMenu.get('boundingBox').all('li').on('mouseenter', function (e) {","            var node = e.currentTarget;","","            if (node.one('i')) {","                node.one('i').addClass('icon-white');","            }","        });","","        contextMenu.get('boundingBox').all('li').on('mouseleave', function (e) {","            var node = e.currentTarget;","","            if (node.one('i') && node.one('i').hasClass('icon-white')) {","                node.one('i').removeClass('icon-white');","            }","        });","","        contextMenu.get('boundingBox').on('clickoutside', function (e) {","            // Dont allow the rightclick mousebutton to hide the contextMenu","            // In some cases browsers (tested on FF17) it will fire false positives and","            // immediately hide the contextmenu again.","            if (e.button !== 3) {","                contextMenu.destroy();","            }","        });","    }","","}, {","    NS : 'contextMenu',","    ATTRS : {}","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').ContextMenu = ContextMenu;","","","}, '1.0.0', {\"requires\": [\"base\", \"panel\", \"plugin\", \"widget\", \"overlay\"]});"];
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].lines = {"1":0,"3":0,"5":0,"20":0,"24":0,"25":0,"26":0,"28":0,"29":0,"32":0,"36":0,"37":0,"38":0,"40":0,"41":0,"44":0,"45":0,"46":0,"48":0,"49":0,"50":0,"52":0,"54":0,"57":0,"60":0,"64":0,"69":0,"70":0,"71":0,"74":0,"76":0,"84":0,"85":0,"87":0,"89":0,"90":0,"91":0,"93":0,"94":0,"98":0,"103":0,"104":0,"105":0,"108":0,"110":0,"111":0,"114":0,"116":0,"120":0,"121":0,"123":0,"124":0,"128":0,"129":0,"131":0,"132":0,"136":0,"140":0,"141":0,"152":0};
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].functions = {"initializer:19":0,"_buildHTML:35":0,"(anonymous 2):69":0,"_handleContextMenu:63":0,"(anonymous 4):104":0,"(anonymous 3):103":0,"(anonymous 5):120":0,"(anonymous 6):128":0,"(anonymous 7):136":0,"_bindContextMenu:97":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].coveredLines = 60;
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].coveredFunctions = 11;
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 1);
YUI.add('libbit-contextmenu', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 3);
var ContextMenu;

_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 5);
ContextMenu = Y.Base.create('contextMenu', Y.Plugin.Base, [], {
    /**
     * State variable, holds a possible active instance.
     */
    _contextMenu: null,

    /**
     * A model to send with the event, optional.
     */
    model: null,

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function (config) {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "initializer", 19);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 20);
var node         = config.host,
            content      = config.content ? config.content : '',
            bubbleTarget = config.bubbleTarget;

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 24);
this._node = node;
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 25);
this._content = this._buildHTML(content);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 26);
this.addTarget(bubbleTarget);

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 28);
if (typeof config.model !== 'undefined') {
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 29);
this.model = model;
        }

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 32);
node.on('contextmenu', this._handleContextMenu, this);
    },

    _buildHTML: function(content) {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "_buildHTML", 35);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 36);
var template = '<div class="dropdown open"><ul class="dropdown-menu"></ul></div>';
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 37);
var node = Y.Node.create(template);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 38);
var ul = node.one('ul');

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 40);
if (content == '') {
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 41);
return content;
        }

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 44);
for (var i in content) {
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 45);
var elLi = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 46);
var elA = Y.Node.create('<a href="#">');

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 48);
if (content[i].label !== '-') {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 49);
elA.set('innerHTML', content[i].label);
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 50);
elA.setAttribute('data-event', content[i].eventName);

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 52);
elLi.append(elA);
            } else {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 54);
elLi.addClass('divider');
            }

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 57);
ul.append(elLi);
        }

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 60);
return node.get('outerHTML');
    },

    _handleContextMenu: function (e) {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "_handleContextMenu", 63);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 64);
var node        = this._node,
            contextMenu = this._contextMenu,
            content     = this._content;

        // Remove a previous context menu if it exists, ideally we prolly wanna toggle it.
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 69);
Y.all('.libbit-context-open').each(function (node) {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 2)", 69);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 70);
node.removeClass('.libbit-context-open');
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 71);
node.contextMenu.destroy();
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 74);
e.preventDefault();

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 76);
contextMenu = new Y.Overlay({
            bodyContent: content,
            visible: false,
            constrain: true,
            zIndex: Y.all('*').size(),
            render: true
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 84);
node.addClass('libbit-context-open');
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 85);
node.contextMenu = contextMenu;

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 87);
contextMenu.get('boundingBox').addClass('libbit-context-menu');

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 89);
contextMenu.get('boundingBox').setStyle('left', e.pageX);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 90);
contextMenu.get('boundingBox').setStyle('top', e.pageY);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 91);
contextMenu.show();

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 93);
this._contextMenu = contextMenu;
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 94);
this._bindContextMenu();
    },

    _bindContextMenu: function () {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "_bindContextMenu", 97);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 98);
var self         = this,
            node         = this._node,
            contextMenu  = this._contextMenu;

        // Bind the menu events
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 103);
contextMenu.get('boundingBox').all('a').each(function() {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 3)", 103);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 104);
this.on(['click', 'contextmenu'], function (e) {
                _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 4)", 104);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 105);
var target = e.currentTarget,
                    args = { node: node };

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 108);
e.preventDefault();

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 110);
if (self.model !== null) {
                    _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 111);
args.model = self.model;
                }

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 114);
self.fire(target.getAttribute('data-event'), args);

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 116);
contextMenu.destroy();
            });
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 120);
contextMenu.get('boundingBox').all('li').on('mouseenter', function (e) {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 5)", 120);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 121);
var node = e.currentTarget;

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 123);
if (node.one('i')) {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 124);
node.one('i').addClass('icon-white');
            }
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 128);
contextMenu.get('boundingBox').all('li').on('mouseleave', function (e) {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 6)", 128);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 129);
var node = e.currentTarget;

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 131);
if (node.one('i') && node.one('i').hasClass('icon-white')) {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 132);
node.one('i').removeClass('icon-white');
            }
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 136);
contextMenu.get('boundingBox').on('clickoutside', function (e) {
            // Dont allow the rightclick mousebutton to hide the contextMenu
            // In some cases browsers (tested on FF17) it will fire false positives and
            // immediately hide the contextmenu again.
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 7)", 136);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 140);
if (e.button !== 3) {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 141);
contextMenu.destroy();
            }
        });
    }

}, {
    NS : 'contextMenu',
    ATTRS : {}
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 152);
Y.namespace('Libbit').ContextMenu = ContextMenu;


}, '1.0.0', {"requires": ["base", "panel", "plugin", "widget", "overlay"]});
