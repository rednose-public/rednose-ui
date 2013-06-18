YUI.add('rednose-grid-select', function (Y, NAME) {

var Selectable;

/**
 * Y.Rednose.Grid widget extension to support selection of grid items
 */
Selectable = function () {};

Selectable.ATTRS = {
    /**
     * Config property, enable selection for this Grid instance
     */
    selectable: {
        value: false
    },

    /**
     * The item currently selected.
     */
    selectedItem : {
        value: null
    }
};

Selectable.prototype = {

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        this._setSelectable();
    },

    /**
    * Programmaticly select a grid item
    **/
    select: function(node) {
        node.simulate('click');
    },

    /**
     * Setter.
     */
    _setSelectable: function () {
        var selectable = this.get('selectable');

        if (selectable) {
            this._bind();
        }
    },

    /**
     * Bind the click events and set up a listener for the selectedItem attribute.
     */
    _bind: function () {
        var contentBox = this.get('contentBox');

        contentBox.delegate('click', this._handleClick, '.model-grid-icon-container', this);
        contentBox.delegate('dblclick', this._handleDoubleClick, '.model-grid-icon-container', this);
        this.after('selectedItemChange', this._afterSelectedItemChange, this);
    },

    /**
     * Handles the item click event, and updates the selectedItem attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        this.set('selectedItem', e.currentTarget);
    },

    _handleDoubleClick: function (e) {
        var node  = e.currentTarget,
            model = this._getModelFromGridItem(node);

        this.fire('open', { model: model });
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedItemChange: function (e) {
        var contentBox = this.get('contentBox'),
            node       = e.newVal,
            oldNode    = e.prevVal,
            model;

        // Cancel if the selection did not change.
        if (node === oldNode) {
            return false;
        }

        // Remove earlier selections.
        contentBox.all('.model-grid-item-selected').removeClass('model-grid-item-selected');

        // Apply the CSS to the new selection and fire an event.
        if (Y.Lang.isNull(node) === false) {
            node.addClass('model-grid-item-selected');

            model = this._getModelFromGridItem(node);

            // Fires the select event and passes along the needed information.
            this.fire('select', { model: model });
        }
    },

    /**
     * Parse an HTML node and retrieve the corresponding model from the model list.
     */
    _getModelFromGridItem: function (node) {
        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),
        // for example 'image_1'.
        var id        = node.ancestor('.model-grid-container').getAttribute('data-yui3-record'),
            data      = this.get('data'),
            found     = null;

        Y.Array.each(data, function (model) {
            if (model.get('clientId') === id) {
                found = model;
            }
        });

        return found;
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Grid').Selectable = Selectable;


}, '1.0.0');
