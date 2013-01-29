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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        if (this.get('dragdrop')) {","            Y.Do.after(this._bindDD, this, 'bindUI', this);","","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","            this.on('drop:over', this._handleOver, this);","","            this.on('drop:enter', this._handleEnter, this);","            this.on('drop:exit', this._handleExit, this);","            this.on('drag:end', this._handleEnd, this);","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            contentBox = this.get('contentBox').get('parentNode').get('parentNode').get('parentNode'),","            tree       = this.get('tree'),","            nodes;","","        // XXX","        contentBox.addClass('libbit-content');","","        // Setup Tree DD.","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (value) {","            var data = self.get('data'),","                clientId,","                node,","                model;","","            // Bind the DD to the parent table, for a wider drop range.","            node = Y.one('#' + value.labelElId).ancestor('table');","","            // FIXME: The model is also stored in the data property, this is not needed.","            //model = value.data;","            clientId = node.getAttribute('data-yui3-record');","            model = data.getByClientId(clientId);","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model.","                self._createDD(node, model);","                // Categories allow dropping","                new Y.DD.Drop({","                    node         : node,","                    groups       : ['libbit-treeview'],","                    bubbleTargets: self","                });","            } else {","                // This is a fieldGroup.","                self._createDD(node, model);","            }","","        });","","        tree.collapseAll();","    },","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handleOver: function (e) {","        var dropNode    = e.drop.get('node'),","            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),","            nodeOffsetY = dropNode.get('offsetTop'),","            nodeHeight  = dropNode.get('offsetHeight'),","            relativeY,","            node,","            anim;","","        if (dropNode.hasClass('yui3-widget-bd')) {","            // Handle dropping on empty parts","            if (dropNode.all('.yui3-dd-drop-over').isEmpty()) {","                dropNode.addClass('libbit-content-drop-over');","            } else {","                if (dropNode.hasClass('libbit-content-drop-over')) {","                    dropNode.removeClass('libbit-content-drop-over');","                }","            }","","            // Handle scrolling","            relativeY = dragY - nodeOffsetY - 20; /* Margin top */","            if (relativeY > nodeHeight) {","                // Scroll down","                node = Y.one('.libbit-tabview .yui3-widget-bd');","                anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: function(node) {","                            return [0, node.get('scrollTop') + node.get('offsetHeight')];","                        }","                    },","                    easing: Y.Easing.easeOut","                });","","                anim.run();","            } else if (relativeY < 15) {","                // Scroll up","                node = Y.one('.libbit-tabview .yui3-widget-bd');","                anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: function(node) {","                            return [node.get('scrollTop') + node.get('offsetHeight'), 0];","                        }","                    },","                    easing: Y.Easing.easeOut","                });","","                anim.run();","            }","        }","    },","","    _createDD: function (node, data) {","        var self = this,","            dd;","","        dd = new Y.DD.Drag({","            node   : node,","            data   : data,","            groups : ['libbit-treeview'],","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    _handleStart: function (e) {","        var drag = e.target,","            fieldGroup,","            container,","            origin,","            dd;","","        fieldGroup = drag.get('data');","        drag.get('dragNode').setContent(drag.get('node').one('.ygtvlabel').get('outerHTML'));","","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, fieldGroup);","    },","","    _handleDrop: function (e) {","        var treeModel = this.get('data'),","            objID     = e.drag.get('data').get('clientId'),","            newCatID  = e.drop.get('node').getAttribute('data-yui3-record'),","            // The model that was moved.","            obj       = treeModel.getByClientId(objID);","            // The category model it was dropped on, or null if it was dropped outside the tree.","            newCat    = treeModel.getByClientId(newCatID);","","        if (obj) {","            if (Y.instanceOf(obj, Y.TB.Category)) {","                obj.set('parent', newCat);","            } else {","                obj.set('category', newCat);","            }","","            obj.save(function () {","                treeModel.load();","            });","        }","    },","","    _handleExit: function (e) {","        var dropNode = e.drop.get('node');","","        if (dropNode.hasClass('libbit-content-drop-over')) {","            dropNode.removeClass('libbit-content-drop-over');","        }","    },","","    _handleEnd: function (e) {","        var contentBox = this.get('contentBox').get('parentNode').get('parentNode').get('parentNode');","","        if (contentBox.hasClass('libbit-content-drop-over')) {","            contentBox.removeClass('libbit-content-drop-over');","        }","    },","","    // TODO: Abstract","    _handleEnter: function (e) {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                node = drag.get('dragNode'),","                obj  = drag.get('data'),","                n,","                fieldGroup,","                anim;","","            if (Y.instanceOf(obj, Y.TB.TemplateItem)) {","                fieldGroup = obj.get('fieldGroup');","                drag.set('data', fieldGroup);","","                // Clone the node, position it on top of the original for secondary animation.","                n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');","                Y.one('body').appendChild(n);","                n.setXY(node.getXY());","","                node.setStyle('opacity', 0);","                node.set('innerHTML',","                    '<div class=\"libbit-fieldgroup-drag\"><i class=\"icon-align-left\"></i><span> </span>' + fieldGroup.get('name') + '</div>'","                );","","                anim = new Y.Anim({","                    node: n.one('.libbit-template-item-container'),","                    to: {","                        width: 0,","                        height: 0","                    },","                    duration: '.25',","                    easing: Y.Easing.easeOut","                });","","                anim.on('end', function () {","                    n.remove();","                });","","                anim.run();","","                anim = new Y.Anim({","                    node: node,","                    to: { opacity: 1 },","                    duration: '.25',","                    easing: Y.Easing.easeOut","                });","","                anim.run();","           }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"dd\", \"event-custom\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"14":0,"15":0,"17":0,"18":0,"19":0,"21":0,"22":0,"23":0,"31":0,"37":0,"40":0,"42":0,"44":0,"45":0,"51":0,"55":0,"56":0,"58":0,"60":0,"62":0,"69":0,"74":0,"81":0,"89":0,"91":0,"92":0,"94":0,"95":0,"100":0,"101":0,"103":0,"104":0,"108":0,"114":0,"115":0,"117":0,"118":0,"122":0,"128":0,"134":0,"137":0,"147":0,"151":0,"157":0,"158":0,"160":0,"162":0,"164":0,"166":0,"167":0,"169":0,"170":0,"172":0,"176":0,"182":0,"184":0,"185":0,"186":0,"188":0,"191":0,"192":0,"198":0,"200":0,"201":0,"206":0,"208":0,"209":0,"215":0,"216":0,"223":0,"224":0,"225":0,"228":0,"229":0,"230":0,"232":0,"233":0,"237":0,"247":0,"248":0,"251":0,"253":0,"260":0,"273":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"initializer:13":0,"(anonymous 2):42":0,"(anonymous 3):44":0,"_bindDD:30":0,"scroll:107":0,"scroll:121":0,"_handleOver:80":0,"_createDD:133":0,"_handleStart:150":0,"(anonymous 4):191":0,"_handleDrop:175":0,"_handleExit:197":0,"_handleEnd:205":0,"(anonymous 5):247":0,"_handleEnter:214":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].coveredLines = 87;
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

    /**
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "initializer", 13);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 14);
if (this.get('dragdrop')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 15);
Y.Do.after(this._bindDD, this, 'bindUI', this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 17);
this.on('drag:start', this._handleStart, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 18);
this.on('drop:hit', this._handleDrop, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 19);
this.on('drop:over', this._handleOver, this);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 21);
this.on('drop:enter', this._handleEnter, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 22);
this.on('drop:exit', this._handleExit, this);
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 23);
this.on('drag:end', this._handleEnd, this);
        }
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_bindDD", 30);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 31);
var self       = this,
            contentBox = this.get('contentBox').get('parentNode').get('parentNode').get('parentNode'),
            tree       = this.get('tree'),
            nodes;

        // XXX
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 37);
contentBox.addClass('libbit-content');

        // Setup Tree DD.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 40);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 42);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 42);
return true; });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 44);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 44);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 45);
var data = self.get('data'),
                clientId,
                node,
                model;

            // Bind the DD to the parent table, for a wider drop range.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 51);
node = Y.one('#' + value.labelElId).ancestor('table');

            // FIXME: The model is also stored in the data property, this is not needed.
            //model = value.data;
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 55);
clientId = node.getAttribute('data-yui3-record');
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 56);
model = data.getByClientId(clientId);

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 58);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 60);
self._createDD(node, model);
                // Categories allow dropping
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 62);
new Y.DD.Drop({
                    node         : node,
                    groups       : ['libbit-treeview'],
                    bubbleTargets: self
                });
            } else {
                // This is a fieldGroup.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 69);
self._createDD(node, model);
            }

        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 74);
tree.collapseAll();
    },

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleOver: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleOver", 80);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 81);
var dropNode    = e.drop.get('node'),
            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),
            nodeOffsetY = dropNode.get('offsetTop'),
            nodeHeight  = dropNode.get('offsetHeight'),
            relativeY,
            node,
            anim;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 89);
if (dropNode.hasClass('yui3-widget-bd')) {
            // Handle dropping on empty parts
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 91);
if (dropNode.all('.yui3-dd-drop-over').isEmpty()) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 92);
dropNode.addClass('libbit-content-drop-over');
            } else {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 94);
if (dropNode.hasClass('libbit-content-drop-over')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 95);
dropNode.removeClass('libbit-content-drop-over');
                }
            }

            // Handle scrolling
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 100);
relativeY = dragY - nodeOffsetY - 20; /* Margin top */
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 101);
if (relativeY > nodeHeight) {
                // Scroll down
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 103);
node = Y.one('.libbit-tabview .yui3-widget-bd');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "scroll", 107);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 108);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 114);
anim.run();
            } else {_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 115);
if (relativeY < 15) {
                // Scroll up
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 117);
node = Y.one('.libbit-tabview .yui3-widget-bd');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 118);
anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "scroll", 121);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 122);
return [node.get('scrollTop') + node.get('offsetHeight'), 0];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 128);
anim.run();
            }}
        }
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 133);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 134);
var self = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 137);
dd = new Y.DD.Drag({
            node   : node,
            data   : data,
            groups : ['libbit-treeview'],
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 147);
return dd;
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 150);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 151);
var drag = e.target,
            fieldGroup,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 157);
fieldGroup = drag.get('data');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 158);
drag.get('dragNode').setContent(drag.get('node').one('.ygtvlabel').get('outerHTML'));

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 160);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 162);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 164);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 166);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 167);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 169);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 170);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 172);
dd = this._createDD(origin, fieldGroup);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 175);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 176);
var treeModel = this.get('data'),
            objID     = e.drag.get('data').get('clientId'),
            newCatID  = e.drop.get('node').getAttribute('data-yui3-record'),
            // The model that was moved.
            obj       = treeModel.getByClientId(objID);
            // The category model it was dropped on, or null if it was dropped outside the tree.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 182);
newCat    = treeModel.getByClientId(newCatID);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 184);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 185);
if (Y.instanceOf(obj, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 186);
obj.set('parent', newCat);
            } else {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 188);
obj.set('category', newCat);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 191);
obj.save(function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 191);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 192);
treeModel.load();
            });
        }
    },

    _handleExit: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleExit", 197);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 198);
var dropNode = e.drop.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 200);
if (dropNode.hasClass('libbit-content-drop-over')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 201);
dropNode.removeClass('libbit-content-drop-over');
        }
    },

    _handleEnd: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleEnd", 205);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 206);
var contentBox = this.get('contentBox').get('parentNode').get('parentNode').get('parentNode');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 208);
if (contentBox.hasClass('libbit-content-drop-over')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 209);
contentBox.removeClass('libbit-content-drop-over');
        }
    },

    // TODO: Abstract
    _handleEnter: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleEnter", 214);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 215);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 216);
var drag = Y.DD.DDM.activeDrag,
                node = drag.get('dragNode'),
                obj  = drag.get('data'),
                n,
                fieldGroup,
                anim;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 223);
if (Y.instanceOf(obj, Y.TB.TemplateItem)) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 224);
fieldGroup = obj.get('fieldGroup');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 225);
drag.set('data', fieldGroup);

                // Clone the node, position it on top of the original for secondary animation.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 228);
n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 229);
Y.one('body').appendChild(n);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 230);
n.setXY(node.getXY());

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 232);
node.setStyle('opacity', 0);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 233);
node.set('innerHTML',
                    '<div class="libbit-fieldgroup-drag"><i class="icon-align-left"></i><span> </span>' + fieldGroup.get('name') + '</div>'
                );

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 237);
anim = new Y.Anim({
                    node: n.one('.libbit-template-item-container'),
                    to: {
                        width: 0,
                        height: 0
                    },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 247);
anim.on('end', function () {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 247);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 248);
n.remove();
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 251);
anim.run();

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 253);
anim = new Y.Anim({
                    node: node,
                    to: { opacity: 1 },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 260);
anim.run();
           }
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 273);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["dd", "event-custom"]});
