YUI.add('libbit-treeview', function (Y, NAME) {

var TreeView;

TreeView = Y.Base.create('treeView', Y.TreeView, [Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD, Y.Libbit.TreeView.Selectable], {
    // -- Public Properties ----------------------------------------------------

    // Tree header, optional.
    header : {
        value: null
    },

    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    /**
    * Icon (className) mapping for different types of models
    */
    // _iconMap: [],

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        // Hook into the initializer chain to set the nodes.
        config.nodes = config.model.get('items');

        if (config.header) {
            this.header = config.header;
        }

        var model = config.model;

        this.set('model', model);

        // if (model.get('icons')) {
        //     this._iconMap = model.get('icons');
        // }

        this._attachEventHandles();
    },

    destructor: function () {
        this._detachEventHandles();

        // Remove the container that we wrapped around the subcontainer.
        this.get('container').remove();
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Overrides TreeView's `render()` method to wrap the container into a parent container,
     * and hook into the rendering process.
     *
     * @method render
     * @chainable
     * @see TreeView.render()
     */
    render: function () {
        var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win,
            header        = this.header;

        if (!this.rendered) {
            // Append a subcontainer to render the tree.
            var subContainer = Y.Node.create('<div class="libbit-treeview-inner-container"></div>');

            container.addClass('libbit-treeview-outer-container');
            container.append(subContainer);

            container.addClass(this.classNames.treeview);
            container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

            if (header) {
                subContainer.append('<div class="nav-header">' + header + '</div>');
            }
        }

        this._childrenNode = this.renderChildren(this.rootNode, {
            // Pass the subcontainer.
            container: container.one('.libbit-treeview-inner-container')
        });

        this.rendered = true;

        return this;
    },

    // -- Protected Methods ----------------------------------------------------

    // Store a reference to custom events so we can detach them later.
    _attachEventHandles: function () {
        this._eventHandles || (this._eventHandles = []);

        var model = this.get('model');

        this._eventHandles.push(
            this.on('open', this._handleExpand, this),
            this.on('close', this._handleCollapse, this),

            model.after('change', this._handleModelChange, this)
        );
    },

    // Destroy the custom events.
    _detachEventHandles: function () {
        (new Y.EventHandle(this._eventHandles)).detach();
    },

    _generateLibbitRecordId: function (model) {
        if (model instanceof Y.Model) {
            return model.name + '_' + model.get('id');
        }

        return null;
    },

    _parseLibbitRecordId: function (id) {
        return id.split('_');
    },

    _restoreTreeOpenState: function () {
        var self     = this,
            rootNode = this.rootNode;

        if (rootNode.hasChildren() && this._stateMap && this._stateMap.length > 0) {
            Y.Array.each(rootNode.children, function (node) {
                self._restoreNodeOpenState(node);
            });
        }
    },

    _restoreNodeOpenState: function (node) {
         var id    = this._generateLibbitRecordId(node.data),
             index = Y.Array.indexOf(this._stateMap, id);

         if (index !== -1) {
            node.open({silent: true});
         }

         // Look for child nodes to open, even if their parent is closed.
        if (node.hasChildren()) {
            Y.Array.each(node.children, function (child) {
                this._restoreNodeOpenState(child);
            }, this);
        }
    },

    // _fixWidth: function (node) {
    //     var li = this.getHTMLNode(node);
    //     var count = 0;
    //     var current = li.ancestor('.' + this.classNames.children);

    //     while (current.ancestor('.' + this.classNames.children)) {
    //         count++;
    //         current = current.ancestor('.' + this.classNames.children);
    //     }

    //     if (count > 0) {
    //         var ml = count * 20;

    //         if (ml) {
    //             li.setStyle('marginLeft', -ml);
    //             li.one('div').setStyle('paddingLeft', ml + 20);
    //             li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);
    //             li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);
    //         }
    //     }
    // },

    // /**
    //  * Update the icon classes
    //  */
    // _setIcon: function(node, className) {
    //     if (node) {
    //         var iconNode = node.one('.' + this.classNames.icon);

    //         if (iconNode) {
    //             iconNode.removeClass(this.classNames.icon);
    //             iconNode.addClass(className);
    //             iconNode.addClass('libbit-treeview-icon');
    //         }
    //     }
    // },

    // -- Protected Event Handlers ---------------------------------------------

    // /**
    // * Folderstate icons
    // **/
    // _handleIcon: function (e) {
    //     var node   = e.node,
    //         type   = e.type,
    //         iconEl = this.getHTMLNode(node).one('.icon-folder-close');

    //     if (type === 'treeView:close') {
    //         iconEl = this.getHTMLNode(node).one('.icon-folder-open');
    //     }

    //     if (iconEl) {
    //         if (type === 'treeView:close') {
    //             iconEl.removeClass('icon-folder-open');
    //             iconEl.addClass('icon-folder-close');
    //         } else {
    //             iconEl.removeClass('icon-folder-close');
    //             iconEl.addClass('icon-folder-open');
    //         }
    //     }
    // },

    _handleExpand: function (e) {
         var id    = this._generateLibbitRecordId(e.node.data),
             index = Y.Array.indexOf(this._stateMap, id);

        if (index === -1) {
            this._stateMap.push(id);
        }
    },

    _handleCollapse: function (e) {
        var id    = this._generateLibbitRecordId(e.node.data),
            index = Y.Array.indexOf(this._stateMap, id);

        if (index !== -1) {
            this._stateMap.splice(index, 1);
        }
    },

    _handleModelChange: function () {
        var nodes = this.get('model').get('items');

        this.clear({silent: true});

        if (nodes) {
            // Returns an array of references to the created tree nodes.
            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            this._restoreTreeOpenState(treeNodes);
        }

        if (this.rendered) {
            this.render();
        }
    }
}, {
    ATTRS: {
        filter: {
            value : null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').TreeView = TreeView;


}, '1.0.0', {
    "requires": [
        "gallery-sm-treeview",
        "libbit-model-tree",
        "libbit-treeview-anim",
        "libbit-treeview-dd",
        "libbit-treeview-templates",
        "libbit-treeview-select"
    ],
    "supersedes": [
        "gallery-sm-treeview-templates"
    ],
    "skinnable": true
});
