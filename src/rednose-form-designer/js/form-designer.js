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
