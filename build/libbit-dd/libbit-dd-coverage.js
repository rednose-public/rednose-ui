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
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].code=["YUI.add('libbit-dd', function (Y, NAME) {","","var DD, BubbleTarget;","","BubbleTarget = Y.Base.create('bubbleTarget', Y.Base, [], {});","","// NOT GENERIC YET: Dropenterglobal morphing","DD = Y.Base.create('dd', Y.View, [], {","","    /**","     * Hover events, handling complex, stacked hovers","     */","    events: {","        '.libbit-dd-drag': {","            mouseenter: '_handleMouseEnter',","            mouseleave: '_handleMouseLeave'","        }","    },","","    initializer: function() {","        // Set the cursor for drag proxies.","        Y.DD.DDM.set('dragCursor', 'default');","","        this.on('drag:start', this._handleStart, this);","        this.on('drag:end', this._handleEnd, this);","","        this.on('drop:over', this._dropOver, this);","        this.on('drop:enter', this._dropEnter, this);","","        // Pass the event through a bubble target, so we get the first event in the chain","        this.bubbleTarget = new BubbleTarget();","        this.bubbleTarget.addTarget(this);","        this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);","    },","","    _libbitDropHit: function (e) {","        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble","        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode","        // of the drag node being null.","        if (e.drag.get('node').get('parentNode') === null) {","            e.stopImmediatePropagation();","        }","    },","","// -- Node setup ---------------------------------------------------------------","","    /**","     * Create a new drag instance from a DOM node.","     */","    createDrag: function (node, groups) {","        node.addClass('libbit-dd-drag');","","        var dd = new Y.DD.Drag({","            node         : node,","            groups: groups,","            bubbleTargets: this,","            target       : true","        });","","        dd.plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    /**","     * Create a new drop instance from a DOM node.","     */","    createDrop: function (node, groups) {","        node.addClass('libbit-dd-drop');","","        var dd = new Y.DD.Drop({","            node        : node,","            //padding     : '20 0',","            groups: groups,","            bubbleTargets: this","        });","","        return dd;","    },","","    bindGlobalDrop: function (groups) {","        var container = this.get('container'),","            drop;","","        container.addClass('libbit-global-drop');","","        // Global drop object.","        drop = new Y.DD.Drop({","            node   : container,","            groups: groups,","            bubbleTargets: this.bubbleTarget","            // bubbleTargets: this","        });","","        // Bind the global drop object.","        drop.on('drop:enter', this._dropEnterGlobal, this);","        drop.on('drop:over', this._handleScroll, this);","    },","","// -- Event handlers -----------------------------------------------------------","","    _handleStart: function (e) {","        var drag = e.target;","","        var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');","","        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));","        drag.get('node').addClass('libbit-dd-drag-placeholder');","    },","","    /**","     * Handles the end of a drag event.","     */","    _handleEnd: function (e) {","        var drag = e.target;","","        // Remove the original event bindings and connect them to this object.","        Y.Array.each(drag.getTargets(), function (n) {","            drag.removeTarget(n);","        });","","        drag.addTarget(this);","","        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.","        drag.detach('drag:end', this._handleEnd);","","        // Reprep since we (potentially) have changed the drag node","        drag._unprep();","        drag._prep();","","        drag.get('node').addClass('libbit-dd-drag');","","        drag.get('node').removeClass('libbit-dd-drag-placeholder');","        drag.get('dragNode').set('innerHTML', '');","    },","","    /**","     * Triggered when a drag item is dragged over a drop item","     */","    _dropOver: function (e) {","        var drop = e.drop.get('node'),","            drag = e.drag.get('node');","","        if (drop.hasClass('libbit-global-drop')) {","            return;","        }","","        if (drop.get('tagName').toLowerCase() !== 'li') {","            if (!drop.contains(drag)) {","                drop.appendChild(drag);","                Y.Lang.later(50, Y, function () {","                    Y.DD.DDM.syncActiveShims(true);","                });","            }","        }","    },","","    /**","     * Handles dragging into a drop region.","     */","    _dropEnter: function (e) {","        var drag = e.drag,","            drop = e.drop,","            dragNode = drag.get('node'),","            dropNode = drop.get('node'),","            append = false,","            //padding = 5,","            padding = 10,","            xy = drag.mouseXY,","            region = drop.region,","            middle1 = region.top + ((region.bottom - region.top) / 2),","            middle2 = region.left + ((region.right - region.left) / 2),","            dir = false,","            dir1 = false,","            dir2 = false,","            next,","            ul;","","        if (dropNode.hasClass('libbit-global-drop')) {","            return;","        }","","        // Resize the proxy if necessary","        if (dropNode.get('tagName').toLowerCase() !== 'ul') {","            // Traverse up to find the ul node","            ul = dropNode.ancestor('ul');","        } else {","            ul = dropNode;","        }","","        if (ul) {","            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging","            var node = Y.DD.DDM.activeDrag.get('dragNode');","            var width = ul.get('offsetWidth');","","            Y.Libbit.Anim.width(node, width);","        }","","        // Insert the placeholder at the correct index","        if ((xy[1] < (region.top + padding))) {","            dir1 = 'top';","        }","","        if ((region.bottom - padding) < xy[1]) {","            dir1 = 'bottom';","        }","","        if ((region.right - padding) < xy[0]) {","            dir2 = 'right';","        }","","        if ((xy[0] < (region.left + padding))) {","            dir2 = 'left';","        }","","        dir = dir2;","","        if (dir2 === false) {","            dir = dir1;","        }","","        switch (dir) {","            case 'top':","                next = dropNode.get('nextSibling');","                if (next) {","                    dropNode = next;","                } else {","                    append = true;","                }","                break;","","            case 'bottom':","                break;","","            case 'right':","            case 'left':","                break;","        }","","        if ((dropNode !== null) && dir) {","            if (dropNode && dropNode.get('parentNode')) {","                if (!append) {","                    dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                } else {","                    dropNode.get('parentNode').appendChild(dragNode);","                }","            }","        }","    },","","    _dropEnterGlobal: function (e) {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                dragNode = drag.get('dragNode'),","                obj  = drag.get('data'),","                container,","                templateItem;","","            if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {","                // Bind to the document's end drag handler","                drag.on('drag:end', this._handleEnd, this);","","                // Render the item","                var templateItem = new Y.TB.TemplateItem({","                    asset: obj","                });","","                var tiView = new Y.TB.TemplateItemView({","                    model: templateItem","                });","","                tiView.templateModel = this.get('model');","","                container = tiView.render().get('container');","","                // FIXME: The context menu doesn't get bound from tiView.render() for some reason","                container.plug(Y.Libbit.ContextMenu, {","                    content: [","                        { title: 'Remove from template', id: 'removeTemplateItem' },","                        { title: '-' },","                        { title: 'Properties', id: 'templateItemProperties', disabled: true }","                    ],","                    bubbleTarget: tiView","                });","","                var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');","","                container.addClass('libbit-dd-drag-placeholder');","","                // Store a reference to the model so we can access it from the DOM","                container.setData({ model: templateItem });","","                // Cleanup the old node to prevent orphans in the DOM","                drag.get('node').remove();","                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)","                drag.set('node', container);","","                // Update the dragNode","                Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);","            }","        }","    },","","// -- Hover Event handlers -----------------------------------------------------------","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseEnter: function (e) {","        var target = e.currentTarget;","","        if (target.ancestor('.libbit-dd-drag-hover')) {","            target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');","        }","","        if (target.one('.libbit-dd-drag-hover')) {","            target.addClass('libbit-dd-drag-hover-disabled');","        } else {","            target.addClass('libbit-dd-drag-hover');","        }","    },","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseLeave: function (e) {","        var target = e.currentTarget;","","        if (target.hasClass('libbit-dd-drag-hover')) {","            target.removeClass('libbit-dd-drag-hover');","        }","","        if (target.ancestor('.libbit-dd-drag-hover-disabled')) {","            target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');","        }","    },","","// -- Scroll handler for the global drop region --------------------------------------","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handleScroll: function (e) {","        var dropNode    = e.drop.get('node'),","            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),","            parent      = dropNode.get('offsetParent'),","            // nodeOffsetY = dropNode.get('offsetTop'),","            // nodeHeight  = dropNode.get('offsetHeight'),","            nodeHeight  = Y.one('#main').get('offsetHeight'),","            relativeY,","            node,","            anim,","            dir;","","        var buffer = 30;","        var delay = 235;","        var marginTop = 40;","","        if (dragY < prevY) {","            dir = 'up';","        } else {","            dir = 'down';","        }","","        // GLOBAL","        prevY = dragY;","","        if (dragY - marginTop < buffer && dir === 'up') {","            // Scroll up","            node = parent;","            anim = new Y.Anim({","                node: node,","                to: {","                    scroll: function(node) {","                        return [node.get('scrollTop') + node.get('offsetHeight'), 0];","                    }","                },","                easing: Y.Easing.easeOut","            });","","            anim.run();","        }","","        if (dragY - marginTop > nodeHeight - buffer && dir === 'down') {","            // Scroll down","            node = parent;","            anim = new Y.Anim({","                node: node,","                to: {","                    scroll: function(node) {","                        return [0, node.get('scrollTop') + node.get('offsetHeight')];","                    }","                },","                easing: Y.Easing.easeOut","            });","","            anim.run();","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DD = DD;","","","}, '1.0.0', {\"requires\": [\"view\", \"libbit-dd-css\"]});"];
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].lines = {"1":0,"3":0,"5":0,"8":0,"22":0,"24":0,"25":0,"27":0,"28":0,"31":0,"32":0,"33":0,"40":0,"41":0,"51":0,"53":0,"60":0,"65":0,"72":0,"74":0,"81":0,"85":0,"88":0,"91":0,"99":0,"100":0,"106":0,"108":0,"110":0,"111":0,"118":0,"121":0,"122":0,"125":0,"128":0,"131":0,"132":0,"134":0,"136":0,"137":0,"144":0,"147":0,"148":0,"151":0,"152":0,"153":0,"154":0,"155":0,"165":0,"182":0,"183":0,"187":0,"189":0,"191":0,"194":0,"196":0,"197":0,"199":0,"203":0,"204":0,"207":0,"208":0,"211":0,"212":0,"215":0,"216":0,"219":0,"221":0,"222":0,"225":0,"227":0,"228":0,"229":0,"231":0,"233":0,"236":0,"240":0,"243":0,"244":0,"245":0,"246":0,"248":0,"255":0,"256":0,"262":0,"264":0,"267":0,"271":0,"275":0,"277":0,"280":0,"289":0,"291":0,"294":0,"297":0,"299":0,"302":0,"313":0,"315":0,"316":0,"319":0,"320":0,"322":0,"330":0,"332":0,"333":0,"336":0,"337":0,"347":0,"358":0,"359":0,"360":0,"362":0,"363":0,"365":0,"369":0,"371":0,"373":0,"374":0,"378":0,"384":0,"387":0,"389":0,"390":0,"394":0,"400":0,"406":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].functions = {"initializer:20":0,"_libbitDropHit:36":0,"createDrag:50":0,"createDrop:71":0,"bindGlobalDrop:84":0,"_handleStart:105":0,"(anonymous 2):121":0,"_handleEnd:117":0,"(anonymous 3):154":0,"_dropOver:143":0,"_dropEnter:164":0,"_dropEnterGlobal:254":0,"_handleMouseEnter:312":0,"_handleMouseLeave:329":0,"scroll:377":0,"scroll:393":0,"_handleScroll:346":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredLines = 127;
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredFunctions = 18;
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 1);
YUI.add('libbit-dd', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 3);
var DD, BubbleTarget;

_yuitest_coverline("build/libbit-dd/libbit-dd.js", 5);
BubbleTarget = Y.Base.create('bubbleTarget', Y.Base, [], {});

// NOT GENERIC YET: Dropenterglobal morphing
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 8);
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
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "initializer", 20);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 22);
Y.DD.DDM.set('dragCursor', 'default');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 24);
this.on('drag:start', this._handleStart, this);
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 25);
this.on('drag:end', this._handleEnd, this);

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 27);
this.on('drop:over', this._dropOver, this);
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 28);
this.on('drop:enter', this._dropEnter, this);

        // Pass the event through a bubble target, so we get the first event in the chain
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 31);
this.bubbleTarget = new BubbleTarget();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 32);
this.bubbleTarget.addTarget(this);
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 33);
this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);
    },

    _libbitDropHit: function (e) {
        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble
        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode
        // of the drag node being null.
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_libbitDropHit", 36);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 40);
if (e.drag.get('node').get('parentNode') === null) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 41);
e.stopImmediatePropagation();
        }
    },

// -- Node setup ---------------------------------------------------------------

    /**
     * Create a new drag instance from a DOM node.
     */
    createDrag: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrag", 50);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 51);
node.addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 53);
var dd = new Y.DD.Drag({
            node         : node,
            groups: groups,
            bubbleTargets: this,
            target       : true
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 60);
dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 65);
return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrop", 71);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 72);
node.addClass('libbit-dd-drop');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 74);
var dd = new Y.DD.Drop({
            node        : node,
            //padding     : '20 0',
            groups: groups,
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 81);
return dd;
    },

    bindGlobalDrop: function (groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "bindGlobalDrop", 84);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 85);
var container = this.get('container'),
            drop;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 88);
container.addClass('libbit-global-drop');

        // Global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 91);
drop = new Y.DD.Drop({
            node   : container,
            groups: groups,
            bubbleTargets: this.bubbleTarget
            // bubbleTargets: this
        });

        // Bind the global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 99);
drop.on('drop:enter', this._dropEnterGlobal, this);
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 100);
drop.on('drop:over', this._handleScroll, this);
    },

// -- Event handlers -----------------------------------------------------------

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleStart", 105);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 106);
var drag = e.target;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 108);
var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 110);
drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 111);
drag.get('node').addClass('libbit-dd-drag-placeholder');
    },

    /**
     * Handles the end of a drag event.
     */
    _handleEnd: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleEnd", 117);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 118);
var drag = e.target;

        // Remove the original event bindings and connect them to this object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 121);
Y.Array.each(drag.getTargets(), function (n) {
            _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 2)", 121);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 122);
drag.removeTarget(n);
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 125);
drag.addTarget(this);

        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 128);
drag.detach('drag:end', this._handleEnd);

        // Reprep since we (potentially) have changed the drag node
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 131);
drag._unprep();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 132);
drag._prep();

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 134);
drag.get('node').addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 136);
drag.get('node').removeClass('libbit-dd-drag-placeholder');
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 137);
drag.get('dragNode').set('innerHTML', '');
    },

    /**
     * Triggered when a drag item is dragged over a drop item
     */
    _dropOver: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropOver", 143);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 144);
var drop = e.drop.get('node'),
            drag = e.drag.get('node');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 147);
if (drop.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 148);
return;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 151);
if (drop.get('tagName').toLowerCase() !== 'li') {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 152);
if (!drop.contains(drag)) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 153);
drop.appendChild(drag);
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 154);
Y.Lang.later(50, Y, function () {
                    _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 3)", 154);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 155);
Y.DD.DDM.syncActiveShims(true);
                });
            }
        }
    },

    /**
     * Handles dragging into a drop region.
     */
    _dropEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnter", 164);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 165);
var drag = e.drag,
            drop = e.drop,
            dragNode = drag.get('node'),
            dropNode = drop.get('node'),
            append = false,
            //padding = 5,
            padding = 10,
            xy = drag.mouseXY,
            region = drop.region,
            middle1 = region.top + ((region.bottom - region.top) / 2),
            middle2 = region.left + ((region.right - region.left) / 2),
            dir = false,
            dir1 = false,
            dir2 = false,
            next,
            ul;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 182);
if (dropNode.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 183);
return;
        }

        // Resize the proxy if necessary
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 187);
if (dropNode.get('tagName').toLowerCase() !== 'ul') {
            // Traverse up to find the ul node
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 189);
ul = dropNode.ancestor('ul');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 191);
ul = dropNode;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 194);
if (ul) {
            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 196);
var node = Y.DD.DDM.activeDrag.get('dragNode');
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 197);
var width = ul.get('offsetWidth');

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 199);
Y.Libbit.Anim.width(node, width);
        }

        // Insert the placeholder at the correct index
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 203);
if ((xy[1] < (region.top + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 204);
dir1 = 'top';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 207);
if ((region.bottom - padding) < xy[1]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 208);
dir1 = 'bottom';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 211);
if ((region.right - padding) < xy[0]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 212);
dir2 = 'right';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 215);
if ((xy[0] < (region.left + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 216);
dir2 = 'left';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 219);
dir = dir2;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 221);
if (dir2 === false) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 222);
dir = dir1;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 225);
switch (dir) {
            case 'top':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 227);
next = dropNode.get('nextSibling');
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 228);
if (next) {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 229);
dropNode = next;
                } else {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 231);
append = true;
                }
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 233);
break;

            case 'bottom':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 236);
break;

            case 'right':
            case 'left':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 240);
break;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 243);
if ((dropNode !== null) && dir) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 244);
if (dropNode && dropNode.get('parentNode')) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 245);
if (!append) {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 246);
dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                } else {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 248);
dropNode.get('parentNode').appendChild(dragNode);
                }
            }
        }
    },

    _dropEnterGlobal: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnterGlobal", 254);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 255);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 256);
var drag = Y.DD.DDM.activeDrag,
                dragNode = drag.get('dragNode'),
                obj  = drag.get('data'),
                container,
                templateItem;

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 262);
if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {
                // Bind to the document's end drag handler
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 264);
drag.on('drag:end', this._handleEnd, this);

                // Render the item
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 267);
var templateItem = new Y.TB.TemplateItem({
                    asset: obj
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 271);
var tiView = new Y.TB.TemplateItemView({
                    model: templateItem
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 275);
tiView.templateModel = this.get('model');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 277);
container = tiView.render().get('container');

                // FIXME: The context menu doesn't get bound from tiView.render() for some reason
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 280);
container.plug(Y.Libbit.ContextMenu, {
                    content: [
                        { title: 'Remove from template', id: 'removeTemplateItem' },
                        { title: '-' },
                        { title: 'Properties', id: 'templateItemProperties', disabled: true }
                    ],
                    bubbleTarget: tiView
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 289);
var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 291);
container.addClass('libbit-dd-drag-placeholder');

                // Store a reference to the model so we can access it from the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 294);
container.setData({ model: templateItem });

                // Cleanup the old node to prevent orphans in the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 297);
drag.get('node').remove();
                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 299);
drag.set('node', container);

                // Update the dragNode
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 302);
Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);
            }
        }
    },

// -- Hover Event handlers -----------------------------------------------------------

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseEnter", 312);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 313);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 315);
if (target.ancestor('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 316);
target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 319);
if (target.one('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 320);
target.addClass('libbit-dd-drag-hover-disabled');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 322);
target.addClass('libbit-dd-drag-hover');
        }
    },

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseLeave: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseLeave", 329);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 330);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 332);
if (target.hasClass('libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 333);
target.removeClass('libbit-dd-drag-hover');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 336);
if (target.ancestor('.libbit-dd-drag-hover-disabled')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 337);
target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');
        }
    },

// -- Scroll handler for the global drop region --------------------------------------

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleScroll: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleScroll", 346);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 347);
var dropNode    = e.drop.get('node'),
            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),
            parent      = dropNode.get('offsetParent'),
            // nodeOffsetY = dropNode.get('offsetTop'),
            // nodeHeight  = dropNode.get('offsetHeight'),
            nodeHeight  = Y.one('#main').get('offsetHeight'),
            relativeY,
            node,
            anim,
            dir;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 358);
var buffer = 30;
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 359);
var delay = 235;
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 360);
var marginTop = 40;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 362);
if (dragY < prevY) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 363);
dir = 'up';
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 365);
dir = 'down';
        }

        // GLOBAL
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 369);
prevY = dragY;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 371);
if (dragY - marginTop < buffer && dir === 'up') {
            // Scroll up
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 373);
node = parent;
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 374);
anim = new Y.Anim({
                node: node,
                to: {
                    scroll: function(node) {
                        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "scroll", 377);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 378);
return [node.get('scrollTop') + node.get('offsetHeight'), 0];
                    }
                },
                easing: Y.Easing.easeOut
            });

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 384);
anim.run();
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 387);
if (dragY - marginTop > nodeHeight - buffer && dir === 'down') {
            // Scroll down
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 389);
node = parent;
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 390);
anim = new Y.Anim({
                node: node,
                to: {
                    scroll: function(node) {
                        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "scroll", 393);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 394);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
                    }
                },
                easing: Y.Easing.easeOut
            });

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 400);
anim.run();
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 406);
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["view", "libbit-dd-css"]});
