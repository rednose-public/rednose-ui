YUI.add('rednose-datatable', function (Y, NAME) {

var DataTable,

	CSS_PREFIX_MODULE   = 'rednose-datatable',
	CSS_BOOTSTRAP_TABLE = 'table';

DataTable = Y.Base.create('dataTable', Y.DataTable.Base, [ Y.DataTable.Scrollable, Y.DataTable.Sortable ], {
	initializer: function () {
        var boundingBox = this.get('boundingBox');

        this.after('render', function() {
        	boundingBox.one('table').addClass(CSS_BOOTSTRAP_TABLE);
        });
	}
	// getClassName: function() {
	// 	// XXX: Bootstrap compatible.
	// 	if (arguments[0] === 'table') {
	// 		return 'table';
	// 	}

	// 	var sPrefix    = 'rednose',
	// 		sDelimiter = '-';

 //        var args = Y.Array(arguments);

 //        if (args[args.length-1] !== true) {
 //            args.unshift(sPrefix);
 //        } else {
 //            args.pop();
 //        }

	// 	return args.join(sDelimiter);
	// }
});

DataTable.CSS_PREFIX = CSS_PREFIX_MODULE;

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').DataTable = DataTable;


}, '1.0.0', {"requires": ["datatable-base", "datatable-scroll", "datatable-sort"], "skinnable": true});
