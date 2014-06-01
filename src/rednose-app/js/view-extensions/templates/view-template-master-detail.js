/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateMasterDetail() {}

ViewTemplateMasterDetail.prototype = {
    initializer: function () {
        var container = this.get('container');

        container.addClass('rednose-grid');
        container.addClass('rednose-master-detail-grid');

        container.append(
            '<div class="rednose-unit-container">' +
                '<div class="rednose-unit-main"></div>' +
                '<div class="rednose-unit-right"></div>' +
            '</div>');

        this.set('rightContainer', container.one('.rednose-unit-right'));

        // Add extra container so CSS transitions don't jump.
        container.one('.rednose-unit-main').append('<div class="rednose-viewport-container"><div class="rednose-viewport"></div></div>');
        this.set('viewContainer', container.one('.rednose-viewport'));
    }
};

ViewTemplateMasterDetail.ATTRS = {
    /**
     * @attribute rightContainer
     * @type Node
     */
    rightContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').MasterDetail = ViewTemplateMasterDetail;
