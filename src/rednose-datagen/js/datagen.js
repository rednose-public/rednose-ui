/*jshint boss:true, expr:true, onevar:false */

var Datagen = Y.Base.create('datagen', Y.Base, [], {

    initializer: function () {
        var section = this.get('section'),
            url     = this.get('url') + '/api/datagen/sections/{section}/records?callback={callback}';

        this.url = Y.Lang.sub(url, {section: section});
    },

    query: function (arg) {
        var url = this.url + '&query=' + arg;

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
         * @type {string}
         */
        url: {
            value: null
        },

        /**
         * @type {string}
         */
        section: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Datagen = Datagen;
