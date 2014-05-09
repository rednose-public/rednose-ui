/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the `Y.Rednose.Plugin.Timepicker` Node plugin.
 *
 * @module rednose-datetimepicker
 */

Y.namespace('Rednose.Plugin').Timepicker = Y.Base.create('timepicker', Y.Base, [Y.Plugin.Base], {
    // -- Protected Properties--------------------------------------------------

    _element: null,

    // -- Life Cycle Methods ---------------------------------------------------

    initializer: function (config) {
        this._host = config.host;

        var lang = Y.config.lang || null;
        var element = $(this._host.getDOMNode());

        element.datetimepicker({
            pickTime: true,
            language: lang
        });

        this._element = element.data('datetimepicker');

        // Force a refresh
        this._element.setDate(
            this._element.getDate()
        );
    },

    _getDate: function () {
        return this._element.getDate();
    },

    _setDate: function (date) {
        this._element.setDate(date);

        return date;
    }
}, {
    NS: 'timepicker',

    ATTRS: {
        date: {
            value: null,
            getter: '_getDate',
            setter: '_setDate'
        }
    }
});
