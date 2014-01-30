/*jshint boss:true, expr:true, onevar:false */

var ChoicePageView = Y.Base.create('choicePageView', Y.View, [], {
    template:
        '<form class="form-horizontal">'+
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="name">Name</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="name" type="text"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="identifier">Identifier</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="identifier" type="text"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label">Type</label>' +
                    '<div class="controls">' +
                        '<label class="radio">' +
                            '<input type="radio" name="type" value="pdo" checked>' +
                            'Database' +
                        '</label>' +
                        '<label class="radio">' +
                            '<input type="radio" name="type" value="dataGen">' +
                            'DataGen' +
                        '</label>' +
                        '<label class="radio">' +
                            '<input type="radio" name="type" value="xml">' +
                            'XML Data' +
                        '</label>' +
                    '</div>' +
                '</div>' +
            '</fieldset>' +
        '</form>',

    render: function () {
        var container = this.get('container'),
                template  = this.template;

        container.setHTML(template);

        return this;
    },

    getType: function () {
        var container = this.get('container');

        return container.one('[name=type]:checked').get('value');
    }
});

var GenericPageView = Y.Base.create('genericPageView', Y.View, [], {
    template:
        '<form class="form-horizontal">'+
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="dsn">DSN</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="dsn" type="text"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="username">Username</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="username" type="text"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="password">Password</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="password" type="password"/>' +
                    '</div>' +
                '</div>' +
            '</fieldset>' +
        '</form>',

    render: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        return this;
    }
});

var SourcePageView = Y.Base.create('sourcePageView', Y.View, [], {
    OPTION_TEMPLATE: '<option id="{id}">{value}</option>',

    template:
        '<form class="form-horizontal">' +
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label radio inline">' +
                        '<input type="radio" name="source" value="table" data-radio-group="source" checked/> Table' +
                    '</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="table" data-radio="source"></select>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label radio inline">' +
                        '<input type="radio" name="source" value="query" data-radio-group="source"/> Query' +
                    '</label>' +
                        '<div class="controls">' +
                            '<textarea rows="3" class="input-block-level" id="query" data-radio="source" disabled></textarea >' +
                        '</div>' +
                '</div>' +
            '</fieldset>' +
        '</form>',

    events: {
        '[data-radio-group]': { change: '_handleRadio' }
    },

    render: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this._refreshTables();

        return this;
    },

    disableNode: function (node, disabled) {
        if (disabled) {
            node.setAttribute('disabled');

            return;
        }

        node.hasAttribute('disabled') && node.removeAttribute('disabled');
    },

    updateSelectNode: function (node, data) {
        var self = this;

        node.empty();

        Y.Array.each(data, function (value) {
            node.append(Y.Lang.sub(self.OPTION_TEMPLATE, {
                id   : value,
                value: value
            }));
        });
    },

    _refreshTables: function () {
        var self      = this,
            tableNode = this.get('container').one('#table');

        Y.io(Routing.generate('rednose_dataprovider_operations_list_tables'), {
            method: 'POST',
            data  : 'dsn=mysql:host=localhost;dbname=libbit_flowgen&username=root&password=root',
            on    : {
                success : function (tx, r) {
                    self.updateSelectNode(tableNode, Y.JSON.parse(r.responseText));
                }
            }
        });
    },

    _handleRadio: function (e) {
        var self      = this,
            value     = e.target.get('value'),
            container = this.get('container');

         // Get all radio buttons, and sync their relative input.
         container.all('[data-radio-group]').each(function (radio) {
             var matchingInput = radio.ancestor('div').one('[data-radio]'),
                 disable       = matchingInput.get('id') !== value;

             self.disableNode(matchingInput, disable);

             !disable && matchingInput.focus();
         });
    }
});

var DataGenGenericPageView = Y.Base.create('dataGenGenericPageView', Y.View, [], {
    template:
        '<form class="form-horizontal">'+
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="url">URL</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="url" type="text"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="username">Username</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="username" type="text"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="password">Password</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="password" type="password"/>' +
                    '</div>' +
                '</div>' +
            '</fieldset>' +
        '</form>',

    render: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        return this;
    }
});

var DataGenSourcePageView = Y.Base.create('dataGenSourcePageView', Y.View, [], {
    OPTION_TEMPLATE: '<option id="{id}">{value}</option>',

    template:
        '<form class="form-horizontal">'+
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="section">Section</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="section"></select>' +
                    '</div>' +
                '</div>' +
            '</fieldset>' +
        '</form>',

    render: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this._refreshSections();

        return this;
    },

    updateSelectNode: function (node, data) {
        var self = this;

        node.empty();

        Y.Array.each(data, function (value) {
            node.append(Y.Lang.sub(self.OPTION_TEMPLATE, {
                id   : value,
                value: value
            }));
        });
    },

    _refreshSections: function () {
        var self        = this,
            sectionNode = this.get('container').one('#section');

        Y.io(Routing.generate('rednose_dataprovider_operations_list_sections'), {
            method: 'POST',
            data  : 'url=http://datagen-standard.dev&username=admin&password=adminpasswd',
            on    : {
                success : function (tx, r) {
                    self.updateSelectNode(sectionNode, Y.JSON.parse(r.responseText));
                }
            }
        });
    }
});

//            var DataSourceListView = Y.Base.create('dataSourceListView', Y.View, [], {
//                treeView: null,
//
//                render: function () {
//                    var self = this,
//                        list = this.get('modelList');
//
//                    list.load(function () {
//                        self.treeView = new Y.Rednose.TreeView({
//                            container : self.get('container'),
//                            model     : list.getTree(),
//                            selectable: false
//                        });
//
//                        self.treeView.render();
//                    });
//                }
//            }, {
//                ATTRS: {
//                    modelList: { value: new Y.Rednose.DataSource.DataSourceList() }
//                }
//            });

var XMLPageView = Y.Base.create('xmlPageView', Y.View, [], {
    UPLOADER_TEMPLATE: '<button class="btn" type="button" title="Upload"><i class="icon-upload"></i></button>',

    UPLOADER_CONFIG: {
        width           : 40,
        height          : 30,
        uploadURL       : Routing.generate('rednose_framework_files_upload'),
        buttonClassNames: { disabled: 'disabled' }
    },

    template:
        '<form class="form-horizontal">'+
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="xsd">XML Schema</label>' +
                    '<div class="controls">' +
                        '<div class="input-append input-block-level">' +
                            '<input type="text" id="xsd" readonly>' +
                            '<div id="xsd-uploader" class="uploader-container"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="xslt">XSLT File</label>' +
                    '<div class="controls">' +
                        '<div class="input-append input-block-level">' +
                            '<input type="text" id="xslt" readonly>' +
                            '<div id="xsl-uploader" class="uploader-container"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="xml">XML Data</label>' +
                    '<div class="controls">' +
                        '<div class="input-append input-block-level">' +
                            '<input type="text" id="xml" readonly>' +
                            '<div id="xml-uploader" class="uploader-container"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                '<label class="control-label" for="root">Root Element</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="root" type="text"/>' +
                    '</div>' +
                '</div>' +
            '</fieldset>' +
        '</form>',

    initializer: function () {
        Y.Uploader.SELECT_FILES_BUTTON = this.UPLOADER_TEMPLATE;
    },

    render: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this._bindUploader(new Y.Uploader(this.UPLOADER_CONFIG).render(container.one('#xsd-uploader')));
        this._bindUploader(new Y.Uploader(this.UPLOADER_CONFIG).render(container.one('#xsl-uploader')));
        this._bindUploader(new Y.Uploader(this.UPLOADER_CONFIG).render(container.one('#xml-uploader')));

        return this;
    },

    _bindUploader: function (uploader) {
        uploader.after('fileselect', this._afterFileSelect, this);
        uploader.on('uploadstart', this._onUploadStart, this);
        uploader.on('uploadcomplete', this._onUploadComplete, this);
        uploader.on('uploaderror', this._onUploadError, this);
        uploader.on('alluploadscomplete', this._onAllUploadsComplete, this)
    },

    _updateInputForUploader: function (uploader, name, uploadId) {
        var input = uploader.get('srcNode').ancestor('.controls').one('input');

        input.set('value', name);
        input.setAttribute('data-upload-id', uploadId);
    },

    _afterFileSelect: function (e) {
        var uploader = e.target,
            fileList = uploader.get('fileList');

        if (fileList.length > 0) {
            uploader.uploadAll();
        }
    },

    _onUploadStart: function (e) {
        var uploader = e.target;

        uploader.set('enabled', false);
    },

    _onUploadComplete: function (e) {
        var uploader = e.target,
            file     = e.file,
            uploadId = e.data;

        uploader.set('enabled', true);

        this._updateInputForUploader(uploader, file.get('name'), uploadId);
    },

    _onUploadError: function (e) {
        var uploader = e.target,
            code     = e.statusCode;
            text     = e.statusText;

        uploader.set('enabled', true);

        console.log(code);
        console.log(text);
    },

    _onAllUploadsComplete: function (e) {
        var uploader = e.target;

        uploader.set('enabled', true);
        uploader.set('fileList', []);
    }
});

var App = Y.Base.create('app', Y.App, [], {
    views: {
        choicePage: {
            type    : ChoicePageView,
            preserve: true
        },

        genericPage: {
            type    : GenericPageView,
            parent  : 'choicePage',
            preserve: true
        },

        sourcePage: {
            type    : SourcePageView,
            parent  : 'genericPage',
            preserve: true
        },

        dataGenGenericPage: {
            type    : DataGenGenericPageView,
            parent  : 'choicePage',
            preserve: true
        },

        dataGenSourcePage: {
            type    : DataGenSourcePageView,
            parent  : 'dataGenGenericPage',
            preserve: true
        },

        xmlPage: {
            type    : XMLPageView,
            parent  : 'choicePage',
            preserve: true
        }
    }
});

var DataSourceManager = Y.Base.create('dataSourceManager', Y.View, [ Y.Rednose.View.Nav ], {
    _app: null,

    title: 'New Data Source',

    close: true,

    template:
        '<div>' +
            '<div id="app"></div>' +
        '</div>',

    initializer: function () {
        this.on('dataSourceManager:buttonChoice', this.showChoicePage, this);
        this.on('dataSourceManager:buttonChoose', this._handleButtonChoose, this);
        this.on('dataSourceManager:buttonGeneric', this.showGenericPage, this);
        this.on('dataSourceManager:buttonSource', this.showSourcePage, this);
        this.on('dataSourceManager:buttonDataGenGeneric', this.showDataGenGenericPage, this);
        this.on('dataSourceManager:buttonDataGenSource', this.showDataGenSourcePage, this);
        this.on('dataSourceManager:buttonClose', this._handleButtonClose, this);
        this.on('dataSourceManager:buttonCreate', this._handleButtonCreate, this);
    },

    render: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this._app = new App({
            container:     container.one('#app'),
            transitions  : true
        }).render();
    },

    showChoicePage: function () {
        if (this._app.get('activeView')) {
            this._app.showView('choicePage', {
                model: null
            });
        } else {
            this._app.showView('choicePage', {
                model: null
            }, {
                transition: false
            });
        }

        this._updateButtons({
            choose: {
                value:    'Next',
                position: 'right',
                primary:   true
            },

            close: {
                value:    'Cancel',
                position: 'left'
            }
        });
    },

    showGenericPage: function () {
        this._app.showView('genericPage', {
            model: null
        });

        this._updateButtons({
            source: {
                value:    'Next',
                position: 'right',
                primary:   true
            },

            choice: {
                value:    'Back',
                position: 'right'
            },

            close: {
                value:    'Cancel',
                position: 'left'
            }
        });
    },

    showSourcePage: function () {
        this._app.showView('sourcePage', {
            model: null
        });

        this._updateButtons({
            create: {
                value:    'Create',
                position: 'right',
                primary:   true
            },

            generic: {
                value:    'Back',
                position: 'right'
            },

            close: {
                value:    'Cancel',
                position: 'left'
            }
        });
    },

    showDataGenGenericPage: function () {
        this._app.showView('dataGenGenericPage', {
            model: null
        });

        this._updateButtons({
            dataGenSource: {
                value:    'Next',
                position: 'right',
                primary:   true
            },

            choice: {
                value:    'Back',
                position: 'right'
            },

            close: {
                value:    'Cancel',
                position: 'left'
            }
        });
    },

    showDataGenSourcePage: function () {
        this._app.showView('dataGenSourcePage', {
            model: null
        });

        this._updateButtons({
            create: {
                value:    'Create',
                position: 'right',
                primary:   true
            },

            dataGenGeneric: {
                value:    'Back',
                position: 'right'
            },

            close: {
                value:    'Cancel',
                position: 'left'
            }
        });
    },

    showXMLPage: function () {
        this._app.showView('xmlPage', {
            model: null
        });

        this._updateButtons({
            create: {
                value:    'Create',
                position: 'right',
                primary:   true
            },

            choice: {
                value:    'Back',
                position: 'right'
            },

            close: {
                value:    'Cancel',
                position: 'left'
            }
        });
    },

    _updateButtons: function (buttons) {
        this.buttons = {};

        this.set('buttons', buttons);
    },

    _handleButtonChoose: function () {
        var choiceView = this._app.get('activeView');

        switch (choiceView.getType()) {
            case 'pdo':
                this.showGenericPage();
                break;
            case 'dataGen':
                this.showDataGenGenericPage();
                break;
            case 'xml':
                this.showXMLPage();
                break;
        }
    },

    _handleButtonClose: function () {
        console.log('close!');
    },

    _handleButtonCreate: function () {
        console.log('create!');
    }
});

var appView = new DataSourceManager();

appView.render();
appView.showChoicePage();
//            appView.showXMLPage();

//            var panel = new Y.Rednose.Panel({
//                srcNode: appView.get('container'),
//                width  : 640
//            });
//
//            panel.render();

if (!appView.get('container').inDoc()) {
    Y.one('body').append(appView.get('container'));
}

//            var dataSourceListView = new DataSourceListView({
//                container: Y.one('#tree')
//            });
//
//            dataSourceListView.render();

Y.namespace('Rednose.DataSourceManager').DataSourceManager = DataSourceManager;
