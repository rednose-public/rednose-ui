if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-tooltip/rednose-tooltip.js']) {
   __coverage__['build/rednose-tooltip/rednose-tooltip.js'] = {"path":"build/rednose-tooltip/rednose-tooltip.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":28,"loc":{"start":{"line":28,"column":17},"end":{"line":28,"column":29}}},"3":{"name":"(anonymous_3)","line":40,"loc":{"start":{"line":40,"column":14},"end":{"line":40,"column":26}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":62,"column":61}},"2":{"start":{"line":11,"column":0},"end":{"line":11,"column":49}},"3":{"start":{"line":21,"column":0},"end":{"line":56,"column":3}},"4":{"start":{"line":31,"column":8},"end":{"line":31,"column":64}},"5":{"start":{"line":41,"column":8},"end":{"line":43,"column":50}},"6":{"start":{"line":45,"column":8},"end":{"line":50,"column":9}},"7":{"start":{"line":46,"column":12},"end":{"line":46,"column":63}},"8":{"start":{"line":48,"column":12},"end":{"line":48,"column":44}},"9":{"start":{"line":49,"column":12},"end":{"line":49,"column":62}},"10":{"start":{"line":52,"column":8},"end":{"line":52,"column":33}},"11":{"start":{"line":53,"column":8},"end":{"line":53,"column":33}},"12":{"start":{"line":54,"column":8},"end":{"line":54,"column":83}},"13":{"start":{"line":59,"column":0},"end":{"line":59,"column":41}}},"branchMap":{"1":{"line":45,"type":"if","locations":[{"start":{"line":45,"column":8},"end":{"line":45,"column":8}},{"start":{"line":45,"column":8},"end":{"line":45,"column":8}}]}},"code":["(function () { YUI.add('rednose-tooltip', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**","Provides a tooltip manager.","","@module rednose-tooltip","**/","","var ATTR_STYLE_BOOTSTRAP_ZINDEX_TOOLTIP = '1030';","","/**","Provides a tooltip manager.","","@class Tooltip","@namespace Rednose","@constructor","@extends Bootstrap.Tooltip","**/","var Tooltip = Y.Base.create('tooltip', Y.Bootstrap.Tooltip, [], {","    // -- Lifecycle methods ----------------------------------------------------","","    /**","    @method initializer","    @protected","    **/","    initializer: function () {","        // Correct the z-index because the superclass set's it to 0.","        // Value is taken from Bootstrap's '@zindexTooltip' variable.","        this.set('zIndex', ATTR_STYLE_BOOTSTRAP_ZINDEX_TOOLTIP);","    },","","    /**","    Patches the superclass method to get the correct target.","","    @method _showFn","    @protected","    **/","    _showFn : function(e) {","        var target = e.currentTarget,","            delay  = this.get('delay'),","            title  = target.getAttribute('title');","","        if (!title) {","            title = target.getAttribute('data-original-title');","        } else {","            target.removeAttribute('title');","            target.setAttribute('data-original-title', title);","        }","","        this.set('title', title);","        this._hoverState  = 'in';","        this._showTimeout = Y.later( delay, this, this._show, { target: target } );","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Tooltip = Tooltip;","","","}, '1.1.0-DEV', {\"requires\": [\"gallery-bootstrap-tooltip\"]});","","}());"]};
}
var __cov_cW5XQ1HLvU36VUXxGTEiXQ = __coverage__['build/rednose-tooltip/rednose-tooltip.js'];
__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['1']++;YUI.add('rednose-tooltip',function(Y,NAME){__cov_cW5XQ1HLvU36VUXxGTEiXQ.f['1']++;__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['2']++;var ATTR_STYLE_BOOTSTRAP_ZINDEX_TOOLTIP='1030';__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['3']++;var Tooltip=Y.Base.create('tooltip',Y.Bootstrap.Tooltip,[],{initializer:function(){__cov_cW5XQ1HLvU36VUXxGTEiXQ.f['2']++;__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['4']++;this.set('zIndex',ATTR_STYLE_BOOTSTRAP_ZINDEX_TOOLTIP);},_showFn:function(e){__cov_cW5XQ1HLvU36VUXxGTEiXQ.f['3']++;__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['5']++;var target=e.currentTarget,delay=this.get('delay'),title=target.getAttribute('title');__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['6']++;if(!title){__cov_cW5XQ1HLvU36VUXxGTEiXQ.b['1'][0]++;__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['7']++;title=target.getAttribute('data-original-title');}else{__cov_cW5XQ1HLvU36VUXxGTEiXQ.b['1'][1]++;__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['8']++;target.removeAttribute('title');__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['9']++;target.setAttribute('data-original-title',title);}__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['10']++;this.set('title',title);__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['11']++;this._hoverState='in';__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['12']++;this._showTimeout=Y.later(delay,this,this._show,{target:target});}});__cov_cW5XQ1HLvU36VUXxGTEiXQ.s['13']++;Y.namespace('Rednose').Tooltip=Tooltip;},'1.1.0-DEV',{'requires':['gallery-bootstrap-tooltip']});
