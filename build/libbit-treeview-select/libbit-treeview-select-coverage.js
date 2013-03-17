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
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].code=["YUI.add('libbit-treeview-select', function (Y, NAME) {","","/**"," * Selection extension for the LiBBiT TreeView widget."," */","var Selectable;","","Selectable = Y.Base.create('selectable', Y.Base, [], {","","    // -- Protected Properties -------------------------------------------------","","    _selectMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        this.on('select', this._handleSelect, this);","        this.on('select', this._handleSelectState, this);","        this.on('unselect', this._handleUnSelectState, this);","","        // Select needs to be restored after the tree is rendered.","        Y.Do.after(this._restoreSelectState, this, 'render');","    },","","    // -- Protected Methods ----------------------------------------------------","","    _restoreSelectState: function () {","        var container = this.get('container'),","            self      = this;","","        if (this._selectMap && this._selectMap.length > 0) {","            Y.Array.each(this._selectMap, function (id) {","                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it","                // after another selection is made.","                var record = self._parseLibbitRecordId(id);","","                container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {","","                    if (node.getData('libbit-id') === record[1]) {","                        self.getNodeById(node.getData('node-id')).select();","                    }","                });","            });","        }","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleSelect: function (e) {","        var selectable = this.get('selectable');","","        if (selectable) {","            // var container = this.get('container'),","            //     node      = e.node,","            //     li        = this.getHTMLNode(node),","            //     model     = node.data;","","            // container.all('.icon-white').removeClass('icon-white');","","            // if (Y.instanceOf(model, Y.Model)) {","            //     if (typeof(this._iconMap[model.name]) !== 'undefined') {","            //         li.addClass('libbit-item-selected');","            //         li.one('.libbit-treeview-icon').addClass('icon-white');","            //     }","            // }","        } else {","            // If selectable is disabled, don't allow this event to propagate","            // to other select handlers.","            e.stopImmediatePropagation();","        }","    },","","    _handleSelectState: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","        var index = Y.Array.indexOf(this._selectMap, id);","","        if (index === -1) {","            this._selectMap.push(id);","        }","    },","","    _handleUnSelectState: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","        var index = Y.Array.indexOf(this._selectMap, id);","","        if (index !== -1) {","           this._selectMap.splice(index, 1);","        }","    }","","}, {","    ATTRS: {","        /**","         * Enable selection for this TreeView instance","         */","        selectable: {","            value : true","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Selectable = Selectable;","","","}, '1.0.0', {\"requires\": [\"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].lines = {"1":0,"6":0,"8":0,"17":0,"18":0,"19":0,"22":0,"28":0,"31":0,"32":0,"35":0,"37":0,"39":0,"40":0,"50":0,"52":0,"69":0,"74":0,"75":0,"77":0,"78":0,"83":0,"84":0,"86":0,"87":0,"103":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].functions = {"initializer:16":0,"(anonymous 3):37":0,"(anonymous 2):32":0,"_restoreSelectState:27":0,"_handleSelect:49":0,"_handleSelectState:73":0,"_handleUnSelectState:82":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredLines = 26;
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredFunctions = 8;
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
this.on('select', this._handleSelect, this);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 18);
this.on('select', this._handleSelectState, this);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 19);
this.on('unselect', this._handleUnSelectState, this);

        // Select needs to be restored after the tree is rendered.
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 22);
Y.Do.after(this._restoreSelectState, this, 'render');
    },

    // -- Protected Methods ----------------------------------------------------

    _restoreSelectState: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_restoreSelectState", 27);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 28);
var container = this.get('container'),
            self      = this;

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 31);
if (this._selectMap && this._selectMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 32);
Y.Array.each(this._selectMap, function (id) {
                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it
                // after another selection is made.
                _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 2)", 32);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 35);
var record = self._parseLibbitRecordId(id);

                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 37);
container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {

                    _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 3)", 37);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 39);
if (node.getData('libbit-id') === record[1]) {
                        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 40);
self.getNodeById(node.getData('node-id')).select();
                    }
                });
            });
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    _handleSelect: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelect", 49);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 50);
var selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 52);
if (selectable) {
            // var container = this.get('container'),
            //     node      = e.node,
            //     li        = this.getHTMLNode(node),
            //     model     = node.data;

            // container.all('.icon-white').removeClass('icon-white');

            // if (Y.instanceOf(model, Y.Model)) {
            //     if (typeof(this._iconMap[model.name]) !== 'undefined') {
            //         li.addClass('libbit-item-selected');
            //         li.one('.libbit-treeview-icon').addClass('icon-white');
            //     }
            // }
        } else {
            // If selectable is disabled, don't allow this event to propagate
            // to other select handlers.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 69);
e.stopImmediatePropagation();
        }
    },

    _handleSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelectState", 73);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 74);
var id = this._generateLibbitRecordId(e.node.data);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 75);
var index = Y.Array.indexOf(this._selectMap, id);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 77);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 78);
this._selectMap.push(id);
        }
    },

    _handleUnSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleUnSelectState", 82);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 83);
var id = this._generateLibbitRecordId(e.node.data);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 84);
var index = Y.Array.indexOf(this._selectMap, id);

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
