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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","// Global YAHOO object, fixes multiple instances of YAHOO treeview","YAHOO = Y.YUI2;","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Add scrollable","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Filter ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /*","    * Reference pointer to the after EventHandler","    */","    afterEvent: null,","","    initializer: function () {","        var contentBox = this.get('contentBox'),","            width      = this.get('width'),","            height     = this.get('height'),","            model      = this.get('data');","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","        contentBox.setStyle('overflow', 'auto');","","        if (model) {","            this.afterEvent = model.after('load', this._refresh, this);","        }","    },","","    renderUI: function () {","        var src        = this.get('srcNode'),","            container  = Y.Node.create('<div class=\"libbit-treeview-content\"></div>'),","            sID        = Y.stamp(container);","","        container.set('id', sID);","        src.append(container);","","        this.set('treeContainer', container);","","        this._renderTree();","    },","","    _renderTree: function () {","        var model         = this.get('data'),","            treeContainer = this.get('treeContainer'),","            tree;","","        if (this.get('tree')) {","            this.get('tree').destroy();","        }","","        // Clone the data object as the TreeView messes with it's internal structure.","        items = this.get('renderLeaves') ? Y.clone(model.get('items')) : Y.clone(model.getBranches());","","        tree = new YAHOO.widget.TreeView(treeContainer.get('id'), items);","        tree.render();","","        this.set('tree', tree);","","        // XXX: Hide the tree while postprocessing?","        this._attachData();","","        // TODO: Persist selection","        this._restoreState();","","        this._enhanceCells();","    },","","    bindUI: function () {","        var self = this,","            tree = this.get('tree'),","            nodes;","","        // Forward tree events so extensions and plugins can subscribe to them.","        tree.subscribe('collapseComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');","","            // Update the icon.","            self._setCollapsedIcon(el);","","            self.fire('collapseComplete', { node: node });","        });","","        tree.subscribe('expandComplete', function (node) {","            var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');","","            // Update the icon.","            self._setExpandedIcon(el);","","            self.fire('expandComplete', { node: node });","        });","","        // Disable the default expand/collapse behaviour, only allow","        // expanding and collapsing when clicking the icon.","        tree.subscribe('expand',   function () { return self.get('iconClicked'); });","        tree.subscribe('collapse', function () { return self.get('iconClicked'); });","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","","            // Rebind the click event.","            table.on('click', function (e) {","                var el = e.target.get('parentNode').get('parentNode');","","                // Check if an expand/collapse icon was clicked.","                if (el.hasClass('ygtvtp') ||","                        el.hasClass('ygtvtph') ||","                        el.hasClass('ygtvlp') ||","                        el.hasClass('ygtvlph')) {","","                    self.set('iconClicked', true);","                    node.expand();","                    self.set('iconClicked', false);","","                } else if (el.hasClass('ygtvtm') ||","                        el.hasClass('ygtvtmh') ||","                        el.hasClass('ygtvlm') ||","                        el.hasClass('ygtvlmh')) {","","                    self.set('iconClicked', true);","                    node.collapse();","                    self.set('iconClicked', false);","                }","            });","        });","    },","","    _refresh: function () {","        var self  = this,","            tree  = this.get('tree'),","            nodes = tree.getNodesBy(function (node) { return node.expanded; });","","        // Store the state. Store by label for now, clientID seems bugged.","        Y.Array.each(nodes, function (node) {","            self._stateMap.push(node.label);","        });","","        this._renderTree();","        this.bindUI();","","        this.fire('refresh');","    },","","    /**","     * Store a reference to the model for each tree node.","     */","    _attachData: function () {","        var self = this,","            tree = this.get('tree');","","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (node) {","            var table = self._getTableElement(node);","                model = node.data;","","            if (Y.instanceOf(model, Y.Model)) {","                table.setAttribute('data-yui3-record', model.get('clientId'));","                table.setData({ model: model });","            }","        });","","        tree.collapseAll();","    },","","    /**","     * Add the tooltips and render the icons in the treeview.","     */","    _enhanceCells: function () {","        var self        = this,","            boundingBox = this.get('boundingBox');","","        boundingBox.all('.ygtvlabel').each(function (node) {","            var model         = self._getModelFromLabelNode(node),","                content       = node.getContent(),","                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),","                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),","                contentNode,","                icon;","","            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.","            if (Y.TB) {","                if (Y.instanceOf(model, Y.TB.Category)) {","                    icon = 'icon-folder-close';","                } else if (Y.instanceOf(model, Y.TB.FieldGroup)) {","                    icon = 'icon-align-left';","                } else if (Y.instanceOf(model, Y.TB.Image)) {","                    icon = 'icon-picture';","                } else if (Y.instanceOf(model, Y.DocGen.Table)) {","                    icon = 'icon-th';","                }","            }","","            if (icon) {","                contentNode = Y.Node.create('<span class=\"label-container\"><i class=\"' + icon + '\"></i><span> ' + content + '</span></div>');","                node.setContent(contentNode);","            }","","            node.ancestor('.ygtvtable').set('title', content);","","            // Set the expand/colllapse items if necessary.","            if (collapsedNode) {","                self._setCollapsedIcon(collapsedNode);","            }","","            if (expandedNode) {","                self._setExpandedIcon(expandedNode);","            }","        });","    },","","    /**","     * Restores the current tree state if it's set.","     */","     _restoreState: function () {","        var self = this,","            tree = this.get('tree'),","            nodes;","","        if (this._stateMap.length > 0) {","            nodes = tree.getNodesBy(function (node) {","                return self._stateMap.indexOf(node.label) > -1;","            });","","            Y.Array.each(nodes, function (node) {","                node.expand();","            });","","            this._stateMap = [];","        }","    },","","    /**","     * Retrieves the model corresponding to a label DOM node.","     */","    _getModelFromLabelNode: function (node) {","        return node.ancestor('table').getData().model;","    },","","    /**","     * Retrieve the DOM element containing the main table of a given TreeView node.","     */","    _getTableElement: function (node) {","        var boundingBox = this.get('boundingBox'),","            id          = node.labelElId;","","        return boundingBox.one('#' + id).ancestor('table');","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setCollapsedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-down');","            a.one('i').addClass('icon-chevron-right');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-right\"></i>'));","        }","    },","","    /**","     * Add an icon node or update an existing one.","     */","    _setExpandedIcon: function (el) {","        var a = el.one('a');","","        if (a.one('i')) {","            a.one('i').removeClass('icon-chevron-right');","            a.one('i').addClass('icon-chevron-down');","        } else {","            a.setContent(Y.Node.create('<i class=\"icon-toggle icon-chevron-down\"></i>'));","        }","    }","","}, {","    ATTRS: {","        // The data object containing the models.","        data : {","            value: null","        },","        // The original tree object.","        tree : {","            value: null","        },","        width : {","            value: null","        },","        height : {","            value: null","        },","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","        // State attribute.","        iconClicked : {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"anim\",","        \"libbit-model-tree\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"widget\",","        \"yui2-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"4":0,"6":0,"15":0,"28":0,"33":0,"34":0,"35":0,"37":0,"38":0,"43":0,"47":0,"48":0,"50":0,"52":0,"56":0,"60":0,"61":0,"65":0,"67":0,"68":0,"70":0,"73":0,"76":0,"78":0,"82":0,"87":0,"88":0,"91":0,"93":0,"96":0,"97":0,"100":0,"102":0,"107":0,"108":0,"110":0,"112":0,"113":0,"116":0,"117":0,"120":0,"125":0,"126":0,"127":0,"129":0,"134":0,"135":0,"136":0,"143":0,"145":0,"148":0,"149":0,"152":0,"153":0,"155":0,"162":0,"165":0,"167":0,"169":0,"170":0,"171":0,"173":0,"174":0,"175":0,"179":0,"186":0,"189":0,"190":0,"198":0,"199":0,"200":0,"201":0,"202":0,"203":0,"204":0,"205":0,"206":0,"210":0,"211":0,"212":0,"215":0,"218":0,"219":0,"222":0,"223":0,"232":0,"236":0,"237":0,"238":0,"241":0,"242":0,"245":0,"253":0,"260":0,"263":0,"270":0,"272":0,"273":0,"274":0,"276":0,"284":0,"286":0,"287":0,"288":0,"290":0,"322":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:27":0,"renderUI:42":0,"_renderTree:55":0,"(anonymous 2):87":0,"(anonymous 3):96":0,"(anonymous 4):107":0,"(anonymous 5):108":0,"(anonymous 6):110":0,"(anonymous 8):116":0,"(anonymous 7):112":0,"bindUI:81":0,"(anonymous 9):145":0,"(anonymous 10):148":0,"_refresh:142":0,"(anonymous 11):167":0,"(anonymous 12):169":0,"_attachData:161":0,"(anonymous 13):189":0,"_enhanceCells:185":0,"(anonymous 14):237":0,"(anonymous 15):241":0,"_restoreState:231":0,"_getModelFromLabelNode:252":0,"_getTableElement:259":0,"_setCollapsedIcon:269":0,"_setExpandedIcon:283":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 107;
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
TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Filter ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    /*
    * Reference pointer to the after EventHandler
    */
    afterEvent: null,

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 27);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 28);
var contentBox = this.get('contentBox'),
            width      = this.get('width'),
            height     = this.get('height'),
            model      = this.get('data');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 33);
contentBox.setStyle('width', width);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 34);
contentBox.setStyle('height', height);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 35);
contentBox.setStyle('overflow', 'auto');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 37);
if (model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 38);
this.afterEvent = model.after('load', this._refresh, this);
        }
    },

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 42);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 43);
var src        = this.get('srcNode'),
            container  = Y.Node.create('<div class="libbit-treeview-content"></div>'),
            sID        = Y.stamp(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 47);
container.set('id', sID);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 48);
src.append(container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 50);
this.set('treeContainer', container);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 52);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 55);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 56);
var model         = this.get('data'),
            treeContainer = this.get('treeContainer'),
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 60);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
this.get('tree').destroy();
        }

        // Clone the data object as the TreeView messes with it's internal structure.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 65);
items = this.get('renderLeaves') ? Y.clone(model.get('items')) : Y.clone(model.getBranches());

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 67);
tree = new YAHOO.widget.TreeView(treeContainer.get('id'), items);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 68);
tree.render();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
this.set('tree', tree);

        // XXX: Hide the tree while postprocessing?
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 73);
this._attachData();

        // TODO: Persist selection
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
this._restoreState();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 78);
this._enhanceCells();
    },

    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 81);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 82);
var self = this,
            tree = this.get('tree'),
            nodes;

        // Forward tree events so extensions and plugins can subscribe to them.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 87);
tree.subscribe('collapseComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 87);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 88);
var el = self._getTableElement(node).one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 91);
self._setCollapsedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 93);
self.fire('collapseComplete', { node: node });
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 96);
tree.subscribe('expandComplete', function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 96);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
var el = self._getTableElement(node).one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh');

            // Update the icon.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 100);
self._setExpandedIcon(el);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
self.fire('expandComplete', { node: node });
        });

        // Disable the default expand/collapse behaviour, only allow
        // expanding and collapsing when clicking the icon.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
tree.subscribe('expand',   function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 107);
return self.get('iconClicked'); });
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 108);
tree.subscribe('collapse', function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 5)", 108);
return self.get('iconClicked'); });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 110);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 6)", 110);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 112);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 7)", 112);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 113);
var table = self._getTableElement(node);

            // Rebind the click event.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
table.on('click', function (e) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 8)", 116);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 117);
var el = e.target.get('parentNode').get('parentNode');

                // Check if an expand/collapse icon was clicked.
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 120);
if (el.hasClass('ygtvtp') ||
                        el.hasClass('ygtvtph') ||
                        el.hasClass('ygtvlp') ||
                        el.hasClass('ygtvlph')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 125);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 126);
node.expand();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 127);
self.set('iconClicked', false);

                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 129);
if (el.hasClass('ygtvtm') ||
                        el.hasClass('ygtvtmh') ||
                        el.hasClass('ygtvlm') ||
                        el.hasClass('ygtvlmh')) {

                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 134);
self.set('iconClicked', true);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 135);
node.collapse();
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 136);
self.set('iconClicked', false);
                }}
            });
        });
    },

    _refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_refresh", 142);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 143);
var self  = this,
            tree  = this.get('tree'),
            nodes = tree.getNodesBy(function (node) { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 9)", 145);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 145);
return node.expanded; });

        // Store the state. Store by label for now, clientID seems bugged.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 148);
Y.Array.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 10)", 148);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 149);
self._stateMap.push(node.label);
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 152);
this._renderTree();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 153);
this.bindUI();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node.
     */
    _attachData: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachData", 161);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 162);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 165);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 167);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 11)", 167);
return true; });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 169);
Y.each(nodes, function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 12)", 169);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 170);
var table = self._getTableElement(node);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 171);
model = node.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 173);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 174);
table.setAttribute('data-yui3-record', model.get('clientId'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 175);
table.setData({ model: model });
            }
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 179);
tree.collapseAll();
    },

    /**
     * Add the tooltips and render the icons in the treeview.
     */
    _enhanceCells: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_enhanceCells", 185);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 186);
var self        = this,
            boundingBox = this.get('boundingBox');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 189);
boundingBox.all('.ygtvlabel').each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 13)", 189);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
var model         = self._getModelFromLabelNode(node),
                content       = node.getContent(),
                collapsedNode = node.ancestor('tr').one('.ygtvtp, .ygtvtph, .ygtvlp, .ygtvtlh'),
                expandedNode  = node.ancestor('tr').one('.ygtvtm, .ygtvtmh, .ygtvlm, .ygtvlmh'),
                contentNode,
                icon;

            // TODO: Retrieve icon from model mapping, allowHTML and formatter config like Y.DataTable.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
if (Y.TB) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
if (Y.instanceOf(model, Y.TB.Category)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 200);
icon = 'icon-folder-close';
                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
if (Y.instanceOf(model, Y.TB.FieldGroup)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 202);
icon = 'icon-align-left';
                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 203);
if (Y.instanceOf(model, Y.TB.Image)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 204);
icon = 'icon-picture';
                } else {_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
if (Y.instanceOf(model, Y.DocGen.Table)) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 206);
icon = 'icon-th';
                }}}}
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
if (icon) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
contentNode = Y.Node.create('<span class="label-container"><i class="' + icon + '"></i><span> ' + content + '</span></div>');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 212);
node.setContent(contentNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
node.ancestor('.ygtvtable').set('title', content);

            // Set the expand/colllapse items if necessary.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 218);
if (collapsedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 219);
self._setCollapsedIcon(collapsedNode);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 222);
if (expandedNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 223);
self._setExpandedIcon(expandedNode);
            }
        });
    },

    /**
     * Restores the current tree state if it's set.
     */
     _restoreState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreState", 231);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 232);
var self = this,
            tree = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
if (this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 237);
nodes = tree.getNodesBy(function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 14)", 237);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 238);
return self._stateMap.indexOf(node.label) > -1;
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 241);
Y.Array.each(nodes, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 15)", 241);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 242);
node.expand();
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 245);
this._stateMap = [];
        }
    },

    /**
     * Retrieves the model corresponding to a label DOM node.
     */
    _getModelFromLabelNode: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getModelFromLabelNode", 252);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 253);
return node.ancestor('table').getData().model;
    },

    /**
     * Retrieve the DOM element containing the main table of a given TreeView node.
     */
    _getTableElement: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_getTableElement", 259);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 260);
var boundingBox = this.get('boundingBox'),
            id          = node.labelElId;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 263);
return boundingBox.one('#' + id).ancestor('table');
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setCollapsedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setCollapsedIcon", 269);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 270);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 272);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 273);
a.one('i').removeClass('icon-chevron-down');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 274);
a.one('i').addClass('icon-chevron-right');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 276);
a.setContent(Y.Node.create('<i class="icon-toggle icon-chevron-right"></i>'));
        }
    },

    /**
     * Add an icon node or update an existing one.
     */
    _setExpandedIcon: function (el) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setExpandedIcon", 283);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 284);
var a = el.one('a');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 286);
if (a.one('i')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 287);
a.one('i').removeClass('icon-chevron-right');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 288);
a.one('i').addClass('icon-chevron-down');
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 290);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 322);
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
        "yui2-treeview"
    ],
    "skinnable": true
});
