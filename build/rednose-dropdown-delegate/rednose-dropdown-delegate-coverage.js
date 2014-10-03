if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-dropdown-delegate/rednose-dropdown-delegate.js']) {
   __coverage__['build/rednose-dropdown-delegate/rednose-dropdown-delegate.js'] = {"path":"build/rednose-dropdown-delegate/rednose-dropdown-delegate.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":37},"end":{"line":1,"column":56}}},"2":{"name":"(anonymous_2)","line":26,"loc":{"start":{"line":26,"column":17},"end":{"line":26,"column":29}}},"3":{"name":"(anonymous_3)","line":39,"loc":{"start":{"line":39,"column":16},"end":{"line":39,"column":28}}},"4":{"name":"(anonymous_4)","line":42,"loc":{"start":{"line":42,"column":38},"end":{"line":42,"column":58}}},"5":{"name":"(anonymous_5)","line":55,"loc":{"start":{"line":55,"column":24},"end":{"line":55,"column":37}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":108,"column":59}},"2":{"start":{"line":17,"column":0},"end":{"line":103,"column":3}},"3":{"start":{"line":27,"column":8},"end":{"line":27,"column":56}},"4":{"start":{"line":29,"column":8},"end":{"line":29,"column":29}},"5":{"start":{"line":31,"column":8},"end":{"line":32,"column":42}},"6":{"start":{"line":34,"column":8},"end":{"line":36,"column":10}},"7":{"start":{"line":40,"column":8},"end":{"line":40,"column":57}},"8":{"start":{"line":42,"column":8},"end":{"line":44,"column":11}},"9":{"start":{"line":43,"column":12},"end":{"line":43,"column":31}},"10":{"start":{"line":46,"column":8},"end":{"line":46,"column":31}},"11":{"start":{"line":56,"column":8},"end":{"line":58,"column":9}},"12":{"start":{"line":57,"column":12},"end":{"line":57,"column":19}},"13":{"start":{"line":61,"column":8},"end":{"line":61,"column":27}},"14":{"start":{"line":62,"column":8},"end":{"line":62,"column":28}},"15":{"start":{"line":64,"column":8},"end":{"line":64,"column":35}},"16":{"start":{"line":66,"column":8},"end":{"line":74,"column":9}},"17":{"start":{"line":67,"column":12},"end":{"line":70,"column":15}},"18":{"start":{"line":72,"column":12},"end":{"line":72,"column":48}},"19":{"start":{"line":73,"column":12},"end":{"line":73,"column":42}},"20":{"start":{"line":76,"column":8},"end":{"line":76,"column":75}},"21":{"start":{"line":105,"column":0},"end":{"line":105,"column":52}}},"branchMap":{"1":{"line":27,"type":"binary-expr","locations":[{"start":{"line":27,"column":8},"end":{"line":27,"column":26}},{"start":{"line":27,"column":31},"end":{"line":27,"column":54}}]},"2":{"line":56,"type":"if","locations":[{"start":{"line":56,"column":8},"end":{"line":56,"column":8}},{"start":{"line":56,"column":8},"end":{"line":56,"column":8}}]},"3":{"line":66,"type":"if","locations":[{"start":{"line":66,"column":8},"end":{"line":66,"column":8}},{"start":{"line":66,"column":8},"end":{"line":66,"column":8}}]}},"code":["(function () { YUI.add('rednose-dropdown-delegate', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Provides the `Y.Rednose.Plugin.Dropdown` Delegate."," *"," * @module rednose-dropdown"," * @submodule rednose-dropdown-delegate"," */","","/**"," * @class Rednose.Dropdown.Delegate"," * @constructor"," * @extends Base"," */","var Delegate = Y.Base.create('dropdown', Y.Base, [], {","","    /**","     * @property {Rednose.Dropdown[]} _instances","     * @protected","     */","","    // -- Life Cycle Methods ---------------------------------------------------","","    initializer: function () {","        this._eventHandles || (this._eventHandles = []);","","        this._instances = [];","","        var container = this.get('container'),","            nodes     = this.get('nodes');","","        this._eventHandles.push(","            container.delegate('contextmenu', this._handleContextMenu, nodes, this)","        );","    },","","    destructor: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","","        Y.Array.each(this._instances, function (instance) {","            instance.destroy();","        });","","        this._instances = null;","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","     * @param e {EventFacade}","     * @private","     */","    _handleContextMenu: function (e) {","        if (e.shiftKey) {","            return;","        }","","        // Prevent default context menu.","        e.preventDefault();","        e.stopPropagation();","","        var node = e.currentTarget;","","        if (!node.dropdown) {","            node.plug(Y.Rednose.Plugin.Dropdown, {","                showOnContext: true,","                propagate    : false","            });","","            this._instances.push(node.dropdown);","            node.dropdown.addTarget(this);","        }","","        node.dropdown._onAnchorContextMenu.apply(node.dropdown, arguments);","    }","}, {","    NS: 'dropdown',","","    ATTRS: {","","        /**","         * @attribute {Node} container","         * @default null","         * @initOnly","         */","        container: {","            value: Y.one('body'),","            writeOnce: 'initOnly'","        },","","        /**","         * @attribute {String} nodes","         * @default null","         * @initOnly","         */","        nodes: {","            value: '.rednose-dropdown',","            writeOnce: 'initOnly'","        }","    }","});","","Y.namespace('Rednose.Dropdown').Delegate = Delegate;","","","}, '1.6.0-dev', {\"requires\": [\"rednose-dropdown-plugin\"]});","","}());"]};
}
var __cov_rJAhENxS3V5xx7SysbjJyA = __coverage__['build/rednose-dropdown-delegate/rednose-dropdown-delegate.js'];
__cov_rJAhENxS3V5xx7SysbjJyA.s['1']++;YUI.add('rednose-dropdown-delegate',function(Y,NAME){__cov_rJAhENxS3V5xx7SysbjJyA.f['1']++;__cov_rJAhENxS3V5xx7SysbjJyA.s['2']++;var Delegate=Y.Base.create('dropdown',Y.Base,[],{initializer:function(){__cov_rJAhENxS3V5xx7SysbjJyA.f['2']++;__cov_rJAhENxS3V5xx7SysbjJyA.s['3']++;(__cov_rJAhENxS3V5xx7SysbjJyA.b['1'][0]++,this._eventHandles)||(__cov_rJAhENxS3V5xx7SysbjJyA.b['1'][1]++,this._eventHandles=[]);__cov_rJAhENxS3V5xx7SysbjJyA.s['4']++;this._instances=[];__cov_rJAhENxS3V5xx7SysbjJyA.s['5']++;var container=this.get('container'),nodes=this.get('nodes');__cov_rJAhENxS3V5xx7SysbjJyA.s['6']++;this._eventHandles.push(container.delegate('contextmenu',this._handleContextMenu,nodes,this));},destructor:function(){__cov_rJAhENxS3V5xx7SysbjJyA.f['3']++;__cov_rJAhENxS3V5xx7SysbjJyA.s['7']++;new Y.EventHandle(this._eventHandles).detach();__cov_rJAhENxS3V5xx7SysbjJyA.s['8']++;Y.Array.each(this._instances,function(instance){__cov_rJAhENxS3V5xx7SysbjJyA.f['4']++;__cov_rJAhENxS3V5xx7SysbjJyA.s['9']++;instance.destroy();});__cov_rJAhENxS3V5xx7SysbjJyA.s['10']++;this._instances=null;},_handleContextMenu:function(e){__cov_rJAhENxS3V5xx7SysbjJyA.f['5']++;__cov_rJAhENxS3V5xx7SysbjJyA.s['11']++;if(e.shiftKey){__cov_rJAhENxS3V5xx7SysbjJyA.b['2'][0]++;__cov_rJAhENxS3V5xx7SysbjJyA.s['12']++;return;}else{__cov_rJAhENxS3V5xx7SysbjJyA.b['2'][1]++;}__cov_rJAhENxS3V5xx7SysbjJyA.s['13']++;e.preventDefault();__cov_rJAhENxS3V5xx7SysbjJyA.s['14']++;e.stopPropagation();__cov_rJAhENxS3V5xx7SysbjJyA.s['15']++;var node=e.currentTarget;__cov_rJAhENxS3V5xx7SysbjJyA.s['16']++;if(!node.dropdown){__cov_rJAhENxS3V5xx7SysbjJyA.b['3'][0]++;__cov_rJAhENxS3V5xx7SysbjJyA.s['17']++;node.plug(Y.Rednose.Plugin.Dropdown,{showOnContext:true,propagate:false});__cov_rJAhENxS3V5xx7SysbjJyA.s['18']++;this._instances.push(node.dropdown);__cov_rJAhENxS3V5xx7SysbjJyA.s['19']++;node.dropdown.addTarget(this);}else{__cov_rJAhENxS3V5xx7SysbjJyA.b['3'][1]++;}__cov_rJAhENxS3V5xx7SysbjJyA.s['20']++;node.dropdown._onAnchorContextMenu.apply(node.dropdown,arguments);}},{NS:'dropdown',ATTRS:{container:{value:Y.one('body'),writeOnce:'initOnly'},nodes:{value:'.rednose-dropdown',writeOnce:'initOnly'}}});__cov_rJAhENxS3V5xx7SysbjJyA.s['21']++;Y.namespace('Rednose.Dropdown').Delegate=Delegate;},'1.6.0-dev',{'requires':['rednose-dropdown-plugin']});
