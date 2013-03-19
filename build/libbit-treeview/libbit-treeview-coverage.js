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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","/**"," * Provides the `Y.Libbit.TreeView` widget."," *"," * @module libbit-treeview"," */","","var TreeView;","","/**"," * A TreeView widget, implementing Y.View."," * Quick Example:<br/>"," *"," * <pre><code>var instance = new Y.Libbit.TreeView({"," *    model     : model,"," *    dragdrop  : true,"," *    selectable: true,"," *    groups    : ['libbit-treeview'],"," *    header    : 'LiBBiT TreeView'"," * });"," * </code></pre>"," *"," * @class TreeView"," * @param {Object} [config] The following configuration properties are required:"," *"," *     @param {Object} [config.container] The container to bind the treeView to."," *     @param {Boolean} [config.dragdrop] Enable standalone drag and drop for this instance."," *     @param {Boolean} [config.selectable] Enables selection of tree nodes. Only single selection"," *         is supported for now"," *     @param {Y.Libbit.ModelTree} [config.model] A LiBBiT Tree model. Change events are bound to update"," *         the view when the model changes."," *     @param {Array} [config.groups] The DD groups that can interact with this"," *         TreeView instance."," *     @param {String} [config.header] An optional header, needed for global dropping on the root node"," *"," * @constructor"," * @extends Y.TreeView"," */","TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {","    // -- Protected Properties -------------------------------------------------","","    /**","     * Stores the state of the opened tree nodes.","     *","     * @property {Array} _stateMap","     * @protected","     */","    _stateMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        // Hook into the initializer chain to set the nodes.","        config.nodes = config.model.get('items');","","        if (config.header) {","            this.header = config.header;","        }","","        // Initialize the state map so it doesn't contain any garbage from previous instances.","        this._stateMap = [];","","        this.set('model', config.model);","","        this._attachEventHandles();","    },","","    destructor: function () {","        this._detachEventHandles();","","        // Free the reference so the property is eligible for garbage collection.","        this._stateMap = null;","","        // Remove the container from the DOM and destroy it.","        this._destroyContainer();","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * Overrides TreeView's `render()` method to wrap the container into a parent container,","     * and hook into the rendering process.","     *","     * @method render","     * @chainable","     * @see Y.TreeView.render()","     */","    render: function () {","        var container     = this.get('container'),","            isTouchDevice = 'ontouchstart' in Y.config.win,","            header        = this.header,","            subContainer  = Y.Node.create('<div class=\"libbit-treeview-inner-container\"></div>');","","        container.addClass(this.classNames.treeview);","        container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);","","        // Append a subcontainer to render the tree.","        container.addClass('libbit-treeview-outer-container');","        container.append(subContainer);","","        if (header) {","            subContainer.append('<div class=\"nav-header\">' + header + '</div>');","        }","","        this._childrenNode = this.renderChildren(this.rootNode, {","            // Pass the subcontainer.","            container: subContainer","        });","","        this.rendered = true;","","        return this;","    },","","    /**","     * Return a CSS class string, modified by the given tree node and it's associated model.","     *","     * @method icon","     * @param  {Y.Tree.Node} node Tee Node.","     * @return {String} A composed CSS string.","     */","    icon: function (node) {","        var model     = node.data,","            icons     = this.get('model').get('icons'),","            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');","","        if (icons && model instanceof Y.Model  && icons[model.name]) {","            var icon = icons[model.name];","","            if (Y.Lang.isString(icon)) {","                return className + ' ' + icon;","            }","","            if (Y.Lang.isArray(icon)) {","                return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);","            }","        }","","        return className;","    },","","    /**","     * Generate a unique LiBBiT record ID, composed of the class type and the model ID.","     *","     * @method generateLibbitRecordID","     * @param  {Y.Model} model A model instance.","     * @return {String} A unique ID.","     */","    generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    /**","     * Parse a unique LiBBiT model id.","     *","     * @method parseLibbitRecordID","     * @param  {String} id A LiBBiT record ID.","     * @return {Array} An array containing type and ID.","     */","    parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    // -- Protected Methods ----------------------------------------------------","","    _attachEventHandles: function () {","        this._eventHandles || (this._eventHandles = []);","","        var model = this.get('model');","","        this._eventHandles.push(","            this.on('open', this._handleExpand, this),","            this.on('close', this._handleCollapse, this),","","            this.after(['open', 'close'], this._handleToggle, this),","","            model.after('change', this._handleModelChange, this)","        );","    },","","    _detachEventHandles: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","    },","","    _restoreTreeOpenState: function () {","        var self     = this,","            rootNode = this.rootNode;","","        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {","            Y.Array.each(rootNode.children, function (node) {","                self._restoreNodeOpenState(node);","            });","        }","    },","","    _restoreNodeOpenState: function (node) {","         var id    = this.generateLibbitRecordId(node.data),","             index = this._stateMap.indexOf(id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this._restoreNodeOpenState(child);","            }, this);","        }","    },","","    // _fixWidth: function (node) {","    //     var li = this.getHTMLNode(node);","    //     var count = 0;","    //     var current = li.ancestor('.' + this.classNames.children);","","    //     while (current.ancestor('.' + this.classNames.children)) {","    //         count++;","    //         current = current.ancestor('.' + this.classNames.children);","    //     }","","    //     if (count > 0) {","    //         var ml = count * 20;","","","    //         if (ml) {","    //             li.setStyle('marginLeft', -ml);","    //             li.one('div').setStyle('paddingLeft', ml + 20);","    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","    //         }","    //     }","    // },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleModelChange: function () {","        var nodes = this.get('model').get('items');","","        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the","        // events to our animation listeners etc.","        this.clear(false, {silent: true});","","        // Clean up, normally this would be handled by the original Treeview's handler, but we are clearing","        // the tree silently.","       if (this.rendered) {","            var childNodes = this.get('container').get('childNodes');","","            delete this._childrenNode;","","            childNodes.remove();","","            // Fix for DD. YUI creates the shims on a 100 ms timer after DD init, so if we destroy","            // the node within 100 ms after initialization, the internal node property points to NULL and","            // we get an error.","            Y.later(150, Y, function () {","                childNodes.destroy(true);","            });","        }","","        // Build a new tree silently, and trigger a new render if needed.","        if (nodes) {","            // Returns an array of references to the created tree nodes.","            treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            this._restoreTreeOpenState();","        }","","        this.rendered && this.render();","    },","","    _handleToggle: function (e) {","        var node      = e.node,","            htmlNode  = this.getHTMLNode(e.node);","","        htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));","    },","","    _handleExpand: function (e) {","         var id    = this.generateLibbitRecordId(e.node.data),","             index = this._stateMap.indexOf(id);","","        if (index === -1) {","            this._stateMap.push(id);","        }","    },","","    _handleCollapse: function (e) {","        var id    = this.generateLibbitRecordId(e.node.data),","            index = this._stateMap.indexOf(id);","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","    },","","    /**","     * Removes the `container` from the DOM and purges all its event listeners.","     *","     * @method _destroyContainer","     * @protected","     */","    _destroyContainer: function () {","        var container = this.get('container');","        container && container.remove(true);","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-templates\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"9":0,"40":0,"55":0,"57":0,"58":0,"62":0,"64":0,"66":0,"70":0,"73":0,"76":0,"90":0,"95":0,"96":0,"99":0,"100":0,"102":0,"103":0,"106":0,"111":0,"113":0,"124":0,"128":0,"129":0,"131":0,"132":0,"135":0,"136":0,"140":0,"151":0,"152":0,"155":0,"166":0,"172":0,"174":0,"176":0,"187":0,"191":0,"194":0,"195":0,"196":0,"202":0,"205":0,"206":0,"210":0,"211":0,"212":0,"243":0,"247":0,"251":0,"252":0,"254":0,"256":0,"261":0,"262":0,"267":0,"269":0,"270":0,"273":0,"277":0,"280":0,"284":0,"287":0,"288":0,"293":0,"296":0,"297":0,"308":0,"309":0,"314":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:53":0,"destructor:69":0,"render:89":0,"icon:123":0,"generateLibbitRecordId:150":0,"parseLibbitRecordId:165":0,"_attachEventHandles:171":0,"_detachEventHandles:186":0,"(anonymous 2):195":0,"_restoreTreeOpenState:190":0,"(anonymous 3):211":0,"_restoreNodeOpenState:201":0,"(anonymous 4):261":0,"_handleModelChange:242":0,"_handleToggle:276":0,"_handleExpand:283":0,"_handleCollapse:292":0,"_destroyContainer:307":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 71;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 19;
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
            header        = this.header,
            subContainer  = Y.Node.create('<div class="libbit-treeview-inner-container"></div>');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 95);
container.addClass(this.classNames.treeview);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 96);
container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

        // Append a subcontainer to render the tree.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 99);
container.addClass('libbit-treeview-outer-container');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 100);
container.append(subContainer);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
if (header) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 103);
subContainer.append('<div class="nav-header">' + header + '</div>');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 106);
this._childrenNode = this.renderChildren(this.rootNode, {
            // Pass the subcontainer.
            container: subContainer
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 111);
this.rendered = true;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 113);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "icon", 123);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 124);
var model     = node.data,
            icons     = this.get('model').get('icons'),
            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 128);
if (icons && model instanceof Y.Model  && icons[model.name]) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 129);
var icon = icons[model.name];

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 131);
if (Y.Lang.isString(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
return className + ' ' + icon;
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 135);
if (Y.Lang.isArray(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 136);
return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 140);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "generateLibbitRecordId", 150);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 151);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 152);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 155);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "parseLibbitRecordId", 165);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 166);
return id.split('_');
    },

    // -- Protected Methods ----------------------------------------------------

    _attachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEventHandles", 171);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 172);
this._eventHandles || (this._eventHandles = []);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 174);
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 176);
this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            this.after(['open', 'close'], this._handleToggle, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    _detachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEventHandles", 186);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 187);
(new Y.EventHandle(this._eventHandles)).detach();
    },

    _restoreTreeOpenState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreTreeOpenState", 190);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 191);
var self     = this,
            rootNode = this.rootNode;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 194);
if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
Y.Array.each(rootNode.children, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 195);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 196);
self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreNodeOpenState", 201);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 202);
var id    = this.generateLibbitRecordId(node.data),
             index = this._stateMap.indexOf(id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 205);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 206);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 211);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 212);
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

    _handleModelChange: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleModelChange", 242);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 243);
var nodes = this.get('model').get('items');

        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the
        // events to our animation listeners etc.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 247);
this.clear(false, {silent: true});

        // Clean up, normally this would be handled by the original Treeview's handler, but we are clearing
        // the tree silently.
       _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 251);
if (this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 252);
var childNodes = this.get('container').get('childNodes');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 254);
delete this._childrenNode;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 256);
childNodes.remove();

            // Fix for DD. YUI creates the shims on a 100 ms timer after DD init, so if we destroy
            // the node within 100 ms after initialization, the internal node property points to NULL and
            // we get an error.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 261);
Y.later(150, Y, function () {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 261);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 262);
childNodes.destroy(true);
            });
        }

        // Build a new tree silently, and trigger a new render if needed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 267);
if (nodes) {
            // Returns an array of references to the created tree nodes.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 269);
treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 270);
this._restoreTreeOpenState();
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 273);
this.rendered && this.render();
    },

    _handleToggle: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleToggle", 276);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 277);
var node      = e.node,
            htmlNode  = this.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 280);
htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));
    },

    _handleExpand: function (e) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 283);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 284);
var id    = this.generateLibbitRecordId(e.node.data),
             index = this._stateMap.indexOf(id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 287);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 288);
this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 292);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 293);
var id    = this.generateLibbitRecordId(e.node.data),
            index = this._stateMap.indexOf(id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 296);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 297);
this._stateMap.splice(index, 1);
        }
    },

    /**
     * Removes the `container` from the DOM and purges all its event listeners.
     *
     * @method _destroyContainer
     * @protected
     */
    _destroyContainer: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_destroyContainer", 307);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 308);
var container = this.get('container');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 309);
container && container.remove(true);
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 314);
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
