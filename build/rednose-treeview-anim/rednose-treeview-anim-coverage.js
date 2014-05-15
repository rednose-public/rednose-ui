if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-treeview-anim/rednose-treeview-anim.js']) {
   __coverage__['build/rednose-treeview-anim/rednose-treeview-anim.js'] = {"path":"build/rednose-treeview-anim/rednose-treeview-anim.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":52}}},"2":{"name":"(anonymous_2)","line":13,"loc":{"start":{"line":13,"column":17},"end":{"line":13,"column":29}}},"3":{"name":"(anonymous_3)","line":23,"loc":{"start":{"line":23,"column":25},"end":{"line":23,"column":41}}},"4":{"name":"(anonymous_4)","line":34,"loc":{"start":{"line":34,"column":20},"end":{"line":34,"column":33}}},"5":{"name":"(anonymous_5)","line":49,"loc":{"start":{"line":49,"column":18},"end":{"line":49,"column":31}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":77,"column":82}},"2":{"start":{"line":5,"column":0},"end":{"line":5,"column":9}},"3":{"start":{"line":10,"column":0},"end":{"line":71,"column":3}},"4":{"start":{"line":14,"column":8},"end":{"line":14,"column":52}},"5":{"start":{"line":15,"column":8},"end":{"line":15,"column":55}},"6":{"start":{"line":24,"column":8},"end":{"line":24,"column":45}},"7":{"start":{"line":26,"column":8},"end":{"line":26,"column":66}},"8":{"start":{"line":35,"column":8},"end":{"line":37,"column":9}},"9":{"start":{"line":36,"column":12},"end":{"line":36,"column":19}},"10":{"start":{"line":39,"column":8},"end":{"line":40,"column":58}},"11":{"start":{"line":42,"column":8},"end":{"line":42,"column":46}},"12":{"start":{"line":43,"column":8},"end":{"line":43,"column":42}},"13":{"start":{"line":50,"column":8},"end":{"line":52,"column":9}},"14":{"start":{"line":51,"column":12},"end":{"line":51,"column":19}},"15":{"start":{"line":54,"column":8},"end":{"line":55,"column":58}},"16":{"start":{"line":58,"column":8},"end":{"line":58,"column":75}},"17":{"start":{"line":59,"column":8},"end":{"line":59,"column":46}},"18":{"start":{"line":60,"column":8},"end":{"line":60,"column":43}},"19":{"start":{"line":74,"column":0},"end":{"line":74,"column":44}}},"branchMap":{"1":{"line":35,"type":"if","locations":[{"start":{"line":35,"column":8},"end":{"line":35,"column":8}},{"start":{"line":35,"column":8},"end":{"line":35,"column":8}}]},"2":{"line":35,"type":"binary-expr","locations":[{"start":{"line":35,"column":12},"end":{"line":35,"column":26}},{"start":{"line":35,"column":30},"end":{"line":35,"column":51}}]},"3":{"line":50,"type":"if","locations":[{"start":{"line":50,"column":8},"end":{"line":50,"column":8}},{"start":{"line":50,"column":8},"end":{"line":50,"column":8}}]},"4":{"line":50,"type":"binary-expr","locations":[{"start":{"line":50,"column":12},"end":{"line":50,"column":26}},{"start":{"line":50,"column":30},"end":{"line":50,"column":51}}]}},"code":["(function () { YUI.add('rednose-treeview-anim', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","var Anim;","","/**"," * Y.Rednose.TreeView widget extension to provide animations."," */","Anim = Y.Base.create('anim', Y.Base, [], {","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        this.after('open', this._afterExpand, this);","        this.after('close', this._afterCollapse, this);","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","     * Retrieve the DOM element containing the children of a given TreeView node.","     */","    _getChildrenElement: function (node) {","        var domNode = this.getHTMLNode(node);","","        return Y.Node('#' + domNode.getAttribute('id')).one('ul');","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","     * Handles the collapse event.","     */","    _afterCollapse: function (e) {","        if (!this.rendered || !this.get('animated')) {","            return;","        }","","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        children.setStyle('display', 'block');","        Y.Rednose.Anim.slideInY(children);","    },","","    /**","     * Handles the expand event.","     */","    _afterExpand: function (e) {","        if (!this.rendered || !this.get('animated')) {","            return;","        }","","        var treeNode = e.node,","            children = this._getChildrenElement(treeNode);","","        // Hide potential scrollbars","        children.ancestor('.yui3-treeview').setStyle('overflow', 'hidden');","        children.setStyle('display', 'block');","        Y.Rednose.Anim.slideOutY(children);","    }","}, {","    ATTRS: {","        /**","         * Enable animation for this TreeView instance","         */","        animated: {","            value : false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose.TreeView').Anim = Anim;","","","}, '1.5.0-DEV', {\"requires\": [\"rednose-anim\", \"rednose-treeview\", \"transition\"]});","","}());"]};
}
var __cov_yaHBUoDhffG6G_ytbD1R1Q = __coverage__['build/rednose-treeview-anim/rednose-treeview-anim.js'];
__cov_yaHBUoDhffG6G_ytbD1R1Q.s['1']++;YUI.add('rednose-treeview-anim',function(Y,NAME){__cov_yaHBUoDhffG6G_ytbD1R1Q.f['1']++;__cov_yaHBUoDhffG6G_ytbD1R1Q.s['2']++;var Anim;__cov_yaHBUoDhffG6G_ytbD1R1Q.s['3']++;Anim=Y.Base.create('anim',Y.Base,[],{initializer:function(){__cov_yaHBUoDhffG6G_ytbD1R1Q.f['2']++;__cov_yaHBUoDhffG6G_ytbD1R1Q.s['4']++;this.after('open',this._afterExpand,this);__cov_yaHBUoDhffG6G_ytbD1R1Q.s['5']++;this.after('close',this._afterCollapse,this);},_getChildrenElement:function(node){__cov_yaHBUoDhffG6G_ytbD1R1Q.f['3']++;__cov_yaHBUoDhffG6G_ytbD1R1Q.s['6']++;var domNode=this.getHTMLNode(node);__cov_yaHBUoDhffG6G_ytbD1R1Q.s['7']++;return Y.Node('#'+domNode.getAttribute('id')).one('ul');},_afterCollapse:function(e){__cov_yaHBUoDhffG6G_ytbD1R1Q.f['4']++;__cov_yaHBUoDhffG6G_ytbD1R1Q.s['8']++;if((__cov_yaHBUoDhffG6G_ytbD1R1Q.b['2'][0]++,!this.rendered)||(__cov_yaHBUoDhffG6G_ytbD1R1Q.b['2'][1]++,!this.get('animated'))){__cov_yaHBUoDhffG6G_ytbD1R1Q.b['1'][0]++;__cov_yaHBUoDhffG6G_ytbD1R1Q.s['9']++;return;}else{__cov_yaHBUoDhffG6G_ytbD1R1Q.b['1'][1]++;}__cov_yaHBUoDhffG6G_ytbD1R1Q.s['10']++;var treeNode=e.node,children=this._getChildrenElement(treeNode);__cov_yaHBUoDhffG6G_ytbD1R1Q.s['11']++;children.setStyle('display','block');__cov_yaHBUoDhffG6G_ytbD1R1Q.s['12']++;Y.Rednose.Anim.slideInY(children);},_afterExpand:function(e){__cov_yaHBUoDhffG6G_ytbD1R1Q.f['5']++;__cov_yaHBUoDhffG6G_ytbD1R1Q.s['13']++;if((__cov_yaHBUoDhffG6G_ytbD1R1Q.b['4'][0]++,!this.rendered)||(__cov_yaHBUoDhffG6G_ytbD1R1Q.b['4'][1]++,!this.get('animated'))){__cov_yaHBUoDhffG6G_ytbD1R1Q.b['3'][0]++;__cov_yaHBUoDhffG6G_ytbD1R1Q.s['14']++;return;}else{__cov_yaHBUoDhffG6G_ytbD1R1Q.b['3'][1]++;}__cov_yaHBUoDhffG6G_ytbD1R1Q.s['15']++;var treeNode=e.node,children=this._getChildrenElement(treeNode);__cov_yaHBUoDhffG6G_ytbD1R1Q.s['16']++;children.ancestor('.yui3-treeview').setStyle('overflow','hidden');__cov_yaHBUoDhffG6G_ytbD1R1Q.s['17']++;children.setStyle('display','block');__cov_yaHBUoDhffG6G_ytbD1R1Q.s['18']++;Y.Rednose.Anim.slideOutY(children);}},{ATTRS:{animated:{value:false}}});__cov_yaHBUoDhffG6G_ytbD1R1Q.s['19']++;Y.namespace('Rednose.TreeView').Anim=Anim;},'1.5.0-DEV',{'requires':['rednose-anim','rednose-treeview','transition']});
