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
