if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-app-templates/rednose-app-templates.js']) {
   __coverage__['build/rednose-app-templates/rednose-app-templates.js'] = {"path":"build/rednose-app-templates/rednose-app-templates.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"b":{},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":52}}},"2":{"name":"Templates","line":17,"loc":{"start":{"line":17,"column":0},"end":{"line":17,"column":21}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":73,"column":16}},"2":{"start":{"line":17,"column":0},"end":{"line":19,"column":1}},"3":{"start":{"line":18,"column":4},"end":{"line":18,"column":49}},"4":{"start":{"line":28,"column":0},"end":{"line":31,"column":13}},"5":{"start":{"line":39,"column":0},"end":{"line":43,"column":13}},"6":{"start":{"line":51,"column":0},"end":{"line":55,"column":13}},"7":{"start":{"line":63,"column":0},"end":{"line":67,"column":11}},"8":{"start":{"line":70,"column":0},"end":{"line":70,"column":45}}},"branchMap":{},"code":["(function () { YUI.add('rednose-app-templates', function (Y, NAME) {","","/**","RedNose framework app/view templates.","","@module rednose-app","@submodule rednose-app-templates","**/","","/**","RedNose framework app/view templates.","","@class Templates","@namespace Rednose","@constructor","**/","function Templates() {","    Templates.superclass.constructor.apply(this);","}","","","/**","Basic detail app view.","","@method detailApp","@static","**/","Templates.detailApp =","    '<div class=\"yui3-g rednose-app-detail-container\">' +","        '<div class=\"yui3-u rednose-app-detail-view\"></div>' +","    '</div>';","","/**","Basic master-detail app view.","","@method masterDetailApp","@static","**/","Templates.masterDetailApp =","    '<div class=\"yui3-g rednose-app-master-detail-container\">' +","        '<div class=\"yui3-u rednose-app-master-view\"></div>' +","        '<div class=\"yui3-u rednose-app-detail-view\"></div>' +","    '</div>';","","/**","Basic master-detail grid subview.","","@method masterDetailGrid","@static"," */","Templates.masterDetailGrid =","    '<div class=\"yui3-g rednose-grid-master-detail-container\">' +","        '<div class=\"yui3-u rednose-grid-master-view\"></div>' +","        '<div class=\"yui3-u rednose-grid-detail-view\"></div>' +","    '</div>';","","/**","Basic View message container","","@method detailApp","@static","**/","Templates.viewMessage =","    '<div class=\"rednose-app-message-container\">' +","        '<div class=\"rednose-app-message-title\">{message}</div>' +","        '<div class=\"rednose-app-message-body\">{subMessage}</div>' +","  '</div>';","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Templates = Templates;","","","}, '1.1.0-DEV');","","}());"]};
}
var __cov_JuOrC90u5L8YUbpgqipdMg = __coverage__['build/rednose-app-templates/rednose-app-templates.js'];
__cov_JuOrC90u5L8YUbpgqipdMg.s['1']++;YUI.add('rednose-app-templates',function(Y,NAME){__cov_JuOrC90u5L8YUbpgqipdMg.f['1']++;__cov_JuOrC90u5L8YUbpgqipdMg.s['2']++;function Templates(){__cov_JuOrC90u5L8YUbpgqipdMg.f['2']++;__cov_JuOrC90u5L8YUbpgqipdMg.s['3']++;Templates.superclass.constructor.apply(this);}__cov_JuOrC90u5L8YUbpgqipdMg.s['4']++;Templates.detailApp='<div class="yui3-g rednose-app-detail-container">'+'<div class="yui3-u rednose-app-detail-view"></div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['5']++;Templates.masterDetailApp='<div class="yui3-g rednose-app-master-detail-container">'+'<div class="yui3-u rednose-app-master-view"></div>'+'<div class="yui3-u rednose-app-detail-view"></div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['6']++;Templates.masterDetailGrid='<div class="yui3-g rednose-grid-master-detail-container">'+'<div class="yui3-u rednose-grid-master-view"></div>'+'<div class="yui3-u rednose-grid-detail-view"></div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['7']++;Templates.viewMessage='<div class="rednose-app-message-container">'+'<div class="rednose-app-message-title">{message}</div>'+'<div class="rednose-app-message-body">{subMessage}</div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['8']++;Y.namespace('Rednose').Templates=Templates;},'1.1.0-DEV');
