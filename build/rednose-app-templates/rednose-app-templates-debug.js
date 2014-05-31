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
    /**
     * @attribute showNavbar
     * @type {Boolean}
     * @default true
     */
    showNavbar: true,

    /**
     * @attribute showNavbar
     * @type {Boolean}
     * @default false
     */
    showToolbar: false,

    initializer: function () {
        var container = this.get('container');

        container.addClass('rednose-grid');

        container.append(
            '<div class="rednose-unit-container">' +
                '<div class="rednose-unit-main"></div>' +
            '</div>');

        if (this.showNavbar) {
            container.addClass('rednose-navbar-grid');
            container.prepend('<div class="rednose-navbar"></div>');

            this.set('navbarContainer', container.one('.rednose-navbar'));
        }

        if (this.showToolbar) {
            container.one('.rednose-unit-main').addClass('rednose-toolbar-unit-main');
            container.one('.rednose-unit-main').append('<div class="rednose-toolbar"></div>');

            this.set('toolbarContainer', container.one('.rednose-toolbar'));
        }

        // Add extra container so CSS transition don't jump.
        container.one('.rednose-unit-main').append('<div class="rednose-viewport-container"><div class="rednose-viewport"></div></div>');
        this.set('viewportContainer', container.one('.rednose-viewport'));

        this.set('viewContainer', this.get('viewportContainer'));
    }
};

AppTemplateSingleView.ATTRS = {
    /**
     * @attribute navbarContainer
     * @type Node
     */
    navbarContainer: {
        value: null
    },

    /**
     * @attribute toolbarContainer
     * @type Node
     */
    toolbarContainer: {
        value: null
    },

    /**
     * @attribute viewportContainer
     * @type Node
     */
    viewportContainer: {
        value: null
    }
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
    /**
     * @attribute showNavbar
     * @type {Boolean}
     * @default true
     */
    showNavbar: true,

    /**
     * @attribute showNavbar
     * @type {Boolean}
     * @default false
     */
    showToolbar: false,

    splitView: false,

    splitTemplate:
        '<div>' +
            '<div class="rednose-unit-main-top"></div>' +
            '<div class="rednose-unit-main-bottom"></div>' +
        '</div>',

    initializer: function () {
        var container = this.get('container');

        container.addClass('rednose-grid');
        container.addClass('rednose-two-column-grid');

        container.append(
            '<div class="rednose-unit-container">' +
                '<div class="rednose-unit-left"></div>' +
                '<div class="rednose-unit-main"></div>' +
            '</div>');

        this.set('leftContainer', container.one('.rednose-unit-left'));

        if (this.showNavbar) {
            container.addClass('rednose-navbar-grid');
            container.prepend('<div class="rednose-navbar"></div>');

            this.set('navbarContainer', container.one('.rednose-navbar'));
        }

        if (this.showToolbar) {
            container.one('.rednose-unit-main').addClass('rednose-toolbar-unit-main');
            container.one('.rednose-unit-main').append('<div class="rednose-toolbar"></div>');

            this.set('toolbarContainer', container.one('.rednose-toolbar'));
        }

        if (this.splitView) {
            this.get('viewportContainer').append(this.splitTemplate);

            this.set('gridMainTop', container.one('.rednose-unit-main-top'));
            this.set('gridMainBottom', container.one('.rednose-unit-main-bottom'));
        }

        // Add extra container so CSS transition don't jump.
        container.one('.rednose-unit-main').append('<div class="rednose-viewport-container"><div class="rednose-viewport"></div></div>');
        this.set('viewportContainer', container.one('.rednose-viewport'));

        this.set('viewContainer', this.get('viewportContainer'));
    }
};

AppTemplateTwoColumn.ATTRS = {
    /**
     * @attribute navbarContainer
     * @type Node
     */
    navbarContainer: {
        value: null
    },

    /**
     * @attribute toolbarContainer
     * @type Node
     */
    toolbarContainer: {
        value: null
    },

    /**
     * @attribute leftContainer
     * @type Node
     */
    leftContainer: {
        value: null
    },

    /**
     * @attribute viewportContainer
     * @type Node
     */
    viewportContainer: {
        value: null
    },

    gridMainTop: { value: null },
    gridMainBottom: { value: null }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Template').TwoColumn = AppTemplateTwoColumn;


}, '1.5.0-DEV');
