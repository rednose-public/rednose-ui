YUI.add('rednose-dataprovider', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var TreeModel = Y.Rednose.ModelTree,
    DataSource,
    PdoSource,
    XmlSource,
    DataSourceList;

DataSourceAttribute = Y.Base.create('dataSourceAttribute', Y.Model, [], {
    ATTRS: {
        source  : { value: null },
        name    : { value: null },
    }
});

DataSource = Y.Base.create('dataSource', Y.Model, [], {
    _setAttributes: function (attributes) {
        var self   = this,
            models = [];

        Y.Array.each(attributes, function (attribute) {
            models.push(new DataSourceAttribute({
                source: self,
                name  : attribute
            }));
        });

        return models;
    }
}, {
    ATTRS: {
        name      : { value: null },
        attributes: { value: [], setter: '_setAttributes' },
    }
});

PdoSource = Y.Base.create('pdoSource', DataSource, [], {}, {
    ATTRS: {
        dsn     : { value: null },
        username: { value: null },
        password: { value: null },
        table   : { value: null }
    }
});

XmlSource = Y.Base.create('xmlSource', DataSource, [], {}, {
    ATTRS: {
        xsd : { value: null },
        xslt: { value: null },
        xml : { value: null },
        root: { value: null }
    }
});

DataSourceList = Y.Base.create('dataSourceList', Y.ModelList, [], {
    model: DataSource,

    getTree: function () {
        var items = [];

        this.each(function (model) {
            var node = {
                label   : model.get('name'),
                data    : model,
                children: []
            };

            Y.Array.each(model.get('attributes'), function (attribute) {
                node.children.push({
                    label: attribute.get('name'),
                    data : attribute
                });
            });

            items.push(node);
        });

        return new TreeModel({
            items: items,
            icons: {
                'pdoSource'          : 'icon-align-justify',
                'xmlSource'          : 'icon-file',
                'dataSourceAttribute': 'icon-minus'
            }
        });
    },

    parse: function (response) {
        var items = [];

        Y.Array.each(Y.JSON.parse(response), function (item) {
            switch (item.type) {
                case 'pdoSource':
                    items.push(new PdoSource(item));
                    break;
                case 'xmlSource':
                    items.push(new XmlSource(item));
                    break;
            }
        });

        return items;
    },

    sync: function (action, options, callback) {
        if (action === 'read') {
            Y.io(Routing.generate('rednose_dataprovider_data_sources'), {
                method: 'GET',
                on : {
                    success : function (tx, r) {
                        callback(null, r.responseText);
                    },
                    failure: function (tx, r) {
                        callback(Y.JSON.parse(r.responseText));
                    }
                }
            });
        }
    }
});

Y.namespace('Rednose.DataSource').DataSource          = DataSource;
Y.namespace('Rednose.DataSource').DataSourceAttribute = DataSourceAttribute;
Y.namespace('Rednose.DataSource').PdoSource           = PdoSource;
Y.namespace('Rednose.DataSource').XmlSource           = XmlSource;
Y.namespace('Rednose.DataSource').DataSourceList      = DataSourceList;
var DataProvider;

DataProvider = Y.Base.create('dataProvider', Y.Widget, [], {
    ac: null,

    template:
        '<div class="dataprovider-form">' +
            '<div class="input-append">' +
                '<input type="text" class="dataprovider-search" placeholder="{placeholder}" />' +
                '<button class="btn btn dataprovider-button" type="button">{caption}</button>' +
            '</div>' +
            '<div class="ac"></div>' +
        '</div>',

    formatterTemplate:
            '<div class="entry">' +
                '<div class="hd">' +
                    '<img src="{img}" class="photo" />' +
                '</div>' +
                '<div class="bd">' +
                    '<div class="autocomplete-title">{title}</div>' +
                    '<div class="autocomplete-subtitle">{subtitle}</div>' +
                '</div>' +
            '</div>',

    initializer: function() {
        var self          = this,
            container     = this.get('contentBox'),
            route         = 'rednose_dataprovider_data_list',
            id            = this.get('dataProviderId'),
            parameterBag  = this.get('parameterBag'),
            placeHolder   = this.get('placeholder'),
            buttonCaption = this.get('buttonCaption');

        var defaultFormatter = function(query, raw) {
            return Y.Array.map(raw, function (result) {
                return Y.Lang.sub(
                    self.formatterTemplate,
                    {
                        img     : result.raw.img,
                        title   : result.highlighted,
                        subtitle: result.raw.subtitle
                    }
                );
            });
        };

        container.append(Y.Lang.sub(this.template, { placeholder: placeHolder, caption: buttonCaption }));
        container.one('.dataprovider-button').on('click', function(e) {
            self._handleComboButton(e);
        });

        route =
            Routing.generate(route) + '?id=' + id +
            '&parameterbag=' + Y.JSON.stringify(parameterBag) +
            '&q={query}&callback={callback}';

        this.ac = new Y.AutoCompleteList({
            inputNode        : container.one('.dataprovider-search'),
            resultFormatter  : defaultFormatter,
            minQueryLength   : 0,
            maxResults       : 0,
            resultHighlighter: 'phraseMatch',
            resultListLocator: 'results',
            resultTextLocator: this.get('display_handle'),
            source           : route,
            render           : container.one('.ac')
        });

        this.ac.after('select', function (e) {
            self.fire('selected', e.result);
        });

        this.ac.on(
            "query",
            function (e) {
                container.one('.dataprovider-button').addClass('dataprovider-spinner');
                container.one('.dataprovider-button').setHTML('&nbsp;');
            }
        );

        this.ac.after(
            "results",
            function (e) {
                container.one('.dataprovider-button').removeClass('dataprovider-spinner');
                container.one('.dataprovider-button').setHTML(self.get('buttonCaption'));
            }
        );
    },

    _handleComboButton: function (e) {
        var ac = this.ac;

        e.stopPropagation();

        if (ac.get('visible')) {
            ac.hide();
        } else {
            if (ac.get('results').length === 0) {
                ac.fire('query');
            }

            ac.sendRequest();
            ac.show();
        }
    },
}, {
    ATTRS: {
        placeholder: { value: 'Type here to search…' },
        buttonCaption: { value: '…' },
        parameterBag: { value: {} },
        dataProviderId: { value: 'unknown.id' },
        display_handle: { value: 'display_name' },
    }
});

Y.namespace('Rednose').DataProvider = DataProvider;


}, '1.1.0-DEV', {
    "requires": [
        "autocomplete",
        "autocomplete-filters",
        "autocomplete-highlighters",
        "base",
        "json",
        "model",
        "model-list",
        "rednose-treeview",
        "widget"
    ],
    "skinnable": true
});
