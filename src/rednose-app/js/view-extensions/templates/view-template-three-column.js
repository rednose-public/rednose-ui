/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateThreeColumn() {}

ViewTemplateThreeColumn.prototype = {
    initializer: function () {
        var container = this.get('container');

        if (container.get('tagName').toLowerCase() === 'body') {
            var node = Y.Node.create('<div>');

            container.append(node);
            container = node;
        }

        container.addClass('rednose-grid');
        container.addClass('rednose-three-column-grid');

        container.append(
            '<div class="rednose-unit-container">' +
                '<div class="rednose-unit-left"></div>' +
                '<div class="rednose-unit-main"></div>' +
                '<div class="rednose-unit-right"></div>' +
            '</div>');

        this.set('leftContainer' , container.one('.rednose-unit-left'));
        this.set('rightContainer', container.one('.rednose-unit-right'));

        container.one('.rednose-unit-main').append('<div class="rednose-viewport-container"><div class="rednose-viewport"></div></div>');
        this.set('viewContainer', container.one('.rednose-viewport'));
    }
};

ViewTemplateThreeColumn.ATTRS = {
    /**
     * @attribute leftContainer
     * @type Node
     */
    leftContainer: {
        value: null
    },

    /**
     * @attribute rightContainer
     * @type Node
     */
    rightContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').ThreeColumn = ViewTemplateThreeColumn;
