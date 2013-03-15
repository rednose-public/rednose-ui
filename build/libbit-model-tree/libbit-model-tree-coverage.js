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
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-model-tree/libbit-model-tree.js",
    code: []
};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].code=["YUI.add('libbit-model-tree', function (Y, NAME) {","","var ModelTree;","","ModelTree = Y.Base.create('modelTree', Y.Model, [], {","","    getByAttr: function (type, attr, value) {","        var tree = this.get('items'),","            node = this._treeFind(value, tree, attr, type);","","        return node ? node.data : null;","    },","","    filterByAttr: function (type, attr, value) {","        var tree  = this.get('items'),","            nodes = this._treeFilter(value, tree, attr, type);","","        return nodes;","    },","","    /**","     * Get a model from the tree by client ID.","     */","    getByClientId: function (clientID) {","        var tree = this.get('items'),","            node = this._treeFind(clientID, tree);","","        return node ? node.data : null;","    },","","    /**","     * Get a model's leaves from the tree by client ID.","     */","    getLeavesByClientId: function (clientID) {","        var tree   = this.get('items'),","            node   = this._treeFind(clientID, tree),","            leaves = [];","","        // Filter out the child branches, we just want the leaves.","        Y.Array.each(node.children, function (c) {","            if (Y.Lang.isArray(c.children) === false) {","                leaves.push(c.data);","            }","        });","","        return leaves;","    },","","    /**","     * Returns just the (potential) branch nodes.","     */","    getBranches: function () {","        var tree     = this.get('items'),","            branches = this._findBranches(tree);","","        return branches;","    },","","    /**","     * Return all (potential) sub-branches of a given branch.","     */","    _findBranches: function(branch) {","        var self     = this,","            branches = [];","","        Y.Array.each(branch, function (item) {","            var obj = {};","","            // TODO: Make the instance to compare to a config attribute for the Treeview,","            // and get this data by calling getBranches(Y.TB.Category).","            if (Y.instanceOf(item.data, Y.TB.Category)) {","                obj.label = item.label;","                obj.data  = item.data;","","                if (item.children) {","                    obj.children = self._findBranches(item.children);","                }","","                branches.push(obj);","            }","        });","","        return branches;","    },","","    /**","     * Find a node in the tree by specified the client ID of the model it contains.","     */","    _treeFind: function(value, branch, attr, type) {","        var self  = this,","            found = null;","","        attr = attr || 'clientId';","","        Y.Array.each(branch, function (item) {","            if (item.data.get(attr) === value) {","                if (!type || (item.data.name === type)) {","                    found = item;","                }","            }","","            if (Y.Lang.isNull(found) && item.children) {","                found = self._treeFind(value, item.children, attr, type);","            }","        });","","        return found;","    },","","    _treeFilter: function(value, branch, attr, type) {","        var self   = this,","            buffer = [];","","        attr = attr || 'clientId';","","        Y.Array.each(branch, function (item) {","            var obj = {};","","            if (item.data.name !== type || Y.Array.indexOf(value, item.data.get(attr)) !== -1) {","                obj.label = item.label;","                obj.data = item.data;","","                if (item.children) {","                    obj.children = self._treeFilter(value, item.children, attr, type);","                }","","                buffer.push(obj);","            }","        });","","        return buffer;","    }","}, {","	ATTRS: {","		items: {","			value: [],","            getter: function (val) {","                if (this.get('filterApplyTo')) {","                    return this._treeFilter(this.get('filterIds'), val, 'id', this.get('filterApplyTo'));","                }","","                return val;","            }","		},","","        filterApplyTo: {","            value : null","        },","","        filterIds: {","            value : []","        }","	}","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').ModelTree = ModelTree;","","","}, '1.0.0', {\"requires\": [\"model\"]});"];
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].lines = {"1":0,"3":0,"5":0,"8":0,"11":0,"15":0,"18":0,"25":0,"28":0,"35":0,"40":0,"41":0,"42":0,"46":0,"53":0,"56":0,"63":0,"66":0,"67":0,"71":0,"72":0,"73":0,"75":0,"76":0,"79":0,"83":0,"90":0,"93":0,"95":0,"96":0,"97":0,"98":0,"102":0,"103":0,"107":0,"111":0,"114":0,"116":0,"117":0,"119":0,"120":0,"121":0,"123":0,"124":0,"127":0,"131":0,"138":0,"139":0,"142":0,"157":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].functions = {"getByAttr:7":0,"filterByAttr:14":0,"getByClientId:24":0,"(anonymous 2):40":0,"getLeavesByClientId:34":0,"getBranches:52":0,"(anonymous 3):66":0,"_findBranches:62":0,"(anonymous 4):95":0,"_treeFind:89":0,"(anonymous 5):116":0,"_treeFilter:110":0,"getter:137":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredLines = 50;
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredFunctions = 14;
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 1);
YUI.add('libbit-model-tree', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 3);
var ModelTree;

_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 5);
ModelTree = Y.Base.create('modelTree', Y.Model, [], {

    getByAttr: function (type, attr, value) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByAttr", 7);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 8);
var tree = this.get('items'),
            node = this._treeFind(value, tree, attr, type);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 11);
return node ? node.data : null;
    },

    filterByAttr: function (type, attr, value) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "filterByAttr", 14);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 15);
var tree  = this.get('items'),
            nodes = this._treeFilter(value, tree, attr, type);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 18);
return nodes;
    },

    /**
     * Get a model from the tree by client ID.
     */
    getByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByClientId", 24);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 25);
var tree = this.get('items'),
            node = this._treeFind(clientID, tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 28);
return node ? node.data : null;
    },

    /**
     * Get a model's leaves from the tree by client ID.
     */
    getLeavesByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getLeavesByClientId", 34);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 35);
var tree   = this.get('items'),
            node   = this._treeFind(clientID, tree),
            leaves = [];

        // Filter out the child branches, we just want the leaves.
        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 40);
Y.Array.each(node.children, function (c) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 2)", 40);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 41);
if (Y.Lang.isArray(c.children) === false) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 42);
leaves.push(c.data);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 46);
return leaves;
    },

    /**
     * Returns just the (potential) branch nodes.
     */
    getBranches: function () {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getBranches", 52);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 53);
var tree     = this.get('items'),
            branches = this._findBranches(tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 56);
return branches;
    },

    /**
     * Return all (potential) sub-branches of a given branch.
     */
    _findBranches: function(branch) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_findBranches", 62);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 63);
var self     = this,
            branches = [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 66);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 3)", 66);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 67);
var obj = {};

            // TODO: Make the instance to compare to a config attribute for the Treeview,
            // and get this data by calling getBranches(Y.TB.Category).
            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 71);
if (Y.instanceOf(item.data, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 72);
obj.label = item.label;
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 73);
obj.data  = item.data;

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 75);
if (item.children) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 76);
obj.children = self._findBranches(item.children);
                }

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 79);
branches.push(obj);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 83);
return branches;
    },

    /**
     * Find a node in the tree by specified the client ID of the model it contains.
     */
    _treeFind: function(value, branch, attr, type) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFind", 89);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 90);
var self  = this,
            found = null;

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 93);
attr = attr || 'clientId';

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 95);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 4)", 95);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 96);
if (item.data.get(attr) === value) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 97);
if (!type || (item.data.name === type)) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 98);
found = item;
                }
            }

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 102);
if (Y.Lang.isNull(found) && item.children) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 103);
found = self._treeFind(value, item.children, attr, type);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 107);
return found;
    },

    _treeFilter: function(value, branch, attr, type) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFilter", 110);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 111);
var self   = this,
            buffer = [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 114);
attr = attr || 'clientId';

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 116);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 5)", 116);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 117);
var obj = {};

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 119);
if (item.data.name !== type || Y.Array.indexOf(value, item.data.get(attr)) !== -1) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 120);
obj.label = item.label;
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 121);
obj.data = item.data;

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 123);
if (item.children) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 124);
obj.children = self._treeFilter(value, item.children, attr, type);
                }

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 127);
buffer.push(obj);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 131);
return buffer;
    }
}, {
	ATTRS: {
		items: {
			value: [],
            getter: function (val) {
                _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getter", 137);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 138);
if (this.get('filterApplyTo')) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 139);
return this._treeFilter(this.get('filterIds'), val, 'id', this.get('filterApplyTo'));
                }

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 142);
return val;
            }
		},

        filterApplyTo: {
            value : null
        },

        filterIds: {
            value : []
        }
	}
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 157);
Y.namespace('Libbit').ModelTree = ModelTree;


}, '1.0.0', {"requires": ["model"]});
