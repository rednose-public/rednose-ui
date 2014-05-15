if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-timepicker-plugin/rednose-timepicker-plugin.js']) {
   __coverage__['build/rednose-timepicker-plugin/rednose-timepicker-plugin.js'] = {"path":"build/rednose-timepicker-plugin/rednose-timepicker-plugin.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":37},"end":{"line":1,"column":56}}},"2":{"name":"(anonymous_2)","line":18,"loc":{"start":{"line":18,"column":17},"end":{"line":18,"column":35}}},"3":{"name":"(anonymous_3)","line":37,"loc":{"start":{"line":37,"column":14},"end":{"line":37,"column":26}}},"4":{"name":"(anonymous_4)","line":41,"loc":{"start":{"line":41,"column":14},"end":{"line":41,"column":30}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":59,"column":63}},"2":{"start":{"line":11,"column":0},"end":{"line":56,"column":3}},"3":{"start":{"line":19,"column":8},"end":{"line":19,"column":33}},"4":{"start":{"line":21,"column":8},"end":{"line":21,"column":41}},"5":{"start":{"line":22,"column":8},"end":{"line":22,"column":49}},"6":{"start":{"line":24,"column":8},"end":{"line":27,"column":11}},"7":{"start":{"line":29,"column":8},"end":{"line":29,"column":55}},"8":{"start":{"line":32,"column":8},"end":{"line":34,"column":10}},"9":{"start":{"line":38,"column":8},"end":{"line":38,"column":35}},"10":{"start":{"line":42,"column":8},"end":{"line":42,"column":36}},"11":{"start":{"line":44,"column":8},"end":{"line":44,"column":20}}},"branchMap":{"1":{"line":21,"type":"binary-expr","locations":[{"start":{"line":21,"column":19},"end":{"line":21,"column":32}},{"start":{"line":21,"column":36},"end":{"line":21,"column":40}}]}},"code":["(function () { YUI.add('rednose-timepicker-plugin', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Provides the `Y.Rednose.Plugin.Timepicker` Node plugin."," *"," * @module rednose-datetimepicker"," */","","Y.namespace('Rednose.Plugin').Timepicker = Y.Base.create('timepicker', Y.Base, [Y.Plugin.Base], {","    // -- Protected Properties--------------------------------------------------","","    _element: null,","","    // -- Life Cycle Methods ---------------------------------------------------","","    initializer: function (config) {","        this._host = config.host;","","        var lang = Y.config.lang || null;","        var element = $(this._host.getDOMNode());","","        element.datetimepicker({","            pickDate: false,","            language: lang","        });","","        this._element = element.data('datetimepicker');","","        // Force a refresh","        this._element.setDate(","            this._element.getDate()","        );","    },","","    _getDate: function () {","        return this._element._date;","    },","","    _setDate: function (date) {","        this._element.setDate(date);","","        return date;","    }","}, {","    NS: 'timepicker',","","    ATTRS: {","        date: {","            value: null,","            getter: '_getDate',","            setter: '_setDate'","        }","    }","});","","","}, '1.5.0-DEV', {\"requires\": [\"rednose-datetimepicker-base\"]});","","}());"]};
}
var __cov_4rf2_5H9ezQgE2gbHP6qUw = __coverage__['build/rednose-timepicker-plugin/rednose-timepicker-plugin.js'];
__cov_4rf2_5H9ezQgE2gbHP6qUw.s['1']++;YUI.add('rednose-timepicker-plugin',function(Y,NAME){__cov_4rf2_5H9ezQgE2gbHP6qUw.f['1']++;__cov_4rf2_5H9ezQgE2gbHP6qUw.s['2']++;Y.namespace('Rednose.Plugin').Timepicker=Y.Base.create('timepicker',Y.Base,[Y.Plugin.Base],{_element:null,initializer:function(config){__cov_4rf2_5H9ezQgE2gbHP6qUw.f['2']++;__cov_4rf2_5H9ezQgE2gbHP6qUw.s['3']++;this._host=config.host;__cov_4rf2_5H9ezQgE2gbHP6qUw.s['4']++;var lang=(__cov_4rf2_5H9ezQgE2gbHP6qUw.b['1'][0]++,Y.config.lang)||(__cov_4rf2_5H9ezQgE2gbHP6qUw.b['1'][1]++,null);__cov_4rf2_5H9ezQgE2gbHP6qUw.s['5']++;var element=$(this._host.getDOMNode());__cov_4rf2_5H9ezQgE2gbHP6qUw.s['6']++;element.datetimepicker({pickDate:false,language:lang});__cov_4rf2_5H9ezQgE2gbHP6qUw.s['7']++;this._element=element.data('datetimepicker');__cov_4rf2_5H9ezQgE2gbHP6qUw.s['8']++;this._element.setDate(this._element.getDate());},_getDate:function(){__cov_4rf2_5H9ezQgE2gbHP6qUw.f['3']++;__cov_4rf2_5H9ezQgE2gbHP6qUw.s['9']++;return this._element._date;},_setDate:function(date){__cov_4rf2_5H9ezQgE2gbHP6qUw.f['4']++;__cov_4rf2_5H9ezQgE2gbHP6qUw.s['10']++;this._element.setDate(date);__cov_4rf2_5H9ezQgE2gbHP6qUw.s['11']++;return date;}},{NS:'timepicker',ATTRS:{date:{value:null,getter:'_getDate',setter:'_setDate'}}});},'1.5.0-DEV',{'requires':['rednose-datetimepicker-base']});
