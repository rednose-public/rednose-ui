YUI.add('rednose-form', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var TreeModel = Y.Rednose.ModelTree,
    ControlModel;

ControlModel = Y.Base.create('controlModel', Y.Model, [], {
    view: {},

    _getValue: function (value) {
        if (value === null) {
            return false;
        }

        return value;
    }
}, {
    ATTRS: {
        caption:    { value: null },
        type:       { value: null },
        properties: { value: {} },
        required:   { value: null },
        visible:    { value: null },
        protected:  { value: null },
        readonly:   { value: null },
        // XXX
        value   :   { value: null, getter: '_getValue' }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').ControlModel = ControlModel;

var FormModel;

FormModel = Y.Base.create('formModel', Y.Model, [], {
    getTree: function () {
        var items = {
            label   : this.get('caption'),
            data    : new Y.Model(),
            icon    : 'icon-list-alt',
            children: []
        };

        // XXX
        if (!this.get('id') && !this.get('caption')) {
            return new TreeModel();
        }

        this.get('controls').each(function (model) {
            items.children.push({
                label   : model.get('id'),
                data    : model,
                icon    : 'icon-minus'
            });
        });

        return new TreeModel({ items: items });
    },

    sync: function (action, options, callback) {
        if (action === 'read') {
            Y.io(Routing.generate('rednose_flowgen_process_form', {'id': this.get('id')}), {
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

    _setControls: function (value) {
        var list = new Y.ModelList();

        Y.Array.each(value, function (v) {
            list.add(new Y.Rednose.Form.ControlModel(v));
        });

        return list;
    }
}, {
    ATTRS: {
        caption : { value: null },
        controls: {
            value : new Y.ModelList(),
            setter: '_setControls'
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
                      '<input class="input-block-level" id="{id}" type="text"/>' +
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
                  '<div class="controls">' +
                      '<label class="checkbox">' +
                          '<input type="checkbox" id="{id}"> {label}' +
                      '</label>' +
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
            label  : model.get('id'),
            caption: model.get('caption')
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

var Micro = Y.Template.Micro,
    AutocompleteControlView;

AutocompleteControlView = Y.Base.create('autoCompleteControlView', Y.Rednose.Form.BaseControlView, [], {

    OPTION_TEMPLATE: '<option value="{value}">{label}</option>',

    AUTOCOMPLETE_TEMPLATE: Micro.compile(
        '<div class="entry">' +
            '<% if (data.image) { %>' +
                '<div class="hd">' +
                    '<img src="<%= data.image %>" class="photo">' +
                '</div>' +
            '<% } %>' +
            '<div class="bd">' +
                '<div class="autocomplete-title"><%= data.title %></div>' +
                '<div class="autocomplete-subtitle"><%= data.subtitle %></div>' +
            '</div>' +
        '</div>'
    ),

    template: '<div class="control-group">' +
                  '<label class="control-label" for="{id}">{label}</label>' +
                  '<div class="controls">' +
                      '<input type="text" class="input-block-level" id="{id}" placeholder="{placeholder}"/>' +
                  '</div>' +
              '</div>',

    _inputNode: null,

    _autoComplete: null,

    events: {
        'input': {
            change: '_handleInputChange'
            // TODO: Add keyup event for faster updating, but filter out the autocomplete keypresses.
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

        this._inputNode = container.one('input');

        model.get('visible') ? container.show() : container.hide();

        this._renderAutoComplete();

        return this;
    },

    _renderAutoComplete: function () {
        var self       = this,
            template   = this.AUTOCOMPLETE_TEMPLATE,
            choices    = this.get('model').get('properties').choices,
            datasource = this.get('model').get('properties').datasource,
            config;

        config = {
            inputNode        : this._inputNode,
            // FIXME: hightlighting doens't work.
            resultHighlighter: 'phraseMatch',
            maxResults       : 6
        };

        if (datasource) {
            config = Y.merge(config, {
                resultListLocator: 'results',
                resultFormatter  : function (query, raw) {
                    return Y.Array.map(raw, function (result) {
                        return template(self._mapDataProviderData(result.raw, datasource.map));
                    });
                },
                resultTextLocator: function (result) {
                    return datasource.map && datasource.map.value ? result[datasource.map.value] : result.value;
                },
                source: this._getDataProviderRoute(datasource.id, datasource.map && datasource.map.title ? datasource.map.title : 'title')
            });
        } else if (choices) {
            config = Y.merge(config, {
                resultFormatter  : function (query, raw) {
                    return Y.Array.map(raw, function (result) {
                        return template(result.raw);
                    });
                },
                resultTextLocator: 'value',
                source           : choices
            });
        }

        this._inputNode.setAttribute('autocomplete', 'off');

        this._autoComplete = new Y.AutoCompleteList(config).render();

        // FIXME: We need to fire the events manually because the change on this._inputNode doens't fire when selecting an item
        // by pressing enter. On clicks however, both the select event and the this._inputNode change event get fired and we have
        // double events.
        this._autoComplete.after('select', function () {
            self._handleInputChange();
        });
    },

    _getDataProviderRoute: function (id, key) {
        return Routing.generate('rednose_dataprovider_data_list') + '?id=' + id + '&q={query}&key=' + key + '&callback={callback}';
    },

    _mapDataProviderData: function (data, map) {
        map || (map = {});

        return {
            title   : map.title    ? data[map.title]    : data.title,
            subtitle: map.subtitle ? data[map.subtitle] : data.subtitle,
            image   : map.image    ? data[map.image]    : data.image,
            value   : map.value    ? data[map.value]    : data.value
        };
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

var TextAreaControlView;

TextAreaControlView = Y.Base.create('textAreaControlView', Y.Rednose.Form.BaseControlView, [], {

    template: '<div class="control-group">' +
                  '<label class="control-label" for="{id}">{label}</label>' +
                  '<div class="controls">' +
                      '<textarea rows="3" class="input-block-level" id="{id}"></textarea>' +
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

        return this;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').TextAreaControlView = TextAreaControlView;

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
/*jshint boss:true, expr:true, onevar:false */

var TYPE_TEXT          = 'text',
    TYPE_TEXTAREA      = 'textarea',
    TYPE_HTML          = 'html',
    TYPE_DATE          = 'date',
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


}, '1.1.0-DEV', {
    "requires": [
        "autocomplete",
        "autocomplete-filters",
        "autocomplete-highlighters",
        "uploader",
        "template-micro",
        "rednose-form-css"
    ]
});
