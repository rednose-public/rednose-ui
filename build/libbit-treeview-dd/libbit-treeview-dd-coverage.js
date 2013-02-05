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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    /**","     * DD references store","     */","    _ddMap: [],","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        var self = this;","        var model = this.get('data');","","        if (this.get('dragdrop')) {","            Y.Do.after(this._bindDD, this, '_bindEvents', this);","","            model.before('load', function() {","                self._destroyDD();","            });","","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","","            this.on('drop:over', this._setClass, this);","            this.on('drag:end', this._setClass, this);","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            tree       = this.get('tree'),","            nodes;","","        if (this._treeNodes.length === 0) {","            return;","        } else {","            nodes = this._treeNodes;","        }","","        Y.each(nodes, function (value) {","            var data = self.get('data'),","                clientId,","                node,","                model;","","            node = tree.getHTMLNode(value);","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model.","                // Categories allow dropping","                var catDD = new Y.DD.Drop({","                    node         : node,","                    groups       : self.get('groups'),","                    bubbleTargets: self","                });","","                self._ddMap.push(catDD);","            }","","            self._createDD(node, model);","        });","    },","","    _createDD: function (node, data) {","        var self = this,","            dd;","","        dd = new Y.DD.Drag({","            node   : node,","            data   : data,","            groups : this.get('groups'),","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        this._ddMap.push(dd);","","        return dd;","    },","","    /**","     * All DD references must be destoyed if the model is reloaded.","     */","    _destroyDD: function() {","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","","        this._ddMap = [];","    },","","    _handleStart: function (e) {","        var drag = e.target,","            model,","            container,","            origin,","            dd;","","        model = drag.get('data');","","        drag.get('dragNode').setContent(","            drag.get('node').one('div').get('outerHTML')","        );","","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, model);","    },","","    _handleDrop: function (e) {","        var treeModel = this.get('data'),","            objID     = e.drag.get('data').get('clientId'),","            newCatID  = e.drop.get('node').getAttribute('data-yui3-record'),","            // The model that was moved.","            obj       = treeModel.getByClientId(objID);","            // The category model it was dropped on, or null if it was dropped outside the tree.","            newCat    = treeModel.getByClientId(newCatID);","","        if (obj) {","            if (Y.instanceOf(obj, Y.TB.Category)) {","                obj.set('parent', newCat);","            } else {","                obj.set('category', newCat);","            }","","            obj.save(function () {","                treeModel.load();","            });","        }","    },","","    _setClass: function (e) {","        var activeEl;","","        switch (e.type) {","            case 'drop:over':","                var node = e.drop.get('node');","","                if (node.hasClass('libbit-content-drop-over') === false) {","                    if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {","                        activeEl.removeClass('libbit-content-drop-over');","                    }","","                    node.addClass('libbit-content-drop-over');","                }","                break;","","            case 'drag:end':","                if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {","                    activeEl.removeClass('libbit-content-drop-over');","                }","                break;","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        },","","        groups: {","            value : ['libbit-treeview']","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"dd\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"19":0,"20":0,"22":0,"23":0,"25":0,"26":0,"29":0,"30":0,"32":0,"33":0,"41":0,"45":0,"46":0,"48":0,"51":0,"52":0,"57":0,"58":0,"60":0,"63":0,"69":0,"72":0,"77":0,"80":0,"90":0,"92":0,"99":0,"100":0,"103":0,"107":0,"113":0,"115":0,"119":0,"121":0,"123":0,"125":0,"126":0,"128":0,"129":0,"131":0,"135":0,"141":0,"143":0,"144":0,"145":0,"147":0,"150":0,"151":0,"157":0,"159":0,"161":0,"163":0,"164":0,"165":0,"168":0,"170":0,"173":0,"174":0,"176":0,"192":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"(anonymous 2):25":0,"initializer:18":0,"(anonymous 3):51":0,"_bindDD:40":0,"_createDD:76":0,"_destroyDD:98":0,"_handleStart:106":0,"(anonymous 4):150":0,"_handleDrop:134":0,"_setClass:156":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 63;
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredFunctions = 11;
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

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 32);
this.on('drop:over', this._setClass, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 33);
this.on('drag:end', this._setClass, this);
        }
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindDD", 40);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 41);
var self       = this,
            tree       = this.get('tree'),
            nodes;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 45);
if (this._treeNodes.length === 0) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 46);
return;
        } else {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 48);
nodes = this._treeNodes;
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 51);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 51);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 52);
var data = self.get('data'),
                clientId,
                node,
                model;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 57);
node = tree.getHTMLNode(value);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 58);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 60);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model.
                // Categories allow dropping
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 63);
var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 69);
self._ddMap.push(catDD);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 72);
self._createDD(node, model);
        });
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 76);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 77);
var self = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 80);
dd = new Y.DD.Drag({
            node   : node,
            data   : data,
            groups : this.get('groups'),
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 90);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 92);
return dd;
    },

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDD: function() {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_destroyDD", 98);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 99);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 100);
this._ddMap[i].destroy();
        }

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 103);
this._ddMap = [];
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 106);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 107);
var drag = e.target,
            model,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 113);
model = drag.get('data');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 115);
drag.get('dragNode').setContent(
            drag.get('node').one('div').get('outerHTML')
        );

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 119);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 121);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 123);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 125);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 126);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 128);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 129);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 131);
dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 134);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 135);
var treeModel = this.get('data'),
            objID     = e.drag.get('data').get('clientId'),
            newCatID  = e.drop.get('node').getAttribute('data-yui3-record'),
            // The model that was moved.
            obj       = treeModel.getByClientId(objID);
            // The category model it was dropped on, or null if it was dropped outside the tree.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 141);
newCat    = treeModel.getByClientId(newCatID);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 143);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 144);
if (Y.instanceOf(obj, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 145);
obj.set('parent', newCat);
            } else {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 147);
obj.set('category', newCat);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 150);
obj.save(function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 150);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 151);
treeModel.load();
            });
        }
    },

    _setClass: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_setClass", 156);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 157);
var activeEl;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 159);
switch (e.type) {
            case 'drop:over':
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 161);
var node = e.drop.get('node');

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 163);
if (node.hasClass('libbit-content-drop-over') === false) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 164);
if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {
                        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 165);
activeEl.removeClass('libbit-content-drop-over');
                    }

                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 168);
node.addClass('libbit-content-drop-over');
                }
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 170);
break;

            case 'drag:end':
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 173);
if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 174);
activeEl.removeClass('libbit-content-drop-over');
                }
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 176);
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 192);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["dd"]});
