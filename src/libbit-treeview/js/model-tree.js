var ModelTree;

ModelTree = Y.Base.create('modelTree', Y.Model, [], {

    getByAttr: function (type, attr, value) {
        var tree = this.get('items'),
            node = this._treeFind(value, tree, attr, type);

        return node ? node.data : null;
    },

    /**
     * Get a model from the tree by client ID.
     */
    getByClientId: function (clientID) {
        var tree = this.get('items'),
            node = this._treeFind(clientID, tree);
alert('hoi');
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

        attr = attr || 'clientID';

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
    }

}, {
	ATTRS: {
		items: {
			value: []
		}
	}
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').ModelTree = ModelTree;
