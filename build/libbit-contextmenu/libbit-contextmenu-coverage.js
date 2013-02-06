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
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].code=["YUI.add('libbit-contextmenu', function (Y, NAME) {","","var ContextMenu;","","ContextMenu = Y.Base.create('contextMenu', Y.Plugin.Base, [], {","    /**","     * State variable, holds a possible active instance.","     */","    _contextMenu: null,","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function (config) {","        var node         = config.host,","            content      = config.content ? config.content : '',","            bubbleTarget = config.bubbleTarget;","","        this._node = node;","        this._content = this._buildHTML(content);","        this.addTarget(bubbleTarget);","","        node.on('contextmenu', this._handleContextMenu, this);","    },","","    _buildHTML: function(content) {","        var template = '<div class=\"dropdown open\"><ul class=\"dropdown-menu\"></ul></div>';","        var node = Y.Node.create(template);","        var ul = node.one('ul');","","        if (content == '') {","            return content;","        }","","        for (var i in content) {","            var elLi = Y.Node.create('<li>');","            var elA = Y.Node.create('<a href=\"#\">');","","            if (content[i].label !== '-') {","                elA.set('innerHTML', content[i].label);","                elA.setAttribute('data-event', content[i].eventName);","","                elLi.append(elA);","            } else {","                elLi.addClass('divider');","            }","","            ul.append(elLi);","        }","","        return node.get('outerHTML');","    },","","    _handleContextMenu: function (e) {","        var node        = this._node,","            contextMenu = this._contextMenu,","            content     = this._content;","","        // Remove a previous context menu if it exists, ideally we prolly wanna toggle it.","        Y.all('.libbit-context-open').each(function (node) {","            node.removeClass('.libbit-context-open');","            node.contextMenu.destroy();","        });","","        e.preventDefault();","","        contextMenu = new Y.Overlay({","            bodyContent: content,","            visible: false,","            constrain: true,","            zIndex: Y.all('*').size(),","            render: true","        });","","        node.addClass('libbit-context-open');","        node.contextMenu = contextMenu;","","        contextMenu.get('boundingBox').addClass('libbit-context-menu');","","        contextMenu.get('boundingBox').setStyle('left', e.pageX);","        contextMenu.get('boundingBox').setStyle('top', e.pageY);","        contextMenu.show();","","        this._contextMenu = contextMenu;","        this._bindContextMenu();","    },","","    _bindContextMenu: function () {","        var self         = this,","            node         = this._node,","            contextMenu  = this._contextMenu;","","        // Bind the menu events","        contextMenu.get('boundingBox').all('a').each(function() {","            this.on(['click', 'contextmenu'], function (e) {","                var target = e.currentTarget;","","                e.preventDefault();","","                self.fire(target.getAttribute('data-event'), { node : node });","","                contextMenu.destroy();","            });","        });","","        contextMenu.get('boundingBox').all('li').on('mouseenter', function (e) {","            var node = e.currentTarget;","","            if (node.one('i')) {","                node.one('i').addClass('icon-white');","            }","        });","","        contextMenu.get('boundingBox').all('li').on('mouseleave', function (e) {","            var node = e.currentTarget;","","            if (node.one('i') && node.one('i').hasClass('icon-white')) {","                node.one('i').removeClass('icon-white');","            }","        });","","        contextMenu.get('boundingBox').on('clickoutside', function (e) {","            // Dont allow the rightclick mousebutton to hide the contextMenu","            // In some cases browsers (tested on FF17) it will fire false positives and","            // immediately hide the contextmenu again.","            if (e.button !== 3) {","                contextMenu.destroy();","            }","        });","    }","","}, {","    NS : 'contextMenu',","    ATTRS : {}","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').ContextMenu = ContextMenu;","","","}, '1.0.0', {\"requires\": [\"base\", \"panel\", \"plugin\", \"widget\", \"overlay\"]});"];
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].lines = {"1":0,"3":0,"5":0,"15":0,"19":0,"20":0,"21":0,"23":0,"27":0,"28":0,"29":0,"31":0,"32":0,"35":0,"36":0,"37":0,"39":0,"40":0,"41":0,"43":0,"45":0,"48":0,"51":0,"55":0,"60":0,"61":0,"62":0,"65":0,"67":0,"75":0,"76":0,"78":0,"80":0,"81":0,"82":0,"84":0,"85":0,"89":0,"94":0,"95":0,"96":0,"98":0,"100":0,"102":0,"106":0,"107":0,"109":0,"110":0,"114":0,"115":0,"117":0,"118":0,"122":0,"126":0,"127":0,"138":0};
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].functions = {"initializer:14":0,"_buildHTML:26":0,"(anonymous 2):60":0,"_handleContextMenu:54":0,"(anonymous 4):95":0,"(anonymous 3):94":0,"(anonymous 5):106":0,"(anonymous 6):114":0,"(anonymous 7):122":0,"_bindContextMenu:88":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].coveredLines = 56;
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
     * Initializer, gets called upon instance initiation.
     */
    initializer: function (config) {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "initializer", 14);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 15);
var node         = config.host,
            content      = config.content ? config.content : '',
            bubbleTarget = config.bubbleTarget;

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 19);
this._node = node;
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 20);
this._content = this._buildHTML(content);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 21);
this.addTarget(bubbleTarget);

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 23);
node.on('contextmenu', this._handleContextMenu, this);
    },

    _buildHTML: function(content) {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "_buildHTML", 26);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 27);
var template = '<div class="dropdown open"><ul class="dropdown-menu"></ul></div>';
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 28);
var node = Y.Node.create(template);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 29);
var ul = node.one('ul');

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 31);
if (content == '') {
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 32);
return content;
        }

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 35);
for (var i in content) {
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 36);
var elLi = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 37);
var elA = Y.Node.create('<a href="#">');

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 39);
if (content[i].label !== '-') {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 40);
elA.set('innerHTML', content[i].label);
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 41);
elA.setAttribute('data-event', content[i].eventName);

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 43);
elLi.append(elA);
            } else {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 45);
elLi.addClass('divider');
            }

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 48);
ul.append(elLi);
        }

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 51);
return node.get('outerHTML');
    },

    _handleContextMenu: function (e) {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "_handleContextMenu", 54);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 55);
var node        = this._node,
            contextMenu = this._contextMenu,
            content     = this._content;

        // Remove a previous context menu if it exists, ideally we prolly wanna toggle it.
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 60);
Y.all('.libbit-context-open').each(function (node) {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 2)", 60);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 61);
node.removeClass('.libbit-context-open');
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 62);
node.contextMenu.destroy();
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 65);
e.preventDefault();

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 67);
contextMenu = new Y.Overlay({
            bodyContent: content,
            visible: false,
            constrain: true,
            zIndex: Y.all('*').size(),
            render: true
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 75);
node.addClass('libbit-context-open');
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 76);
node.contextMenu = contextMenu;

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 78);
contextMenu.get('boundingBox').addClass('libbit-context-menu');

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 80);
contextMenu.get('boundingBox').setStyle('left', e.pageX);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 81);
contextMenu.get('boundingBox').setStyle('top', e.pageY);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 82);
contextMenu.show();

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 84);
this._contextMenu = contextMenu;
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 85);
this._bindContextMenu();
    },

    _bindContextMenu: function () {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "_bindContextMenu", 88);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 89);
var self         = this,
            node         = this._node,
            contextMenu  = this._contextMenu;

        // Bind the menu events
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 94);
contextMenu.get('boundingBox').all('a').each(function() {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 3)", 94);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 95);
this.on(['click', 'contextmenu'], function (e) {
                _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 4)", 95);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 96);
var target = e.currentTarget;

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 98);
e.preventDefault();

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 100);
self.fire(target.getAttribute('data-event'), { node : node });

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 102);
contextMenu.destroy();
            });
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 106);
contextMenu.get('boundingBox').all('li').on('mouseenter', function (e) {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 5)", 106);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 107);
var node = e.currentTarget;

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 109);
if (node.one('i')) {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 110);
node.one('i').addClass('icon-white');
            }
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 114);
contextMenu.get('boundingBox').all('li').on('mouseleave', function (e) {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 6)", 114);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 115);
var node = e.currentTarget;

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 117);
if (node.one('i') && node.one('i').hasClass('icon-white')) {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 118);
node.one('i').removeClass('icon-white');
            }
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 122);
contextMenu.get('boundingBox').on('clickoutside', function (e) {
            // Dont allow the rightclick mousebutton to hide the contextMenu
            // In some cases browsers (tested on FF17) it will fire false positives and
            // immediately hide the contextmenu again.
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 7)", 122);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 126);
if (e.button !== 3) {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 127);
contextMenu.destroy();
            }
        });
    }

}, {
    NS : 'contextMenu',
    ATTRS : {}
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 138);
Y.namespace('Libbit').ContextMenu = ContextMenu;


}, '1.0.0', {"requires": ["base", "panel", "plugin", "widget", "overlay"]});
