/**
Notfier class, wraps around Pines Notify

@module rednose-notifier
**/

/**
Notfier class, wraps around Pines Notify

@class Notifier
@static
**/
var N = Y.namespace('Rednose').Notifier || (Y.namespace('Rednose').Notifier = {});

$.pnotify.defaults.history = false;
$.pnotify.defaults.styling = 'bootstrap';

// -- Public Methods -----------------------------------------------------------

/**
Triggers a notification.

@method notify
@param {Function} fn Function to test.
@static
@public
**/
N.notify = function (notification) {
    $.pnotify(notification);
};
