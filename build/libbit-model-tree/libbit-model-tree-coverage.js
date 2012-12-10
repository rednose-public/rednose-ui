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
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].code=["YUI.add('libbit-model-tree', function (Y, NAME) {","","var ModelTree;","","ModelTree = Y.Base.create('modelTree', Y.Model, [], {","    /**","     * Get a model from the tree by client ID.","     */","    getByClientId: function (clientID) {","        var tree = this.get('items'),","            node = this._treeFind(clientID, tree);","","        return node ? node.data : null;","    },","","    /**","     * Get a model's leaves from the tree by client ID.","     */","    getLeavesByClientId: function (clientID) {","        var tree   = this.get('items'),","            node   = this._treeFind(clientID, tree),","            leaves = [];","","        // Filter out the child branches, we just want the leaves.","        Y.Array.each(node.children, function (c) {","            if (Y.Lang.isArray(c.children) === false) {","                leaves.push(c.data);","            }","        });","","        return leaves;","    },","","    /**","     * Returns just the (potential) branch nodes.","     */","    getBranches: function () {","        var tree     = this.get('items'),","            branches = this._findBranches(tree);","","        return branches;","    },","","    /**","     * Return all (potential) sub-branches of a given branch.","     */","    _findBranches: function(branch) {","        var self     = this,","            branches = [];","","        Y.Array.each(branch, function (item) {","            var obj = {};","","            // TODO: Make the instance to compare to a config attribute for the Treeview,","            // and get this data by calling getBranches(Y.TB.Category).","            if (Y.instanceOf(item.data, Y.TB.Category)) {","                obj.label = item.label;","                obj.data  = item.data;","","                if (item.children) {","                    obj.children = self._findBranches(item.children);","                }","","                branches.push(obj);","            }","        });","","        return branches;","    },","","    /**","     * Find a node in the tree by specified the client ID of the model it contains.","     */","    _treeFind: function(clientID, branch) {","        var self  = this,","            found = null;","","        Y.Array.each(branch, function (item) {","            if (item.data.get('clientId') === clientID) {","                found = item;","            }","","            if (Y.Lang.isNull(found) && item.children) {","                found = self._treeFind(clientID, item.children);","            }","        });","","        return found;","    }","","}, {","	ATTRS: {","		items: {","			value: []","		}","	}","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').ModelTree = ModelTree;","","","}, '1.0.0', {\"requires\": [\"model\"]});"];
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].lines = {"1":0,"3":0,"5":0,"10":0,"13":0,"20":0,"25":0,"26":0,"27":0,"31":0,"38":0,"41":0,"48":0,"51":0,"52":0,"56":0,"57":0,"58":0,"60":0,"61":0,"64":0,"68":0,"75":0,"78":0,"79":0,"80":0,"83":0,"84":0,"88":0,"100":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].functions = {"getByClientId:9":0,"(anonymous 2):25":0,"getLeavesByClientId:19":0,"getBranches:37":0,"(anonymous 3):51":0,"_findBranches:47":0,"(anonymous 4):78":0,"_treeFind:74":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredLines = 30;
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredFunctions = 9;
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 1);
YUI.add('libbit-model-tree', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 3);
var ModelTree;

_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 5);
ModelTree = Y.Base.create('modelTree', Y.Model, [], {
    /**
     * Get a model from the tree by client ID.
     */
    getByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByClientId", 9);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 10);
var tree = this.get('items'),
            node = this._treeFind(clientID, tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 13);
return node ? node.data : null;
    },

    /**
     * Get a model's leaves from the tree by client ID.
     */
    getLeavesByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getLeavesByClientId", 19);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 20);
var tree   = this.get('items'),
            node   = this._treeFind(clientID, tree),
            leaves = [];

        // Filter out the child branches, we just want the leaves.
        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 25);
Y.Array.each(node.children, function (c) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 2)", 25);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 26);
if (Y.Lang.isArray(c.children) === false) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 27);
leaves.push(c.data);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 31);
return leaves;
    },

    /**
     * Returns just the (potential) branch nodes.
     */
    getBranches: function () {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getBranches", 37);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 38);
var tree     = this.get('items'),
            branches = this._findBranches(tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 41);
return branches;
    },

    /**
     * Return all (potential) sub-branches of a given branch.
     */
    _findBranches: function(branch) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_findBranches", 47);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 48);
var self     = this,
            branches = [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 51);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 3)", 51);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 52);
var obj = {};

            // TODO: Make the instance to compare to a config attribute for the Treeview,
            // and get this data by calling getBranches(Y.TB.Category).
            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 56);
if (Y.instanceOf(item.data, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 57);
obj.label = item.label;
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 58);
obj.data  = item.data;

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 60);
if (item.children) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 61);
obj.children = self._findBranches(item.children);
                }

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 64);
branches.push(obj);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 68);
return branches;
    },

    /**
     * Find a node in the tree by specified the client ID of the model it contains.
     */
    _treeFind: function(clientID, branch) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFind", 74);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 75);
var self  = this,
            found = null;

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 78);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 4)", 78);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 79);
if (item.data.get('clientId') === clientID) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 80);
found = item;
            }

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 83);
if (Y.Lang.isNull(found) && item.children) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 84);
found = self._treeFind(clientID, item.children);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 88);
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
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 100);
Y.namespace('Libbit').ModelTree = ModelTree;


}, '1.0.0', {"requires": ["model"]});
