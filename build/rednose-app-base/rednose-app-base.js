YUI.add('rednose-app-base', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Extension of the original Y.App, to provide support for modal views.
 *
 * @module rednose-app
 */

var CSS_SPINNER = 'rednose-spinner',

    STYLE_MODAL_WIDTH  = 1088,
    STYLE_MODAL_HEIGHT = 640;

var CSS_MAGIC_PREFIX = 'rednose';

/**
 * Extension of the original Y.App, to provide support for modal views.
 *
 * @class App
 * @namespace Rednose
 * @constructor
 * @extends App
 */
var App = Y.Base.create('app', Y.App, [], {
    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the Panel instances to manage the active modal views.
     *
     * @property containerTemplate
     * @type String
     * @protected
     */
    _activePanel: null,

    /**
     * @property _backgroundView
     * @type {View}
     * @protected
     */
    _backgroundView: null,

    // -- Lifecycle Methods ----------------------------------------------------

    /**
     * @method initializer
     * @protected
     */
    initializer: function (config) {
        var container = this.get('container');

        // Slow down transitions so we see what's happening
        if (config.debug) {
            Y.Transition.fx['app:fadeIn'].duration     = 1;
            Y.Transition.fx['app:fadeOut'].duration    = 1;
            Y.Transition.fx['app:slideRight'].duration = 1;
            Y.Transition.fx['app:slideLeft'].duration  = 1;
        }

        // Add a magic CSS handle to the app container.
        container.addClass(CSS_MAGIC_PREFIX + '-' + Y.Rednose.Util.camelCaseToDash(this.name));
    },

    /**
     * @method detructor
     * @protected
     */
    destructor: function () {
        this._activePanel && this._activePanel.destroy();
        this._activePanel = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Pops a modal view from the navigation stack.
     *
     * @method popModalView
     */
    popModalView: function () {
        var view     = this.get('activeView'),
            viewInfo = this.getViewInfo(view);

        if (viewInfo.modal && this._backgroundView) {
            this.showView(this._backgroundView);
        }
    },

    /**
     * Adds support for app views.
     *
     * @see App.createView()
     */
    createView: function (name, config) {
        config || (config = {});

        var viewInfo = this.getViewInfo(name),
            type     = (viewInfo && viewInfo.type) || Y.View,
            ViewConstructor, view;

        // Allow app views.
        config.container   = Y.Node.create('<div></div>');
        config.transitions = this.get('transitions');

        // Looks for a namespaced constructor function on `Y`.
        ViewConstructor = Y.Lang.isString(type) ?
            Y.Object.getValue(Y, type.split('.')) : type;

        view = new ViewConstructor(config);
        this._viewInfoMap[Y.stamp(view, true)] = viewInfo;

        return view;
    },

    /**
     * Override the superclass method to check if this view needs to be lazyloaded first.
     *
     * @see App.showView()
     */
    showView: function (view, config, options, callback) {
        var self     = this,
            viewInfo = this.getViewInfo(view);

        if (viewInfo.modal || (this.get('activeView') && this.getViewInfo(this.get('activeView')).modal) ) {
            options = options || {};
            options.transition = false;
        }

        if (viewInfo.lazyload) {
            App.showSpinner();
            // Attach to the global Y object, this needs to be set (var Y = YUI();).
            Y.use(viewInfo.lazyload, function () {
                App.hideSpinner();
                App.superclass.showView.apply(self, [ view, config, options, callback ]);
            });
        } else {
            App.superclass.showView.apply(self, [ view, config, options, callback ]);
        }
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * Hook into the view change, to handle modal views.
     *
     * @see App._detachView()
     */
    _detachView: function (view) {
        if (!view) {
            return;
        }

        // Parent-view is detached after modal segue.
        if (this.getViewInfo(this.get('activeView')).modal) {
            this._backgroundView = view;
            view.removeTarget(this);

            return;
        } else {
            // Modal-view is detached after modal->parent segue.
            if (this._activePanel) {
                this._activePanel.destroy();
            }
        }

        var viewInfo = this.getViewInfo(view) || {};

        if (viewInfo.preserve) {
            view.remove();
        } else {
            view.destroy({remove: true});

            // Remove from view to view-info map.
            delete this._viewInfoMap[Y.stamp(view, true)];

            // Remove from view-info instance property.
            if (view === viewInfo.instance) {
                delete viewInfo.instance;
            }
        }

        view.removeTarget(this);
    },

    /**
     * Hook into the view change, to handle modal views.
     *
     * @see App._attachView()
     */
    _attachView: function (view, prepend) {
        if (!view) {
            return;
        }

        var viewInfo      = this.getViewInfo(view),
            viewContainer = this.get('viewContainer');

        // Bubble the view's events to this app.
        view.addTarget(this);

        // Save the view instance in the `views` registry.
        if (viewInfo) {
            viewInfo.instance = view;
        }

        // Modal view is attached from modal segue.
        if (viewInfo.modal) {
            // Bind close event.
            view.after('close', this.popModalView, this);

            this._activePanel = new Y.Rednose.Panel({
                srcNode: view.get('container'),
                width  : viewInfo.width || STYLE_MODAL_WIDTH,
                height : viewInfo.height || STYLE_MODAL_HEIGHT
            });

            if (viewInfo.top) {
                this._activePanel.set('top', viewInfo.top);
            }

            this._activePanel.render();

            if (typeof view.sizeView === 'function') {
                view.sizeView(this._activePanel.get('boundingBox'));
            }
        } else {
            // Return if this is a backwards modal segue, the view is still preserved.
            if (this._backgroundView) {
                this._backgroundView = null;

                return;
            }

            // Don't append nodes that aren't removed, for example a background view behind a modal panel.
            if (view.get('container').inDoc() === false) {
                // Insert view into the DOM.
                viewContainer[prepend ? 'prepend' : 'append'](view.get('container'));
            }

            // Size the view if needed (check for method inherited from Y.Rednose.View.Nav).
            if (typeof view.sizeView === 'function') {
                view.sizeView(viewContainer);
            }
        }
    }
}, {
    ATTRS: {
        /**
         * Overrides the linkSelector to disable pjax binding
         */
        linkSelector: {
            value: null
        }
    }
});

// -- Static methods -----------------------------------------------------------

/**
 * Show the spinner icon in the center of the screen.
 *
 * @method showSpinner
 * @static
 */
App.showSpinner = function () {
    Y.one('body').prepend(Y.Node.create('<div class="' + CSS_SPINNER + '"></div>'));
};

/**
 * Hide all active spinner icon instances.
 *
 * @method hideSpinner
 * @static
 */
App.hideSpinner = function () {
    Y.all('.' + CSS_SPINNER).remove();
};

App.MESSAGE_TEMPLATE = '<div class="rednose-grid-message-container">' +
                           '<div class="rednose-grid-message-title">{title}</div>' +
                           '<div class="rednose-grid-message-body">{subtitle}</div>' +
                       '</div>';

/**
 * @method createMessage
 * @param {String} title
 * @param {String} subtitle
 * @return {Node}
 * @static
 */
App.createMessage = function (title, subtitle) {
    subitle = subtitle || '';

    return Y.Node.create(Y.Lang.sub(this.MESSAGE_TEMPLATE, { title: title, subtitle: subtitle }));
};

/**
 * Sets the application title
 *
 * @param {String} title
 * @param {Boolean} dirty
 * @static
 */
App.setTitle = function (title, dirty) {
    dirty && (title = title.concat(' *'));

    Y.one('title').setHTML(title);
};


// -- Namespace ----------------------------------------------------------------
Y.Rednose.App = Y.mix(App, Y.Rednose.App);


}, '1.5.0-DEV', {"requires": ["app-base", "rednose-panel", "rednose-util"]});
