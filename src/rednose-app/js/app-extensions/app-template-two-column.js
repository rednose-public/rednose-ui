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
