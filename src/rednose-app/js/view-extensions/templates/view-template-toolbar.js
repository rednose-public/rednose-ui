/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateToolbar() {}

ViewTemplateToolbar.prototype = {
    /**
     * @property showToolbar
     * @type Boolean
     * @default false
     */
    showToolbar: false,

    initializer: function () {
        var container = this.get('container');

        if (this.showToolbar) {
            container.one('.rednose-unit-main').addClass('rednose-toolbar-unit-main');
            container.one('.rednose-unit-main').append('<div class="rednose-toolbar"></div>');

            this.set('toolbarContainer', container.one('.rednose-toolbar'));
        }
    }
};

ViewTemplateToolbar.ATTRS = {
    /**
     * @attribute toolbarContainer
     * @type Node
     */
    toolbarContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').Toolbar = ViewTemplateToolbar;
