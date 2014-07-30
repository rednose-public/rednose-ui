YUI.add('rednose-datagen', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var Datagen = Y.Base.create('datagen', Y.Base, [], {

    /**
     * @property {String} url
     */

    initializer: function () {
        var section = this.get('section'),
            fields  = this.get('fields'),
            sort    = this.get('sort'),
            url     = this.get('url') + '/api/datagen/sections/{section}/records?callback={callback}';

        this.url = Y.Lang.sub(url, {section: section});

        if (fields) {
            this.url = this.url + '&fields=' + fields.join(',');
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
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Datagen = Datagen;


}, '1.5.0-DEV', {"requires": ["base", "io", "jsonp", "jsonp-url", "promise", "view", "xml"]});
