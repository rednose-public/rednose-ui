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
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].code=["YUI.add('libbit-treeview-filter', function (Y, NAME) {","","var Filter;","","/**"," * Filter extension for the TreeView."," */","Filter = Y.Base.create('filter', Y.Base, [], {","","    applyFilter: function (refresh) {","        var self = this;","        var model = this.get('data');","","        self.afterEvent.detach();","        self.afterEvent = model.after('load', function() {","            model.set('items', self._applyFilterToModel(model.get('items')));","","            self.set('data', model);","","            if (refresh) {","                self.refresh();","            }","        });","","        return this;","    },","","    _applyFilterToModel: function (modelItems) {","        var buffer = [];","        var filterIds = this.get('filterIds');","        var self = this;","","        for (var index in modelItems) {","            if (modelItems[index].children) {","                modelItems[index].children = self._applyFilterToModel(modelItems[index].children);","            }","","            if (modelItems[index].data.name === self.get('filterApplyTo')) {","                var itemId = parseInt(modelItems[index].data.get('id'));","                var inFilter = Y.Array.indexOf(filterIds, itemId);","","                if (inFilter !== -1) {","                    buffer.push(modelItems[index]);","                }","            } else {","                buffer.push(modelItems[index]);","            }","        }","","        return buffer;","    }","}, {","    ATTRS: {","        filterApplyTo: {","            value : 'unknown'","        },","","        filterIds: {","            value : []","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Filter = Filter;","","","}, '1.0.0', {\"requires\": []});"];
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].lines = {"1":0,"3":0,"8":0,"11":0,"12":0,"14":0,"15":0,"16":0,"18":0,"20":0,"21":0,"25":0,"29":0,"30":0,"31":0,"33":0,"34":0,"35":0,"38":0,"39":0,"40":0,"42":0,"43":0,"46":0,"50":0,"65":0};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].functions = {"(anonymous 2):15":0,"applyFilter:10":0,"_applyFilterToModel:28":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].coveredLines = 26;
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

    applyFilter: function (refresh) {
        _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "applyFilter", 10);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 11);
var self = this;
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 12);
var model = this.get('data');

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 14);
self.afterEvent.detach();
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 15);
self.afterEvent = model.after('load', function() {
            _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "(anonymous 2)", 15);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 16);
model.set('items', self._applyFilterToModel(model.get('items')));

            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 18);
self.set('data', model);

            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 20);
if (refresh) {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 21);
self.refresh();
            }
        });

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 25);
return this;
    },

    _applyFilterToModel: function (modelItems) {
        _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "_applyFilterToModel", 28);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 29);
var buffer = [];
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 30);
var filterIds = this.get('filterIds');
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 31);
var self = this;

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 33);
for (var index in modelItems) {
            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 34);
if (modelItems[index].children) {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 35);
modelItems[index].children = self._applyFilterToModel(modelItems[index].children);
            }

            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 38);
if (modelItems[index].data.name === self.get('filterApplyTo')) {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 39);
var itemId = parseInt(modelItems[index].data.get('id'));
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 40);
var inFilter = Y.Array.indexOf(filterIds, itemId);

                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 42);
if (inFilter !== -1) {
                    _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 43);
buffer.push(modelItems[index]);
                }
            } else {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 46);
buffer.push(modelItems[index]);
            }
        }

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 50);
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
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 65);
Y.namespace('Libbit.TreeView').Filter = Filter;


}, '1.0.0', {"requires": []});
