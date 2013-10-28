YUI.add('rednose-dataprovider', function (Y, NAME) {

var DataProvider;

DataProvider = Y.Base.create('dataProvider', Y.Base, [], {
    ac: null,

    template:
        '<div class="dataprovider-form">' +
            '<div class="input-append">' +
                '<input type="text" class="dataprovider-search" placeholder="{placeholder}" />' +
                '<button class="btn btn dataprovider-button" type="button">...</button>' +
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
        var self         = this,
            senderInput  = this.get('srcNode'),
            route        = 'rednose_dataprovider_data_list',
            id           = senderInput.getAttribute('data-provider-id');
            parameterBag = senderInput.getAttribute('data-json-parameterbag'),
            placeHolder  = senderInput.getAttribute('placeholder');

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

        var container = senderInput.ancestor();

        container.append(Y.Lang.sub(this.template, { placeholder: placeHolder }));
        container.one('.dataprovider-button').on('click', function(e) {
            self._handleComboButton(e);
        });

        route =
            Routing.generate(route) + '?id=' + id +
            '&parameterbag=' + parameterBag +
            '&q={query}&callback={callback}';

        senderInput.hide();

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
            this.fire('selected', e.result);
        });
    },

    _handleComboButton: function (e) {
        var ac = this.ac;

        e.stopPropagation();

        if (ac.get('visible')) {
            ac.hide();
        } else {
            ac.sendRequest();
            ac.show();
        }
    },
}, {
    ATTRS: {
        srcNode: { value: null },
        display_handle: { value: 'display_name' },
    }
});

Y.namespace('Rednose').DataProvider = DataProvider;


}, '1.1.0-DEV', {
    "requires": [
        "base",
        "autocomplete",
        "autocomplete-filters",
        "autocomplete-highlighters"
    ],
    "skinnable": false
});
