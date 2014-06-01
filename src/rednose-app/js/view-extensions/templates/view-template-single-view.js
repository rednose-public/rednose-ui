/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateSingleView() {}

ViewTemplateSingleView.prototype = {
    initializer: function () {
        var container = this.get('container');

        container.addClass('rednose-grid');

        container.append(
            '<div class="rednose-unit-container">' +
                '<div class="rednose-unit-main"></div>' +
            '</div>');

        container.one('.rednose-unit-main').append('<div class="rednose-viewport-container"><div class="rednose-viewport"></div></div>');
        this.set('viewportContainer', container.one('.rednose-viewport'));
    }
};

ViewTemplateSingleView.ATTRS = {
    /**
     * @attribute viewportContainer
     * @type Node
     */
    viewportContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').SingleView = ViewTemplateSingleView;
