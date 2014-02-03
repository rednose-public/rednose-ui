YUI.add('rednose-app-templates', function (Y, NAME) {

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
/**
RedNose framework app/view templates.

@module rednose-app
@submodule rednose-app-templates
**/

/**
RedNose framework app/view templates.

@class Templates
@namespace Rednose
@constructor
**/
function Templates() {
    Templates.superclass.constructor.apply(this);
}

/**
Basic detail app view.

@method detailApp
@static
**/
Templates.detailApp =
    '<div class="yui3-g rednose-app-detail-container">' +
        '<div class="yui3-u rednose-app-detail-view"></div>' +
    '</div>';

/**
Basic master-detail app view.

@method masterDetailApp
@static
**/
Templates.masterDetailApp =
    '<div class="yui3-g rednose-app-master-detail-container">' +
        '<div class="yui3-u rednose-app-master-view"></div>' +
        '<div class="yui3-u rednose-app-detail-view"></div>' +
    '</div>';

/**
Basic master-detail grid subview.

@method masterDetailGrid
@static
 */
Templates.masterDetailGrid =
    '<div class="yui3-g rednose-grid-master-detail-container">' +
        '<div class="yui3-u rednose-grid-master-view"></div>' +
        '<div class="yui3-u rednose-grid-detail-view"></div>' +
    '</div>';

/**
Basic View message container

@method detailApp
@static
**/
Templates.viewMessage =
    '<div class="rednose-app-message-container">' +
        '<div class="rednose-app-message-title">{message}</div>' +
        '<div class="rednose-app-message-body">{subMessage}</div>' +
  '</div>';

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Templates = Templates;


}, '1.1.0-DEV');
