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
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].code=["YUI.add('libbit-treeview-filter', function (Y, NAME) {","","var Filter;","","/**"," * Filter extension for the TreeView."," */","Filter = Y.Base.create('filter', Y.Base, [], {","","    render: function () {","        this.applyFilter();","","        this.constructor.superclass.render.apply(this);","    },","","    applyFilter: function (refresh) {","        var self = this;","        var model = this.get('data');","","        // self.afterEvent.detach();","        // self.afterEvent = model.after('load', function() {","            model.set('items', self._applyFilterToModel(model.get('items')));","","            self.set('data', model);","","            // if (refresh) {","            //     self.refresh();","            // }","        // });","","        return this;","    },","","    _applyFilterToModel: function (modelItems) {","        var buffer = [];","        var filterIds = this.get('filterIds');","        var self = this;","","        for (var index in modelItems) {","            if (modelItems[index].children) {","                modelItems[index].children = self._applyFilterToModel(modelItems[index].children);","            }","","            if (modelItems[index].data.name === self.get('filterApplyTo')) {","                var itemId = parseInt(modelItems[index].data.get('id'));","                var inFilter = Y.Array.indexOf(filterIds, itemId);","","                if (inFilter !== -1) {","                    buffer.push(modelItems[index]);","                }","            } else {","                buffer.push(modelItems[index]);","            }","        }","","        return buffer;","    }","}, {","    ATTRS: {","        filterApplyTo: {","            value : 'unknown'","        },","","        filterIds: {","            value : []","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit.TreeView').Filter = Filter;","","","}, '1.0.0', {\"requires\": []});"];
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].lines = {"1":0,"3":0,"8":0,"11":0,"13":0,"17":0,"18":0,"22":0,"24":0,"31":0,"35":0,"36":0,"37":0,"39":0,"40":0,"41":0,"44":0,"45":0,"46":0,"48":0,"49":0,"52":0,"56":0,"71":0};
_yuitest_coverage["build/libbit-treeview-filter/libbit-treeview-filter.js"].functions = {"render:10":0,"applyFilter:16":0,"_applyFilterToModel:34":0,"(anonymous 1):1":0};
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
this.applyFilter();

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 13);
this.constructor.superclass.render.apply(this);
    },

    applyFilter: function (refresh) {
        _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "applyFilter", 16);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 17);
var self = this;
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 18);
var model = this.get('data');

        // self.afterEvent.detach();
        // self.afterEvent = model.after('load', function() {
            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 22);
model.set('items', self._applyFilterToModel(model.get('items')));

            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 24);
self.set('data', model);

            // if (refresh) {
            //     self.refresh();
            // }
        // });

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 31);
return this;
    },

    _applyFilterToModel: function (modelItems) {
        _yuitest_coverfunc("build/libbit-treeview-filter/libbit-treeview-filter.js", "_applyFilterToModel", 34);
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 35);
var buffer = [];
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 36);
var filterIds = this.get('filterIds');
        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 37);
var self = this;

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 39);
for (var index in modelItems) {
            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 40);
if (modelItems[index].children) {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 41);
modelItems[index].children = self._applyFilterToModel(modelItems[index].children);
            }

            _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 44);
if (modelItems[index].data.name === self.get('filterApplyTo')) {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 45);
var itemId = parseInt(modelItems[index].data.get('id'));
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 46);
var inFilter = Y.Array.indexOf(filterIds, itemId);

                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 48);
if (inFilter !== -1) {
                    _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 49);
buffer.push(modelItems[index]);
                }
            } else {
                _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 52);
buffer.push(modelItems[index]);
            }
        }

        _yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 56);
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
_yuitest_coverline("build/libbit-treeview-filter/libbit-treeview-filter.js", 71);
Y.namespace('Libbit.TreeView').Filter = Filter;


}, '1.0.0', {"requires": []});
