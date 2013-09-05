var DataTable;

DataTable = Y.Base.create('dataTable', Y.DataTable.Base, [ Y.DataTable.Scrollable, Y.DataTable.Sortable ], {
	getClassName: function(name) {
		if (name === 'table') {
			return 'table';
		}

		return 'rednose-ui-' + name;
	}
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DataTable = DataTable;
