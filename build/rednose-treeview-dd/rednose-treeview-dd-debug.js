YUI.add('rednose-treeview-dd', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Drag and drop extension for the TreeView.
 */
var DD = Y.Base.create('dd', Y.Base, [], {

    // -- Protected Properties -------------------------------------------------

    /**
     * DD references store
     *
     * @property _ddMap
     * @type {Array}
     * @protected
     */

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this._ddMap = [];

        this.get('dragdrop') && this._attachDdEvents();
    },

    destructor: function () {
        this._destroyDd();
        this._detachDdEvents();

        this._ddMap = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Update all the the DD shims
     * Most likely used in combination with rednose-nodescroll (scrolling event).
     */
    sizeShims: function() {
        for (var i in this._ddMap) {
            if (typeof(this._ddMap[i].sizeShim) === 'function') {
                this._ddMap[i].sizeShim();
            }
        }
    },

    // -- Protected Methods ----------------------------------------------------

    _handleBind: function (parent) {
        var self      = this,
            htmlNodes = parent.one('.' + this.classNames.children).all('[data-rednose-type]:not(.rednose-treeview-drag)'),
            ddTest    = this.get('ddTest');

        htmlNodes.each(function (htmlNode) {
            var node = self.getNodeById(htmlNode.getData('node-id'));

            if (ddTest === null || (typeof ddTest === 'function' && ddTest(node) === true)) {
                self._createDd(htmlNode, node);
            }
        });
    },

   _bindHeader: function () {
       var container  = this.get('container'),
           dd;

       dd = new Y.DD.Drop({
           node         : container.one('.nav-header'),
           // Only allow categories to drop here.
           // groups       : [ Y.stamp(this) ],
           groups       : this.get('groups'),
           bubbleTargets: this
       });

       this._attachHeaderEvents(dd);
       this._ddMap.push(dd);
   },

    _createDd: function (node, data) {
        var groups = this.get('groups'),
            dd;

        if (data instanceof Y.TB.Category) {
            groups = groups.concat([ Y.stamp(this) ]);
        }

        // Add an extra unique group for the category drags.
        dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: this
        });

        dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        node.addClass('rednose-treeview-drag');
        this._ddMap.push(dd);

        return dd;
    },

    _attachDdEvents: function () {
        this._ddEventHandles || (this._ddEventHandles = []);

        this._ddEventHandles.push(
            // Setup the initial DD instances when the view is rendered.
            Y.Do.after(this._afterRender, this, 'render', this),

            this.on({
                'drag:start': this._handleStart
            }),

            this.after('open', this._handleDdOpen)
        );
    },

    _attachHeaderEvents: function (dd) {
        this._ddEventHandles.push(
            dd.on({
                'drop:enter': this._handleHeaderEnter,
                'drop:exit' : this._handleHeaderExit
            })
        );
    },

    _detachDdEvents: function () {
        (new Y.EventHandle(this._ddEventHandles)).detach();
    },

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDd: function() {
        Y.Array.each(this._ddMap, function (dd) {
            dd.destroy();
        });

        this._ddMap.length = 0;
    },

    // -- Protected Event Handlers ---------------------------------------------

    _afterRender: function () {
        this._destroyDd();
        this._handleBind(this.get('container'));

        // FIXME: Doesn't work when quickly rerendering the tree and opening all nodes.
        // this.header && this._bindHeader();
    },

    _handleHeaderEnter: function (e) {
        var node = e.drop.get('node').ancestor('.rednose-treeview-outer-container');

        node.addClass('rednose-treeview-drop-over-global');
    },

    _handleHeaderExit: function (e) {
        var node = e.drop.get('node').ancestor('.rednose-treeview-outer-container');

        node.hasClass('rednose-treeview-drop-over-global') && node.removeClass('rednose-treeview-drop-over-global');
    },

    _handleDdOpen: function (e) {
        if (!this.rendered) {
            return;
        }

        var treeNode = e.node,
            htmlNode = this.getHTMLNode(treeNode);

        this._handleBind(htmlNode);
    },

    _handleStart: function (e) {
        var drag = e.target,
            model,
            container,
            origin;

        model = drag.get('data');

        drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        // Recreate the drag instance.
        origin = drag.get('node');

        drag._prep();

        drag.detachAll('drag:start');
        container = Y.Node.create('<div></div>');

        drag.set('node', container);
        drag.set('target', true);

        drag._prep();

        this._createDd(origin, model);
    }
}, {
    ATTRS: {
        /**
         * @attribute dragdrop
         * @type {Boolean}
         * @default false
         */
        dragdrop: {
            value: false
        },

        /**
         * @attribute ddTest
         * @type {Function}
         * @default null
         */
        ddTest: {
            value: null
        },

        /**
         * @attribute groups
         * @type {Array}
         * @default ['rednose-treeview']
         */
        groups: {
            value: ['rednose-treeview']
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.TreeView').DD = DD;


}, '@VERSION@', {"requires": ["dd"]});
