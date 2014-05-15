if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-util/rednose-util.js']) {
   __coverage__['build/rednose-util/rednose-util.js'] = {"path":"build/rednose-util/rednose-util.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}},"2":{"name":"Util","line":7,"loc":{"start":{"line":7,"column":0},"end":{"line":7,"column":16}}},"3":{"name":"(anonymous_3)","line":16,"loc":{"start":{"line":16,"column":19},"end":{"line":16,"column":36}}},"4":{"name":"(anonymous_4)","line":31,"loc":{"start":{"line":31,"column":22},"end":{"line":31,"column":38}}},"5":{"name":"(anonymous_5)","line":43,"loc":{"start":{"line":43,"column":18},"end":{"line":43,"column":50}}},"6":{"name":"(anonymous_6)","line":54,"loc":{"start":{"line":54,"column":29},"end":{"line":54,"column":46}}},"7":{"name":"(anonymous_7)","line":65,"loc":{"start":{"line":65,"column":23},"end":{"line":65,"column":41}}},"8":{"name":"(anonymous_8)","line":66,"loc":{"start":{"line":66,"column":38},"end":{"line":66,"column":52}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":75,"column":49}},"2":{"start":{"line":5,"column":0},"end":{"line":5,"column":19}},"3":{"start":{"line":7,"column":0},"end":{"line":7,"column":18}},"4":{"start":{"line":16,"column":0},"end":{"line":22,"column":2}},"5":{"start":{"line":17,"column":4},"end":{"line":19,"column":5}},"6":{"start":{"line":18,"column":8},"end":{"line":18,"column":94}},"7":{"start":{"line":21,"column":4},"end":{"line":21,"column":17}},"8":{"start":{"line":31,"column":0},"end":{"line":33,"column":2}},"9":{"start":{"line":32,"column":4},"end":{"line":32,"column":51}},"10":{"start":{"line":43,"column":0},"end":{"line":45,"column":2}},"11":{"start":{"line":44,"column":4},"end":{"line":44,"column":57}},"12":{"start":{"line":54,"column":0},"end":{"line":56,"column":2}},"13":{"start":{"line":55,"column":4},"end":{"line":55,"column":58}},"14":{"start":{"line":65,"column":0},"end":{"line":69,"column":2}},"15":{"start":{"line":66,"column":4},"end":{"line":68,"column":7}},"16":{"start":{"line":67,"column":8},"end":{"line":67,"column":38}},"17":{"start":{"line":72,"column":0},"end":{"line":72,"column":35}}},"branchMap":{"1":{"line":17,"type":"if","locations":[{"start":{"line":17,"column":4},"end":{"line":17,"column":4}},{"start":{"line":17,"column":4},"end":{"line":17,"column":4}}]}},"code":["(function () { YUI.add('rednose-util', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","var ELLIPSIS = '…';","","function Util() {}","","/**"," * Adds ellipsis to the center of a string."," *"," * @param {String} label"," * @returns {String}"," * @static"," */","Util.formatLabel = function (label) {","    if (label.length > 24) {","        return label.substr(0, 12) + ELLIPSIS + label.substr(label.length - 12, label.length);","    }","","    return label;","};","","/**"," * Formats a date."," *"," * @param {Date} date"," * @returns {String}"," * @static"," */","Util.formatDateTime = function (date) {","    return Y.Date.format(date, {format: '%x %R' });","};","","/**"," * Checks if a given node is the ancestor of another."," *"," * @param {Node} ancestor"," * @param {Node} descendant"," * @returns {Boolean}"," * @static"," */","Util.isAncestor = function (ancestor, descendant) {","    return descendant.ancestor('#' + ancestor.get('id'));","};","","/**"," * Formatting helper method to capitalize the first letter of a given string"," *"," * @param {String} value The string to capitalize."," * @returns {String}"," * @protected"," */","Util.capitalizeFirstLetter = function (value) {","    return value.charAt(0).toUpperCase() + value.slice(1);","};","","/**"," * Formatting helper method."," *"," * @param {String} string The string to convert."," * @returns {String}"," * @static"," */","Util.camelCaseToDash = function (string) {","    return string.replace(/([A-Z])/g, function ($1) {","        return '-' + $1.toLowerCase();","    });","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Util = Util;","","","}, '1.5.0-DEV', {\"requires\": [\"datatype-date\"]});","","}());"]};
}
var __cov_WsSzO$Dqk88mYCGWO$EXaw = __coverage__['build/rednose-util/rednose-util.js'];
__cov_WsSzO$Dqk88mYCGWO$EXaw.s['1']++;YUI.add('rednose-util',function(Y,NAME){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['1']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['2']++;var ELLIPSIS='\u2026';__cov_WsSzO$Dqk88mYCGWO$EXaw.s['3']++;function Util(){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['2']++;}__cov_WsSzO$Dqk88mYCGWO$EXaw.s['4']++;Util.formatLabel=function(label){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['3']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['5']++;if(label.length>24){__cov_WsSzO$Dqk88mYCGWO$EXaw.b['1'][0]++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['6']++;return label.substr(0,12)+ELLIPSIS+label.substr(label.length-12,label.length);}else{__cov_WsSzO$Dqk88mYCGWO$EXaw.b['1'][1]++;}__cov_WsSzO$Dqk88mYCGWO$EXaw.s['7']++;return label;};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['8']++;Util.formatDateTime=function(date){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['4']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['9']++;return Y.Date.format(date,{format:'%x %R'});};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['10']++;Util.isAncestor=function(ancestor,descendant){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['5']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['11']++;return descendant.ancestor('#'+ancestor.get('id'));};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['12']++;Util.capitalizeFirstLetter=function(value){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['6']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['13']++;return value.charAt(0).toUpperCase()+value.slice(1);};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['14']++;Util.camelCaseToDash=function(string){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['7']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['15']++;return string.replace(/([A-Z])/g,function($1){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['8']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['16']++;return'-'+$1.toLowerCase();});};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['17']++;Y.namespace('Rednose').Util=Util;},'1.5.0-DEV',{'requires':['datatype-date']});
