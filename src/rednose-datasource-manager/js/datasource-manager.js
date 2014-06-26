/*jshint boss:true, expr:true, onevar:false */

var TXT_NEW_DATA_SOURCE = 'New Data Source',
    TXT_NEXT            = 'Next',
    TXT_BACK            = 'Back',
    TXT_CANCEL          = 'Cancel',
    TXT_CREATE          = 'Create';

var DataSourceManager = Y.Base.create('dataSourceManager', Y.Rednose.App, [Y.Rednose.View.Nav], {
    /**
     * @see App.views
     */
    views: {
        choicePage: {
            type    : ChoicePageView,
            preserve: false
        },

        pdoGenericPage: {
            type    : PdoGenericPageView,
            parent  : 'choicePage',
            preserve: false
        },

        pdoSourcePage: {
            type    : PdoSourcePageView,
            parent  : 'pdoGenericPage',
            preserve: false
        },

        dataGenGenericPage: {
            type    : DataGenGenericPageView,
            parent  : 'choicePage',
            preserve: false
        },

        dataGenSourcePage: {
            type    : DataGenSourcePageView,
            parent  : 'dataGenGenericPage',
            preserve: false
        },

        xmlPage: {
            type    : XMLPageView,
            parent  : 'choicePage',
            preserve: false
        }
    },

    /**
     * @see Rednose.View.Nav.title
     */
    title: TXT_NEW_DATA_SOURCE,

    /**
     * @see Rednose.View.Nav.fixedd
     */
    fixed: false,

    /**
     * @see Rednose.View.Nav.close
     */
    close: true,

    /**
     * @see Rednose.View.Nav.padding
     */
    padding: true,

    /**
     * @see Rednose.View.Nav.buttonGroups
     */
    buttonGroups: [],

    initializer: function () {
        this.after({
            'toolbar:click#close' : this._handleButtonClose,
            'toolbar:click#back'  : this._handleButtonBack,
            'toolbar:click#next'  : this._handleButtonNext,
            'toolbar:click#create': this._handleButtonCreate
        });

        this.once('ready', function () {
            this.showChoicePage();
        });
    },

    showChoicePage: function () {
        var view    = this.get('activeView'),
            options = view ? {} : { transition: false },
            model;

        view && this.set('model', view.get('model'));

        model = this.get('model');

        this.showView('choicePage', { model: model }, options);

        this.toolbar.reset([
            Y.Rednose.DataSourceManager.Buttons.close,
            Y.Rednose.DataSourceManager.Buttons.next
        ]);
    },

    showPdoGenericPage: function () {
        var model = this.get('activeView').get('model');

        this.set('model', model);

        this.showView('pdoGenericPage', {
            model: model
        });

        this.toolbar.reset([
            Y.Rednose.DataSourceManager.Buttons.close,
            Y.Rednose.DataSourceManager.Buttons.next,
            Y.Rednose.DataSourceManager.Buttons.back
        ]);
    },

    showPdoSourcePage: function () {
        var model = this.get('activeView').get('model');

        this.set('model', model);

        this.showView('pdoSourcePage', {
            model: model
        });

        this.toolbar.reset([
            Y.Rednose.DataSourceManager.Buttons.close,
            Y.Rednose.DataSourceManager.Buttons.create,
            Y.Rednose.DataSourceManager.Buttons.back
        ]);
    },

    showDataGenGenericPage: function () {
        var model = this.get('activeView').get('model');

        this.set('model', model);

        this.showView('dataGenGenericPage', {
            model: model
        });

        this.toolbar.reset([
            Y.Rednose.DataSourceManager.Buttons.close,
            Y.Rednose.DataSourceManager.Buttons.next,
            Y.Rednose.DataSourceManager.Buttons.back
        ]);
    },

    showDataGenSourcePage: function () {
        var model = this.get('activeView').get('model');

        this.set('model', model);

        this.showView('dataGenSourcePage', {
            model: model
        });

        this.toolbar.reset([
            Y.Rednose.DataSourceManager.Buttons.close,
            Y.Rednose.DataSourceManager.Buttons.create,
            Y.Rednose.DataSourceManager.Buttons.back
        ]);
    },

    showXMLPage: function () {
        var model = this.get('activeView').get('model');

        this.set('model', model);

        this.showView('xmlPage', {
            model: model
        });

        this.toolbar.reset([
            Y.Rednose.DataSourceManager.Buttons.close,
            Y.Rednose.DataSourceManager.Buttons.create,
            Y.Rednose.DataSourceManager.Buttons.back
        ]);
    },

    _handleButtonNext: function () {
        var view     = this.get('activeView'),
            viewInfo = this.getViewInfo(view),
            name     = viewInfo.type.NAME,
            model    = this.get('model');

        if (name === 'dataGenGenericPageView') {
            this.showDataGenSourcePage();
            return;
        }

        if (name === 'pdoGenericPageView') {
            this.showPdoSourcePage();
            return;
        }

        if (name === 'choicePageView') {
            switch (model.get('type')) {
                case 'dataGen':
                    this.showDataGenGenericPage();
                    break;

                case 'pdo':
                    this.showPdoGenericPage();
                    break;

                case 'xml':
                    this.showXMLPage();
                    break;
            }
        }
    },

    _handleButtonBack: function () {
        var viewInfo = this.getViewInfo(this.get('activeView')),
            name     = viewInfo.type.NAME;

        switch (name) {
            case 'dataGenSourcePageView':
                this.showDataGenGenericPage();
                break;

            case 'pdoSourcePageView':
                this.showPdoGenericPage();
                break;

            default:
                this.showChoicePage();
        }
    },

    _handleButtonClose: function () {
        this.fire('close');
    },

    _handleButtonCreate: function () {
        var model = this.get('activeView').get('model');

        this.fire('create', { model: model });
    }
}, {
    ATTRS: {
        model: { value: new Y.Rednose.DataSource.DataSource() }
    }
});

Y.namespace('Rednose').DataSourceManager = Y.mix(DataSourceManager, Y.Rednose.DataSourceManager);

Y.Rednose.DataSourceManager.Buttons = {
    close : {position: 'left',  buttons: [{id: 'close',  value: TXT_CANCEL}]},
    create: {position: 'right', buttons: [{id: 'create', value: TXT_CREATE, type: 'primary'}]},
    next  : {position: 'right', buttons: [{id: 'next',   value: TXT_NEXT,   type: 'primary'}]},
    back  : {position: 'right', buttons: [{id: 'back',   value: TXT_BACK}]}
};
