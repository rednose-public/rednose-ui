var Grid,
    TemplateView;

// TODO: Abstract to separate view file
TemplateView = Y.Base.create('templateView', Y.View, [], {

    // Compile our template using Handlebars.
    template: Y.Handlebars.compile(
        '<div class="template-grid-container" title="{{ name }}" data-yui3-record="{{ clientId }}">' +
        '    <div class="template-grid-icon-container">' +
        '        <div class="template-grid-icon-wrapper">' +
        '            <img class="template-grid-icon"></img>' +
        '       </div>' +
        '    </div>' +
        '    <div class="template-grid-footer">' +
        '        <div class="template-grid-name">{{ name }}</div>' +
        '        <input class="edit" type="text" value="{{ name }}" />' +
        '        <div class="template-grid-date">{{ dateCreated }}</div>' +
        '    </div>' +
        '</div>'
    ),

    events: {
        '.template-grid-name': {
            click: 'edit'
        },
        '.edit': {
            blur: 'close',
            keypress: 'enterUpdate'
        },
        '.template-grid-container': {
            contextmenu: 'contextMenu'
        }
    },

    // Render this view in our <li> container, and fill it with the
    // data in our Model.
    render: function () {
        var container = this.get('container'),
            model     = this.get('model'),
            content;

        content = this.template(model.getAttrs());

        container.setContent(content);

        this.set('inputNode', container.one('.edit'));
        this.set('footerNode', container.one('.template-grid-footer'));

        return this;
    },

    // Turn on editing mode for the Template name by exposing the input field.
    edit: function () {
        this.get('footerNode').addClass('editing');
        this.get('inputNode').focus();
    },

    // Get the value from our input field while hiding it, and
    // save it to our Template when focus is lost from the field.
    close: function () {
        var value       = this.get('inputNode').get('value'),
            editedValue = Y.Escape.html(Y.Lang.trim(value)),
            template    = this.get('model');

        this.get('footerNode').removeClass('editing');

        if (editedValue) {
            template.set('name', editedValue);
            // FIXME: Find out why the model gets saved twice.
            template.save();
        }
    },

    // Also allow updating the Template's name through the enter key.
    enterUpdate: function (e) {
        var ENTER_KEY = 13;

        if (e.keyCode === ENTER_KEY) {
            this.close();
        }
    },

    contextMenu: function (e) {
        var container = this.get('container'),
            template  = this.get('model'),
            contextMenu;

        // TODO: Filter click so it doesn't get triggered when clicked in the margins
        e.preventDefault();

        // Remove a previous context menu if it exists
        if (Y.Lang.isNull(Y.one('#template-context')) === false) {
            // FIXME: Also destroy the panel node
            Y.one('#template-context').remove();
        }

        // TODO: Create contextmenu widget
        contextMenu = new Y.Overlay({
            bodyContent: '<div id="template-context" class="dropdown open"><ul class="dropdown-menu">' +
                         '<li><a data-event="templateDelete" href="#">Delete template</a></li>' +
                         '<li><a data-event="templateDuplicate" href="#">Duplicate template</a></li>' +
                         '</ul></div>',
            visible    : false,
            constrain  : true
        });

        contextMenu.render(container);

        contextMenu.set('xy', [e.pageX, e.pageY]);
        contextMenu.show();

        // Bind the menu events
        Y.one('#template-context').all('a').each(function (node) {
            node.on(['click', 'contextmenu'], function (e) {
                e.preventDefault();

                Y.fire('templateContextMenu:' + node.getAttribute('data-event'), {
                    node : container,
                    model: template
                });

                // FIXME: Also destroy the panel node
                Y.one('#template-context').remove();
            });
        });
    }
});

// TODO: Y.Libbit.Grid.Message
Grid = Y.Base.create('grid', Y.Widget,  [ Y.Libbit.Grid.Selectable ], {

    renderUI : function () {
        this._renderGridItems();
    },

    _renderGridItems : function() {
        var contentBox = this.get("contentBox"),
            list       = this.get('data');

        Y.each(list, function (model) {
            var view = new TemplateView({model: model}),
                node = view.render().get('container');

            contentBox.append(node);
        });
    }
}, {
    ATTRS: {
        /**
         * The array containing the models to be rendered
         */
        data: {
            value: []
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Grid = Grid;
