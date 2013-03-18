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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","/**"," * Provides the `Y.Libbit.TreeView` widget."," *"," * @module libbit-treeview"," */","","var TreeView;","","/**"," * A TreeView widget, implementing Y.View."," * Quick Example:<br/>"," *"," * <pre><code>var instance = new Y.Libbit.TreeView({"," *    model     : model,"," *    dragdrop  : true,"," *    selectable: true,"," *    groups    : ['libbit-treeview'],"," *    header    : 'LiBBiT TreeView'"," * });"," * </code></pre>"," *"," * @class TreeView"," * @param {Object} [config] The following configuration properties are required:"," *"," *     @param {Object} [config.container] The container to bind the treeView to."," *     @param {Boolean} [config.dragdrop] Enable standalone drag and drop for this instance."," *     @param {Boolean} [config.selectable] Enables selection of tree nodes. Only single selection"," *         is supported for now"," *     @param {Y.Libbit.ModelTree} [config.model] A LiBBiT Tree model. Change events are bound to update"," *         the view when the model changes."," *     @param {Array} [config.groups] The DD groups that can interact with this"," *         TreeView instance."," *     @param {String} [config.header] An optional header, needed for global dropping on the root node"," *"," * @constructor"," * @extends Y.TreeView"," */","TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {","    // -- Protected Properties -------------------------------------------------","","    /**","     * Stores the state of the opened tree nodes.","     *","     * @property {Array} _stateMap","     * @protected","     */","    _stateMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        // Hook into the initializer chain to set the nodes.","        config.nodes = config.model.get('items');","","        if (config.header) {","            this.header = config.header;","        }","","        // Initialize the state map so it doesn't contain any garbage from previous instances.","        this._stateMap = [];","","        this.set('model', config.model);","","        this._attachEventHandles();","    },","","    destructor: function () {","        this._detachEventHandles();","","        // Free the reference so the property is eligible for garbage collection.","        this._stateMap = null;","","        // Remove the container from the DOM and destroy it.","        this._destroyContainer();","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * Overrides TreeView's `render()` method to wrap the container into a parent container,","     * and hook into the rendering process.","     *","     * @method render","     * @chainable","     * @see Y.TreeView.render()","     */","    render: function () {","        var container     = this.get('container'),","            isTouchDevice = 'ontouchstart' in Y.config.win,","            header        = this.header;","","        if (!this.rendered) {","            // Append a subcontainer to render the tree.","            var subContainer = Y.Node.create('<div class=\"libbit-treeview-inner-container\"></div>');","","            container.addClass('libbit-treeview-outer-container');","            container.append(subContainer);","","            container.addClass(this.classNames.treeview);","            container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);","","            if (header) {","                subContainer.append('<div class=\"nav-header\">' + header + '</div>');","            }","        }","","        this._childrenNode = this.renderChildren(this.rootNode, {","            // Pass the subcontainer.","            container: container.one('.libbit-treeview-inner-container')","        });","","        this.rendered = true;","","        return this;","    },","","    /**","     * Return a CSS class string, modified by the given tree node and it's associated model.","     *","     * @method icon","     * @param  {Y.Tree.Node} node Tee Node.","     * @return {String} A composed CSS string.","     */","    icon: function (node) {","        var model     = node.data,","            icons     = this.get('model').get('icons'),","            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');","","        if (icons && model instanceof Y.Model  && icons[model.name]) {","            var icon = icons[model.name];","","            if (Y.Lang.isString(icon)) {","                return className + ' ' + icon;","            }","","            if (Y.Lang.isArray(icon)) {","                return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);","            }","        }","","        return className;","    },","","    /**","     * Generate a unique LiBBiT record ID, composed of the class type and the model ID.","     *","     * @method generateLibbitRecordID","     * @param  {Y.Model} model A model instance.","     * @return {String} A unique ID.","     */","    generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    /**","     * Parse a unique LiBBiT model id.","     *","     * @method parseLibbitRecordID","     * @param  {String} id A LiBBiT record ID.","     * @return {Array} An array containing type and ID.","     */","    parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    // -- Protected Methods ----------------------------------------------------","","    _attachEventHandles: function () {","        this._eventHandles || (this._eventHandles = []);","","        var model = this.get('model');","","        this._eventHandles.push(","            this.on('open', this._handleExpand, this),","            this.on('close', this._handleCollapse, this),","","            this.after(['open', 'close'], this._handleToggle, this),","","            model.after('change', this._handleModelChange, this)","        );","    },","","    _detachEventHandles: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","    },","","    _restoreTreeOpenState: function () {","        var self     = this,","            rootNode = this.rootNode;","","        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {","            Y.Array.each(rootNode.children, function (node) {","                self._restoreNodeOpenState(node);","            });","        }","    },","","    _restoreNodeOpenState: function (node) {","         var id    = this.generateLibbitRecordId(node.data),","             index = this._stateMap.indexOf(id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this._restoreNodeOpenState(child);","            }, this);","        }","    },","","    // _fixWidth: function (node) {","    //     var li = this.getHTMLNode(node);","    //     var count = 0;","    //     var current = li.ancestor('.' + this.classNames.children);","","    //     while (current.ancestor('.' + this.classNames.children)) {","    //         count++;","    //         current = current.ancestor('.' + this.classNames.children);","    //     }","","    //     if (count > 0) {","    //         var ml = count * 20;","","","    //         if (ml) {","    //             li.setStyle('marginLeft', -ml);","    //             li.one('div').setStyle('paddingLeft', ml + 20);","    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","    //         }","    //     }","    // },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleToggle: function (e) {","        var node      = e.node,","            htmlNode  = this.getHTMLNode(e.node);","","        htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));","    },","","    _handleExpand: function (e) {","         var id    = this.generateLibbitRecordId(e.node.data),","             index = this._stateMap.indexOf(id);","","        if (index === -1) {","            this._stateMap.push(id);","        }","    },","","    _handleCollapse: function (e) {","        var id    = this.generateLibbitRecordId(e.node.data),","            index = this._stateMap.indexOf(id);","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","    },","","    _handleModelChange: function () {","        var nodes = this.get('model').get('items');","","        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the","        // events to our animation listeners etc.","        this.clear({silent: true});","","        if (nodes) {","            // Returns an array of references to the created tree nodes.","            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            this._restoreTreeOpenState(treeNodes);","        }","","        // The model might change before the view is rendered, in this case we don't want to trigger any","        // listeners bound to the render function yet.","        if (this.rendered) {","            this.render();","        }","    },","","    /**","     * Removes the `container` from the DOM and purges all its event listeners.","     *","     * @method _destroyContainer","     * @protected","     */","    _destroyContainer: function () {","        var container = this.get('container');","        container && container.remove(true);","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-templates\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"9":0,"40":0,"55":0,"57":0,"58":0,"62":0,"64":0,"66":0,"70":0,"73":0,"76":0,"90":0,"94":0,"96":0,"98":0,"99":0,"101":0,"102":0,"104":0,"105":0,"109":0,"114":0,"116":0,"127":0,"131":0,"132":0,"134":0,"135":0,"138":0,"139":0,"143":0,"154":0,"155":0,"158":0,"169":0,"175":0,"177":0,"179":0,"190":0,"194":0,"197":0,"198":0,"199":0,"205":0,"208":0,"209":0,"213":0,"214":0,"215":0,"246":0,"249":0,"253":0,"256":0,"257":0,"262":0,"265":0,"266":0,"271":0,"275":0,"277":0,"279":0,"280":0,"285":0,"286":0,"297":0,"298":0,"303":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:53":0,"destructor:69":0,"render:89":0,"icon:126":0,"generateLibbitRecordId:153":0,"parseLibbitRecordId:168":0,"_attachEventHandles:174":0,"_detachEventHandles:189":0,"(anonymous 2):198":0,"_restoreTreeOpenState:193":0,"(anonymous 3):214":0,"_restoreNodeOpenState:204":0,"_handleToggle:245":0,"_handleExpand:252":0,"_handleCollapse:261":0,"_handleModelChange:270":0,"_destroyContainer:296":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 68;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 18;
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 1);
YUI.add('libbit-treeview', function (Y, NAME) {

/**
 * Provides the `Y.Libbit.TreeView` widget.
 *
 * @module libbit-treeview
 */

_yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 9);
var TreeView;

/**
 * A TreeView widget, implementing Y.View.
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new Y.Libbit.TreeView({
 *    model     : model,
 *    dragdrop  : true,
 *    selectable: true,
 *    groups    : ['libbit-treeview'],
 *    header    : 'LiBBiT TreeView'
 * });
 * </code></pre>
 *
 * @class TreeView
 * @param {Object} [config] The following configuration properties are required:
 *
 *     @param {Object} [config.container] The container to bind the treeView to.
 *     @param {Boolean} [config.dragdrop] Enable standalone drag and drop for this instance.
 *     @param {Boolean} [config.selectable] Enables selection of tree nodes. Only single selection
 *         is supported for now
 *     @param {Y.Libbit.ModelTree} [config.model] A LiBBiT Tree model. Change events are bound to update
 *         the view when the model changes.
 *     @param {Array} [config.groups] The DD groups that can interact with this
 *         TreeView instance.
 *     @param {String} [config.header] An optional header, needed for global dropping on the root node
 *
 * @constructor
 * @extends Y.TreeView
 */
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 40);
TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {
    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the state of the opened tree nodes.
     *
     * @property {Array} _stateMap
     * @protected
     */
    _stateMap: [],

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        // Hook into the initializer chain to set the nodes.
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 53);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 55);
config.nodes = config.model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 57);
if (config.header) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 58);
this.header = config.header;
        }

        // Initialize the state map so it doesn't contain any garbage from previous instances.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
this._stateMap = [];

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 64);
this.set('model', config.model);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 66);
this._attachEventHandles();
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "destructor", 69);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
this._detachEventHandles();

        // Free the reference so the property is eligible for garbage collection.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 73);
this._stateMap = null;

        // Remove the container from the DOM and destroy it.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 76);
this._destroyContainer();
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Overrides TreeView's `render()` method to wrap the container into a parent container,
     * and hook into the rendering process.
     *
     * @method render
     * @chainable
     * @see Y.TreeView.render()
     */
    render: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "render", 89);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 90);
var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win,
            header        = this.header;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 94);
if (!this.rendered) {
            // Append a subcontainer to render the tree.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 96);
var subContainer = Y.Node.create('<div class="libbit-treeview-inner-container"></div>');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 98);
container.addClass('libbit-treeview-outer-container');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 99);
container.append(subContainer);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
container.addClass(this.classNames.treeview);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 104);
if (header) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 105);
subContainer.append('<div class="nav-header">' + header + '</div>');
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 109);
this._childrenNode = this.renderChildren(this.rootNode, {
            // Pass the subcontainer.
            container: container.one('.libbit-treeview-inner-container')
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 114);
this.rendered = true;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
return this;
    },

    /**
     * Return a CSS class string, modified by the given tree node and it's associated model.
     *
     * @method icon
     * @param  {Y.Tree.Node} node Tee Node.
     * @return {String} A composed CSS string.
     */
    icon: function (node) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "icon", 126);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 127);
var model     = node.data,
            icons     = this.get('model').get('icons'),
            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 131);
if (icons && model instanceof Y.Model  && icons[model.name]) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
var icon = icons[model.name];

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 134);
if (Y.Lang.isString(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 135);
return className + ' ' + icon;
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 138);
if (Y.Lang.isArray(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 139);
return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 143);
return className;
    },

    /**
     * Generate a unique LiBBiT record ID, composed of the class type and the model ID.
     *
     * @method generateLibbitRecordID
     * @param  {Y.Model} model A model instance.
     * @return {String} A unique ID.
     */
    generateLibbitRecordId: function (model) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "generateLibbitRecordId", 153);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 154);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 158);
return null;
    },

    /**
     * Parse a unique LiBBiT model id.
     *
     * @method parseLibbitRecordID
     * @param  {String} id A LiBBiT record ID.
     * @return {Array} An array containing type and ID.
     */
    parseLibbitRecordId: function (id) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "parseLibbitRecordId", 168);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 169);
return id.split('_');
    },

    // -- Protected Methods ----------------------------------------------------

    _attachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEventHandles", 174);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 175);
this._eventHandles || (this._eventHandles = []);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 177);
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 179);
this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            this.after(['open', 'close'], this._handleToggle, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    _detachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEventHandles", 189);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 190);
(new Y.EventHandle(this._eventHandles)).detach();
    },

    _restoreTreeOpenState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreTreeOpenState", 193);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
var self     = this,
            rootNode = this.rootNode;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 197);
if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 198);
Y.Array.each(rootNode.children, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 198);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreNodeOpenState", 204);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
var id    = this.generateLibbitRecordId(node.data),
             index = this._stateMap.indexOf(id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 208);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 209);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 213);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 214);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 214);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleToggle", 245);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 246);
var node      = e.node,
            htmlNode  = this.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 249);
htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));
    },

    _handleExpand: function (e) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 252);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 253);
var id    = this.generateLibbitRecordId(e.node.data),
             index = this._stateMap.indexOf(id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 256);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 257);
this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 261);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 262);
var id    = this.generateLibbitRecordId(e.node.data),
            index = this._stateMap.indexOf(id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 265);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 266);
this._stateMap.splice(index, 1);
        }
    },

    _handleModelChange: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleModelChange", 270);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 271);
var nodes = this.get('model').get('items');

        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the
        // events to our animation listeners etc.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 275);
this.clear({silent: true});

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 277);
if (nodes) {
            // Returns an array of references to the created tree nodes.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 279);
var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 280);
this._restoreTreeOpenState(treeNodes);
        }

        // The model might change before the view is rendered, in this case we don't want to trigger any
        // listeners bound to the render function yet.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 285);
if (this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 286);
this.render();
        }
    },

    /**
     * Removes the `container` from the DOM and purges all its event listeners.
     *
     * @method _destroyContainer
     * @protected
     */
    _destroyContainer: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_destroyContainer", 296);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 297);
var container = this.get('container');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 298);
container && container.remove(true);
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 303);
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
