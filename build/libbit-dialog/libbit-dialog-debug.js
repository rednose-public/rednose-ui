YUI.add('libbit-dialog', function (Y, NAME) {

var Dialog;

Dialog = Y.Base.create('dialog', Y.Widget, [], {

    initializer: function () {
        var self = this;

        // Bind the error attribute change event
        this.after('errorChange', this._setError, this);

        Y.on('keydown', function (e) { if (e.keyCode === 27) { self.destroy(); }});
    },

    destructor : function() {
        this.get('panel') && this.get('panel').destroy();
    },

    /**
     * Gets triggered after the 'error' attribute changes. Renders an
     * error message at a given property path.
     */
    _setError: function (e) {
        var error = e.newVal,
            bb    = this.get('panel').get('boundingBox'),
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

        if (error.message) {
            input.get('parentNode').append('<span class="help-block">' + error.message + '</span>');
        }

        input.focus();
    },

    /**
     * Hide the active panel
     */
    hide: function() {
        this.destroy();
    },

    prompt: function (title, question, defaultVal, callback, htmlTemplate, confirmVal) {
        var self = this,
            node,
            panel;

        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';

        if (defaultVal === null) {
            defaultVal = '';
        }

        if (htmlTemplate) {
            if (typeof(htmlTemplate) === 'string') {
                input = Y.Node.create(htmlTemplate);
            } else {
                input = htmlTemplate;
            }

            node = Y.Node.create('<form action="#" class="form-horizontal"></form>');
            node.append(input);
        } else {
            input = Y.Node.create('<input type="text" value="' + defaultVal + '" data-path="input" id="input">');

            node = Y.Node.create(
                '<form action="#" class="form-horizontal">' +
                '   <div class="icon icon_absolute dialog_prompt_icon"></div>' +
                '   <div class="control-group">' +
                '       <label for="input" class="control-label">' + question +  '</label>' +
                '       <div class="controls"></div>' +
                '   </div>' +
                '</form>'
            );
            node.one('.controls').append(input);
        }

        panel = new Y.Libbit.Panel({
            bodyContent: node,
            headerContent: title,
            zIndex: Y.all('*').size(),
            width: this.get('width'),
            buttons: [
                 {
                    value  : 'Cancel',
                    section: Y.WidgetStdMod.FOOTER,
                    action : function () {
                        self.destroy();
                    },
                    classNames: 'btn'
                 }, {
                    value  : confirmVal,
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: true,
                    action : function () {
                        if (callback !== null) {
                            if (callback(node) === true) {
                                self.destroy();
                            }
                        }
                    },
                    classNames: 'btn btn-primary'
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        node.one('input,textarea,select').focus().select();
        node.one('input,textarea,select').on('keyup', function(e) {
            if (e.button === 13) {
                var buttons = panel.get('buttons');

                for (var i in buttons.footer) {
                    var button = buttons.footer[i];

                    if (button.hasClass('btn-primary')) {
                        button.simulate('click');
                    }
                }
            }
        });

        panel.get('boundingBox').addClass('libbit-dialog');
        panel.get('boundingBox').all('.yui3-button').each(function() {
            this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        this.set('panel', panel);
    },

    confirm: function (title, message, callback, warning, confirmVal) {
        var self = this,
            node,
            panel;

        warning = typeof warning !== 'undefined' ? warning : false;
        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';

        node = Y.Node.create(
            '<div class="icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '"></div>' +
            '<div><p>' + message + '</p></div>'
        );

        panel = new Y.Libbit.Panel({
            bodyContent: node,
            headerContent: title,
            zIndex: Y.all('*').size(),
            width: this.get('width'),
            buttons: [
                 {
                    value  : 'Cancel',
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: false,
                    action : function () {
                        self.destroy();
                    },
                    classNames: 'btn'
                 }, {
                    value  : confirmVal,
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: true,
                    action : function () {
                        if (callback) {
                            callback();
                        }
                        self.destroy();
                    },
                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-primary')
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        panel.get('boundingBox').addClass('libbit-dialog');
        panel.get('boundingBox').all('.yui3-button').each(function() {
            this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        this.set('panel', panel);
    },

    error: function (title, message, warning) {
        var self = this,
            node,
            panel;

        if (warning) {
            node = Y.Node.create(
                '<div class="icon dialog_warning_icon"></div>' +
                '<div><p>' + message + '</p></div>'
            );
        } else {
            node = Y.Node.create(
                '<div class="icon dialog_error_icon"></div>' +
                '<div><p>' + message + '</p></div>'
            );
        }

        panel = new Y.Libbit.Panel({
            bodyContent: node,
            headerContent: title,
            zIndex: Y.all('*').size(),
            width: this.get('width'),
            buttons: [
                 {
                    value  : 'OK',
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: true,
                    action : function () {
                        self.destroy();
                    },
                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-danger')
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        panel.get('boundingBox').addClass('libbit-dialog');
        panel.get('boundingBox').all('.yui3-button').each(function() {
            this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        this.set('panel', panel);
    }
}, {
    ATTRS: {
        error: { value: {} },
        panel: { value: null },
        width: { value: 500 }
    }
});

Dialog.confirm = function (title, message, callback, warning, confirmVal) {
    var dialog = new Dialog();

    dialog.confirm(title, message, callback, warning, confirmVal);

    return dialog;
};

Dialog.error = function (title, message, warning) {
    var dialog = new Dialog();

    dialog.error(title, message, warning);

    return dialog;
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Dialog = Dialog;


}, '1.0.0', {
    "requires": [
        "dd",
        "dd-plugin",
        "json-parse",
        "node",
        "node-event-simulate",
        "libbit-panel",
        "widget"
    ],
    "skinnable": true
});
