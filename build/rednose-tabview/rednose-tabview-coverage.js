if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-tabview/rednose-tabview.js']) {
   __coverage__['build/rednose-tabview/rednose-tabview.js'] = {"path":"build/rednose-tabview/rednose-tabview.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":34,"loc":{"start":{"line":34,"column":17},"end":{"line":34,"column":29}}},"3":{"name":"(anonymous_3)","line":40,"loc":{"start":{"line":40,"column":14},"end":{"line":40,"column":35}}},"4":{"name":"(anonymous_4)","line":49,"loc":{"start":{"line":49,"column":21},"end":{"line":49,"column":35}}},"5":{"name":"(anonymous_5)","line":73,"loc":{"start":{"line":73,"column":21},"end":{"line":73,"column":34}}},"6":{"name":"(anonymous_6)","line":91,"loc":{"start":{"line":91,"column":15},"end":{"line":91,"column":28}}},"7":{"name":"(anonymous_7)","line":97,"loc":{"start":{"line":97,"column":23},"end":{"line":97,"column":39}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":112,"column":36}},"2":{"start":{"line":9,"column":0},"end":{"line":9,"column":12}},"3":{"start":{"line":19,"column":0},"end":{"line":106,"column":3}},"4":{"start":{"line":35,"column":8},"end":{"line":35,"column":56}},"5":{"start":{"line":41,"column":8},"end":{"line":43,"column":51}},"6":{"start":{"line":45,"column":8},"end":{"line":45,"column":40}},"7":{"start":{"line":47,"column":8},"end":{"line":47,"column":58}},"8":{"start":{"line":49,"column":8},"end":{"line":68,"column":11}},"9":{"start":{"line":50,"column":12},"end":{"line":52,"column":56}},"10":{"start":{"line":54,"column":12},"end":{"line":54,"column":54}},"11":{"start":{"line":55,"column":12},"end":{"line":55,"column":41}},"12":{"start":{"line":56,"column":12},"end":{"line":56,"column":33}},"13":{"start":{"line":58,"column":12},"end":{"line":58,"column":39}},"14":{"start":{"line":59,"column":12},"end":{"line":59,"column":44}},"15":{"start":{"line":60,"column":12},"end":{"line":60,"column":39}},"16":{"start":{"line":62,"column":12},"end":{"line":65,"column":13}},"17":{"start":{"line":63,"column":16},"end":{"line":63,"column":40}},"18":{"start":{"line":64,"column":16},"end":{"line":64,"column":38}},"19":{"start":{"line":67,"column":12},"end":{"line":67,"column":43}},"20":{"start":{"line":74,"column":8},"end":{"line":76,"column":47}},"21":{"start":{"line":78,"column":8},"end":{"line":78,"column":55}},"22":{"start":{"line":80,"column":8},"end":{"line":80,"column":47}},"23":{"start":{"line":81,"column":8},"end":{"line":81,"column":54}},"24":{"start":{"line":83,"column":8},"end":{"line":83,"column":61}},"25":{"start":{"line":92,"column":8},"end":{"line":93,"column":47}},"26":{"start":{"line":95,"column":8},"end":{"line":95,"column":63}},"27":{"start":{"line":97,"column":8},"end":{"line":99,"column":11}},"28":{"start":{"line":98,"column":12},"end":{"line":98,"column":63}},"29":{"start":{"line":109,"column":0},"end":{"line":109,"column":41}}},"branchMap":{"1":{"line":62,"type":"if","locations":[{"start":{"line":62,"column":12},"end":{"line":62,"column":12}},{"start":{"line":62,"column":12},"end":{"line":62,"column":12}}]}},"code":["(function () { YUI.add('rednose-tabview', function (Y, NAME) {","","","/**","Provides a generic tabview.","","@module rednose-tabview","**/","var TabView;","","/**","Provides a generic tabview.","","@class TabView","@namespace Rednose","@constructor","@extends TabView","**/","TabView = Y.Base.create('tabView', Y.Widget, [], {","    // -- Public Properties ----------------------------------------------------","","    template:","        '<div class=\"tabbable\">' +","            '<ul class=\"nav nav-tabs\">' +","            '</ul>' +","        '</div>' +","        '<div class=\"tab-content\">' +","        '</div>',","","    itemTemplate: '<li><a></a></li>',","","    paneTemplate: '<div class=\"tab-pane\"></div>',","","    initializer: function () {","        this.after('errorChange', this._setError, this);","    },","","    // -- Lifecycle Methods ----------------------------------------------------","","    renderUI: function (container) {","        var self          = this,","            tabs          = this.get('tabs'),","            container     = this.get('contentBox');","","        container.append(this.template);","","        var paneContainer = container.one('.tab-content');","","        Y.each(tabs, function(tab) {","            var li   = Y.Node.create(self.itemTemplate),","                a    = li.one('a'),","                pane = Y.Node.create(self.paneTemplate);","","            a.on('click', self._handleTabClick, self);","            a.setAttribute('id', tab.id);","            a.setHTML(tab.title);","","            pane.append(tab.container);","            pane.setAttribute('id', tab.id);","            paneContainer.append(pane);","","            if (tab.active) {","                pane.addClass('active');","                li.addClass('active');","            }","","            container.one('ul').append(li);","        });","    },","","    // -- Protected Methods ----------------------------------------------------","","    _handleTabClick: function (e) {","        var a         = e.currentTarget,","            id        = a.getAttribute('id'),","            container = this.get('contentBox');","","        container.all('.active').removeClass('active');","","        a.get('parentNode').addClass('active');","        container.one('div#' + id).addClass('active');","","        this.fire('click', { tabNode: a.get('parentNode') });","    },","","    /**","     * Fired when the `error` property changes.","     *","     * @private","     */","    _setError: function (e) {","        var errors = e.newVal,","            container = this.get('contentBox');","","        container.all('.text-error').removeClass('text-error');","","        Y.each(errors, function(error) {","            container.one('a#' + error).addClass('text-error');","        });","    }","}, {","    ATTRS: {","        tabs: { value: {} },","        error: { value: [] }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').TabView = TabView;","","","}, '1.4.0', {\"requires\": [\"node\"]});","","}());"]};
}
var __cov_09x9yxnDl7Sy2XOWeiJ$WQ = __coverage__['build/rednose-tabview/rednose-tabview.js'];
__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['1']++;YUI.add('rednose-tabview',function(Y,NAME){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['1']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['2']++;var TabView;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['3']++;TabView=Y.Base.create('tabView',Y.Widget,[],{template:'<div class="tabbable">'+'<ul class="nav nav-tabs">'+'</ul>'+'</div>'+'<div class="tab-content">'+'</div>',itemTemplate:'<li><a></a></li>',paneTemplate:'<div class="tab-pane"></div>',initializer:function(){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['2']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['4']++;this.after('errorChange',this._setError,this);},renderUI:function(container){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['3']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['5']++;var self=this,tabs=this.get('tabs'),container=this.get('contentBox');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['6']++;container.append(this.template);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['7']++;var paneContainer=container.one('.tab-content');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['8']++;Y.each(tabs,function(tab){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['4']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['9']++;var li=Y.Node.create(self.itemTemplate),a=li.one('a'),pane=Y.Node.create(self.paneTemplate);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['10']++;a.on('click',self._handleTabClick,self);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['11']++;a.setAttribute('id',tab.id);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['12']++;a.setHTML(tab.title);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['13']++;pane.append(tab.container);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['14']++;pane.setAttribute('id',tab.id);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['15']++;paneContainer.append(pane);__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['16']++;if(tab.active){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.b['1'][0]++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['17']++;pane.addClass('active');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['18']++;li.addClass('active');}else{__cov_09x9yxnDl7Sy2XOWeiJ$WQ.b['1'][1]++;}__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['19']++;container.one('ul').append(li);});},_handleTabClick:function(e){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['5']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['20']++;var a=e.currentTarget,id=a.getAttribute('id'),container=this.get('contentBox');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['21']++;container.all('.active').removeClass('active');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['22']++;a.get('parentNode').addClass('active');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['23']++;container.one('div#'+id).addClass('active');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['24']++;this.fire('click',{tabNode:a.get('parentNode')});},_setError:function(e){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['6']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['25']++;var errors=e.newVal,container=this.get('contentBox');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['26']++;container.all('.text-error').removeClass('text-error');__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['27']++;Y.each(errors,function(error){__cov_09x9yxnDl7Sy2XOWeiJ$WQ.f['7']++;__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['28']++;container.one('a#'+error).addClass('text-error');});}},{ATTRS:{tabs:{value:{}},error:{value:[]}}});__cov_09x9yxnDl7Sy2XOWeiJ$WQ.s['29']++;Y.namespace('Rednose').TabView=TabView;},'1.4.0',{'requires':['node']});
