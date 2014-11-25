if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-treeview-select/rednose-treeview-select.js']) {
   __coverage__['build/rednose-treeview-select/rednose-treeview-select.js'] = {"path":"build/rednose-treeview-select/rednose-treeview-select.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0],"8":[0,0],"9":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":54}}},"2":{"name":"(anonymous_2)","line":12,"loc":{"start":{"line":12,"column":17},"end":{"line":12,"column":29}}},"3":{"name":"(anonymous_3)","line":21,"loc":{"start":{"line":21,"column":21},"end":{"line":21,"column":34}}},"4":{"name":"(anonymous_4)","line":28,"loc":{"start":{"line":28,"column":18},"end":{"line":28,"column":30}}},"5":{"name":"(anonymous_5)","line":35,"loc":{"start":{"line":35,"column":17},"end":{"line":35,"column":30}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":81,"column":57}},"2":{"start":{"line":8,"column":0},"end":{"line":75,"column":3}},"3":{"start":{"line":13,"column":8},"end":{"line":13,"column":46}},"4":{"start":{"line":15,"column":8},"end":{"line":15,"column":64}},"5":{"start":{"line":16,"column":8},"end":{"line":16,"column":65}},"6":{"start":{"line":23,"column":8},"end":{"line":25,"column":9}},"7":{"start":{"line":24,"column":12},"end":{"line":24,"column":28}},"8":{"start":{"line":29,"column":8},"end":{"line":29,"column":24}},"9":{"start":{"line":36,"column":8},"end":{"line":38,"column":9}},"10":{"start":{"line":37,"column":12},"end":{"line":37,"column":19}},"11":{"start":{"line":41,"column":8},"end":{"line":41,"column":72}},"12":{"start":{"line":43,"column":8},"end":{"line":47,"column":9}},"13":{"start":{"line":44,"column":12},"end":{"line":46,"column":13}},"14":{"start":{"line":45,"column":16},"end":{"line":45,"column":23}},"15":{"start":{"line":49,"column":8},"end":{"line":53,"column":9}},"16":{"start":{"line":50,"column":12},"end":{"line":50,"column":62}},"17":{"start":{"line":52,"column":12},"end":{"line":52,"column":26}},"18":{"start":{"line":78,"column":0},"end":{"line":78,"column":56}}},"branchMap":{"1":{"line":23,"type":"if","locations":[{"start":{"line":23,"column":8},"end":{"line":23,"column":8}},{"start":{"line":23,"column":8},"end":{"line":23,"column":8}}]},"2":{"line":23,"type":"binary-expr","locations":[{"start":{"line":23,"column":12},"end":{"line":23,"column":58}},{"start":{"line":23,"column":62},"end":{"line":23,"column":86}}]},"3":{"line":36,"type":"if","locations":[{"start":{"line":36,"column":8},"end":{"line":36,"column":8}},{"start":{"line":36,"column":8},"end":{"line":36,"column":8}}]},"4":{"line":36,"type":"binary-expr","locations":[{"start":{"line":36,"column":12},"end":{"line":36,"column":24}},{"start":{"line":36,"column":28},"end":{"line":36,"column":51}}]},"5":{"line":43,"type":"if","locations":[{"start":{"line":43,"column":8},"end":{"line":43,"column":8}},{"start":{"line":43,"column":8},"end":{"line":43,"column":8}}]},"6":{"line":44,"type":"if","locations":[{"start":{"line":44,"column":12},"end":{"line":44,"column":12}},{"start":{"line":44,"column":12},"end":{"line":44,"column":12}}]},"7":{"line":49,"type":"if","locations":[{"start":{"line":49,"column":8},"end":{"line":49,"column":8}},{"start":{"line":49,"column":8},"end":{"line":49,"column":8}}]},"8":{"line":49,"type":"binary-expr","locations":[{"start":{"line":49,"column":12},"end":{"line":49,"column":22}},{"start":{"line":49,"column":26},"end":{"line":49,"column":50}}]},"9":{"line":50,"type":"cond-expr","locations":[{"start":{"line":50,"column":37},"end":{"line":50,"column":47}},{"start":{"line":50,"column":50},"end":{"line":50,"column":58}}]}},"code":["(function () { YUI.add('rednose-treeview-select', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Selection extension for the RedNose TreeView widget."," */","var Selectable = Y.Base.create('selectable', Y.Base, [], {","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        var container = this.get('container');","","        this.after('selectableChange', this._afterChange, this);","        container.on('clickoutside', this._onClickOutside, this);","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _onClickOutside: function (e) {","        // Clear the selection, only if the click outside target is an ancestor of the current target.","        if (e.currentTarget.get('parentNode') === e.target && this.get('unselectable')) {","            this.unselect();","        }","    },","","    _afterChange: function () {","        this.unselect();","    },","","    /**","     * @see TreeView._onRowClick()","     */","    _onRowClick: function (e) {","        if (e.button > 1 || !this.get('selectable')) {","            return;","        }","","","        var node = this.getNodeById(e.currentTarget.getData('node-id'));","","        if (typeof(this.get('selectableTest')) === 'function') {","            if (this.get('selectableTest')(node) === false) {","                return;","            }","        }","","        if (e.shiftKey && this.get('unselectable')) {","            node[node.isSelected() ? 'unselect' : 'select']();","        } else {","            node.select();","        }","    }","}, {","    ATTRS: {","        /**","         * Enable selection for this TreeView instance","         *","         * @type {Boolean}","         */","        selectable: {","            value: false","        },","","        /**","         * Enable the ability to unselect items for this TreeView instance","         *","         * @type {Boolean}","         */","        unselectable: {","            value: true","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose.TreeView').Selectable = Selectable;","","","}, '@VERSION@', {\"requires\": [\"base\", \"event-outside\"]});","","}());"]};
}
var __cov_oTj_r611Z7Pp2c0gMJvbrQ = __coverage__['build/rednose-treeview-select/rednose-treeview-select.js'];
__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['1']++;YUI.add('rednose-treeview-select',function(Y,NAME){__cov_oTj_r611Z7Pp2c0gMJvbrQ.f['1']++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['2']++;var Selectable=Y.Base.create('selectable',Y.Base,[],{initializer:function(){__cov_oTj_r611Z7Pp2c0gMJvbrQ.f['2']++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['3']++;var container=this.get('container');__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['4']++;this.after('selectableChange',this._afterChange,this);__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['5']++;container.on('clickoutside',this._onClickOutside,this);},_onClickOutside:function(e){__cov_oTj_r611Z7Pp2c0gMJvbrQ.f['3']++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['6']++;if((__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['2'][0]++,e.currentTarget.get('parentNode')===e.target)&&(__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['2'][1]++,this.get('unselectable'))){__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['1'][0]++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['7']++;this.unselect();}else{__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['1'][1]++;}},_afterChange:function(){__cov_oTj_r611Z7Pp2c0gMJvbrQ.f['4']++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['8']++;this.unselect();},_onRowClick:function(e){__cov_oTj_r611Z7Pp2c0gMJvbrQ.f['5']++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['9']++;if((__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['4'][0]++,e.button>1)||(__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['4'][1]++,!this.get('selectable'))){__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['3'][0]++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['10']++;return;}else{__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['3'][1]++;}__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['11']++;var node=this.getNodeById(e.currentTarget.getData('node-id'));__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['12']++;if(typeof this.get('selectableTest')==='function'){__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['5'][0]++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['13']++;if(this.get('selectableTest')(node)===false){__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['6'][0]++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['14']++;return;}else{__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['6'][1]++;}}else{__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['5'][1]++;}__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['15']++;if((__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['8'][0]++,e.shiftKey)&&(__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['8'][1]++,this.get('unselectable'))){__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['7'][0]++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['16']++;node[node.isSelected()?(__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['9'][0]++,'unselect'):(__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['9'][1]++,'select')]();}else{__cov_oTj_r611Z7Pp2c0gMJvbrQ.b['7'][1]++;__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['17']++;node.select();}}},{ATTRS:{selectable:{value:false},unselectable:{value:true}}});__cov_oTj_r611Z7Pp2c0gMJvbrQ.s['18']++;Y.namespace('Rednose.TreeView').Selectable=Selectable;},'@VERSION@',{'requires':['base','event-outside']});
