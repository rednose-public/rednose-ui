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

var Micro = Y.Template.Micro,
    ObjectAttributesView;

ObjectAttributesView = Y.Base.create('objectAttributesView', Y.Rednose.Dialog, [], {

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
        '<form class="form-horizontal">'+
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
                        '<input class="input-block-level" id="name" type="text" value="<%= data.name %>"/>' +
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
                    '<label class="control-label">Required</label>' +
                    '<div class="controls">' +
                        '<input type="checkbox" id="required" <% if (data.required) { %>checked<% } %>></input>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label">Visible</label>' +
                    '<div class="controls">' +
                        '<input type="checkbox" id="visible" <% if (data.visible) { %>checked<% } %>></input>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label">Protected</label>' +
                    '<div class="controls">' +
                        '<input type="checkbox" id="protected" <% if (data.protected) { %>checked<% } %>></input>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label">Readonly</label>' +
                    '<div class="controls">' +
                        '<input type="checkbox" id="readonly" <% if (data.readonly) { %>checked<% } %>></input>' +
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
        var model = this.get('model');

        this.node = Y.Node.create(this.formTemplate(model.getAttrs()));

        this._renderForm();

        this.prompt({
            title: 'Control properties',
            html : this.node
        });

        return this;
    },

    _renderForm: function () {
        var model     = this.get('model'),
            container = this.node;

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
            selectNode  = this.node.one('#type');

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
