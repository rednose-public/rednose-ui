/*jshint boss:true, expr:true, onevar:false */

function AppViewTemplate() {}

AppViewTemplate.prototype = {
    initializer: function () {
        this.set('viewContainer', this.get('viewportContainer'));
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.App').ViewTemplate = AppViewTemplate;
