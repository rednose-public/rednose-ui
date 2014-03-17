/*jshint boss:true, expr:true, onevar:false */

var ELLIPSIS = '…';

function Util() {}

/**
 * Adds ellipsis to the center of a string.
 *
 * @param {String} label
 * @returns {String}
 * @static
 */
Util.formatLabel = function (label) {
    if (label.length > 24) {
        return label.substr(0, 12) + ELLIPSIS + label.substr(label.length - 12, label.length);
    }

    return label;
};

/**
 * Formats a date.
 *
 * @param {Date} date
 * @returns {String}
 * @static
 */
Util.formatDateTime = function (date) {
    return Y.Date.format(date, {format: '%x %R' });
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Util = Util;
