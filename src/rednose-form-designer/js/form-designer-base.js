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
