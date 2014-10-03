YUI.add('rednose-ruler-base', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides a ruler.
 *
 * @module rednose-navbar
 * @submodule rednose-navbar-base
 */

/**
 * Provides a ruler.
 *
 * @class NavBar.Base
 * @namespace Rednose
 * @constructor
 * @extends View
 */

var RulerBase = Y.Base.create('ruler', Y.View, [], {
    // -- Public Properties ----------------------------------------------------

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        var self      = this,
            container = this.get('container');

        this.sizeType = this.get('vertical') ? 'height' : 'width';
        this.styleType = this.get('vertical') ? 'top' : 'left';

        Y.after('windowresize', function () {
            self.render();
        });

        this._pixelMillimeter();
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @chainable
     * @public
     */
    render: function() {
        var container = this.get('container'),
            type      = this.get('vertical') ? 'rednose-vertical-ruler' : 'rednose-horizontal-ruler';

        container.addClass(type);
        container.setStyle(this.sizeType, this.get('maxWidth') + 'mm');

        this._renderRuler();

        return this;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
     * Renders the ruler.
     *
     * @protected
     */
    _renderRuler: function () {
        var container      = this.get('container'),
            innerRuler     = Y.Node.create('<div class="inner-ruler" />');

        container.setHTML(innerRuler);   

        var rulerSize      = this.get('maxWidth'),
            tickerPosition = 0,
            tickerLabel;

        innerRuler.setHTML('');

        while (tickerPosition <= rulerSize) {
            if (( tickerPosition %10 ) === 0 ) {
                tickerLabel = Y.Node.create('<div class="tickLabel"><span>' + ( this.get('centimeter') ? tickerPosition / 10 : tickerPosition ) + '</span></div>');

                tickerLabel.setStyle(this.styleType, tickerPosition + 'mm');
                innerRuler.append(tickerLabel);
            } else if (( tickerPosition %5 ) === 0 ) {
                tickerLabel = Y.Node.create('<div class="tickMajor" />');

                tickerLabel.setStyle(this.styleType, tickerPosition + 'mm');
                innerRuler.append(tickerLabel);
            } else if (( tickerPosition %1 ) === 0 ) {
                tickerLabel = Y.Node.create('<div class="tickMinor" />');

                tickerLabel.setStyle(this.styleType, tickerPosition + 'mm');
                innerRuler.append(tickerLabel);
            }

            tickerPosition = (tickerPosition + 1);
        }
    },

    /**
     * @param px
     * @return float
     * @protected
     */
    _pixelMillimeter: function (px) {
        if (!this._ratio) {
            var container = this.get('container'),
                node      = Y.Node.create('<div style="width: 1mm;" />'),
                output;

            container.append(node);

            this._ratio = parseFloat(node.getComputedStyle('width'));

            node.remove(true);
            node.destroy();
        }

        return px / this._ratio;
    }
}, {
    ATTRS: {
        /**
         * @attribute vertical
         * @type Boolean
         */
        vertical: {
            value: false
        },

        /**
         * @attribute centimeter
         * @type Boolean
         */
        centimeter: {
            value: false
        },

        /**
         * @attribute maxWidth
         * @type {int} mm
         */
        maxWidth: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Ruler').Base = RulerBase;

/**
 * @class Ruler
 * @constructor
 * @extends Rednose.Ruler.Base
 * @uses Rednose.Ruler.Keys
 * @namespace Rednose
 */
Y.Rednose.Ruler = Y.mix(Y.Base.create('ruler', RulerBase, []), Y.Rednose.Ruler, true);


}, '1.6.0-dev', {"requires": ["node", "event-resize", "view"]});
