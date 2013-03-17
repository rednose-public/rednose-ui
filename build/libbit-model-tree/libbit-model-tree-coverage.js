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
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].code=["YUI.add('libbit-model-tree', function (Y, NAME) {","","var ModelTree;","","ModelTree = Y.Base.create('modelTree', Y.Model, [], {","","    _items: [],","","    getByType: function (type) {","        var tree = this._items;","","        return this._treeFindByType(type, tree);","    },","","    getByAttr: function (type, attr, value) {","        var tree = this._items,","            node = this._treeFind(value, tree, attr, type);","","        return node ? node.data : null;","    },","","    filterByAttr: function (type, attr, value) {","        var tree  = this._items;","","        return this._treeFilter(value, tree, attr, type);","    },","","    /**","     * Get a model from the tree by client ID.","     */","    getByClientId: function (clientID) {","        var tree = this._items,","            node = this._treeFind(clientID, tree);","","        return node ? node.data : null;","    },","","    /**","     * Get a model's leaves from the tree by client ID.","     */","    getLeavesByClientId: function (clientID) {","        var tree   = this._items,","            node   = this._treeFind(clientID, tree),","            leaves = [];","","        // Filter out the child branches, we just want the leaves.","        Y.Array.each(node.children, function (c) {","            if (Y.Lang.isArray(c.children) === false) {","                leaves.push(c.data);","            }","        });","","        return leaves;","    },","","    /**","     * Returns just the (potential) branch nodes.","     */","    getBranches: function () {","        var tree     = this._items,","            branches = this._findBranches(tree);","","        return branches;","    },","","    /**","     * Return all (potential) sub-branches of a given branch.","     */","    _findBranches: function (branch) {","        var self     = this,","            branches = [];","","        Y.Array.each(branch, function (item) {","            var obj = {};","","            // TODO: Make the instance to compare to a config attribute for the Treeview,","            // and get this data by calling getBranches(Y.TB.Category).","            if (Y.instanceOf(item.data, Y.TB.Category)) {","                obj.label = item.label;","                obj.data  = item.data;","","                if (item.children) {","                    obj.children = self._findBranches(item.children);","                }","","                branches.push(obj);","            }","        });","","        return branches;","    },","","    /**","     * Find a node in the tree by specified the client ID of the model it contains.","     */","    _treeFind: function (value, branch, attr, type) {","        var self  = this,","            found = null;","","        attr = attr || 'clientId';","","        Y.Array.each(branch, function (item) {","            if (item.data.get(attr) === value) {","                if (!type || (item.data.name === type)) {","                    found = item;","                }","            }","","            if (Y.Lang.isNull(found) && item.children) {","                found = self._treeFind(value, item.children, attr, type);","            }","        });","","        return found;","    },","","    _treeFindByType: function (type, branch, buffer) {","        var self   = this;","","        buffer = buffer || [];","","        Y.Array.each(branch, function (item) {","            if (item.data.name === type) {","                buffer.push(item.data);","            }","","            if (item.children) {","                buffer = self._treeFindByType(type, item.children, buffer);","            }","        });","","        return buffer;","    },","","    _treeFilter: function (value, branch, attr, type) {","        var self   = this,","            buffer = [];","","        attr = attr || 'clientId';","","        Y.Array.each(branch, function (item) {","            var obj = {};","","            if (item.data.name !== type || Y.Array.indexOf(value, item.data.get(attr)) !== -1) {","                obj.label = item.label;","                obj.data = item.data;","","                if (item.children) {","                    obj.children = self._treeFilter(value, item.children, attr, type);","                }","","                buffer.push(obj);","            }","        });","","        return buffer;","    },","","    _setItems: function (val) {","        this._items = val;","    },","","    _getItems: function () {","        var filter = this.get('filter');","","        if (filter && filter.type) {","            return this.filterByAttr(filter.type, filter.attr, filter.value);","        }","","        return this._items;","    }","}, {","	ATTRS: {","		items: {","            setter: '_setItems',","            getter: '_getItems'","        },","","        filter: {","            value : {}","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').ModelTree = ModelTree;","","","}, '1.0.0', {\"requires\": [\"model\"]});"];
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].lines = {"1":0,"3":0,"5":0,"10":0,"12":0,"16":0,"19":0,"23":0,"25":0,"32":0,"35":0,"42":0,"47":0,"48":0,"49":0,"53":0,"60":0,"63":0,"70":0,"73":0,"74":0,"78":0,"79":0,"80":0,"82":0,"83":0,"86":0,"90":0,"97":0,"100":0,"102":0,"103":0,"104":0,"105":0,"109":0,"110":0,"114":0,"118":0,"120":0,"122":0,"123":0,"124":0,"127":0,"128":0,"132":0,"136":0,"139":0,"141":0,"142":0,"144":0,"145":0,"146":0,"148":0,"149":0,"152":0,"156":0,"160":0,"164":0,"166":0,"167":0,"170":0,"186":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].functions = {"getByType:9":0,"getByAttr:15":0,"filterByAttr:22":0,"getByClientId:31":0,"(anonymous 2):47":0,"getLeavesByClientId:41":0,"getBranches:59":0,"(anonymous 3):73":0,"_findBranches:69":0,"(anonymous 4):102":0,"_treeFind:96":0,"(anonymous 5):122":0,"_treeFindByType:117":0,"(anonymous 6):141":0,"_treeFilter:135":0,"_setItems:159":0,"_getItems:163":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredLines = 62;
_yuitest_coverage["build/libbit-model-tree/libbit-model-tree.js"].coveredFunctions = 18;
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 1);
YUI.add('libbit-model-tree', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 3);
var ModelTree;

_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 5);
ModelTree = Y.Base.create('modelTree', Y.Model, [], {

    _items: [],

    getByType: function (type) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByType", 9);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 10);
var tree = this._items;

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 12);
return this._treeFindByType(type, tree);
    },

    getByAttr: function (type, attr, value) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByAttr", 15);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 16);
var tree = this._items,
            node = this._treeFind(value, tree, attr, type);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 19);
return node ? node.data : null;
    },

    filterByAttr: function (type, attr, value) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "filterByAttr", 22);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 23);
var tree  = this._items;

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 25);
return this._treeFilter(value, tree, attr, type);
    },

    /**
     * Get a model from the tree by client ID.
     */
    getByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getByClientId", 31);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 32);
var tree = this._items,
            node = this._treeFind(clientID, tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 35);
return node ? node.data : null;
    },

    /**
     * Get a model's leaves from the tree by client ID.
     */
    getLeavesByClientId: function (clientID) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getLeavesByClientId", 41);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 42);
var tree   = this._items,
            node   = this._treeFind(clientID, tree),
            leaves = [];

        // Filter out the child branches, we just want the leaves.
        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 47);
Y.Array.each(node.children, function (c) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 2)", 47);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 48);
if (Y.Lang.isArray(c.children) === false) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 49);
leaves.push(c.data);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 53);
return leaves;
    },

    /**
     * Returns just the (potential) branch nodes.
     */
    getBranches: function () {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "getBranches", 59);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 60);
var tree     = this._items,
            branches = this._findBranches(tree);

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 63);
return branches;
    },

    /**
     * Return all (potential) sub-branches of a given branch.
     */
    _findBranches: function (branch) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_findBranches", 69);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 70);
var self     = this,
            branches = [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 73);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 3)", 73);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 74);
var obj = {};

            // TODO: Make the instance to compare to a config attribute for the Treeview,
            // and get this data by calling getBranches(Y.TB.Category).
            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 78);
if (Y.instanceOf(item.data, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 79);
obj.label = item.label;
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 80);
obj.data  = item.data;

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 82);
if (item.children) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 83);
obj.children = self._findBranches(item.children);
                }

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 86);
branches.push(obj);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 90);
return branches;
    },

    /**
     * Find a node in the tree by specified the client ID of the model it contains.
     */
    _treeFind: function (value, branch, attr, type) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFind", 96);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 97);
var self  = this,
            found = null;

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 100);
attr = attr || 'clientId';

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 102);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 4)", 102);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 103);
if (item.data.get(attr) === value) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 104);
if (!type || (item.data.name === type)) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 105);
found = item;
                }
            }

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 109);
if (Y.Lang.isNull(found) && item.children) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 110);
found = self._treeFind(value, item.children, attr, type);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 114);
return found;
    },

    _treeFindByType: function (type, branch, buffer) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFindByType", 117);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 118);
var self   = this;

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 120);
buffer = buffer || [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 122);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 5)", 122);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 123);
if (item.data.name === type) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 124);
buffer.push(item.data);
            }

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 127);
if (item.children) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 128);
buffer = self._treeFindByType(type, item.children, buffer);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 132);
return buffer;
    },

    _treeFilter: function (value, branch, attr, type) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_treeFilter", 135);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 136);
var self   = this,
            buffer = [];

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 139);
attr = attr || 'clientId';

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 141);
Y.Array.each(branch, function (item) {
            _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "(anonymous 6)", 141);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 142);
var obj = {};

            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 144);
if (item.data.name !== type || Y.Array.indexOf(value, item.data.get(attr)) !== -1) {
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 145);
obj.label = item.label;
                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 146);
obj.data = item.data;

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 148);
if (item.children) {
                    _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 149);
obj.children = self._treeFilter(value, item.children, attr, type);
                }

                _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 152);
buffer.push(obj);
            }
        });

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 156);
return buffer;
    },

    _setItems: function (val) {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_setItems", 159);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 160);
this._items = val;
    },

    _getItems: function () {
        _yuitest_coverfunc("build/libbit-model-tree/libbit-model-tree.js", "_getItems", 163);
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 164);
var filter = this.get('filter');

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 166);
if (filter && filter.type) {
            _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 167);
return this.filterByAttr(filter.type, filter.attr, filter.value);
        }

        _yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 170);
return this._items;
    }
}, {
	ATTRS: {
		items: {
            setter: '_setItems',
            getter: '_getItems'
        },

        filter: {
            value : {}
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-model-tree/libbit-model-tree.js", 186);
Y.namespace('Libbit').ModelTree = ModelTree;


}, '1.0.0', {"requires": ["model"]});
