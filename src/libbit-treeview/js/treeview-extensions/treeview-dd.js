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
        var self = this;

        if (this.get('dragdrop')) {
            Y.Do.after(this._bindDD, this, '_bindEvents', this);

            self.on('beforeRefresh', function() {
                self._destroyDD();
            });

            this.on('drag:start', this._handleStart, this);
            this.on('drop:hit', this._handleDrop, this);

            // this.on('drop:over', this._setClass, this);
            // this.on('drag:end', this._setClass, this);
            this.on('drop:over', this._handleOver, this);
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
                // This is a category model.
                // Categories allow dropping
                var catDD = new Y.DD.Drop({
                    node         : node,
                    groups       : self.get('groups'),
                    bubbleTargets: self
                });

                self._ddMap.push(catDD);
            }

            self._createDD(node, model);
        });
    },

    _createDD: function (node, data) {
        var self = this,
            dd;

        dd = new Y.DD.Drag({
            node   : node,
            data   : data,
            groups : this.get('groups'),
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        this._ddMap.push(dd);

        return dd;
    },

    /**
     * All DD references must be destoyed if the model is reloaded.
     */
    _destroyDD: function() {
        for (var i in this._ddMap) {
            this._ddMap[i].destroy();
        }

        this._ddMap = [];
    },

    _handleStart: function (e) {
        var drag = e.target,
            model,
            container,
            origin,
            dd;

        // var drag = e.target;
        // var proxy = drag.get('node').cloneNode(true).addClass('libbit-dd-drag-proxy');

        // drag.get('dragNode').set('innerHTML', proxy.get('outerHTML'));
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
            // The category model it was dropped on, or null if it was dropped outside the tree.
            newCat    = treeModel.getByClientId(newCatID);

            console.log(e.drop.get('node'));
        // if (obj) {
        //     if (Y.instanceOf(obj, Y.TB.Category)) {
        //         obj.set('parent', newCat);
        //     } else {
        //         obj.set('category', newCat);
        //     }

        //     obj.save(function () {
        //         treeModel.load();
        //     });
        // }
    },

    _handleOver: function (e) {
        // console.log(e);
    },

    _setClass: function (e) {
        var activeEl;

        switch (e.type) {
            case 'drop:over':
                var node = e.drop.get('node');

                if (node.hasClass('libbit-content-drop-over') === false) {
                    if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {
                        activeEl.removeClass('libbit-content-drop-over');
                    }

                    node.addClass('libbit-content-drop-over');
                }
                break;

            case 'drag:end':
                if (activeEl = this.get('contentBox').one('.libbit-content-drop-over')) {
                    activeEl.removeClass('libbit-content-drop-over');
                }
                break;
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
