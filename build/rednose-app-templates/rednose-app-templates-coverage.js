if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-app-templates/rednose-app-templates.js']) {
   __coverage__['build/rednose-app-templates/rednose-app-templates.js'] = {"path":"build/rednose-app-templates/rednose-app-templates.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":52}}},"2":{"name":"AppTemplateThreeColumn","line":5,"loc":{"start":{"line":5,"column":0},"end":{"line":5,"column":34}}},"3":{"name":"(anonymous_3)","line":15,"loc":{"start":{"line":15,"column":17},"end":{"line":15,"column":29}}},"4":{"name":"Templates","line":51,"loc":{"start":{"line":51,"column":0},"end":{"line":51,"column":21}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":106,"column":16}},"2":{"start":{"line":5,"column":0},"end":{"line":5,"column":36}},"3":{"start":{"line":7,"column":0},"end":{"line":27,"column":2}},"4":{"start":{"line":16,"column":8},"end":{"line":17,"column":38}},"5":{"start":{"line":19,"column":8},"end":{"line":19,"column":36}},"6":{"start":{"line":21,"column":8},"end":{"line":21,"column":68}},"7":{"start":{"line":22,"column":8},"end":{"line":22,"column":70}},"8":{"start":{"line":23,"column":8},"end":{"line":23,"column":69}},"9":{"start":{"line":25,"column":8},"end":{"line":25,"column":58}},"10":{"start":{"line":29,"column":0},"end":{"line":33,"column":2}},"11":{"start":{"line":36,"column":0},"end":{"line":36,"column":69}},"12":{"start":{"line":51,"column":0},"end":{"line":53,"column":1}},"13":{"start":{"line":52,"column":4},"end":{"line":52,"column":49}},"14":{"start":{"line":61,"column":0},"end":{"line":64,"column":13}},"15":{"start":{"line":72,"column":0},"end":{"line":76,"column":13}},"16":{"start":{"line":84,"column":0},"end":{"line":88,"column":13}},"17":{"start":{"line":96,"column":0},"end":{"line":100,"column":11}},"18":{"start":{"line":103,"column":0},"end":{"line":103,"column":45}}},"branchMap":{},"code":["(function () { YUI.add('rednose-app-templates', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","function AppTemplateThreeColumn() {}","","AppTemplateThreeColumn.prototype = {","","    template: '<div class=\"rednose-grid\">' +","                  '<div class=\"rednose-unit-left\"></div>' +","                  '<div class=\"rednose-unit-center\"></div>' +","                  '<div class=\"rednose-unit-right\"></div>' +","              '</div>',","","    initializer: function () {","        var container = this.get('container'),","            template  = this.template;","","        container.setHTML(template);","","        this.set('gridLeft'  , container.one('.rednose-unit-left'));","        this.set('gridCenter', container.one('.rednose-unit-center'));","        this.set('gridRight' , container.one('.rednose-unit-right'));","","        this.set('viewContainer', this.get('gridCenter'));","    }","};","","AppTemplateThreeColumn.ATTRS = {","    gridLeft  : { value: null },","    gridCenter: { value: null },","    gridRight : { value: null }","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose.Template').ThreeColumn = AppTemplateThreeColumn;","/**","RedNose framework app/view templates.","","@module rednose-app","@submodule rednose-app-templates","**/","","/**","RedNose framework app/view templates.","","@class Templates","@namespace Rednose","@constructor","**/","function Templates() {","    Templates.superclass.constructor.apply(this);","}","","/**","Basic detail app view.","","@method detailApp","@static","**/","Templates.detailApp =","    '<div class=\"yui3-g rednose-app-detail-container\">' +","        '<div class=\"yui3-u rednose-app-detail-view\"></div>' +","    '</div>';","","/**","Basic master-detail app view.","","@method masterDetailApp","@static","**/","Templates.masterDetailApp =","    '<div class=\"yui3-g rednose-app-master-detail-container\">' +","        '<div class=\"yui3-u rednose-app-master-view\"></div>' +","        '<div class=\"yui3-u rednose-app-detail-view\"></div>' +","    '</div>';","","/**","Basic master-detail grid subview.","","@method masterDetailGrid","@static"," */","Templates.masterDetailGrid =","    '<div class=\"yui3-g rednose-grid-master-detail-container\">' +","        '<div class=\"yui3-u rednose-grid-master-view\"></div>' +","        '<div class=\"yui3-u rednose-grid-detail-view\"></div>' +","    '</div>';","","/**","Basic View message container","","@method detailApp","@static","**/","Templates.viewMessage =","    '<div class=\"rednose-app-message-container\">' +","        '<div class=\"rednose-app-message-title\">{message}</div>' +","        '<div class=\"rednose-app-message-body\">{subMessage}</div>' +","  '</div>';","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Templates = Templates;","","","}, '1.1.0-DEV');","","}());"]};
}
var __cov_JuOrC90u5L8YUbpgqipdMg = __coverage__['build/rednose-app-templates/rednose-app-templates.js'];
__cov_JuOrC90u5L8YUbpgqipdMg.s['1']++;YUI.add('rednose-app-templates',function(Y,NAME){__cov_JuOrC90u5L8YUbpgqipdMg.f['1']++;__cov_JuOrC90u5L8YUbpgqipdMg.s['2']++;function AppTemplateThreeColumn(){__cov_JuOrC90u5L8YUbpgqipdMg.f['2']++;}__cov_JuOrC90u5L8YUbpgqipdMg.s['3']++;AppTemplateThreeColumn.prototype={template:'<div class="rednose-grid">'+'<div class="rednose-unit-left"></div>'+'<div class="rednose-unit-center"></div>'+'<div class="rednose-unit-right"></div>'+'</div>',initializer:function(){__cov_JuOrC90u5L8YUbpgqipdMg.f['3']++;__cov_JuOrC90u5L8YUbpgqipdMg.s['4']++;var container=this.get('container'),template=this.template;__cov_JuOrC90u5L8YUbpgqipdMg.s['5']++;container.setHTML(template);__cov_JuOrC90u5L8YUbpgqipdMg.s['6']++;this.set('gridLeft',container.one('.rednose-unit-left'));__cov_JuOrC90u5L8YUbpgqipdMg.s['7']++;this.set('gridCenter',container.one('.rednose-unit-center'));__cov_JuOrC90u5L8YUbpgqipdMg.s['8']++;this.set('gridRight',container.one('.rednose-unit-right'));__cov_JuOrC90u5L8YUbpgqipdMg.s['9']++;this.set('viewContainer',this.get('gridCenter'));}};__cov_JuOrC90u5L8YUbpgqipdMg.s['10']++;AppTemplateThreeColumn.ATTRS={gridLeft:{value:null},gridCenter:{value:null},gridRight:{value:null}};__cov_JuOrC90u5L8YUbpgqipdMg.s['11']++;Y.namespace('Rednose.Template').ThreeColumn=AppTemplateThreeColumn;__cov_JuOrC90u5L8YUbpgqipdMg.s['12']++;function Templates(){__cov_JuOrC90u5L8YUbpgqipdMg.f['4']++;__cov_JuOrC90u5L8YUbpgqipdMg.s['13']++;Templates.superclass.constructor.apply(this);}__cov_JuOrC90u5L8YUbpgqipdMg.s['14']++;Templates.detailApp='<div class="yui3-g rednose-app-detail-container">'+'<div class="yui3-u rednose-app-detail-view"></div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['15']++;Templates.masterDetailApp='<div class="yui3-g rednose-app-master-detail-container">'+'<div class="yui3-u rednose-app-master-view"></div>'+'<div class="yui3-u rednose-app-detail-view"></div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['16']++;Templates.masterDetailGrid='<div class="yui3-g rednose-grid-master-detail-container">'+'<div class="yui3-u rednose-grid-master-view"></div>'+'<div class="yui3-u rednose-grid-detail-view"></div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['17']++;Templates.viewMessage='<div class="rednose-app-message-container">'+'<div class="rednose-app-message-title">{message}</div>'+'<div class="rednose-app-message-body">{subMessage}</div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['18']++;Y.namespace('Rednose').Templates=Templates;},'1.1.0-DEV');
