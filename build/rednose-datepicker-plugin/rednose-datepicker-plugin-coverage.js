if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-datepicker-plugin/rednose-datepicker-plugin.js']) {
   __coverage__['build/rednose-datepicker-plugin/rednose-datepicker-plugin.js'] = {"path":"build/rednose-datepicker-plugin/rednose-datepicker-plugin.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":37},"end":{"line":1,"column":56}}},"2":{"name":"(anonymous_2)","line":19,"loc":{"start":{"line":19,"column":17},"end":{"line":19,"column":35}}},"3":{"name":"(anonymous_3)","line":38,"loc":{"start":{"line":38,"column":14},"end":{"line":38,"column":26}}},"4":{"name":"(anonymous_4)","line":42,"loc":{"start":{"line":42,"column":14},"end":{"line":42,"column":30}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":60,"column":63}},"2":{"start":{"line":11,"column":0},"end":{"line":57,"column":3}},"3":{"start":{"line":20,"column":8},"end":{"line":20,"column":33}},"4":{"start":{"line":22,"column":8},"end":{"line":22,"column":41}},"5":{"start":{"line":23,"column":8},"end":{"line":23,"column":49}},"6":{"start":{"line":25,"column":8},"end":{"line":28,"column":11}},"7":{"start":{"line":30,"column":8},"end":{"line":30,"column":55}},"8":{"start":{"line":33,"column":8},"end":{"line":35,"column":10}},"9":{"start":{"line":39,"column":8},"end":{"line":39,"column":35}},"10":{"start":{"line":43,"column":8},"end":{"line":43,"column":36}},"11":{"start":{"line":45,"column":8},"end":{"line":45,"column":20}}},"branchMap":{"1":{"line":22,"type":"binary-expr","locations":[{"start":{"line":22,"column":19},"end":{"line":22,"column":32}},{"start":{"line":22,"column":36},"end":{"line":22,"column":40}}]}},"code":["(function () { YUI.add('rednose-datepicker-plugin', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Provides the `Y.Rednose.Plugin.Datepicker` Node plugin."," *"," * @module rednose-datetimepicker"," */","","Y.namespace('Rednose.Plugin').Datepicker = Y.Base.create('datepicker', Y.Base, [Y.Plugin.Base], {","","    // -- Protected Properties--------------------------------------------------","","    _element: null,","","    // -- Life Cycle Methods ---------------------------------------------------","","    initializer: function (config) {","        this._host = config.host;","","        var lang = Y.config.lang || null;","        var element = $(this._host.getDOMNode());","","        element.datetimepicker({","            pickTime: false,","            language: lang","        });","","        this._element = element.data('datetimepicker');","","        // Force a refresh","        this._element.setDate(","            this._element.getDate()","        );","    },","","    _getDate: function () {","        return this._element._date;","    },","","    _setDate: function (date) {","        this._element.setDate(date);","","        return date;","    }","}, {","    NS: 'datepicker',","","    ATTRS: {","        date: {","            value: null,","            getter: '_getDate',","            setter: '_setDate'","        }","    }","});","","","}, '1.5.0-DEV', {\"requires\": [\"rednose-datetimepicker-base\"]});","","}());"]};
}
var __cov_RQjRt6FVD3EZoHerw6uE3Q = __coverage__['build/rednose-datepicker-plugin/rednose-datepicker-plugin.js'];
__cov_RQjRt6FVD3EZoHerw6uE3Q.s['1']++;YUI.add('rednose-datepicker-plugin',function(Y,NAME){__cov_RQjRt6FVD3EZoHerw6uE3Q.f['1']++;__cov_RQjRt6FVD3EZoHerw6uE3Q.s['2']++;Y.namespace('Rednose.Plugin').Datepicker=Y.Base.create('datepicker',Y.Base,[Y.Plugin.Base],{_element:null,initializer:function(config){__cov_RQjRt6FVD3EZoHerw6uE3Q.f['2']++;__cov_RQjRt6FVD3EZoHerw6uE3Q.s['3']++;this._host=config.host;__cov_RQjRt6FVD3EZoHerw6uE3Q.s['4']++;var lang=(__cov_RQjRt6FVD3EZoHerw6uE3Q.b['1'][0]++,Y.config.lang)||(__cov_RQjRt6FVD3EZoHerw6uE3Q.b['1'][1]++,null);__cov_RQjRt6FVD3EZoHerw6uE3Q.s['5']++;var element=$(this._host.getDOMNode());__cov_RQjRt6FVD3EZoHerw6uE3Q.s['6']++;element.datetimepicker({pickTime:false,language:lang});__cov_RQjRt6FVD3EZoHerw6uE3Q.s['7']++;this._element=element.data('datetimepicker');__cov_RQjRt6FVD3EZoHerw6uE3Q.s['8']++;this._element.setDate(this._element.getDate());},_getDate:function(){__cov_RQjRt6FVD3EZoHerw6uE3Q.f['3']++;__cov_RQjRt6FVD3EZoHerw6uE3Q.s['9']++;return this._element._date;},_setDate:function(date){__cov_RQjRt6FVD3EZoHerw6uE3Q.f['4']++;__cov_RQjRt6FVD3EZoHerw6uE3Q.s['10']++;this._element.setDate(date);__cov_RQjRt6FVD3EZoHerw6uE3Q.s['11']++;return date;}},{NS:'datepicker',ATTRS:{date:{value:null,getter:'_getDate',setter:'_setDate'}}});},'1.5.0-DEV',{'requires':['rednose-datetimepicker-base']});
