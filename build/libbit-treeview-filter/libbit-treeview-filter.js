YUI.add('libbit-treeview-filter', function (Y, NAME) {

var Filter;

/**
 * Filter extension for the TreeView.
 */
Filter = Y.Base.create('filter', Y.Base, [], {

    applyFilter: function (refresh) {
        var self = this;
        var model = this.get('data');

        self.afterEvent.detach();
        self.afterEvent = model.after('load', function() {
            model.set('items', self._applyFilterToModel(model.get('items')));

            self.set('data', model);

            if (refresh) {
                self.refresh();
            }
        });

        return this;
    },

    _applyFilterToModel: function (modelItems) {
        var buffer = [];
        var filterIds = this.get('filterIds');
        var self = this;

        for (var index in modelItems) {
            if (modelItems[index].children) {
                modelItems[index].children = self._applyFilterToModel(modelItems[index].children);
            }

            if (modelItems[index].data.name === self.get('filterApplyTo')) {
                var itemId = parseInt(modelItems[index].data.get('id'));
                var inFilter = Y.Array.indexOf(filterIds, itemId);

                if (inFilter !== -1) {
                    buffer.push(modelItems[index]);
                }
            } else {
                buffer.push(modelItems[index]);
            }
        }

        return buffer;
    }
}, {
    ATTRS: {
        filterApplyTo: {
            value : 'unknown'
        },

        filterIds: {
            value : []
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').Filter = Filter;


}, '1.0.0', {"requires": []});
