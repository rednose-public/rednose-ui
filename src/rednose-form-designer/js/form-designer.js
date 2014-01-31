/*jshint boss:true, expr:true, onevar:false */

var TXT_NAVBAR_CAPTION = 'Form Designer';

var DataSourceManager = Y.Rednose.DataSourceManager.DataSourceManager,
    FormDesigner;

FormDesigner = Y.Base.create('formDesigner', Y.App, [ Y.Rednose.Template.ThreeColumn ], {
    views: {
        form: {
            type: Y.Rednose.FormDesigner.FormView
        }
    },

    _navbar: null,

    _objectLibraryView   : null,
    _hierarchyView       : null,
    _objectAttributesView: null,
    _dataSourcesView     : null,

    initializer: function () {
        this._objectLibraryView    = new Y.Rednose.FormDesigner.ObjectLibraryView();
        this._hierarchyView        = new Y.Rednose.FormDesigner.HierarchyView();
        this._objectAttributesView = new Y.Rednose.FormDesigner.ObjectAttributesView();
        this._dataSourcesView      = new Y.Rednose.FormDesigner.DataSourcesView();

        this._objectLibraryView.addTarget(this);
        this._hierarchyView.addTarget(this);
        this._objectAttributesView.addTarget(this);
        this._dataSourcesView.addTarget(this);

        this.after('*:select', this._handleControlSelect, this);

        this._initNavbar();

        this.on('navbar:newDataSource', this._handleNewDataSource, this);

        this.on('contextMenu:dataSourceEdit', this._handleDataSourceEdit, this);
        this.on('contextMenu:dataSourceDelete', this._handleDataSourceDelete, this);

        if (this.hasRoute(this.getPath())) {
            this.dispatch();
        }
    },

    destructor: function () {
        this._navbar.destroy();
        this._navbar = null;

        this._objectLibraryView.destroy();
        this._objectLibraryView = null;

        this._hierarchyView.destroy();
        this._hierarchyView = null;

        this._dataSourcesView.destroy();
        this._dataSourcesView = null;

        this._objectAttributesView.destroy();
        this._objectAttributesView = null;
    },

    render: function () {
        FormDesigner.superclass.render.apply(this, arguments);

        this._navbar.render();

        this.get('gridLeft').append(this._objectLibraryView.render().get('container'));
        this.get('gridLeft').append(this._hierarchyView.render().get('container'));
        this.get('gridLeft').append(this._dataSourcesView.render().get('container'));
        this.get('gridRight').append(this._objectAttributesView.render().get('container'));

        return this;
    },

    _initNavbar: function () {
        this._navbar = new Y.Rednose.Navbar({
            title        : TXT_NAVBAR_CAPTION,
            columnLayout : true,
            menu         : [
                { title: 'File', items: [
                    { id: 'newDataSource', title: 'New Data Source...' }
                ]}
            ],
            menuSecondary: [
                { title: YUI.Env.user.name, icon: 'user', items: [
                    {
                        url  : Routing.generate('_security_logout'),
                        title: 'Sign out'
                    }
                ]}
            ]
        });

        this._navbar.addTarget(this);
    },

    handleForm: function (req, res, next) {
        var id   = req.params.form,
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
        this.showView('form', {
            model: req.form,
        }, {
            // Overrides the default transition with the preferred one, if set.
            transition: res.transition
        });

        this._hierarchyView.set('model', req.form);
        this._hierarchyView.render();
    },

    _handleControlSelect:function (e) {
        var model  = e.model;

        if (model && model instanceof Y.Rednose.Form.ControlModel) {
            if (model.view instanceof Y.Rednose.Form.BaseControlView) {
                model.view.focus();
            }

            this._objectAttributesView.set('model', model);
            this._objectAttributesView.render();
        }
    },

    // XXX
    _handleNewDataSource: function () {
        var dataSourceManagerView = new DataSourceManager(),
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

    // XXX
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

    // XXX
    _handleDataSourceDelete: function (e) {
        console.log(e);
    }
}, {
    ATTRS: {
        model: { value: new Y.Rednose.Form.FormModel() },

        routes: {
            value: [{
                path: '/:form', callbacks: [
                    'handleForm',
                    'showForm'
                ]}
            ]
        }
    }
});



// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').FormDesigner = FormDesigner;
