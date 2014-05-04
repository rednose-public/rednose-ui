/*jshint boss:true, expr:true, onevar:false */

var ButtonBase = Y.Base.create('buttonBase', Y.Base, [], {
    // -- Lifecycle methods ----------------------------------------------------

    initializer: function (config) {
        this._published = {};
    },

    destructor: function () {
        this._published = null;
    }
}, {
    ATTRS: {
        /**
         * @attribute {String} id
         * @default null
         * @initOnly
         */
        id: {
            value: null,
            writeOnce: 'initOnly'
        },

        /**
         * Button type: `button` or `link`.
         *
         * @attribute {String} type
         * @default 'button'
         * @initOnly
         */
        type: {
            value: 'button',
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {String} icon
         * @default null
         * @initOnly
         */
        icon: {
            value: null,
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {Boolean} disabled
         * @default false
         * @initOnly
         */
        disabled: {
            value: false,
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {String} value
         * @default null
         * @initOnly
         */
        value: {
            value: null,
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {String} disabled
         * @default null
         * @initOnly
         */
        title: {
            value: null,
            writeOnce: 'initOnly'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').ButtonBase = ButtonBase;
