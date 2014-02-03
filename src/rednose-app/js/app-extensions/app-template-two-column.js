/*jshint boss:true, expr:true, onevar:false */

function AppTemplateTwoColumn() {}

AppTemplateTwoColumn.prototype = {

    template: '<div class="rednose-grid">' +
                  '<div class="rednose-unit-left"></div>' +
                  '<div class="rednose-unit-right"></div>' +
              '</div>',

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this.set('gridLeft' , container.one('.rednose-unit-left'));
        this.set('gridRight', container.one('.rednose-unit-right'));

        this.set('viewContainer', this.get('gridRight'));
    }
};

AppTemplateThreeColumn.ATTRS = {
    gridLeft  : { value: null },
    gridCenter: { value: null }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Template').TwoColumn = AppTemplateTwoColumn;
