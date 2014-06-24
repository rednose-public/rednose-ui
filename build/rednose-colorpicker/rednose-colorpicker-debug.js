YUI.add('rednose-colorpicker', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

var Colorpicker = Y.Base.create('colorpicker', Y.Widget, [], {

    // -- Public Properties ----------------------------------------------------

    template:
        '<div class="input-append">' +
            '<input type="text" id="color" value="#FFFFFF" readonly="true" />' +
            '<button title="Configure table" type="button" class="btn">' +
                '<i class="icon-adjust"></i>' +
            '</button>' +
        '</div>',

    // -- Proteced Properties --------------------------------------------------

    _canvas: null,

    _imageObj: null,

    _imageData: null,

    _mouseActive: false,

    // -- Lifecycle methods ----------------------------------------------------

    initializer: function () {
        var self = this;

        this._canvas = Y.Node.create('<canvas></canvas>').getDOMNode();

        this._canvas.addEventListener('mousemove', function (e) {
            self._mouseOver(e);
        });

        this._canvas.addEventListener('mousedown', function () {
            self._mouseActive = true;
        });

        this._canvas.addEventListener('mouseup', function () {
            self._mouseActive = false;
        });

        this.after('colorChange', this._handleColorChange, this);
    },

    destructor: function () {
        this._canvas.removeEventListener('mousemove');
    },

    renderUI: function () {
        var self       = this,
            container  = this.get('contentBox'),
            colorImage = new Image();

        container.addClass('rednose-colorpicker')
        container.append(this.template);
        container.one('button').on('click', this._handleColorClicked, this);
    },

    // -- Protected methods ----------------------------------------------------

    _handleColorChange: function () {
        var color    = this.get('color'),
            hexColor = this.get('hex').toUpperCase(),
            input    = this.get('contentBox').one('#color');

        input.set('value', hexColor);
        input.setStyle('backgroundColor', hexColor);

        contrast = 1 - ( 0.299 * color.red + 0.587 * color.green + 0.114 * color.blue) / 255;
console.log(contrast);
        if (contrast < 0.5) {
            input.setStyle('color', 'black');
        } else {
            input.setStyle('color', 'white');
        }
    },

    _handleColorClicked: function (e) {
        var container = this.get('contentBox'),
            button    = e.currentTarget,
            overlay   = new Y.Node.create('<div class="dropdown-menu"></div>');

        this._renderCanvas();

        overlay.append(this._canvas);

        overlay.setStyle('display', 'block');
        overlay.setStyle('left', container.getX());
        overlay.setStyle('top', button.getY() + parseInt(button.getComputedStyle('height')));

        overlay.on('clickoutside', function (e) {
            // Prevent close on open
            if (e.target !== button) {
                overlay.remove();
            }
        });

        container.append(overlay);
    },

    _mouseOver: function (e) {
        if (this._mouseActive === true) {
            var rect = this._canvas.getBoundingClientRect(),
                x    = e.clientX - rect.left,
                y    = e.clientY - rect.top;

            this.set('color', this._getColor(x, y));
        }
    },

    _getColor: function (x, y) {
        var context = this._canvas.getContext('2d');
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
            red: red,
            green: green,
            blue: blue
        }
    },

    _renderCanvas: function() {
        var container    = this.get('contentBox'),
            bufferCanvas = Y.Node.create('<canvas class="buffer" />'),
            context      = this._canvas.getContext('2d'),
            image        = new Image();

        container.append(bufferCanvas);
        container.append(this._canvas);

        var imageUrl =
            bufferCanvas.getStyle('backgroundImage')
            .replace('url(', '').replace(/'/, '').replace(/"/g, '').replace(/[)]/g, '');

        image.onload = function () {
            context.drawImage(image, 0, 0);
        }

        image.src = imageUrl;

        this._imageObj = image;
    },

    _getHex: function() {
        var color = this.get('color');

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
                green: 0,
                red  : 0,
                blue : 0
            }
        },

        /**
         * Color value in hex
         *
         * @attribute {string}
         */
        hex: {
            value: null,
            getter: '_getHex'
        }
    }
});

Y.namespace('Rednose').Colorpicker = Colorpicker;


}, '1.5.0-DEV', {"requires": ["base", "event", "node", "widget"]});
