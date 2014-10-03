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
        this.set('viewContainer', container.one('.rednose-viewport'));
    }
};

ViewTemplateMasterDetail.ATTRS = {
    /**
     * @attribute rightContainer
     * @type Node
     */
    rightContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').MasterDetail = ViewTemplateMasterDetail;
/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateNavbar() {}

ViewTemplateNavbar.prototype = {
    initializer: function () {
        var container = this.get('container');

        container.addClass('rednose-navbar-grid');
        container.prepend('<div class="rednose-navbar"></div>');

        this.set('navbarContainer', container.one('.rednose-navbar'));
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

function ViewTemplateRuler() {}

ViewTemplateRuler.prototype = {
    initializer: function () {
        var container = this.get('container');

        container.one('.rednose-unit-main').addClass('rednose-ruler-unit-main');
        container.one('.rednose-unit-main').append('<div class="rednose-ruler"></div>');

        this.set('rulerContainer', container.one('.rednose-ruler'));
    }
};

ViewTemplateRuler.ATTRS = {
    /**
     * @attribute toolbarContainer
     * @type Node
     */
    rulerContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').Ruler = ViewTemplateRuler;
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
        this.set('viewContainer', container.one('.rednose-viewport'));
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').SingleView = ViewTemplateSingleView;
/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateSplitView() {}

ViewTemplateSplitView.prototype = {
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

        this.get('viewContainer').append(this.splitViewTemplate);

        this.set('topContainer', container.one('.rednose-unit-main-top'));
        this.set('bottomContainer', container.one('.rednose-unit-main-bottom'));
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
        this.set('viewContainer', container.one('.rednose-viewport'));
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
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').ThreeColumn = ViewTemplateThreeColumn;
/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateToolbar() {}

ViewTemplateToolbar.prototype = {
    initializer: function () {
        var container = this.get('container');

        container.one('.rednose-unit-main').addClass('rednose-toolbar-unit-main');
        container.one('.rednose-unit-main').append('<div class="rednose-toolbar"></div>');

        this.set('toolbarContainer', container.one('.rednose-toolbar'));
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
        this.set('viewContainer', container.one('.rednose-viewport'));
    }
};

ViewTemplateTwoColumn.ATTRS = {
    /**
     * @attribute leftContainer
     * @type Node
     */
    leftContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').TwoColumn = ViewTemplateTwoColumn;


}, '1.6.0-dev', {"requires": ["view"]});
