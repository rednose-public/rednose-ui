if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-panel/rednose-panel.js']) {
   __coverage__['build/rednose-panel/rednose-panel.js'] = {"path":"build/rednose-panel/rednose-panel.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":25},"end":{"line":1,"column":44}}},"2":{"name":"(anonymous_2)","line":34,"loc":{"start":{"line":34,"column":17},"end":{"line":34,"column":35}}},"3":{"name":"(anonymous_3)","line":54,"loc":{"start":{"line":54,"column":18},"end":{"line":54,"column":30}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":80,"column":95}},"2":{"start":{"line":12,"column":0},"end":{"line":21,"column":40}},"3":{"start":{"line":31,"column":0},"end":{"line":74,"column":3}},"4":{"start":{"line":35,"column":8},"end":{"line":35,"column":32}},"5":{"start":{"line":37,"column":8},"end":{"line":37,"column":53}},"6":{"start":{"line":38,"column":8},"end":{"line":38,"column":35}},"7":{"start":{"line":39,"column":8},"end":{"line":39,"column":35}},"8":{"start":{"line":40,"column":8},"end":{"line":40,"column":33}},"9":{"start":{"line":41,"column":8},"end":{"line":41,"column":65}},"10":{"start":{"line":43,"column":8},"end":{"line":43,"column":54}},"11":{"start":{"line":55,"column":8},"end":{"line":56,"column":64}},"12":{"start":{"line":58,"column":8},"end":{"line":61,"column":9}},"13":{"start":{"line":60,"column":12},"end":{"line":60,"column":63}},"14":{"start":{"line":63,"column":8},"end":{"line":63,"column":54}},"15":{"start":{"line":64,"column":8},"end":{"line":64,"column":48}},"16":{"start":{"line":66,"column":8},"end":{"line":68,"column":9}},"17":{"start":{"line":67,"column":12},"end":{"line":67,"column":55}},"18":{"start":{"line":77,"column":0},"end":{"line":77,"column":37}}},"branchMap":{"1":{"line":35,"type":"binary-expr","locations":[{"start":{"line":35,"column":8},"end":{"line":35,"column":14}},{"start":{"line":35,"column":19},"end":{"line":35,"column":30}}]},"2":{"line":41,"type":"binary-expr","locations":[{"start":{"line":41,"column":29},"end":{"line":41,"column":41}},{"start":{"line":41,"column":45},"end":{"line":41,"column":63}}]},"3":{"line":58,"type":"if","locations":[{"start":{"line":58,"column":8},"end":{"line":58,"column":8}},{"start":{"line":58,"column":8},"end":{"line":58,"column":8}}]},"4":{"line":66,"type":"if","locations":[{"start":{"line":66,"column":8},"end":{"line":66,"column":8}},{"start":{"line":66,"column":8},"end":{"line":66,"column":8}}]}},"code":["(function () { YUI.add('rednose-panel', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**"," * Provides a generic panel."," *"," * By default this class provides a modal, centered panel."," *"," * @module renodse-panel"," */","var Panel,","","    STYLE_DIALOG_WIDTH = 500,","    STYLE_POSITION_TOP = 100,","","    // Taken from Bootstrap's @zindexModal","    STYLE_BOOTSTRAP_ZINDEX = 1050,","","    CSS_BUTTON_CLOSE = 'yui3-button-close',","    CSS_WIDGET_HD    = 'yui3-widget-hd';","","/**"," * Provides a generic panel."," *"," * @class Panel"," * @namespace Rednose"," * @constructor"," * @extends Panel"," */","Panel = Y.Base.create('panel', Y.Panel, [], {","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        config || (config = {});","","        this.set('zIndex'  , STYLE_BOOTSTRAP_ZINDEX);","        this.set('centered', true);","        this.set('modal'   , true);","        this.set('hideOn'  , []);","        this.set('width'   , config.width || STYLE_DIALOG_WIDTH);","","        this.after('render', this._afterRender, this);","    },","","    // -- Protected Event Handlers ----------------------------------------------","","    /**","     * Sets the correct panel position and patches the default close button.","     *","     * @method _afterRender","     * @protected","     */","    _afterRender: function () {","        var container   = this.get('boundingBox'),","            closeButton = container.one('.' + CSS_BUTTON_CLOSE);","","        if (closeButton) {","            // Remove the first header (close button).","            closeButton.ancestor('.' + CSS_WIDGET_HD).remove();","        }","","        container.setStyle('top', STYLE_POSITION_TOP);","        container.setStyle('position', 'fixed');","","        if (this.get('top') > 0) {","            container.setStyle('top', this.get('top'));","        }","    }","}, {","    ATTRS: {","        top: { value: 0 }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Panel = Panel;","","","}, '1.7.0', {\"requires\": [\"panel\"], \"supersedes\": [\"skin-sam-widget-base\", \"skin-sam-panel\"]});","","}());"]};
}
var __cov_07mfLRsS6DetIsnOda$wZA = __coverage__['build/rednose-panel/rednose-panel.js'];
__cov_07mfLRsS6DetIsnOda$wZA.s['1']++;YUI.add('rednose-panel',function(Y,NAME){__cov_07mfLRsS6DetIsnOda$wZA.f['1']++;__cov_07mfLRsS6DetIsnOda$wZA.s['2']++;var Panel,STYLE_DIALOG_WIDTH=500,STYLE_POSITION_TOP=100,STYLE_BOOTSTRAP_ZINDEX=1050,CSS_BUTTON_CLOSE='yui3-button-close',CSS_WIDGET_HD='yui3-widget-hd';__cov_07mfLRsS6DetIsnOda$wZA.s['3']++;Panel=Y.Base.create('panel',Y.Panel,[],{initializer:function(config){__cov_07mfLRsS6DetIsnOda$wZA.f['2']++;__cov_07mfLRsS6DetIsnOda$wZA.s['4']++;(__cov_07mfLRsS6DetIsnOda$wZA.b['1'][0]++,config)||(__cov_07mfLRsS6DetIsnOda$wZA.b['1'][1]++,config={});__cov_07mfLRsS6DetIsnOda$wZA.s['5']++;this.set('zIndex',STYLE_BOOTSTRAP_ZINDEX);__cov_07mfLRsS6DetIsnOda$wZA.s['6']++;this.set('centered',true);__cov_07mfLRsS6DetIsnOda$wZA.s['7']++;this.set('modal',true);__cov_07mfLRsS6DetIsnOda$wZA.s['8']++;this.set('hideOn',[]);__cov_07mfLRsS6DetIsnOda$wZA.s['9']++;this.set('width',(__cov_07mfLRsS6DetIsnOda$wZA.b['2'][0]++,config.width)||(__cov_07mfLRsS6DetIsnOda$wZA.b['2'][1]++,STYLE_DIALOG_WIDTH));__cov_07mfLRsS6DetIsnOda$wZA.s['10']++;this.after('render',this._afterRender,this);},_afterRender:function(){__cov_07mfLRsS6DetIsnOda$wZA.f['3']++;__cov_07mfLRsS6DetIsnOda$wZA.s['11']++;var container=this.get('boundingBox'),closeButton=container.one('.'+CSS_BUTTON_CLOSE);__cov_07mfLRsS6DetIsnOda$wZA.s['12']++;if(closeButton){__cov_07mfLRsS6DetIsnOda$wZA.b['3'][0]++;__cov_07mfLRsS6DetIsnOda$wZA.s['13']++;closeButton.ancestor('.'+CSS_WIDGET_HD).remove();}else{__cov_07mfLRsS6DetIsnOda$wZA.b['3'][1]++;}__cov_07mfLRsS6DetIsnOda$wZA.s['14']++;container.setStyle('top',STYLE_POSITION_TOP);__cov_07mfLRsS6DetIsnOda$wZA.s['15']++;container.setStyle('position','fixed');__cov_07mfLRsS6DetIsnOda$wZA.s['16']++;if(this.get('top')>0){__cov_07mfLRsS6DetIsnOda$wZA.b['4'][0]++;__cov_07mfLRsS6DetIsnOda$wZA.s['17']++;container.setStyle('top',this.get('top'));}else{__cov_07mfLRsS6DetIsnOda$wZA.b['4'][1]++;}}},{ATTRS:{top:{value:0}}});__cov_07mfLRsS6DetIsnOda$wZA.s['18']++;Y.namespace('Rednose').Panel=Panel;},'1.7.0',{'requires':['panel'],'supersedes':['skin-sam-widget-base','skin-sam-panel']});
