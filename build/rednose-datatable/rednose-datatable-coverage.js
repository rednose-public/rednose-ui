if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-datatable/rednose-datatable.js']) {
   __coverage__['build/rednose-datatable/rednose-datatable.js'] = {"path":"build/rednose-datatable/rednose-datatable.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":29},"end":{"line":1,"column":48}}},"2":{"name":"(anonymous_2)","line":13,"loc":{"start":{"line":13,"column":14},"end":{"line":13,"column":26}}},"3":{"name":"(anonymous_3)","line":17,"loc":{"start":{"line":17,"column":29},"end":{"line":17,"column":40}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":49,"column":3}},"2":{"start":{"line":5,"column":0},"end":{"line":10,"column":54}},"3":{"start":{"line":12,"column":0},"end":{"line":31,"column":3}},"4":{"start":{"line":14,"column":8},"end":{"line":15,"column":48}},"5":{"start":{"line":17,"column":8},"end":{"line":23,"column":11}},"6":{"start":{"line":18,"column":3},"end":{"line":18,"column":58}},"7":{"start":{"line":20,"column":12},"end":{"line":22,"column":13}},"8":{"start":{"line":21,"column":16},"end":{"line":21,"column":81}},"9":{"start":{"line":33,"column":0},"end":{"line":33,"column":41}},"10":{"start":{"line":36,"column":0},"end":{"line":36,"column":45}}},"branchMap":{"1":{"line":20,"type":"if","locations":[{"start":{"line":20,"column":12},"end":{"line":20,"column":12}},{"start":{"line":20,"column":12},"end":{"line":20,"column":12}}]}},"code":["(function () { YUI.add('rednose-datatable', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","var DataTable,","","\tCSS_PREFIX_MODULE = 'rednose-datatable',","","\tCSS_BOOTSTRAP_TABLE           = 'table',","    CSS_BOOTSTRAP_TABLE_CONDENSED = 'table-condensed';","","DataTable = Y.Base.create('dataTable', Y.DataTable.Base, [ Y.DataTable.Scrollable, Y.DataTable.Sortable, Y.DataTable.ColumnWidths ], {","\tinitializer: function () {","        var boundingBox = this.get('boundingBox'),","            condensed   = this.get('condensed');","","        this.after('render', function() {","\t\t\tboundingBox.one('table').addClass(CSS_BOOTSTRAP_TABLE);","","            if (condensed === true) {","                boundingBox.one('table').addClass(CSS_BOOTSTRAP_TABLE_CONDENSED);","            }","        });","\t}","}, {","    ATTRS: {","        condensed: {","            value: false","        }","    }","});","","DataTable.CSS_PREFIX = CSS_PREFIX_MODULE;","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').DataTable = DataTable;","","","}, '1.5.0-DEV', {","    \"requires\": [","        \"datatable-base\",","        \"datatable-scroll\",","        \"datatable-sort\",","        \"rednose-util\"","    ],","    \"supersedes\": [","        \"skin-sam-datatable-base\"","    ]","});","","}());"]};
}
var __cov_BOsc6JoIhT2TwnWJPBVRTg = __coverage__['build/rednose-datatable/rednose-datatable.js'];
__cov_BOsc6JoIhT2TwnWJPBVRTg.s['1']++;YUI.add('rednose-datatable',function(Y,NAME){__cov_BOsc6JoIhT2TwnWJPBVRTg.f['1']++;__cov_BOsc6JoIhT2TwnWJPBVRTg.s['2']++;var DataTable,CSS_PREFIX_MODULE='rednose-datatable',CSS_BOOTSTRAP_TABLE='table',CSS_BOOTSTRAP_TABLE_CONDENSED='table-condensed';__cov_BOsc6JoIhT2TwnWJPBVRTg.s['3']++;DataTable=Y.Base.create('dataTable',Y.DataTable.Base,[Y.DataTable.Scrollable,Y.DataTable.Sortable,Y.DataTable.ColumnWidths],{initializer:function(){__cov_BOsc6JoIhT2TwnWJPBVRTg.f['2']++;__cov_BOsc6JoIhT2TwnWJPBVRTg.s['4']++;var boundingBox=this.get('boundingBox'),condensed=this.get('condensed');__cov_BOsc6JoIhT2TwnWJPBVRTg.s['5']++;this.after('render',function(){__cov_BOsc6JoIhT2TwnWJPBVRTg.f['3']++;__cov_BOsc6JoIhT2TwnWJPBVRTg.s['6']++;boundingBox.one('table').addClass(CSS_BOOTSTRAP_TABLE);__cov_BOsc6JoIhT2TwnWJPBVRTg.s['7']++;if(condensed===true){__cov_BOsc6JoIhT2TwnWJPBVRTg.b['1'][0]++;__cov_BOsc6JoIhT2TwnWJPBVRTg.s['8']++;boundingBox.one('table').addClass(CSS_BOOTSTRAP_TABLE_CONDENSED);}else{__cov_BOsc6JoIhT2TwnWJPBVRTg.b['1'][1]++;}});}},{ATTRS:{condensed:{value:false}}});__cov_BOsc6JoIhT2TwnWJPBVRTg.s['9']++;DataTable.CSS_PREFIX=CSS_PREFIX_MODULE;__cov_BOsc6JoIhT2TwnWJPBVRTg.s['10']++;Y.namespace('Rednose').DataTable=DataTable;},'1.5.0-DEV',{'requires':['datatable-base','datatable-scroll','datatable-sort','rednose-util'],'supersedes':['skin-sam-datatable-base']});
