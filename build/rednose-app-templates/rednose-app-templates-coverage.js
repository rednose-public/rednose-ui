if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-app-templates/rednose-app-templates.js']) {
   __coverage__['build/rednose-app-templates/rednose-app-templates.js'] = {"path":"build/rednose-app-templates/rednose-app-templates.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0,"33":0,"34":0,"35":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":52}}},"2":{"name":"AppTemplateThreeColumn","line":5,"loc":{"start":{"line":5,"column":0},"end":{"line":5,"column":34}}},"3":{"name":"(anonymous_3)","line":18,"loc":{"start":{"line":18,"column":17},"end":{"line":18,"column":29}}},"4":{"name":"AppTemplateTwoColumn","line":49,"loc":{"start":{"line":49,"column":0},"end":{"line":49,"column":32}}},"5":{"name":"(anonymous_5)","line":61,"loc":{"start":{"line":61,"column":17},"end":{"line":61,"column":29}}},"6":{"name":"Templates","line":102,"loc":{"start":{"line":102,"column":0},"end":{"line":102,"column":21}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":157,"column":16}},"2":{"start":{"line":5,"column":0},"end":{"line":5,"column":36}},"3":{"start":{"line":7,"column":0},"end":{"line":37,"column":2}},"4":{"start":{"line":19,"column":8},"end":{"line":20,"column":38}},"5":{"start":{"line":22,"column":8},"end":{"line":22,"column":36}},"6":{"start":{"line":24,"column":8},"end":{"line":29,"column":9}},"7":{"start":{"line":25,"column":12},"end":{"line":25,"column":54}},"8":{"start":{"line":26,"column":12},"end":{"line":26,"column":68}},"9":{"start":{"line":28,"column":12},"end":{"line":28,"column":65}},"10":{"start":{"line":31,"column":8},"end":{"line":31,"column":67}},"11":{"start":{"line":32,"column":8},"end":{"line":32,"column":67}},"12":{"start":{"line":33,"column":8},"end":{"line":33,"column":68}},"13":{"start":{"line":35,"column":8},"end":{"line":35,"column":56}},"14":{"start":{"line":39,"column":0},"end":{"line":43,"column":2}},"15":{"start":{"line":46,"column":0},"end":{"line":46,"column":69}},"16":{"start":{"line":49,"column":0},"end":{"line":49,"column":34}},"17":{"start":{"line":51,"column":0},"end":{"line":79,"column":2}},"18":{"start":{"line":62,"column":8},"end":{"line":63,"column":38}},"19":{"start":{"line":65,"column":8},"end":{"line":65,"column":36}},"20":{"start":{"line":67,"column":8},"end":{"line":72,"column":9}},"21":{"start":{"line":68,"column":12},"end":{"line":68,"column":54}},"22":{"start":{"line":69,"column":12},"end":{"line":69,"column":68}},"23":{"start":{"line":71,"column":12},"end":{"line":71,"column":65}},"24":{"start":{"line":74,"column":8},"end":{"line":74,"column":66}},"25":{"start":{"line":75,"column":8},"end":{"line":75,"column":66}},"26":{"start":{"line":77,"column":8},"end":{"line":77,"column":56}},"27":{"start":{"line":81,"column":0},"end":{"line":84,"column":2}},"28":{"start":{"line":87,"column":0},"end":{"line":87,"column":65}},"29":{"start":{"line":102,"column":0},"end":{"line":104,"column":1}},"30":{"start":{"line":103,"column":4},"end":{"line":103,"column":49}},"31":{"start":{"line":112,"column":0},"end":{"line":115,"column":13}},"32":{"start":{"line":123,"column":0},"end":{"line":127,"column":13}},"33":{"start":{"line":135,"column":0},"end":{"line":139,"column":13}},"34":{"start":{"line":147,"column":0},"end":{"line":151,"column":11}},"35":{"start":{"line":154,"column":0},"end":{"line":154,"column":45}}},"branchMap":{"1":{"line":24,"type":"if","locations":[{"start":{"line":24,"column":8},"end":{"line":24,"column":8}},{"start":{"line":24,"column":8},"end":{"line":24,"column":8}}]},"2":{"line":67,"type":"if","locations":[{"start":{"line":67,"column":8},"end":{"line":67,"column":8}},{"start":{"line":67,"column":8},"end":{"line":67,"column":8}}]}},"code":["(function () { YUI.add('rednose-app-templates', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","function AppTemplateThreeColumn() {}","","AppTemplateThreeColumn.prototype = {","    navigationBar: true,","","    template: '<div class=\"rednose-grid rednose-three-column-grid\">' +","                  '<div class=\"rednose-unit-container\">' +","                      '<div class=\"rednose-unit-left\"></div>' +","                      '<div class=\"rednose-unit-main\"></div>' +","                      '<div class=\"rednose-unit-right\"></div>' +","                  '</div>' +","              '</div>',","","    initializer: function () {","        var container = this.get('container'),","            template  = this.template;","","        container.setHTML(template);","","        if (this.navigationBar) {","            container.addClass('rednose-navbar-grid');","            container.prepend('<div class=\"rednose-navbar\"></div>');","","            this.set('navBar', container.one('.rednose-navbar'));","        }","","        this.set('gridLeft' , container.one('.rednose-unit-left'));","        this.set('gridMain' , container.one('.rednose-unit-main'));","        this.set('gridRight', container.one('.rednose-unit-right'));","","        this.set('viewContainer', this.get('gridMain'));","    }","};","","AppTemplateThreeColumn.ATTRS = {","    gridLeft : { value: null },","    gridMain : { value: null },","    gridRight: { value: null }","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose.Template').ThreeColumn = AppTemplateThreeColumn;","/*jshint boss:true, expr:true, onevar:false */","","function AppTemplateTwoColumn() {}","","AppTemplateTwoColumn.prototype = {","    navigationBar: true,","","    template: '<div class=\"rednose-grid rednose-two-column-grid\">' +","                  '<div class=\"rednose-unit-container\">' +","                      '<div class=\"rednose-unit-left\"></div>' +","                      '<div class=\"rednose-unit-main\"></div>' +","                  '</div>' +","              '</div>',","","    initializer: function () {","        var container = this.get('container'),","            template  = this.template;","","        container.setHTML(template);","","        if (this.navigationBar) {","            container.addClass('rednose-navbar-grid');","            container.prepend('<div class=\"rednose-navbar\"></div>');","","            this.set('navBar', container.one('.rednose-navbar'));","        }","","        this.set('gridLeft', container.one('.rednose-unit-left'));","        this.set('gridMain', container.one('.rednose-unit-main'));","","        this.set('viewContainer', this.get('gridMain'));","    }","};","","AppTemplateTwoColumn.ATTRS = {","    gridLeft: { value: null },","    gridMain: { value: null }","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose.Template').TwoColumn = AppTemplateTwoColumn;","/**","RedNose framework app/view templates.","","@module rednose-app","@submodule rednose-app-templates","**/","","/**","RedNose framework app/view templates.","","@class Templates","@namespace Rednose","@constructor","**/","function Templates() {","    Templates.superclass.constructor.apply(this);","}","","/**","Basic detail app view.","","@method detailApp","@static","**/","Templates.detailApp =","    '<div class=\"yui3-g rednose-app-detail-container\">' +","        '<div class=\"yui3-u rednose-app-detail-view\"></div>' +","    '</div>';","","/**","Basic master-detail app view.","","@method masterDetailApp","@static","**/","Templates.masterDetailApp =","    '<div class=\"yui3-g rednose-app-master-detail-container\">' +","        '<div class=\"yui3-u rednose-app-master-view\"></div>' +","        '<div class=\"yui3-u rednose-app-detail-view\"></div>' +","    '</div>';","","/**","Basic master-detail grid subview.","","@method masterDetailGrid","@static"," */","Templates.masterDetailGrid =","    '<div class=\"yui3-g rednose-grid-master-detail-container\">' +","        '<div class=\"yui3-u rednose-grid-master-view\"></div>' +","        '<div class=\"yui3-u rednose-grid-detail-view\"></div>' +","    '</div>';","","/**","Basic View message container","","@method detailApp","@static","**/","Templates.viewMessage =","    '<div class=\"rednose-app-message-container\">' +","        '<div class=\"rednose-app-message-title\">{message}</div>' +","        '<div class=\"rednose-app-message-body\">{subMessage}</div>' +","  '</div>';","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Templates = Templates;","","","}, '1.1.0-DEV');","","}());"]};
}
var __cov_JuOrC90u5L8YUbpgqipdMg = __coverage__['build/rednose-app-templates/rednose-app-templates.js'];
__cov_JuOrC90u5L8YUbpgqipdMg.s['1']++;YUI.add('rednose-app-templates',function(Y,NAME){__cov_JuOrC90u5L8YUbpgqipdMg.f['1']++;__cov_JuOrC90u5L8YUbpgqipdMg.s['2']++;function AppTemplateThreeColumn(){__cov_JuOrC90u5L8YUbpgqipdMg.f['2']++;}__cov_JuOrC90u5L8YUbpgqipdMg.s['3']++;AppTemplateThreeColumn.prototype={navigationBar:true,template:'<div class="rednose-grid rednose-three-column-grid">'+'<div class="rednose-unit-container">'+'<div class="rednose-unit-left"></div>'+'<div class="rednose-unit-main"></div>'+'<div class="rednose-unit-right"></div>'+'</div>'+'</div>',initializer:function(){__cov_JuOrC90u5L8YUbpgqipdMg.f['3']++;__cov_JuOrC90u5L8YUbpgqipdMg.s['4']++;var container=this.get('container'),template=this.template;__cov_JuOrC90u5L8YUbpgqipdMg.s['5']++;container.setHTML(template);__cov_JuOrC90u5L8YUbpgqipdMg.s['6']++;if(this.navigationBar){__cov_JuOrC90u5L8YUbpgqipdMg.b['1'][0]++;__cov_JuOrC90u5L8YUbpgqipdMg.s['7']++;container.addClass('rednose-navbar-grid');__cov_JuOrC90u5L8YUbpgqipdMg.s['8']++;container.prepend('<div class="rednose-navbar"></div>');__cov_JuOrC90u5L8YUbpgqipdMg.s['9']++;this.set('navBar',container.one('.rednose-navbar'));}else{__cov_JuOrC90u5L8YUbpgqipdMg.b['1'][1]++;}__cov_JuOrC90u5L8YUbpgqipdMg.s['10']++;this.set('gridLeft',container.one('.rednose-unit-left'));__cov_JuOrC90u5L8YUbpgqipdMg.s['11']++;this.set('gridMain',container.one('.rednose-unit-main'));__cov_JuOrC90u5L8YUbpgqipdMg.s['12']++;this.set('gridRight',container.one('.rednose-unit-right'));__cov_JuOrC90u5L8YUbpgqipdMg.s['13']++;this.set('viewContainer',this.get('gridMain'));}};__cov_JuOrC90u5L8YUbpgqipdMg.s['14']++;AppTemplateThreeColumn.ATTRS={gridLeft:{value:null},gridMain:{value:null},gridRight:{value:null}};__cov_JuOrC90u5L8YUbpgqipdMg.s['15']++;Y.namespace('Rednose.Template').ThreeColumn=AppTemplateThreeColumn;__cov_JuOrC90u5L8YUbpgqipdMg.s['16']++;function AppTemplateTwoColumn(){__cov_JuOrC90u5L8YUbpgqipdMg.f['4']++;}__cov_JuOrC90u5L8YUbpgqipdMg.s['17']++;AppTemplateTwoColumn.prototype={navigationBar:true,template:'<div class="rednose-grid rednose-two-column-grid">'+'<div class="rednose-unit-container">'+'<div class="rednose-unit-left"></div>'+'<div class="rednose-unit-main"></div>'+'</div>'+'</div>',initializer:function(){__cov_JuOrC90u5L8YUbpgqipdMg.f['5']++;__cov_JuOrC90u5L8YUbpgqipdMg.s['18']++;var container=this.get('container'),template=this.template;__cov_JuOrC90u5L8YUbpgqipdMg.s['19']++;container.setHTML(template);__cov_JuOrC90u5L8YUbpgqipdMg.s['20']++;if(this.navigationBar){__cov_JuOrC90u5L8YUbpgqipdMg.b['2'][0]++;__cov_JuOrC90u5L8YUbpgqipdMg.s['21']++;container.addClass('rednose-navbar-grid');__cov_JuOrC90u5L8YUbpgqipdMg.s['22']++;container.prepend('<div class="rednose-navbar"></div>');__cov_JuOrC90u5L8YUbpgqipdMg.s['23']++;this.set('navBar',container.one('.rednose-navbar'));}else{__cov_JuOrC90u5L8YUbpgqipdMg.b['2'][1]++;}__cov_JuOrC90u5L8YUbpgqipdMg.s['24']++;this.set('gridLeft',container.one('.rednose-unit-left'));__cov_JuOrC90u5L8YUbpgqipdMg.s['25']++;this.set('gridMain',container.one('.rednose-unit-main'));__cov_JuOrC90u5L8YUbpgqipdMg.s['26']++;this.set('viewContainer',this.get('gridMain'));}};__cov_JuOrC90u5L8YUbpgqipdMg.s['27']++;AppTemplateTwoColumn.ATTRS={gridLeft:{value:null},gridMain:{value:null}};__cov_JuOrC90u5L8YUbpgqipdMg.s['28']++;Y.namespace('Rednose.Template').TwoColumn=AppTemplateTwoColumn;__cov_JuOrC90u5L8YUbpgqipdMg.s['29']++;function Templates(){__cov_JuOrC90u5L8YUbpgqipdMg.f['6']++;__cov_JuOrC90u5L8YUbpgqipdMg.s['30']++;Templates.superclass.constructor.apply(this);}__cov_JuOrC90u5L8YUbpgqipdMg.s['31']++;Templates.detailApp='<div class="yui3-g rednose-app-detail-container">'+'<div class="yui3-u rednose-app-detail-view"></div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['32']++;Templates.masterDetailApp='<div class="yui3-g rednose-app-master-detail-container">'+'<div class="yui3-u rednose-app-master-view"></div>'+'<div class="yui3-u rednose-app-detail-view"></div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['33']++;Templates.masterDetailGrid='<div class="yui3-g rednose-grid-master-detail-container">'+'<div class="yui3-u rednose-grid-master-view"></div>'+'<div class="yui3-u rednose-grid-detail-view"></div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['34']++;Templates.viewMessage='<div class="rednose-app-message-container">'+'<div class="rednose-app-message-title">{message}</div>'+'<div class="rednose-app-message-body">{subMessage}</div>'+'</div>';__cov_JuOrC90u5L8YUbpgqipdMg.s['35']++;Y.namespace('Rednose').Templates=Templates;},'1.1.0-DEV');
