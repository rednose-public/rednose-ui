if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-toolbar/rednose-toolbar.js']) {
   __coverage__['build/rednose-toolbar/rednose-toolbar.js'] = {"path":"build/rednose-toolbar/rednose-toolbar.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":62,"loc":{"start":{"line":62,"column":17},"end":{"line":62,"column":29}}},"3":{"name":"(anonymous_3)","line":66,"loc":{"start":{"line":66,"column":16},"end":{"line":66,"column":28}}},"4":{"name":"(anonymous_4)","line":75,"loc":{"start":{"line":75,"column":12},"end":{"line":75,"column":24}}},"5":{"name":"(anonymous_5)","line":97,"loc":{"start":{"line":97,"column":26},"end":{"line":97,"column":38}}},"6":{"name":"(anonymous_6)","line":112,"loc":{"start":{"line":112,"column":26},"end":{"line":112,"column":38}}},"7":{"name":"(anonymous_7)","line":122,"loc":{"start":{"line":122,"column":23},"end":{"line":122,"column":36}}},"8":{"name":"(anonymous_8)","line":138,"loc":{"start":{"line":138,"column":17},"end":{"line":138,"column":29}}},"9":{"name":"(anonymous_9)","line":154,"loc":{"start":{"line":154,"column":23},"end":{"line":154,"column":36}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":165,"column":56}},"2":{"start":{"line":32,"column":0},"end":{"line":32,"column":24}},"3":{"start":{"line":34,"column":0},"end":{"line":160,"column":3}},"4":{"start":{"line":63,"column":8},"end":{"line":63,"column":36}},"5":{"start":{"line":67,"column":8},"end":{"line":67,"column":36}},"6":{"start":{"line":76,"column":8},"end":{"line":77,"column":41}},"7":{"start":{"line":79,"column":8},"end":{"line":79,"column":47}},"8":{"start":{"line":81,"column":8},"end":{"line":85,"column":9}},"9":{"start":{"line":82,"column":12},"end":{"line":82,"column":48}},"10":{"start":{"line":84,"column":12},"end":{"line":84,"column":62}},"11":{"start":{"line":87,"column":8},"end":{"line":87,"column":29}},"12":{"start":{"line":89,"column":8},"end":{"line":89,"column":20}},"13":{"start":{"line":98,"column":8},"end":{"line":98,"column":58}},"14":{"start":{"line":100,"column":8},"end":{"line":106,"column":10}},"15":{"start":{"line":113,"column":8},"end":{"line":113,"column":58}},"16":{"start":{"line":123,"column":8},"end":{"line":124,"column":49}},"17":{"start":{"line":126,"column":8},"end":{"line":130,"column":9}},"18":{"start":{"line":127,"column":12},"end":{"line":129,"column":15}},"19":{"start":{"line":132,"column":8},"end":{"line":135,"column":11}},"20":{"start":{"line":139,"column":8},"end":{"line":141,"column":9}},"21":{"start":{"line":140,"column":12},"end":{"line":140,"column":19}},"22":{"start":{"line":143,"column":8},"end":{"line":143,"column":38}},"23":{"start":{"line":145,"column":8},"end":{"line":145,"column":22}},"24":{"start":{"line":155,"column":8},"end":{"line":158,"column":11}},"25":{"start":{"line":162,"column":0},"end":{"line":162,"column":54}}},"branchMap":{"1":{"line":98,"type":"binary-expr","locations":[{"start":{"line":98,"column":8},"end":{"line":98,"column":27}},{"start":{"line":98,"column":32},"end":{"line":98,"column":56}}]},"2":{"line":126,"type":"if","locations":[{"start":{"line":126,"column":8},"end":{"line":126,"column":8}},{"start":{"line":126,"column":8},"end":{"line":126,"column":8}}]},"3":{"line":139,"type":"if","locations":[{"start":{"line":139,"column":8},"end":{"line":139,"column":8}},{"start":{"line":139,"column":8},"end":{"line":139,"column":8}}]}},"code":["(function () { YUI.add('rednose-toolbar', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Provides the Y.Rednose.Toolbar widget."," *"," * @module rednose-toolbar"," * @main rednose-toolbar"," */","","/**"," * Toolbar widget."," *"," * @class Rednose.Toolbar"," * @constructor"," * @param {Object} [config] Config object."," *     @param {Object[]} [config.groups] Array of group config objects."," * @extends Rednose.Toolbar.Base"," * @uses View"," */","","/**"," * Fired when a button in the toolbar is clicked."," *"," * You can subscribe to specific buttons through the following event: \"click#id\"."," *"," * @event click"," * @param {Rednose.Button} button The button that was clicked."," * @param {EventFacade} originEvent Original button event."," */","var EVT_CLICK = 'click';","","var Toolbar = Y.Base.create('toolbar', Y.Rednose.Toolbar.Base, [Y.View], {","","    /**","     * CSS class names used by this toolbar.","     *","     * @property {Object} classNames","     */","    classNames: {","        toolbar: 'btn-toolbar'","    },","","    /**","     * Hash of toolbar events.","     *","     * @property {Object} _toolbarEvents","     * @protected","     */","","    /**","     * Whether or not this toolbar has been rendered.","     *","     * @property {Boolean} rendered","     * @default false","     */","    rendered: false,","","    // -- Life Cycle Methods  --------------------------------------------------","","    initializer: function () {","        this._attachToolbarEvents();","    },","","    destructor: function () {","        this._detachToolbarEvents();","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * @chainable","     */","    render: function () {","        var container  = this.get('container'),","            classNames = this.classNames;","","        container.addClass(classNames.toolbar);","","        for (var i = 0, len = this._buttonGroupMap.length; i < len; i++) {","            var group = this._buttonGroupMap[i];","","            container.append(group.render().get('container'));","        }","","        this.rendered = true;","","        return this;","    },","","    // -- Protected methods ----------------------------------------------------","","    /**","     * @private","     */","    _attachToolbarEvents: function () {","        this._toolbarEvents || (this._toolbarEvents = []);","","        this._toolbarEvents.push(","            this.after({","                reset: this._afterReset,","","                'button:click': this._afterButtonClick","            })","        );","    },","","    /**","     * @private","     */","    _detachToolbarEvents: function () {","        (new Y.EventHandle(this._toolbarEvents)).detach();","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","     * @param {EventFacade} e","     * @private","     */","    _afterButtonClick: function (e) {","        var button = e.button,","            event  = EVT_CLICK + '#' + button.id;","","        if (!this._published[event]) {","            this._published[event] = this.publish(event, {","                defaultFn: this._defButtonClickFn","            });","        }","","        this.fire(event, {","            originEvent: e,","            button     : button","        });","    },","","    _afterReset: function () {","        if (!this.rendered) {","            return;","        }","","        this.get('container').empty();","","        this.render();","    },","","    // -- Default Event Handlers -----------------------------------------------","","    /**","     * @param {EventFacade} e","     * @private","     */","    _defButtonClickFn: function (e) {","        this.fire(EVT_CLICK, {","            originEvent: e.originEvent,","            button     : e.button","        });","    }","});","","Y.Rednose.Toolbar = Y.mix(Toolbar, Y.Rednose.Toolbar);","","","}, '1.5.0-DEV', {\"requires\": [\"rednose-toolbar-base\"]});","","}());"]};
}
var __cov_3z00uuk8NEkAXD8KkvS2hA = __coverage__['build/rednose-toolbar/rednose-toolbar.js'];
__cov_3z00uuk8NEkAXD8KkvS2hA.s['1']++;YUI.add('rednose-toolbar',function(Y,NAME){__cov_3z00uuk8NEkAXD8KkvS2hA.f['1']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['2']++;var EVT_CLICK='click';__cov_3z00uuk8NEkAXD8KkvS2hA.s['3']++;var Toolbar=Y.Base.create('toolbar',Y.Rednose.Toolbar.Base,[Y.View],{classNames:{toolbar:'btn-toolbar'},rendered:false,initializer:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['2']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['4']++;this._attachToolbarEvents();},destructor:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['3']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['5']++;this._detachToolbarEvents();},render:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['4']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['6']++;var container=this.get('container'),classNames=this.classNames;__cov_3z00uuk8NEkAXD8KkvS2hA.s['7']++;container.addClass(classNames.toolbar);__cov_3z00uuk8NEkAXD8KkvS2hA.s['8']++;for(var i=0,len=this._buttonGroupMap.length;i<len;i++){__cov_3z00uuk8NEkAXD8KkvS2hA.s['9']++;var group=this._buttonGroupMap[i];__cov_3z00uuk8NEkAXD8KkvS2hA.s['10']++;container.append(group.render().get('container'));}__cov_3z00uuk8NEkAXD8KkvS2hA.s['11']++;this.rendered=true;__cov_3z00uuk8NEkAXD8KkvS2hA.s['12']++;return this;},_attachToolbarEvents:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['5']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['13']++;(__cov_3z00uuk8NEkAXD8KkvS2hA.b['1'][0]++,this._toolbarEvents)||(__cov_3z00uuk8NEkAXD8KkvS2hA.b['1'][1]++,this._toolbarEvents=[]);__cov_3z00uuk8NEkAXD8KkvS2hA.s['14']++;this._toolbarEvents.push(this.after({reset:this._afterReset,'button:click':this._afterButtonClick}));},_detachToolbarEvents:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['6']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['15']++;new Y.EventHandle(this._toolbarEvents).detach();},_afterButtonClick:function(e){__cov_3z00uuk8NEkAXD8KkvS2hA.f['7']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['16']++;var button=e.button,event=EVT_CLICK+'#'+button.id;__cov_3z00uuk8NEkAXD8KkvS2hA.s['17']++;if(!this._published[event]){__cov_3z00uuk8NEkAXD8KkvS2hA.b['2'][0]++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['18']++;this._published[event]=this.publish(event,{defaultFn:this._defButtonClickFn});}else{__cov_3z00uuk8NEkAXD8KkvS2hA.b['2'][1]++;}__cov_3z00uuk8NEkAXD8KkvS2hA.s['19']++;this.fire(event,{originEvent:e,button:button});},_afterReset:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['8']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['20']++;if(!this.rendered){__cov_3z00uuk8NEkAXD8KkvS2hA.b['3'][0]++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['21']++;return;}else{__cov_3z00uuk8NEkAXD8KkvS2hA.b['3'][1]++;}__cov_3z00uuk8NEkAXD8KkvS2hA.s['22']++;this.get('container').empty();__cov_3z00uuk8NEkAXD8KkvS2hA.s['23']++;this.render();},_defButtonClickFn:function(e){__cov_3z00uuk8NEkAXD8KkvS2hA.f['9']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['24']++;this.fire(EVT_CLICK,{originEvent:e.originEvent,button:e.button});}});__cov_3z00uuk8NEkAXD8KkvS2hA.s['25']++;Y.Rednose.Toolbar=Y.mix(Toolbar,Y.Rednose.Toolbar);},'1.5.0-DEV',{'requires':['rednose-toolbar-base']});
