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
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].code=["YUI.add('libbit-dialog', function (Y, NAME) {","","","Dialog = Y.Base.create('dialog', Y.Widget, [], {","","","    initializer: function () {","        // Bind the error attribute change event","        this.after('errorChange', this._setError, this);","    },","","    /**","     * Gets triggered after the 'error' attribute changes. Renders an","     * error message at a given property path.","     */","    _setError: function (e) {","        var error = e.newVal,","            bb    = this.get('panel').get('boundingBox'),","            input;","","        // Remove any previous error message","        bb.all('.control-group').each(function (node) {","            if (node.hasClass('error')) {","                node.removeClass('error');","            }","","            node.all('.help-block').remove();","        });","","        // Append the message node at the given path","        input = bb.one('[data-path=' + error.path + ']');","        input.ancestor('.control-group').addClass('error');","        input.get('parentNode').append('<span class=\"help-block\">' + error.message + '</span>');","","        input.focus();","    },","","    /**","     * Hide the active panel","     */","    hide: function() {","        this.get('panel').destroy();","    },","","    prompt: function (title, question, defaultVal, callback, htmlTemplate, confirmVal) {","        var self = this,","            node,","            panel;","","        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';","","        if (defaultVal == null) {","            defaultVal = '';","        }","","        if (htmlTemplate) {","            if (typeof(htmlTemplate) == 'string') {","                input = Y.Node.create(htmlTemplate);","            } else {","                input = htmlTemplate;","            }","","            node = Y.Node.create('<form action=\"#\" class=\"form-horizontal\"></form>');","            node.append(input);","        } else {","            input = Y.Node.create('<input type=\"text\" value=\"' + defaultVal + '\" id=\"input\">');","","            node = Y.Node.create(","                '<form action=\"#\" class=\"form-horizontal\">' +","                '   <div class=\"icon icon_absolute dialog_prompt_icon\"></div>' +","                '   <div class=\"control-group\">' +","                '       <label for=\"input\" class=\"control-label\">' + question +  '</label>' +","                '       <div class=\"controls\"></div>' +","                '   </div>' +","                '</form>'","            );","            node.one('.controls').append(input);","        }","","        panel = new Y.Libbit.Panel({","            bodyContent: node,","            hideOn: [],","            headerContent: title,","            zIndex: Y.all('*').size(),","            width: 500,","            buttons: [","                 {","                    value  : 'Cancel',","                    section: Y.WidgetStdMod.FOOTER,","                    action : function () {","                        panel.destroy();","                    },","                    classNames: 'btn'","                 }, {","                    value  : confirmVal,","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: true,","                    action : function () {","                        if (callback != null) {","                            if (callback(node) === true) {","                                panel.destroy();","                            }","                        }","                    },","                    classNames: 'btn btn-primary'","                 }","            ],","            centered: true, modal: true, visible: true","        }).render();","","        node.one('input,textarea,select').focus();","        node.all('input, textarea, select').on('keyup', function(e) {","            if (e.button === 13) {","                var buttons = panel.get('buttons');","","                for (var i in buttons.footer) {","                    var button = buttons.footer[i];","","                    if (button.hasClass('btn-primary')) {","                        button.simulate('click');","                    }","                }","            }","        });","","        panel.get('boundingBox').addClass('libbit-dialog');","        panel.get('boundingBox').all('.yui3-button').each(function() {","            this.removeClass('yui3-button').removeClass('yui3-button-primary');","        });","","        this.set('panel', panel);","    },","","    confirm: function (title, message, callback, warning, confirmVal) {","        var node,","            panel;","","        warning = typeof warning !== 'undefined' ? warning : false;","        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';","","        node = Y.Node.create(","            '<div class=\"icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '\"></div>' +","            '<div><p>' + message + '</p></div>'","        );","","        panel = new Y.Libbit.Panel({","            bodyContent: node,","            hideOn: [],","            headerContent: title,","            zIndex: Y.all('*').size(),","            width: 500,","            buttons: [","                 {","                    value  : 'Cancel',","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: false,","                    action : function () {","                        panel.destroy();","                    },","                    classNames: 'btn'","                 }, {","                    value  : confirmVal,","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: true,","                    action : function () {","                        if (callback) {","                            callback();","                        }","                        panel.destroy();","                    },","                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-primary')","                 }","            ],","            centered: true, modal: true, visible: true","        }).render();","","        panel.get('boundingBox').addClass('libbit-dialog');","        panel.get('boundingBox').all('.yui3-button').each(function() {","            this.removeClass('yui3-button').removeClass('yui3-button-primary');","        });","","        this.set('panel', panel);","    },","","    error: function (title, message, warning) {","        var node,","            panel;","","        if (warning) {","            node = Y.Node.create(","                '<div class=\"icon dialog_warning_icon\"></div>' +","                '<div><p>' + message + '</p></div>'","            );","        } else {","            node = Y.Node.create(","                '<div class=\"icon dialog_error_icon\"></div>' +","                '<div><p>' + message + '</p></div>'","            );","        }","","        panel = new Y.Libbit.Panel({","            bodyContent: node,","            hideOn: [],","            headerContent: title,","            zIndex: Y.all('*').size(),","            width: 500,","            buttons: [","                 {","                    value  : 'OK',","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: true,","                    action : function () {","                        panel.destroy();","                    },","                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-danger')","                 }","            ],","            centered: true, modal: true, visible: true","        }).render();","","        panel.get('boundingBox').addClass('libbit-dialog');","        panel.get('boundingBox').all('.yui3-button').each(function() {","            this.removeClass('yui3-button').removeClass('yui3-button-primary');","        });","","        this.set('panel', panel);","    }","}, {","    ATTRS: {","        error: { value: {} },","        panel: { value: null}","    }","});","","Dialog.confirm = function (title, message, callback, warning, confirmVal) {","    var dialog = new Dialog;","","    dialog.confirm(title, message, callback, warning, confirmVal);","}","","Dialog.error = function (title, message, warning) {","    var dialog = new Dialog;","","    dialog.error(title, message, warning);","}","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Dialog = Dialog;","","","}, '1.0.0', {\"requires\": [\"dd\", \"dd-plugin\", \"json-parse\", \"node\", \"libbit-panel\", \"widget\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].lines = {"1":0,"4":0,"9":0,"17":0,"22":0,"23":0,"24":0,"27":0,"31":0,"32":0,"33":0,"35":0,"42":0,"46":0,"50":0,"52":0,"53":0,"56":0,"57":0,"58":0,"60":0,"63":0,"64":0,"66":0,"68":0,"77":0,"80":0,"91":0,"99":0,"100":0,"101":0,"111":0,"112":0,"113":0,"114":0,"116":0,"117":0,"119":0,"120":0,"126":0,"127":0,"128":0,"131":0,"135":0,"138":0,"139":0,"141":0,"146":0,"158":0,"166":0,"167":0,"169":0,"177":0,"178":0,"179":0,"182":0,"186":0,"189":0,"190":0,"195":0,"201":0,"213":0,"221":0,"222":0,"223":0,"226":0,"235":0,"236":0,"238":0,"241":0,"242":0,"244":0,"248":0};
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].functions = {"initializer:7":0,"(anonymous 2):22":0,"_setError:16":0,"hide:41":0,"action:90":0,"action:98":0,"(anonymous 3):112":0,"(anonymous 4):127":0,"prompt:45":0,"action:157":0,"action:165":0,"(anonymous 5):178":0,"confirm:134":0,"action:212":0,"(anonymous 6):222":0,"error:185":0,"confirm:235":0,"error:241":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].coveredLines = 73;
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].coveredFunctions = 19;
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 1);
YUI.add('libbit-dialog', function (Y, NAME) {


_yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 4);
Dialog = Y.Base.create('dialog', Y.Widget, [], {


    initializer: function () {
        // Bind the error attribute change event
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "initializer", 7);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 9);
this.after('errorChange', this._setError, this);
    },

    /**
     * Gets triggered after the 'error' attribute changes. Renders an
     * error message at a given property path.
     */
    _setError: function (e) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "_setError", 16);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 17);
var error = e.newVal,
            bb    = this.get('panel').get('boundingBox'),
            input;

        // Remove any previous error message
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 22);
bb.all('.control-group').each(function (node) {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 2)", 22);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 23);
if (node.hasClass('error')) {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 24);
node.removeClass('error');
            }

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 27);
node.all('.help-block').remove();
        });

        // Append the message node at the given path
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 31);
input = bb.one('[data-path=' + error.path + ']');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 32);
input.ancestor('.control-group').addClass('error');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 33);
input.get('parentNode').append('<span class="help-block">' + error.message + '</span>');

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 35);
input.focus();
    },

    /**
     * Hide the active panel
     */
    hide: function() {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "hide", 41);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 42);
this.get('panel').destroy();
    },

    prompt: function (title, question, defaultVal, callback, htmlTemplate, confirmVal) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "prompt", 45);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 46);
var self = this,
            node,
            panel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 50);
confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 52);
if (defaultVal == null) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 53);
defaultVal = '';
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 56);
if (htmlTemplate) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 57);
if (typeof(htmlTemplate) == 'string') {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 58);
input = Y.Node.create(htmlTemplate);
            } else {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 60);
input = htmlTemplate;
            }

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 63);
node = Y.Node.create('<form action="#" class="form-horizontal"></form>');
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 64);
node.append(input);
        } else {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 66);
input = Y.Node.create('<input type="text" value="' + defaultVal + '" id="input">');

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 68);
node = Y.Node.create(
                '<form action="#" class="form-horizontal">' +
                '   <div class="icon icon_absolute dialog_prompt_icon"></div>' +
                '   <div class="control-group">' +
                '       <label for="input" class="control-label">' + question +  '</label>' +
                '       <div class="controls"></div>' +
                '   </div>' +
                '</form>'
            );
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 77);
node.one('.controls').append(input);
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 80);
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
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 90);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 91);
panel.destroy();
                    },
                    classNames: 'btn'
                 }, {
                    value  : confirmVal,
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: true,
                    action : function () {
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 98);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 99);
if (callback != null) {
                            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 100);
if (callback(node) === true) {
                                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 101);
panel.destroy();
                            }
                        }
                    },
                    classNames: 'btn btn-primary'
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 111);
node.one('input,textarea,select').focus();
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 112);
node.all('input, textarea, select').on('keyup', function(e) {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 3)", 112);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 113);
if (e.button === 13) {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 114);
var buttons = panel.get('buttons');

                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 116);
for (var i in buttons.footer) {
                    _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 117);
var button = buttons.footer[i];

                    _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 119);
if (button.hasClass('btn-primary')) {
                        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 120);
button.simulate('click');
                    }
                }
            }
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 126);
panel.get('boundingBox').addClass('libbit-dialog');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 127);
panel.get('boundingBox').all('.yui3-button').each(function() {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 4)", 127);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 128);
this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 131);
this.set('panel', panel);
    },

    confirm: function (title, message, callback, warning, confirmVal) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "confirm", 134);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 135);
var node,
            panel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 138);
warning = typeof warning !== 'undefined' ? warning : false;
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 139);
confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 141);
node = Y.Node.create(
            '<div class="icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '"></div>' +
            '<div><p>' + message + '</p></div>'
        );

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 146);
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
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 157);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 158);
panel.destroy();
                    },
                    classNames: 'btn'
                 }, {
                    value  : confirmVal,
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: true,
                    action : function () {
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 165);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 166);
if (callback) {
                            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 167);
callback();
                        }
                        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 169);
panel.destroy();
                    },
                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-primary')
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 177);
panel.get('boundingBox').addClass('libbit-dialog');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 178);
panel.get('boundingBox').all('.yui3-button').each(function() {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 5)", 178);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 179);
this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 182);
this.set('panel', panel);
    },

    error: function (title, message, warning) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "error", 185);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 186);
var node,
            panel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 189);
if (warning) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 190);
node = Y.Node.create(
                '<div class="icon dialog_warning_icon"></div>' +
                '<div><p>' + message + '</p></div>'
            );
        } else {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 195);
node = Y.Node.create(
                '<div class="icon dialog_error_icon"></div>' +
                '<div><p>' + message + '</p></div>'
            );
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 201);
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
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 212);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 213);
panel.destroy();
                    },
                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-danger')
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 221);
panel.get('boundingBox').addClass('libbit-dialog');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 222);
panel.get('boundingBox').all('.yui3-button').each(function() {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 6)", 222);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 223);
this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 226);
this.set('panel', panel);
    }
}, {
    ATTRS: {
        error: { value: {} },
        panel: { value: null}
    }
});

_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 235);
Dialog.confirm = function (title, message, callback, warning, confirmVal) {
    _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "confirm", 235);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 236);
var dialog = new Dialog;

    _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 238);
dialog.confirm(title, message, callback, warning, confirmVal);
}

_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 241);
Dialog.error = function (title, message, warning) {
    _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "error", 241);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 242);
var dialog = new Dialog;

    _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 244);
dialog.error(title, message, warning);
}

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 248);
Y.namespace('Libbit').Dialog = Dialog;


}, '1.0.0', {"requires": ["dd", "dd-plugin", "json-parse", "node", "libbit-panel", "widget"], "skinnable": true});
