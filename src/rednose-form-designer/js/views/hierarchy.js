/*jshint boss:true, expr:true, onevar:false */

var TXT_HIERARCHY      = 'Hierarchy',
    TXT_REMOVE_CONTROL = 'Remove';

/**
 * @event select
 */
var EVT_SELECT = 'select';

var HierarchyView = Y.Base.create('hierarchyView', Y.View, [], {

    template: '<div class="rednose-hierarchy></div>',

    events: {
        '.yui3-treeview-row': {
            contextmenu: '_handleContextMenu'
        }
    },

    _treeView: null,

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);
    },

    destructor: function () {
        this._treeView.destroy();

        this._treeView = null;
    },

    render: function () {
        var self      = this,
            container = this.get('container'),
            model     = this.get('model');

        this._treeView && this._treeView.destroy();

        container.append('<div class="rednose-treeview"></div>');

        this._treeView = new Y.Rednose.TreeView({
            container : container.one('.rednose-treeview'),
            nodes     : model.getTree(),
            selectable: true,
            header    : TXT_HIERARCHY
        });

        // Open all nodes by default since this is our main navigation tool.
        this._treeView.open();
        this._treeView.render();

        this._treeView.after('select', function (e) {
            self.fire(EVT_SELECT, {node: e.node});
        });

        return this;
    },

    _handleContextMenu: function (e) {
        var node = e.currentTarget;

        // Prevent default contextmenu behaviour.
        e.preventDefault();

        if (node.contextMenu) {
            return false;
        }

        var model = this._treeView.getNodeById(node.getData('node-id')).data;

        if (model && model instanceof Y.Rednose.Form.ControlModel) {
            node.plug(Y.Rednose.ContextMenu, {
                content: [
                    { title: TXT_REMOVE_CONTROL, id: 'removeControl' }
                ],
                data: model,
                bubbleTarget: this
            });

            node.contextMenu._handleContextMenu(e);
        }

        return true;
    },

    // XXX
    _setModel: function (model) {
        var controlList = model.get('controls');

        controlList.after('add', this.render, this);
    }
}, {
    ATTRS: {
        /**
         * @attribute {Rednose.Form.FormModel} model
         */
        model: {
            value : new Y.Rednose.Form.FormModel(),
            setter: '_setModel'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').HierarchyView = HierarchyView;
