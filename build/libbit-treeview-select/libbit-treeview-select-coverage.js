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
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].code=["YUI.add('libbit-treeview-select', function (Y, NAME) {","","/**"," * Selection extension for the LiBBiT TreeView widget."," */","var Selectable;","","Selectable = Y.Base.create('selectable', Y.Base, [], {","","    // -- Protected Properties -------------------------------------------------","","    _selectMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        this.on('select', this._handleSelectState, this);","        this.on('unselect', this._handleUnSelectState, this);","","        this.after('select', this._handleSelect, this);","        this.after('unselect', this._handleUnselect, this);","","        this.after('selectableChange', this._afterChange, this);","","        // Select needs to be restored after the tree is rendered.","        Y.Do.after(this._restoreSelectState, this, 'render');","    },","","    destructor: function () {","        // Destroy the array so it doesn't persist.","        this._selectMap.length = 0;","    },","","    // -- Protected Methods ----------------------------------------------------","","    _restoreSelectState: function () {","        var container = this.get('container'),","            self      = this;","","        if (this._selectMap && this._selectMap.length > 0) {","            Y.Array.each(this._selectMap, function (id) {","                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it","                // after another selection is made.","                var record = self.parseLibbitRecordId(id);","","                container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {","","                    if (node.getData('libbit-id') === record[1]) {","                        self.getNodeById(node.getData('node-id')).select();","                    }","                });","            });","        }","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleSelect: function (e) {","        var htmlNode   = this.getHTMLNode(e.node);","","        htmlNode.one('.libbit-treeview-icon').addClass('icon-white');","    },","","    _handleUnselect: function (e) {","        var htmlNode   = this.getHTMLNode(e.node);","            selectable = this.get('selectable');","","        if (htmlNode.one('.libbit-treeview-icon').hasClass('icon-white')) {","            htmlNode.one('.libbit-treeview-icon').removeClass('icon-white');","        }","    },","","    _handleSelectState: function (e) {","        var id         = this.generateLibbitRecordId(e.node.data),","            index      = this._selectMap.indexOf(id),","            selectable = this.get('selectable');","","        if (!selectable) {","            // If selectable is disabled, don't allow this event to propagate","            // to other select handlers.","            e.stopImmediatePropagation();","        }","","        if (selectable && index === -1) {","            this._selectMap.push(id);","        }","    },","","    _handleUnSelectState: function (e) {","        var id    = this.generateLibbitRecordId(e.node.data),","            index = this._selectMap.indexOf(id);","","        if (index !== -1) {","           this._selectMap.splice(index, 1);","        }","    },","","    _afterChange: function () {","        this.unselect();","    }","}, {","    ATTRS: {","        /**","         * Enable selection for this TreeView instance","         */","        selectable: {","            value : true","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Selectable = Selectable;","","","}, '1.0.0', {\"requires\": [\"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].lines = {"1":0,"6":0,"8":0,"17":0,"18":0,"20":0,"21":0,"23":0,"26":0,"31":0,"37":0,"40":0,"41":0,"44":0,"46":0,"48":0,"49":0,"59":0,"61":0,"65":0,"66":0,"68":0,"69":0,"74":0,"78":0,"81":0,"84":0,"85":0,"90":0,"93":0,"94":0,"99":0,"113":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].functions = {"initializer:16":0,"destructor:29":0,"(anonymous 3):46":0,"(anonymous 2):41":0,"_restoreSelectState:36":0,"_handleSelect:58":0,"_handleUnselect:64":0,"_handleSelectState:73":0,"_handleUnSelectState:89":0,"_afterChange:98":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredLines = 33;
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredFunctions = 11;
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

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 23);
this.after('selectableChange', this._afterChange, this);

        // Select needs to be restored after the tree is rendered.
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 26);
Y.Do.after(this._restoreSelectState, this, 'render');
    },

    destructor: function () {
        // Destroy the array so it doesn't persist.
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "destructor", 29);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 31);
this._selectMap.length = 0;
    },

    // -- Protected Methods ----------------------------------------------------

    _restoreSelectState: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_restoreSelectState", 36);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 37);
var container = this.get('container'),
            self      = this;

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 40);
if (this._selectMap && this._selectMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 41);
Y.Array.each(this._selectMap, function (id) {
                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it
                // after another selection is made.
                _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 2)", 41);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 44);
var record = self.parseLibbitRecordId(id);

                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 46);
container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {

                    _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 3)", 46);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 48);
if (node.getData('libbit-id') === record[1]) {
                        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 49);
self.getNodeById(node.getData('node-id')).select();
                    }
                });
            });
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    _handleSelect: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelect", 58);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 59);
var htmlNode   = this.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 61);
htmlNode.one('.libbit-treeview-icon').addClass('icon-white');
    },

    _handleUnselect: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleUnselect", 64);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 65);
var htmlNode   = this.getHTMLNode(e.node);
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 66);
selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 68);
if (htmlNode.one('.libbit-treeview-icon').hasClass('icon-white')) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 69);
htmlNode.one('.libbit-treeview-icon').removeClass('icon-white');
        }
    },

    _handleSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelectState", 73);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 74);
var id         = this.generateLibbitRecordId(e.node.data),
            index      = this._selectMap.indexOf(id),
            selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 78);
if (!selectable) {
            // If selectable is disabled, don't allow this event to propagate
            // to other select handlers.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 81);
e.stopImmediatePropagation();
        }

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 84);
if (selectable && index === -1) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 85);
this._selectMap.push(id);
        }
    },

    _handleUnSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleUnSelectState", 89);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 90);
var id    = this.generateLibbitRecordId(e.node.data),
            index = this._selectMap.indexOf(id);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 93);
if (index !== -1) {
           _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 94);
this._selectMap.splice(index, 1);
        }
    },

    _afterChange: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_afterChange", 98);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 99);
this.unselect();
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
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 113);
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0', {"requires": ["libbit-treeview"]});
