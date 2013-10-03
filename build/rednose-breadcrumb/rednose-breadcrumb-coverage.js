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
_yuitest_coverage["build/rednose-breadcrumb/rednose-breadcrumb.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/rednose-breadcrumb/rednose-breadcrumb.js",
    code: []
};
_yuitest_coverage["build/rednose-breadcrumb/rednose-breadcrumb.js"].code=["YUI.add('rednose-breadcrumb', function (Y, NAME) {","","/* jshint expr:true, onevar:false */","","/**","Provides an interactive breadcrumb based on a path.","","@module renodse-breadcrumb","**/","var CSS_BOOTSTRAP_BREADCRUMB = 'breadcrumb',","    CSS_BOOTSTRAP_DIVIDER    = 'divider',","    CSS_BOOTSTRAP_ACTIVE     = 'active',","","    ATTR_DATA_ENTRY = 'data-rednose-entry',","","    // Value for the top-level crumb.","    TEXT_HOME = 'Home',","","    /**","    @event navigate","    **/","    EVT_NAVIGATE = 'navigate';","","/**","Provides an interactive breadcrumb based on a path.","","@class Breadcrumb","@namespace Rednose","@constructor","@extends View","**/","var Breadcrumb = Y.Base.create('breadcrumb', Y.View, [], {","    // -- Protected Properties ---------------------------------------------","","    /**","    Template for the breadcrumb <ul/>","    @property","    @type {String}","    @protected","    **/","    _UL_TEMPLATE: '<ul class=\"{className}\"></ul>',","","    /**","    Template for the breadcrumb <li/> items","    @property","    @type {String}","    @protected","    **/","    _LI_ITEM_TEMPLATE: '<li><a href=\"#\">{itemLabel}</a> <span class=\"{dividerClass}\">/</span></li>',","","    /**","    Template for the breadcrumb trailing <li/> item","    @property","    @type {String}","    @protected","    **/","    _LI_ITEM_TRAILING_TEMPLATE: '<li class=\"{activeClass}\"><span>{itemLabel}</span></li>',","","    /**","    UI delegation events","","    @property events","    @type {Object}","    @protected","    **/","    events: {","        'a': {","            click: '_handleClick'","        }","    },","","    /**","    @property _breadcrumbs","    @type {Array}","    @protected","    **/","    _breadcrumbs: [],","","    // -- Lifecycle Methods ------------------------------------------------","","    /**","    @method initializer","    @protected","    **/","    initializer: function () {","        var container = this.get('container');","","        container.setContent(Y.Lang.sub(this._UL_TEMPLATE, {","            className: CSS_BOOTSTRAP_BREADCRUMB","        }));","","        this.after('pathChange', this.render, this);","    },","","    /**","    @method destructor","    @protected","    **/","    destructor: function () {","        this._breadcrumbs = null;","    },","","    // -- Public Methods ---------------------------------------------------","","    /**","    @method render","    @public","    @chainable","    **/","    render: function () {","        var container = this.get('container'),","            items     = this._breadcrumbs,","            self      = this;","","        container.one('ul').empty();","","        if (items instanceof Array && items.length > 0) {","            Y.Array.each(items, function (item, index) {","                var li;","","                if ((index + 1) === items.length) {","                    li = Y.Node.create(Y.Lang.sub(self._LI_ITEM_TRAILING_TEMPLATE, {","                        activeClass: CSS_BOOTSTRAP_ACTIVE,","                        itemLabel  : item.label","                    }));","                } else {","                    li = Y.Node.create(Y.Lang.sub(self._LI_ITEM_TEMPLATE, {","                        dividerClass: CSS_BOOTSTRAP_DIVIDER,","                        itemLabel   : item.label","                    }));","                }","","                if (item.data) {","                    li.setAttribute(ATTR_DATA_ENTRY, item.data);","                }","","                container.one('ul').append(li);","            });","        }","","        return this;","    },","","    // -- Protected Event Handlers -----------------------------------------","","    /**","    @method _handleClick","    @param {EventFacade} e The event","    @protected","    **/","    _handleClick: function (e) {","        e.preventDefault();","","        var li   = e.currentTarget.ancestor('li'),","            data = li.getAttribute(ATTR_DATA_ENTRY);","","        if (data) {","            this.fire(EVT_NAVIGATE, { data: data });","        }","    },","","    /**","    Setter, update the breadcrumbs after parsing the path string.","","    @method _setPath","    @param {String} path Path","    @protected","    **/","    _setPath: function (path) {","        var parts      = path === '/' ? [ TEXT_HOME ] : path.split('/'),","            pathBuffer = '/';","            crumbs     = [];","","        Y.Array.each(parts, function (part) {","            pathBuffer += part;","","            crumbs.push({","                label: part === '' ? TEXT_HOME : part,","                data : pathBuffer","            });","","            pathBuffer !== '/' && (pathBuffer += '/');","        });","","        this._breadcrumbs = crumbs;","","        return path;","    }","}, {","    ATTRS: {","        /**","        Set the path for the breadcrumbs.","","        @attribute path","        @type {String}","        **/","        path: {","            // Call the setter instantly when initializing the object.","            lazyAdd: false,","            value  : '/',","            setter : '_setPath'","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Breadcrumb = Breadcrumb;","","","}, '1.1.0-DEV', {\"requires\": [\"base\", \"view\"]});"];
_yuitest_coverage["build/rednose-breadcrumb/rednose-breadcrumb.js"].lines = {"1":0,"10":0,"32":0,"86":0,"88":0,"92":0,"100":0,"111":0,"115":0,"117":0,"118":0,"119":0,"121":0,"122":0,"127":0,"133":0,"134":0,"137":0,"141":0,"152":0,"154":0,"157":0,"158":0,"170":0,"172":0,"174":0,"175":0,"177":0,"182":0,"185":0,"187":0,"207":0};
_yuitest_coverage["build/rednose-breadcrumb/rednose-breadcrumb.js"].functions = {"initializer:85":0,"destructor:99":0,"(anonymous 2):118":0,"render:110":0,"_handleClick:151":0,"(anonymous 3):174":0,"_setPath:169":0,"(anonymous 1):1":0};
_yuitest_coverage["build/rednose-breadcrumb/rednose-breadcrumb.js"].coveredLines = 32;
_yuitest_coverage["build/rednose-breadcrumb/rednose-breadcrumb.js"].coveredFunctions = 8;
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 1);
YUI.add('rednose-breadcrumb', function (Y, NAME) {

/* jshint expr:true, onevar:false */

/**
Provides an interactive breadcrumb based on a path.

@module renodse-breadcrumb
**/
_yuitest_coverfunc("build/rednose-breadcrumb/rednose-breadcrumb.js", "(anonymous 1)", 1);
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 10);
var CSS_BOOTSTRAP_BREADCRUMB = 'breadcrumb',
    CSS_BOOTSTRAP_DIVIDER    = 'divider',
    CSS_BOOTSTRAP_ACTIVE     = 'active',

    ATTR_DATA_ENTRY = 'data-rednose-entry',

    // Value for the top-level crumb.
    TEXT_HOME = 'Home',

    /**
    @event navigate
    **/
    EVT_NAVIGATE = 'navigate';

/**
Provides an interactive breadcrumb based on a path.

@class Breadcrumb
@namespace Rednose
@constructor
@extends View
**/
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 32);
var Breadcrumb = Y.Base.create('breadcrumb', Y.View, [], {
    // -- Protected Properties ---------------------------------------------

    /**
    Template for the breadcrumb <ul/>
    @property
    @type {String}
    @protected
    **/
    _UL_TEMPLATE: '<ul class="{className}"></ul>',

    /**
    Template for the breadcrumb <li/> items
    @property
    @type {String}
    @protected
    **/
    _LI_ITEM_TEMPLATE: '<li><a href="#">{itemLabel}</a> <span class="{dividerClass}">/</span></li>',

    /**
    Template for the breadcrumb trailing <li/> item
    @property
    @type {String}
    @protected
    **/
    _LI_ITEM_TRAILING_TEMPLATE: '<li class="{activeClass}"><span>{itemLabel}</span></li>',

    /**
    UI delegation events

    @property events
    @type {Object}
    @protected
    **/
    events: {
        'a': {
            click: '_handleClick'
        }
    },

    /**
    @property _breadcrumbs
    @type {Array}
    @protected
    **/
    _breadcrumbs: [],

    // -- Lifecycle Methods ------------------------------------------------

    /**
    @method initializer
    @protected
    **/
    initializer: function () {
        _yuitest_coverfunc("build/rednose-breadcrumb/rednose-breadcrumb.js", "initializer", 85);
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 86);
var container = this.get('container');

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 88);
container.setContent(Y.Lang.sub(this._UL_TEMPLATE, {
            className: CSS_BOOTSTRAP_BREADCRUMB
        }));

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 92);
this.after('pathChange', this.render, this);
    },

    /**
    @method destructor
    @protected
    **/
    destructor: function () {
        _yuitest_coverfunc("build/rednose-breadcrumb/rednose-breadcrumb.js", "destructor", 99);
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 100);
this._breadcrumbs = null;
    },

    // -- Public Methods ---------------------------------------------------

    /**
    @method render
    @public
    @chainable
    **/
    render: function () {
        _yuitest_coverfunc("build/rednose-breadcrumb/rednose-breadcrumb.js", "render", 110);
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 111);
var container = this.get('container'),
            items     = this._breadcrumbs,
            self      = this;

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 115);
container.one('ul').empty();

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 117);
if (items instanceof Array && items.length > 0) {
            _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 118);
Y.Array.each(items, function (item, index) {
                _yuitest_coverfunc("build/rednose-breadcrumb/rednose-breadcrumb.js", "(anonymous 2)", 118);
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 119);
var li;

                _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 121);
if ((index + 1) === items.length) {
                    _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 122);
li = Y.Node.create(Y.Lang.sub(self._LI_ITEM_TRAILING_TEMPLATE, {
                        activeClass: CSS_BOOTSTRAP_ACTIVE,
                        itemLabel  : item.label
                    }));
                } else {
                    _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 127);
li = Y.Node.create(Y.Lang.sub(self._LI_ITEM_TEMPLATE, {
                        dividerClass: CSS_BOOTSTRAP_DIVIDER,
                        itemLabel   : item.label
                    }));
                }

                _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 133);
if (item.data) {
                    _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 134);
li.setAttribute(ATTR_DATA_ENTRY, item.data);
                }

                _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 137);
container.one('ul').append(li);
            });
        }

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 141);
return this;
    },

    // -- Protected Event Handlers -----------------------------------------

    /**
    @method _handleClick
    @param {EventFacade} e The event
    @protected
    **/
    _handleClick: function (e) {
        _yuitest_coverfunc("build/rednose-breadcrumb/rednose-breadcrumb.js", "_handleClick", 151);
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 152);
e.preventDefault();

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 154);
var li   = e.currentTarget.ancestor('li'),
            data = li.getAttribute(ATTR_DATA_ENTRY);

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 157);
if (data) {
            _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 158);
this.fire(EVT_NAVIGATE, { data: data });
        }
    },

    /**
    Setter, update the breadcrumbs after parsing the path string.

    @method _setPath
    @param {String} path Path
    @protected
    **/
    _setPath: function (path) {
        _yuitest_coverfunc("build/rednose-breadcrumb/rednose-breadcrumb.js", "_setPath", 169);
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 170);
var parts      = path === '/' ? [ TEXT_HOME ] : path.split('/'),
            pathBuffer = '/';
            _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 172);
crumbs     = [];

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 174);
Y.Array.each(parts, function (part) {
            _yuitest_coverfunc("build/rednose-breadcrumb/rednose-breadcrumb.js", "(anonymous 3)", 174);
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 175);
pathBuffer += part;

            _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 177);
crumbs.push({
                label: part === '' ? TEXT_HOME : part,
                data : pathBuffer
            });

            _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 182);
pathBuffer !== '/' && (pathBuffer += '/');
        });

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 185);
this._breadcrumbs = crumbs;

        _yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 187);
return path;
    }
}, {
    ATTRS: {
        /**
        Set the path for the breadcrumbs.

        @attribute path
        @type {String}
        **/
        path: {
            // Call the setter instantly when initializing the object.
            lazyAdd: false,
            value  : '/',
            setter : '_setPath'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/rednose-breadcrumb/rednose-breadcrumb.js", 207);
Y.namespace('Rednose').Breadcrumb = Breadcrumb;


}, '1.1.0-DEV', {"requires": ["base", "view"]});
