if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-datatable/rednose-datatable.js']) {
   __coverage__['build/rednose-datatable/rednose-datatable.js'] = {"path":"build/rednose-datatable/rednose-datatable.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"b":{},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":29},"end":{"line":1,"column":48}}},"2":{"name":"(anonymous_2)","line":10,"loc":{"start":{"line":10,"column":14},"end":{"line":10,"column":26}}},"3":{"name":"(anonymous_3)","line":13,"loc":{"start":{"line":13,"column":29},"end":{"line":13,"column":40}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":36,"column":3}},"2":{"start":{"line":3,"column":0},"end":{"line":6,"column":31}},"3":{"start":{"line":8,"column":0},"end":{"line":17,"column":3}},"4":{"start":{"line":11,"column":8},"end":{"line":11,"column":50}},"5":{"start":{"line":13,"column":8},"end":{"line":15,"column":11}},"6":{"start":{"line":14,"column":3},"end":{"line":14,"column":58}},"7":{"start":{"line":19,"column":0},"end":{"line":19,"column":41}},"8":{"start":{"line":22,"column":0},"end":{"line":22,"column":45}}},"branchMap":{},"code":["(function () { YUI.add('rednose-datatable', function (Y, NAME) {","","var DataTable,","","\tCSS_PREFIX_MODULE   = 'rednose-datatable',","\tCSS_BOOTSTRAP_TABLE = 'table';","","DataTable = Y.Base.create('dataTable', Y.DataTable.Base, [ Y.DataTable.Scrollable, Y.DataTable.Sortable ], {","","\tinitializer: function () {","        var boundingBox = this.get('boundingBox');","","        this.after('render', function() {","\t\t\tboundingBox.one('table').addClass(CSS_BOOTSTRAP_TABLE);","        });","\t}","});","","DataTable.CSS_PREFIX = CSS_PREFIX_MODULE;","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').DataTable = DataTable;","","","}, '1.1.0-DEV', {","    \"group\": \"rednose-ui\",","    \"requires\": [","        \"datatable-base\",","        \"datatable-scroll\",","        \"datatable-sort\"","    ],","    \"supersedes\": [","        \"skin-sam-datatable-base\"","    ],","    \"skinnable\": true","});","","}());"]};
}
var __cov_BOsc6JoIhT2TwnWJPBVRTg = __coverage__['build/rednose-datatable/rednose-datatable.js'];
__cov_BOsc6JoIhT2TwnWJPBVRTg.s['1']++;YUI.add('rednose-datatable',function(Y,NAME){__cov_BOsc6JoIhT2TwnWJPBVRTg.f['1']++;__cov_BOsc6JoIhT2TwnWJPBVRTg.s['2']++;var DataTable,CSS_PREFIX_MODULE='rednose-datatable',CSS_BOOTSTRAP_TABLE='table';__cov_BOsc6JoIhT2TwnWJPBVRTg.s['3']++;DataTable=Y.Base.create('dataTable',Y.DataTable.Base,[Y.DataTable.Scrollable,Y.DataTable.Sortable],{initializer:function(){__cov_BOsc6JoIhT2TwnWJPBVRTg.f['2']++;__cov_BOsc6JoIhT2TwnWJPBVRTg.s['4']++;var boundingBox=this.get('boundingBox');__cov_BOsc6JoIhT2TwnWJPBVRTg.s['5']++;this.after('render',function(){__cov_BOsc6JoIhT2TwnWJPBVRTg.f['3']++;__cov_BOsc6JoIhT2TwnWJPBVRTg.s['6']++;boundingBox.one('table').addClass(CSS_BOOTSTRAP_TABLE);});}});__cov_BOsc6JoIhT2TwnWJPBVRTg.s['7']++;DataTable.CSS_PREFIX=CSS_PREFIX_MODULE;__cov_BOsc6JoIhT2TwnWJPBVRTg.s['8']++;Y.namespace('Rednose').DataTable=DataTable;},'1.1.0-DEV',{'group':'rednose-ui','requires':['datatable-base','datatable-scroll','datatable-sort'],'supersedes':['skin-sam-datatable-base'],'skinnable':true});
