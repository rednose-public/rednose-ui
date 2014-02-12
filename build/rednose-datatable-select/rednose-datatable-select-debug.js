YUI.add('rednose-datatable-select', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Create a selection plugin for the RedNose DataTable widget.
 */
var CSS_SELECTED = 'selected',
    CSS_DATA     = 'data',
    CSS_COLUMNS  = 'columns',

    CSS_BOOTSTRAP_ICON_WHITE = 'icon-white',

    DATA_RECORD = 'data-yui3-record',

    /**
    Fired when a row is selected.

    @event select
    **/
    EVT_SELECT = 'select';

function DataTableSelectPlugin () {
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
        contentBox.on('clickoutside', this._handleClickOutside, this);
    },

    setSelection: function (selection) {
        var host = this.get('host'),
            row  = host.getRow(selection);

        if (row) {
            this.set('selectedRow', row);
        }
    },

    getSelection: function () {
        var row = this.get('selectedRow');

        if (row === null) {
            return null;
        }

        return this._getModelFromTableRow(row);
    },

    /**
     * Handles the click event, and updates the selectedRow attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        var target = e.target,
            host   = this.get('host');

        if (target.test('a')) {
            // Don't trigger selection for URL clicks.
            return false;
        }

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
     * Handles the click event outside of the content-box and clears the selection.
     */
    _handleClickOutside: function () {
        // FIXME: Deselect should only trigger when clicked inside the container but outside the table.
        // this.set('selectedRow', null);
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
            oldNode.all('td').removeClass(table.getClassName(CSS_SELECTED));

            // Inverse the icon color if there is one.
            if (oldNode.one('i') && oldNode.one('i').hasClass(CSS_BOOTSTRAP_ICON_WHITE)) {
                oldNode.one('i').removeClass(CSS_BOOTSTRAP_ICON_WHITE);
            }
        }

        // Apply the CSS to the new selection and fire an event.
        if (Y.Lang.isNull(node) === false) {
            // After unhighlighting, now highlight the current row.
            node.all('td').addClass(table.getClassName(CSS_SELECTED));

            // Inverse the icon color if there is one.
            if (node.one('i')) {
                node.one('i').addClass(CSS_BOOTSTRAP_ICON_WHITE);
            }

            model = this._getModelFromTableRow(node);
        }

        // Fires the select event from the host and passes along the needed information.
        table.fire(EVT_SELECT, { model: model });

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


}, '1.1.0-DEV', {"requires": ["rednose-datatable", "plugin"]});
