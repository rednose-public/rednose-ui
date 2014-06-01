YUI.add('rednose-app-view-template', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

function AppViewTemplate() {}

AppViewTemplate.prototype = {
    initializer: function () {
        this.set('viewContainer', this.get('viewportContainer'));
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.App').ViewTemplate = AppViewTemplate;


}, '1.5.0-DEV', {"requires": ["rednose-app-base"]});
