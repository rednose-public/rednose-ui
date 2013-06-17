YUI.add('rednose-app-templates', function (Y, NAME) {

/**
 * RedNose framework app/view templates
 */
function Templates() {
    Templates.superclass.constructor.apply(this);
}

/**
 * Basic master-detail app view
 */
Templates.masterDetailApp =
    '<div class="yui3-g rednose-app-master-detail-container">' +
        '<div class="yui3-u rednose-app-master-view"></div>' +
        '<div class="yui3-u rednose-app-detail-view"></div>' +
    '</div>';

/**
 * Basic master-detail grid subview
 */
Templates.masterDetailGrid =
    '<div class="yui3-g rednose-grid-master-detail-container">' +
        '<div class="yui3-u rednose-grid-master-view"></div>' +
        '<div class="yui3-u rednose-grid-detail-view"></div>' +
    '</div>';


// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Templates = Templates;


}, '1.0.0');
