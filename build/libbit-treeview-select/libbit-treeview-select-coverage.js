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
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].code=["YUI.add('libbit-treeview-select', function (Y, NAME) {","","/**"," * Selection extension for the LiBBiT TreeView widget."," */","var Selectable;","","Selectable = Y.Base.create('selectable', Y.Base, [], {","","    _selectMap: [],","","    initializer: function () {","        this.on('select', this._handleSelect, this);","        this.on('select', this._handleSelectState, this);","        this.on('unselect', this._handleUnSelectState, this);","","        // Select needs to be restored after the tree is rendered.","        Y.Do.after(this._restoreSelectState, this, 'render');","    },","","    _restoreSelectState: function () {","        var container = this.get('container'),","            self      = this;","","        if (this._selectMap && this._selectMap.length > 0) {","            Y.Array.each(this._selectMap, function (id) {","                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it","                // after another selection is made.","                var record = self._parseLibbitRecordId(id);","","                container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {","","                    if (node.getData('libbit-id') === record[1]) {","                        self.getNodeById(node.getData('node-id')).select();","                    }","                });","            });","        }","    },","","    _handleSelect: function (e) {","        var selectable = this.get('selectable');","","        if (selectable) {","            // var container = this.get('container'),","            //     node      = e.node,","            //     li        = this.getHTMLNode(node),","            //     model     = node.data;","","            // container.all('.icon-white').removeClass('icon-white');","","            // if (Y.instanceOf(model, Y.Model)) {","            //     if (typeof(this._iconMap[model.name]) !== 'undefined') {","            //         li.addClass('libbit-item-selected');","            //         li.one('.libbit-treeview-icon').addClass('icon-white');","            //     }","            // }","        } else {","            // If selectable is disabled, don't allow this event to propagate","            // to other select handlers.","            e.stopImmediatePropagation();","        }","    },","","    _handleSelectState: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","        var index = Y.Array.indexOf(this._selectMap, id);","","        if (index === -1) {","            this._selectMap.push(id);","        }","    },","","    _handleUnSelectState: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","        var index = Y.Array.indexOf(this._selectMap, id);","","        if (index !== -1) {","           this._selectMap.splice(index, 1);","        }","    }","","}, {","    ATTRS: {","        /**","         * Enable selection for this TreeView instance","         */","        selectable: {","            value : true","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Selectable = Selectable;","","","}, '1.0.0', {\"requires\": [\"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].lines = {"1":0,"6":0,"8":0,"13":0,"14":0,"15":0,"18":0,"22":0,"25":0,"26":0,"29":0,"31":0,"33":0,"34":0,"42":0,"44":0,"61":0,"66":0,"67":0,"69":0,"70":0,"75":0,"76":0,"78":0,"79":0,"95":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].functions = {"initializer:12":0,"(anonymous 3):31":0,"(anonymous 2):26":0,"_restoreSelectState:21":0,"_handleSelect:41":0,"_handleSelectState:65":0,"_handleUnSelectState:74":0,"(anonymous 1):1":0};
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

    _selectMap: [],

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "initializer", 12);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 13);
this.on('select', this._handleSelect, this);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 14);
this.on('select', this._handleSelectState, this);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 15);
this.on('unselect', this._handleUnSelectState, this);

        // Select needs to be restored after the tree is rendered.
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 18);
Y.Do.after(this._restoreSelectState, this, 'render');
    },

    _restoreSelectState: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_restoreSelectState", 21);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 22);
var container = this.get('container'),
            self      = this;

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 25);
if (this._selectMap && this._selectMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 26);
Y.Array.each(this._selectMap, function (id) {
                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it
                // after another selection is made.
                _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 2)", 26);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 29);
var record = self._parseLibbitRecordId(id);

                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 31);
container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {

                    _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 3)", 31);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 33);
if (node.getData('libbit-id') === record[1]) {
                        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 34);
self.getNodeById(node.getData('node-id')).select();
                    }
                });
            });
        }
    },

    _handleSelect: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelect", 41);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 42);
var selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 44);
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
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 61);
e.stopImmediatePropagation();
        }
    },

    _handleSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelectState", 65);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 66);
var id = this._generateLibbitRecordId(e.node.data);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 67);
var index = Y.Array.indexOf(this._selectMap, id);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 69);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 70);
this._selectMap.push(id);
        }
    },

    _handleUnSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleUnSelectState", 74);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 75);
var id = this._generateLibbitRecordId(e.node.data);
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 76);
var index = Y.Array.indexOf(this._selectMap, id);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 78);
if (index !== -1) {
           _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 79);
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
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 95);
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0', {"requires": ["libbit-treeview"]});
