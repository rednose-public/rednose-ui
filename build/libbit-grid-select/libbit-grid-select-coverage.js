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
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-grid-select/libbit-grid-select.js",
    code: []
};
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].code=["YUI.add('libbit-grid-select', function (Y, NAME) {","","var Selectable;","","/**"," * Y.Libbit.Grid widget extension to support selection of grid items"," */","Selectable = function () {};","","Selectable.ATTRS = {","    /**","     * Config property, enable selection for this Grid instance","     */","    selectable: {","        value: false","    },","","    /**","     * The item currently selected.","     */","    selectedItem : {","        value: null","    }","};","","Selectable.prototype = {","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        this._setSelectable();","    },","","    /**","     * Setter.","     */","    _setSelectable: function () {","        var selectable = this.get('selectable');","","        if (selectable) {","            this._bind();","        }","    },","","    /**","     * Bind the click events and set up a listener for the selectedItem attribute.","     */","    _bind: function () {","        var contentBox = this.get('contentBox');","","        contentBox.delegate('click', this._handleClick, '.template-grid-icon-container', this);","        this.after('selectedItemChange', this._afterSelectedItemChange, this);","    },","","    /**","     * Handles the item click event, and updates the selectedItem attribute,","     * which fires an event on change.","     */","    _handleClick: function (e) {","        this.set('selectedItem', e.currentTarget);","    },","","    /**","     * The selection changed, update the DOM and fire an event containing","     * the model that was selected.","     */","    _afterSelectedItemChange: function (e) {","        var contentBox = this.get('contentBox'),","            node       = e.newVal,","            oldNode    = e.prevVal,","            model;","","        // Cancel if the selection did not change.","        if (node === oldNode) {","            return false;","        }","","        // Remove earlier selections.","        contentBox.all('.template_list_item_selected').removeClass('template_list_item_selected');","","        // Apply the CSS to the new selection and fire an event.","        if (Y.Lang.isNull(node) === false) {","            node.addClass('template_list_item_selected');","","            model = this._getModelFromGridItem(node);","","            // Fires the select event and passes along the needed information.","            this.fire('select', { model: model });","        }","    },","","    /**","     * Parse an HTML node and retrieve the corresponding model from the model list.","     */","    _getModelFromGridItem: function (node) {","        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),","        // for example 'image_1'.","        var id        = node.ancestor('.template-grid-container').getAttribute('data-yui3-record'),","            data      = this.get('data'),","            found     = null;","","        Y.Array.each(data, function (model) {","            if (model.get('clientId') === id) {","                found = model;","            }","        });","","        return found;","    }","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.Grid').Selectable = Selectable;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].lines = {"1":0,"3":0,"8":0,"10":0,"26":0,"32":0,"39":0,"41":0,"42":0,"50":0,"52":0,"53":0,"61":0,"69":0,"75":0,"76":0,"80":0,"83":0,"84":0,"86":0,"89":0,"99":0,"103":0,"104":0,"105":0,"109":0,"114":0};
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].functions = {"initializer:31":0,"_setSelectable:38":0,"_bind:49":0,"_handleClick:60":0,"_afterSelectedItemChange:68":0,"(anonymous 2):103":0,"_getModelFromGridItem:96":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].coveredLines = 27;
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].coveredFunctions = 8;
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 1);
YUI.add('libbit-grid-select', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 3);
var Selectable;

/**
 * Y.Libbit.Grid widget extension to support selection of grid items
 */
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 8);
Selectable = function () {};

_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 10);
Selectable.ATTRS = {
    /**
     * Config property, enable selection for this Grid instance
     */
    selectable: {
        value: false
    },

    /**
     * The item currently selected.
     */
    selectedItem : {
        value: null
    }
};

_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 26);
Selectable.prototype = {

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "initializer", 31);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 32);
this._setSelectable();
    },

    /**
     * Setter.
     */
    _setSelectable: function () {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_setSelectable", 38);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 39);
var selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 41);
if (selectable) {
            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 42);
this._bind();
        }
    },

    /**
     * Bind the click events and set up a listener for the selectedItem attribute.
     */
    _bind: function () {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_bind", 49);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 50);
var contentBox = this.get('contentBox');

        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 52);
contentBox.delegate('click', this._handleClick, '.template-grid-icon-container', this);
        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 53);
this.after('selectedItemChange', this._afterSelectedItemChange, this);
    },

    /**
     * Handles the item click event, and updates the selectedItem attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_handleClick", 60);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 61);
this.set('selectedItem', e.currentTarget);
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedItemChange: function (e) {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_afterSelectedItemChange", 68);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 69);
var contentBox = this.get('contentBox'),
            node       = e.newVal,
            oldNode    = e.prevVal,
            model;

        // Cancel if the selection did not change.
        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 75);
if (node === oldNode) {
            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 76);
return false;
        }

        // Remove earlier selections.
        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 80);
contentBox.all('.template_list_item_selected').removeClass('template_list_item_selected');

        // Apply the CSS to the new selection and fire an event.
        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 83);
if (Y.Lang.isNull(node) === false) {
            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 84);
node.addClass('template_list_item_selected');

            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 86);
model = this._getModelFromGridItem(node);

            // Fires the select event and passes along the needed information.
            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 89);
this.fire('select', { model: model });
        }
    },

    /**
     * Parse an HTML node and retrieve the corresponding model from the model list.
     */
    _getModelFromGridItem: function (node) {
        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),
        // for example 'image_1'.
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_getModelFromGridItem", 96);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 99);
var id        = node.ancestor('.template-grid-container').getAttribute('data-yui3-record'),
            data      = this.get('data'),
            found     = null;

        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 103);
Y.Array.each(data, function (model) {
            _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "(anonymous 2)", 103);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 104);
if (model.get('clientId') === id) {
                _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 105);
found = model;
            }
        });

        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 109);
return found;
    }
};

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 114);
Y.namespace('Libbit.Grid').Selectable = Selectable;


}, '1.0.0');
