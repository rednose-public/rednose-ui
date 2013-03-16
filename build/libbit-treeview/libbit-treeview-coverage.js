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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","var Micro = Y.Template.Micro;","","Y.namespace('TreeView').Templates = {","    children: Micro.compile(","        '<ul class=\"<%= data.classNames.children %>\" ' +","","            '<% if (data.node.isRoot()) { %>' +","                'role=\"tree\" tabindex=\"0\"' +","            '<% } else { %>' +","                'role=\"group\"' +","            '<% } %>' +","","        '></ul>'","    ),","","    node: Micro.compile(","        '<li id=\"<%= data.node.id %>\" class=\"<%= data.nodeClassNames.join(\" \") %>\" role=\"treeitem\" aria-labelled-by=\"<%= data.node.id %>-label\">' +","            '<div class=\"<%= data.classNames.row %>\" data-node-id=\"<%= data.node.id %>\" data-libbit-type=\"<%= data.node.data.name %>\" data-libbit-id=\"<%= data.node.data.get(\\'id\\')%>\">' +","                '<span class=\"<%= data.classNames.indicator %>\"><s></s></span>' +","                '<span class=\"<%= data.classNames.icon %>\"></span>' +","                '<span id=\"<%= data.node.id %>-label\" class=\"<%= data.classNames.label %>\"><%== data.node.label %></span>' +","            '</div>' +","        '</li>'","    )","};","","TreeView = Y.Base.create('treeView', Y.TreeView, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD /*, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.Filter*/ ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    _selectMap: [],","","    // /**","    // * Reference to all nodes (for use in extensions)","    // **/","    // _treeNodes: [],","","    // /**","    // * Selected node","    // **/","    // selectedNode: null,","","    /**","    * Icon (className) mapping for different types of models","    **/","    _iconMap: [],","","    initializer: function (config) {","        // if nodes typeof model tree then get items","        // console.log(config);","        config.nodes = config.data.get('items');","        // TODO: check for initial filter","        this.set('data', config.data);","        // console.log(config.data.get('items')[0]);","        // config.nodes = [];","        // var self = this;","","        if (config.header) {","            this.header = config.header;","        }","","        var classNames = this.classNames;","        var container = this.get('container'),","            // width      = this.get('width'),","            // height     = this.get('height'),","            model      = this.get('data');","","        // container.delegate('click', this._onRowClick, '.' + classNames.row, this),","         // container.delegate('click', function (e) {","         //    var node = this.getNodeById(e.currentTarget.getData('node-id'));","         //    console.log(node.data);","         // }, '.' + classNames.row, this);","","","","        this.on('open', this._handleExpand, this);","        this.on('close', this._handleCollapse, this);","","        this.on('select', this._handleSelectState, this);","        this.on('unselect', this._handleUnSelectState, this);","        // contentBox.setStyle('width', width);","        // contentBox.setStyle('height', height);","        // contentBox.setStyle('overflow', 'auto');","","        if (model.get('icons')) {","            this._iconMap = model.get('icons');","        }","","        // model.after('load', this.refresh, this);","        // this._attachEvents();","        // this.on(['open', 'close'], this._handleIcon, this);","        // this.on('initializedChange', function () {","            // console.log(config);","            // console.log(this.config);","            // console.log(this.nodes);","","            // console.log(this.get('nodes'));","            // self.set('nodes', []);","            // console.log('asdasd');","        // });","        // console.log(this.get('nodes'));","        // this.insertNode(this.rootNode, [], {silent: true});","        // console.log('tree');","        // this.set('nodes', this.get('data').get('items'));","    //     this.tc = Y.Node.create('<div class=\"tc\"></div>');","        // this._attachEvents();","    },","","    render: function () {","        var container = this.get('container'),","            header    = this.get('header');","","        // if (header) {","        //     container.append('<div class=\"nav-header\">' + header + '</div>');","        // }","        // var container = this.get('container');//,","        //     // inner     = Y.Node.create('<div class=\"libbit-treeview-inner-container></div>');","","        // container.addClass('libbit-treeview-outer-container');","        // this.set('container', inner);","        // this.get('srcNode').addClass('libbit-treeview-inner-container');","","        this.constructor.superclass.render.apply(this);","","        var self = this;","        // Select needs to be restored after the tree is rendered.","        Y.Array.each(this._selectMap, function (id) {","            // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it","            // after another selection is made.","            var record = self._parseLibbitRecordId(id);","","            container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {","","                if (node.getData('libbit-id') === record[1]) {","                    self.getNodeById(node.getData('node-id')).select();","                }","            });","        });","        // console.log(index);","","        // DD","        // container.one('ul').addClass('libbit-treeview-inner-container');","","        // this._processTree(this.rootNode);","    },","","    // FIXME: Render gets called twice after model reload","    refresh: function () {","        if (!this.rendered) {","            return;","        }","","        var nodes = this.get('data').get('items');","","        this.clear({silent: true});","","        if (nodes) {","            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            Y.Array.each(treeNodes, function (treeNode) {","                this.test(treeNode);","            }, this);","        }","","        this.render();","    },","","    _generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    _parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    test: function (node) {","         var id = this._generateLibbitRecordId(node.data);","         var index = Y.Array.indexOf(this._stateMap, id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this.test(child);","            }, this);","        }","        // if open map","        // console.log(node.children);","","        // this._detachEvents();","        // this._processTree(this.rootNode);","        // this._buildTree();","","        // this._attachEvents();","    },","","    _buildTree: function () {","        var items = this.get('data').get('items');","","        if (this.rendered) {","            while (this.rootNode.children.length > 0) {","                this.removeNode(this.rootNode.children[0]);","            }","        }","","        for (var i in items) {","            var node = this.insertNode(this.rootNode, items[i], { silent: true });","            console.log(node);","        }","","        // this._childrenNode = this.renderChildren(this.rootNode, {","        //     container: this.get('container').container","        // });","","        // this.render();","    },","","    /**","     * Store a reference to the model for each tree node and restore","     * the state of the treeNodes (opened and selected node(s)).","     */","    _processTree: function (rootNode) {","        if (rootNode.children.length) {","            // rootNode.open();","            // rootNode.open({ silent: true });","            // this._afterOpen({ node: rootNode });","        }","","        // Attach data to the nodes","        for (var i in rootNode.children) {","            var treeNode = rootNode.children[i];","","        //     // this._treeNodes.push(treeNode);","","        //     // this._fixWidth(treeNode);","        //     this._bindModel(treeNode);","","        //     console.log('node!');","            if (treeNode.children) {","                // Walk through the tree recursively","                this._processTree(treeNode);","            }","        }","","        // Restore state of this node.","        // if (rootNode !== this.rootNode) {","        //     if (Y.Array.indexOf(this._stateMap, rootNode.data.get('id')) === -1) {","        //         rootNode.close();","        //     }","","        //     if (Y.Array.indexOf(this._selectMap, rootNode.data.get('id')) !== -1) {","        //         rootNode.select();","        //     }","        // }","    },","","    _fixWidth: function (node) {","        var li = this.getHTMLNode(node);","        var count = 0;","        var current = li.ancestor('.' + this.classNames.children);","","        while (current.ancestor('.' + this.classNames.children)) {","            count++;","            current = current.ancestor('.' + this.classNames.children);","        }","","        if (count > 0) {","            var ml = count * 20;","","            if (ml) {","                li.setStyle('marginLeft', -ml);","                li.one('div').setStyle('paddingLeft', ml + 20);","                li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","                li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","            }","        }","    },","","    _bindModel: function (node) {","        var li    = this.getHTMLNode(node),","            model = node.data;","","            console.log(li);","        // if (Y.instanceOf(model, Y.Model)) {","        //     li.setAttribute('data-yui3-modelId', model.get('id'));","        //     li.setAttribute('data-yui3-record', model.get('clientId'));","","        //     // Set the title for mouseovers on long labels","        //     li.set('title', node.label);","","        //     if (typeof(this._iconMap[model.name]) !== 'undefined') {","        //         this._setIcon(li, this._iconMap[model.name]);","        //     }","","        //     li.setData({ model: model });","        // }","    },","","    /**","     * Update the icon classes","     */","    _setIcon: function(node, className) {","        if (node) {","            var iconNode = node.one('.' + this.classNames.icon);","","            if (iconNode) {","                iconNode.removeClass(this.classNames.icon);","                iconNode.addClass(className);","                iconNode.addClass('libbit-treeview-icon');","            }","        }","    },","","    _attachEvents: function() {","        this.on('open', this._handleExpand, this);","        this.on('close', this._handleCollapse, this);","    },","","    _detachEvents: function() {","        this.detach('open', this._handleExpand);","        this.detach('close', this._handleCollapse);","        this.detach('select', this._handleSelectState);","    },","","    _handleSelectState: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","        var index = Y.Array.indexOf(this._selectMap, id);","","        if (index === -1) {","            this._selectMap.push(id);","        }","    },","","    _handleUnSelectState: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","        var index = Y.Array.indexOf(this._selectMap, id);","","        if (index !== -1) {","           this._selectMap.splice(index, 1);","        }","    },","","    /**","    * Folderstate icons","    **/","    _handleIcon: function (e) {","        var node   = e.node,","            type   = e.type,","            iconEl = this.getHTMLNode(node).one('.icon-folder-close');","","        if (type === 'treeView:close') {","            iconEl = this.getHTMLNode(node).one('.icon-folder-open');","        }","","        if (iconEl) {","            if (type === 'treeView:close') {","                iconEl.removeClass('icon-folder-open');","                iconEl.addClass('icon-folder-close');","            } else {","                iconEl.removeClass('icon-folder-close');","                iconEl.addClass('icon-folder-open');","            }","        }","    },","","    _handleExpand: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","         var index = Y.Array.indexOf(this._stateMap, id);","        // TODO: Cleanup statemap after refresh?","         // var id = e.currentTarget.getData('node-id');","        // var li = this.getHTMLNode(e.node);","","        // this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));","        if (index === -1) {","            this._stateMap.push(id);","        }","        // this.fire('expand', e);","    },","","    _handleCollapse: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","         // var id = e.currentTarget.getData('node-id');","         var index = Y.Array.indexOf(this._stateMap, id);","        // var li         = this.getHTMLNode(e.node),","        //     stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","        // this.fire('collapse', e);","    },","","    _disableEvent: function (e) {","        e.stopImmediatePropagation();","    }","}, {","    ATTRS: {","        // Tree header, optional.","        header : {","            value: null","        },","","        // // The data object containing the models.","        // data : {","        //     value: null","        // },","","        // // The original tree object.","        // tree : {","        //     value: null","        // },","","        // width : {","        //     value: null","        // },","","        // height : {","        //     value: null","        // },","","        // // Wether to render all nodes or just branches.","        // renderLeaves: {","        //     value: true","        // },","","        /**","         * A filter to apply to the tree","         *","         * @attribute {Object} filter","         */","        filter: {","            value : {","                type: null,","                attr: null,","                value: []","            }","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"5":0,"7":0,"31":0,"58":0,"60":0,"65":0,"66":0,"69":0,"70":0,"83":0,"84":0,"86":0,"87":0,"92":0,"93":0,"117":0,"130":0,"132":0,"134":0,"137":0,"139":0,"141":0,"142":0,"156":0,"157":0,"160":0,"162":0,"164":0,"165":0,"166":0,"167":0,"171":0,"175":0,"176":0,"179":0,"183":0,"187":0,"188":0,"190":0,"191":0,"195":0,"196":0,"197":0,"211":0,"213":0,"214":0,"215":0,"219":0,"220":0,"221":0,"236":0,"243":0,"244":0,"252":0,"254":0,"271":0,"272":0,"273":0,"275":0,"276":0,"277":0,"280":0,"281":0,"283":0,"284":0,"285":0,"286":0,"287":0,"293":0,"296":0,"316":0,"317":0,"319":0,"320":0,"321":0,"322":0,"328":0,"329":0,"333":0,"334":0,"335":0,"339":0,"340":0,"342":0,"343":0,"348":0,"349":0,"351":0,"352":0,"360":0,"364":0,"365":0,"368":0,"369":0,"370":0,"371":0,"373":0,"374":0,"380":0,"381":0,"387":0,"388":0,"394":0,"396":0,"400":0,"401":0,"407":0,"455":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:55":0,"(anonymous 3):139":0,"(anonymous 2):134":0,"render:116":0,"(anonymous 4):166":0,"refresh:155":0,"_generateLibbitRecordId:174":0,"_parseLibbitRecordId:182":0,"(anonymous 5):196":0,"test:186":0,"_buildTree:210":0,"_processTree:235":0,"_fixWidth:270":0,"_bindModel:292":0,"_setIcon:315":0,"_attachEvents:327":0,"_detachEvents:332":0,"_handleSelectState:338":0,"_handleUnSelectState:347":0,"_handleIcon:359":0,"_handleExpand:379":0,"_handleCollapse:393":0,"_disableEvent:406":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 110;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 24;
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 1);
YUI.add('libbit-treeview', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 3);
var TreeView;

_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 5);
var Micro = Y.Template.Micro;

_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 7);
Y.namespace('TreeView').Templates = {
    children: Micro.compile(
        '<ul class="<%= data.classNames.children %>" ' +

            '<% if (data.node.isRoot()) { %>' +
                'role="tree" tabindex="0"' +
            '<% } else { %>' +
                'role="group"' +
            '<% } %>' +

        '></ul>'
    ),

    node: Micro.compile(
        '<li id="<%= data.node.id %>" class="<%= data.nodeClassNames.join(" ") %>" role="treeitem" aria-labelled-by="<%= data.node.id %>-label">' +
            '<div class="<%= data.classNames.row %>" data-node-id="<%= data.node.id %>" data-libbit-type="<%= data.node.data.name %>" data-libbit-id="<%= data.node.data.get(\'id\')%>">' +
                '<span class="<%= data.classNames.indicator %>"><s></s></span>' +
                '<span class="<%= data.classNames.icon %>"></span>' +
                '<span id="<%= data.node.id %>-label" class="<%= data.classNames.label %>"><%== data.node.label %></span>' +
            '</div>' +
        '</li>'
    )
};

_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 31);
TreeView = Y.Base.create('treeView', Y.TreeView, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD /*, Y.Libbit.TreeView.Selectable, Y.Libbit.TreeView.Filter*/ ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    _selectMap: [],

    // /**
    // * Reference to all nodes (for use in extensions)
    // **/
    // _treeNodes: [],

    // /**
    // * Selected node
    // **/
    // selectedNode: null,

    /**
    * Icon (className) mapping for different types of models
    **/
    _iconMap: [],

    initializer: function (config) {
        // if nodes typeof model tree then get items
        // console.log(config);
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 55);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 58);
config.nodes = config.data.get('items');
        // TODO: check for initial filter
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 60);
this.set('data', config.data);
        // console.log(config.data.get('items')[0]);
        // config.nodes = [];
        // var self = this;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 65);
if (config.header) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
this.header = config.header;
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 69);
var classNames = this.classNames;
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
var container = this.get('container'),
            // width      = this.get('width'),
            // height     = this.get('height'),
            model      = this.get('data');

        // container.delegate('click', this._onRowClick, '.' + classNames.row, this),
         // container.delegate('click', function (e) {
         //    var node = this.getNodeById(e.currentTarget.getData('node-id'));
         //    console.log(node.data);
         // }, '.' + classNames.row, this);



        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
this.on('open', this._handleExpand, this);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 84);
this.on('close', this._handleCollapse, this);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
this.on('select', this._handleSelectState, this);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 87);
this.on('unselect', this._handleUnSelectState, this);
        // contentBox.setStyle('width', width);
        // contentBox.setStyle('height', height);
        // contentBox.setStyle('overflow', 'auto');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 92);
if (model.get('icons')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 93);
this._iconMap = model.get('icons');
        }

        // model.after('load', this.refresh, this);
        // this._attachEvents();
        // this.on(['open', 'close'], this._handleIcon, this);
        // this.on('initializedChange', function () {
            // console.log(config);
            // console.log(this.config);
            // console.log(this.nodes);

            // console.log(this.get('nodes'));
            // self.set('nodes', []);
            // console.log('asdasd');
        // });
        // console.log(this.get('nodes'));
        // this.insertNode(this.rootNode, [], {silent: true});
        // console.log('tree');
        // this.set('nodes', this.get('data').get('items'));
    //     this.tc = Y.Node.create('<div class="tc"></div>');
        // this._attachEvents();
    },

    render: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "render", 116);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 117);
var container = this.get('container'),
            header    = this.get('header');

        // if (header) {
        //     container.append('<div class="nav-header">' + header + '</div>');
        // }
        // var container = this.get('container');//,
        //     // inner     = Y.Node.create('<div class="libbit-treeview-inner-container></div>');

        // container.addClass('libbit-treeview-outer-container');
        // this.set('container', inner);
        // this.get('srcNode').addClass('libbit-treeview-inner-container');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 130);
this.constructor.superclass.render.apply(this);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
var self = this;
        // Select needs to be restored after the tree is rendered.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 134);
Y.Array.each(this._selectMap, function (id) {
            // TODO: if the selected node is not visible yet, bind an event on 'open' and unbind it
            // after another selection is made.
            _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 134);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 137);
var record = self._parseLibbitRecordId(id);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 139);
container.all('[data-libbit-type=' + record[0] + ']').each(function (node) {

                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 139);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 141);
if (node.getData('libbit-id') === record[1]) {
                    _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 142);
self.getNodeById(node.getData('node-id')).select();
                }
            });
        });
        // console.log(index);

        // DD
        // container.one('ul').addClass('libbit-treeview-inner-container');

        // this._processTree(this.rootNode);
    },

    // FIXME: Render gets called twice after model reload
    refresh: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "refresh", 155);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 156);
if (!this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 157);
return;
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 160);
var nodes = this.get('data').get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 162);
this.clear({silent: true});

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 164);
if (nodes) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 165);
var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 166);
Y.Array.each(treeNodes, function (treeNode) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 166);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 167);
this.test(treeNode);
            }, this);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 171);
this.render();
    },

    _generateLibbitRecordId: function (model) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_generateLibbitRecordId", 174);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 175);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 176);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 179);
return null;
    },

    _parseLibbitRecordId: function (id) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_parseLibbitRecordId", 182);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 183);
return id.split('_');
    },

    test: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "test", 186);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
var id = this._generateLibbitRecordId(node.data);
         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 188);
var index = Y.Array.indexOf(this._stateMap, id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 191);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 196);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 5)", 196);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 197);
this.test(child);
            }, this);
        }
        // if open map
        // console.log(node.children);

        // this._detachEvents();
        // this._processTree(this.rootNode);
        // this._buildTree();

        // this._attachEvents();
    },

    _buildTree: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_buildTree", 210);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
var items = this.get('data').get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 213);
if (this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
while (this.rootNode.children.length > 0) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
this.removeNode(this.rootNode.children[0]);
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 219);
for (var i in items) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 220);
var node = this.insertNode(this.rootNode, items[i], { silent: true });
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 221);
console.log(node);
        }

        // this._childrenNode = this.renderChildren(this.rootNode, {
        //     container: this.get('container').container
        // });

        // this.render();
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_processTree", 235);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
if (rootNode.children.length) {
            // rootNode.open();
            // rootNode.open({ silent: true });
            // this._afterOpen({ node: rootNode });
        }

        // Attach data to the nodes
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 243);
for (var i in rootNode.children) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 244);
var treeNode = rootNode.children[i];

        //     // this._treeNodes.push(treeNode);

        //     // this._fixWidth(treeNode);
        //     this._bindModel(treeNode);

        //     console.log('node!');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 252);
if (treeNode.children) {
                // Walk through the tree recursively
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 254);
this._processTree(treeNode);
            }
        }

        // Restore state of this node.
        // if (rootNode !== this.rootNode) {
        //     if (Y.Array.indexOf(this._stateMap, rootNode.data.get('id')) === -1) {
        //         rootNode.close();
        //     }

        //     if (Y.Array.indexOf(this._selectMap, rootNode.data.get('id')) !== -1) {
        //         rootNode.select();
        //     }
        // }
    },

    _fixWidth: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_fixWidth", 270);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 271);
var li = this.getHTMLNode(node);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 272);
var count = 0;
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 273);
var current = li.ancestor('.' + this.classNames.children);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 275);
while (current.ancestor('.' + this.classNames.children)) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 276);
count++;
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 277);
current = current.ancestor('.' + this.classNames.children);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 280);
if (count > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 281);
var ml = count * 20;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 283);
if (ml) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 284);
li.setStyle('marginLeft', -ml);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 285);
li.one('div').setStyle('paddingLeft', ml + 20);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 286);
li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 287);
li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);
            }
        }
    },

    _bindModel: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_bindModel", 292);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 293);
var li    = this.getHTMLNode(node),
            model = node.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 296);
console.log(li);
        // if (Y.instanceOf(model, Y.Model)) {
        //     li.setAttribute('data-yui3-modelId', model.get('id'));
        //     li.setAttribute('data-yui3-record', model.get('clientId'));

        //     // Set the title for mouseovers on long labels
        //     li.set('title', node.label);

        //     if (typeof(this._iconMap[model.name]) !== 'undefined') {
        //         this._setIcon(li, this._iconMap[model.name]);
        //     }

        //     li.setData({ model: model });
        // }
    },

    /**
     * Update the icon classes
     */
    _setIcon: function(node, className) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setIcon", 315);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 316);
if (node) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 317);
var iconNode = node.one('.' + this.classNames.icon);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 319);
if (iconNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 320);
iconNode.removeClass(this.classNames.icon);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 321);
iconNode.addClass(className);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 322);
iconNode.addClass('libbit-treeview-icon');
            }
        }
    },

    _attachEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEvents", 327);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 328);
this.on('open', this._handleExpand, this);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 329);
this.on('close', this._handleCollapse, this);
    },

    _detachEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEvents", 332);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 333);
this.detach('open', this._handleExpand);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 334);
this.detach('close', this._handleCollapse);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 335);
this.detach('select', this._handleSelectState);
    },

    _handleSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleSelectState", 338);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 339);
var id = this._generateLibbitRecordId(e.node.data);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 340);
var index = Y.Array.indexOf(this._selectMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 342);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 343);
this._selectMap.push(id);
        }
    },

    _handleUnSelectState: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleUnSelectState", 347);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 348);
var id = this._generateLibbitRecordId(e.node.data);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 349);
var index = Y.Array.indexOf(this._selectMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 351);
if (index !== -1) {
           _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 352);
this._selectMap.splice(index, 1);
        }
    },

    /**
    * Folderstate icons
    **/
    _handleIcon: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleIcon", 359);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 360);
var node   = e.node,
            type   = e.type,
            iconEl = this.getHTMLNode(node).one('.icon-folder-close');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 364);
if (type === 'treeView:close') {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 365);
iconEl = this.getHTMLNode(node).one('.icon-folder-open');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 368);
if (iconEl) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 369);
if (type === 'treeView:close') {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 370);
iconEl.removeClass('icon-folder-open');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 371);
iconEl.addClass('icon-folder-close');
            } else {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 373);
iconEl.removeClass('icon-folder-close');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 374);
iconEl.addClass('icon-folder-open');
            }
        }
    },

    _handleExpand: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 379);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 380);
var id = this._generateLibbitRecordId(e.node.data);
         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 381);
var index = Y.Array.indexOf(this._stateMap, id);
        // TODO: Cleanup statemap after refresh?
         // var id = e.currentTarget.getData('node-id');
        // var li = this.getHTMLNode(e.node);

        // this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 387);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 388);
this._stateMap.push(id);
        }
        // this.fire('expand', e);
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 393);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 394);
var id = this._generateLibbitRecordId(e.node.data);
         // var id = e.currentTarget.getData('node-id');
         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 396);
var index = Y.Array.indexOf(this._stateMap, id);
        // var li         = this.getHTMLNode(e.node),
        //     stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 400);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 401);
this._stateMap.splice(index, 1);
        }
        // this.fire('collapse', e);
    },

    _disableEvent: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_disableEvent", 406);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 407);
e.stopImmediatePropagation();
    }
}, {
    ATTRS: {
        // Tree header, optional.
        header : {
            value: null
        },

        // // The data object containing the models.
        // data : {
        //     value: null
        // },

        // // The original tree object.
        // tree : {
        //     value: null
        // },

        // width : {
        //     value: null
        // },

        // height : {
        //     value: null
        // },

        // // Wether to render all nodes or just branches.
        // renderLeaves: {
        //     value: true
        // },

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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 455);
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "gallery-sm-treeview",
        "libbit-model-tree",
        "libbit-treeview-anim",
        "libbit-treeview-dd",
        "libbit-treeview-filter",
        "libbit-treeview-select"
    ],
    "supersedes": [
        "gallery-sm-treeview-templates"
    ],
    "skinnable": true
});
