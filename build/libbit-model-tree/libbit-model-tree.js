YUI.add('libbit-model-tree', function (Y, NAME) {

var ModelTree;

ModelTree = Y.Base.create('modelTree', Y.Model, [], {

    getByAttr: function (type, attr, value) {
        var tree = this.get('items'),
            node = this._treeFind(value, tree, attr, type);

        return node ? node.data : null;
    },

    filterByAttr: function (type, attr, value) {
        var tree  = this.get('items'),
            nodes = this._treeFilter(value, tree, attr, type);

        return nodes;
    },

    /**
     * Get a model from the tree by client ID.
     */
    getByClientId: function (clientID) {
        var tree = this.get('items'),
            node = this._treeFind(clientID, tree);

        return node ? node.data : null;
    },

    /**
     * Get a model's leaves from the tree by client ID.
     */
    getLeavesByClientId: function (clientID) {
        var tree   = this.get('items'),
            node   = this._treeFind(clientID, tree),
            leaves = [];

        // Filter out the child branches, we just want the leaves.
        Y.Array.each(node.children, function (c) {
            if (Y.Lang.isArray(c.children) === false) {
                leaves.push(c.data);
            }
        });

        return leaves;
    },

    /**
     * Returns just the (potential) branch nodes.
     */
    getBranches: function () {
        var tree     = this.get('items'),
            branches = this._findBranches(tree);

        return branches;
    },

    /**
     * Return all (potential) sub-branches of a given branch.
     */
    _findBranches: function(branch) {
        var self     = this,
            branches = [];

        Y.Array.each(branch, function (item) {
            var obj = {};

            // TODO: Make the instance to compare to a config attribute for the Treeview,
            // and get this data by calling getBranches(Y.TB.Category).
            if (Y.instanceOf(item.data, Y.TB.Category)) {
                obj.label = item.label;
                obj.data  = item.data;

                if (item.children) {
                    obj.children = self._findBranches(item.children);
                }

                branches.push(obj);
            }
        });

        return branches;
    },

    /**
     * Find a node in the tree by specified the client ID of the model it contains.
     */
    _treeFind: function(value, branch, attr, type) {
        var self  = this,
            found = null;

        attr = attr || 'clientId';

        Y.Array.each(branch, function (item) {
            if (item.data.get(attr) === value) {
                if (!type || (item.data.name === type)) {
                    found = item;
                }
            }

            if (Y.Lang.isNull(found) && item.children) {
                found = self._treeFind(value, item.children, attr, type);
            }
        });

        return found;
    },

    _treeFilter: function(value, branch, attr, type) {
        var self   = this,
            buffer = [];

        attr = attr || 'clientId';

        Y.Array.each(branch, function (item) {
            var obj = {};

            if (item.data.name !== type || Y.Array.indexOf(value, item.data.get(attr)) !== -1) {
                obj.label = item.label;
                obj.data = item.data;

                if (item.children) {
                    obj.children = self._treeFilter(value, item.children, attr, type)
                }

                buffer.push(obj);
            }
        });

        return buffer;
    }
}, {
	ATTRS: {
		items: {
			value: [],
            getter: function (val) {
                if (this.get('filterApplyTo')) {
                    return this._treeFilter(this.get('filterIds'), val, 'id', this.get('filterApplyTo'));
                }

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
Y.namespace('Libbit').ModelTree = ModelTree;


}, '1.0.0', {"requires": ["model"]});
