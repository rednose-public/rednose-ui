YUI.add('rednose-form-designer', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

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
            data: data
        });

        this._table.render(view.one('.control-group'));
        view.one('.control-group').setStyle('width', '630px;');

        this.prompt({
            title: 'Configure items: ' + this.get('model').get('caption'),
            html: view
        }, function () {
            var items      = {},
                properties = self.get('model').get('properties'),
                modellist  = self._table.hasPlugin('editable').getData();

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
    }
}, {
    ATTRS: {
        model: { value: null }
    }
});

Y.namespace('Rednose.FormDesigner').ConfigureItems = ConfigureItems;
/*jshint boss:true, expr:true, onevar:false */

/**
 * Shows a modal view where the items for this collection can be configured
 * dynamically, by specifying a mapping to data source attributes.
 */

var FormModel      = Y.Rednose.Form.FormModel,
    DataSourceList = Y.Rednose.DataSource.DataSourceList,

    TXT_DYNAMIC_ITEMS_TITLE = 'Dynamic Items',
    TXT_BUTTON_CANCEL       = 'Cancel',
    TXT_BUTTON_OK           = 'OK',
    TXT_OPTION_NONE         = 'None',

    /**
     * Fires when the dialog is closed and the changes should be purged.
     * @event configureDynamicItemsView:close
     * @type {CustomEvent}
     */
    EVT_CLOSE = 'close',

    /**
     * Fires when the dialog is closed and the changes should be persisted.
     * @event configureDynamicItemsView:ok
     * @type {CustomEvent}
     */
    EVT_OK = 'ok';

/**
 * Shows a modal view where the items for this collection can be configured
 * dynamically, by specifying a mapping to data source attributes.
 */
var ConfigureDynamicItemsView = Y.Base.create('configureDynamicItemsView', Y.View, [Y.Rednose.View.Nav], {

    /**
     * @see Rednose.View.Nav.fixed
     */
    fixed: false,

    /**
     * @see Rednose.View.Nav.close
     */
    close: true,

    /**
     * @see Rednose.View.Nav.padding
     */
    padding: true,

    /**
     * @see Rednose.View.Nav.title
     */
    title: TXT_DYNAMIC_ITEMS_TITLE,

    /**
     * @see Rednose.View.Nav.buttonGroups
     */
    buttonGroups: [
        {position: 'right', buttons: [{id: 'ok', value: TXT_BUTTON_OK, type: 'primary'}]},
        {position: 'right', buttons: [{id: 'close', value: TXT_BUTTON_CANCEL}]}
    ],

    /**
     * View event handlers
     */
    events: {
        '#dataSource': {
            change: '_handleDataSourceSelectChange'
        }
    },

    OPTION_TEMPLATE: '<option value="{value}">{label}</option>',

    /**
     * Base Template.
     */
    template:
        '<form class="form-horizontal">' +
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="dataSource">Data Source</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="dataSource"></select>' +
                    '</div>' +
                '</div>' +
                '<hr/>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="title">Title</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="title"></select>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="subtitle">Subtitle</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="subtitle"></select>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="image">Image</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="image"></select>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="value">Value</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="value"></select>' +
                    '</div>' +
                '</div>' +
            '</fieldset>' +
        '</form>',

    /**
     * @property _dataSourceSelect
     * @type Node
     * @protected
     */
    _dataSourceSelect: null,

    /**
     * @property _titleSelect
     * @type Node
     * @protected
     */
    _titleSelect: null,

    /**
     * @property _subtitleSelect
     * @type Node
     * @protected
     */
    _subtitleSelect: null,

    /**
     * @property _imageSelect
     * @type Node
     * @protected
     */
    _imageSelect: null,

    /**
     * @property _valueSelect
     * @type Node
     * @protected
     */
    _valueSelect: null,

    /**
     * Stores references to data sources to retrieve them by identifier (foreign ID)
     *
     * @property _identifierMap
     * @type Object
     * @protected
     */
    _identifierMap: {},

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this._dataSourceSelect = container.one('#dataSource');
        this._titleSelect      = container.one('#title');
        this._subtitleSelect   = container.one('#subtitle');
        this._imageSelect      = container.one('#image');
        this._valueSelect      = container.one('#value');

        this.after('toolbar:click#close', this._handleButtonClose, this);
        this.after('toolbar:click#ok', this._handleButtonOk, this);
    },

    destructor: function () {
        this._dataSourceSelect = null;
        this._titleSelect      = null;
        this._subtitleSelect   = null;
        this._imageSelect      = null;
        this._valueSelect      = null;
        this._identifierMap    = null;
    },

    render: function () {
        var properties     = this.get('model').get('properties'),
            dataSourceList = this.get('dataSourceList'),
            self           = this;

        this._identifierMap = {};

        this._updateSelectNode(this._dataSourceSelect, dataSourceList.map(function (dataSource) {
            self._identifierMap[dataSource.get('identifier')] = dataSource;

            return {
                value: dataSource.get('identifier'),
                label: dataSource.get('name')
            };
        }));

        // Handle current model state.
        if (properties.datasource) {
            this._dataSourceSelect.set('value', properties.datasource.id);
        }

        this._handleDataSourceSelectChange();

        return this;
    },

    /**
     * Binds the view data to the model.
     *
     * @method _bindView
     * @protected
     */
    _bindView: function () {
        // Perform all changes on a clone of the properties object, so we don't trigger model changes for every update.
        var model      = this.get('model'),
            properties = Y.clone(model.get('properties'));

        if (this._dataSourceSelect.get('value') === '0') {
            properties.datasource = undefined;
        } else {
            properties.datasource || (properties.datasource = {});

            properties.datasource.id = this._dataSourceSelect.get('value');

            var map = {};

            this._titleSelect.get('value')    !== '0' && (map.title    = this._titleSelect.get('value'));
            this._subtitleSelect.get('value') !== '0' && (map.subtitle = this._subtitleSelect.get('value'));
            this._imageSelect.get('value')    !== '0' && (map.image    = this._imageSelect.get('value'));
            this._valueSelect.get('value')    !== '0' && (map.value    = this._valueSelect.get('value'));

            Y.Object.isEmpty(map) ? properties.datasource.map = undefined : properties.datasource.map = map;
        }

        // Update the model, firing only a single change event.
        model.set('properties', properties);
    },

    /**
     * @method _updateSelectNode
     * @param {Node} node Select node
     * @param {Array} data Option data
     * @protected
     */
    _updateSelectNode: function (node, data) {
        data || (data = []);

        var self = this;

        node.empty();

        node.append(Y.Lang.sub(this.OPTION_TEMPLATE, {
            value: 0,
            label: TXT_OPTION_NONE
        }));

        Y.Array.each(data, function (result) {
            node.append(Y.Lang.sub(self.OPTION_TEMPLATE, {
                value: result.value,
                label: result.label
            }));
        });
    },

    /**
     * @method _handleDataSourceSelectChange
     * @protected
     */
    _handleDataSourceSelectChange: function () {
        var value       = this._dataSourceSelect.get('value'),
            optionData  = [];

        if (value !== '0') {
            var dataSource = this._identifierMap[value],
                attributes = dataSource.getAttributeList();

            optionData = Y.Array.map(attributes, function (attribute) {
                return {
                    value: attribute,
                    label: attribute
                };
            });
        }

        this._updateSelectNode(this._titleSelect, optionData);
        this._updateSelectNode(this._subtitleSelect, optionData);
        this._updateSelectNode(this._imageSelect, optionData);
        this._updateSelectNode(this._valueSelect, optionData);

        // Handle current model state.
        var properties = this.get('model').get('properties'),
            map;

        if (!properties.datasource || !properties.datasource.map) {
            return;
        }

        if (value === properties.datasource.id) {
            map = properties.datasource.map;

            this._titleSelect.set('value', map.title || '0');
            this._subtitleSelect.set('value', map.subtitle || '0');
            this._imageSelect.set('value', map.image || '0');
            this._valueSelect.set('value', map.value || '0');
        }
    },

    /**
     * @method _handleButtonClose
     * @protected
     */
    _handleButtonClose: function () {
        this.fire(EVT_CLOSE);
    },

    /**
     * @method _handleButtonOk
     * @protected
     */
    _handleButtonOk: function () {
        var model = this.get('model');

        this._bindView();

        this.fire(EVT_OK, { model: model });
    }
}, {
    ATTRS: {
        model: {
            value: new FormModel()
        },

        dataSourceList: {
            value: new DataSourceList()
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').ConfigureDynamicItemsView = ConfigureDynamicItemsView;
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
/*jshint boss:true, expr:true, onevar:false */

var ObjectLibrary,
    ObjectLibraryView;

ObjectLibrary = Y.Base.create('objectLibrary', Y.Widget, [], {

    render: function (navBar, parentId) {
        // var self = this,
        //     items = this.get('items'),
        //     parentNode = navBar.getNode(parentId).get('parentNode');

        // navBar.createDropdown(parentNode, items);

        // Y.Array.each(items, function (item) {
        //     navBar.on(item.id, function (e) {
        //         var type = e.type.split(':')[1];

        //         Y.Array.each(items, function (item) {
        //             if (item.id === type) {
        //                 self.fire('objectAdd', { item: item });
        //             }
        //         });
        //     });
        // });

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
        '       <label for="input" class="control-label">Caption</label>' +
        '       <div class="controls">' +
        '           <input type="text" data-path="name" value="" id="name">' +
        '       </div>' +
        '   </div>' +
        '   <div class="control-group">' +
        '       <label for="input" class="control-label">Identifier</label>' +
        '       <div class="controls">' +
        '           <input type="text" data-path="foreignId" id="foreignId" />' +
        '       </div>' +
        '   </div>' +
        '</div>',

    render: function() {
        var self      = this,
            name      = this.get('item').title,
            type      = this.get('item').id,
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
            title: 'Add a new ' + name,
            html: view
        }, function(form) {
             var control = new Y.Rednose.Form.ControlModel({
                caption: form.one('[data-path=name]').get('value'),
                foreignId: form.one('[data-path=foreignId]').get('value'),
                type: type
            });

            self.get('model').get('controls').add(
                control
            );

            self.destroy();
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
        /* The item from the objectLibrary */
        item: { value: {} },

        /* The formModel */
        model: { value: null }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').ObjectLibrary = ObjectLibrary;
Y.namespace('Rednose.FormDesigner').ObjectLibraryView = ObjectLibraryView;
/*jshint boss:true, expr:true, onevar:false */

var TXT_HIERARCHY      = 'Hierarchy',
    TXT_REMOVE_CONTROL = 'Remove';

/**
 * @event select
 */
var EVT_SELECT = 'select';

var HierarchyView = Y.Base.create('hierarchyView', Y.View, [], {

    template: '<div class="rednose-hierarchy></div>',

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
            model     = this.get('model');

        this._treeView && this._treeView.destroy();

        container.append('<div class="rednose-treeview"></div>');

        this._treeView = new Y.Rednose.TreeView({
            container : container.one('.rednose-treeview'),
            nodes     : model.getTree(),
            selectable: true,
            header    : TXT_HIERARCHY
        });

        // Open all nodes by default since this is our main navigation tool.
        this._treeView.open();
        this._treeView.render();

        this._treeView.after('select', function (e) {
            self.fire(EVT_SELECT, {node: e.node});
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

        if (model && model instanceof Y.Rednose.Form.ControlModel) {
            node.plug(Y.Rednose.ContextMenu, {
                content: [
                    { title: TXT_REMOVE_CONTROL, id: 'removeControl' }
                ],
                data: model,
                bubbleTarget: this
            });

            node.contextMenu._handleContextMenu(e);
        }

        return true;
    },

    // XXX
    _setModel: function (model) {
        var controlList = model.get('controls');

        controlList.after('add', this.render, this);
    }
}, {
    ATTRS: {
        /**
         * @attribute {Rednose.Form.FormModel} model
         */
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
                nodes     : list.getTree(),
                selectable: false,
                header    : TXT_DATA_SOURCES
            });

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

// var TXT_OBJECT_ATTRIBUTES = 'Object Attributes';

var Micro = Y.Template.Micro,
    ObjectAttributesView;

ObjectAttributesView = Y.Base.create('objectAttributesView', Y.View, [ Y.Rednose.View.Nav ], {

    /**
     * Property inherited from Y.Rednose.View.Nav
     */
    // title: TXT_OBJECT_ATTRIBUTES,

    /**
     * @see Rednose.View.Nav.footer
     */
    footer: false,

    /**
     * @see Rednose.View.Nav.padding
     */
    padding: true,

    formTemplate: Micro.compile(
        '<form class="form-vertical">'+
            '<fieldset>' +
                // The form control type.
                '<div class="control-group">' +
                    '<label class="control-label" for="type">Type</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="type"></select>' +
                    '</div>' +
                '</div>' +

                // The form control identification.
                '<hr/>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="id">Name</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="name" type="text" value="<%= data.foreign_id %>"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="caption">Caption</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="caption" type="text" value="<%= data.caption %>"/>' +
                    '</div>' +
                '</div>' +

                // Attributes present on all control types.
                '<hr/>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="value">Value</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="value" type="text" value="<%= data.value %>"/>' +
                    '</div>' +
                '</div>' +
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

                // Attributes that are specific to this control type.
                '<% if (data.type == \'dropdown\' || data.type == \'radio\' || data.type == \'autocomplete\') { %>' +
                    '<hr/>' +
                    '<div class="control-group">' +
                        '<label class="control-label" for="configureItems">Items</label>' +
                        '<div class="controls">' +
                            '<div class="input-append">' +
                                '<input class="rednose-combo-block-level" type="text" id="items" readonly ' +
                                    'value="<%= data.properties.choices ? Y.Object.keys(data.properties.choices).length : 0 %> items"' +
                                '>' +
                                '<button class="btn dropdown-toggle" id="configureItemsList" type="button" title="Configure Items">' +
                                    '<i class="icon-cog"></i> <span class="caret"></span></button>' +
                                '</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '<% } %>' +

                // Data binding options.
                '<hr/>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="binding">Binding</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="binding" type="text" value="<%= data.binding %>"/>' +
                    '</div>' +
                '</div>' +

                // TODO: Expressions.
            '<fieldset>' +
        '</form>'
    ),

    emptyTemplate: '<div class="alert alert-info">No attributes available</div>',

    events: {
        'form': {
            change: '_handleFormChange'
        }
    },

    initializer: function () {
        this.on('dropdown:click#configureItems', this._handleConfigureItems, this);
        this.on('dropdown:click#configureDynamicItems', this._handleConfigureDynamicItems, this);
    },

    render: function () {
        this._renderForm();

        return this;
    },

    _renderForm: function () {
        var model     = this.get('model'),
            container = this.get('container');

        container.empty();

        if (model) {
            container.append(this.formTemplate(model.getAttrs()));

            var configureItemsListButton = container.one('#configureItemsList');

            if (configureItemsListButton) {
                configureItemsListButton.plug(Y.Rednose.Plugin.Dropdown, {
                    showCaret: false,
                    items: [
                        { id: 'configureItems', title: 'Items', icon: 'icon-align-justify' },
                        { id: 'configureDynamicItems', title: 'Dynamic items', icon: 'icon-random' }
                    ]
                });
                configureItemsListButton.dropdown.addTarget(this);
            }

            this._renderTypeOptions();
        } else {
            container.append(this.emptyTemplate);
        }
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

        if (id === 'type') {
            this.fire('typeChange');
        }
    },

    _handleConfigureItems: function () {
        this.fire('configureItems', {
            model: this.get('model')
        });
    },

    _handleConfigureDynamicItems: function () {
        this.fire('configureDynamicItems', {
            model: this.get('model')
        });
    }
}, {
    ATTRS: {
        model: { value: null }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').ObjectAttributesView = ObjectAttributesView;
/*jshint boss:true, expr:true, evil:true, onevar:false */

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
        var container        = this.get('container'),
            controlView      = Y.Rednose.Form.ControlViewFactory.create(control),
            controlContainer = controlView.render().get('container'),
            self             = this;

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


            var dd = new Y.DD.Drag({
                node: controlContainer,
                group: ['rednose-form-designer-form']
            }).plug(Y.Plugin.DDProxy, {
                moveOnEnd: false
            });

            dd.on('drag:start', function(e) {
                e.target.get('dragNode').setHTML('');
            });
            dd.on('drag:drag', function(e) {
                self._dragging(e, container.one('fieldset'), controlContainer);
            });
            dd.on('drag:end', function() {
                self._setSortOrder(container.one('fieldset'));
            });

            controlContainer.setData('model', control);

            container.one('fieldset').append(controlContainer);

            this._controlMap.push(controlView);
        }
    },

    _dragging: function(e, container, sender) {
        var y = e.currentTarget.mouseXY[1];
        var hit = false;

        container.all('> div').each(function(control) {
            if (sender.get('id') !== control.get('id')) {
                var top = control.getY();
                var bottom = (top + parseInt(control.getComputedStyle('height'), 10));

                if (y > top && y < bottom) {
                    sender.insertBefore(sender, control);

                    hit = true;
                }
            }
        });

        if (hit === false && y > (container.getY() + parseInt(container.getComputedStyle('height'), 10))) {
            container.append(sender);
        }
    },

    _setSortOrder: function(container) {
        var counter = 0,
            controls = [];

        container.all('> div').each(function(node) {
            var control = node.getData('model');

            control.set('sortOrder', counter);
            controls.push(control);

            counter++;
        });

        this.get('model').set('controls', controls);
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

var ConfigureDynamicItems = Y.Rednose.FormDesigner.ConfigureDynamicItemsView,
    Panel                 = Y.Rednose.Panel;

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

    _handleClose: function() {
        this.destroy();
    }
}, {
    ATTRS: {
        /**
         * @type {Rednose.Form.FormModel}
         */
        model: {
            value: new Y.Rednose.Form.FormModel()
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').Base = FormDesignerBase;

Y.Rednose.FormDesigner.ControlItems = [
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
/*jshint boss:true, expr:true, onevar:false */

var FormDesigner = Y.Base.create('formDesigner', Y.Rednose.FormDesigner.Base, [
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
            items: Y.Rednose.FormDesigner.ControlItems
        });

        this.toolbar.addTarget(this);
    }
});

Y.namespace('Rednose').FormDesigner = Y.mix(FormDesigner, Y.Rednose.FormDesigner);
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
    _objectAttributesView: null,
    _dataControlsView    : null,

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        Y.mix(this.views, this.appViews);

        this._objectLibrary        = new Y.Rednose.FormDesigner.ObjectLibrary();
        this._hierarchyView        = new Y.Rednose.FormDesigner.HierarchyView();
        this._dataSourcesView      = new Y.Rednose.FormDesigner.DataSourcesView();
        this._objectAttributesView = new Y.Rednose.FormDesigner.ObjectAttributesView();
        this._dataControlsView     = new Y.Rednose.FormDesigner.DataControlsView();

        this._objectLibrary.addTarget(this);
        this._hierarchyView.addTarget(this);
        this._dataSourcesView.addTarget(this);
        this._objectAttributesView.addTarget(this);
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
            this.get('leftContainer').append(this._dataControlsView.render().get('container'));
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

        this._objectAttributesView.set('model', form.getControl(node.label));
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


}, '1.5.0-DEV', {
    "requires": [
        "docgenadmin-core",
        "rednose-app",
        "rednose-button-dropdown",
        "rednose-datatable-select",
        "rednose-datasource-manager",
        "rednose-dialog",
        "rednose-dropdown",
        "rednose-form",
        "rednose-form-designer-css",
        "rednose-navbar",
        "rednose-nodescroll",
        "rednose-treeview"
    ]
});
