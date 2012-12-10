YUI.add('libbit-app-base', function (Y, NAME) {

var App;

/**
Extension of the original Y.App, to provide support for modal views.
**/
App = Y.Base.create('libbit-app', Y.App, [], {

    /**
     * Stores the Panel instances to manage the active modal views.
     */
    _modalViewInfoMap: {},

    /**
     * Override the superclass method to check if this view needs to be lazyloaded first.
     */
    showView: function (view, config, options, callback) {
        var self     = this,
            args     = [ view, config, options, callback ],
            viewInfo = this.getViewInfo(view);

        if (viewInfo.lazyload) {
            // Attach to the global Y object, this needs to be set (var Y = YUI();).
            Y.use(viewInfo.lazyload, function () {
                App.superclass.showView.apply(self, args);
            });
        } else {
            App.superclass.showView.apply(self, args);
        }
    }

    /**
     * Hook into the view change, to handle modal views.
     */
    /*_afterActiveViewChange: function (e) {
        var newView      = e.newVal,
            oldView      = e.prevVal,
            // If oldView doesn't exist, always consider it to be a child
            isChild      = oldView ? this._isChildView(newView, oldView) : true,
            newViewModal = this.getViewInfo(newView).modal,
            oldViewModal = false;


        var options = e.options;
            options || (options = {});

            // If there's no oldView, modal should be false
            if (oldView) {
                oldViewModal = this.getViewInfo(oldView).modal;
            }

            // The new view is modal, and it's a child view, render a new panel
            if (newViewModal && isChild) {
            var callback = options.callback,
                isChild  = this._isChildView(newView, oldView),
                isParent = !isChild && this._isParentView(newView, oldView),
                prepend  = !!options.prepend || isParent;

                  if (newView === oldView) {
                        return callback && callback.call(this, newView);
                    }

                var viewInfo = this.getViewInfo(newView);
                newView.addTarget(this);
                viewInfo && (viewInfo.instance = newView);

                this._modalViewInfoMap[this.getViewInfo(newView).type] = new Y.Libbit.Panel({
                    srcNode      : newView.get('container'),
                    centered     : true,
                    modal        : true,
                    render       : true,
                    width        : 1024,
                    height       : 576,
                    zIndex       : Y.all('*').size(),
                    // Disable the default hide on ESC keypress, the panel needs to be dismissed by the App.
                    hideOn       : []
                });

                //detach
                if (oldView) {
                    var viewInfo = this.getViewInfo(oldView) || {};
                    //oldView.remove();

                    //oldView.destroy({remove: true});

                    // Remove from view to view-info map.
                    delete this._viewInfoMap[Y.stamp(oldView, true)];

                    // Remove from view-info instance property.
                    //if (oldView === viewInfo.instance) {
                    //    delete viewInfo.instance;
                    //}

                    oldView.removeTarget(this);
                }

            callback && callback.call(this, newView);

        // The old view was modal, and the new one is not a child, means we're going back into
        // the hierarchy. Destroy the modal view.
        } else if (oldViewModal && !isChild) {
            var callback = options.callback,
                isChild  = this._isChildView(newView, oldView),
                isParent = !isChild && this._isParentView(newView, oldView),
                prepend  = !!options.prepend || isParent;

            if (newView === oldView) {
                return callback && callback.call(this, newView);
            }

            var viewInfo = this.getViewInfo(newView);
            newView.addTarget(this);
            viewInfo && (viewInfo.instance = newView);

            //  detach
            var viewInfo = this.getViewInfo(oldView) || {};

            this._modalViewInfoMap[this.getViewInfo(oldView).type].destroy();
            oldView.destroy({remove: true});

            // Remove from view to view-info map.
            delete this._viewInfoMap[Y.stamp(oldView, true)];

            // Remove from view-info instance property.
            if (oldView === viewInfo.instance) {
                delete viewInfo.instance;
            }

            oldView.removeTarget(this);
            callback && callback.call(this, newView);
        } else {
            // No modal views involved, process as usual
            this._uiSetActiveView(newView, oldView, e.options);
        }
    }*/
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').App = App;


}, '1.0.0', {"requires": ["app-base", "handlebars-base", "libbit-panel"]});
