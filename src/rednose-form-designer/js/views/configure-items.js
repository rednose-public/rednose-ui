var ConfigureItems;

ConfigureItems = Y.Base.create('configureItems', Y.Widget, [ Y.Rednose.Dialog ], {
    template:
        '<div>' +
        '   <div class="control-group">' +
        '   </div>' +
        '</div>',

    render: function () {
        var self = this,
            view = Y.Node.create(this.template),
            properties = this.get('model').get('properties'),
            data = [];

        if (properties.choices) {
            Y.Array.each(properties.choices, function (choice) {
                data.push(choice);
            });
        }

        var table = new Y.Rednose.DataTable({
            columns: [
                { key: 'label', label: 'Label', editable: true },
                { key: 'value', label: 'Value', editable: true }
            ],
            data: data,
        }).plug(new Y.Rednose.DataTableEditRowPlugin);

        table.render(view.one('.control-group'));
        view.one('.control-group').setStyle('width', '600px;');

        this.prompt({
            title: 'Configure items: ' + this.get('model').get('caption'),
            html: view
        }, function(form) {
            this.get('model').set('properties', properties);
        });

        this.addButtons([
            {
                value: '',
                icon: 'icon-plus',
                position: 'left'
            },
            {
                value: '',
                icon: 'icon-remove',
                position: 'left'
            }
        ]);
    },

}, {
    ATTRS: {
        model: { value: null }
    }
});

Y.namespace('Rednose.FormDesigner').ConfigureItems = ConfigureItems;
