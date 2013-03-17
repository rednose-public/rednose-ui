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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","var Micro = Y.Template.Micro;","","Y.namespace('TreeView').Templates = {","    children: Micro.compile(","        '<ul class=\"<%= data.classNames.children %>\" ' +","","            '<% if (data.node.isRoot()) { %>' +","                'role=\"tree\" tabindex=\"0\"' +","            '<% } else { %>' +","                'role=\"group\"' +","            '<% } %>' +","","        '></ul>'","    ),","","    node: Micro.compile(","        '<li id=\"<%= data.node.id %>\" class=\"<%= data.nodeClassNames.join(\" \") %>\" role=\"treeitem\" aria-labelled-by=\"<%= data.node.id %>-label\">' +","            '<div class=\"<%= data.classNames.row %>\" data-node-id=\"<%= data.node.id %>\" data-libbit-type=\"<%= data.node.data.name %>\" data-libbit-id=\"<%= data.node.data.get(\\'id\\')%>\">' +","                '<span class=\"<%= data.classNames.indicator %>\"><s></s></span>' +","                '<span class=\"<%= data.classNames.icon %>\"></span>' +","                '<span id=\"<%= data.node.id %>-label\" class=\"<%= data.classNames.label %>\"><%== data.node.label %></span>' +","            '</div>' +","        '</li>'","    )","};","","TreeView = Y.Base.create('treeView', Y.TreeView, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD,  Y.Libbit.TreeView.Selectable/*, Y.Libbit.TreeView.Filter*/ ], {","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Icon (className) mapping for different types of models","    **/","    _iconMap: [],","","    initializer: function (config) {","        // if nodes typeof model tree then get items","        // console.log(config);","        // Hook into the initializer chain","        config.nodes = config.model.get('items');","        // TODO: check for initial filter","        this.set('model', config.model);","        // config.nodes = [];","        // var self = this;","","        // console.log(config.model);","        if (config.header) {","            this.header = config.header;","        }","","        var classNames = this.classNames;","        var container = this.get('container'),","            // width      = this.get('width'),","            // height     = this.get('height'),","            model      = this.get('model');","","        // container.delegate('click', this._onRowClick, '.' + classNames.row, this),","         // container.delegate('click', function (e) {","         //    var node = this.getNodeById(e.currentTarget.getData('node-id'));","         // }, '.' + classNames.row, this);","","","        this.on('open', this._handleExpand, this);","        this.on('close', this._handleCollapse, this);","","        // this._restoreSelectState();","","        // contentBox.setStyle('width', width);","        // contentBox.setStyle('height', height);","        // contentBox.setStyle('overflow', 'auto');","","        if (model.get('icons')) {","            this._iconMap = model.get('icons');","        }","","        this._eventHandles || (this._eventHandles = []);","","","        this._eventHandles.push(","            model.after('change', this._handleModelChange, this)","        );","        // this._attachEvents();","        // this.on(['open', 'close'], this._handleIcon, this);","        // this.on('initializedChange', function () {","            // console.log(this.nodes);","","            // console.log(this.get('nodes'));","            // self.set('nodes', []);","            // console.log('asdasd');","        // });","        // console.log(this.get('nodes'));","        // this.insertNode(this.rootNode, [], {silent: true});","        // console.log('tree');","        // this.set('nodes', this.get('model').get('items'));","    //     this.tc = Y.Node.create('<div class=\"tc\"></div>');","        // this._attachEvents();","    },","","    // Destroy the associated model to clean up attached events.","    destructor: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","        // this.get('model').destroy();","    },","","    render: function () {","        var container     = this.get('container'),","            isTouchDevice = 'ontouchstart' in Y.config.win;","","        container.addClass(this.classNames.treeview);","        container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);","","        this._childrenNode = this.renderChildren(this.rootNode, {","            container: container","        });","","        // console.log(this.rootNode);","        this.rendered = true;","","        console.log('renderTree');","        return this;","        // var container = this.get('container'),","        //     header    = this.get('header');","","        // if (header) {","        //     container.append('<div class=\"nav-header\">' + header + '</div>');","        // }","        // var container = this.get('container');//,","        //     // inner     = Y.Node.create('<div class=\"libbit-treeview-inner-container></div>');","","        // container.addClass('libbit-treeview-outer-container');","        // this.set('container', inner);","        // this.get('srcNode').addClass('libbit-treeview-inner-container');","","        // this.constructor.superclass.render.apply(this);","","        // console.log(index);","","        // DD","        // container.one('ul').addClass('libbit-treeview-inner-container');","","        // this._processTree(this.rootNode);","    },","","    _handleModelChange: function () {","        this.fire('mc');","        var nodes = this.get('model').get('items');","","        this.clear({silent: true});","","        if (nodes) {","            // Returns an array of references to the created tree nodes.","            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            this._restoreTreeOpenState(treeNodes);","        }","","        this.render();","    },","","    _generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    _parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    _restoreTreeOpenState: function () {","        var self     = this,","            rootNode = this.rootNode;","","        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {","            Y.Array.each(rootNode.children, function (node) {","                self._restoreNodeOpenState(node);","            });","        }","    },","","    _restoreNodeOpenState: function (node) {","         var id    = this._generateLibbitRecordId(node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this._restoreNodeOpenState(child);","            }, this);","        }","        // if open map","        // console.log(node.children);","","        // this._detachEvents();","        // this._processTree(this.rootNode);","","        // this._attachEvents();","    },","","    /**","     * Store a reference to the model for each tree node and restore","     * the state of the treeNodes (opened and selected node(s)).","     */","    _processTree: function (rootNode) {","        if (rootNode.children.length) {","            // rootNode.open();","            // rootNode.open({ silent: true });","            // this._afterOpen({ node: rootNode });","        }","","        // Attach data to the nodes","        for (var i in rootNode.children) {","            var treeNode = rootNode.children[i];","","        //     // this._treeNodes.push(treeNode);","","        //     // this._fixWidth(treeNode);","        //     this._bindModel(treeNode);","","        //     console.log('node!');","            if (treeNode.children) {","                // Walk through the tree recursively","                this._processTree(treeNode);","            }","        }","","        // Restore state of this node.","        // if (rootNode !== this.rootNode) {","        //     if (Y.Array.indexOf(this._stateMap, rootNode.data.get('id')) === -1) {","        //         rootNode.close();","        //     }","","        //     if (Y.Array.indexOf(this._selectMap, rootNode.data.get('id')) !== -1) {","        //         rootNode.select();","        //     }","        // }","    },","","    _fixWidth: function (node) {","        var li = this.getHTMLNode(node);","        var count = 0;","        var current = li.ancestor('.' + this.classNames.children);","","        while (current.ancestor('.' + this.classNames.children)) {","            count++;","            current = current.ancestor('.' + this.classNames.children);","        }","","        if (count > 0) {","            var ml = count * 20;","","            if (ml) {","                li.setStyle('marginLeft', -ml);","                li.one('div').setStyle('paddingLeft', ml + 20);","                li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","                li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","            }","        }","    },","","    _bindModel: function (node) {","        var li    = this.getHTMLNode(node),","            model = node.data;","","            console.log(li);","        // if (Y.instanceOf(model, Y.Model)) {","        //     li.setAttribute('data-yui3-modelId', model.get('id'));","        //     li.setAttribute('data-yui3-record', model.get('clientId'));","","        //     // Set the title for mouseovers on long labels","        //     li.set('title', node.label);","","        //     if (typeof(this._iconMap[model.name]) !== 'undefined') {","        //         this._setIcon(li, this._iconMap[model.name]);","        //     }","","        //     li.setData({ model: model });","        // }","    },","","    /**","     * Update the icon classes","     */","    _setIcon: function(node, className) {","        if (node) {","            var iconNode = node.one('.' + this.classNames.icon);","","            if (iconNode) {","                iconNode.removeClass(this.classNames.icon);","                iconNode.addClass(className);","                iconNode.addClass('libbit-treeview-icon');","            }","        }","    },","","    _attachEvents: function() {","        this.on('open', this._handleExpand, this);","        this.on('close', this._handleCollapse, this);","    },","","    _detachEvents: function() {","        this.detach('open', this._handleExpand);","        this.detach('close', this._handleCollapse);","        this.detach('select', this._handleSelectState);","    },","","    /**","    * Folderstate icons","    **/","    _handleIcon: function (e) {","        var node   = e.node,","            type   = e.type,","            iconEl = this.getHTMLNode(node).one('.icon-folder-close');","","        if (type === 'treeView:close') {","            iconEl = this.getHTMLNode(node).one('.icon-folder-open');","        }","","        if (iconEl) {","            if (type === 'treeView:close') {","                iconEl.removeClass('icon-folder-open');","                iconEl.addClass('icon-folder-close');","            } else {","                iconEl.removeClass('icon-folder-close');","                iconEl.addClass('icon-folder-open');","            }","        }","    },","","    _handleExpand: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","         var index = Y.Array.indexOf(this._stateMap, id);","        // TODO: Cleanup statemap after refresh?","         // var id = e.currentTarget.getData('node-id');","        // var li = this.getHTMLNode(e.node);","","        // this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));","        if (index === -1) {","            this._stateMap.push(id);","        }","        // this.fire('expand', e);","    },","","    _handleCollapse: function (e) {","        var id = this._generateLibbitRecordId(e.node.data);","         // var id = e.currentTarget.getData('node-id');","         var index = Y.Array.indexOf(this._stateMap, id);","        // var li         = this.getHTMLNode(e.node),","        //     stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","        // this.fire('collapse', e);","    },","","    _disableEvent: function (e) {","        e.stopImmediatePropagation();","    }","}, {","    ATTRS: {","        // Tree header, optional.","        header : {","            value: null","        },","","        // // The data object containing the models.","        // data : {","        //     value: null","        // },","","        // // The original tree object.","        // tree : {","        //     value: null","        // },","","        // width : {","        //     value: null","        // },","","        // height : {","        //     value: null","        // },","","        // // Wether to render all nodes or just branches.","        // renderLeaves: {","        //     value: true","        // },","","        /**","         * A filter to apply to the tree","         *","         * @attribute {Object} filter","         */","        filter: {","            value : {","                type: null,","                attr: null,","                value: []","            }","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"5":0,"7":0,"31":0,"47":0,"49":0,"54":0,"55":0,"58":0,"59":0,"70":0,"71":0,"79":0,"80":0,"83":0,"86":0,"108":0,"113":0,"116":0,"117":0,"119":0,"124":0,"126":0,"127":0,"152":0,"153":0,"155":0,"157":0,"159":0,"160":0,"163":0,"167":0,"168":0,"171":0,"175":0,"179":0,"182":0,"183":0,"184":0,"190":0,"193":0,"194":0,"198":0,"199":0,"200":0,"217":0,"224":0,"225":0,"233":0,"235":0,"252":0,"253":0,"254":0,"256":0,"257":0,"258":0,"261":0,"262":0,"264":0,"265":0,"266":0,"267":0,"268":0,"274":0,"277":0,"297":0,"298":0,"300":0,"301":0,"302":0,"303":0,"309":0,"310":0,"314":0,"315":0,"316":0,"323":0,"327":0,"328":0,"331":0,"332":0,"333":0,"334":0,"336":0,"337":0,"343":0,"344":0,"350":0,"351":0,"357":0,"359":0,"363":0,"364":0,"370":0,"418":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:43":0,"destructor:107":0,"render:112":0,"_handleModelChange:151":0,"_generateLibbitRecordId:166":0,"_parseLibbitRecordId:174":0,"(anonymous 2):183":0,"_restoreTreeOpenState:178":0,"(anonymous 3):199":0,"_restoreNodeOpenState:189":0,"_processTree:216":0,"_fixWidth:251":0,"_bindModel:273":0,"_setIcon:296":0,"_attachEvents:308":0,"_detachEvents:313":0,"_handleIcon:322":0,"_handleExpand:342":0,"_handleCollapse:356":0,"_disableEvent:369":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 96;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 21;
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
TreeView = Y.Base.create('treeView', Y.TreeView, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD,  Y.Libbit.TreeView.Selectable/*, Y.Libbit.TreeView.Filter*/ ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    /**
    * Icon (className) mapping for different types of models
    **/
    _iconMap: [],

    initializer: function (config) {
        // if nodes typeof model tree then get items
        // console.log(config);
        // Hook into the initializer chain
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 43);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 47);
config.nodes = config.model.get('items');
        // TODO: check for initial filter
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 49);
this.set('model', config.model);
        // config.nodes = [];
        // var self = this;

        // console.log(config.model);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 54);
if (config.header) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 55);
this.header = config.header;
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 58);
var classNames = this.classNames;
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 59);
var container = this.get('container'),
            // width      = this.get('width'),
            // height     = this.get('height'),
            model      = this.get('model');

        // container.delegate('click', this._onRowClick, '.' + classNames.row, this),
         // container.delegate('click', function (e) {
         //    var node = this.getNodeById(e.currentTarget.getData('node-id'));
         // }, '.' + classNames.row, this);


        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
this.on('open', this._handleExpand, this);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 71);
this.on('close', this._handleCollapse, this);

        // this._restoreSelectState();

        // contentBox.setStyle('width', width);
        // contentBox.setStyle('height', height);
        // contentBox.setStyle('overflow', 'auto');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 79);
if (model.get('icons')) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 80);
this._iconMap = model.get('icons');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
this._eventHandles || (this._eventHandles = []);


        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
this._eventHandles.push(
            model.after('change', this._handleModelChange, this)
        );
        // this._attachEvents();
        // this.on(['open', 'close'], this._handleIcon, this);
        // this.on('initializedChange', function () {
            // console.log(this.nodes);

            // console.log(this.get('nodes'));
            // self.set('nodes', []);
            // console.log('asdasd');
        // });
        // console.log(this.get('nodes'));
        // this.insertNode(this.rootNode, [], {silent: true});
        // console.log('tree');
        // this.set('nodes', this.get('model').get('items'));
    //     this.tc = Y.Node.create('<div class="tc"></div>');
        // this._attachEvents();
    },

    // Destroy the associated model to clean up attached events.
    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "destructor", 107);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 108);
(new Y.EventHandle(this._eventHandles)).detach();
        // this.get('model').destroy();
    },

    render: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "render", 112);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 113);
var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
container.addClass(this.classNames.treeview);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 117);
container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 119);
this._childrenNode = this.renderChildren(this.rootNode, {
            container: container
        });

        // console.log(this.rootNode);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 124);
this.rendered = true;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 126);
console.log('renderTree');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 127);
return this;
        // var container = this.get('container'),
        //     header    = this.get('header');

        // if (header) {
        //     container.append('<div class="nav-header">' + header + '</div>');
        // }
        // var container = this.get('container');//,
        //     // inner     = Y.Node.create('<div class="libbit-treeview-inner-container></div>');

        // container.addClass('libbit-treeview-outer-container');
        // this.set('container', inner);
        // this.get('srcNode').addClass('libbit-treeview-inner-container');

        // this.constructor.superclass.render.apply(this);

        // console.log(index);

        // DD
        // container.one('ul').addClass('libbit-treeview-inner-container');

        // this._processTree(this.rootNode);
    },

    _handleModelChange: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleModelChange", 151);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 152);
this.fire('mc');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 153);
var nodes = this.get('model').get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
this.clear({silent: true});

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 157);
if (nodes) {
            // Returns an array of references to the created tree nodes.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 159);
var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 160);
this._restoreTreeOpenState(treeNodes);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 163);
this.render();
    },

    _generateLibbitRecordId: function (model) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_generateLibbitRecordId", 166);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 167);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 168);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 171);
return null;
    },

    _parseLibbitRecordId: function (id) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_parseLibbitRecordId", 174);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 175);
return id.split('_');
    },

    _restoreTreeOpenState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreTreeOpenState", 178);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 179);
var self     = this,
            rootNode = this.rootNode;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 182);
if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 183);
Y.Array.each(rootNode.children, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 183);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 184);
self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreNodeOpenState", 189);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
var id    = this._generateLibbitRecordId(node.data),
             index = Y.Array.indexOf(this._stateMap, id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 193);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 199);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 200);
this._restoreNodeOpenState(child);
            }, this);
        }
        // if open map
        // console.log(node.children);

        // this._detachEvents();
        // this._processTree(this.rootNode);

        // this._attachEvents();
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_processTree", 216);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 217);
if (rootNode.children.length) {
            // rootNode.open();
            // rootNode.open({ silent: true });
            // this._afterOpen({ node: rootNode });
        }

        // Attach data to the nodes
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 224);
for (var i in rootNode.children) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 225);
var treeNode = rootNode.children[i];

        //     // this._treeNodes.push(treeNode);

        //     // this._fixWidth(treeNode);
        //     this._bindModel(treeNode);

        //     console.log('node!');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 233);
if (treeNode.children) {
                // Walk through the tree recursively
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 235);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_fixWidth", 251);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 252);
var li = this.getHTMLNode(node);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 253);
var count = 0;
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 254);
var current = li.ancestor('.' + this.classNames.children);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 256);
while (current.ancestor('.' + this.classNames.children)) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 257);
count++;
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 258);
current = current.ancestor('.' + this.classNames.children);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 261);
if (count > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 262);
var ml = count * 20;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 264);
if (ml) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 265);
li.setStyle('marginLeft', -ml);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 266);
li.one('div').setStyle('paddingLeft', ml + 20);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 267);
li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 268);
li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);
            }
        }
    },

    _bindModel: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_bindModel", 273);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 274);
var li    = this.getHTMLNode(node),
            model = node.data;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 277);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_setIcon", 296);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 297);
if (node) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 298);
var iconNode = node.one('.' + this.classNames.icon);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 300);
if (iconNode) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 301);
iconNode.removeClass(this.classNames.icon);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 302);
iconNode.addClass(className);
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 303);
iconNode.addClass('libbit-treeview-icon');
            }
        }
    },

    _attachEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEvents", 308);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 309);
this.on('open', this._handleExpand, this);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 310);
this.on('close', this._handleCollapse, this);
    },

    _detachEvents: function() {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEvents", 313);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 314);
this.detach('open', this._handleExpand);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 315);
this.detach('close', this._handleCollapse);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 316);
this.detach('select', this._handleSelectState);
    },

    /**
    * Folderstate icons
    **/
    _handleIcon: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleIcon", 322);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 323);
var node   = e.node,
            type   = e.type,
            iconEl = this.getHTMLNode(node).one('.icon-folder-close');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 327);
if (type === 'treeView:close') {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 328);
iconEl = this.getHTMLNode(node).one('.icon-folder-open');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 331);
if (iconEl) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 332);
if (type === 'treeView:close') {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 333);
iconEl.removeClass('icon-folder-open');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 334);
iconEl.addClass('icon-folder-close');
            } else {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 336);
iconEl.removeClass('icon-folder-close');
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 337);
iconEl.addClass('icon-folder-open');
            }
        }
    },

    _handleExpand: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 342);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 343);
var id = this._generateLibbitRecordId(e.node.data);
         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 344);
var index = Y.Array.indexOf(this._stateMap, id);
        // TODO: Cleanup statemap after refresh?
         // var id = e.currentTarget.getData('node-id');
        // var li = this.getHTMLNode(e.node);

        // this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 350);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 351);
this._stateMap.push(id);
        }
        // this.fire('expand', e);
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 356);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 357);
var id = this._generateLibbitRecordId(e.node.data);
         // var id = e.currentTarget.getData('node-id');
         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 359);
var index = Y.Array.indexOf(this._stateMap, id);
        // var li         = this.getHTMLNode(e.node),
        //     stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 363);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 364);
this._stateMap.splice(index, 1);
        }
        // this.fire('collapse', e);
    },

    _disableEvent: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_disableEvent", 369);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 370);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 418);
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
