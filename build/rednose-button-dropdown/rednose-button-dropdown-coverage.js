if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-button-dropdown/rednose-button-dropdown.js']) {
   __coverage__['build/rednose-button-dropdown/rednose-button-dropdown.js'] = {"path":"build/rednose-button-dropdown/rednose-button-dropdown.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":54}}},"2":{"name":"(anonymous_2)","line":6,"loc":{"start":{"line":6,"column":17},"end":{"line":6,"column":35}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":14,"column":73}},"2":{"start":{"line":5,"column":0},"end":{"line":11,"column":3}},"3":{"start":{"line":7,"column":8},"end":{"line":7,"column":51}}},"branchMap":{},"code":["(function () { YUI.add('rednose-button-dropdown', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","Y.namespace('Rednose.Plugin').ButtonDropdown = Y.Base.create('dropdown', Y.Rednose.Dropdown, [Y.Rednose.Plugin.Dropdown], {","    initializer: function (config) {","        config.host = config.host.get('container');","    }","}, {","    NS: 'dropdown'","});","","","}, '1.4.1', {\"requires\": [\"rednose-button\", \"rednose-dropdown-plugin\"]});","","}());"]};
}
var __cov_AJqhbBBsxaKPaeqYHiAhdg = __coverage__['build/rednose-button-dropdown/rednose-button-dropdown.js'];
__cov_AJqhbBBsxaKPaeqYHiAhdg.s['1']++;YUI.add('rednose-button-dropdown',function(Y,NAME){__cov_AJqhbBBsxaKPaeqYHiAhdg.f['1']++;__cov_AJqhbBBsxaKPaeqYHiAhdg.s['2']++;Y.namespace('Rednose.Plugin').ButtonDropdown=Y.Base.create('dropdown',Y.Rednose.Dropdown,[Y.Rednose.Plugin.Dropdown],{initializer:function(config){__cov_AJqhbBBsxaKPaeqYHiAhdg.f['2']++;__cov_AJqhbBBsxaKPaeqYHiAhdg.s['3']++;config.host=config.host.get('container');}},{NS:'dropdown'});},'1.4.1',{'requires':['rednose-button','rednose-dropdown-plugin']});