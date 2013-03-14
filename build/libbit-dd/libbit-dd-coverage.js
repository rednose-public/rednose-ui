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
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].code=["YUI.add('libbit-dd', function (Y, NAME) {","","var DD, BubbleTarget;","","BubbleTarget = Y.Base.create('bubbleTarget', Y.Base, [], {});","","// NOT GENERIC YET: Dropenterglobal morphing","DD = Y.Base.create('dd', Y.View, [], {","","    dropHighlight: false,","","    /**","     * Hover events, handling complex, stacked hovers","     */","    events: {","        '.libbit-dd-drag': {","            mouseenter: '_handleMouseEnter',","            mouseleave: '_handleMouseLeave'","        }","    },","","    initializer: function() {","        // Set the cursor for drag proxies.","        Y.DD.DDM.set('dragCursor', 'default');","","        // Pass the event through a bubble target, so we get the first event in the chain","        this.bubbleTarget = new BubbleTarget();","        this.bubbleTarget.addTarget(this);","        this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);","    },","","    _libbitDropHit: function (e) {","        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble","        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode","        // of the drag node being null.","        if (e.drag.get('node').get('parentNode') === null) {","            e.stopImmediatePropagation();","        }","    },","","// -- Node setup ---------------------------------------------------------------","","    /**","     * Create a new drag instance from a DOM node.","     */","    createDrag: function (node, groups) {","        node.addClass('libbit-dd-drag');","","        var dd = new Y.DD.Drag({","            node         : node,","            groups: groups,","            bubbleTargets: this,","            target       : true","        });","","        dd.plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    /**","     * Create a new drop instance from a DOM node.","     */","    createDrop: function (node, groups) {","        node.addClass('libbit-dd-drop');","","        var dd = new Y.DD.Drop({","            node        : node,","            //padding     : '20 0',","            groups: groups,","            bubbleTargets: this","        });","","        return dd;","    },","","    bindGlobalDrop: function (groups, container) {","        var drop;","","        container = container || this.get('container'),","","        container.addClass('libbit-global-drop');","","        // Global drop object.","        drop = new Y.DD.Drop({","            node   : container,","            groups: groups,","            bubbleTargets: this.bubbleTarget","            // bubbleTargets: this","        });","","        // Bind the global drop object.","        drop.on('drop:enter', this._dropEnterGlobal, this);","    },","","// -- Event handlers -----------------------------------------------------------","","    _handleStart: function (e) {","        var drag = e.target;","        var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');","","        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));","        drag.get('node').addClass('libbit-dd-drag-placeholder');","","        drag.get('node').setStyle('visibility', 'hidden');","    },","","    /**","     * Handles the end of a drag event.","     */","    _handleEnd: function (e) {","        var drag = e.target;","","        // Remove the original event bindings and connect them to this object.","        Y.Array.each(drag.getTargets(), function (n) {","            drag.removeTarget(n);","        });","","        drag.addTarget(this);","","        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.","        drag.detach('drag:end', this._handleEnd);","","        // Reprep since we (potentially) have changed the drag node","        drag._unprep();","        drag._prep();","","        drag.get('node').addClass('libbit-dd-drag');","","        drag.get('node').removeClass('libbit-dd-drag-placeholder');","        drag.get('dragNode').set('innerHTML', '');","","        drag.get('node').setStyle('visibility', '');","    },","","    /**","     * Triggered when a drag item is dragged over a drop item","     */","    _dropOver: function (e) {","        var drop = e.drop.get('node'),","            drag = e.drag.get('node');","","        if (drop.hasClass('libbit-global-drop')) {","            return;","        }","","        if (drop.get('tagName').toLowerCase() !== 'li') {","            if (!drop.contains(drag)) {","                drop.appendChild(drag);","                Y.DD.DDM.syncActiveShims(true);","            }","        }","    },","","    /**","     * Handles dragging into a drop region.","     */","    _dropEnter: function (e) {","        if (!e.drag || !e.drop || (e.drop !== e.target)) {","            return false;","        }","        if (e.drop.get('node').get('tagName').toLowerCase() === 'li') {","            this._moveItem(e.drag, e.drop);","        }","    },","","    _moveItem: function(drag, drop) {","        var dragNode = drag.get('node'),","            dropNode = drop.get('node'),","            append = false,","            //padding = 5,","            padding = 10,","            xy = drag.mouseXY,","            region = drop.region,","            middle1 = region.top + ((region.bottom - region.top) / 2),","            middle2 = region.left + ((region.right - region.left) / 2),","            dir = false,","            dir1 = false,","            dir2 = false,","            next,","            ul;","","        if (dropNode.hasClass('libbit-global-drop')) {","            return;","        }","","        // Resize the proxy if necessary","        if (dropNode.get('tagName').toLowerCase() !== 'ul') {","            // Traverse up to find the ul node","            ul = dropNode.ancestor('ul');","        } else {","            ul = dropNode;","        }","","        if (ul) {","            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging","            var node = Y.DD.DDM.activeDrag.get('dragNode');","            var width = ul.get('offsetWidth');","","            Y.Libbit.Anim.width(node, width);","        }","","        // Insert the placeholder at the correct index","        if ((xy[1] < (region.top + padding))) {","            dir1 = 'top';","        }","","        if ((region.bottom - padding) < xy[1]) {","            dir1 = 'bottom';","        }","","        if ((region.right - padding) < xy[0]) {","            dir2 = 'right';","        }","","        if ((xy[0] < (region.left + padding))) {","            dir2 = 'left';","        }","","        dir = dir2;","","        if (dir2 === false) {","            dir = dir1;","        }","","        switch (dir) {","            case 'top':","                // next = dropNode.get('nextSibling');","                // if (next) {","                //     dropNode = next;","                // } else {","                //     append = true;","                // }","                break;","","            case 'bottom':","                break;","","            case 'right':","            case 'left':","                break;","        }","","        if ((dropNode !== null) && dir) {","            if (dropNode && dropNode.get('parentNode')) {","                if (!append) {","                    // var clone = dragNode.cloneNode(true);","                    var clone = Y.Node.create(dragNode.get('innerHTML'));","","                    if (dir === 'top') {","                        dropNode.get('parentNode').insertBefore(clone, dragNode);","","                        if (dropNode.get('previousSibling') && dropNode.get('nextSibling')) {","                            dropNode = dropNode.get('nextSibling');","                        }","","                        if (dropNode.get('nextSibling')) {","                            dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                        } else {","                            dropNode.get('parentNode').appendChild(dragNode);","                        }","                    } else {","                        dropNode.get('parentNode').insertBefore(clone, dragNode);","                        dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                    }","","                    var height = dragNode.get('scrollHeight');","","                    dragNode.setStyle('height', 0);","","                    clone.setStyle('overflow', 'hidden');","","                    clone.setStyle('visibility', 'hidden');","","                    var anim = new Y.Anim({","                        node: dragNode,","                        to: {","                            height: height","                        },","                        duration: '.25',","                        easing: Y.Easing.easeOut","                    });","                    anim.run();","","                    var anim2 = new Y.Anim({","                        node: clone,","                        to: {","                            height: 0","                        },","                        duration: '.25',","                        easing: Y.Easing.easeOut","                    });","                    anim2.on('end', function () {","                        clone.remove();","                    });","                    anim2.run();","","                    // dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                } else {","                    dropNode.get('parentNode').appendChild(dragNode);","                }","                //Resync all the targets because something moved.","                Y.DD.DDM.syncActiveShims(true);","            }","        }","    },","","    _dropEnterGlobal: function (e) {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                dragNode = drag.get('dragNode'),","                obj  = drag.get('data'),","                container,","                templateItem;","","            if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {","                // Bind to the document's end drag handler","                drag.on('drag:end', this._handleEnd, this);","","                // Render the item","                var templateItem = new Y.TB.TemplateItem({","                    asset: obj","                });","","                var tiView = new Y.TB.TemplateItemView({","                    model: templateItem","                });","","                tiView.templateModel = this.get('model');","","                container = tiView.render().get('container');","","                // FIXME: The context menu doesn't get bound from tiView.render() for some reason","                container.plug(Y.Libbit.ContextMenu, {","                    content: [","                        { title: 'Remove from template', id: 'removeTemplateItem' },","                        { title: '-' },","                        { title: 'Properties', id: 'templateItemProperties', disabled: true }","                    ],","                    bubbleTarget: tiView","                });","","                var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');","","                container.addClass('libbit-dd-drag-placeholder');","","                // Store a reference to the model so we can access it from the DOM","                container.setData({ model: templateItem });","","                // Cleanup the old node to prevent orphans in the DOM","                drag.get('node').remove();","                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)","                drag.set('node', container);","","                // Update the dragNode","                Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);","            }","        }","    },","","// -- Hover Event handlers -----------------------------------------------------------","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseEnter: function (e) {","        var target = e.currentTarget;","","        if (target.ancestor('.libbit-dd-drag-hover')) {","            target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');","        }","","        if (target.one('.libbit-dd-drag-hover')) {","            target.addClass('libbit-dd-drag-hover-disabled');","        } else {","            target.addClass('libbit-dd-drag-hover');","        }","    },","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseLeave: function (e) {","        var target = e.currentTarget;","","        if (target.hasClass('libbit-dd-drag-hover')) {","            target.removeClass('libbit-dd-drag-hover');","        }","","        if (target.ancestor('.libbit-dd-drag-hover-disabled')) {","            target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-anim\", \"libbit-dd-css\", \"view\"]});"];
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].lines = {"1":0,"3":0,"5":0,"8":0,"24":0,"27":0,"28":0,"29":0,"36":0,"37":0,"47":0,"49":0,"56":0,"61":0,"68":0,"70":0,"77":0,"81":0,"83":0,"88":0,"96":0,"102":0,"103":0,"105":0,"106":0,"108":0,"115":0,"118":0,"119":0,"122":0,"125":0,"128":0,"129":0,"131":0,"133":0,"134":0,"136":0,"143":0,"146":0,"147":0,"150":0,"151":0,"152":0,"153":0,"162":0,"163":0,"165":0,"166":0,"171":0,"186":0,"187":0,"191":0,"193":0,"195":0,"198":0,"200":0,"201":0,"203":0,"207":0,"208":0,"211":0,"212":0,"215":0,"216":0,"219":0,"220":0,"223":0,"225":0,"226":0,"229":0,"237":0,"240":0,"244":0,"247":0,"248":0,"249":0,"251":0,"253":0,"254":0,"256":0,"257":0,"260":0,"261":0,"263":0,"266":0,"267":0,"270":0,"272":0,"274":0,"276":0,"278":0,"286":0,"288":0,"296":0,"297":0,"299":0,"303":0,"306":0,"312":0,"313":0,"319":0,"321":0,"324":0,"328":0,"332":0,"334":0,"337":0,"346":0,"348":0,"351":0,"354":0,"356":0,"359":0,"370":0,"372":0,"373":0,"376":0,"377":0,"379":0,"387":0,"389":0,"390":0,"393":0,"394":0,"400":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].functions = {"initializer:22":0,"_libbitDropHit:32":0,"createDrag:46":0,"createDrop:67":0,"bindGlobalDrop:80":0,"_handleStart:101":0,"(anonymous 2):118":0,"_handleEnd:114":0,"_dropOver:142":0,"_dropEnter:161":0,"(anonymous 3):296":0,"_moveItem:170":0,"_dropEnterGlobal:311":0,"_handleMouseEnter:369":0,"_handleMouseLeave:386":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredLines = 125;
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredFunctions = 16;
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

    dropHighlight: false,

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
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "initializer", 22);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 24);
Y.DD.DDM.set('dragCursor', 'default');

        // Pass the event through a bubble target, so we get the first event in the chain
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 27);
this.bubbleTarget = new BubbleTarget();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 28);
this.bubbleTarget.addTarget(this);
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 29);
this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);
    },

    _libbitDropHit: function (e) {
        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble
        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode
        // of the drag node being null.
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_libbitDropHit", 32);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 36);
if (e.drag.get('node').get('parentNode') === null) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 37);
e.stopImmediatePropagation();
        }
    },

// -- Node setup ---------------------------------------------------------------

    /**
     * Create a new drag instance from a DOM node.
     */
    createDrag: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrag", 46);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 47);
node.addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 49);
var dd = new Y.DD.Drag({
            node         : node,
            groups: groups,
            bubbleTargets: this,
            target       : true
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 56);
dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 61);
return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrop", 67);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 68);
node.addClass('libbit-dd-drop');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 70);
var dd = new Y.DD.Drop({
            node        : node,
            //padding     : '20 0',
            groups: groups,
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 77);
return dd;
    },

    bindGlobalDrop: function (groups, container) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "bindGlobalDrop", 80);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 81);
var drop;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 83);
container = container || this.get('container'),

        container.addClass('libbit-global-drop');

        // Global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 88);
drop = new Y.DD.Drop({
            node   : container,
            groups: groups,
            bubbleTargets: this.bubbleTarget
            // bubbleTargets: this
        });

        // Bind the global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 96);
drop.on('drop:enter', this._dropEnterGlobal, this);
    },

// -- Event handlers -----------------------------------------------------------

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleStart", 101);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 102);
var drag = e.target;
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 103);
var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 105);
drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 106);
drag.get('node').addClass('libbit-dd-drag-placeholder');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 108);
drag.get('node').setStyle('visibility', 'hidden');
    },

    /**
     * Handles the end of a drag event.
     */
    _handleEnd: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleEnd", 114);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 115);
var drag = e.target;

        // Remove the original event bindings and connect them to this object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 118);
Y.Array.each(drag.getTargets(), function (n) {
            _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 2)", 118);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 119);
drag.removeTarget(n);
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 122);
drag.addTarget(this);

        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 125);
drag.detach('drag:end', this._handleEnd);

        // Reprep since we (potentially) have changed the drag node
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 128);
drag._unprep();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 129);
drag._prep();

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 131);
drag.get('node').addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 133);
drag.get('node').removeClass('libbit-dd-drag-placeholder');
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 134);
drag.get('dragNode').set('innerHTML', '');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 136);
drag.get('node').setStyle('visibility', '');
    },

    /**
     * Triggered when a drag item is dragged over a drop item
     */
    _dropOver: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropOver", 142);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 143);
var drop = e.drop.get('node'),
            drag = e.drag.get('node');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 146);
if (drop.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 147);
return;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 150);
if (drop.get('tagName').toLowerCase() !== 'li') {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 151);
if (!drop.contains(drag)) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 152);
drop.appendChild(drag);
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 153);
Y.DD.DDM.syncActiveShims(true);
            }
        }
    },

    /**
     * Handles dragging into a drop region.
     */
    _dropEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnter", 161);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 162);
if (!e.drag || !e.drop || (e.drop !== e.target)) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 163);
return false;
        }
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 165);
if (e.drop.get('node').get('tagName').toLowerCase() === 'li') {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 166);
this._moveItem(e.drag, e.drop);
        }
    },

    _moveItem: function(drag, drop) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_moveItem", 170);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 171);
var dragNode = drag.get('node'),
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

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 186);
if (dropNode.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 187);
return;
        }

        // Resize the proxy if necessary
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 191);
if (dropNode.get('tagName').toLowerCase() !== 'ul') {
            // Traverse up to find the ul node
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 193);
ul = dropNode.ancestor('ul');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 195);
ul = dropNode;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 198);
if (ul) {
            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 200);
var node = Y.DD.DDM.activeDrag.get('dragNode');
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 201);
var width = ul.get('offsetWidth');

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 203);
Y.Libbit.Anim.width(node, width);
        }

        // Insert the placeholder at the correct index
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 207);
if ((xy[1] < (region.top + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 208);
dir1 = 'top';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 211);
if ((region.bottom - padding) < xy[1]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 212);
dir1 = 'bottom';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 215);
if ((region.right - padding) < xy[0]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 216);
dir2 = 'right';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 219);
if ((xy[0] < (region.left + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 220);
dir2 = 'left';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 223);
dir = dir2;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 225);
if (dir2 === false) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 226);
dir = dir1;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 229);
switch (dir) {
            case 'top':
                // next = dropNode.get('nextSibling');
                // if (next) {
                //     dropNode = next;
                // } else {
                //     append = true;
                // }
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 237);
break;

            case 'bottom':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 240);
break;

            case 'right':
            case 'left':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 244);
break;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 247);
if ((dropNode !== null) && dir) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 248);
if (dropNode && dropNode.get('parentNode')) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 249);
if (!append) {
                    // var clone = dragNode.cloneNode(true);
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 251);
var clone = Y.Node.create(dragNode.get('innerHTML'));

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 253);
if (dir === 'top') {
                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 254);
dropNode.get('parentNode').insertBefore(clone, dragNode);

                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 256);
if (dropNode.get('previousSibling') && dropNode.get('nextSibling')) {
                            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 257);
dropNode = dropNode.get('nextSibling');
                        }

                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 260);
if (dropNode.get('nextSibling')) {
                            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 261);
dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                        } else {
                            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 263);
dropNode.get('parentNode').appendChild(dragNode);
                        }
                    } else {
                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 266);
dropNode.get('parentNode').insertBefore(clone, dragNode);
                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 267);
dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                    }

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 270);
var height = dragNode.get('scrollHeight');

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 272);
dragNode.setStyle('height', 0);

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 274);
clone.setStyle('overflow', 'hidden');

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 276);
clone.setStyle('visibility', 'hidden');

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 278);
var anim = new Y.Anim({
                        node: dragNode,
                        to: {
                            height: height
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut
                    });
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 286);
anim.run();

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 288);
var anim2 = new Y.Anim({
                        node: clone,
                        to: {
                            height: 0
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut
                    });
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 296);
anim2.on('end', function () {
                        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 3)", 296);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 297);
clone.remove();
                    });
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 299);
anim2.run();

                    // dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                } else {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 303);
dropNode.get('parentNode').appendChild(dragNode);
                }
                //Resync all the targets because something moved.
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 306);
Y.DD.DDM.syncActiveShims(true);
            }
        }
    },

    _dropEnterGlobal: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnterGlobal", 311);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 312);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 313);
var drag = Y.DD.DDM.activeDrag,
                dragNode = drag.get('dragNode'),
                obj  = drag.get('data'),
                container,
                templateItem;

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 319);
if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {
                // Bind to the document's end drag handler
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 321);
drag.on('drag:end', this._handleEnd, this);

                // Render the item
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 324);
var templateItem = new Y.TB.TemplateItem({
                    asset: obj
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 328);
var tiView = new Y.TB.TemplateItemView({
                    model: templateItem
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 332);
tiView.templateModel = this.get('model');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 334);
container = tiView.render().get('container');

                // FIXME: The context menu doesn't get bound from tiView.render() for some reason
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 337);
container.plug(Y.Libbit.ContextMenu, {
                    content: [
                        { title: 'Remove from template', id: 'removeTemplateItem' },
                        { title: '-' },
                        { title: 'Properties', id: 'templateItemProperties', disabled: true }
                    ],
                    bubbleTarget: tiView
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 346);
var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 348);
container.addClass('libbit-dd-drag-placeholder');

                // Store a reference to the model so we can access it from the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 351);
container.setData({ model: templateItem });

                // Cleanup the old node to prevent orphans in the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 354);
drag.get('node').remove();
                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 356);
drag.set('node', container);

                // Update the dragNode
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 359);
Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);
            }
        }
    },

// -- Hover Event handlers -----------------------------------------------------------

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseEnter", 369);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 370);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 372);
if (target.ancestor('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 373);
target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 376);
if (target.one('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 377);
target.addClass('libbit-dd-drag-hover-disabled');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 379);
target.addClass('libbit-dd-drag-hover');
        }
    },

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseLeave: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseLeave", 386);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 387);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 389);
if (target.hasClass('libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 390);
target.removeClass('libbit-dd-drag-hover');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 393);
if (target.ancestor('.libbit-dd-drag-hover-disabled')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 394);
target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 400);
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["libbit-anim", "libbit-dd-css", "view"]});
