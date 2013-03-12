YUI.add('libbit-treeview-select', function (Y, NAME) {

/**
 * Selection extension for the LiBBiT TreeView widget.
 */
var Selectable;

Selectable = Y.Base.create('selectable', Y.Base, [], {

    /**
     * Reference pointer to event
     */
    selectEvent: null,

    /**
     * Set up a listener for the selectedItem attribute.
     */
    initializer: function () {
        this.after('render', this._afterRender, this);
    },

    /**
     * Bind the click events.
     */
    _afterRender: function () {
        var self = this;

        if (this.selectEvent) {
            this.selectEvent.detach();
        }

        if (!self.get('selectable')) {
            self.get('tree').detach('select', self.get('tree')._afterSelect);
        } else {
            this.get('tree').on('select', function (e) {
                var node  = e.node,
                    li    = self.get('tree').getHTMLNode(node),
                    model = node.data;

                self.get('boundingBox').all('.icon-white').removeClass('icon-white');

                if (Y.instanceOf(model, Y.Model)) {
                    if (typeof(self._iconMap[model.name]) != 'undefined') {
                        li.addClass('libbit-item-selected');
                        li.one('.libbit-treeview-icon').addClass('icon-white');
                    }
                }

                self.fire('select', { data: li.getData() });
            });

            self.selectEvent = self.get('tree').on('select', function (e) {
                var li = self.get('tree').getHTMLNode(e.node);

                self.selectedNode = parseInt(li.getAttribute('data-yui3-modelId'));
                self.fire('nodeSelected', e);
            });
        }
    }
}, {
    ATTRS: {
        /**
         * Config property, enable selection for this TreeView instance
         */
        selectable: {
            value : true
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0');
