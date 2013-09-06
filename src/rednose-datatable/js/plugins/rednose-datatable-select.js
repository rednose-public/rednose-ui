/**
 * Create a selection plugin for the RedNose DataTable widget.
 */
var CSS_DATATABLE   = 'datatable',
    CSS_SELECTED    = 'selected',
    CSS_DATA        = 'data',
    CSS_COLUMNS     = 'columns',
    CSS_ICON_INVERT = 'icon-white',
    DATA_RECORD     = 'data-yui3-record';

function DataTableSelectPlugin() {
    DataTableSelectPlugin.superclass.constructor.apply(this, arguments);
}

/**
 * The identity of the plugin.
 */
DataTableSelectPlugin.NAME = 'dataTableSelectPlugin';

/**
 * The namespace for the plugin.
 */
DataTableSelectPlugin.NS = 'selectable';

/**
 * Static property used to define the default attribute configuration of the
 * plugin.
 */
DataTableSelectPlugin.ATTRS = {

    /**
     * The row currently selected.
     */
    selectedRow : {
        value: null
    }
};

// TODO: Persist selection after sorting.
Y.extend(DataTableSelectPlugin, Y.Plugin.Base, {

    /**
     * Bind the click events and set up a listener for the selectedRow attribute.
     */
    initializer: function () {
        var table      = this.get('host'),
            contentBox = table.get('contentBox');

        this.after('selectedRowChange', this._afterSelectedRowChange, this);
        contentBox.on('click', this._handleClick, this);
    },

    /**
     * Handles the click event, and updates the selectedRow attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        var target = e.target,
            host   = this.get('host');

        if (target.ancestor('.' + host.getClassName(CSS_DATA) + ' tr')) {
            // This is a table row, update the selection.
            this.set('selectedRow', target.ancestor('.' + host.getClassName(CSS_DATA) +  ' tr'));

        } else if (target.ancestor('.' + host.getClassName(CSS_COLUMNS))) {
            // This is a table column, ignore.
            return false;

        } else {
            // Clicked outside the rows, reset the selection.
            this.set('selectedRow', null);
        }

        return true;
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedRowChange: function (e) {
        // TODO: Keep selection after sorting
        var table   = this.get('host'),
            node    = e.newVal,
            oldNode = e.prevVal,
            model   = null;

        // Cancel if the selection did not change.
        if (node === oldNode) {
            return false;
        }

        // Remove all selection CSS on the previous selection
        if (oldNode) {
            oldNode.all('td').removeClass(table.getClassName(CSS_DATATABLE, CSS_SELECTED));

            // Inverse the icon color if there is one.
            if (oldNode.one('i') && oldNode.one('i').hasClass(CSS_ICON_INVERT)) {
                oldNode.one('i').removeClass(CSS_ICON_INVERT);
            }
        }

        // Apply the CSS to the new selection and fire an event.
        if (Y.Lang.isNull(node) === false) {
            // After unhighlighting, now highlight the current row.
            node.all('td').addClass(table.getClassName(CSS_DATATABLE, CSS_SELECTED));

            // Inverse the icon color if there is one.
            if (node.one('i')) {
                node.one('i').addClass(CSS_ICON_INVERT);
            }

            model = this._getModelFromTableRow(node);
        }

        // Fires the select event from the host and passes along the needed information.
        table.fire('select', { model: model });

        return true;
    },

    /**
     * Parse an HTML <tr/> node and retrieve the corresponding model from the model list.
     */
    _getModelFromTableRow: function (node) {
        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),
        // for example 'image_1'.
        var id        = node.getAttribute(DATA_RECORD),
            modelList = this.get('host').data;

        return modelList.getByClientId(id);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DataTableSelectPlugin = DataTableSelectPlugin;
