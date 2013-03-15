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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    _callbacks: {},","","    /**","     * DD references store","     */","    _ddMap: [],","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        if (this.get('dragdrop')) {","            Y.Do.after(this._bindDD, this, '_bindEvents', this);","","            this.on('drop:enter', function (e) {","               if (e.drop.get('node').one('.libbit-treeview-icon')) {","                    e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');","                }","            });","            this.on('drop:exit', function (e) {","                // FIXME: Ignore selected nodes","                if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","                    e.drop.get('node').all('.icon-white').removeClass('icon-white');","                }","            });","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","        }","    },","","    addCallback: function(group, callback, context) {","        this._callbacks[group] = {","            callback: callback,","            context: context","        };","    },","","    /**","     * Update all the the DD shims","     * Most likely used in combination with libbit-nodescroll (scrolling event).","     */","    sizeShims: function() {","        for (var i in this._ddMap) {","            if (typeof(this._ddMap[i].sizeShim) === 'function') {","                this._ddMap[i].sizeShim();","            }","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            tree       = this.get('tree'),","            nodes;","","        if (this._treeNodes.length === 0) {","            return;","        } else {","            nodes = this._treeNodes;","        }","","        Y.each(nodes, function (value) {","            var node,","                model;","","            node = tree.getHTMLNode(value).one('div');","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                node.addClass('libbit-treeview-drop');","                self._ddMap.push(catDD);","            }","","            self._createDD(node, model);","        });","","        if (this.get('header')) {","            var headerDrop = new Y.DD.Drop({","                node         : this.get('contentBox').one('.nav-header'),","                // Only allow categories to drop here","                groups       : [ Y.stamp(this) ],","                bubbleTargets: self","            });","","            headerDrop.on('drop:enter', function (e) {","                e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');","            });","            headerDrop.on('drop:exit', function () {","                Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","            });","        }","    },","","    _createDD: function (node, data) {","        var groups = this.get('groups'),","            self   = this,","            dd;","","        if (data instanceof Y.TB.Category) {","            groups = groups.concat([ Y.stamp(this) ]);","        }","","        // Add an extra unique group for the category drags.","        dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        this._ddMap.push(dd);","","        return dd;","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').get('outerHTML')","        );","","        drag.get('dragNode').all('.icon-white').removeClass('icon-white');","","        // Recreate the drag instance","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var treeModel = this.get('data'),","            objID     = e.drag.get('data').get('clientId'),","            newCatID  = e.drop.get('node').get('parentNode').getAttribute('data-yui3-record'),","            // The model that was moved.","            obj       = treeModel.getByClientId(objID);","            // The category model it was dropped on, or null if it was dropped onto the header.","            newCat    = treeModel.getByClientId(newCatID),","            callback  = false,","            self      = this;","","        Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');","","        if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {","            e.drop.get('node').all('.icon-white').removeClass('icon-white');","        }","","        // Check for custom override callbacks","        Y.Array.each(e.drag.get('groups'), function (group) {","            if (group in self._callbacks) {","                var config = self._callbacks[group];","","                e.drop.set('data', newCat);","                config.callback.apply(config.context, [e]);","","                callback = true;","            }","        });","","        if (callback) {","            return true;","        }","","        if (obj) {","            var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',","                oldCat        = obj.get(property),","                oldCatModelID = oldCat ? oldCat.id : null,","                newCatModelID = newCat ? newCat.get('id') : null;","","            if (oldCatModelID !== newCatModelID) {","                obj.set(property, newCat);","                obj.save(function () {","                    treeModel.load(function () {","                        self.refresh();","                    });","                });","            }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-dd\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"21":0,"22":0,"24":0,"25":0,"26":0,"29":0,"31":0,"32":0,"35":0,"36":0,"41":0,"52":0,"53":0,"54":0,"63":0,"67":0,"68":0,"70":0,"73":0,"74":0,"77":0,"78":0,"80":0,"82":0,"88":0,"89":0,"92":0,"95":0,"96":0,"103":0,"104":0,"106":0,"107":0,"113":0,"117":0,"118":0,"122":0,"132":0,"134":0,"138":0,"144":0,"146":0,"150":0,"153":0,"155":0,"157":0,"159":0,"160":0,"162":0,"163":0,"165":0,"169":0,"175":0,"179":0,"181":0,"182":0,"186":0,"187":0,"188":0,"190":0,"191":0,"193":0,"197":0,"198":0,"201":0,"202":0,"207":0,"208":0,"209":0,"210":0,"211":0,"230":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"(anonymous 2):24":0,"(anonymous 3):29":0,"initializer:20":0,"addCallback:40":0,"sizeShims:51":0,"(anonymous 4):73":0,"(anonymous 5):103":0,"(anonymous 6):106":0,"_bindDD:62":0,"_createDD:112":0,"_handleStart:137":0,"(anonymous 7):186":0,"(anonymous 9):210":0,"(anonymous 8):209":0,"_handleDrop:168":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 75;
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredFunctions = 16;
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
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "initializer", 20);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 21);
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 22);
Y.Do.after(this._bindDD, this, '_bindEvents', this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 24);
this.on('drop:enter', function (e) {
               _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 24);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 25);
if (e.drop.get('node').one('.libbit-treeview-icon')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 26);
e.drop.get('node').one('.libbit-treeview-icon').addClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 29);
this.on('drop:exit', function (e) {
                // FIXME: Ignore selected nodes
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 29);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 31);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 32);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
                }
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 35);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 36);
this.on('drop:hit', this._handleDrop, this);
        }
    },

    addCallback: function(group, callback, context) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "addCallback", 40);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 41);
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
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "sizeShims", 51);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 52);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 53);
if (typeof(this._ddMap[i].sizeShim) === 'function') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 54);
this._ddMap[i].sizeShim();
            }
        }
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindDD", 62);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 63);
var self       = this,
            tree       = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 67);
if (this._treeNodes.length === 0) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 68);
return;
        } else {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 70);
nodes = this._treeNodes;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 73);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 73);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 74);
var node,
                model;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 77);
node = tree.getHTMLNode(value).one('div');
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 78);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 80);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 82);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 88);
node.addClass('libbit-treeview-drop');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 89);
self._ddMap.push(catDD);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 92);
self._createDD(node, model);
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 95);
if (this.get('header')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 96);
var headerDrop = new Y.DD.Drop({
                node         : this.get('contentBox').one('.nav-header'),
                // Only allow categories to drop here
                groups       : [ Y.stamp(this) ],
                bubbleTargets: self
            });

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 103);
headerDrop.on('drop:enter', function (e) {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 103);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');
            });
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 106);
headerDrop.on('drop:exit', function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 6)", 106);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 107);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');
            });
        }
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 112);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 113);
var groups = this.get('groups'),
            self   = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 117);
if (data instanceof Y.TB.Category) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 118);
groups = groups.concat([ Y.stamp(this) ]);
        }

        // Add an extra unique group for the category drags.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 122);
dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 132);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 134);
return dd;
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 137);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 138);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 144);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 146);
drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 150);
drag.get('dragNode').all('.icon-white').removeClass('icon-white');

        // Recreate the drag instance
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 153);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 155);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 157);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 159);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 160);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 162);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 163);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 165);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 168);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 169);
var treeModel = this.get('data'),
            objID     = e.drag.get('data').get('clientId'),
            newCatID  = e.drop.get('node').get('parentNode').getAttribute('data-yui3-record'),
            // The model that was moved.
            obj       = treeModel.getByClientId(objID);
            // The category model it was dropped on, or null if it was dropped onto the header.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 175);
newCat    = treeModel.getByClientId(newCatID),
            callback  = false,
            self      = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 179);
Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 181);
if (!e.drop.get('node').get('parentNode').hasClass('yui3-treeview-selected')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 182);
e.drop.get('node').all('.icon-white').removeClass('icon-white');
        }

        // Check for custom override callbacks
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 186);
Y.Array.each(e.drag.get('groups'), function (group) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 7)", 186);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 187);
if (group in self._callbacks) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 188);
var config = self._callbacks[group];

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 190);
e.drop.set('data', newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 191);
config.callback.apply(config.context, [e]);

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 193);
callback = true;
            }
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 197);
if (callback) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 198);
return true;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 201);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 202);
var property      = obj instanceof Y.TB.Category ? 'parent' : 'category',
                oldCat        = obj.get(property),
                oldCatModelID = oldCat ? oldCat.id : null,
                newCatModelID = newCat ? newCat.get('id') : null;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 207);
if (oldCatModelID !== newCatModelID) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 208);
obj.set(property, newCat);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 209);
obj.save(function () {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 8)", 209);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 210);
treeModel.load(function () {
                        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 9)", 210);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 211);
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 230);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["libbit-dd"]});
