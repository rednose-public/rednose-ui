/*jshint boss:true, expr:true, onevar:false */

var DataControlsView = Y.Base.create('dataControlsView', Y.View, [], {

    destructor: function () {
        this._treeView && this._treeView.destroy();
        this._treeView = null;
    },

    /**
     * @chainable
     */
    render: function () {
        var container = this.get('container'),
            identity  = this.get('identity'),
            self      = this;

        if (!identity) {
            return this;
        }

        container.setStyle('height', '100%');
        container.setStyle('overflow', 'auto');

        container.append('<div class="rednose-treeview"></div>');

        this._treeView = new Y.Rednose.TreeView({
            container : container.one('.rednose-treeview'),
            selectable: false,
            header    : 'Data controls'
        });

        this._treeView.plug(Y.Rednose.Plugin.TreeViewDataSource, {
            datasource: new Y.Docgen.DataSource({
                source: Routing.generate('rednose_docgen_get_identities')
            })
        });

        this._treeView.render();

        this._treeView.datasource.load('/' + identity + '/controls', function () {
            self._treeView.set('animated', false);
            self._treeView.open();
            self._treeView.set('animated', true);
        });
    }
}, {
    ATTRS: {
        /**
         * @type {String}
         */
        identity: {
            value: null
        }
    }
});

Y.namespace('Rednose.FormDesigner').DataControlsView = DataControlsView;
