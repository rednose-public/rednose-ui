if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-dropdown-plugin/rednose-dropdown-plugin.js']) {
   __coverage__['build/rednose-dropdown-plugin/rednose-dropdown-plugin.js'] = {"path":"build/rednose-dropdown-plugin/rednose-dropdown-plugin.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":54}}},"2":{"name":"(anonymous_2)","line":36,"loc":{"start":{"line":36,"column":17},"end":{"line":36,"column":35}}},"3":{"name":"(anonymous_3)","line":73,"loc":{"start":{"line":73,"column":23},"end":{"line":73,"column":39}}},"4":{"name":"(anonymous_4)","line":92,"loc":{"start":{"line":92,"column":26},"end":{"line":92,"column":39}}},"5":{"name":"(anonymous_5)","line":112,"loc":{"start":{"line":112,"column":20},"end":{"line":112,"column":33}}},"6":{"name":"(anonymous_6)","line":178,"loc":{"start":{"line":178,"column":20},"end":{"line":178,"column":37}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":201,"column":77}},"2":{"start":{"line":12,"column":0},"end":{"line":12,"column":29}},"3":{"start":{"line":22,"column":0},"end":{"line":187,"column":3}},"4":{"start":{"line":37,"column":8},"end":{"line":37,"column":33}},"5":{"start":{"line":39,"column":8},"end":{"line":42,"column":54}},"6":{"start":{"line":44,"column":8},"end":{"line":44,"column":48}},"7":{"start":{"line":46,"column":8},"end":{"line":46,"column":56}},"8":{"start":{"line":48,"column":8},"end":{"line":52,"column":9}},"9":{"start":{"line":49,"column":12},"end":{"line":49,"column":74}},"10":{"start":{"line":51,"column":12},"end":{"line":51,"column":19}},"11":{"start":{"line":54,"column":8},"end":{"line":54,"column":47}},"12":{"start":{"line":56,"column":8},"end":{"line":61,"column":9}},"13":{"start":{"line":57,"column":12},"end":{"line":60,"column":16}},"14":{"start":{"line":63,"column":8},"end":{"line":63,"column":58}},"15":{"start":{"line":74,"column":8},"end":{"line":74,"column":46}},"16":{"start":{"line":76,"column":8},"end":{"line":76,"column":23}},"17":{"start":{"line":77,"column":8},"end":{"line":77,"column":23}},"18":{"start":{"line":79,"column":8},"end":{"line":83,"column":11}},"19":{"start":{"line":93,"column":8},"end":{"line":95,"column":9}},"20":{"start":{"line":94,"column":12},"end":{"line":94,"column":19}},"21":{"start":{"line":97,"column":8},"end":{"line":97,"column":27}},"22":{"start":{"line":99,"column":8},"end":{"line":101,"column":9}},"23":{"start":{"line":100,"column":12},"end":{"line":100,"column":32}},"24":{"start":{"line":103,"column":8},"end":{"line":103,"column":49}},"25":{"start":{"line":105,"column":8},"end":{"line":105,"column":20}},"26":{"start":{"line":113,"column":8},"end":{"line":113,"column":27}},"27":{"start":{"line":115,"column":8},"end":{"line":115,"column":22}},"28":{"start":{"line":179,"column":16},"end":{"line":181,"column":17}},"29":{"start":{"line":180,"column":20},"end":{"line":180,"column":53}},"30":{"start":{"line":183,"column":16},"end":{"line":183,"column":52}},"31":{"start":{"line":189,"column":0},"end":{"line":192,"column":3}},"32":{"start":{"line":194,"column":0},"end":{"line":198,"column":3}}},"branchMap":{"1":{"line":46,"type":"binary-expr","locations":[{"start":{"line":46,"column":8},"end":{"line":46,"column":14}},{"start":{"line":46,"column":18},"end":{"line":46,"column":55}}]},"2":{"line":48,"type":"if","locations":[{"start":{"line":48,"column":8},"end":{"line":48,"column":8}},{"start":{"line":48,"column":8},"end":{"line":48,"column":8}}]},"3":{"line":56,"type":"if","locations":[{"start":{"line":56,"column":8},"end":{"line":56,"column":8}},{"start":{"line":56,"column":8},"end":{"line":56,"column":8}}]},"4":{"line":93,"type":"if","locations":[{"start":{"line":93,"column":8},"end":{"line":93,"column":8}},{"start":{"line":93,"column":8},"end":{"line":93,"column":8}}]},"5":{"line":99,"type":"if","locations":[{"start":{"line":99,"column":8},"end":{"line":99,"column":8}},{"start":{"line":99,"column":8},"end":{"line":99,"column":8}}]},"6":{"line":179,"type":"if","locations":[{"start":{"line":179,"column":16},"end":{"line":179,"column":16}},{"start":{"line":179,"column":16},"end":{"line":179,"column":16}}]}},"code":["(function () { YUI.add('rednose-dropdown-plugin', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","/**"," * Provides the `Y.Rednose.Plugin.Dropdown` Node plugin."," *"," * @module rednose-dropdown"," * @submodule rednose-dropdown-plugin"," */","","var Micro = Y.Template.Micro;","","/**"," * Node plugin that attaches a dropdown to the given node."," *"," * @class Rednose.Plugin.Dropdown"," * @constructor"," * @extends Rednose.Dropdown"," * @uses Plugin.Base"," */","Y.namespace('Rednose.Plugin').Dropdown = Y.Base.create('dropdown', Y.Rednose.Dropdown, [Y.Plugin.Base], {","","    /**","     * @property {Number} pageX","     * @readOnly","     */","","    /**","     * @property {Number} pageY","     * @readOnly","     */","","    // -- Life Cycle Methods ---------------------------------------------------","","    initializer: function (config) {","        this._host = config.host;","","        var container  = this.get('container'),","            dropup     = this.get('dropup'),","            classNames = Y.Rednose.Dropdown.ClassNames,","            templates  = Y.Rednose.Dropdown.Templates;","","        container.addClass(classNames.dropdown);","","        dropup && container.addClass(classNames.dropup);","","        if (this.get('showOnContext')) {","            this._host.on('contextmenu', this._onAnchorContextMenu, this);","","            return;","        }","","        this._host.addClass(classNames.toggle);","","        if (this.get('showCaret')) {","            this._host.setHTML(templates.caret({","                classNames: classNames,","                content   : this._host.getHTML()","            }));","        }","","        this._host.on('click', this._onAnchorClick, this);","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * @param {Number} x","     * @param {Number} y","     * @private","     */","    positionContainer: function (x, y) {","        var container = this.get('container');","","        this.pageX = x;","        this.pageY = y;","","        container.setStyles({","            position: 'absolute',","            left    : x,","            top     : y","        });","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    /**","     * @param e {EventFacade}","     * @private","     */","    _onAnchorContextMenu: function (e) {","        if (e.shiftKey) {","            return;","        }","","        e.preventDefault();","","        if (this.get('propagate')) {","            e.stopPropagation();","        }","","        this.positionContainer(e.pageX, e.pageY);","","        this.open();","    },","","    /**","     * @param e {EventFacade}","     * @private","     */","    _onAnchorClick: function (e) {","        e.preventDefault();","","        this.toggle();","    }","}, {","    NS: 'dropdown',","","    ATTRS: {","","        /**","         * If `true`, a caret will be rendered within the anchor node.","         *","         * @attribute {Boolean} showCaret","         * @default true","         * @initOnly","         */","        showCaret: {","            value: true,","            writeOnce: 'initOnly'","        },","","        /**","         * If `true`, this menu will be triggered and rendered on the contextmenu event.","         *","         * @attribute {Boolean} showOnContext","         * @default false","         * @initOnly","         */","        showOnContext: {","            value: false,","            writeOnce: 'initOnly'","        },","","        /**","         * If `true`, the menu will be rendered upwards from the anchor node.","         *","         * @attribute {Boolean} dropup","         * @default false","         * @initOnly","         */","        dropup: {","            value: false,","            writeOnce: 'initOnly'","        },","","        /**","         * Whether the contextmenu event should propagate or not.","         * @type {Boolean}","         * @default false","         * @initOnly","         */","        propagate: {","            value: true,","            writeOnce: 'initOnly'","        },","","        /**","         * Overrides the container, in case a button plug-in the parent node acts","         * as container.","         *","         * The getter should only be called once all extensions have been initialized.","         *","         * @attribute {Node} container","         */","        container: {","            getter: function (value) {","                if (this.get('showOnContext')) {","                    return this._getContainer(value);","                }","","                return this._host.get('parentNode');","            }","        }","    }","});","","Y.mix(Y.Rednose.Dropdown.ClassNames, {","    caret : 'caret',","    dropup: 'dropup'","});","","Y.mix(Y.Rednose.Dropdown.Templates, {","    caret: Micro.compile(","        '<%== data.content %> <span class=\"<%= data.classNames.caret %>\"></span>'","    )","});","","","}, '1.6.0', {\"requires\": [\"rednose-dropdown\", \"node-pluginhost\", \"plugin\"]});","","}());"]};
}
var __cov_kwvVRp5heWuQXeWNQqnVlQ = __coverage__['build/rednose-dropdown-plugin/rednose-dropdown-plugin.js'];
__cov_kwvVRp5heWuQXeWNQqnVlQ.s['1']++;YUI.add('rednose-dropdown-plugin',function(Y,NAME){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['1']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['2']++;var Micro=Y.Template.Micro;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['3']++;Y.namespace('Rednose.Plugin').Dropdown=Y.Base.create('dropdown',Y.Rednose.Dropdown,[Y.Plugin.Base],{initializer:function(config){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['2']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['4']++;this._host=config.host;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['5']++;var container=this.get('container'),dropup=this.get('dropup'),classNames=Y.Rednose.Dropdown.ClassNames,templates=Y.Rednose.Dropdown.Templates;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['6']++;container.addClass(classNames.dropdown);__cov_kwvVRp5heWuQXeWNQqnVlQ.s['7']++;(__cov_kwvVRp5heWuQXeWNQqnVlQ.b['1'][0]++,dropup)&&(__cov_kwvVRp5heWuQXeWNQqnVlQ.b['1'][1]++,container.addClass(classNames.dropup));__cov_kwvVRp5heWuQXeWNQqnVlQ.s['8']++;if(this.get('showOnContext')){__cov_kwvVRp5heWuQXeWNQqnVlQ.b['2'][0]++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['9']++;this._host.on('contextmenu',this._onAnchorContextMenu,this);__cov_kwvVRp5heWuQXeWNQqnVlQ.s['10']++;return;}else{__cov_kwvVRp5heWuQXeWNQqnVlQ.b['2'][1]++;}__cov_kwvVRp5heWuQXeWNQqnVlQ.s['11']++;this._host.addClass(classNames.toggle);__cov_kwvVRp5heWuQXeWNQqnVlQ.s['12']++;if(this.get('showCaret')){__cov_kwvVRp5heWuQXeWNQqnVlQ.b['3'][0]++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['13']++;this._host.setHTML(templates.caret({classNames:classNames,content:this._host.getHTML()}));}else{__cov_kwvVRp5heWuQXeWNQqnVlQ.b['3'][1]++;}__cov_kwvVRp5heWuQXeWNQqnVlQ.s['14']++;this._host.on('click',this._onAnchorClick,this);},positionContainer:function(x,y){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['3']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['15']++;var container=this.get('container');__cov_kwvVRp5heWuQXeWNQqnVlQ.s['16']++;this.pageX=x;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['17']++;this.pageY=y;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['18']++;container.setStyles({position:'absolute',left:x,top:y});},_onAnchorContextMenu:function(e){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['4']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['19']++;if(e.shiftKey){__cov_kwvVRp5heWuQXeWNQqnVlQ.b['4'][0]++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['20']++;return;}else{__cov_kwvVRp5heWuQXeWNQqnVlQ.b['4'][1]++;}__cov_kwvVRp5heWuQXeWNQqnVlQ.s['21']++;e.preventDefault();__cov_kwvVRp5heWuQXeWNQqnVlQ.s['22']++;if(this.get('propagate')){__cov_kwvVRp5heWuQXeWNQqnVlQ.b['5'][0]++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['23']++;e.stopPropagation();}else{__cov_kwvVRp5heWuQXeWNQqnVlQ.b['5'][1]++;}__cov_kwvVRp5heWuQXeWNQqnVlQ.s['24']++;this.positionContainer(e.pageX,e.pageY);__cov_kwvVRp5heWuQXeWNQqnVlQ.s['25']++;this.open();},_onAnchorClick:function(e){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['5']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['26']++;e.preventDefault();__cov_kwvVRp5heWuQXeWNQqnVlQ.s['27']++;this.toggle();}},{NS:'dropdown',ATTRS:{showCaret:{value:true,writeOnce:'initOnly'},showOnContext:{value:false,writeOnce:'initOnly'},dropup:{value:false,writeOnce:'initOnly'},propagate:{value:true,writeOnce:'initOnly'},container:{getter:function(value){__cov_kwvVRp5heWuQXeWNQqnVlQ.f['6']++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['28']++;if(this.get('showOnContext')){__cov_kwvVRp5heWuQXeWNQqnVlQ.b['6'][0]++;__cov_kwvVRp5heWuQXeWNQqnVlQ.s['29']++;return this._getContainer(value);}else{__cov_kwvVRp5heWuQXeWNQqnVlQ.b['6'][1]++;}__cov_kwvVRp5heWuQXeWNQqnVlQ.s['30']++;return this._host.get('parentNode');}}}});__cov_kwvVRp5heWuQXeWNQqnVlQ.s['31']++;Y.mix(Y.Rednose.Dropdown.ClassNames,{caret:'caret',dropup:'dropup'});__cov_kwvVRp5heWuQXeWNQqnVlQ.s['32']++;Y.mix(Y.Rednose.Dropdown.Templates,{caret:Micro.compile('<%== data.content %> <span class="<%= data.classNames.caret %>"></span>')});},'1.6.0',{'requires':['rednose-dropdown','node-pluginhost','plugin']});
