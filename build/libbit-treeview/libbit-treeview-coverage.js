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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","// Global YAHOO object, fixes multiple instances of YAHOO treeview","YAHOO = Y.YUI2;","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Add scrollable","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.DD ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    initializer: function () {","        var contentBox = this.get('contentBox'),","            width      = this.get('width'),","            height     = this.get('height'),","            model      = this.get('data');","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","        contentBox.setStyle('overflow', 'auto');","","        if (model) {","            model.after('load', this._refresh, this);","        }","    },","","    renderUI: function () {","        var src        = this.get('srcNode'),","            container  = Y.Node.create('<div class=\"libbit-treeview-content\"></div>'),","            sID        = Y.stamp(container);","","        container.set('id', sID);","        src.append(container);","","        this.set('treeContainer', container);","","        this._renderTree();","    },","","    _renderTree: function () {","        var model         = this.get('data'),","            treeContainer = this.get('treeContainer'),","            tree;","","        if (this.get('tree')) {","            this.get('tree').destroy();","        }","","        // Clone the data object as the TreeView messes with it's internal structure.","        items = this.get('renderLeaves') ? Y.clone(model.get('items')) : Y.clone(model.getBranches());","","        tree = new YAHOO.widget.TreeView(treeContainer.get('id'), items);","        tree.render();","","        this.set('tree', tree);","","        // XXX: Hide the tree while postprocessing?","        this._attachData();","","        // TODO: Persist selection","        this._restoreState();","","        this._enhanceCells();","    },","","    bindUI: function () {","        var self = this,","            tree = this.get('tree'),","            nodes;","","        // Forward tree events so extensions and plugins can subscribe to them.","        tree.subscribe('collapseComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');","","            // Update the icon.","            self._setCollapsedIcon(el);","","            self.fire('collapseComplete', { node: node });","        });","","        tree.subscribe('expandComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');","","            // Update the icon.","            self._setExpandedIcon(el);","","            self.fire('expandComplete', { node: node });","        });","","        // Disable the default expand/collapse behaviour, only allow","        // expanding and collapsing when clicking the icon.","        tree.subscribe('expand',   function () { return self.get('iconClicked'); });","        tree.subscribe('collapse', function () { return self.get('iconClicked'); });","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","","            // Rebind the click event.","            table.on('click', function (e) {","                var el = e.target.get('parentNode').get('parentNode');","","                // Check if an expand/collapse icon was clicked.","                if (el.hasClass('ygtvtp') ||","                        el.hasClass('ygtvtph') ||","                        el.hasClass('ygtvlp') ||","                        el.hasClass('ygtvlph')) {","","                    self.set('iconClicked', true);","                    node.expand();","                    self.set('iconClicked', false);","","                } else if (el.hasClass('ygtvtm') ||","                        el.hasClass('ygtvtmh') ||","                        el.hasClass('ygtvlm') ||","                        el.hasClass('ygtvlmh')) {","","                    self.set('iconClicked', true);","                    node.collapse();","                    self.set('iconClicked', false);","                }","            });","        });","    },","","    _refresh: function () {","        var self  = this,","            tree  = this.get('tree'),","            nodes = tree.getNodesBy(function (node) { return node.expanded; });","","        // Store the state. Store by label for now, clientID seems bugged.","        Y.Array.each(nodes, function (node) {","            self._stateMap.push(node.label);","        });","","        this._renderTree();","        this.bindUI();","","        this.fire('refresh');","    },","","    /**","     * Store a reference to the model for each tree node.","     */","    _attachData: function () {","        var self = this,","            tree = this.get('tree');","","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","                model = node.data;","","            if (Y.instanceOf(model, Y.Model)) {","                table.setAttribute('data-yui3-record', model.get('clientId'));","                table.setData({ model: model });","            }","        });","","        tree.collapseAll();","    },","","    /**","     * Add the tooltips and render the icons in the treeview.","     */","    _enhanceCells: function () {","        var self        = this,","            boundingBox = this.get('boundingBox');","","        boundingBox.all('.ygtvlabel').each(function (node) {","            var model         = self._getModelFromLabelNode(node),","                content       = node.getContent(),","                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),","                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),","                contentNode,","                icon;","","            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.","            if (Y.TB) {","                if (Y.instanceOf(model, Y.TB.Category)) {","                    icon = 'icon-folder-close';","                } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {","                    icon = 'icon-align-left';","                }","            }","","            if (icon) {","                contentNode = Y.Node.create('<span class=\"label-container\"><i class=\"' + icon + '\"></i><span> ' + content + '</span></div>');","                node.setContent(contentNode);","            }","","            node.ancestor('.ygtvtable').set('title', content);","","            // Set the expand/colllapse items if necessary.","            if (collapsedNode) {","                self._setCollapsedIcon(collapsedNode);","            }","","            if (expandedNode) {","                self._setExpandedIcon(expandedNode);","            }","        });","    },","","    /**","     * Restores the current tree state if it's set.","     */","     _restoreState: function () {","        var self = this,","            tree = this.get('tree'),","            nodes;","","        if (this._stateMap.length > 0) {","            nodes = tree.getNodesBy(function (node) {","                return self._stateMap.indexOf(node.label) > -1;","            });","","            Y.Array.each(nodes, function (node) {","                node.expand();","            });","","            this._stateMap = [];","        }","    },","","    /**","     * Retrieves the model corresponding to a label DOM node.","     */","    _getModelFromLabelNode: function (node) {","        return node.ancestor('table').getData().model;","    },","","    /**","     * Retrieve the DOM element containing the main table of a given TreeView node.","     */","    _getTableElement: function (node) {","        var boundingBox = this.get('boundingBox'),","            id          = node.labelElId;","","        return boundingBox.one('#' + id).ancestor('table');","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setCollapsedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-down');","            a.one('i').addClass('icon-chevron-right');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-right\"></i>'));","        }","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setExpandedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-right');","            a.one('i').addClass('icon-chevron-down');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-down\"></i>'));","        }","    }","","}, {","    ATTRS: {","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        width : {","            value: null","        },","        height : {","            value: null","        },","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"anim\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"widget\",","        \"yui2-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"4":0,"6":0,"15":0,"23":0,"28":0,"29":0,"30":0,"32":0,"33":0,"38":0,"42":0,"43":0,"45":0,"47":0,"51":0,"55":0,"56":0,"60":0,"62":0,"63":0,"65":0,"68":0,"71":0,"73":0,"77":0,"82":0,"83":0,"86":0,"88":0,"91":0,"92":0,"95":0,"97":0,"102":0,"103":0,"105":0,"107":0,"108":0,"111":0,"112":0,"115":0,"120":0,"121":0,"122":0,"124":0,"129":0,"130":0,"131":0,"138":0,"140":0,"143":0,"144":0,"147":0,"148":0,"150":0,"157":0,"160":0,"162":0,"164":0,"165":0,"166":0,"168":0,"169":0,"170":0,"174":0,"181":0,"184":0,"185":0,"193":0,"194":0,"195":0,"196":0,"197":0,"201":0,"202":0,"203":0,"206":0,"209":0,"210":0,"213":0,"214":0,"223":0,"227":0,"228":0,"229":0,"232":0,"233":0,"236":0,"244":0,"251":0,"254":0,"261":0,"263":0,"264":0,"265":0,"267":0,"275":0,"277":0,"278":0,"279":0,"281":0,"313":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:22":0,"renderUI:37":0,"_renderTree:50":0,"(anonymous 2):82":0,"(anonymous 3):91":0,"(anonymous 4):102":0,"(anonymous 5):103":0,"(anonymous 6):105":0,"(anonymous 8):111":0,"(anonymous 7):107":0,"bindUI:76":0,"(anonymous 9):140":0,"(anonymous 10):143":0,"_refresh:137":0,"(anonymous 11):162":0,"(anonymous 12):164":0,"_attachData:156":0,"(anonymous 13):184":0,"_enhanceCells:180":0,"(anonymous 14):228":0,"(anonymous 15):232":0,"_restoreState:222":0,"_getModelFromLabelNode:243":0,"_getTableElement:250":0,"_setCollapsedIcon:260":0,"_setExpandedIcon:274":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 103;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 27;
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 1);
YUI.add('libbit-treeview', function (Y, NAME) {

// Global YAHOO object, fixes multiple instances of YAHOO treeview
_yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 4);
YAHOO = Y.YUI2;

_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 6);
var TreeView;

// TODO: Bind model events
// TODO: Table support, style odd/even
// TODO: Fix overflow CSS for Firefox
// TODO: Implement sorting
// TODO: Document data input
// TODO: Add scrollable
// TODO: Disable text selection within treenodes
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 15);
TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.DD ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 22);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 23);
var contentBox = this.get('contentBox'),
            width      = this.get('width'),
            height     = this.get('height'),
            model      = this.get('data');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 28);
contentBox.setStyle('width', width);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 29);
contentBox.setStyle('height', height);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 30);
contentBox.setStyle('overflow', 'auto');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 32);
if (model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 33);
model.after('load', this._refresh, this);
        }
    },

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 37);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 38);
var src        = this.get('srcNode'),
            container  = Y.Node.create('<div class="libbit-treeview-content"></div>'),
            sID        = Y.stamp(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 42);
container.set('id', sID);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 43);
src.append(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 45);
this.set('treeContainer', container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 47);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 50);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 51);
var model         = this.get('data'),
            treeContainer = this.get('treeContainer'),
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 55);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 56);
this.get('tree').destroy();
        }

        // Clone the data object as the TreeView messes with it's internal structure.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 60);
items = this.get('renderLeaves') ? Y.clone(model.get('items')) : Y.clone(model.getBranches());

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
tree = new YAHOO.widget.TreeView(treeContainer.get('id'), items);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 63);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 65);
this.set('tree', tree);

        // XXX: Hide the tree while postprocessing?
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 68);
this._attachData();

        // TODO: Persist selection
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 71);
this._restoreState();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 73);
this._enhanceCells();
    },

    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 76);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 77);
var self = this,
            tree = this.get('tree'),
            nodes;

        // Forward tree events so extensions and plugins can subscribe to them.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 82);
tree.subscribe('collapseComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 82);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
self._setCollapsedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 88);
self.fire('collapseComplete', { node: node });
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 91);
tree.subscribe('expandComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 91);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 92);
var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 95);
self._setExpandedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
self.fire('expandComplete', { node: node });
        });

        // Disable the default expand/collapse behaviour, only allow
        // expanding and collapsing when clicking the icon.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
tree.subscribe('expand',   function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 102);
return self.get('iconClicked'); });
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 103);
tree.subscribe('collapse', function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 5)", 103);
return self.get('iconClicked'); });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 105);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 6)", 105);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 7)", 107);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 108);
var table = self._getTableElement(node);

            // Rebind the click event.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 111);
table.on('click', function (e) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 8)", 111);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 112);
var el = e.target.get('parentNode').get('parentNode');

                // Check if an expand/collapse icon was clicked.
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 115);
if (el.hasClass('ygtvtp') ||
                        el.hasClass('ygtvtph') ||
                        el.hasClass('ygtvlp') ||
                        el.hasClass('ygtvlph')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 120);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 121);
node.expand();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 122);
self.set('iconClicked', false);

                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 124);
if (el.hasClass('ygtvtm') ||
                        el.hasClass('ygtvtmh') ||
                        el.hasClass('ygtvlm') ||
                        el.hasClass('ygtvlmh')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 129);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 130);
node.collapse();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 131);
self.set('iconClicked', false);
                }}
            });
        });
    },

    _refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_refresh", 137);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 138);
var self  = this,
            tree  = this.get('tree'),
            nodes = tree.getNodesBy(function (node) { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 9)", 140);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 140);
return node.expanded; });

        // Store the state. Store by label for now, clientID seems bugged.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 143);
Y.Array.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 10)", 143);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 144);
self._stateMap.push(node.label);
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 147);
this._renderTree();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 148);
this.bindUI();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 150);
this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node.
     */
    _attachData: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachData", 156);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 157);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 160);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 162);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 11)", 162);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 164);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 12)", 164);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 165);
var table = self._getTableElement(node);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 166);
model = node.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 168);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 169);
table.setAttribute('data-yui3-record', model.get('clientId'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 170);
table.setData({ model: model });
            }
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 174);
tree.collapseAll();
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
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 13)", 184);
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
                }}
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
if (icon) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 202);
contentNode = Y.Node.create('<span class="label-container"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 203);
node.setContent(contentNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 206);
node.ancestor('.ygtvtable').set('title', content);

            // Set the expand/colllapse items if necessary.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 209);
if (collapsedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
self._setCollapsedIcon(collapsedNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 213);
if (expandedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
self._setExpandedIcon(expandedNode);
            }
        });
    },

    /**
     * Restores the current tree state if it's set.
     */
     _restoreState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreState", 222);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 223);
var self = this,
            tree = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 227);
if (this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 228);
nodes = tree.getNodesBy(function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 14)", 228);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 229);
return self._stateMap.indexOf(node.label) > -1;
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 232);
Y.Array.each(nodes, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 15)", 232);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 233);
node.expand();
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
this._stateMap = [];
        }
    },

    /**
     * Retrieves the model corresponding to a label DOM node.
     */
    _getModelFromLabelNode: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getModelFromLabelNode", 243);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 244);
return node.ancestor('table').getData().model;
    },

    /**
     * Retrieve the DOM element containing the main table of a given TreeView node.
     */
    _getTableElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getTableElement", 250);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 251);
var boundingBox = this.get('boundingBox'),
            id          = node.labelElId;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 254);
return boundingBox.one('#' + id).ancestor('table');
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setCollapsedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setCollapsedIcon", 260);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 261);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 263);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 264);
a.one('i').removeClass('icon-chevron-down');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 265);
a.one('i').addClass('icon-chevron-right');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 267);
a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-right"></i>'));
        }
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setExpandedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setExpandedIcon", 274);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 275);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 277);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 278);
a.one('i').removeClass('icon-chevron-right');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 279);
a.one('i').addClass('icon-chevron-down');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 281);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 313);
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "anim",
        "libbit-model-tree",
        "libbit-treeview-anim",
        "libbit-treeview-select",
        "libbit-treeview-dd",
        "widget",
        "yui2-treeview"
    ],
    "skinnable": true
});
