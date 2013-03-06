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
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].code=["YUI.add('libbit-dialog', function (Y, NAME) {","","","Dialog = Y.Base.create('dialog', Y.Widget, [], {","","","    initializer: function () {","        // Bind the error attribute change event","        this.after('errorChange', this._setError, this);","    },","","    /**","     * Gets triggered after the 'error' attribute changes. Renders an","     * error message at a given property path.","     */","    _setError: function (e) {","        var error = e.newVal,","            bb    = this.get('panel').get('boundingBox'),","            input;","","        // Remove any previous error message","        bb.all('.control-group').each(function (node) {","            if (node.hasClass('error')) {","                node.removeClass('error');","            }","","            node.all('.help-block').remove();","        });","","        // Append the message node at the given path","        input = bb.one('[data-path=' + error.path + ']');","        input.ancestor('.control-group').addClass('error');","        input.get('parentNode').append('<span class=\"help-block\">' + error.message + '</span>');","","        input.focus();","    },","","    /**","     * Hide the active panel","     */","    hide: function() {","        this.get('panel').destroy();","    },","","    prompt: function (title, question, defaultVal, callback, htmlTemplate) {","        var self = this,","            node,","            panel;","","        if (defaultVal == null) {","            defaultVal = '';","        }","","        if (htmlTemplate) {","            if (typeof(htmlTemplate) == 'string') {","                input = Y.Node.create(htmlTemplate);","            } else {","                input = htmlTemplate;","            }","","            node = Y.Node.create('<form action=\"#\" class=\"form-horizontal\"></form>');","            node.append(input);","        } else {","            input = Y.Node.create('<input type=\"text\" value=\"' + defaultVal + '\" id=\"input\">');","","            node = Y.Node.create(","                '<form action=\"#\" class=\"form-horizontal\">' +","                '   <div class=\"icon icon_absolute dialog_prompt_icon\"></div>' +","                '   <div class=\"control-group\">' +","                '       <label for=\"input\" class=\"control-label\">' + question +  '</label>' +","                '       <div class=\"controls\"></div>' +","                '   </div>' +","                '</form>'","            );","            node.one('.controls').append(input);","        }","","        panel = new Y.Libbit.Panel({","            bodyContent: node,","            hideOn: [],","            headerContent: title,","            zIndex: Y.all('*').size(),","            width: 500,","            buttons: [","                 {","                    value  : 'OK',","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: true,","                    action : function () {","                        if (callback != null) {","                            if (callback(node) === true) {","                                panel.destroy();","                            }","                        }","                    },","                    classNames: 'btn btn-primary'","                 }, {","                    value  : 'Cancel',","                    section: Y.WidgetStdMod.FOOTER,","                    action : function () {","                        panel.destroy();","                    },","                    classNames: 'btn'","                 }","            ],","            centered: true, modal: true, visible: true","        }).render();","","        node.one('input,textarea,select').focus();","        node.all('input, textarea, select').on('keyup', function(e) {","            if (e.button === 13) {","                var buttons = panel.get('buttons');","","                for (var i in buttons.footer) {","                    var button = buttons.footer[i];","","                    if (button.hasClass('btn-primary')) {","                        button.simulate('click');","                    }","                }","            }","        });","","        panel.get('boundingBox').addClass('libbit-dialog');","        panel.get('boundingBox').all('.yui3-button').each(function() {","            this.removeClass('yui3-button').removeClass('yui3-button-primary');","        });","","        this.set('panel', panel);","    },","","    confirm: function (title, message, callback, warning, confirmVal) {","        var node,","            panel;","","        warning = typeof warning !== 'undefined' ? warning : false;","        confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';","","        node = Y.Node.create(","            '<div class=\"icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '\"></div>' +","            '<div><p>' + message + '</p></div>'","        );","","        panel = new Y.Libbit.Panel({","            bodyContent: node,","            hideOn: [],","            headerContent: title,","            zIndex: Y.all('*').size(),","            width: 500,","            buttons: [","                 {","                    value  : confirmVal,","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: true,","                    action : function () {","                        if (callback) {","                            callback();","                        }","                        panel.destroy();","                    },","                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-primary')","                 }, {","                    value  : 'No',","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: false,","                    action : function () {","                        panel.destroy();","                    },","                    classNames: 'btn'","                 }","            ],","            centered: true, modal: true, visible: true","        }).render();","","        panel.get('boundingBox').addClass('libbit-dialog');","        panel.get('boundingBox').all('.yui3-button').each(function() {","            this.removeClass('yui3-button').removeClass('yui3-button-primary');","        });","","        this.set('panel', panel);","    },","","    error: function (title, message, warning) {","        var node,","            panel;","","        if (warning) {","            node = Y.Node.create(","                '<div class=\"icon dialog_warning_icon\"></div>' +","                '<div><p>' + message + '</p></div>'","            );","        } else {","            node = Y.Node.create(","                '<div class=\"icon dialog_error_icon\"></div>' +","                '<div><p>' + message + '</p></div>'","            );","        }","","        panel = new Y.Libbit.Panel({","            bodyContent: node,","            hideOn: [],","            headerContent: title,","            zIndex: Y.all('*').size(),","            width: 500,","            buttons: [","                 {","                    value  : 'OK',","                    section: Y.WidgetStdMod.FOOTER,","                    isDefault: true,","                    action : function () {","                        panel.destroy();","                    },","                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-danger')","                 }","            ],","            centered: true, modal: true, visible: true","        }).render();","","        panel.get('boundingBox').addClass('libbit-dialog');","        panel.get('boundingBox').all('.yui3-button').each(function() {","            this.removeClass('yui3-button').removeClass('yui3-button-primary');","        });","","        this.set('panel', panel);","    }","}, {","    ATTRS: {","        error: { value: {} },","        panel: { value: null}","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Dialog = Dialog;","","","}, '1.0.0', {\"requires\": [\"dd\", \"dd-plugin\", \"json-parse\", \"node\", \"libbit-panel\", \"widget\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].lines = {"1":0,"4":0,"9":0,"17":0,"22":0,"23":0,"24":0,"27":0,"31":0,"32":0,"33":0,"35":0,"42":0,"46":0,"50":0,"51":0,"54":0,"55":0,"56":0,"58":0,"61":0,"62":0,"64":0,"66":0,"75":0,"78":0,"90":0,"91":0,"92":0,"101":0,"109":0,"110":0,"111":0,"112":0,"114":0,"115":0,"117":0,"118":0,"124":0,"125":0,"126":0,"129":0,"133":0,"136":0,"137":0,"139":0,"144":0,"156":0,"157":0,"159":0,"167":0,"175":0,"176":0,"177":0,"180":0,"184":0,"187":0,"188":0,"193":0,"199":0,"211":0,"219":0,"220":0,"221":0,"224":0,"234":0};
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].functions = {"initializer:7":0,"(anonymous 2):22":0,"_setError:16":0,"hide:41":0,"action:89":0,"action:100":0,"(anonymous 3):110":0,"(anonymous 4):125":0,"prompt:45":0,"action:155":0,"action:166":0,"(anonymous 5):176":0,"confirm:132":0,"action:210":0,"(anonymous 6):220":0,"error:183":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-dialog/libbit-dialog.js"].coveredLines = 66;
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
if (typeof(htmlTemplate) == 'string') {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 56);
input = Y.Node.create(htmlTemplate);
            } else {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 58);
input = htmlTemplate;
            }

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 61);
node = Y.Node.create('<form action="#" class="form-horizontal"></form>');
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 62);
node.append(input);
        } else {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 64);
input = Y.Node.create('<input type="text" value="' + defaultVal + '" id="input">');

            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 66);
node = Y.Node.create(
                '<form action="#" class="form-horizontal">' +
                '   <div class="icon icon_absolute dialog_prompt_icon"></div>' +
                '   <div class="control-group">' +
                '       <label for="input" class="control-label">' + question +  '</label>' +
                '       <div class="controls"></div>' +
                '   </div>' +
                '</form>'
            );
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 75);
node.one('.controls').append(input);
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 78);
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
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 89);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 90);
if (callback != null) {
                            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 91);
if (callback(node) === true) {
                                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 92);
panel.destroy();
                            }
                        }
                    },
                    classNames: 'btn btn-primary'
                 }, {
                    value  : 'Cancel',
                    section: Y.WidgetStdMod.FOOTER,
                    action : function () {
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 100);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 101);
panel.destroy();
                    },
                    classNames: 'btn'
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 109);
node.one('input,textarea,select').focus();
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 110);
node.all('input, textarea, select').on('keyup', function(e) {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 3)", 110);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 111);
if (e.button === 13) {
                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 112);
var buttons = panel.get('buttons');

                _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 114);
for (var i in buttons.footer) {
                    _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 115);
var button = buttons.footer[i];

                    _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 117);
if (button.hasClass('btn-primary')) {
                        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 118);
button.simulate('click');
                    }
                }
            }
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 124);
panel.get('boundingBox').addClass('libbit-dialog');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 125);
panel.get('boundingBox').all('.yui3-button').each(function() {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 4)", 125);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 126);
this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 129);
this.set('panel', panel);
    },

    confirm: function (title, message, callback, warning, confirmVal) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "confirm", 132);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 133);
var node,
            panel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 136);
warning = typeof warning !== 'undefined' ? warning : false;
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 137);
confirmVal = typeof confirmVal !== 'undefined' ? confirmVal : 'OK';

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 139);
node = Y.Node.create(
            '<div class="icon ' + (warning ? 'dialog_warning_icon' : 'dialog_prompt_icon') + '"></div>' +
            '<div><p>' + message + '</p></div>'
        );

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 144);
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
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 155);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 156);
if (callback) {
                            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 157);
callback();
                        }
                        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 159);
panel.destroy();
                    },
                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-primary')
                 }, {
                    value  : 'No',
                    section: Y.WidgetStdMod.FOOTER,
                    isDefault: false,
                    action : function () {
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 166);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 167);
panel.destroy();
                    },
                    classNames: 'btn'
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 175);
panel.get('boundingBox').addClass('libbit-dialog');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 176);
panel.get('boundingBox').all('.yui3-button').each(function() {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 5)", 176);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 177);
this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 180);
this.set('panel', panel);
    },

    error: function (title, message, warning) {
        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "error", 183);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 184);
var node,
            panel;

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 187);
if (warning) {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 188);
node = Y.Node.create(
                '<div class="icon dialog_warning_icon"></div>' +
                '<div><p>' + message + '</p></div>'
            );
        } else {
            _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 193);
node = Y.Node.create(
                '<div class="icon dialog_error_icon"></div>' +
                '<div><p>' + message + '</p></div>'
            );
        }

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 199);
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
                        _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "action", 210);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 211);
panel.destroy();
                    },
                    classNames: 'btn ' + (warning ? 'btn-warning' : 'btn-danger')
                 }
            ],
            centered: true, modal: true, visible: true
        }).render();

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 219);
panel.get('boundingBox').addClass('libbit-dialog');
        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 220);
panel.get('boundingBox').all('.yui3-button').each(function() {
            _yuitest_coverfunc("build/libbit-dialog/libbit-dialog.js", "(anonymous 6)", 220);
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 221);
this.removeClass('yui3-button').removeClass('yui3-button-primary');
        });

        _yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 224);
this.set('panel', panel);
    }
}, {
    ATTRS: {
        error: { value: {} },
        panel: { value: null}
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-dialog/libbit-dialog.js", 234);
Y.namespace('Libbit').Dialog = Dialog;


}, '1.0.0', {"requires": ["dd", "dd-plugin", "json-parse", "node", "libbit-panel", "widget"], "skinnable": true});
