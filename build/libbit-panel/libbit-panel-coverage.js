if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/libbit-panel/libbit-panel.js']) {
   __coverage__['build/libbit-panel/libbit-panel.js'] = {"path":"build/libbit-panel/libbit-panel.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}},"2":{"name":"(anonymous_2)","line":7,"loc":{"start":{"line":7,"column":17},"end":{"line":7,"column":28}}},"3":{"name":"(anonymous_3)","line":11,"loc":{"start":{"line":11,"column":29},"end":{"line":11,"column":40}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":31,"column":57}},"2":{"start":{"line":3,"column":0},"end":{"line":3,"column":10}},"3":{"start":{"line":5,"column":0},"end":{"line":25,"column":3}},"4":{"start":{"line":8,"column":8},"end":{"line":8,"column":48}},"5":{"start":{"line":9,"column":8},"end":{"line":9,"column":24}},"6":{"start":{"line":11,"column":8},"end":{"line":22,"column":11}},"7":{"start":{"line":13,"column":12},"end":{"line":13,"column":66}},"8":{"start":{"line":15,"column":12},"end":{"line":17,"column":13}},"9":{"start":{"line":16,"column":16},"end":{"line":16,"column":65}},"10":{"start":{"line":20,"column":12},"end":{"line":20,"column":28}},"11":{"start":{"line":21,"column":12},"end":{"line":21,"column":28}},"12":{"start":{"line":28,"column":0},"end":{"line":28,"column":36}}},"branchMap":{"1":{"line":15,"type":"if","locations":[{"start":{"line":15,"column":12},"end":{"line":15,"column":12}},{"start":{"line":15,"column":12},"end":{"line":15,"column":12}}]}},"code":["(function () { YUI.add('libbit-panel', function (Y, NAME) {","","var Panel;","","Panel = Y.Base.create('panel', Y.Panel, [], {","","    initializer: function() {","        var container = this.get('boundingBox');","        var self = this;","","        this.after('render', function() {","            // Remove the first header (close button).","            var closeButton = container.one('.yui3-button-close');","","            if (closeButton) {","                closeButton.ancestor('.yui3-widget-hd').remove();","            }","","            // Re-align the modal panel.","            self.move(1, 1);","            self.centered();","        });","    }","","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Panel = Panel;","","","}, '1.0.0', {\"requires\": [\"libbit-panel-css\", \"panel\"]});","","}());"]};
}
var __cov_FTTfVMTMQ8c48jvKFWf9lg = __coverage__['build/libbit-panel/libbit-panel.js'];
__cov_FTTfVMTMQ8c48jvKFWf9lg.s['1']++;YUI.add('libbit-panel',function(Y,NAME){__cov_FTTfVMTMQ8c48jvKFWf9lg.f['1']++;__cov_FTTfVMTMQ8c48jvKFWf9lg.s['2']++;var Panel;__cov_FTTfVMTMQ8c48jvKFWf9lg.s['3']++;Panel=Y.Base.create('panel',Y.Panel,[],{initializer:function(){__cov_FTTfVMTMQ8c48jvKFWf9lg.f['2']++;__cov_FTTfVMTMQ8c48jvKFWf9lg.s['4']++;var container=this.get('boundingBox');__cov_FTTfVMTMQ8c48jvKFWf9lg.s['5']++;var self=this;__cov_FTTfVMTMQ8c48jvKFWf9lg.s['6']++;this.after('render',function(){__cov_FTTfVMTMQ8c48jvKFWf9lg.f['3']++;__cov_FTTfVMTMQ8c48jvKFWf9lg.s['7']++;var closeButton=container.one('.yui3-button-close');__cov_FTTfVMTMQ8c48jvKFWf9lg.s['8']++;if(closeButton){__cov_FTTfVMTMQ8c48jvKFWf9lg.b['1'][0]++;__cov_FTTfVMTMQ8c48jvKFWf9lg.s['9']++;closeButton.ancestor('.yui3-widget-hd').remove();}else{__cov_FTTfVMTMQ8c48jvKFWf9lg.b['1'][1]++;}__cov_FTTfVMTMQ8c48jvKFWf9lg.s['10']++;self.move(1,1);__cov_FTTfVMTMQ8c48jvKFWf9lg.s['11']++;self.centered();});}});__cov_FTTfVMTMQ8c48jvKFWf9lg.s['12']++;Y.namespace('Libbit').Panel=Panel;},'1.0.0',{'requires':['libbit-panel-css','panel']});
