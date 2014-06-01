/*jshint boss:true, expr:true, onevar:false */

/**
 * View extension, adds a title section to an instance of View, and a footer section with a
 * configuration of buttons.
 *
 * @module rednose-app
 * @submodule rednose-view-nav
 */

var Micro = Y.Template.Micro;

/**
 * Fired when the close button is clicked.
 *
 * @event close
 * @param {EventFacade} originEvent Original click event.
 */
var EVT_CLOSE = 'close';

/**
 * Fired when all parts of the composed view are rendered.
 *
 * @event load
 */
var EVT_LOAD = 'load';

/**
 * View extension, adds a title section to an instance of View, and a footer section with a
 * configuration of buttons.
 *
 * @class Nav
 * @namespace Rednose.View
 * @constructor
 * @extensionfor View
 */
var ViewNav = Y.Base.create('viewNav', Y.View, [], {
    // -- Public Properties ----------------------------------------------------

    /**
     * Title property, sets the panel's header content.
     *
     * @property {String} title
     * @default null
     */
    title: null,

    /**
     * Button groups property, sets the panel's left footer buttons.
     *
     * Accepts an array of button-group configurations.
     *
     * @property {Object[]} buttonGroups
     * @default null
     */
    buttonGroups: null,

    /**
     * Reference to the views toolbar.
     *
     * @property {Rednose.Toolbar} toolbar
     * @default null
     */
    toolbar: null,

    /**
     * Whether the footer section will be rendered or not.
     *
     * @property {Boolean} footer
     * @default true
     */
    footer: true,

    /**
     * Whether the close button will be rendered in the header or not.
     *
     * @property {Boolean} close
     * @default false
     */
    close: false,

    /**
     * Optionally enable padding for the body view.
     *
     * @property {Boolean} padding
     * @default false
     */
    padding: false,

    /**
     * Templates used by the extension.
     *
     * @property {Object} templates
     */
    templates: {
        header: Micro.compile(
            '<div style="width: 100%;">' +

                '<% if (data.close) { %>' +
                    '<div style="float: right; white-space: nowrap;">' +
                        '<button class="<%= data.classNames.close %>">&times;</button>' +
                    '</div>' +
                '<% } %>' +

                '<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' +
                    '<%= data.title %>' +
                '</div>' +

            '</div>'
        )
    },

    /**
     * CSS class names used by this extension.
     *
     * @property {Object} baseClassNames
     */
    baseClassNames: {
        nav   : 'rednose-view-nav',
        close : 'close',
        header: 'rednose-nav-header',
        footer: 'rednose-nav-footer'
    },

    // -- Protected Properties -------------------------------------------------

    /**
     * References the body DOM node.
     *
     * @property _body
     * @type Node
     * @protected
     */
    _body: null,

    /**
     * References the footer DOM node.
     *
     * @property _footer
     * @type Node
     * @protected
     */
    _footer: null,

    /**
     * Stores references to an active panel.
     *
     * @property _pabel
     * @type Object
     * @protected
     */
    _panel: null,

    // -- Lifecycle Methods ----------------------------------------------------

    /**
     * @method initializer
     */
    initializer: function () {
        this._viewNavEventHandles || (this._viewNavEventHandles = []);

        var container = this.get('container'),
            self      = this;

        this._viewNavEventHandles.push(
            Y.Do.after(this._afterRender, this, 'render', this),

            container.delegate('click', this._onCloseClick, '.close', this)
        );

        this.footer && this._buildFooter();

        if (this.close) {
            Y.on('keydown', function (e) {
                if (e.keyCode === 27) {
                    self.fire(EVT_CLOSE);
                }
            });
        }
    },

    /**
     * @method destructor
     */
    destructor: function () {
        (new Y.EventHandle(this._viewNavEventHandles)).detach();

        this.title        = null;
        this.buttonGroups = null;
        this._body        = null;
        this._footer      = null;

        if (this._panel) {
            this._panel.destroy();

            this._panel = null;
        }

        if (this.toolbar) {
            this.toolbar.removeTarget(this);
            this.toolbar.destroy();

            this.toolbar = null;
        }
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Called by Rednose.App when the view dimensions change.
     *
     * @param {Node} parent
     */
    sizeView: function (parent) {
        return;
        var bodyHeight = parseInt(parent.get('offsetHeight'), 10);

        if (isNaN(bodyHeight)) {
            return;
        }

        if (this.title) {
            bodyHeight -= 46;
        }

        if (this.footer) {
            bodyHeight -= 56;
        }

        this._body.set('offsetHeight', bodyHeight);

        // Check for Y.Rednose.App templates.
        if (this._body.one('.rednose-unit-left')) {
            this._body.one('.rednose-unit-left').setStyle('height', bodyHeight);
        }

        if (this._body.one('.rednose-unit-right')) {
            this._body.one('.rednose-unit-right').setStyle('height', bodyHeight);
        }

        if (this._body.one('.rednose-unit-right')) {
            this._body.one('.rednose-unit-right').setStyle('top', 46);
        }

        this.fire(EVT_LOAD);
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * Build the footer buttons and bind them to fire events.
     *
     * @method _buildFooter
     * @protected
     */
    _buildFooter: function () {
        this._footer = Y.Node.create('<div></div>');

        if (this.buttonGroups) {
            this.toolbar = new Y.Rednose.Toolbar({
                container: this._footer,
                groups   : this.buttonGroups
            }).render();

            this.toolbar.addTarget(this);
        }
    },

    /**
     * Formats a magic CSS class for a component name.
     *
     * @param {String} name
     * @return {String}
     * @protected
     */
    _getMagicClassName: function (name) {
        return ViewNav.CSS_PREFIX + '-' + Y.Rednose.Util.camelCaseToDash(name);
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param {EventFacade} e
     * @protected
     */
    _onCloseClick: function (e) {
        this.fire(EVT_CLOSE, {
            originEvent: e
        });
    },

    /**
     * Wraps the view into a panel after it's rendered.
     *
     * @method _afterRender
     * @protected
     */
    _afterRender: function () {
        var container  = this.get('container'),
            classNames = this.baseClassNames,
            title      = this.title,
            body       = Y.Node.create('<div></div>'),
            footer     = this._footer,
            config     = { bodyContent: body },
            close      = this.close;

        container.addClass(classNames.nav);

        if (this.title) {
            container.addClass(classNames.header);
        }

        if (this.footer) {
            container.addClass(classNames.footer);
        }

        // Transfer the child nodes from the view container to the new body container.
        container.get('children').each(function (c) {
            body.append(c);
        });

        if (title) {
            config.headerContent = this.templates.header({
                classNames: classNames,
                title     : title,
                close     : close
            });
        }

        if (footer) {
            config.footerContent = footer;
        }

        this._panel = new Y.Rednose.NavContainer(config);

        // Render the panel within the view container.
        this._panel.render(container);

        // Add a magic CSS handle to the widget-body.
        var panelBody = this._panel.get('boundingBox').one('.yui3-widget-bd'),
            className = this._getMagicClassName(this.name);

        panelBody.addClass(className);

        if (this.padding === false) {
            panelBody.setStyle('padding', 0);
        }

        this._body = body;

        if (this.footer) {
            container.one('.yui3-widget-ft') && container.one('.yui3-widget-ft').show();
        } else {
            container.one('.yui3-widget-ft') && container.one('.yui3-widget-ft').hide();
        }

        // Adjust position.
        var parent = container.get('parentNode');

        parent && this.sizeView(parent);
    }
}, {
    /**
     * Prefix for the magic CSS classes.
     */
    CSS_PREFIX: 'rednose'
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View').Nav = ViewNav;
