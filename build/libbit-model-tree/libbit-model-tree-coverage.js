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
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].code=["YUI.add('libbit-model-tree', function (Y, NAME) {","","var ModelTree;","","ModelTree = Y.Base.create('modelTree', Y.Model, [], {","","    getByType: function (type) {","        var tree = this.get('items');","","        return this._treeFindByType(type, tree);","    },","","    getByAttr: function (type, attr, value) {","        var tree = this.get('items'),","            node = this._treeFind(value, tree, attr, type);","","        return node ? node.data : null;","    },","","    filterByAttr: function (type, attr, value) {","        var tree  = this.get('items');","","        return this._treeFilter(value, tree, attr, type);","    },","","    /**","     * Get a model from the tree by client ID.","     */","    getByClientId: function (clientID) {","        var tree = this.get('items'),","            node = this._treeFind(clientID, tree);","","        return node ? node.data : null;","    },","","    /**","     * Get a model's leaves from the tree by client ID.","     */","    getLeavesByClientId: function (clientID) {","        var tree   = this.get('items'),","            node   = this._treeFind(clientID, tree),","            leaves = [];","","        // Filter out the child branches, we just want the leaves.","        Y.Array.each(node.children, function (c) {","            if (Y.Lang.isArray(c.children) === false) {","                leaves.push(c.data);","            }","        });","","        return leaves;","    },","","    /**","     * Returns just the (potential) branch nodes.","     */","    getBranches: function () {","        var tree     = this.get('items'),","            branches = this._findBranches(tree);","","        return branches;","    },","","    /**","     * Return all (potential) sub-branches of a given branch.","     */","    _findBranches: function (branch) {","        var self     = this,","            branches = [];","","        Y.Array.each(branch, function (item) {","            var obj = {};","","            // TODO: Make the instance to compare to a config attribute for the Treeview,","            // and get this data by calling getBranches(Y.TB.Category).","            if (Y.instanceOf(item.data, Y.TB.Category)) {","                obj.label = item.label;","                obj.data  = item.data;","","                if (item.children) {","                    obj.children = self._findBranches(item.children);","                }","","                branches.push(obj);","            }","        });","","        return branches;","    },","","    /**","     * Find a node in the tree by specified the client ID of the model it contains.","     */","    _treeFind: function (value, branch, attr, type) {","        var self  = this,","            found = null;","","        attr = attr || 'clientId';","","        Y.Array.each(branch, function (item) {","            if (item.data.get(attr) === value) {","                if (!type || (item.data.name === type)) {","                    found = item;","                }","            }","","            if (Y.Lang.isNull(found) && item.children) {","                found = self._treeFind(value, item.children, attr, type);","            }","        });","","        return found;","    },","","    _treeFindByType: function (type, branch, buffer) {","        var self   = this;","","        buffer = buffer || [];","","        Y.Array.each(branch, function (item) {","            if (item.data.name === type) {","                buffer.push(item.data);","            }","","            if (item.children) {","                buffer = self._treeFindByType(type, item.children, buffer);","            }","        });","","        return buffer;","    },","","    _treeFilter: function (value, branch, attr, type) {","        var self   = this,","            buffer = [];","","        attr = attr || 'clientId';","","        Y.Array.each(branch, function (item) {","            var obj = {};","","            if (item.data.name !== type || Y.Array.indexOf(value, item.data.get(attr)) !== -1) {","                obj.label = item.label;","                obj.data = item.data;","","                if (item.children) {","                    obj.children = self._treeFilter(value, item.children, attr, type);","                }","","                buffer.push(obj);","            }","        });","","        return buffer;","    }","}, {","	ATTRS: {","		items: {","			value: []","        }","	}","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').ModelTree = ModelTree;","","","}, '1.0.0', {\"requires\": [\"model\"]});"];
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].lines = {"1":0,"3":0,"5":0,"8":0,"10":0,"14":0,"17":0,"21":0,"23":0,"30":0,"33":0,"40":0,"45":0,"46":0,"47":0,"51":0,"58":0,"61":0,"68":0,"71":0,"72":0,"76":0,"77":0,"78":0,"80":0,"81":0,"84":0,"88":0,"95":0,"98":0,"100":0,"101":0,"102":0,"103":0,"107":0,"108":0,"112":0,"116":0,"118":0,"120":0,"121":0,"122":0,"125":0,"126":0,"130":0,"134":0,"137":0,"139":0,"140":0,"142":0,"143":0,"144":0,"146":0,"147":0,"150":0,"154":0,"165":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].functions = {"getByType:7":0,"getByAttr:13":0,"filterByAttr:20":0,"getByClientId:29":0,"(anonymous 2):45":0,"getLeavesByClientId:39":0,"getBranches:57":0,"(anonymous 3):71":0,"_findBranches:67":0,"(anonymous 4):100":0,"_treeFind:94":0,"(anonymous 5):120":0,"_treeFindByType:115":0,"(anonymous 6):139":0,"_treeFilter:133":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredLines = 57;
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredFunctions = 16;
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 1);
YUI.add('libbit-model-tree', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 3);
var ModelTree;

_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 5);
ModelTree = Y.Base.create('modelTree', Y.Model, [], {

    getByType: function (type) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByType", 7);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 8);
var tree = this.get('items');

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 10);
return this._treeFindByType(type, tree);
    },

    getByAttr: function (type, attr, value) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByAttr", 13);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 14);
var tree = this.get('items'),
            node = this._treeFind(value, tree, attr, type);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 17);
return node ? node.data : null;
    },

    filterByAttr: function (type, attr, value) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "filterByAttr", 20);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 21);
var tree  = this.get('items');

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 23);
return this._treeFilter(value, tree, attr, type);
    },

    /**
     * Get a model from the tree by client ID.
     */
    getByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByClientId", 29);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 30);
var tree = this.get('items'),
            node = this._treeFind(clientID, tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 33);
return node ? node.data : null;
    },

    /**
     * Get a model's leaves from the tree by client ID.
     */
    getLeavesByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getLeavesByClientId", 39);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 40);
var tree   = this.get('items'),
            node   = this._treeFind(clientID, tree),
            leaves = [];

        // Filter out the child branches, we just want the leaves.
        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 45);
Y.Array.each(node.children, function (c) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 2)", 45);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 46);
if (Y.Lang.isArray(c.children) === false) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 47);
leaves.push(c.data);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 51);
return leaves;
    },

    /**
     * Returns just the (potential) branch nodes.
     */
    getBranches: function () {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getBranches", 57);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 58);
var tree     = this.get('items'),
            branches = this._findBranches(tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 61);
return branches;
    },

    /**
     * Return all (potential) sub-branches of a given branch.
     */
    _findBranches: function (branch) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_findBranches", 67);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 68);
var self     = this,
            branches = [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 71);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 3)", 71);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 72);
var obj = {};

            // TODO: Make the instance to compare to a config attribute for the Treeview,
            // and get this data by calling getBranches(Y.TB.Category).
            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 76);
if (Y.instanceOf(item.data, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 77);
obj.label = item.label;
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 78);
obj.data  = item.data;

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 80);
if (item.children) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 81);
obj.children = self._findBranches(item.children);
                }

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 84);
branches.push(obj);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 88);
return branches;
    },

    /**
     * Find a node in the tree by specified the client ID of the model it contains.
     */
    _treeFind: function (value, branch, attr, type) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFind", 94);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 95);
var self  = this,
            found = null;

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 98);
attr = attr || 'clientId';

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 100);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 4)", 100);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 101);
if (item.data.get(attr) === value) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 102);
if (!type || (item.data.name === type)) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 103);
found = item;
                }
            }

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 107);
if (Y.Lang.isNull(found) && item.children) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 108);
found = self._treeFind(value, item.children, attr, type);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 112);
return found;
    },

    _treeFindByType: function (type, branch, buffer) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFindByType", 115);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 116);
var self   = this;

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 118);
buffer = buffer || [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 120);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 5)", 120);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 121);
if (item.data.name === type) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 122);
buffer.push(item.data);
            }

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 125);
if (item.children) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 126);
buffer = self._treeFindByType(type, item.children, buffer);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 130);
return buffer;
    },

    _treeFilter: function (value, branch, attr, type) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFilter", 133);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 134);
var self   = this,
            buffer = [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 137);
attr = attr || 'clientId';

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 139);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 6)", 139);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 140);
var obj = {};

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 142);
if (item.data.name !== type || Y.Array.indexOf(value, item.data.get(attr)) !== -1) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 143);
obj.label = item.label;
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 144);
obj.data = item.data;

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 146);
if (item.children) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 147);
obj.children = self._treeFilter(value, item.children, attr, type);
                }

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 150);
buffer.push(obj);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 154);
return buffer;
    }
}, {
	ATTRS: {
		items: {
			value: []
        }
	}
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 165);
Y.namespace('Libbit').ModelTree = ModelTree;


}, '1.0.0', {"requires": ["model"]});
