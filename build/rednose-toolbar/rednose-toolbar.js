YUI.add('rednose-toolbar', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the Y.Rednose.Toolbar widget.
 *
 * @module rednose-toolbar
 * @main rednose-toolbar
 */

/**
 * Toolbar widget.
 *
 * @class Rednose.Toolbar
 * @constructor
 * @param {Object} [config] Config object.
 *     @param {Object[]} [config.groups] Array of group config objects.
 * @extends Rednose.Toolbar.Base
 * @uses View
 */

/**
 * Fired when a button in the toolbar is clicked.
 *
 * You can subscribe to specific buttons through the following event: "click#id".
 *
 * @event click
 * @param {Rednose.Button} item The button that was clicked.
 * @param {EventFacade} originEvent Original button event.
 */
var EVT_CLICK = 'click';

var Toolbar = Y.Base.create('toolbar', Y.Rednose.Toolbar.Base, [Y.View], {

    /**
     * CSS class names used by this toolbar.
     *
     * @property {Object} classNames
     */
    classNames: {
        toolbar: 'btn-toolbar'
    },

//    /**
//     Stores references to the created nodes.
//
//     @property _buttonMap
//     @type Object
//     @protected
//     **/
//    _buttonMap: {},
//
//    _evtPrefix: null,

    /**
     * Hash of toolbar events.
     *
     * @property {Object} _toolbarEvents
     * @protected
     */

    /**
     * Whether or not this toolbar has been rendered.
     *
     * @property {Boolean} rendered
     * @default false
     */
    rendered: false,

    // -- Life Cycle Methods  --------------------------------------------------

    initializer: function () {
        this._attachToolbarEvents();
    },

    destructor: function () {
        this._detachToolbarEvents();
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * @chainable
     */
    render: function () {
        var container  = this.get('container'),
            classNames = this.classNames;

        container.addClass(classNames.toolbar);

        for (var i = 0, len = this._buttonGroupMap.length; i < len; i++) {
            var group = this._buttonGroupMap[i];

            container.append(group.render().get('container'));
        }

        this.rendered = true;

        return this;
    },

    /**
     Get a button node by name.

     @method getButton
     @param {String} name The name of the button.
     **/
//    getButton: function (name) {
//        if (!this._buttonMap) {
//            return false;
//        }
//
//        if (!this._buttonMap[name]) {
//            return false;
//        }
//
//        return this._buttonMap[name];
//    },

    /**
     * @param {String} id Menu entry id
     */
//    enable: function (id) {
//        this.disable(id, true);
//    },

    /**
     * @param {String} id Menu entry id
     * @param {Boolean} _enable Toggle the enabled state
     */
//    disable: function (id, _enable) {
//        var container = this.get('container'),
//            node      = container.one('[data-id=' + id + ']');
//
//        if (_enable) {
//            node.removeClass('disabled');
//        } else {
//            node.addClass('disabled');
//        }
//    },

    /**
     * @param {String} id Menu entry id
     */
//    reset: function (id) {
//        var container = this.get('container'),
//            node      = container.one('[data-id=' + id + ']');
//
//        node.hasClass(CSS_BOOTSTRAP_ACTIVE) && node.removeClass(CSS_BOOTSTRAP_ACTIVE);
//    },
//
    // -- Protected methods ----------------------------------------------------

    /**
     * @private
     */
    _attachToolbarEvents: function () {
        this._toolbarEvents || (this._toolbarEvents = []);

        this._toolbarEvents.push(
            this.after({
                open : this._afterAdd,
                close: this._afterRemove,

                'button:click': this._afterButtonClick
            })
        );
    },

    /**
     * @private
     */
    _detachToolbarEvents: function () {
        (new Y.EventHandle(this._toolbarEvents)).detach();
    },

//    /**
//     Setter to update the buttons properties.
//
//     @method _setButtons
//     @param {Object} value The button config object
//     @protected
//     **/
//    _setButtons: function (value) {
//        var self    = this,
//            footer  = this.get('container').one('.' + CSS_YUI3_WIDGET_FT),
//            buttons = this.buttons;
//
//        Y.Object.each(value, function (properties, key) {
//            self.buttons[key] = Y.merge(buttons[key], properties);
//        });
//
//        // TODO: Update instead of rerendering.
//        this._buildFooter();
//
//        this._rendered && footer.one('div').replace(this._footer);
//    },
//
//    /**
//     Getter to get the current button properties.
//
//     @method _getButtons
//     @protected
//     **/
//    _getButtons: function () {
//        return this.buttons;
//    }

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterAdd: function (e) {
        if (!this.rendered) {
            return;
        }

        console.log(e.group);
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterRemove: function (e) {
        if (!this.rendered) {
            return;
        }

        console.log(e.index);
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _afterButtonClick: function (e) {
        var button = e.button,
            event  = EVT_CLICK + '#' + button.id;

        this.fire(EVT_CLICK, {
            originEvent: e,
            button     : button
        });

        this.fire(event, {
            originEvent: e,
            button     : button
        });
    }
});

Y.Rednose.Toolbar = Y.mix(Toolbar, Y.Rednose.Toolbar);


}, '1.4.2', {"requires": ["rednose-toolbar-base"]});
