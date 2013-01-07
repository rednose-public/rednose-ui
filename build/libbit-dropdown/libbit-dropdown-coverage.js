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
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].code=["YUI.add('libbit-dropdown', function (Y, NAME) {","","var Dropdown;","","Dropdown = Y.Base.create('dropdown', Y.Bootstrap.Dropdown, [], {","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        var node      = this._node,","            menuNode  = null,","            content   = this.config.content ? this.config.content : '',","            direction = this.config.dropup ? 'dropup' : 'dropdown';","","        node.wrap('<div class=\"dropdown-wrapper ' + direction + '\"></div>');","        node.addClass('dropdown-toggle');","        node.setAttribute('data-toggle', 'dropdown');","","        menuNode = node.get('parentNode');","        menuNode.append(Y.Node.create(content));","","        // Close the dropdown on click.","        menuNode.delegate('click', function(e) {","            e.preventDefault();","            node.dropdown.toggle();","        }, 'a');","","        this.set('menuNode', menuNode);","    }","}, {","    NS : 'dropdown',","    ATTRS : {","        menuNode: null","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Dropdown = Dropdown;","","","}, '1.0.0', {\"requires\": [\"gallery-bootstrap-dropdown\"]});"];
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].lines = {"1":0,"3":0,"5":0,"10":0,"15":0,"16":0,"17":0,"19":0,"20":0,"23":0,"24":0,"25":0,"28":0,"38":0};
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].functions = {"(anonymous 2):23":0,"initializer:9":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].coveredLines = 14;
_yuitest_coverage["build/libbit-dropdown/libbit-dropdown.js"].coveredFunctions = 3;
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
menuNode.append(Y.Node.create(content));

        // Close the dropdown on click.
        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 23);
menuNode.delegate('click', function(e) {
            _yuitest_coverfunc("build/libbit-dropdown/libbit-dropdown.js", "(anonymous 2)", 23);
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 24);
e.preventDefault();
            _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 25);
node.dropdown.toggle();
        }, 'a');

        _yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 28);
this.set('menuNode', menuNode);
    }
}, {
    NS : 'dropdown',
    ATTRS : {
        menuNode: null
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dropdown/libbit-dropdown.js", 38);
Y.namespace('Libbit').Dropdown = Dropdown;


}, '1.0.0', {"requires": ["gallery-bootstrap-dropdown"]});
