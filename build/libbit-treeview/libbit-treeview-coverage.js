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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {","    // -- Public Properties ----------------------------------------------------","","    // Tree header, optional.","    header : {","        value: null","    },","","    // -- Protected Properties -------------------------------------------------","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    /**","    * Icon (className) mapping for different types of models","    */","    // _iconMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        // Hook into the initializer chain to set the nodes.","        config.nodes = config.model.get('items');","","        if (config.header) {","            this.header = config.header;","        }","","        var model = config.model;","","        this.set('model', model);","","        // if (model.get('icons')) {","        //     this._iconMap = model.get('icons');","        // }","","        this._attachEventHandles();","    },","","    destructor: function () {","        this._detachEventHandles();","","        // Remove the container that we wrapped around the subcontainer.","        this.get('container').remove();","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * Overrides TreeView's `render()` method to wrap the container into a parent container,","     * and hook into the rendering process.","     *","     * @method render","     * @chainable","     * @see TreeView.render()","     */","    render: function () {","        var container     = this.get('container'),","            isTouchDevice = 'ontouchstart' in Y.config.win,","            header        = this.header;","","        if (!this.rendered) {","            // Append a subcontainer to render the tree.","            var subContainer = Y.Node.create('<div class=\"libbit-treeview-inner-container\"></div>');","","            container.addClass('libbit-treeview-outer-container');","            container.append(subContainer);","","            container.addClass(this.classNames.treeview);","            container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);","","            if (header) {","                subContainer.append('<div class=\"nav-header\">' + header + '</div>');","            }","        }","","        this._childrenNode = this.renderChildren(this.rootNode, {","            // Pass the subcontainer.","            container: container.one('.libbit-treeview-inner-container')","        });","","        this.rendered = true;","","        return this;","    },","","    // Used by template.","    icon: function (node) {","        var model     = node.data,","            icons     = this.get('model').get('icons'),","            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');","","        if (icons && model instanceof Y.Model  && icons[model.name]) {","            var icon = icons[model.name];","","            if (Y.Lang.isString(icon)) {","                return className + ' ' + icon;","            }","","            if (Y.Lang.isArray(icon)) {","                return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);","            }","        }","","        return className;","    },","","    generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    // -- Protected Methods ----------------------------------------------------","","    // Store a reference to custom events so we can detach them later.","    _attachEventHandles: function () {","        this._eventHandles || (this._eventHandles = []);","","        var model = this.get('model');","","        this._eventHandles.push(","            this.on('open', this._handleExpand, this),","            this.on('close', this._handleCollapse, this),","","            this.after(['open', 'close'], this._handleToggle, this),","","            model.after('change', this._handleModelChange, this)","        );","    },","","    // Destroy the custom events.","    _detachEventHandles: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","    },","","    _restoreTreeOpenState: function () {","        var self     = this,","            rootNode = this.rootNode;","","        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {","            Y.Array.each(rootNode.children, function (node) {","                self._restoreNodeOpenState(node);","            });","        }","    },","","    _restoreNodeOpenState: function (node) {","         var id    = this.generateLibbitRecordId(node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this._restoreNodeOpenState(child);","            }, this);","        }","    },","","    // _fixWidth: function (node) {","    //     var li = this.getHTMLNode(node);","    //     var count = 0;","    //     var current = li.ancestor('.' + this.classNames.children);","","    //     while (current.ancestor('.' + this.classNames.children)) {","    //         count++;","    //         current = current.ancestor('.' + this.classNames.children);","    //     }","","    //     if (count > 0) {","    //         var ml = count * 20;","","    //         if (ml) {","    //             li.setStyle('marginLeft', -ml);","    //             li.one('div').setStyle('paddingLeft', ml + 20);","    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","    //         }","    //     }","    // },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleToggle: function (e) {","        var node      = e.node,","            htmlNode  = this.getHTMLNode(e.node);","","        htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));","    },","","    _handleExpand: function (e) {","         var id    = this.generateLibbitRecordId(e.node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","        if (index === -1) {","            this._stateMap.push(id);","        }","    },","","    _handleCollapse: function (e) {","        var id    = this.generateLibbitRecordId(e.node.data),","            index = Y.Array.indexOf(this._stateMap, id);","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","    },","","    _handleModelChange: function () {","        var nodes = this.get('model').get('items');","","        this.clear({silent: true});","","        if (nodes) {","            // Returns an array of references to the created tree nodes.","            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            this._restoreTreeOpenState(treeNodes);","        }","","        if (this.rendered) {","            this.render();","        }","    }","}, {","    ATTRS: {","        filter: {","            value : null","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-templates\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"5":0,"29":0,"31":0,"32":0,"35":0,"37":0,"43":0,"47":0,"50":0,"64":0,"68":0,"70":0,"72":0,"73":0,"75":0,"76":0,"78":0,"79":0,"83":0,"88":0,"90":0,"95":0,"99":0,"100":0,"102":0,"103":0,"106":0,"107":0,"111":0,"115":0,"116":0,"119":0,"123":0,"130":0,"132":0,"134":0,"146":0,"150":0,"153":0,"154":0,"155":0,"161":0,"164":0,"165":0,"169":0,"170":0,"171":0,"201":0,"204":0,"208":0,"211":0,"212":0,"217":0,"220":0,"221":0,"226":0,"228":0,"230":0,"232":0,"233":0,"236":0,"237":0,"249":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:27":0,"destructor:46":0,"render:63":0,"icon:94":0,"generateLibbitRecordId:114":0,"parseLibbitRecordId:122":0,"_attachEventHandles:129":0,"_detachEventHandles:145":0,"(anonymous 2):154":0,"_restoreTreeOpenState:149":0,"(anonymous 3):170":0,"_restoreNodeOpenState:160":0,"_handleToggle:200":0,"_handleExpand:207":0,"_handleCollapse:216":0,"_handleModelChange:225":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 65;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 17;
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

    // Used by template.
    icon: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "icon", 94);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 95);
var model     = node.data,
            icons     = this.get('model').get('icons'),
            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 99);
if (icons && model instanceof Y.Model  && icons[model.name]) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 100);
var icon = icons[model.name];

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
if (Y.Lang.isString(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 103);
return className + ' ' + icon;
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 106);
if (Y.Lang.isArray(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 111);
return className;
    },

    generateLibbitRecordId: function (model) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "generateLibbitRecordId", 114);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 115);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 119);
return null;
    },

    parseLibbitRecordId: function (id) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "parseLibbitRecordId", 122);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 123);
return id.split('_');
    },

    // -- Protected Methods ----------------------------------------------------

    // Store a reference to custom events so we can detach them later.
    _attachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEventHandles", 129);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 130);
this._eventHandles || (this._eventHandles = []);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 134);
this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            this.after(['open', 'close'], this._handleToggle, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    // Destroy the custom events.
    _detachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEventHandles", 145);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 146);
(new Y.EventHandle(this._eventHandles)).detach();
    },

    _restoreTreeOpenState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreTreeOpenState", 149);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 150);
var self     = this,
            rootNode = this.rootNode;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 153);
if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 154);
Y.Array.each(rootNode.children, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 154);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreNodeOpenState", 160);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 161);
var id    = this.generateLibbitRecordId(node.data),
             index = Y.Array.indexOf(this._stateMap, id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 164);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 165);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 169);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 170);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 170);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 171);
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

    // -- Protected Event Handlers ---------------------------------------------

    _handleToggle: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleToggle", 200);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
var node      = e.node,
            htmlNode  = this.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 204);
htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));
    },

    _handleExpand: function (e) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 207);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 208);
var id    = this.generateLibbitRecordId(e.node.data),
             index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 212);
this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 216);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 217);
var id    = this.generateLibbitRecordId(e.node.data),
            index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 220);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 221);
this._stateMap.splice(index, 1);
        }
    },

    _handleModelChange: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleModelChange", 225);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
var nodes = this.get('model').get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 228);
this.clear({silent: true});

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 230);
if (nodes) {
            // Returns an array of references to the created tree nodes.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 232);
var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 233);
this._restoreTreeOpenState(treeNodes);
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 236);
if (this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 237);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 249);
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
