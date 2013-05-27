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
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].code=["YUI.add('libbit-grid-select', function (Y, NAME) {","","var Selectable;","","/**"," * Y.Libbit.Grid widget extension to support selection of grid items"," */","Selectable = function () {};","","Selectable.ATTRS = {","    /**","     * Config property, enable selection for this Grid instance","     */","    selectable: {","        value: false","    },","","    /**","     * The item currently selected.","     */","    selectedItem : {","        value: null","    }","};","","Selectable.prototype = {","","    /**","     * Initializer, gets called upon instance initiation.","     */","    initializer: function () {","        this._setSelectable();","    },","","    /**","    * Programmaticly select a grid item","    **/","    select: function(node) {","        node.simulate('click');","    },","","    /**","     * Setter.","     */","    _setSelectable: function () {","        var selectable = this.get('selectable');","","        if (selectable) {","            this._bind();","        }","    },","","    /**","     * Bind the click events and set up a listener for the selectedItem attribute.","     */","    _bind: function () {","        var contentBox = this.get('contentBox');","","        contentBox.delegate('click', this._handleClick, '.model-grid-icon-container', this);","        this.after('selectedItemChange', this._afterSelectedItemChange, this);","    },","","    /**","     * Handles the item click event, and updates the selectedItem attribute,","     * which fires an event on change.","     */","    _handleClick: function (e) {","        this.set('selectedItem', e.currentTarget);","    },","","    /**","     * The selection changed, update the DOM and fire an event containing","     * the model that was selected.","     */","    _afterSelectedItemChange: function (e) {","        var contentBox = this.get('contentBox'),","            node       = e.newVal,","            oldNode    = e.prevVal,","            model;","","        // Cancel if the selection did not change.","        if (node === oldNode) {","            return false;","        }","","        // Remove earlier selections.","        contentBox.all('.model-grid-item-selected').removeClass('model-grid-item-selected');","","        // Apply the CSS to the new selection and fire an event.","        if (Y.Lang.isNull(node) === false) {","            node.addClass('model-grid-item-selected');","","            model = this._getModelFromGridItem(node);","","            // Fires the select event and passes along the needed information.","            this.fire('select', { model: model });","        }","    },","","    /**","     * Parse an HTML node and retrieve the corresponding model from the model list.","     */","    _getModelFromGridItem: function (node) {","        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),","        // for example 'image_1'.","        var id        = node.ancestor('.model-grid-container').getAttribute('data-yui3-record'),","            data      = this.get('data'),","            found     = null;","","        Y.Array.each(data, function (model) {","            if (model.get('clientId') === id) {","                found = model;","            }","        });","","        return found;","    }","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.Grid').Selectable = Selectable;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].lines = {"1":0,"3":0,"8":0,"10":0,"26":0,"32":0,"39":0,"46":0,"48":0,"49":0,"57":0,"59":0,"60":0,"68":0,"76":0,"82":0,"83":0,"87":0,"90":0,"91":0,"93":0,"96":0,"106":0,"110":0,"111":0,"112":0,"116":0,"121":0};
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].functions = {"initializer:31":0,"select:38":0,"_setSelectable:45":0,"_bind:56":0,"_handleClick:67":0,"_afterSelectedItemChange:75":0,"(anonymous 2):110":0,"_getModelFromGridItem:103":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].coveredLines = 28;
_yuitest_coverage["build/libbit-grid-select/libbit-grid-select.js"].coveredFunctions = 9;
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
    * Programmaticly select a grid item
    **/
    select: function(node) {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "select", 38);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 39);
node.simulate('click');
    },

    /**
     * Setter.
     */
    _setSelectable: function () {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_setSelectable", 45);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 46);
var selectable = this.get('selectable');

        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 48);
if (selectable) {
            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 49);
this._bind();
        }
    },

    /**
     * Bind the click events and set up a listener for the selectedItem attribute.
     */
    _bind: function () {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_bind", 56);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 57);
var contentBox = this.get('contentBox');

        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 59);
contentBox.delegate('click', this._handleClick, '.model-grid-icon-container', this);
        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 60);
this.after('selectedItemChange', this._afterSelectedItemChange, this);
    },

    /**
     * Handles the item click event, and updates the selectedItem attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_handleClick", 67);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 68);
this.set('selectedItem', e.currentTarget);
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedItemChange: function (e) {
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_afterSelectedItemChange", 75);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 76);
var contentBox = this.get('contentBox'),
            node       = e.newVal,
            oldNode    = e.prevVal,
            model;

        // Cancel if the selection did not change.
        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 82);
if (node === oldNode) {
            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 83);
return false;
        }

        // Remove earlier selections.
        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 87);
contentBox.all('.model-grid-item-selected').removeClass('model-grid-item-selected');

        // Apply the CSS to the new selection and fire an event.
        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 90);
if (Y.Lang.isNull(node) === false) {
            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 91);
node.addClass('model-grid-item-selected');

            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 93);
model = this._getModelFromGridItem(node);

            // Fires the select event and passes along the needed information.
            _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 96);
this.fire('select', { model: model });
        }
    },

    /**
     * Parse an HTML node and retrieve the corresponding model from the model list.
     */
    _getModelFromGridItem: function (node) {
        // The model's ClientID is stored within an HTML5 data attribute ('data-yui3-record'),
        // for example 'image_1'.
        _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "_getModelFromGridItem", 103);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 106);
var id        = node.ancestor('.model-grid-container').getAttribute('data-yui3-record'),
            data      = this.get('data'),
            found     = null;

        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 110);
Y.Array.each(data, function (model) {
            _yuitest_coverfunc("build/libbit-grid-select/libbit-grid-select.js", "(anonymous 2)", 110);
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 111);
if (model.get('clientId') === id) {
                _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 112);
found = model;
            }
        });

        _yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 116);
return found;
    }
};

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-grid-select/libbit-grid-select.js", 121);
Y.namespace('Libbit.Grid').Selectable = Selectable;


}, '1.0.0');
