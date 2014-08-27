YUI.add('rednose-form', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var AutoComplete;

AutoComplete = Y.Base.create('autoComplete', Y.AutoCompleteList, [], {
    AUTOCOMPLETE_TEMPLATE: Y.Template.Micro.compile(
        '<a role="menuitem">' +
            '<% if (data.image) { %>' +
                '<img class="avatar size32" src="<%= data.image %>">' +
            '<% } %>' +
            '<span class="title-block">' +
                '<span class="title"><%== data.title %></span>' +
            '</span>' +
            '<span class="subtitle"><%= data.subtitle %></span>' +
        '</a>'
    ),

    initializer: function () {
        var template   = this.AUTOCOMPLETE_TEMPLATE,
            choices    = this.get('choices'),
            datasource = this.get('datasource'),
            self       = this;

        this.get('inputNode').setAttribute('autocomplete', 'off');

        if (datasource) {
            // this.set('resultListLocator', 'results');
            this.set('resultFormatter', function (query, raw) {
                return Y.Array.map(raw, function (result) {
                    var mapped = self._mapDataProviderData(result.raw, datasource.map);

                    mapped.title = Y.Highlight.all(mapped.title, query);

                    return template(mapped);
                });
            });
            this.set('resultTextLocator', function (result) {
                return self._mapDataProviderData(result, datasource.map).value;
            });
            this.set('source', this._getDataProviderRoute(datasource.id));
        } else if (choices) {
            this.set('resultFormatter', function (query, raw) {
                return Y.Array.map(raw, function (result) {
                    return template(result.raw);
                });
            });
            this.set('resultTextLocator', 'value');
            this.set('source', choices);
        }

        // Prevent default node change handler.
        this.get('inputNode').on('change', function (e) {
            // Don't stop propagation for our own `change` event simulation.
            if (e.which !== 0) {
                e.stopPropagation();
            }
        });

        // Store the selection before we fire a change event on the input node.
        this.after('select', function (e) {
            self.set('record', e.result.raw);

            self.get('inputNode').simulate('change');
        });
    },

    _getDataProviderRoute: function (id) {
        return Routing.generate('rednose_dataprovider_data_list') + '?id=' + id + '&q={query}&callback={callback}';
    },

    _mapDataProviderData: function (data, map) {
        map || (map = {});

        var result = {};

        for (var property in map) {
            if (map.hasOwnProperty(property)) {
                result[property] = this._parseTemplate(data, map[property]);
            }
        }

        return result;
    },

    _parseTemplate: function (data, template) {
        return this._getJSONValue(data, template.replace(/[${}]/g, ''));
    },

    _getJSONValue: function (data, location) {
        var tokens = location.split('.'),
            buffer = data,
            property;

        while (property = tokens.shift()) {
            if (!buffer.hasOwnProperty(property)) {
                return null;
            }

            buffer = buffer[property];
        }

        return buffer;
    }
}, {
    CSS_PREFIX: 'rednose-autocomplete',

    ATTRS: {
        width: {
            value: true
        },

        maxResults: {
            value: 6
        },

        record: {
            value: null
        },

        choices: {
            value: null
        },

        /**
         * @type {Object}
         */
        datasource: {
            value: null
        }
    }
});

Y.namespace('Rednose').ControlFormAutoComplete = AutoComplete;
/*jshint boss:true, expr:true, onevar:false */

var Dropdown = Y.Base.create('dropdown', Y.Base, [], {
    OPTION_TEMPLATE: '<option id="{id}">{value}</option>',

    initializer: function () {
        this._dataMap = {};

        var node = this.get('inputNode');

        node.on('change', this._onNodeChange, this);
    },

    render: function () {
        var self       = this,
            node       = this.get('inputNode'),
            dataSource = this.get('datasource');

        Y.io(Routing.generate('rednose_dataprovider_data_list') + '?id=' + dataSource.id, {
            method: 'GET',
            on: {
                success : function (tx, r) {
                    self._updateSelectNode(node, Y.JSON.parse(r.responseText).results);
                }
            }
        });
    },

    _updateSelectNode: function (node, data) {
        var self       = this,
            datasource = this.get('datasource'),
            first      = node.one('option').cloneNode(true);

        node.empty();

        if (first) {
            node.append(first);
        }

        this._dataMap = {};

        Y.Array.each(data, function (record) {
            var id    = self._getArrayValueByKey(record, datasource.map.id),
                value = self._getArrayValueByKey(record, datasource.map.value);

            self._dataMap[id] = record;

            node.append(Y.Lang.sub(self.OPTION_TEMPLATE, {
                id   : id,
                value: value
            }));
        });
    },

    _getArrayValueByKey: function (array, search) {
        for (var key in array) {
            if (array.hasOwnProperty(key)) {
                var value = array[key];

                if (key === search) {
                    return value;
                }

                if (Y.Lang.isObject(value)) {
                    var v = this._getArrayValueByKey(value, search);

                    if (v) {
                        return v;
                    }
                }
            }
        }

        return null;
    },

    _onNodeChange: function (e) {
        var id     = e.target.get('value'),
            record = this._dataMap[id];

        console.log(record || null);
    }
}, {
    ATTRS: {
        /**
         * @attribute inputNode
         * @type Node|HTMLElement|String
         * @initOnly
         */
        inputNode: {
            setter: Y.one,
            writeOnce: 'initOnly'
        },

        /**
         * @type {Object}
         */
        datasource: {
            value: null
        }
    }
});

Y.namespace('Rednose.Form').Dropdown = Dropdown;
/*jshint boss:true, expr:true, onevar:false */

var RichTextEditor;

RichTextEditor = Y.Base.create('richTextEditor', Y.Widget, [], {

    render: function() {
        var inputProperties = this.get('properties').input_properties,
            lang            = 'en_US',
            toolbar         = [];

        if (inputProperties) {
            if (inputProperties.styles === 'true') {
                toolbar.push({
                    "name": "styles",
                    "items": ["Font","FontSize"]
                });
            }

            if (inputProperties.editing === 'true') {
                toolbar.push({
                    "name": "editing",
                    "items": ["Find", "Replace", "-", "SelectAll"]
                });
            }

            if (inputProperties.clipboard === 'true') {
                toolbar.push({
                    "name": "clipboard",
                    "items": ["Cut", "Copy", "Paste", "PasteText"
                    ]
                });
            }

            if (inputProperties.undoredo === 'true') {
                // Note: The key `clipboard` is used twice, to divide them into separate blocks.
                toolbar.push({
                    "name": "clipboard",
                    "items": ["Undo", "Redo"]
                });
            }

            if (inputProperties.basicstyles === 'true') {
                toolbar.push({
                    "name": "basicstyles",
                    "items": ["Bold", "Italic", "Underline", "-", "RemoveFormat"]
                });
            }

            if (inputProperties.paragraph === 'true') {
                toolbar.push({
                    "name": "paragraph",
                    "items": ["NumberedList", "BulletedList", "-", "Outdent", "Indent"]
                });
            }

            if (inputProperties.insert === 'true') {
                toolbar.push({
                    "name": "links",
                    "items": ["Link", "Unlink"]
                });
            }

            if (inputProperties.tools === 'true') {
                toolbar.push({
                    "name": "tools",
                    "items": ["Maximize"]
                });
            }
        }

        var config = {
            toolbar                  : toolbar,
            removePlugins            : 'elementspath',
            resize_enabled           : false,
            disableNativeSpellChecker: false,
            scayt_sLang              : lang,
            language                 : lang,
            height                   : '100'
        };

        if (this.get('replace')) {
            CKEDITOR.replace(this.get('srcNode').getDOMNode(), config);
        } else {
            CKEDITOR.appendTo(this.get('srcNode').getDOMNode(), config);
        }

        return this;
    },

    destructor: function() {
        CKEDITOR.instances[this.get('srcNode').get('id')].destroy();
    }
}, {
    ATTRS: {
        properties: { value: {} },
        replace:    { value: false }
    }
});

Y.namespace('Rednose').ControlFormRichTextEditor = RichTextEditor;
/*jshint boss:true, expr:true, onevar:false */

var ControlModel = Y.Base.create('controlModel', Y.Model, [], {
    view: {},

    _setProperties: function (value) {
        if (Array.isArray(value)) {
            return {};
        } else {
            return value;
        }
    }
}, {
    ATTRS: {
        caption   : { value: null },
        foreign_id: { value: null },
        type      : { value: null },
        properties: {
            value : {},
            setter: '_setProperties'
        },
        required  : { value: false },
        visible   : { value: true },
        protected : { value: false },
        readonly  : { value: false },
        sort_order: { value: 0 },
        help      : { value: null },

        /**
         * @type {String}
         */
        value: {
            value: null
        },

        /**
         * @type {String}
         */
        binding: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').ControlModel = ControlModel;

var SectionModel = Y.Base.create('controlModel', Y.Model, [], {
    getControl: function (foreignId) {
        var controls = this.get('controls');

        for (var i = 0, len = controls.size(); i < len; i++) {
            if (controls.item(i).get('name') === foreignId) {
                return controls.item(i);
            }
        }

        return null;
    },

    _setControls: function (value) {
        var list = new Y.ModelList();

        Y.Array.each(value, function (v) {
            if (Y.instanceOf(v, Y.Rednose.Form.ControlModel)) {
                list.add(v);
            } else if (typeof(v) === 'object') {
                list.add(new Y.Rednose.Form.ControlModel(v));
            } else {
                list.add(new Y.Rednose.Form.ControlModel(v.getAttrs()));
            }
        });

        return list;
    }
}, {
    ATTRS: {
        /**
         * @type {String}
         */
        name: {
            value: null
        },

        /**
         * @type {String}
         */
        caption: {
            value: null
        },

        /**
         * @type {Boolean}
         */
        inline: {
            value: false
        },

        /**
         * @type {ModelList}
         */
        controls: {
            value : new Y.ModelList(),
            setter: '_setControls'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').SectionModel = SectionModel;

var FormModel;

FormModel = Y.Base.create('formModel', Y.Model, [], {
    getTree: function () {
        if (!this.get('id') && !this.get('caption')) {
            return null;
        }

        var rootNode = {
            label   : this.get('name'),
            icon    : 'icon-list-alt',
            children: []
        };

        this.get('sections').each(function (section) {
            var sectionNode = {
                label   : section.get('name'),
                icon    : 'icon-align-left',
                children: []
            };

            section.get('controls').each(function (control) {
                sectionNode.children.push({
                    label: control.get('name'),
                    icon : 'icon-minus'
                });
            });

            rootNode.children.push(sectionNode);
        });

        return [rootNode];
    },

    sync: function (action, options, callback) {
        if (action === 'read') {
            Y.io(Routing.generate('rednose_framework_forms_read', {'id': this.get('id')}), {
                method: 'GET',
                on : {
                    success : function (tx, r) {
                        callback(null, Y.JSON.parse(r.responseText));
                    },
                    failure : function (tx, r) {
                        callback(Y.JSON.parse(r.responseText));
                    }
                }
            });
        }
    },

    getControl: function (foreignId) {
        var sections = this.get('sections');

        for (var i = 0, len = sections.size(); i < len; i++) {
            if (sections.item(i).getControl(foreignId)) {
                return sections.item(i).getControl(foreignId);
            }
        }

        return null;
    },

    _setSections: function (value) {
        var list = new Y.ModelList({model: SectionModel});

        return list.reset(value);
    }

}, {
    ATTRS: {
        /**
         * @type {String}
         */
        name: {
            value: null
        },

        /**
         * @type {String}
         */
        caption: {
            value: null
        },

        /**
         * @type {String}
         */
        identity: {
            value: null
        },

        /**
         * @type {ModelList}
         */
        sections: {
            value : new Y.ModelList(),
            setter: '_setSections'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').FormModel = FormModel;
/*jshint boss:true, expr:true, onevar:false */

var EVT_SELECT = 'select';

BaseControlView = Y.Base.create('baseControlView', Y.View, [], {
    events: {
        'input, select': {
            focus: '_handleSelect'
        }
    },

    initializer: function () {
        var model = this.get('model');

        model.after('change', this.render, this);
    },

    // XXX
    focus: function () {
        var node = this.get('container').one('input');

        if (node) {
            node.focus();
        }
    },

    _handleSelect: function (e) {
        e.model = this.get('model');

        this.fire(EVT_SELECT, e);
    }
}, {
    ATTRS: {
        model: { value: new Y.Rednose.Form.ControlModel() },

        value: {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').BaseControlView = BaseControlView;

var TextControlView;

TextControlView = Y.Base.create('textControlView', Y.Rednose.Form.BaseControlView, [], {

    template: '<div class="control-group">' +
                  '<label class="control-label" for="{id}">{label}</label>' +
                  '<div class="controls">' +
                      '<input id="{id}" type="text"/>' +
                  '</div>' +
              '</div>',

    _inputNode: null,

    destructor: function () {
        this._inputNode = null;
    },

    render: function () {
        var container = this.get('container'),
            model     = this.get('model'),
            template  = this.template;

        container.setHTML(Y.Lang.sub(template, {
            id   : model.get('id'),
            label: model.get('caption')
        }));

        var properties = model.get('properties');

        if (properties && properties.size) {
            container.one('input').addClass('input-' + properties.size);
        }

        this._inputNode = container.one('input');

        model.get('visible') ? container.show() : container.hide();

        if (model.get('required')) {
            this._inputNode.setAttribute('required', 'required');
        } else if (this._inputNode.hasAttribute('required')) {
            this._inputNode.removeAttribute('required');
        }

        if (model.get('protected')) {
            this._inputNode.setAttribute('readonly', 'readonly');
        } else if (this._inputNode.hasAttribute('readonly')) {
            this._inputNode.removeAttribute('readonly');
        }

        if (model.get('readonly')) {
            this._inputNode.setAttribute('disabled', 'disabled');
        } else if (this._inputNode.hasAttribute('disabled')) {
            this._inputNode.removeAttribute('disabled');
        }

        return this;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').TextControlView = TextControlView;

var CheckboxControlView;

CheckboxControlView = Y.Base.create('checkboxControlView', Y.Rednose.Form.BaseControlView, [], {

    template: '<div class="control-group">' +
                  '<label for="{id}" class="control-label">{label}</label>' +
                  '<div class="controls">' +
                      '<input type="checkbox" id="{id}"></input>' +
                  '</div>' +
              '</div>',

    events: {
        'input': {
            change: '_handleInputChange'
        },

        // FIMXE: Fires twice.
        '.checkbox': {
            click: '_handleSelect'
        }
    },

    _inputNode: null,

    destructor: function () {
        this._inputNode = null;
    },

    render: function () {
        var container = this.get('container'),
            model     = this.get('model'),
            template  = this.template;

        container.setHTML(Y.Lang.sub(template, {
            id   : model.get('id'),
            label: model.get('caption')
        }));

        this.set('value', model.get('value'));

        this._inputNode = container.one('input');
        this._inputNode.set('checked', this.get('value'));

        model.get('visible') ? container.show() : container.hide();

        return this;
    },

    _handleInputChange: function () {
        var value = this._inputNode.get('checked');

        this.set('value', value);

        // XXX
        this.get('model').set('value', value);

        this.fire('change', {
            model: this.get('model'),
            value: {
                value: value
            }
        });
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').CheckboxControlView = CheckboxControlView;

var DropDownControlView;

DropDownControlView = Y.Base.create('dropDownControlView', Y.Rednose.Form.BaseControlView, [], {

    OPTION_TEMPLATE: '<option value="{value}">{label}</option>',

    template: '<div class="control-group">' +
                  '<label class="control-label" for="{id}">{label}</label>' +
                  '<div class="controls">' +
                      '<select class="input-block-level" id="{id}"></select>' +
                  '</div>' +
              '</div>',

    render: function () {
        var self       = this,
            container  = this.get('container'),
            model      = this.get('model'),
            properties = model.get('properties'),
            template   = this.template;

        container.setHTML(Y.Lang.sub(template, {
            id   : model.get('id'),
            label: model.get('caption')
        }));

        if (properties.datasource) {
            var source = properties.datasource;

            Y.io(Routing.generate('rednose_dataprovider_data_list', { id: source.id }) , {
                method: 'GET',
                on : {
                    success : function (tx, r) {
                        var results = Y.JSON.parse(r.responseText).results,
                            data    = source.map ? self._mapDataProviderData(results, source.map) : results;


                        self._updateSelectNode(container.one('select'), data);
                    }
                }
            });
        } else if (properties.choices) {
            this._updateSelectNode(container.one('select'), this._mapChoicesPropertyData(properties.choices));
        }

        return this;
    },

    _mapChoicesPropertyData: function (data) {
        var mappedData = [];

        Y.Object.each(data, function (label, value) {
            mappedData.push({ value: value, label: label });
        });

        return mappedData;
    },

    _mapDataProviderData: function (data, map) {
        return Y.Array.map(data, function (result) {
            var mappedResult = {};

            Y.Object.each(map, function (src, dest) {
                mappedResult[dest] = result[src];
            });

            return mappedResult;
        });
    },

    _updateSelectNode: function (node, data) {
        var self = this;

        Y.Array.each(data, function (result) {
            node.append(Y.Lang.sub(self.OPTION_TEMPLATE, {
                value: result.value,
                label: result.label
            }));
        });
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').DropDownControlView = DropDownControlView;
/*jshint boss:true, expr:true, onevar:false */

var TXT_TYPE_TO_SEARCH = 'Type here to search...';

var AutocompleteControlView;

AutocompleteControlView = Y.Base.create('autoCompleteControlView', Y.Rednose.Form.BaseControlView, [], {

    AUTOCOMPLETE_TEMPLATE: Y.Template.Micro.compile(
        '<a role="menuitem">' +
            '<img class="avatar size32" src="<%= data.image %>">' +
            '<span class="title-block">' +
                '<span class="title"><%== data.title %></span>' +
            '</span>' +
            '<span class="subtitle"><%= data.subtitle %></span>' +
        '</a>'
    ),

    template: '<div class="control-group">' +
                  '<label class="control-label" for="{id}">{label}</label>' +
                  '<div class="controls">' +
                      '<input type="text" id="{id}" placeholder="{placeholder}"/>' +
                  '</div>' +
              '</div>',

    _inputNode: null,

    _autoComplete: null,

    events: {
        'input': {
            // TODO: Add keyup event for faster updating, but filter out the autocomplete keypresses.
            change: '_handleInputChange'
        }
    },

    destructor: function () {
        this._autoComplete.destroy();

        this._inputNode    = null;
        this._autoComplete = null;
    },

    render: function () {
        var container  = this.get('container'),
            model      = this.get('model'),
            template   = this.template;

        container.setHTML(Y.Lang.sub(template, {
            id         : model.get('id'),
            label      : model.get('caption'),
            placeholder: TXT_TYPE_TO_SEARCH
        }));

        var properties = model.get('properties');

        if (properties && properties.size) {
            container.one('input').addClass('input-' + properties.size);
        }

        this._inputNode = container.one('input');

        model.get('visible') ? container.show() : container.hide();

        this._renderAutoComplete();

        return this;
    },

    _renderAutoComplete: function () {
        var choices    = this.get('model').get('properties').choices,
            datasource = this.get('model').get('properties').datasource,
            config;

        config = {
            inputNode : this._inputNode,
            choices   : choices,
            datasource: datasource
        };

        this._autoComplete = new Y.Rednose.ControlFormAutoComplete(config).render();
    },

    _handleInputChange: function () {
        var value = this._inputNode.get('value');

        this.set('value', value);

        this.fire('change', {
            model: this.get('model'),
            value: {
                value: value
            }
        });
    }
});

Y.namespace('Rednose.Form').AutocompleteControlView = AutocompleteControlView;
/*jshint boss:true, expr:true, onevar:false */

var DateTimeControlView;

DateTimeControlView = Y.Base.create('dateTimeControlView', Y.Rednose.Form.BaseControlView, [], {

    OPTION_TEMPLATE: Y.Template.Micro.compile(
        '<option value="<%= data.value %>"<% if (data.selected) { %> selected<% }%>><%= data.label %></option>'
    ),

    template: '<div class="control-group">' +
                  '<label class="control-label" for="{id}">{label}</label>' +
                  '<div class="controls controls-row">' +
                      '<select id="{id}" class="rednose-date-day"></select>' +
                      '<select class="rednose-date-month"></select>' +
                      '<select class="rednose-date-year"></select>' +
                      '<select class="rednose-date-hour"></select>' +
                      ':' +
                      '<select class="rednose-date-minute"></select>' +
                  '</div>' +
              '</div>',

    render: function () {
        var date           = new Date(),
            reflectionDate = new Date();

        var container = this.get('container'),
            model     = this.get('model'),
            template  = this.template,
            i;

        container.setHTML(Y.Lang.sub(template, {
            id:    model.get('id'),
            label: model.get('caption')
        }));

        for (i = 1; i <= 31; i++) {
            reflectionDate.setDate(i);

            container.one('.rednose-date-day').append(this.OPTION_TEMPLATE({
                value   : i,
                label   : Y.Date.format(reflectionDate, { format: '%d'} ),
                selected: i === date.getDate()
            }));
        }

        for (i = 0; i <= 11; i++) {
            reflectionDate.setMonth(i);

            container.one('.rednose-date-month').append(this.OPTION_TEMPLATE({
                value   : i,
                label   : Y.Date.format(reflectionDate, { format: '%B'} ),
                selected: i === date.getMonth()
            }));
        }

        for (i = date.getFullYear() - 5; i <= date.getFullYear() + 5; i++) {
            reflectionDate.setFullYear(i);

            container.one('.rednose-date-year').append(this.OPTION_TEMPLATE({
                value   : i,
                label   : Y.Date.format(reflectionDate, { format: '%G'} ),
                selected: i === date.getFullYear()
            }));
        }

        for (i = 0; i <= 23; i++) {
            reflectionDate.setHours(i);

            container.one('.rednose-date-hour').append(this.OPTION_TEMPLATE({
                value   : i,
                label   : Y.Date.format(reflectionDate, { format: '%H'} ),
                selected: i === date.getHours()
            }));
        }

        for (i = 0; i <= 59; i++) {
            reflectionDate.setMinutes(i);

            container.one('.rednose-date-minute').append(this.OPTION_TEMPLATE({
                value   : i,
                label   : Y.Date.format(reflectionDate, { format: '%M'} ),
                selected: i === date.getMinutes()
            }));
        }

        return this;
    },

    // XXX
    focus: function () {
        var node = this.get('container').one('select');

        if (node) {
            node.focus();
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').DateTimeControlView = DateTimeControlView;
/*jshint boss:true, expr:true, onevar:false */

var TextAreaControlView;

TextAreaControlView = Y.Base.create('textAreaControlView', Y.Rednose.Form.BaseControlView, [], {

    template: '<div class="control-group">' +
                  '<label class="control-label" for="{id}">{label}</label>' +
                  '<div class="controls">' +
                      '<textarea id="{id}"></textarea>' +
                  '</div>' +
              '</div>',

    render: function () {
        var container = this.get('container'),
            model     = this.get('model'),
            template  = this.template;

        container.setHTML(Y.Lang.sub(template, {
            id   : model.get('id'),
            label: model.get('caption')
        }));

        var properties = model.get('properties');

        if (properties && properties.size) {
            container.one('textarea').addClass('input-' + properties.size);
        }

        if (properties && properties.rows) {
            container.one('textarea').setAttribute('rows', properties.rows);
        }

        return this;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').TextAreaControlView = TextAreaControlView;

var RichTextControlView;

RichTextControlView = Y.Base.create('richTextControlView', Y.Rednose.Form.BaseControlView, [], {

    template: '<div class="control-group">' +
                  '<label class="control-label" for="{id}">{label}</label>' +
                  '<div class="controls">' +
                      '<textarea class="input-block-level" id="{id}"></textarea>' +
                  '</div>' +
              '</div>',

    _editor: null,

    _rendered: false,

    destructor: function () {
        this._editor.destroy();

        this._editor = null;
    },

    render: function () {
        var container = this.get('container'),
            model     = this.get('model'),
            template  = this.template;

        if (this._rendered) {
            return;
        }

        container.setHTML(Y.Lang.sub(template, {
            id   : model.get('id'),
            label: model.get('caption')
        }));

        this._editor = new Y.Rednose.ControlFormRichTextEditor({
            srcNode   : container.one('textarea'),
            replace   : true,
            properties: {
                input_properties: {
                    styles    : 'true',
                    clipboard : 'true',
                    editing   : 'true',
                    undoredo  : 'true'
                }
            }
        }).render();

        this._rendered = true;

        return this;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').RichTextControlView = RichTextControlView;
/*jshint boss:true, expr:true, evil: true, onevar:false */

var Micro = Y.Template.Micro,
    FormView;

FormView = Y.Base.create('formView', Y.View, [], {
    template: Micro.compile(
        '<div class="rednose-form-view">' +
            '<form class="rednose-form form<%= data.horizontal ? \'-horizontal\' : \'\' %>">' +
                '<fieldset>' +
                    '<% if (data.caption) { %>' +
                        '<legend><%= data.caption %></legend>' +
                    '<% } %>' +
                '</fieldset>' +
            '</form>' +
        '</div>'
    ),

    _controlViewMap: {},

    _expressionMap: [],

    destructor: function () {
        this.clear();
        this._expressionMap = null;
    },

    render: function () {
        var self      = this,
            container = this.get('container'),
            model     = this.get('model'),
            template  = this.template;

        this._controlViewMap = [];
        this._expressionMap  = [];

        container.setHTML(template({
            horizontal: this.get('horizontal'),
            caption   : model.get('caption')
        }));

        model.get('controls').each(function (control) {
            var controlView  = Y.Rednose.Form.ControlViewFactory.create(control);

            if (controlView) {
                self._controlViewMap[control.get('id')] = controlView;
                // XXX
                control.view = controlView;

                // Add bubble target.
                controlView.addTarget(self);

                // XXX: Binding.
                controlView.after('*:change', function () {
                    // TODO: Propagate to this.change event.
                    // self._evalutateExpressions();
                });

                // XXX: Expressions.
                var expressions = control.get('properties').expressions;

                if (expressions) {
                    Y.Object.each(expressions, function (expression) {
                        self._expressionMap.push(expression);
                    });
                }

                container.one('fieldset').append(controlView.render().get('container'));
            }
        });

        // this._evalutateExpressions();

        return this;
    },

    clear: function() {
        Y.Object.each(this._controlViewMap, function (view) {
            view.remove();
        });
    },

    _evalutateExpressions: function () {
        var self = this;

        var objectDefinitions = [];

        Y.Object.each(this._controlViewMap, function (view) {
            var id    = view.get('model').get('id'),
                attrs = Y.JSON.stringify(view.get('model').toJSON());

            objectDefinitions.push(id + ' = ' + attrs);
        });

        var lines = [];

        lines.push('var ' + objectDefinitions.join(', ') + ';');
        lines.push(this._expressionMap.join(' '));

        var objectMappings = [];

        Y.Object.each(this._controlViewMap, function (view) {
            var id    = view.get('model').get('id');

            objectMappings.push('"' + id + '": ' + id);
        });

        lines.push('var objects = {' + objectMappings.join(', ') + '};');

        var objects;

        eval(lines.join(' '));

        Y.Object.each(objects, function (attrs, id) {
            var model = self._controlViewMap[id].get('model');

            model.setAttrs(attrs);

            // TODO: Only render changed views
            self._controlViewMap[id].render();
        });
    }
}, {
    ATTRS: {
        /**
         * @type {Boolean}
         * @default true
         */
        horizontal: {
            value: true
        },

        /**
         * @type {Rednose.Form.FormModel}
         */
        model: {
            value: new Y.Rednose.Form.FormModel()
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').FormView = FormView;
/*jshint boss:true, expr:true, onevar:false */

var TYPE_TEXT          = 'text',
    TYPE_TEXTAREA      = 'textarea',
    TYPE_HTML          = 'html',
    TYPE_DATE          = 'date',
    TYPE_DATETIME      = 'datetime',
    TYPE_DROPDOWN      = 'dropdown',
    TYPE_RADIO         = 'radio',
    TYPE_CHECKBOX      = 'checkbox',
    TYPE_AUTOCOMPLETE  = 'autocomplete',
    TYPE_FILE          = 'file';

function ControlViewFactory() {
    ControlViewFactory.superclass.constructor.apply(this);
}

ControlViewFactory.create = function (model) {
    switch (model.get('type')) {
        case TYPE_TEXT:
            return new Y.Rednose.Form.TextControlView({ model: model });
        case TYPE_DROPDOWN:
            return new Y.Rednose.Form.DropDownControlView({ model: model });
        case TYPE_TEXTAREA:
            return new Y.Rednose.Form.TextAreaControlView({ model: model });
        case TYPE_HTML:
            return new Y.Rednose.Form.RichTextControlView({ model: model });
        case TYPE_DATE:
            return null;
        case TYPE_DATETIME:
            return new Y.Rednose.Form.DateTimeControlView({ model: model });
        case TYPE_RADIO:
            return null;
        case TYPE_CHECKBOX:
            return new Y.Rednose.Form.CheckboxControlView({ model: model });
        case TYPE_AUTOCOMPLETE:
            return new Y.Rednose.Form.AutocompleteControlView({ model: model });
        case TYPE_FILE:
            return null;
    }

    return null;
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').ControlViewFactory = ControlViewFactory;
/*jshint boss:true, expr:true, onevar:false */

var Dropdown = Y.Base.create('dropdown', Y.Base, [], {
    EMPTY_TEMPLATE: '<option value>...</option>',

    OPTION_TEMPLATE: '<option data-record="{guid}" value="{value}">{text}</option>',

    initializer: function (config) {
        this._recordMap || (this._recordMap = {});
        this.record = null;

        this.host        = config.host;
        this.datasource  = config.datasource;
        this.parent      = config.parent;
        this.parentField = config.parentField;
        this.required    = config.required;
        this.map         = config.map;

        this.host.after('change', this._afterHostChange, this);

        if (this.parent) {
            var parentNode = Y.one('[data-name=' + this.parent.id + ']');

            parentNode.after('change', this._afterParentChange, this);

            // FIXME: Set value in the case of prefilled forms.
            this._processParent();
        }
    },

    _queryDatasource: function (parameters) {
        var self = this;

        this.datasource.query(parameters).then(function (data) {
            self._renderOptions(data);
        });
    },

    _emptyNode: function () {
        var node     = this.host,
            required = this.required;

        node.empty();

        if (!required) {
            node.append(Y.Node.create(this.EMPTY_TEMPLATE));
        }
    },

    _renderOptions: function (data) {
        var self = this,
            node = this.host,
            map  = this.map;

        this._recordMap = {};

        node.set('disabled', false);
        this._emptyNode();

        Y.Array.each(data, function (record) {
            var guid = Y.stamp(record);

            self._recordMap[guid] = record;

            node.append(Y.Lang.sub(self.OPTION_TEMPLATE, {
                value: record[map.value],
                text : record[map.text],
                guid : guid
            }));
        });
    },

    _processParent: function () {
        var node       = this.host,
            config     = this.parent,
            parentNode = Y.one('[data-name=' + config.id + ']'),
            value      = parentNode.get('value'),
            parameters = {};

        node.set('disabled', true);

        if (value === '') {
            return;
        }

        parameters[config.field] = value;

        this._queryDatasource(parameters);
    },

    _afterHostChange: function (e) {
        var selected = e.target.get('options').item(e.target.get('selectedIndex')),
            record   = this._recordMap[selected.getData('record')],
            value    = e.target.get('value');

        this.fire('select', {
            value: value,
            raw  : record ? Y.clone(record) : null
        });
    },

    _afterParentChange: function () {
        this._emptyNode();
        this._processParent();
    }
}, {
    NS: 'dropdown'
});

Y.namespace('Rednose.Plugin.Form').Dropdown = Dropdown;
/*jshint boss:true, expr:true, onevar:false */

function FormXML () {}

FormXML.prototype = {
    initializer: function () {
        var form = this.form,
            self = this;

        this._buildXML();

        form.after('change', self._afterXMLFormChange, this);
    },

    getXpathValue: function (query) {
        var result = this.xml.evaluate(query, this.xml, null, XPathResult.ANY_TYPE, null);

        if (result.resultType === 2) {
            return result.stringValue;
        }

        if (result.resultType === 4) {
            return result.iterateNext().textContent;
        }

        return null;
    },

    setXpathValue: function (query, value) {
        var result = this.xml.evaluate(query, this.xml, null, XPathResult.ANY_TYPE, null);

        if (result.resultType === 4) {
            result.iterateNext().textContent = value;
        }
    },

    _buildXML: function () {
        this.xml = Y.XML.parse('<form/>');

        var form = this.form,
            xml  = this.xml,
            self = this;

      form.all('[data-section]').each(function (sectionNode) {
            var sectionName    = sectionNode.getData('section'),
                sectionElement = xml.createElement(sectionName);

            sectionNode.all('[data-name]').each(function (controlNode) {
                var controlName    = controlNode.getData('name'),
                    controlElement = xml.createElement(controlName),
                    value          = self.getNodeValue(controlNode);

                controlElement.appendChild(xml.createTextNode(value));
                sectionElement.appendChild(controlElement);
            });

            xml.documentElement.appendChild(sectionElement);
        });
    },

    _afterXMLFormChange: function () {
        this._buildXML();
    }
};

function FormJSON () {}

FormJSON.prototype = {
    initializer: function () {
        var form = this.form,
            self = this;

        this._buildJSON();

        form.after('change', self._afterJSONFormChange, this);
    },

    _buildJSON: function () {
        this.json = {};

        var form = this.form,
            json = this.json,
            self = this;

      form.all('[data-section]').each(function (sectionNode) {
            var sectionName = sectionNode.getData('section');

            json[sectionName] = {};

            sectionNode.all('[data-name]').each(function (controlNode) {
                var controlName = controlNode.getData('name'),
                    value       = self.getNodeValue(controlNode);

                json[sectionName][controlName] = value;
            });
        });
    },

    _getRootByPath: function (object, path) {
        return path.split('.')[0];
    },

    _getValueByPath: function (object, path) {
        var parts = path.split('.');

        for (var i = 0, len = parts.length; i < len; i++) {
            if (Y.Lang.isObject(object) && parts[i] in object) {
                object = object[parts[i]];
            } else {
                object = undefined;
                break;
            }
        }

        return object;
    },

    _setValueByPath: function (object, path, value) {
        var parts = path.split('.');

        for (var i = 0, len = parts.length; i < len; i++) {
            if (i === len - 1) {
                object[parts[i]] = value;

                break;
            }

            object[parts[i]] || (object[parts[i]] = {});

            object = object[parts[i]];
        }
    },

    _afterJSONFormChange: function () {
        this._buildJSON();
    }
};

function FormConditions () {}

FormConditions.prototype = {
    initializer: function () {
        this.config || (this.config = {});

        var form = this.form,
            self = this;

        form.after('change', self._afterConditionsFormChange, this);

        form.all('[data-conditions]').each(function (node) {
            var config = Y.JSON.parse(node.getData('conditions'));

            self.config[node.get('id')] = config;
        });
    },

    _handleCondition: function (id, config) {
        if (config.hasOwnProperty('visible')) {
            var condition = config.visible,
                node      = this.form.one('#' + id);
                value     = this._compare(this.getXpathValue(condition.a), this.getXpathValue(condition.b), condition.operator);

            this.setNodeVisible(node, value);
        }
    },

    _compare: function (a, b, operator) {
        switch (operator) {
            case '==':
                return (a === b);

            case '!=':
                return (a !== b);
        }

        return null;
    },

    _afterConditionsFormChange: function () {
        var config = this.config;

        for (var id in config) {
            if (config.hasOwnProperty(id)) {
                var conditions = config[id];

                this._handleCondition(id, conditions);
            }
        }
    }
};

function FormDataSources () {}

FormDataSources.prototype = {
    initializer: function () {
        this.scope || (this.scope = {});
        this.dataSources = {};

        var self = this;

        this._loadDataSources().then(function (sources) {
            self._initDataSources(sources);
            self._bindDataSources();
        });
    },

    _setRecord: function (name, object) {
        var self = this;

        // Update the current record.
        this.scope[name] = object;

        this.form.all('[data-bindings]').each(function (node) {
            var bindings = Y.JSON.parse(node.getData('bindings'));

            // Update all controls bound to this record.
            Y.Array.each(bindings, function (binding) {
                if (self._getRootByPath(self.scope, binding) === name) {
                    self.setNodeValue(node, self._getValueByPath(self.scope, binding) || null);
                }
            });

            // TODO: Sync form back to model.
        });
    },

    _loadDataSources: function () {
        return Y.Promise(function (resolve) {
            Y.io(Routing.generate('rednose_dataprovider_data_sources'), {
                method: 'GET',
                on: {
                    success: function (tx, r) {
                        resolve(Y.JSON.parse(r.responseText));
                    }
                }
            });
        });
    },

    _initDataSources: function (sources) {
        var self = this;

        Y.Array.each(sources, function (source) {
            switch (source.type) {
                case 'dataGen':
                    self.dataSources[source.name] = new Y.Rednose.Datagen(source);
                    break;
                case 'trim':
                    self.dataSources[source.name] = new Y.Rednose.Trim(source);
                    break;
            }
        });
    },

    _bindDataSources: function () {
        var sources = this.dataSources,
            self    = this;

        // this.form.all('[data-type=dropdown]').each(function (node) {
        //     if (node.getData('datasource')) {
        //         var config     = Y.JSON.parse(node.getData('datasource')),
        //             datasource = sources[config.id];

        //         if (datasource) {
        //             node.plug(Y.Rednose.Plugin.Form.Dropdown, {
        //                 datasource: datasource,
        //                 map       : config.map,
        //                 parent    : config.parent,
        //                 required  : node.getData('required')
        //             });

        //             node.dropdown.after('select', function (e) {
        //                 self._setRecord(config.id, e.raw);
        //             });
        //         }
        //     }
        // });

        this.form.all('[data-type=autocomplete]').each(function (node) {
            var id         = node.getData('source'),
                map        = Y.JSON.parse(node.getData('map')),
                datasource = sources[id];

            var template = Y.Template.Micro.compile(
                '<a role="menuitem">' +
                    '<% if (data.image) { %>' +
                        '<img class="avatar size32" src="<%= data.image %>">' +
                    '<% } %>' +
                    '<span class="title-block">' +
                        '<span class="title"><%== data.title %></span>' +
                    '</span>' +
                    '<span class="subtitle"><%= data.subtitle %></span>' +
                '</a>'
            );

            Y.Plugin.AutoComplete.CSS_PREFIX = 'rednose-autocomplete';

            node.plug(Y.Plugin.AutoComplete, {
                resultTextLocator: function (result) {
                    return result[map.value];
                },

                resultFormatter: function (query, results) {
                    return Y.Array.map(results, function (result) {
                        return template({
                            title   : Y.Highlight.all(result.raw[map.title], query),
                            subtitle: result.raw[map.subtitle],
                            image   : result.raw[map.image]
                        });
                    });
                },

                source: function (query, callback) {
                    datasource.query({query: query}).then(function (data) {
                        callback(data);
                    });
                }
            });

            node.ac.after('select', function (e) {
                self._setRecord(config.id, e.result.raw);
            });
        });
    }
};

var Form = Y.Base.create('form', Y.Base, [FormXML, FormJSON, FormConditions, FormDataSources], {
    initializer: function (config) {
        this.form  = config.host;
        this.model = config.model;

        this.form.after('change', this._afterFormChange, this);

        // Initialize widgets.
        this.form.all('[data-type=datetime]').each(function (node) {
            node.one('input').plug(Y.Rednose.Plugin.Datepicker);
        });
    },

    getNodeVisible: function (node) {
        return !node.ancestor('.control-group').getAttribute('hidden');
    },

    setNodeVisible: function (node, value) {
        node.ancestor('.control-group')[value ? 'show' : 'hide']();
    },

    getNodeValue: function (node) {
        var type = node.getData('type');

        var value = (type === 'checkbox') ? node.get('checked').toString() : node.get('value');

        return value;
    },

    setNodeValue: function (node, value) {
        var type = node.getData('type');

        if (type === 'image') {
            node.get('parentNode').one('img').setAttribute('src', value);
        }

        if (value === this.getNodeValue(node)) {
            return;
        }

        node.set('value', value);
    },

    _afterFormChange: function (e) {
        // console.log(e);
    }
}, {
    NS: 'form'
});

Y.namespace('Rednose.Plugin').Form = Y.mix(Form, Y.Rednose.Plugin.Form);


}, '1.5.0-DEV', {
    "requires": [
        "autocomplete",
        "highlight",
        "io",
        "model",
        "model-list",
        "rednose-datagen",
        "rednose-datetimepicker",
        "rednose-trim",
        "template-micro",
        "uploader",
        "view",
        "datatype-xml"
    ]
});
