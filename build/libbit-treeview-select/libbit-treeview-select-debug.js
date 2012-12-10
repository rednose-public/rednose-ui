YUI.add('libbit-treeview-select', function (Y, NAME) {

/**
 * Selection extension for the LiBBiT TreeView widget.
 */
var Selectable;

Selectable = Y.Base.create('selectable', Y.Base, [], {

    /**
     * Set up a listener for the selectedItem attribute.
     */
    initializer: function () {
        // FIXME: The custom setter won't trigger if we don't get the attribute first.
        this.get('selectable');

        this.after('selectedItemChange', this._afterSelectedItemChange, this);
    },

    /**
     * Setter.
     */
    _setSelectable: function (selectable) {
        if (selectable === true) {
            this._bind();
        }

        return selectable;
    },

    /**
     * Bind the click events.
     */
    _bind: function () {
        var contentBox = this.get('contentBox');

        contentBox.on('click', this._handleClick, this);
    },

    /**
     * Handles the click event, and updates the selectedItem attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        var target = e.target;

        if (target.hasClass('icon-toggle')) {
            // This is an expand/collapse icon, ignore.
            return false;

        } else if (e.target.ancestor('.ygtvtable')) {
            // This is a tree view item, update the selection.
            this.set('selectedItem', target.ancestor('.ygtvtable'));

        /*} else if (e.target.ancestor('.yui3-datatable-columns')) {
            // This is a table column, ignore.
            return false;*/

        } else {
            // Clicked outside the items, reset the selection.
            this.set('selectedItem', null);
        }

        return true;
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedItemChange: function (e) {
        // TODO: Keep selection after sorting
        var node    = e.newVal,
            oldNode = e.prevVal,
            data    = this.get('data'),
            model   = null,
            leaves  = null,
            id;

        // Cancel if the selection did not change.
        if (node === oldNode) {
            return false;
        }

        // Remove all selection CSS on the previous selection
        if (oldNode) {
            // Inverse the icon color if there is one.
            if (oldNode.all('i')) {
                oldNode.all('i').removeClass('icon-white');
            }

            oldNode.removeClass('treeview-highlight');
        }

        // Apply the CSS to the new selection and fire an event.
        if (Y.Lang.isNull(node) === false) {
            id = node.getAttribute('data-yui3-record');

            // Inverse the icon color if there is one.
            if (node.all('i')) {
                node.all('i').addClass('icon-white');
            }

            // After unhighlighting, now highlight the current row.
            node.addClass('treeview-highlight');

            model  = data.getByClientId(id);
            leaves = data.getLeavesByClientId(id);
        }

        // Fires the select event and passes along the needed information.
        this.fire('select', { model : model, leaves: leaves });

        return true;
    }

}, {
    ATTRS: {
        /**
         * Config property, enable selection for this TreeView instance
         */
        selectable: {
            setter: '_setSelectable',
            value : false
        },

        /**
         * The item currently selected.
         */
        selectedItem : {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0');
