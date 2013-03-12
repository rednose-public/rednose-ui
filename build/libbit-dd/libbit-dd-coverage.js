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
_yuitest_coverage["build/libbit-dd/libbit-dd.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-dd/libbit-dd.js",
    code: []
};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].code=["YUI.add('libbit-dd', function (Y, NAME) {","","var DD;","","DD = Y.Base.create('dd', Y.View, [], {","","    initializer: function() {","        var container = this.get('container'),","            drop;","","        container.addClass('libbit-global-drop');","","        // Global drop object.","        drop = new Y.DD.Drop({","            node   : container,","            groups: ['docgenadmin-templatebuilder'],","            bubbleTargets: this","        });","","        // Bind the global drop object.","        drop.on('drop:enter', this._dropEnterGlobal, this);","        // drop.on('drop:over', this._handleScroll, this);","    },","","    /**","     * Create a new drag instance from a DOM node.","     */","    createDrag: function (node, groups) {","        var dd = new Y.DD.Drag({","            node         : node,","            groups: groups,","            bubbleTargets: this,","            target       : true","        });","","        dd.plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    /**","     * Create a new drop instance from a DOM node.","     */","    createDrop: function (node, groups) {","        var dd = new Y.DD.Drop({","            node        : node,","            //padding     : '20 0',","            groups: groups,","            bubbleTargets: this","        });","","        return dd;","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DD = DD;","","","}, '1.0.0', {\"requires\": [\"view\"]});"];
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].lines = {"1":0,"3":0,"5":0,"8":0,"11":0,"14":0,"21":0,"29":0,"36":0,"41":0,"48":0,"55":0,"60":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].functions = {"initializer:7":0,"createDrag:28":0,"createDrop:47":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredLines = 13;
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredFunctions = 4;
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 1);
YUI.add('libbit-dd', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 3);
var DD;

_yuitest_coverline("build/libbit-dd/libbit-dd.js", 5);
DD = Y.Base.create('dd', Y.View, [], {

    initializer: function() {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "initializer", 7);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 8);
var container = this.get('container'),
            drop;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 11);
container.addClass('libbit-global-drop');

        // Global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 14);
drop = new Y.DD.Drop({
            node   : container,
            groups: ['docgenadmin-templatebuilder'],
            bubbleTargets: this
        });

        // Bind the global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 21);
drop.on('drop:enter', this._dropEnterGlobal, this);
        // drop.on('drop:over', this._handleScroll, this);
    },

    /**
     * Create a new drag instance from a DOM node.
     */
    createDrag: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrag", 28);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 29);
var dd = new Y.DD.Drag({
            node         : node,
            groups: groups,
            bubbleTargets: this,
            target       : true
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 36);
dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 41);
return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrop", 47);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 48);
var dd = new Y.DD.Drop({
            node        : node,
            //padding     : '20 0',
            groups: groups,
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 55);
return dd;
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 60);
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["view"]});
