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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    _callbacks: {},","","    /**","     * DD references store","     */","    _ddMap: [],","","    /**","     * All DD references must be destoyed if the model is reloaded.","     */","    _destroyDD: function() {","        if (!this.rendered) {","            return;","        }","","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","","        this._ddMap = [];","    },","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        var model = this.get('model');","","        // this.on('mc', this._destroyDD, this);","        // this.on('refresh', this._destroyDD, this);","        model.on('change', this._destroyDD, this);","","        // TODO: Bind on dragdrop attribute change.","        if (this.get('dragdrop')) {","            Y.Do.after(this._afterRender, this, 'render', this);","            this.after('open', function (e) {","                var treeNode = e.node,","                    htmlNode = this.getHTMLNode(treeNode);","","                this._handleBind(htmlNode);","            }, this);","","","            this.on('drop:enter', function (e) {","               if (e.drop.get('node').one('.libbit-treeview-icon')) {","                    e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');","                }","            });","            this.on('drop:exit', function (e) {","                // FIXME: Ignore selected nodes","                if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","                    e.drop.get('node').all('.icon-white').removeClass('icon-white');","                }","            });","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","        }","    },","","    destructor: function () {","        this._destroyDD();","    },","","    _afterRender: function () {","        var parent = this.get('container');","","        this._handleBind(parent);","    },","","    _handleBind: function (parent) {","        var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),","            self  = this;","","        nodes.each(function (node) {","            var model = self.getNodeById(node.getData('node-id')).data;","","            self._createDD(node, model);","","            if (model instanceof Y.TB.Category) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                node.addClass('libbit-dd-drop');","                self._ddMap.push(catDD);","            }","        });","    },","","    addCallback: function(group, callback, context) {","        this._callbacks[group] = {","            callback: callback,","            context: context","        };","    },","","    /**","     * Update all the the DD shims","     * Most likely used in combination with libbit-nodescroll (scrolling event).","     */","    sizeShims: function() {","        for (var i in this._ddMap) {","            if (typeof(this._ddMap[i].sizeShim) === 'function') {","                this._ddMap[i].sizeShim();","            }","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            tree       = this.get('tree'),","            nodes;","","        if (this._treeNodes.length === 0) {","            return;","        } else {","            nodes = this._treeNodes;","        }","","        Y.each(nodes, function (value) {","            var node,","                model;","","            node = tree.getHTMLNode(value).one('div');","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                self._ddMap.push(catDD);","            }","","            self._createDD(node, model);","        });","","        if (this.get('header')) {","            var headerDrop = new Y.DD.Drop({","                node         : this.get('contentBox').one('.nav-header'),","                // Only allow categories to drop here","                groups       : [ Y.stamp(this) ],","                bubbleTargets: self","            });","","            headerDrop.on('drop:enter', function (e) {","                e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');","            });","            headerDrop.on('drop:exit', function () {","                Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","            });","            self._ddMap.push(headerDrop);","        }","    },","","    _createDD: function (node, data) {","        var groups = this.get('groups'),","            self   = this,","            dd;","","        if (data instanceof Y.TB.Category) {","            groups = groups.concat([ Y.stamp(this) ]);","        }","","        // Add an extra unique group for the category drags.","        dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        node.addClass('libbit-treeview-drag');","        this._ddMap.push(dd);","","        return dd;","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').get('outerHTML')","        );","","        drag.get('dragNode').all('.icon-white').removeClass('icon-white');","","        // Recreate the drag instance","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var model    = this.get('model'),","            obj      = e.drag.get('data');","            newCat   = this.getNodeById(e.drop.get('node').getData('node-id')).data;","            callback = false,","            self     = this;","","        Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","","        if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","            e.drop.get('node').all('.icon-white').removeClass('icon-white');","        }","","        // Check for custom override callbacks","        Y.Array.each(e.drag.get('groups'), function (group) {","            if (group in self._callbacks) {","                var config = self._callbacks[group];","","                e.drop.set('data', newCat);","                config.callback.apply(config.context, [e]);","","                callback = true;","            }","        });","","        if (callback) {","            return true;","        }","","        if (obj) {","            var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',","                oldCat        = obj.get(property),","                oldCatModelID = oldCat ? oldCat.id : null,","                newCatModelID = newCat ? newCat.get('id') : null;","","            if (oldCatModelID !== newCatModelID) {","                obj.set(property, newCat);","                obj.save(function () {","                    model.load(function () {","                        // self.render();","                    });","                });","            }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-dd\", \"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"21":0,"22":0,"25":0,"26":0,"29":0,"36":0,"40":0,"43":0,"44":0,"45":0,"46":0,"49":0,"53":0,"54":0,"55":0,"58":0,"60":0,"61":0,"64":0,"65":0,"70":0,"74":0,"76":0,"80":0,"83":0,"84":0,"86":0,"88":0,"90":0,"96":0,"97":0,"98":0,"104":0,"115":0,"116":0,"117":0,"126":0,"130":0,"131":0,"133":0,"136":0,"137":0,"140":0,"141":0,"143":0,"145":0,"151":0,"152":0,"155":0,"158":0,"159":0,"166":0,"167":0,"169":0,"170":0,"172":0,"177":0,"181":0,"182":0,"186":0,"196":0,"197":0,"199":0,"203":0,"209":0,"211":0,"215":0,"218":0,"220":0,"222":0,"224":0,"225":0,"227":0,"228":0,"230":0,"234":0,"236":0,"237":0,"240":0,"242":0,"243":0,"247":0,"248":0,"249":0,"251":0,"252":0,"254":0,"258":0,"259":0,"262":0,"263":0,"268":0,"269":0,"270":0,"271":0,"291":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"_destroyDD:20":0,"(anonymous 2):45":0,"(anonymous 3):53":0,"(anonymous 4):58":0,"initializer:35":0,"destructor:69":0,"_afterRender:73":0,"(anonymous 5):83":0,"_handleBind:79":0,"addCallback:103":0,"sizeShims:114":0,"(anonymous 6):136":0,"(anonymous 7):166":0,"(anonymous 8):169":0,"_bindDD:125":0,"_createDD:176":0,"_handleStart:202":0,"(anonymous 9):247":0,"(anonymous 10):270":0,"_handleDrop:233":0,"(anonymous 1):1":0};
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

    _callbacks: {},

    /**
     * DD references store
     */
    _ddMap: [],

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDD: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_destroyDD", 20);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 21);
if (!this.rendered) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 22);
return;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 25);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 26);
this._ddMap[i].destroy();
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 29);
this._ddMap = [];
    },

    /**
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "initializer", 35);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 36);
var model = this.get('model');

        // this.on('mc', this._destroyDD, this);
        // this.on('refresh', this._destroyDD, this);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 40);
model.on('change', this._destroyDD, this);

        // TODO: Bind on dragdrop attribute change.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 43);
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 44);
Y.Do.after(this._afterRender, this, 'render', this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 45);
this.after('open', function (e) {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 45);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 46);
var treeNode = e.node,
                    htmlNode = this.getHTMLNode(treeNode);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 49);
this._handleBind(htmlNode);
            }, this);


            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 53);
this.on('drop:enter', function (e) {
               _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 53);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 54);
if (e.drop.get('node').one('.libbit-treeview-icon')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 55);
e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 58);
this.on('drop:exit', function (e) {
                // FIXME: Ignore selected nodes
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 58);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 60);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 61);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 64);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 65);
this.on('drop:hit', this._handleDrop, this);
        }
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "destructor", 69);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 70);
this._destroyDD();
    },

    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_afterRender", 73);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 74);
var parent = this.get('container');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 76);
this._handleBind(parent);
    },

    _handleBind: function (parent) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleBind", 79);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 80);
var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),
            self  = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 83);
nodes.each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 83);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 84);
var model = self.getNodeById(node.getData('node-id')).data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 86);
self._createDD(node, model);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 88);
if (model instanceof Y.TB.Category) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 90);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 96);
node.addClass('libbit-treeview-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 97);
node.addClass('libbit-dd-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 98);
self._ddMap.push(catDD);
            }
        });
    },

    addCallback: function(group, callback, context) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "addCallback", 103);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
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
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "sizeShims", 114);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 115);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 116);
if (typeof(this._ddMap[i].sizeShim) === 'function') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 117);
this._ddMap[i].sizeShim();
            }
        }
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

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 202);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 203);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 209);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 211);
drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 215);
drag.get('dragNode').all('.icon-white').removeClass('icon-white');

        // Recreate the drag instance
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 218);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 220);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 222);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 224);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 225);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 227);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 228);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 230);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 233);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 234);
var model    = this.get('model'),
            obj      = e.drag.get('data');
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 236);
newCat   = this.getNodeById(e.drop.get('node').getData('node-id')).data;
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 237);
callback = false,
            self     = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 240);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 242);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 243);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
        }

        // Check for custom override callbacks
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 247);
Y.Array.each(e.drag.get('groups'), function (group) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 9)", 247);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 248);
if (group in self._callbacks) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 249);
var config = self._callbacks[group];

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 251);
e.drop.set('data', newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 252);
config.callback.apply(config.context, [e]);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 254);
callback = true;
            }
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 258);
if (callback) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 259);
return true;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 262);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 263);
var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',
                oldCat        = obj.get(property),
                oldCatModelID = oldCat ? oldCat.id : null,
                newCatModelID = newCat ? newCat.get('id') : null;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 268);
if (oldCatModelID !== newCatModelID) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 269);
obj.set(property, newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 270);
obj.save(function () {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 10)", 270);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 271);
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 291);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["libbit-dd", "libbit-treeview"]});
