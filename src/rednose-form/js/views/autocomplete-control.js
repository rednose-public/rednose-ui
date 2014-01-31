/*jshint boss:true, expr:true, onevar:false */

var TXT_TYPE_TO_SEARCH = 'Type here to search...';

var Micro        = Y.Template.Micro,
    AutoComplete = Y.Rednose.ControlFormAutoComplete,
    AutocompleteControlView;

AutocompleteControlView = Y.Base.create('autoCompleteControlView', Y.Rednose.Form.BaseControlView, [], {

    OPTION_TEMPLATE: '<option value="{value}">{label}</option>',

    AUTOCOMPLETE_TEMPLATE: Micro.compile(
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
                      '<input type="text" class="input-block-level" id="{id}" placeholder="{placeholder}"/>' +
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
            inputNode : this._inputNode,
            maxResults: 6
        };

        if (datasource) {
            config = Y.merge(config, {
                resultListLocator: 'results',
                resultFormatter  : function (query, raw) {
                    return Y.Array.map(raw, function (result) {
                        var mapped = self._mapDataProviderData(result.raw, datasource.map);

                        mapped.title = Y.Highlight.all(mapped.title, query);

                        return template(mapped);
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

        this._autoComplete = new AutoComplete(config).render();

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
