/*jshint expr:true, onevar:false */

/**
 * Provides several dialog windows.
 *
 * @module rednose-dialog
 */

/**
 * Provides several dialog windows.
 *
 * @class Dialog
 * @namespace Rednose
 * @constructor
 * @extends Base
 */

/**
 * Fired when the dialog is closed by clicking the cancel button, the close button
 * or by pressing 'escape'.
 *
 * @event cancel
 */
var EVT_CANCEL = 'cancel';

/**
 * Fired when the dialog is confirmed, either by clicking the confirm button
 * or pressing `enter`.
 *
 * @event confirm
 */
var EVT_CONFIRM = 'confirm';

/**
 * Fired when an alternative option is chosen by clicking the alternative button.
 *
 * @event alternative
 */
var EVT_ALTERNATIVE = 'alternative';

var Dialog = Y.Base.create('dialog', Y.Base, [], {

    /**
     * @property classNames
     * @type {Object}
     */
    classNames: {
        dialog: 'rednose-dialog',
        close : 'close'
    },

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this.publish(EVT_CANCEL,      {emitFacade: false});
        this.publish(EVT_CONFIRM,     {emitFacade: false});
        this.publish(EVT_ALTERNATIVE, {emitFacade: false});

        // Bind the error attribute change event.
        this.after('errorChange', this._setError, this);
    },

    destructor : function() {
        this.panel   && this.panel.destroy();
        this.toolbar && this.toolbar.destroy();
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Shows a basic `alert` dialog.
     *
     * @param {Object} [options] The following options can be specified:
     *   @param {String} [options.title] The dialog title.
     *   @param {String} [options.text] The dialog body text.
     *   @param {String} [options.type] The dialog type (the confirm button-type is mapped to this value).
     *   @param {String} [options.confirm] The confirm button value.
     *   @param {Object} [options.on] Event handlers.
     *   @param {Function} callback Optional callback function.
     * @public
     */
    alert: function (options, callback) {
        options || (options = {});

        var dialog = this;

        options = Y.mix(options, {
            title  : '',
            text   : '',
            type   : 'primary',
            confirm: this.get('strings.confirm')
        });

        options.on && this.on(options.on);

        if (typeof callback === 'function') {
            this.on('confirm', callback);
        }

        this.toolbar = new Y.Rednose.Toolbar({
            groups: [
                {
                    position: 'right',
                    buttons: [
                        {id: 'confirm', value: options.confirm, type: options.type}
                    ]
                }
            ]
        }).render();

        this.toolbar.on('click#confirm', this._onClickConfirm, this, dialog);

        this.panel = new Y.Rednose.Panel({
            bodyContent  : Y.Node.create('<div><p>' + options.text + '</p></div>'),
            headerContent: this._getHeaderContent(options.title),
            zIndex       : this._getHighzIndex(),
            width        : this.get('width'),
            footerContent: this.toolbar.get('container'),
            buttons      : null
        }).render();

        this.panel.get('boundingBox').on('keydown', this._onPanelKeydown, this);
        this.panel.get('boundingBox').addClass(this.classNames.dialog);
        this.panel.set('zIndex', this._getHighzIndex());

        this.panel.get('boundingBox').one('#confirm').focus();
    },

    /**
     * Shows a basic `confirm` dialog.
     *
     * @param {Object} [options] The following options can be specified:
     *   @param {String} [options.title] The dialog title.
     *   @param {String} [options.text] The dialog body text.
     *   @param {String} [options.type] The dialog type (the confirm button-type is mapped to this value).
     *   @param {String} [options.confirm] The confirm button value.
     *   @param {String} [options.cancel] The cancel button value.
     *   @param {String} [options.alternative] Alternative button.
     *   @param {Object} [options.on] Event handlers.
     *   @param {Function} callback Optional callback function.
     * @public
     */
    confirm: function (options, callback) {
        options || (options = {});

        var dialog = this,
            groups;

        options = Y.mix(options, {
            title  : '',
            text   : '',
            type   : 'primary',
            confirm: this.get('strings.confirm'),
            cancel : this.get('strings.cancel')
        });

        options.on && this.on(options.on);

        if (typeof callback === 'function') {
            this.on('confirm', callback);
        }

        groups = [
            {
                position: 'right',
                buttons: [
                    {id: 'confirm', value: options.confirm, type: options.type}
                ]
            },
            {
                position: 'right',
                buttons: [
                    {id: 'cancel', value: options.cancel}
                ]
            }
        ];

        if (options.alternative) {
            groups.push({
                position: 'left',
                buttons: [
                    {id: 'alternative', value: options.alternative}
                ]
            });
        }

        this.toolbar = new Y.Rednose.Toolbar({groups: groups}).render();

        this.toolbar.on('click#confirm', this._onClickConfirm, this, dialog);
        this.toolbar.on('click#cancel', this._onClickCancel, this, dialog);

        if (options.alternative) {
            this.toolbar.on('click#alternative', this._onClickAlternative, this, dialog);
        }

        this.panel = new Y.Rednose.Panel({
            bodyContent  : Y.Node.create('<div><p>' + options.text + '</p></div>'),
            headerContent: this._getHeaderContent(options.title),
            zIndex       : this._getHighzIndex(),
            width        : this.get('width'),
            footerContent: this.toolbar.get('container'),
            buttons      : null
        }).render();

        this.panel.get('boundingBox').on('keydown', this._onPanelKeydown, this);
        this.panel.get('boundingBox').addClass(this.classNames.dialog);
        this.panel.set('zIndex', this._getHighzIndex());

        this.panel.get('boundingBox').one('#confirm').focus();
    },

    /**
     * Shows a basic `prompt` dialog.
     *
     * @param {Object} [options] The following options can be specified:
     *   @param {String} [options.title] The dialog title.
     *   @param {String} [options.text] The dialog body text.
     *   @param {String} [options.dataPath] The field data-path for error reporting.
     *   @param {String} [options.type] The dialog type (the confirm button-type is mapped to this value).
     *   @param {String} [options.confirm] The confirm button value.
     *   @param {String} [options.cancel] The cancel button value.
     *   @param {String} [options.value] The default field value, optional.
     *   @param {String} [options.html] An HTML template to render, optional.
     *   @param {String} [options.alternative] Alternative button.
     *   @param {Object} [options.on] Event handlers.
     * @param {Function} callback Optional callback function, closes the the dialog when it returns `true`.
     * @public
     */
    prompt: function (options, callback) {
        options || (options = {});

        var self   = this,
            dialog = this,
            node,
            groups;

        options = Y.mix(options, {
            title   : '',
            text    : '',
            dataPath: 'input',
            type    : 'primary',
            confirm : this.get('strings.confirm'),
            cancel  : this.get('strings.cancel'),
            value   : '',
            html    : null
        });

        if (options.html) {
            node = (typeof options.html  === 'string') ?
                           Y.Node.create(options.html) : options.html;
        } else {
            var input = Y.Node.create('<input type="text" value="' + options.value + '" data-path="' + options.dataPath + '" id="dialog-input">');

            node = Y.Node.create(
                '<form class="form-horizontal">' +
                '   <div class="control-group">' +
                '       <label for="input" class="control-label">' + options.text +  '</label>' +
                '       <div class="controls"></div>' +
                '   </div>' +
                '</form>'
            );

            node.one('.controls').append(input);
        }

        options.on && this.on(options.on);

        if (typeof callback === 'function') {
            this.on('confirm', callback);
        }

        groups = [
            {
                position: 'right',
                buttons: [
                    {id: 'confirm', value: options.confirm, type: options.type}
                ]
            },
            {
                position: 'right',
                buttons: [
                    {id: 'cancel', value: options.cancel}
                ]
            }
        ];

        if (options.alternative) {
            groups.push({
                position: 'left',
                buttons: [
                    {id: 'alternative', value:options.alternative}
                ]
            });
        }

        this.toolbar = new Y.Rednose.Toolbar({groups: groups}).render();

        this.toolbar.on('click#confirm', this._onClickConfirm, this, node, dialog);
        this.toolbar.on('click#cancel', this._onClickCancel, this, dialog);

        if (options.alternative) {
            this.toolbar.on('click#alternative', this._onClickAlternative, this, dialog);
        }

        this.panel = new Y.Rednose.Panel({
            bodyContent  : node,
            headerContent: this._getHeaderContent(options.title),
            zIndex       : this._getHighzIndex(),
            width        : this.get('width'),
            footerContent: this.toolbar.get('container'),
            buttons      : null
        }).render();

        // Prevent default on keydown and keyup due to browser differences.
        node.all('input, textarea, select').on('keydown', function (e) {
            if (e.button === 13) {
                e.preventDefault();
            }
        });

        node.all('input, textarea, select').on('keyup', function (e) {
            if (e.button === 13) {
                e.preventDefault();

                self.toolbar.fire('click#confirm');
            }
        });

        this.panel.get('boundingBox').on('keydown', this._onPanelKeydown, this);
        this.panel.get('boundingBox').addClass(this.classNames.dialog);
        this.panel.set('zIndex', this._getHighzIndex());

        this._focusInput();
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * @return void
     * @protected
     */
    _focusInput: function () {
        var inputControlContainer = this.panel.get('boundingBox').one('.controls'),
            inputField = inputControlContainer ? inputControlContainer.one('input, textarea, select') : null;

        if (inputField) {
            // Select the input value so it can instantly be overtyped.
            inputField.focus();
            inputField.select();
        }
    },

    /**
     * @param {String} title
     * @return {Node}
     * @protected
     */
    _getHeaderContent: function (title) {
        var self = this,
            header;

        // Keep the close button fixed and let the header fill the rest of the line.
        header = Y.Node.create('<div style="width: 100%;">' +
                                   '<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' +
                                       title +
                                   '</div>' +
                               '</div>'
        );

        header.prepend(Y.Node.create('<div style="float: right; white-space: nowrap;">' +
                                        '<button class="' + this.classNames.close + '">&times;</button>' +
                                    '</div>'
        ));

        header.one('.' + this.classNames.close).on('click', function () {
            self.destroy();
        });

        return header;
    },

    /**
     * @return {Number}
     * @protected
     */
    _getHighzIndex: function () {
        var elements = document.getElementsByTagName('*');
        var highIndex = 0;

        for (var i = 0; i < elements.length - 1; i++) {
            if (parseInt(elements[i].style.zIndex, 10) > highIndex) {
                highIndex = parseInt(elements[i].style.zIndex, 10);
            }
        }

        return highIndex + 1;
    },

    /**
     * Fires an event and destroys the dialog if no handlers return false.
     *
     * @param {String} eventName
     * @param {Any} [arg*] 0..n Arguments to pass to the subscribers.
     * @protected
     */
    _evt: function() {
        if (this.fire.apply(this, arguments)) {
            this.destroy();
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * Gets triggered after the 'error' attribute changes. Renders an
     * error message at a given property path.
     *
     * @param {EventFacade} e Event
     * @protected
     */
    _setError: function (e) {
        var errors = e.newVal,
            bb     = this.panel.get('boundingBox');

        // Remove any previous error message
        bb.all('.control-group').each(function (node) {
            if (node.hasClass('error')) {
                node.removeClass('error');
            }

            node.all('.help-block').remove();
        });

        if (!Y.Lang.isArray(errors)) {
            errors = [errors];
        }

        Y.each(errors, function(error) {
            // Append the message node at the given path (defaults to 'input')
            var input = bb.one('[data-path=' + (error.path || 'input') + ']');
            input.ancestor('.control-group').addClass('error');

            if (error.message) {
                input.get('parentNode').append('<span class="help-block">' + error.message + '</span>');
            }
        });

        var control = bb.one('.error').one('input, textarea, select');

        if (control) {
            control.focus();
            control.select();
        }
    },

    _onPanelKeydown: function (e) {
        var dialog = this;

        if (e.keyCode === 27) {
            e.stopPropagation();
            this._evt(EVT_CANCEL, dialog);
        }
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @param {Any} [arg*] 0..n Arguments to pass to the subscribers.
     */
    _onClickCancel: function () {
        var args = arguments;

        args[0] = EVT_CANCEL;
        this._evt.apply(this, args);
    },

    /**
     * @param {EventFacade} e
     * @param {Any} [arg*] 0..n Arguments to pass to the subscribers.
     */
    _onClickConfirm: function () {
        var args = arguments;

        // If there is no custom HTML set, return the value in string form.
        if (typeof(args[1].one) === 'function') {
            if (args[1].one('#dialog-input')) {
                args[1] = args[1].one('#dialog-input').get('value');
            }
        }

        args[0] = EVT_CONFIRM;
        this._evt.apply(this, args);
    },

    /**
     * @param {EventFacade} e
     * @param {Any} [arg*] 0..n Arguments to pass to the subscribers.
     */
    _onClickAlternative: function () {
        var args = arguments;

        args[0] = EVT_ALTERNATIVE;
        this._evt.apply(this, args);
    }
}, {
    ATTRS: {
        /**
         * Translation dictionary used by the Rednose.Dialog module.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            valueFn: function () {
                return Y.Intl.get('rednose-dialog');
            }
        },

        /**
         * @attribute error
         * @type {Object}
         */
        error: {
            value: null
        },

        /**
         * @attribute width
         * @type {Number}
         * @initOnly
         */
        width: {
            value: 500,
            writeOnce: 'initOnly'
        }
    }
});

/**
 * Static wrapper for the `alert` method
 *
 * @static
 * @param {Object} options
 * @param {Function} callback
 * @return {Rednose.Dialog}
 */
Dialog.alert = function (options, callback) {
    var dialog = new Dialog();

    dialog.alert(options, callback);

    return dialog;
};

/**
 * Static wrapper for the `confirm` method
 *
 * @static
 * @param {Object} options
 * @param {Function} callback
 * @return {Rednose.Dialog}
 */
Dialog.confirm = function (options, callback) {
    var dialog = new Dialog();

    dialog.confirm(options, callback);

    return dialog;
};

/**
 * Static wrapper for the `confirm` method
 *
 * @static
 * @param {Object} options
 * @param {Function} callback
 * @return {Rednose.Dialog}
 */
Dialog.prompt = function (options, callback) {
    var dialog = new Dialog();

    dialog.prompt(options, callback);

    return dialog;
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Dialog = Dialog;
