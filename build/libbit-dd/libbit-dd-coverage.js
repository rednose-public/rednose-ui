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
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].code=["YUI.add('libbit-dd', function (Y, NAME) {","","var DD, BubbleTarget;","","BubbleTarget = Y.Base.create('bubbleTarget', Y.Base, [], {});","","// NOT GENERIC YET: Dropenterglobal morphing","DD = Y.Base.create('dd', Y.View, [], {","","    dropHighlight: false,","","    /**","     * Hover events, handling complex, stacked hovers","     */","    events: {","        '.libbit-dd-drag': {","            mouseenter: '_handleMouseEnter',","            mouseleave: '_handleMouseLeave'","        }","    },","","    initializer: function() {","        // Set the cursor for drag proxies.","        Y.DD.DDM.set('dragCursor', 'default');","","        // Pass the event through a bubble target, so we get the first event in the chain","        this.bubbleTarget = new BubbleTarget();","        this.bubbleTarget.addTarget(this);","        this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);","    },","","    _libbitDropHit: function (e) {","        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble","        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode","        // of the drag node being null.","        if (e.drag.get('node').get('parentNode') === null) {","            e.stopImmediatePropagation();","        }","    },","","// -- Node setup ---------------------------------------------------------------","","    /**","     * Create a new drag instance from a DOM node.","     */","    createDrag: function (node, groups, data) {","        node.addClass('libbit-dd-drag');","","        var dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: this,","            target       : true","        });","","        dd.plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    /**","     * Create a new drop instance from a DOM node.","     */","    createDrop: function (node, groups, data) {","        node.addClass('libbit-dd-drop');","","        var dd = new Y.DD.Drop({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: this","        });","","        return dd;","    },","","    bindGlobalDrop: function (groups, container) {","        var drop;","","        container = container || this.get('container'),","","        container.addClass('libbit-global-drop');","","        // Global drop object.","        drop = new Y.DD.Drop({","            node   : container,","            groups: groups,","            bubbleTargets: this.bubbleTarget","            // bubbleTargets: this","        });","","        // Bind the global drop object.","        drop.on('drop:enter', this._dropEnterGlobal, this);","    },","","// -- Event handlers -----------------------------------------------------------","","    _handleStart: function (e) {","        var drag = e.target;","        var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');","","        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));","        drag.get('node').addClass('libbit-dd-drag-placeholder');","","        drag.get('node').setStyle('visibility', 'hidden');","    },","","    /**","     * Handles the end of a drag event.","     */","    _handleEnd: function (e) {","        var drag = e.target;","","        // Remove the original event bindings and connect them to this object.","        Y.Array.each(drag.getTargets(), function (n) {","            drag.removeTarget(n);","        });","","        drag.addTarget(this);","","        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.","        drag.detach('drag:end', this._handleEnd);","","        // Reprep since we (potentially) have changed the drag node","        drag._unprep();","        drag._prep();","","        drag.get('node').addClass('libbit-dd-drag');","","        drag.get('node').removeClass('libbit-dd-drag-placeholder');","        drag.get('dragNode').set('innerHTML', '');","","        drag.get('node').setStyle('visibility', '');","    },","","    /**","     * Triggered when a drag item is dragged over a drop item","     */","    _dropOver: function (e) {","        var drop = e.drop.get('node'),","            drag = e.drag.get('node');","","        if (drop.hasClass('libbit-global-drop')) {","            return;","        }","","        if (drop.get('tagName').toLowerCase() !== 'li') {","            if (!drop.contains(drag)) {","                drop.appendChild(drag);","                Y.DD.DDM.syncActiveShims(true);","            }","        }","    },","","    /**","     * Handles dragging into a drop region.","     */","    _dropEnter: function (e) {","        if (!e.drag || !e.drop || (e.drop !== e.target)) {","            return false;","        }","        if (e.drop.get('node').get('tagName').toLowerCase() === 'li') {","            this._moveItem(e.drag, e.drop);","        }","    },","","    _moveItem: function(drag, drop) {","        var dragNode = drag.get('node'),","            dropNode = drop.get('node'),","            append = false,","            //padding = 5,","            padding = 10,","            xy = drag.mouseXY,","            region = drop.region,","            middle1 = region.top + ((region.bottom - region.top) / 2),","            middle2 = region.left + ((region.right - region.left) / 2),","            dir = false,","            dir1 = false,","            dir2 = false,","            next,","            ul;","","        if (dropNode.hasClass('libbit-global-drop')) {","            return;","        }","","        // Resize the proxy if necessary","        if (dropNode.get('tagName').toLowerCase() !== 'ul') {","            // Traverse up to find the ul node","            ul = dropNode.ancestor('ul');","        } else {","            ul = dropNode;","        }","","        if (ul) {","            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging","            var node = Y.DD.DDM.activeDrag.get('dragNode');","            var width = ul.get('offsetWidth');","","            Y.Libbit.Anim.width(node, width);","        }","","        // Insert the placeholder at the correct index","        if ((xy[1] < (region.top + padding))) {","            dir1 = 'top';","        }","","        if ((region.bottom - padding) < xy[1]) {","            dir1 = 'bottom';","        }","","        if ((region.right - padding) < xy[0]) {","            dir2 = 'right';","        }","","        if ((xy[0] < (region.left + padding))) {","            dir2 = 'left';","        }","","        dir = dir2;","","        if (dir2 === false) {","            dir = dir1;","        }","","        switch (dir) {","            case 'top':","                // next = dropNode.get('nextSibling');","                // if (next) {","                //     dropNode = next;","                // } else {","                //     append = true;","                // }","                break;","","            case 'bottom':","                break;","","            case 'right':","            case 'left':","                break;","        }","","        if ((dropNode !== null) && dir) {","            if (dropNode && dropNode.get('parentNode')) {","                if (!append) {","                    // var clone = dragNode.cloneNode(true);","                    var clone = Y.Node.create(dragNode.get('innerHTML'));","","                    if (dir === 'top') {","                        dropNode.get('parentNode').insertBefore(clone, dragNode);","","                        if (dropNode.get('previousSibling') && dropNode.get('nextSibling')) {","                            dropNode = dropNode.get('nextSibling');","                        }","","                        if (dropNode.get('nextSibling')) {","                            dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                        } else {","                            dropNode.get('parentNode').appendChild(dragNode);","                        }","                    } else {","                        dropNode.get('parentNode').insertBefore(clone, dragNode);","                        dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                    }","","                    var height = dragNode.get('scrollHeight');","","                    dragNode.setStyle('height', 0);","","                    clone.setStyle('overflow', 'hidden');","","                    clone.setStyle('visibility', 'hidden');","","                    var anim = new Y.Anim({","                        node: dragNode,","                        to: {","                            height: height","                        },","                        duration: '.25',","                        easing: Y.Easing.easeOut","                    });","                    anim.run();","","                    var anim2 = new Y.Anim({","                        node: clone,","                        to: {","                            height: 0","                        },","                        duration: '.25',","                        easing: Y.Easing.easeOut","                    });","                    anim2.on('end', function () {","                        clone.remove();","                    });","                    anim2.run();","","                    // dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                } else {","                    dropNode.get('parentNode').appendChild(dragNode);","                }","                //Resync all the targets because something moved.","                Y.DD.DDM.syncActiveShims(true);","            }","        }","    },","","    _dropEnterGlobal: function (e) {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                dragNode = drag.get('dragNode'),","                obj  = drag.get('data'),","                container,","                templateItem;","","            if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {","                // Bind to the document's end drag handler","                drag.on('drag:end', this._handleEnd, this);","","                // Render the item","                var templateItem = new Y.TB.TemplateItem({","                    asset: obj","                });","","                var tiView = new Y.TB.TemplateItemView({","                    model: templateItem","                });","","                tiView.templateModel = this.get('model');","","                container = tiView.render().get('container');","","                // FIXME: The context menu doesn't get bound from tiView.render() for some reason","                container.plug(Y.Libbit.ContextMenu, {","                    content: [","                        { title: 'Remove from template', id: 'removeTemplateItem' },","                        { title: '-' },","                        { title: 'Properties', id: 'templateItemProperties', disabled: true }","                    ],","                    bubbleTarget: tiView","                });","","                var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');","","                container.addClass('libbit-dd-drag-placeholder');","","                // Store a reference to the model so we can access it from the DOM","                container.setData({ model: templateItem });","","                // Cleanup the old node to prevent orphans in the DOM","                drag.get('node').remove();","                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)","                drag.set('node', container);","","                // Update the dragNode","                Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);","            }","        }","    },","","// -- Hover Event handlers -----------------------------------------------------------","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseEnter: function (e) {","        var target = e.currentTarget;","","        if (target.ancestor('.libbit-dd-drag-hover')) {","            target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');","        }","","        if (target.one('.libbit-dd-drag-hover')) {","            target.addClass('libbit-dd-drag-hover-disabled');","        } else {","            target.addClass('libbit-dd-drag-hover');","        }","    },","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseLeave: function (e) {","        var target = e.currentTarget;","","        if (target.hasClass('libbit-dd-drag-hover')) {","            target.removeClass('libbit-dd-drag-hover');","        }","","        if (target.ancestor('.libbit-dd-drag-hover-disabled')) {","            target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-anim\", \"libbit-dd-css\", \"view\"]});"];
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].lines = {"1":0,"3":0,"5":0,"8":0,"24":0,"27":0,"28":0,"29":0,"36":0,"37":0,"47":0,"49":0,"57":0,"62":0,"69":0,"71":0,"78":0,"82":0,"84":0,"89":0,"97":0,"103":0,"104":0,"106":0,"107":0,"109":0,"116":0,"119":0,"120":0,"123":0,"126":0,"129":0,"130":0,"132":0,"134":0,"135":0,"137":0,"144":0,"147":0,"148":0,"151":0,"152":0,"153":0,"154":0,"163":0,"164":0,"166":0,"167":0,"172":0,"187":0,"188":0,"192":0,"194":0,"196":0,"199":0,"201":0,"202":0,"204":0,"208":0,"209":0,"212":0,"213":0,"216":0,"217":0,"220":0,"221":0,"224":0,"226":0,"227":0,"230":0,"238":0,"241":0,"245":0,"248":0,"249":0,"250":0,"252":0,"254":0,"255":0,"257":0,"258":0,"261":0,"262":0,"264":0,"267":0,"268":0,"271":0,"273":0,"275":0,"277":0,"279":0,"287":0,"289":0,"297":0,"298":0,"300":0,"304":0,"307":0,"313":0,"314":0,"320":0,"322":0,"325":0,"329":0,"333":0,"335":0,"338":0,"347":0,"349":0,"352":0,"355":0,"357":0,"360":0,"371":0,"373":0,"374":0,"377":0,"378":0,"380":0,"388":0,"390":0,"391":0,"394":0,"395":0,"401":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].functions = {"initializer:22":0,"_libbitDropHit:32":0,"createDrag:46":0,"createDrop:68":0,"bindGlobalDrop:81":0,"_handleStart:102":0,"(anonymous 2):119":0,"_handleEnd:115":0,"_dropOver:143":0,"_dropEnter:162":0,"(anonymous 3):297":0,"_moveItem:171":0,"_dropEnterGlobal:312":0,"_handleMouseEnter:370":0,"_handleMouseLeave:387":0,"(anonymous 1):1":0};
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
    createDrag: function (node, groups, data) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrag", 46);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 47);
node.addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 49);
var dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: this,
            target       : true
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 57);
dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 62);
return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups, data) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrop", 68);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 69);
node.addClass('libbit-dd-drop');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 71);
var dd = new Y.DD.Drop({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 78);
return dd;
    },

    bindGlobalDrop: function (groups, container) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "bindGlobalDrop", 81);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 82);
var drop;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 84);
container = container || this.get('container'),

        container.addClass('libbit-global-drop');

        // Global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 89);
drop = new Y.DD.Drop({
            node   : container,
            groups: groups,
            bubbleTargets: this.bubbleTarget
            // bubbleTargets: this
        });

        // Bind the global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 97);
drop.on('drop:enter', this._dropEnterGlobal, this);
    },

// -- Event handlers -----------------------------------------------------------

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleStart", 102);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 103);
var drag = e.target;
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 104);
var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 106);
drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 107);
drag.get('node').addClass('libbit-dd-drag-placeholder');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 109);
drag.get('node').setStyle('visibility', 'hidden');
    },

    /**
     * Handles the end of a drag event.
     */
    _handleEnd: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleEnd", 115);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 116);
var drag = e.target;

        // Remove the original event bindings and connect them to this object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 119);
Y.Array.each(drag.getTargets(), function (n) {
            _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 2)", 119);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 120);
drag.removeTarget(n);
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 123);
drag.addTarget(this);

        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 126);
drag.detach('drag:end', this._handleEnd);

        // Reprep since we (potentially) have changed the drag node
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 129);
drag._unprep();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 130);
drag._prep();

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 132);
drag.get('node').addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 134);
drag.get('node').removeClass('libbit-dd-drag-placeholder');
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 135);
drag.get('dragNode').set('innerHTML', '');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 137);
drag.get('node').setStyle('visibility', '');
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
Y.DD.DDM.syncActiveShims(true);
            }
        }
    },

    /**
     * Handles dragging into a drop region.
     */
    _dropEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnter", 162);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 163);
if (!e.drag || !e.drop || (e.drop !== e.target)) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 164);
return false;
        }
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 166);
if (e.drop.get('node').get('tagName').toLowerCase() === 'li') {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 167);
this._moveItem(e.drag, e.drop);
        }
    },

    _moveItem: function(drag, drop) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_moveItem", 171);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 172);
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

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 187);
if (dropNode.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 188);
return;
        }

        // Resize the proxy if necessary
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 192);
if (dropNode.get('tagName').toLowerCase() !== 'ul') {
            // Traverse up to find the ul node
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 194);
ul = dropNode.ancestor('ul');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 196);
ul = dropNode;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 199);
if (ul) {
            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 201);
var node = Y.DD.DDM.activeDrag.get('dragNode');
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 202);
var width = ul.get('offsetWidth');

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 204);
Y.Libbit.Anim.width(node, width);
        }

        // Insert the placeholder at the correct index
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 208);
if ((xy[1] < (region.top + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 209);
dir1 = 'top';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 212);
if ((region.bottom - padding) < xy[1]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 213);
dir1 = 'bottom';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 216);
if ((region.right - padding) < xy[0]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 217);
dir2 = 'right';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 220);
if ((xy[0] < (region.left + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 221);
dir2 = 'left';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 224);
dir = dir2;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 226);
if (dir2 === false) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 227);
dir = dir1;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 230);
switch (dir) {
            case 'top':
                // next = dropNode.get('nextSibling');
                // if (next) {
                //     dropNode = next;
                // } else {
                //     append = true;
                // }
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 238);
break;

            case 'bottom':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 241);
break;

            case 'right':
            case 'left':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 245);
break;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 248);
if ((dropNode !== null) && dir) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 249);
if (dropNode && dropNode.get('parentNode')) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 250);
if (!append) {
                    // var clone = dragNode.cloneNode(true);
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 252);
var clone = Y.Node.create(dragNode.get('innerHTML'));

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 254);
if (dir === 'top') {
                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 255);
dropNode.get('parentNode').insertBefore(clone, dragNode);

                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 257);
if (dropNode.get('previousSibling') && dropNode.get('nextSibling')) {
                            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 258);
dropNode = dropNode.get('nextSibling');
                        }

                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 261);
if (dropNode.get('nextSibling')) {
                            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 262);
dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                        } else {
                            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 264);
dropNode.get('parentNode').appendChild(dragNode);
                        }
                    } else {
                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 267);
dropNode.get('parentNode').insertBefore(clone, dragNode);
                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 268);
dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                    }

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 271);
var height = dragNode.get('scrollHeight');

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 273);
dragNode.setStyle('height', 0);

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 275);
clone.setStyle('overflow', 'hidden');

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 277);
clone.setStyle('visibility', 'hidden');

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 279);
var anim = new Y.Anim({
                        node: dragNode,
                        to: {
                            height: height
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut
                    });
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 287);
anim.run();

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 289);
var anim2 = new Y.Anim({
                        node: clone,
                        to: {
                            height: 0
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut
                    });
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 297);
anim2.on('end', function () {
                        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 3)", 297);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 298);
clone.remove();
                    });
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 300);
anim2.run();

                    // dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                } else {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 304);
dropNode.get('parentNode').appendChild(dragNode);
                }
                //Resync all the targets because something moved.
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 307);
Y.DD.DDM.syncActiveShims(true);
            }
        }
    },

    _dropEnterGlobal: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnterGlobal", 312);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 313);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 314);
var drag = Y.DD.DDM.activeDrag,
                dragNode = drag.get('dragNode'),
                obj  = drag.get('data'),
                container,
                templateItem;

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 320);
if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {
                // Bind to the document's end drag handler
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 322);
drag.on('drag:end', this._handleEnd, this);

                // Render the item
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 325);
var templateItem = new Y.TB.TemplateItem({
                    asset: obj
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 329);
var tiView = new Y.TB.TemplateItemView({
                    model: templateItem
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 333);
tiView.templateModel = this.get('model');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 335);
container = tiView.render().get('container');

                // FIXME: The context menu doesn't get bound from tiView.render() for some reason
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 338);
container.plug(Y.Libbit.ContextMenu, {
                    content: [
                        { title: 'Remove from template', id: 'removeTemplateItem' },
                        { title: '-' },
                        { title: 'Properties', id: 'templateItemProperties', disabled: true }
                    ],
                    bubbleTarget: tiView
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 347);
var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 349);
container.addClass('libbit-dd-drag-placeholder');

                // Store a reference to the model so we can access it from the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 352);
container.setData({ model: templateItem });

                // Cleanup the old node to prevent orphans in the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 355);
drag.get('node').remove();
                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 357);
drag.set('node', container);

                // Update the dragNode
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 360);
Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);
            }
        }
    },

// -- Hover Event handlers -----------------------------------------------------------

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseEnter", 370);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 371);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 373);
if (target.ancestor('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 374);
target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 377);
if (target.one('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 378);
target.addClass('libbit-dd-drag-hover-disabled');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 380);
target.addClass('libbit-dd-drag-hover');
        }
    },

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseLeave: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseLeave", 387);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 388);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 390);
if (target.hasClass('libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 391);
target.removeClass('libbit-dd-drag-hover');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 394);
if (target.ancestor('.libbit-dd-drag-hover-disabled')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 395);
target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 401);
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["libbit-anim", "libbit-dd-css", "view"]});
