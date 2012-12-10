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
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview-select/libbit-treeview-select.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].code=["YUI.add('libbit-treeview-select', function (Y, NAME) {","","/**"," * Selection extension for the LiBBiT TreeView widget."," */","var Selectable;","","Selectable = Y.Base.create('selectable', Y.Base, [], {","","    /**","     * Set up a listener for the selectedItem attribute.","     */","    initializer: function () {","        // FIXME: The custom setter won't trigger if we don't get the attribute first.","        this.get('selectable');","","        this.after('selectedItemChange', this._afterSelectedItemChange, this);","    },","","    /**","     * Setter.","     */","    _setSelectable: function (selectable) {","        if (selectable === true) {","            this._bind();","        }","","        return selectable;","    },","","    /**","     * Bind the click events.","     */","    _bind: function () {","        var contentBox = this.get('contentBox');","","        contentBox.on('click', this._handleClick, this);","    },","","    /**","     * Handles the click event, and updates the selectedItem attribute,","     * which fires an event on change.","     */","    _handleClick: function (e) {","        var target = e.target;","","        if (target.hasClass('icon-toggle')) {","            // This is an expand/collapse icon, ignore.","            return false;","","        } else if (e.target.ancestor('.ygtvtable')) {","            // This is a tree view item, update the selection.","            this.set('selectedItem', target.ancestor('.ygtvtable'));","","        /*} else if (e.target.ancestor('.yui3-datatable-columns')) {","            // This is a table column, ignore.","            return false;*/","","        } else {","            // Clicked outside the items, reset the selection.","            this.set('selectedItem', null);","        }","","        return true;","    },","","    /**","     * The selection changed, update the DOM and fire an event containing","     * the model that was selected.","     */","    _afterSelectedItemChange: function (e) {","        // TODO: Keep selection after sorting","        var node    = e.newVal,","            oldNode = e.prevVal,","            data    = this.get('data'),","            model   = null,","            leaves  = null,","            id;","","        // Cancel if the selection did not change.","        if (node === oldNode) {","            return false;","        }","","        // Remove all selection CSS on the previous selection","        if (oldNode) {","            // Inverse the icon color if there is one.","            if (oldNode.all('i')) {","                oldNode.all('i').removeClass('icon-white');","            }","","            oldNode.removeClass('treeview-highlight');","        }","","        // Apply the CSS to the new selection and fire an event.","        if (Y.Lang.isNull(node) === false) {","            id = node.getAttribute('data-yui3-record');","","            // Inverse the icon color if there is one.","            if (node.all('i')) {","                node.all('i').addClass('icon-white');","            }","","            // After unhighlighting, now highlight the current row.","            node.addClass('treeview-highlight');","","            model  = data.getByClientId(id);","            leaves = data.getLeavesByClientId(id);","        }","","        // Fires the select event and passes along the needed information.","        this.fire('select', { model : model, leaves: leaves });","","        return true;","    }","","}, {","    ATTRS: {","        /**","         * Config property, enable selection for this TreeView instance","         */","        selectable: {","            setter: '_setSelectable',","            value : false","        },","","        /**","         * The item currently selected.","         */","        selectedItem : {","            value: null","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Selectable = Selectable;","","","}, '1.0.0');"];
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].lines = {"1":0,"6":0,"8":0,"15":0,"17":0,"24":0,"25":0,"28":0,"35":0,"37":0,"45":0,"47":0,"49":0,"51":0,"53":0,"61":0,"64":0,"73":0,"81":0,"82":0,"86":0,"88":0,"89":0,"92":0,"96":0,"97":0,"100":0,"101":0,"105":0,"107":0,"108":0,"112":0,"114":0,"137":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].functions = {"initializer:13":0,"_setSelectable:23":0,"_bind:34":0,"_handleClick:44":0,"_afterSelectedItemChange:71":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredLines = 34;
_yuitest_coverage["build/libbit-treeview-select/libbit-treeview-select.js"].coveredFunctions = 6;
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 1);
YUI.add('libbit-treeview-select', function (Y, NAME) {

/**
 * Selection extension for the LiBBiT TreeView widget.
 */
_yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 6);
var Selectable;

_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 8);
Selectable = Y.Base.create('selectable', Y.Base, [], {

    /**
     * Set up a listener for the selectedItem attribute.
     */
    initializer: function () {
        // FIXME: The custom setter won't trigger if we don't get the attribute first.
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "initializer", 13);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 15);
this.get('selectable');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 17);
this.after('selectedItemChange', this._afterSelectedItemChange, this);
    },

    /**
     * Setter.
     */
    _setSelectable: function (selectable) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_setSelectable", 23);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 24);
if (selectable === true) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 25);
this._bind();
        }

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 28);
return selectable;
    },

    /**
     * Bind the click events.
     */
    _bind: function () {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_bind", 34);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 35);
var contentBox = this.get('contentBox');

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 37);
contentBox.on('click', this._handleClick, this);
    },

    /**
     * Handles the click event, and updates the selectedItem attribute,
     * which fires an event on change.
     */
    _handleClick: function (e) {
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_handleClick", 44);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 45);
var target = e.target;

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 47);
if (target.hasClass('icon-toggle')) {
            // This is an expand/collapse icon, ignore.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 49);
return false;

        } else {_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 51);
if (e.target.ancestor('.ygtvtable')) {
            // This is a tree view item, update the selection.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 53);
this.set('selectedItem', target.ancestor('.ygtvtable'));

        /*} else if (e.target.ancestor('.yui3-datatable-columns')) {
            // This is a table column, ignore.
            return false;*/

        } else {
            // Clicked outside the items, reset the selection.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 61);
this.set('selectedItem', null);
        }}

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 64);
return true;
    },

    /**
     * The selection changed, update the DOM and fire an event containing
     * the model that was selected.
     */
    _afterSelectedItemChange: function (e) {
        // TODO: Keep selection after sorting
        _yuitest_coverfunc("build/libbit-treeview-select/libbit-treeview-select.js", "_afterSelectedItemChange", 71);
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 73);
var node    = e.newVal,
            oldNode = e.prevVal,
            data    = this.get('data'),
            model   = null,
            leaves  = null,
            id;

        // Cancel if the selection did not change.
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 81);
if (node === oldNode) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 82);
return false;
        }

        // Remove all selection CSS on the previous selection
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 86);
if (oldNode) {
            // Inverse the icon color if there is one.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 88);
if (oldNode.all('i')) {
                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 89);
oldNode.all('i').removeClass('icon-white');
            }

            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 92);
oldNode.removeClass('treeview-highlight');
        }

        // Apply the CSS to the new selection and fire an event.
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 96);
if (Y.Lang.isNull(node) === false) {
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 97);
id = node.getAttribute('data-yui3-record');

            // Inverse the icon color if there is one.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 100);
if (node.all('i')) {
                _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 101);
node.all('i').addClass('icon-white');
            }

            // After unhighlighting, now highlight the current row.
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 105);
node.addClass('treeview-highlight');

            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 107);
model  = data.getByClientId(id);
            _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 108);
leaves = data.getLeavesByClientId(id);
        }

        // Fires the select event and passes along the needed information.
        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 112);
this.fire('select', { model : model, leaves: leaves });

        _yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 114);
return true;
    }

}, {
    ATTRS: {
        /**
         * Config property, enable selection for this TreeView instance
         */
        selectable: {
            setter: '_setSelectable',
            value : false
        },

        /**
         * The item currently selected.
         */
        selectedItem : {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-select/libbit-treeview-select.js", 137);
Y.namespace('Libbit.TreeView').Selectable = Selectable;


}, '1.0.0');
