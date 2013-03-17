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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    // -- Protected Properties -------------------------------------------------","","    _callbacks: {},","","    /**","     * DD references store","     */","    _ddMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    initializer: function () {","        var model = this.get('model');","","        model.on('change', this._destroyDD, this);","","        // TODO: Bind on dragdrop attribute change.","        if (this.get('dragdrop')) {","            Y.Do.after(this._afterRender, this, 'render', this);","            this.after('open', function (e) {","                var treeNode = e.node,","                    htmlNode = this.getHTMLNode(treeNode);","","                this._handleBind(htmlNode);","            }, this);","","","            this.on('drop:enter', function (e) {","               if (e.drop.get('node').one('.libbit-treeview-icon')) {","                    e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');","                }","            });","            this.on('drop:exit', function (e) {","                // FIXME: Ignore selected nodes","                if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","                    e.drop.get('node').all('.icon-white').removeClass('icon-white');","                }","            });","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","        }","    },","","    destructor: function () {","        this._destroyDD();","    },","","    // -- Public Methods -------------------------------------------------------","","    addCallback: function(group, callback, context) {","        this._callbacks[group] = {","            callback: callback,","            context: context","        };","    },","","    /**","     * Update all the the DD shims","     * Most likely used in combination with libbit-nodescroll (scrolling event).","     */","    sizeShims: function() {","        for (var i in this._ddMap) {","            if (typeof(this._ddMap[i].sizeShim) === 'function') {","                this._ddMap[i].sizeShim();","            }","        }","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","     * All DD references must be destoyed if the model is reloaded.","     */","    _destroyDD: function() {","        if (!this.rendered) {","            return;","        }","","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","","        this._ddMap = [];","    },","","    _handleBind: function (parent) {","        var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),","            self  = this;","","        nodes.each(function (node) {","            var model = self.getNodeById(node.getData('node-id')).data;","","            self._createDD(node, model);","","            if (model instanceof Y.TB.Category) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                node.addClass('libbit-dd-drop');","                self._ddMap.push(catDD);","            }","        });","","        if(this.header) {","            this._bindHeader();","        }","    },","","    _bindHeader: function () {","        var container  = this.get('container'),","            headerDrop;","","        headerDrop = new Y.DD.Drop({","            node         : container.one('.nav-header'),","            // Only allow categories to drop here","            groups       : [ Y.stamp(this) ],","            bubbleTargets: this","        });","","        headerDrop.on('drop:enter', function (e) {","            e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');","        });","","        headerDrop.on('drop:exit', function () {","            Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","        });","","        this._ddMap.push(headerDrop);","    },","","    _createDD: function (node, data) {","        var groups = this.get('groups'),","            self   = this,","            dd;","","        if (data instanceof Y.TB.Category) {","            groups = groups.concat([ Y.stamp(this) ]);","        }","","        // Add an extra unique group for the category drags.","        dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        node.addClass('libbit-treeview-drag');","        this._ddMap.push(dd);","","        return dd;","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _afterRender: function () {","        var parent = this.get('container');","","        this._handleBind(parent);","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').get('outerHTML')","        );","","        drag.get('dragNode').all('.icon-white').removeClass('icon-white');","","        // Recreate the drag instance","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var model    = this.get('model'),","            obj      = e.drag.get('data'),","            dropNode = e.drop.get('node'),","            newCat   = dropNode.hasClass('nav-header') ? null: this.getNodeById(dropNode.getData('node-id')).data;","            callback = false,","            self     = this;","","        Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","","        if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","            e.drop.get('node').all('.icon-white').removeClass('icon-white');","        }","","        // Check for custom override callbacks","        Y.Array.each(e.drag.get('groups'), function (group) {","            if (group in self._callbacks) {","                var config = self._callbacks[group];","","                e.drop.set('data', newCat);","                config.callback.apply(config.context, [e]);","","                callback = true;","            }","        });","","        if (callback) {","            return true;","        }","","        if (obj) {","            var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',","                oldCat        = obj.get(property),","                oldCatModelID = oldCat ? oldCat.id : null,","                newCatModelID = newCat ? newCat.get('id') : null;","","            if (oldCatModelID !== newCatModelID) {","                obj.set(property, newCat);","                obj.save(function () { model.load(); });","            }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-dd\", \"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"22":0,"24":0,"27":0,"28":0,"29":0,"30":0,"33":0,"37":0,"38":0,"39":0,"42":0,"44":0,"45":0,"48":0,"49":0,"54":0,"60":0,"71":0,"72":0,"73":0,"84":0,"85":0,"88":0,"89":0,"92":0,"96":0,"99":0,"100":0,"102":0,"104":0,"106":0,"112":0,"113":0,"114":0,"118":0,"119":0,"124":0,"127":0,"134":0,"135":0,"138":0,"139":0,"142":0,"146":0,"150":0,"151":0,"155":0,"165":0,"166":0,"168":0,"174":0,"176":0,"180":0,"186":0,"188":0,"192":0,"195":0,"197":0,"199":0,"201":0,"202":0,"204":0,"205":0,"207":0,"211":0,"215":0,"218":0,"220":0,"221":0,"225":0,"226":0,"227":0,"229":0,"230":0,"232":0,"236":0,"237":0,"240":0,"241":0,"246":0,"247":0,"248":0,"265":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"(anonymous 2):29":0,"(anonymous 3):37":0,"(anonymous 4):42":0,"initializer:21":0,"destructor:53":0,"addCallback:59":0,"sizeShims:70":0,"_destroyDD:83":0,"(anonymous 5):99":0,"_handleBind:95":0,"(anonymous 6):134":0,"(anonymous 7):138":0,"_bindHeader:123":0,"_createDD:145":0,"_afterRender:173":0,"_handleStart:179":0,"(anonymous 8):225":0,"(anonymous 9):248":0,"_handleDrop:210":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 86;
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
model.on('change', this._destroyDD, this);

        // TODO: Bind on dragdrop attribute change.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 27);
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 28);
Y.Do.after(this._afterRender, this, 'render', this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 29);
this.after('open', function (e) {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 29);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 30);
var treeNode = e.node,
                    htmlNode = this.getHTMLNode(treeNode);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 33);
this._handleBind(htmlNode);
            }, this);


            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 37);
this.on('drop:enter', function (e) {
               _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 37);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 38);
if (e.drop.get('node').one('.libbit-treeview-icon')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 39);
e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 42);
this.on('drop:exit', function (e) {
                // FIXME: Ignore selected nodes
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 42);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 44);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 45);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 48);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 49);
this.on('drop:hit', this._handleDrop, this);
        }
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "destructor", 53);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 54);
this._destroyDD();
    },

    // -- Public Methods -------------------------------------------------------

    addCallback: function(group, callback, context) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "addCallback", 59);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 60);
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
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "sizeShims", 70);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 71);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 72);
if (typeof(this._ddMap[i].sizeShim) === 'function') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 73);
this._ddMap[i].sizeShim();
            }
        }
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDD: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_destroyDD", 83);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 84);
if (!this.rendered) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 85);
return;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 88);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 89);
this._ddMap[i].destroy();
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 92);
this._ddMap = [];
    },

    _handleBind: function (parent) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleBind", 95);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 96);
var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),
            self  = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 99);
nodes.each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 99);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 100);
var model = self.getNodeById(node.getData('node-id')).data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 102);
self._createDD(node, model);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
if (model instanceof Y.TB.Category) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 106);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 112);
node.addClass('libbit-treeview-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 113);
node.addClass('libbit-dd-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 114);
self._ddMap.push(catDD);
            }
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 118);
if(this.header) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 119);
this._bindHeader();
        }
    },

    _bindHeader: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindHeader", 123);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 124);
var container  = this.get('container'),
            headerDrop;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 127);
headerDrop = new Y.DD.Drop({
            node         : container.one('.nav-header'),
            // Only allow categories to drop here
            groups       : [ Y.stamp(this) ],
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 134);
headerDrop.on('drop:enter', function (e) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 6)", 134);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 135);
e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 138);
headerDrop.on('drop:exit', function () {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 7)", 138);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 139);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 142);
this._ddMap.push(headerDrop);
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 145);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 146);
var groups = this.get('groups'),
            self   = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 150);
if (data instanceof Y.TB.Category) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 151);
groups = groups.concat([ Y.stamp(this) ]);
        }

        // Add an extra unique group for the category drags.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 155);
dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 165);
node.addClass('libbit-treeview-drag');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 166);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 168);
return dd;
    },

    // -- Protected Event Handlers ---------------------------------------------

    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_afterRender", 173);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 174);
var parent = this.get('container');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 176);
this._handleBind(parent);
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 179);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 180);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 186);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 188);
drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 192);
drag.get('dragNode').all('.icon-white').removeClass('icon-white');

        // Recreate the drag instance
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 195);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 197);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 199);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 201);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 202);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 204);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 205);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 207);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 210);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 211);
var model    = this.get('model'),
            obj      = e.drag.get('data'),
            dropNode = e.drop.get('node'),
            newCat   = dropNode.hasClass('nav-header') ? null: this.getNodeById(dropNode.getData('node-id')).data;
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 215);
callback = false,
            self     = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 218);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 220);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 221);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
        }

        // Check for custom override callbacks
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 225);
Y.Array.each(e.drag.get('groups'), function (group) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 8)", 225);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 226);
if (group in self._callbacks) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 227);
var config = self._callbacks[group];

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 229);
e.drop.set('data', newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 230);
config.callback.apply(config.context, [e]);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 232);
callback = true;
            }
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 236);
if (callback) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 237);
return true;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 240);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 241);
var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',
                oldCat        = obj.get(property),
                oldCatModelID = oldCat ? oldCat.id : null,
                newCatModelID = newCat ? newCat.get('id') : null;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 246);
if (oldCatModelID !== newCatModelID) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 247);
obj.set(property, newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 248);
obj.save(function () { _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 9)", 248);
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 265);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["libbit-dd", "libbit-treeview"]});
