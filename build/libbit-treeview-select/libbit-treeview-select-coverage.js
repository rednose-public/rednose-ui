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
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].code=["YUI.add('libbit-treeview-select', function (Y, NAME) {","","/**"," * Selection extension for the LiBBiT TreeView widget."," */","var Selectable;","","Selectable = Y.Base.create('selectable', Y.Base, [], {","","    // -- Protected Properties -------------------------------------------------","","    _selectMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        this.on('select', this._handleSelectState, this);","        this.on('unselect', this._handleUnSelectState, this);","","        this.after('select', this._handleSelect, this);","        this.after('unselect', this._handleUnselect, this);","","        // Select needs to be restored after the tree is rendered.","        Y.Do.after(this._restoreSelectState, this, 'render');","    },","","    destructor: function () {","        for (var i in this._selectMap) {","            delete this._selectMap[i];","        }","    },","","    // -- Protected Methods ----------------------------------------------------","","    _restoreSelectState: function () {","        var container = this.get('container'),","            self      = this;","","        if (this._selectMap && this._selectMap.length > 0) {","            Y.Array.each(this._selectMap, function (id) {","                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it","                // after another selection is made.","                var record = self.parseLibbitRecordId(id);","","                container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {","","                    if (node.getData('libbit-id') === record[1]) {","                        self.getNodeById(node.getData('node-id')).select();","                    }","                });","            });","        }","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleSelect: function (e) {","        var htmlNode   = this.getHTMLNode(e.node);","","        htmlNode.one('.libbit-treeview-icon').addClass('icon-white');","    },","","    _handleUnselect: function (e) {","        var htmlNode   = this.getHTMLNode(e.node);","            selectable = this.get('selectable');","","        if (htmlNode.one('.libbit-treeview-icon').hasClass('icon-white')) {","            htmlNode.one('.libbit-treeview-icon').removeClass('icon-white');","        }","    },","","    _handleSelectState: function (e) {","        var id         = this.generateLibbitRecordId(e.node.data),","            index      = Y.Array.indexOf(this._selectMap, id);","            selectable = this.get('selectable');","","        if (!selectable) {","            // If selectable is disabled, don't allow this event to propagate","            // to other select handlers.","            e.stopImmediatePropagation();","        }","","        if (selectable && index === -1) {","            this._selectMap.push(id);","        }","    },","","    _handleUnSelectState: function (e) {","        var id    = this.generateLibbitRecordId(e.node.data),","            index = Y.Array.indexOf(this._selectMap, id);","","        if (index !== -1) {","           this._selectMap.splice(index, 1);","        }","    }","","}, {","    ATTRS: {","        /**","         * Enable selection for this TreeView instance","         */","        selectable: {","            value : true","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Selectable = Selectable;","","","}, '1.0.0', {\"requires\": [\"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].lines = {"1":0,"6":0,"8":0,"17":0,"18":0,"20":0,"21":0,"24":0,"28":0,"29":0,"36":0,"39":0,"40":0,"43":0,"45":0,"47":0,"48":0,"58":0,"60":0,"64":0,"65":0,"67":0,"68":0,"73":0,"75":0,"77":0,"80":0,"83":0,"84":0,"89":0,"92":0,"93":0,"109":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].functions = {"initializer:16":0,"destructor:27":0,"(anonymous 3):45":0,"(anonymous 2):40":0,"_restoreSelectState:35":0,"_handleSelect:57":0,"_handleUnselect:63":0,"_handleSelectState:72":0,"_handleUnSelectState:88":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredLines = 33;
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredFunctions = 10;
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

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "destructor", 27);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 28);
for (var i in this._selectMap) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 29);
delete this._selectMap[i];
        }
    },

    // -- Protected Methods ----------------------------------------------------

    _restoreSelectState: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_restoreSelectState", 35);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 36);
var container = this.get('container'),
            self      = this;

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 39);
if (this._selectMap && this._selectMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 40);
Y.Array.each(this._selectMap, function (id) {
                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it
                // after another selection is made.
                _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 2)", 40);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 43);
var record = self.parseLibbitRecordId(id);

                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 45);
container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {

                    _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 3)", 45);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 47);
if (node.getData('libbit-id') === record[1]) {
                        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 48);
self.getNodeById(node.getData('node-id')).select();
                    }
                });
            });
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    _handleSelect: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelect", 57);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 58);
var htmlNode   = this.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 60);
htmlNode.one('.libbit-treeview-icon').addClass('icon-white');
    },

    _handleUnselect: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleUnselect", 63);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 64);
var htmlNode   = this.getHTMLNode(e.node);
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 65);
selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 67);
if (htmlNode.one('.libbit-treeview-icon').hasClass('icon-white')) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 68);
htmlNode.one('.libbit-treeview-icon').removeClass('icon-white');
        }
    },

    _handleSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleSelectState", 72);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 73);
var id         = this.generateLibbitRecordId(e.node.data),
            index      = Y.Array.indexOf(this._selectMap, id);
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 75);
selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 77);
if (!selectable) {
            // If selectable is disabled, don't allow this event to propagate
            // to other select handlers.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 80);
e.stopImmediatePropagation();
        }

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 83);
if (selectable && index === -1) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 84);
this._selectMap.push(id);
        }
    },

    _handleUnSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleUnSelectState", 88);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 89);
var id    = this.generateLibbitRecordId(e.node.data),
            index = Y.Array.indexOf(this._selectMap, id);

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 92);
if (index !== -1) {
           _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 93);
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
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 109);
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0', {"requires": ["libbit-treeview"]});
