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

    _size: null,

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this._resizeMap = [];

        this._rulerDDEvents = [
            Y.Do.after(this._afterRender, this, '_renderRuler', this),
            this.on({
                'resize:start': this._resizeStart,
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

    // -- Protected Event Handlers ---------------------------------------------

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

        resize.plug(Y.Plugin.ResizeConstrained);

        resize.addTarget(this);

        this._resizeMap.push(resize);
    },

    getSizes: function () {
        var sizeType        = this.sizeType,
            marginLeftSize  = parseFloat(this._marginLeft.getComputedStyle(sizeType)),
            marginRightSize = parseFloat(this._marginRight.getComputedStyle(sizeType));

        if (this._size === null) {
            this._resizeStart();
        }

        var newRulerSize = this._size - marginLeftSize - marginRightSize;

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
    },

    _resizeStart: function (e) {
        var ruler    = this.get('container').one('.inner-ruler'),
            sizeType = this.sizeType,
            node     = null;

        if (e) {
            node = e.target.get('node');

            // Apply rules to the resizeConstrained plugin
            // e.target     = Y.Resize
            // e.target.con = Y.Resize.ResizeConstrained
            if (this.get('vertical') === false) {
                var maxWidth = 0;

                if (node.hasClass('margin-left')) {
                    var rightNode = node.get('parentNode').one('.margin-right');

                    maxWidth = (-(node.getX() - rightNode.getX())) - 2;
                } else {
                    var innerNode = node.get('parentNode').one('.inner-ruler');

                    maxWidth = parseFloat(innerNode.get('clientWidth')) + parseFloat(node.get('clientWidth')) - 2;
                }

                e.target.con.set('maxWidth', maxWidth);
            } else {
                var maxHeight = 0;

                if (node.hasClass('margin-left')) {
                    var rightNode = node.get('parentNode').one('.margin-right');

                    maxHeight = (-(node.getY() - rightNode.getY())) - 2;
                } else {
                    var innerNode = node.get('parentNode').one('.inner-ruler');

                    maxHeight = parseFloat(innerNode.get('clientHeight')) + parseFloat(node.get('clientHeight')) - 2;
                }

                e.target.con.set('maxHeight', maxHeight);
            }
        }

        this._size = parseFloat(ruler.getComputedStyle(sizeType)) +
        parseFloat(this._marginLeft.getComputedStyle(sizeType)) +
        parseFloat(this._marginRight.getComputedStyle(sizeType));
    },

    _setRulerStyles: function () {
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
