if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-tabview/rednose-tabview.js']) {
   __coverage__['build/rednose-tabview/rednose-tabview.js'] = {"path":"build/rednose-tabview/rednose-tabview.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":36,"loc":{"start":{"line":36,"column":14},"end":{"line":36,"column":35}}},"3":{"name":"(anonymous_3)","line":45,"loc":{"start":{"line":45,"column":21},"end":{"line":45,"column":35}}},"4":{"name":"(anonymous_4)","line":69,"loc":{"start":{"line":69,"column":21},"end":{"line":69,"column":34}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":92,"column":36}},"2":{"start":{"line":9,"column":0},"end":{"line":9,"column":12}},"3":{"start":{"line":19,"column":0},"end":{"line":86,"column":3}},"4":{"start":{"line":37,"column":8},"end":{"line":39,"column":51}},"5":{"start":{"line":41,"column":8},"end":{"line":41,"column":40}},"6":{"start":{"line":43,"column":8},"end":{"line":43,"column":58}},"7":{"start":{"line":45,"column":8},"end":{"line":64,"column":11}},"8":{"start":{"line":46,"column":12},"end":{"line":48,"column":56}},"9":{"start":{"line":50,"column":12},"end":{"line":50,"column":54}},"10":{"start":{"line":51,"column":12},"end":{"line":51,"column":41}},"11":{"start":{"line":52,"column":12},"end":{"line":52,"column":33}},"12":{"start":{"line":54,"column":12},"end":{"line":54,"column":39}},"13":{"start":{"line":55,"column":12},"end":{"line":55,"column":44}},"14":{"start":{"line":56,"column":12},"end":{"line":56,"column":39}},"15":{"start":{"line":58,"column":12},"end":{"line":61,"column":13}},"16":{"start":{"line":59,"column":16},"end":{"line":59,"column":40}},"17":{"start":{"line":60,"column":16},"end":{"line":60,"column":38}},"18":{"start":{"line":63,"column":12},"end":{"line":63,"column":43}},"19":{"start":{"line":70,"column":8},"end":{"line":72,"column":47}},"20":{"start":{"line":74,"column":8},"end":{"line":74,"column":55}},"21":{"start":{"line":76,"column":8},"end":{"line":76,"column":47}},"22":{"start":{"line":77,"column":8},"end":{"line":77,"column":54}},"23":{"start":{"line":79,"column":8},"end":{"line":79,"column":61}},"24":{"start":{"line":89,"column":0},"end":{"line":89,"column":41}}},"branchMap":{"1":{"line":58,"type":"if","locations":[{"start":{"line":58,"column":12},"end":{"line":58,"column":12}},{"start":{"line":58,"column":12},"end":{"line":58,"column":12}}]}},"code":["(function () { YUI.add('rednose-tabview', function (Y, NAME) {","","","/**","Provides a generic tabview.","","@module rednose-tabview","**/","var TabView;","","/**","Provides a generic tabview.","","@class TabView","@namespace Rednose","@constructor","@extends TabView","**/","TabView = Y.Base.create('tabView', Y.Widget, [], {","    // -- Public Properties ----------------------------------------------------","","    template:","        '<div class=\"tabbable\">' +","            '<ul class=\"nav nav-tabs\">' +","            '</ul>' +","        '</div>' +","        '<div class=\"tab-content\">' +","        '</div>',","","    itemTemplate: '<li><a></a></li>',","","    paneTemplate: '<div class=\"tab-pane\"></div>',","","    // -- Lifecycle Methods ----------------------------------------------------","","    renderUI: function (container) {","        var self          = this,","            tabs          = this.get('tabs'),","            container     = this.get('contentBox');","","        container.append(this.template);","","        var paneContainer = container.one('.tab-content');","","        Y.each(tabs, function(tab) {","            var li   = Y.Node.create(self.itemTemplate),","                a    = li.one('a'),","                pane = Y.Node.create(self.paneTemplate);","","            a.on('click', self._handleTabClick, self);","            a.setAttribute('id', tab.id);","            a.setHTML(tab.title);","","            pane.append(tab.container);","            pane.setAttribute('id', tab.id);","            paneContainer.append(pane);","","            if (tab.active) {","                pane.addClass('active');","                li.addClass('active');","            }","","            container.one('ul').append(li);","        });","    },","","    // -- Protected Methods ----------------------------------------------------","","    _handleTabClick: function (e) {","        var a         = e.currentTarget,","            id        = a.getAttribute('id'),","            container = this.get('contentBox');","","        container.all('.active').removeClass('active');","","        a.get('parentNode').addClass('active');","        container.one('div#' + id).addClass('active');","","        this.fire('click', { tabNode: a.get('parentNode') });","    }","","}, {","    ATTRS: {","        tabs: { value: {} }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').TabView = TabView;","","","}, '1.4.0', {\"requires\": [\"node\"]});","","}());"]};
}
var __cov_09x9yxnDl7Sy2XOWeiJ$WQ = __coverage__['build/rednose-tabview/rednose-tabview.js'];
__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['1']++;YUI.add('rednose-tabview',function(Y,NAME){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['1']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['2']++;var TabView;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['3']++;TabView=Y.Base.create('tabView',Y.Widget,[],{template:'<div class="tabbable">'+'<ul class="nav nav-tabs">'+'</ul>'+'</div>'+'<div class="tab-content">'+'</div>',itemTemplate:'<li><a></a></li>',paneTemplate:'<div class="tab-pane"></div>',renderUI:function(container){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['2']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['4']++;var self=this,tabs=this.get('tabs'),container=this.get('contentBox');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['5']++;container.append(this.template);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['6']++;var paneContainer=container.one('.tab-content');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['7']++;Y.each(tabs,function(tab){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['3']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['8']++;var li=Y.Node.create(self.itemTemplate),a=li.one('a'),pane=Y.Node.create(self.paneTemplate);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['9']++;a.on('click',self._handleTabClick,self);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['10']++;a.setAttribute('id',tab.id);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['11']++;a.setHTML(tab.title);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['12']++;pane.append(tab.container);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['13']++;pane.setAttribute('id',tab.id);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['14']++;paneContainer.append(pane);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['15']++;if(tab.active){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.b['1'][0]++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['16']++;pane.addClass('active');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['17']++;li.addClass('active');}else{__cov_09x9yxnDl7Sy2XOWeiJ$WQ.b['1'][1]++;}__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['18']++;container.one('ul').append(li);});},_handleTabClick:function(e){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['4']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['19']++;var a=e.currentTarget,id=a.getAttribute('id'),container=this.get('contentBox');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['20']++;container.all('.active').removeClass('active');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['21']++;a.get('parentNode').addClass('active');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['22']++;container.one('div#'+id).addClass('active');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['23']++;this.fire('click',{tabNode:a.get('parentNode')});}},{ATTRS:{tabs:{value:{}}}});__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['24']++;Y.namespace('Rednose').TabView=TabView;},'1.4.0',{'requires':['node']});
