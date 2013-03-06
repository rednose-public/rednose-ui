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
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].code=["YUI.add('libbit-dialog', function (Y, NAME) {","","","Dialog = Y.Base.create('dialog', Y.Widget, [], {","","","    initializer: function () {","        // Bind the error attribute change event","        this.after('errorChange', this._setError, this);","    },","","    /**","     * Gets triggered after the 'error' attribute changes. Renders an","     * error message at a given property path.","     */","    _setError: function (e) {","        var error = e.newVal,","            bb    = this.get('panel').get('boundingBox'),","            input;","","        // Remove any previous error message","        bb.all('.control-group').each(function (node) {","            if (node.hasClass('error')) {","                node.removeClass('error');","            }","","            node.all('.help-block').remove();","        });","","        // Append the message node at the given path","        input = bb.one('[data-path=' + error.path + ']');","        input.ancestor('.control-group').addClass('error');","        input.get('parentNode').append('<span class=\"help-block\">' + error.message + '</span>');","","        input.focus();","    },","","    /**","     * Hide the active panel","     */","    hide: function() {","        this.get('panel').destroy();","    },","","    prompt: function (title, question, defaultVal, callback, htmlTemplate) {","        var self = this,","            node,","            panel;","","        if (defaultVal == null) {","            defaultVal = '';","        }","","        if (htmlTemplate) {","            input = Y.Node.create(htmlTemplate);","","            node = Y.Node.create('<form action=\"#\" class=\"form-horizontal\"></form>');","            node.append(input);","        } else {","            input = Y.Node.create('<input type=\"text\" value=\"' + defaultVal + '\" id=\"input\">');","","            node = Y.Node.create(","                '<form action=\"#\" class=\"form-horizontal\">' +","                '   <div class=\"icon icon_absolute dialog_prompt_icon\"></div>' +","                '   <div class=\"control-group\">' +","                '       <label for=\"input\" class=\"control-label\">' + question +  '</label>' +","                '       <div class=\"controls\"></div>' +","                '   </div>' +","                '</form>'","            );","            node.one('.controls').append(input);","        }","","        panel = new Y.Libbit.Panel({","            bodyContent: node,","            hideOn: [],","            headerContent: title,","            zIndex: Y.all('*').size(),","            width: 500,","            buttons: [","                 {","                    value  : 'OK',","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: true,","                    action : function () {","                        if (callback != null) {","                            if (callback(node) === true) {","                                panel.destroy();","                            }","                        }","                    },","                    classNames: 'btn btn-primary'","                 }, {","                    value  : 'Cancel',","                    section: Y.WidgetStdMod.FOOTER,","                    action : function () {","                        panel.destroy();","                    },","                    classNames: 'btn'","                 }","            ],","            centered: true, modal: true, visible: true","        }).render();","","        node.one('input,textarea,select').focus();","        node.all('input, textarea, select').on('keyup', function(e) {","            if (e.button === 13) {","                var buttons = panel.get('buttons');","","                for (var i in buttons.footer) {","                    var button = buttons.footer[i];","","                    if (button.hasClass('btn-primary')) {","                        button.simulate('click');","                    }","                }","            }","        });","","        panel.get('boundingBox').addClass('libbit-dialog');","        panel.get('boundingBox').all('.yui3-button').each(function() {","            this.removeClass('yui3-button').removeClass('yui3-button-primary');","        });","","        this.set('panel', panel);","    },","","    confirm: function (title, message, callback, warning, confirmVal) {","        var node,","            panel;","","        warning = typeof warning !== 'undefined' ? warning : false;","        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';","","        node = Y.Node.create(","            '<div class=\"icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '\"></div>' +","            '<div><p>' + message + '</p></div>'","        );","","        panel = new Y.Libbit.Panel({","            bodyContent: node,","            hideOn: [],","            headerContent: title,","            zIndex: Y.all('*').size(),","            width: 500,","            buttons: [","                 {","                    value  : confirmVal,","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: true,","                    action : function () {","                        if (callback) {","                            callback();","                        }","                        panel.destroy();","                    },","                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-primary')","                 }, {","                    value  : 'No',","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: false,","                    action : function () {","                        panel.destroy();","                    },","                    classNames: 'btn'","                 }","            ],","            centered: true, modal: true, visible: true","        }).render();","","        panel.get('boundingBox').addClass('libbit-dialog');","        panel.get('boundingBox').all('.yui3-button').each(function() {","            this.removeClass('yui3-button').removeClass('yui3-button-primary');","        });","","        this.set('panel', panel);","    },","","    error: function (title, message, warning) {","        var node,","            panel;","","        if (warning) {","            node = Y.Node.create(","                '<div class=\"icon dialog_warning_icon\"></div>' +","                '<div><p>' + message + '</p></div>'","            );","        } else {","            node = Y.Node.create(","                '<div class=\"icon dialog_error_icon\"></div>' +","                '<div><p>' + message + '</p></div>'","            );","        }","","        panel = new Y.Libbit.Panel({","            bodyContent: node,","            hideOn: [],","            headerContent: title,","            zIndex: Y.all('*').size(),","            width: 500,","            buttons: [","                 {","                    value  : 'OK',","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: true,","                    action : function () {","                        panel.destroy();","                    },","                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-danger')","                 }","            ],","            centered: true, modal: true, visible: true","        }).render();","","        panel.get('boundingBox').addClass('libbit-dialog');","        panel.get('boundingBox').all('.yui3-button').each(function() {","            this.removeClass('yui3-button').removeClass('yui3-button-primary');","        });","","        this.set('panel', panel);","    }","}, {","    ATTRS: {","        error: { value: {} },","        panel: { value: null}","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Dialog = Dialog;","","","}, '1.0.0', {\"requires\": [\"dd\", \"dd-plugin\", \"json-parse\", \"node\", \"libbit-panel\", \"widget\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].lines = {"1":0,"4":0,"9":0,"17":0,"22":0,"23":0,"24":0,"27":0,"31":0,"32":0,"33":0,"35":0,"42":0,"46":0,"50":0,"51":0,"54":0,"55":0,"57":0,"58":0,"60":0,"62":0,"71":0,"74":0,"86":0,"87":0,"88":0,"97":0,"105":0,"106":0,"107":0,"108":0,"110":0,"111":0,"113":0,"114":0,"120":0,"121":0,"122":0,"125":0,"129":0,"132":0,"133":0,"135":0,"140":0,"152":0,"153":0,"155":0,"163":0,"171":0,"172":0,"173":0,"176":0,"180":0,"183":0,"184":0,"189":0,"195":0,"207":0,"215":0,"216":0,"217":0,"220":0,"230":0};
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].functions = {"initializer:7":0,"(anonymous 2):22":0,"_setError:16":0,"hide:41":0,"action:85":0,"action:96":0,"(anonymous 3):106":0,"(anonymous 4):121":0,"prompt:45":0,"action:151":0,"action:162":0,"(anonymous 5):172":0,"confirm:128":0,"action:206":0,"(anonymous 6):216":0,"error:179":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].coveredLines = 64;
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].coveredFunctions = 17;
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

    prompt: function (title, question, defaultVal, callback, htmlTemplate) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "prompt", 45);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 46);
var self = this,
            node,
            panel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 50);
if (defaultVal == null) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 51);
defaultVal = '';
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 54);
if (htmlTemplate) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 55);
input = Y.Node.create(htmlTemplate);

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 57);
node = Y.Node.create('<form action="#" class="form-horizontal"></form>');
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 58);
node.append(input);
        } else {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 60);
input = Y.Node.create('<input type="text" value="' + defaultVal + '" id="input">');

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 62);
node = Y.Node.create(
                '<form action="#" class="form-horizontal">' +
                '   <div class="icon icon_absolute dialog_prompt_icon"></div>' +
                '   <div class="control-group">' +
                '       <label for="input" class="control-label">' + question +  '</label>' +
                '       <div class="controls"></div>' +
                '   </div>' +
                '</form>'
            );
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 71);
node.one('.controls').append(input);
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 74);
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
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 85);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 86);
if (callback != null) {
                            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 87);
if (callback(node) === true) {
                                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 88);
panel.destroy();
                            }
                        }
                    },
                    classNames: 'btn btn-primary'
                 }, {
                    value  : 'Cancel',
                    section: Y.WidgetStdMod.FOOTER,
                    action : function () {
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 96);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 97);
panel.destroy();
                    },
                    classNames: 'btn'
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 105);
node.one('input,textarea,select').focus();
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 106);
node.all('input, textarea, select').on('keyup', function(e) {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 3)", 106);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 107);
if (e.button === 13) {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 108);
var buttons = panel.get('buttons');

                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 110);
for (var i in buttons.footer) {
                    _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 111);
var button = buttons.footer[i];

                    _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 113);
if (button.hasClass('btn-primary')) {
                        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 114);
button.simulate('click');
                    }
                }
            }
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 120);
panel.get('boundingBox').addClass('libbit-dialog');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 121);
panel.get('boundingBox').all('.yui3-button').each(function() {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 4)", 121);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 122);
this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 125);
this.set('panel', panel);
    },

    confirm: function (title, message, callback, warning, confirmVal) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "confirm", 128);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 129);
var node,
            panel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 132);
warning = typeof warning !== 'undefined' ? warning : false;
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 133);
confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 135);
node = Y.Node.create(
            '<div class="icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '"></div>' +
            '<div><p>' + message + '</p></div>'
        );

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 140);
panel = new Y.Libbit.Panel({
            bodyContent: node,
            hideOn: [],
            headerContent: title,
            zIndex: Y.all('*').size(),
            width: 500,
            buttons: [
                 {
                    value  : confirmVal,
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: true,
                    action : function () {
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 151);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 152);
if (callback) {
                            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 153);
callback();
                        }
                        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 155);
panel.destroy();
                    },
                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-primary')
                 }, {
                    value  : 'No',
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: false,
                    action : function () {
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 162);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 163);
panel.destroy();
                    },
                    classNames: 'btn'
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 171);
panel.get('boundingBox').addClass('libbit-dialog');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 172);
panel.get('boundingBox').all('.yui3-button').each(function() {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 5)", 172);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 173);
this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 176);
this.set('panel', panel);
    },

    error: function (title, message, warning) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "error", 179);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 180);
var node,
            panel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 183);
if (warning) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 184);
node = Y.Node.create(
                '<div class="icon dialog_warning_icon"></div>' +
                '<div><p>' + message + '</p></div>'
            );
        } else {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 189);
node = Y.Node.create(
                '<div class="icon dialog_error_icon"></div>' +
                '<div><p>' + message + '</p></div>'
            );
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 195);
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
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 206);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 207);
panel.destroy();
                    },
                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-danger')
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 215);
panel.get('boundingBox').addClass('libbit-dialog');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 216);
panel.get('boundingBox').all('.yui3-button').each(function() {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 6)", 216);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 217);
this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 220);
this.set('panel', panel);
    }
}, {
    ATTRS: {
        error: { value: {} },
        panel: { value: null}
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 230);
Y.namespace('Libbit').Dialog = Dialog;


}, '1.0.0', {"requires": ["dd", "dd-plugin", "json-parse", "node", "libbit-panel", "widget"], "skinnable": true});
