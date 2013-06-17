var ModelTree;

ModelTree = Y.Base.create('modelTree', Y.Model, [], {

    _items: [],

    getByType: function (type) {
        var tree = this._items;

        return this._treeFindByType(type, tree);
    },

    getByAttr: function (type, attr, value) {
        var tree = this._items,
            node = this._treeFind(value, tree, attr, type);

        return node ? node.data : null;
    },

    filterByAttr: function (type, attr, value) {
        var tree  = this._items;

        return this._treeFilter(value, tree, attr, type);
    },

    /**
     * Get a model from the tree by client ID.
     */
    getByClientId: function (clientID) {
        var tree = this._items,
            node = this._treeFind(clientID, tree);

        return node ? node.data : null;
    },

    /**
     * Get a model's leaves from the tree by client ID.
     */
    getLeavesByClientId: function (clientID) {
        var tree   = this._items,
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
        var tree     = this._items,
            branches = this._findBranches(tree);

        return branches;
    },

    /**
     * Return all (potential) sub-branches of a given branch.
     */
    _findBranches: function (branch) {
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
    _treeFind: function (value, branch, attr, type) {
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

    _treeFindByType: function (type, branch, buffer) {
        var self   = this;

        buffer = buffer || [];

        Y.Array.each(branch, function (item) {
            if (item.data.name === type) {
                buffer.push(item.data);
            }

            if (item.children) {
                buffer = self._treeFindByType(type, item.children, buffer);
            }
        });

        return buffer;
    },

    _treeFilter: function (value, branch, attr, type) {
        var self   = this,
            buffer = [];

        attr = attr || 'clientId';

        Y.Array.each(branch, function (item) {
            var obj = {};

            if (item.data.name !== type || Y.Array.indexOf(value, item.data.get(attr)) !== -1) {
                obj.label = item.label;
                obj.data = item.data;

                if (item.children) {
                    obj.children = self._treeFilter(value, item.children, attr, type);
                }

                buffer.push(obj);
            }
        });

        return buffer;
    },

    _setItems: function (val) {
        this._items = val;
    },

    _getItems: function () {
        var filter = this.get('filter');

        if (filter && filter.type) {
            return this.filterByAttr(filter.type, filter.attr, filter.value);
        }

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
Y.namespace('Rednose').ModelTree = ModelTree;
