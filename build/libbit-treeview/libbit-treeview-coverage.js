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
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].code=["YUI.add('libbit-treeview', function (Y, NAME) {","","/**"," * Provides the `Y.Libbit.TreeView` widget."," *"," * @module libbit-treeview"," */","","var TreeView;","","/**"," * A TreeView widget, implementing Y.View."," * Quick Example:<br/>"," *"," * <pre><code>var instance = new Y.Libbit.TreeView({"," *    model     : model,"," *    dragdrop  : true,"," *    selectable: true,"," *    groups    : ['libbit-treeview'],"," *    header    : 'LiBBiT TreeView'"," * });"," * </code></pre>"," *"," * @class TreeView"," * @param {Object} [config] The following configuration properties are required:"," *"," *     @param {Object} [config.container] The container to bind the treeView to."," *     @param {Boolean} [config.dragdrop] Enable standalone drag and drop for this instance."," *     @param {Boolean} [config.selectable] Enables selection of tree nodes. Only single selection"," *         is supported for now"," *     @param {Y.Libbit.ModelTree} [config.model] A LiBBiT Tree model. Change events are bound to update"," *         the view when the model changes."," *     @param {Array} [config.groups] The DD groups that can interact with this"," *         TreeView instance."," *     @param {String} [config.header] An optional header, needed for global dropping on the root node"," *"," * @constructor"," * @extends Y.TreeView"," */","TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {","    // -- Protected Properties -------------------------------------------------","","    /**","     * Stores the state of the opened tree nodes.","     *","     * @property {Array} _stateMap","     * @protected","     */","    _stateMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function (config) {","        // Hook into the initializer chain to set the nodes.","        config.nodes = config.model.get('items');","","        if (config.header) {","            this.header = config.header;","        }","","        this.set('model', config.model);","","        this._attachEventHandles();","    },","","    destructor: function () {","        this._detachEventHandles();","","        for (var i in this._stateMap) {","            delete this._stateMap[i];","        }","","        // Remove the container from the DOM and destroy it.","        this.get('container').remove().destroy(true);","    },","","    // -- Public Methods -------------------------------------------------------","","    /**","     * Overrides TreeView's `render()` method to wrap the container into a parent container,","     * and hook into the rendering process.","     *","     * @method render","     * @chainable","     * @see Y.TreeView.render()","     */","    render: function () {","        var container     = this.get('container'),","            isTouchDevice = 'ontouchstart' in Y.config.win,","            header        = this.header;","","        if (!this.rendered) {","            // Append a subcontainer to render the tree.","            var subContainer = Y.Node.create('<div class=\"libbit-treeview-inner-container\"></div>');","","            container.addClass('libbit-treeview-outer-container');","            container.append(subContainer);","","            container.addClass(this.classNames.treeview);","            container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);","","            if (header) {","                subContainer.append('<div class=\"nav-header\">' + header + '</div>');","            }","        }","","        this._childrenNode = this.renderChildren(this.rootNode, {","            // Pass the subcontainer.","            container: container.one('.libbit-treeview-inner-container')","        });","","        this.rendered = true;","","        return this;","    },","","    /**","     * Return a CSS class string, modified by the given tree node and it's associated model.","     *","     * @method icon","     * @param  {Y.Tree.Node} node Tee Node.","     * @return {String} A composed CSS string.","     */","    icon: function (node) {","        var model     = node.data,","            icons     = this.get('model').get('icons'),","            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');","","        if (icons && model instanceof Y.Model  && icons[model.name]) {","            var icon = icons[model.name];","","            if (Y.Lang.isString(icon)) {","                return className + ' ' + icon;","            }","","            if (Y.Lang.isArray(icon)) {","                return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);","            }","        }","","        return className;","    },","","    /**","     * Generate a unique LiBBiT record ID, composed of the class type and the model ID.","     *","     * @method generateLibbitRecordID","     * @param  {Y.Model} model A model instance.","     * @return {String} A unique ID.","     */","    generateLibbitRecordId: function (model) {","        if (model instanceof Y.Model) {","            return model.name + '_' + model.get('id');","        }","","        return null;","    },","","    /**","     * Parse a unique LiBBiT model id.","     *","     * @method parseLibbitRecordID","     * @param  {String} id A LiBBiT record ID.","     * @return {Array} An array containing type and ID.","     */","    parseLibbitRecordId: function (id) {","        return id.split('_');","    },","","    // -- Protected Methods ----------------------------------------------------","","    _attachEventHandles: function () {","        this._eventHandles || (this._eventHandles = []);","","        var model = this.get('model');","","        this._eventHandles.push(","            this.on('open', this._handleExpand, this),","            this.on('close', this._handleCollapse, this),","","            this.after(['open', 'close'], this._handleToggle, this),","","            model.after('change', this._handleModelChange, this)","        );","    },","","    _detachEventHandles: function () {","        (new Y.EventHandle(this._eventHandles)).detach();","    },","","    _restoreTreeOpenState: function () {","        var self     = this,","            rootNode = this.rootNode;","","        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {","            Y.Array.each(rootNode.children, function (node) {","                self._restoreNodeOpenState(node);","            });","        }","    },","","    _restoreNodeOpenState: function (node) {","         var id    = this.generateLibbitRecordId(node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","         if (index !== -1) {","            node.open({silent: true});","         }","","         // Look for child nodes to open, even if their parent is closed.","        if (node.hasChildren()) {","            Y.Array.each(node.children, function (child) {","                this._restoreNodeOpenState(child);","            }, this);","        }","    },","","    // _fixWidth: function (node) {","    //     var li = this.getHTMLNode(node);","    //     var count = 0;","    //     var current = li.ancestor('.' + this.classNames.children);","","    //     while (current.ancestor('.' + this.classNames.children)) {","    //         count++;","    //         current = current.ancestor('.' + this.classNames.children);","    //     }","","    //     if (count > 0) {","    //         var ml = count * 20;","","","    //         if (ml) {","    //             li.setStyle('marginLeft', -ml);","    //             li.one('div').setStyle('paddingLeft', ml + 20);","    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);","    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);","    //         }","    //     }","    // },","","    // -- Protected Event Handlers ---------------------------------------------","","    _handleToggle: function (e) {","        var node      = e.node,","            htmlNode  = this.getHTMLNode(e.node);","","        htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));","    },","","    _handleExpand: function (e) {","         var id    = this.generateLibbitRecordId(e.node.data),","             index = Y.Array.indexOf(this._stateMap, id);","","        if (index === -1) {","            this._stateMap.push(id);","        }","    },","","    _handleCollapse: function (e) {","        var id    = this.generateLibbitRecordId(e.node.data),","            index = Y.Array.indexOf(this._stateMap, id);","","        if (index !== -1) {","            this._stateMap.splice(index, 1);","        }","    },","","    _handleModelChange: function () {","        var nodes = this.get('model').get('items');","","        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the","        // events to our animation listeners etc.","        this.clear({silent: true});","","        if (nodes) {","            // Returns an array of references to the created tree nodes.","            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});","            this._restoreTreeOpenState(treeNodes);","        }","","        // The model might change before the view is rendered, in this case we don't want to trigger any","        // listeners bound to the render function yet.","        if (this.rendered) {","            this.render();","        }","    }","}, {","    /**","     * The scrollable container.","     *","     * @attribute {Object}","     * @default null","     */","    ATTRS: {","        filter: {","            value : null","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').TreeView = TreeView;","","","}, '1.0.0', {","    \"requires\": [","        \"gallery-sm-treeview\",","        \"libbit-model-tree\",","        \"libbit-treeview-anim\",","        \"libbit-treeview-dd\",","        \"libbit-treeview-templates\",","        \"libbit-treeview-select\"","    ],","    \"supersedes\": [","        \"gallery-sm-treeview-templates\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].lines = {"1":0,"9":0,"40":0,"55":0,"57":0,"58":0,"61":0,"63":0,"67":0,"69":0,"70":0,"74":0,"88":0,"92":0,"94":0,"96":0,"97":0,"99":0,"100":0,"102":0,"103":0,"107":0,"112":0,"114":0,"125":0,"129":0,"130":0,"132":0,"133":0,"136":0,"137":0,"141":0,"152":0,"153":0,"156":0,"167":0,"173":0,"175":0,"177":0,"188":0,"192":0,"195":0,"196":0,"197":0,"203":0,"206":0,"207":0,"211":0,"212":0,"213":0,"244":0,"247":0,"251":0,"254":0,"255":0,"260":0,"263":0,"264":0,"269":0,"273":0,"275":0,"277":0,"278":0,"283":0,"284":0,"302":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].functions = {"initializer:53":0,"destructor:66":0,"render:87":0,"icon:124":0,"generateLibbitRecordId:151":0,"parseLibbitRecordId:166":0,"_attachEventHandles:172":0,"_detachEventHandles:187":0,"(anonymous 2):196":0,"_restoreTreeOpenState:191":0,"(anonymous 3):212":0,"_restoreNodeOpenState:202":0,"_handleToggle:243":0,"_handleExpand:250":0,"_handleCollapse:259":0,"_handleModelChange:268":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredLines = 66;
_yuitest_coverage["build/libbit-treeview/libbit-treeview.js"].coveredFunctions = 17;
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

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 61);
this.set('model', config.model);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 63);
this._attachEventHandles();
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "destructor", 66);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 67);
this._detachEventHandles();

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 69);
for (var i in this._stateMap) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 70);
delete this._stateMap[i];
        }

        // Remove the container from the DOM and destroy it.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 74);
this.get('container').remove().destroy(true);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "render", 87);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 88);
var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win,
            header        = this.header;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 92);
if (!this.rendered) {
            // Append a subcontainer to render the tree.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 94);
var subContainer = Y.Node.create('<div class="libbit-treeview-inner-container"></div>');

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 96);
container.addClass('libbit-treeview-outer-container');
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 97);
container.append(subContainer);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 99);
container.addClass(this.classNames.treeview);
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 100);
container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 102);
if (header) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 103);
subContainer.append('<div class="nav-header">' + header + '</div>');
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 107);
this._childrenNode = this.renderChildren(this.rootNode, {
            // Pass the subcontainer.
            container: container.one('.libbit-treeview-inner-container')
        });

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 112);
this.rendered = true;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 114);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "icon", 124);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 125);
var model     = node.data,
            icons     = this.get('model').get('icons'),
            className = 'libbit-treeview-icon' + (node.isSelected() ? ' icon-white' : '');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 129);
if (icons && model instanceof Y.Model  && icons[model.name]) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 130);
var icon = icons[model.name];

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 132);
if (Y.Lang.isString(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 133);
return className + ' ' + icon;
            }

            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 136);
if (Y.Lang.isArray(icon)) {
                _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 137);
return className + ' ' + (node.isOpen() ? icon[0] : icon[1]);
            }
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 141);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "generateLibbitRecordId", 151);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 152);
if (model instanceof Y.Model) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 153);
return model.name + '_' + model.get('id');
        }

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 156);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "parseLibbitRecordId", 166);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 167);
return id.split('_');
    },

    // -- Protected Methods ----------------------------------------------------

    _attachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_attachEventHandles", 172);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 173);
this._eventHandles || (this._eventHandles = []);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 175);
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 177);
this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            this.after(['open', 'close'], this._handleToggle, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    _detachEventHandles: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_detachEventHandles", 187);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 188);
(new Y.EventHandle(this._eventHandles)).detach();
    },

    _restoreTreeOpenState: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreTreeOpenState", 191);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 192);
var self     = this,
            rootNode = this.rootNode;

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 195);
if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 196);
Y.Array.each(rootNode.children, function (node) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 2)", 196);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 197);
self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_restoreNodeOpenState", 202);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 203);
var id    = this.generateLibbitRecordId(node.data),
             index = Y.Array.indexOf(this._stateMap, id);

         _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 206);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 207);
node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 211);
if (node.hasChildren()) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 212);
Y.Array.each(node.children, function (child) {
                _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "(anonymous 3)", 212);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 213);
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
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleToggle", 243);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 244);
var node      = e.node,
            htmlNode  = this.getHTMLNode(e.node);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 247);
htmlNode.one('.libbit-treeview-icon').set('className', this.icon(node));
    },

    _handleExpand: function (e) {
         _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleExpand", 250);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 251);
var id    = this.generateLibbitRecordId(e.node.data),
             index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 254);
if (index === -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 255);
this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleCollapse", 259);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 260);
var id    = this.generateLibbitRecordId(e.node.data),
            index = Y.Array.indexOf(this._stateMap, id);

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 263);
if (index !== -1) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 264);
this._stateMap.splice(index, 1);
        }
    },

    _handleModelChange: function () {
        _yuitest_coverfunc("build/libbit-treeview/libbit-treeview.js", "_handleModelChange", 268);
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 269);
var nodes = this.get('model').get('items');

        // This is a full tree refresh, so handle the tree methods silently, we don't propagate the
        // events to our animation listeners etc.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 273);
this.clear({silent: true});

        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 275);
if (nodes) {
            // Returns an array of references to the created tree nodes.
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 277);
var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 278);
this._restoreTreeOpenState(treeNodes);
        }

        // The model might change before the view is rendered, in this case we don't want to trigger any
        // listeners bound to the render function yet.
        _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 283);
if (this.rendered) {
            _yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 284);
this.render();
        }
    }
}, {
    /**
     * The scrollable container.
     *
     * @attribute {Object}
     * @default null
     */
    ATTRS: {
        filter: {
            value : null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview/libbit-treeview.js", 302);
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
