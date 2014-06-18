/*jshint boss:true, expr:true, onevar:false */

var Grid,
    GridView;

GridView = Y.Base.create('gridView', Y.View, [], {

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
                    '<div class="model-grid-date">{{ footer }}</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    ),

    initializer: function () {
        var model = this.get('model');

        model.after('change', this.render, this);
    },

    render: function () {
        var container = this.get('container'),
            model     = this.get('model'),
            config    = this.get('config') || {},
            o         = {};

        o.data = model.toJSON();

        container.setStyle('float', 'left');

        var attrs = {
            clientId: model.get('clientId')
        };

        if (typeof config.thumbnail === 'function') {
            attrs.thumbnail = config.thumbnail(o);
        }

        if (typeof config.label === 'function') {
            var label = config.label(o);

            attrs.label = label && Y.Rednose.Util.formatLabel(label),
            attrs.name  = label;
        }

        if (typeof config.footer === 'function') {
            attrs.footer = config.footer(o);
        }

        container.setHTML(this.template(attrs));

        this.set('inputNode', container.one('.edit'));
        this.set('footerNode', container.one('.model-grid-footer'));

        return this;
    },

    edit: function () {
        this.get('footerNode').addClass('editing');
        this.get('inputNode').focus();
    },

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
        },

        /**
         * Rendering config.
         *
         * @attribute {Object} config
         */
        config: {
            value: null
        }
    }
});

Grid = Y.Base.create('grid', Y.View, [Y.Rednose.Grid.Selectable], {
    /**
     * Default rendering config.
     *
     * @property {Object}
     */
    defaultConfig: {
        thumbnail: function (o) {
            return o.data.thumbnail;
        },
        label: function (o) {
            return o.data.name;
        },
        footer: function (o) {
            return o.data.date_modified;
        }
    },

    initializer: function () {
        var container = this.get('container');

        if (this.get('openOnClick')) {
            container.on('click', this._onContainerClick, this);
        }
    },

    render: function () {
        var container = this.get('container'),
            list      = this.get('data');

        var config = this.get('config') || this.defaultConfig;

        container.addClass('rednose-grid-view');

        Y.each(list, function (model) {
            var view = new GridView({ model: model, config: config });

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
        },

        /**
         * Rendering config.
         *
         * @attribute {Object} config
         */
        config: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Grid = Grid;
