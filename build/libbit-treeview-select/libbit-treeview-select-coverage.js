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
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].code=["YUI.add('libbit-treeview-select', function (Y, NAME) {","","/**"," * Selection extension for the LiBBiT TreeView widget."," */","var Selectable;","","Selectable = Y.Base.create('selectable', Y.Base, [], {","","    // -- Protected Properties -------------------------------------------------","","    _selectMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        this.on('select', this._handleSelectState, this);","        this.on('unselect', this._handleUnSelectState, this);","","        this.after('select', this._handleSelect, this);","        this.after('unselect', this._handleUnselect, this);","","        // Select needs to be restored after the tree is rendered.","        Y.Do.after(this._restoreSelectState, this, 'render');","    },","","    // -- Protected Methods ----------------------------------------------------","","    _restoreSelectState: function () {","        var container = this.get('container'),","            self      = this;","","        if (this._selectMap && this._selectMap.length > 0) {","            Y.Array.each(this._selectMap, function (id) {","                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it","                // after another selection is made.","                var record = self.parseLibbitRecordId(id);","","                container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {","","                    if (node.getData('libbit-id') === record[1]) {","                        self.getNodeById(node.getData('node-id')).select();","                    }","                });","            });","        }","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleSelect: function (e) {","        var htmlNode   = this.getHTMLNode(e.node);","","        htmlNode.one('.libbit-treeview-icon').addClass('icon-white');","    },","","    _handleUnselect: function (e) {","        var htmlNode   = this.getHTMLNode(e.node);","            selectable = this.get('selectable');","","        if (htmlNode.one('.libbit-treeview-icon').hasClass('icon-white')) {","            htmlNode.one('.libbit-treeview-icon').removeClass('icon-white');","        }","    },","","    _handleSelectState: function (e) {","        var id         = this.generateLibbitRecordId(e.node.data),","            index      = Y.Array.indexOf(this._selectMap, id);","            selectable = this.get('selectable');","","        if (!selectable) {","            // If selectable is disabled, don't allow this event to propagate","            // to other select handlers.","            e.stopImmediatePropagation();","        }","","        if (selectable && index === -1) {","            this._selectMap.push(id);","        }","    },","","    _handleUnSelectState: function (e) {","        var id    = this.generateLibbitRecordId(e.node.data),","            index = Y.Array.indexOf(this._selectMap, id);","","        if (index !== -1) {","           this._selectMap.splice(index, 1);","        }","    }","","}, {","    ATTRS: {","        /**","         * Enable selection for this TreeView instance","         */","        selectable: {","            value : true","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Selectable = Selectable;","","","}, '1.0.0', {\"requires\": [\"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].lines = {"1":0,"6":0,"8":0,"17":0,"18":0,"20":0,"21":0,"24":0,"30":0,"33":0,"34":0,"37":0,"39":0,"41":0,"42":0,"52":0,"54":0,"58":0,"59":0,"61":0,"62":0,"67":0,"69":0,"71":0,"74":0,"77":0,"78":0,"83":0,"86":0,"87":0,"103":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].functions = {"initializer:16":0,"(anonymous 3):39":0,"(anonymous 2):34":0,"_restoreSelectState:29":0,"_handleSelect:51":0,"_handleUnselect:57":0,"_handleSelectState:66":0,"_handleUnSelectState:82":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredLines = 31;
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredFunctions = 9;
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

    // -- Protected Properties -------------------------------------------------

    _selectMap: [],

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "initializer", 16);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 17);
this.on('select', this._handleSelectState, this);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 18);
this.on('unselect', this._handleUnSelectState, this);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 20);
this.after('select', this._handleSelect, this);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 21);
this.after('unselect', this._handleUnselect, this);

        // Select needs to be restored after the tree is rendered.
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 24);
Y.Do.after(this._restoreSelectState, this, 'render');
    },

    // -- Protected Methods ----------------------------------------------------

    _restoreSelectState: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_restoreSelectState", 29);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 30);
var container = this.get('container'),
            self      = this;

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 33);
if (this._selectMap && this._selectMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 34);
Y.Array.each(this._selectMap, function (id) {
                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it
                // after another selection is made.
                _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 2)", 34);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 37);
var record = self.parseLibbitRecordId(id);

                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 39);
container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {

                    _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 3)", 39);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 41);
if (node.getData('libbit-id') === record[1]) {
                        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 42);
self.getNodeById(node.getData('node-id')).select();
                    }
                });
            });
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    _handleSelect: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelect", 51);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 52);
var htmlNode   = this.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 54);
htmlNode.one('.libbit-treeview-icon').addClass('icon-white');
    },

    _handleUnselect: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleUnselect", 57);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 58);
var htmlNode   = this.getHTMLNode(e.node);
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 59);
selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 61);
if (htmlNode.one('.libbit-treeview-icon').hasClass('icon-white')) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 62);
htmlNode.one('.libbit-treeview-icon').removeClass('icon-white');
        }
    },

    _handleSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelectState", 66);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 67);
var id         = this.generateLibbitRecordId(e.node.data),
            index      = Y.Array.indexOf(this._selectMap, id);
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 69);
selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 71);
if (!selectable) {
            // If selectable is disabled, don't allow this event to propagate
            // to other select handlers.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 74);
e.stopImmediatePropagation();
        }

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 77);
if (selectable && index === -1) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 78);
this._selectMap.push(id);
        }
    },

    _handleUnSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleUnSelectState", 82);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 83);
var id    = this.generateLibbitRecordId(e.node.data),
            index = Y.Array.indexOf(this._selectMap, id);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 86);
if (index !== -1) {
           _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 87);
this._selectMap.splice(index, 1);
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
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 103);
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0', {"requires": ["libbit-treeview"]});
