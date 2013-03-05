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
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].code=["YUI.add('libbit-contextmenu', function (Y, NAME) {","","var ContextMenu;","","ContextMenu = Y.Base.create('contextMenu', Y.Plugin.Base, [], {","    /**","     * State variable, holds a possible active instance.","     */","    _contextMenu: null,","","    /**","     * Optional data object, to pass with the event","     */","     data: null,","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function (config) {","        var node         = config.host,","            content      = config.content ? config.content : '',","            bubbleTarget = config.bubbleTarget;","","        this._node = node;","        this._content = this._buildHTML(content);","        this.addTarget(bubbleTarget);","","        if (typeof config.data !== 'undefined') {","            this.data = config.data;","        }","","        node.on('contextmenu', this._handleContextMenu, this);","    },","","    _buildHTML: function(content) {","        var template = '<div class=\"dropdown open\"><ul class=\"dropdown-menu\"></ul></div>';","        var node = Y.Node.create(template);","        var ul = node.one('ul');","","        if (content == '') {","            return content;","        }","","        for (var i in content) {","            var elLi = Y.Node.create('<li>');","            var elA = Y.Node.create('<a href=\"#\">');","","            if (content[i].title !== '-') {","                elA.set('innerHTML', content[i].title);","                elA.setAttribute('data-id', content[i].id);","","                elLi.append(elA);","","                if (content[i].disabled === true) {","                    elLi.addClass('disabled');","                    elA.addClass('disabled');","                }","            } else {","                elLi.addClass('divider');","            }","","            ul.append(elLi);","        }","","        return node.get('outerHTML');","    },","","    _handleContextMenu: function (e) {","        var node        = this._node,","            contextMenu = this._contextMenu,","            content     = this._content;","","        // Remove a previous context menu if it exists, ideally we prolly wanna toggle it.","        Y.all('.libbit-context-open').each(function (node) {","            node.removeClass('.libbit-context-open');","            node.contextMenu.destroy();","        });","","        e.preventDefault();","","        contextMenu = new Y.Overlay({","            bodyContent: content,","            visible: false,","            constrain: true,","            zIndex: Y.all('*').size(),","            render: true","        });","","        node.addClass('libbit-context-open');","        node.contextMenu = contextMenu;","","        contextMenu.get('boundingBox').addClass('libbit-context-menu');","","        contextMenu.get('boundingBox').setStyle('left', e.pageX);","        contextMenu.get('boundingBox').setStyle('top', e.pageY);","        contextMenu.show();","","        this._contextMenu = contextMenu;","        this._bindContextMenu();","    },","","    _bindContextMenu: function () {","        var self         = this,","            node         = this._node,","            contextMenu  = this._contextMenu;","","        // Bind the menu events","        contextMenu.get('boundingBox').all('a').each(function() {","            this.on(['click', 'contextmenu'], function (e) {","                var target = e.currentTarget,","                    args = { node: node };","","                e.preventDefault();","","                if (target.hasClass('disabled') !== true) {","                    if (self.data !== null) {","                        args.data = self.data;","                    }","","                    self.fire(target.getAttribute('data-id'), args);","","                    contextMenu.destroy();","                } else {","                    target.blur();","                }","            });","        });","","        contextMenu.get('boundingBox').all('li').on('mouseenter', function (e) {","            var node = e.currentTarget;","","            if (node.one('i')) {","                node.one('i').addClass('icon-white');","            }","        });","","        contextMenu.get('boundingBox').all('li').on('mouseleave', function (e) {","            var node = e.currentTarget;","","            if (node.one('i') && node.one('i').hasClass('icon-white')) {","                node.one('i').removeClass('icon-white');","            }","        });","","        contextMenu.get('boundingBox').on('clickoutside', function (e) {","            // Dont allow the rightclick mousebutton to hide the contextMenu","            // In some cases a browser (tested on FF17) will fire false positives and","            // immediately hide the contextmenu again.","            if (e.button !== 3) {","                contextMenu.destroy();","            }","        });","    }","","}, {","    NS : 'contextMenu',","    ATTRS : {}","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').ContextMenu = ContextMenu;","","","}, '1.0.0', {\"requires\": [\"base\", \"panel\", \"plugin\", \"widget\", \"overlay\"]});"];
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].lines = {"1":0,"3":0,"5":0,"20":0,"24":0,"25":0,"26":0,"28":0,"29":0,"32":0,"36":0,"37":0,"38":0,"40":0,"41":0,"44":0,"45":0,"46":0,"48":0,"49":0,"50":0,"52":0,"54":0,"55":0,"56":0,"59":0,"62":0,"65":0,"69":0,"74":0,"75":0,"76":0,"79":0,"81":0,"89":0,"90":0,"92":0,"94":0,"95":0,"96":0,"98":0,"99":0,"103":0,"108":0,"109":0,"110":0,"113":0,"115":0,"116":0,"117":0,"120":0,"122":0,"124":0,"129":0,"130":0,"132":0,"133":0,"137":0,"138":0,"140":0,"141":0,"145":0,"149":0,"150":0,"161":0};
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].functions = {"initializer:19":0,"_buildHTML:35":0,"(anonymous 2):74":0,"_handleContextMenu:68":0,"(anonymous 4):109":0,"(anonymous 3):108":0,"(anonymous 5):129":0,"(anonymous 6):137":0,"(anonymous 7):145":0,"_bindContextMenu:102":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-contextmenu/libbit-contextmenu.js"].coveredLines = 65;
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
     * Optional data object, to pass with the event
     */
     data: null,

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
if (typeof config.data !== 'undefined') {
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 29);
this.data = config.data;
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
if (content[i].title !== '-') {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 49);
elA.set('innerHTML', content[i].title);
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 50);
elA.setAttribute('data-id', content[i].id);

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 52);
elLi.append(elA);

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 54);
if (content[i].disabled === true) {
                    _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 55);
elLi.addClass('disabled');
                    _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 56);
elA.addClass('disabled');
                }
            } else {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 59);
elLi.addClass('divider');
            }

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 62);
ul.append(elLi);
        }

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 65);
return node.get('outerHTML');
    },

    _handleContextMenu: function (e) {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "_handleContextMenu", 68);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 69);
var node        = this._node,
            contextMenu = this._contextMenu,
            content     = this._content;

        // Remove a previous context menu if it exists, ideally we prolly wanna toggle it.
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 74);
Y.all('.libbit-context-open').each(function (node) {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 2)", 74);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 75);
node.removeClass('.libbit-context-open');
            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 76);
node.contextMenu.destroy();
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 79);
e.preventDefault();

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 81);
contextMenu = new Y.Overlay({
            bodyContent: content,
            visible: false,
            constrain: true,
            zIndex: Y.all('*').size(),
            render: true
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 89);
node.addClass('libbit-context-open');
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 90);
node.contextMenu = contextMenu;

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 92);
contextMenu.get('boundingBox').addClass('libbit-context-menu');

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 94);
contextMenu.get('boundingBox').setStyle('left', e.pageX);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 95);
contextMenu.get('boundingBox').setStyle('top', e.pageY);
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 96);
contextMenu.show();

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 98);
this._contextMenu = contextMenu;
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 99);
this._bindContextMenu();
    },

    _bindContextMenu: function () {
        _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "_bindContextMenu", 102);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 103);
var self         = this,
            node         = this._node,
            contextMenu  = this._contextMenu;

        // Bind the menu events
        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 108);
contextMenu.get('boundingBox').all('a').each(function() {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 3)", 108);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 109);
this.on(['click', 'contextmenu'], function (e) {
                _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 4)", 109);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 110);
var target = e.currentTarget,
                    args = { node: node };

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 113);
e.preventDefault();

                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 115);
if (target.hasClass('disabled') !== true) {
                    _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 116);
if (self.data !== null) {
                        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 117);
args.data = self.data;
                    }

                    _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 120);
self.fire(target.getAttribute('data-id'), args);

                    _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 122);
contextMenu.destroy();
                } else {
                    _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 124);
target.blur();
                }
            });
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 129);
contextMenu.get('boundingBox').all('li').on('mouseenter', function (e) {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 5)", 129);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 130);
var node = e.currentTarget;

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 132);
if (node.one('i')) {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 133);
node.one('i').addClass('icon-white');
            }
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 137);
contextMenu.get('boundingBox').all('li').on('mouseleave', function (e) {
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 6)", 137);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 138);
var node = e.currentTarget;

            _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 140);
if (node.one('i') && node.one('i').hasClass('icon-white')) {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 141);
node.one('i').removeClass('icon-white');
            }
        });

        _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 145);
contextMenu.get('boundingBox').on('clickoutside', function (e) {
            // Dont allow the rightclick mousebutton to hide the contextMenu
            // In some cases a browser (tested on FF17) will fire false positives and
            // immediately hide the contextmenu again.
            _yuitest_coverfunc("build/libbit-contextmenu/libbit-contextmenu.js", "(anonymous 7)", 145);
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 149);
if (e.button !== 3) {
                _yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 150);
contextMenu.destroy();
            }
        });
    }

}, {
    NS : 'contextMenu',
    ATTRS : {}
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-contextmenu/libbit-contextmenu.js", 161);
Y.namespace('Libbit').ContextMenu = ContextMenu;


}, '1.0.0', {"requires": ["base", "panel", "plugin", "widget", "overlay"]});
