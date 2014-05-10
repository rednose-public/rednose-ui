if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-dropdown-plugin/rednose-dropdown-plugin.js']) {
   __coverage__['build/rednose-dropdown-plugin/rednose-dropdown-plugin.js'] = {"path":"build/rednose-dropdown-plugin/rednose-dropdown-plugin.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":54}}},"2":{"name":"(anonymous_2)","line":23,"loc":{"start":{"line":23,"column":17},"end":{"line":23,"column":35}}},"3":{"name":"(anonymous_3)","line":59,"loc":{"start":{"line":59,"column":24},"end":{"line":59,"column":40}}},"4":{"name":"(anonymous_4)","line":75,"loc":{"start":{"line":75,"column":26},"end":{"line":75,"column":39}}},"5":{"name":"(anonymous_5)","line":91,"loc":{"start":{"line":91,"column":20},"end":{"line":91,"column":33}}},"6":{"name":"(anonymous_6)","line":146,"loc":{"start":{"line":146,"column":20},"end":{"line":146,"column":37}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":158,"column":77}},"2":{"start":{"line":19,"column":0},"end":{"line":155,"column":3}},"3":{"start":{"line":24,"column":8},"end":{"line":24,"column":33}},"4":{"start":{"line":26,"column":8},"end":{"line":28,"column":41}},"5":{"start":{"line":30,"column":8},"end":{"line":30,"column":48}},"6":{"start":{"line":32,"column":8},"end":{"line":32,"column":56}},"7":{"start":{"line":34,"column":8},"end":{"line":38,"column":9}},"8":{"start":{"line":35,"column":12},"end":{"line":35,"column":74}},"9":{"start":{"line":37,"column":12},"end":{"line":37,"column":19}},"10":{"start":{"line":40,"column":8},"end":{"line":40,"column":47}},"11":{"start":{"line":42,"column":8},"end":{"line":47,"column":9}},"12":{"start":{"line":43,"column":12},"end":{"line":46,"column":16}},"13":{"start":{"line":49,"column":8},"end":{"line":49,"column":58}},"14":{"start":{"line":60,"column":8},"end":{"line":60,"column":46}},"15":{"start":{"line":62,"column":8},"end":{"line":66,"column":11}},"16":{"start":{"line":76,"column":8},"end":{"line":78,"column":9}},"17":{"start":{"line":77,"column":12},"end":{"line":77,"column":19}},"18":{"start":{"line":80,"column":8},"end":{"line":80,"column":27}},"19":{"start":{"line":82,"column":8},"end":{"line":82,"column":50}},"20":{"start":{"line":84,"column":8},"end":{"line":84,"column":20}},"21":{"start":{"line":92,"column":8},"end":{"line":92,"column":27}},"22":{"start":{"line":94,"column":8},"end":{"line":94,"column":22}},"23":{"start":{"line":147,"column":16},"end":{"line":149,"column":17}},"24":{"start":{"line":148,"column":20},"end":{"line":148,"column":53}},"25":{"start":{"line":151,"column":16},"end":{"line":151,"column":52}}},"branchMap":{"1":{"line":32,"type":"binary-expr","locations":[{"start":{"line":32,"column":8},"end":{"line":32,"column":14}},{"start":{"line":32,"column":18},"end":{"line":32,"column":55}}]},"2":{"line":34,"type":"if","locations":[{"start":{"line":34,"column":8},"end":{"line":34,"column":8}},{"start":{"line":34,"column":8},"end":{"line":34,"column":8}}]},"3":{"line":42,"type":"if","locations":[{"start":{"line":42,"column":8},"end":{"line":42,"column":8}},{"start":{"line":42,"column":8},"end":{"line":42,"column":8}}]},"4":{"line":76,"type":"if","locations":[{"start":{"line":76,"column":8},"end":{"line":76,"column":8}},{"start":{"line":76,"column":8},"end":{"line":76,"column":8}}]},"5":{"line":147,"type":"if","locations":[{"start":{"line":147,"column":16},"end":{"line":147,"column":16}},{"start":{"line":147,"column":16},"end":{"line":147,"column":16}}]}},"code":["(function () { YUI.add('rednose-dropdown-plugin', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Provides the `Y.Rednose.Plugin.Dropdown` Node plugin."," *"," * @module rednose-dropdown"," */","","/**"," * Node plugin that attaches a dropdown to the given node."," *"," * @class Rednose.Plugin.Dropdown"," * @constructor"," * @extends Rednose.Dropdown"," * @uses Plugin.Base"," */","Y.namespace('Rednose.Plugin').Dropdown = Y.Base.create('dropdown', Y.Rednose.Dropdown, [Y.Plugin.Base], {","","    // -- Life Cycle Methods ---------------------------------------------------","","    initializer: function (config) {","        this._host = config.host;","","        var container  = this.get('container'),","            dropup     = this.get('dropup'),","            classNames = this.classNames;","","        container.addClass(classNames.dropdown);","","        dropup && container.addClass(classNames.dropup);","","        if (this.get('showOnContext')) {","            this._host.on('contextmenu', this._onAnchorContextMenu, this);","","            return;","        }","","        this._host.addClass(classNames.toggle);","","        if (this.get('showCaret')) {","            this._host.setHTML(this.templates.caret({","                classNames: classNames,","                content   : this._host.getHTML()","            }));","        }","","        this._host.on('click', this._onAnchorClick, this);","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","     * @param {Number} x","     * @param {Number} y","     * @private","     */","    _positionContainer: function (x, y) {","        var container = this.get('container');","","        container.setStyles({","            position: 'absolute',","            left    : x,","            top     : y","        });","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","     * @param e {EventFacade}","     * @private","     */","    _onAnchorContextMenu: function (e) {","        if (e.shiftKey) {","            return;","        }","","        e.preventDefault();","","        this._positionContainer(e.pageX, e.pageY);","","        this.open();","    },","","    /**","     * @param e {EventFacade}","     * @private","     */","    _onAnchorClick: function (e) {","        e.preventDefault();","","        this.toggle();","    }","}, {","    NS: 'dropdown',","","    ATTRS: {","","        /**","         * If `true`, a caret will be rendered within the anchor node.","         *","         * @attribute {Boolean} showCaret","         * @default true","         * @initOnly","         */","        showCaret: {","            value: true,","            writeOnce: 'initOnly'","        },","","        /**","         * If `true`, this menu will be triggered and rendered on the contextmenu event.","         *","         * @attribute {Boolean} showOnContext","         * @default false","         * @initOnly","         */","        showOnContext: {","            value: false,","            writeOnce: 'initOnly'","        },","","        /**","         * If `true`, the menu will be rendered upwards from the anchor node.","         *","         * @attribute {Boolean} dropup","         * @default false","         * @initOnly","         */","        dropup: {","            value: false,","            writeOnce: 'initOnly'","        },","","        /**","         * Overrides the container, in case a button plug-in the parent node acts","         * as container.","         *","         * The getter should only be called once all extensions have been initialized.","         *","         * @attribute {Node} container","         */","        container: {","            getter: function (value) {","                if (this.get('showOnContext')) {","                    return this._getContainer(value);","                }","","                return this._host.get('parentNode');","            }","        }","    }","});","","","}, '1.4.0', {\"requires\": [\"rednose-dropdown\", \"node-pluginhost\", \"plugin\"]});","","}());"]};
}
var __cov_kwvVRp5heWuQXeWNQqnVlQ = __coverage__['build/rednose-dropdown-plugin/rednose-dropdown-plugin.js'];
__cov_kwvVRp5heWuQXeWNQqnVlQ.s['1']++;YUI.add('rednose-dropdown-plugin',function(Y,NAME){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['1']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['2']++;Y.namespace('Rednose.Plugin').Dropdown=Y.Base.create('dropdown',Y.Rednose.Dropdown,[Y.Plugin.Base],{initializer:function(config){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['2']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['3']++;this._host=config.host;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['4']++;var container=this.get('container'),dropup=this.get('dropup'),classNames=this.classNames;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['5']++;container.addClass(classNames.dropdown);__cov_kwvVRp5heWuQXeWNQqnVlQ.s['6']++;(__cov_kwvVRp5heWuQXeWNQqnVlQ.b['1'][0]++,dropup)&&(__cov_kwvVRp5heWuQXeWNQqnVlQ.b['1'][1]++,container.addClass(classNames.dropup));__cov_kwvVRp5heWuQXeWNQqnVlQ.s['7']++;if(this.get('showOnContext')){__cov_kwvVRp5heWuQXeWNQqnVlQ.b['2'][0]++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['8']++;this._host.on('contextmenu',this._onAnchorContextMenu,this);__cov_kwvVRp5heWuQXeWNQqnVlQ.s['9']++;return;}else{__cov_kwvVRp5heWuQXeWNQqnVlQ.b['2'][1]++;}__cov_kwvVRp5heWuQXeWNQqnVlQ.s['10']++;this._host.addClass(classNames.toggle);__cov_kwvVRp5heWuQXeWNQqnVlQ.s['11']++;if(this.get('showCaret')){__cov_kwvVRp5heWuQXeWNQqnVlQ.b['3'][0]++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['12']++;this._host.setHTML(this.templates.caret({classNames:classNames,content:this._host.getHTML()}));}else{__cov_kwvVRp5heWuQXeWNQqnVlQ.b['3'][1]++;}__cov_kwvVRp5heWuQXeWNQqnVlQ.s['13']++;this._host.on('click',this._onAnchorClick,this);},_positionContainer:function(x,y){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['3']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['14']++;var container=this.get('container');__cov_kwvVRp5heWuQXeWNQqnVlQ.s['15']++;container.setStyles({position:'absolute',left:x,top:y});},_onAnchorContextMenu:function(e){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['4']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['16']++;if(e.shiftKey){__cov_kwvVRp5heWuQXeWNQqnVlQ.b['4'][0]++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['17']++;return;}else{__cov_kwvVRp5heWuQXeWNQqnVlQ.b['4'][1]++;}__cov_kwvVRp5heWuQXeWNQqnVlQ.s['18']++;e.preventDefault();__cov_kwvVRp5heWuQXeWNQqnVlQ.s['19']++;this._positionContainer(e.pageX,e.pageY);__cov_kwvVRp5heWuQXeWNQqnVlQ.s['20']++;this.open();},_onAnchorClick:function(e){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['5']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['21']++;e.preventDefault();__cov_kwvVRp5heWuQXeWNQqnVlQ.s['22']++;this.toggle();}},{NS:'dropdown',ATTRS:{showCaret:{value:true,writeOnce:'initOnly'},showOnContext:{value:false,writeOnce:'initOnly'},dropup:{value:false,writeOnce:'initOnly'},container:{getter:function(value){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['6']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['23']++;if(this.get('showOnContext')){__cov_kwvVRp5heWuQXeWNQqnVlQ.b['5'][0]++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['24']++;return this._getContainer(value);}else{__cov_kwvVRp5heWuQXeWNQqnVlQ.b['5'][1]++;}__cov_kwvVRp5heWuQXeWNQqnVlQ.s['25']++;return this._host.get('parentNode');}}}});},'1.4.0',{'requires':['rednose-dropdown','node-pluginhost','plugin']});
