if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/libbit-app-base/libbit-app-base.js",
    code: []
};
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].code=["YUI.add('libbit-app-base', function (Y, NAME) {","","var App;","","/**","Extension of the original Y.App, to provide support for modal views.","**/","App = Y.Base.create('libbit-app', Y.App, [], {","","    /**","     * Stores the Panel instances to manage the active modal views.","     */","    _activePanel: null,","","    /**","     * Override the superclass method to check if this view needs to be lazyloaded first.","     */","    showView: function (view, config, options, callback) {","        var self     = this,","            viewInfo = this.getViewInfo(view);","","        if (viewInfo.modal || (this.get('activeView') && this.getViewInfo(this.get('activeView')).modal) ) {","            options = options || {};","            options.transition = false;","        }","","        if (viewInfo.lazyload) {","            self.showSpinner();","            // Attach to the global Y object, this needs to be set (var Y = YUI();).","            Y.use(viewInfo.lazyload, function () {","                self.hideSpinner();","                App.superclass.showView.apply(self, [ view, config, options, callback ]);","            });","        } else {","            App.superclass.showView.apply(self, [ view, config, options, callback ]);","        }","    },","","    /**","     * Hook into the view change, to handle modal views.","     */","    _detachView: function (view) {","        if (!view) {","            return;","        }","","        if (this.getViewInfo(this.get('activeView')).modal) {","            view.removeTarget(this);","","            return;","        }","","        var viewInfo = this.getViewInfo(view) || {};","","        if (viewInfo.preserve) {","            view.remove();","            // TODO: Detach events here for preserved Views? It is possible that","            // some event subscriptions are made on elements other than the","            // View's `container`.","        } else {","            view.destroy({remove: true});","","            // TODO: The following should probably happen automagically from","            // `destroy()` being called! Possibly `removeTarget()` as well.","","            // Remove from view to view-info map.","            delete this._viewInfoMap[Y.stamp(view, true)];","","            // Remove from view-info instance property.","            if (view === viewInfo.instance) {","                delete viewInfo.instance;","            }","        }","","        view.removeTarget(this);","    },","","    /**","     * Hook into the view change, to handle modal views.","     */","    _attachView: function (view, prepend) {","        if (!view) {","            return;","        }","","        var viewInfo      = this.getViewInfo(view),","            viewContainer = this.get('viewContainer');","","        // Bubble the view's events to this app.","        view.addTarget(this);","","        // Save the view instance in the `views` registry.","        if (viewInfo) {","            viewInfo.instance = view;","        }","","        // TODO: Attach events here for persevered Views?","        // See related TODO in `_detachView`.","","        // TODO: Actually render the view here so that it gets \"attached\" before","        // it gets rendered?","","        if (this._activePanel) {","            this._activePanel.destroy();","        }","","        if (viewInfo.modal) {","            this._activePanel = new Y.Libbit.Panel({","                srcNode      : view.get('container'),","                centered     : true,","                modal        : true,","                render       : true,","                width        : 1024,","                height       : 576,","                zIndex       : Y.all('*').size(),","                // Disable the default hide on ESC keypress, the panel needs to be dismissed by the App.","                hideOn       : []","            });","        } else {","            // Insert view into the DOM.","            viewContainer[prepend ? 'prepend' : 'append'](view.get('container'));","        }","    },","","    showSpinner: function () {","        Y.one('body').prepend(Y.Node.create('<div class=\"libbit-spinner\"></div>'));","    },","","    hideSpinner: function () {","        Y.all('.libbit-spinner').remove();","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').App = App;","","","}, '1.0.0', {\"requires\": [\"app-base\", \"handlebars-base\", \"libbit-panel\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].lines = {"1":0,"3":0,"8":0,"19":0,"22":0,"23":0,"24":0,"27":0,"28":0,"30":0,"31":0,"32":0,"35":0,"43":0,"44":0,"47":0,"48":0,"50":0,"53":0,"55":0,"56":0,"61":0,"67":0,"70":0,"71":0,"75":0,"82":0,"83":0,"86":0,"90":0,"93":0,"94":0,"103":0,"104":0,"107":0,"108":0,"121":0,"126":0,"130":0,"135":0};
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].functions = {"(anonymous 2):30":0,"showView:18":0,"_detachView:42":0,"_attachView:81":0,"showSpinner:125":0,"hideSpinner:129":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].coveredLines = 40;
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].coveredFunctions = 7;
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 1);
YUI.add('libbit-app-base', function (Y, NAME) {

_yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 3);
var App;

/**
Extension of the original Y.App, to provide support for modal views.
**/
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 8);
App = Y.Base.create('libbit-app', Y.App, [], {

    /**
     * Stores the Panel instances to manage the active modal views.
     */
    _activePanel: null,

    /**
     * Override the superclass method to check if this view needs to be lazyloaded first.
     */
    showView: function (view, config, options, callback) {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "showView", 18);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 19);
var self     = this,
            viewInfo = this.getViewInfo(view);

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 22);
if (viewInfo.modal || (this.get('activeView') && this.getViewInfo(this.get('activeView')).modal) ) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 23);
options = options || {};
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 24);
options.transition = false;
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 27);
if (viewInfo.lazyload) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 28);
self.showSpinner();
            // Attach to the global Y object, this needs to be set (var Y = YUI();).
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 30);
Y.use(viewInfo.lazyload, function () {
                _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "(anonymous 2)", 30);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 31);
self.hideSpinner();
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 32);
App.superclass.showView.apply(self, [ view, config, options, callback ]);
            });
        } else {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 35);
App.superclass.showView.apply(self, [ view, config, options, callback ]);
        }
    },

    /**
     * Hook into the view change, to handle modal views.
     */
    _detachView: function (view) {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "_detachView", 42);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 43);
if (!view) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 44);
return;
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 47);
if (this.getViewInfo(this.get('activeView')).modal) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 48);
view.removeTarget(this);

            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 50);
return;
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 53);
var viewInfo = this.getViewInfo(view) || {};

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 55);
if (viewInfo.preserve) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 56);
view.remove();
            // TODO: Detach events here for preserved Views? It is possible that
            // some event subscriptions are made on elements other than the
            // View's `container`.
        } else {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 61);
view.destroy({remove: true});

            // TODO: The following should probably happen automagically from
            // `destroy()` being called! Possibly `removeTarget()` as well.

            // Remove from view to view-info map.
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 67);
delete this._viewInfoMap[Y.stamp(view, true)];

            // Remove from view-info instance property.
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 70);
if (view === viewInfo.instance) {
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 71);
delete viewInfo.instance;
            }
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 75);
view.removeTarget(this);
    },

    /**
     * Hook into the view change, to handle modal views.
     */
    _attachView: function (view, prepend) {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "_attachView", 81);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 82);
if (!view) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 83);
return;
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 86);
var viewInfo      = this.getViewInfo(view),
            viewContainer = this.get('viewContainer');

        // Bubble the view's events to this app.
        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 90);
view.addTarget(this);

        // Save the view instance in the `views` registry.
        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 93);
if (viewInfo) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 94);
viewInfo.instance = view;
        }

        // TODO: Attach events here for persevered Views?
        // See related TODO in `_detachView`.

        // TODO: Actually render the view here so that it gets "attached" before
        // it gets rendered?

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 103);
if (this._activePanel) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 104);
this._activePanel.destroy();
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 107);
if (viewInfo.modal) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 108);
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
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 121);
viewContainer[prepend ? 'prepend' : 'append'](view.get('container'));
        }
    },

    showSpinner: function () {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "showSpinner", 125);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 126);
Y.one('body').prepend(Y.Node.create('<div class="libbit-spinner"></div>'));
    },

    hideSpinner: function () {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "hideSpinner", 129);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 130);
Y.all('.libbit-spinner').remove();
    }
});

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 135);
Y.namespace('Libbit').App = App;


}, '1.0.0', {"requires": ["app-base", "handlebars-base", "libbit-panel"], "skinnable": true});
