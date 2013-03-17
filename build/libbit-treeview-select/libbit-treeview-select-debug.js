YUI.add('libbit-treeview-select', function (Y, NAME) {

/**
 * Selection extension for the LiBBiT TreeView widget.
 */
var Selectable;

Selectable = Y.Base.create('selectable', Y.Base, [], {

    _selectMap: [],

    initializer: function () {
        this.on('select', this._handleSelect, this);
        this.on('select', this._handleSelectState, this);
        this.on('unselect', this._handleUnSelectState, this);

        // Select needs to be restored after the tree is rendered.
        Y.Do.after(this._restoreSelectState, this, 'render');
    },

    _restoreSelectState: function () {
        var container = this.get('container'),
            self      = this;

        if (this._selectMap && this._selectMap.length > 0) {
            Y.Array.each(this._selectMap, function (id) {
                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it
                // after another selection is made.
                var record = self._parseLibbitRecordId(id);

                container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {

                    if (node.getData('libbit-id') === record[1]) {
                        self.getNodeById(node.getData('node-id')).select();
                    }
                });
            });
        }
    },

    _handleSelect: function (e) {
        var selectable = this.get('selectable');

        if (selectable) {
            // var container = this.get('container'),
            //     node      = e.node,
            //     li        = this.getHTMLNode(node),
            //     model     = node.data;

            // container.all('.icon-white').removeClass('icon-white');

            // if (Y.instanceOf(model, Y.Model)) {
            //     if (typeof(this._iconMap[model.name]) !== 'undefined') {
            //         li.addClass('libbit-item-selected');
            //         li.one('.libbit-treeview-icon').addClass('icon-white');
            //     }
            // }
        } else {
            // If selectable is disabled, don't allow this event to propagate
            // to other select handlers.
            e.stopImmediatePropagation();
        }
    },

    _handleSelectState: function (e) {
        var id = this._generateLibbitRecordId(e.node.data);
        var index = Y.Array.indexOf(this._selectMap, id);

        if (index === -1) {
            this._selectMap.push(id);
        }
    },

    _handleUnSelectState: function (e) {
        var id = this._generateLibbitRecordId(e.node.data);
        var index = Y.Array.indexOf(this._selectMap, id);

        if (index !== -1) {
           this._selectMap.splice(index, 1);
        }
    }

}, {
    ATTRS: {
        /**
         * Enable selection for this TreeView instance
         */
        selectable: {
            value : true
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0', {"requires": ["libbit-treeview"]});
