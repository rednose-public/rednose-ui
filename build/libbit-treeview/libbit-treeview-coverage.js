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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter, Y.Libbit.TreeView.DD ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Reference to all nodes (for use in extensions)","    **/","    _treeNodes: [],","","    /**","    * Selected node","    **/","    selectedNode: null,","","    /**","    * Icon (className) mapping for diffrent types of models","    **/","    _iconMap: [],","","    /**","     * Reference pointer to events","     */","    afterEvent: null,","    openEvent: null,","    closeEvent: null,","","    initializer: function () {","        var contentBox = this.get('contentBox'),","            width      = this.get('width'),","            height     = this.get('height'),","            model      = this.get('data');","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","        contentBox.setStyle('overflow', 'auto');","","        if (model.get('icons')) {","            this._iconMap = model.get('icons');","        }","    },","","    getNodes: function() {","        return this._treeNodes;","    },","","    renderUI: function () {","        if (this.get('header')) {","            this.get('srcNode').prepend('<div class=\"nav-header\">' + this.get('header') + '</div>');","        }","","        this._renderTree();","    },","","    _renderTree: function () {","        var model = this.get('data'),","            tree;","","        items = model.get('items');","","        this._treeNodes = [];","","        if (this.get('tree')) {","            tree = this.get('tree');","","            this.openEvent.detach();","            this.closeEvent.detach();","","            while (tree.rootNode.children.length > 0) {","                tree.removeNode(tree.rootNode.children[0]);","            }","","            for (var i in items) {","                tree.insertNode(tree.rootNode, items[i]);","            }","        } else {","            tree = new Y.TreeView({","                container: this.get('srcNode'),","                nodes: items","            });","","            this.set('tree', tree);","        }","","        tree.render();","","        this._processTree(tree.rootNode);","        this._bindEvents();","    },","","    _bindEvents: function() {","        var tree = this.get('tree');","        var self = this;","","        this.openEvent = tree.on('open', function(e) {","            var li = tree.getHTMLNode(e.node);","","            self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));","            self.fire('expend', e);","        });","","        this.closeEvent = tree.on('close', function(e) {","            var li = tree.getHTMLNode(e.node);","            var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));","","            delete self._stateMap[stateIndex];","            self.fire('collapse', e);","        });","","        this.fire('Finished');","    },","","    /**","    * Folderstate icons","    **/","    bindUI: function () {","        var tree = this.get('tree');","","        tree.on(['open', 'close'], function(e) {","            var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');","","            if (e.type == 'treeView:close') {","                iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');","            }","","            if (iconEl) {","                if (e.type == 'treeView:close') {","                    iconEl.removeClass('icon-folder-open');","                    iconEl.addClass('icon-folder-close');","                } else {","                    iconEl.removeClass('icon-folder-close');","                    iconEl.addClass('icon-folder-open');","                }","            }","        });","    },","","    refresh: function () {","        this.fire('beforeRefresh');","","        this._renderTree();","","        this.fire('refresh');","    },","","    /**","     * Store a reference to the model for each tree node and restore","     * the state of the treeNodes (opened and selected node(s)).","     */","    _processTree: function (rootNode) {","        var self = this,","            tree = this.get('tree');","","        if (rootNode.children.length) {","            rootNode.open();","        }","        // Attach data to the nodes","        for (var i in rootNode.children) {","            var treeNode = rootNode.children[i],","                li = tree.getHTMLNode(treeNode);","                model = treeNode.data;","","            self._treeNodes.push(treeNode);","","            // Fix the width to be 100%.","            var count = 0;","            var current = li.ancestor('.yui3-treeview-children');","","            while (current.ancestor('.yui3-treeview-children')) {","                count++;","                current = current.ancestor('.yui3-treeview-children');","            }","","            if (count > 0) {","                var ml = count * 20;","","                if (ml) {","                    li.setStyle('marginLeft', -ml);","                    li.one('div').setStyle('paddingLeft', ml + 20);","                    li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);","                    li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);","                }","            }","","            if (Y.instanceOf(model, Y.Model)) {","                li.setAttribute('data-yui3-modelId', model.get('id'));","                li.setAttribute('data-yui3-record', model.get('clientId'));","","                if (typeof(self._iconMap[model.name]) != 'undefined') {","                    self._setIcon(li, self._iconMap[model.name]);","                }","","                li.setData({ model: model });","            }","","            if (treeNode.children) {","                // Walk through the tree recursively","                self._processTree(treeNode);","            }","        }","","        // Restore state of this node.","        if (rootNode !== tree.rootNode) {","            if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {","                rootNode.close();","            }","","            if (self.selectedNode === rootNode.data.get('id')) {","                rootNode.select();","            }","        }","    },","","    /**","     * Update the icon classes","     */","    _setIcon: function(node, className) {","        if (node) {","            iconNode = node.one('.yui3-treeview-icon');","","            if (iconNode) {","                iconNode.removeClass('yui3-treeview-icon');","                iconNode.addClass(className);","                iconNode.addClass('libbit-treeview-icon');","            }","        }","    }","","}, {","    ATTRS: {","        // Tree header, optional.","        header : {","            value: null","        },","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        width : {","            value: null","        },","        height : {","            value: null","        },","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"transition\",","        \"libbit-model-tree\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"widget\",","        \"gallery-sm-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"11":0,"41":0,"46":0,"47":0,"48":0,"50":0,"51":0,"56":0,"60":0,"61":0,"64":0,"68":0,"71":0,"73":0,"75":0,"76":0,"78":0,"79":0,"81":0,"82":0,"85":0,"86":0,"89":0,"94":0,"97":0,"99":0,"100":0,"104":0,"105":0,"107":0,"108":0,"110":0,"111":0,"114":0,"115":0,"116":0,"118":0,"119":0,"122":0,"129":0,"131":0,"132":0,"134":0,"135":0,"138":0,"139":0,"140":0,"141":0,"143":0,"144":0,"151":0,"153":0,"155":0,"163":0,"166":0,"167":0,"170":0,"171":0,"173":0,"175":0,"178":0,"179":0,"181":0,"182":0,"183":0,"186":0,"187":0,"189":0,"190":0,"191":0,"192":0,"193":0,"197":0,"198":0,"199":0,"201":0,"202":0,"205":0,"208":0,"210":0,"215":0,"216":0,"217":0,"220":0,"221":0,"230":0,"231":0,"233":0,"234":0,"235":0,"236":0,"273":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:40":0,"getNodes:55":0,"renderUI:59":0,"_renderTree:67":0,"(anonymous 2):107":0,"(anonymous 3):114":0,"_bindEvents:103":0,"(anonymous 4):131":0,"bindUI:128":0,"refresh:150":0,"_processTree:162":0,"_setIcon:229":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 94;
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
if (this.get('header')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
this.get('srcNode').prepend('<div class="nav-header">' + this.get('header') + '</div>');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 64);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 67);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 68);
var model = this.get('data'),
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 71);
items = model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 73);
this._treeNodes = [];

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
tree = this.get('tree');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 78);
this.openEvent.detach();
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 79);
this.closeEvent.detach();

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 81);
while (tree.rootNode.children.length > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 82);
tree.removeNode(tree.rootNode.children[0]);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 85);
for (var i in items) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
tree.insertNode(tree.rootNode, items[i]);
            }
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 89);
tree = new Y.TreeView({
                container: this.get('srcNode'),
                nodes: items
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 94);
this.set('tree', tree);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 99);
this._processTree(tree.rootNode);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 100);
this._bindEvents();
    },

    _bindEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_bindEvents", 103);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 104);
var tree = this.get('tree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 105);
var self = this;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
this.openEvent = tree.on('open', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 107);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 108);
var li = tree.getHTMLNode(e.node);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 110);
self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 111);
self.fire('expend', e);
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 114);
this.closeEvent = tree.on('close', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 114);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 115);
var li = tree.getHTMLNode(e.node);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 118);
delete self._stateMap[stateIndex];
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 119);
self.fire('collapse', e);
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 122);
this.fire('Finished');
    },

    /**
    * Folderstate icons
    **/
    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 128);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 129);
var tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 131);
tree.on(['open', 'close'], function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 131);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 134);
if (e.type == 'treeView:close') {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 135);
iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 138);
if (iconEl) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 139);
if (e.type == 'treeView:close') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 140);
iconEl.removeClass('icon-folder-open');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 141);
iconEl.addClass('icon-folder-close');
                } else {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 143);
iconEl.removeClass('icon-folder-close');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 144);
iconEl.addClass('icon-folder-open');
                }
            }
        });
    },

    refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "refresh", 150);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 151);
this.fire('beforeRefresh');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 153);
this._renderTree();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_processTree", 162);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 163);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 166);
if (rootNode.children.length) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 167);
rootNode.open();
        }
        // Attach data to the nodes
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 170);
for (var i in rootNode.children) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 171);
var treeNode = rootNode.children[i],
                li = tree.getHTMLNode(treeNode);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 173);
model = treeNode.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 175);
self._treeNodes.push(treeNode);

            // Fix the width to be 100%.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 178);
var count = 0;
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 179);
var current = li.ancestor('.yui3-treeview-children');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 181);
while (current.ancestor('.yui3-treeview-children')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 182);
count++;
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 183);
current = current.ancestor('.yui3-treeview-children');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 186);
if (count > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
var ml = count * 20;

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 189);
if (ml) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
li.setStyle('marginLeft', -ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 191);
li.one('div').setStyle('paddingLeft', ml + 20);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 192);
li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);
                }
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 197);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
li.setAttribute('data-yui3-modelId', model.get('id'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
li.setAttribute('data-yui3-record', model.get('clientId'));

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
if (typeof(self._iconMap[model.name]) != 'undefined') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 202);
self._setIcon(li, self._iconMap[model.name]);
                }

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
li.setData({ model: model });
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 208);
if (treeNode.children) {
                // Walk through the tree recursively
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
self._processTree(treeNode);
            }
        }

        // Restore state of this node.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
if (rootNode !== tree.rootNode) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 216);
if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 217);
rootNode.close();
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 220);
if (self.selectedNode === rootNode.data.get('id')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 221);
rootNode.select();
            }
        }
    },

    /**
     * Update the icon classes
     */
    _setIcon: function(node, className) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setIcon", 229);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 230);
if (node) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 231);
iconNode = node.one('.yui3-treeview-icon');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 233);
if (iconNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 234);
iconNode.removeClass('yui3-treeview-icon');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 235);
iconNode.addClass(className);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 273);
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
