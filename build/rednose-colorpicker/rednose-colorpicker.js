YUI.add('rednose-colorpicker', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Fired when the color value is updated
 *
 * @event close
 * @param {EventFacade} originEvent Original click event.
 */
var EVT_UPDATE = 'update';

/**
 * Colorpicker in form-control style
 *
 * @class Colorpicker
 * @namespace Rednose
 * @constructor
 */
var Colorpicker = Y.Base.create('colorpicker', Y.Widget, [], {

    // -- Public Properties ----------------------------------------------------

    template:
        '<div class="input-group">' +
            '<input class="form-control" type="text" placeholder="Transparant" id="color" value="#FFFFFF" />' +
            '<div class="input-group-btn">' +
                '<button title="Configure table" type="button" class="btn btn-default">' +
                    '<i class="glyphicon glyphicon-adjust"></i>' +
                '</button>' +
            '</div>' +
        '</div>',

    overlayTemplate:
        '<div class="dropdown-menu">' +
            '<div id="canvas"></div>' +
            '<div class="color-values">' +
                'R: <input id="r" />, ' +
                'G: <input id="g" />, ' +
                'B: <input id="b" />' +
            '</div>' +
        '</div>',

    // -- Proteced Properties --------------------------------------------------

    _canvas: null,

    _overlay: null,

    _imageObj: null,

    _imageData: null,

    _mouseActive: false,

    _picker: null,

    // -- Lifecycle methods ----------------------------------------------------

    initializer: function () {
        var self = this;

        this._canvas = Y.Node.create('<canvas class="rednose-colorpicker-canvas" height="256" width="256"></canvas>').getDOMNode();
        this._picker = Y.Node.create('<i class="rednose-colorpicker-pointer"><i>');

        this._canvas.addEventListener('mousemove', function (e) {
            self._mouseOver(e);
        });

        this._canvas.addEventListener('mousedown', function (e) {
            self._mouseActive = true;
            self._mouseOver(e);
        });

        this._picker.getDOMNode().addEventListener('mousedown', function () {
            self._mouseActive = true;

        });

        this._canvas.addEventListener('mouseup', function () {
            self._mouseActive = false;
        });

        this._picker.getDOMNode().addEventListener('mouseup', function () {
            self._mouseActive = false;
        });

        this.after('colorChange', this._handleColorChange, this);
    },

    destructor: function () {
        this._picker.getDOMNode().removeEventListener('mousemove');
        this._canvas.removeEventListener('mousemove');

        this._overlay.destroy();
        this._overlay.remove();
    },

    renderUI: function () {
        var container  = this.get('contentBox');

        container.addClass('rednose-colorpicker');
        container.append(this.template);

        // Bind widget events
        container.one('input#color').on(['change', 'keyup'], this._handleColorInputChanged, this);
        container.one('input#color').on('blur', this._handleColorChange, this);
        container.one('button').on('click', this._handleColorClicked, this);
    },

    // -- Protected methods ----------------------------------------------------

    _handleColorChange: function () {
        var color    = this.get('color'),
            hexColor = this.get('hex').toUpperCase(),
            input    = this.get('contentBox').one('#color');

        if (color === null) {
            input.set('value', '');
            input.setStyle('backgroundColor', '#FFFFFF');
            input.setStyle('color', 'black');

            return;
        }

        input.set('value', hexColor);
        input.setStyle('backgroundColor', hexColor);

        var contrast = 1 - (0.299 * color.red + 0.587 * color.green + 0.114 * color.blue) / 255;

        if (contrast < 0.5) {
            input.setStyle('color', 'black');
        } else {
            input.setStyle('color', 'white');
        }

        if (this._overlay) {
            var rValue   = this._overlay.one('.color-values > input#r'),
                gValue   = this._overlay.one('.color-values > input#g'),
                bValue   = this._overlay.one('.color-values > input#b');

            rValue.set('value', color.red);
            gValue.set('value', color.green);
            bValue.set('value', color.blue);
        }
    },

    _handleColorClicked: function (e) {
        var self      = this,
            container = this.get('contentBox'),
            button    = e.currentTarget,
            overlay   = null;

        if (this._overlay === null)  {
            overlay = new Y.Node.create(this.overlayTemplate);

            this._renderCanvas();

            overlay.one('div#canvas').append(this._canvas);
            overlay.one('div#canvas').append(this._picker);

            overlay.on('clickoutside', function (e) {
                // Prevent close on open
                if (e.target !== button && overlay.getStyle('display') === 'block') {
                    overlay.hide();

                    self.fire(EVT_UPDATE);
                }
            });

            overlay.all('input').on(['keyup', 'change'], self._onColorValueChange, self);

            Y.one('body').append(overlay);

            this._overlay = overlay;
        } else {
            overlay = this._overlay;
        }

        overlay.setStyle('display', 'block');
        overlay.setStyle('left', container.getX());
        overlay.setStyle('top', button.getY() + parseInt(button.getComputedStyle('height'), 10));
    },

    _handleColorInputChanged: function (e) {
        var hexValue = e.currentTarget.get('value');

        if (hexValue === '') {
            this.set('color', null);

            this.fire(EVT_UPDATE);
        }

        if (hexValue.match(/^#([0-9a-f]{6})$/i)) {
            this.set('hex', hexValue.toUpperCase());

            this.fire(EVT_UPDATE);
        }
    },

    _onColorValueChange: function () {
        var rValue   = this._overlay.one('.color-values > input#r'),
            gValue   = this._overlay.one('.color-values > input#g'),
            bValue   = this._overlay.one('.color-values > input#b');

        var color = {};

        color.red = parseInt(rValue.get('value'), 10) || 0;
        color.green = parseInt(gValue.get('value'), 10) || 0;
        color.blue = parseInt(bValue.get('value'), 10) || 0;

        this._picker.setStyle('display', 'none');

        this.set('color', color);
    },

    _mouseOver: function (e) {
        if (this._mouseActive === true) {
            var rect = this._canvas.getBoundingClientRect(),
                x    = Math.round(e.clientX - rect.left),
                y    = Math.round(e.clientY - rect.top);

            this._setPicker(e.clientX - 3, e.clientY - 3);
            this.set('color', this._getColor(x, y));
        }
    },

    _getColor: function (x, y) {
        var context = this._canvas.getContext('2d'),
            imgObj  = this._imageObj;

        if (this._imageData === null) {
            this._imageData = context.getImageData(
                0, 0,
                imgObj.height, imgObj.width
            );
        }

        var data  = this._imageData.data,
            red   = data[((imgObj.width * y) + x) * 4],
            green = data[((imgObj.width * y) + x) * 4 + 1],
            blue  = data[((imgObj.width * y) + x) * 4 + 2];

        return {
            red   : red,
            green : green,
            blue  : blue
        };
    },

    _renderCanvas: function() {
        var self         = this,
            container    = this.get('contentBox'),
            bufferCanvas = Y.Node.create('<canvas height="0" width="0" class="buffer" />'),
            context      = this._canvas.getContext('2d'),
            image        = new Image();

        if (container.one('canvas.buffer') === null) {
            container.append(bufferCanvas);
        }

        container.append(this._canvas);

        var imageUrl =
            bufferCanvas.getStyle('backgroundImage')
            .replace('url(', '').replace(/'/, '').replace(/"/g, '').replace(/[)]/g, '');

        image.onload = function () {
            context.drawImage(image, 0, 0);

            self._imageObj = image;
        };

        image.src = imageUrl;
    },

    _setPicker: function (x, y) {
        this._picker.setStyle('display', 'block');
        this._picker.setX(x);
        this._picker.setY(y);
    },

    _setHex: function (hex) {
        var hexParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        if (hexParts !== null) {
            this.set('color', {
                red   : parseInt(hexParts[1], 16),
                green : parseInt(hexParts[2], 16),
                blue  : parseInt(hexParts[3], 16)
            });

            this._picker.setStyle('display', 'none');
        }

        return null;
    },

    _getHex: function () {
        var color = this.get('color'),
            rgb   = [];

        if (color === null) {
            return '';
        }

        rgb = [
            color.red.toString(),
            color.green.toString(),
            color.blue.toString()
        ];

        var hex =
            "#" +
            ("0" + parseInt(rgb[0], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2);

        return hex;
    }
}, {
    ATTRS: {
        /**
         * Color object
         *
         * @attribute {Object} {red, green, blue}
         */
        color: {
            value: {
                green: 255,
                red  : 255,
                blue : 255
            }
        },

        /**
         * Color value in hex
         *
         * @attribute {string}
         */
        hex: {
            value: null,
            getter: '_getHex',
            setter: '_setHex'
        }
    }
});

Y.namespace('Rednose').Colorpicker = Colorpicker;


}, '1.7.0', {"requires": ["base", "event", "node", "widget"]});
