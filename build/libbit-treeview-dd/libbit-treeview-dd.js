YUI.add('libbit-treeview-dd', function (Y, NAME) {

var DD;

/**
 * Drag and drop extension for the TreeView.
 */
DD = Y.Base.create('dd', Y.Base, [], {

    /**
     * Subscribe to the render event and set up DD listeners.
     */
    initializer: function () {
        if (this.get('dragdrop')) {
            Y.Do.after(this._bindDD, this, 'bindUI', this);

            this.on('drag:start', this._handleStart, this);
            this.on('drop:hit', this._handleDrop, this);
            this.on('drop:over', this._handleOver, this);

            this.on('drop:enter', this._handleEnter, this);
            this.on('drop:exit', this._handleExit, this);
            this.on('drag:end', this._handleEnd, this);
        }
    },

    /**
     * Bind all DD instance after the parent view has been rendered.
     */
    _bindDD: function () {
        var self       = this,
            contentBox = this.get('contentBox').get('parentNode').get('parentNode').get('parentNode'),
            tree       = this.get('tree'),
            nodes;

        // XXX
        contentBox.addClass('libbit-content');

        // Setup a container drop target.
        new Y.DD.Drop({
             node         : contentBox,
             groups       : ['libbit-treeview'],
             bubbleTargets: this
        });

        // Setup Tree DD.
        tree.expandAll();

        nodes = tree.getNodesBy(function () { return true; });

        Y.each(nodes, function (value) {
            var node,
                model;

            // Bind the DD to the parent table, for a wider drop range.
            node = Y.one('#' + value.labelElId).ancestor('table');

            // TODO: Query modellist to get fieldGroup model objects
            model = value.data;

            if (Y.instanceOf(model, Y.TB.Category)) {
                // This is a category model.
                self._createDD(node, model);
                // Categories allow dropping
                new Y.DD.Drop({
                    node         : node,
                    groups       : ['libbit-treeview'],
                    bubbleTargets: self
                });
            } else {
                // This is a fieldGroup.
                self._createDD(node, model);
            }

        });

        tree.collapseAll();
    },

    /**
     * Scroll the view up or down when a drag reaches the boundaries on the Y axis
     */
    _handleOver: function (e) {
        var dropNode    = e.drop.get('node'),
            dragY       = Y.DD.DDM.activeDrag.get('dragNode').getY(),
            nodeOffsetY = dropNode.get('offsetTop'),
            nodeHeight  = dropNode.get('offsetHeight'),
            relativeY,
            node,
            anim;

        if (dropNode.hasClass('yui3-widget-bd')) {
            // Handle dropping on empty parts
            if (dropNode.all('.yui3-dd-drop-over').isEmpty()) {
                dropNode.addClass('libbit-content-drop-over');
            } else {
                if (dropNode.hasClass('libbit-content-drop-over')) {
                    dropNode.removeClass('libbit-content-drop-over');
                }
            }

            // Handle scrolling
            relativeY = dragY - nodeOffsetY - 20; /* Margin top */
            if (relativeY > nodeHeight) {
                // Scroll down
                node = Y.one('.libbit-tabview .yui3-widget-bd');
                anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            return [0, node.get('scrollTop') + node.get('offsetHeight')];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                anim.run();
            } else if (relativeY < 15) {
                // Scroll up
                node = Y.one('.libbit-tabview .yui3-widget-bd');
                anim = new Y.Anim({
                    node: node,
                    to: {
                        scroll: function(node) {
                            return [node.get('scrollTop') + node.get('offsetHeight'), 0];
                        }
                    },
                    easing: Y.Easing.easeOut
                });

                anim.run();
            }
        }
    },

    _createDD: function (node, data) {
        var self = this,
            dd;

        dd = new Y.DD.Drag({
            node   : node,
            data   : data,
            groups : ['libbit-treeview'],
            bubbleTargets: self
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        return dd;
    },

    _handleStart: function (e) {
        var drag = e.target,
            fieldGroup,
            container,
            origin,
            dd;

        fieldGroup = drag.get('data');
        drag.get('dragNode').setContent(drag.get('node').one('.ygtvlabel').get('outerHTML'));

        origin = drag.get('node');

        drag._prep();

        drag.detachAll('drag:start');

        container = Y.Node.create('<div></div>');
        drag.set('node', container);

        drag.set('target', true);
        drag._prep();

        dd = this._createDD(origin, fieldGroup);
    },

    _handleDrop: function (e) {
        var treeModel = this.get('data'),
            objID     = e.drag.get('data').get('clientId'),
            newCatID  = e.drop.get('node').getAttribute('data-yui3-record'),
            // The model that was moved.
            obj       = treeModel.getByClientId(objID);
            // The category model it was dropped on, or null if it was dropped outside the tree.
            newCat    = treeModel.getByClientId(newCatID);

        if (obj) {
            if (Y.instanceOf(obj, Y.TB.Category)) {
                obj.set('parent', newCat);
            } else {
                obj.set('category', newCat);
            }

            obj.save(function () {
                treeModel.load();
            });
        }
    },

    _handleExit: function (e) {
        var dropNode = e.drop.get('node');

        if (dropNode.hasClass('libbit-content-drop-over')) {
            dropNode.removeClass('libbit-content-drop-over');
        }
    },

    _handleEnd: function (e) {
        var contentBox = this.get('contentBox').get('parentNode').get('parentNode').get('parentNode');

        if (contentBox.hasClass('libbit-content-drop-over')) {
            contentBox.removeClass('libbit-content-drop-over');
        }
    },

    // TODO: Abstract
    _handleEnter: function (e) {
        if (Y.DD.DDM.activeDrag) {
            var drag = Y.DD.DDM.activeDrag,
                node = drag.get('dragNode'),
                obj  = drag.get('data'),
                n,
                fieldGroup,
                anim;

            if (Y.instanceOf(obj, Y.TB.TemplateItem)) {
                fieldGroup = obj.get('fieldGroup');
                drag.set('data', fieldGroup);

                // Clone the node, position it on top of the original for secondary animation.
                n = node.cloneNode(true).set('id', null).setStyle('position', 'absolute');
                Y.one('body').appendChild(n);
                n.setXY(node.getXY());

                node.setStyle('opacity', 0);
                node.set('innerHTML',
                    '<div class="libbit-fieldgroup-drag"><i class="icon-align-left"></i><span> </span>' + fieldGroup.get('name') + '</div>'
                );

                anim = new Y.Anim({
                    node: n.one('.libbit-template-item-container'),
                    to: {
                        width: 0,
                        height: 0
                    },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                anim.on('end', function () {
                    n.remove();
                });

                anim.run();

                anim = new Y.Anim({
                    node: node,
                    to: { opacity: 1 },
                    duration: '.25',
                    easing: Y.Easing.easeOut
                });

                anim.run();
           }
        }
    }
}, {
    ATTRS: {
        dragdrop: {
            value : false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.TreeView').DD = DD;


}, '1.0.0', {"requires": ["dd", "event-custom"]});
