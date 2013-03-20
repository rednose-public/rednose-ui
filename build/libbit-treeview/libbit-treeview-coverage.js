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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","/**"," * Provides the `Y.Libbit.TreeView` widget."," *"," * @module libbit-treeview"," */","","var TreeView;","","/**"," * A TreeView widget, implementing Y.View."," * Quick Example:<br/>"," *"," * <pre><code>var instance = new Y.Libbit.TreeView({"," *    model     : model,"," *    dragdrop  : true,"," *    selectable: true,"," *    groups    : ['libbit-treeview'],"," *    header    : 'LiBBiT TreeView'"," * });"," * </code></pre>"," *"," * @class TreeView"," * @param {Object} [config] The following configuration properties are required:"," *"," *     @param {Object} [config.container] The container to bind the treeView to."," *     @param {Boolean} [config.dragdrop] Enable standalone drag and drop for this instance."," *     @param {Boolean} [config.selectable] Enables selection of tree nodes. Only single selection"," *         is supported for now"," *     @param {Y.Libbit.ModelTree} [config.model] A LiBBiT Tree model. Change events are bound to update"," *         the view when the model changes."," *     @param {Array} [config.groups] The DD groups that can interact with this"," *         TreeView instance."," *     @param {String} [config.header] An optional header, needed for global dropping on the root node"," *"," * @constructor"," * @extends Y.TreeView"," */","TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {","    // -- Protected Properties -------------------------------------------------","","    /**","     * Stores the state of the opened tree nodes.","     *","     * @property {Array} _stateMap","     * @protected","     */","    _stateMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        config || (config = {});","","        if (!config.model) {","        }","","        // Hook into the initializer chain to set the nodes.","        config.nodes = config.model.get('items');","","        if (config.header) {","            this.header = config.header;","        }","","        // Initialize the state map so it doesn't contain any garbage from previous instances.","        this._stateMap = [];","","        this.set('model', config.model);","","        this._attachEventHandles();","    },","","    destructor: function () {","        this._detachEventHandles();","","        // Free the reference so the property is eligible for garbage collection.","        this._stateMap = null;","","        // Remove the container from the DOM and destroy it.","        this._destroyContainer();","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * Overrides TreeView's `render()` method to wrap the container into a parent container,","     * and hook into the rendering process.","     *","     * @method render","     * @chainable","     * @see Y.TreeView.render()","     */","    render: function () {","        var container     = this.get('container'),","            isTouchDevice = 'ontouchstart' in Y.config.win,","            header        = this.header,","            subContainer  = Y.Node.create('<div class=\"libbit-treeview-inner-container\"></div>');","","        container.addClass(this.classNames.treeview);","        container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);","","        // Append a subcontainer to render the tree.","        container.addClass('libbit-treeview-outer-container');","        container.append(subContainer);","","        if (header) {","            subContainer.append('<div class=\"nav-header\">' + header + '</div>');","        }","","        this._childrenNode = this.renderChildren(this.rootNode, {","            // Pass the subcontainer.","            container: subContainer","        });","","        this.rendered = true;","","        return this;","    },","","    /**","     * Return a CSS class string, modified by the given tree node and it's associated model.","     *","     * @method icon","     * @param  {Y.Tree.Node} node Tee Node.","     * @return {String} A composed CSS string.","     */","    icon: function (node) {","        var model     = node.data,","            icons     = this.get('model').get('icons'),","            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');","","        if (icons && model instanceof Y.Model  && icons[model.name]) {","            var icon = icons[model.name];","","            if (Y.Lang.isString(icon)) {","                return className + ' ' + icon;","            }","","            if (Y.Lang.isArray(icon)) {","                return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);","            }","        }","","        return className;","    },","","    /**","     * Generate a unique LiBBiT record ID, composed of the class type and the model ID.","     *","     * @method generateLibbitRecordID","     * @param  {Y.Model} model A model instance.","     * @return {String} A unique ID.","     */","    generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    /**","     * Parse a unique LiBBiT model id.","     *","     * @method parseLibbitRecordID","     * @param  {String} id A LiBBiT record ID.","     * @return {Array} An array containing type and ID.","     */","    parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    // -- Protected Methods ----------------------------------------------------","","    _attachEventHandles: function () {","        this._eventHandles || (this._eventHandles = []);","","        var model = this.get('model');","","        this._eventHandles.push(","            this.on('open', this._handleExpand, this),","            this.on('close', this._handleCollapse, this),","","            this.after(['open', 'close'], this._handleToggle, this),","","            model.after('change', this._handleModelChange, this)","        );","    },","","    _detachEventHandles: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","    },","","    _restoreTreeOpenState: function () {","        var self     = this,","            rootNode = this.rootNode;","","        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {","            Y.Array.each(rootNode.children, function (node) {","                self._restoreNodeOpenState(node);","            });","        }","    },","","    _restoreNodeOpenState: function (node) {","         var id    = this.generateLibbitRecordId(node.data),","             index = this._stateMap.indexOf(id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this._restoreNodeOpenState(child);","            }, this);","        }","    },","","    // _fixWidth: function (node) {","    //     var li = this.getHTMLNode(node);","    //     var count = 0;","    //     var current = li.ancestor('.' + this.classNames.children);","","    //     while (current.ancestor('.' + this.classNames.children)) {","    //         count++;","    //         current = current.ancestor('.' + this.classNames.children);","    //     }","","    //     if (count > 0) {","    //         var ml = count * 20;","","","    //         if (ml) {","    //             li.setStyle('marginLeft', -ml);","    //             li.one('div').setStyle('paddingLeft', ml + 20);","    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","    //         }","    //     }","    // },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleModelChange: function () {","        var nodes = this.get('model').get('items');","","        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the","        // events to our animation listeners etc.","        this.clear(false, {silent: true});","","        // Clean up, normally this would be handled by the original Treeview's handler, but we are clearing","        // the tree silently.","       if (this.rendered) {","            var childNodes = this.get('container').get('childNodes');","","            delete this._childrenNode;","","            childNodes.remove();","","            // Fix for DD. YUI creates the shims on a 100 ms timer after DD init, so if we destroy","            // the node within 100 ms after initialization, the internal node property points to NULL and","            // we get an error.","            Y.later(150, Y, function () {","                childNodes.destroy(true);","            });","        }","","        // Build a new tree silently, and trigger a new render if needed.","        if (nodes) {","            // Returns an array of references to the created tree nodes.","            treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            this._restoreTreeOpenState();","        }","","        this.rendered && this.render();","    },","","    _handleToggle: function (e) {","        var node      = e.node,","            htmlNode  = this.getHTMLNode(e.node);","","        htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));","    },","","    _handleExpand: function (e) {","         var id    = this.generateLibbitRecordId(e.node.data),","             index = this._stateMap.indexOf(id);","","        if (index === -1) {","            this._stateMap.push(id);","        }","    },","","    _handleCollapse: function (e) {","        var id    = this.generateLibbitRecordId(e.node.data),","            index = this._stateMap.indexOf(id);","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","    },","","    /**","     * Removes the `container` from the DOM and purges all its event listeners.","     *","     * @method _destroyContainer","     * @protected","     */","    _destroyContainer: function () {","        var container = this.get('container');","        container && container.remove(true);","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-templates\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"9":0,"40":0,"54":0,"56":0,"60":0,"62":0,"63":0,"67":0,"69":0,"71":0,"75":0,"78":0,"81":0,"95":0,"100":0,"101":0,"104":0,"105":0,"107":0,"108":0,"111":0,"116":0,"118":0,"129":0,"133":0,"134":0,"136":0,"137":0,"140":0,"141":0,"145":0,"156":0,"157":0,"160":0,"171":0,"177":0,"179":0,"181":0,"192":0,"196":0,"199":0,"200":0,"201":0,"207":0,"210":0,"211":0,"215":0,"216":0,"217":0,"248":0,"252":0,"256":0,"257":0,"259":0,"261":0,"266":0,"267":0,"272":0,"274":0,"275":0,"278":0,"282":0,"285":0,"289":0,"292":0,"293":0,"298":0,"301":0,"302":0,"313":0,"314":0,"319":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:53":0,"destructor:74":0,"render:94":0,"icon:128":0,"generateLibbitRecordId:155":0,"parseLibbitRecordId:170":0,"_attachEventHandles:176":0,"_detachEventHandles:191":0,"(anonymous 2):200":0,"_restoreTreeOpenState:195":0,"(anonymous 3):216":0,"_restoreNodeOpenState:206":0,"(anonymous 4):266":0,"_handleModelChange:247":0,"_handleToggle:281":0,"_handleExpand:288":0,"_handleCollapse:297":0,"_destroyContainer:312":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 73;
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "initializer", 53);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 54);
config || (config = {});

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 56);
if (!config.model) {
        }

        // Hook into the initializer chain to set the nodes.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 60);
config.nodes = config.model.get('items');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 62);
if (config.header) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 63);
this.header = config.header;
        }

        // Initialize the state map so it doesn't contain any garbage from previous instances.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 67);
this._stateMap = [];

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 69);
this.set('model', config.model);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 71);
this._attachEventHandles();
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "destructor", 74);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 75);
this._detachEventHandles();

        // Free the reference so the property is eligible for garbage collection.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 78);
this._stateMap = null;

        // Remove the container from the DOM and destroy it.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 81);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "render", 94);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 95);
var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win,
            header        = this.header,
            subContainer  = Y.Node.create('<div class="libbit-treeview-inner-container"></div>');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 100);
container.addClass(this.classNames.treeview);
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 101);
container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

        // Append a subcontainer to render the tree.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 104);
container.addClass('libbit-treeview-outer-container');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 105);
container.append(subContainer);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
if (header) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 108);
subContainer.append('<div class="nav-header">' + header + '</div>');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 111);
this._childrenNode = this.renderChildren(this.rootNode, {
            // Pass the subcontainer.
            container: subContainer
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 116);
this.rendered = true;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 118);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "icon", 128);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 129);
var model     = node.data,
            icons     = this.get('model').get('icons'),
            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 133);
if (icons && model instanceof Y.Model  && icons[model.name]) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 134);
var icon = icons[model.name];

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 136);
if (Y.Lang.isString(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 137);
return className + ' ' + icon;
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 140);
if (Y.Lang.isArray(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 141);
return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 145);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "generateLibbitRecordId", 155);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 156);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 157);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 160);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "parseLibbitRecordId", 170);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 171);
return id.split('_');
    },

    // -- Protected Methods ----------------------------------------------------

    _attachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEventHandles", 176);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 177);
this._eventHandles || (this._eventHandles = []);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 179);
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 181);
this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            this.after(['open', 'close'], this._handleToggle, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    _detachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEventHandles", 191);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 192);
(new Y.EventHandle(this._eventHandles)).detach();
    },

    _restoreTreeOpenState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreTreeOpenState", 195);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 196);
var self     = this,
            rootNode = this.rootNode;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 199);
if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 200);
Y.Array.each(rootNode.children, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 200);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 201);
self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreNodeOpenState", 206);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 207);
var id    = this.generateLibbitRecordId(node.data),
             index = this._stateMap.indexOf(id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 210);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 215);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 216);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 216);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 217);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleModelChange", 247);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 248);
var nodes = this.get('model').get('items');

        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the
        // events to our animation listeners etc.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 252);
this.clear(false, {silent: true});

        // Clean up, normally this would be handled by the original Treeview's handler, but we are clearing
        // the tree silently.
       _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 256);
if (this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 257);
var childNodes = this.get('container').get('childNodes');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 259);
delete this._childrenNode;

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 261);
childNodes.remove();

            // Fix for DD. YUI creates the shims on a 100 ms timer after DD init, so if we destroy
            // the node within 100 ms after initialization, the internal node property points to NULL and
            // we get an error.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 266);
Y.later(150, Y, function () {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 4)", 266);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 267);
childNodes.destroy(true);
            });
        }

        // Build a new tree silently, and trigger a new render if needed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 272);
if (nodes) {
            // Returns an array of references to the created tree nodes.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 274);
treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 275);
this._restoreTreeOpenState();
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 278);
this.rendered && this.render();
    },

    _handleToggle: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleToggle", 281);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 282);
var node      = e.node,
            htmlNode  = this.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 285);
htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));
    },

    _handleExpand: function (e) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 288);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 289);
var id    = this.generateLibbitRecordId(e.node.data),
             index = this._stateMap.indexOf(id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 292);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 293);
this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 297);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 298);
var id    = this.generateLibbitRecordId(e.node.data),
            index = this._stateMap.indexOf(id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 301);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 302);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_destroyContainer", 312);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 313);
var container = this.get('container');
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 314);
container && container.remove(true);
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 319);
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
