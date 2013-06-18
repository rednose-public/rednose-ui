var Grid,
    GridView;

// TODO: Abstract to separate view file
GridView = Y.Base.create('gridView', Y.View, [], {

    // Compile our template using Handlebars.
    template: Y.Handlebars.compile(
        '<div class="model-grid-container" title="{{ name }}" data-yui3-record="{{ clientId }}">' +
        '    <div class="model-grid-icon-container">' +
        '        <div class="model-grid-icon-wrapper">' +
        '        {{#if thumbnail}}' +
        '            <img alt="{{ name }}" src="data:image/png;base64,{{ thumbnail }}" style="width: 110px; height: 156px;"/>' +
        '        {{else}}' +
        '            <div class="model-grid-icon" />' +
        '        {{/if}}' +
        '    </div>' +
        '    <div class="model-grid-footer">' +
        '        <div class="model-grid-name">{{ name }}</div>' +
        // FIXME
        // '        <input class="edit" type="text" value="{{ name }}" style="visibility: hidden;"/>' +
        '        <div class="model-grid-date">{{ dateCreated }}</div>' +
        '    </div>' +
        '</div>'
    ),

    // FIXME
    // events: {
    //     '.model-grid-name': {
    //         click: 'edit'
    //     },
    //     '.edit': {
    //         blur: 'close',
    //         keypress: 'enterUpdate'
    //     }
    // },

    // Render this view in our <li> container, and fill it with the
    // data in our Model.
    render: function () {
        var container = this.get('container'),
            model = this.get('model'),
            // contextMenu = this.get('contextMenu'),
            content;

        content = this.template(model.getAttrs());

        container.setContent(content);

        // if (contextMenu !== false) {
        //     container.one('.model-grid-icon-container').plug(Y.Rednose.ContextMenu, {
        //         content: contextMenu,
        //         data: model,
        //         bubbleTarget: this
        //     });
        // }

        this.set('inputNode', container.one('.edit'));
        this.set('footerNode', container.one('.model-grid-footer'));

        return this;
    },

    // Turn on editing mode for the Template name by exposing the input field.
    edit: function () {
        this.get('footerNode').addClass('editing');
        this.get('inputNode').focus();
    },

    // Get the value from our input field while hiding it, and
    // save it to our Model (name attribute) when focus is lost from the field.
    close: function () {
        var value = this.get('inputNode').get('value'),
            self = this,
            editedValue = Y.Escape.html(Y.Lang.trim(value)),
            gridModel = this.get('model');

        this.get('footerNode').removeClass('editing');

        if (editedValue) {
            var label = self.get('footerNode').one('.model-grid-name');

            label.set('innerHTML', 'Loading...');
            gridModel.set('name', editedValue);

            gridModel.save(function() {
                self.get('inputNode').set('value', gridModel.get('name'));
                label.set('innerHTML', gridModel.get('name'));
            });
        }
    },

    // Also allow updating the Template's name through the enter key.
    enterUpdate: function (e) {
        var ENTER_KEY = 13;

        if (e.keyCode === ENTER_KEY) {
            this.close();
        }
    }
}, {
    ATTRS: {
        model: {
            value: []
        },

        contextMenu: {
            value: false
        }
    }
});

// TODO: Y.Rednose.Grid.Message
Grid = Y.Base.create('grid', Y.Widget, [ Y.Rednose.Grid.Selectable ], {

    targets: null,

    views: [],

    renderUI : function () {
        this.targets = this.getTargets();
        this._renderGridItems();
    },

    _renderGridItems : function() {
        var contentBox = this.get("contentBox"),
            contextMenu = this.get('contextMenu'),
            self = this,
            list = this.get('data');

        Y.each(list, function (model) {
            var view = new GridView({ model: model, contextMenu: contextMenu }),
                node = view.render().get('container');

            self.views.push(view);
            for (var i in self.targets) {
                view.addTarget(self.targets[i]);
            }

            contentBox.append(node);
        });
    }
}, {
    ATTRS: {
        /**
         * The ModelList containing the models to be rendered
         */
        data: {
            value: []
        },

        contextMenu: {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Grid = Grid;
Y.namespace('TB').GridView = GridView;

