YUI.add('libbit-model-spinner', function (Y, NAME) {

var Spinner;

Spinner = Y.Base.create('undo', Y.Model, [], {

    destroy: function (options, callback) {
       var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        Y.Libbit.App.showSpinner();

        this.constructor.superclass.destroy.apply(this, [ options, function () {
            Y.Libbit.App.hideSpinner();

            if (typeof callback === 'function') {
                callback();
            }
        } ]);
    },

    save: function (options, callback) {
       var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        Y.Libbit.App.showSpinner();

        this.constructor.superclass.save.apply(this, [ options, function () {
            Y.Libbit.App.hideSpinner();

            if (typeof callback === 'function') {
                callback();
            }
        } ]);
    },

    load: function (options, callback) {
       var self = this;

        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        Y.Libbit.App.showSpinner();

        this.constructor.superclass.load.apply(this, [ options, function () {
            Y.Libbit.App.hideSpinner();

            if (typeof callback === 'function') {
                callback();
            }
        } ]);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.Model').Spinner = Spinner;


}, '1.0.0', {"requires": ["libbit-app-base", "model"]});
