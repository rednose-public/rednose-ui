YUI.add('rednose-tooltip', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Provides a tooltip manager.

@module rednose-tooltip
**/

var ATTR_STYLE_BOOTSTRAP_ZINDEX_TOOLTIP = '1030';

/**
Provides a tooltip manager.

@class FileBrowserView
@namespace Rednose
@constructor
@extends Bootstrap.Tooltip
**/
var Tooltip = Y.Base.create('tooltip', Y.Bootstrap.Tooltip, [], {
    // -- Lifecycle methods ----------------------------------------------------

    /**
    @method initializer
    @protected
    **/
    initializer: function () {
        // Correct the z-index because the superclass set's it to 0.
        // Value is taken from Bootstrap's '@zindexTooltip' variable.
        this.set('zIndex', ATTR_STYLE_BOOTSTRAP_ZINDEX_TOOLTIP);
    },

    /**
    Patches the superclass method to get the correct target.

    @method _showFn
    @protected
    **/
    _showFn : function(e) {
        var target = e.currentTarget,
            delay  = this.get('delay'),
            title  = target.getAttribute('title');

        if (!title) {
            title = target.getAttribute('data-original-title');
        } else {
            target.removeAttribute('title');
            target.setAttribute('data-original-title', title);
        }

        this.set('title', title);
        this._hoverState  = 'in';
        this._showTimeout = Y.later( delay, this, this._show, { target: target } );
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Tooltip = Tooltip;


}, '1.1.0-DEV', {"group": "rednose-ui", "requires": ["gallery-bootstrap-tooltip"]});
