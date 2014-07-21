/*jshint boss:true, expr:true, onevar:false */

var FormDesignerApp = Y.Base.create('formDesigner', Y.Rednose.FormDesigner.Base, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.ThreeColumn
], {
    appViews: {
        dataSource: {
            type: 'Rednose.DataSourceManager',
            modal: true,
            width: 640
        }
    },

    /**
     * @property {Rednose.Navbar} navbar
     */

    _objectLibrary       : null,
    _hierarchyView       : null,
    _dataSourcesView     : null,
    // _objectAttributesView: null,
    _dataControlsView    : null,

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        Y.mix(this.views, this.appViews);

        this._objectLibrary        = new Y.Rednose.FormDesigner.ObjectLibrary();
        this._hierarchyView        = new Y.Rednose.FormDesigner.HierarchyView();
        this._dataSourcesView      = new Y.Rednose.FormDesigner.DataSourcesView();
        // this._objectAttributesView = new Y.Rednose.FormDesigner.ObjectAttributesView();
        this._dataControlsView     = new Y.Rednose.FormDesigner.DataControlsView();

        this._objectLibrary.addTarget(this);
        this._hierarchyView.addTarget(this);
        this._dataSourcesView.addTarget(this);
        // this._objectAttributesView.addTarget(this);
        this._dataControlsView.addTarget(this);

        this.after({
            'navbar:click#preview'      : this._handlePreview,
            'navbar:click#save'         : this._handleSave,
            'navbar:click#newDataSource': this._handleNewDataSource,

            'hierarchyView:select'   : this._handleControlSelect,
            'objectLibrary:objectAdd': this._handleObjectAdd,
        });

        this.after('objectAttributesView:typeChange', this._handleObjectTypeChange, this);
        this.after('objectAttributesView:configureItems', this._handleConfigureItems, this);
        this.after('objectAttributesView:configureDynamicItems', this._handleConfigureDynamicItems, this);

        this.onceAfter('initializedChange', function () {
            this._initializeNavbar();
        });

        this.once('ready', function () {
            this.get('leftContainer').append(this._hierarchyView.render().get('container'));
            this.get('leftContainer').append(this._dataSourcesView.render().get('container'));
            this.get('rightContainer').append(this._dataControlsView.render().get('container'));
            // this.get('rightContainer').append(this._objectAttributesView.render().get('container'));

            if (this.hasRoute(this.getPath())) {
                this.dispatch();
            }
        });
    },

    destructor: function () {
        this._objectLibrary.destroy();
        this._objectLibrary = null;

        this._hierarchyView.destroy();
        this._hierarchyView = null;

        this._dataSourcesView.destroy();
        this._dataSourcesView = null;

        // this._objectAttributesView.destroy();
        // this._objectAttributesView = null;

        this._dataControlsView.destroy();
        this._dataControlsView = null;

        this.navbar.destroy();
        this.navbar = null;
    },

    // -- Protected Methods ----------------------------------------------------

    _initializeNavbar: function () {
        // this._objectLibrary.render(this._navbar, 'insert');

        this.navbar = new Y.Rednose.Navbar({
            container    : this.get('navbarContainer'),
            title        : 'Form Designer',
            columnLayout : true,
            menu         : Y.Rednose.FormDesigner.NavbarItems,
            menuSecondary: [
                { title: YUI.Env.user.name, icon: 'icon-user', items: [
                    {url  : Routing.generate('_security_logout'), title: 'Sign out'}
                ]}
            ]
        }).render();

        this.navbar.addTarget(this);
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Shows a preview of the current (saved) form.
     *
     * @method _handlePreview
     * @protected
     */
    _handlePreview: function () {
        var form = this.get('model');

        window.open(Routing.generate('rednose_framework_forms_preview', { id: form.get('id') }), '_blank');
    },

    /**
     * Saves the current form.
     *
     * @method _handleSave
     * @protected
     */
    _handleSave: function () {
        var form = this.get('model');

        console.log(Y.JSON.stringify(form.toJSON()));
    },

    _handleNewDataSource: function () {
        this.showView('dataSource');
        // var dataSourceManagerView = new DataSourceManager(),
        //     self                  = this;

        // dataSourceManagerView.render();
        // dataSourceManagerView.showChoicePage();

        // var dataSourceManagerPanel = new Y.Rednose.Panel({
        //     srcNode: dataSourceManagerView.get('container'),
        //     width  : 640
        // });

        // dataSourceManagerPanel.render();

        // dataSourceManagerView.on('close', function () {
        //     dataSourceManagerView.destroy();
        //     dataSourceManagerPanel.destroy();
        // });

        // dataSourceManagerView.on('create', function (e) {
        //     var model = e.model;

        //     model.save(function () {
        //         dataSourceManagerView.destroy();
        //         dataSourceManagerPanel.destroy();

        //         self._dataSourcesView.render();
        //     });
        // });
    },

    _handleControlSelect: function (e) {
        var node = e.node,
            form = this.get('model');

        var dialog = new Y.Rednose.FormDesigner.ObjectAttributesView({
            model: form.getControl(node.label)
        });

        dialog.render();

        // console.log(node.label);
        // console.log(form.getControl(node.label));
        // this._objectAttributesView.set('model', form.getControl(node.label));
        // this._objectAttributesView.render();
    },

    _handleObjectAdd: function (e) {
        var self = this;
        var dialog = new Y.Rednose.FormDesigner.ObjectLibraryView({
            model: this.get('model'),
            item: e.item
        });

        dialog.on('destroy', function() {
            self.showForm();
        });

        dialog.render();
    },

    _handleDataSourceEdit: function (e) {
        var model = e.data;

        var dataSourceManagerView = new DataSourceManager({ model: model }),
            self                  = this;

        dataSourceManagerView.render();
        dataSourceManagerView.showChoicePage();

        var dataSourceManagerPanel = new Y.Rednose.Panel({
            srcNode: dataSourceManagerView.get('container'),
            width  : 640
        });

        dataSourceManagerPanel.render();

        dataSourceManagerView.on('close', function () {
            dataSourceManagerView.destroy();
            dataSourceManagerPanel.destroy();
        });

        dataSourceManagerView.on('create', function (e) {
            var model = e.model;

            model.save(function () {
                dataSourceManagerView.destroy();
                dataSourceManagerPanel.destroy();

                self._dataSourcesView.render();
            });
        });
    },

    _handleDataSourceDelete: function (e) {
        console.log(e);
    },

    // -- Route Handlers -------------------------------------------------------

    handleForm: function (req, res, next) {
        var id   = req.params.id,
            form = this.get('model'),
            self = this;

        if (id === form.get('id') && !form.isNew()) {
            req.form = form;
            next();
        } else {
            form = new Y.Rednose.Form.FormModel({id: id});

            form.load(function () {
                self.set('model', form);
                req.form = form;
                next();
            });
        }
    },

    showForm: function (req, res) {
        if (this.get('activeView')) {
            this.get('activeView').destroy();
        }

        if (!req) {
            req = { form: this.get('model') };
            res = { transition: false };
        }

        this.showView('form', {
            model: req.form
        }, {
            // Overrides the default transition with the preferred one, if set.
            transition: res.transition
        });

        if (this._hierarchyView) {
            this._hierarchyView.set('model', req.form);
            this._hierarchyView.render();
        }

        if (this._dataControlsView) {
            this._dataControlsView.set('identity', req.form.get('identity'));
            this._dataControlsView.render();
        }
    }
}, {
    ATTRS: {
        routes: {
            value: [{
                path: '/:id/edit', callbacks: [
                    'handleForm',
                    'showForm'
                ]}
            ]
        }
    }
});

Y.namespace('Rednose.FormDesigner').App = FormDesignerApp;

Y.Rednose.FormDesigner.NavbarItems = [
    { title: 'File', large: true, items: [
        { id: 'newDataSource', title: 'New Data Source...', keyCode: 'ctrl+d' },
        { type: 'divider' },
        { id: 'preview', title: 'Preview' },
        { id: 'save', title: 'Save' }
    ]}, {
        title: 'Insert', items: Y.Rednose.FormDesigner.ControlItems
    }
];
