if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-tooltip/rednose-tooltip.js']) {
   __coverage__['build/rednose-tooltip/rednose-tooltip.js'] = {"path":"build/rednose-tooltip/rednose-tooltip.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0},"b":{},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":8,"loc":{"start":{"line":8,"column":17},"end":{"line":8,"column":29}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":17,"column":57}},"2":{"start":{"line":3,"column":0},"end":{"line":3,"column":12}},"3":{"start":{"line":5,"column":0},"end":{"line":11,"column":3}},"4":{"start":{"line":9,"column":8},"end":{"line":9,"column":33}},"5":{"start":{"line":14,"column":0},"end":{"line":14,"column":41}}},"branchMap":{},"code":["(function () { YUI.add('rednose-tooltip', function (Y, NAME) {","","var Tooltip;","","Tooltip = Y.Base.create('tooltip', Y.Bootstrap.Tooltip, [], {","    // -- Lifecycle methods ----------------------------------------------------","","    initializer: function () {","        this.set('zIndex', 2000);","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Tooltip = Tooltip;","","","}, '1.0.0', {\"requires\": [\"gallery-bootstrap-tooltip\"]});","","}());"]};
}
var __cov_cW5XQ1HLvU36VUXxGTEiXQ = __coverage__['build/rednose-tooltip/rednose-tooltip.js'];
__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['1']++;YUI.add('rednose-tooltip',function(Y,NAME){__cov_cW5XQ1HLvU36VUXxGTEiXQ.f['1']++;__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['2']++;var Tooltip;__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['3']++;Tooltip=Y.Base.create('tooltip',Y.Bootstrap.Tooltip,[],{initializer:function(){__cov_cW5XQ1HLvU36VUXxGTEiXQ.f['2']++;__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['4']++;this.set('zIndex',2000);}});__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['5']++;Y.namespace('Rednose').Tooltip=Tooltip;},'1.0.0',{'requires':['gallery-bootstrap-tooltip']});
