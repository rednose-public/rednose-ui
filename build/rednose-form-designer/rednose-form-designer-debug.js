YUI.add('rednose-form-designer', function (Y, NAME) {

var ConfigureItems;

ConfigureItems = Y.Base.create('configureItems', Y.Widget, [ Y.Rednose.Dialog ], {
    template:
        '<div>' +
        '   <div class="control-group">' +
        '   </div>' +
        '</div>',

    _table: null,

    render: function () {
        var self = this,
            view = Y.Node.create(this.template),
            properties = this.get('model').get('properties'),
            data = [];

        if (properties.choices) {
            Y.Object.each(properties.choices, function (label, value) {
                data.push({ label: label, value: value });
            });
        }

        this._table = new Y.Rednose.DataTable({
            columns: [
                { key: 'label', label: 'Label', editable: true },
                { key: 'value', label: 'Value', editable: true }
            ],
            data: data,
        })

        this._table.render(view.one('.control-group'));
        view.one('.control-group').setStyle('width', '630px;');

        this.prompt({
            title: 'Configure items: ' + this.get('model').get('caption'),
            html: view
        }, function(form) {
            var items = {},
                properties = self.get('model').get('properties'),
                modellist = self._table.hasPlugin('editable').getData()

            modellist.each(function(model) {
                items[model.get('value')] = model.get('label');
            });

            properties.choices = items;

            self.get('model').set('properties', properties);

            self.destroy();
        });

        this._table.plug(Y.Rednose.DataTableEditRowPlugin);
        this._table.plug(Y.Rednose.DataTableSelectPlugin);

        this.addButtons([
            {
                value: '',
                icon: 'icon-plus',
                position: 'left',
                callback: function() {
                    self._addItem();
                }
            }, {
                value: '',
                icon: 'icon-remove',
                position: 'left',
                callback: function() {
                    self._removeItem();
                }
            }
        ]);
    },

    _addItem: function() {
        var model = this._table.get('data');

        model.add({ name: '', value: '' });
    },

    _removeItem: function() {
        var selectedRow = this._table.hasPlugin('selectable').getSelection();

        if (selectedRow) {
            selectedRow.destroy();
        }
    },

}, {
    ATTRS: {
        model: { value: null }
    }
});

Y.namespace('Rednose.FormDesigner').ConfigureItems = ConfigureItems;
/*jshint boss:true, expr:true, onevar:false */

var TXT_OBJECT_LIBRARY = 'Object Library';

var EVT_SELECT = 'select';

var ObjectLibrary,
    ObjectLibraryView;

ObjectLibrary = Y.Base.create('objectLibrary', Y.Widget, [], {

    render: function (navBar, parentId) {
        var self = this,
            items = this.get('items'),
            parentNode = navBar.getNode(parentId).get('parentNode');

        navBar.createDropdown(parentNode, items);

        for (var i in items) {
            navBar.on(items[i].id, function(e) {
                self.fire('objectAdd', { item: items[i] });
            });
        }

        return this;
    }

}, {
    ATTRS: {
        items: {
            value:
                [{
                    id    : 'text',
                    title : 'Text',
                    icon  : 'rednose-icon-text'
                }, {
                    id    : 'textarea',
                    title : 'Text Area',
                    icon  : 'rednose-icon-textarea'
                }, {
                    id    : 'richtext',
                    title : 'Rich Text',
                    icon  : 'rednose-icon-textarea'
                }, {
                    id    : 'dropdown',
                    title : 'Drop-down List',
                    icon  : 'rednose-icon-dropdown'
                }, {
                    id    : 'radio',
                    title : 'Radio Button',
                    icon  : 'rednose-icon-radio'
                }, {
                    id    : 'checkbox',
                    title : 'Checkbox',
                    icon  : 'rednose-icon-checkbox'
                }, {
                    id    : 'date',
                    title : 'Date',
                    icon  : 'rednose-icon-date'
                }, {
                    id    : 'autocomplete',
                    title : 'Autocomplete',
                    icon  : 'rednose-icon-dropdown'
                }, {
                    id    : 'file',
                    title : 'File',
                    icon  : 'rednose-icon-dropdown'
                }]
        }
    }
});

ObjectLibraryView = Y.Base.create('objectLibraryView', Y.View, [ Y.Rednose.Dialog ], {
    template:
        '<div>' +
        '   <div class="control-group">' +
        '       <label for="input" class="control-label">Provide a name:</label>' +
        '       <div class="controls">' +
        '           <input type="text" data-path="name" value="" id="name">' +
        '       </div>' +
        '   </div>' +
        '   <div class="control-group">' +
        '       <label for="input" class="control-label">Foreign id:</label>' +
        '       <div class="controls">' +
        '           <input type="text" data-path="foreignId" id="foreignId" />' +
        '       </div>' +
        '   </div>' +
        '</div>',

    render: function() {
        var self      = this,
            name      = '',
            view      = Y.Node.create(this.template),
            foreignId = view.one('#foreignId');

        view.one('input[data-path=name]').on(
            ['keyup', 'change'],
            function (e) {
                self._autoFillForeignId(e, foreignId);
            }
        );

        view.one('input[data-path=foreignId]').on(
            ['keyup', 'change'],
            function(e) {
                self._foreignIdChange(e);
            }
        );

        this.prompt({
            title: 'Add new ' + name,
            html: view
        }, function(form) {
             var control = new Y.Rednose.Form.ControlModel({
                caption: form.one('[data-path=name]').get('value'),
                foreignId: form.one('[data-path=foreignId]').get('value'),
                type: type
             });

            self.get('panel').destroy();
        });
    },

    _autoFillForeignId: function(e, foreignId) {
        var value = this._cleanString(e.target.get('value'));

        if (foreignId.hasAttribute('data-noautofill') === false) {
            foreignId.set('value', value);
        }
    },

    _foreignIdChange: function(e) {
        var value = this._cleanString(e.target.get('value'));

        e.target.set('value', value);
        e.target.setAttribute('data-noautofill', 'true');

        if (value === '') {
            e.target.removeAttribute('data-noautofill');
        }
    },

    _cleanString: function(value) {
        return value
            .replace(/ /g, '_')
            .replace(/\W/g, '_');
    }
}, {
    ATTRS: {
        item: { value: {} },
        model: { value: null }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').ObjectLibrary = ObjectLibrary;
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
/*jshint boss:true, expr:true, onevar:false */

var TXT_DATA_SOURCES       = 'Data Sources',
    TXT_DATA_SOURCE_EDIT   = 'Edit Data Source',
    TXT_DATA_SOURCE_DELETE = 'Delete Data Source';

var DataSource = Y.Rednose.DataSource.DataSource,
    DataSourcesView;

DataSourcesView = Y.Base.create('dataSourcesView', Y.View, [], {

    template: '<div class="rednose-data-sources></div>',

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
    },

    _handleContextMenu: function (e) {
        var node = e.currentTarget;

        // Prevent default contextmenu behaviour.
        e.preventDefault();

        if (node.contextMenu) {
            return false;
        }

        var model = this._treeView.getNodeById(node.getData('node-id')).data;

        if (model instanceof DataSource) {
            node.plug(Y.Rednose.ContextMenu, {
                content     : [
                    { title: TXT_DATA_SOURCE_EDIT, id: 'dataSourceEdit' },
                    { title: '-' },
                    { title: TXT_DATA_SOURCE_DELETE, id: 'dataSourceDelete' }
                ],
                data        : model,
                bubbleTarget: this
            });

            node.contextMenu._handleContextMenu(e);
        }
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
                        '<input class="input-block-level" id="id" type="text" readonly value="<%= data.foreignId %>"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="caption">Caption</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="caption" type="text" value="<%= data.caption %>"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="value">Value</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="value" type="text" value="<%= data.value %>"/>' +
                    '</div>' +
                '</div>' +
                '<hr/>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="type">Type</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="type"></select>' +
                    '</div>' +
                '</div>' +

                // Configure items button
                '<% if (data.type == \'dropdown\' || data.type == \'radio\') { %>' +
                    '<div class="control-group">' +
                        '<label class="control-label" for="type"></label>' +
                        '<div class="controls">' +
                            '<input type="button" class="btn" value="Configure items" id="configureItems" />' +
                        '</div>' +
                    '</div>' +
                '<% } %>' +

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
        },

        '#configureItems': {
            click: '_handleConfigureItems'
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
        var self      = this,
            model     = this.get('model'),
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

        if (id == 'type') {
            this.fire('typeChange');
        }
    },

    _handleConfigureItems: function() {
        this.fire('configureItems', {
            model: this.get('model')
        });
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

    _controlMap: [],

    initializer: function () {
        var formModel   = this.get('model'),
            controlList = formModel.get('controls');

        controlList.after('add', this._handleAddControl, this);
    },

    destructor: function () {
        Y.Array.each(this._controlMap, function(control) {
            control.destroy();
            control = null;
        });

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
            self._renderControl(control);
        });

        // this._evalutateExpressions();

        return this;
    },

    _renderControl: function (control) {
        var container   = this.get('container'),
            controlView = Y.Rednose.Form.ControlViewFactory.create(control),
            self        = this;

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
            // var expressions = control.get('properties').expressions;

            // if (expressions) {
            //     Y.Object.each(expressions, function (expression) {
            //         self._expressionMap.push(expression);
            //     });
            // }

            container.one('fieldset').append(controlView.render().get('container'));

            this._controlMap.push(controlView);
        }
    },

    _evalutateExpressions: function () {
        var self = this;

        var objectDefinitions = [];

        Y.Object.each(this._controlViewMap, function (view) {
            var id    = view.get('model').get('foreignId'),
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
    },

    _handleAddControl: function (e) {
        this._renderControl(e.model);
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

var DataSourceManager = Y.Rednose.DataSourceManager.DataSourceManager,
    FormDesigner;

FormDesigner = Y.Base.create('formDesigner', Y.App, [ Y.Rednose.Template.ThreeColumn ], {
    views: {
        form: {
            type: Y.Rednose.FormDesigner.FormView
        }
    },

    _navbar: null,

    _objectLibrary       : null,
    _hierarchyView       : null,
    _objectAttributesView: null,
    _dataSourcesView     : null,

    initializer: function () {
        this._objectLibrary        = new Y.Rednose.FormDesigner.ObjectLibrary();
        this._hierarchyView        = new Y.Rednose.FormDesigner.HierarchyView();
        this._objectAttributesView = new Y.Rednose.FormDesigner.ObjectAttributesView();
        this._dataSourcesView      = new Y.Rednose.FormDesigner.DataSourcesView();

        this._objectLibrary.addTarget(this);
        this._hierarchyView.addTarget(this);
        this._objectAttributesView.addTarget(this);
        this._dataSourcesView.addTarget(this);

        this.after('hierarchyView:select', this._handleControlSelect, this);

        this.after('objectLibrary:objectAdd', this._handleObjectAdd, this);

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

        this._objectLibrary.destroy();
        this._objectLibrary = null;

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

        this._objectLibrary.render(this._navbar, 'insert');

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
                ]}, {
                    id: 'insert', title: 'Insert'
                }
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

    _handleObjectAdd: function (e) {
        var dialog = new Y.Rednose.FormDesigner.ObjectLibraryView({
            model: this.get('model'),
            item: e.item
        }).render();
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


}, '1.1.0-DEV', {
    "requires": [
        "rednose-app",
        "rednose-datasource-manager",
        "rednose-dialog",
        "rednose-form",
        "rednose-form-designer-css",
        "rednose-navbar",
        "rednose-nodescroll",
        "rednose-treeview"
    ]
});
