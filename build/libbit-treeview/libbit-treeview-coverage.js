if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview/libbit-treeview.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter, Y.Libbit.TreeView.DD ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Reference to all nodes (for use in extensions)","    **/","    _treeNodes: [],","","    /**","    * Selected node","    **/","    selectedNode: null,","","    /**","    * Icon (className) mapping for diffrent types of models","    **/","    _iconMap: [],","","    /**","     * Reference pointer to events","     */","    afterEvent: null,","    openEvent: null,","    closeEvent: null,","","    initializer: function () {","        var contentBox = this.get('contentBox'),","            width      = this.get('width'),","            height     = this.get('height'),","            model      = this.get('data');","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","        contentBox.setStyle('overflow', 'auto');","","        if (model.get('icons')) {","            this._iconMap = model.get('icons');","        }","","        this.tc = Y.Node.create('<div class=\"tc\"></div>');","    },","","    destroy: function () {","        this.get('tree').destroy({ remove: true });","    },","","    getNodes: function() {","        return this._treeNodes;","    },","","    renderUI: function () {","        this.get('boundingBox').addClass('libbit-treeview-outer-container');","        this.get('srcNode').append(this.tc).addClass('libbit-treeview-inner-container');","","        if (this.get('header')) {","            this.tc.prepend('<div class=\"nav-header\">' + this.get('header') + '</div>');","        }","        this._renderTree();","    },","","    _renderTree: function () {","        var filter = this.get('filter'),","            model  = this.get('data'),","            items,","            tree;","","        items = filter && filter.type ? model.filterByAttr(filter.type, filter.attr, filter.value) : model.get('items');","","        this._treeNodes = [];","","        if (this.get('tree')) {","            tree = this.get('tree');","","            tree.detach('open', this._handleExpand);","            tree.detach('close', this._handleCollapse);","","            while (tree.rootNode.children.length > 0) {","                tree.removeNode(tree.rootNode.children[0]);","            }","","            for (var i in items) {","                tree.insertNode(tree.rootNode, items[i]);","            }","        } else {","            tree = new Y.TreeView({","                container: this.get('srcNode').one('.tc'),","                nodes: items","            });","","            this.set('tree', tree);","","            tree.render();","        }","","        this._processTree(tree.rootNode);","        this._bindEvents();","    },","","    _bindEvents: function() {","        var tree = this.get('tree');","","        tree.on('open', this._handleExpand, this);","        tree.on('close', this._handleCollapse, this);","","        this.fire('Finished');","    },","","    _handleExpand: function (e) {","        var tree = this.get('tree');","        var li = tree.getHTMLNode(e.node);","","        this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));","        this.fire('expand', e);","    },","","    _handleCollapse: function (e) {","        var tree = this.get('tree');","        var li = tree.getHTMLNode(e.node);","        var stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));","","        delete this._stateMap[stateIndex];","        this.fire('collapse', e);","    },","","    /**","    * Folderstate icons","    **/","    bindUI: function () {","        var tree = this.get('tree');","","        tree.on(['open', 'close'], function(e) {","            var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');","","            if (e.type === 'treeView:close') {","                iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');","            }","","            if (iconEl) {","                if (e.type === 'treeView:close') {","                    iconEl.removeClass('icon-folder-open');","                    iconEl.addClass('icon-folder-close');","                } else {","                    iconEl.removeClass('icon-folder-close');","                    iconEl.addClass('icon-folder-open');","                }","            }","        });","    },","","    refresh: function () {","        this._renderTree();","        this.fire('refresh');","    },","","    /**","     * Store a reference to the model for each tree node and restore","     * the state of the treeNodes (opened and selected node(s)).","     */","    _processTree: function (rootNode) {","        var self = this,","            tree = this.get('tree');","","        if (rootNode.children.length) {","            rootNode.open();","        }","","        // Attach data to the nodes","        for (var i in rootNode.children) {","            var treeNode = rootNode.children[i],","                li = tree.getHTMLNode(treeNode);","                model = treeNode.data;","","            self._treeNodes.push(treeNode);","","            // Fix the width to be 100%.","            var count = 0;","            var current = li.ancestor('.yui3-treeview-children');","","            while (current.ancestor('.yui3-treeview-children')) {","                count++;","                current = current.ancestor('.yui3-treeview-children');","            }","","            if (count > 0) {","                var ml = count * 20;","","                if (ml) {","                    li.setStyle('marginLeft', -ml);","                    li.one('div').setStyle('paddingLeft', ml + 20);","                    li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);","                    li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);","                }","            }","","            if (Y.instanceOf(model, Y.Model)) {","                li.setAttribute('data-yui3-modelId', model.get('id'));","                li.setAttribute('data-yui3-record', model.get('clientId'));","","                // Set the title for mouseovers on long labels","                li.set('title', treeNode.label);","","                if (typeof(self._iconMap[model.name]) !== 'undefined') {","                    self._setIcon(li, self._iconMap[model.name]);","                }","","                li.setData({ model: model });","            }","","            if (treeNode.children) {","                // Walk through the tree recursively","                self._processTree(treeNode);","            }","        }","","        // Restore state of this node.","        if (rootNode !== tree.rootNode) {","            if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {","                rootNode.close();","            }","","            if (self.selectedNode === rootNode.data.get('id')) {","                rootNode.select();","            }","        }","    },","","    /**","     * Update the icon classes","     */","    _setIcon: function(node, className) {","        if (node) {","            iconNode = node.one('.yui3-treeview-icon');","","            if (iconNode) {","                iconNode.removeClass('yui3-treeview-icon');","                iconNode.addClass(className);","                iconNode.addClass('libbit-treeview-icon');","            }","        }","    }","","}, {","    ATTRS: {","        // Tree header, optional.","        header : {","            value: null","        },","","        // The data object containing the models.","        data : {","            value: null","        },","","        // The original tree object.","        tree : {","            value: null","        },","","        width : {","            value: null","        },","","        height : {","            value: null","        },","","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","","        // State attribute.","        iconClicked : {","            value: false","        },","","        /**","         * A filter to apply to the tree","         *","         * @attribute {Object} filter","         */","        filter: {","            value : {","                type: null,","                attr: null,","                value: []","            }","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"transition\",","        \"libbit-model-tree\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"widget\",","        \"gallery-sm-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"11":0,"41":0,"46":0,"47":0,"48":0,"50":0,"51":0,"54":0,"58":0,"62":0,"66":0,"67":0,"69":0,"70":0,"72":0,"76":0,"81":0,"83":0,"85":0,"86":0,"88":0,"89":0,"91":0,"92":0,"95":0,"96":0,"99":0,"104":0,"106":0,"109":0,"110":0,"114":0,"116":0,"117":0,"119":0,"123":0,"124":0,"126":0,"127":0,"131":0,"132":0,"133":0,"135":0,"136":0,"143":0,"145":0,"146":0,"148":0,"149":0,"152":0,"153":0,"154":0,"155":0,"157":0,"158":0,"165":0,"166":0,"174":0,"177":0,"178":0,"182":0,"183":0,"185":0,"187":0,"190":0,"191":0,"193":0,"194":0,"195":0,"198":0,"199":0,"201":0,"202":0,"203":0,"204":0,"205":0,"209":0,"210":0,"211":0,"214":0,"216":0,"217":0,"220":0,"223":0,"225":0,"230":0,"231":0,"232":0,"235":0,"236":0,"245":0,"246":0,"248":0,"249":0,"250":0,"251":0,"307":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:40":0,"destroy:57":0,"getNodes:61":0,"renderUI:65":0,"_renderTree:75":0,"_bindEvents:113":0,"_handleExpand:122":0,"_handleCollapse:130":0,"(anonymous 2):145":0,"bindUI:142":0,"refresh:164":0,"_processTree:173":0,"_setIcon:244":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 99;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 14;
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 1);
YUI.add('libbit-treeview', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 3);
var TreeView;

// TODO: Bind model events
// TODO: Table support, style odd/even
// TODO: Fix overflow CSS for Firefox
// TODO: Implement sorting
// TODO: Document data input
// TODO: Disable text selection within treenodes
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 11);
TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter, Y.Libbit.TreeView.DD ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    /**
    * Reference to all nodes (for use in extensions)
    **/
    _treeNodes: [],

    /**
    * Selected node
    **/
    selectedNode: null,

    /**
    * Icon (className) mapping for diffrent types of models
    **/
    _iconMap: [],

    /**
     * Reference pointer to events
     */
    afterEvent: null,
    openEvent: null,
    closeEvent: null,

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 40);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 41);
var contentBox = this.get('contentBox'),
            width      = this.get('width'),
            height     = this.get('height'),
            model      = this.get('data');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 46);
contentBox.setStyle('width', width);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 47);
contentBox.setStyle('height', height);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 48);
contentBox.setStyle('overflow', 'auto');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 50);
if (model.get('icons')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 51);
this._iconMap = model.get('icons');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 54);
this.tc = Y.Node.create('<div class="tc"></div>');
    },

    destroy: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "destroy", 57);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 58);
this.get('tree').destroy({ remove: true });
    },

    getNodes: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "getNodes", 61);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
return this._treeNodes;
    },

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 65);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
this.get('boundingBox').addClass('libbit-treeview-outer-container');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 67);
this.get('srcNode').append(this.tc).addClass('libbit-treeview-inner-container');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 69);
if (this.get('header')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
this.tc.prepend('<div class="nav-header">' + this.get('header') + '</div>');
        }
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 72);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 75);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
var filter = this.get('filter'),
            model  = this.get('data'),
            items,
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 81);
items = filter && filter.type ? model.filterByAttr(filter.type, filter.attr, filter.value) : model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
this._treeNodes = [];

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 85);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
tree = this.get('tree');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 88);
tree.detach('open', this._handleExpand);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 89);
tree.detach('close', this._handleCollapse);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 91);
while (tree.rootNode.children.length > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 92);
tree.removeNode(tree.rootNode.children[0]);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 95);
for (var i in items) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 96);
tree.insertNode(tree.rootNode, items[i]);
            }
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 99);
tree = new Y.TreeView({
                container: this.get('srcNode').one('.tc'),
                nodes: items
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 104);
this.set('tree', tree);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 106);
tree.render();
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 109);
this._processTree(tree.rootNode);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 110);
this._bindEvents();
    },

    _bindEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_bindEvents", 113);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 114);
var tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
tree.on('open', this._handleExpand, this);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 117);
tree.on('close', this._handleCollapse, this);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 119);
this.fire('Finished');
    },

    _handleExpand: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 122);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 123);
var tree = this.get('tree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 124);
var li = tree.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 126);
this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 127);
this.fire('expand', e);
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 130);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 131);
var tree = this.get('tree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
var li = tree.getHTMLNode(e.node);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 133);
var stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 135);
delete this._stateMap[stateIndex];
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 136);
this.fire('collapse', e);
    },

    /**
    * Folderstate icons
    **/
    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 142);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 143);
var tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 145);
tree.on(['open', 'close'], function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 145);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 146);
var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 148);
if (e.type === 'treeView:close') {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 149);
iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 152);
if (iconEl) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 153);
if (e.type === 'treeView:close') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 154);
iconEl.removeClass('icon-folder-open');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
iconEl.addClass('icon-folder-close');
                } else {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 157);
iconEl.removeClass('icon-folder-close');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 158);
iconEl.addClass('icon-folder-open');
                }
            }
        });
    },

    refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "refresh", 164);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 165);
this._renderTree();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 166);
this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_processTree", 173);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 174);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 177);
if (rootNode.children.length) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 178);
rootNode.open();
        }

        // Attach data to the nodes
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 182);
for (var i in rootNode.children) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 183);
var treeNode = rootNode.children[i],
                li = tree.getHTMLNode(treeNode);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 185);
model = treeNode.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
self._treeNodes.push(treeNode);

            // Fix the width to be 100%.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
var count = 0;
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 191);
var current = li.ancestor('.yui3-treeview-children');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
while (current.ancestor('.yui3-treeview-children')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
count++;
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
current = current.ancestor('.yui3-treeview-children');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
if (count > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
var ml = count * 20;

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
if (ml) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 202);
li.setStyle('marginLeft', -ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 203);
li.one('div').setStyle('paddingLeft', ml + 20);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 204);
li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);
                }
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 209);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
li.setAttribute('data-yui3-modelId', model.get('id'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
li.setAttribute('data-yui3-record', model.get('clientId'));

                // Set the title for mouseovers on long labels
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
li.set('title', treeNode.label);

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 216);
if (typeof(self._iconMap[model.name]) !== 'undefined') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 217);
self._setIcon(li, self._iconMap[model.name]);
                }

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 220);
li.setData({ model: model });
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 223);
if (treeNode.children) {
                // Walk through the tree recursively
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 225);
self._processTree(treeNode);
            }
        }

        // Restore state of this node.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 230);
if (rootNode !== tree.rootNode) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 231);
if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 232);
rootNode.close();
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 235);
if (self.selectedNode === rootNode.data.get('id')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
rootNode.select();
            }
        }
    },

    /**
     * Update the icon classes
     */
    _setIcon: function(node, className) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setIcon", 244);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 245);
if (node) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 246);
iconNode = node.one('.yui3-treeview-icon');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 248);
if (iconNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 249);
iconNode.removeClass('yui3-treeview-icon');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 250);
iconNode.addClass(className);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 251);
iconNode.addClass('libbit-treeview-icon');
            }
        }
    }

}, {
    ATTRS: {
        // Tree header, optional.
        header : {
            value: null
        },

        // The data object containing the models.
        data : {
            value: null
        },

        // The original tree object.
        tree : {
            value: null
        },

        width : {
            value: null
        },

        height : {
            value: null
        },

        // Wether to render all nodes or just branches.
        renderLeaves: {
            value: true
        },

        // State attribute.
        iconClicked : {
            value: false
        },

        /**
         * A filter to apply to the tree
         *
         * @attribute {Object} filter
         */
        filter: {
            value : {
                type: null,
                attr: null,
                value: []
            }
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 307);
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "transition",
        "libbit-model-tree",
        "libbit-treeview-filter",
        "libbit-treeview-anim",
        "libbit-treeview-select",
        "libbit-treeview-dd",
        "widget",
        "gallery-sm-treeview"
    ],
    "skinnable": true
});
