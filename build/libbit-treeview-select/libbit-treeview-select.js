YUI.add('libbit-treeview-select', function (Y, NAME) {

/**
 * Selection extension for the LiBBiT TreeView widget.
 */
var Selectable;

Selectable = Y.Base.create('selectable', Y.Base, [], {

    initializer: function () {
        this.on('select', this._handleSelect, this);
    },

    _handleSelect: function (e) {
        var selectable = this.get('selectable');

        if (selectable) {
            var container = this.get('container'),
                node      = e.node,
                li        = this.getHTMLNode(node),
                model     = node.data;

            container.all('.icon-white').removeClass('icon-white');

            if (Y.instanceOf(model, Y.Model)) {
                if (typeof(this._iconMap[model.name]) !== 'undefined') {
                    li.addClass('libbit-item-selected');
                    li.one('.libbit-treeview-icon').addClass('icon-white');
                }
            }
        } else {
            e.stopImmediatePropagation();
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
