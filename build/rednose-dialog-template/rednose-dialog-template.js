YUI.add('rednose-dialog-template', function (Y, NAME) {

var Micro = Y.Template.Micro;

function Template() {}

Template.prototype = {

    // -- Public Properties ----------------------------------------------------

    baseTemplate:
        '<form class="form-horizontal">' +
        '</form>',

    tabTemplate: Micro.compile(
        '<fieldset>' +
            '<div id="<%= data.id %>">' +
            '</div>' +
        '</fieldset>'
    ),

    inputTemplate: Micro.compile(
        '<div class="control-group">' +
            '<label>' +
                '<span class="control-label"><%= data.title %> <small><%= data.sub_title %></small></span>' +
                '<div class="controls">' +
                    '<input type="text" data-path="<%= data.id %>" id="<%= data.id %>" name="<%= data.id %>" placeholder="<%= data.title %>" value="<%= data.value %>">' +
                '</div>' +
            '</label>' +
        '</div>'
    ),

    selectTemplate: Micro.compile(
        '<div class="control-group">' +
            '<label class="control-label">' +
                '<span class="control-label"><%= data.title %> <small><%= data.sub_title %></small></span>' +
                '<div class="controls">' +
                    '<select data-path="<%= data.id %>" id="<%= data.id %>" name="<%= data.id %>">' +
                        '<% Y.Object.each(data.options, function (option, i) { %>' +
                            '<option <%= option.selected ? \'selected="selected"\' : \'\' %> value="<%= option.value %>"><%= option.title %></option>' +
                        '<% }); %>' +
                    '</select>' +
                '</div>' +
            '</label>' +
        '</div>'
    ),

    textareaTemplate: Micro.compile(
        '<div class="control-group">' +
            '<label class="control-label">' +
                '<span class="control-label"><%= data.title %> <small><%= data.sub_title %></small></span>' +
                '<div class="controls">' +
                    '<textarea data-path="<%= data.id %>" id="<%= data.id %>" name="<%= data.id %>" placeholder="<%= data.title %>"><%= data.value %></textarea>' +
                '</div>' +
            '</label>' +
        '</div>'
    ),

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this._TemplateEvents = [
            Y.Do.before(this._beforeFocusInput, this, '_focusInput', this)
        ];

        this.template = Y.Node.create(this.baseTemplate);
    },

    destructor: function () {
        (new Y.EventHandle(this._TemplateEvents)).detach();
    },

    _beforeFocusInput: function () {
        var tabs       = Y.Object.isEmpty(this.get('tabs')),
            properties = Y.Object.isEmpty(this.get('properties'));

        if (tabs === false) {
            this._createTabs();
        }

        if (properties === false) {
            this._createTemplate();
        }

        if (tabs === false) {
            this._renderTabs();
        }

        if (tabs === false || properties === false) {
            this.panel.set('bodyContent', this.template);
        }
    },

    _createTabs: function () {
        var self = this,
            tabs = this.get('tabs');

        Y.Object.each(tabs, function (tab) {
            self.template.append(self.tabTemplate(tab));
        });
    },

    _createTemplate: function () {
        var self       = this,
            properties = this.get('properties'),
            tabs       = Y.Object.isEmpty(this.get('tabs')),
            template;

        Y.Object.each(properties, function (property) {
            switch (property.type) {
                case 'input':
                    template = self.inputTemplate;
                    break;
                case 'select':
                    template = self.selectTemplate;
                    break;
                case 'textarea':
                    template = self.textareaTemplate;
                    break;
                default:
                    template = function(){ console.error('Type "%s" in property "%s" is not supported.', property.type, property.title); };
                    break;
            }

            if (property.tab && tabs === false) {
                self.template.one('#' + property.tab).append(template(property));
            } else {
                self.template.append(template(property));
            }
        });
    },

    _renderTabs: function () {
        var container = this.template,
            tabs      = this.get('tabs');

        Y.Object.each(tabs, function (tab, i) {
            if (i === '0') {
                tab.active = true;
            }

            tab.container = container.one('div#' + tab.id);
        });

        this.tabView = new Y.Rednose.TabView({
            tabs: tabs
        });

        this.tabView.render(container);
    }
};

Template.ATTRS = {
    /**
     * @attribute tabs
     * @type Object [tabs]
     *   @param {Array}
     *     @param {String} [tabs.id] The element id.
     *     @param {String} [tabs.title] The element title.
     */
    tabs: {
        value: []
    },

    /**
     * @attribute properties
     * @type {Object} [properties] The following options can be specified:
     *   @param {Array}
     *     @param {String} [properties.type] The element type. input|select|textarea
     *     @param {String} [properties.id] The element id.
     *     @param {String} [properties.title] The element title.
     *     @param {String} [properties.sub_title] The the element subtitle.
     *     @param {String} [properties.value] The the element subtitle.
     *     @param {Object} [properties.options] The select options if type is select.
     *       @param {String} [properties.options.value] The option value.
     *       @param {String} [properties.options.title] The option title.
     *       @param {String} [properties.options.selected] True if selected.
     */
    properties: {
        value: []
    }
};

// -- Namespace ----------------------------------------------------------------
Y.Rednose.Dialog.Template = Template;
Y.Base.mix(Y.Rednose.Dialog, [Template]);


}, '1.5.0-DEV', {"requires": ["template-micro", "rednose-tabview"]});
