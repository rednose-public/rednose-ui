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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Add scrollable","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Selected node","    **/","    selectedNode: null,","","    /**","    * Reference pointer to events","    */","    afterEvent: null,","    openEvent: null,","    closeEvent: null,","    selectEvent: null,","","    initializer: function () {","        var contentBox = this.get('contentBox'),","            width      = this.get('width'),","            height     = this.get('height'),","            model      = this.get('data');","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","        contentBox.setStyle('overflow', 'auto');","","        if (model) {","            this.afterEvent = model.after('load', this._refresh, this);","        }","    },","","    renderUI: function () {","        var src        = this.get('srcNode'),","            container  = Y.Node.create('<div class=\"libbit-treeview-content\"></div>'),","            sID        = Y.stamp(container);","","        container.set('id', sID);","        src.append(container);","","        this.set('treeContainer', container);","","        this._renderTree();","    },","","    _renderTree: function () {","        var model = this.get('data'),","            tree;","","        items = model.get('items');","","        if (this.get('tree')) {","            tree = this.get('tree');","","            this.openEvent.detach();","            this.closeEvent.detach();","            this.selectEvent.detach();","","            while (tree.rootNode.children.length > 0) {","                tree.removeNode(tree.rootNode.children[0]);","            }","","            for (var i in items) {","                tree.insertNode(tree.rootNode, items[i]);","            }","        } else {","            tree = new Y.TreeView({","                container: this.get('srcNode'),","                nodes: items","            });","","            this.set('tree', tree);","        }","","        tree.render();","","        this._processTree(tree.rootNode);","        this._bindEvents();","","        //this._enhanceCells();","    },","","    _bindEvents: function() {","        var tree = this.get('tree');","        var self = this;","","        this.openEvent = tree.on('open', function(e) {","            var li = tree.getHTMLNode(e.node);","","            self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));","        });","","        this.closeEvent = tree.on('close', function(e) {","            var li = tree.getHTMLNode(e.node);","            var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));","","            delete self._stateMap[stateIndex];","        });","","        this.selectEvent = tree.on('select', function(e) {","            var li = tree.getHTMLNode(e.node);","","            self.selectedNode = parseInt(li.getAttribute('data-yui3-modelId'));","        });","    },","","    bindUI: function () {","        var tree = this.get('tree');","","        tree.on('open', function(e) {","            console.log('...');","        });","        console.log('bindUI');","    },","","    _refresh: function () {","        this._renderTree();","        //this.bindUI();","","        this.fire('refresh');","    },","","    /**","     * Store a reference to the model for each tree node and restore","     * the state of the treeNodes (opened and selected node(s)).","     */","    _processTree: function (rootNode) {","        var self = this,","            tree = this.get('tree');","","        rootNode.open();","","        // Attach data to the nodes","        for (var i in rootNode.children) {","            var treeNode = rootNode.children[i],","                li = tree.getHTMLNode(treeNode);","                model = treeNode.data;","","            if (Y.instanceOf(model, Y.Model)) {","                li.setAttribute('data-yui3-modelId', model.get('id'));","                li.setAttribute('data-yui3-record', model.get('clientId'));","                li.setData({ model: model });","            }","","            if (treeNode.children) {","                // Walk through the tree recursively","                self._processTree(treeNode);","            }","        }","","        // Restore state of this node.","        if (rootNode !== tree.rootNode) {","            if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {","                rootNode.close();","            }","","            if (self.selectedNode === rootNode.data.get('id')) {","                rootNode.select();","            }","        }","    },","","    /**","     * Add the tooltips and render the icons in the treeview.","     */","    _enhanceCells: function () {","        var self        = this,","            boundingBox = this.get('boundingBox');","","        boundingBox.all('.ygtvlabel').each(function (node) {","            var model         = self._getModelFromLabelNode(node),","                content       = node.getContent(),","                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),","                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),","                contentNode,","                icon;","","            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.","            if (Y.TB) {","                if (Y.instanceOf(model, Y.TB.Category)) {","                    icon = 'icon-folder-close';","                } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {","                    icon = 'icon-align-left';","                } else if (Y.instanceOf(model, Y.TB.Image)) {","                    icon = 'icon-picture';","                } else if (Y.instanceOf(model, Y.DocGen.Table)) {","                    icon = 'icon-th';","                }","            }","","            if (icon) {","                contentNode = Y.Node.create('<span class=\"label-container\"><i class=\"' + icon + '\"></i><span> ' + content + '</span></div>');","                node.setContent(contentNode);","            }","","            node.ancestor('.ygtvtable').set('title', content);","","            // Set the expand/colllapse items if necessary.","            if (collapsedNode) {","                self._setCollapsedIcon(collapsedNode);","            }","","            if (expandedNode) {","                self._setExpandedIcon(expandedNode);","            }","        });","    },","","","    /**","     * Add an icon node or update an existing one.","     */","    _setCollapsedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-down');","            a.one('i').addClass('icon-chevron-right');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-right\"></i>'));","        }","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setExpandedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-right');","            a.one('i').addClass('icon-chevron-down');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-down\"></i>'));","        }","    }","","}, {","    ATTRS: {","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        width : {","            value: null","        },","        height : {","            value: null","        },","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"anim\",","        \"libbit-model-tree\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"widget\",","        \"gallery-sm-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"12":0,"33":0,"38":0,"39":0,"40":0,"42":0,"43":0,"48":0,"52":0,"53":0,"55":0,"57":0,"61":0,"64":0,"66":0,"67":0,"69":0,"70":0,"71":0,"73":0,"74":0,"77":0,"78":0,"81":0,"86":0,"89":0,"91":0,"92":0,"98":0,"99":0,"101":0,"102":0,"104":0,"107":0,"108":0,"109":0,"111":0,"114":0,"115":0,"117":0,"122":0,"124":0,"125":0,"127":0,"131":0,"134":0,"142":0,"145":0,"148":0,"149":0,"151":0,"153":0,"154":0,"155":0,"156":0,"159":0,"161":0,"166":0,"167":0,"168":0,"171":0,"172":0,"181":0,"184":0,"185":0,"193":0,"194":0,"195":0,"196":0,"197":0,"198":0,"199":0,"200":0,"201":0,"205":0,"206":0,"207":0,"210":0,"213":0,"214":0,"217":0,"218":0,"228":0,"230":0,"231":0,"232":0,"234":0,"242":0,"244":0,"245":0,"246":0,"248":0,"280":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:32":0,"renderUI:47":0,"_renderTree:60":0,"(anonymous 2):101":0,"(anonymous 3):107":0,"(anonymous 4):114":0,"_bindEvents:97":0,"(anonymous 5):124":0,"bindUI:121":0,"_refresh:130":0,"_processTree:141":0,"(anonymous 6):184":0,"_enhanceCells:180":0,"_setCollapsedIcon:227":0,"_setExpandedIcon:241":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 95;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 16;
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
// TODO: Add scrollable
// TODO: Disable text selection within treenodes
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 12);
TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    /**
    * Selected node
    **/
    selectedNode: null,

    /**
    * Reference pointer to events
    */
    afterEvent: null,
    openEvent: null,
    closeEvent: null,
    selectEvent: null,

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 32);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 33);
var contentBox = this.get('contentBox'),
            width      = this.get('width'),
            height     = this.get('height'),
            model      = this.get('data');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 38);
contentBox.setStyle('width', width);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 39);
contentBox.setStyle('height', height);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 40);
contentBox.setStyle('overflow', 'auto');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 42);
if (model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 43);
this.afterEvent = model.after('load', this._refresh, this);
        }
    },

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 47);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 48);
var src        = this.get('srcNode'),
            container  = Y.Node.create('<div class="libbit-treeview-content"></div>'),
            sID        = Y.stamp(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 52);
container.set('id', sID);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 53);
src.append(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 55);
this.set('treeContainer', container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 57);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 60);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
var model = this.get('data'),
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 64);
items = model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 67);
tree = this.get('tree');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 69);
this.openEvent.detach();
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
this.closeEvent.detach();
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 71);
this.selectEvent.detach();

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 73);
while (tree.rootNode.children.length > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 74);
tree.removeNode(tree.rootNode.children[0]);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 77);
for (var i in items) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 78);
tree.insertNode(tree.rootNode, items[i]);
            }
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 81);
tree = new Y.TreeView({
                container: this.get('srcNode'),
                nodes: items
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
this.set('tree', tree);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 89);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 91);
this._processTree(tree.rootNode);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 92);
this._bindEvents();

        //this._enhanceCells();
    },

    _bindEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_bindEvents", 97);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 98);
var tree = this.get('tree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 99);
var self = this;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
this.openEvent = tree.on('open', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 101);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
var li = tree.getHTMLNode(e.node);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 104);
self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
this.closeEvent = tree.on('close', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 107);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 108);
var li = tree.getHTMLNode(e.node);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 109);
var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 111);
delete self._stateMap[stateIndex];
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 114);
this.selectEvent = tree.on('select', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 114);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 115);
var li = tree.getHTMLNode(e.node);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 117);
self.selectedNode = parseInt(li.getAttribute('data-yui3-modelId'));
        });
    },

    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 121);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 122);
var tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 124);
tree.on('open', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 5)", 124);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 125);
console.log('...');
        });
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 127);
console.log('bindUI');
    },

    _refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_refresh", 130);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 131);
this._renderTree();
        //this.bindUI();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 134);
this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_processTree", 141);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 142);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 145);
rootNode.open();

        // Attach data to the nodes
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 148);
for (var i in rootNode.children) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 149);
var treeNode = rootNode.children[i],
                li = tree.getHTMLNode(treeNode);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 151);
model = treeNode.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 153);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 154);
li.setAttribute('data-yui3-modelId', model.get('id'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
li.setAttribute('data-yui3-record', model.get('clientId'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 156);
li.setData({ model: model });
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 159);
if (treeNode.children) {
                // Walk through the tree recursively
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 161);
self._processTree(treeNode);
            }
        }

        // Restore state of this node.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 166);
if (rootNode !== tree.rootNode) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 167);
if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 168);
rootNode.close();
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 171);
if (self.selectedNode === rootNode.data.get('id')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 172);
rootNode.select();
            }
        }
    },

    /**
     * Add the tooltips and render the icons in the treeview.
     */
    _enhanceCells: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_enhanceCells", 180);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 181);
var self        = this,
            boundingBox = this.get('boundingBox');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 184);
boundingBox.all('.ygtvlabel').each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 6)", 184);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 185);
var model         = self._getModelFromLabelNode(node),
                content       = node.getContent(),
                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),
                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),
                contentNode,
                icon;

            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
if (Y.TB) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
if (Y.instanceOf(model, Y.TB.Category)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
icon = 'icon-folder-close';
                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 196);
if (Y.instanceOf(model, Y.TB.FieldGroup)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 197);
icon = 'icon-align-left';
                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
if (Y.instanceOf(model, Y.TB.Image)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
icon = 'icon-picture';
                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 200);
if (Y.instanceOf(model, Y.DocGen.Table)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
icon = 'icon-th';
                }}}}
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
if (icon) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 206);
contentNode = Y.Node.create('<span class="label-container"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 207);
node.setContent(contentNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
node.ancestor('.ygtvtable').set('title', content);

            // Set the expand/colllapse items if necessary.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 213);
if (collapsedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
self._setCollapsedIcon(collapsedNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 217);
if (expandedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 218);
self._setExpandedIcon(expandedNode);
            }
        });
    },


    /**
     * Add an icon node or update an existing one.
     */
    _setCollapsedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setCollapsedIcon", 227);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 228);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 230);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 231);
a.one('i').removeClass('icon-chevron-down');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 232);
a.one('i').addClass('icon-chevron-right');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 234);
a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-right"></i>'));
        }
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setExpandedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setExpandedIcon", 241);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 242);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 244);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 245);
a.one('i').removeClass('icon-chevron-right');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 246);
a.one('i').addClass('icon-chevron-down');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 248);
a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-down"></i>'));
        }
    }

}, {
    ATTRS: {
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 280);
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "anim",
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
