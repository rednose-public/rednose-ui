/*jshint boss:true, expr:true, onevar:false */

var DataSource = Y.Rednose.DataSource.DataSource,
    Micro      = Y.Template.Micro;

var ChoicePageView = Y.Base.create('choicePageView', Y.View, [], {
    template: Micro.compile(
        '<form class="form-horizontal">'+
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="name">Name</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="name" type="text" value="<%= data.name %>"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="id">Identifier</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="id" type="text" value="<%= data.id %>"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label">Type</label>' +
                    '<div class="controls">' +
                        '<label class="radio">' +
                            '<input type="radio" name="type" value="pdo" <% if (data.type == "pdo") { %>checked<% } %>>' +
                            'Database' +
                        '</label>' +
                        '<label class="radio">' +
                            '<input type="radio" name="type" value="dataGen" <% if (data.type == "dataGen") { %>checked<% } %>>' +
                            'DataGen' +
                        '</label>' +
                        '<label class="radio">' +
                            '<input type="radio" name="type" value="xml" <% if (data.type == "xml") { %>checked<% } %>>' +
                            'XML Data' +
                        '</label>' +
                    '</div>' +
                '</div>' +
            '</fieldset>' +
        '</form>'
    ),

    events: {
        'form': {
            change: '_handleFormChange'
        }
    },

    render: function () {
        var container = this.get('container'),
            template  = this.template,
            model     = this.get('model');

        container.setHTML(template(model.getAttrs()));

        return this;
    },

    _handleFormChange: function (e) {
        var node  = e.target,
            id    = node.get('type') === 'radio' ? node.get('name') : node.get('id');
            value = node.get('type') === 'checkbox' ? node.get('checked') : node.get('value');

        this.get('model').set(id, value);
    }
}, {
    ATTRS: {
        model: { value: new DataSource() }
    }
});
