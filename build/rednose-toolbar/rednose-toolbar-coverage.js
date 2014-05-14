if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-toolbar/rednose-toolbar.js']) {
   __coverage__['build/rednose-toolbar/rednose-toolbar.js'] = {"path":"build/rednose-toolbar/rednose-toolbar.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":73,"loc":{"start":{"line":73,"column":17},"end":{"line":73,"column":29}}},"3":{"name":"(anonymous_3)","line":77,"loc":{"start":{"line":77,"column":16},"end":{"line":77,"column":28}}},"4":{"name":"(anonymous_4)","line":86,"loc":{"start":{"line":86,"column":12},"end":{"line":86,"column":24}}},"5":{"name":"(anonymous_5)","line":158,"loc":{"start":{"line":158,"column":26},"end":{"line":158,"column":38}}},"6":{"name":"(anonymous_6)","line":174,"loc":{"start":{"line":174,"column":26},"end":{"line":174,"column":38}}},"7":{"name":"(anonymous_7)","line":216,"loc":{"start":{"line":216,"column":15},"end":{"line":216,"column":28}}},"8":{"name":"(anonymous_8)","line":228,"loc":{"start":{"line":228,"column":18},"end":{"line":228,"column":31}}},"9":{"name":"(anonymous_9)","line":240,"loc":{"start":{"line":240,"column":23},"end":{"line":240,"column":36}}},"10":{"name":"(anonymous_10)","line":262,"loc":{"start":{"line":262,"column":23},"end":{"line":262,"column":36}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":273,"column":52}},"2":{"start":{"line":32,"column":0},"end":{"line":32,"column":24}},"3":{"start":{"line":34,"column":0},"end":{"line":268,"column":3}},"4":{"start":{"line":74,"column":8},"end":{"line":74,"column":36}},"5":{"start":{"line":78,"column":8},"end":{"line":78,"column":36}},"6":{"start":{"line":87,"column":8},"end":{"line":88,"column":41}},"7":{"start":{"line":90,"column":8},"end":{"line":90,"column":47}},"8":{"start":{"line":92,"column":8},"end":{"line":96,"column":9}},"9":{"start":{"line":93,"column":12},"end":{"line":93,"column":48}},"10":{"start":{"line":95,"column":12},"end":{"line":95,"column":62}},"11":{"start":{"line":98,"column":8},"end":{"line":98,"column":29}},"12":{"start":{"line":100,"column":8},"end":{"line":100,"column":20}},"13":{"start":{"line":159,"column":8},"end":{"line":159,"column":58}},"14":{"start":{"line":161,"column":8},"end":{"line":168,"column":10}},"15":{"start":{"line":175,"column":8},"end":{"line":175,"column":58}},"16":{"start":{"line":217,"column":8},"end":{"line":219,"column":9}},"17":{"start":{"line":218,"column":12},"end":{"line":218,"column":19}},"18":{"start":{"line":221,"column":8},"end":{"line":221,"column":29}},"19":{"start":{"line":229,"column":8},"end":{"line":231,"column":9}},"20":{"start":{"line":230,"column":12},"end":{"line":230,"column":19}},"21":{"start":{"line":233,"column":8},"end":{"line":233,"column":29}},"22":{"start":{"line":241,"column":8},"end":{"line":242,"column":49}},"23":{"start":{"line":244,"column":8},"end":{"line":248,"column":9}},"24":{"start":{"line":245,"column":12},"end":{"line":247,"column":15}},"25":{"start":{"line":250,"column":8},"end":{"line":253,"column":11}},"26":{"start":{"line":263,"column":8},"end":{"line":266,"column":11}},"27":{"start":{"line":270,"column":0},"end":{"line":270,"column":54}}},"branchMap":{"1":{"line":159,"type":"binary-expr","locations":[{"start":{"line":159,"column":8},"end":{"line":159,"column":27}},{"start":{"line":159,"column":32},"end":{"line":159,"column":56}}]},"2":{"line":217,"type":"if","locations":[{"start":{"line":217,"column":8},"end":{"line":217,"column":8}},{"start":{"line":217,"column":8},"end":{"line":217,"column":8}}]},"3":{"line":229,"type":"if","locations":[{"start":{"line":229,"column":8},"end":{"line":229,"column":8}},{"start":{"line":229,"column":8},"end":{"line":229,"column":8}}]},"4":{"line":244,"type":"if","locations":[{"start":{"line":244,"column":8},"end":{"line":244,"column":8}},{"start":{"line":244,"column":8},"end":{"line":244,"column":8}}]}},"code":["(function () { YUI.add('rednose-toolbar', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Provides the Y.Rednose.Toolbar widget."," *"," * @module rednose-toolbar"," * @main rednose-toolbar"," */","","/**"," * Toolbar widget."," *"," * @class Rednose.Toolbar"," * @constructor"," * @param {Object} [config] Config object."," *     @param {Object[]} [config.groups] Array of group config objects."," * @extends Rednose.Toolbar.Base"," * @uses View"," */","","/**"," * Fired when a button in the toolbar is clicked."," *"," * You can subscribe to specific buttons through the following event: \"click#id\"."," *"," * @event click"," * @param {Rednose.Button} item The button that was clicked."," * @param {EventFacade} originEvent Original button event."," */","var EVT_CLICK = 'click';","","var Toolbar = Y.Base.create('toolbar', Y.Rednose.Toolbar.Base, [Y.View], {","","    /**","     * CSS class names used by this toolbar.","     *","     * @property {Object} classNames","     */","    classNames: {","        toolbar: 'btn-toolbar'","    },","","//    /**","//     Stores references to the created nodes.","//","//     @property _buttonMap","//     @type Object","//     @protected","//     **/","//    _buttonMap: {},","//","//    _evtPrefix: null,","","    /**","     * Hash of toolbar events.","     *","     * @property {Object} _toolbarEvents","     * @protected","     */","","    /**","     * Whether or not this toolbar has been rendered.","     *","     * @property {Boolean} rendered","     * @default false","     */","    rendered: false,","","    // -- Life Cycle Methods  --------------------------------------------------","","    initializer: function () {","        this._attachToolbarEvents();","    },","","    destructor: function () {","        this._detachToolbarEvents();","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * @chainable","     */","    render: function () {","        var container  = this.get('container'),","            classNames = this.classNames;","","        container.addClass(classNames.toolbar);","","        for (var i = 0, len = this._buttonGroupMap.length; i < len; i++) {","            var group = this._buttonGroupMap[i];","","            container.append(group.render().get('container'));","        }","","        this.rendered = true;","","        return this;","    },","","    /**","     Get a button node by name.","","     @method getButton","     @param {String} name The name of the button.","     **/","//    getButton: function (name) {","//        if (!this._buttonMap) {","//            return false;","//        }","//","//        if (!this._buttonMap[name]) {","//            return false;","//        }","//","//        return this._buttonMap[name];","//    },","","    /**","     * @param {String} id Menu entry id","     */","//    enable: function (id) {","//        this.disable(id, true);","//    },","","    /**","     * @param {String} id Menu entry id","     * @param {Boolean} _enable Toggle the enabled state","     */","//    disable: function (id, _enable) {","//        var container = this.get('container'),","//            node      = container.one('[data-id=' + id + ']');","//","//        if (_enable) {","//            node.removeClass('disabled');","//        } else {","//            node.addClass('disabled');","//        }","//    },","","    /**","     * @param {String} id Menu entry id","     */","//    reset: function (id) {","//        var container = this.get('container'),","//            node      = container.one('[data-id=' + id + ']');","//","//        node.hasClass(CSS_BOOTSTRAP_ACTIVE) && node.removeClass(CSS_BOOTSTRAP_ACTIVE);","//    },","//","    // -- Protected methods ----------------------------------------------------","","    /**","     * @private","     */","    _attachToolbarEvents: function () {","        this._toolbarEvents || (this._toolbarEvents = []);","","        this._toolbarEvents.push(","            this.after({","                open : this._afterAdd,","                close: this._afterRemove,","","                'button:click': this._afterButtonClick","            })","        );","    },","","    /**","     * @private","     */","    _detachToolbarEvents: function () {","        (new Y.EventHandle(this._toolbarEvents)).detach();","    },","","//    /**","//     Setter to update the buttons properties.","//","//     @method _setButtons","//     @param {Object} value The button config object","//     @protected","//     **/","//    _setButtons: function (value) {","//        var self    = this,","//            footer  = this.get('container').one('.' + CSS_YUI3_WIDGET_FT),","//            buttons = this.buttons;","//","//        Y.Object.each(value, function (properties, key) {","//            self.buttons[key] = Y.merge(buttons[key], properties);","//        });","//","//        // TODO: Update instead of rerendering.","//        this._buildFooter();","//","//        this._rendered && footer.one('div').replace(this._footer);","//    },","//","//    /**","//     Getter to get the current button properties.","//","//     @method _getButtons","//     @protected","//     **/","//    _getButtons: function () {","//        return this.buttons;","//    }","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","     * @param {EventFacade} e","     * @private","     */","    _afterAdd: function (e) {","        if (!this.rendered) {","            return;","        }","","        console.log(e.group);","    },","","    /**","     * @param {EventFacade} e","     * @private","     */","    _afterRemove: function (e) {","        if (!this.rendered) {","            return;","        }","","        console.log(e.index);","    },","","    /**","     * @param {EventFacade} e","     * @private","     */","    _afterButtonClick: function (e) {","        var button = e.button,","            event  = EVT_CLICK + '#' + button.id;","","        if (!this._published[event]) {","            this._published[event] = this.publish(event, {","                defaultFn: this._defButtonClickFn","            });","        }","","        this.fire(event, {","            originEvent: e,","            button     : button","        });","    },","","    // -- Default Event Handlers -----------------------------------------------","","    /**","     * @param {EventFacade} e","     * @private","     */","    _defButtonClickFn: function (e) {","        this.fire(EVT_CLICK, {","            originEvent: e.originEvent,","            button     : e.button","        });","    }","});","","Y.Rednose.Toolbar = Y.mix(Toolbar, Y.Rednose.Toolbar);","","","}, '1.4.2', {\"requires\": [\"rednose-toolbar-base\"]});","","}());"]};
}
var __cov_3z00uuk8NEkAXD8KkvS2hA = __coverage__['build/rednose-toolbar/rednose-toolbar.js'];
__cov_3z00uuk8NEkAXD8KkvS2hA.s['1']++;YUI.add('rednose-toolbar',function(Y,NAME){__cov_3z00uuk8NEkAXD8KkvS2hA.f['1']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['2']++;var EVT_CLICK='click';__cov_3z00uuk8NEkAXD8KkvS2hA.s['3']++;var Toolbar=Y.Base.create('toolbar',Y.Rednose.Toolbar.Base,[Y.View],{classNames:{toolbar:'btn-toolbar'},rendered:false,initializer:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['2']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['4']++;this._attachToolbarEvents();},destructor:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['3']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['5']++;this._detachToolbarEvents();},render:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['4']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['6']++;var container=this.get('container'),classNames=this.classNames;__cov_3z00uuk8NEkAXD8KkvS2hA.s['7']++;container.addClass(classNames.toolbar);__cov_3z00uuk8NEkAXD8KkvS2hA.s['8']++;for(var i=0,len=this._buttonGroupMap.length;i<len;i++){__cov_3z00uuk8NEkAXD8KkvS2hA.s['9']++;var group=this._buttonGroupMap[i];__cov_3z00uuk8NEkAXD8KkvS2hA.s['10']++;container.append(group.render().get('container'));}__cov_3z00uuk8NEkAXD8KkvS2hA.s['11']++;this.rendered=true;__cov_3z00uuk8NEkAXD8KkvS2hA.s['12']++;return this;},_attachToolbarEvents:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['5']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['13']++;(__cov_3z00uuk8NEkAXD8KkvS2hA.b['1'][0]++,this._toolbarEvents)||(__cov_3z00uuk8NEkAXD8KkvS2hA.b['1'][1]++,this._toolbarEvents=[]);__cov_3z00uuk8NEkAXD8KkvS2hA.s['14']++;this._toolbarEvents.push(this.after({open:this._afterAdd,close:this._afterRemove,'button:click':this._afterButtonClick}));},_detachToolbarEvents:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['6']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['15']++;new Y.EventHandle(this._toolbarEvents).detach();},_afterAdd:function(e){__cov_3z00uuk8NEkAXD8KkvS2hA.f['7']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['16']++;if(!this.rendered){__cov_3z00uuk8NEkAXD8KkvS2hA.b['2'][0]++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['17']++;return;}else{__cov_3z00uuk8NEkAXD8KkvS2hA.b['2'][1]++;}__cov_3z00uuk8NEkAXD8KkvS2hA.s['18']++;console.log(e.group);},_afterRemove:function(e){__cov_3z00uuk8NEkAXD8KkvS2hA.f['8']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['19']++;if(!this.rendered){__cov_3z00uuk8NEkAXD8KkvS2hA.b['3'][0]++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['20']++;return;}else{__cov_3z00uuk8NEkAXD8KkvS2hA.b['3'][1]++;}__cov_3z00uuk8NEkAXD8KkvS2hA.s['21']++;console.log(e.index);},_afterButtonClick:function(e){__cov_3z00uuk8NEkAXD8KkvS2hA.f['9']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['22']++;var button=e.button,event=EVT_CLICK+'#'+button.id;__cov_3z00uuk8NEkAXD8KkvS2hA.s['23']++;if(!this._published[event]){__cov_3z00uuk8NEkAXD8KkvS2hA.b['4'][0]++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['24']++;this._published[event]=this.publish(event,{defaultFn:this._defButtonClickFn});}else{__cov_3z00uuk8NEkAXD8KkvS2hA.b['4'][1]++;}__cov_3z00uuk8NEkAXD8KkvS2hA.s['25']++;this.fire(event,{originEvent:e,button:button});},_defButtonClickFn:function(e){__cov_3z00uuk8NEkAXD8KkvS2hA.f['10']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['26']++;this.fire(EVT_CLICK,{originEvent:e.originEvent,button:e.button});}});__cov_3z00uuk8NEkAXD8KkvS2hA.s['27']++;Y.Rednose.Toolbar=Y.mix(Toolbar,Y.Rednose.Toolbar);},'1.4.2',{'requires':['rednose-toolbar-base']});
