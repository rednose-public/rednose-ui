/*jshint boss:true, expr:true, onevar:false */

var TXT_DATA_SOURCES = 'Data Sources';

var DataSourcesView;

DataSourcesView = Y.Base.create('dataSourcesView', Y.View, [], {

    template: '<div class="rednose-data-sources></div>',

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
            list      = this.get('modelList');

        this._treeView && this._treeView.destroy();

        container.append('<div class="rednose-treeview"></div>');

        list.load(function () {
            self._treeView = new Y.Rednose.TreeView({
                container : container.one('.rednose-treeview'),
                model     : list.getTree(),
                selectable: false,
                header    : TXT_DATA_SOURCES
            });

            // Y.Array.each(self._treeView.rootNode.children, function (node) {
            //     node.open();
            // });

            self._treeView.render();
        });

        return this;
    }
}, {
    ATTRS: {
        modelList: { value: new Y.Rednose.DataSource.DataSourceList() }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').DataSourcesView = DataSourcesView;
