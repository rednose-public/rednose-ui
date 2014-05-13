if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-toolbar/rednose-toolbar.js']) {
   __coverage__['build/rednose-toolbar/rednose-toolbar.js'] = {"path":"build/rednose-toolbar/rednose-toolbar.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":27},"end":{"line":1,"column":46}}},"2":{"name":"(anonymous_2)","line":61,"loc":{"start":{"line":61,"column":17},"end":{"line":61,"column":29}}},"3":{"name":"(anonymous_3)","line":65,"loc":{"start":{"line":65,"column":16},"end":{"line":65,"column":28}}},"4":{"name":"(anonymous_4)","line":74,"loc":{"start":{"line":74,"column":12},"end":{"line":74,"column":24}}},"5":{"name":"(anonymous_5)","line":146,"loc":{"start":{"line":146,"column":26},"end":{"line":146,"column":38}}},"6":{"name":"(anonymous_6)","line":160,"loc":{"start":{"line":160,"column":26},"end":{"line":160,"column":38}}},"7":{"name":"(anonymous_7)","line":202,"loc":{"start":{"line":202,"column":15},"end":{"line":202,"column":28}}},"8":{"name":"(anonymous_8)","line":214,"loc":{"start":{"line":214,"column":18},"end":{"line":214,"column":31}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":226,"column":52}},"2":{"start":{"line":22,"column":0},"end":{"line":221,"column":3}},"3":{"start":{"line":62,"column":8},"end":{"line":62,"column":36}},"4":{"start":{"line":66,"column":8},"end":{"line":66,"column":36}},"5":{"start":{"line":75,"column":8},"end":{"line":76,"column":41}},"6":{"start":{"line":78,"column":8},"end":{"line":78,"column":47}},"7":{"start":{"line":80,"column":8},"end":{"line":84,"column":9}},"8":{"start":{"line":81,"column":12},"end":{"line":81,"column":48}},"9":{"start":{"line":83,"column":12},"end":{"line":83,"column":62}},"10":{"start":{"line":86,"column":8},"end":{"line":86,"column":29}},"11":{"start":{"line":88,"column":8},"end":{"line":88,"column":20}},"12":{"start":{"line":147,"column":8},"end":{"line":147,"column":58}},"13":{"start":{"line":149,"column":8},"end":{"line":154,"column":10}},"14":{"start":{"line":161,"column":8},"end":{"line":161,"column":58}},"15":{"start":{"line":203,"column":8},"end":{"line":205,"column":9}},"16":{"start":{"line":204,"column":12},"end":{"line":204,"column":19}},"17":{"start":{"line":207,"column":8},"end":{"line":207,"column":29}},"18":{"start":{"line":215,"column":8},"end":{"line":217,"column":9}},"19":{"start":{"line":216,"column":12},"end":{"line":216,"column":19}},"20":{"start":{"line":219,"column":8},"end":{"line":219,"column":29}},"21":{"start":{"line":223,"column":0},"end":{"line":223,"column":54}}},"branchMap":{"1":{"line":147,"type":"binary-expr","locations":[{"start":{"line":147,"column":8},"end":{"line":147,"column":27}},{"start":{"line":147,"column":32},"end":{"line":147,"column":56}}]},"2":{"line":203,"type":"if","locations":[{"start":{"line":203,"column":8},"end":{"line":203,"column":8}},{"start":{"line":203,"column":8},"end":{"line":203,"column":8}}]},"3":{"line":215,"type":"if","locations":[{"start":{"line":215,"column":8},"end":{"line":215,"column":8}},{"start":{"line":215,"column":8},"end":{"line":215,"column":8}}]}},"code":["(function () { YUI.add('rednose-toolbar', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Provides the Y.Rednose.Toolbar widget."," *"," * @module rednose-toolbar"," * @main rednose-toolbar"," */","","/**"," * Toolbar widget."," *"," * @class Rednose.Toolbar"," * @constructor"," * @param {Object} [config] Config object."," *     @param {Object[]} [config.groups] Array of group config objects."," * @extends Rednose.Toolbar.Base"," * @uses View"," */","var Toolbar = Y.Base.create('toolbar', Y.Rednose.Toolbar.Base, [Y.View], {","","    /**","     * CSS class names used by this toolbar.","     *","     * @property {Object} classNames","     */","    classNames: {","        toolbar: 'btn-toolbar'","    },","","//    /**","//     Stores references to the created nodes.","//","//     @property _buttonMap","//     @type Object","//     @protected","//     **/","//    _buttonMap: {},","//","//    _evtPrefix: null,","","    /**","     * Hash of toolbar events.","     *","     * @property {Object} _toolbarEvents","     * @protected","     */","","    /**","     * Whether or not this toolbar has been rendered.","     *","     * @property {Boolean} rendered","     * @default false","     */","    rendered: false,","","    // -- Life Cycle Methods  --------------------------------------------------","","    initializer: function () {","        this._attachToolbarEvents();","    },","","    destructor: function () {","        this._detachToolbarEvents();","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * @chainable","     */","    render: function () {","        var container  = this.get('container'),","            classNames = this.classNames;","","        container.addClass(classNames.toolbar);","","        for (var i = 0, len = this._buttonGroupMap.length; i < len; i++) {","            var group = this._buttonGroupMap[i];","","            container.append(group.render().get('container'));","        }","","        this.rendered = true;","","        return this;","    },","","    /**","     Get a button node by name.","","     @method getButton","     @param {String} name The name of the button.","     **/","//    getButton: function (name) {","//        if (!this._buttonMap) {","//            return false;","//        }","//","//        if (!this._buttonMap[name]) {","//            return false;","//        }","//","//        return this._buttonMap[name];","//    },","","    /**","     * @param {String} id Menu entry id","     */","//    enable: function (id) {","//        this.disable(id, true);","//    },","","    /**","     * @param {String} id Menu entry id","     * @param {Boolean} _enable Toggle the enabled state","     */","//    disable: function (id, _enable) {","//        var container = this.get('container'),","//            node      = container.one('[data-id=' + id + ']');","//","//        if (_enable) {","//            node.removeClass('disabled');","//        } else {","//            node.addClass('disabled');","//        }","//    },","","    /**","     * @param {String} id Menu entry id","     */","//    reset: function (id) {","//        var container = this.get('container'),","//            node      = container.one('[data-id=' + id + ']');","//","//        node.hasClass(CSS_BOOTSTRAP_ACTIVE) && node.removeClass(CSS_BOOTSTRAP_ACTIVE);","//    },","//","    // -- Protected methods ----------------------------------------------------","","    /**","     * @private","     */","    _attachToolbarEvents: function () {","        this._toolbarEvents || (this._toolbarEvents = []);","","        this._toolbarEvents.push(","            this.after({","                open : this._afterAdd,","                close: this._afterRemove","            })","        );","    },","","    /**","     * @private","     */","    _detachToolbarEvents: function () {","        (new Y.EventHandle(this._toolbarEvents)).detach();","    },","","//    /**","//     Setter to update the buttons properties.","//","//     @method _setButtons","//     @param {Object} value The button config object","//     @protected","//     **/","//    _setButtons: function (value) {","//        var self    = this,","//            footer  = this.get('container').one('.' + CSS_YUI3_WIDGET_FT),","//            buttons = this.buttons;","//","//        Y.Object.each(value, function (properties, key) {","//            self.buttons[key] = Y.merge(buttons[key], properties);","//        });","//","//        // TODO: Update instead of rerendering.","//        this._buildFooter();","//","//        this._rendered && footer.one('div').replace(this._footer);","//    },","//","//    /**","//     Getter to get the current button properties.","//","//     @method _getButtons","//     @protected","//     **/","//    _getButtons: function () {","//        return this.buttons;","//    }","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","     * @param {EventFacade} e","     * @private","     */","    _afterAdd: function (e) {","        if (!this.rendered) {","            return;","        }","","        console.log(e.group);","    },","","    /**","     * @param {EventFacade} e","     * @private","     */","    _afterRemove: function (e) {","        if (!this.rendered) {","            return;","        }","","        console.log(e.index);","    }","});","","Y.Rednose.Toolbar = Y.mix(Toolbar, Y.Rednose.Toolbar);","","","}, '1.4.0', {\"requires\": [\"rednose-toolbar-base\"]});","","}());"]};
}
var __cov_3z00uuk8NEkAXD8KkvS2hA = __coverage__['build/rednose-toolbar/rednose-toolbar.js'];
__cov_3z00uuk8NEkAXD8KkvS2hA.s['1']++;YUI.add('rednose-toolbar',function(Y,NAME){__cov_3z00uuk8NEkAXD8KkvS2hA.f['1']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['2']++;var Toolbar=Y.Base.create('toolbar',Y.Rednose.Toolbar.Base,[Y.View],{classNames:{toolbar:'btn-toolbar'},rendered:false,initializer:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['2']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['3']++;this._attachToolbarEvents();},destructor:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['3']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['4']++;this._detachToolbarEvents();},render:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['4']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['5']++;var container=this.get('container'),classNames=this.classNames;__cov_3z00uuk8NEkAXD8KkvS2hA.s['6']++;container.addClass(classNames.toolbar);__cov_3z00uuk8NEkAXD8KkvS2hA.s['7']++;for(var i=0,len=this._buttonGroupMap.length;i<len;i++){__cov_3z00uuk8NEkAXD8KkvS2hA.s['8']++;var group=this._buttonGroupMap[i];__cov_3z00uuk8NEkAXD8KkvS2hA.s['9']++;container.append(group.render().get('container'));}__cov_3z00uuk8NEkAXD8KkvS2hA.s['10']++;this.rendered=true;__cov_3z00uuk8NEkAXD8KkvS2hA.s['11']++;return this;},_attachToolbarEvents:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['5']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['12']++;(__cov_3z00uuk8NEkAXD8KkvS2hA.b['1'][0]++,this._toolbarEvents)||(__cov_3z00uuk8NEkAXD8KkvS2hA.b['1'][1]++,this._toolbarEvents=[]);__cov_3z00uuk8NEkAXD8KkvS2hA.s['13']++;this._toolbarEvents.push(this.after({open:this._afterAdd,close:this._afterRemove}));},_detachToolbarEvents:function(){__cov_3z00uuk8NEkAXD8KkvS2hA.f['6']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['14']++;new Y.EventHandle(this._toolbarEvents).detach();},_afterAdd:function(e){__cov_3z00uuk8NEkAXD8KkvS2hA.f['7']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['15']++;if(!this.rendered){__cov_3z00uuk8NEkAXD8KkvS2hA.b['2'][0]++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['16']++;return;}else{__cov_3z00uuk8NEkAXD8KkvS2hA.b['2'][1]++;}__cov_3z00uuk8NEkAXD8KkvS2hA.s['17']++;console.log(e.group);},_afterRemove:function(e){__cov_3z00uuk8NEkAXD8KkvS2hA.f['8']++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['18']++;if(!this.rendered){__cov_3z00uuk8NEkAXD8KkvS2hA.b['3'][0]++;__cov_3z00uuk8NEkAXD8KkvS2hA.s['19']++;return;}else{__cov_3z00uuk8NEkAXD8KkvS2hA.b['3'][1]++;}__cov_3z00uuk8NEkAXD8KkvS2hA.s['20']++;console.log(e.index);}});__cov_3z00uuk8NEkAXD8KkvS2hA.s['21']++;Y.Rednose.Toolbar=Y.mix(Toolbar,Y.Rednose.Toolbar);},'1.4.0',{'requires':['rednose-toolbar-base']});
