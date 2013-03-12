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
_yuitest_coverage["build/libbit-dd/libbit-dd.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-dd/libbit-dd.js",
    code: []
};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].code=["YUI.add('libbit-dd', function (Y, NAME) {","","var DD;","","DD = Y.Base.create('dd', Y.View, [], {","","    /**","     * Hover events, handling complex, stacked hovers","     */","    events: {","        '.libbit-dd-drag': {","            mouseenter: '_handleMouseEnter',","            mouseleave: '_handleMouseLeave'","        }","    },","","    initializer: function() {","        // Set the cursor for drag proxies.","        Y.DD.DDM.set('dragCursor', 'default');","","        this.on('drag:start', this._handleStart, this);","    },","","// -- Node setup ---------------------------------------------------------------","","    /**","     * Create a new drag instance from a DOM node.","     */","    createDrag: function (node, groups) {","        node.addClass('libbit-dd-drag');","","        var dd = new Y.DD.Drag({","            node         : node,","            groups: groups,","            bubbleTargets: this,","            target       : true","        });","","        dd.plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    /**","     * Create a new drop instance from a DOM node.","     */","    createDrop: function (node, groups) {","        node.addClass('libbit-dd-drop');","","        var dd = new Y.DD.Drop({","            node        : node,","            //padding     : '20 0',","            groups: groups,","            bubbleTargets: this","        });","","        return dd;","    },","","    bindGlobalDrop: function (groups) {","        var container = this.get('container'),","            drop;","","        container.addClass('libbit-global-drop');","","        // Global drop object.","        drop = new Y.DD.Drop({","            node   : container,","            // groups: ['template', 'table-tree', 'image-tree', 'fieldgroup-tree'],","            groups: groups,","            // Do not bubble, we don't want to drop into the global region, just catch the enter event.","            bubbleTargets: null","        });","","        // Bind the global drop object.","        drop.on('drop:enter', this._dropEnterGlobal, this);","        // drop.on('drop:over', this._handleScroll, this);","    },","","// -- Event handlers -----------------------------------------------------------","","    _handleStart: function (e) {","        var drag = e.target;","","        var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');","","        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));","        drag.get('node').addClass('libbit-dd-drag-placeholder');","    },","","    _dropEnterGlobal: function (e) {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                dragNode = drag.get('dragNode'),","                obj  = drag.get('data'),","                container,","                templateItem;","","            if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {","                // Bind to the document's end drag handler","                drag.on('drag:end', this._handleEnd, this);","","                // Render the item","                var templateItem = new Y.TB.TemplateItem({","                    asset: obj","                });","","                var tiView = new Y.TB.TemplateItemView({","                    model: templateItem","                });","","                tiView.templateModel = this.get('model');","","                container = tiView.render().get('container');","","                // FIXME: The context menu doesn't get bound from tiView.render() for some reason","                container.plug(Y.Libbit.ContextMenu, {","                    content: [","                        { title: 'Remove from template', id: 'removeTemplateItem' },","                        { title: '-' },","                        { title: 'Properties', id: 'templateItemProperties', disabled: true }","                    ],","                    bubbleTarget: tiView","                });","","                var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');","","                container.addClass('libbit-dd-drag-placeholder');","","                // Store a reference to the model so we can access it from the DOM","                container.setData({ model: templateItem });","","                // Cleanup the old node to prevent orphans in the DOM","                drag.get('node').remove();","                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)","                drag.set('node', container);","","                // Update the dragNode","                Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);","            }","        }","    },","","// -- Hover Event handlers -----------------------------------------------------------","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseEnter: function (e) {","        var target = e.currentTarget;","","        if (target.ancestor('.libbit-dd-drag-hover')) {","            target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');","        }","","        if (target.one('.libbit-dd-drag-hover')) {","            target.addClass('libbit-dd-drag-hover-disabled');","        } else {","            target.addClass('libbit-dd-drag-hover');","        }","    },","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseLeave: function (e) {","        var target = e.currentTarget;","","        if (target.hasClass('libbit-dd-drag-hover')) {","            target.removeClass('libbit-dd-drag-hover');","        }","","        if (target.ancestor('.libbit-dd-drag-hover-disabled')) {","            target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DD = DD;","","","}, '1.0.0', {\"requires\": [\"view\", \"libbit-dd-css\"]});"];
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].lines = {"1":0,"3":0,"5":0,"19":0,"21":0,"30":0,"32":0,"39":0,"44":0,"51":0,"53":0,"60":0,"64":0,"67":0,"70":0,"79":0,"86":0,"88":0,"90":0,"91":0,"95":0,"96":0,"102":0,"104":0,"107":0,"111":0,"115":0,"117":0,"120":0,"129":0,"131":0,"134":0,"137":0,"139":0,"142":0,"153":0,"155":0,"156":0,"159":0,"160":0,"162":0,"170":0,"172":0,"173":0,"176":0,"177":0,"183":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].functions = {"initializer:17":0,"createDrag:29":0,"createDrop:50":0,"bindGlobalDrop:63":0,"_handleStart:85":0,"_dropEnterGlobal:94":0,"_handleMouseEnter:152":0,"_handleMouseLeave:169":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredLines = 47;
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredFunctions = 9;
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 1);
YUI.add('libbit-dd', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 3);
var DD;

_yuitest_coverline("build/libbit-dd/libbit-dd.js", 5);
DD = Y.Base.create('dd', Y.View, [], {

    /**
     * Hover events, handling complex, stacked hovers
     */
    events: {
        '.libbit-dd-drag': {
            mouseenter: '_handleMouseEnter',
            mouseleave: '_handleMouseLeave'
        }
    },

    initializer: function() {
        // Set the cursor for drag proxies.
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "initializer", 17);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 19);
Y.DD.DDM.set('dragCursor', 'default');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 21);
this.on('drag:start', this._handleStart, this);
    },

// -- Node setup ---------------------------------------------------------------

    /**
     * Create a new drag instance from a DOM node.
     */
    createDrag: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrag", 29);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 30);
node.addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 32);
var dd = new Y.DD.Drag({
            node         : node,
            groups: groups,
            bubbleTargets: this,
            target       : true
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 39);
dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 44);
return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrop", 50);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 51);
node.addClass('libbit-dd-drop');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 53);
var dd = new Y.DD.Drop({
            node        : node,
            //padding     : '20 0',
            groups: groups,
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 60);
return dd;
    },

    bindGlobalDrop: function (groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "bindGlobalDrop", 63);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 64);
var container = this.get('container'),
            drop;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 67);
container.addClass('libbit-global-drop');

        // Global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 70);
drop = new Y.DD.Drop({
            node   : container,
            // groups: ['template', 'table-tree', 'image-tree', 'fieldgroup-tree'],
            groups: groups,
            // Do not bubble, we don't want to drop into the global region, just catch the enter event.
            bubbleTargets: null
        });

        // Bind the global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 79);
drop.on('drop:enter', this._dropEnterGlobal, this);
        // drop.on('drop:over', this._handleScroll, this);
    },

// -- Event handlers -----------------------------------------------------------

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleStart", 85);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 86);
var drag = e.target;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 88);
var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 90);
drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 91);
drag.get('node').addClass('libbit-dd-drag-placeholder');
    },

    _dropEnterGlobal: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnterGlobal", 94);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 95);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 96);
var drag = Y.DD.DDM.activeDrag,
                dragNode = drag.get('dragNode'),
                obj  = drag.get('data'),
                container,
                templateItem;

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 102);
if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {
                // Bind to the document's end drag handler
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 104);
drag.on('drag:end', this._handleEnd, this);

                // Render the item
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 107);
var templateItem = new Y.TB.TemplateItem({
                    asset: obj
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 111);
var tiView = new Y.TB.TemplateItemView({
                    model: templateItem
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 115);
tiView.templateModel = this.get('model');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 117);
container = tiView.render().get('container');

                // FIXME: The context menu doesn't get bound from tiView.render() for some reason
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 120);
container.plug(Y.Libbit.ContextMenu, {
                    content: [
                        { title: 'Remove from template', id: 'removeTemplateItem' },
                        { title: '-' },
                        { title: 'Properties', id: 'templateItemProperties', disabled: true }
                    ],
                    bubbleTarget: tiView
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 129);
var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 131);
container.addClass('libbit-dd-drag-placeholder');

                // Store a reference to the model so we can access it from the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 134);
container.setData({ model: templateItem });

                // Cleanup the old node to prevent orphans in the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 137);
drag.get('node').remove();
                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 139);
drag.set('node', container);

                // Update the dragNode
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 142);
Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);
            }
        }
    },

// -- Hover Event handlers -----------------------------------------------------------

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseEnter", 152);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 153);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 155);
if (target.ancestor('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 156);
target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 159);
if (target.one('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 160);
target.addClass('libbit-dd-drag-hover-disabled');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 162);
target.addClass('libbit-dd-drag-hover');
        }
    },

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseLeave: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseLeave", 169);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 170);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 172);
if (target.hasClass('libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 173);
target.removeClass('libbit-dd-drag-hover');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 176);
if (target.ancestor('.libbit-dd-drag-hover-disabled')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 177);
target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 183);
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["view", "libbit-dd-css"]});
