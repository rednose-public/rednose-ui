if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-tree-comparable/rednose-tree-comparable.js']) {
   __coverage__['build/rednose-tree-comparable/rednose-tree-comparable.js'] = {"path":"build/rednose-tree-comparable/rednose-tree-comparable.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0},"b":{"1":[0,0],"2":[0,0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":54}}},"2":{"name":"Comparable","line":11,"loc":{"start":{"line":11,"column":0},"end":{"line":11,"column":22}}},"3":{"name":"(anonymous_3)","line":14,"loc":{"start":{"line":14,"column":17},"end":{"line":14,"column":29}}},"4":{"name":"NodeComparable","line":27,"loc":{"start":{"line":27,"column":0},"end":{"line":27,"column":26}}},"5":{"name":"(anonymous_5)","line":34,"loc":{"start":{"line":34,"column":13},"end":{"line":34,"column":29}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":62,"column":36}},"2":{"start":{"line":11,"column":0},"end":{"line":11,"column":24}},"3":{"start":{"line":13,"column":0},"end":{"line":17,"column":2}},"4":{"start":{"line":15,"column":8},"end":{"line":15,"column":89}},"5":{"start":{"line":19,"column":0},"end":{"line":19,"column":52}},"6":{"start":{"line":27,"column":0},"end":{"line":27,"column":28}},"7":{"start":{"line":29,"column":0},"end":{"line":57,"column":2}},"8":{"start":{"line":35,"column":8},"end":{"line":37,"column":9}},"9":{"start":{"line":36,"column":12},"end":{"line":36,"column":21}},"10":{"start":{"line":39,"column":8},"end":{"line":41,"column":9}},"11":{"start":{"line":40,"column":12},"end":{"line":40,"column":56}},"12":{"start":{"line":43,"column":8},"end":{"line":49,"column":9}},"13":{"start":{"line":44,"column":12},"end":{"line":46,"column":13}},"14":{"start":{"line":45,"column":16},"end":{"line":45,"column":26}},"15":{"start":{"line":48,"column":12},"end":{"line":48,"column":45}},"16":{"start":{"line":51,"column":8},"end":{"line":53,"column":9}},"17":{"start":{"line":52,"column":12},"end":{"line":52,"column":21}},"18":{"start":{"line":55,"column":8},"end":{"line":55,"column":41}},"19":{"start":{"line":59,"column":0},"end":{"line":59,"column":61}}},"branchMap":{"1":{"line":35,"type":"if","locations":[{"start":{"line":35,"column":8},"end":{"line":35,"column":8}},{"start":{"line":35,"column":8},"end":{"line":35,"column":8}}]},"2":{"line":35,"type":"binary-expr","locations":[{"start":{"line":35,"column":12},"end":{"line":35,"column":17}},{"start":{"line":35,"column":21},"end":{"line":35,"column":34}},{"start":{"line":35,"column":38},"end":{"line":35,"column":61}}]},"3":{"line":39,"type":"if","locations":[{"start":{"line":39,"column":8},"end":{"line":39,"column":8}},{"start":{"line":39,"column":8},"end":{"line":39,"column":8}}]},"4":{"line":40,"type":"cond-expr","locations":[{"start":{"line":40,"column":49},"end":{"line":40,"column":50}},{"start":{"line":40,"column":53},"end":{"line":40,"column":55}}]},"5":{"line":43,"type":"if","locations":[{"start":{"line":43,"column":8},"end":{"line":43,"column":8}},{"start":{"line":43,"column":8},"end":{"line":43,"column":8}}]},"6":{"line":44,"type":"if","locations":[{"start":{"line":44,"column":12},"end":{"line":44,"column":12}},{"start":{"line":44,"column":12},"end":{"line":44,"column":12}}]},"7":{"line":51,"type":"if","locations":[{"start":{"line":51,"column":8},"end":{"line":51,"column":8}},{"start":{"line":51,"column":8},"end":{"line":51,"column":8}}]}},"code":["(function () { YUI.add('rednose-tree-comparable', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * @module rednose-tree"," * @submodule rednose-tree-comparable"," * @main rednose-tree-comparable"," */","","function Comparable() {}","","Comparable.prototype = {","    initializer: function () {","        this.nodeExtensions = this.nodeExtensions.concat(Y.Rednose.Tree.Node.Comparable);","    }","};","","Y.namespace('Rednose.Tree').Comparable = Comparable;","/*jshint boss:true, expr:true, onevar:false */","","/**"," * @module rednose-tree"," * @submodule rednose-tree-comparable"," */","","function NodeComparable() {}","","NodeComparable.prototype = {","    /**","     * @param {Tree.Node} node","     * @return {Number}","     */","    compare: function (node) {","        if (!node || node === this || node.tree !== this.tree) {","            return 0;","        }","","        if (this.depth() === node.depth()) {","            return node.index() < this.index() ? 1 : -1;","        }","","        if (node.depth() > this.depth()) {","            if (node.parent === this) {","                return -1;","            }","","            return this.compare(node.parent);","        }","","        if (node === this.parent) {","            return 1;","        }","","        return this.parent.compare(node);","    }","};","","Y.namespace('Rednose.Tree.Node').Comparable = NodeComparable;","","","}, '1.8.0', {\"requires\": [\"tree\"]});","","}());"]};
}
var __cov_pE$7EjxC6gHJ$ymB3rEyfg = __coverage__['build/rednose-tree-comparable/rednose-tree-comparable.js'];
__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['1']++;YUI.add('rednose-tree-comparable',function(Y,NAME){__cov_pE$7EjxC6gHJ$ymB3rEyfg.f['1']++;__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['2']++;function Comparable(){__cov_pE$7EjxC6gHJ$ymB3rEyfg.f['2']++;}__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['3']++;Comparable.prototype={initializer:function(){__cov_pE$7EjxC6gHJ$ymB3rEyfg.f['3']++;__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['4']++;this.nodeExtensions=this.nodeExtensions.concat(Y.Rednose.Tree.Node.Comparable);}};__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['5']++;Y.namespace('Rednose.Tree').Comparable=Comparable;__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['6']++;function NodeComparable(){__cov_pE$7EjxC6gHJ$ymB3rEyfg.f['4']++;}__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['7']++;NodeComparable.prototype={compare:function(node){__cov_pE$7EjxC6gHJ$ymB3rEyfg.f['5']++;__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['8']++;if((__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['2'][0]++,!node)||(__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['2'][1]++,node===this)||(__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['2'][2]++,node.tree!==this.tree)){__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['1'][0]++;__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['9']++;return 0;}else{__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['1'][1]++;}__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['10']++;if(this.depth()===node.depth()){__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['3'][0]++;__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['11']++;return node.index()<this.index()?(__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['4'][0]++,1):(__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['4'][1]++,-1);}else{__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['3'][1]++;}__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['12']++;if(node.depth()>this.depth()){__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['5'][0]++;__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['13']++;if(node.parent===this){__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['6'][0]++;__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['14']++;return-1;}else{__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['6'][1]++;}__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['15']++;return this.compare(node.parent);}else{__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['5'][1]++;}__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['16']++;if(node===this.parent){__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['7'][0]++;__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['17']++;return 1;}else{__cov_pE$7EjxC6gHJ$ymB3rEyfg.b['7'][1]++;}__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['18']++;return this.parent.compare(node);}};__cov_pE$7EjxC6gHJ$ymB3rEyfg.s['19']++;Y.namespace('Rednose.Tree.Node').Comparable=NodeComparable;},'1.8.0',{'requires':['tree']});
