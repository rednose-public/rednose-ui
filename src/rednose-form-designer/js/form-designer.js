/*jshint boss:true, expr:true, onevar:false */

var ConfigureDynamicItems = Y.Rednose.FormDesigner.ConfigureDynamicItemsView,
    DataSourceManager     = Y.Rednose.DataSourceManager.DataSourceManager,
    Panel                 = Y.Rednose.Panel;

var formControlItems = [
    {id: 'text',         title: 'Text',           icon: 'rednose-icon-text'},
    {id: 'textarea',     title: 'Text Area',      icon: 'rednose-icon-textarea'},
    {id: 'richtext',     title: 'Rich Text',      icon: 'rednose-icon-textarea'},
    {type: 'divider'},
    {id: 'dropdown',     title: 'Drop-down List', icon: 'rednose-icon-dropdown'},
    {id: 'radio',        title: 'Radio Button',   icon: 'rednose-icon-radio'},
    {id: 'checkbox',     title: 'Checkbox',       icon: 'rednose-icon-checkbox'},
    {type: 'divider'},
    {id: 'date',         title: 'Date',           icon: 'rednose-icon-date'},
    {id: 'autocomplete', title: 'Autocomplete',   icon: 'rednose-icon-dropdown'},
    {id: 'file',         title: 'File',           icon: 'rednose-icon-dropdown'}
];

var FormDesignerBase = Y.Base.create('formDesigner', Y.Rednose.App, [], {
    views: {
        form: {
            type: Y.Rednose.FormDesigner.FormView
        }
    },

    // initializer: function () {
    //     this.on('contextMenu:removeControl', this._handleRemoveControl, this);
    //     this.on('contextMenu:dataSourceEdit', this._handleDataSourceEdit, this);
    //     this.on('contextMenu:dataSourceDelete', this._handleDataSourceDelete, this);
    // },

    // destructor: function () {
    //     if (this.get('activeView')) {
    //         this.get('activeView').destroy();
    //     }
    // },

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
            model: req.form
        }, {
            // Overrides the default transition with the preferred one, if set.
            transition: res.transition
        });

        if (this._hierarchyView) {
            this._hierarchyView.set('model', req.form);
            this._hierarchyView.render();
        }
    },

    _handleRemoveControl: function(e) {
        var self = this,
            model = e.data,
            dialog = new Y.Rednose.Dialog();

        dialog.confirm({
            title: 'Remove control: ' + model.get('caption') + '?',
            text: 'Are you sure you want to remove the control' + model.get('caption') + ' connected data may possibly be lost!',
            type: 'warning',
            confirm: 'DELETE'
        }, function() {
            self.get('model').get('controls').remove(model);

            self.showForm();
            self._handleControlSelect({
                model: self._objectAttributesView.get('model')
            });
        });
    },

    _handleObjectTypeChange: function() {
        this.showForm();
        this._handleControlSelect({
            model: this._objectAttributesView.get('model')
        });
    },

    _handleConfigureItems: function (e) {
        var dialog = new Y.Rednose.FormDesigner.ConfigureItems({
            model: e.model
        });

        dialog.render();
    },

    /**
     * Shows a modal view where the items for this collection can be configured
     * dynamically, by specifying a mapping to data source attributes.
     *
     * @method _handleConfigureDynamicItems
     * @param {EventFacade} e Event containing the control model.
     * @protected
     */
    _handleConfigureDynamicItems: function (e) {
        var model = e.model;

        if (!model) {
            return;
        }

        var dataSourceList = this._dataSourcesView.get('modelList'),
            view,
            panel;

        view = new ConfigureDynamicItems({
            model         : model,
            dataSourceList: dataSourceList
        }).render();

        panel = new Panel({
            srcNode: view.get('container'),
            width  : 500
        }).render();

        view.on(['close', 'ok'], function () {
            view.destroy();
            panel.destroy();
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
        /**
         * @type {Rednose.Form.FormModel}
         */
        model: {
            value: new Y.Rednose.Form.FormModel()
        },

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
Y.namespace('Rednose.FormDesigner').Base = FormDesignerBase;

var FormDesigner = Y.Base.create('formDesigner', FormDesignerBase, [
    Y.Rednose.View.Template.SingleView,
    Y.Rednose.View.Template.Toolbar,
    Y.Rednose.View.Nav
], {
    /**
     * @property {Rednose.Toolbar} toolbar
     */

    /**
     * @type {Rednose.View.Nav.title}
     */
    title: 'Form',

    /**
     * @type {Rednose.View.Nav.footer}
     */
    footer: false,

    /**
     * @type {Rednose.View.Nav.close}
     */
    close: true,

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this.onceAfter('initializedChange', function () {
            this._initializeToolbar();
        });

        this.once('ready', function () {
            // If the model contains controls render the form view.
            if (this.get('model').get('controls').size() > 0) {
                this.showForm();
            }
        });
    },

    // destructor: function () {
    //     this.toolbar.destroy();
    //     this.toolbar = null;
    // },

    // -- Protected Methods ----------------------------------------------------

    _initializeToolbar: function () {
        this.toolbar = new Y.Rednose.Toolbar({
            container: this.get('toolbarContainer'),
            groups   : [
                {buttons: [
                    {id: 'actions', value: 'Actions'}
                ]},
                {buttons: [
                    {id: 'undo', icon: 'icon-arrow-left',  title: 'Undo', disabled: true},
                    {id: 'redo', icon: 'icon-arrow-right', title: 'Redo', disabled: true}
                ]},
                {buttons: [
                    {id: 'insert', icon: 'icon-plus',  title: 'Insert'},
                ]}
            ]
        }).render();

        this.toolbar.getButtonById('actions').plug(Y.Rednose.Plugin.ButtonDropdown, {
            items: [
                { id: 'newDataSource', title: 'New Data Source...' },
                { type: 'divider' },
                { id: 'preview', title: 'Preview' },
                { id: 'save', title: 'Save' }
            ]
        });

        this.toolbar.getButtonById('insert').plug(Y.Rednose.Plugin.ButtonDropdown, {
            items: formControlItems
        });

        this.toolbar.addTarget(this);
    }
});

Y.namespace('Rednose').FormDesigner = Y.mix(FormDesigner, Y.Rednose.FormDesigner);

var FormDesignerApp = Y.Base.create('formDesigner', FormDesignerBase, [
    Y.Rednose.View.Template.Navbar,
    Y.Rednose.View.Template.ThreeColumn
], {
    /**
     * @property {Rednose.Navbar} navbar
     */

    _objectLibrary       : null,
    _hierarchyView       : null,
    _dataSourcesView     : null,
    _objectAttributesView: null,

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this._objectLibrary        = new Y.Rednose.FormDesigner.ObjectLibrary();
        this._hierarchyView        = new Y.Rednose.FormDesigner.HierarchyView();
        this._dataSourcesView      = new Y.Rednose.FormDesigner.DataSourcesView();
        this._objectAttributesView = new Y.Rednose.FormDesigner.ObjectAttributesView();

        this._objectLibrary.addTarget(this);
        this._hierarchyView.addTarget(this);
        this._dataSourcesView.addTarget(this);
        this._objectAttributesView.addTarget(this);

        this.after({
            'navbar:preview'      : this._handlePreview,
            'navbar:save'         : this._handleSave,
            'navbar:newDataSource': this._handleNewDataSource,

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
            this.get('rightContainer').append(this._objectAttributesView.render().get('container'));

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

        this._objectAttributesView.destroy();
        this._objectAttributesView = null;

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
            menu         : [
                { title: 'File', large: true, items: [
                    { id: 'newDataSource', title: 'New Data Source...' },
                    { type: 'divider' },
                    { id: 'preview', title: 'Preview' },
                    { id: 'save', title: 'Save' }
                ]}, {
                    title: 'Insert', items: formControlItems
                }
            ],
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

    _handleControlSelect: function (e) {
        var model  = e.model;

        if (model && model instanceof Y.Rednose.Form.ControlModel) {
            if (model.view instanceof Y.Rednose.Form.BaseControlView) {
                model.view.focus();
            }
        }

        this._objectAttributesView.set('model', model);
        this._objectAttributesView.render();
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
    }
});

Y.namespace('Rednose.FormDesigner').App = FormDesignerApp;
