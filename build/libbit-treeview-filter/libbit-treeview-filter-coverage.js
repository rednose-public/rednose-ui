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
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-treeview-filter/libbit-treeview-filter.js",
    code: []
};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].code=["YUI.add('libbit-treeview-filter', function (Y, NAME) {","","var Filter;","","/**"," * Filter extension for the TreeView."," */","Filter = Y.Base.create('filter', Y.Base, [], {","","    render: function () {","        this._applyFilter();","","        this.constructor.superclass.render.apply(this);","    },","","    _applyFilter: function (refresh) {","        var self = this;","        var model = this.get('data');","","        model.set('items', self._applyFilterToModel(model.get('items')));","        self.set('data', model);","","        return this;","    },","","    _applyFilterToModel: function (modelItems) {","        var buffer = [];","        var filterIds = this.get('filterIds');","        var self = this;","","        for (var index in modelItems) {","            if (modelItems[index].children) {","                modelItems[index].children = self._applyFilterToModel(modelItems[index].children);","            }","","            if (modelItems[index].data.name === self.get('filterApplyTo')) {","                var itemId = parseInt(modelItems[index].data.get('id'));","                var inFilter = Y.Array.indexOf(filterIds, itemId);","","                if (inFilter !== -1) {","                    buffer.push(modelItems[index]);","                }","            } else {","                buffer.push(modelItems[index]);","            }","        }","","        return buffer;","    }","}, {","    ATTRS: {","        filterApplyTo: {","            value : 'unknown'","        },","","        filterIds: {","            value : []","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Filter = Filter;","","","}, '1.0.0', {\"requires\": []});"];
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].lines = {"1":0,"3":0,"8":0,"11":0,"13":0,"17":0,"18":0,"20":0,"21":0,"23":0,"27":0,"28":0,"29":0,"31":0,"32":0,"33":0,"36":0,"37":0,"38":0,"40":0,"41":0,"44":0,"48":0,"63":0};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].functions = {"render:10":0,"_applyFilter:16":0,"_applyFilterToModel:26":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].coveredLines = 24;
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].coveredFunctions = 4;
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 1);
YUI.add('libbit-treeview-filter', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 3);
var Filter;

/**
 * Filter extension for the TreeView.
 */
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 8);
Filter = Y.Base.create('filter', Y.Base, [], {

    render: function () {
        _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "render", 10);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 11);
this._applyFilter();

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 13);
this.constructor.superclass.render.apply(this);
    },

    _applyFilter: function (refresh) {
        _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "_applyFilter", 16);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 17);
var self = this;
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 18);
var model = this.get('data');

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 20);
model.set('items', self._applyFilterToModel(model.get('items')));
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 21);
self.set('data', model);

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 23);
return this;
    },

    _applyFilterToModel: function (modelItems) {
        _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "_applyFilterToModel", 26);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 27);
var buffer = [];
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 28);
var filterIds = this.get('filterIds');
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 29);
var self = this;

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 31);
for (var index in modelItems) {
            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 32);
if (modelItems[index].children) {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 33);
modelItems[index].children = self._applyFilterToModel(modelItems[index].children);
            }

            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 36);
if (modelItems[index].data.name === self.get('filterApplyTo')) {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 37);
var itemId = parseInt(modelItems[index].data.get('id'));
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 38);
var inFilter = Y.Array.indexOf(filterIds, itemId);

                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 40);
if (inFilter !== -1) {
                    _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 41);
buffer.push(modelItems[index]);
                }
            } else {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 44);
buffer.push(modelItems[index]);
            }
        }

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 48);
return buffer;
    }
}, {
    ATTRS: {
        filterApplyTo: {
            value : 'unknown'
        },

        filterIds: {
            value : []
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 63);
Y.namespace('Libbit.TreeView').Filter = Filter;


}, '1.0.0', {"requires": []});
