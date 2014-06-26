YUI.add('rednose-ruler-dd', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the Y.Rednose.Navbar.Keys extension.
 *
 * @module rednose-navbar
 * @submodule rednose-navbar-keys
 */

/**
 * @class Rednose.Navbar.Keys
 * @constructor
 * @extensionfor Rednose.Navbar
 */

function RulerDD() {}

RulerDD.prototype = {
    /**
     * @property {Object} _resizeMap
     * @protected
     */
    _resizeMap: [],

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this._rulerDDEvents = [
            Y.Do.after(this._afterRender, this, 'render', this),
            this.on({
                'drag:drag': this._setRulerStyles,
                'drag:mouseDown': this._showSizes,
                'drag:end': this._showSizes
            }, this)
        ];

        this._createHandles();
    },

    destructor: function () {
        (new Y.EventHandle(this._rulerDDEvents)).detach();

        Y.Object.each(this._resizeMap, function (resize) {
            resize.destroy({ remove:true });
        });

        this._resizeMap = {};

        this._rulerDDEvents   = null;
    },

    // -- Protected Methods ----------------------------------------------------

    /**
    * @param {Item} Rednose.Dropdown.Item
    * @param {EventFacade} originEvent
    */
    _handleItemEvent: function () {
    },

    // -- Protected Event Handlers ---------------------------------------------

    _onKeydown: function (e) {

    },

    _afterRender: function () {
        var container   = this.get('container');

        container.prepend(this._marginLeft);
        container.append(this._marginRight);

        this._setRulerStyles();
    },

    _createHandles: function () {
        this._marginLeft  = Y.Node.create('<div class="margin-left"><span style="display: none;">10mm</span></div>');
        this._marginRight = Y.Node.create('<div class="margin-right"><span style="display: none;">10mm</span></div>');

        if (this.get('leftSize')) {
            this._marginLeft.setStyle(this.sizeType, this.get('leftSize'));
        } else {
            this._marginLeft.setStyle(this.sizeType, this.get('defaultOffset'));
        }

        if (this.get('rightSize')) {
            this._marginRight.setStyle(this.sizeType, this.get('rightSize'));
        } else {
            this._marginRight.setStyle(this.sizeType, this.get('defaultOffset'));
        }
        
        if (this.get('vertical')) {
            this._createResize(this._marginLeft, 'b');
            this._createResize(this._marginRight, 't');
        } else {
            this._createResize(this._marginLeft, 'r');
            this._createResize(this._marginRight, 'l');
        }
    },

    _createResize: function (node, handle) {
        var resize = new Y.Resize({
            node: node,
            handles: handle
        }); 

        resize.addTarget(this);

        this._resizeMap.push(resize);
    },

    _setRulerStyles: function (e) {
        var container       = this.get('container'),
            sizeType        = this.sizeType,
            ruler           = container.one('.inner-ruler'),
            marginLeftSize  = parseFloat(this._marginLeft.getComputedStyle(sizeType)),
            marginRightSize = parseFloat(this._marginRight.getComputedStyle(sizeType)),
            newRulerSize    = this.get('size') - marginLeftSize - marginRightSize;

        if (isNaN(newRulerSize)) {
            newRulerSize = this.get('size') - (this.get('defaultOffset') * 2);
            marginLeftSize = this.get('defaultOffset');
        }

        container.one('.margin-left span').setHTML(this._getMMSize(marginLeftSize));
        container.one('.margin-right span').setHTML(this._getMMSize(marginRightSize));

        if (this.get('vertical')) {
            ruler.setStyles({
                'marginTop': marginLeftSize,
                'height': newRulerSize
            });
        } else {
            ruler.setStyles({
                'marginLeft': marginLeftSize,
                'width': newRulerSize
            });
        }
    },

    _getMMSize: function (px) {
        var number = Y.Number.format(this._pixelMillimeter(px),{
            thousandsSeparator: ".",
            decimalSeparator: ",",
            decimalPlaces: 2,
            suffix: " MM"
        });

        return  number;
    },

    _showSizes: function (e) {
        var sizes = this.get('container').all('.margin-left span, .margin-right span');

        if (e.type === 'drag:mouseDown' && e.ev.shiftKey) {
            sizes.show();
        } else {
            sizes.hide();
        }
    }
};

RulerDD.ATTRS = {
    /**
    * @attribute defaultOffset
    * @type {int}
    */
    defaultOffset: {
        value: 100
    },

    leftSize: {
        value: null
    },

    rightSize: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.Rednose.Ruler.DD = RulerDD;
Y.Base.mix(Y.Rednose.Ruler, [RulerDD]);


}, '1.5.0-DEV', {"requires": ["rednose-ruler-base", "resize", "datatype-number"]});
