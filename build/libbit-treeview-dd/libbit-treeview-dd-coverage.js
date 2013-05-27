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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview-dd/libbit-treeview-dd.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    // -- Protected Properties -------------------------------------------------","","    _callbacks: {},","","    /**","     * DD references store","     */","    _ddMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        this._ddMap = [];","","        this.get('dragdrop') && this._attachDdEvents();","    },","","    destructor: function () {","        this._destroyDd();","        this._detachDdEvents();","","        this._callbacks = null;","        this._ddMap     = null;","    },","","    // -- Public Methods -------------------------------------------------------","","    addCallback: function(group, callback, context) {","        this._callbacks[group] = {","            callback: callback,","            context: context","        };","    },","","    /**","     * Update all the the DD shims","     * Most likely used in combination with libbit-nodescroll (scrolling event).","     */","    sizeShims: function() {","        for (var i in this._ddMap) {","            if (typeof(this._ddMap[i].sizeShim) === 'function') {","                this._ddMap[i].sizeShim();","            }","        }","    },","","    // -- Protected Methods ----------------------------------------------------","","    _handleBind: function (parent) {","        var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),","            self  = this;","","        nodes.each(function (node) {","            var model = self.getNodeById(node.getData('node-id')).data;","","            self._createDd(node, model);","","            // FIXME: Use a more generic way to specify droppable models.","            if (model instanceof Y.TB.Category) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                node.addClass('libbit-dd-drop');","                self._ddMap.push(catDD);","            }","        });","","        this.header && this._bindHeader();","    },","","    _bindHeader: function () {","        var container  = this.get('container'),","            dd;","","        dd = new Y.DD.Drop({","            node         : container.one('.nav-header'),","            // Only allow categories to drop here.","            groups       : [ Y.stamp(this) ],","            bubbleTargets: this","        });","","        this._attachHeaderEvents(dd);","        this._ddMap.push(dd);","    },","","    _createDd: function (node, data) {","        var groups = this.get('groups'),","            self   = this,","            dd;","","        if (data instanceof Y.TB.Category) {","            groups = groups.concat([ Y.stamp(this) ]);","        }","","        // Add an extra unique group for the category drags.","        dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: self","        });","","        dd.plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        node.addClass('libbit-treeview-drag');","        this._ddMap.push(dd);","","        return dd;","    },","","    _attachDdEvents: function () {","        this._ddEventHandles || (this._ddEventHandles = []);","","        this._ddEventHandles.push(","            // Setup the initial DD instances when the view is rendered.","            Y.Do.after(this._afterRender, this, 'render', this),","","            this.on({","                'drop:enter': this._handleDdEnter,","                'drop:exit' : this._handleDdExit,","                'drag:start': this._handleStart,","                'drop:hit'  : this._handleDrop","            }),","","            this.after('open', this._handleDdOpen)","        );","    },","","    _attachHeaderEvents: function (dd) {","        this._ddEventHandles.push(","            dd.on({","                'drop:enter': this._handleHeaderEnter,","                'drop:exit' : this._handleHeaderExit","            })","        );","    },","","    _detachDdEvents: function () {","        (new Y.EventHandle(this._ddEventHandles)).detach();","    },","","    /**","     * All DD references must be destoyed if the model is reloaded.","     */","    _destroyDd: function() {","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","","        this._ddMap.length = 0;","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _afterRender: function () {","        this._destroyDd();","        this._handleBind(this.get('container'));","    },","","    _handleHeaderEnter: function (e) {","        var node = e.drop.get('node').ancestor('.libbit-treeview-outer-container');","","        node.addClass('libbit-treeview-drop-over-global');","    },","","    _handleHeaderExit: function (e) {","        var node = e.drop.get('node').ancestor('.libbit-treeview-outer-container');","","        node.hasClass('libbit-treeview-drop-over-global') && node.removeClass('libbit-treeview-drop-over-global');","    },","","    _handleDdOpen: function (e) {","        var treeNode = e.node,","            htmlNode = this.getHTMLNode(treeNode);","","        this._handleBind(htmlNode);","    },","","    _handleDdEnter: function (e) {","       if (e.drop.get('node').one('.libbit-treeview-icon')) {","            e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');","        }","    },","","    _handleDdExit: function (e) {","        // FIXME: Ignore selected nodes","        if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","            e.drop.get('node').all('.icon-white').removeClass('icon-white');","        }","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').get('outerHTML')","        );","","        drag.get('dragNode').all('.icon-white').removeClass('icon-white');","","        // Recreate the drag instance","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDd(origin, model);","    },","","    _handleDrop: function (e) {","        var model    = this.get('model'),","            obj      = e.drag.get('data'),","            dropNode = e.drop.get('node'),","            newCat   = dropNode.hasClass('nav-header') ? null: this.getNodeById(dropNode.getData('node-id')).data;","            callback = false,","            self     = this;","","        Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","","        if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","            e.drop.get('node').all('.icon-white').removeClass('icon-white');","        }","","        // Check for custom override callbacks","        Y.Array.each(e.drag.get('groups'), function (group) {","            if (group in self._callbacks) {","                var config = self._callbacks[group];","","                e.drop.set('data', newCat);","                config.callback.apply(config.context, [e]);","","                callback = true;","            }","        });","","        if (callback) {","            return true;","        }","","        if (obj) {","            var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',","                oldCat        = obj.get(property),","                oldCatModelID = oldCat ? oldCat.id : null,","                newCatModelID = newCat ? newCat.get('id') : null;","","            if (oldCatModelID !== newCatModelID) {","                obj.set(property, newCat);","                obj.save(function () { model.load(); });","            }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-dd\", \"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"22":0,"24":0,"28":0,"29":0,"31":0,"32":0,"38":0,"49":0,"50":0,"51":0,"59":0,"62":0,"63":0,"65":0,"68":0,"70":0,"76":0,"77":0,"78":0,"82":0,"86":0,"89":0,"96":0,"97":0,"101":0,"105":0,"106":0,"110":0,"117":0,"122":0,"123":0,"125":0,"129":0,"131":0,"147":0,"156":0,"163":0,"164":0,"167":0,"173":0,"174":0,"178":0,"180":0,"184":0,"186":0,"190":0,"193":0,"197":0,"198":0,"204":0,"205":0,"210":0,"216":0,"218":0,"222":0,"225":0,"227":0,"229":0,"231":0,"232":0,"234":0,"235":0,"237":0,"241":0,"245":0,"248":0,"250":0,"251":0,"255":0,"256":0,"257":0,"259":0,"260":0,"262":0,"266":0,"267":0,"270":0,"271":0,"276":0,"277":0,"278":0,"295":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"initializer:21":0,"destructor:27":0,"addCallback:37":0,"sizeShims:48":0,"(anonymous 2):62":0,"_handleBind:58":0,"_bindHeader:85":0,"_createDd:100":0,"_attachDdEvents:128":0,"_attachHeaderEvents:146":0,"_detachDdEvents:155":0,"_destroyDd:162":0,"_afterRender:172":0,"_handleHeaderEnter:177":0,"_handleHeaderExit:183":0,"_handleDdOpen:189":0,"_handleDdEnter:196":0,"_handleDdExit:202":0,"_handleStart:209":0,"(anonymous 3):255":0,"(anonymous 4):278":0,"_handleDrop:240":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 85;
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredFunctions = 23;
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 1);
YUI.add('libbit-treeview-dd', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 3);
var DD;

/**
 * Drag and drop extension for the TreeView.
 */
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 8);
DD = Y.Base.create('dd', Y.Base, [], {

    // -- Protected Properties -------------------------------------------------

    _callbacks: {},

    /**
     * DD references store
     */
    _ddMap: [],

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "initializer", 21);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 22);
this._ddMap = [];

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 24);
this.get('dragdrop') && this._attachDdEvents();
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "destructor", 27);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 28);
this._destroyDd();
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 29);
this._detachDdEvents();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 31);
this._callbacks = null;
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 32);
this._ddMap     = null;
    },

    // -- Public Methods -------------------------------------------------------

    addCallback: function(group, callback, context) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "addCallback", 37);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 38);
this._callbacks[group] = {
            callback: callback,
            context: context
        };
    },

    /**
     * Update all the the DD shims
     * Most likely used in combination with libbit-nodescroll (scrolling event).
     */
    sizeShims: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "sizeShims", 48);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 49);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 50);
if (typeof(this._ddMap[i].sizeShim) === 'function') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 51);
this._ddMap[i].sizeShim();
            }
        }
    },

    // -- Protected Methods ----------------------------------------------------

    _handleBind: function (parent) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleBind", 58);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 59);
var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),
            self  = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 62);
nodes.each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 62);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 63);
var model = self.getNodeById(node.getData('node-id')).data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 65);
self._createDd(node, model);

            // FIXME: Use a more generic way to specify droppable models.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 68);
if (model instanceof Y.TB.Category) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 70);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 76);
node.addClass('libbit-treeview-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 77);
node.addClass('libbit-dd-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 78);
self._ddMap.push(catDD);
            }
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 82);
this.header && this._bindHeader();
    },

    _bindHeader: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindHeader", 85);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 86);
var container  = this.get('container'),
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 89);
dd = new Y.DD.Drop({
            node         : container.one('.nav-header'),
            // Only allow categories to drop here.
            groups       : [ Y.stamp(this) ],
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 96);
this._attachHeaderEvents(dd);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 97);
this._ddMap.push(dd);
    },

    _createDd: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDd", 100);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 101);
var groups = this.get('groups'),
            self   = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 105);
if (data instanceof Y.TB.Category) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 106);
groups = groups.concat([ Y.stamp(this) ]);
        }

        // Add an extra unique group for the category drags.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 110);
dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: self
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 117);
dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 122);
node.addClass('libbit-treeview-drag');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 123);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 125);
return dd;
    },

    _attachDdEvents: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_attachDdEvents", 128);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 129);
this._ddEventHandles || (this._ddEventHandles = []);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 131);
this._ddEventHandles.push(
            // Setup the initial DD instances when the view is rendered.
            Y.Do.after(this._afterRender, this, 'render', this),

            this.on({
                'drop:enter': this._handleDdEnter,
                'drop:exit' : this._handleDdExit,
                'drag:start': this._handleStart,
                'drop:hit'  : this._handleDrop
            }),

            this.after('open', this._handleDdOpen)
        );
    },

    _attachHeaderEvents: function (dd) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_attachHeaderEvents", 146);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 147);
this._ddEventHandles.push(
            dd.on({
                'drop:enter': this._handleHeaderEnter,
                'drop:exit' : this._handleHeaderExit
            })
        );
    },

    _detachDdEvents: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_detachDdEvents", 155);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 156);
(new Y.EventHandle(this._ddEventHandles)).detach();
    },

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDd: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_destroyDd", 162);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 163);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 164);
this._ddMap[i].destroy();
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 167);
this._ddMap.length = 0;
    },

    // -- Protected Event Handlers ---------------------------------------------

    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_afterRender", 172);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 173);
this._destroyDd();
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 174);
this._handleBind(this.get('container'));
    },

    _handleHeaderEnter: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleHeaderEnter", 177);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 178);
var node = e.drop.get('node').ancestor('.libbit-treeview-outer-container');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 180);
node.addClass('libbit-treeview-drop-over-global');
    },

    _handleHeaderExit: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleHeaderExit", 183);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 184);
var node = e.drop.get('node').ancestor('.libbit-treeview-outer-container');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 186);
node.hasClass('libbit-treeview-drop-over-global') && node.removeClass('libbit-treeview-drop-over-global');
    },

    _handleDdOpen: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDdOpen", 189);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 190);
var treeNode = e.node,
            htmlNode = this.getHTMLNode(treeNode);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 193);
this._handleBind(htmlNode);
    },

    _handleDdEnter: function (e) {
       _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDdEnter", 196);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 197);
if (e.drop.get('node').one('.libbit-treeview-icon')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 198);
e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');
        }
    },

    _handleDdExit: function (e) {
        // FIXME: Ignore selected nodes
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDdExit", 202);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 204);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 205);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
        }
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 209);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 210);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 216);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 218);
drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 222);
drag.get('dragNode').all('.icon-white').removeClass('icon-white');

        // Recreate the drag instance
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 225);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 227);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 229);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 231);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 232);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 234);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 235);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 237);
dd = this._createDd(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 240);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 241);
var model    = this.get('model'),
            obj      = e.drag.get('data'),
            dropNode = e.drop.get('node'),
            newCat   = dropNode.hasClass('nav-header') ? null: this.getNodeById(dropNode.getData('node-id')).data;
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 245);
callback = false,
            self     = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 248);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 250);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 251);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
        }

        // Check for custom override callbacks
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 255);
Y.Array.each(e.drag.get('groups'), function (group) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 255);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 256);
if (group in self._callbacks) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 257);
var config = self._callbacks[group];

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 259);
e.drop.set('data', newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 260);
config.callback.apply(config.context, [e]);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 262);
callback = true;
            }
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 266);
if (callback) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 267);
return true;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 270);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 271);
var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',
                oldCat        = obj.get(property),
                oldCatModelID = oldCat ? oldCat.id : null,
                newCatModelID = newCat ? newCat.get('id') : null;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 276);
if (oldCatModelID !== newCatModelID) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 277);
obj.set(property, newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 278);
obj.save(function () { _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 278);
model.load(); });
            }
        }
    }
}, {
    ATTRS: {
        dragdrop: {
            value : false
        },

        groups: {
            value : ['libbit-treeview']
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 295);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["libbit-dd", "libbit-treeview"]});
