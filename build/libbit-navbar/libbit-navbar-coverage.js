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
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].code=["YUI.add('libbit-navbar', function (Y, NAME) {","","var Navbar;","","Navbar = Y.Base.create('navbar', Y.Widget, [ ], {","","    template:","    '<div class=\"navbar navbar-inverse\">' +","    '   <div class=\"navbar-inner\">' +","    '       <a class=\"brand\" href=\"#\">{{ title }}</a>' +","    '   </div>' +","    '</div>',","","    renderUI: function() {","//        this.template = Y.Handlebars.compile(this.template);","console.log(Y.Handlebars);","var template = Y.Handlebars.compile('The pie of the day is {{pie}}!.');","//template({pie: 'Pecan'});","//        this.get('contentBox').setHTML(","//            this.template({ title: this.get('title') })","//        );","    }","","}, {","    ATTRS: {","        title: { value: 'No title' },","        menu: { value: [] }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Navbar = Navbar;","","","}, '1.0.0', {\"required\": [\"handlebars\", \"gallery-bootstrap-dropdown\"]});"];
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].lines = {"1":0,"3":0,"5":0,"16":0,"17":0,"32":0};
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].functions = {"renderUI:14":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].coveredLines = 6;
_yuitest_coverage["build/libbit-navbar/libbit-navbar.js"].coveredFunctions = 2;
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 1);
YUI.add('libbit-navbar', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 3);
var Navbar;

_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 5);
Navbar = Y.Base.create('navbar', Y.Widget, [ ], {

    template:
    '<div class="navbar navbar-inverse">' +
    '   <div class="navbar-inner">' +
    '       <a class="brand" href="#">{{ title }}</a>' +
    '   </div>' +
    '</div>',

    renderUI: function() {
//        this.template = Y.Handlebars.compile(this.template);
_yuitest_coverfunc("build/libbit-navbar/libbit-navbar.js", "renderUI", 14);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 16);
console.log(Y.Handlebars);
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 17);
var template = Y.Handlebars.compile('The pie of the day is {{pie}}!.');
//template({pie: 'Pecan'});
//        this.get('contentBox').setHTML(
//            this.template({ title: this.get('title') })
//        );
    }

}, {
    ATTRS: {
        title: { value: 'No title' },
        menu: { value: [] }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-navbar/libbit-navbar.js", 32);
Y.namespace('Libbit').Navbar = Navbar;


}, '1.0.0', {"required": ["handlebars", "gallery-bootstrap-dropdown"]});
