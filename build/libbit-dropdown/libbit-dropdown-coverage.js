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
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-dropdown/libbit-dropdown.js",
    code: []
};
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].code=["YUI.add('libbit-dropdown', function (Y, NAME) {","","var Dropdown;","","Dropdown = Y.Base.create('dropdown', Y.Bootstrap.Dropdown, [], {","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        var node      = this._node,","            menuNode  = null,","            content   = this.config.content ? this.config.content : '',","            direction = this.config.dropup ? 'dropup' : 'dropdown';","","        node.wrap('<div class=\"dropdown-wrapper ' + direction + '\"></div>');","        node.addClass('dropdown-toggle');","        node.setAttribute('data-toggle', 'dropdown');","","        menuNode = node.get('parentNode');","        menuNode.append(this._buildHTML(","            this.get('content')","        ));","","        // Close the dropdown on click.","        menuNode.delegate('click', function(e) {","            e.preventDefault();","","            if (e.target.getAttribute('data-id')) {","                node.dropdown.fire(e.target.getAttribute('data-id'));","            }","","            node.dropdown.toggle();","        }, 'a');","","        this.set('node', menuNode);","    },","","    _buildHTML: function(content) {","        var template = '<ul class=\"dropdown-menu\"></ul>';","        var node = Y.Node.create(template);","","        if (content == '') {","            return content;","        }","","        for (var i in content) {","            var elLi = Y.Node.create('<li>');","            var elA = Y.Node.create('<a href=\"#\">');","","            if (content[i].className) {","                elLi.addClass(content[i].className);","            }","","            if (content[i].title !== '-') {","                elA.set('innerHTML', content[i].title);","                elA.setAttribute('data-id', content[i].id);","","                if (content[i].icon) {","                    var icon = Y.Node.create('<i></i>');","","                    icon.addClass('icon-' + content[i].icon);","","                    elA.prepend(icon);","                }","","                elLi.append(elA);","","                if (content[i].disabled === true) {","                    elLi.addClass('disabled');","                    elA.addClass('disabled');","                }","            } else {","                elLi.addClass('divider');","            }","","            node.append(elLi);","        }","","        return node.get('outerHTML');","    },","","    enable: function(id) {","        this.disable(id);","    },","","    disable: function(id) {","        var container = this.get('node'),","            node = container.one('[data-id=' + id + ']');","","        if (node.ancestor('li').hasClass('disabled')) {","            node.ancestor('li').removeClass('disabled');","        } else {","            node.ancestor('li').addClass('disabled');","        }","    },","","    rename: function(id, title) {","        var container = this.get('node'),","            node = container.one('[data-id=' + id + ']');","","        node.setHTML(title);","    }","}, {","    NS : 'dropdown',","    ATTRS : {","        content: { value: [] },","        node: { value: null }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Dropdown = Dropdown;","","","}, '1.0.0', {\"requires\": [\"gallery-bootstrap-dropdown\"]});"];
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].lines = {"1":0,"3":0,"5":0,"10":0,"15":0,"16":0,"17":0,"19":0,"20":0,"25":0,"26":0,"28":0,"29":0,"32":0,"35":0,"39":0,"40":0,"42":0,"43":0,"46":0,"47":0,"48":0,"50":0,"51":0,"54":0,"55":0,"56":0,"58":0,"59":0,"61":0,"63":0,"66":0,"68":0,"69":0,"70":0,"73":0,"76":0,"79":0,"83":0,"87":0,"90":0,"91":0,"93":0,"98":0,"101":0,"112":0};
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].functions = {"(anonymous 2):25":0,"initializer:9":0,"_buildHTML:38":0,"enable:82":0,"disable:86":0,"rename:97":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].coveredLines = 46;
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].coveredFunctions = 7;
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 1);
YUI.add('libbit-dropdown', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-dropdown/libbit-dropdown.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 3);
var Dropdown;

_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 5);
Dropdown = Y.Base.create('dropdown', Y.Bootstrap.Dropdown, [], {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-dropdown/libbit-dropdown.js", "initializer", 9);
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 10);
var node      = this._node,
            menuNode  = null,
            content   = this.config.content ? this.config.content : '',
            direction = this.config.dropup ? 'dropup' : 'dropdown';

        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 15);
node.wrap('<div class="dropdown-wrapper ' + direction + '"></div>');
        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 16);
node.addClass('dropdown-toggle');
        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 17);
node.setAttribute('data-toggle', 'dropdown');

        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 19);
menuNode = node.get('parentNode');
        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 20);
menuNode.append(this._buildHTML(
            this.get('content')
        ));

        // Close the dropdown on click.
        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 25);
menuNode.delegate('click', function(e) {
            _yuitest_coverfunc("build/libbit-dropdown/libbit-dropdown.js", "(anonymous 2)", 25);
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 26);
e.preventDefault();

            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 28);
if (e.target.getAttribute('data-id')) {
                _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 29);
node.dropdown.fire(e.target.getAttribute('data-id'));
            }

            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 32);
node.dropdown.toggle();
        }, 'a');

        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 35);
this.set('node', menuNode);
    },

    _buildHTML: function(content) {
        _yuitest_coverfunc("build/libbit-dropdown/libbit-dropdown.js", "_buildHTML", 38);
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 39);
var template = '<ul class="dropdown-menu"></ul>';
        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 40);
var node = Y.Node.create(template);

        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 42);
if (content == '') {
            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 43);
return content;
        }

        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 46);
for (var i in content) {
            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 47);
var elLi = Y.Node.create('<li>');
            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 48);
var elA = Y.Node.create('<a href="#">');

            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 50);
if (content[i].className) {
                _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 51);
elLi.addClass(content[i].className);
            }

            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 54);
if (content[i].title !== '-') {
                _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 55);
elA.set('innerHTML', content[i].title);
                _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 56);
elA.setAttribute('data-id', content[i].id);

                _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 58);
if (content[i].icon) {
                    _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 59);
var icon = Y.Node.create('<i></i>');

                    _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 61);
icon.addClass('icon-' + content[i].icon);

                    _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 63);
elA.prepend(icon);
                }

                _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 66);
elLi.append(elA);

                _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 68);
if (content[i].disabled === true) {
                    _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 69);
elLi.addClass('disabled');
                    _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 70);
elA.addClass('disabled');
                }
            } else {
                _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 73);
elLi.addClass('divider');
            }

            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 76);
node.append(elLi);
        }

        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 79);
return node.get('outerHTML');
    },

    enable: function(id) {
        _yuitest_coverfunc("build/libbit-dropdown/libbit-dropdown.js", "enable", 82);
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 83);
this.disable(id);
    },

    disable: function(id) {
        _yuitest_coverfunc("build/libbit-dropdown/libbit-dropdown.js", "disable", 86);
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 87);
var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 90);
if (node.ancestor('li').hasClass('disabled')) {
            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 91);
node.ancestor('li').removeClass('disabled');
        } else {
            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 93);
node.ancestor('li').addClass('disabled');
        }
    },

    rename: function(id, title) {
        _yuitest_coverfunc("build/libbit-dropdown/libbit-dropdown.js", "rename", 97);
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 98);
var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 101);
node.setHTML(title);
    }
}, {
    NS : 'dropdown',
    ATTRS : {
        content: { value: [] },
        node: { value: null }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 112);
Y.namespace('Libbit').Dropdown = Dropdown;


}, '1.0.0', {"requires": ["gallery-bootstrap-dropdown"]});
