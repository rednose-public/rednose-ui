YUI.add('rednose-view-templates', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateMasterDetail() {}

ViewTemplateMasterDetail.prototype = {
    initializer: function () {
        var container = this.get('container');

        container.addClass('rednose-grid');
        container.addClass('rednose-master-detail-grid');

        container.append(
            '<div class="rednose-unit-container">' +
                '<div class="rednose-unit-main"></div>' +
                '<div class="rednose-unit-right"></div>' +
            '</div>');

        this.set('rightContainer', container.one('.rednose-unit-right'));

        // Add extra container so CSS transitions don't jump.
        container.one('.rednose-unit-main').append('<div class="rednose-viewport-container"><div class="rednose-viewport"></div></div>');
        this.set('viewportContainer', container.one('.rednose-viewport'));
    }
};

ViewTemplateMasterDetail.ATTRS = {
    /**
     * @attribute rightContainer
     * @type Node
     */
    rightContainer: {
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
Y.namespace('Rednose.View.Template').MasterDetail = ViewTemplateMasterDetail;
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
/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateSingleView() {}

ViewTemplateSingleView.prototype = {
    initializer: function () {
        var container = this.get('container');

        container.addClass('rednose-grid');

        container.append(
            '<div class="rednose-unit-container">' +
                '<div class="rednose-unit-main"></div>' +
            '</div>');

        container.one('.rednose-unit-main').append('<div class="rednose-viewport-container"><div class="rednose-viewport"></div></div>');
        this.set('viewportContainer', container.one('.rednose-viewport'));
    }
};

ViewTemplateSingleView.ATTRS = {
    /**
     * @attribute viewportContainer
     * @type Node
     */
    viewportContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').SingleView = ViewTemplateSingleView;
/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateSplitView() {}

ViewTemplateSplitView.prototype = {
    /**
     * @property splitView
     * @type Boolean
     * @default false
     */
    splitView: false,

    /**
     * @property splitViewTemplate
     * @type String
     */
    splitViewTemplate:
        '<div>' +
            '<div class="rednose-unit-main-top"></div>' +
            '<div class="rednose-unit-main-bottom"></div>' +
        '</div>',

    initializer: function () {
        var container = this.get('container');

        if (this.splitView) {
            this.get('viewportContainer').append(this.splitViewTemplate);

            this.set('topContainer', container.one('.rednose-unit-main-top'));
            this.set('bottomContainer', container.one('.rednose-unit-main-bottom'));
        }
    }
};

ViewTemplateSplitView.ATTRS = {
    /**
     * @attribute topContainer
     * @type Node
     */
    topContainer: {
        value: null
    },

    /**
     * @attribute bottomContainer
     * @type Node
     */
    bottomContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').SplitView = ViewTemplateSplitView;
/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateThreeColumn() {}

ViewTemplateThreeColumn.prototype = {
    initializer: function () {
        var container = this.get('container');

        container.addClass('rednose-grid');
        container.addClass('rednose-three-column-grid');

        container.append(
            '<div class="rednose-unit-container">' +
                '<div class="rednose-unit-left"></div>' +
                '<div class="rednose-unit-main"></div>' +
                '<div class="rednose-unit-right"></div>' +
            '</div>');

        this.set('leftContainer' , container.one('.rednose-unit-left'));
        this.set('rightContainer', container.one('.rednose-unit-right'));

        container.one('.rednose-unit-main').append('<div class="rednose-viewport-container"><div class="rednose-viewport"></div></div>');
        this.set('viewportContainer', container.one('.rednose-viewport'));
    }
};

ViewTemplateThreeColumn.ATTRS = {
    /**
     * @attribute leftContainer
     * @type Node
     */
    leftContainer: {
        value: null
    },

    /**
     * @attribute rightContainer
     * @type Node
     */
    rightContainer: {
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
Y.namespace('Rednose.View.Template').ThreeColumn = ViewTemplateThreeColumn;
/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateToolbar() {}

ViewTemplateToolbar.prototype = {
    /**
     * @property showToolbar
     * @type Boolean
     * @default true
     */
    showToolbar: true,

    initializer: function () {
        var container = this.get('container');

        if (this.showToolbar) {
            container.one('.rednose-unit-main').addClass('rednose-toolbar-unit-main');
            container.one('.rednose-unit-main').append('<div class="rednose-toolbar"></div>');

            this.set('toolbarContainer', container.one('.rednose-toolbar'));
        }
    }
};

ViewTemplateToolbar.ATTRS = {
    /**
     * @attribute toolbarContainer
     * @type Node
     */
    toolbarContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').Toolbar = ViewTemplateToolbar;
/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateTwoColumn() {}

ViewTemplateTwoColumn.prototype = {
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

        // Add extra container so CSS transitions don't jump.
        container.one('.rednose-unit-main').append('<div class="rednose-viewport-container"><div class="rednose-viewport"></div></div>');
        this.set('viewportContainer', container.one('.rednose-viewport'));
    }
};

ViewTemplateTwoColumn.ATTRS = {
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
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').TwoColumn = ViewTemplateTwoColumn;


}, '1.5.0-DEV', {"requires": ["view"]});
