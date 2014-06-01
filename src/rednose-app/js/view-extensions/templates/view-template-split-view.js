/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateSplitView() {}

ViewTemplateSplitView.prototype = {
    /**
     * @property splitViewTemplate
     * @type String
     */
    splitViewTemplate:
        '<div>' +
            '<div class="rednose-unit-main-top"></div>' +
            '<div class="rednose-unit-main-bottom"></div>' +
        '</div>',

    initializer: function () {
        var container = this.get('container');

        this.get('viewContainer').append(this.splitViewTemplate);

        this.set('topContainer', container.one('.rednose-unit-main-top'));
        this.set('bottomContainer', container.one('.rednose-unit-main-bottom'));
    }
};

ViewTemplateSplitView.ATTRS = {
    /**
     * @attribute topContainer
     * @type Node
     */
    topContainer: {
        value: null
    },

    /**
     * @attribute bottomContainer
     * @type Node
     */
    bottomContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').SplitView = ViewTemplateSplitView;
