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

    _size: null,

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

        this._size          = null;
        this._rulerDDEvents = null;
        this._resizeMap     = {};
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

        this._initializeRulerStyles();
    },

    _createHandles: function () {
        this._marginLeft  = Y.Node.create('<div class="margin-left"><span style="display: none;">10mm</span></div>');
        this._marginRight = Y.Node.create('<div class="margin-right"><span style="display: none;">10mm</span></div>');
        
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

    getSizes: function () {
        var sizeType        = this.sizeType,
            marginLeftSize  = parseFloat(this._marginLeft.getComputedStyle(sizeType)),
            marginRightSize = parseFloat(this._marginRight.getComputedStyle(sizeType)),
            newRulerSize    = this._size - marginLeftSize - marginRightSize;

        return {
            'position': this._pixelMillimeter(marginLeftSize),
            'size': this._pixelMillimeter(newRulerSize)
        };
    },

    _initializeRulerStyles: function () {
        var ruler     = this.get('container').one('.inner-ruler'),
            leftSize  = this.get('leftSize') ? this.get('leftSize') : this.get('defaultOffset'),
            rightSize = this.get('rightSize') ? this.get('rightSize') : this.get('defaultOffset'),
            rulerSize = this.get('maxWidth') - leftSize - rightSize;

        this._marginLeft.setStyle(this.sizeType, leftSize + 'mm');
        this._marginRight.setStyle(this.sizeType, rightSize + 'mm');

        if (this.get('vertical')) {
            ruler.setStyles({
                'marginTop': leftSize + 'mm',
                'height': rulerSize + 'mm'
            });
        } else {
            ruler.setStyles({
                'marginLeft': leftSize + 'mm',
                'width': rulerSize + 'mm'
            });
        }

        this._size = parseFloat(ruler.getComputedStyle('width')) +
                     parseFloat(this._marginLeft.getComputedStyle('width')) + 
                     parseFloat(this._marginRight.getComputedStyle('width'));
    },

    _setRulerStyles: function (e) {
        var container       = this.get('container'),
            sizeType        = this.sizeType,
            ruler           = container.one('.inner-ruler'),
            marginLeftSize  = parseFloat(this._marginLeft.getComputedStyle(sizeType)),
            marginRightSize = parseFloat(this._marginRight.getComputedStyle(sizeType)),
            newRulerSize    = this._size - marginLeftSize - marginRightSize;

        container.one('.margin-left span').setHTML(this._getMMSize(marginLeftSize) + "MM");
        container.one('.margin-right span').setHTML(this._getMMSize(marginRightSize) + "MM");

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
            decimalPlaces: 2
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
    * @type {float} mm
    */
    defaultOffset: {
        value: 10
    },

    /**
    * @attribute leftSize
    * @type {float} mm
    */
    leftSize: {
        value: null
    },

    /**
    * @attribute rightSize
    * @type {float} mm
    */
    rightSize: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.Rednose.Ruler.DD = RulerDD;
Y.Base.mix(Y.Rednose.Ruler, [RulerDD]);
