YUI.add('rednose-form-designer', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var TXT_OBJECT_LIBRARY = 'Object Library';

var ObjectLibraryView;

ObjectLibraryView = Y.Base.create('objectLibraryView', Y.View, [], {

    template: '<div class="rednose-object-library></div>',

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
        var container = this.get('container'),
            model     = this.get('model');

        this._treeView = new Y.Rednose.TreeView({
            container : container,
            model     : model,
            selectable: false,
            header    : TXT_OBJECT_LIBRARY
        }).render();

        return this;
    }
}, {
    ATTRS: {
        model: {
            value: new Y.Rednose.ModelTree({
                items: [
                    {
                        label   : 'Text',
                        data    : new Y.Model(),
                        icon    : 'icon-align-justify'
                    }, {
                        label   : 'Text Area',
                        data    : new Y.Model(),
                        icon    : 'icon-align-justify'
                    }, {
                        label   : 'Rich Text',
                        data    : new Y.Model(),
                        icon    : 'icon-align-justify'
                    }, {
                        label   : 'Drop-down List',
                        data    : new Y.Model(),
                        icon    : 'icon-align-justify'
                    }, {
                        label   : 'Radio Button',
                        data    : new Y.Model(),
                        icon    : 'icon-align-justify'
                    }, {
                        label   : 'Checkbox',
                        data    : new Y.Model(),
                        icon    : 'icon-align-justify'
                    }, {
                        label   : 'Date',
                        data    : new Y.Model(),
                        icon    : 'icon-align-justify'
                    }, {
                        label   : 'Autocomplete',
                        data    : new Y.Model(),
                        icon    : 'icon-align-justify'
                    }, {
                        label   : 'File',
                        data    : new Y.Model(),
                        icon    : 'icon-align-justify'
                    }
                ]
            })
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').ObjectLibraryView = ObjectLibraryView;
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
    }
}, {
    ATTRS: {
        model: {
            value: new Y.Rednose.Form.FormModel()
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').HierarchyView = HierarchyView;
/*jshint boss:true, expr:true, onevar:false */

var TXT_DATA_SOURCES = 'Data Sources';

var DataSourcesView;

DataSourcesView = Y.Base.create('dataSourcesView', Y.View, [], {

    template: '<div class="rednose-data-sources></div>',

    _treeView: null,

    destructor: function () {
        this._treeView.destroy();

        this._treeView = null;
    },

    render: function () {
        var self      = this,
            container = this.get('container'),
            list      = this.get('modelList'),
            template  = this.template;

        container.setHTML(template);

        list.load(function () {
            self._treeView = new Y.Rednose.TreeView({
                container : container,
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
/*jshint boss:true, expr:true, onevar:false */

var TXT_CONTROL_TYPES = {
    'text'        : 'Text',
    'textarea'    : 'Text Area',
    'html'        : 'Rich Text',
    'dropdown'    : 'Drop-down List',
    'radio'       : 'Radio Button',
    'checkbox'    : 'Checkbox',
    'date'        : 'Date',
    'autocomplete': 'Autocomplete',
    'file'        : 'File'
};

var TXT_OBJECT_ATTRIBUTES = 'Object Attributes';

var Micro = Y.Template.Micro,
    ObjectAttributesView;

ObjectAttributesView = Y.Base.create('objectAttributesView', Y.View, [ Y.Rednose.View.Nav ], {

    /**
    Property inherited from Y.Rednose.View.Nav
    **/
    title: TXT_OBJECT_ATTRIBUTES,

    /**
    Property inherited from Y.Rednose.View.Nav
    **/
    footer: false,

    formTemplate: Micro.compile(
        '<form class="form-vertical">'+
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="id">Identifier</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="id" type="text" readonly value="<%= data.id %>"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="caption">Caption</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="caption" type="text" value="<%= data.caption %>"/>' +
                    '</div>' +
                '</div>' +
                '<hr/>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="type">Type</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="type"></select>' +
                    '</div>' +
                '</div>' +
                '<hr/>' +
                '<div class="control-group">' +
                    '<div class="controls">' +
                        '<label class="checkbox">' +
                            '<input type="checkbox" id="required" <% if (data.required) { %>checked<% } %>> Required' +
                        '</label>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<div class="controls">' +
                        '<label class="checkbox">' +
                            '<input type="checkbox" id="visible" <% if (data.visible) { %>checked<% } %>> Visible' +
                        '</label>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<div class="controls">' +
                        '<label class="checkbox">' +
                            '<input type="checkbox" id="protected" <% if (data.protected) { %>checked<% } %>> Protected' +
                        '</label>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<div class="controls">' +
                        '<label class="checkbox">' +
                            '<input type="checkbox" id="readonly" <% if (data.readonly) { %>checked<% } %>> Readonly' +
                        '</label>' +
                    '</div>' +
                '</div>' +
            '<fieldset>' +
        '</form>'
    ),

    events: {
        'form': {
            change: '_handleFormChange'
        }
    },

    render: function () {
        // var container = this.get('container'),
        //     template  = this.template;

        // container.setHTML(template);

        this._renderForm();

        return this;
    },

    _renderForm: function () {
        var model     = this.get('model'),
            container = this.get('container');

        container.empty();

        container.append(this.formTemplate(model.getAttrs()));

        this._renderTypeOptions();
    },

    _renderTypeOptions: function () {
        var model       = this.get('model'),
            selectNode  = this.get('container').one('#type');

        Y.Object.each(TXT_CONTROL_TYPES, function (label, type) {
            var optionNode = Y.Node.create(Y.Lang.sub('<option value="{value}">{label}</option>', {
                value: type,
                label: label
            }));

            if (model.get('type') === type) {
                optionNode.setAttribute('selected', 'selected');
            }

            selectNode.append(optionNode);
        });
    },

    _handleFormChange: function (e) {
        var node  = e.target,
            id    = node.get('id'),
            value = node.get('type') === 'checkbox' ? node.get('checked') : node.get('value');

        this.get('model').set(id, value);
    }
}, {
    ATTRS: {
        model: { value: new Y.Rednose.Form.ControlModel() }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').ObjectAttributesView = ObjectAttributesView;
/*jshint boss:true, expr:true, onevar:false */

var FormView;

FormView = Y.Base.create('formView', Y.View, [], {

    template: '<div class="rednose-form-view">' +
                  '<form class="rednose-form form-horizontal">' +
                      '<fieldset>' +
                          '<legend>{caption}</legend>' +
                      '</fieldset>' +
                  '</form>' +
              '</div>',

    _controlViewMap: {},

    _expressionMap: [],

    destructor: function () {
        this._expressionMap = null;
    },

    render: function () {
        var self      = this,
            container = this.get('container'),
            model     = this.get('model'),
            template  = this.template;

        this._controlViewMap = [];
        this._expressionMap  = [];

        container.setHTML(Y.Lang.sub(template, {
            caption: model.get('caption')
        }));

        model.get('controls').each(function (control) {
            var controlView  = Y.Rednose.Form.ControlViewFactory.create(control);

            if (controlView) {
                self._controlViewMap[control.get('id')] = controlView;
                // XXX
                control.view = controlView;

                // Add bubble target.
                controlView.addTarget(self);

                // XXX: Binding.
                controlView.after('*:change', function () {
                    // TODO: Propagate to this.change event.
                    // self._evalutateExpressions();
                });

                // XXX: Expresions.
                var expressions = control.get('properties').expressions;

                if (expressions) {
                    Y.Object.each(expressions, function (expression) {
                        self._expressionMap.push(expression);
                    });
                }

                container.one('fieldset').append(controlView.render().get('container'));
            }
        });

        // this._evalutateExpressions();

        return this;
    },

    _evalutateExpressions: function () {
        var self = this;

        var objectDefinitions = [];

        Y.Object.each(this._controlViewMap, function (view) {
            var id    = view.get('model').get('id'),
                attrs = Y.JSON.stringify(view.get('model').toJSON());

            objectDefinitions.push(id + ' = ' + attrs);
        });

        var lines = [];

        lines.push('var ' + objectDefinitions.join(', ') + ';');
        lines.push(this._expressionMap.join(' '));

        var objectMappings = [];

        Y.Object.each(this._controlViewMap, function (view) {
            var id    = view.get('model').get('id');

            objectMappings.push('"' + id + '": ' + id);
        });

        lines.push('var objects = {' + objectMappings.join(', ') + '};');

        var objects;

        eval(lines.join(' '));

        Y.Object.each(objects, function (attrs, id) {
            var model = self._controlViewMap[id].get('model');

            model.setAttrs(attrs);

            // TODO: Only render changed views
            self._controlViewMap[id].render();
        });
    }
}, {
    ATTRS: {
        model: { value: new Y.Rednose.Form.FormModel() }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').FormView = FormView;
/*jshint boss:true, expr:true, onevar:false */

var TXT_NAVBAR_CAPTION = 'Form Designer';

var FormDesigner;

FormDesigner = Y.Base.create('formDesigner', Y.App, [ Y.Rednose.Template.ThreeColumn ], {
    views: {
        form: {
            type: Y.Rednose.FormDesigner.FormView
        }
    },

    _navbar: null,

    _objectLibraryView: null,
    _hierarchyView: null,
    _objectAttributesView: null,
    _dataSourcesView: null,

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
                { id: 'file', title: 'File', items: [
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


}, '1.1.0-DEV', {
    "requires": [
        "rednose-app",
        "rednose-datasource-manager",
        "rednose-form",
        "rednose-form-designer-css",
        "rednose-navbar",
        "rednose-nodescroll",
        "rednose-treeview"
    ]
});
