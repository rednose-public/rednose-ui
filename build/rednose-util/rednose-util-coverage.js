if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-util/rednose-util.js']) {
   __coverage__['build/rednose-util/rednose-util.js'] = {"path":"build/rednose-util/rednose-util.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0],"8":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}},"2":{"name":"Util","line":7,"loc":{"start":{"line":7,"column":0},"end":{"line":7,"column":16}}},"3":{"name":"(anonymous_3)","line":16,"loc":{"start":{"line":16,"column":19},"end":{"line":16,"column":36}}},"4":{"name":"(anonymous_4)","line":31,"loc":{"start":{"line":31,"column":22},"end":{"line":31,"column":38}}},"5":{"name":"(anonymous_5)","line":43,"loc":{"start":{"line":43,"column":18},"end":{"line":43,"column":50}}},"6":{"name":"(anonymous_6)","line":54,"loc":{"start":{"line":54,"column":29},"end":{"line":54,"column":46}}},"7":{"name":"(anonymous_7)","line":65,"loc":{"start":{"line":65,"column":23},"end":{"line":65,"column":41}}},"8":{"name":"(anonymous_8)","line":66,"loc":{"start":{"line":66,"column":38},"end":{"line":66,"column":52}}},"9":{"name":"(anonymous_9)","line":80,"loc":{"start":{"line":80,"column":13},"end":{"line":80,"column":35}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":106,"column":49}},"2":{"start":{"line":5,"column":0},"end":{"line":5,"column":19}},"3":{"start":{"line":7,"column":0},"end":{"line":7,"column":18}},"4":{"start":{"line":16,"column":0},"end":{"line":22,"column":2}},"5":{"start":{"line":17,"column":4},"end":{"line":19,"column":5}},"6":{"start":{"line":18,"column":8},"end":{"line":18,"column":94}},"7":{"start":{"line":21,"column":4},"end":{"line":21,"column":17}},"8":{"start":{"line":31,"column":0},"end":{"line":33,"column":2}},"9":{"start":{"line":32,"column":4},"end":{"line":32,"column":51}},"10":{"start":{"line":43,"column":0},"end":{"line":45,"column":2}},"11":{"start":{"line":44,"column":4},"end":{"line":44,"column":57}},"12":{"start":{"line":54,"column":0},"end":{"line":56,"column":2}},"13":{"start":{"line":55,"column":4},"end":{"line":55,"column":58}},"14":{"start":{"line":65,"column":0},"end":{"line":69,"column":2}},"15":{"start":{"line":66,"column":4},"end":{"line":68,"column":7}},"16":{"start":{"line":67,"column":8},"end":{"line":67,"column":38}},"17":{"start":{"line":80,"column":0},"end":{"line":100,"column":2}},"18":{"start":{"line":81,"column":4},"end":{"line":83,"column":5}},"19":{"start":{"line":82,"column":8},"end":{"line":82,"column":33}},"20":{"start":{"line":85,"column":4},"end":{"line":85,"column":19}},"21":{"start":{"line":86,"column":4},"end":{"line":86,"column":16}},"22":{"start":{"line":88,"column":4},"end":{"line":90,"column":5}},"23":{"start":{"line":89,"column":8},"end":{"line":89,"column":19}},"24":{"start":{"line":93,"column":4},"end":{"line":93,"column":40}},"25":{"start":{"line":94,"column":4},"end":{"line":94,"column":81}},"26":{"start":{"line":97,"column":4},"end":{"line":97,"column":40}},"27":{"start":{"line":99,"column":4},"end":{"line":99,"column":69}},"28":{"start":{"line":103,"column":0},"end":{"line":103,"column":35}}},"branchMap":{"1":{"line":17,"type":"if","locations":[{"start":{"line":17,"column":4},"end":{"line":17,"column":4}},{"start":{"line":17,"column":4},"end":{"line":17,"column":4}}]},"2":{"line":81,"type":"if","locations":[{"start":{"line":81,"column":4},"end":{"line":81,"column":4}},{"start":{"line":81,"column":4},"end":{"line":81,"column":4}}]},"3":{"line":81,"type":"binary-expr","locations":[{"start":{"line":81,"column":8},"end":{"line":81,"column":34}},{"start":{"line":81,"column":38},"end":{"line":81,"column":48}}]},"4":{"line":88,"type":"if","locations":[{"start":{"line":88,"column":4},"end":{"line":88,"column":4}},{"start":{"line":88,"column":4},"end":{"line":88,"column":4}}]},"5":{"line":88,"type":"binary-expr","locations":[{"start":{"line":88,"column":8},"end":{"line":88,"column":20}},{"start":{"line":88,"column":24},"end":{"line":88,"column":67}}]},"6":{"line":88,"type":"binary-expr","locations":[{"start":{"line":88,"column":26},"end":{"line":88,"column":49}},{"start":{"line":88,"column":53},"end":{"line":88,"column":66}}]},"7":{"line":94,"type":"cond-expr","locations":[{"start":{"line":94,"column":55},"end":{"line":94,"column":70}},{"start":{"line":94,"column":74},"end":{"line":94,"column":77}}]},"8":{"line":99,"type":"cond-expr","locations":[{"start":{"line":99,"column":43},"end":{"line":99,"column":58}},{"start":{"line":99,"column":62},"end":{"line":99,"column":66}}]}},"code":["(function () { YUI.add('rednose-util', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","var ELLIPSIS = '…';","","function Util() {}","","/**"," * Adds ellipsis to the center of a string."," *"," * @param {String} label"," * @returns {String}"," * @static"," */","Util.formatLabel = function (label) {","    if (label.length > 24) {","        return label.substr(0, 12) + ELLIPSIS + label.substr(label.length - 12, label.length);","    }","","    return label;","};","","/**"," * Formats a date."," *"," * @param {Date} date"," * @returns {String}"," * @static"," */","Util.formatDateTime = function (date) {","    return Y.Date.format(date, {format: '%x %R' });","};","","/**"," * Checks if a given node is the ancestor of another."," *"," * @param {Node} ancestor"," * @param {Node} descendant"," * @returns {Boolean}"," * @static"," */","Util.isAncestor = function (ancestor, descendant) {","    return descendant.ancestor('#' + ancestor.get('id'));","};","","/**"," * Formatting helper method to capitalize the first letter of a given string"," *"," * @param {String} value The string to capitalize."," * @returns {String}"," * @protected"," */","Util.capitalizeFirstLetter = function (value) {","    return value.charAt(0).toUpperCase() + value.slice(1);","};","","/**"," * Formatting helper method."," *"," * @param {String} string The string to convert."," * @returns {String}"," * @static"," */","Util.camelCaseToDash = function (string) {","    return string.replace(/([A-Z])/g, function ($1) {","        return '-' + $1.toLowerCase();","    });","};","","/**"," * Rounds a number to a given number of digits."," *"," * Trailing zeros will be removed."," *"," * @param {Number} value The number to round"," * @returns {Number} exp The number of digits"," * @static"," */","Util.round = function (value, exp) {","    if (typeof exp === 'undefined' || +exp === 0) {","        return Math.round(value);","    }","","    value = +value;","    exp  = +exp;","","    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {","        return NaN;","    }","","    // Shift","    value = value.toString().split('e');","    value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));","","    // Shift back","    value = value.toString().split('e');","","    return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Util = Util;","","","}, '@VERSION@', {\"requires\": [\"datatype-date\"]});","","}());"]};
}
var __cov_WsSzO$Dqk88mYCGWO$EXaw = __coverage__['build/rednose-util/rednose-util.js'];
__cov_WsSzO$Dqk88mYCGWO$EXaw.s['1']++;YUI.add('rednose-util',function(Y,NAME){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['1']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['2']++;var ELLIPSIS='\u2026';__cov_WsSzO$Dqk88mYCGWO$EXaw.s['3']++;function Util(){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['2']++;}__cov_WsSzO$Dqk88mYCGWO$EXaw.s['4']++;Util.formatLabel=function(label){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['3']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['5']++;if(label.length>24){__cov_WsSzO$Dqk88mYCGWO$EXaw.b['1'][0]++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['6']++;return label.substr(0,12)+ELLIPSIS+label.substr(label.length-12,label.length);}else{__cov_WsSzO$Dqk88mYCGWO$EXaw.b['1'][1]++;}__cov_WsSzO$Dqk88mYCGWO$EXaw.s['7']++;return label;};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['8']++;Util.formatDateTime=function(date){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['4']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['9']++;return Y.Date.format(date,{format:'%x %R'});};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['10']++;Util.isAncestor=function(ancestor,descendant){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['5']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['11']++;return descendant.ancestor('#'+ancestor.get('id'));};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['12']++;Util.capitalizeFirstLetter=function(value){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['6']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['13']++;return value.charAt(0).toUpperCase()+value.slice(1);};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['14']++;Util.camelCaseToDash=function(string){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['7']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['15']++;return string.replace(/([A-Z])/g,function($1){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['8']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['16']++;return'-'+$1.toLowerCase();});};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['17']++;Util.round=function(value,exp){__cov_WsSzO$Dqk88mYCGWO$EXaw.f['9']++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['18']++;if((__cov_WsSzO$Dqk88mYCGWO$EXaw.b['3'][0]++,typeof exp==='undefined')||(__cov_WsSzO$Dqk88mYCGWO$EXaw.b['3'][1]++,+exp===0)){__cov_WsSzO$Dqk88mYCGWO$EXaw.b['2'][0]++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['19']++;return Math.round(value);}else{__cov_WsSzO$Dqk88mYCGWO$EXaw.b['2'][1]++;}__cov_WsSzO$Dqk88mYCGWO$EXaw.s['20']++;value=+value;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['21']++;exp=+exp;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['22']++;if((__cov_WsSzO$Dqk88mYCGWO$EXaw.b['5'][0]++,isNaN(value))||(__cov_WsSzO$Dqk88mYCGWO$EXaw.b['5'][1]++,!((__cov_WsSzO$Dqk88mYCGWO$EXaw.b['6'][0]++,typeof exp==='number')&&(__cov_WsSzO$Dqk88mYCGWO$EXaw.b['6'][1]++,exp%1===0)))){__cov_WsSzO$Dqk88mYCGWO$EXaw.b['4'][0]++;__cov_WsSzO$Dqk88mYCGWO$EXaw.s['23']++;return NaN;}else{__cov_WsSzO$Dqk88mYCGWO$EXaw.b['4'][1]++;}__cov_WsSzO$Dqk88mYCGWO$EXaw.s['24']++;value=value.toString().split('e');__cov_WsSzO$Dqk88mYCGWO$EXaw.s['25']++;value=Math.round(+(value[0]+'e'+(value[1]?(__cov_WsSzO$Dqk88mYCGWO$EXaw.b['7'][0]++,+value[1]+exp):(__cov_WsSzO$Dqk88mYCGWO$EXaw.b['7'][1]++,exp))));__cov_WsSzO$Dqk88mYCGWO$EXaw.s['26']++;value=value.toString().split('e');__cov_WsSzO$Dqk88mYCGWO$EXaw.s['27']++;return+(value[0]+'e'+(value[1]?(__cov_WsSzO$Dqk88mYCGWO$EXaw.b['8'][0]++,+value[1]-exp):(__cov_WsSzO$Dqk88mYCGWO$EXaw.b['8'][1]++,-exp)));};__cov_WsSzO$Dqk88mYCGWO$EXaw.s['28']++;Y.namespace('Rednose').Util=Util;},'@VERSION@',{'requires':['datatype-date']});
