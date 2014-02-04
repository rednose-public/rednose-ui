/*jshint boss:true, expr:true, onevar:false */

var TXT_HIERARCHY = 'Hierarchy';

var HierarchyView;

var EVT_SELECT = 'select';

HierarchyView = Y.Base.create('hierarchyView', Y.View, [], {

    template: '<div class="rednose-hierarchy></div>',

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
            model     : model.getTree(),
            selectable: true,
            header    : TXT_HIERARCHY
        });

        // Y.Array.each(this._treeView.rootNode.children, function (node) {
        //     node.open();
        // });

        this._treeView.render();

        this._treeView.after('select', function (e) {
            e.node.unselect();

            var model = e.node.data;

            if (model && model instanceof Y.Rednose.Form.ControlModel) {
                self.fire(EVT_SELECT, { model: model });
            }
        });

        return this;
    },

    // XXX
    _setModel: function (model) {
        var controlList = model.get('controls');

        controlList.after('add', this.render, this);
    }
}, {
    ATTRS: {
        model: {
            value : new Y.Rednose.Form.FormModel(),
            setter: '_setModel'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').HierarchyView = HierarchyView;
