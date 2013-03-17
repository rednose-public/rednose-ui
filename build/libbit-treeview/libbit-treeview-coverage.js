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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","var TreeView;","","TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {","    // -- Protected Properties -------------------------------------------------","","    /**","     * Stores the state of expanded nodes.","     */","    _stateMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        // Hook into the initializer chain to set the nodes.","        config.nodes = config.model.get('items');","","        if (config.header) {","            this.header = config.header;","        }","","        this.set('model', config.model);","","        this._attachEventHandles();","    },","","    destructor: function () {","        this._detachEventHandles();","","        for (var i in this._stateMap) {","            delete this._stateMap[i];","        }","","        // Remove the container from the DOM and destroy it.","        this.get('container').remove().destroy(true);","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * Overrides TreeView's `render()` method to wrap the container into a parent container,","     * and hook into the rendering process.","     *","     * @method render","     * @chainable","     * @see TreeView.render()","     */","    render: function () {","        var container     = this.get('container'),","            isTouchDevice = 'ontouchstart' in Y.config.win,","            header        = this.header;","","        if (!this.rendered) {","            // Append a subcontainer to render the tree.","            var subContainer = Y.Node.create('<div class=\"libbit-treeview-inner-container\"></div>');","","            container.addClass('libbit-treeview-outer-container');","            container.append(subContainer);","","            container.addClass(this.classNames.treeview);","            container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);","","            if (header) {","                subContainer.append('<div class=\"nav-header\">' + header + '</div>');","            }","        }","","        this._childrenNode = this.renderChildren(this.rootNode, {","            // Pass the subcontainer.","            container: container.one('.libbit-treeview-inner-container')","        });","","        this.rendered = true;","","        return this;","    },","","    // Used by template.","    icon: function (node) {","        var model     = node.data,","            icons     = this.get('model').get('icons'),","            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');","","        if (icons && model instanceof Y.Model  && icons[model.name]) {","            var icon = icons[model.name];","","            if (Y.Lang.isString(icon)) {","                return className + ' ' + icon;","            }","","            if (Y.Lang.isArray(icon)) {","                return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);","            }","        }","","        return className;","    },","","    generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    // -- Protected Methods ----------------------------------------------------","","    // Store a reference to custom events so we can detach them later.","    _attachEventHandles: function () {","        this._eventHandles || (this._eventHandles = []);","","        var model = this.get('model');","","        this._eventHandles.push(","            this.on('open', this._handleExpand, this),","            this.on('close', this._handleCollapse, this),","","            this.after(['open', 'close'], this._handleToggle, this),","","            model.after('change', this._handleModelChange, this)","        );","    },","","    // Destroy the custom events.","    _detachEventHandles: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","    },","","    _restoreTreeOpenState: function () {","        var self     = this,","            rootNode = this.rootNode;","","        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {","            Y.Array.each(rootNode.children, function (node) {","                self._restoreNodeOpenState(node);","            });","        }","    },","","    _restoreNodeOpenState: function (node) {","         var id    = this.generateLibbitRecordId(node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this._restoreNodeOpenState(child);","            }, this);","        }","    },","","    // _fixWidth: function (node) {","    //     var li = this.getHTMLNode(node);","    //     var count = 0;","    //     var current = li.ancestor('.' + this.classNames.children);","","    //     while (current.ancestor('.' + this.classNames.children)) {","    //         count++;","    //         current = current.ancestor('.' + this.classNames.children);","    //     }","","    //     if (count > 0) {","    //         var ml = count * 20;","","    //         if (ml) {","    //             li.setStyle('marginLeft', -ml);","    //             li.one('div').setStyle('paddingLeft', ml + 20);","    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","    //         }","    //     }","    // },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleToggle: function (e) {","        var node      = e.node,","            htmlNode  = this.getHTMLNode(e.node);","","        htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));","    },","","    _handleExpand: function (e) {","         var id    = this.generateLibbitRecordId(e.node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","        if (index === -1) {","            this._stateMap.push(id);","        }","    },","","    _handleCollapse: function (e) {","        var id    = this.generateLibbitRecordId(e.node.data),","            index = Y.Array.indexOf(this._stateMap, id);","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","    },","","    _handleModelChange: function () {","        var nodes = this.get('model').get('items');","","        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the","        // events to our animation listeners etc.","        this.clear({silent: true});","","        if (nodes) {","            // Returns an array of references to the created tree nodes.","            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            this._restoreTreeOpenState(treeNodes);","        }","","        // The model might change before the view is rendered, in this case we don't want to trigger any","        // listeners bound to the render function yet.","        if (this.rendered) {","            this.render();","        }","    }","}, {","    ATTRS: {","        filter: {","            value : null","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-templates\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"3":0,"5":0,"17":0,"19":0,"20":0,"23":0,"25":0,"29":0,"31":0,"32":0,"36":0,"50":0,"54":0,"56":0,"58":0,"59":0,"61":0,"62":0,"64":0,"65":0,"69":0,"74":0,"76":0,"81":0,"85":0,"86":0,"88":0,"89":0,"92":0,"93":0,"97":0,"101":0,"102":0,"105":0,"109":0,"116":0,"118":0,"120":0,"132":0,"136":0,"139":0,"140":0,"141":0,"147":0,"150":0,"151":0,"155":0,"156":0,"157":0,"187":0,"190":0,"194":0,"197":0,"198":0,"203":0,"206":0,"207":0,"212":0,"216":0,"218":0,"220":0,"221":0,"226":0,"227":0,"239":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:15":0,"destructor:28":0,"render:49":0,"icon:80":0,"generateLibbitRecordId:100":0,"parseLibbitRecordId:108":0,"_attachEventHandles:115":0,"_detachEventHandles:131":0,"(anonymous 2):140":0,"_restoreTreeOpenState:135":0,"(anonymous 3):156":0,"_restoreNodeOpenState:146":0,"_handleToggle:186":0,"_handleExpand:193":0,"_handleCollapse:202":0,"_handleModelChange:211":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 66;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 17;
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 1);
YUI.add('libbit-treeview', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 3);
var TreeView;

_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 5);
TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {
    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        // Hook into the initializer chain to set the nodes.
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 15);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 17);
config.nodes = config.model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 19);
if (config.header) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 20);
this.header = config.header;
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 23);
this.set('model', config.model);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 25);
this._attachEventHandles();
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "destructor", 28);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 29);
this._detachEventHandles();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 31);
for (var i in this._stateMap) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 32);
delete this._stateMap[i];
        }

        // Remove the container from the DOM and destroy it.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 36);
this.get('container').remove().destroy(true);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "render", 49);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 50);
var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win,
            header        = this.header;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 54);
if (!this.rendered) {
            // Append a subcontainer to render the tree.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 56);
var subContainer = Y.Node.create('<div class="libbit-treeview-inner-container"></div>');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 58);
container.addClass('libbit-treeview-outer-container');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 59);
container.append(subContainer);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
container.addClass(this.classNames.treeview);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 64);
if (header) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 65);
subContainer.append('<div class="nav-header">' + header + '</div>');
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 69);
this._childrenNode = this.renderChildren(this.rootNode, {
            // Pass the subcontainer.
            container: container.one('.libbit-treeview-inner-container')
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 74);
this.rendered = true;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
return this;
    },

    // Used by template.
    icon: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "icon", 80);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 81);
var model     = node.data,
            icons     = this.get('model').get('icons'),
            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 85);
if (icons && model instanceof Y.Model  && icons[model.name]) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 86);
var icon = icons[model.name];

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 88);
if (Y.Lang.isString(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 89);
return className + ' ' + icon;
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 92);
if (Y.Lang.isArray(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 93);
return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
return className;
    },

    generateLibbitRecordId: function (model) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "generateLibbitRecordId", 100);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 105);
return null;
    },

    parseLibbitRecordId: function (id) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "parseLibbitRecordId", 108);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 109);
return id.split('_');
    },

    // -- Protected Methods ----------------------------------------------------

    // Store a reference to custom events so we can detach them later.
    _attachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEventHandles", 115);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
this._eventHandles || (this._eventHandles = []);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 118);
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 120);
this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            this.after(['open', 'close'], this._handleToggle, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    // Destroy the custom events.
    _detachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEventHandles", 131);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
(new Y.EventHandle(this._eventHandles)).detach();
    },

    _restoreTreeOpenState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreTreeOpenState", 135);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 136);
var self     = this,
            rootNode = this.rootNode;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 139);
if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 140);
Y.Array.each(rootNode.children, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 140);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 141);
self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreNodeOpenState", 146);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 147);
var id    = this.generateLibbitRecordId(node.data),
             index = Y.Array.indexOf(this._stateMap, id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 150);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 151);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 156);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 156);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 157);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleToggle", 186);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
var node      = e.node,
            htmlNode  = this.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));
    },

    _handleExpand: function (e) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 193);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
var id    = this.generateLibbitRecordId(e.node.data),
             index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 197);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 202);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 203);
var id    = this.generateLibbitRecordId(e.node.data),
            index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 206);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 207);
this._stateMap.splice(index, 1);
        }
    },

    _handleModelChange: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleModelChange", 211);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 212);
var nodes = this.get('model').get('items');

        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the
        // events to our animation listeners etc.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 216);
this.clear({silent: true});

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 218);
if (nodes) {
            // Returns an array of references to the created tree nodes.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 220);
var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 221);
this._restoreTreeOpenState(treeNodes);
        }

        // The model might change before the view is rendered, in this case we don't want to trigger any
        // listeners bound to the render function yet.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 226);
if (this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 227);
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
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 239);
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
