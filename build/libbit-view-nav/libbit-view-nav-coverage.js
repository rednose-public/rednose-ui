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
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-view-nav/libbit-view-nav.js",
    code: []
};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].code=["YUI.add('libbit-view-nav', function (Y, NAME) {","","var Nav;","","/**"," * Y.View extension to wrap the container into a panel with a header and footer navigation bar."," */","Nav = Y.Base.create('nav', Y.View, [], {","    /**","     * Title property, sets the panel's header content.","     */","    title : null,","","    /**","     * Buttons property, sets the panel's footer buttons.","     */","    buttons : null,","","    /**","     * Contains the footer DOM node.","     */","    _footer: null,","","    /**","     * Stores references to the created nodes","     */","    _buttonMap: {},","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        Y.Do.after(this._afterRender, this, 'render', this);","        this._buildFooter();","    },","","    /**","     * Get a button node by name.","     */","    getButton: function (name) {","        return this._buttonMap[name];","    },","","    /**","     * Wrap the view into a panel after it's rendered.","     */","    _afterRender: function () {","        var container = this.get('container'),","            header    = this.title,","            body      = Y.Node.create('<div></div>'),","            footer    = this._footer,","            config    = { bodyContent: body },","            panel;","","        // Transfer the child nodes from the view container to the new body container.","        container.get('children').each(function (c) {","            body.append(c);","        });","","        if (header !== null) {","            config.headerContent = header;","        }","","        if (footer !== null) {","            config.footerContent = footer;","        }","","        panel = new Y.Libbit.NavContainer(config);","        panel.get('contentBox').addClass('libbit-view-nav');","","        // Render the panel within the view container.","        panel.render(container);","    },","","    /**","     * Build the footer buttons and bind them to fire events","     */","    _buildFooter: function () {","        var self    = this,","            buttons = this.buttons;","            footer  = Y.Node.create('<div></div>');","","        Y.Object.each(buttons, function (button, key) {","            var value     = button.value,","                primary   = button.primary,","                position  = button.position ? button.position : 'left',","                title     = button.title ? button.title : (value ? value : null),","                disabled  = button.disabled,","                className = button.className,","                icon      = button.icon,","                // Format the action event by prepending 'button', for example the event","                // fired for 'cancel' will be 'buttonCancel'","                action    = 'button' + self._capitalizeFirstLetter(key),","                node      = Y.Node.create('<button class=\"btn\"></button>');","","            if (value) {","                node.set('text', value);","            }","","            if (title) {","                node.set('title', title);","            }","","            if (icon) {","                node.append(Y.Node.create('<i class=\"' + icon + '\"></i>'));","            }","","            if (primary) {","                node.addClass('btn-primary');","            }","","            if (disabled) {","                node.addClass('disabled');","            }","","            if (className) {","                node.addClass(className);","            }","","            node.addClass('float-' + position);","","            node.on('click', function (e) {","                var btn = e.target;","","                if (btn.hasClass('disabled') === false) {","                    self.fire(action);","                }","            });","","            footer.append(node);","","            self._buttonMap[key] = node;","        });","","        this._footer = footer;","    },","","    /**","     * Capitalize the first letter of a given string","     */","    _capitalizeFirstLetter: function (value) {","        return value.charAt(0).toUpperCase() + value.slice(1);","    },","","    /**","     * Magic function to update the buttons properties","     */","    _setButtons: function (value) {","        var self    = this,","            footer  = this.get('container').one('.yui3-widget-ft'),","            buttons = this.buttons;","","        Y.Object.each(value, function (properties, key) {","            self.buttons[key] = Y.merge(buttons[key], properties);","        });","","        // TODO: Update instead of rerendering.","        this._buildFooter();","        footer.one('div').replace(this._footer);","    },","","    /**","     * Magic function to get the current button properties","     */","     _getButtons: function () {","        return this.buttons;","    }","","}, {","    ATTRS: {","        buttons: {","            setter: '_setButtons',","            getter: '_getButtons'","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.View').Nav = Nav;","","","}, '1.0.0', {\"requires\": [\"event-custom\", \"libbit-nav-container\", \"libbit-view-nav-css\", \"view\"]});"];
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].lines = {"1":0,"3":0,"8":0,"33":0,"34":0,"41":0,"48":0,"56":0,"57":0,"60":0,"61":0,"64":0,"65":0,"68":0,"69":0,"72":0,"79":0,"81":0,"83":0,"84":0,"96":0,"97":0,"100":0,"101":0,"104":0,"105":0,"108":0,"109":0,"112":0,"113":0,"116":0,"117":0,"120":0,"122":0,"123":0,"125":0,"126":0,"130":0,"132":0,"135":0,"142":0,"149":0,"153":0,"154":0,"158":0,"159":0,"166":0,"179":0};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].functions = {"initializer:32":0,"getButton:40":0,"(anonymous 2):56":0,"_afterRender:47":0,"(anonymous 4):122":0,"(anonymous 3):83":0,"_buildFooter:78":0,"_capitalizeFirstLetter:141":0,"(anonymous 5):153":0,"_setButtons:148":0,"_getButtons:165":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].coveredLines = 48;
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].coveredFunctions = 12;
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 1);
YUI.add('libbit-view-nav', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 3);
var Nav;

/**
 * Y.View extension to wrap the container into a panel with a header and footer navigation bar.
 */
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 8);
Nav = Y.Base.create('nav', Y.View, [], {
    /**
     * Title property, sets the panel's header content.
     */
    title : null,

    /**
     * Buttons property, sets the panel's footer buttons.
     */
    buttons : null,

    /**
     * Contains the footer DOM node.
     */
    _footer: null,

    /**
     * Stores references to the created nodes
     */
    _buttonMap: {},

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "initializer", 32);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 33);
Y.Do.after(this._afterRender, this, 'render', this);
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 34);
this._buildFooter();
    },

    /**
     * Get a button node by name.
     */
    getButton: function (name) {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "getButton", 40);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 41);
return this._buttonMap[name];
    },

    /**
     * Wrap the view into a panel after it's rendered.
     */
    _afterRender: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_afterRender", 47);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 48);
var container = this.get('container'),
            header    = this.title,
            body      = Y.Node.create('<div></div>'),
            footer    = this._footer,
            config    = { bodyContent: body },
            panel;

        // Transfer the child nodes from the view container to the new body container.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 56);
container.get('children').each(function (c) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 2)", 56);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 57);
body.append(c);
        });

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 60);
if (header !== null) {
            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 61);
config.headerContent = header;
        }

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 64);
if (footer !== null) {
            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 65);
config.footerContent = footer;
        }

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 68);
panel = new Y.Libbit.NavContainer(config);
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 69);
panel.get('contentBox').addClass('libbit-view-nav');

        // Render the panel within the view container.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 72);
panel.render(container);
    },

    /**
     * Build the footer buttons and bind them to fire events
     */
    _buildFooter: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_buildFooter", 78);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 79);
var self    = this,
            buttons = this.buttons;
            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 81);
footer  = Y.Node.create('<div></div>');

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 83);
Y.Object.each(buttons, function (button, key) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 3)", 83);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 84);
var value     = button.value,
                primary   = button.primary,
                position  = button.position ? button.position : 'left',
                title     = button.title ? button.title : (value ? value : null),
                disabled  = button.disabled,
                className = button.className,
                icon      = button.icon,
                // Format the action event by prepending 'button', for example the event
                // fired for 'cancel' will be 'buttonCancel'
                action    = 'button' + self._capitalizeFirstLetter(key),
                node      = Y.Node.create('<button class="btn"></button>');

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 96);
if (value) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 97);
node.set('text', value);
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 100);
if (title) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 101);
node.set('title', title);
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 104);
if (icon) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 105);
node.append(Y.Node.create('<i class="' + icon + '"></i>'));
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 108);
if (primary) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 109);
node.addClass('btn-primary');
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 112);
if (disabled) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 113);
node.addClass('disabled');
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 116);
if (className) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 117);
node.addClass(className);
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 120);
node.addClass('float-' + position);

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 122);
node.on('click', function (e) {
                _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 4)", 122);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 123);
var btn = e.target;

                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 125);
if (btn.hasClass('disabled') === false) {
                    _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 126);
self.fire(action);
                }
            });

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 130);
footer.append(node);

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 132);
self._buttonMap[key] = node;
        });

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 135);
this._footer = footer;
    },

    /**
     * Capitalize the first letter of a given string
     */
    _capitalizeFirstLetter: function (value) {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_capitalizeFirstLetter", 141);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 142);
return value.charAt(0).toUpperCase() + value.slice(1);
    },

    /**
     * Magic function to update the buttons properties
     */
    _setButtons: function (value) {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_setButtons", 148);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 149);
var self    = this,
            footer  = this.get('container').one('.yui3-widget-ft'),
            buttons = this.buttons;

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 153);
Y.Object.each(value, function (properties, key) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 5)", 153);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 154);
self.buttons[key] = Y.merge(buttons[key], properties);
        });

        // TODO: Update instead of rerendering.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 158);
this._buildFooter();
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 159);
footer.one('div').replace(this._footer);
    },

    /**
     * Magic function to get the current button properties
     */
     _getButtons: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_getButtons", 165);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 166);
return this.buttons;
    }

}, {
    ATTRS: {
        buttons: {
            setter: '_setButtons',
            getter: '_getButtons'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 179);
Y.namespace('Libbit.View').Nav = Nav;


}, '1.0.0', {"requires": ["event-custom", "libbit-nav-container", "libbit-view-nav-css", "view"]});
