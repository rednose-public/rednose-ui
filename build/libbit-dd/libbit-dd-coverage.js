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
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].code=["YUI.add('libbit-dd', function (Y, NAME) {","","var DD, BubbleTarget;","","BubbleTarget = Y.Base.create('bubbleTarget', Y.Base, [], {});","","// NOT GENERIC YET: Dropenterglobal morphing","DD = Y.Base.create('dd', Y.View, [], {","","    dropHighlight: false,","","    /**","     * Hover events, handling complex, stacked hovers","     */","    events: {","        '.libbit-dd-drag': {","            mouseenter: '_handleMouseEnter',","            mouseleave: '_handleMouseLeave'","        }","    },","","    initializer: function() {","        // Set the cursor for drag proxies.","        Y.DD.DDM.set('dragCursor', 'default');","","        this.on('drop:over', this._handleDropHighlight, this);","","        // Pass the event through a bubble target, so we get the first event in the chain","        this.bubbleTarget = new BubbleTarget();","        this.bubbleTarget.addTarget(this);","        this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);","    },","","    _libbitDropHit: function (e) {","        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble","        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode","        // of the drag node being null.","        if (e.drag.get('node').get('parentNode') === null) {","            e.stopImmediatePropagation();","        }","    },","","// -- Node setup ---------------------------------------------------------------","","    /**","     * Create a new drag instance from a DOM node.","     */","    createDrag: function (node, groups) {","        node.addClass('libbit-dd-drag');","","        var dd = new Y.DD.Drag({","            node         : node,","            groups: groups,","            bubbleTargets: this,","            target       : true","        });","","        dd.plug(Y.Plugin.DDProxy, {","            moveOnEnd  : false,","            borderStyle: 'none'","        });","","        return dd;","    },","","    /**","     * Create a new drop instance from a DOM node.","     */","    createDrop: function (node, groups) {","        node.addClass('libbit-dd-drop');","","        var dd = new Y.DD.Drop({","            node        : node,","            //padding     : '20 0',","            groups: groups,","            bubbleTargets: this","        });","","        return dd;","    },","","    bindGlobalDrop: function (groups) {","        var container = this.get('container'),","            drop;","","        container.addClass('libbit-global-drop');","","        // Global drop object.","        drop = new Y.DD.Drop({","            node   : container,","            groups: groups,","            bubbleTargets: this.bubbleTarget","            // bubbleTargets: this","        });","","        // Bind the global drop object.","        drop.on('drop:enter', this._dropEnterGlobal, this);","        drop.on('drop:over', this._handleScroll, this);","    },","","// -- Event handlers -----------------------------------------------------------","","    _handleDropHighlight: function (e) {","        Y.all('.libbit-dd-drop-over').each(function (node) {","            node.removeClass('libbit-dd-drop-over');","        });","","        if (this.dropHighlight) {","            e.drop.get('node').addClass('libbit-dd-drop-over');","        }","    },","","    _handleStart: function (e) {","        var drag = e.target;","","        var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');","","        drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));","        drag.get('node').addClass('libbit-dd-drag-placeholder');","    },","","    /**","     * Handles the end of a drag event.","     */","    _handleEnd: function (e) {","        var drag = e.target;","","        // Remove the original event bindings and connect them to this object.","        Y.Array.each(drag.getTargets(), function (n) {","            drag.removeTarget(n);","        });","","        drag.addTarget(this);","","        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.","        drag.detach('drag:end', this._handleEnd);","","        // Reprep since we (potentially) have changed the drag node","        drag._unprep();","        drag._prep();","","        drag.get('node').addClass('libbit-dd-drag');","","        drag.get('node').removeClass('libbit-dd-drag-placeholder');","        drag.get('dragNode').set('innerHTML', '');","    },","","    /**","     * Triggered when a drag item is dragged over a drop item","     */","    _dropOver: function (e) {","        var drop = e.drop.get('node'),","            drag = e.drag.get('node');","","        if (drop.hasClass('libbit-global-drop')) {","            return;","        }","","        if (drop.get('tagName').toLowerCase() !== 'li') {","            if (!drop.contains(drag)) {","                drop.appendChild(drag);","                Y.Lang.later(50, Y, function () {","                    Y.DD.DDM.syncActiveShims(true);","                });","            }","        }","    },","","    /**","     * Handles dragging into a drop region.","     */","    _dropEnter: function (e) {","        var drag = e.drag,","            drop = e.drop,","            dragNode = drag.get('node'),","            dropNode = drop.get('node'),","            append = false,","            //padding = 5,","            padding = 10,","            xy = drag.mouseXY,","            region = drop.region,","            middle1 = region.top + ((region.bottom - region.top) / 2),","            middle2 = region.left + ((region.right - region.left) / 2),","            dir = false,","            dir1 = false,","            dir2 = false,","            next,","            ul;","","        if (dropNode.hasClass('libbit-global-drop')) {","            return;","        }","","        // Resize the proxy if necessary","        if (dropNode.get('tagName').toLowerCase() !== 'ul') {","            // Traverse up to find the ul node","            ul = dropNode.ancestor('ul');","        } else {","            ul = dropNode;","        }","","        if (ul) {","            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging","            var node = Y.DD.DDM.activeDrag.get('dragNode');","            var width = ul.get('offsetWidth');","","            Y.Libbit.Anim.width(node, width);","        }","","        // Insert the placeholder at the correct index","        if ((xy[1] < (region.top + padding))) {","            dir1 = 'top';","        }","","        if ((region.bottom - padding) < xy[1]) {","            dir1 = 'bottom';","        }","","        if ((region.right - padding) < xy[0]) {","            dir2 = 'right';","        }","","        if ((xy[0] < (region.left + padding))) {","            dir2 = 'left';","        }","","        dir = dir2;","","        if (dir2 === false) {","            dir = dir1;","        }","","        switch (dir) {","            case 'top':","                next = dropNode.get('nextSibling');","                if (next) {","                    dropNode = next;","                } else {","                    append = true;","                }","                break;","","            case 'bottom':","                break;","","            case 'right':","            case 'left':","                break;","        }","","        if ((dropNode !== null) && dir) {","            if (dropNode && dropNode.get('parentNode')) {","                if (!append) {","                    dropNode.get('parentNode').insertBefore(dragNode, dropNode);","                } else {","                    dropNode.get('parentNode').appendChild(dragNode);","                }","            }","        }","    },","","    _dropEnterGlobal: function (e) {","        if (Y.DD.DDM.activeDrag) {","            var drag = Y.DD.DDM.activeDrag,","                dragNode = drag.get('dragNode'),","                obj  = drag.get('data'),","                container,","                templateItem;","","            if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {","                // Bind to the document's end drag handler","                drag.on('drag:end', this._handleEnd, this);","","                // Render the item","                var templateItem = new Y.TB.TemplateItem({","                    asset: obj","                });","","                var tiView = new Y.TB.TemplateItemView({","                    model: templateItem","                });","","                tiView.templateModel = this.get('model');","","                container = tiView.render().get('container');","","                // FIXME: The context menu doesn't get bound from tiView.render() for some reason","                container.plug(Y.Libbit.ContextMenu, {","                    content: [","                        { title: 'Remove from template', id: 'removeTemplateItem' },","                        { title: '-' },","                        { title: 'Properties', id: 'templateItemProperties', disabled: true }","                    ],","                    bubbleTarget: tiView","                });","","                var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');","","                container.addClass('libbit-dd-drag-placeholder');","","                // Store a reference to the model so we can access it from the DOM","                container.setData({ model: templateItem });","","                // Cleanup the old node to prevent orphans in the DOM","                drag.get('node').remove();","                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)","                drag.set('node', container);","","                // Update the dragNode","                Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);","            }","        }","    },","","// -- Hover Event handlers -----------------------------------------------------------","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseEnter: function (e) {","        var target = e.currentTarget;","","        if (target.ancestor('.libbit-dd-drag-hover')) {","            target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');","        }","","        if (target.one('.libbit-dd-drag-hover')) {","            target.addClass('libbit-dd-drag-hover-disabled');","        } else {","            target.addClass('libbit-dd-drag-hover');","        }","    },","","    /**","     * Bind hover and prevent hover stacking.","     */","    _handleMouseLeave: function (e) {","        var target = e.currentTarget;","","        if (target.hasClass('libbit-dd-drag-hover')) {","            target.removeClass('libbit-dd-drag-hover');","        }","","        if (target.ancestor('.libbit-dd-drag-hover-disabled')) {","            target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');","        }","    },","","// -- Scroll handler for the global drop region --------------------------------------","","    /**","     * Scroll the view up or down when a drag reaches the boundaries on the Y axis","     */","    _handleScroll: function (e) {","        var dropNode    = e.drop.get('node'),","            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),","            parent      = dropNode.get('offsetParent'),","            // nodeOffsetY = dropNode.get('offsetTop'),","            // nodeHeight  = dropNode.get('offsetHeight'),","            nodeHeight  = Y.one('#main').get('offsetHeight'),","            relativeY,","            node,","            anim,","            dir;","","        var buffer = 30;","        var delay = 235;","        var marginTop = 40;","","        if (dragY < prevY) {","            dir = 'up';","        } else {","            dir = 'down';","        }","","        // GLOBAL","        prevY = dragY;","","        if (dragY - marginTop < buffer && dir === 'up') {","            // Scroll up","            node = parent;","            anim = new Y.Anim({","                node: node,","                to: {","                    scroll: function(node) {","                        return [node.get('scrollTop') + node.get('offsetHeight'), 0];","                    }","                },","                easing: Y.Easing.easeOut","            });","","            anim.run();","        }","","        if (dragY - marginTop > nodeHeight - buffer && dir === 'down') {","            // Scroll down","            node = parent;","            anim = new Y.Anim({","                node: node,","                to: {","                    scroll: function(node) {","                        return [0, node.get('scrollTop') + node.get('offsetHeight')];","                    }","                },","                easing: Y.Easing.easeOut","            });","","            anim.run();","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').DD = DD;","","","}, '1.0.0', {\"requires\": [\"libbit-anim\", \"libbit-dd-css\", \"view\"]});"];
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].lines = {"1":0,"3":0,"5":0,"8":0,"24":0,"26":0,"29":0,"30":0,"31":0,"38":0,"39":0,"49":0,"51":0,"58":0,"63":0,"70":0,"72":0,"79":0,"83":0,"86":0,"89":0,"97":0,"98":0,"104":0,"105":0,"108":0,"109":0,"114":0,"116":0,"118":0,"119":0,"126":0,"129":0,"130":0,"133":0,"136":0,"139":0,"140":0,"142":0,"144":0,"145":0,"152":0,"155":0,"156":0,"159":0,"160":0,"161":0,"162":0,"163":0,"173":0,"190":0,"191":0,"195":0,"197":0,"199":0,"202":0,"204":0,"205":0,"207":0,"211":0,"212":0,"215":0,"216":0,"219":0,"220":0,"223":0,"224":0,"227":0,"229":0,"230":0,"233":0,"235":0,"236":0,"237":0,"239":0,"241":0,"244":0,"248":0,"251":0,"252":0,"253":0,"254":0,"256":0,"263":0,"264":0,"270":0,"272":0,"275":0,"279":0,"283":0,"285":0,"288":0,"297":0,"299":0,"302":0,"305":0,"307":0,"310":0,"321":0,"323":0,"324":0,"327":0,"328":0,"330":0,"338":0,"340":0,"341":0,"344":0,"345":0,"355":0,"366":0,"367":0,"368":0,"370":0,"371":0,"373":0,"377":0,"379":0,"381":0,"382":0,"386":0,"392":0,"395":0,"397":0,"398":0,"402":0,"408":0,"414":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].functions = {"initializer:22":0,"_libbitDropHit:34":0,"createDrag:48":0,"createDrop:69":0,"bindGlobalDrop:82":0,"(anonymous 2):104":0,"_handleDropHighlight:103":0,"_handleStart:113":0,"(anonymous 3):129":0,"_handleEnd:125":0,"(anonymous 4):162":0,"_dropOver:151":0,"_dropEnter:172":0,"_dropEnterGlobal:262":0,"_handleMouseEnter:320":0,"_handleMouseLeave:337":0,"scroll:385":0,"scroll:401":0,"_handleScroll:354":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredLines = 128;
_yuitest_coverage["build/libbit-dd/libbit-dd.js"].coveredFunctions = 20;
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

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 26);
this.on('drop:over', this._handleDropHighlight, this);

        // Pass the event through a bubble target, so we get the first event in the chain
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 29);
this.bubbleTarget = new BubbleTarget();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 30);
this.bubbleTarget.addTarget(this);
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 31);
this.bubbleTarget.on('drop:hit', this._libbitDropHit, this);
    },

    _libbitDropHit: function (e) {
        // Workaround: We can't detect the libbit-global-drop node from e.drop.get('node'), because it doesn't bubble
        // properly. We can however block this node in the 'drop:over' and 'drop:enter' events, resulting in the parentNode
        // of the drag node being null.
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_libbitDropHit", 34);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 38);
if (e.drag.get('node').get('parentNode') === null) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 39);
e.stopImmediatePropagation();
        }
    },

// -- Node setup ---------------------------------------------------------------

    /**
     * Create a new drag instance from a DOM node.
     */
    createDrag: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrag", 48);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 49);
node.addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 51);
var dd = new Y.DD.Drag({
            node         : node,
            groups: groups,
            bubbleTargets: this,
            target       : true
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 58);
dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 63);
return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "createDrop", 69);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 70);
node.addClass('libbit-dd-drop');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 72);
var dd = new Y.DD.Drop({
            node        : node,
            //padding     : '20 0',
            groups: groups,
            bubbleTargets: this
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 79);
return dd;
    },

    bindGlobalDrop: function (groups) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "bindGlobalDrop", 82);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 83);
var container = this.get('container'),
            drop;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 86);
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
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 98);
drop.on('drop:over', this._handleScroll, this);
    },

// -- Event handlers -----------------------------------------------------------

    _handleDropHighlight: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleDropHighlight", 103);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 104);
Y.all('.libbit-dd-drop-over').each(function (node) {
            _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 2)", 104);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 105);
node.removeClass('libbit-dd-drop-over');
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 108);
if (this.dropHighlight) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 109);
e.drop.get('node').addClass('libbit-dd-drop-over');
        }
    },

    _handleStart: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleStart", 113);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 114);
var drag = e.target;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 116);
var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 118);
drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 119);
drag.get('node').addClass('libbit-dd-drag-placeholder');
    },

    /**
     * Handles the end of a drag event.
     */
    _handleEnd: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleEnd", 125);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 126);
var drag = e.target;

        // Remove the original event bindings and connect them to this object.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 129);
Y.Array.each(drag.getTargets(), function (n) {
            _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 3)", 129);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 130);
drag.removeTarget(n);
        });

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 133);
drag.addTarget(this);

        // FIXME: The event handler stacks up, detaching it once limits it to 2 for new nodes.
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 136);
drag.detach('drag:end', this._handleEnd);

        // Reprep since we (potentially) have changed the drag node
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 139);
drag._unprep();
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 140);
drag._prep();

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 142);
drag.get('node').addClass('libbit-dd-drag');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 144);
drag.get('node').removeClass('libbit-dd-drag-placeholder');
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 145);
drag.get('dragNode').set('innerHTML', '');
    },

    /**
     * Triggered when a drag item is dragged over a drop item
     */
    _dropOver: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropOver", 151);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 152);
var drop = e.drop.get('node'),
            drag = e.drag.get('node');

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 155);
if (drop.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 156);
return;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 159);
if (drop.get('tagName').toLowerCase() !== 'li') {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 160);
if (!drop.contains(drag)) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 161);
drop.appendChild(drag);
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 162);
Y.Lang.later(50, Y, function () {
                    _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "(anonymous 4)", 162);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 163);
Y.DD.DDM.syncActiveShims(true);
                });
            }
        }
    },

    /**
     * Handles dragging into a drop region.
     */
    _dropEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnter", 172);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 173);
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

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 190);
if (dropNode.hasClass('libbit-global-drop')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 191);
return;
        }

        // Resize the proxy if necessary
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 195);
if (dropNode.get('tagName').toLowerCase() !== 'ul') {
            // Traverse up to find the ul node
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 197);
ul = dropNode.ancestor('ul');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 199);
ul = dropNode;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 202);
if (ul) {
            // Set the width on a child of the proxy, as the width of proxy itself gets overriden constantly while dragging
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 204);
var node = Y.DD.DDM.activeDrag.get('dragNode');
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 205);
var width = ul.get('offsetWidth');

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 207);
Y.Libbit.Anim.width(node, width);
        }

        // Insert the placeholder at the correct index
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 211);
if ((xy[1] < (region.top + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 212);
dir1 = 'top';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 215);
if ((region.bottom - padding) < xy[1]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 216);
dir1 = 'bottom';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 219);
if ((region.right - padding) < xy[0]) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 220);
dir2 = 'right';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 223);
if ((xy[0] < (region.left + padding))) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 224);
dir2 = 'left';
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 227);
dir = dir2;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 229);
if (dir2 === false) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 230);
dir = dir1;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 233);
switch (dir) {
            case 'top':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 235);
next = dropNode.get('nextSibling');
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 236);
if (next) {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 237);
dropNode = next;
                } else {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 239);
append = true;
                }
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 241);
break;

            case 'bottom':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 244);
break;

            case 'right':
            case 'left':
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 248);
break;
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 251);
if ((dropNode !== null) && dir) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 252);
if (dropNode && dropNode.get('parentNode')) {
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 253);
if (!append) {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 254);
dropNode.get('parentNode').insertBefore(dragNode, dropNode);
                } else {
                    _yuitest_coverline("build/libbit-dd/libbit-dd.js", 256);
dropNode.get('parentNode').appendChild(dragNode);
                }
            }
        }
    },

    _dropEnterGlobal: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_dropEnterGlobal", 262);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 263);
if (Y.DD.DDM.activeDrag) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 264);
var drag = Y.DD.DDM.activeDrag,
                dragNode = drag.get('dragNode'),
                obj  = drag.get('data'),
                container,
                templateItem;

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 270);
if (obj.name === 'fieldGroup' || obj.name === 'image' || obj.name === 'table') {
                // Bind to the document's end drag handler
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 272);
drag.on('drag:end', this._handleEnd, this);

                // Render the item
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 275);
var templateItem = new Y.TB.TemplateItem({
                    asset: obj
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 279);
var tiView = new Y.TB.TemplateItemView({
                    model: templateItem
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 283);
tiView.templateModel = this.get('model');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 285);
container = tiView.render().get('container');

                // FIXME: The context menu doesn't get bound from tiView.render() for some reason
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 288);
container.plug(Y.Libbit.ContextMenu, {
                    content: [
                        { title: 'Remove from template', id: 'removeTemplateItem' },
                        { title: '-' },
                        { title: 'Properties', id: 'templateItemProperties', disabled: true }
                    ],
                    bubbleTarget: tiView
                });

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 297);
var proxy = container.cloneNode(true).addClass('libbit-dd-drag-proxy');

                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 299);
container.addClass('libbit-dd-drag-placeholder');

                // Store a reference to the model so we can access it from the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 302);
container.setData({ model: templateItem });

                // Cleanup the old node to prevent orphans in the DOM
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 305);
drag.get('node').remove();
                // Insert it in the dragNode (we need to reprep after dropping to keep the drag node working)
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 307);
drag.set('node', container);

                // Update the dragNode
                _yuitest_coverline("build/libbit-dd/libbit-dd.js", 310);
Y.Libbit.Anim.morph(dragNode, proxy, Y.Libbit.Anim.fadeOut, Y.Libbit.Anim.slideIn);
            }
        }
    },

// -- Hover Event handlers -----------------------------------------------------------

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseEnter: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseEnter", 320);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 321);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 323);
if (target.ancestor('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 324);
target.ancestor('.libbit-dd-drag-hover').replaceClass('libbit-dd-drag-hover', 'libbit-dd-drag-hover-disabled');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 327);
if (target.one('.libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 328);
target.addClass('libbit-dd-drag-hover-disabled');
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 330);
target.addClass('libbit-dd-drag-hover');
        }
    },

    /**
     * Bind hover and prevent hover stacking.
     */
    _handleMouseLeave: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleMouseLeave", 337);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 338);
var target = e.currentTarget;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 340);
if (target.hasClass('libbit-dd-drag-hover')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 341);
target.removeClass('libbit-dd-drag-hover');
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 344);
if (target.ancestor('.libbit-dd-drag-hover-disabled')) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 345);
target.ancestor('.libbit-dd-drag-hover-disabled').replaceClass('libbit-dd-drag-hover-disabled', 'libbit-dd-drag-hover');
        }
    },

// -- Scroll handler for the global drop region --------------------------------------

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleScroll: function (e) {
        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "_handleScroll", 354);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 355);
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

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 366);
var buffer = 30;
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 367);
var delay = 235;
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 368);
var marginTop = 40;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 370);
if (dragY < prevY) {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 371);
dir = 'up';
        } else {
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 373);
dir = 'down';
        }

        // GLOBAL
        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 377);
prevY = dragY;

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 379);
if (dragY - marginTop < buffer && dir === 'up') {
            // Scroll up
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 381);
node = parent;
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 382);
anim = new Y.Anim({
                node: node,
                to: {
                    scroll: function(node) {
                        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "scroll", 385);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 386);
return [node.get('scrollTop') + node.get('offsetHeight'), 0];
                    }
                },
                easing: Y.Easing.easeOut
            });

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 392);
anim.run();
        }

        _yuitest_coverline("build/libbit-dd/libbit-dd.js", 395);
if (dragY - marginTop > nodeHeight - buffer && dir === 'down') {
            // Scroll down
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 397);
node = parent;
            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 398);
anim = new Y.Anim({
                node: node,
                to: {
                    scroll: function(node) {
                        _yuitest_coverfunc("build/libbit-dd/libbit-dd.js", "scroll", 401);
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 402);
return [0, node.get('scrollTop') + node.get('offsetHeight')];
                    }
                },
                easing: Y.Easing.easeOut
            });

            _yuitest_coverline("build/libbit-dd/libbit-dd.js", 408);
anim.run();
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dd/libbit-dd.js", 414);
Y.namespace('Libbit').DD = DD;


}, '1.0.0', {"requires": ["libbit-anim", "libbit-dd-css", "view"]});
