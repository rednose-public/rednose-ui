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
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].code=["YUI.add('libbit-treeview-dd', function (Y, NAME) {","","var DD;","","/**"," * Drag and drop extension for the TreeView."," */","DD = Y.Base.create('dd', Y.Base, [], {","","    /**","     * Subscribe to the render event and set up DD listeners.","     */","    initializer: function () {","        if (this.get('dragdrop')) {","            Y.Do.after(this._bindDD, this, 'bindUI', this);","","            this.on('drag:start', this._handleStart, this);","            this.on('drop:hit', this._handleDrop, this);","            this.on('drop:over', this._handleOver, this);","","            this.on('drop:enter', this._handleEnter, this);","            this.on('drop:exit', this._handleExit, this);","            this.on('drag:end', this._handleEnd, this);","        }","    },","","    /**","     * Bind all DD instance after the parent view has been rendered.","     */","    _bindDD: function () {","        var self       = this,","            contentBox = this.get('contentBox').get('parentNode').get('parentNode').get('parentNode'),","            tree       = this.get('tree'),","            nodes;","","        // XXX","        contentBox.addClass('libbit-content');","","        // Setup a container drop target.","        new Y.DD.Drop({","             node         : contentBox,","             groups       : ['libbit-treeview'],","             bubbleTargets: this","        });","","        // Setup Tree DD.","        tree.expandAll();","","        nodes = tree.getNodesBy(function () { return true; });","","        Y.each(nodes, function (value) {","            var node,","                model;","","            // Bind the DD to the parent table, for a wider drop range.","            node = Y.one('#' + value.labelElId).ancestor('table');","","            // TODO: Query modellist to get fieldGroup model objects","            model = value.data;","","            if (Y.instanceOf(model, Y.TB.Category)) {","                // This is a category model.","                self._createDD(node, model);","                // Categories allow dropping","                new Y.DD.Drop({","                    node         : node,","                    groups       : ['libbit-treeview'],","                    bubbleTargets: self","                });","            } else {","                // This is a fieldGroup.","                self._createDD(node, model);","            }","","        });","","        tree.collapseAll();","    },","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handleOver: function (e) {","        var dropNode    = e.drop.get('node'),","            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),","            nodeOffsetY = dropNode.get('offsetTop'),","            nodeHeight  = dropNode.get('offsetHeight'),","            relativeY,","            node,","            anim;","","        if (dropNode.hasClass('yui3-widget-bd')) {","            // Handle dropping on empty parts","            if (dropNode.all('.yui3-dd-drop-over').isEmpty()) {","                dropNode.addClass('libbit-content-drop-over');","            } else {","                if (dropNode.hasClass('libbit-content-drop-over')) {","                    dropNode.removeClass('libbit-content-drop-over');","                }","            }","","            // Handle scrolling","            relativeY = dragY - nodeOffsetY - 20; /* Margin top */","            if (relativeY > nodeHeight) {","                // Scroll down","                node = Y.one('.libbit-tabview .yui3-widget-bd');","                anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: function(node) {","                            return [0, node.get('scrollTop') + node.get('offsetHeight')];","                        }","                    },","                    easing: Y.Easing.easeOut","                });","","                anim.run();","            } else if (relativeY < 15) {","                // Scroll up","                node = Y.one('.libbit-tabview .yui3-widget-bd');","                anim = new Y.Anim({","                    node: node,","                    to: {","                        scroll: function(node) {","                            return [node.get('scrollTop') + node.get('offsetHeight'), 0];","                        }","                    },","                    easing: Y.Easing.easeOut","                });","","                anim.run();","            }","        }","    },","","    _createDD: function (node, data) {","        var self = this,","            dd;","","        dd = new Y.DD.Drag({","            node   : node,","            data   : data,","            groups : ['libbit-treeview'],","            bubbleTargets: self","        }).plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    _handleStart: function (e) {","        var drag = e.target,","            fieldGroup,","            container,","            origin,","            dd;","","        fieldGroup = drag.get('data');","        drag.get('dragNode').setContent(drag.get('node').one('.ygtvlabel').get('outerHTML'));","","        origin = drag.get('node');","","        drag._prep();","","        drag.detachAll('drag:start');","","        container = Y.Node.create('<div></div>');","        drag.set('node', container);","","        drag.set('target', true);","        drag._prep();","","        dd = this._createDD(origin, fieldGroup);","    },","","    _handleDrop: function (e) {","        var treeModel = this.get('data'),","            objID     = e.drag.get('data').get('clientId'),","            newCatID  = e.drop.get('node').getAttribute('data-yui3-record'),","            // The model that was moved.","            obj       = treeModel.getByClientId(objID);","            // The category model it was dropped on, or null if it was dropped outside the tree.","            newCat    = treeModel.getByClientId(newCatID);","","        if (obj) {","            if (Y.instanceOf(obj, Y.TB.Category)) {","                obj.set('parent', newCat);","            } else {","                obj.set('category', newCat);","            }","","            obj.save(function () {","                treeModel.load();","            });","        }","    },","","    _handleExit: function (e) {","        var dropNode = e.drop.get('node');","","        if (dropNode.hasClass('libbit-content-drop-over')) {","            dropNode.removeClass('libbit-content-drop-over');","        }","    },","","    _handleEnd: function (e) {","        var contentBox = this.get('contentBox').get('parentNode').get('parentNode').get('parentNode');","","        if (contentBox.hasClass('libbit-content-drop-over')) {","            contentBox.removeClass('libbit-content-drop-over');","        }","    },","","    // TODO: Abstract","    _handleEnter: function (e) {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                node = drag.get('dragNode'),","                obj  = drag.get('data'),","                n,","                fieldGroup,","                anim;","","            if (Y.instanceOf(obj, Y.TB.TemplateItem)) {","                fieldGroup = obj.get('fieldGroup');","                drag.set('data', fieldGroup);","","                // Clone the node, position it on top of the original for secondary animation.","                n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');","                Y.one('body').appendChild(n);","                n.setXY(node.getXY());","","                node.setStyle('opacity', 0);","                node.set('innerHTML',","                    '<div class=\"libbit-fieldgroup-drag\"><i class=\"icon-align-left\"></i><span> </span>' + fieldGroup.get('name') + '</div>'","                );","","                anim = new Y.Anim({","                    node: n.one('.libbit-template-item-container'),","                    to: {","                        width: 0,","                        height: 0","                    },","                    duration: '.25',","                    easing: Y.Easing.easeOut","                });","","                anim.on('end', function () {","                    n.remove();","                });","","                anim.run();","","                anim = new Y.Anim({","                    node: node,","                    to: { opacity: 1 },","                    duration: '.25',","                    easing: Y.Easing.easeOut","                });","","                anim.run();","           }","        }","    }","}, {","    ATTRS: {","        dragdrop: {","            value : false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').DD = DD;","","","}, '1.0.0', {\"requires\": [\"dd\", \"event-custom\"]});"];
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].lines = {"1":0,"3":0,"8":0,"14":0,"15":0,"17":0,"18":0,"19":0,"21":0,"22":0,"23":0,"31":0,"37":0,"40":0,"47":0,"49":0,"51":0,"52":0,"56":0,"59":0,"61":0,"63":0,"65":0,"72":0,"77":0,"84":0,"92":0,"94":0,"95":0,"97":0,"98":0,"103":0,"104":0,"106":0,"107":0,"111":0,"117":0,"118":0,"120":0,"121":0,"125":0,"131":0,"137":0,"140":0,"150":0,"154":0,"160":0,"161":0,"163":0,"165":0,"167":0,"169":0,"170":0,"172":0,"173":0,"175":0,"179":0,"185":0,"187":0,"188":0,"189":0,"191":0,"194":0,"195":0,"201":0,"203":0,"204":0,"209":0,"211":0,"212":0,"218":0,"219":0,"226":0,"227":0,"228":0,"231":0,"232":0,"233":0,"235":0,"236":0,"240":0,"250":0,"251":0,"254":0,"256":0,"263":0,"276":0};
_yuitest_coverage["build/libbit-treeview-dd/libbit-treeview-dd.js"].functions = {"initializer:13":0,"(anonymous 2):49":0,"(anonymous 3):51":0,"_bindDD:30":0,"scroll:110":0,"scroll:124":0,"_handleOver:83":0,"_createDD:136":0,"_handleStart:153":0,"(anonymous 4):194":0,"_handleDrop:178":0,"_handleExit:200":0,"_handleEnd:208":0,"(anonymous 5):250":0,"_handleEnter:217":0,"(anonymous 1):1":0};
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

        // Setup a container drop target.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 40);
new Y.DD.Drop({
             node         : contentBox,
             groups       : ['libbit-treeview'],
             bubbleTargets: this
        });

        // Setup Tree DD.
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 47);
tree.expandAll();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 49);
nodes = tree.getNodesBy(function () { _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 2)", 49);
return true; });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 51);
Y.each(nodes, function (value) {
            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 3)", 51);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 52);
var node,
                model;

            // Bind the DD to the parent table, for a wider drop range.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 56);
node = Y.one('#' + value.labelElId).ancestor('table');

            // TODO: Query modellist to get fieldGroup model objects
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 59);
model = value.data;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 61);
if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 63);
self._createDD(node, model);
                // Categories allow dropping
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 65);
new Y.DD.Drop({
                    node         : node,
                    groups       : ['libbit-treeview'],
                    bubbleTargets: self
                });
            } else {
                // This is a fieldGroup.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 72);
self._createDD(node, model);
            }

        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 77);
tree.collapseAll();
    },

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleOver: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleOver", 83);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 84);
var dropNode    = e.drop.get('node'),
            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),
            nodeOffsetY = dropNode.get('offsetTop'),
            nodeHeight  = dropNode.get('offsetHeight'),
            relativeY,
            node,
            anim;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 92);
if (dropNode.hasClass('yui3-widget-bd')) {
            // Handle dropping on empty parts
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 94);
if (dropNode.all('.yui3-dd-drop-over').isEmpty()) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 95);
dropNode.addClass('libbit-content-drop-over');
            } else {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 97);
if (dropNode.hasClass('libbit-content-drop-over')) {
                    _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 98);
dropNode.removeClass('libbit-content-drop-over');
                }
            }

            // Handle scrolling
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 103);
relativeY = dragY - nodeOffsetY - 20; /* Margin top */
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 104);
if (relativeY > nodeHeight) {
                // Scroll down
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 106);
node = Y.one('.libbit-tabview .yui3-widget-bd');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 107);
anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "scroll", 110);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 111);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 117);
anim.run();
            } else {_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 118);
if (relativeY < 15) {
                // Scroll up
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 120);
node = Y.one('.libbit-tabview .yui3-widget-bd');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 121);
anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "scroll", 124);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 125);
return [node.get('scrollTop') + node.get('offsetHeight'), 0];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 131);
anim.run();
            }}
        }
    },

    _createDD: function (node, data) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_createDD", 136);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 137);
var self = this,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 140);
dd = new Y.DD.Drag({
            node   : node,
            data   : data,
            groups : ['libbit-treeview'],
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 150);
return dd;
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleStart", 153);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 154);
var drag = e.target,
            fieldGroup,
            container,
            origin,
            dd;

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 160);
fieldGroup = drag.get('data');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 161);
drag.get('dragNode').setContent(drag.get('node').one('.ygtvlabel').get('outerHTML'));

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 163);
origin = drag.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 165);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 167);
drag.detachAll('drag:start');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 169);
container = Y.Node.create('<div></div>');
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 170);
drag.set('node', container);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 172);
drag.set('target', true);
        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 173);
drag._prep();

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 175);
dd = this._createDD(origin, fieldGroup);
    },

    _handleDrop: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleDrop", 178);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 179);
var treeModel = this.get('data'),
            objID     = e.drag.get('data').get('clientId'),
            newCatID  = e.drop.get('node').getAttribute('data-yui3-record'),
            // The model that was moved.
            obj       = treeModel.getByClientId(objID);
            // The category model it was dropped on, or null if it was dropped outside the tree.
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 185);
newCat    = treeModel.getByClientId(newCatID);

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 187);
if (obj) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 188);
if (Y.instanceOf(obj, Y.TB.Category)) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 189);
obj.set('parent', newCat);
            } else {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 191);
obj.set('category', newCat);
            }

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 194);
obj.save(function () {
                _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 4)", 194);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 195);
treeModel.load();
            });
        }
    },

    _handleExit: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleExit", 200);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 201);
var dropNode = e.drop.get('node');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 203);
if (dropNode.hasClass('libbit-content-drop-over')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 204);
dropNode.removeClass('libbit-content-drop-over');
        }
    },

    _handleEnd: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleEnd", 208);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 209);
var contentBox = this.get('contentBox').get('parentNode').get('parentNode').get('parentNode');

        _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 211);
if (contentBox.hasClass('libbit-content-drop-over')) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 212);
contentBox.removeClass('libbit-content-drop-over');
        }
    },

    // TODO: Abstract
    _handleEnter: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "_handleEnter", 217);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 218);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 219);
var drag = Y.DD.DDM.activeDrag,
                node = drag.get('dragNode'),
                obj  = drag.get('data'),
                n,
                fieldGroup,
                anim;

            _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 226);
if (Y.instanceOf(obj, Y.TB.TemplateItem)) {
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 227);
fieldGroup = obj.get('fieldGroup');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 228);
drag.set('data', fieldGroup);

                // Clone the node, position it on top of the original for secondary animation.
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 231);
n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 232);
Y.one('body').appendChild(n);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 233);
n.setXY(node.getXY());

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 235);
node.setStyle('opacity', 0);
                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 236);
node.set('innerHTML',
                    '<div class="libbit-fieldgroup-drag"><i class="icon-align-left"></i><span> </span>' + fieldGroup.get('name') + '</div>'
                );

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 240);
anim = new Y.Anim({
                    node: n.one('.libbit-template-item-container'),
                    to: {
                        width: 0,
                        height: 0
                    },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 250);
anim.on('end', function () {
                    _yuitest_coverfunc("build/libbit-treeview-dd/libbit-treeview-dd.js", "(anonymous 5)", 250);
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 251);
n.remove();
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 254);
anim.run();

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 256);
anim = new Y.Anim({
                    node: node,
                    to: { opacity: 1 },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                _yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 263);
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
_yuitest_coverline("build/libbit-treeview-dd/libbit-treeview-dd.js", 276);
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["dd", "event-custom"]});
