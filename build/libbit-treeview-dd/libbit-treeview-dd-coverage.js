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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    /**","     * DD references store","     */","    _ddMap: [],","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        var self = this;","","        if (this.get('dragdrop')) {","            Y.Do.after(this._bindDD, this, '_bindEvents', this);","","            self.on('beforeRefresh', function() {","                self._destroyDD();","            });","","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","","            // this.on('drop:over', this._setClass, this);","            // this.on('drag:end', this._setClass, this);","            this.on('drop:over', this._handleOver, this);","        }","    },","","    /**","     * Update all the the DD shims","     * Most likely used in combination with libbit-nodescroll (scrolling event).","     */","    sizeShims: function() {","        for (var i in this._ddMap) {","            if (typeof(this._ddMap[i].sizeShim) === 'function') {","                this._ddMap[i].sizeShim();","            }","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            tree       = this.get('tree'),","            nodes;","","        if (this._treeNodes.length === 0) {","            return;","        } else {","            nodes = this._treeNodes;","        }","","        Y.each(nodes, function (value) {","            var node,","                model;","","            node = tree.getHTMLNode(value).one('div');","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model.","                // Categories allow dropping","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                console.log(catDD);","                catDD.on('drop:hit', function (e) { console.log (e); });","                self._ddMap.push(catDD);","            }","","            self._createDD(node, model);","        });","    },","","    _createDD: function (node, data) {","        var self = this,","            dd;","","        dd = new Y.DD.Drag({","            node   : node,","            data   : data,","            groups : this.get('groups'),","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        this._ddMap.push(dd);","","        return dd;","    },","","    /**","     * All DD references must be destoyed if the model is reloaded.","     */","    _destroyDD: function() {","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","","        this._ddMap = [];","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        // var drag = e.target;","        // var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');","","        // drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').get('outerHTML')","        );","","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var treeModel = this.get('data'),","            objID     = e.drag.get('data').get('clientId'),","            newCatID  = e.drop.get('node').get('parentNode').getAttribute('data-yui3-record'),","            // The model that was moved.","            obj       = treeModel.getByClientId(objID);","            // The category model it was dropped on, or null if it was dropped outside the tree.","            newCat    = treeModel.getByClientId(newCatID);","","            console.log(objID);","            console.log(e.drop.get('node'));","        // if (obj) {","        //     if (Y.instanceOf(obj, Y.TB.Category)) {","        //         obj.set('parent', newCat);","        //     } else {","        //         obj.set('category', newCat);","        //     }","","        //     obj.save(function () {","        //         treeModel.load();","        //     });","        // }","    },","","    _handleOver: function (e) {","        // console.log(e);","    },","","    _setClass: function (e) {","        var activeEl;","","        switch (e.type) {","            case 'drop:over':","                var node = e.drop.get('node');","","                if (node.hasClass('libbit-content-drop-over') === false) {","                    if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {","                        activeEl.removeClass('libbit-content-drop-over');","                    }","","                    node.addClass('libbit-content-drop-over');","                }","                break;","","            case 'drag:end':","                if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {","                    activeEl.removeClass('libbit-content-drop-over');","                }","                break;","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-dd\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"19":0,"21":0,"22":0,"24":0,"25":0,"28":0,"29":0,"33":0,"42":0,"43":0,"44":0,"53":0,"57":0,"58":0,"60":0,"63":0,"64":0,"67":0,"68":0,"70":0,"73":0,"79":0,"80":0,"81":0,"84":0,"89":0,"92":0,"102":0,"104":0,"111":0,"112":0,"115":0,"119":0,"129":0,"131":0,"135":0,"137":0,"139":0,"141":0,"142":0,"144":0,"145":0,"147":0,"151":0,"157":0,"159":0,"160":0,"179":0,"181":0,"183":0,"185":0,"186":0,"187":0,"190":0,"192":0,"195":0,"196":0,"198":0,"214":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"(anonymous 2):24":0,"initializer:18":0,"sizeShims:41":0,"(anonymous 4):80":0,"(anonymous 3):63":0,"_bindDD:52":0,"_createDD:88":0,"_destroyDD:110":0,"_handleStart:118":0,"_handleDrop:150":0,"_setClass:178":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 62;
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredFunctions = 12;
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
var self = this;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 21);
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 22);
Y.Do.after(this._bindDD, this, '_bindEvents', this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 24);
self.on('beforeRefresh', function() {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 24);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 25);
self._destroyDD();
            });

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 28);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 29);
this.on('drop:hit', this._handleDrop, this);

            // this.on('drop:over', this._setClass, this);
            // this.on('drag:end', this._setClass, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 33);
this.on('drop:over', this._handleOver, this);
        }
    },

    /**
     * Update all the the DD shims
     * Most likely used in combination with libbit-nodescroll (scrolling event).
     */
    sizeShims: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "sizeShims", 41);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 42);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 43);
if (typeof(this._ddMap[i].sizeShim) === 'function') {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 44);
this._ddMap[i].sizeShim();
            }
        }
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindDD", 52);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 53);
var self       = this,
            tree       = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 57);
if (this._treeNodes.length === 0) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 58);
return;
        } else {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 60);
nodes = this._treeNodes;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 63);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 63);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 64);
var node,
                model;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 67);
node = tree.getHTMLNode(value).one('div');
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 68);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 70);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model.
                // Categories allow dropping
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 73);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 79);
console.log(catDD);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 80);
catDD.on('drop:hit', function (e) { _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 80);
console.log (e); });
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 81);
self._ddMap.push(catDD);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 84);
self._createDD(node, model);
        });
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 88);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 89);
var self = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 92);
dd = new Y.DD.Drag({
            node   : node,
            data   : data,
            groups : this.get('groups'),
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 102);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
return dd;
    },

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDD: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_destroyDD", 110);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 111);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 112);
this._ddMap[i].destroy();
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 115);
this._ddMap = [];
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 118);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 119);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        // var drag = e.target;
        // var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        // drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 129);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 131);
drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 135);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 137);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 139);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 141);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 142);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 144);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 145);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 147);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 150);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 151);
var treeModel = this.get('data'),
            objID     = e.drag.get('data').get('clientId'),
            newCatID  = e.drop.get('node').get('parentNode').getAttribute('data-yui3-record'),
            // The model that was moved.
            obj       = treeModel.getByClientId(objID);
            // The category model it was dropped on, or null if it was dropped outside the tree.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 157);
newCat    = treeModel.getByClientId(newCatID);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 159);
console.log(objID);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 160);
console.log(e.drop.get('node'));
        // if (obj) {
        //     if (Y.instanceOf(obj, Y.TB.Category)) {
        //         obj.set('parent', newCat);
        //     } else {
        //         obj.set('category', newCat);
        //     }

        //     obj.save(function () {
        //         treeModel.load();
        //     });
        // }
    },

    _handleOver: function (e) {
        // console.log(e);
    },

    _setClass: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_setClass", 178);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 179);
var activeEl;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 181);
switch (e.type) {
            case 'drop:over':
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 183);
var node = e.drop.get('node');

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 185);
if (node.hasClass('libbit-content-drop-over') === false) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 186);
if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {
                        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 187);
activeEl.removeClass('libbit-content-drop-over');
                    }

                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 190);
node.addClass('libbit-content-drop-over');
                }
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 192);
break;

            case 'drag:end':
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 195);
if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 196);
activeEl.removeClass('libbit-content-drop-over');
                }
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 198);
break;
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 214);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["libbit-dd"]});
