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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    // -- Protected Properties -------------------------------------------------","","    _callbacks: {},","","    /**","     * DD references store","     */","    _ddMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        var model = this.get('model');","","        this._ddMap = [];","","        // TODO: Bind on dragdrop attribute change.","        if (this.get('dragdrop')) {","            // Setup the initial DD instances when the view is rendered.","            model.on('change', this._destroyDD, this);","            Y.Do.after(this._afterRender, this, 'render', this);","","            this.after('open', function (e) {","                var treeNode = e.node,","                    htmlNode = this.getHTMLNode(treeNode);","","                this._handleBind(htmlNode);","            }, this);","","            this.on('drop:enter', function (e) {","               if (e.drop.get('node').one('.libbit-treeview-icon')) {","                    e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');","                }","            });","            this.on('drop:exit', function (e) {","                // FIXME: Ignore selected nodes","                if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","                    e.drop.get('node').all('.icon-white').removeClass('icon-white');","                }","            });","","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","        }","    },","","    destructor: function () {","        this._destroyDD();","","        this.get('model').detach('change', this._destroyDD());","        this._ddMap = null;","    },","","    // -- Public Methods -------------------------------------------------------","","    addCallback: function(group, callback, context) {","        this._callbacks[group] = {","            callback: callback,","            context: context","        };","    },","","    /**","     * Update all the the DD shims","     * Most likely used in combination with libbit-nodescroll (scrolling event).","     */","    sizeShims: function() {","        for (var i in this._ddMap) {","            if (typeof(this._ddMap[i].sizeShim) === 'function') {","                this._ddMap[i].sizeShim();","            }","        }","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","     * All DD references must be destoyed if the model is reloaded.","     */","    _destroyDD: function() {","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","","        this._ddMap.length = 0;","    },","","    _handleBind: function (parent) {","        var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),","            self  = this;","","        nodes.each(function (node) {","            var model = self.getNodeById(node.getData('node-id')).data;","","            self._createDD(node, model);","","            if (model instanceof Y.TB.Category) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                node.addClass('libbit-dd-drop');","                self._ddMap.push(catDD);","            }","        });","","        if(this.header) {","            this._bindHeader();","        }","    },","","    _bindHeader: function () {","        var container  = this.get('container'),","            headerDrop;","","        headerDrop = new Y.DD.Drop({","            node         : container.one('.nav-header'),","            // Only allow categories to drop here","            groups       : [ Y.stamp(this) ],","            bubbleTargets: this","        });","","        headerDrop.on('drop:enter', function (e) {","            e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');","        });","","        headerDrop.on('drop:exit', function () {","            Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","        });","","        this._ddMap.push(headerDrop);","    },","","    _createDD: function (node, data) {","        var groups = this.get('groups'),","            self   = this,","            dd;","","        if (data instanceof Y.TB.Category) {","            groups = groups.concat([ Y.stamp(this) ]);","        }","","        // Add an extra unique group for the category drags.","        dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        node.addClass('libbit-treeview-drag');","        this._ddMap.push(dd);","","        return dd;","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _afterRender: function () {","        var parent = this.get('container');","","        this._destroyDD();","        this._handleBind(parent);","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').get('outerHTML')","        );","","        drag.get('dragNode').all('.icon-white').removeClass('icon-white');","","        // Recreate the drag instance","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var model    = this.get('model'),","            obj      = e.drag.get('data'),","            dropNode = e.drop.get('node'),","            newCat   = dropNode.hasClass('nav-header') ? null: this.getNodeById(dropNode.getData('node-id')).data;","            callback = false,","            self     = this;","","        Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","","        if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","            e.drop.get('node').all('.icon-white').removeClass('icon-white');","        }","","        // Check for custom override callbacks","        Y.Array.each(e.drag.get('groups'), function (group) {","            if (group in self._callbacks) {","                var config = self._callbacks[group];","","                e.drop.set('data', newCat);","                config.callback.apply(config.context, [e]);","","                callback = true;","            }","        });","","        if (callback) {","            return true;","        }","","        if (obj) {","            var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',","                oldCat        = obj.get(property),","                oldCatModelID = oldCat ? oldCat.id : null,","                newCatModelID = newCat ? newCat.get('id') : null;","","            if (oldCatModelID !== newCatModelID) {","                obj.set(property, newCat);","                obj.save(function () { model.load(); });","            }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-dd\", \"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"22":0,"24":0,"27":0,"29":0,"30":0,"32":0,"33":0,"36":0,"39":0,"40":0,"41":0,"44":0,"46":0,"47":0,"51":0,"52":0,"57":0,"59":0,"60":0,"66":0,"77":0,"78":0,"79":0,"90":0,"91":0,"94":0,"98":0,"101":0,"102":0,"104":0,"106":0,"108":0,"114":0,"115":0,"116":0,"120":0,"121":0,"126":0,"129":0,"136":0,"137":0,"140":0,"141":0,"144":0,"148":0,"152":0,"153":0,"157":0,"167":0,"168":0,"170":0,"176":0,"178":0,"179":0,"183":0,"189":0,"191":0,"195":0,"198":0,"200":0,"202":0,"204":0,"205":0,"207":0,"208":0,"210":0,"214":0,"218":0,"221":0,"223":0,"224":0,"228":0,"229":0,"230":0,"232":0,"233":0,"235":0,"239":0,"240":0,"243":0,"244":0,"249":0,"250":0,"251":0,"268":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"(anonymous 2):32":0,"(anonymous 3):39":0,"(anonymous 4):44":0,"initializer:21":0,"destructor:56":0,"addCallback:65":0,"sizeShims:76":0,"_destroyDD:89":0,"(anonymous 5):101":0,"_handleBind:97":0,"(anonymous 6):136":0,"(anonymous 7):140":0,"_bindHeader:125":0,"_createDD:147":0,"_afterRender:175":0,"_handleStart:182":0,"(anonymous 8):228":0,"(anonymous 9):251":0,"_handleDrop:213":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 88;
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredFunctions = 20;
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
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 24);
this._ddMap = [];

        // TODO: Bind on dragdrop attribute change.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 27);
if (this.get('dragdrop')) {
            // Setup the initial DD instances when the view is rendered.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 29);
model.on('change', this._destroyDD, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 30);
Y.Do.after(this._afterRender, this, 'render', this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 32);
this.after('open', function (e) {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 32);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 33);
var treeNode = e.node,
                    htmlNode = this.getHTMLNode(treeNode);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 36);
this._handleBind(htmlNode);
            }, this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 39);
this.on('drop:enter', function (e) {
               _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 39);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 40);
if (e.drop.get('node').one('.libbit-treeview-icon')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 41);
e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 44);
this.on('drop:exit', function (e) {
                // FIXME: Ignore selected nodes
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 44);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 46);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 47);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
                }
            });

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 51);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 52);
this.on('drop:hit', this._handleDrop, this);
        }
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "destructor", 56);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 57);
this._destroyDD();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 59);
this.get('model').detach('change', this._destroyDD());
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 60);
this._ddMap = null;
    },

    // -- Public Methods -------------------------------------------------------

    addCallback: function(group, callback, context) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "addCallback", 65);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 66);
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
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "sizeShims", 76);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 77);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 78);
if (typeof(this._ddMap[i].sizeShim) === 'function') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 79);
this._ddMap[i].sizeShim();
            }
        }
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDD: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_destroyDD", 89);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 90);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 91);
this._ddMap[i].destroy();
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 94);
this._ddMap.length = 0;
    },

    _handleBind: function (parent) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleBind", 97);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 98);
var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),
            self  = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 101);
nodes.each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 101);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 102);
var model = self.getNodeById(node.getData('node-id')).data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
self._createDD(node, model);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 106);
if (model instanceof Y.TB.Category) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 108);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 114);
node.addClass('libbit-treeview-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 115);
node.addClass('libbit-dd-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 116);
self._ddMap.push(catDD);
            }
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 120);
if(this.header) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 121);
this._bindHeader();
        }
    },

    _bindHeader: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindHeader", 125);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 126);
var container  = this.get('container'),
            headerDrop;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 129);
headerDrop = new Y.DD.Drop({
            node         : container.one('.nav-header'),
            // Only allow categories to drop here
            groups       : [ Y.stamp(this) ],
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 136);
headerDrop.on('drop:enter', function (e) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 6)", 136);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 137);
e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 140);
headerDrop.on('drop:exit', function () {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 7)", 140);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 141);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 144);
this._ddMap.push(headerDrop);
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 147);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 148);
var groups = this.get('groups'),
            self   = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 152);
if (data instanceof Y.TB.Category) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 153);
groups = groups.concat([ Y.stamp(this) ]);
        }

        // Add an extra unique group for the category drags.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 157);
dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 167);
node.addClass('libbit-treeview-drag');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 168);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 170);
return dd;
    },

    // -- Protected Event Handlers ---------------------------------------------

    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_afterRender", 175);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 176);
var parent = this.get('container');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 178);
this._destroyDD();
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 179);
this._handleBind(parent);
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 182);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 183);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 189);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 191);
drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 195);
drag.get('dragNode').all('.icon-white').removeClass('icon-white');

        // Recreate the drag instance
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 198);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 200);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 202);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 204);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 205);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 207);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 208);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 210);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 213);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 214);
var model    = this.get('model'),
            obj      = e.drag.get('data'),
            dropNode = e.drop.get('node'),
            newCat   = dropNode.hasClass('nav-header') ? null: this.getNodeById(dropNode.getData('node-id')).data;
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 218);
callback = false,
            self     = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 221);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 223);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 224);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
        }

        // Check for custom override callbacks
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 228);
Y.Array.each(e.drag.get('groups'), function (group) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 8)", 228);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 229);
if (group in self._callbacks) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 230);
var config = self._callbacks[group];

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 232);
e.drop.set('data', newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 233);
config.callback.apply(config.context, [e]);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 235);
callback = true;
            }
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 239);
if (callback) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 240);
return true;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 243);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 244);
var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',
                oldCat        = obj.get(property),
                oldCatModelID = oldCat ? oldCat.id : null,
                newCatModelID = newCat ? newCat.get('id') : null;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 249);
if (oldCatModelID !== newCatModelID) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 250);
obj.set(property, newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 251);
obj.save(function () { _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 9)", 251);
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 268);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["libbit-dd", "libbit-treeview"]});
