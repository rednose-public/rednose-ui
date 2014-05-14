YUI.add('rednose-tooltip', function (Y, NAME) {

/*jshint expr:true, onevar:false */

/**
Provides a tooltip manager.

@module rednose-tooltip
**/

/**
Provides a tooltip manager.

@class Tooltip
@namespace Rednose
@constructor
@extends Bootstrap.Tooltip
**/
var Tooltip = Y.Base.create('tooltip', Y.Base, [], {

    // -- Public properties ----------------------------------------------------

    template:
        '<div class="tooltip fade">' +
            '<div class="tooltip-arrow"></div>' +
            '<div class="tooltip-inner">###</div>' +
        '</div>',

    // -- Lifecycle methods ----------------------------------------------------

    /**
    @method initializer
    @protected
    **/
    initializer: function () {
        var self    = this,
            context = this.get('selectorContainer');

        if (!context) {
            context = document.body;
        }

        Y.delegate(
            ['mouseover', 'mouseout'],
            this._handleEvent, context,
            this.get('selector'),
            this
        );
    },

    // -- Protected methods ----------------------------------------------------

    _handleEvent: function (e) {
        var target    = e.currentTarget,
            eventType = e.type;

        if (target.getData('tooltipElement') === undefined) {
            this._addTooltip(target);
        }

        if (eventType === 'mouseover') {
            this._showTooltip(target);
        } else {
            this._hideTooltip(target);
        }
    },

    _showTooltip: function (node) {
        var tooltip           = node.getData('tooltipElement'),
            tooltipDimensions = {},
            nodeDimensions    = this._getDimensions(node);

        Y.one('body').append(tooltip);

        tooltipDimensions = this._getDimensions(tooltip);

        switch (this.get('placement').toLowerCase()) {
            case 'top':
                tooltip.setStyle('left', nodeDimensions.X + (nodeDimensions.W / 2) - (tooltipDimensions.W / 2));
                tooltip.setStyle('top', nodeDimensions.Y - tooltipDimensions.H);
                break;

            case 'left':
                tooltip.setStyle('left', nodeDimensions.X - tooltipDimensions.W);
                tooltip.setStyle('top', nodeDimensions.Y - (nodeDimensions.H / 2));
                break;

            case 'right':
                tooltip.setStyle('left', nodeDimensions.X + nodeDimensions.W);
                tooltip.setStyle('top', nodeDimensions.Y - (nodeDimensions.H / 2));
                break;

            case 'bottom':
                tooltip.setStyle('left', nodeDimensions.X + (nodeDimensions.W / 2) - (tooltipDimensions.W / 2));
                tooltip.setStyle('top', nodeDimensions.Y + nodeDimensions.H);
                break;
        }

        this._fade(node, true);
    },

    _hideTooltip: function (node) {
        this._fade(node, false);
    },

    _fade: function (node, fadeIn) {
        var tooltip = node.getData('tooltipElement');

        if (fadeIn) {
            var anim = new Y.Anim({
                duration: 0.2,
                node : tooltip,
                from : { opacity: 0 },
                to   : { opacity: 1 }
            });
        } else {
            var anim = new Y.Anim({
                duration: 0.2,
                node : tooltip,
                from : { opacity: 1 },
                to   : { opacity: 0 }
            });

            anim.on('end', function () {
                tooltip.remove();
            });
        }

        anim.run();
    },

    _addTooltip: function (node) {
        var tooltip = Y.Node.create(this.template);

        tooltip.addClass(this.get('placement'));
        tooltip.setStyle('position', 'absolute');
        tooltip.setStyle('left', '0');
        tooltip.setStyle('top', '0');

        if (node.hasAttribute('title')) {
            tooltip.one('.tooltip-inner').setContent(
                node.getAttribute('title')
            );
        }

        node.setData('tooltipElement', tooltip);
    },

    _getDimensions: function (node) {
        return {
            X : node.getX(),
            Y : node.getY(),
            H : node.get('offsetHeight'),
            W : node.get('offsetWidth')
        }
    }

}, {
    ATTRS: {
        /**
        The container context to use as the selectors scope.
        If none is set, use the entire document.

        @attribute selectorContainer
        @default null
        @type node | null
        **/
        selectorContainer  : { value : null },

        /**
        Selector to listen to. Defaults to false, and attaches no
        delegation events. Set to a valid selector and any event will
        fire it.

        @attribute selector
        @default false
        @type String | boolean
        **/
        selector  : { value : false },

        /**
        Where to place the tooltip. Valid values are top, bottom, left or right.

        @attribute placement
        @default top
        @type String
        **/
        placement : { value : 'top' }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Tooltip = Tooltip;


}, '1.4.2', {"requires": ["node", "anim"]});
