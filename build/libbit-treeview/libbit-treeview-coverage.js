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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter, Y.Libbit.TreeView.DD ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Reference to all nodes (for use in extensions)","    **/","    _treeNodes: [],","","    /**","    * Selected node","    **/","    selectedNode: null,","","    /**","    * Icon (className) mapping for diffrent types of models","    **/","    _iconMap: [],","","    /**","     * Reference pointer to events","     */","    afterEvent: null,","    openEvent: null,","    closeEvent: null,","","    initializer: function () {","        var contentBox = this.get('contentBox'),","            width      = this.get('width'),","            height     = this.get('height'),","            model      = this.get('data');","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","        contentBox.setStyle('overflow', 'auto');","","        if (model.get('icons')) {","            this._iconMap = model.get('icons');","        }","    },","","    getNodes: function() {","        return this._treeNodes;","    },","","    renderUI: function () {","        this.get('boundingBox').addClass('libbit-treeview-outer-container');","        this.get('srcNode').addClass('libbit-treeview-inner-container');","","        if (this.get('header')) {","            this.get('srcNode').prepend('<div class=\"nav-header\">' + this.get('header') + '</div>');","        }","        this._renderTree();","    },","","    _renderTree: function () {","        var model = this.get('data'),","            tree;","","        items = model.get('items');","","        this._treeNodes = [];","","        if (this.get('tree')) {","            tree = this.get('tree');","","            this.openEvent.detach();","            this.closeEvent.detach();","","            while (tree.rootNode.children.length > 0) {","                tree.removeNode(tree.rootNode.children[0]);","            }","","            for (var i in items) {","                tree.insertNode(tree.rootNode, items[i]);","            }","        } else {","            tree = new Y.TreeView({","                container: this.get('srcNode'),","                nodes: items","            });","","            this.set('tree', tree);","        }","","        tree.render();","","        this._processTree(tree.rootNode);","        this._bindEvents();","    },","","    _bindEvents: function() {","        var tree = this.get('tree');","        var self = this;","","        this.openEvent = tree.on('open', function(e) {","            var li = tree.getHTMLNode(e.node);","","            self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));","            self.fire('expend', e);","        });","","        this.closeEvent = tree.on('close', function(e) {","            var li = tree.getHTMLNode(e.node);","            var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));","","            delete self._stateMap[stateIndex];","            self.fire('collapse', e);","        });","","        this.fire('Finished');","    },","","    /**","    * Folderstate icons","    **/","    bindUI: function () {","        var tree = this.get('tree');","","        tree.on(['open', 'close'], function(e) {","            var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');","","            if (e.type == 'treeView:close') {","                iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');","            }","","            if (iconEl) {","                if (e.type == 'treeView:close') {","                    iconEl.removeClass('icon-folder-open');","                    iconEl.addClass('icon-folder-close');","                } else {","                    iconEl.removeClass('icon-folder-close');","                    iconEl.addClass('icon-folder-open');","                }","            }","        });","    },","","    refresh: function () {","        this.fire('beforeRefresh');","","        this._renderTree();","","        this.fire('refresh');","    },","","    /**","     * Store a reference to the model for each tree node and restore","     * the state of the treeNodes (opened and selected node(s)).","     */","    _processTree: function (rootNode) {","        var self = this,","            tree = this.get('tree');","","        if (rootNode.children.length) {","            rootNode.open();","        }","        // Attach data to the nodes","        for (var i in rootNode.children) {","            var treeNode = rootNode.children[i],","                li = tree.getHTMLNode(treeNode);","                model = treeNode.data;","","            self._treeNodes.push(treeNode);","","            // Fix the width to be 100%.","            var count = 0;","            var current = li.ancestor('.yui3-treeview-children');","","            while (current.ancestor('.yui3-treeview-children')) {","                count++;","                current = current.ancestor('.yui3-treeview-children');","            }","","            if (count > 0) {","                var ml = count * 20;","","                if (ml) {","                    li.setStyle('marginLeft', -ml);","                    li.one('div').setStyle('paddingLeft', ml + 20);","                    li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);","                    li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);","                }","            }","","            if (Y.instanceOf(model, Y.Model)) {","                li.setAttribute('data-yui3-modelId', model.get('id'));","                li.setAttribute('data-yui3-record', model.get('clientId'));","","                // Set the title for mouseovers on long labels","                li.set('title', treeNode.label);","","                if (typeof(self._iconMap[model.name]) !== 'undefined') {","                    self._setIcon(li, self._iconMap[model.name]);","                }","","                li.setData({ model: model });","            }","","            if (treeNode.children) {","                // Walk through the tree recursively","                self._processTree(treeNode);","            }","        }","","        // Restore state of this node.","        if (rootNode !== tree.rootNode) {","            if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {","                rootNode.close();","            }","","            if (self.selectedNode === rootNode.data.get('id')) {","                rootNode.select();","            }","        }","    },","","    /**","     * Update the icon classes","     */","    _setIcon: function(node, className) {","        if (node) {","            iconNode = node.one('.yui3-treeview-icon');","","            if (iconNode) {","                iconNode.removeClass('yui3-treeview-icon');","                iconNode.addClass(className);","                iconNode.addClass('libbit-treeview-icon');","            }","        }","    }","","}, {","    ATTRS: {","        // Tree header, optional.","        header : {","            value: null","        },","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        width : {","            value: null","        },","        height : {","            value: null","        },","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"transition\",","        \"libbit-model-tree\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"widget\",","        \"gallery-sm-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"11":0,"41":0,"46":0,"47":0,"48":0,"50":0,"51":0,"56":0,"60":0,"61":0,"63":0,"64":0,"66":0,"70":0,"73":0,"75":0,"77":0,"78":0,"80":0,"81":0,"83":0,"84":0,"87":0,"88":0,"91":0,"96":0,"99":0,"101":0,"102":0,"106":0,"107":0,"109":0,"110":0,"112":0,"113":0,"116":0,"117":0,"118":0,"120":0,"121":0,"124":0,"131":0,"133":0,"134":0,"136":0,"137":0,"140":0,"141":0,"142":0,"143":0,"145":0,"146":0,"153":0,"155":0,"157":0,"165":0,"168":0,"169":0,"172":0,"173":0,"175":0,"177":0,"180":0,"181":0,"183":0,"184":0,"185":0,"188":0,"189":0,"191":0,"192":0,"193":0,"194":0,"195":0,"199":0,"200":0,"201":0,"204":0,"206":0,"207":0,"210":0,"213":0,"215":0,"220":0,"221":0,"222":0,"225":0,"226":0,"235":0,"236":0,"238":0,"239":0,"240":0,"241":0,"278":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:40":0,"getNodes:55":0,"renderUI:59":0,"_renderTree:69":0,"(anonymous 2):109":0,"(anonymous 3):116":0,"_bindEvents:105":0,"(anonymous 4):133":0,"bindUI:130":0,"refresh:152":0,"_processTree:164":0,"_setIcon:234":0,"(anonymous 1):1":0};
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
var model = this.get('data'),
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 73);
items = model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
this._treeNodes = [];

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 77);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 78);
tree = this.get('tree');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 80);
this.openEvent.detach();
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 81);
this.closeEvent.detach();

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
while (tree.rootNode.children.length > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 84);
tree.removeNode(tree.rootNode.children[0]);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 87);
for (var i in items) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 88);
tree.insertNode(tree.rootNode, items[i]);
            }
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 91);
tree = new Y.TreeView({
                container: this.get('srcNode'),
                nodes: items
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 96);
this.set('tree', tree);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 99);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
this._processTree(tree.rootNode);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
this._bindEvents();
    },

    _bindEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_bindEvents", 105);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 106);
var tree = this.get('tree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
var self = this;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 109);
this.openEvent = tree.on('open', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 109);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 110);
var li = tree.getHTMLNode(e.node);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 112);
self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 113);
self.fire('expend', e);
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
this.closeEvent = tree.on('close', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 116);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 117);
var li = tree.getHTMLNode(e.node);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 118);
var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 120);
delete self._stateMap[stateIndex];
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 121);
self.fire('collapse', e);
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 124);
this.fire('Finished');
    },

    /**
    * Folderstate icons
    **/
    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 130);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 131);
var tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 133);
tree.on(['open', 'close'], function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 133);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 134);
var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 136);
if (e.type == 'treeView:close') {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 137);
iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 140);
if (iconEl) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 141);
if (e.type == 'treeView:close') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 142);
iconEl.removeClass('icon-folder-open');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 143);
iconEl.addClass('icon-folder-close');
                } else {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 145);
iconEl.removeClass('icon-folder-close');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 146);
iconEl.addClass('icon-folder-open');
                }
            }
        });
    },

    refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "refresh", 152);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 153);
this.fire('beforeRefresh');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
this._renderTree();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 157);
this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_processTree", 164);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 165);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 168);
if (rootNode.children.length) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 169);
rootNode.open();
        }
        // Attach data to the nodes
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 172);
for (var i in rootNode.children) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 173);
var treeNode = rootNode.children[i],
                li = tree.getHTMLNode(treeNode);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 175);
model = treeNode.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 177);
self._treeNodes.push(treeNode);

            // Fix the width to be 100%.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 180);
var count = 0;
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 181);
var current = li.ancestor('.yui3-treeview-children');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 183);
while (current.ancestor('.yui3-treeview-children')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 184);
count++;
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 185);
current = current.ancestor('.yui3-treeview-children');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 188);
if (count > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 189);
var ml = count * 20;

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 191);
if (ml) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 192);
li.setStyle('marginLeft', -ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
li.one('div').setStyle('paddingLeft', ml + 20);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);
                }
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 200);
li.setAttribute('data-yui3-modelId', model.get('id'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
li.setAttribute('data-yui3-record', model.get('clientId'));

                // Set the title for mouseovers on long labels
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 204);
li.set('title', treeNode.label);

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 206);
if (typeof(self._iconMap[model.name]) !== 'undefined') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 207);
self._setIcon(li, self._iconMap[model.name]);
                }

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
li.setData({ model: model });
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 213);
if (treeNode.children) {
                // Walk through the tree recursively
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
self._processTree(treeNode);
            }
        }

        // Restore state of this node.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 220);
if (rootNode !== tree.rootNode) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 221);
if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 222);
rootNode.close();
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 225);
if (self.selectedNode === rootNode.data.get('id')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
rootNode.select();
            }
        }
    },

    /**
     * Update the icon classes
     */
    _setIcon: function(node, className) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setIcon", 234);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 235);
if (node) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
iconNode = node.one('.yui3-treeview-icon');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 238);
if (iconNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 239);
iconNode.removeClass('yui3-treeview-icon');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 240);
iconNode.addClass(className);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 241);
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
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 278);
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
