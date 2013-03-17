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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","TreeView = Y.Base.create('treeView', Y.TreeView, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD,  Y.Libbit.TreeView.Selectable/*, Y.Libbit.TreeView.Filter*/ ], {","    // -- Public Properties ----------------------------------------------------","","    // Tree header, optional.","    header : {","        value: null","    },","","    // -- Protected Properties -------------------------------------------------","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Icon (className) mapping for different types of models","    */","    // _iconMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        // Hook into the initializer chain to set the nodes.","        config.nodes = config.model.get('items');","","        if (config.header) {","            this.header = config.header;","        }","","        var model = config.model;","","        this.set('model', model);","","        // if (model.get('icons')) {","        //     this._iconMap = model.get('icons');","        // }","","        this._attachEventHandles();","    },","","    destructor: function () {","        this._detachEventHandles();","    },","","    // -- Public Methods -------------------------------------------------------","","    render: function () {","        var container     = this.get('container'),","            isTouchDevice = 'ontouchstart' in Y.config.win,","            header        = this.header;","","        if (!this.rendered) {","            container.addClass(this.classNames.treeview);","            container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);","","            if (header) {","                container.append('<div class=\"nav-header\">' + header + '</div>');","            }","        }","","        this._childrenNode = this.renderChildren(this.rootNode, {","            container: container","        });","","        this.rendered = true;","","        return this;","    },","","    // -- Protected Methods ----------------------------------------------------","","    // Store a reference to custom events so we can detach them later.","    _attachEventHandles: function () {","        this._eventHandles || (this._eventHandles = []);","","        var model = this.get('model');","","        this._eventHandles.push(","            this.on('open', this._handleExpand, this),","            this.on('close', this._handleCollapse, this),","","            model.after('change', this._handleModelChange, this)","        );","    },","","    // Destroy the custom events.","    _detachEventHandles: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","    },","","    _generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    _parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    _restoreTreeOpenState: function () {","        var self     = this,","            rootNode = this.rootNode;","","        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {","            Y.Array.each(rootNode.children, function (node) {","                self._restoreNodeOpenState(node);","            });","        }","    },","","    _restoreNodeOpenState: function (node) {","         var id    = this._generateLibbitRecordId(node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this._restoreNodeOpenState(child);","            }, this);","        }","    },","","    // _fixWidth: function (node) {","    //     var li = this.getHTMLNode(node);","    //     var count = 0;","    //     var current = li.ancestor('.' + this.classNames.children);","","    //     while (current.ancestor('.' + this.classNames.children)) {","    //         count++;","    //         current = current.ancestor('.' + this.classNames.children);","    //     }","","    //     if (count > 0) {","    //         var ml = count * 20;","","    //         if (ml) {","    //             li.setStyle('marginLeft', -ml);","    //             li.one('div').setStyle('paddingLeft', ml + 20);","    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","    //         }","    //     }","    // },","","    // /**","    //  * Update the icon classes","    //  */","    // _setIcon: function(node, className) {","    //     if (node) {","    //         var iconNode = node.one('.' + this.classNames.icon);","","    //         if (iconNode) {","    //             iconNode.removeClass(this.classNames.icon);","    //             iconNode.addClass(className);","    //             iconNode.addClass('libbit-treeview-icon');","    //         }","    //     }","    // },","","    // -- Protected Event Handlers ---------------------------------------------","","    // /**","    // * Folderstate icons","    // **/","    // _handleIcon: function (e) {","    //     var node   = e.node,","    //         type   = e.type,","    //         iconEl = this.getHTMLNode(node).one('.icon-folder-close');","","    //     if (type === 'treeView:close') {","    //         iconEl = this.getHTMLNode(node).one('.icon-folder-open');","    //     }","","    //     if (iconEl) {","    //         if (type === 'treeView:close') {","    //             iconEl.removeClass('icon-folder-open');","    //             iconEl.addClass('icon-folder-close');","    //         } else {","    //             iconEl.removeClass('icon-folder-close');","    //             iconEl.addClass('icon-folder-open');","    //         }","    //     }","    // },","","    _handleExpand: function (e) {","         var id    = this._generateLibbitRecordId(e.node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","        if (index === -1) {","            this._stateMap.push(id);","        }","    },","","    _handleCollapse: function (e) {","        var id    = this._generateLibbitRecordId(e.node.data),","            index = Y.Array.indexOf(this._stateMap, id);","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","    },","","    _handleModelChange: function () {","        var nodes = this.get('model').get('items');","","        this.clear({silent: true});","","        if (nodes) {","            // Returns an array of references to the created tree nodes.","            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            this._restoreTreeOpenState(treeNodes);","        }","","        this.render();","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-filter\",","        \"libbit-treeview-templates\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"5":0,"29":0,"31":0,"32":0,"35":0,"37":0,"43":0,"47":0,"53":0,"57":0,"58":0,"59":0,"61":0,"62":0,"66":0,"70":0,"72":0,"79":0,"81":0,"83":0,"93":0,"97":0,"98":0,"101":0,"105":0,"109":0,"112":0,"113":0,"114":0,"120":0,"123":0,"124":0,"128":0,"129":0,"130":0,"198":0,"201":0,"202":0,"207":0,"210":0,"211":0,"216":0,"218":0,"220":0,"222":0,"223":0,"226":0,"231":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:27":0,"destructor:46":0,"render:52":0,"_attachEventHandles:78":0,"_detachEventHandles:92":0,"_generateLibbitRecordId:96":0,"_parseLibbitRecordId:104":0,"(anonymous 2):113":0,"_restoreTreeOpenState:108":0,"(anonymous 3):129":0,"_restoreNodeOpenState:119":0,"_handleExpand:197":0,"_handleCollapse:206":0,"_handleModelChange:215":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 50;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 15;
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 1);
YUI.add('libbit-treeview', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 3);
var TreeView;

_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 5);
TreeView = Y.Base.create('treeView', Y.TreeView, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD,  Y.Libbit.TreeView.Selectable/*, Y.Libbit.TreeView.Filter*/ ], {
    // -- Public Properties ----------------------------------------------------

    // Tree header, optional.
    header : {
        value: null
    },

    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    /**
    * Icon (className) mapping for different types of models
    */
    // _iconMap: [],

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        // Hook into the initializer chain to set the nodes.
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 27);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 29);
config.nodes = config.model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 31);
if (config.header) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 32);
this.header = config.header;
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 35);
var model = config.model;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 37);
this.set('model', model);

        // if (model.get('icons')) {
        //     this._iconMap = model.get('icons');
        // }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 43);
this._attachEventHandles();
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "destructor", 46);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 47);
this._detachEventHandles();
    },

    // -- Public Methods -------------------------------------------------------

    render: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "render", 52);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 53);
var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win,
            header        = this.header;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 57);
if (!this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 58);
container.addClass(this.classNames.treeview);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 59);
container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
if (header) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
container.append('<div class="nav-header">' + header + '</div>');
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
this._childrenNode = this.renderChildren(this.rootNode, {
            container: container
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
this.rendered = true;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 72);
return this;
    },

    // -- Protected Methods ----------------------------------------------------

    // Store a reference to custom events so we can detach them later.
    _attachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEventHandles", 78);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 79);
this._eventHandles || (this._eventHandles = []);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 81);
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    // Destroy the custom events.
    _detachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEventHandles", 92);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 93);
(new Y.EventHandle(this._eventHandles)).detach();
    },

    _generateLibbitRecordId: function (model) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_generateLibbitRecordId", 96);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 98);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
return null;
    },

    _parseLibbitRecordId: function (id) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_parseLibbitRecordId", 104);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 105);
return id.split('_');
    },

    _restoreTreeOpenState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreTreeOpenState", 108);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 109);
var self     = this,
            rootNode = this.rootNode;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 112);
if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 113);
Y.Array.each(rootNode.children, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 113);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 114);
self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreNodeOpenState", 119);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 120);
var id    = this._generateLibbitRecordId(node.data),
             index = Y.Array.indexOf(this._stateMap, id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 123);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 124);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 128);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 129);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 129);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 130);
this._restoreNodeOpenState(child);
            }, this);
        }
    },

    // _fixWidth: function (node) {
    //     var li = this.getHTMLNode(node);
    //     var count = 0;
    //     var current = li.ancestor('.' + this.classNames.children);

    //     while (current.ancestor('.' + this.classNames.children)) {
    //         count++;
    //         current = current.ancestor('.' + this.classNames.children);
    //     }

    //     if (count > 0) {
    //         var ml = count * 20;

    //         if (ml) {
    //             li.setStyle('marginLeft', -ml);
    //             li.one('div').setStyle('paddingLeft', ml + 20);
    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);
    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);
    //         }
    //     }
    // },

    // /**
    //  * Update the icon classes
    //  */
    // _setIcon: function(node, className) {
    //     if (node) {
    //         var iconNode = node.one('.' + this.classNames.icon);

    //         if (iconNode) {
    //             iconNode.removeClass(this.classNames.icon);
    //             iconNode.addClass(className);
    //             iconNode.addClass('libbit-treeview-icon');
    //         }
    //     }
    // },

    // -- Protected Event Handlers ---------------------------------------------

    // /**
    // * Folderstate icons
    // **/
    // _handleIcon: function (e) {
    //     var node   = e.node,
    //         type   = e.type,
    //         iconEl = this.getHTMLNode(node).one('.icon-folder-close');

    //     if (type === 'treeView:close') {
    //         iconEl = this.getHTMLNode(node).one('.icon-folder-open');
    //     }

    //     if (iconEl) {
    //         if (type === 'treeView:close') {
    //             iconEl.removeClass('icon-folder-open');
    //             iconEl.addClass('icon-folder-close');
    //         } else {
    //             iconEl.removeClass('icon-folder-close');
    //             iconEl.addClass('icon-folder-open');
    //         }
    //     }
    // },

    _handleExpand: function (e) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 197);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
var id    = this._generateLibbitRecordId(e.node.data),
             index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 202);
this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 206);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 207);
var id    = this._generateLibbitRecordId(e.node.data),
            index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
this._stateMap.splice(index, 1);
        }
    },

    _handleModelChange: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleModelChange", 215);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 216);
var nodes = this.get('model').get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 218);
this.clear({silent: true});

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 220);
if (nodes) {
            // Returns an array of references to the created tree nodes.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 222);
var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 223);
this._restoreTreeOpenState(treeNodes);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
this.render();
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 231);
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "gallery-sm-treeview",
        "libbit-model-tree",
        "libbit-treeview-anim",
        "libbit-treeview-dd",
        "libbit-treeview-filter",
        "libbit-treeview-templates",
        "libbit-treeview-select"
    ],
    "supersedes": [
        "gallery-sm-treeview-templates"
    ],
    "skinnable": true
});
