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
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].code=["YUI.add('libbit-grid', function (Y, NAME) {","","var Grid,","    GridView;","","// TODO: Abstract to separate view file","GridView = Y.Base.create('gridView', Y.View, [], {","","    // Compile our template using Handlebars.","    template: Y.Handlebars.compile(","        '<div class=\"model-grid-container\" title=\"{{ name }}\" data-yui3-record=\"{{ clientId }}\">' +","        '    <div class=\"model-grid-icon-container\">' +","        '        <div class=\"model-grid-icon-wrapper\">' +","        '            <img class=\"model-grid-icon\"></img>' +","        '       </div>' +","        '    </div>' +","        '    <div class=\"model-grid-footer\">' +","        '        <div class=\"model-grid-name\">{{ name }}</div>' +","        '        <input class=\"edit\" type=\"text\" value=\"{{ name }}\" />' +","        '        <div class=\"model-grid-date\">{{ dateCreated }}</div>' +","        '    </div>' +","        '</div>'","    ),","","    events: {","        '.model-grid-name': {","            click: 'edit'","        },","        '.edit': {","            blur: 'close',","            keypress: 'enterUpdate'","        },","        '.model-grid-container': {","            contextmenu: 'contextMenu'","        }","    },","","    // Render this view in our <li> container, and fill it with the","    // data in our Model.","    render: function () {","        var container = this.get('container'),","            model     = this.get('model'),","            content;","","        content = this.template(model.getAttrs());","","        container.setContent(content);","","        this.set('inputNode', container.one('.edit'));","        this.set('footerNode', container.one('.model-grid-footer'));","","        return this;","    },","","    // Turn on editing mode for the Template name by exposing the input field.","    edit: function () {","        this.get('footerNode').addClass('editing');","        this.get('inputNode').focus();","    },","","    // Get the value from our input field while hiding it, and","    // save it to our Model (name attribute) when focus is lost from the field.","    close: function () {","        var value = this.get('inputNode').get('value'),","            self = this,","            editedValue = Y.Escape.html(Y.Lang.trim(value)),","            gridModel = this.get('model');","","        this.get('footerNode').removeClass('editing');","","        if (editedValue) {","            var label = self.get('footerNode').one('.model-grid-name');","","            label.set('innerHTML', 'Loading...');","            gridModel.set('name', editedValue);","","            gridModel.save(function() {","                self.get('inputNode').set('value', gridModel.get('name'));","                label.set('innerHTML', gridModel.get('name'));","            });","        }","    },","","    // Also allow updating the Template's name through the enter key.","    enterUpdate: function (e) {","        var ENTER_KEY = 13;","","        if (e.keyCode === ENTER_KEY) {","            this.close();","        }","    },","","    contextMenu: function (e) {","        var container = this.get('container'),","            template  = this.get('model'),","            contextMenu;","","        // TODO: Filter click so it doesn't get triggered when clicked in the margins","        e.preventDefault();","","        // Remove a previous context menu if it exists","        if (Y.Lang.isNull(Y.one('#template-context')) === false) {","            // FIXME: Also destroy the panel node","            Y.one('#template-context').remove();","        }","","        // TODO: Create contextmenu widget","        contextMenu = new Y.Overlay({","            bodyContent: '<div id=\"template-context\" class=\"dropdown open\"><ul class=\"dropdown-menu\">' +","                         '<li><a data-event=\"templateDelete\" href=\"#\">Delete template</a></li>' +","                         '<li><a data-event=\"templateDuplicate\" href=\"#\">Duplicate template</a></li>' +","                         '</ul></div>',","            visible    : false,","            constrain  : true","        });","","        contextMenu.render(container);","","        contextMenu.set('xy', [e.pageX, e.pageY]);","        contextMenu.show();","","        // Bind the menu events","        Y.one('#template-context').all('a').each(function (node) {","            node.on(['click', 'contextmenu'], function (e) {","                e.preventDefault();","","                Y.fire('templateContextMenu:' + node.getAttribute('data-event'), {","                    node : container,","                    model: template","                });","","                // FIXME: Also destroy the panel node","                Y.one('#template-context').remove();","            });","        });","    }","});","","// TODO: Y.Libbit.Grid.Message","Grid = Y.Base.create('grid', Y.Widget,  [ Y.Libbit.Grid.Selectable ], {","","    renderUI : function () {","        this._renderGridItems();","    },","","    _renderGridItems : function() {","        var contentBox = this.get(\"contentBox\"),","            list       = this.get('data');","","        Y.each(list, function (model) {","            var view = new GridView({ model: model }),","                node = view.render().get('container');","","            contentBox.append(node);","        });","    }","}, {","    ATTRS: {","        /**","         * The ModelList containing the models to be rendered","         */","        data: {","            value: []","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Grid = Grid;","","","}, '1.0.0', {\"requires\": [\"handlebars\", \"libbit-grid-select\", \"model-list\", \"view\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].lines = {"1":0,"3":0,"7":0,"41":0,"45":0,"47":0,"49":0,"50":0,"52":0,"57":0,"58":0,"64":0,"69":0,"71":0,"72":0,"74":0,"75":0,"77":0,"78":0,"79":0,"86":0,"88":0,"89":0,"94":0,"99":0,"102":0,"104":0,"108":0,"117":0,"119":0,"120":0,"123":0,"124":0,"125":0,"127":0,"133":0,"140":0,"143":0,"147":0,"150":0,"151":0,"154":0,"169":0};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].functions = {"render:40":0,"edit:56":0,"(anonymous 2):77":0,"close:63":0,"enterUpdate:85":0,"(anonymous 4):124":0,"(anonymous 3):123":0,"contextMenu:93":0,"renderUI:142":0,"(anonymous 5):150":0,"_renderGridItems:146":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].coveredLines = 43;
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].coveredFunctions = 12;
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
        '            <img class="model-grid-icon"></img>' +
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
        },
        '.model-grid-container': {
            contextmenu: 'contextMenu'
        }
    },

    // Render this view in our <li> container, and fill it with the
    // data in our Model.
    render: function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "render", 40);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 41);
var container = this.get('container'),
            model     = this.get('model'),
            content;

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 45);
content = this.template(model.getAttrs());

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 47);
container.setContent(content);

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 49);
this.set('inputNode', container.one('.edit'));
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 50);
this.set('footerNode', container.one('.model-grid-footer'));

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 52);
return this;
    },

    // Turn on editing mode for the Template name by exposing the input field.
    edit: function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "edit", 56);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 57);
this.get('footerNode').addClass('editing');
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 58);
this.get('inputNode').focus();
    },

    // Get the value from our input field while hiding it, and
    // save it to our Model (name attribute) when focus is lost from the field.
    close: function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "close", 63);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 64);
var value = this.get('inputNode').get('value'),
            self = this,
            editedValue = Y.Escape.html(Y.Lang.trim(value)),
            gridModel = this.get('model');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 69);
this.get('footerNode').removeClass('editing');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 71);
if (editedValue) {
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 72);
var label = self.get('footerNode').one('.model-grid-name');

            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 74);
label.set('innerHTML', 'Loading...');
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 75);
gridModel.set('name', editedValue);

            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 77);
gridModel.save(function() {
                _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 2)", 77);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 78);
self.get('inputNode').set('value', gridModel.get('name'));
                _yuitest_coverline("build/libbit-grid/libbit-grid.js", 79);
label.set('innerHTML', gridModel.get('name'));
            });
        }
    },

    // Also allow updating the Template's name through the enter key.
    enterUpdate: function (e) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "enterUpdate", 85);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 86);
var ENTER_KEY = 13;

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 88);
if (e.keyCode === ENTER_KEY) {
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 89);
this.close();
        }
    },

    contextMenu: function (e) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "contextMenu", 93);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 94);
var container = this.get('container'),
            template  = this.get('model'),
            contextMenu;

        // TODO: Filter click so it doesn't get triggered when clicked in the margins
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 99);
e.preventDefault();

        // Remove a previous context menu if it exists
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 102);
if (Y.Lang.isNull(Y.one('#template-context')) === false) {
            // FIXME: Also destroy the panel node
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 104);
Y.one('#template-context').remove();
        }

        // TODO: Create contextmenu widget
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 108);
contextMenu = new Y.Overlay({
            bodyContent: '<div id="template-context" class="dropdown open"><ul class="dropdown-menu">' +
                         '<li><a data-event="templateDelete" href="#">Delete template</a></li>' +
                         '<li><a data-event="templateDuplicate" href="#">Duplicate template</a></li>' +
                         '</ul></div>',
            visible    : false,
            constrain  : true
        });

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 117);
contextMenu.render(container);

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 119);
contextMenu.set('xy', [e.pageX, e.pageY]);
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 120);
contextMenu.show();

        // Bind the menu events
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 123);
Y.one('#template-context').all('a').each(function (node) {
            _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 3)", 123);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 124);
node.on(['click', 'contextmenu'], function (e) {
                _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 4)", 124);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 125);
e.preventDefault();

                _yuitest_coverline("build/libbit-grid/libbit-grid.js", 127);
Y.fire('templateContextMenu:' + node.getAttribute('data-event'), {
                    node : container,
                    model: template
                });

                // FIXME: Also destroy the panel node
                _yuitest_coverline("build/libbit-grid/libbit-grid.js", 133);
Y.one('#template-context').remove();
            });
        });
    }
});

// TODO: Y.Libbit.Grid.Message
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 140);
Grid = Y.Base.create('grid', Y.Widget,  [ Y.Libbit.Grid.Selectable ], {

    renderUI : function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "renderUI", 142);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 143);
this._renderGridItems();
    },

    _renderGridItems : function() {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "_renderGridItems", 146);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 147);
var contentBox = this.get("contentBox"),
            list       = this.get('data');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 150);
Y.each(list, function (model) {
            _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 5)", 150);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 151);
var view = new GridView({ model: model }),
                node = view.render().get('container');

            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 154);
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
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 169);
Y.namespace('Libbit').Grid = Grid;


}, '1.0.0', {"requires": ["handlebars", "libbit-grid-select", "model-list", "view"], "skinnable": true});
