/*jshint boss:true, expr:true, onevar:false */

var Micro = Y.Template.Micro;

/**
* Fired when a button is clicked.
*
* @event click
* @param {Rednose.Button} button The button that was clicked.
* @param {EventFacade} originEvent Original click event.
*/
var EVT_CLICK = 'click';

var ButtonGroup = Y.Base.create('buttonGroup', Y.Rednose.ButtonGroupBase, [Y.View], {
    classNames: {
        group   : 'btn-group',
        vertical: 'btn-group-vertical'
    },

    /**
     * @chainable
     */
    render: function () {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.addClass(classNames.group);

        if (this.get('vertical')) {
            container.addClass(classNames.vertical);
        }

        Y.Object.each(this._buttonMap, function (button) {
            container.append(button.render().get('container'));
        });

        return this;
    }
}, {
    ATTRS: {
        /**
         * If `true`, the button group will be rendered vertically.
         *
         * @attribute {Boolean} vertical
         * @default false
         * @initOnly
         */
        vertical: {
            value: false,
            writeOnce: 'initOnly'
        },

        /**
         * @attribute {Array|String} value
         * @default null
         */
        value: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').ButtonGroup = ButtonGroup;
