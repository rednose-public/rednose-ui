var App;

/**
Extension of the original Y.App, to provide support for modal views.
**/
App = Y.Base.create('libbit-app', Y.App, [], {

    /**
     * Stores the Panel instances to manage the active modal views.
     */
    _activePanel: null,

    /**
     * Override the superclass method to check if this view needs to be lazyloaded first.
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

    /**
     * Hook into the view change, to handle modal views.
     */
    _detachView: function (view) {
        if (!view) {
            return;
        }

        if (this.getViewInfo(this.get('activeView')).modal) {
            view.removeTarget(this);

            return;
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
     * Hook into the view change, to handle modal views.
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

        // TODO: Attach events here for persevered Views?
        // See related TODO in `_detachView`.

        // TODO: Actually render the view here so that it gets "attached" before
        // it gets rendered?

        if (this._activePanel) {
            this._activePanel.destroy();
        }

        if (viewInfo.modal) {
            this._activePanel = new Y.Libbit.Panel({
                srcNode      : view.get('container'),
                centered     : true,
                modal        : true,
                render       : true,
                width        : 1024,
                height       : 576,
                zIndex       : Y.all('*').size(),
                // Disable the default hide on ESC keypress, the panel needs to be dismissed by the App.
                hideOn       : []
            });
        } else {
            // Insert view into the DOM.
            viewContainer[prepend ? 'prepend' : 'append'](view.get('container'));
        }
    }
});

App.showSpinner = function () {
    Y.one('body').prepend(Y.Node.create('<div class="libbit-spinner"></div>'));
};

App.hideSpinner = function () {
    Y.all('.libbit-spinner').remove();
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').App = App;
