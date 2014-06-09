/*jshint boss:true, expr:true, onevar:false */

var Grid,
    GridView;

GridView = Y.Base.create('gridView', Y.View, [], {

    // Compile our template using Handlebars.
    template: Y.Handlebars.compile(
        '<div class="model-grid-container" title="{{ name }}" data-yui3-record="{{ clientId }}">' +
            '<div class="model-grid-icon-container">' +
                '<div class="model-grid-icon-wrapper">' +
                    '{{#if thumbnail}}' +
                        '<img class="model-grid-icon" alt="{{ name }}" src="{{ thumbnail }}" style="width: 110px; height: 156px;"/>' +
                    '{{else}}' +
                        '<div class="model-grid-icon"></div>' +
                    '{{/if}}' +
                '</div>' +
                '<div class="model-grid-footer">' +
                    '<div class="model-grid-name">{{ label }}</div>' +
                    '<input class="edit" type="text" value="{{ name }}" style="visibility: hidden;"/>' +
                    '<div class="model-grid-date">{{ dateModified }}</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    ),

    // Render this view in our <li> container, and fill it with the
    // data in our Model.
    render: function () {
        var container = this.get('container'),
            model     = this.get('model');

        container.setStyle('float', 'left');

        container.setHTML(this.template({
            clientId    : model.get('clientId'),
            label       : Y.Rednose.Util.formatLabel(model.get('name')),
            name        : model.get('name'),
            thumbnail   : model.get('thumbnail'),
            dateModified: model.get('date_modified')
        }));

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
        var value       = this.get('inputNode').get('value'),
            self        = this,
            editedValue = Y.Escape.html(Y.Lang.trim(value)),
            gridModel   = this.get('model');

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
        /**
         * @attribute {Model} model
         */
        model: {
            value: null
        }
    }
});

Grid = Y.Base.create('grid', Y.View, [Y.Rednose.Grid.Selectable], {
    initializer: function () {
        var container = this.get('container');

        if (this.get('openOnClick')) {
            container.on('click', this._onContainerClick, this);
        }
    },

    render: function () {
        var container = this.get('container'),
            list      = this.get('data');

        container.addClass('rednose-grid-view');

        Y.each(list, function (model) {
            var view = new GridView({ model: model });

            view.addTarget(this);

            container.append(view.render().get('container'));
        });
    },

    _onContainerClick: function (e) {
        if (!e.target.hasClass('model-grid-icon')) {
            return;
        }

        e.stopImmediatePropagation();

        var node  = e.target.ancestor('.model-grid-icon-container'),
            model = this._getModelFromGridItem(node);

        this.fire('open', {model: model});
    }
}, {
    ATTRS: {
        /**
         * @attribute {Boolean}
         * @default false
         * @initOnly
         */
        openOnClick: {
            value: false,
            writeOnce: 'initOnly'
        },

        /**
         * The ModelList containing the models to be rendered
         *
         * @attribute {ModelList} data
         */
        data: {
            value: []
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Grid = Grid;
