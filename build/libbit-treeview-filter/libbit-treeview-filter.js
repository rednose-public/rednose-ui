YUI.add('libbit-treeview-filter', function (Y, NAME) {

var Filter;

Filter = Y.Base.create('filter', Y.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        // console.log(this.get('filter'));
            this.get('model').after('change', function() { console.log('filter'); }, this);
    },

    _applyFilter: function (filter) {
        console.log(this._nodeMap);
    },

    _setFilter: function (value) {
        if (value !== this.get('filter')) {
            this._applyFilter(value);
        }

        return value;
    }

}, {
    ATTRS: {
        filter: {
            setter: '_setFilter',
            value : null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').Filter = Filter;


}, '1.0.0', {"requires": ["libbit-treeview"]});
