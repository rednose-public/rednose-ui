/*jshint boss:true, expr:true, onevar:false */

function AppTemplateThreeColumn() {}

AppTemplateThreeColumn.prototype = {

    template: '<div class="rednose-grid">' +
                  '<div class="rednose-unit-left"></div>' +
                  '<div class="rednose-unit-center"></div>' +
                  '<div class="rednose-unit-right"></div>' +
              '</div>',

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this.set('gridLeft'  , container.one('.rednose-unit-left'));
        this.set('gridCenter', container.one('.rednose-unit-center'));
        this.set('gridRight' , container.one('.rednose-unit-right'));

        this.set('viewContainer', this.get('gridCenter'));
    }
};

AppTemplateThreeColumn.ATTRS = {
    gridLeft  : { value: null },
    gridCenter: { value: null },
    gridRight : { value: null }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Template').ThreeColumn = AppTemplateThreeColumn;
