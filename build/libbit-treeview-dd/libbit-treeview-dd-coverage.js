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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    /**","     * DD references store","     */","    _ddMap: [],","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        var self = this;","        var model = this.get('data');","","        if (this.get('dragdrop')) {","            Y.Do.after(this._bindDD, this, '_bindEvents', this);","","            model.before('load', function() {","                self._destroyDD();","            });","","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","            this.on('drop:over', this._handleOver, this);","","            this.on('drop:enter', this._setClass, this);","            this.on('drop:exit', this._setClass, this);","            this.on('drag:end', this._setClass, this);","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            tree       = this.get('tree'),","            nodes;","","        if (this._treeNodes.length === 0) {","            return;","        } else {","            nodes = this._treeNodes;","        }","","        // Global dd","        var globalDD = new Y.DD.Drop({","            node         : this.get('contentBox').ancestor('.yui3-widget-bd'),","            groups       : ['libbit-treeview'],","            bubbleTargets: self","        });","","        this._ddMap.push(globalDD);","","        Y.each(nodes, function (value) {","            var data = self.get('data'),","                clientId,","                node,","                model;","","            node = tree.getHTMLNode(value);","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model.","                // Categories allow dropping","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : ['libbit-treeview'],","                    bubbleTargets: self","                });","","                self._ddMap.push(catDD);","            }","","            self._createDD(node, model);","        });","    },","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handleOver: function (e) {","        var dropNode    = e.drop.get('node'),","            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),","            nodeOffsetY = dropNode.get('offsetTop'),","            nodeHeight  = dropNode.get('offsetHeight'),","            relativeY,","            node,","            anim,","            scrollFunc;","","        if (dropNode.hasClass('yui3-widget-bd')) {","            // Determain scrolling direction (if needed)","            relativeY = dragY - nodeOffsetY - 20; /* Margin top */","            if (relativeY > nodeHeight) {","                scrollFunc = function() {","                    return [0, node.get('scrollTop') + node.get('offsetHeight')]","                };","            } else if (relativeY < 15) {","                scrollFunc = function() {","                    return [node.get('scrollTop') + node.get('offsetHeight'), 0]","                };","            }","","            // Scroll","            if (scrollFunc) {","                node = dropNode;","                anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: scrollFunc","                    },","                    easing: Y.Easing.easeOut","                });","","                anim.run();","            }","        }","    },","","    _createDD: function (node, data) {","        var self = this,","            dd;","","        dd = new Y.DD.Drag({","            node   : node,","            data   : data,","            groups : ['libbit-treeview'],","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        this._ddMap.push(dd);","","        return dd;","    },","","    /**","     * All DD references must be destoyed if the model is reloaded.","     */","    _destroyDD: function() {","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","","        this._ddMap = [];","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').one('div').get('outerHTML')","        );","","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var treeModel = this.get('data'),","            objID     = e.drag.get('data').get('clientId'),","            newCatID  = e.drop.get('node').getAttribute('data-yui3-record'),","            // The model that was moved.","            obj       = treeModel.getByClientId(objID);","            // The category model it was dropped on, or null if it was dropped outside the tree.","            newCat    = treeModel.getByClientId(newCatID);","","        if (obj) {","            if (Y.instanceOf(obj, Y.TB.Category)) {","                obj.set('parent', newCat);","            } else {","                obj.set('category', newCat);","            }","","            obj.save(function () {","                treeModel.load();","            });","        }","    },","","    _setClass: function (e) {","        var activeEl;","","        switch (e.type) {","            case 'drop:enter':","                if (activeEl = Y.one('.libbit-content-drop-over')) {","                    activeEl.removeClass('libbit-content-drop-over');","                }","                e.drop.get('node').addClass('libbit-content-drop-over');","                break;","","            case 'drop:exit':","                e.drop.get('node').removeClass('libbit-content-drop-over');","                break;","","            case 'drag:end':","                if (activeEl = Y.one('.libbit-content-drop-over')) {","                    activeEl.removeClass('libbit-content-drop-over');","                }","                break;","","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"dd\", \"anim\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"19":0,"20":0,"22":0,"23":0,"25":0,"26":0,"29":0,"30":0,"31":0,"33":0,"34":0,"35":0,"43":0,"47":0,"48":0,"50":0,"54":0,"60":0,"62":0,"63":0,"68":0,"69":0,"71":0,"74":0,"80":0,"83":0,"91":0,"100":0,"102":0,"103":0,"104":0,"105":0,"107":0,"108":0,"109":0,"114":0,"115":0,"116":0,"124":0,"130":0,"133":0,"143":0,"145":0,"152":0,"153":0,"156":0,"160":0,"166":0,"168":0,"172":0,"174":0,"176":0,"178":0,"179":0,"181":0,"182":0,"184":0,"188":0,"194":0,"196":0,"197":0,"198":0,"200":0,"203":0,"204":0,"210":0,"212":0,"214":0,"215":0,"217":0,"218":0,"221":0,"222":0,"225":0,"226":0,"228":0,"241":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"(anonymous 2):25":0,"initializer:18":0,"(anonymous 3):62":0,"_bindDD:42":0,"scrollFunc:104":0,"scrollFunc:108":0,"_handleOver:90":0,"_createDD:129":0,"_destroyDD:151":0,"_handleStart:159":0,"(anonymous 4):203":0,"_handleDrop:187":0,"_setClass:209":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 80;
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredFunctions = 14;
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
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 20);
var model = this.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 22);
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 23);
Y.Do.after(this._bindDD, this, '_bindEvents', this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 25);
model.before('load', function() {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 25);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 26);
self._destroyDD();
            });

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 29);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 30);
this.on('drop:hit', this._handleDrop, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 31);
this.on('drop:over', this._handleOver, this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 33);
this.on('drop:enter', this._setClass, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 34);
this.on('drop:exit', this._setClass, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 35);
this.on('drag:end', this._setClass, this);
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

        // Global dd
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 54);
var globalDD = new Y.DD.Drop({
            node         : this.get('contentBox').ancestor('.yui3-widget-bd'),
            groups       : ['libbit-treeview'],
            bubbleTargets: self
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 60);
this._ddMap.push(globalDD);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 62);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 62);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 63);
var data = self.get('data'),
                clientId,
                node,
                model;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 68);
node = tree.getHTMLNode(value);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 69);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 71);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model.
                // Categories allow dropping
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 74);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : ['libbit-treeview'],
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 80);
self._ddMap.push(catDD);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 83);
self._createDD(node, model);
        });
    },

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleOver: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleOver", 90);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 91);
var dropNode    = e.drop.get('node'),
            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),
            nodeOffsetY = dropNode.get('offsetTop'),
            nodeHeight  = dropNode.get('offsetHeight'),
            relativeY,
            node,
            anim,
            scrollFunc;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 100);
if (dropNode.hasClass('yui3-widget-bd')) {
            // Determain scrolling direction (if needed)
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 102);
relativeY = dragY - nodeOffsetY - 20; /* Margin top */
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 103);
if (relativeY > nodeHeight) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
scrollFunc = function() {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "scrollFunc", 104);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 105);
return [0, node.get('scrollTop') + node.get('offsetHeight')]
                };
            } else {_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 107);
if (relativeY < 15) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 108);
scrollFunc = function() {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "scrollFunc", 108);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 109);
return [node.get('scrollTop') + node.get('offsetHeight'), 0]
                };
            }}

            // Scroll
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 114);
if (scrollFunc) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 115);
node = dropNode;
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 116);
anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: scrollFunc
                    },
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 124);
anim.run();
            }
        }
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 129);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 130);
var self = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 133);
dd = new Y.DD.Drag({
            node   : node,
            data   : data,
            groups : ['libbit-treeview'],
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 143);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 145);
return dd;
    },

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDD: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_destroyDD", 151);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 152);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 153);
this._ddMap[i].destroy();
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 156);
this._ddMap = [];
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 159);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 160);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 166);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 168);
drag.get('dragNode').setContent(
            drag.get('node').one('div').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 172);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 174);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 176);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 178);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 179);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 181);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 182);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 184);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 187);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 188);
var treeModel = this.get('data'),
            objID     = e.drag.get('data').get('clientId'),
            newCatID  = e.drop.get('node').getAttribute('data-yui3-record'),
            // The model that was moved.
            obj       = treeModel.getByClientId(objID);
            // The category model it was dropped on, or null if it was dropped outside the tree.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 194);
newCat    = treeModel.getByClientId(newCatID);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 196);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 197);
if (Y.instanceOf(obj, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 198);
obj.set('parent', newCat);
            } else {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 200);
obj.set('category', newCat);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 203);
obj.save(function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 203);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 204);
treeModel.load();
            });
        }
    },

    _setClass: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_setClass", 209);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 210);
var activeEl;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 212);
switch (e.type) {
            case 'drop:enter':
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 214);
if (activeEl = Y.one('.libbit-content-drop-over')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 215);
activeEl.removeClass('libbit-content-drop-over');
                }
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 217);
e.drop.get('node').addClass('libbit-content-drop-over');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 218);
break;

            case 'drop:exit':
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 221);
e.drop.get('node').removeClass('libbit-content-drop-over');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 222);
break;

            case 'drag:end':
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 225);
if (activeEl = Y.one('.libbit-content-drop-over')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 226);
activeEl.removeClass('libbit-content-drop-over');
                }
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 228);
break;

        }
    }
}, {
    ATTRS: {
        dragdrop: {
            value : false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 241);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["dd", "anim"]});
