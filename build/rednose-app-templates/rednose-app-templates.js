YUI.add('rednose-app-templates', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

function AppTemplateMasterDetail() {}

AppTemplateMasterDetail.prototype = {
    showNavbar: true,

    showToolbar: false,

    template: '<div class="rednose-grid rednose-master-detail-grid">' +
                  '<div class="rednose-unit-container">' +
                      '<div class="rednose-unit-main"></div>' +
                      '<div class="rednose-unit-right"></div>' +
                  '</div>' +
              '</div>',

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this.set('gridRight', container.one('.rednose-unit-right'));

        if (this.showNavbar) {
            container.addClass('rednose-navbar-grid');
            container.prepend('<div class="rednose-navbar"></div>');

            this.set('navBar', container.one('.rednose-navbar'));
        }

        if (this.showToolbar) {
            container.one('.rednose-unit-main').append(
                '<div class="rednose-toolbar"></div>' +
                '<div class="rednose-viewport"></div>'
            );

            this.set('toolbar', container.one('.rednose-toolbar'));
            this.set('gridMain', container.one('.rednose-viewport'));
        } else {
            this.set('gridMain', container.one('.rednose-unit-main'));
        }

        this.get('gridMain').setStyle('height', '100%');

        this.set('viewContainer', this.get('gridMain'));
    }
};

AppTemplateMasterDetail.ATTRS = {
    toolbar  : { value: null },
    navBar   : { value: null },
    gridMain : { value: null },
    gridRight: { value: null }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Template').MasterDetail = AppTemplateMasterDetail;
/*jshint boss:true, expr:true, onevar:false */

function AppTemplateSingleView() {}

AppTemplateSingleView.prototype = {
    navigationBar: true,

    showToolbar: false,

    template: '<div class="rednose-grid">' +
                  '<div class="rednose-unit-container">' +
                      '<div class="rednose-unit-main"></div>' +
                  '</div>' +
              '</div>',

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        if (this.navigationBar) {
            container.addClass('rednose-navbar-grid');
            container.prepend('<div class="rednose-navbar"></div>');

            this.set('navBar', container.one('.rednose-navbar'));
        }

        if (this.showToolbar) {
            container.one('.rednose-unit-main').append(
                '<div class="rednose-toolbar"></div>' +
                    '<div class="rednose-viewport"></div>'
            );

            this.set('toolbar', container.one('.rednose-toolbar'));
            this.set('gridMain', container.one('.rednose-viewport'));
        } else {
            this.set('gridMain', container.one('.rednose-unit-main'));
        }

        this.set('viewContainer', this.get('gridMain'));
    }
};

AppTemplateSingleView.ATTRS = {
    gridMain : { value: null }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Template').SingleView = AppTemplateSingleView;
/*jshint boss:true, expr:true, onevar:false */

function AppTemplateThreeColumn() {}

AppTemplateThreeColumn.prototype = {
    showNavbar: true,

    showToolbar: false,

    template: '<div class="rednose-grid rednose-three-column-grid">' +
                  '<div class="rednose-unit-container">' +
                      '<div class="rednose-unit-left"></div>' +
                      '<div class="rednose-unit-main"></div>' +
                      '<div class="rednose-unit-right"></div>' +
                  '</div>' +
              '</div>',

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        if (this.showNavbar) {
            container.addClass('rednose-navbar-grid');
            container.prepend('<div class="rednose-navbar"></div>');

            this.set('navBar', container.one('.rednose-navbar'));
        }

        if (this.showToolbar) {
            container.one('.rednose-unit-main').append(
                '<div class="rednose-toolbar"></div>' +
                '<div class="rednose-viewport"></div>'
            );

            this.set('toolbar', container.one('.rednose-toolbar'));
            this.set('gridMain', container.one('.rednose-viewport'));
        } else {
            this.set('gridMain', container.one('.rednose-unit-main'));
        }

        this.set('gridLeft' , container.one('.rednose-unit-left'));
        this.set('gridRight', container.one('.rednose-unit-right'));

        this.set('viewContainer', this.get('gridMain'));
    }
};

AppTemplateThreeColumn.ATTRS = {
    toolbar : { value: null },
    navBar  : { value: null },

    gridLeft : { value: null },
    gridMain : { value: null },
    gridRight: { value: null }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Template').ThreeColumn = AppTemplateThreeColumn;
/*jshint boss:true, expr:true, onevar:false */

function AppTemplateTwoColumn() {}

AppTemplateTwoColumn.prototype = {

    showNavbar: true,

    showToolbar: false,

    splitView: false,

    template:
        '<div class="rednose-grid rednose-two-column-grid">' +
            '<div class="rednose-unit-container">' +
                '<div class="rednose-unit-left"></div>' +
                '<div class="rednose-unit-main"></div>' +
            '</div>' +
        '</div>',

    splitTemplate:
        '<div>' +
            '<div class="rednose-unit-main-top"></div>' +
            '<div class="rednose-unit-main-bottom"></div>' +
        '</div>',

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);

        this.set('gridLeft', container.one('.rednose-unit-left'));

        if (this.showNavbar) {
            container.addClass('rednose-navbar-grid');
            container.prepend('<div class="rednose-navbar"></div>');

            this.set('navBar', container.one('.rednose-navbar'));
        }

        if (this.showToolbar) {
            container.one('.rednose-unit-main').append(
                '<div class="rednose-toolbar"></div>' +
                '<div class="rednose-viewport"></div>'
            );

            this.set('toolbar', container.one('.rednose-toolbar'));
            this.set('gridMain', container.one('.rednose-viewport'));

            container.one('.rednose-unit-main').setStyle('height', '100%');
        } else {
            this.set('gridMain', container.one('.rednose-unit-main'));

            this.get('gridMain').setStyle('height', '100%');
        }

        if (this.splitView) {
            this.get('gridMain').append(this.splitTemplate);

            this.set('gridMainTop', container.one('.rednose-unit-main-top'));
            this.set('gridMainBottom', container.one('.rednose-unit-main-bottom'));
        }

        this.set('viewContainer', this.get('gridMain'));
    }
};

AppTemplateTwoColumn.ATTRS = {
    toolbar : { value: null },
    navBar  : { value: null },

    gridLeft: { value: null },
    gridMain: { value: null },

    gridMainTop: { value: null },
    gridMainBottom: { value: null }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Template').TwoColumn = AppTemplateTwoColumn;


}, '1.5.0-DEV');
