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
