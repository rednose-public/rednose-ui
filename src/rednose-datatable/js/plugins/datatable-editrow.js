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

function DataTableEditRowPlugin () {
    DataTableSelectPlugin.superclass.constructor.apply(this, arguments);
}

/**
 * The identity of the plugin.
 */
DataTableEditRowPlugin.NAME = 'dataTableEditRowPlugin';

/**
 * The namespace for the plugin.
 */
DataTableEditRowPlugin.NS = 'editable';

/**
 * Static property used to define the default attribute configuration of the
 * plugin.
 */
DataTableEditRowPlugin.ATTRS = {
    rowsDeletable : {
        value: false
    }
};

Y.extend(DataTableEditRowPlugin, Y.Plugin.Base, {
    initializer: function() {
        alert(this.get('rowsDeletable'));
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DataTableEditRowPlugin = DataTableEditRowPlugin;
