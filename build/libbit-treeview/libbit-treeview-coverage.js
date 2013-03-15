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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter, Y.Libbit.TreeView.DD ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Reference to all nodes (for use in extensions)","    **/","    _treeNodes: [],","","    /**","    * Selected node","    **/","    selectedNode: null,","","    /**","    * Icon (className) mapping for diffrent types of models","    **/","    _iconMap: [],","","    /**","     * Reference pointer to events","     */","    afterEvent: null,","    openEvent: null,","    closeEvent: null,","","    initializer: function () {","        var contentBox = this.get('contentBox'),","            width      = this.get('width'),","            height     = this.get('height'),","            model      = this.get('data');","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","        contentBox.setStyle('overflow', 'auto');","","        if (model.get('icons')) {","            this._iconMap = model.get('icons');","        }","    },","","    getNodes: function() {","        return this._treeNodes;","    },","","    renderUI: function () {","        this.get('boundingBox').addClass('libbit-treeview-outer-container');","        this.get('srcNode').addClass('libbit-treeview-inner-container');","","        if (this.get('header')) {","            this.get('srcNode').prepend('<div class=\"nav-header\">' + this.get('header') + '</div>');","        }","        this._renderTree();","    },","","    _renderTree: function () {","        var filter = this.get('filter'),","            model  = this.get('data'),","            items,","            tree;","","        items = filter && filter.type ? model.filterByAttr(filter.type, filter.attr, filter.value) : model.get('items');","","        this._treeNodes = [];","","        if (this.get('tree')) {","            tree = this.get('tree');","","            tree.detach('open', this._handleExpand);","            tree.detach('close', this._handleCollapse);","","            while (tree.rootNode.children.length > 0) {","                tree.removeNode(tree.rootNode.children[0]);","            }","","            for (var i in items) {","                tree.insertNode(tree.rootNode, items[i]);","            }","        } else {","            tree = new Y.TreeView({","                container: this.get('srcNode'),","                nodes: items","            });","","            this.set('tree', tree);","","            tree.render();","        }","","        this._processTree(tree.rootNode);","        this._bindEvents();","    },","","    _bindEvents: function() {","        var tree = this.get('tree');","","        tree.on('open', this._handleExpand, this);","        tree.on('close', this._handleCollapse, this);","","        this.fire('Finished');","    },","","    _handleExpand: function (e) {","        var tree = this.get('tree');","        var li = tree.getHTMLNode(e.node);","","        this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));","        this.fire('expand', e);","    },","","    _handleCollapse: function (e) {","        var tree = this.get('tree');","        var li = tree.getHTMLNode(e.node);","        var stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));","","        delete this._stateMap[stateIndex];","        this.fire('collapse', e);","    },","","    /**","    * Folderstate icons","    **/","    bindUI: function () {","        var tree = this.get('tree');","","        tree.on(['open', 'close'], function(e) {","            var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');","","            if (e.type === 'treeView:close') {","                iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');","            }","","            if (iconEl) {","                if (e.type === 'treeView:close') {","                    iconEl.removeClass('icon-folder-open');","                    iconEl.addClass('icon-folder-close');","                } else {","                    iconEl.removeClass('icon-folder-close');","                    iconEl.addClass('icon-folder-open');","                }","            }","        });","    },","","    refresh: function () {","        this._renderTree();","        this.fire('refresh');","    },","","    /**","     * Store a reference to the model for each tree node and restore","     * the state of the treeNodes (opened and selected node(s)).","     */","    _processTree: function (rootNode) {","        var self = this,","            tree = this.get('tree');","","        if (rootNode.children.length) {","            rootNode.open();","        }","","        // Attach data to the nodes","        for (var i in rootNode.children) {","            var treeNode = rootNode.children[i],","                li = tree.getHTMLNode(treeNode);","                model = treeNode.data;","","            self._treeNodes.push(treeNode);","","            // Fix the width to be 100%.","            var count = 0;","            var current = li.ancestor('.yui3-treeview-children');","","            while (current.ancestor('.yui3-treeview-children')) {","                count++;","                current = current.ancestor('.yui3-treeview-children');","            }","","            if (count > 0) {","                var ml = count * 20;","","                if (ml) {","                    li.setStyle('marginLeft', -ml);","                    li.one('div').setStyle('paddingLeft', ml + 20);","                    li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);","                    li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);","                }","            }","","            if (Y.instanceOf(model, Y.Model)) {","                li.setAttribute('data-yui3-modelId', model.get('id'));","                li.setAttribute('data-yui3-record', model.get('clientId'));","","                // Set the title for mouseovers on long labels","                li.set('title', treeNode.label);","","                if (typeof(self._iconMap[model.name]) !== 'undefined') {","                    self._setIcon(li, self._iconMap[model.name]);","                }","","                li.setData({ model: model });","            }","","            if (treeNode.children) {","                // Walk through the tree recursively","                self._processTree(treeNode);","            }","        }","","        // Restore state of this node.","        if (rootNode !== tree.rootNode) {","            if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {","                rootNode.close();","            }","","            if (self.selectedNode === rootNode.data.get('id')) {","                rootNode.select();","            }","        }","    },","","    /**","     * Update the icon classes","     */","    _setIcon: function(node, className) {","        if (node) {","            iconNode = node.one('.yui3-treeview-icon');","","            if (iconNode) {","                iconNode.removeClass('yui3-treeview-icon');","                iconNode.addClass(className);","                iconNode.addClass('libbit-treeview-icon');","            }","        }","    }","","}, {","    ATTRS: {","        // Tree header, optional.","        header : {","            value: null","        },","","        // The data object containing the models.","        data : {","            value: null","        },","","        // The original tree object.","        tree : {","            value: null","        },","","        width : {","            value: null","        },","","        height : {","            value: null","        },","","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","","        // State attribute.","        iconClicked : {","            value: false","        },","","        /**","         * A filter to apply to the tree","         *","         * @attribute {Object} filter","         */","        filter: {","            value : {","                type: null,","                attr: null,","                value: []","            }","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"transition\",","        \"libbit-model-tree\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"widget\",","        \"gallery-sm-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"11":0,"41":0,"46":0,"47":0,"48":0,"50":0,"51":0,"56":0,"60":0,"61":0,"63":0,"64":0,"66":0,"70":0,"75":0,"77":0,"79":0,"80":0,"82":0,"83":0,"85":0,"86":0,"89":0,"90":0,"93":0,"98":0,"100":0,"103":0,"104":0,"108":0,"110":0,"111":0,"113":0,"117":0,"118":0,"120":0,"121":0,"125":0,"126":0,"127":0,"129":0,"130":0,"137":0,"139":0,"140":0,"142":0,"143":0,"146":0,"147":0,"148":0,"149":0,"151":0,"152":0,"159":0,"160":0,"168":0,"171":0,"172":0,"176":0,"177":0,"179":0,"181":0,"184":0,"185":0,"187":0,"188":0,"189":0,"192":0,"193":0,"195":0,"196":0,"197":0,"198":0,"199":0,"203":0,"204":0,"205":0,"208":0,"210":0,"211":0,"214":0,"217":0,"219":0,"224":0,"225":0,"226":0,"229":0,"230":0,"239":0,"240":0,"242":0,"243":0,"244":0,"245":0,"301":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:40":0,"getNodes:55":0,"renderUI:59":0,"_renderTree:69":0,"_bindEvents:107":0,"_handleExpand:116":0,"_handleCollapse:124":0,"(anonymous 2):139":0,"bindUI:136":0,"refresh:158":0,"_processTree:167":0,"_setIcon:238":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 97;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 13;
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
    },

    getNodes: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "getNodes", 55);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 56);
return this._treeNodes;
    },

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 59);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 60);
this.get('boundingBox').addClass('libbit-treeview-outer-container');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
this.get('srcNode').addClass('libbit-treeview-inner-container');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 63);
if (this.get('header')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 64);
this.get('srcNode').prepend('<div class="nav-header">' + this.get('header') + '</div>');
        }
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 69);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
var filter = this.get('filter'),
            model  = this.get('data'),
            items,
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
items = filter && filter.type ? model.filterByAttr(filter.type, filter.attr, filter.value) : model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 77);
this._treeNodes = [];

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 79);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 80);
tree = this.get('tree');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 82);
tree.detach('open', this._handleExpand);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
tree.detach('close', this._handleCollapse);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 85);
while (tree.rootNode.children.length > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
tree.removeNode(tree.rootNode.children[0]);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 89);
for (var i in items) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 90);
tree.insertNode(tree.rootNode, items[i]);
            }
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 93);
tree = new Y.TreeView({
                container: this.get('srcNode'),
                nodes: items
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 98);
this.set('tree', tree);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 100);
tree.render();
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 103);
this._processTree(tree.rootNode);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 104);
this._bindEvents();
    },

    _bindEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_bindEvents", 107);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 108);
var tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 110);
tree.on('open', this._handleExpand, this);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 111);
tree.on('close', this._handleCollapse, this);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 113);
this.fire('Finished');
    },

    _handleExpand: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 116);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 117);
var tree = this.get('tree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 118);
var li = tree.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 120);
this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 121);
this.fire('expand', e);
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 124);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 125);
var tree = this.get('tree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 126);
var li = tree.getHTMLNode(e.node);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 127);
var stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 129);
delete this._stateMap[stateIndex];
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 130);
this.fire('collapse', e);
    },

    /**
    * Folderstate icons
    **/
    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 136);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 137);
var tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 139);
tree.on(['open', 'close'], function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 139);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 140);
var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 142);
if (e.type === 'treeView:close') {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 143);
iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 146);
if (iconEl) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 147);
if (e.type === 'treeView:close') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 148);
iconEl.removeClass('icon-folder-open');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 149);
iconEl.addClass('icon-folder-close');
                } else {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 151);
iconEl.removeClass('icon-folder-close');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 152);
iconEl.addClass('icon-folder-open');
                }
            }
        });
    },

    refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "refresh", 158);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 159);
this._renderTree();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 160);
this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_processTree", 167);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 168);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 171);
if (rootNode.children.length) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 172);
rootNode.open();
        }

        // Attach data to the nodes
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 176);
for (var i in rootNode.children) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 177);
var treeNode = rootNode.children[i],
                li = tree.getHTMLNode(treeNode);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 179);
model = treeNode.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 181);
self._treeNodes.push(treeNode);

            // Fix the width to be 100%.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 184);
var count = 0;
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 185);
var current = li.ancestor('.yui3-treeview-children');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
while (current.ancestor('.yui3-treeview-children')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 188);
count++;
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 189);
current = current.ancestor('.yui3-treeview-children');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 192);
if (count > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
var ml = count * 20;

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
if (ml) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 196);
li.setStyle('marginLeft', -ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 197);
li.one('div').setStyle('paddingLeft', ml + 20);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);
                }
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 203);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 204);
li.setAttribute('data-yui3-modelId', model.get('id'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
li.setAttribute('data-yui3-record', model.get('clientId'));

                // Set the title for mouseovers on long labels
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 208);
li.set('title', treeNode.label);

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
if (typeof(self._iconMap[model.name]) !== 'undefined') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
self._setIcon(li, self._iconMap[model.name]);
                }

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
li.setData({ model: model });
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 217);
if (treeNode.children) {
                // Walk through the tree recursively
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 219);
self._processTree(treeNode);
            }
        }

        // Restore state of this node.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 224);
if (rootNode !== tree.rootNode) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 225);
if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
rootNode.close();
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 229);
if (self.selectedNode === rootNode.data.get('id')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 230);
rootNode.select();
            }
        }
    },

    /**
     * Update the icon classes
     */
    _setIcon: function(node, className) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setIcon", 238);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 239);
if (node) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 240);
iconNode = node.one('.yui3-treeview-icon');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 242);
if (iconNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 243);
iconNode.removeClass('yui3-treeview-icon');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 244);
iconNode.addClass(className);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 245);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 301);
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
