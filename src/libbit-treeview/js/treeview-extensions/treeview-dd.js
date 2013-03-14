var DD;

/**
 * Drag and drop extension for the TreeView.
 */
DD = Y.Base.create('dd', Y.Base, [], {

    /**
     * DD references store
     */
    _ddMap: [],

    /**
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        if (this.get('dragdrop')) {
            Y.Do.after(this._bindDD, this, '_bindEvents', this);

            this.on('drop:enter', function (e) {
                e.drop.get('node').all('.libbit-treeview-icon').addClass('icon-white');
            });
            this.on('drop:exit', function (e) {
                e.drop.get('node').all('.icon-white').removeClass('icon-white');
            });
            this.on('drag:start', this._handleStart, this);
            this.on('drop:hit', this._handleDrop, this);
        }
    },

    /**
     * Update all the the DD shims
     * Most likely used in combination with libbit-nodescroll (scrolling event).
     */
    sizeShims: function() {
        for (var i in this._ddMap) {
            if (typeof(this._ddMap[i].sizeShim) === 'function') {
                this._ddMap[i].sizeShim();
            }
        }
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        var self       = this,
            tree       = this.get('tree'),
            nodes;

        if (this._treeNodes.length === 0) {
            return;
        } else {
            nodes = this._treeNodes;
        }

        Y.each(nodes, function (value) {
            var node,
                model;

            node = tree.getHTMLNode(value).one('div');
            model = value.data;

            if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model. Categories allow dropping.
                var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                node.addClass('libbit-treeview-drop');
                self._ddMap.push(catDD);
            }

            self._createDD(node, model);
        });

        if (this.get('header')) {
            var headerDrop = new Y.DD.Drop({
                node         : this.get('contentBox').one('.nav-header'),
                // Only allow categories to drop here
                groups       : [ Y.stamp(this) ],
                bubbleTargets: self
            });

            headerDrop.on('drop:enter', function (e) {
                e.drop.get('node').get('parentNode').get('parentNode').addClass('libbit-treeview-drop-over-global');
            });
            headerDrop.on('drop:exit', function () {
                Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');
            });
        }
    },

    _createDD: function (node, data) {
        var groups = this.get('groups'),
            self = this,
            dd;

        if (data instanceof Y.TB.Category) {
            groups = groups.concat([ Y.stamp(this) ]);
        }

        // Add an extra unique group for the category drags.
        dd = new Y.DD.Drag({
            node         : node,
            data         : data,
            groups       : groups,
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        this._ddMap.push(dd);

        return dd;
    },

    _handleStart: function (e) {
        var drag = e.target,
            model,
            container,
            origin,
            dd;

        model = drag.get('data');

        drag.get('dragNode').setContent(
            drag.get('node').get('outerHTML')
        );

        origin = drag.get('node');

        drag._prep();

        drag.detachAll('drag:start');

        container = Y.Node.create('<div></div>');
        drag.set('node', container);

        drag.set('target', true);
        drag._prep();

        dd = this._createDD(origin, model);
    },

    _handleDrop: function (e) {
        var treeModel = this.get('data'),
            objID     = e.drag.get('data').get('clientId'),
            newCatID  = e.drop.get('node').get('parentNode').getAttribute('data-yui3-record'),
            // The model that was moved.
            obj       = treeModel.getByClientId(objID);
            // The category model it was dropped on, or null if it was dropped onto the header.
            newCat    = treeModel.getByClientId(newCatID),
            self      = this;

        Y.all('.libbit-treeview-drop-over-global').removeClass('libbit-treeview-drop-over-global');
        e.drop.get('node').all('.icon-white').removeClass('icon-white');

        if (obj) {
            if (Y.instanceOf(obj, Y.TB.Category)) {
                obj.set('parent', newCat);
            } else {
                obj.set('category', newCat);
            }

            obj.save(function () {
                treeModel.load(function () {
                    self.refresh();
                });
            });
        }
    }
}, {
    ATTRS: {
        dragdrop: {
            value : false
        },

        groups: {
            value : ['libbit-treeview']
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').DD = DD;
