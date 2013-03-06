
Dialog = Y.Base.create('dialog', Y.Widget, [], {


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
        input.get('parentNode').append('<span class="help-block">' + error.message + '</span>');

        input.focus();
    },

    /**
     * Hide the active panel
     */
    hide: function() {
        this.get('panel').destroy();
    },

    prompt: function (title, question, defaultVal, callback, htmlTemplate, confirmVal) {
        var self = this,
            node,
            panel;

        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';

        if (defaultVal == null) {
            defaultVal = '';
        }

        if (htmlTemplate) {
            if (typeof(htmlTemplate) == 'string') {
                input = Y.Node.create(htmlTemplate);
            } else {
                input = htmlTemplate;
            }

            node = Y.Node.create('<form action="#" class="form-horizontal"></form>');
            node.append(input);
        } else {
            input = Y.Node.create('<input type="text" value="' + defaultVal + '" id="input">');

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
            hideOn: [],
            headerContent: title,
            zIndex: Y.all('*').size(),
            width: 500,
            buttons: [
                 {
                    value  : 'Cancel',
                    section: Y.WidgetStdMod.FOOTER,
                    action : function () {
                        panel.destroy();
                    },
                    classNames: 'btn'
                 }, {
                    value  : confirmVal,
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: true,
                    action : function () {
                        if (callback != null) {
                            if (callback(node) === true) {
                                panel.destroy();
                            }
                        }
                    },
                    classNames: 'btn btn-primary'
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        node.one('input,textarea,select').focus();
        node.all('input, textarea, select').on('keyup', function(e) {
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
        var node,
            panel;

        warning = typeof warning !== 'undefined' ? warning : false;
        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';

        node = Y.Node.create(
            '<div class="icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '"></div>' +
            '<div><p>' + message + '</p></div>'
        );

        panel = new Y.Libbit.Panel({
            bodyContent: node,
            hideOn: [],
            headerContent: title,
            zIndex: Y.all('*').size(),
            width: 500,
            buttons: [
                 {
                    value  : 'Cancel',
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: false,
                    action : function () {
                        panel.destroy();
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
                        panel.destroy();
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
        var node,
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
            hideOn: [],
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
        panel: { value: null}
    }
});

Dialog.confirm = function (title, message, callback, warning, confirmVal) {
    var dialog = new Dialog;

    dialog.confirm(title, message, callback, warning, confirmVal);
}

Dialog.error = function (title, message, warning) {
    var dialog = new Dialog;

    dialog.error(title, message, warning);
}

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Dialog = Dialog;
