if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-dropdown-keys-mac/rednose-dropdown-keys-mac.js']) {
   __coverage__['build/rednose-dropdown-keys-mac/rednose-dropdown-keys-mac.js'] = {"path":"build/rednose-dropdown-keys-mac/rednose-dropdown-keys-mac.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":37},"end":{"line":1,"column":56}}},"2":{"name":"DropdownKeysMac","line":20,"loc":{"start":{"line":20,"column":0},"end":{"line":20,"column":27}}},"3":{"name":"(anonymous_3)","line":40,"loc":{"start":{"line":40,"column":19},"end":{"line":40,"column":38}}},"4":{"name":"(anonymous_4)","line":44,"loc":{"start":{"line":44,"column":39},"end":{"line":44,"column":55}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":57,"column":16}},"2":{"start":{"line":12,"column":0},"end":{"line":12,"column":26}},"3":{"start":{"line":20,"column":0},"end":{"line":20,"column":29}},"4":{"start":{"line":22,"column":0},"end":{"line":50,"column":2}},"5":{"start":{"line":41,"column":8},"end":{"line":42,"column":18}},"6":{"start":{"line":44,"column":8},"end":{"line":46,"column":11}},"7":{"start":{"line":45,"column":12},"end":{"line":45,"column":74}},"8":{"start":{"line":48,"column":8},"end":{"line":48,"column":30}},"9":{"start":{"line":53,"column":0},"end":{"line":53,"column":45}},"10":{"start":{"line":54,"column":0},"end":{"line":54,"column":50}}},"branchMap":{"1":{"line":45,"type":"binary-expr","locations":[{"start":{"line":45,"column":19},"end":{"line":45,"column":37}},{"start":{"line":45,"column":41},"end":{"line":45,"column":73}}]}},"code":["(function () { YUI.add('rednose-dropdown-keys-mac', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Provides the Y.Rednose.Dropdown.KeysMac extension."," *"," * @module rednose-dropdown"," * @submodule rednose-dropdown-keys-mac"," */","","var Util = Y.Rednose.Util;","","/**"," * @class Rednose.Dropdown.KeysMac"," * @constructor"," * @extensionfor Rednose.Dropdown"," */","","function DropdownKeysMac() {}","","DropdownKeysMac.prototype = {","    // -- Protected Properties -------------------------------------------------","","    /**","     * @property _keyMap","     * @type {Object}","     */","    _keyMap: {","        'alt'  : '⌥',","        'ctrl' : '⌘',","        'shift': '⇧'","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * @see Rednose.Dropdown.Keys","     */","    formatKeyCode: function (keyCode) {","        var self = this,","            parts;","","        parts = keyCode.split('+').map(function (part) {","            return self._keyMap[part] || Util.capitalizeFirstLetter(part);","        });","","        return parts.join('');","    }","};","","// -- Namespace ----------------------------------------------------------------","Y.Rednose.Dropdown.KeysMac = DropdownKeysMac;","Y.Base.mix(Y.Rednose.Dropdown, [DropdownKeysMac]);","","","}, '1.5.0-DEV');","","}());"]};
}
var __cov_XcGE3bnx8PJuIvnftAMSzg = __coverage__['build/rednose-dropdown-keys-mac/rednose-dropdown-keys-mac.js'];
__cov_XcGE3bnx8PJuIvnftAMSzg.s['1']++;YUI.add('rednose-dropdown-keys-mac',function(Y,NAME){__cov_XcGE3bnx8PJuIvnftAMSzg.f['1']++;__cov_XcGE3bnx8PJuIvnftAMSzg.s['2']++;var Util=Y.Rednose.Util;__cov_XcGE3bnx8PJuIvnftAMSzg.s['3']++;function DropdownKeysMac(){__cov_XcGE3bnx8PJuIvnftAMSzg.f['2']++;}__cov_XcGE3bnx8PJuIvnftAMSzg.s['4']++;DropdownKeysMac.prototype={_keyMap:{'alt':'\u2325','ctrl':'\u2318','shift':'\u21e7'},formatKeyCode:function(keyCode){__cov_XcGE3bnx8PJuIvnftAMSzg.f['3']++;__cov_XcGE3bnx8PJuIvnftAMSzg.s['5']++;var self=this,parts;__cov_XcGE3bnx8PJuIvnftAMSzg.s['6']++;parts=keyCode.split('+').map(function(part){__cov_XcGE3bnx8PJuIvnftAMSzg.f['4']++;__cov_XcGE3bnx8PJuIvnftAMSzg.s['7']++;return(__cov_XcGE3bnx8PJuIvnftAMSzg.b['1'][0]++,self._keyMap[part])||(__cov_XcGE3bnx8PJuIvnftAMSzg.b['1'][1]++,Util.capitalizeFirstLetter(part));});__cov_XcGE3bnx8PJuIvnftAMSzg.s['8']++;return parts.join('');}};__cov_XcGE3bnx8PJuIvnftAMSzg.s['9']++;Y.Rednose.Dropdown.KeysMac=DropdownKeysMac;__cov_XcGE3bnx8PJuIvnftAMSzg.s['10']++;Y.Base.mix(Y.Rednose.Dropdown,[DropdownKeysMac]);},'1.5.0-DEV');
