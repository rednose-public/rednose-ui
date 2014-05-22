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
 * @param {Rednose.Button} button The button that was clicked.
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

        if (!this._published[event]) {
            this._published[event] = this.publish(event, {
                defaultFn: this._defButtonClickFn
            });
        }

        this.fire(event, {
            originEvent: e,
            button     : button
        });
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _defButtonClickFn: function (e) {
        this.fire(EVT_CLICK, {
            originEvent: e.originEvent,
            button     : e.button
        });
    }
});

Y.Rednose.Toolbar = Y.mix(Toolbar, Y.Rednose.Toolbar);


}, '1.5.0-DEV', {"requires": ["rednose-toolbar-base"]});
