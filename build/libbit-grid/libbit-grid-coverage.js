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
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].code=["YUI.add('libbit-grid', function (Y, NAME) {","","var Grid,","    TemplateView;","","// TODO: Abstract to separate view file","TemplateView = Y.Base.create('templateView', Y.View, [], {","","    // Compile our template using Handlebars.","    template: Y.Handlebars.compile(","        '<div class=\"template-grid-container\" title=\"{{ name }}\" data-yui3-record=\"{{ clientId }}\">' +","        '    <div class=\"template-grid-icon-container\">' +","        '        <div class=\"template-grid-icon-wrapper\">' +","        '            <img class=\"template-grid-icon\"></img>' +","        '       </div>' +","        '    </div>' +","        '    <div class=\"template-grid-footer\">' +","        '        <div class=\"template-grid-name\">{{ name }}</div>' +","        '        <input class=\"edit\" type=\"text\" value=\"{{ name }}\" />' +","        '        <div class=\"template-grid-date\">{{ dateCreated }}</div>' +","        '    </div>' +","        '</div>'","    ),","","    events: {","        '.template-grid-name': {","            click: 'edit'","        },","        '.edit': {","            blur: 'close',","            keypress: 'enterUpdate'","        },","        '.template-grid-container': {","            contextmenu: 'contextMenu'","        }","    },","","    // Render this view in our <li> container, and fill it with the","    // data in our Model.","    render: function () {","        var container = this.get('container'),","            model     = this.get('model'),","            content;","","        content = this.template(model.getAttrs());","","        container.setContent(content);","","        this.set('inputNode', container.one('.edit'));","        this.set('footerNode', container.one('.template-grid-footer'));","","        return this;","    },","","    // Turn on editing mode for the Template name by exposing the input field.","    edit: function () {","        this.get('footerNode').addClass('editing');","        this.get('inputNode').focus();","    },","","    // Get the value from our input field while hiding it, and","    // save it to our Template when focus is lost from the field.","    close: function () {","        var value       = this.get('inputNode').get('value'),","            editedValue = Y.Escape.html(Y.Lang.trim(value)),","            template    = this.get('model');","","        this.get('footerNode').removeClass('editing');","","        if (editedValue) {","            template.set('name', editedValue);","            // FIXME: Find out why the model gets saved twice.","            template.save();","        }","    },","","    // Also allow updating the Template's name through the enter key.","    enterUpdate: function (e) {","        var ENTER_KEY = 13;","","        if (e.keyCode === ENTER_KEY) {","            this.close();","        }","    },","","    contextMenu: function (e) {","        var container = this.get('container'),","            template  = this.get('model'),","            contextMenu;","","        // TODO: Filter click so it doesn't get triggered when clicked in the margins","        e.preventDefault();","","        // Remove a previous context menu if it exists","        if (Y.Lang.isNull(Y.one('#template-context')) === false) {","            // FIXME: Also destroy the panel node","            Y.one('#template-context').remove();","        }","","        // TODO: Create contextmenu widget","        contextMenu = new Y.Overlay({","            bodyContent: '<div id=\"template-context\" class=\"dropdown open\"><ul class=\"dropdown-menu\">' +","                         '<li><a data-event=\"templateDelete\" href=\"#\">Delete template</a></li>' +","                         '<li><a data-event=\"templateDuplicate\" href=\"#\">Duplicate template</a></li>' +","                         '</ul></div>',","            visible    : false,","            constrain  : true","        });","","        contextMenu.render(container);","","        contextMenu.set('xy', [e.pageX, e.pageY]);","        contextMenu.show();","","        // Bind the menu events","        Y.one('#template-context').all('a').each(function (node) {","            node.on(['click', 'contextmenu'], function (e) {","                e.preventDefault();","","                Y.fire('templateContextMenu:' + node.getAttribute('data-event'), {","                    node : container,","                    model: template","                });","","                // FIXME: Also destroy the panel node","                Y.one('#template-context').remove();","            });","        });","    }","});","","// TODO: Y.Libbit.Grid.Message","Grid = Y.Base.create('grid', Y.Widget,  [ Y.Libbit.Grid.Selectable ], {","","    renderUI : function () {","        this._renderGridItems();","    },","","    _renderGridItems : function() {","        var contentBox = this.get(\"contentBox\"),","            list       = this.get('data');","","        Y.each(list, function (model) {","            var view = new TemplateView({model: model}),","                node = view.render().get('container');","","            contentBox.append(node);","        });","    }","}, {","    ATTRS: {","        /**","         * The array containing the models to be rendered","         */","        data: {","            value: []","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').Grid = Grid;","","","}, '1.0.0', {\"requires\": [\"handlebars\", \"libbit-grid-select\", \"model-list\", \"view\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].lines = {"1":0,"3":0,"7":0,"41":0,"45":0,"47":0,"49":0,"50":0,"52":0,"57":0,"58":0,"64":0,"68":0,"70":0,"71":0,"73":0,"79":0,"81":0,"82":0,"87":0,"92":0,"95":0,"97":0,"101":0,"110":0,"112":0,"113":0,"116":0,"117":0,"118":0,"120":0,"126":0,"133":0,"136":0,"140":0,"143":0,"144":0,"147":0,"162":0};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].functions = {"render:40":0,"edit:56":0,"close:63":0,"enterUpdate:78":0,"(anonymous 3):117":0,"(anonymous 2):116":0,"contextMenu:86":0,"renderUI:135":0,"(anonymous 4):143":0,"_renderGridItems:139":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].coveredLines = 39;
_yuitest_coverage["build/libbit-grid/libbit-grid.js"].coveredFunctions = 11;
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 1);
YUI.add('libbit-grid', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 3);
var Grid,
    TemplateView;

// TODO: Abstract to separate view file
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 7);
TemplateView = Y.Base.create('templateView', Y.View, [], {

    // Compile our template using Handlebars.
    template: Y.Handlebars.compile(
        '<div class="template-grid-container" title="{{ name }}" data-yui3-record="{{ clientId }}">' +
        '    <div class="template-grid-icon-container">' +
        '        <div class="template-grid-icon-wrapper">' +
        '            <img class="template-grid-icon"></img>' +
        '       </div>' +
        '    </div>' +
        '    <div class="template-grid-footer">' +
        '        <div class="template-grid-name">{{ name }}</div>' +
        '        <input class="edit" type="text" value="{{ name }}" />' +
        '        <div class="template-grid-date">{{ dateCreated }}</div>' +
        '    </div>' +
        '</div>'
    ),

    events: {
        '.template-grid-name': {
            click: 'edit'
        },
        '.edit': {
            blur: 'close',
            keypress: 'enterUpdate'
        },
        '.template-grid-container': {
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
this.set('footerNode', container.one('.template-grid-footer'));

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
    // save it to our Template when focus is lost from the field.
    close: function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "close", 63);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 64);
var value       = this.get('inputNode').get('value'),
            editedValue = Y.Escape.html(Y.Lang.trim(value)),
            template    = this.get('model');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 68);
this.get('footerNode').removeClass('editing');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 70);
if (editedValue) {
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 71);
template.set('name', editedValue);
            // FIXME: Find out why the model gets saved twice.
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 73);
template.save();
        }
    },

    // Also allow updating the Template's name through the enter key.
    enterUpdate: function (e) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "enterUpdate", 78);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 79);
var ENTER_KEY = 13;

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 81);
if (e.keyCode === ENTER_KEY) {
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 82);
this.close();
        }
    },

    contextMenu: function (e) {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "contextMenu", 86);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 87);
var container = this.get('container'),
            template  = this.get('model'),
            contextMenu;

        // TODO: Filter click so it doesn't get triggered when clicked in the margins
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 92);
e.preventDefault();

        // Remove a previous context menu if it exists
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 95);
if (Y.Lang.isNull(Y.one('#template-context')) === false) {
            // FIXME: Also destroy the panel node
            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 97);
Y.one('#template-context').remove();
        }

        // TODO: Create contextmenu widget
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 101);
contextMenu = new Y.Overlay({
            bodyContent: '<div id="template-context" class="dropdown open"><ul class="dropdown-menu">' +
                         '<li><a data-event="templateDelete" href="#">Delete template</a></li>' +
                         '<li><a data-event="templateDuplicate" href="#">Duplicate template</a></li>' +
                         '</ul></div>',
            visible    : false,
            constrain  : true
        });

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 110);
contextMenu.render(container);

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 112);
contextMenu.set('xy', [e.pageX, e.pageY]);
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 113);
contextMenu.show();

        // Bind the menu events
        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 116);
Y.one('#template-context').all('a').each(function (node) {
            _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 2)", 116);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 117);
node.on(['click', 'contextmenu'], function (e) {
                _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 3)", 117);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 118);
e.preventDefault();

                _yuitest_coverline("build/libbit-grid/libbit-grid.js", 120);
Y.fire('templateContextMenu:' + node.getAttribute('data-event'), {
                    node : container,
                    model: template
                });

                // FIXME: Also destroy the panel node
                _yuitest_coverline("build/libbit-grid/libbit-grid.js", 126);
Y.one('#template-context').remove();
            });
        });
    }
});

// TODO: Y.Libbit.Grid.Message
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 133);
Grid = Y.Base.create('grid', Y.Widget,  [ Y.Libbit.Grid.Selectable ], {

    renderUI : function () {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "renderUI", 135);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 136);
this._renderGridItems();
    },

    _renderGridItems : function() {
        _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "_renderGridItems", 139);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 140);
var contentBox = this.get("contentBox"),
            list       = this.get('data');

        _yuitest_coverline("build/libbit-grid/libbit-grid.js", 143);
Y.each(list, function (model) {
            _yuitest_coverfunc("build/libbit-grid/libbit-grid.js", "(anonymous 4)", 143);
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 144);
var view = new TemplateView({model: model}),
                node = view.render().get('container');

            _yuitest_coverline("build/libbit-grid/libbit-grid.js", 147);
contentBox.append(node);
        });
    }
}, {
    ATTRS: {
        /**
         * The array containing the models to be rendered
         */
        data: {
            value: []
        }
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-grid/libbit-grid.js", 162);
Y.namespace('Libbit').Grid = Grid;


}, '1.0.0', {"requires": ["handlebars", "libbit-grid-select", "model-list", "view"], "skinnable": true});
