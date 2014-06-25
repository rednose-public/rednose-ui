YUI.add('rednose-datasource-manager', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var DataSource = Y.Rednose.DataSource.DataSource;

var ChoicePageView = Y.Base.create('choicePageView', Y.View, [], {
    template: Y.Template.Micro.compile(
        '<form class="form-horizontal">'+
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="identifier">Identifier</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="identifier" type="text" value="<%= data.get("identifier") %>"' +
                            '<% if (!data.isNew()) {%> disabled<% } %>/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="name">Name</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="name" type="text" value="<%= data.get("name") %>"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label">Type</label>' +
                    '<div class="controls">' +
                        '<label class="radio">' +
                            '<input type="radio" name="type" value="pdo" ' +
                                '<% if (data.get("type") == "pdo") { %>checked<% } %><% if (!data.isNew()) {%> disabled<% } %>/>' +
                            'Database' +
                        '</label>' +
                        '<label class="radio">' +
                            '<input type="radio" name="type" value="dataGen" ' +
                                '<% if (data.get("type") == "dataGen") { %>checked<% } %><% if (!data.isNew()) {%> disabled<% } %>/>' +
                            'DataGen' +
                        '</label>' +
                        '<label class="radio">' +
                            '<input type="radio" name="type" value="xml" ' +
                                '<% if (data.get("type") == "xml") { %>checked<% } %><% if (!data.isNew()) {%> disabled<% } %>/>' +
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

        container.setHTML(template(model));

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
/*jshint boss:true, expr:true, onevar:false */

var DatagenSource = Y.Rednose.DataSource.DatagenSource;

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
}, {
    ATTRS: {
        model: { value: new DatagenSource() }
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
}, {
    ATTRS: {
        model: { value: new DatagenSource() }
    }
});
/*jshint boss:true, expr:true, onevar:false */

var PdoSource = Y.Rednose.DataSource.PdoSource,
    Micro     = Y.Template.Micro;

var PdoGenericPageView = Y.Base.create('pdoGenericPageView', Y.View, [], {
    template: Micro.compile(
        '<form class="form-horizontal">'+
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="dsn">DSN</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="dsn" type="text" value="<%= data.dsn %>"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="username">Username</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="username" type="text" value="<%= data.username %>"/>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label" for="password">Password</label>' +
                    '<div class="controls">' +
                        '<input class="input-block-level" id="password" type="password" value="<%= data.password %>"/>' +
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
        model: { value: new PdoSource() }
    }
});

var PdoSourcePageView = Y.Base.create('pdoSourcePageView', Y.View, [], {
    OPTION_TEMPLATE: Micro.compile('<option id="<%= data.id %>"<% if (data.selected) {%> selected<% }%>><%= data.value %></option>'),

    template: Micro.compile(
        '<form class="form-horizontal">' +
            '<fieldset>' +
                '<div class="control-group">' +
                    '<label class="control-label radio inline">' +
                        '<input type="radio" name="source" value="table" data-radio-group="source"' +
                            '<% if (data.source == "table") { %> checked<% } %>/> Table' +
                    '</label>' +
                    '<div class="controls">' +
                        '<select class="input-block-level" id="table" data-radio="source"' +
                            '<% if (data.source != "table") { %> disabled<% } %>></select>' +
                    '</div>' +
                '</div>' +
                '<div class="control-group">' +
                    '<label class="control-label radio inline">' +
                        '<input type="radio" name="source" value="query" data-radio-group="source"' +
                            '<% if (data.source == "query") { %> checked<% } %>/> Query' +
                    '</label>' +
                        '<div class="controls">' +
                            '<textarea rows="3" spellcheck="false" class="input-block-level" id="query" data-radio="source"' +
                                '<% if (data.source != "query") { %> disabled<% } %>><%= data.query %></textarea >' +
                        '</div>' +
                '</div>' +
            '</fieldset>' +
        '</form>'
    ),

    events: {
        'form': {
            change: '_handleFormChange'
        },

        '[data-radio-group]': { change: '_handleRadio' }
    },

    render: function () {
        var container = this.get('container'),
            template  = this.template,
            model     = this.get('model');

        container.setHTML(template(model.getAttrs()));

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
        var self  = this,
            model = this.get('model');

        node.empty();

        Y.Array.each(data, function (value) {
            node.append(self.OPTION_TEMPLATE({
                id      : value,
                value   : value,
                selected: model.get('table') === value
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
    },

    _handleFormChange: function (e) {
        var node  = e.target,
            id    = node.get('type') === 'radio' ? node.get('name') : node.get('id');
            value = node.get('type') === 'checkbox' ? node.get('checked') : node.get('value');

        this.get('model').set(id, value);
    }
}, {
    ATTRS: {
        model: { value: new PdoSource() }
    }
});
/*jshint boss:true, expr:true, onevar:false */

var XmlSource = Y.Rednose.DataSource.XmlSource;

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
        uploader.on('alluploadscomplete', this._onAllUploadsComplete, this);
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
}, {
    ATTRS: {
        model: { value: new XmlSource() }
    }
});
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


}, '1.5.0-DEV', {"requires": ["rednose-app", "rednose-datasource"]});
