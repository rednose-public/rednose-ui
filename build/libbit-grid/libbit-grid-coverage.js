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
_yuitest_coverage["build/libbit-grid/libbit-grid.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-grid/libbit-grid.js",
    code: []
};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].code=["YUI.add('libbit-grid', function (Y, NAME) {","","var Grid,","    GridView;","","// TODO: Abstract to separate view file","GridView = Y.Base.create('gridView', Y.View, [], {","","    // Compile our template using Handlebars.","    template: Y.Handlebars.compile(","        '<div class=\"model-grid-container\" title=\"{{ name }}\" data-yui3-record=\"{{ clientId }}\">' +","        '    <div class=\"model-grid-icon-container\">' +","        '        <div class=\"model-grid-icon-wrapper\">' +","        '            <div class=\"model-grid-icon\" />' +","        '       </div>' +","        '    </div>' +","        '    <div class=\"model-grid-footer\">' +","        '        <div class=\"model-grid-name\">{{ name }}</div>' +","        '        <input class=\"edit\" type=\"text\" value=\"{{ name }}\" />' +","        '        <div class=\"model-grid-date\">{{ dateCreated }}</div>' +","        '    </div>' +","        '</div>'","    ),","","    events: {","        '.model-grid-name': {","            click: 'edit'","        },","        '.edit': {","            blur: 'close',","            keypress: 'enterUpdate'","        }","    },","","    // Render this view in our <li> container, and fill it with the","    // data in our Model.","    render: function () {","        var container = this.get('container'),","            model = this.get('model'),","            contextMenu = this.get('contextMenu'),","            content;","","        content = this.template(model.getAttrs());","","        container.setContent(content);","","        // if (contextMenu !== false) {","        //     container.one('.model-grid-icon-container').plug(Y.Libbit.ContextMenu, {","        //         content: contextMenu,","        //         data: model,","        //         bubbleTarget: this","        //     });","        // }","","        this.set('inputNode', container.one('.edit'));","        this.set('footerNode', container.one('.model-grid-footer'));","","        return this;","    },","","    // Turn on editing mode for the Template name by exposing the input field.","    edit: function () {","        this.get('footerNode').addClass('editing');","        this.get('inputNode').focus();","    },","","    // Get the value from our input field while hiding it, and","    // save it to our Model (name attribute) when focus is lost from the field.","    close: function () {","        var value = this.get('inputNode').get('value'),","            self = this,","            editedValue = Y.Escape.html(Y.Lang.trim(value)),","            gridModel = this.get('model');","","        this.get('footerNode').removeClass('editing');","","        if (editedValue) {","            var label = self.get('footerNode').one('.model-grid-name');","","            label.set('innerHTML', 'Loading...');","            gridModel.set('name', editedValue);","","            gridModel.save(function() {","                self.get('inputNode').set('value', gridModel.get('name'));","                label.set('innerHTML', gridModel.get('name'));","            });","        }","    },","","    // Also allow updating the Template's name through the enter key.","    enterUpdate: function (e) {","        var ENTER_KEY = 13;","","        if (e.keyCode === ENTER_KEY) {","            this.close();","        }","    }","}, {","    ATTRS: {","        model: {","            value: []","        },","","        contextMenu: {","            value: false","        }","    }","});","","// TODO: Y.Libbit.Grid.Message","Grid = Y.Base.create('grid', Y.Widget, [ Y.Libbit.Grid.Selectable ], {","","    targets: null,","","    views: [],","","    renderUI : function () {","        this.targets = this.getTargets();","        this._renderGridItems();","    },","","    _renderGridItems : function() {","        var contentBox = this.get(\"contentBox\"),","            contextMenu = this.get('contextMenu'),","            self = this,","            list = this.get('data');","","        Y.each(list, function (model) {","            var view = new GridView({ model: model, contextMenu: contextMenu }),","                node = view.render().get('container');","","            self.views.push(view);","            for (var i in self.targets) {","                view.addTarget(self.targets[i]);","            }","","            contentBox.append(node);","        });","    }","}, {","    ATTRS: {","        /**","         * The ModelList containing the models to be rendered","         */","        data: {","            value: []","        },","","        contextMenu: {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Grid = Grid;","Y.namespace('TB').GridView = GridView;","","","","}, '1.0.0', {","    \"requires\": [","        \"handlebars\",","        \"libbit-grid-select\",","        \"libbit-contextmenu\",","        \"model-list\",","        \"view\"","    ],","    \"skinnable\": true","});"];
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].lines = {"1":0,"3":0,"7":0,"38":0,"43":0,"45":0,"55":0,"56":0,"58":0,"63":0,"64":0,"70":0,"75":0,"77":0,"78":0,"80":0,"81":0,"83":0,"84":0,"85":0,"92":0,"94":0,"95":0,"111":0,"118":0,"119":0,"123":0,"128":0,"129":0,"132":0,"133":0,"134":0,"137":0,"156":0,"157":0};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].functions = {"render:37":0,"edit:62":0,"(anonymous 2):83":0,"close:69":0,"enterUpdate:91":0,"renderUI:117":0,"(anonymous 3):128":0,"_renderGridItems:122":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].coveredLines = 35;
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].coveredFunctions = 9;
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 1);
YUI.add('libbit-grid', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 3);
var Grid,
    GridView;

// TODO: Abstract to separate view file
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 7);
GridView = Y.Base.create('gridView', Y.View, [], {

    // Compile our template using Handlebars.
    template: Y.Handlebars.compile(
        '<div class="model-grid-container" title="{{ name }}" data-yui3-record="{{ clientId }}">' +
        '    <div class="model-grid-icon-container">' +
        '        <div class="model-grid-icon-wrapper">' +
        '            <div class="model-grid-icon" />' +
        '       </div>' +
        '    </div>' +
        '    <div class="model-grid-footer">' +
        '        <div class="model-grid-name">{{ name }}</div>' +
        '        <input class="edit" type="text" value="{{ name }}" />' +
        '        <div class="model-grid-date">{{ dateCreated }}</div>' +
        '    </div>' +
        '</div>'
    ),

    events: {
        '.model-grid-name': {
            click: 'edit'
        },
        '.edit': {
            blur: 'close',
            keypress: 'enterUpdate'
        }
    },

    // Render this view in our <li> container, and fill it with the
    // data in our Model.
    render: function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "render", 37);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 38);
var container = this.get('container'),
            model = this.get('model'),
            contextMenu = this.get('contextMenu'),
            content;

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 43);
content = this.template(model.getAttrs());

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 45);
container.setContent(content);

        // if (contextMenu !== false) {
        //     container.one('.model-grid-icon-container').plug(Y.Libbit.ContextMenu, {
        //         content: contextMenu,
        //         data: model,
        //         bubbleTarget: this
        //     });
        // }

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 55);
this.set('inputNode', container.one('.edit'));
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 56);
this.set('footerNode', container.one('.model-grid-footer'));

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 58);
return this;
    },

    // Turn on editing mode for the Template name by exposing the input field.
    edit: function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "edit", 62);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 63);
this.get('footerNode').addClass('editing');
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 64);
this.get('inputNode').focus();
    },

    // Get the value from our input field while hiding it, and
    // save it to our Model (name attribute) when focus is lost from the field.
    close: function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "close", 69);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 70);
var value = this.get('inputNode').get('value'),
            self = this,
            editedValue = Y.Escape.html(Y.Lang.trim(value)),
            gridModel = this.get('model');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 75);
this.get('footerNode').removeClass('editing');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 77);
if (editedValue) {
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 78);
var label = self.get('footerNode').one('.model-grid-name');

            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 80);
label.set('innerHTML', 'Loading...');
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 81);
gridModel.set('name', editedValue);

            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 83);
gridModel.save(function() {
                _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 2)", 83);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 84);
self.get('inputNode').set('value', gridModel.get('name'));
                _yuitest_coverline("build/libbit-grid/libbit-grid.js", 85);
label.set('innerHTML', gridModel.get('name'));
            });
        }
    },

    // Also allow updating the Template's name through the enter key.
    enterUpdate: function (e) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "enterUpdate", 91);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 92);
var ENTER_KEY = 13;

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 94);
if (e.keyCode === ENTER_KEY) {
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 95);
this.close();
        }
    }
}, {
    ATTRS: {
        model: {
            value: []
        },

        contextMenu: {
            value: false
        }
    }
});

// TODO: Y.Libbit.Grid.Message
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 111);
Grid = Y.Base.create('grid', Y.Widget, [ Y.Libbit.Grid.Selectable ], {

    targets: null,

    views: [],

    renderUI : function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "renderUI", 117);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 118);
this.targets = this.getTargets();
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 119);
this._renderGridItems();
    },

    _renderGridItems : function() {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "_renderGridItems", 122);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 123);
var contentBox = this.get("contentBox"),
            contextMenu = this.get('contextMenu'),
            self = this,
            list = this.get('data');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 128);
Y.each(list, function (model) {
            _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 3)", 128);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 129);
var view = new GridView({ model: model, contextMenu: contextMenu }),
                node = view.render().get('container');

            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 132);
self.views.push(view);
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 133);
for (var i in self.targets) {
                _yuitest_coverline("build/libbit-grid/libbit-grid.js", 134);
view.addTarget(self.targets[i]);
            }

            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 137);
contentBox.append(node);
        });
    }
}, {
    ATTRS: {
        /**
         * The ModelList containing the models to be rendered
         */
        data: {
            value: []
        },

        contextMenu: {
            value: false
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 156);
Y.namespace('Libbit').Grid = Grid;
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 157);
Y.namespace('TB').GridView = GridView;



}, '1.0.0', {
    "requires": [
        "handlebars",
        "libbit-grid-select",
        "libbit-contextmenu",
        "model-list",
        "view"
    ],
    "skinnable": true
});
