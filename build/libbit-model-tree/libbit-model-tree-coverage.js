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
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].code=["YUI.add('libbit-model-tree', function (Y, NAME) {","","var ModelTree;","","ModelTree = Y.Base.create('modelTree', Y.Model, [], {","","    getByAttr: function (type, attr, value) {","        var tree = this.get('items'),","            node = this._treeFind(value, tree, attr, type);","","        return node ? node.data : null;","    },","","    /**","     * Get a model from the tree by client ID.","     */","    getByClientId: function (clientID) {","        var tree = this.get('items'),","            node = this._treeFind(clientID, tree);","","        return node ? node.data : null;","    },","","    /**","     * Get a model's leaves from the tree by client ID.","     */","    getLeavesByClientId: function (clientID) {","        var tree   = this.get('items'),","            node   = this._treeFind(clientID, tree),","            leaves = [];","","        // Filter out the child branches, we just want the leaves.","        Y.Array.each(node.children, function (c) {","            if (Y.Lang.isArray(c.children) === false) {","                leaves.push(c.data);","            }","        });","","        return leaves;","    },","","    /**","     * Returns just the (potential) branch nodes.","     */","    getBranches: function () {","        var tree     = this.get('items'),","            branches = this._findBranches(tree);","","        return branches;","    },","","    /**","     * Return all (potential) sub-branches of a given branch.","     */","    _findBranches: function(branch) {","        var self     = this,","            branches = [];","","        Y.Array.each(branch, function (item) {","            var obj = {};","","            // TODO: Make the instance to compare to a config attribute for the Treeview,","            // and get this data by calling getBranches(Y.TB.Category).","            if (Y.instanceOf(item.data, Y.TB.Category)) {","                obj.label = item.label;","                obj.data  = item.data;","","                if (item.children) {","                    obj.children = self._findBranches(item.children);","                }","","                branches.push(obj);","            }","        });","","        return branches;","    },","","    /**","     * Find a node in the tree by specified the client ID of the model it contains.","     */","    _treeFind: function(value, branch, attr, type) {","        var self  = this,","            found = null;","","        attr = attr || 'clientId';","","        Y.Array.each(branch, function (item) {","            if (item.data.get(attr) === value) {","                if (!type || (item.data.name === type)) {","                    found = item;","                }","            }","","            if (Y.Lang.isNull(found) && item.children) {","                found = self._treeFind(value, item.children, attr, type);","            }","        });","","        return found;","    }","","}, {","	ATTRS: {","		items: {","			value: []","		}","	}","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').ModelTree = ModelTree;","","","}, '1.0.0', {\"requires\": [\"model\"]});"];
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].lines = {"1":0,"3":0,"5":0,"8":0,"11":0,"18":0,"21":0,"28":0,"33":0,"34":0,"35":0,"39":0,"46":0,"49":0,"56":0,"59":0,"60":0,"64":0,"65":0,"66":0,"68":0,"69":0,"72":0,"76":0,"83":0,"86":0,"88":0,"89":0,"90":0,"91":0,"95":0,"96":0,"100":0,"112":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].functions = {"getByAttr:7":0,"getByClientId:17":0,"(anonymous 2):33":0,"getLeavesByClientId:27":0,"getBranches:45":0,"(anonymous 3):59":0,"_findBranches:55":0,"(anonymous 4):88":0,"_treeFind:82":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredLines = 34;
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredFunctions = 10;
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

    /**
     * Get a model from the tree by client ID.
     */
    getByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByClientId", 17);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 18);
var tree = this.get('items'),
            node = this._treeFind(clientID, tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 21);
return node ? node.data : null;
    },

    /**
     * Get a model's leaves from the tree by client ID.
     */
    getLeavesByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getLeavesByClientId", 27);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 28);
var tree   = this.get('items'),
            node   = this._treeFind(clientID, tree),
            leaves = [];

        // Filter out the child branches, we just want the leaves.
        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 33);
Y.Array.each(node.children, function (c) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 2)", 33);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 34);
if (Y.Lang.isArray(c.children) === false) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 35);
leaves.push(c.data);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 39);
return leaves;
    },

    /**
     * Returns just the (potential) branch nodes.
     */
    getBranches: function () {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getBranches", 45);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 46);
var tree     = this.get('items'),
            branches = this._findBranches(tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 49);
return branches;
    },

    /**
     * Return all (potential) sub-branches of a given branch.
     */
    _findBranches: function(branch) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_findBranches", 55);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 56);
var self     = this,
            branches = [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 59);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 3)", 59);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 60);
var obj = {};

            // TODO: Make the instance to compare to a config attribute for the Treeview,
            // and get this data by calling getBranches(Y.TB.Category).
            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 64);
if (Y.instanceOf(item.data, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 65);
obj.label = item.label;
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 66);
obj.data  = item.data;

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 68);
if (item.children) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 69);
obj.children = self._findBranches(item.children);
                }

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 72);
branches.push(obj);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 76);
return branches;
    },

    /**
     * Find a node in the tree by specified the client ID of the model it contains.
     */
    _treeFind: function(value, branch, attr, type) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFind", 82);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 83);
var self  = this,
            found = null;

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 86);
attr = attr || 'clientId';

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 88);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 4)", 88);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 89);
if (item.data.get(attr) === value) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 90);
if (!type || (item.data.name === type)) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 91);
found = item;
                }
            }

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 95);
if (Y.Lang.isNull(found) && item.children) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 96);
found = self._treeFind(value, item.children, attr, type);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 100);
return found;
    }

}, {
	ATTRS: {
		items: {
			value: []
		}
	}
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 112);
Y.namespace('Libbit').ModelTree = ModelTree;


}, '1.0.0', {"requires": ["model"]});
