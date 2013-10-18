if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-formatter/rednose-formatter.js']) {
   __coverage__['build/rednose-formatter/rednose-formatter.js'] = {"path":"build/rednose-formatter/rednose-formatter.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0},"b":{"1":[0,0],"2":[0,0,0,0]},"f":{"1":0,"2":0,"3":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":29},"end":{"line":1,"column":48}}},"2":{"name":"Formatter","line":16,"loc":{"start":{"line":16,"column":0},"end":{"line":16,"column":21}}},"3":{"name":"(anonymous_3)","line":30,"loc":{"start":{"line":30,"column":17},"end":{"line":30,"column":33}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":67,"column":16}},"2":{"start":{"line":16,"column":0},"end":{"line":18,"column":1}},"3":{"start":{"line":17,"column":4},"end":{"line":17,"column":49}},"4":{"start":{"line":30,"column":0},"end":{"line":61,"column":2}},"5":{"start":{"line":31,"column":4},"end":{"line":31,"column":28}},"6":{"start":{"line":34,"column":4},"end":{"line":58,"column":5}},"7":{"start":{"line":35,"column":8},"end":{"line":57,"column":9}},"8":{"start":{"line":37,"column":12},"end":{"line":37,"column":48}},"9":{"start":{"line":39,"column":12},"end":{"line":52,"column":13}},"10":{"start":{"line":41,"column":20},"end":{"line":41,"column":54}},"11":{"start":{"line":42,"column":20},"end":{"line":42,"column":26}},"12":{"start":{"line":44,"column":20},"end":{"line":44,"column":51}},"13":{"start":{"line":45,"column":20},"end":{"line":45,"column":26}},"14":{"start":{"line":47,"column":20},"end":{"line":47,"column":51}},"15":{"start":{"line":48,"column":20},"end":{"line":48,"column":26}},"16":{"start":{"line":50,"column":20},"end":{"line":50,"column":51}},"17":{"start":{"line":51,"column":20},"end":{"line":51,"column":26}},"18":{"start":{"line":54,"column":12},"end":{"line":54,"column":18}},"19":{"start":{"line":56,"column":12},"end":{"line":56,"column":31}},"20":{"start":{"line":60,"column":4},"end":{"line":60,"column":16}},"21":{"start":{"line":64,"column":0},"end":{"line":64,"column":45}}},"branchMap":{"1":{"line":35,"type":"if","locations":[{"start":{"line":35,"column":8},"end":{"line":35,"column":8}},{"start":{"line":35,"column":8},"end":{"line":35,"column":8}}]},"2":{"line":39,"type":"switch","locations":[{"start":{"line":40,"column":16},"end":{"line":42,"column":26}},{"start":{"line":43,"column":16},"end":{"line":45,"column":26}},{"start":{"line":46,"column":16},"end":{"line":48,"column":26}},{"start":{"line":49,"column":16},"end":{"line":51,"column":26}}]}},"code":["(function () { YUI.add('rednose-formatter', function (Y, NAME) {","","/**","Several formatter class methods to be used throughout the rednose-ui framework.","","@module rednose-formatter","**/","","/**","Several formatter class methods to be used throughout the rednose-ui framework.","","@class Formatter","@namespace Rednose","@constructor","**/","function Formatter() {","    Formatter.superclass.constructor.apply(this);","}","","// -- Static methods ------------------------------------------------------------","","/**","Formats a size string from bytes.","","@method slideInY","@param {Mixed} size The size to format","@return {String} The formatted string","@static","**/","Formatter.size = function (size) {","    size = parseFloat(size);","","    // Use 1000 instead of 1024 for calculating size.","    for (var i = 0; i < 4; i++) {","        if (size < 1000) {","            // Round up to 2 decimals.","            size = Math.round(size * 100) / 100;","","            switch (i) {","                case 0:","                    size = size.toString() + ' bytes';","                    break;","                case 1:","                    size = size.toString() + ' kB';","                    break;","                case 2:","                    size = size.toString() + ' MB';","                    break;","                case 3:","                    size = size.toString() + ' GB';","                    break;","            }","","            i = 4;","        } else {","            size = size / 1000;","        }","    }","","    return size;","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Formatter = Formatter;","","","}, '1.1.0-DEV');","","}());"]};
}
var __cov_$uqJ4rrlyVtqGjGC1Bol_Q = __coverage__['build/rednose-formatter/rednose-formatter.js'];
__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['1']++;YUI.add('rednose-formatter',function(Y,NAME){__cov_$uqJ4rrlyVtqGjGC1Bol_Q.f['1']++;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['2']++;function Formatter(){__cov_$uqJ4rrlyVtqGjGC1Bol_Q.f['2']++;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['3']++;Formatter.superclass.constructor.apply(this);}__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['4']++;Formatter.size=function(size){__cov_$uqJ4rrlyVtqGjGC1Bol_Q.f['3']++;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['5']++;size=parseFloat(size);__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['6']++;for(var i=0;i<4;i++){__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['7']++;if(size<1000){__cov_$uqJ4rrlyVtqGjGC1Bol_Q.b['1'][0]++;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['8']++;size=Math.round(size*100)/100;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['9']++;switch(i){case 0:__cov_$uqJ4rrlyVtqGjGC1Bol_Q.b['2'][0]++;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['10']++;size=size.toString()+' bytes';__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['11']++;break;case 1:__cov_$uqJ4rrlyVtqGjGC1Bol_Q.b['2'][1]++;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['12']++;size=size.toString()+' kB';__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['13']++;break;case 2:__cov_$uqJ4rrlyVtqGjGC1Bol_Q.b['2'][2]++;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['14']++;size=size.toString()+' MB';__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['15']++;break;case 3:__cov_$uqJ4rrlyVtqGjGC1Bol_Q.b['2'][3]++;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['16']++;size=size.toString()+' GB';__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['17']++;break;}__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['18']++;i=4;}else{__cov_$uqJ4rrlyVtqGjGC1Bol_Q.b['1'][1]++;__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['19']++;size=size/1000;}}__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['20']++;return size;};__cov_$uqJ4rrlyVtqGjGC1Bol_Q.s['21']++;Y.namespace('Rednose').Formatter=Formatter;},'1.1.0-DEV');
