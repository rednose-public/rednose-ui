/*jshint boss:true, expr:true, onevar:false */

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
        return label.substr(0, 12) + '…' + label.substr(label.length - 12, label.length);
    }

    return label;
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Util = Util;
