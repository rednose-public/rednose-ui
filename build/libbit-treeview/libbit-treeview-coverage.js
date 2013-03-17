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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {","    // -- Public Properties ----------------------------------------------------","","    // Tree header, optional.","    header : {","        value: null","    },","","    // -- Protected Properties -------------------------------------------------","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Icon (className) mapping for different types of models","    */","    // _iconMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        // Hook into the initializer chain to set the nodes.","        config.nodes = config.model.get('items');","","        if (config.header) {","            this.header = config.header;","        }","","        var model = config.model;","","        this.set('model', model);","","        // if (model.get('icons')) {","        //     this._iconMap = model.get('icons');","        // }","","        this._attachEventHandles();","    },","","    destructor: function () {","        this._detachEventHandles();","","        // Remove the container that we wrapped around the subcontainer.","        this.get('container').remove();","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * Overrides TreeView's `render()` method to wrap the container into a parent container,","     * and hook into the rendering process.","     *","     * @method render","     * @chainable","     * @see TreeView.render()","     */","    render: function () {","        var container     = this.get('container'),","            isTouchDevice = 'ontouchstart' in Y.config.win,","            header        = this.header;","","        if (!this.rendered) {","            // Append a subcontainer to render the tree.","            var subContainer = Y.Node.create('<div class=\"libbit-treeview-inner-container\"></div>');","","            container.addClass('libbit-treeview-outer-container');","            container.append(subContainer);","","            container.addClass(this.classNames.treeview);","            container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);","","            if (header) {","                subContainer.append('<div class=\"nav-header\">' + header + '</div>');","            }","        }","","        this._childrenNode = this.renderChildren(this.rootNode, {","            // Pass the subcontainer.","            container: container.one('.libbit-treeview-inner-container')","        });","","        this.rendered = true;","","        return this;","    },","","    // -- Protected Methods ----------------------------------------------------","","    // Store a reference to custom events so we can detach them later.","    _attachEventHandles: function () {","        this._eventHandles || (this._eventHandles = []);","","        var model = this.get('model');","","        this._eventHandles.push(","            this.on('open', this._handleExpand, this),","            this.on('close', this._handleCollapse, this),","","            model.after('change', this._handleModelChange, this)","        );","    },","","    // Destroy the custom events.","    _detachEventHandles: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","    },","","    _generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    _parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    _restoreTreeOpenState: function () {","        var self     = this,","            rootNode = this.rootNode;","","        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {","            Y.Array.each(rootNode.children, function (node) {","                self._restoreNodeOpenState(node);","            });","        }","    },","","    _restoreNodeOpenState: function (node) {","         var id    = this._generateLibbitRecordId(node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this._restoreNodeOpenState(child);","            }, this);","        }","    },","","    // _fixWidth: function (node) {","    //     var li = this.getHTMLNode(node);","    //     var count = 0;","    //     var current = li.ancestor('.' + this.classNames.children);","","    //     while (current.ancestor('.' + this.classNames.children)) {","    //         count++;","    //         current = current.ancestor('.' + this.classNames.children);","    //     }","","    //     if (count > 0) {","    //         var ml = count * 20;","","    //         if (ml) {","    //             li.setStyle('marginLeft', -ml);","    //             li.one('div').setStyle('paddingLeft', ml + 20);","    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","    //         }","    //     }","    // },","","    // /**","    //  * Update the icon classes","    //  */","    // _setIcon: function(node, className) {","    //     if (node) {","    //         var iconNode = node.one('.' + this.classNames.icon);","","    //         if (iconNode) {","    //             iconNode.removeClass(this.classNames.icon);","    //             iconNode.addClass(className);","    //             iconNode.addClass('libbit-treeview-icon');","    //         }","    //     }","    // },","","    // -- Protected Event Handlers ---------------------------------------------","","    // /**","    // * Folderstate icons","    // **/","    // _handleIcon: function (e) {","    //     var node   = e.node,","    //         type   = e.type,","    //         iconEl = this.getHTMLNode(node).one('.icon-folder-close');","","    //     if (type === 'treeView:close') {","    //         iconEl = this.getHTMLNode(node).one('.icon-folder-open');","    //     }","","    //     if (iconEl) {","    //         if (type === 'treeView:close') {","    //             iconEl.removeClass('icon-folder-open');","    //             iconEl.addClass('icon-folder-close');","    //         } else {","    //             iconEl.removeClass('icon-folder-close');","    //             iconEl.addClass('icon-folder-open');","    //         }","    //     }","    // },","","    _handleExpand: function (e) {","         var id    = this._generateLibbitRecordId(e.node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","        if (index === -1) {","            this._stateMap.push(id);","        }","    },","","    _handleCollapse: function (e) {","        var id    = this._generateLibbitRecordId(e.node.data),","            index = Y.Array.indexOf(this._stateMap, id);","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","    },","","    _handleModelChange: function () {","        var nodes = this.get('model').get('items');","","        this.clear({silent: true});","","        if (nodes) {","            // Returns an array of references to the created tree nodes.","            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            this._restoreTreeOpenState(treeNodes);","        }","","        if (this.rendered) {","            this.render();","        }","    }","}, {","    ATTRS: {","        filter: {","            value : null","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-templates\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"5":0,"29":0,"31":0,"32":0,"35":0,"37":0,"43":0,"47":0,"50":0,"64":0,"68":0,"70":0,"72":0,"73":0,"75":0,"76":0,"78":0,"79":0,"83":0,"88":0,"90":0,"97":0,"99":0,"101":0,"111":0,"115":0,"116":0,"119":0,"123":0,"127":0,"130":0,"131":0,"132":0,"138":0,"141":0,"142":0,"146":0,"147":0,"148":0,"216":0,"219":0,"220":0,"225":0,"228":0,"229":0,"234":0,"236":0,"238":0,"240":0,"241":0,"244":0,"245":0,"257":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:27":0,"destructor:46":0,"render:63":0,"_attachEventHandles:96":0,"_detachEventHandles:110":0,"_generateLibbitRecordId:114":0,"_parseLibbitRecordId:122":0,"(anonymous 2):131":0,"_restoreTreeOpenState:126":0,"(anonymous 3):147":0,"_restoreNodeOpenState:137":0,"_handleExpand:215":0,"_handleCollapse:224":0,"_handleModelChange:233":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 55;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 15;
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 1);
YUI.add('libbit-treeview', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 3);
var TreeView;

_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 5);
TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {
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

        // Remove the container that we wrapped around the subcontainer.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 50);
this.get('container').remove();
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Overrides TreeView's `render()` method to wrap the container into a parent container,
     * and hook into the rendering process.
     *
     * @method render
     * @chainable
     * @see TreeView.render()
     */
    render: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "render", 63);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 64);
var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win,
            header        = this.header;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 68);
if (!this.rendered) {
            // Append a subcontainer to render the tree.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
var subContainer = Y.Node.create('<div class="libbit-treeview-inner-container"></div>');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 72);
container.addClass('libbit-treeview-outer-container');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 73);
container.append(subContainer);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
container.addClass(this.classNames.treeview);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 78);
if (header) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 79);
subContainer.append('<div class="nav-header">' + header + '</div>');
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 83);
this._childrenNode = this.renderChildren(this.rootNode, {
            // Pass the subcontainer.
            container: container.one('.libbit-treeview-inner-container')
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 88);
this.rendered = true;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 90);
return this;
    },

    // -- Protected Methods ----------------------------------------------------

    // Store a reference to custom events so we can detach them later.
    _attachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEventHandles", 96);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
this._eventHandles || (this._eventHandles = []);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 99);
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    // Destroy the custom events.
    _detachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEventHandles", 110);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 111);
(new Y.EventHandle(this._eventHandles)).detach();
    },

    _generateLibbitRecordId: function (model) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_generateLibbitRecordId", 114);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 115);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 119);
return null;
    },

    _parseLibbitRecordId: function (id) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_parseLibbitRecordId", 122);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 123);
return id.split('_');
    },

    _restoreTreeOpenState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreTreeOpenState", 126);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 127);
var self     = this,
            rootNode = this.rootNode;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 130);
if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 131);
Y.Array.each(rootNode.children, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 131);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreNodeOpenState", 137);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 138);
var id    = this._generateLibbitRecordId(node.data),
             index = Y.Array.indexOf(this._stateMap, id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 141);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 142);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 146);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 147);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 147);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 148);
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
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 215);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 216);
var id    = this._generateLibbitRecordId(e.node.data),
             index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 219);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 220);
this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 224);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 225);
var id    = this._generateLibbitRecordId(e.node.data),
            index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 228);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 229);
this._stateMap.splice(index, 1);
        }
    },

    _handleModelChange: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleModelChange", 233);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 234);
var nodes = this.get('model').get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
this.clear({silent: true});

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 238);
if (nodes) {
            // Returns an array of references to the created tree nodes.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 240);
var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 241);
this._restoreTreeOpenState(treeNodes);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 244);
if (this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 245);
this.render();
        }
    }
}, {
    ATTRS: {
        filter: {
            value : null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 257);
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "gallery-sm-treeview",
        "libbit-model-tree",
        "libbit-treeview-anim",
        "libbit-treeview-dd",
        "libbit-treeview-templates",
        "libbit-treeview-select"
    ],
    "supersedes": [
        "gallery-sm-treeview-templates"
    ],
    "skinnable": true
});
