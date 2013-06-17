var Spinner;

Spinner = Y.Base.create('undo', Y.Model, [], {

    destroy: function (options, callback) {
        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        Y.Rednose.App.showSpinner();

        this.constructor.superclass.destroy.apply(this, [ options, function (err) {
            Y.Rednose.App.hideSpinner();

            if (typeof callback === 'function') {
                callback(err);
            }
        } ]);
    },

    save: function (options, callback) {
        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        Y.Rednose.App.showSpinner();

        this.constructor.superclass.save.apply(this, [ options, function (err) {
            Y.Rednose.App.hideSpinner();

            if (typeof callback === 'function') {
                callback(err);
            }
        } ]);
    },

    load: function (options, callback) {
        // Allow callback as only arg.
        if (typeof options === 'function') {
            callback = options;
            options  = {};
        }

        Y.Rednose.App.showSpinner();

        this.constructor.superclass.load.apply(this, [ options, function (err) {
            Y.Rednose.App.hideSpinner();

            if (typeof callback === 'function') {
                callback(err);
            }
        } ]);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Model').Spinner = Spinner;
