if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/gallery-sm-tree-node-openable/gallery-sm-tree-node-openable.js']) {
   __coverage__['build/gallery-sm-tree-node-openable/gallery-sm-tree-node-openable.js'] = {"path":"build/gallery-sm-tree-node-openable/gallery-sm-tree-node-openable.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{"1":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":41},"end":{"line":1,"column":60}}},"2":{"name":"NodeOpenable","line":20,"loc":{"start":{"line":20,"column":0},"end":{"line":20,"column":24}}},"3":{"name":"(anonymous_3)","line":32,"loc":{"start":{"line":32,"column":11},"end":{"line":32,"column":30}}},"4":{"name":"(anonymous_4)","line":45,"loc":{"start":{"line":45,"column":12},"end":{"line":45,"column":24}}},"5":{"name":"(anonymous_5)","line":58,"loc":{"start":{"line":58,"column":10},"end":{"line":58,"column":29}}},"6":{"name":"(anonymous_6)","line":73,"loc":{"start":{"line":73,"column":12},"end":{"line":73,"column":31}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":82,"column":71}},"2":{"start":{"line":20,"column":0},"end":{"line":20,"column":26}},"3":{"start":{"line":22,"column":0},"end":{"line":77,"column":2}},"4":{"start":{"line":33,"column":8},"end":{"line":33,"column":43}},"5":{"start":{"line":34,"column":8},"end":{"line":34,"column":20}},"6":{"start":{"line":46,"column":8},"end":{"line":46,"column":50}},"7":{"start":{"line":59,"column":8},"end":{"line":59,"column":42}},"8":{"start":{"line":60,"column":8},"end":{"line":60,"column":20}},"9":{"start":{"line":74,"column":8},"end":{"line":74,"column":44}},"10":{"start":{"line":75,"column":8},"end":{"line":75,"column":20}},"11":{"start":{"line":79,"column":0},"end":{"line":79,"column":36}}},"branchMap":{"1":{"line":46,"type":"binary-expr","locations":[{"start":{"line":46,"column":15},"end":{"line":46,"column":32}},{"start":{"line":46,"column":36},"end":{"line":46,"column":49}}]}},"code":["(function () { YUI.add('gallery-sm-tree-node-openable', function (Y, NAME) {","","/**","Provides the `Tree.Node.Openable` class, an extension for `Tree.Node` that","adds methods useful for nodes in trees that use the `Tree.Openable` extension.","","@module tree-openable","@submodule tree-node-openable","**/","","/**","`Tree.Node` extension that adds methods useful for nodes in trees that use the","`Tree.Openable` extension.","","@class Tree.Node.Openable","@constructor","@extensionfor Tree.Node","**/","","function NodeOpenable() {}","","NodeOpenable.prototype = {","    /**","    Closes this node if it's currently open.","","    @method close","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `close` event","            will be suppressed.","    @chainable","    **/","    close: function (options) {","        this.tree.closeNode(this, options);","        return this;","    },","","    /**","    Returns `true` if this node is currently open.","","    Note: the root node of a tree is always considered to be open.","","    @method isOpen","    @return {Boolean} `true` if this node is currently open, `false` otherwise.","    **/","    isOpen: function () {","        return !!this.state.open || this.isRoot();","    },","","    /**","    Opens this node if it's currently closed.","","    @method open","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, the `open` event","            will be suppressed.","    @chainable","    **/","    open: function (options) {","        this.tree.openNode(this, options);","        return this;","    },","","    /**","    Toggles the open/closed state of this node, closing it if it's currently","    open or opening it if it's currently closed.","","    @method toggle","    @param {Object} [options] Options.","        @param {Boolean} [options.silent=false] If `true`, events will be","            suppressed.","    @chainable","    **/","    toggle: function (options) {","        this.tree.toggleNode(this, options);","        return this;","    }","};","","Y.Tree.Node.Openable = NodeOpenable;","","","}, 'gallery-2013.02.07-15-27', {\"requires\": [\"gallery-sm-tree-node\"]});","","}());"]};
}
var __cov_N$Te8VlLA_ZSi8vRTdX9Rg = __coverage__['build/gallery-sm-tree-node-openable/gallery-sm-tree-node-openable.js'];
__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['1']++;YUI.add('gallery-sm-tree-node-openable',function(Y,NAME){__cov_N$Te8VlLA_ZSi8vRTdX9Rg.f['1']++;__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['2']++;function NodeOpenable(){__cov_N$Te8VlLA_ZSi8vRTdX9Rg.f['2']++;}__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['3']++;NodeOpenable.prototype={close:function(options){__cov_N$Te8VlLA_ZSi8vRTdX9Rg.f['3']++;__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['4']++;this.tree.closeNode(this,options);__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['5']++;return this;},isOpen:function(){__cov_N$Te8VlLA_ZSi8vRTdX9Rg.f['4']++;__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['6']++;return(__cov_N$Te8VlLA_ZSi8vRTdX9Rg.b['1'][0]++,!!this.state.open)||(__cov_N$Te8VlLA_ZSi8vRTdX9Rg.b['1'][1]++,this.isRoot());},open:function(options){__cov_N$Te8VlLA_ZSi8vRTdX9Rg.f['5']++;__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['7']++;this.tree.openNode(this,options);__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['8']++;return this;},toggle:function(options){__cov_N$Te8VlLA_ZSi8vRTdX9Rg.f['6']++;__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['9']++;this.tree.toggleNode(this,options);__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['10']++;return this;}};__cov_N$Te8VlLA_ZSi8vRTdX9Rg.s['11']++;Y.Tree.Node.Openable=NodeOpenable;},'gallery-2013.02.07-15-27',{'requires':['gallery-sm-tree-node']});
