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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    // -- Protected Properties -------------------------------------------------","","    _callbacks: {},","","    /**","     * DD references store","     */","    _ddMap: [],","","    // -- Lifecycle Methods ----------------------------------------------------","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        var model = this.get('model');","","        model.on('change', this._destroyDD, this);","","        // TODO: Bind on dragdrop attribute change.","        if (this.get('dragdrop')) {","            Y.Do.after(this._afterRender, this, 'render', this);","            this.after('open', function (e) {","                var treeNode = e.node,","                    htmlNode = this.getHTMLNode(treeNode);","","                this._handleBind(htmlNode);","            }, this);","","","            this.on('drop:enter', function (e) {","               if (e.drop.get('node').one('.libbit-treeview-icon')) {","                    e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');","                }","            });","            this.on('drop:exit', function (e) {","                // FIXME: Ignore selected nodes","                if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","                    e.drop.get('node').all('.icon-white').removeClass('icon-white');","                }","            });","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","        }","    },","","    destructor: function () {","        this._destroyDD();","    },","","    // -- Public Methods -------------------------------------------------------","","    addCallback: function(group, callback, context) {","        this._callbacks[group] = {","            callback: callback,","            context: context","        };","    },","","    /**","     * Update all the the DD shims","     * Most likely used in combination with libbit-nodescroll (scrolling event).","     */","    sizeShims: function() {","        for (var i in this._ddMap) {","            if (typeof(this._ddMap[i].sizeShim) === 'function') {","                this._ddMap[i].sizeShim();","            }","        }","    },","","    // -- Protected Methods ----------------------------------------------------","","    /**","     * All DD references must be destoyed if the model is reloaded.","     */","    _destroyDD: function() {","        if (!this.rendered) {","            return;","        }","","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","","        this._ddMap = [];","    },","","    _handleBind: function (parent) {","        var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),","            self  = this;","","        nodes.each(function (node) {","            var model = self.getNodeById(node.getData('node-id')).data;","","            self._createDD(node, model);","","            if (model instanceof Y.TB.Category) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                node.addClass('libbit-dd-drop');","                self._ddMap.push(catDD);","            }","        });","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            tree       = this.get('tree'),","            nodes;","","        if (this._treeNodes.length === 0) {","            return;","        } else {","            nodes = this._treeNodes;","        }","","        Y.each(nodes, function (value) {","            var node,","                model;","","            node = tree.getHTMLNode(value).one('div');","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                self._ddMap.push(catDD);","            }","","            self._createDD(node, model);","        });","","        if (this.get('header')) {","            var headerDrop = new Y.DD.Drop({","                node         : this.get('contentBox').one('.nav-header'),","                // Only allow categories to drop here","                groups       : [ Y.stamp(this) ],","                bubbleTargets: self","            });","","            headerDrop.on('drop:enter', function (e) {","                e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');","            });","            headerDrop.on('drop:exit', function () {","                Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","            });","            self._ddMap.push(headerDrop);","        }","    },","","    _createDD: function (node, data) {","        var groups = this.get('groups'),","            self   = this,","            dd;","","        if (data instanceof Y.TB.Category) {","            groups = groups.concat([ Y.stamp(this) ]);","        }","","        // Add an extra unique group for the category drags.","        dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        node.addClass('libbit-treeview-drag');","        this._ddMap.push(dd);","","        return dd;","    },","","    // -- Protected Event Handlers ---------------------------------------------","","    _afterRender: function () {","        var parent = this.get('container');","","        this._handleBind(parent);","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').get('outerHTML')","        );","","        drag.get('dragNode').all('.icon-white').removeClass('icon-white');","","        // Recreate the drag instance","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var model    = this.get('model'),","            obj      = e.drag.get('data');","            newCat   = this.getNodeById(e.drop.get('node').getData('node-id')).data;","            callback = false,","            self     = this;","","        Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","","        if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","            e.drop.get('node').all('.icon-white').removeClass('icon-white');","        }","","        // Check for custom override callbacks","        Y.Array.each(e.drag.get('groups'), function (group) {","            if (group in self._callbacks) {","                var config = self._callbacks[group];","","                e.drop.set('data', newCat);","                config.callback.apply(config.context, [e]);","","                callback = true;","            }","        });","","        if (callback) {","            return true;","        }","","        if (obj) {","            var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',","                oldCat        = obj.get(property),","                oldCatModelID = oldCat ? oldCat.id : null,","                newCatModelID = newCat ? newCat.get('id') : null;","","            if (oldCatModelID !== newCatModelID) {","                obj.set(property, newCat);","                obj.save(function () {","                    model.load(function () {","                        // self.render();","                    });","                });","            }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-dd\", \"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"25":0,"27":0,"30":0,"31":0,"32":0,"33":0,"36":0,"40":0,"41":0,"42":0,"45":0,"47":0,"48":0,"51":0,"52":0,"57":0,"63":0,"74":0,"75":0,"76":0,"87":0,"88":0,"91":0,"92":0,"95":0,"99":0,"102":0,"103":0,"105":0,"107":0,"109":0,"115":0,"116":0,"117":0,"126":0,"130":0,"131":0,"133":0,"136":0,"137":0,"140":0,"141":0,"143":0,"145":0,"151":0,"152":0,"155":0,"158":0,"159":0,"166":0,"167":0,"169":0,"170":0,"172":0,"177":0,"181":0,"182":0,"186":0,"196":0,"197":0,"199":0,"205":0,"207":0,"211":0,"217":0,"219":0,"223":0,"226":0,"228":0,"230":0,"232":0,"233":0,"235":0,"236":0,"238":0,"242":0,"244":0,"245":0,"248":0,"250":0,"251":0,"255":0,"256":0,"257":0,"259":0,"260":0,"262":0,"266":0,"267":0,"270":0,"271":0,"276":0,"277":0,"278":0,"279":0,"299":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"(anonymous 2):32":0,"(anonymous 3):40":0,"(anonymous 4):45":0,"initializer:24":0,"destructor:56":0,"addCallback:62":0,"sizeShims:73":0,"_destroyDD:86":0,"(anonymous 5):102":0,"_handleBind:98":0,"(anonymous 6):136":0,"(anonymous 7):166":0,"(anonymous 8):169":0,"_bindDD:125":0,"_createDD:176":0,"_afterRender:204":0,"_handleStart:210":0,"(anonymous 9):255":0,"(anonymous 10):278":0,"_handleDrop:241":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 99;
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredFunctions = 21;
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

    /**
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "initializer", 24);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 25);
var model = this.get('model');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 27);
model.on('change', this._destroyDD, this);

        // TODO: Bind on dragdrop attribute change.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 30);
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 31);
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


            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 40);
this.on('drop:enter', function (e) {
               _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 40);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 41);
if (e.drop.get('node').one('.libbit-treeview-icon')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 42);
e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 45);
this.on('drop:exit', function (e) {
                // FIXME: Ignore selected nodes
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 45);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 47);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 48);
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
    },

    // -- Public Methods -------------------------------------------------------

    addCallback: function(group, callback, context) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "addCallback", 62);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 63);
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
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "sizeShims", 73);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 74);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 75);
if (typeof(this._ddMap[i].sizeShim) === 'function') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 76);
this._ddMap[i].sizeShim();
            }
        }
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDD: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_destroyDD", 86);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 87);
if (!this.rendered) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 88);
return;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 91);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 92);
this._ddMap[i].destroy();
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 95);
this._ddMap = [];
    },

    _handleBind: function (parent) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleBind", 98);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 99);
var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),
            self  = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 102);
nodes.each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 102);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 103);
var model = self.getNodeById(node.getData('node-id')).data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 105);
self._createDD(node, model);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 107);
if (model instanceof Y.TB.Category) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 109);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 115);
node.addClass('libbit-treeview-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 116);
node.addClass('libbit-dd-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 117);
self._ddMap.push(catDD);
            }
        });
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindDD", 125);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 126);
var self       = this,
            tree       = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 130);
if (this._treeNodes.length === 0) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 131);
return;
        } else {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 133);
nodes = this._treeNodes;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 136);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 6)", 136);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 137);
var node,
                model;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 140);
node = tree.getHTMLNode(value).one('div');
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 141);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 143);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 145);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 151);
node.addClass('libbit-treeview-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 152);
self._ddMap.push(catDD);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 155);
self._createDD(node, model);
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 158);
if (this.get('header')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 159);
var headerDrop = new Y.DD.Drop({
                node         : this.get('contentBox').one('.nav-header'),
                // Only allow categories to drop here
                groups       : [ Y.stamp(this) ],
                bubbleTargets: self
            });

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 166);
headerDrop.on('drop:enter', function (e) {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 7)", 166);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 167);
e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 169);
headerDrop.on('drop:exit', function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 8)", 169);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 170);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 172);
self._ddMap.push(headerDrop);
        }
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 176);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 177);
var groups = this.get('groups'),
            self   = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 181);
if (data instanceof Y.TB.Category) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 182);
groups = groups.concat([ Y.stamp(this) ]);
        }

        // Add an extra unique group for the category drags.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 186);
dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 196);
node.addClass('libbit-treeview-drag');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 197);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 199);
return dd;
    },

    // -- Protected Event Handlers ---------------------------------------------

    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_afterRender", 204);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 205);
var parent = this.get('container');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 207);
this._handleBind(parent);
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 210);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 211);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 217);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 219);
drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 223);
drag.get('dragNode').all('.icon-white').removeClass('icon-white');

        // Recreate the drag instance
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 226);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 228);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 230);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 232);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 233);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 235);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 236);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 238);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 241);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 242);
var model    = this.get('model'),
            obj      = e.drag.get('data');
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 244);
newCat   = this.getNodeById(e.drop.get('node').getData('node-id')).data;
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
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 9)", 255);
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
obj.save(function () {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 10)", 278);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 279);
model.load(function () {
                        // self.render();
                    });
                });
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 299);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["libbit-dd", "libbit-treeview"]});
