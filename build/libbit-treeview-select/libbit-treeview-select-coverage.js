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
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview-select/libbit-treeview-select.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].code=["YUI.add('libbit-treeview-select', function (Y, NAME) {","","/**"," * Selection extension for the LiBBiT TreeView widget."," */","var Selectable;","","Selectable = Y.Base.create('selectable', Y.Base, [], {","","    initializer: function () {","        this.on('select', this._handleSelect, this);","    },","","    _handleSelect: function (e) {","        var selectable = this.get('selectable');","","        if (selectable) {","            var container = this.get('container'),","                node      = e.node,","                li        = this.getHTMLNode(node),","                model     = node.data;","","            container.all('.icon-white').removeClass('icon-white');","","            if (Y.instanceOf(model, Y.Model)) {","                if (typeof(this._iconMap[model.name]) !== 'undefined') {","                    li.addClass('libbit-item-selected');","                    li.one('.libbit-treeview-icon').addClass('icon-white');","                }","            }","        } else {","            e.stopImmediatePropagation();","        }","    }","}, {","    ATTRS: {","        /**","         * Enable selection for this TreeView instance","         */","        selectable: {","            value : true","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Selectable = Selectable;","","","}, '1.0.0', {\"requires\": [\"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].lines = {"1":0,"6":0,"8":0,"11":0,"15":0,"17":0,"18":0,"23":0,"25":0,"26":0,"27":0,"28":0,"32":0,"47":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].functions = {"initializer:10":0,"_handleSelect:14":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredLines = 14;
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredFunctions = 3;
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 1);
YUI.add('libbit-treeview-select', function (Y, NAME) {

/**
 * Selection extension for the LiBBiT TreeView widget.
 */
_yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 6);
var Selectable;

_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 8);
Selectable = Y.Base.create('selectable', Y.Base, [], {

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "initializer", 10);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 11);
this.on('select', this._handleSelect, this);
    },

    _handleSelect: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelect", 14);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 15);
var selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 17);
if (selectable) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 18);
var container = this.get('container'),
                node      = e.node,
                li        = this.getHTMLNode(node),
                model     = node.data;

            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 23);
container.all('.icon-white').removeClass('icon-white');

            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 25);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 26);
if (typeof(this._iconMap[model.name]) !== 'undefined') {
                    _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 27);
li.addClass('libbit-item-selected');
                    _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 28);
li.one('.libbit-treeview-icon').addClass('icon-white');
                }
            }
        } else {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 32);
e.stopImmediatePropagation();
        }
    }
}, {
    ATTRS: {
        /**
         * Enable selection for this TreeView instance
         */
        selectable: {
            value : true
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 47);
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0', {"requires": ["libbit-treeview"]});
