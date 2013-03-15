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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","// TODO: Bind model events","// TODO: Table support, style odd/even","// TODO: Fix overflow CSS for Firefox","// TODO: Implement sorting","// TODO: Document data input","// TODO: Disable text selection within treenodes","TreeView = Y.Base.create('treeView', Y.Widget, [ Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.Filter, Y.Libbit.TreeView.DD ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Reference to all nodes (for use in extensions)","    **/","    _treeNodes: [],","","    /**","    * Selected node","    **/","    selectedNode: null,","","    /**","    * Icon (className) mapping for diffrent types of models","    **/","    _iconMap: [],","","    /**","     * Reference pointer to events","     */","    afterEvent: null,","    openEvent: null,","    closeEvent: null,","","    initializer: function () {","        var contentBox = this.get('contentBox'),","            width      = this.get('width'),","            height     = this.get('height'),","            model      = this.get('data');","","        contentBox.setStyle('width', width);","        contentBox.setStyle('height', height);","        contentBox.setStyle('overflow', 'auto');","","        if (model.get('icons')) {","            this._iconMap = model.get('icons');","        }","    },","","    destroy: function () {","            var tree = this.get('tree');","","            tree.detach('open', this._handleExpand);","            tree.detach('close', this._handleCollapse);","","        this.get('tree').destroy();","        this.set('tree', null);","        this.get('srcNode').empty();","        console.log('treedest!');","    },","","    getNodes: function() {","        return this._treeNodes;","    },","","    renderUI: function () {","        this.get('boundingBox').addClass('libbit-treeview-outer-container');","        this.get('srcNode').addClass('libbit-treeview-inner-container');","","        if (this.get('header')) {","            this.get('srcNode').prepend('<div class=\"nav-header\">' + this.get('header') + '</div>');","        }","        this._renderTree();","    },","","    _renderTree: function () {","        var filter = this.get('filter'),","            model  = this.get('data'),","            items,","            tree;","","        items = filter && filter.type ? model.filterByAttr(filter.type, filter.attr, filter.value) : model.get('items');","","        this._treeNodes = [];","","        if (this.get('tree')) {","            tree = this.get('tree');","","            tree.detach('open', this._handleExpand);","            tree.detach('close', this._handleCollapse);","","            while (tree.rootNode.children.length > 0) {","                tree.removeNode(tree.rootNode.children[0]);","            }","","            for (var i in items) {","                tree.insertNode(tree.rootNode, items[i]);","            }","        } else {","            tree = new Y.TreeView({","                container: this.get('srcNode'),","                nodes: items","            });","","            this.set('tree', tree);","","            tree.render();","        }","","        this._processTree(tree.rootNode);","        this._bindEvents();","    },","","    _bindEvents: function() {","        var tree = this.get('tree');","","        tree.on('open', this._handleExpand, this);","        tree.on('close', this._handleCollapse, this);","","        this.fire('Finished');","    },","","    _handleExpand: function (e) {","        var tree = this.get('tree');","        var li = tree.getHTMLNode(e.node);","","        this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));","        this.fire('expand', e);","    },","","    _handleCollapse: function (e) {","        var tree = this.get('tree');","        var li = tree.getHTMLNode(e.node);","        var stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));","","        delete this._stateMap[stateIndex];","        this.fire('collapse', e);","    },","","    /**","    * Folderstate icons","    **/","    bindUI: function () {","        var tree = this.get('tree');","","        tree.on(['open', 'close'], function(e) {","            var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');","","            if (e.type === 'treeView:close') {","                iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');","            }","","            if (iconEl) {","                if (e.type === 'treeView:close') {","                    iconEl.removeClass('icon-folder-open');","                    iconEl.addClass('icon-folder-close');","                } else {","                    iconEl.removeClass('icon-folder-close');","                    iconEl.addClass('icon-folder-open');","                }","            }","        });","    },","","    refresh: function () {","        this._renderTree();","        this.fire('refresh');","    },","","    /**","     * Store a reference to the model for each tree node and restore","     * the state of the treeNodes (opened and selected node(s)).","     */","    _processTree: function (rootNode) {","        var self = this,","            tree = this.get('tree');","","        if (rootNode.children.length) {","            rootNode.open();","        }","","        // Attach data to the nodes","        for (var i in rootNode.children) {","            var treeNode = rootNode.children[i],","                li = tree.getHTMLNode(treeNode);","                model = treeNode.data;","","            self._treeNodes.push(treeNode);","","            // Fix the width to be 100%.","            var count = 0;","            var current = li.ancestor('.yui3-treeview-children');","","            while (current.ancestor('.yui3-treeview-children')) {","                count++;","                current = current.ancestor('.yui3-treeview-children');","            }","","            if (count > 0) {","                var ml = count * 20;","","                if (ml) {","                    li.setStyle('marginLeft', -ml);","                    li.one('div').setStyle('paddingLeft', ml + 20);","                    li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);","                    li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);","                }","            }","","            if (Y.instanceOf(model, Y.Model)) {","                li.setAttribute('data-yui3-modelId', model.get('id'));","                li.setAttribute('data-yui3-record', model.get('clientId'));","","                // Set the title for mouseovers on long labels","                li.set('title', treeNode.label);","","                if (typeof(self._iconMap[model.name]) !== 'undefined') {","                    self._setIcon(li, self._iconMap[model.name]);","                }","","                li.setData({ model: model });","            }","","            if (treeNode.children) {","                // Walk through the tree recursively","                self._processTree(treeNode);","            }","        }","","        // Restore state of this node.","        if (rootNode !== tree.rootNode) {","            if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {","                rootNode.close();","            }","","            if (self.selectedNode === rootNode.data.get('id')) {","                rootNode.select();","            }","        }","    },","","    /**","     * Update the icon classes","     */","    _setIcon: function(node, className) {","        if (node) {","            iconNode = node.one('.yui3-treeview-icon');","","            if (iconNode) {","                iconNode.removeClass('yui3-treeview-icon');","                iconNode.addClass(className);","                iconNode.addClass('libbit-treeview-icon');","            }","        }","    }","","}, {","    ATTRS: {","        // Tree header, optional.","        header : {","            value: null","        },","","        // The data object containing the models.","        data : {","            value: null","        },","","        // The original tree object.","        tree : {","            value: null","        },","","        width : {","            value: null","        },","","        height : {","            value: null","        },","","        // Wether to render all nodes or just branches.","        renderLeaves: {","            value: true","        },","","        // State attribute.","        iconClicked : {","            value: false","        },","","        /**","         * A filter to apply to the tree","         *","         * @attribute {Object} filter","         */","        filter: {","            value : {","                type: null,","                attr: null,","                value: []","            }","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"transition\",","        \"libbit-model-tree\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-select\",","        \"libbit-treeview-dd\",","        \"widget\",","        \"gallery-sm-treeview\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"11":0,"41":0,"46":0,"47":0,"48":0,"50":0,"51":0,"56":0,"58":0,"59":0,"61":0,"62":0,"63":0,"64":0,"68":0,"72":0,"73":0,"75":0,"76":0,"78":0,"82":0,"87":0,"89":0,"91":0,"92":0,"94":0,"95":0,"97":0,"98":0,"101":0,"102":0,"105":0,"110":0,"112":0,"115":0,"116":0,"120":0,"122":0,"123":0,"125":0,"129":0,"130":0,"132":0,"133":0,"137":0,"138":0,"139":0,"141":0,"142":0,"149":0,"151":0,"152":0,"154":0,"155":0,"158":0,"159":0,"160":0,"161":0,"163":0,"164":0,"171":0,"172":0,"180":0,"183":0,"184":0,"188":0,"189":0,"191":0,"193":0,"196":0,"197":0,"199":0,"200":0,"201":0,"204":0,"205":0,"207":0,"208":0,"209":0,"210":0,"211":0,"215":0,"216":0,"217":0,"220":0,"222":0,"223":0,"226":0,"229":0,"231":0,"236":0,"237":0,"238":0,"241":0,"242":0,"251":0,"252":0,"254":0,"255":0,"256":0,"257":0,"313":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:40":0,"destroy:55":0,"getNodes:67":0,"renderUI:71":0,"_renderTree:81":0,"_bindEvents:119":0,"_handleExpand:128":0,"_handleCollapse:136":0,"(anonymous 2):151":0,"bindUI:148":0,"refresh:170":0,"_processTree:179":0,"_setIcon:250":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 104;
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
    },

    destroy: function () {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "destroy", 55);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 56);
var tree = this.get('tree');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 58);
tree.detach('open', this._handleExpand);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 59);
tree.detach('close', this._handleCollapse);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
this.get('tree').destroy();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
this.set('tree', null);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 63);
this.get('srcNode').empty();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 64);
console.log('treedest!');
    },

    getNodes: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "getNodes", 67);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 68);
return this._treeNodes;
    },

    renderUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "renderUI", 71);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 72);
this.get('boundingBox').addClass('libbit-treeview-outer-container');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 73);
this.get('srcNode').addClass('libbit-treeview-inner-container');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
if (this.get('header')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
this.get('srcNode').prepend('<div class="nav-header">' + this.get('header') + '</div>');
        }
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 78);
this._renderTree();
    },

    _renderTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_renderTree", 81);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 82);
var filter = this.get('filter'),
            model  = this.get('data'),
            items,
            tree;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 87);
items = filter && filter.type ? model.filterByAttr(filter.type, filter.attr, filter.value) : model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 89);
this._treeNodes = [];

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 91);
if (this.get('tree')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 92);
tree = this.get('tree');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 94);
tree.detach('open', this._handleExpand);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 95);
tree.detach('close', this._handleCollapse);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
while (tree.rootNode.children.length > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 98);
tree.removeNode(tree.rootNode.children[0]);
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
for (var i in items) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
tree.insertNode(tree.rootNode, items[i]);
            }
        } else {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 105);
tree = new Y.TreeView({
                container: this.get('srcNode'),
                nodes: items
            });

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 110);
this.set('tree', tree);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 112);
tree.render();
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 115);
this._processTree(tree.rootNode);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
this._bindEvents();
    },

    _bindEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_bindEvents", 119);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 120);
var tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 122);
tree.on('open', this._handleExpand, this);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 123);
tree.on('close', this._handleCollapse, this);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 125);
this.fire('Finished');
    },

    _handleExpand: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 128);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 129);
var tree = this.get('tree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 130);
var li = tree.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 133);
this.fire('expand', e);
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 136);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 137);
var tree = this.get('tree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 138);
var li = tree.getHTMLNode(e.node);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 139);
var stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 141);
delete this._stateMap[stateIndex];
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 142);
this.fire('collapse', e);
    },

    /**
    * Folderstate icons
    **/
    bindUI: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "bindUI", 148);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 149);
var tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 151);
tree.on(['open', 'close'], function(e) {
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 151);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 152);
var iconEl = tree.getHTMLNode(e.node).one('.icon-folder-close');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 154);
if (e.type === 'treeView:close') {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
iconEl = tree.getHTMLNode(e.node).one('.icon-folder-open');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 158);
if (iconEl) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 159);
if (e.type === 'treeView:close') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 160);
iconEl.removeClass('icon-folder-open');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 161);
iconEl.addClass('icon-folder-close');
                } else {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 163);
iconEl.removeClass('icon-folder-close');
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 164);
iconEl.addClass('icon-folder-open');
                }
            }
        });
    },

    refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "refresh", 170);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 171);
this._renderTree();
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 172);
this.fire('refresh');
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_processTree", 179);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 180);
var self = this,
            tree = this.get('tree');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 183);
if (rootNode.children.length) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 184);
rootNode.open();
        }

        // Attach data to the nodes
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 188);
for (var i in rootNode.children) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 189);
var treeNode = rootNode.children[i],
                li = tree.getHTMLNode(treeNode);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 191);
model = treeNode.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
self._treeNodes.push(treeNode);

            // Fix the width to be 100%.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 196);
var count = 0;
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 197);
var current = li.ancestor('.yui3-treeview-children');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
while (current.ancestor('.yui3-treeview-children')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 200);
count++;
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
current = current.ancestor('.yui3-treeview-children');
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 204);
if (count > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
var ml = count * 20;

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 207);
if (ml) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 208);
li.setStyle('marginLeft', -ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 209);
li.one('div').setStyle('paddingLeft', ml + 20);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
li.ancestor('.yui3-treeview-children').setStyle('marginLeft', ml);
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
li.one('.yui3-treeview-indicator').setStyle('marginLeft', ml);
                }
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
if (Y.instanceOf(model, Y.Model)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 216);
li.setAttribute('data-yui3-modelId', model.get('id'));
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 217);
li.setAttribute('data-yui3-record', model.get('clientId'));

                // Set the title for mouseovers on long labels
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 220);
li.set('title', treeNode.label);

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 222);
if (typeof(self._iconMap[model.name]) !== 'undefined') {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 223);
self._setIcon(li, self._iconMap[model.name]);
                }

                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
li.setData({ model: model });
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 229);
if (treeNode.children) {
                // Walk through the tree recursively
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 231);
self._processTree(treeNode);
            }
        }

        // Restore state of this node.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
if (rootNode !== tree.rootNode) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 237);
if (Y.Array.indexOf(self._stateMap, rootNode.data.get('id')) === -1) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 238);
rootNode.close();
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 241);
if (self.selectedNode === rootNode.data.get('id')) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 242);
rootNode.select();
            }
        }
    },

    /**
     * Update the icon classes
     */
    _setIcon: function(node, className) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setIcon", 250);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 251);
if (node) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 252);
iconNode = node.one('.yui3-treeview-icon');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 254);
if (iconNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 255);
iconNode.removeClass('yui3-treeview-icon');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 256);
iconNode.addClass(className);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 257);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 313);
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
