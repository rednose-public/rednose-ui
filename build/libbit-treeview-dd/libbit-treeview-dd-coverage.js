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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    _callbacks: {},","","    /**","     * DD references store","     */","    _ddMap: [],","","    /**","     * All DD references must be destoyed if the model is reloaded.","     */","    _destroyDD: function() {","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","        this._ddMap = [];","    },","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        Y.Do.before(this._destroyDD, this, 'refresh', this);","","        // TODO: Bind on dragdrop attribute change.","        if (this.get('dragdrop')) {","            Y.Do.after(this._afterRender, this, 'render', this);","            this.after('open', function (e) {","                var treeNode = e.node,","                    htmlNode = this.getHTMLNode(treeNode);","","                this._handleBind(htmlNode);","            }, this);","","","            this.on('drop:enter', function (e) {","               if (e.drop.get('node').one('.libbit-treeview-icon')) {","                    e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');","                }","            });","            this.on('drop:exit', function (e) {","                // FIXME: Ignore selected nodes","                if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","                    e.drop.get('node').all('.icon-white').removeClass('icon-white');","                }","            });","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","        }","    },","","    _afterRender: function () {","        var parent = this.get('container');","","        this._handleBind(parent);","    },","","    _handleBind: function (parent) {","        var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),","            self  = this;","","        nodes.each(function (node) {","            var model = self.getNodeById(node.getData('node-id')).data;","","            self._createDD(node, model);","","            if (model instanceof Y.TB.Category) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                node.addClass('libbit-dd-drop');","                self._ddMap.push(catDD);","            }","        });","    },","","    addCallback: function(group, callback, context) {","        this._callbacks[group] = {","            callback: callback,","            context: context","        };","    },","","    /**","     * Update all the the DD shims","     * Most likely used in combination with libbit-nodescroll (scrolling event).","     */","    sizeShims: function() {","        for (var i in this._ddMap) {","            if (typeof(this._ddMap[i].sizeShim) === 'function') {","                this._ddMap[i].sizeShim();","            }","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            tree       = this.get('tree'),","            nodes;","","        if (this._treeNodes.length === 0) {","            return;","        } else {","            nodes = this._treeNodes;","        }","","        Y.each(nodes, function (value) {","            var node,","                model;","","            node = tree.getHTMLNode(value).one('div');","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                self._ddMap.push(catDD);","            }","","            self._createDD(node, model);","        });","","        if (this.get('header')) {","            var headerDrop = new Y.DD.Drop({","                node         : this.get('contentBox').one('.nav-header'),","                // Only allow categories to drop here","                groups       : [ Y.stamp(this) ],","                bubbleTargets: self","            });","","            headerDrop.on('drop:enter', function (e) {","                e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');","            });","            headerDrop.on('drop:exit', function () {","                Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","            });","            self._ddMap.push(headerDrop);","        }","    },","","    _createDD: function (node, data) {","        var groups = this.get('groups'),","            self   = this,","            dd;","","        if (data instanceof Y.TB.Category) {","            groups = groups.concat([ Y.stamp(this) ]);","        }","","        // Add an extra unique group for the category drags.","        dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        node.addClass('libbit-treeview-drag');","        this._ddMap.push(dd);","","        return dd;","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').get('outerHTML')","        );","","        drag.get('dragNode').all('.icon-white').removeClass('icon-white');","","        // Recreate the drag instance","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var treeModel = this.get('data'),","            obj       = e.drag.get('data');","            newCat    = this.getNodeById(e.drop.get('node').getData('node-id')).data;","            callback  = false,","            self      = this;","","        Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","","        if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","            e.drop.get('node').all('.icon-white').removeClass('icon-white');","        }","","        // Check for custom override callbacks","        Y.Array.each(e.drag.get('groups'), function (group) {","            if (group in self._callbacks) {","                var config = self._callbacks[group];","","                e.drop.set('data', newCat);","                config.callback.apply(config.context, [e]);","","                callback = true;","            }","        });","","        if (callback) {","            return true;","        }","","        if (obj) {","            var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',","                oldCat        = obj.get(property),","                oldCatModelID = oldCat ? oldCat.id : null,","                newCatModelID = newCat ? newCat.get('id') : null;","","            if (oldCatModelID !== newCatModelID) {","                obj.set(property, newCat);","                obj.save(function () {","                    treeModel.load(function () {","                        self.refresh();","                    });","                });","            }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-dd\", \"libbit-treeview\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"21":0,"22":0,"24":0,"31":0,"34":0,"35":0,"36":0,"37":0,"40":0,"44":0,"45":0,"46":0,"49":0,"51":0,"52":0,"55":0,"56":0,"61":0,"63":0,"67":0,"70":0,"71":0,"73":0,"75":0,"77":0,"83":0,"84":0,"85":0,"91":0,"102":0,"103":0,"104":0,"113":0,"117":0,"118":0,"120":0,"123":0,"124":0,"127":0,"128":0,"130":0,"132":0,"138":0,"139":0,"142":0,"145":0,"146":0,"153":0,"154":0,"156":0,"157":0,"159":0,"164":0,"168":0,"169":0,"173":0,"183":0,"184":0,"186":0,"190":0,"196":0,"198":0,"202":0,"205":0,"207":0,"209":0,"211":0,"212":0,"214":0,"215":0,"217":0,"221":0,"223":0,"224":0,"227":0,"229":0,"230":0,"234":0,"235":0,"236":0,"238":0,"239":0,"241":0,"245":0,"246":0,"249":0,"250":0,"255":0,"256":0,"257":0,"258":0,"259":0,"278":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"_destroyDD:20":0,"(anonymous 2):36":0,"(anonymous 3):44":0,"(anonymous 4):49":0,"initializer:30":0,"_afterRender:60":0,"(anonymous 5):70":0,"_handleBind:66":0,"addCallback:90":0,"sizeShims:101":0,"(anonymous 6):123":0,"(anonymous 7):153":0,"(anonymous 8):156":0,"_bindDD:112":0,"_createDD:163":0,"_handleStart:189":0,"(anonymous 9):234":0,"(anonymous 11):258":0,"(anonymous 10):257":0,"_handleDrop:220":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 96;
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
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 22);
this._ddMap[i].destroy();
        }
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 24);
this._ddMap = [];
    },

    /**
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "initializer", 30);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 31);
Y.Do.before(this._destroyDD, this, 'refresh', this);

        // TODO: Bind on dragdrop attribute change.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 34);
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 35);
Y.Do.after(this._afterRender, this, 'render', this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 36);
this.after('open', function (e) {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 36);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 37);
var treeNode = e.node,
                    htmlNode = this.getHTMLNode(treeNode);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 40);
this._handleBind(htmlNode);
            }, this);


            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 44);
this.on('drop:enter', function (e) {
               _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 44);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 45);
if (e.drop.get('node').one('.libbit-treeview-icon')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 46);
e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 49);
this.on('drop:exit', function (e) {
                // FIXME: Ignore selected nodes
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 49);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 51);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 52);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 55);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 56);
this.on('drop:hit', this._handleDrop, this);
        }
    },

    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_afterRender", 60);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 61);
var parent = this.get('container');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 63);
this._handleBind(parent);
    },

    _handleBind: function (parent) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleBind", 66);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 67);
var nodes = parent.one('.' + this.classNames.children).all('[data-libbit-type]:not(.libbit-treeview-drag)'),
            self  = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 70);
nodes.each(function (node) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 70);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 71);
var model = self.getNodeById(node.getData('node-id')).data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 73);
self._createDD(node, model);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 75);
if (model instanceof Y.TB.Category) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 77);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 83);
node.addClass('libbit-treeview-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 84);
node.addClass('libbit-dd-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 85);
self._ddMap.push(catDD);
            }
        });
    },

    addCallback: function(group, callback, context) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "addCallback", 90);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 91);
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
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "sizeShims", 101);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 102);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 103);
if (typeof(this._ddMap[i].sizeShim) === 'function') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
this._ddMap[i].sizeShim();
            }
        }
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindDD", 112);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 113);
var self       = this,
            tree       = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 117);
if (this._treeNodes.length === 0) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 118);
return;
        } else {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 120);
nodes = this._treeNodes;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 123);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 6)", 123);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 124);
var node,
                model;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 127);
node = tree.getHTMLNode(value).one('div');
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 128);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 130);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 132);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 138);
node.addClass('libbit-treeview-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 139);
self._ddMap.push(catDD);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 142);
self._createDD(node, model);
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 145);
if (this.get('header')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 146);
var headerDrop = new Y.DD.Drop({
                node         : this.get('contentBox').one('.nav-header'),
                // Only allow categories to drop here
                groups       : [ Y.stamp(this) ],
                bubbleTargets: self
            });

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 153);
headerDrop.on('drop:enter', function (e) {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 7)", 153);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 154);
e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 156);
headerDrop.on('drop:exit', function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 8)", 156);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 157);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 159);
self._ddMap.push(headerDrop);
        }
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 163);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 164);
var groups = this.get('groups'),
            self   = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 168);
if (data instanceof Y.TB.Category) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 169);
groups = groups.concat([ Y.stamp(this) ]);
        }

        // Add an extra unique group for the category drags.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 173);
dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 183);
node.addClass('libbit-treeview-drag');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 184);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 186);
return dd;
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 189);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 190);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 196);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 198);
drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 202);
drag.get('dragNode').all('.icon-white').removeClass('icon-white');

        // Recreate the drag instance
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 205);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 207);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 209);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 211);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 212);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 214);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 215);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 217);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 220);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 221);
var treeModel = this.get('data'),
            obj       = e.drag.get('data');
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 223);
newCat    = this.getNodeById(e.drop.get('node').getData('node-id')).data;
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 224);
callback  = false,
            self      = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 227);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 229);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 230);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
        }

        // Check for custom override callbacks
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 234);
Y.Array.each(e.drag.get('groups'), function (group) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 9)", 234);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 235);
if (group in self._callbacks) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 236);
var config = self._callbacks[group];

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 238);
e.drop.set('data', newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 239);
config.callback.apply(config.context, [e]);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 241);
callback = true;
            }
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 245);
if (callback) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 246);
return true;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 249);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 250);
var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',
                oldCat        = obj.get(property),
                oldCatModelID = oldCat ? oldCat.id : null,
                newCatModelID = newCat ? newCat.get('id') : null;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 255);
if (oldCatModelID !== newCatModelID) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 256);
obj.set(property, newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 257);
obj.save(function () {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 10)", 257);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 258);
treeModel.load(function () {
                        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 11)", 258);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 259);
self.refresh();
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 278);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["libbit-dd", "libbit-treeview"]});
