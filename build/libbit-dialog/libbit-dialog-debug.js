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
});

Dialog.prompt = function (title, question, callback, defaultVal) {
    var node,
        panel;

    if (defaultVal == null) {
        defaultVal = '';
    }

    input = Y.Node.create('<input type="value" value="' + defaultVal + '" />');
    node = Y.Node.create(
        '<div class="icon dialog_prompt_icon"></div>' +
        '<div>' +
        '   <p class="text-question">' + question + '</p>' +
        '   <p class="input-question"></p>' +
        '</div>'
    );
    node.one('.input-question').append(input);

    panel = new Y.Panel({
        bodyContent: node,
        headerContent: title,
        zIndex: Y.all('*').size(),
        width: 500,
        buttons: [
             {
                value  : 'OK',
                section: Y.WidgetStdMod.FOOTER,
                isDefault: true,
                action : function () {
                    if (callback != null) {
                        var value = input.get('value');

                        if (callback(value)) {
                            panel.destroy();
                        }
                    }
                },
                classNames: 'btn btn-primary'
             }, {
                value  : 'Cancel',
                section: Y.WidgetStdMod.FOOTER,
                action : function () {
                    panel.destroy();
                },
                classNames: 'btn'
             }
        ],
        centered: true, modal: true, visible: true, render: true
    });

    panel.get('boundingBox').addClass('libbit-dialog');
    panel.get('boundingBox').all('.yui3-button').each(function() {
        this.removeClass('yui3-button').removeClass('yui3-button-primary');
    });
};

Dialog.confirm = function (title, message, callback, warning, confirmVal) {
    var node,
        panel;

    warning = typeof warning !== 'undefined' ? warning : false;
    confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';

    node = Y.Node.create(
        '<div class="icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '"></div>' +
        '<div><p>' + message + '</p></div>'
    );

    panel = new Y.Panel({
        bodyContent: node,
        headerContent: title,
        zIndex: Y.all('*').size(),
        width: 500,
        buttons: [
             {
                value  : confirmVal,
                section: Y.WidgetStdMod.FOOTER,
                isDefault: true,
                action : function () {
                    if (callback) {
                        callback();
                    }
                    panel.destroy();
                },
                classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-primary')
             }, {
                value  : 'No',
                section: Y.WidgetStdMod.FOOTER,
                isDefault: false,
                action : function () {
                    panel.destroy();
                },
                classNames: 'btn'
             }
        ],
        centered: true, modal: true, visible: true, render: true
    });

    panel.get('boundingBox').addClass('libbit-dialog');
    panel.get('boundingBox').all('.yui3-button').each(function() {
        this.removeClass('yui3-button').removeClass('yui3-button-primary');
    });
};

Dialog.error = function (title, message, warning) {
    var node,
        panel;

    if (warning == null) {
        node = Y.Node.create(
            '<div class="icon dialog_error_icon"></div>' +
            '<div><p class="text-error">' + message + '</p></div>'
        );
    } else {
        node = Y.Node.create(
            '<div class="icon dialog_warning_icon"></div>' +
            '<div><p>' + message + '</p></div>'
        );
    }

    panel = new Y.Panel({
        bodyContent: node,
        headerContent: title,
        zIndex: Y.all('*').size(),
        width: 500,
        buttons: [
             {
                value  : 'OK',
                section: Y.WidgetStdMod.FOOTER,
                isDefault: true,
                action : function () {
                    panel.destroy();
                },
                classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-danger')
             }
        ],
        centered: true, modal: true, visible: true, render: true
    });

    panel.get('boundingBox').addClass('libbit-dialog');
    panel.get('boundingBox').all('.yui3-button').each(function() {
        this.removeClass('yui3-button').removeClass('yui3-button-primary');
    });
};

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
