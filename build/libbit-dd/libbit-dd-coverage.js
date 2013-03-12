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
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].code=["YUI.add('libbit-dd', function (Y, NAME) {","","var DD, BubbleTarget;","","BubbleTarget = Y.Base.create('bubbleTarget', Y.Base, [], {});","","// NOT GENERIC YET: Dropenterglobal morphing","DD = Y.Base.create('dd', Y.View, [], {","","    dropHighlight: false,","","    /**","     * Hover events, handling complex, stacked hovers","     */","    events: {","        '.libbit-dd-drag': {","            mouseenter: '_handleMouseEnter',","            mouseleave: '_handleMouseLeave'","        }","    },","","    initializer: function() {","        // Set the cursor for drag proxies.","        Y.DD.DDM.set('dragCursor', 'default');","","        // Pass the event through a bubble target, so we get the first event in the chain","        this.bubbleTarget = new BubbleTarget();","        this.bubbleTarget.addTarget(this);","        this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);","    },","","    _libbitDropHit: function (e) {","        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble","        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode","        // of the drag node being null.","        if (e.drag.get('node').get('parentNode') === null) {","            e.stopImmediatePropagation();","        }","    },","","// -- Node setup ---------------------------------------------------------------","","    /**","     * Create a new drag instance from a DOM node.","     */","    createDrag: function (node, groups) {","        node.addClass('libbit-dd-drag');","","        var dd = new Y.DD.Drag({","            node         : node,","            groups: groups,","            bubbleTargets: this,","            target       : true","        });","","        dd.plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    /**","     * Create a new drop instance from a DOM node.","     */","    createDrop: function (node, groups) {","        node.addClass('libbit-dd-drop');","","        var dd = new Y.DD.Drop({","            node        : node,","            //padding     : '20 0',","            groups: groups,","            bubbleTargets: this","        });","","        return dd;","    },","","    bindGlobalDrop: function (groups) {","        var container = this.get('container'),","            drop;","","        container.addClass('libbit-global-drop');","","        // Global drop object.","        drop = new Y.DD.Drop({","            node   : container,","            groups: groups,","            bubbleTargets: this.bubbleTarget","            // bubbleTargets: this","        });","","        // Bind the global drop object.","        drop.on('drop:enter', this._dropEnterGlobal, this);","        drop.on('drop:over', this._handleScroll, this);","    },","","// -- Event handlers -----------------------------------------------------------","","    _handleStart: function (e) {","        var drag = e.target;","","        var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');","","        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));","        drag.get('node').addClass('libbit-dd-drag-placeholder');","    },","","    /**","     * Handles the end of a drag event.","     */","    _handleEnd: function (e) {","        var drag = e.target;","","        // Remove the original event bindings and connect them to this object.","        Y.Array.each(drag.getTargets(), function (n) {","            drag.removeTarget(n);","        });","","        drag.addTarget(this);","","        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.","        drag.detach('drag:end', this._handleEnd);","","        // Reprep since we (potentially) have changed the drag node","        drag._unprep();","        drag._prep();","","        drag.get('node').addClass('libbit-dd-drag');","","        drag.get('node').removeClass('libbit-dd-drag-placeholder');","        drag.get('dragNode').set('innerHTML', '');","    },","","    /**","     * Triggered when a drag item is dragged over a drop item","     */","    _dropOver: function (e) {","        var drop = e.drop.get('node'),","            drag = e.drag.get('node');","","        if (drop.hasClass('libbit-global-drop')) {","            return;","        }","","        if (drop.get('tagName').toLowerCase() !== 'li') {","            if (!drop.contains(drag)) {","                drop.appendChild(drag);","                Y.Lang.later(50, Y, function () {","                    Y.DD.DDM.syncActiveShims(true);","                });","            }","        }","    },","","    /**","     * Handles dragging into a drop region.","     */","    _dropEnter: function (e) {","        var drag = e.drag,","            drop = e.drop,","            dragNode = drag.get('node'),","            dropNode = drop.get('node'),","            append = false,","            //padding = 5,","            padding = 10,","            xy = drag.mouseXY,","            region = drop.region,","            middle1 = region.top + ((region.bottom - region.top) / 2),","            middle2 = region.left + ((region.right - region.left) / 2),","            dir = false,","            dir1 = false,","            dir2 = false,","            next,","            ul;","","        if (dropNode.hasClass('libbit-global-drop')) {","            return;","        }","","        // Resize the proxy if necessary","        if (dropNode.get('tagName').toLowerCase() !== 'ul') {","            // Traverse up to find the ul node","            ul = dropNode.ancestor('ul');","        } else {","            ul = dropNode;","        }","","        if (ul) {","            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging","            var node = Y.DD.DDM.activeDrag.get('dragNode');","            var width = ul.get('offsetWidth');","","            Y.Libbit.Anim.width(node, width);","        }","","        // Insert the placeholder at the correct index","        if ((xy[1] < (region.top + padding))) {","            dir1 = 'top';","        }","","        if ((region.bottom - padding) < xy[1]) {","            dir1 = 'bottom';","        }","","        if ((region.right - padding) < xy[0]) {","            dir2 = 'right';","        }","","        if ((xy[0] < (region.left + padding))) {","            dir2 = 'left';","        }","","        dir = dir2;","","        if (dir2 === false) {","            dir = dir1;","        }","","        switch (dir) {","            case 'top':","                next = dropNode.get('nextSibling');","                if (next) {","                    dropNode = next;","                } else {","                    append = true;","                }","                break;","","            case 'bottom':","                break;","","            case 'right':","            case 'left':","                break;","        }","","        if ((dropNode !== null) && dir) {","            if (dropNode && dropNode.get('parentNode')) {","                if (!append) {","                    dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                } else {","                    dropNode.get('parentNode').appendChild(dragNode);","                }","            }","        }","    },","","    _dropEnterGlobal: function (e) {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                dragNode = drag.get('dragNode'),","                obj  = drag.get('data'),","                container,","                templateItem;","","            if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {","                // Bind to the document's end drag handler","                drag.on('drag:end', this._handleEnd, this);","","                // Render the item","                var templateItem = new Y.TB.TemplateItem({","                    asset: obj","                });","","                var tiView = new Y.TB.TemplateItemView({","                    model: templateItem","                });","","                tiView.templateModel = this.get('model');","","                container = tiView.render().get('container');","","                // FIXME: The context menu doesn't get bound from tiView.render() for some reason","                container.plug(Y.Libbit.ContextMenu, {","                    content: [","                        { title: 'Remove from template', id: 'removeTemplateItem' },","                        { title: '-' },","                        { title: 'Properties', id: 'templateItemProperties', disabled: true }","                    ],","                    bubbleTarget: tiView","                });","","                var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');","","                container.addClass('libbit-dd-drag-placeholder');","","                // Store a reference to the model so we can access it from the DOM","                container.setData({ model: templateItem });","","                // Cleanup the old node to prevent orphans in the DOM","                drag.get('node').remove();","                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)","                drag.set('node', container);","","                // Update the dragNode","                Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);","            }","        }","    },","","// -- Hover Event handlers -----------------------------------------------------------","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseEnter: function (e) {","        var target = e.currentTarget;","","        if (target.ancestor('.libbit-dd-drag-hover')) {","            target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');","        }","","        if (target.one('.libbit-dd-drag-hover')) {","            target.addClass('libbit-dd-drag-hover-disabled');","        } else {","            target.addClass('libbit-dd-drag-hover');","        }","    },","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseLeave: function (e) {","        var target = e.currentTarget;","","        if (target.hasClass('libbit-dd-drag-hover')) {","            target.removeClass('libbit-dd-drag-hover');","        }","","        if (target.ancestor('.libbit-dd-drag-hover-disabled')) {","            target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');","        }","    },","","// -- Scroll handler for the global drop region --------------------------------------","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handleScroll: function (e) {","        var dropNode    = e.drop.get('node'),","            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),","            parent      = dropNode.get('offsetParent'),","            // nodeOffsetY = dropNode.get('offsetTop'),","            // nodeHeight  = dropNode.get('offsetHeight'),","            nodeHeight  = this.get('container').get('offsetHeight'),","            relativeY,","            node,","            anim,","            dir;","","        var buffer = 30;","        var delay = 235;","        var marginTop = 40;","","        if (dragY < prevY) {","            dir = 'up';","        } else {","            dir = 'down';","        }","","        // GLOBAL","        prevY = dragY;","","        if (dragY - marginTop < buffer && dir === 'up') {","            // Scroll up","            node = parent;","            anim = new Y.Anim({","                node: node,","                to: {","                    scroll: function(node) {","                        return [node.get('scrollTop') + node.get('offsetHeight'), 0];","                    }","                },","                easing: Y.Easing.easeOut","            });","","            anim.run();","        }","","        if (dragY - marginTop > nodeHeight - buffer && dir === 'down') {","            // Scroll down","            node = parent;","            anim = new Y.Anim({","                node: node,","                to: {","                    scroll: function(node) {","                        return [0, node.get('scrollTop') + node.get('offsetHeight')];","                    }","                },","                easing: Y.Easing.easeOut","            });","","            anim.run();","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-anim\", \"libbit-dd-css\", \"view\"]});"];
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].lines = {"1":0,"3":0,"5":0,"8":0,"24":0,"27":0,"28":0,"29":0,"36":0,"37":0,"47":0,"49":0,"56":0,"61":0,"68":0,"70":0,"77":0,"81":0,"84":0,"87":0,"95":0,"96":0,"102":0,"104":0,"106":0,"107":0,"114":0,"117":0,"118":0,"121":0,"124":0,"127":0,"128":0,"130":0,"132":0,"133":0,"140":0,"143":0,"144":0,"147":0,"148":0,"149":0,"150":0,"151":0,"161":0,"178":0,"179":0,"183":0,"185":0,"187":0,"190":0,"192":0,"193":0,"195":0,"199":0,"200":0,"203":0,"204":0,"207":0,"208":0,"211":0,"212":0,"215":0,"217":0,"218":0,"221":0,"223":0,"224":0,"225":0,"227":0,"229":0,"232":0,"236":0,"239":0,"240":0,"241":0,"242":0,"244":0,"251":0,"252":0,"258":0,"260":0,"263":0,"267":0,"271":0,"273":0,"276":0,"285":0,"287":0,"290":0,"293":0,"295":0,"298":0,"309":0,"311":0,"312":0,"315":0,"316":0,"318":0,"326":0,"328":0,"329":0,"332":0,"333":0,"343":0,"354":0,"355":0,"356":0,"358":0,"359":0,"361":0,"365":0,"367":0,"369":0,"370":0,"374":0,"380":0,"383":0,"385":0,"386":0,"390":0,"396":0,"402":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].functions = {"initializer:22":0,"_libbitDropHit:32":0,"createDrag:46":0,"createDrop:67":0,"bindGlobalDrop:80":0,"_handleStart:101":0,"(anonymous 2):117":0,"_handleEnd:113":0,"(anonymous 3):150":0,"_dropOver:139":0,"_dropEnter:160":0,"_dropEnterGlobal:250":0,"_handleMouseEnter:308":0,"_handleMouseLeave:325":0,"scroll:373":0,"scroll:389":0,"_handleScroll:342":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredLines = 123;
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

    bindGlobalDrop: function (groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "bindGlobalDrop", 80);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 81);
var container = this.get('container'),
            drop;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 84);
container.addClass('libbit-global-drop');

        // Global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 87);
drop = new Y.DD.Drop({
            node   : container,
            groups: groups,
            bubbleTargets: this.bubbleTarget
            // bubbleTargets: this
        });

        // Bind the global drop object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 95);
drop.on('drop:enter', this._dropEnterGlobal, this);
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 96);
drop.on('drop:over', this._handleScroll, this);
    },

// -- Event handlers -----------------------------------------------------------

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleStart", 101);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 102);
var drag = e.target;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 104);
var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 106);
drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 107);
drag.get('node').addClass('libbit-dd-drag-placeholder');
    },

    /**
     * Handles the end of a drag event.
     */
    _handleEnd: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleEnd", 113);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 114);
var drag = e.target;

        // Remove the original event bindings and connect them to this object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 117);
Y.Array.each(drag.getTargets(), function (n) {
            _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 2)", 117);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 118);
drag.removeTarget(n);
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 121);
drag.addTarget(this);

        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 124);
drag.detach('drag:end', this._handleEnd);

        // Reprep since we (potentially) have changed the drag node
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 127);
drag._unprep();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 128);
drag._prep();

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 130);
drag.get('node').addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 132);
drag.get('node').removeClass('libbit-dd-drag-placeholder');
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 133);
drag.get('dragNode').set('innerHTML', '');
    },

    /**
     * Triggered when a drag item is dragged over a drop item
     */
    _dropOver: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropOver", 139);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 140);
var drop = e.drop.get('node'),
            drag = e.drag.get('node');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 143);
if (drop.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 144);
return;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 147);
if (drop.get('tagName').toLowerCase() !== 'li') {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 148);
if (!drop.contains(drag)) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 149);
drop.appendChild(drag);
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 150);
Y.Lang.later(50, Y, function () {
                    _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 3)", 150);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 151);
Y.DD.DDM.syncActiveShims(true);
                });
            }
        }
    },

    /**
     * Handles dragging into a drop region.
     */
    _dropEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnter", 160);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 161);
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

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 178);
if (dropNode.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 179);
return;
        }

        // Resize the proxy if necessary
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 183);
if (dropNode.get('tagName').toLowerCase() !== 'ul') {
            // Traverse up to find the ul node
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 185);
ul = dropNode.ancestor('ul');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 187);
ul = dropNode;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 190);
if (ul) {
            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 192);
var node = Y.DD.DDM.activeDrag.get('dragNode');
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 193);
var width = ul.get('offsetWidth');

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 195);
Y.Libbit.Anim.width(node, width);
        }

        // Insert the placeholder at the correct index
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 199);
if ((xy[1] < (region.top + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 200);
dir1 = 'top';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 203);
if ((region.bottom - padding) < xy[1]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 204);
dir1 = 'bottom';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 207);
if ((region.right - padding) < xy[0]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 208);
dir2 = 'right';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 211);
if ((xy[0] < (region.left + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 212);
dir2 = 'left';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 215);
dir = dir2;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 217);
if (dir2 === false) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 218);
dir = dir1;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 221);
switch (dir) {
            case 'top':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 223);
next = dropNode.get('nextSibling');
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 224);
if (next) {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 225);
dropNode = next;
                } else {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 227);
append = true;
                }
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 229);
break;

            case 'bottom':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 232);
break;

            case 'right':
            case 'left':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 236);
break;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 239);
if ((dropNode !== null) && dir) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 240);
if (dropNode && dropNode.get('parentNode')) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 241);
if (!append) {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 242);
dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                } else {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 244);
dropNode.get('parentNode').appendChild(dragNode);
                }
            }
        }
    },

    _dropEnterGlobal: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnterGlobal", 250);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 251);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 252);
var drag = Y.DD.DDM.activeDrag,
                dragNode = drag.get('dragNode'),
                obj  = drag.get('data'),
                container,
                templateItem;

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 258);
if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {
                // Bind to the document's end drag handler
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 260);
drag.on('drag:end', this._handleEnd, this);

                // Render the item
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 263);
var templateItem = new Y.TB.TemplateItem({
                    asset: obj
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 267);
var tiView = new Y.TB.TemplateItemView({
                    model: templateItem
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 271);
tiView.templateModel = this.get('model');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 273);
container = tiView.render().get('container');

                // FIXME: The context menu doesn't get bound from tiView.render() for some reason
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 276);
container.plug(Y.Libbit.ContextMenu, {
                    content: [
                        { title: 'Remove from template', id: 'removeTemplateItem' },
                        { title: '-' },
                        { title: 'Properties', id: 'templateItemProperties', disabled: true }
                    ],
                    bubbleTarget: tiView
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 285);
var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 287);
container.addClass('libbit-dd-drag-placeholder');

                // Store a reference to the model so we can access it from the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 290);
container.setData({ model: templateItem });

                // Cleanup the old node to prevent orphans in the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 293);
drag.get('node').remove();
                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 295);
drag.set('node', container);

                // Update the dragNode
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 298);
Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);
            }
        }
    },

// -- Hover Event handlers -----------------------------------------------------------

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseEnter", 308);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 309);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 311);
if (target.ancestor('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 312);
target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 315);
if (target.one('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 316);
target.addClass('libbit-dd-drag-hover-disabled');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 318);
target.addClass('libbit-dd-drag-hover');
        }
    },

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseLeave: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseLeave", 325);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 326);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 328);
if (target.hasClass('libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 329);
target.removeClass('libbit-dd-drag-hover');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 332);
if (target.ancestor('.libbit-dd-drag-hover-disabled')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 333);
target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');
        }
    },

// -- Scroll handler for the global drop region --------------------------------------

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleScroll: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleScroll", 342);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 343);
var dropNode    = e.drop.get('node'),
            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),
            parent      = dropNode.get('offsetParent'),
            // nodeOffsetY = dropNode.get('offsetTop'),
            // nodeHeight  = dropNode.get('offsetHeight'),
            nodeHeight  = this.get('container').get('offsetHeight'),
            relativeY,
            node,
            anim,
            dir;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 354);
var buffer = 30;
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 355);
var delay = 235;
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 356);
var marginTop = 40;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 358);
if (dragY < prevY) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 359);
dir = 'up';
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 361);
dir = 'down';
        }

        // GLOBAL
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 365);
prevY = dragY;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 367);
if (dragY - marginTop < buffer && dir === 'up') {
            // Scroll up
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 369);
node = parent;
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 370);
anim = new Y.Anim({
                node: node,
                to: {
                    scroll: function(node) {
                        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "scroll", 373);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 374);
return [node.get('scrollTop') + node.get('offsetHeight'), 0];
                    }
                },
                easing: Y.Easing.easeOut
            });

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 380);
anim.run();
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 383);
if (dragY - marginTop > nodeHeight - buffer && dir === 'down') {
            // Scroll down
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 385);
node = parent;
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 386);
anim = new Y.Anim({
                node: node,
                to: {
                    scroll: function(node) {
                        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "scroll", 389);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 390);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
                    }
                },
                easing: Y.Easing.easeOut
            });

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 396);
anim.run();
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 402);
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["libbit-anim", "libbit-dd-css", "view"]});
