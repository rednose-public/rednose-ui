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
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].code=["YUI.add('libbit-app-base', function (Y, NAME) {","","var App;","","/**","Extension of the original Y.App, to provide support for modal views.","**/","App = Y.Base.create('libbit-app', Y.App, [], {","","    /**","     * Stores the Panel instances to manage the active modal views.","     */","    _activePanel: null,","","    initializer: function () {","        Y.Do.after(function () {","            if ((window.self !== window.top) && typeof (window.parent.openApp() === 'function')) {","                window.parent.openApp();","            }","        }, this, 'render', this);","    },","","    closeApp: function () {","        if ((window.self !== window.top) && typeof (window.parent.closeApp() === 'function')) {","            window.parent.closeApp();","        }","    },","","    /**","     * Override the superclass method to check if this view needs to be lazyloaded first.","     */","    showView: function (view, config, options, callback) {","        var self     = this,","            viewInfo = this.getViewInfo(view);","","        if (viewInfo.modal || (this.get('activeView') && this.getViewInfo(this.get('activeView')).modal) ) {","            options = options || {};","            options.transition = false;","        }","","        if (viewInfo.lazyload) {","            App.showSpinner();","            // Attach to the global Y object, this needs to be set (var Y = YUI();).","            Y.use(viewInfo.lazyload, function () {","                App.hideSpinner();","                App.superclass.showView.apply(self, [ view, config, options, callback ]);","            });","        } else {","            App.superclass.showView.apply(self, [ view, config, options, callback ]);","        }","    },","","    /**","     * Hook into the view change, to handle modal views.","     */","    _detachView: function (view) {","        if (!view) {","            return;","        }","","        if (this.getViewInfo(this.get('activeView')).modal) {","            view.removeTarget(this);","","            return;","        }","","        var viewInfo = this.getViewInfo(view) || {};","","        if (viewInfo.preserve) {","            view.remove();","            // TODO: Detach events here for preserved Views? It is possible that","            // some event subscriptions are made on elements other than the","            // View's `container`.","        } else {","            view.destroy({remove: true});","","            // TODO: The following should probably happen automagically from","            // `destroy()` being called! Possibly `removeTarget()` as well.","","            // Remove from view to view-info map.","            delete this._viewInfoMap[Y.stamp(view, true)];","","            // Remove from view-info instance property.","            if (view === viewInfo.instance) {","                delete viewInfo.instance;","            }","        }","","        view.removeTarget(this);","    },","","    /**","     * Hook into the view change, to handle modal views.","     */","    _attachView: function (view, prepend) {","        if (!view) {","            return;","        }","","        var viewInfo      = this.getViewInfo(view),","            viewContainer = this.get('viewContainer');","","        // Bubble the view's events to this app.","        view.addTarget(this);","","        // Save the view instance in the `views` registry.","        if (viewInfo) {","            viewInfo.instance = view;","        }","","        // TODO: Attach events here for persevered Views?","        // See related TODO in `_detachView`.","","        // TODO: Actually render the view here so that it gets \"attached\" before","        // it gets rendered?","","        if (this._activePanel) {","            this._activePanel.destroy();","        }","","        if (viewInfo.modal) {","            this._activePanel = new Y.Libbit.Panel({","                srcNode      : view.get('container'),","                centered     : true,","                modal        : true,","                render       : true,","                width        : 1024,","                height       : 576,","                zIndex       : Y.all('*').size(),","                // Disable the default hide on ESC keypress, the panel needs to be dismissed by the App.","                hideOn       : []","            });","        } else {","            // Insert view into the DOM.","            viewContainer[prepend ? 'prepend' : 'append'](view.get('container'));","        }","    }","});","","// -- Class methods ------------------------------------------------------------","App.showSpinner = function () {","    Y.one('body').prepend(Y.Node.create('<div class=\"libbit-spinner\"></div>'));","};","","App.hideSpinner = function () {","    Y.all('.libbit-spinner').remove();","};","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Libbit').App = App;","","","}, '1.0.0', {\"requires\": [\"app-base\", \"event-custom\", \"handlebars-base\", \"libbit-panel\"], \"skinnable\": true});"];
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].lines = {"1":0,"3":0,"8":0,"16":0,"17":0,"18":0,"24":0,"25":0,"33":0,"36":0,"37":0,"38":0,"41":0,"42":0,"44":0,"45":0,"46":0,"49":0,"57":0,"58":0,"61":0,"62":0,"64":0,"67":0,"69":0,"70":0,"75":0,"81":0,"84":0,"85":0,"89":0,"96":0,"97":0,"100":0,"104":0,"107":0,"108":0,"117":0,"118":0,"121":0,"122":0,"135":0,"141":0,"142":0,"145":0,"146":0,"150":0};
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].functions = {"(anonymous 2):16":0,"initializer:15":0,"closeApp:23":0,"(anonymous 3):44":0,"showView:32":0,"_detachView:56":0,"_attachView:95":0,"showSpinner:141":0,"hideSpinner:145":0,"(anonymous 1):1":0};
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].coveredLines = 47;
_yuitest_coverage["build/libbit-app-base/libbit-app-base.js"].coveredFunctions = 10;
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

    initializer: function () {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "initializer", 15);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 16);
Y.Do.after(function () {
            _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "(anonymous 2)", 16);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 17);
if ((window.self !== window.top) && typeof (window.parent.openApp() === 'function')) {
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 18);
window.parent.openApp();
            }
        }, this, 'render', this);
    },

    closeApp: function () {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "closeApp", 23);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 24);
if ((window.self !== window.top) && typeof (window.parent.closeApp() === 'function')) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 25);
window.parent.closeApp();
        }
    },

    /**
     * Override the superclass method to check if this view needs to be lazyloaded first.
     */
    showView: function (view, config, options, callback) {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "showView", 32);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 33);
var self     = this,
            viewInfo = this.getViewInfo(view);

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 36);
if (viewInfo.modal || (this.get('activeView') && this.getViewInfo(this.get('activeView')).modal) ) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 37);
options = options || {};
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 38);
options.transition = false;
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 41);
if (viewInfo.lazyload) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 42);
App.showSpinner();
            // Attach to the global Y object, this needs to be set (var Y = YUI();).
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 44);
Y.use(viewInfo.lazyload, function () {
                _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "(anonymous 3)", 44);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 45);
App.hideSpinner();
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 46);
App.superclass.showView.apply(self, [ view, config, options, callback ]);
            });
        } else {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 49);
App.superclass.showView.apply(self, [ view, config, options, callback ]);
        }
    },

    /**
     * Hook into the view change, to handle modal views.
     */
    _detachView: function (view) {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "_detachView", 56);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 57);
if (!view) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 58);
return;
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 61);
if (this.getViewInfo(this.get('activeView')).modal) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 62);
view.removeTarget(this);

            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 64);
return;
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 67);
var viewInfo = this.getViewInfo(view) || {};

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 69);
if (viewInfo.preserve) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 70);
view.remove();
            // TODO: Detach events here for preserved Views? It is possible that
            // some event subscriptions are made on elements other than the
            // View's `container`.
        } else {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 75);
view.destroy({remove: true});

            // TODO: The following should probably happen automagically from
            // `destroy()` being called! Possibly `removeTarget()` as well.

            // Remove from view to view-info map.
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 81);
delete this._viewInfoMap[Y.stamp(view, true)];

            // Remove from view-info instance property.
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 84);
if (view === viewInfo.instance) {
                _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 85);
delete viewInfo.instance;
            }
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 89);
view.removeTarget(this);
    },

    /**
     * Hook into the view change, to handle modal views.
     */
    _attachView: function (view, prepend) {
        _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "_attachView", 95);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 96);
if (!view) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 97);
return;
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 100);
var viewInfo      = this.getViewInfo(view),
            viewContainer = this.get('viewContainer');

        // Bubble the view's events to this app.
        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 104);
view.addTarget(this);

        // Save the view instance in the `views` registry.
        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 107);
if (viewInfo) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 108);
viewInfo.instance = view;
        }

        // TODO: Attach events here for persevered Views?
        // See related TODO in `_detachView`.

        // TODO: Actually render the view here so that it gets "attached" before
        // it gets rendered?

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 117);
if (this._activePanel) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 118);
this._activePanel.destroy();
        }

        _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 121);
if (viewInfo.modal) {
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 122);
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
            _yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 135);
viewContainer[prepend ? 'prepend' : 'append'](view.get('container'));
        }
    }
});

// -- Class methods ------------------------------------------------------------
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 141);
App.showSpinner = function () {
    _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "showSpinner", 141);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 142);
Y.one('body').prepend(Y.Node.create('<div class="libbit-spinner"></div>'));
};

_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 145);
App.hideSpinner = function () {
    _yuitest_coverfunc("build/libbit-app-base/libbit-app-base.js", "hideSpinner", 145);
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 146);
Y.all('.libbit-spinner').remove();
};

// -- Namespace ----------------------------------------------------------------
_yuitest_coverline("build/libbit-app-base/libbit-app-base.js", 150);
Y.namespace('Libbit').App = App;


}, '1.0.0', {"requires": ["app-base", "event-custom", "handlebars-base", "libbit-panel"], "skinnable": true});
