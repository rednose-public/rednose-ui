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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Add scrollable","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /*","    * Reference pointer to events","    */","    afterEvent: null,","    openEvent: null,","    closeEvent: null,","","    initializer: function () {","        var contentBox = this.get('contentBox'),","            width      = this.get('width'),","            height     = this.get('height'),","            model      = this.get('data');","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","        contentBox.setStyle('overflow', 'auto');","","        if (model) {","            this.afterEvent = model.after('load', this._refresh, this);","        }","    },","","    renderUI: function () {","        var src        = this.get('srcNode'),","            container  = Y.Node.create('<div class=\"libbit-treeview-content\"></div>'),","            sID        = Y.stamp(container);","","        container.set('id', sID);","        src.append(container);","","        this.set('treeContainer', container);","","        this._renderTree();","    },","","    _renderTree: function () {","        var model = this.get('data'),","            self  = this,","            tree;","","        items = model.get('items');","","        if (this.get('tree')) {","            tree = this.get('tree');","","            while (tree.rootNode.children.length > 0) {","                tree.removeNode(tree.rootNode.children[0]);","            }","","            for (var i in items) {","                tree.insertNode(tree.rootNode, items[i]);","            }","        } else {","            tree = new Y.TreeView({","                container: this.get('srcNode'),","                nodes: items","            });","","            this.set('tree', tree);","        }","","        tree.render();","","        if (this.openEvent) {","            this.openEvent.detach();","            this.closeEvent.detach();","        }","","        this._processTree(tree.rootNode);","","        this.openEvent = tree.on('open', function(e) {","            var li = tree.getHTMLNode(e.node);","","            self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));","        });","        this.closeEvent = tree.on('close', function(e) {","            var li = tree.getHTMLNode(e.node);","            var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));","","            delete self._stateMap[stateIndex];","        });","","        //this._enhanceCells();","    },","","    /*bindUI: function () {","        var self = this,","            tree = this.get('tree'),","            nodes;","","        // Forward tree events so extensions and plugins can subscribe to them.","        tree.subscribe('collapseComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');","","            // Update the icon.","            self._setCollapsedIcon(el);","","            self.fire('collapseComplete', { node: node });","        });","","        tree.subscribe('expandComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');","","            // Update the icon.","            self._setExpandedIcon(el);","","            self.fire('expandComplete', { node: node });","        });","","        // Disable the default expand/collapse behaviour, only allow","        // expanding and collapsing when clicking the icon.","        tree.subscribe('expand',   function () { return self.get('iconClicked'); });","        tree.subscribe('collapse', function () { return self.get('iconClicked'); });","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","","            // Rebind the click event.","            table.on('click', function (e) {","                var el = e.target.get('parentNode').get('parentNode');","","                // Check if an expand/collapse icon was clicked.","                if (el.hasClass('ygtvtp') ||","                        el.hasClass('ygtvtph') ||","                        el.hasClass('ygtvlp') ||","                        el.hasClass('ygtvlph')) {","","                    self.set('iconClicked', true);","                    node.expand();","                    self.set('iconClicked', false);","","                } else if (el.hasClass('ygtvtm') ||","                        el.hasClass('ygtvtmh') ||","                        el.hasClass('ygtvlm') ||","                        el.hasClass('ygtvlmh')) {","","                    self.set('iconClicked', true);","                    node.collapse();","                    self.set('iconClicked', false);","                }","            });","        });","    },*/","","    _refresh: function () {","        this._renderTree();","        //this.bindUI();","","        this.fire('refresh');","    },","","    /**","     * Store a reference to the model for each tree node and restore","     * the state of the treeNodes.","     */","    _processTree: function (rootNode) {","        var self = this,","            tree = this.get('tree');","","        rootNode.open();","","        for (var i in rootNode.children) {","            var treeNode = rootNode.children[i],","                li = tree.getHTMLNode(treeNode);","                model = treeNode.data;","","            if (Y.instanceOf(model, Y.Model)) {","                li.setAttribute('data-yui3-modelId', model.get('id'));","                li.setAttribute('data-yui3-record', model.get('clientId'));","                li.setData({ model: model });","            }","","            if (treeNode.children) {","                self._processTree(treeNode);","            }","        }","","        if (rootNode !== tree.rootNode) {","            console.log(self._stateMap);","            if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {","                rootNode.close();","            }","        }","    },","","    /**","     * Add the tooltips and render the icons in the treeview.","     */","    _enhanceCells: function () {","        var self        = this,","            boundingBox = this.get('boundingBox');","","        boundingBox.all('.ygtvlabel').each(function (node) {","            var model         = self._getModelFromLabelNode(node),","                content       = node.getContent(),","                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),","                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),","                contentNode,","                icon;","","            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.","            if (Y.TB) {","                if (Y.instanceOf(model, Y.TB.Category)) {","                    icon = 'icon-folder-close';","                } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {","                    icon = 'icon-align-left';","                } else if (Y.instanceOf(model, Y.TB.Image)) {","                    icon = 'icon-picture';","                } else if (Y.instanceOf(model, Y.DocGen.Table)) {","                    icon = 'icon-th';","                }","            }","","            if (icon) {","                contentNode = Y.Node.create('<span class=\"label-container\"><i class=\"' + icon + '\"></i><span> ' + content + '</span></div>');","                node.setContent(contentNode);","            }","","            node.ancestor('.ygtvtable').set('title', content);","","            // Set the expand/colllapse items if necessary.","            if (collapsedNode) {","                self._setCollapsedIcon(collapsedNode);","            }","","            if (expandedNode) {","                self._setExpandedIcon(expandedNode);","            }","        });","    },","","","    /**","     * Add an icon node or update an existing one.","     */","    _setCollapsedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-down');","            a.one('i').addClass('icon-chevron-right');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-right\"></i>'));","        }","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setExpandedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-right');","            a.one('i').addClass('icon-chevron-down');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-down\"></i>'));","        }","    }","","}, {","    ATTRS: {","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        width : {","            value: null","        },","        height : {","            value: null","        },","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"anim\",","        \"libbit-model-tree\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"widget\",","        \"gallery-sm-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"12":0,"27":0,"32":0,"33":0,"34":0,"36":0,"37":0,"42":0,"46":0,"47":0,"49":0,"51":0,"55":0,"59":0,"61":0,"62":0,"64":0,"65":0,"68":0,"69":0,"72":0,"77":0,"80":0,"82":0,"83":0,"84":0,"87":0,"89":0,"90":0,"92":0,"94":0,"95":0,"96":0,"98":0,"166":0,"169":0,"177":0,"180":0,"182":0,"183":0,"185":0,"187":0,"188":0,"189":0,"190":0,"193":0,"194":0,"198":0,"199":0,"200":0,"201":0,"210":0,"213":0,"214":0,"222":0,"223":0,"224":0,"225":0,"226":0,"227":0,"228":0,"229":0,"230":0,"234":0,"235":0,"236":0,"239":0,"242":0,"243":0,"246":0,"247":0,"257":0,"259":0,"260":0,"261":0,"263":0,"271":0,"273":0,"274":0,"275":0,"277":0,"309":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:26":0,"renderUI:41":0,"(anonymous 2):89":0,"(anonymous 3):94":0,"_renderTree:54":0,"_refresh:165":0,"_processTree:176":0,"(anonymous 4):213":0,"_enhanceCells:209":0,"_setCollapsedIcon:256":0,"_setExpandedIcon:270":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 84;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 12;
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

    /*
    * Reference pointer to events
    */
    afterEvent: null,
    openEvent: null,
    closeEvent: null,

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 26);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 27);
var contentBox = this.get('contentBox'),
            width      = this.get('width'),
            height     = this.get('height'),
            model      = this.get('data');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 32);
contentBox.setStyle('width', width);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 33);
contentBox.setStyle('height', height);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 34);
contentBox.setStyle('overflow', 'auto');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 36);
if (model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 37);
this.afterEvent = model.after('load', this._refresh, this);
        }
    },

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 41);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 42);
var src        = this.get('srcNode'),
            container  = Y.Node.create('<div class="libbit-treeview-content"></div>'),
            sID        = Y.stamp(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 46);
container.set('id', sID);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 47);
src.append(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 49);
this.set('treeContainer', container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 51);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 54);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 55);
var model = this.get('data'),
            self  = this,
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 59);
items = model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
tree = this.get('tree');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 64);
while (tree.rootNode.children.length > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 65);
tree.removeNode(tree.rootNode.children[0]);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 68);
for (var i in items) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 69);
tree.insertNode(tree.rootNode, items[i]);
            }
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 72);
tree = new Y.TreeView({
                container: this.get('srcNode'),
                nodes: items
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 77);
this.set('tree', tree);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 80);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 82);
if (this.openEvent) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
this.openEvent.detach();
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 84);
this.closeEvent.detach();
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 87);
this._processTree(tree.rootNode);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 89);
this.openEvent = tree.on('open', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 89);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 90);
var li = tree.getHTMLNode(e.node);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 92);
self._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId')));
        });
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 94);
this.closeEvent = tree.on('close', function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 94);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 95);
var li = tree.getHTMLNode(e.node);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 96);
var stateIndex = Y.Array.indexOf(self._stateMap, parseInt(li.getAttribute('data-yui3-modelId')));

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 98);
delete self._stateMap[stateIndex];
        });

        //this._enhanceCells();
    },

    /*bindUI: function () {
        var self = this,
            tree = this.get('tree'),
            nodes;

        // Forward tree events so extensions and plugins can subscribe to them.
        tree.subscribe('collapseComplete', function (node) {
            var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');

            // Update the icon.
            self._setCollapsedIcon(el);

            self.fire('collapseComplete', { node: node });
        });

        tree.subscribe('expandComplete', function (node) {
            var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');

            // Update the icon.
            self._setExpandedIcon(el);

            self.fire('expandComplete', { node: node });
        });

        // Disable the default expand/collapse behaviour, only allow
        // expanding and collapsing when clicking the icon.
        tree.subscribe('expand',   function () { return self.get('iconClicked'); });
        tree.subscribe('collapse', function () { return self.get('iconClicked'); });

        nodes = tree.getNodesBy(function () { return true; });

        Y.each(nodes, function (node) {
            var table = self._getTableElement(node);

            // Rebind the click event.
            table.on('click', function (e) {
                var el = e.target.get('parentNode').get('parentNode');

                // Check if an expand/collapse icon was clicked.
                if (el.hasClass('ygtvtp') ||
                        el.hasClass('ygtvtph') ||
                        el.hasClass('ygtvlp') ||
                        el.hasClass('ygtvlph')) {

                    self.set('iconClicked', true);
                    node.expand();
                    self.set('iconClicked', false);

                } else if (el.hasClass('ygtvtm') ||
                        el.hasClass('ygtvtmh') ||
                        el.hasClass('ygtvlm') ||
                        el.hasClass('ygtvlmh')) {

                    self.set('iconClicked', true);
                    node.collapse();
                    self.set('iconClicked', false);
                }
            });
        });
    },*/

    _refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_refresh", 165);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 166);
this._renderTree();
        //this.bindUI();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 169);
this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes.
     */
    _processTree: function (rootNode) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_processTree", 176);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 177);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 180);
rootNode.open();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 182);
for (var i in rootNode.children) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 183);
var treeNode = rootNode.children[i],
                li = tree.getHTMLNode(treeNode);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 185);
model = treeNode.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 188);
li.setAttribute('data-yui3-modelId', model.get('id'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 189);
li.setAttribute('data-yui3-record', model.get('clientId'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
li.setData({ model: model });
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
if (treeNode.children) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
self._processTree(treeNode);
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
if (rootNode !== tree.rootNode) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
console.log(self._stateMap);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 200);
if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
rootNode.close();
            }
        }
    },

    /**
     * Add the tooltips and render the icons in the treeview.
     */
    _enhanceCells: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_enhanceCells", 209);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
var self        = this,
            boundingBox = this.get('boundingBox');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 213);
boundingBox.all('.ygtvlabel').each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 213);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
var model         = self._getModelFromLabelNode(node),
                content       = node.getContent(),
                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),
                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),
                contentNode,
                icon;

            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 222);
if (Y.TB) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 223);
if (Y.instanceOf(model, Y.TB.Category)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 224);
icon = 'icon-folder-close';
                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 225);
if (Y.instanceOf(model, Y.TB.FieldGroup)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
icon = 'icon-align-left';
                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 227);
if (Y.instanceOf(model, Y.TB.Image)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 228);
icon = 'icon-picture';
                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 229);
if (Y.instanceOf(model, Y.DocGen.Table)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 230);
icon = 'icon-th';
                }}}}
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 234);
if (icon) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 235);
contentNode = Y.Node.create('<span class="label-container"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
node.setContent(contentNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 239);
node.ancestor('.ygtvtable').set('title', content);

            // Set the expand/colllapse items if necessary.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 242);
if (collapsedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 243);
self._setCollapsedIcon(collapsedNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 246);
if (expandedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 247);
self._setExpandedIcon(expandedNode);
            }
        });
    },


    /**
     * Add an icon node or update an existing one.
     */
    _setCollapsedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setCollapsedIcon", 256);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 257);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 259);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 260);
a.one('i').removeClass('icon-chevron-down');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 261);
a.one('i').addClass('icon-chevron-right');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 263);
a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-right"></i>'));
        }
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setExpandedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setExpandedIcon", 270);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 271);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 273);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 274);
a.one('i').removeClass('icon-chevron-right');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 275);
a.one('i').addClass('icon-chevron-down');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 277);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 309);
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
