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
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].code=["YUI.add('libbit-view-nav', function (Y, NAME) {","","var Nav;","","/**"," * Y.View extension to wrap the container into a panel with a header and footer navigation bar."," */","Nav = Y.Base.create('nav', Y.View, [], {","    /**","     * Title property, sets the panel's header content.","     */","    title : null,","","    /**","     * Buttons property, sets the panel's footer buttons.","     */","    buttons : null,","","    /**","     * Contains the footer DOM node.","     */","    _footer: null,","","    /**","     * Stores references to the created nodes","     */","    _buttonMap: {},","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        Y.Do.after(this._afterRender, this, 'render', this);","        this._buildFooter();","    },","","    /**","     * Get a button node by name.","     */","    getButton: function (name) {","        return this._buttonMap[name];","    },","","    /**","     * Wrap the view into a panel after it's rendered.","     */","    _afterRender: function () {","        var container = this.get('container'),","            header    = this.title,","            body      = Y.Node.create('<div></div>'),","            footer    = this._footer,","            config    = { bodyContent: body },","            panel;","","        container.addClass('libbit-view-nav');","        // Transfer the child nodes from the view container to the new body container.","        container.get('children').each(function (c) {","            body.append(c);","        });","","        if (header !== null) {","            config.headerContent = header;","        }","","        if (footer !== null) {","            config.footerContent = footer;","        }","","        panel = new Y.Libbit.NavContainer(config);","","        // Render the panel within the view container.","        panel.render(container);","","        // XXX: Quickfix","        var cHeight = Number(container.getComputedStyle('height').replace('px', '')) - 56;","        var bd = panel.get('boundingBox').one('.yui3-widget-bd')","        bd.setStyle('height', String(cHeight) + 'px').setStyle('overflow', 'scroll');","        // bd.setStyle('margin-bottom', '10px');","    },","","    /**","     * Build the footer buttons and bind them to fire events","    */","    _buildFooter: function () {","        var self    = this,","            buttons = this.buttons;","            footer  = Y.Node.create('<div></div>');","","        Y.Object.each(buttons, function (button, key) {","            var value     = button.value,","                primary   = button.primary,","                position  = button.position ? button.position : 'left',","                title     = button.title ? button.title : (value ? value : null),","                disabled  = button.disabled,","                className = button.className,","                icon      = button.icon,","                // Format the action event by prepending 'button', for example the event","                // fired for 'cancel' will be 'buttonCancel'","                action    = 'button' + self._capitalizeFirstLetter(key),","                node      = Y.Node.create('<button class=\"btn\"></button>');","","            if (value) {","                node.set('text', value);","            }","","            if (title) {","                node.set('title', title);","            }","","            if (icon) {","                node.append(Y.Node.create('<i class=\"' + icon + '\"></i>'));","            }","","            if (primary) {","                node.addClass('btn-primary');","            }","","            if (disabled) {","                node.addClass('disabled');","            }","","            if (className) {","                node.addClass(className);","            }","","            node.addClass('float-' + position);","","            node.on('click', function (e) {","                var btn = e.target;","","                if (btn.hasClass('disabled') === false) {","                    self.fire(action);","                }","            });","","            footer.append(node);","","            self._buttonMap[key] = node;","        });","","        this._footer = footer;","    },","","    /**","     * Capitalize the first letter of a given string","     */","    _capitalizeFirstLetter: function (value) {","        return value.charAt(0).toUpperCase() + value.slice(1);","    },","","    /**","     * Magic function to update the buttons properties","     */","    _setButtons: function (value) {","        var self    = this,","            footer  = this.get('container').one('.yui3-widget-ft'),","            buttons = this.buttons;","","        Y.Object.each(value, function (properties, key) {","            self.buttons[key] = Y.merge(buttons[key], properties);","        });","","        // TODO: Update instead of rerendering.","        this._buildFooter();","        footer.one('div').replace(this._footer);","    },","","    /**","     * Magic function to get the current button properties","     */","     _getButtons: function () {","        return this.buttons;","    }","","}, {","    ATTRS: {","        buttons: {","            setter: '_setButtons',","            getter: '_getButtons'","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.View').Nav = Nav;","","","}, '1.0.0', {\"requires\": [\"event-custom\", \"libbit-nav-container\", \"view\"]});"];
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].lines = {"1":0,"3":0,"8":0,"33":0,"34":0,"41":0,"48":0,"55":0,"57":0,"58":0,"61":0,"62":0,"65":0,"66":0,"69":0,"72":0,"75":0,"76":0,"77":0,"85":0,"87":0,"89":0,"90":0,"102":0,"103":0,"106":0,"107":0,"110":0,"111":0,"114":0,"115":0,"118":0,"119":0,"122":0,"123":0,"126":0,"128":0,"129":0,"131":0,"132":0,"136":0,"138":0,"141":0,"148":0,"155":0,"159":0,"160":0,"164":0,"165":0,"172":0,"185":0};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].functions = {"initializer:32":0,"getButton:40":0,"(anonymous 2):57":0,"_afterRender:47":0,"(anonymous 4):128":0,"(anonymous 3):89":0,"_buildFooter:84":0,"_capitalizeFirstLetter:147":0,"(anonymous 5):159":0,"_setButtons:154":0,"_getButtons:171":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-view-nav/libbit-view-nav.js"].coveredLines = 51;
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

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 55);
container.addClass('libbit-view-nav');
        // Transfer the child nodes from the view container to the new body container.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 57);
container.get('children').each(function (c) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 2)", 57);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 58);
body.append(c);
        });

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 61);
if (header !== null) {
            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 62);
config.headerContent = header;
        }

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 65);
if (footer !== null) {
            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 66);
config.footerContent = footer;
        }

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 69);
panel = new Y.Libbit.NavContainer(config);

        // Render the panel within the view container.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 72);
panel.render(container);

        // XXX: Quickfix
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 75);
var cHeight = Number(container.getComputedStyle('height').replace('px', '')) - 56;
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 76);
var bd = panel.get('boundingBox').one('.yui3-widget-bd')
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 77);
bd.setStyle('height', String(cHeight) + 'px').setStyle('overflow', 'scroll');
        // bd.setStyle('margin-bottom', '10px');
    },

    /**
     * Build the footer buttons and bind them to fire events
    */
    _buildFooter: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_buildFooter", 84);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 85);
var self    = this,
            buttons = this.buttons;
            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 87);
footer  = Y.Node.create('<div></div>');

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 89);
Y.Object.each(buttons, function (button, key) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 3)", 89);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 90);
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

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 102);
if (value) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 103);
node.set('text', value);
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 106);
if (title) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 107);
node.set('title', title);
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 110);
if (icon) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 111);
node.append(Y.Node.create('<i class="' + icon + '"></i>'));
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 114);
if (primary) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 115);
node.addClass('btn-primary');
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 118);
if (disabled) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 119);
node.addClass('disabled');
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 122);
if (className) {
                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 123);
node.addClass(className);
            }

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 126);
node.addClass('float-' + position);

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 128);
node.on('click', function (e) {
                _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 4)", 128);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 129);
var btn = e.target;

                _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 131);
if (btn.hasClass('disabled') === false) {
                    _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 132);
self.fire(action);
                }
            });

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 136);
footer.append(node);

            _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 138);
self._buttonMap[key] = node;
        });

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 141);
this._footer = footer;
    },

    /**
     * Capitalize the first letter of a given string
     */
    _capitalizeFirstLetter: function (value) {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_capitalizeFirstLetter", 147);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 148);
return value.charAt(0).toUpperCase() + value.slice(1);
    },

    /**
     * Magic function to update the buttons properties
     */
    _setButtons: function (value) {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_setButtons", 154);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 155);
var self    = this,
            footer  = this.get('container').one('.yui3-widget-ft'),
            buttons = this.buttons;

        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 159);
Y.Object.each(value, function (properties, key) {
            _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "(anonymous 5)", 159);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 160);
self.buttons[key] = Y.merge(buttons[key], properties);
        });

        // TODO: Update instead of rerendering.
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 164);
this._buildFooter();
        _yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 165);
footer.one('div').replace(this._footer);
    },

    /**
     * Magic function to get the current button properties
     */
     _getButtons: function () {
        _yuitest_coverfunc("build/libbit-view-nav/libbit-view-nav.js", "_getButtons", 171);
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 172);
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
_yuitest_coverline("build/libbit-view-nav/libbit-view-nav.js", 185);
Y.namespace('Libbit.View').Nav = Nav;


}, '1.0.0', {"requires": ["event-custom", "libbit-nav-container", "view"]});
