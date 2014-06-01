/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateNavbar() {}

ViewTemplateNavbar.prototype = {
    /**
     * @property showNavbar
     * @type Boolean
     * @default true
     */
    showNavbar: true,

    initializer: function () {
        var container = this.get('container');

        if (this.showNavbar) {
            container.addClass('rednose-navbar-grid');
            container.prepend('<div class="rednose-navbar"></div>');

            this.set('navbarContainer', container.one('.rednose-navbar'));
        }
    }
};

ViewTemplateNavbar.ATTRS = {
    /**
     * @attribute navbarContainer
     * @type Node
     */
    navbarContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').Navbar = ViewTemplateNavbar;
