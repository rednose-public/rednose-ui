YUI.add('libbit-treeview', function (Y, NAME) {

var TreeView;

var Micro = Y.Template.Micro;

Y.namespace('TreeView').Templates = {
    children: Micro.compile(
        '<ul class="<%= data.classNames.children %>" ' +

            '<% if (data.node.isRoot()) { %>' +
                'role="tree" tabindex="0"' +
            '<% } else { %>' +
                'role="group"' +
            '<% } %>' +

        '></ul>'
    ),

    node: Micro.compile(
        '<li id="<%= data.node.id %>" class="<%= data.nodeClassNames.join(" ") %>" role="treeitem" aria-labelled-by="<%= data.node.id %>-label">' +
            '<div class="<%= data.classNames.row %>" data-node-id="<%= data.node.id %>" data-libbit-type="<%= data.node.data.name %>" data-libbit-id="<%= data.node.data.get(\'id\')%>">' +
                '<span class="<%= data.classNames.indicator %>"><s></s></span>' +
                '<span class="<%= data.classNames.icon %>"></span>' +
                '<span id="<%= data.node.id %>-label" class="<%= data.classNames.label %>"><%== data.node.label %></span>' +
            '</div>' +
        '</li>'
    )
};

TreeView = Y.Base.create('treeView', Y.TreeView, [ Y.Libbit.TreeView.Anim, Y.Libbit.TreeView.DD,  Y.Libbit.TreeView.Selectable/*, Y.Libbit.TreeView.Filter*/ ], {

    /**
     * Stores the state of expanded nodes.
     */
    _stateMap: [],

    /**
    * Icon (className) mapping for different types of models
    **/
    _iconMap: [],

    initializer: function (config) {
        // if nodes typeof model tree then get items
        // console.log(config);
        // Hook into the initializer chain
        config.nodes = config.model.get('items');
        // TODO: check for initial filter
        this.set('model', config.model);
        // config.nodes = [];
        // var self = this;

        // console.log(config.model);
        if (config.header) {
            this.header = config.header;
        }

        var classNames = this.classNames;
        var container = this.get('container'),
            // width      = this.get('width'),
            // height     = this.get('height'),
            model      = this.get('model');

        // container.delegate('click', this._onRowClick, '.' + classNames.row, this),
         // container.delegate('click', function (e) {
         //    var node = this.getNodeById(e.currentTarget.getData('node-id'));
         // }, '.' + classNames.row, this);


        this.on('open', this._handleExpand, this);
        this.on('close', this._handleCollapse, this);

        // this._restoreSelectState();

        // contentBox.setStyle('width', width);
        // contentBox.setStyle('height', height);
        // contentBox.setStyle('overflow', 'auto');

        if (model.get('icons')) {
            this._iconMap = model.get('icons');
        }

        this._eventHandles || (this._eventHandles = []);


        this._eventHandles.push(
            model.after('change', this._handleModelChange, this)
        );
        // this._attachEvents();
        // this.on(['open', 'close'], this._handleIcon, this);
        // this.on('initializedChange', function () {
            // console.log(this.nodes);

            // console.log(this.get('nodes'));
            // self.set('nodes', []);
            // console.log('asdasd');
        // });
        // console.log(this.get('nodes'));
        // this.insertNode(this.rootNode, [], {silent: true});
        // console.log('tree');
        // this.set('nodes', this.get('model').get('items'));
    //     this.tc = Y.Node.create('<div class="tc"></div>');
        // this._attachEvents();
    },

    // Destroy the associated model to clean up attached events.
    destructor: function () {
        (new Y.EventHandle(this._eventHandles)).detach();
        // this.get('model').destroy();
    },

    render: function () {
        var container     = this.get('container'),
            isTouchDevice = 'ontouchstart' in Y.config.win;

        container.addClass(this.classNames.treeview);
        container.addClass(this.classNames[isTouchDevice ? 'touch' : 'noTouch']);

        this._childrenNode = this.renderChildren(this.rootNode, {
            container: container
        });

        // console.log(this.rootNode);
        this.rendered = true;

        console.log('renderTree');
        return this;
        // var container = this.get('container'),
        //     header    = this.get('header');

        // if (header) {
        //     container.append('<div class="nav-header">' + header + '</div>');
        // }
        // var container = this.get('container');//,
        //     // inner     = Y.Node.create('<div class="libbit-treeview-inner-container></div>');

        // container.addClass('libbit-treeview-outer-container');
        // this.set('container', inner);
        // this.get('srcNode').addClass('libbit-treeview-inner-container');

        // this.constructor.superclass.render.apply(this);

        // console.log(index);

        // DD
        // container.one('ul').addClass('libbit-treeview-inner-container');

        // this._processTree(this.rootNode);
    },

    _handleModelChange: function () {
        this.fire('mc');
        var nodes = this.get('model').get('items');

        this.clear({silent: true});

        if (nodes) {
            // Returns an array of references to the created tree nodes.
            var treeNodes = this.insertNode(this.rootNode, nodes, {silent: true});
            this._restoreTreeOpenState(treeNodes);
        }

        this.render();
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
        // if open map
        // console.log(node.children);

        // this._detachEvents();
        // this._processTree(this.rootNode);

        // this._attachEvents();
    },

    /**
     * Store a reference to the model for each tree node and restore
     * the state of the treeNodes (opened and selected node(s)).
     */
    _processTree: function (rootNode) {
        if (rootNode.children.length) {
            // rootNode.open();
            // rootNode.open({ silent: true });
            // this._afterOpen({ node: rootNode });
        }

        // Attach data to the nodes
        for (var i in rootNode.children) {
            var treeNode = rootNode.children[i];

        //     // this._treeNodes.push(treeNode);

        //     // this._fixWidth(treeNode);
        //     this._bindModel(treeNode);

        //     console.log('node!');
            if (treeNode.children) {
                // Walk through the tree recursively
                this._processTree(treeNode);
            }
        }

        // Restore state of this node.
        // if (rootNode !== this.rootNode) {
        //     if (Y.Array.indexOf(this._stateMap, rootNode.data.get('id')) === -1) {
        //         rootNode.close();
        //     }

        //     if (Y.Array.indexOf(this._selectMap, rootNode.data.get('id')) !== -1) {
        //         rootNode.select();
        //     }
        // }
    },

    _fixWidth: function (node) {
        var li = this.getHTMLNode(node);
        var count = 0;
        var current = li.ancestor('.' + this.classNames.children);

        while (current.ancestor('.' + this.classNames.children)) {
            count++;
            current = current.ancestor('.' + this.classNames.children);
        }

        if (count > 0) {
            var ml = count * 20;

            if (ml) {
                li.setStyle('marginLeft', -ml);
                li.one('div').setStyle('paddingLeft', ml + 20);
                li.ancestor('.' + this.classNames.children).setStyle('marginLeft', ml);
                li.one('.' + this.classNames.indicator).setStyle('marginLeft', ml);
            }
        }
    },

    _bindModel: function (node) {
        var li    = this.getHTMLNode(node),
            model = node.data;

            console.log(li);
        // if (Y.instanceOf(model, Y.Model)) {
        //     li.setAttribute('data-yui3-modelId', model.get('id'));
        //     li.setAttribute('data-yui3-record', model.get('clientId'));

        //     // Set the title for mouseovers on long labels
        //     li.set('title', node.label);

        //     if (typeof(this._iconMap[model.name]) !== 'undefined') {
        //         this._setIcon(li, this._iconMap[model.name]);
        //     }

        //     li.setData({ model: model });
        // }
    },

    /**
     * Update the icon classes
     */
    _setIcon: function(node, className) {
        if (node) {
            var iconNode = node.one('.' + this.classNames.icon);

            if (iconNode) {
                iconNode.removeClass(this.classNames.icon);
                iconNode.addClass(className);
                iconNode.addClass('libbit-treeview-icon');
            }
        }
    },

    _attachEvents: function() {
        this.on('open', this._handleExpand, this);
        this.on('close', this._handleCollapse, this);
    },

    _detachEvents: function() {
        this.detach('open', this._handleExpand);
        this.detach('close', this._handleCollapse);
        this.detach('select', this._handleSelectState);
    },

    /**
    * Folderstate icons
    **/
    _handleIcon: function (e) {
        var node   = e.node,
            type   = e.type,
            iconEl = this.getHTMLNode(node).one('.icon-folder-close');

        if (type === 'treeView:close') {
            iconEl = this.getHTMLNode(node).one('.icon-folder-open');
        }

        if (iconEl) {
            if (type === 'treeView:close') {
                iconEl.removeClass('icon-folder-open');
                iconEl.addClass('icon-folder-close');
            } else {
                iconEl.removeClass('icon-folder-close');
                iconEl.addClass('icon-folder-open');
            }
        }
    },

    _handleExpand: function (e) {
        var id = this._generateLibbitRecordId(e.node.data);
         var index = Y.Array.indexOf(this._stateMap, id);
        // TODO: Cleanup statemap after refresh?
         // var id = e.currentTarget.getData('node-id');
        // var li = this.getHTMLNode(e.node);

        // this._stateMap.push(parseInt(li.getAttribute('data-yui3-modelId'), 10));
        if (index === -1) {
            this._stateMap.push(id);
        }
        // this.fire('expand', e);
    },

    _handleCollapse: function (e) {
        var id = this._generateLibbitRecordId(e.node.data);
         // var id = e.currentTarget.getData('node-id');
         var index = Y.Array.indexOf(this._stateMap, id);
        // var li         = this.getHTMLNode(e.node),
        //     stateIndex = Y.Array.indexOf(this._stateMap, parseInt(li.getAttribute('data-yui3-modelId'), 10));

        if (index !== -1) {
            this._stateMap.splice(index, 1);
        }
        // this.fire('collapse', e);
    },

    _disableEvent: function (e) {
        e.stopImmediatePropagation();
    }
}, {
    ATTRS: {
        // Tree header, optional.
        header : {
            value: null
        },

        // // The data object containing the models.
        // data : {
        //     value: null
        // },

        // // The original tree object.
        // tree : {
        //     value: null
        // },

        // width : {
        //     value: null
        // },

        // height : {
        //     value: null
        // },

        // // Wether to render all nodes or just branches.
        // renderLeaves: {
        //     value: true
        // },

        /**
         * A filter to apply to the tree
         *
         * @attribute {Object} filter
         */
        filter: {
            value : {
                type: null,
                attr: null,
                value: []
            }
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
        "libbit-treeview-filter",
        "libbit-treeview-select"
    ],
    "supersedes": [
        "gallery-sm-treeview-templates"
    ],
    "skinnable": true
});
