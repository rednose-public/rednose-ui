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
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].code=["YUI.add('libbit-dd', function (Y, NAME) {","","var DD, BubbleTarget;","","BubbleTarget = Y.Base.create('bubbleTarget', Y.Base, [], {});","","// NOT GENERIC YET: Dropenterglobal morphing","DD = Y.Base.create('dd', Y.View, [], {","","    dropHighlight: false,","","    /**","     * Hover events, handling complex, stacked hovers","     */","    events: {","        '.libbit-dd-drag': {","            mouseenter: '_handleMouseEnter',","            mouseleave: '_handleMouseLeave'","        }","    },","","    initializer: function() {","        this._ddMap || (this._ddMap = []);","","        // Set the cursor for drag proxies.","        Y.DD.DDM.set('dragCursor', 'default');","","        // Pass the event through a bubble target, so we get the first event in the chain","        this.bubbleTarget = new BubbleTarget();","        this.bubbleTarget.addTarget(this);","        this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);","    },","","    destructor: function () {","        for (var i in this._ddMap) {","            this._ddMap[i].destroy();","        }","","        this._ddMap = [];","    },","","    // -- Node setup ---------------------------------------------------------------","","    /**","     * Create a new drag instance from a DOM node.","     */","    createDrag: function (node, groups, data) {","        node.addClass('libbit-dd-drag');","","        var dd = new Y.DD.Drag({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: this,","            target       : true","        });","","        dd.plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        this._ddMap.push(dd);","","        return dd;","    },","","    /**","     * Create a new drop instance from a DOM node.","     */","    createDrop: function (node, groups, data) {","        node.addClass('libbit-dd-drop');","","        var dd = new Y.DD.Drop({","            node         : node,","            data         : data,","            groups       : groups,","            bubbleTargets: this","        });","","        this._ddMap.push(dd);","","        return dd;","    },","","    bindGlobalDrop: function (groups, container) {","        container = container || this.get('container');","","        var dd;","","        container.addClass('libbit-global-drop');","","        // Global drop object.","        dd = new Y.DD.Drop({","            node   : container,","            groups: groups,","            bubbleTargets: this.bubbleTarget","        });","","        this._ddMap.push(dd);","","        // Bind the global drop object.","        dd.on('drop:enter', this._dropEnterGlobal, this);","    },","","    _libbitDropHit: function (e) {","        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble","        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode","        // of the drag node being null.","        if (e.drag.get('node').get('parentNode') === null) {","            e.stopImmediatePropagation();","        }","    },","","    // -- Event handlers -----------------------------------------------------------","","    _handleStart: function (e) {","        var drag = e.target;","        var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');","","        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));","        drag.get('node').addClass('libbit-dd-drag-placeholder');","","        drag.get('node').setStyle('visibility', 'hidden');","    },","","    /**","     * Handles the end of a drag event.","     */","    _handleEnd: function (e) {","        var drag = e.target;","","        // Remove the original event bindings and connect them to this object.","        Y.Array.each(drag.getTargets(), function (n) {","            drag.removeTarget(n);","        });","","        drag.addTarget(this);","","        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.","        drag.detach('drag:end', this._handleEnd);","","        // Reprep since we (potentially) have changed the drag node","        drag._unprep();","        drag._prep();","","        drag.get('node').addClass('libbit-dd-drag');","","        drag.get('node').removeClass('libbit-dd-drag-placeholder');","        drag.get('dragNode').set('innerHTML', '');","","        drag.get('node').setStyle('visibility', '');","    },","","    /**","     * Triggered when a drag item is dragged over a drop item","     */","    _dropOver: function (e) {","        var drop = e.drop.get('node'),","            drag = e.drag.get('node');","","        if (drop.hasClass('libbit-global-drop')) {","            return;","        }","","        if (drop.get('tagName').toLowerCase() !== 'li') {","            if (!drop.contains(drag)) {","                drop.appendChild(drag);","                Y.DD.DDM.syncActiveShims(true);","            }","        }","    },","","    /**","     * Handles dragging into a drop region.","     */","    _dropEnter: function (e) {","        if (!e.drag || !e.drop || (e.drop !== e.target)) {","            return false;","        }","        if (e.drop.get('node').get('tagName').toLowerCase() === 'li') {","            this._moveItem(e.drag, e.drop);","        }","    },","","    _moveItem: function(drag, drop) {","        var dragNode = drag.get('node'),","            dropNode = drop.get('node'),","            append = false,","            //padding = 5,","            padding = 10,","            xy = drag.mouseXY,","            region = drop.region,","            middle1 = region.top + ((region.bottom - region.top) / 2),","            middle2 = region.left + ((region.right - region.left) / 2),","            dir = false,","            dir1 = false,","            dir2 = false,","            next,","            ul;","","        if (dropNode.hasClass('libbit-global-drop')) {","            return;","        }","","        // Resize the proxy if necessary","        if (dropNode.get('tagName').toLowerCase() !== 'ul') {","            // Traverse up to find the ul node","            ul = dropNode.ancestor('ul');","        } else {","            ul = dropNode;","        }","","        if (ul) {","            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging","            var node = Y.DD.DDM.activeDrag.get('dragNode');","            var width = ul.get('offsetWidth');","","            Y.Libbit.Anim.width(node, width);","        }","","        // Insert the placeholder at the correct index","        if ((xy[1] < (region.top + padding))) {","            dir1 = 'top';","        }","","        if ((region.bottom - padding) < xy[1]) {","            dir1 = 'bottom';","        }","","        if ((region.right - padding) < xy[0]) {","            dir2 = 'right';","        }","","        if ((xy[0] < (region.left + padding))) {","            dir2 = 'left';","        }","","        dir = dir2;","","        if (dir2 === false) {","            dir = dir1;","        }","","        switch (dir) {","            case 'top':","                // next = dropNode.get('nextSibling');","                // if (next) {","                //     dropNode = next;","                // } else {","                //     append = true;","                // }","                break;","","            case 'bottom':","                break;","","            case 'right':","            case 'left':","                break;","        }","","        if ((dropNode !== null) && dir) {","            if (dropNode && dropNode.get('parentNode')) {","                if (!append) {","                    // var clone = dragNode.cloneNode(true);","                    var clone = Y.Node.create(dragNode.get('innerHTML'));","","                    if (dir === 'top') {","                        dropNode.get('parentNode').insertBefore(clone, dragNode);","","                        if (dropNode.get('previousSibling') && dropNode.get('nextSibling')) {","                            dropNode = dropNode.get('nextSibling');","                        }","","                        if (dropNode.get('nextSibling')) {","                            dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                        } else {","                            dropNode.get('parentNode').appendChild(dragNode);","                        }","                    } else {","                        dropNode.get('parentNode').insertBefore(clone, dragNode);","                        dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                    }","","                    var height = dragNode.get('scrollHeight');","","                    dragNode.setStyle('height', 0);","","                    clone.setStyle('overflow', 'hidden');","","                    clone.setStyle('visibility', 'hidden');","","                    var anim = new Y.Anim({","                        node: dragNode,","                        to: {","                            height: height","                        },","                        duration: '.25',","                        easing: Y.Easing.easeOut","                    });","                    anim.run();","","                    var anim2 = new Y.Anim({","                        node: clone,","                        to: {","                            height: 0","                        },","                        duration: '.25',","                        easing: Y.Easing.easeOut","                    });","                    anim2.on('end', function () {","                        clone.remove();","                    });","                    anim2.run();","","                    // dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                } else {","                    dropNode.get('parentNode').appendChild(dragNode);","                }","                //Resync all the targets because something moved.","                Y.DD.DDM.syncActiveShims(true);","            }","        }","    },","","    _dropEnterGlobal: function (e) {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                dragNode = drag.get('dragNode'),","                obj  = drag.get('data'),","                container,","                templateItem;","","            if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {","                // Bind to the document's end drag handler","                drag.on('drag:end', this._handleEnd, this);","","                // Render the item","                var templateItem = new Y.TB.TemplateItem({","                    asset: obj","                });","","                var tiView = new Y.TB.TemplateItemView({","                    model: templateItem","                });","","                tiView.templateModel = this.get('model');","","                container = tiView.render().get('container');","","                // FIXME: The context menu doesn't get bound from tiView.render() for some reason","                container.plug(Y.Libbit.ContextMenu, {","                    content: [","                        { title: 'Remove from template', id: 'removeTemplateItem' },","                        { title: '-' },","                        { title: 'Properties', id: 'templateItemProperties', disabled: true }","                    ],","                    bubbleTarget: tiView","                });","","                var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');","","                container.addClass('libbit-dd-drag-placeholder');","","                // Store a reference to the model so we can access it from the DOM","                container.setData({ model: templateItem });","","                // Cleanup the old node to prevent orphans in the DOM","                drag.get('node').remove();","                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)","                drag.set('node', container);","","                // Update the dragNode","                Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);","            }","        }","    },","","    // -- Hover Event handlers -----------------------------------------------------------","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseEnter: function (e) {","        var target = e.currentTarget;","","        if (target.ancestor('.libbit-dd-drag-hover')) {","            target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');","        }","","        if (target.one('.libbit-dd-drag-hover')) {","            target.addClass('libbit-dd-drag-hover-disabled');","        } else {","            target.addClass('libbit-dd-drag-hover');","        }","    },","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseLeave: function (e) {","        var target = e.currentTarget;","","        if (target.hasClass('libbit-dd-drag-hover')) {","            target.removeClass('libbit-dd-drag-hover');","        }","","        if (target.ancestor('.libbit-dd-drag-hover-disabled')) {","            target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-anim\", \"libbit-dd-css\", \"view\"]});"];
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].lines = {"1":0,"3":0,"5":0,"8":0,"23":0,"26":0,"29":0,"30":0,"31":0,"35":0,"36":0,"39":0,"48":0,"50":0,"58":0,"63":0,"65":0,"72":0,"74":0,"81":0,"83":0,"87":0,"89":0,"91":0,"94":0,"100":0,"103":0,"110":0,"111":0,"118":0,"119":0,"121":0,"122":0,"124":0,"131":0,"134":0,"135":0,"138":0,"141":0,"144":0,"145":0,"147":0,"149":0,"150":0,"152":0,"159":0,"162":0,"163":0,"166":0,"167":0,"168":0,"169":0,"178":0,"179":0,"181":0,"182":0,"187":0,"202":0,"203":0,"207":0,"209":0,"211":0,"214":0,"216":0,"217":0,"219":0,"223":0,"224":0,"227":0,"228":0,"231":0,"232":0,"235":0,"236":0,"239":0,"241":0,"242":0,"245":0,"253":0,"256":0,"260":0,"263":0,"264":0,"265":0,"267":0,"269":0,"270":0,"272":0,"273":0,"276":0,"277":0,"279":0,"282":0,"283":0,"286":0,"288":0,"290":0,"292":0,"294":0,"302":0,"304":0,"312":0,"313":0,"315":0,"319":0,"322":0,"328":0,"329":0,"335":0,"337":0,"340":0,"344":0,"348":0,"350":0,"353":0,"362":0,"364":0,"367":0,"370":0,"372":0,"375":0,"386":0,"388":0,"389":0,"392":0,"393":0,"395":0,"403":0,"405":0,"406":0,"409":0,"410":0,"416":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].functions = {"initializer:22":0,"destructor:34":0,"createDrag:47":0,"createDrop:71":0,"bindGlobalDrop:86":0,"_libbitDropHit:106":0,"_handleStart:117":0,"(anonymous 2):134":0,"_handleEnd:130":0,"_dropOver:158":0,"_dropEnter:177":0,"(anonymous 3):312":0,"_moveItem:186":0,"_dropEnterGlobal:327":0,"_handleMouseEnter:385":0,"_handleMouseLeave:402":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredLines = 133;
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredFunctions = 17;
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
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "initializer", 22);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 23);
this._ddMap || (this._ddMap = []);

        // Set the cursor for drag proxies.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 26);
Y.DD.DDM.set('dragCursor', 'default');

        // Pass the event through a bubble target, so we get the first event in the chain
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 29);
this.bubbleTarget = new BubbleTarget();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 30);
this.bubbleTarget.addTarget(this);
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 31);
this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);
    },

    destructor: function () {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "destructor", 34);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 35);
for (var i in this._ddMap) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 36);
this._ddMap[i].destroy();
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 39);
this._ddMap = [];
    },

    // -- Node setup ---------------------------------------------------------------

    /**
     * Create a new drag instance from a DOM node.
     */
    createDrag: function (node, groups, data) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrag", 47);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 48);
node.addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 50);
var dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: this,
            target       : true
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 58);
dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 63);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 65);
return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups, data) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrop", 71);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 72);
node.addClass('libbit-dd-drop');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 74);
var dd = new Y.DD.Drop({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 81);
this._ddMap.push(dd);

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 83);
return dd;
    },

    bindGlobalDrop: function (groups, container) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "bindGlobalDrop", 86);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 87);
container = container || this.get('container');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 89);
var dd;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 91);
container.addClass('libbit-global-drop');

        // Global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 94);
dd = new Y.DD.Drop({
            node   : container,
            groups: groups,
            bubbleTargets: this.bubbleTarget
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 100);
this._ddMap.push(dd);

        // Bind the global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 103);
dd.on('drop:enter', this._dropEnterGlobal, this);
    },

    _libbitDropHit: function (e) {
        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble
        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode
        // of the drag node being null.
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_libbitDropHit", 106);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 110);
if (e.drag.get('node').get('parentNode') === null) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 111);
e.stopImmediatePropagation();
        }
    },

    // -- Event handlers -----------------------------------------------------------

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleStart", 117);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 118);
var drag = e.target;
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 119);
var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 121);
drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 122);
drag.get('node').addClass('libbit-dd-drag-placeholder');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 124);
drag.get('node').setStyle('visibility', 'hidden');
    },

    /**
     * Handles the end of a drag event.
     */
    _handleEnd: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleEnd", 130);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 131);
var drag = e.target;

        // Remove the original event bindings and connect them to this object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 134);
Y.Array.each(drag.getTargets(), function (n) {
            _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 2)", 134);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 135);
drag.removeTarget(n);
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 138);
drag.addTarget(this);

        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 141);
drag.detach('drag:end', this._handleEnd);

        // Reprep since we (potentially) have changed the drag node
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 144);
drag._unprep();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 145);
drag._prep();

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 147);
drag.get('node').addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 149);
drag.get('node').removeClass('libbit-dd-drag-placeholder');
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 150);
drag.get('dragNode').set('innerHTML', '');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 152);
drag.get('node').setStyle('visibility', '');
    },

    /**
     * Triggered when a drag item is dragged over a drop item
     */
    _dropOver: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropOver", 158);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 159);
var drop = e.drop.get('node'),
            drag = e.drag.get('node');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 162);
if (drop.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 163);
return;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 166);
if (drop.get('tagName').toLowerCase() !== 'li') {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 167);
if (!drop.contains(drag)) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 168);
drop.appendChild(drag);
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 169);
Y.DD.DDM.syncActiveShims(true);
            }
        }
    },

    /**
     * Handles dragging into a drop region.
     */
    _dropEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnter", 177);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 178);
if (!e.drag || !e.drop || (e.drop !== e.target)) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 179);
return false;
        }
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 181);
if (e.drop.get('node').get('tagName').toLowerCase() === 'li') {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 182);
this._moveItem(e.drag, e.drop);
        }
    },

    _moveItem: function(drag, drop) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_moveItem", 186);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 187);
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

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 202);
if (dropNode.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 203);
return;
        }

        // Resize the proxy if necessary
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 207);
if (dropNode.get('tagName').toLowerCase() !== 'ul') {
            // Traverse up to find the ul node
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 209);
ul = dropNode.ancestor('ul');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 211);
ul = dropNode;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 214);
if (ul) {
            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 216);
var node = Y.DD.DDM.activeDrag.get('dragNode');
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 217);
var width = ul.get('offsetWidth');

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 219);
Y.Libbit.Anim.width(node, width);
        }

        // Insert the placeholder at the correct index
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 223);
if ((xy[1] < (region.top + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 224);
dir1 = 'top';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 227);
if ((region.bottom - padding) < xy[1]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 228);
dir1 = 'bottom';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 231);
if ((region.right - padding) < xy[0]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 232);
dir2 = 'right';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 235);
if ((xy[0] < (region.left + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 236);
dir2 = 'left';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 239);
dir = dir2;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 241);
if (dir2 === false) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 242);
dir = dir1;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 245);
switch (dir) {
            case 'top':
                // next = dropNode.get('nextSibling');
                // if (next) {
                //     dropNode = next;
                // } else {
                //     append = true;
                // }
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 253);
break;

            case 'bottom':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 256);
break;

            case 'right':
            case 'left':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 260);
break;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 263);
if ((dropNode !== null) && dir) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 264);
if (dropNode && dropNode.get('parentNode')) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 265);
if (!append) {
                    // var clone = dragNode.cloneNode(true);
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 267);
var clone = Y.Node.create(dragNode.get('innerHTML'));

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 269);
if (dir === 'top') {
                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 270);
dropNode.get('parentNode').insertBefore(clone, dragNode);

                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 272);
if (dropNode.get('previousSibling') && dropNode.get('nextSibling')) {
                            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 273);
dropNode = dropNode.get('nextSibling');
                        }

                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 276);
if (dropNode.get('nextSibling')) {
                            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 277);
dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                        } else {
                            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 279);
dropNode.get('parentNode').appendChild(dragNode);
                        }
                    } else {
                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 282);
dropNode.get('parentNode').insertBefore(clone, dragNode);
                        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 283);
dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                    }

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 286);
var height = dragNode.get('scrollHeight');

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 288);
dragNode.setStyle('height', 0);

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 290);
clone.setStyle('overflow', 'hidden');

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 292);
clone.setStyle('visibility', 'hidden');

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 294);
var anim = new Y.Anim({
                        node: dragNode,
                        to: {
                            height: height
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut
                    });
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 302);
anim.run();

                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 304);
var anim2 = new Y.Anim({
                        node: clone,
                        to: {
                            height: 0
                        },
                        duration: '.25',
                        easing: Y.Easing.easeOut
                    });
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 312);
anim2.on('end', function () {
                        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 3)", 312);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 313);
clone.remove();
                    });
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 315);
anim2.run();

                    // dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                } else {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 319);
dropNode.get('parentNode').appendChild(dragNode);
                }
                //Resync all the targets because something moved.
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 322);
Y.DD.DDM.syncActiveShims(true);
            }
        }
    },

    _dropEnterGlobal: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnterGlobal", 327);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 328);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 329);
var drag = Y.DD.DDM.activeDrag,
                dragNode = drag.get('dragNode'),
                obj  = drag.get('data'),
                container,
                templateItem;

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 335);
if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {
                // Bind to the document's end drag handler
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 337);
drag.on('drag:end', this._handleEnd, this);

                // Render the item
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 340);
var templateItem = new Y.TB.TemplateItem({
                    asset: obj
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 344);
var tiView = new Y.TB.TemplateItemView({
                    model: templateItem
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 348);
tiView.templateModel = this.get('model');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 350);
container = tiView.render().get('container');

                // FIXME: The context menu doesn't get bound from tiView.render() for some reason
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 353);
container.plug(Y.Libbit.ContextMenu, {
                    content: [
                        { title: 'Remove from template', id: 'removeTemplateItem' },
                        { title: '-' },
                        { title: 'Properties', id: 'templateItemProperties', disabled: true }
                    ],
                    bubbleTarget: tiView
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 362);
var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 364);
container.addClass('libbit-dd-drag-placeholder');

                // Store a reference to the model so we can access it from the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 367);
container.setData({ model: templateItem });

                // Cleanup the old node to prevent orphans in the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 370);
drag.get('node').remove();
                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 372);
drag.set('node', container);

                // Update the dragNode
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 375);
Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);
            }
        }
    },

    // -- Hover Event handlers -----------------------------------------------------------

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseEnter", 385);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 386);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 388);
if (target.ancestor('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 389);
target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 392);
if (target.one('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 393);
target.addClass('libbit-dd-drag-hover-disabled');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 395);
target.addClass('libbit-dd-drag-hover');
        }
    },

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseLeave: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseLeave", 402);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 403);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 405);
if (target.hasClass('libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 406);
target.removeClass('libbit-dd-drag-hover');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 409);
if (target.ancestor('.libbit-dd-drag-hover-disabled')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 410);
target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 416);
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["libbit-anim", "libbit-dd-css", "view"]});
