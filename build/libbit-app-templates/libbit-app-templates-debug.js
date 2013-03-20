YUI.add('libbit-app-templates', function (Y, NAME) {

/**
 * LiBBiT framework app/view templates
 */
function Templates() {
    Templates.superclass.constructor.apply(this);
}

/**
 * Basic master-detail app view
 */
Templates.masterDetailApp =
    '<div class="yui3-g libbit-app-master-detail-container">' +
        '<div class="yui3-u libbit-app-master-view"></div>' +
        '<div class="yui3-u libbit-app-detail-view"></div>' +
    '</div>';

/**
 * Basic master-detail grid subview
 */
Templates.masterDetailGrid =
    '<div class="yui3-g libbit-grid-master-detail-container">' +
        '<div class="yui3-u libbit-grid-master-view"></div>' +
        '<div class="yui3-u libbit-grid-detail-view"></div>' +
    '</div>';


// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Templates = Templates;


}, '1.0.0');
