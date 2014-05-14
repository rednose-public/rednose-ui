if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-dropdown-item/rednose-dropdown-item.js']) {
   __coverage__['build/rednose-dropdown-item/rednose-dropdown-item.js'] = {"path":"build/rednose-dropdown-item/rednose-dropdown-item.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0},"b":{"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0],"8":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":52}}},"2":{"name":"DropdownItem","line":37,"loc":{"start":{"line":37,"column":0},"end":{"line":37,"column":40}}},"3":{"name":"(anonymous_3)","line":124,"loc":{"start":{"line":124,"column":12},"end":{"line":124,"column":24}}},"4":{"name":"(anonymous_4)","line":135,"loc":{"start":{"line":135,"column":13},"end":{"line":135,"column":25}}},"5":{"name":"(anonymous_5)","line":146,"loc":{"start":{"line":146,"column":12},"end":{"line":146,"column":29}}},"6":{"name":"(anonymous_6)","line":157,"loc":{"start":{"line":157,"column":16},"end":{"line":157,"column":28}}},"7":{"name":"(anonymous_7)","line":166,"loc":{"start":{"line":166,"column":17},"end":{"line":166,"column":29}}},"8":{"name":"(anonymous_8)","line":175,"loc":{"start":{"line":175,"column":14},"end":{"line":175,"column":31}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":184,"column":36}},"2":{"start":{"line":37,"column":0},"end":{"line":53,"column":1}},"3":{"start":{"line":38,"column":4},"end":{"line":38,"column":28}},"4":{"start":{"line":40,"column":4},"end":{"line":40,"column":29}},"5":{"start":{"line":41,"column":4},"end":{"line":41,"column":47}},"6":{"start":{"line":42,"column":4},"end":{"line":42,"column":42}},"7":{"start":{"line":43,"column":4},"end":{"line":43,"column":38}},"8":{"start":{"line":44,"column":4},"end":{"line":44,"column":23}},"9":{"start":{"line":46,"column":4},"end":{"line":50,"column":5}},"10":{"start":{"line":47,"column":8},"end":{"line":47,"column":46}},"11":{"start":{"line":49,"column":8},"end":{"line":49,"column":76}},"12":{"start":{"line":52,"column":4},"end":{"line":52,"column":24}},"13":{"start":{"line":55,"column":0},"end":{"line":178,"column":2}},"14":{"start":{"line":125,"column":8},"end":{"line":125,"column":39}},"15":{"start":{"line":127,"column":8},"end":{"line":127,"column":20}},"16":{"start":{"line":136,"column":8},"end":{"line":136,"column":40}},"17":{"start":{"line":138,"column":8},"end":{"line":138,"column":20}},"18":{"start":{"line":147,"column":8},"end":{"line":147,"column":46}},"19":{"start":{"line":149,"column":8},"end":{"line":149,"column":20}},"20":{"start":{"line":158,"column":8},"end":{"line":158,"column":38}},"21":{"start":{"line":167,"column":8},"end":{"line":167,"column":57}},"22":{"start":{"line":176,"column":8},"end":{"line":176,"column":34}},"23":{"start":{"line":181,"column":0},"end":{"line":181,"column":52}}},"branchMap":{"1":{"line":38,"type":"binary-expr","locations":[{"start":{"line":38,"column":4},"end":{"line":38,"column":10}},{"start":{"line":38,"column":15},"end":{"line":38,"column":26}}]},"2":{"line":41,"type":"binary-expr","locations":[{"start":{"line":41,"column":20},"end":{"line":41,"column":29}},{"start":{"line":41,"column":33},"end":{"line":41,"column":46}}]},"3":{"line":42,"type":"binary-expr","locations":[{"start":{"line":42,"column":20},"end":{"line":42,"column":31}},{"start":{"line":42,"column":35},"end":{"line":42,"column":41}}]},"4":{"line":43,"type":"binary-expr","locations":[{"start":{"line":43,"column":20},"end":{"line":43,"column":30}},{"start":{"line":43,"column":34},"end":{"line":43,"column":37}}]},"5":{"line":46,"type":"if","locations":[{"start":{"line":46,"column":4},"end":{"line":46,"column":4}},{"start":{"line":46,"column":4},"end":{"line":46,"column":4}}]},"6":{"line":46,"type":"binary-expr","locations":[{"start":{"line":46,"column":8},"end":{"line":46,"column":19}},{"start":{"line":46,"column":23},"end":{"line":46,"column":34}}]},"7":{"line":49,"type":"binary-expr","locations":[{"start":{"line":49,"column":8},"end":{"line":49,"column":33}},{"start":{"line":49,"column":38},"end":{"line":49,"column":74}}]},"8":{"line":167,"type":"binary-expr","locations":[{"start":{"line":167,"column":15},"end":{"line":167,"column":28}},{"start":{"line":167,"column":32},"end":{"line":167,"column":56}}]}},"code":["(function () { YUI.add('rednose-dropdown-item', function (Y, NAME) {","","/*jshint expr:true, onevar:false */","","/**"," * Provides Rednose.Dropdown.Item class."," *"," * @module rednose-dropdown"," * @submodule rednose-dropdown-item"," */","","/**"," * A single item within a `Rednose.Dropdown`."," *"," * @class Rednose.Dropdown.Item"," * @constructor"," * @param {Rednose.Dropdown} dropdown `Rednose.Dropdown` instance."," * @param {Object} [config] Configuration hash for this item."," *     @param {Boolean} [config.id] The id for this item."," *"," *     @param {String} [config.type='item'] The type for this dropdown item."," *         Can be 'item' or 'divider'."," *"," *     @param {Array} [config.children=[]] Array of child config objects for this item."," *"," *     @param {Boolean} [config.disabled=false] Whether this item is disabled or not. Disabled"," *         items can't be clicked and won't trigger any events."," *"," *     @param {String} [config.icon] Icon CSS class for this item."," *"," *     @param {String} [config.title] The text label for this item."," *"," *     @param {String} [config.url] URL that will be opened when this item is clicked."," *"," *     @param {String} [config.html] Custom HTML string to render the contents of this item."," */","function DropdownItem(dropdown, config) {","    config || (config = {});","","    this.dropdown = dropdown;","    this.id       = config.id || Y.stamp(this);","    this.type     = config.type || 'item';","    this.url      = config.url || '#';","    this.children = [];","","    if (config.html && !config.url) {","        var html = Y.Node.create(config.html);","","        html.hasAttribute('href') && (this.url = html.getAttribute('href'));","    }","","    Y.mix(this, config);","}","","DropdownItem.prototype = {","    /**","     * The id for this node.","     *","     * @property {string} title","     * @readOnly","     */","","    /**","     * The dropdown instance.","     *","     * @property {Rednose.Dropdown} dropdown","     * @readOnly","     */","","    /**","     * This node's children.","     *","     * @property {Array} children","     * @readOnly","     */","","    /**","     * This node's type.","     *","     * @property {String} type","     * @readOnly","     */","","    /**","     * Whether this node is disabled or not.","     *","     * @property {Boolean} disabled","     * @readOnly","     */","","    /**","     * The icon for this node.","     *","     * @property {String} icon","     * @readOnly","     */","","    /**","     * The title for this node.","     *","     * @property {String} title","     * @readOnly","     */","","    /**","     * The URL for this node.","     *","     * @property {String} url","     * @readOnly","     */","","    /**","     * Custom HTML for this node.","     *","     * @property {String} html","     * @readOnly","     */","","    // -- Public Methods -------------------------------------------------------","","    /**","     * Enables this item.","     */","    enable: function () {","        this.dropdown.enableItem(this);","","        return this;","    },","","    /**","     * Disables this item.","     *","     * @chainable","     */","    disable: function () {","        this.dropdown.disableItem(this);","","        return this;","    },","","    /**","     * Renames this item.","     *","     * @param {String} title","     */","    rename: function (title) {","        this.dropdown.renameItem(this, title);","","        return this;","    },","","    /**","     * Whether this node is disabled or not.","     *","     * @return {Boolean}","     */","    isDisabled: function () {","        return this.disabled === true;","    },","","    /**","     * Whether this node has children or not.","     *","     * @return {Boolean}","     */","    hasChildren: function () {","        return this.children && this.children.length > 0;","    },","","    /**","     * Adds a child to this node.","     *","     * @param {Rednose.DropdownItem} child","     */","    addChild: function (child) {","        this.children.push(child);","    }","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose.Dropdown').Item = DropdownItem;","","","}, '1.4.2', {\"requires\": [\"base\"]});","","}());"]};
}
var __cov_lAHadrwrlOmCWvU0p8Q5wQ = __coverage__['build/rednose-dropdown-item/rednose-dropdown-item.js'];
__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['1']++;YUI.add('rednose-dropdown-item',function(Y,NAME){__cov_lAHadrwrlOmCWvU0p8Q5wQ.f['1']++;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['2']++;function DropdownItem(dropdown,config){__cov_lAHadrwrlOmCWvU0p8Q5wQ.f['2']++;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['3']++;(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['1'][0]++,config)||(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['1'][1]++,config={});__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['4']++;this.dropdown=dropdown;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['5']++;this.id=(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['2'][0]++,config.id)||(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['2'][1]++,Y.stamp(this));__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['6']++;this.type=(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['3'][0]++,config.type)||(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['3'][1]++,'item');__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['7']++;this.url=(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['4'][0]++,config.url)||(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['4'][1]++,'#');__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['8']++;this.children=[];__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['9']++;if((__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['6'][0]++,config.html)&&(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['6'][1]++,!config.url)){__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['5'][0]++;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['10']++;var html=Y.Node.create(config.html);__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['11']++;(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['7'][0]++,html.hasAttribute('href'))&&(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['7'][1]++,this.url=html.getAttribute('href'));}else{__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['5'][1]++;}__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['12']++;Y.mix(this,config);}__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['13']++;DropdownItem.prototype={enable:function(){__cov_lAHadrwrlOmCWvU0p8Q5wQ.f['3']++;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['14']++;this.dropdown.enableItem(this);__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['15']++;return this;},disable:function(){__cov_lAHadrwrlOmCWvU0p8Q5wQ.f['4']++;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['16']++;this.dropdown.disableItem(this);__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['17']++;return this;},rename:function(title){__cov_lAHadrwrlOmCWvU0p8Q5wQ.f['5']++;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['18']++;this.dropdown.renameItem(this,title);__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['19']++;return this;},isDisabled:function(){__cov_lAHadrwrlOmCWvU0p8Q5wQ.f['6']++;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['20']++;return this.disabled===true;},hasChildren:function(){__cov_lAHadrwrlOmCWvU0p8Q5wQ.f['7']++;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['21']++;return(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['8'][0]++,this.children)&&(__cov_lAHadrwrlOmCWvU0p8Q5wQ.b['8'][1]++,this.children.length>0);},addChild:function(child){__cov_lAHadrwrlOmCWvU0p8Q5wQ.f['8']++;__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['22']++;this.children.push(child);}};__cov_lAHadrwrlOmCWvU0p8Q5wQ.s['23']++;Y.namespace('Rednose.Dropdown').Item=DropdownItem;},'1.4.2',{'requires':['base']});
