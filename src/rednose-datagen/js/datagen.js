/*jshint boss:true, expr:true, onevar:false */

var Datagen = Y.Base.create('datagen', Y.Base, [], {

    /**
     * @property {String} url
     */

    initializer: function () {
        var section    = this.get('section'),
            fields     = this.get('fields'),
            properties = this.get('properties'),
            sort       = this.get('sort');

        this.url = Routing.generate('rednose_datagen_get_section_records', {name: section}) + '?callback={callback}';

        if (fields) {
            this.url = this.url + '&fields=' + fields.join(',');
        }

        if (properties) {
            this.properties = properties;
        }

        if (sort) {
            var sortParameters = [];

            for (var property in sort) {
                if (sort.hasOwnProperty(property)) {
                    sortParameters.push(sort[property] + '.' + property);
                }
            }

            this.url = this.url + '&sort=' + sortParameters.join(',');
        }
    },

    query: function (parameters) {
        parameters || (parameters = {});
        parameters = Y.merge(parameters, this.properties);

        var url = this.url;

        for (var parameter in parameters) {
            if (parameters.hasOwnProperty(parameter)) {
                url = this.url + '&' + parameter + '=' + parameters[parameter];
            }
        }

        return Y.Promise(function (resolve) {
             Y.jsonp(url, {
                on: {
                    success: function (data) {
                        resolve(data);
                    }
                }
            });
        });
    }
}, {
    ATTRS: {
        /**
         * @type {String}
         */
        url: {
            value: null
        },

        /**
         * @type {String}
         */
        section: {
            value: null
        },

        /**
         * @type {Array}
         */
        fields: {
            value: null
        },

        /**
         * @type {Object}
         */
        sort: {
            value: null
        },

        /**
         * @type {Object}
         */
        properties: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Datagen = Datagen;
