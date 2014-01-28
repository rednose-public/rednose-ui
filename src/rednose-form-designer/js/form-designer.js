/*jshint boss:true, expr:true, onevar:false */

var TXT_NAVBAR_CAPTION = 'Form Designer';

var FormDesigner;

FormDesigner = Y.Base.create('formDesigner', Y.App, [], {
    views: {
        form: {
            type: Y.Rednose.FormDesigner.FormView
        }
    },

    template: '<div class="rednose-grid">' +
                  '<div class="rednose-unit-left"></div>' +
                  '<div class="rednose-unit-center"></div>' +
                  '<div class="rednose-unit-right"></div>' +
              '</div>',

    _navbar: null,

    _gridLeft: null,
    _gridCenter: null,
    _gridRight: null,

    _objectLibraryView: null,
    _hierarchyView: null,
    _objectAttributesView: null,
    _dataSourcesView: null,

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this._gridLeft   = container.one('.rednose-unit-left');
        this._gridCenter = container.one('.rednose-unit-center');
        this._gridRight  = container.one('.rednose-unit-right');

        this._objectLibraryView    = new Y.Rednose.FormDesigner.ObjectLibraryView();
        this._hierarchyView        = new Y.Rednose.FormDesigner.HierarchyView();
        this._objectAttributesView = new Y.Rednose.FormDesigner.ObjectAttributesView();
        this._dataSourcesView      = new Y.Rednose.FormDesigner.DataSourcesView();

        this._objectLibraryView.addTarget(this);
        this._hierarchyView.addTarget(this);
        this._objectAttributesView.addTarget(this);
        this._dataSourcesView.addTarget(this);

        this.after('*:select', this._handleControlSelect, this);

        this.set('viewContainer', this._gridCenter);

        this._initNavbar();

        if (this.hasRoute(this.getPath())) {
            this.dispatch();
        } else {
            console.log('Show `empty` view');
            // self.showView('empty');
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

        this._gridLeft   = null;
        this._gridCenter = null;
        this._gridRight  = null;
    },

    render: function () {
        FormDesigner.superclass.render.apply(this, arguments);

        this._navbar.render();

        this._gridLeft.append(this._objectLibraryView.render().get('container'));
        this._gridLeft.append(this._hierarchyView.render().get('container'));
        this._gridLeft.append(this._dataSourcesView.render().get('container'));
        this._gridRight.append(this._objectAttributesView.render().get('container'));

        return this;
    },

    _initNavbar: function () {
        this._navbar = new Y.Rednose.Navbar({
            title        : TXT_NAVBAR_CAPTION,
            columnLayout : true,
            menu         : [
                { id: 'file', title: 'File', items: [
                    { id: 'save', title: 'Save' }
                ]}
            ],
            menuSecondary: [
                { title: 'Settings', items: [
                    { title: 'Log out' }
                ]}
            ]
        });
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
