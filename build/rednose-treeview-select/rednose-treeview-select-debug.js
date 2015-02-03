YUI.add('rednose-treeview-select', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Selection extension for the RedNose TreeView widget.
 */
var Selectable = Y.Base.create('selectable', Y.Base, [], {

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        var container = this.get('container');

        this.after('selectableChange', this._afterChange, this);
        container.on('clickoutside', this._onClickOutside, this);
    },

    // -- Protected Event Handlers ---------------------------------------------

    _onClickOutside: function (e) {
        // Clear the selection, only if the click outside target is an ancestor of the current target.
        if (e.currentTarget.get('parentNode') === e.target && this.get('unselectable')) {
            this.unselect();
        }
    },

    _afterChange: function () {
        this.unselect();
    },

    /**
     * @see TreeView._onRowClick()
     */
    _onRowClick: function (e) {
        if (e.button > 1 || !this.get('selectable')) {
            return;
        }


        var node = this.getNodeById(e.currentTarget.getData('node-id'));

        if (typeof(this.get('selectableTest')) === 'function') {
            if (this.get('selectableTest')(node) === false) {
                return;
            }
        }

        if (e.shiftKey && this.get('unselectable')) {
            node[node.isSelected() ? 'unselect' : 'select']();
        } else {
            node.select();
        }
    }
}, {
    ATTRS: {
        /**
         * Enable selection for this TreeView instance
         *
         * @type {Boolean}
         */
        selectable: {
            value: false
        },

        /**
         * Enable the ability to unselect items for this TreeView instance
         *
         * @type {Boolean}
         */
        unselectable: {
            value: true
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.TreeView').Selectable = Selectable;


}, '@VERSION@', {"requires": ["base", "event-outside"]});
