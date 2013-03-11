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
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].code=["YUI.add('libbit-treeview-select', function (Y, NAME) {","","/**"," * Selection extension for the LiBBiT TreeView widget."," */","var Selectable;","","Selectable = Y.Base.create('selectable', Y.Base, [], {","","    /**","     * Reference pointer to event","     */","    selectEvent: null,","","    /**","     * Set up a listener for the selectedItem attribute.","     */","    initializer: function () {","        this.after('render', this._afterRender, this);","    },","","    /**","     * Bind the click events.","     */","    _afterRender: function () {","        var self = this;","","        if (this.selectEvent) {","            this.selectEvent.detach();","        }","","        if (!self.get('selectable')) {","            self.get('tree').detach('select', self.get('tree')._afterSelect);","        } else {","            this.get('tree').on('select', function (e) {","                var node  = e.node,","                    li    = self.get('tree').getHTMLNode(node),","                    model = node.data;","","                self.get('boundingBox').all('.icon-white').removeClass('icon-white');","","                if (Y.instanceOf(model, Y.Model)) {","                    if (typeof(self._iconMap[model.name]) != 'undefined') {","                        li.addClass('libbit-item-selected');","                        li.one('.libbit-treeview-icon').addClass('icon-white');","                    }","                }","","                self.fire('select', { data: li.getData() });","            });","","            self.selectEvent = self.get('tree').on('select', function (e) {","                var li = self.get('tree').getHTMLNode(e.node);","","                self.selectedNode = parseInt(li.getAttribute('data-yui3-modelId'));","                self.fire('nodeSelected', e);","            });","        }","    }","}, {","    ATTRS: {","        /**","         * Config property, enable selection for this TreeView instance","         */","        selectable: {","            value : true","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Selectable = Selectable;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].lines = {"1":0,"6":0,"8":0,"19":0,"26":0,"28":0,"29":0,"32":0,"33":0,"35":0,"36":0,"40":0,"42":0,"43":0,"44":0,"45":0,"49":0,"52":0,"53":0,"55":0,"56":0,"72":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].functions = {"initializer:18":0,"(anonymous 2):35":0,"(anonymous 3):52":0,"_afterRender:25":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredLines = 22;
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredFunctions = 5;
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

    /**
     * Reference pointer to event
     */
    selectEvent: null,

    /**
     * Set up a listener for the selectedItem attribute.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "initializer", 18);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 19);
this.after('render', this._afterRender, this);
    },

    /**
     * Bind the click events.
     */
    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_afterRender", 25);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 26);
var self = this;

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 28);
if (this.selectEvent) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 29);
this.selectEvent.detach();
        }

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 32);
if (!self.get('selectable')) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 33);
self.get('tree').detach('select', self.get('tree')._afterSelect);
        } else {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 35);
this.get('tree').on('select', function (e) {
                _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 2)", 35);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 36);
var node  = e.node,
                    li    = self.get('tree').getHTMLNode(node),
                    model = node.data;

                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 40);
self.get('boundingBox').all('.icon-white').removeClass('icon-white');

                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 42);
if (Y.instanceOf(model, Y.Model)) {
                    _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 43);
if (typeof(self._iconMap[model.name]) != 'undefined') {
                        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 44);
li.addClass('libbit-item-selected');
                        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 45);
li.one('.libbit-treeview-icon').addClass('icon-white');
                    }
                }

                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 49);
self.fire('select', { data: li.getData() });
            });

            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 52);
self.selectEvent = self.get('tree').on('select', function (e) {
                _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 3)", 52);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 53);
var li = self.get('tree').getHTMLNode(e.node);

                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 55);
self.selectedNode = parseInt(li.getAttribute('data-yui3-modelId'));
                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 56);
self.fire('nodeSelected', e);
            });
        }
    }
}, {
    ATTRS: {
        /**
         * Config property, enable selection for this TreeView instance
         */
        selectable: {
            value : true
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 72);
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0');
