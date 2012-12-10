YUI.add('libbit-dialog', function (Y, NAME) {

/* Dialog class constructor */
function Dialog(config) {
    Dialog.superclass.constructor.apply(this, arguments);
}

/*
 * Required NAME static field, to identify the Widget class and
 * used as an event prefix, to generate class names etc. (set to the
 * class name in camel case).
 */
Dialog.NAME = 'dialog';

/*
 * The attribute configuration for the Dialog widget. Attributes can be
 * defined with default values, get/set functions and validator functions
 * as with any other class extending Base.
 */
Dialog.ATTRS = {
    // An error object
    error : {
        value: null
    }
};

Y.extend(Dialog, Y.Widget, {
    // Methods/properties to add to the prototype of the new class
    callback: null,

    callbackCancel: null,

    wHandleCollection: [],

    initializer: function () {
        // Bind the error attribute change event
        this.after('errorChange', this._setError, this);
    },

    /**
     * Gets triggered after the 'error' attribute changes. Renders an
     * error message at a given property path.
     */
    _setError: function (e) {
        var error = e.newVal,
            bb    = this.panel.panelObject.get('boundingBox'),
            input;

        // Remove any previous error message
        bb.all('.control-group').each(function (node) {
            if (node.hasClass('error')) {
                node.removeClass('error');
            }

            node.all('.help-block').remove();
        });

        // Append the message node at the given path
        input = bb.one('[data-path=' + error.path + ']');
        input.ancestor('.control-group').addClass('error');
        input.get('parentNode').append('<span class="help-block">' + error.message + '</span>');

        input.focus();
    },

    /**
     * Hide the active panel
     */
    hide: function() {
        this.panel.panelObject.destroy();
    },

    message: function (message, warningMode, callback, headerTitle) {
        if (typeof warningMode === 'undefined') { warningMode = false; }
        if (typeof callback === 'undefined') { callback = function () {}; }

        this.callback = callback;

        if (headerTitle === null) {
            headerTitle = 'Message';
        }

        this.panel('message', message, headerTitle);

        if (warningMode === true) {
            this.panel.MessageNode
                .get('parentNode').one('div.dialog_message_icon')
                .removeClass('dialog_message_icon')
                .addClass('dialog_warning_icon');
        }
    },

    prompt: function (content, fieldName, initialValue, callback, callbackCancel, headerTitle, buttonTitle) {
        var self = this;

        if (typeof callback === 'undefined') { callback = function () {}; }
        if (typeof callbackCancel === 'undefined') { callbackCancel = function () {}; }

        this.callback = callback;
        this.callbackCancel = callbackCancel;

        if (headerTitle === null) {
            headerTitle = 'Question';
        }

        if (Y.Lang.isUndefined(buttonTitle)) {
            buttonTitle = 'Confirm';
        }

        this.panel('prompt', '...', headerTitle, buttonTitle);

        this.panel.MessageNode.set('innerHTML',
            '<div class="form-horizontal">' +
            '<div class="control-group">' +
            '<label class="control-label" for="promptInput">' + fieldName + '</label>' +
            '<div class="controls">' +
            '<input data-path="' + fieldName.toLowerCase() + '" type="text" id="promptInput" value="' + initialValue + '"/>' +
            '</div>' +
            '</div>' +
            '</div>'
        );

        this.panel.MessageNode.one('input').focus().select();

        this.panel.MessageNode.one('input').on('keyup', function (e) {
            if (e.button === 13) {
                self.callback(
                    self.panel.MessageNode.one('input').get('value')
                );
            }
        });
    },

    errorMessage: function (errJSON, callback) {
        var errHTML = '',
            err     = Y.JSON.parse(errJSON);

        if (typeof callback === 'undefined') { callback = function () {}; }

        this.callback = callback;

        errHTML =
            '<div class="dialog_error">' + err.message + '</div>' +
            '<div class="dialog_path">Source: ' + err.path + '</div>';

        this.panel('error', errHTML, 'Error');
    },

    confirm: function (message, callback, callbackCancel, headerTitle, buttonTitle, warningMode) {
        if (typeof warningMode === 'undefined') { warningMode = false; }
        if (typeof callback === 'undefined') { callback = function () {}; }
        if (typeof callbackCancel === 'undefined') { callbackCancel = function () {}; }

        this.callback = callback;
        this.callbackCancel = callbackCancel;

        if (headerTitle === null) {
            headerTitle = 'Question';
        }

        if (Y.Lang.isUndefined(buttonTitle)) {
            buttonTitle = 'Confirm';
        }

        this.panel('confirm', message, headerTitle, buttonTitle);

        if (warningMode === true) {
            this.panel.MessageNode
                .get('parentNode').one('div.dialog_confirm_icon')
                .removeClass('dialog_confirm_icon')
                .addClass('dialog_warning_icon');
        }
    },

    window: function (windowHandle, title, height, width, content, uri, buttons) {
        var container = Y.Node.create('<div class="libbit-dialog-window" />'),
            body      = Y.Node.create('<div class="yui3-widget-bd"></div>'),
            dialogDispatcher;

        container.append(body);

        if (typeof (content) === 'string') {
            body.setHTML(content);
        } else if (typeof (content) === 'object' && content !== null) {
            body.setContent(content);
        } else if (typeof (uri) === 'string') {
            dialogDispatcher = Y.Node.create('<div class="libbit-dialog-window-wrapper">Loading...</div>');

            body.appendChild(dialogDispatcher);

            new Y.Dispatcher({
                node: dialogDispatcher,
                ioConfig: {
                    method: 'GET'
                }
            }).set('uri',  uri);
        }

        this.Window.panelObject = new Y.Panel({
            srcNode: container,
            headerContent: title,
            width: width,
            height: height,
            zIndex: parseInt(Y.all('*').size(), 10),
            centered: true,
            modal: true,
            visible: false,
            render: true,
            buttons: buttons
        });

        //this.wHandleCollection[windowHandle] = this.Window.panelObject;

        /*for (i in buttons) {
            var skipCallback = false;

            this.Window.panelObject.addButton({
                value     : buttons[i].title,
                isDefault : buttons[i].isDefault,
                section   : Y.WidgetStdMod.FOOTER,
                classNames: ['dButton_' + i],
                action    : function (e) {
                    var currentClass = e.currentTarget._node.getAttribute('class').split(' ');

                    for (x in currentClass) {
                        if (currentClass[x].indexOf('dButton_') > -1) {
                            if (typeof (buttons[i].callbackClose) === 'boolean') {
                                if (buttons[i].callbackClose === true) {
                                    this.wHandleCollection[windowHandle].hide();

                                    skipCallback = true;
                                }
                            }

                            if (skipCallback === false) {
                                buttons[parseInt(currentClass[x].replace('dButton_', ''), 10)].callback(
                                    this.DialogHandleCollection[windowHandle],
                                    container
                                );
                            }
                        }
                    }
                }
            });
        }*/

        this.Window.panelObject.show();
        /*this.Window.panelObject.on('visibleChange', function () {
            for (i in buttons) {
                if (typeof (buttons[i].callbackClose) === 'boolean') {
                    if (buttons[i].callbackClose === true) {
                        buttons[i].callback(
                            this.wHandleCollection[windowHandle],
                            container
                        );
                    }
                }
            }
        });*/

        return this.Window.panelObject;
    },

    panel: function (type, message, headerTitle, buttonTitle) {
        var self = this,
            bodyNode = Y.Node.create('<div/>'),
            buttons;

        if (Y.Lang.isUndefined(buttonTitle)) {
            buttonTitle = 'Confirm';
        }

        bodyNode.appendChild(Y.Node.create(
            '<div class="yui3-widget-bd">' +
            '<div class="icon dialog_' + type + '_icon"></div>' +
            '<div>' + message + '</div>' +
            '</div>'
        ));

        buttons = [
            {
                value  : 'Cancel',
                section: Y.WidgetStdMod.FOOTER,
                action : function (e) {
                    self.panel.panelObject.hide();
                    self.callbackCancel();
                }
            }
        ];

        if (type === 'confirm' || type === 'prompt') {
            buttons.push({
                value  : buttonTitle,
                section: Y.WidgetStdMod.FOOTER,
                isDefault: true,
                action : function (e) {
                    if (type === 'prompt') {
                        self.callback(
                            self.panel.MessageNode.one('input').get('value')
                        );
                    } else {
                        self.callback();
                    }
                }
            });
        }

        this.panel.panelObject = new Y.Panel({
            srcNode: bodyNode,
            headerContent: headerTitle,
            zIndex: Y.all('*').size(),
            width: 500,
            centered: true,
            modal: true,
            visible: false,
            render: true,
            buttons: buttons
        });

        this.panel.MessageNode = bodyNode.one('div.yui3-widget-bd');
        this.panel.MessageNode.setStyle('max-height', '400px');

        this.panel.panelObject.get('boundingBox').addClass('libbit-dialog');

        this.panel.panelObject.show();

        /*this.panel.panelObject.on('visibleChange', function () {
            if ((type === 'error' || type === 'message' || type === 'warning') && typeof (this.callback) === 'function') {
                this.callback();
            }
        });*/
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Dialog = Dialog;


}, '1.0.0', {
    "requires": [
        "dd",
        "dd-plugin",
        "gallery-dispatcher",
        "json-parse",
        "node",
        "panel",
        "widget"
    ],
    "skinnable": true
});
