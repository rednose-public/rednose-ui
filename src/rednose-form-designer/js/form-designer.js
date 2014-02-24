/*jshint boss:true, expr:true, onevar:false */

var TXT_NAVBAR_CAPTION = 'Form Designer';

var DataSourceManager = Y.Rednose.DataSourceManager.DataSourceManager,
    FormDesigner;

FormDesigner = Y.Base.create('formDesigner', Y.App, [ Y.Rednose.Template.ThreeColumn ], {
    views: {
        form: {
            type: Y.Rednose.FormDesigner.FormView
        },
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

        this.after('hierarchyView:select', this._handleControlSelect, this);
        this.after('objectLibraryView:select', this._handleObjectAdd, this);

        this.after('objectAttributesView:typeChange', this._handleObjectTypeChange, this);
        this.after('objectAttributesView:configureItems', this._handleConfigureItems, this);

        this._initNavbar();

        this.on('navbar:preview', this._handlePreview, this);
        this.on('navbar:save', this._handleSave, this);
        this.on('navbar:newDataSource', this._handleNewDataSource, this);
        this.on('navbar:closeDesigner', this._handleClose, this);

        this.on('contextMenu:dataSourceEdit', this._handleDataSourceEdit, this);
        this.on('contextMenu:dataSourceDelete', this._handleDataSourceDelete, this);

        if (this.hasRoute(this.getPath())) {
            this.dispatch();
        }
    },

    destructor: function () {
        if (this.get('activeView')) {
            this.get('activeView').destroy();
        }

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
        // We always need to call the parent's class `render` function first for the `App` object to function.
        FormDesigner.superclass.render.apply(this, arguments);

        this.get('container').addClass('rednose-form-designer');

        this._navbar.render(this.get('container'));

        this.get('gridLeft').append(this._objectLibraryView.render().get('container'));
        this.get('gridLeft').append(this._hierarchyView.render().get('container'));
        this.get('gridLeft').append(this._dataSourcesView.render().get('container'));
        this.get('gridRight').append(this._objectAttributesView.render().get('container'));

        // If the model contains controls render the form view
        if (this.get('model').get('controls').size() > 0) {
            this.showForm();
        }

        return this;
    },

    _initNavbar: function () {
        this._navbar = new Y.Rednose.Navbar({
            title        : TXT_NAVBAR_CAPTION,
            columnLayout : true,
            menu         : [
                { title: 'File', items: [
                    { id: 'newDataSource', title: 'New Data Source...' },
                    { title: '-' },
                    { id: 'preview', title: 'Preview' },
                    { id: 'save', title: 'Save' },
                    { title: '-' },
                    { id: 'closeDesigner', title: 'Close' }
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
        this.set('navbar', this._navbar);
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
        if (this.get('activeView')) {
            this.get('activeView').destroy();
        }

        if (!req) {
            req = { form: this.get('model') };
            res = { transition: false };
        }

        this.showView('form', {
            model: req.form,
        }, {
            // Overrides the default transition with the preferred one, if set.
            transition: res.transition
        });

        this._hierarchyView.set('model', req.form);
        this._hierarchyView.render();
    },

    _handleControlSelect: function (e) {
        var model  = e.model;

        if (model && model instanceof Y.Rednose.Form.ControlModel) {
            if (model.view instanceof Y.Rednose.Form.BaseControlView) {
                model.view.focus();
            }

            this._objectAttributesView.set('model', model);
            this._objectAttributesView.render();
        }
    },

    _handleObjectTypeChange: function() {
        this.showForm();
        this._handleControlSelect({
            model: this._objectAttributesView.get('model')
        });
    },

    _handleConfigureItems: function(config) {
        var dialog = new Y.Rednose.FormDesigner.ConfigureItems({
            model: config.model
        });

        dialog.render();
    },

    _handleObjectAdd: function () {
        var formModel   = this.get('model'),
            controlList = formModel.get('controls');

        // For now, always add a text control.
        controlList.add(new Y.Rednose.Form.ControlModel({ type: 'text' }));
    },

    /**
    Saves the current form.

    @method _handleSave
    @protected
    **/
    _handleSave: function () {
        var form = this.get('model');

        console.log(Y.JSON.stringify(form.toJSON()));
    },

    /**
    Shows a preview of the current (saved) form.

    @method _handlePreview
    @protected
    **/
    _handlePreview: function () {
        var form = this.get('model');

        window.open(Routing.generate('rednose_framework_forms_preview', { id: form.get('id') }), '_blank');
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

    _handleClose: function() {
        this.destroy();
    },

    // XXX
    _handleDataSourceDelete: function (e) {
        console.log(e);
    }
}, {
    ATTRS: {
        model: { value: new Y.Rednose.Form.FormModel() },

        navbar: { value: null },

        routes: {
            value: [{
                path: '/:form/edit', callbacks: [
                    'handleForm',
                    'showForm'
                ]}
            ]
        }
    }
});



// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').FormDesigner = FormDesigner;
