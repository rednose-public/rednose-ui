if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-dialog/libbit-dialog.js",
    code: []
};
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].code=["YUI.add('libbit-dialog', function (Y, NAME) {","","/* Dialog class constructor */","function Dialog(config) {","    Dialog.superclass.constructor.apply(this, arguments);","}","","/*"," * Required NAME static field, to identify the Widget class and"," * used as an event prefix, to generate class names etc. (set to the"," * class name in camel case)."," */","Dialog.NAME = 'dialog';","","/*"," * The attribute configuration for the Dialog widget. Attributes can be"," * defined with default values, get/set functions and validator functions"," * as with any other class extending Base."," */","Dialog.ATTRS = {","    // An error object","    error : {","        value: null","    }","};","","Y.extend(Dialog, Y.Widget, {","    // Methods/properties to add to the prototype of the new class","    callback: null,","","    callbackCancel: null,","","    wHandleCollection: [],","","    initializer: function () {","        // Bind the error attribute change event","        this.after('errorChange', this._setError, this);","    },","","    /**","     * Gets triggered after the 'error' attribute changes. Renders an","     * error message at a given property path.","     */","    _setError: function (e) {","        var error = e.newVal,","            bb    = this.panel.panelObject.get('boundingBox'),","            input;","","        // Remove any previous error message","        bb.all('.control-group').each(function (node) {","            if (node.hasClass('error')) {","                node.removeClass('error');","            }","","            node.all('.help-block').remove();","        });","","        // Append the message node at the given path","        input = bb.one('[data-path=' + error.path + ']');","        input.ancestor('.control-group').addClass('error');","        input.get('parentNode').append('<span class=\"help-block\">' + error.message + '</span>');","","        input.focus();","    },","","    /**","     * Hide the active panel","     */","    hide: function() {","        this.panel.panelObject.destroy();","    },","","    message: function (message, warningMode, callback, headerTitle) {","        if (typeof warningMode === 'undefined') { warningMode = false; }","        if (typeof callback === 'undefined') { callback = function () {}; }","","        this.callback = callback;","","        if (headerTitle === null) {","            headerTitle = 'Message';","        }","","        this.panel('message', message, headerTitle);","","        if (warningMode === true) {","            this.panel.MessageNode","                .get('parentNode').one('div.dialog_message_icon')","                .removeClass('dialog_message_icon')","                .addClass('dialog_warning_icon');","        }","    },","","    prompt: function (content, fieldName, initialValue, callback, callbackCancel, headerTitle, buttonTitle) {","        var self = this;","","        if (typeof callback === 'undefined') { callback = function () {}; }","        if (typeof callbackCancel === 'undefined') { callbackCancel = function () {}; }","","        this.callback = callback;","        this.callbackCancel = callbackCancel;","","        if (headerTitle === null) {","            headerTitle = 'Question';","        }","","        if (Y.Lang.isUndefined(buttonTitle)) {","            buttonTitle = 'Confirm';","        }","","        this.panel('prompt', '...', headerTitle, buttonTitle);","","        this.panel.MessageNode.set('innerHTML',","            '<div class=\"form-horizontal\">' +","            '<div class=\"control-group\">' +","            '<label class=\"control-label\" for=\"promptInput\">' + fieldName + '</label>' +","            '<div class=\"controls\">' +","            '<input data-path=\"' + fieldName.toLowerCase() + '\" type=\"text\" id=\"promptInput\" value=\"' + initialValue + '\"/>' +","            '</div>' +","            '</div>' +","            '</div>'","        );","","        this.panel.MessageNode.one('input').focus().select();","","        this.panel.MessageNode.one('input').on('keyup', function (e) {","            if (e.button === 13) {","                self.callback(","                    self.panel.MessageNode.one('input').get('value')","                );","            }","        });","    },","","    errorMessage: function (errJSON, callback) {","        var errHTML = '',","            err     = Y.JSON.parse(errJSON);","","        if (typeof callback === 'undefined') { callback = function () {}; }","","        this.callback = callback;","","        errHTML =","            '<div class=\"dialog_error\">' + err.message + '</div>' +","            '<div class=\"dialog_path\">Source: ' + err.path + '</div>';","","        this.panel('error', errHTML, 'Error');","    },","","    confirm: function (message, callback, callbackCancel, headerTitle, buttonTitle, warningMode) {","        if (typeof warningMode === 'undefined') { warningMode = false; }","        if (typeof callback === 'undefined') { callback = function () {}; }","        if (typeof callbackCancel === 'undefined') { callbackCancel = function () {}; }","","        this.callback = callback;","        this.callbackCancel = callbackCancel;","","        if (headerTitle === null) {","            headerTitle = 'Question';","        }","","        if (Y.Lang.isUndefined(buttonTitle)) {","            buttonTitle = 'Confirm';","        }","","        this.panel('confirm', message, headerTitle, buttonTitle);","","        if (warningMode === true) {","            this.panel.MessageNode","                .get('parentNode').one('div.dialog_confirm_icon')","                .removeClass('dialog_confirm_icon')","                .addClass('dialog_warning_icon');","        }","    },","","    window: function (windowHandle, title, height, width, content, uri, buttons) {","        var container = Y.Node.create('<div class=\"libbit-dialog-window\" />'),","            body      = Y.Node.create('<div class=\"yui3-widget-bd\"></div>'),","            dialogDispatcher;","","        container.append(body);","","        if (typeof (content) === 'string') {","            body.setHTML(content);","        } else if (typeof (content) === 'object' && content !== null) {","            body.setContent(content);","        } else if (typeof (uri) === 'string') {","            dialogDispatcher = Y.Node.create('<div class=\"libbit-dialog-window-wrapper\">Loading...</div>');","","            body.appendChild(dialogDispatcher);","","            new Y.Dispatcher({","                node: dialogDispatcher,","                ioConfig: {","                    method: 'GET'","                }","            }).set('uri',  uri);","        }","","        this.Window.panelObject = new Y.Panel({","            srcNode: container,","            headerContent: title,","            width: width,","            height: height,","            zIndex: parseInt(Y.all('*').size(), 10),","            centered: true,","            modal: true,","            visible: false,","            render: true,","            buttons: buttons","        });","","        //this.wHandleCollection[windowHandle] = this.Window.panelObject;","","        /*for (i in buttons) {","            var skipCallback = false;","","            this.Window.panelObject.addButton({","                value     : buttons[i].title,","                isDefault : buttons[i].isDefault,","                section   : Y.WidgetStdMod.FOOTER,","                classNames: ['dButton_' + i],","                action    : function (e) {","                    var currentClass = e.currentTarget._node.getAttribute('class').split(' ');","","                    for (x in currentClass) {","                        if (currentClass[x].indexOf('dButton_') > -1) {","                            if (typeof (buttons[i].callbackClose) === 'boolean') {","                                if (buttons[i].callbackClose === true) {","                                    this.wHandleCollection[windowHandle].hide();","","                                    skipCallback = true;","                                }","                            }","","                            if (skipCallback === false) {","                                buttons[parseInt(currentClass[x].replace('dButton_', ''), 10)].callback(","                                    this.DialogHandleCollection[windowHandle],","                                    container","                                );","                            }","                        }","                    }","                }","            });","        }*/","","        this.Window.panelObject.show();","        /*this.Window.panelObject.on('visibleChange', function () {","            for (i in buttons) {","                if (typeof (buttons[i].callbackClose) === 'boolean') {","                    if (buttons[i].callbackClose === true) {","                        buttons[i].callback(","                            this.wHandleCollection[windowHandle],","                            container","                        );","                    }","                }","            }","        });*/","","        return this.Window.panelObject;","    },","","    panel: function (type, message, headerTitle, buttonTitle) {","        var self = this,","            bodyNode = Y.Node.create('<div/>'),","            buttons;","","        if (Y.Lang.isUndefined(buttonTitle)) {","            buttonTitle = 'Confirm';","        }","","        bodyNode.appendChild(Y.Node.create(","            '<div class=\"yui3-widget-bd\">' +","            '<div class=\"icon dialog_' + type + '_icon\"></div>' +","            '<div>' + message + '</div>' +","            '</div>'","        ));","","        buttons = [","            {","                value  : 'Cancel',","                section: Y.WidgetStdMod.FOOTER,","                action : function (e) {","                    self.panel.panelObject.hide();","                    self.callbackCancel();","                }","            }","        ];","","        if (type === 'confirm' || type === 'prompt') {","            buttons.push({","                value  : buttonTitle,","                section: Y.WidgetStdMod.FOOTER,","                isDefault: true,","                action : function (e) {","                    if (type === 'prompt') {","                        self.callback(","                            self.panel.MessageNode.one('input').get('value')","                        );","                    } else {","                        self.callback();","                    }","                }","            });","        }","","        this.panel.panelObject = new Y.Panel({","            srcNode: bodyNode,","            headerContent: headerTitle,","            zIndex: Y.all('*').size(),","            width: 500,","            centered: true,","            modal: true,","            visible: false,","            render: true,","            buttons: buttons","        });","","        this.panel.MessageNode = bodyNode.one('div.yui3-widget-bd');","        this.panel.MessageNode.setStyle('max-height', '400px');","","        this.panel.panelObject.get('boundingBox').addClass('libbit-dialog');","","        this.panel.panelObject.show();","","        /*this.panel.panelObject.on('visibleChange', function () {","            if ((type === 'error' || type === 'message' || type === 'warning') && typeof (this.callback) === 'function') {","                this.callback();","            }","        });*/","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Dialog = Dialog;","","","}, '1.0.0', {","    \"requires\": [","        \"dd\",","        \"dd-plugin\",","        \"gallery-dispatcher\",","        \"json-parse\",","        \"node\",","        \"panel\",","        \"widget\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].lines = {"1":0,"4":0,"5":0,"13":0,"20":0,"27":0,"37":0,"45":0,"50":0,"51":0,"52":0,"55":0,"59":0,"60":0,"61":0,"63":0,"70":0,"74":0,"75":0,"77":0,"79":0,"80":0,"83":0,"85":0,"86":0,"94":0,"96":0,"97":0,"99":0,"100":0,"102":0,"103":0,"106":0,"107":0,"110":0,"112":0,"123":0,"125":0,"126":0,"127":0,"135":0,"138":0,"140":0,"142":0,"146":0,"150":0,"151":0,"152":0,"154":0,"155":0,"157":0,"158":0,"161":0,"162":0,"165":0,"167":0,"168":0,"176":0,"180":0,"182":0,"183":0,"184":0,"185":0,"186":0,"187":0,"189":0,"191":0,"199":0,"247":0,"261":0,"265":0,"269":0,"270":0,"273":0,"280":0,"285":0,"286":0,"291":0,"292":0,"297":0,"298":0,"302":0,"308":0,"320":0,"321":0,"323":0,"325":0,"336":0};
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].functions = {"Dialog:4":0,"initializer:35":0,"(anonymous 2):50":0,"_setError:44":0,"hide:69":0,"message:73":0,"(anonymous 3):125":0,"prompt:93":0,"errorMessage:134":0,"confirm:149":0,"window:175":0,"action:284":0,"action:296":0,"panel:264":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].coveredLines = 88;
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].coveredFunctions = 15;
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 1);
YUI.add('libbit-dialog', function (Y, NAME) {

/* Dialog class constructor */
_yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 4);
function Dialog(config) {
    _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "Dialog", 4);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 5);
Dialog.superclass.constructor.apply(this, arguments);
}

/*
 * Required NAME static field, to identify the Widget class and
 * used as an event prefix, to generate class names etc. (set to the
 * class name in camel case).
 */
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 13);
Dialog.NAME = 'dialog';

/*
 * The attribute configuration for the Dialog widget. Attributes can be
 * defined with default values, get/set functions and validator functions
 * as with any other class extending Base.
 */
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 20);
Dialog.ATTRS = {
    // An error object
    error : {
        value: null
    }
};

_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 27);
Y.extend(Dialog, Y.Widget, {
    // Methods/properties to add to the prototype of the new class
    callback: null,

    callbackCancel: null,

    wHandleCollection: [],

    initializer: function () {
        // Bind the error attribute change event
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "initializer", 35);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 37);
this.after('errorChange', this._setError, this);
    },

    /**
     * Gets triggered after the 'error' attribute changes. Renders an
     * error message at a given property path.
     */
    _setError: function (e) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "_setError", 44);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 45);
var error = e.newVal,
            bb    = this.panel.panelObject.get('boundingBox'),
            input;

        // Remove any previous error message
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 50);
bb.all('.control-group').each(function (node) {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 2)", 50);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 51);
if (node.hasClass('error')) {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 52);
node.removeClass('error');
            }

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 55);
node.all('.help-block').remove();
        });

        // Append the message node at the given path
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 59);
input = bb.one('[data-path=' + error.path + ']');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 60);
input.ancestor('.control-group').addClass('error');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 61);
input.get('parentNode').append('<span class="help-block">' + error.message + '</span>');

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 63);
input.focus();
    },

    /**
     * Hide the active panel
     */
    hide: function() {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "hide", 69);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 70);
this.panel.panelObject.destroy();
    },

    message: function (message, warningMode, callback, headerTitle) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "message", 73);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 74);
if (typeof warningMode === 'undefined') { warningMode = false; }
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 75);
if (typeof callback === 'undefined') { callback = function () {}; }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 77);
this.callback = callback;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 79);
if (headerTitle === null) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 80);
headerTitle = 'Message';
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 83);
this.panel('message', message, headerTitle);

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 85);
if (warningMode === true) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 86);
this.panel.MessageNode
                .get('parentNode').one('div.dialog_message_icon')
                .removeClass('dialog_message_icon')
                .addClass('dialog_warning_icon');
        }
    },

    prompt: function (content, fieldName, initialValue, callback, callbackCancel, headerTitle, buttonTitle) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "prompt", 93);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 94);
var self = this;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 96);
if (typeof callback === 'undefined') { callback = function () {}; }
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 97);
if (typeof callbackCancel === 'undefined') { callbackCancel = function () {}; }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 99);
this.callback = callback;
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 100);
this.callbackCancel = callbackCancel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 102);
if (headerTitle === null) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 103);
headerTitle = 'Question';
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 106);
if (Y.Lang.isUndefined(buttonTitle)) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 107);
buttonTitle = 'Confirm';
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 110);
this.panel('prompt', '...', headerTitle, buttonTitle);

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 112);
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

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 123);
this.panel.MessageNode.one('input').focus().select();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 125);
this.panel.MessageNode.one('input').on('keyup', function (e) {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 3)", 125);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 126);
if (e.button === 13) {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 127);
self.callback(
                    self.panel.MessageNode.one('input').get('value')
                );
            }
        });
    },

    errorMessage: function (errJSON, callback) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "errorMessage", 134);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 135);
var errHTML = '',
            err     = Y.JSON.parse(errJSON);

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 138);
if (typeof callback === 'undefined') { callback = function () {}; }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 140);
this.callback = callback;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 142);
errHTML =
            '<div class="dialog_error">' + err.message + '</div>' +
            '<div class="dialog_path">Source: ' + err.path + '</div>';

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 146);
this.panel('error', errHTML, 'Error');
    },

    confirm: function (message, callback, callbackCancel, headerTitle, buttonTitle, warningMode) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "confirm", 149);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 150);
if (typeof warningMode === 'undefined') { warningMode = false; }
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 151);
if (typeof callback === 'undefined') { callback = function () {}; }
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 152);
if (typeof callbackCancel === 'undefined') { callbackCancel = function () {}; }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 154);
this.callback = callback;
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 155);
this.callbackCancel = callbackCancel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 157);
if (headerTitle === null) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 158);
headerTitle = 'Question';
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 161);
if (Y.Lang.isUndefined(buttonTitle)) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 162);
buttonTitle = 'Confirm';
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 165);
this.panel('confirm', message, headerTitle, buttonTitle);

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 167);
if (warningMode === true) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 168);
this.panel.MessageNode
                .get('parentNode').one('div.dialog_confirm_icon')
                .removeClass('dialog_confirm_icon')
                .addClass('dialog_warning_icon');
        }
    },

    window: function (windowHandle, title, height, width, content, uri, buttons) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "window", 175);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 176);
var container = Y.Node.create('<div class="libbit-dialog-window" />'),
            body      = Y.Node.create('<div class="yui3-widget-bd"></div>'),
            dialogDispatcher;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 180);
container.append(body);

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 182);
if (typeof (content) === 'string') {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 183);
body.setHTML(content);
        } else {_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 184);
if (typeof (content) === 'object' && content !== null) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 185);
body.setContent(content);
        } else {_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 186);
if (typeof (uri) === 'string') {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 187);
dialogDispatcher = Y.Node.create('<div class="libbit-dialog-window-wrapper">Loading...</div>');

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 189);
body.appendChild(dialogDispatcher);

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 191);
new Y.Dispatcher({
                node: dialogDispatcher,
                ioConfig: {
                    method: 'GET'
                }
            }).set('uri',  uri);
        }}}

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 199);
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

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 247);
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

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 261);
return this.Window.panelObject;
    },

    panel: function (type, message, headerTitle, buttonTitle) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "panel", 264);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 265);
var self = this,
            bodyNode = Y.Node.create('<div/>'),
            buttons;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 269);
if (Y.Lang.isUndefined(buttonTitle)) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 270);
buttonTitle = 'Confirm';
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 273);
bodyNode.appendChild(Y.Node.create(
            '<div class="yui3-widget-bd">' +
            '<div class="icon dialog_' + type + '_icon"></div>' +
            '<div>' + message + '</div>' +
            '</div>'
        ));

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 280);
buttons = [
            {
                value  : 'Cancel',
                section: Y.WidgetStdMod.FOOTER,
                action : function (e) {
                    _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 284);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 285);
self.panel.panelObject.hide();
                    _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 286);
self.callbackCancel();
                }
            }
        ];

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 291);
if (type === 'confirm' || type === 'prompt') {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 292);
buttons.push({
                value  : buttonTitle,
                section: Y.WidgetStdMod.FOOTER,
                isDefault: true,
                action : function (e) {
                    _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 296);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 297);
if (type === 'prompt') {
                        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 298);
self.callback(
                            self.panel.MessageNode.one('input').get('value')
                        );
                    } else {
                        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 302);
self.callback();
                    }
                }
            });
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 308);
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

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 320);
this.panel.MessageNode = bodyNode.one('div.yui3-widget-bd');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 321);
this.panel.MessageNode.setStyle('max-height', '400px');

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 323);
this.panel.panelObject.get('boundingBox').addClass('libbit-dialog');

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 325);
this.panel.panelObject.show();

        /*this.panel.panelObject.on('visibleChange', function () {
            if ((type === 'error' || type === 'message' || type === 'warning') && typeof (this.callback) === 'function') {
                this.callback();
            }
        });*/
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 336);
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
