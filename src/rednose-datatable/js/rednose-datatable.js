var DataTable;

DataTable = Y.Base.create('dataTable', Y.DataTable.Base, [ Y.DataTable.Scrollable, Y.DataTable.Sortable ], {
	getClassName: function() {
		// XXX: Bootstrap compatible.
		if (arguments[0] === 'table') {
			return 'table';
		}

		var sPrefix    = 'rednose',
			sDelimiter = '-';

        var args = Y.Array(arguments);

        if (args[args.length-1] !== true) {
            args.unshift(sPrefix);
        } else {
            args.pop();
        }

		return args.join(sDelimiter);
	}
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DataTable = DataTable;
