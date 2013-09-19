/*jshint expr:true, onevar:false */

/**
Provides several dialog windows.

@module rednose-dialog
**/
var CSS_WIDGET = 'rednose-widget',
    CSS_DIALOG = 'rednose-dialog',

    CSS_BOOTSTRAP_PULL_RIGHT  = 'pull-right',
    CSS_BOOTSTRAP_BTN         = 'btn',
    CSS_BOOTSTRAP_BTN_WARNING = 'btn-warning',
    CSS_BOOTSTRAP_BTN_PRIMARY = 'btn-primary',
    CSS_BOOTSTRAP_BTN_DANGER  = 'btn-danger',

    TEXT_CONFIRM = 'OK',
    TEXT_CANCEL  = 'Cancel';

/**
Provides several dialog windows.

@class Dialog
@namespace Rednose
@constructor
@extends Widget
**/
var Dialog = Y.Base.create('dialog', Y.Widget, [], {

    // -- Lifecycle Methods ----------------------------------------------------

    /**
    @method initializer
    @protected
    **/
    initializer: function () {
        var self = this;

        // Bind the error attribute change event
        this.after('errorChange', this._setError, this);

        Y.on('keydown', function (e) { if (e.keyCode === 27) { self.destroy(); }});
    },

    /**
    @method destructor
    @protected
    **/
    destructor : function() {
        this.get('panel') && this.get('panel').destroy();
    },

    // -- Public Methods -------------------------------------------------------

    /**
    Shows a basic `alert` dialog.

    @method prompt
    @public
    **/
    alert: function (title, message, warning) {
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

        panel = new Y.Rednose.Panel({
            bodyContent: node,
            headerContent: title,
            zIndex: Y.all('*').size(),
            width: this.get('width'),
            buttons: [
                 {
                    value  : TEXT_CONFIRM,
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: true,
                    action : function () {
                        self.destroy();
                    },
                    classNames: 'btn ' + (warning ? CSS_BOOTSTRAP_BTN_WARNING : CSS_BOOTSTRAP_BTN_DANGER)
                 }
            ]
        }).render();

        this._setPanelStyle(panel);
        this.set('panel', panel);
    },

    /**
    Shows a basic `confirm` dialog.

    @method prompt
    @public
    **/
    confirm: function (title, message, callback, warning, confirmVal) {
        var self = this,
            node,
            panel;

        warning = typeof warning !== 'undefined' ? warning : false;
        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : TEXT_CONFIRM;

        node = Y.Node.create(
            '<div class="icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '"></div>' +
            '<div><p>' + message + '</p></div>'
        );

        panel = new Y.Rednose.Panel({
            bodyContent: node,
            headerContent: title,
            zIndex: Y.all('*').size(),
            width: this.get('width'),
            buttons: [
                 {
                    value  : TEXT_CANCEL,
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: false,
                    action : function () {
                        self.destroy();
                    },
                    classNames: CSS_BOOTSTRAP_BTN
                 },
                 {
                    value  : confirmVal,
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: true,
                    action : function () {
                        if (callback) {
                            callback();
                        }
                        self.destroy();
                    },
                    classNames: CSS_BOOTSTRAP_BTN + ' ' + (warning ? CSS_BOOTSTRAP_BTN_WARNING : CSS_BOOTSTRAP_BTN_PRIMARY)
                 }
            ]
        }).render();

        this._setPanelStyle(panel);
        this.set('panel', panel);
    },

    /**
    Shows a basic `prompt` dialog.

    @method prompt
    @public
    **/
    prompt: function (title, question, defaultVal, callback, htmlTemplate, confirmVal) {
        var self = this,
            node,
            panel;

        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : TEXT_CONFIRM;

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

        panel = new Y.Rednose.Panel({
            bodyContent: node,
            headerContent: title,
            zIndex: Y.all('*').size(),
            width: this.get('width'),
            buttons: [
                 {
                    value  : TEXT_CANCEL,
                    section: Y.WidgetStdMod.FOOTER,
                    action : function () {
                        self.destroy();
                    },
                    classNames: CSS_BOOTSTRAP_BTN
                 },
                 {
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
                    classNames: CSS_BOOTSTRAP_BTN + ' ' + CSS_BOOTSTRAP_BTN_PRIMARY
                 }
            ]
        }).render();

        node.one('input,textarea,select').focus().select();
        node.one('input,textarea,select').on('keyup', function(e) {
            if (e.button === 13) {
                var buttons = panel.get('buttons');

                Y.Array.each(buttons.footer, function (button) {
                    if (button.hasClass(CSS_BOOTSTRAP_BTN_PRIMARY)) {
                        button.simulate('click');
                    }
                });
            }
        });

        this._setPanelStyle(panel);
        this.set('panel', panel);
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    @method _setPanelStyle
    @param {Rednose.Panel} panel
    @protected
    **/
    _setPanelStyle: function (panel) {
        var boundingBox = panel.get('boundingBox');

        boundingBox.addClass(CSS_WIDGET);
        boundingBox.addClass(CSS_DIALOG);

        boundingBox.one('.yui3-widget-buttons').addClass(CSS_BOOTSTRAP_PULL_RIGHT);

        boundingBox.all('.yui3-button').each(function (button) {
            button.removeClass('yui3-button').removeClass('yui3-button-primary');
        });
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
    Gets triggered after the 'error' attribute changes. Renders an
    error message at a given property path.

    @method _setError
    @param {EventFacade} e Event
    @protected
    **/
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
    }
}, {
    ATTRS: {
        error: { value: {} },
        panel: { value: null },
        width: { value: 500 }
    }
});

/**
Static wrapper for the `alert` method

@method alert
@static
@return {Rednose.Dialog}
**/
Dialog.alert = function (title, message, warning) {
    var dialog = new Dialog();

    dialog.alert(title, message, warning);

    return dialog;
};

/**
Static wrapper for the `confirm` method

@method confirm
@static
@return {Rednose.Dialog}
**/
Dialog.confirm = function (title, message, callback, warning, confirmVal) {
    var dialog = new Dialog();

    dialog.confirm(title, message, callback, warning, confirmVal);

    return dialog;
};

/**
Static wrapper for the `confirm` method

@method prompt
@static
@return {Rednose.Dialog}
**/
Dialog.prompt = function (title, question, defaultVal, callback, htmlTemplate, confirmVal) {
    var dialog = new Dialog();

    dialog.confirm(title, message, callback, warning, confirmVal);

    return dialog;
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Dialog = Dialog;
