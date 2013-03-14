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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    /**","     * DD references store","     */","    _ddMap: [],","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        if (this.get('dragdrop')) {","            Y.Do.after(this._bindDD, this, '_bindEvents', this);","","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","        }","    },","","    /**","     * Update all the the DD shims","     * Most likely used in combination with libbit-nodescroll (scrolling event).","     */","    sizeShims: function() {","        for (var i in this._ddMap) {","            if (typeof(this._ddMap[i].sizeShim) === 'function') {","                this._ddMap[i].sizeShim();","            }","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            tree       = this.get('tree'),","            nodes;","","        if (this._treeNodes.length === 0) {","            return;","        } else {","            nodes = this._treeNodes;","        }","","        Y.each(nodes, function (value) {","            var node,","                model;","","            node = tree.getHTMLNode(value).one('div');","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model. Categories allow dropping.","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                self._ddMap.push(catDD);","            }","","            self._createDD(node, model);","        });","","        if (this.get('header')) {","            new Y.DD.Drop({","                node         : this.get('contentBox').one('.nav-header'),","                // Only allow categories to drop here","                groups       : [ Y.stamp(this) ],","                bubbleTargets: self","            });","        }","    },","","    _createDD: function (node, data) {","        var groups = this.get('groups'),","            self = this,","            dd;","","        if (data instanceof Y.TB.Category) {","            groups = groups.concat([ Y.stamp(this) ]);","        }","","        // Add an extra unique group for the category drags.","        dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        this._ddMap.push(dd);","","        return dd;","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').get('outerHTML')","        );","","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var treeModel = this.get('data'),","            objID     = e.drag.get('data').get('clientId'),","            newCatID  = e.drop.get('node').get('parentNode').getAttribute('data-yui3-record'),","            // The model that was moved.","            obj       = treeModel.getByClientId(objID);","            // The category model it was dropped on, or null if it was dropped outside the tree.","            newCat    = treeModel.getByClientId(newCatID),","            self      = this;","","        if (obj) {","            if (Y.instanceOf(obj, Y.TB.Category)) {","                obj.set('parent', newCat);","            } else {","                obj.set('category', newCat);","            }","","            obj.save(function () {","                treeModel.load(function () {","                    self.refresh();","                });","            });","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-dd\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"19":0,"20":0,"22":0,"23":0,"32":0,"33":0,"34":0,"43":0,"47":0,"48":0,"50":0,"53":0,"54":0,"57":0,"58":0,"60":0,"62":0,"68":0,"71":0,"74":0,"75":0,"85":0,"89":0,"90":0,"94":0,"104":0,"106":0,"110":0,"116":0,"118":0,"122":0,"124":0,"126":0,"128":0,"129":0,"131":0,"132":0,"134":0,"138":0,"144":0,"147":0,"148":0,"149":0,"151":0,"154":0,"155":0,"156":0,"174":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"initializer:18":0,"sizeShims:31":0,"(anonymous 2):53":0,"_bindDD:42":0,"_createDD:84":0,"_handleStart:109":0,"(anonymous 4):155":0,"(anonymous 3):154":0,"_handleDrop:137":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 51;
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredFunctions = 10;
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

    /**
     * DD references store
     */
    _ddMap: [],

    /**
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "initializer", 18);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 19);
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 20);
Y.Do.after(this._bindDD, this, '_bindEvents', this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 22);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 23);
this.on('drop:hit', this._handleDrop, this);
        }
    },

    /**
     * Update all the the DD shims
     * Most likely used in combination with libbit-nodescroll (scrolling event).
     */
    sizeShims: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "sizeShims", 31);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 32);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 33);
if (typeof(this._ddMap[i].sizeShim) === 'function') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 34);
this._ddMap[i].sizeShim();
            }
        }
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindDD", 42);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 43);
var self       = this,
            tree       = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 47);
if (this._treeNodes.length === 0) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 48);
return;
        } else {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 50);
nodes = this._treeNodes;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 53);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 53);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 54);
var node,
                model;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 57);
node = tree.getHTMLNode(value).one('div');
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 58);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 60);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model. Categories allow dropping.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 62);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 68);
self._ddMap.push(catDD);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 71);
self._createDD(node, model);
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 74);
if (this.get('header')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 75);
new Y.DD.Drop({
                node         : this.get('contentBox').one('.nav-header'),
                // Only allow categories to drop here
                groups       : [ Y.stamp(this) ],
                bubbleTargets: self
            });
        }
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 84);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 85);
var groups = this.get('groups'),
            self = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 89);
if (data instanceof Y.TB.Category) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 90);
groups = groups.concat([ Y.stamp(this) ]);
        }

        // Add an extra unique group for the category drags.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 94);
dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 106);
return dd;
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 109);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 110);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 116);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 118);
drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 122);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 124);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 126);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 128);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 129);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 131);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 132);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 134);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 137);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 138);
var treeModel = this.get('data'),
            objID     = e.drag.get('data').get('clientId'),
            newCatID  = e.drop.get('node').get('parentNode').getAttribute('data-yui3-record'),
            // The model that was moved.
            obj       = treeModel.getByClientId(objID);
            // The category model it was dropped on, or null if it was dropped outside the tree.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 144);
newCat    = treeModel.getByClientId(newCatID),
            self      = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 147);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 148);
if (Y.instanceOf(obj, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 149);
obj.set('parent', newCat);
            } else {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 151);
obj.set('category', newCat);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 154);
obj.save(function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 154);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 155);
treeModel.load(function () {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 155);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 156);
self.refresh();
                });
            });
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 174);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["libbit-dd"]});
