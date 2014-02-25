/*jshint boss:true, expr:true, onevar:false */

/**
 * Create a selection inline value edit plugin for the RedNose DataTable widget.
 */
var CSS_COLUMN = 'rednose-datatable-col-',
    CSS_INPUTFIELD = 'rednose-datatable-input';

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
        var self  = this,
            table = this.get('host'),
            model = table.get('data');

        this._renderFields();

        model.after('add', function() {
            self._renderFields();
        });

        table.after('render', function() {
            alert('...');
        });
    },

    _renderFields: function(activeNode) {
        var self    = this,
            table   = this.get('host'),
            columns = table.get('columns');

        Y.Array.each(columns, function(column) {
            var className = CSS_COLUMN + column.key;

            if (column.editable) {
                Y.all('td.' + className).each(function(columnNode) {
                    var rowModel = table.getRecord(
                        columnNode.ancestor('tr').getAttribute('data-yui3-record')
                    );

                    self._addField(columnNode, rowModel, column.key);
                });
            }
        });
    },

    _addField: function(node, row, property) {
        var self      = this,
            nodeValue = node.get('text'),
            inputNode = Y.Node.create('<input />');

        inputNode.set('value', nodeValue);
        inputNode.addClass(CSS_INPUTFIELD);

        inputNode.on(['change', 'keyup'], function() {
            self._fieldChange(inputNode, row, property);
        });

        node.setHTML('');
        node.append(inputNode);
    },

    _fieldChange: function(node, row, property) {
        row.set(
            property,
            node.get('value')
        );

        this._renderFields(node);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DataTableEditRowPlugin = DataTableEditRowPlugin;
