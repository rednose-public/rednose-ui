YUI.add('libbit-treeview-select', function (Y, NAME) {

/**
 * Selection extension for the LiBBiT TreeView widget.
 */
var Selectable;

Selectable = Y.Base.create('selectable', Y.Base, [], {

    // -- Protected Properties -------------------------------------------------

    _selectMap: [],

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this.on('select', this._handleSelectState, this);
        this.on('unselect', this._handleUnSelectState, this);

        this.after('select', this._handleSelect, this);
        this.after('unselect', this._handleUnselect, this);

        // Select needs to be restored after the tree is rendered.
        Y.Do.after(this._restoreSelectState, this, 'render');
    },

    destructor: function () {
        for (var i in this._selectMap) {
            delete this._selectMap[i];
        }
    },

    // -- Protected Methods ----------------------------------------------------

    _restoreSelectState: function () {
        var container = this.get('container'),
            self      = this;

        if (this._selectMap && this._selectMap.length > 0) {
            Y.Array.each(this._selectMap, function (id) {
                // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it
                // after another selection is made.
                var record = self.parseLibbitRecordId(id);

                container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {

                    if (node.getData('libbit-id') === record[1]) {
                        self.getNodeById(node.getData('node-id')).select();
                    }
                });
            });
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    _handleSelect: function (e) {
        var htmlNode   = this.getHTMLNode(e.node);

        htmlNode.one('.libbit-treeview-icon').addClass('icon-white');
    },

    _handleUnselect: function (e) {
        var htmlNode   = this.getHTMLNode(e.node);
            selectable = this.get('selectable');

        if (htmlNode.one('.libbit-treeview-icon').hasClass('icon-white')) {
            htmlNode.one('.libbit-treeview-icon').removeClass('icon-white');
        }
    },

    _handleSelectState: function (e) {
        var id         = this.generateLibbitRecordId(e.node.data),
            index      = Y.Array.indexOf(this._selectMap, id);
            selectable = this.get('selectable');

        if (!selectable) {
            // If selectable is disabled, don't allow this event to propagate
            // to other select handlers.
            e.stopImmediatePropagation();
        }

        if (selectable && index === -1) {
            this._selectMap.push(id);
        }
    },

    _handleUnSelectState: function (e) {
        var id    = this.generateLibbitRecordId(e.node.data),
            index = Y.Array.indexOf(this._selectMap, id);

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
