/*jshint boss:true, expr:true, onevar:false */

/**
Extension of the original Y.App, to provide support for modal views.

@module rednose-app
**/

var CSS_SPINNER = 'rednose-spinner',

    STYLE_MODAL_WIDTH  = 1088,
    STYLE_MODAL_HEIGHT = 640;

var CSS_MAGIC_PREFIX = 'rednose';

/**
Extension of the original Y.App, to provide support for modal views.

@class App
@namespace Rednose
@constructor
@extends App
**/
var App = Y.Base.create('app', Y.App, [], {
    // -- Protected Properties -------------------------------------------------

    /**
    Stores the Panel instances to manage the active modal views.

    @property containerTemplate
    @type String
    @protected
    **/
    _activePanel: null,

    _backgroundView: null,

    // -- Lifecycle Methods ----------------------------------------------------

    /**
    @method initializer
    @protected
    **/
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
    @method detructor
    @protected
    **/
    destructor: function () {
        this._activePanel && this._activePanel.destroy();
        this._activePanel = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Adds support for app views.
     *
     * @param name
     * @param config
     * @returns {ViewConstructor}
     */
    createView: function (name, config) {
        var viewInfo = this.getViewInfo(name),
            type     = (viewInfo && viewInfo.type) || Y.View,
            ViewConstructor, view;

        // Looks for a namespaced constructor function on `Y`.
        ViewConstructor = Y.Lang.isString(type) ?
            Y.Object.getValue(Y, type.split('.')) : type;

        // Create the view instance and map it with its metadata.
        if (ViewConstructor.superclass.constructor.NAME === 'app') {
            view = new Y.Rednose.AppView(Y.merge(config, { appConstructor: ViewConstructor }));
        } else {
            view = new ViewConstructor(config);
        }

        this._viewInfoMap[Y.stamp(view, true)] = viewInfo;

        return view;
    },

    /**
    Pops a modal view from the navigation stack.

    @method popModalView
    **/
    popModalView: function () {
        var view     = this.get('activeView'),
            viewInfo = this.getViewInfo(view);

        if (viewInfo.modal && this._backgroundView) {
            this.showView(this._backgroundView);
        }
    },

    /**
    Override the superclass method to check if this view needs to be lazyloaded first.

    @method showView
    **/
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
    Hook into the view change, to handle modal views.

    @method _detachView
    @protected
    **/
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
            // TODO: Detach events here for preserved Views? It is possible that
            // some event subscriptions are made on elements other than the
            // View's `container`.
        } else {
            view.destroy({remove: true});

            // TODO: The following should probably happen automagically from
            // `destroy()` being called! Possibly `removeTarget()` as well.

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
    Hook into the view change, to handle modal views.

    @method _attachView
    @protected
    **/
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

        // TODO: Attach events here for persevered Views?
        // See related TODO in `_detachView`.

        // TODO: Actually render the view here so that it gets "attached" before
        // it gets rendered?

        // Modal view is attached from modal segue.
        if (viewInfo.modal) {
            // Only render the panel if the view does not provide his own (dialogs).
            if (typeof(viewInfo.instance.get('panel')) === 'undefined') {
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
        Overrides the linkSelector to disable pjax binding
        **/
        linkSelector: {
            value: null
        }
    }
});

// -- Static methods -----------------------------------------------------------

/**
Show the spinner icon in the center of the screen.

@method showSpinner
@static
**/
App.showSpinner = function () {
    Y.one('body').prepend(Y.Node.create('<div class="' + CSS_SPINNER + '"></div>'));
};

/**
Hide all active spinner icon instances.

@method hideSpinner
@static
**/
App.hideSpinner = function () {
    Y.all('.' + CSS_SPINNER).remove();
};

App.MESSAGE_TEMPLATE = '<div class="rednose-grid-message-container">' +
                           '<div class="rednose-grid-message-title">{title}</div>' +
                           '<div class="rednose-grid-message-body">{subtitle}</div>' +
                       '</div>';

/**
@method createMessage
@param {String} title
@param {String} subtitle
@return {Node}
@static
**/
App.createMessage = function (title, subtitle) {
    subitle = subtitle || '';

    return Y.Node.create(Y.Lang.sub(this.MESSAGE_TEMPLATE, { title: title, subtitle: subtitle }));
};

/**
 * Sets the application title
 *
 * @param {String} title
 * @static
 */
App.setTitle = function (title) {
    Y.one('title').setHTML(title);
};


// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').App = App;
