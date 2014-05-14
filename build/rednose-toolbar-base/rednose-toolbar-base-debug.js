YUI.add('rednose-toolbar-base', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides Rednose.Toolbar.Base
 *
 * @module rednose-toolbar
 * @submodule rednose-toolbar-base
 */

/**
 * Basic toolbar functionality.
 *
 * @class Rednose.Toolbar.Base
 * @constructor
 * @param {Object} [config] Config object.
 *     @param {Object[]} [config.groups] Array of group config objects.
 *     @param {Object[]} [config.buttons] Array of button config objects.
 * @extends Base
 */

var ButtonGroup = Y.Rednose.ButtonGroup;

/**
 * Fired when a new group is added to the toolbar.
 *
 * @event add
 * @param {Object} group Group config object
 * @preventable _defAddFn
 */
var EVT_ADD = 'add';

/**
 * Fired when a group is removed from the the toolbar.
 *
 * @event remove
 * @param {Number} index Index position
 * @preventable _defRemoveFn
 */
var EVT_REMOVE = 'remove';

var ToolbarBase = Y.Base.create('toolbarBase', Y.Base, [], {

    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the groups within this toolbar based on index.
     *
     * @property {Rednose.ButtonGroup[]} _buttonGroupMap
     * @protected
     */

    /**
     * Hash of published custom events.
     *
     * @property {Object} _published
     * @protected
     */

    // -- Life Cycle Methods ---------------------------------------------------

    initializer: function (config) {
        config || (config = {});

        this._buttonGroupMap = [];
        this._published      = {};

        if (config.groups) {
            for (var i = 0, len = config.groups.length; i < len; i++) {
                this.add(config.groups[i]);
            }
        }
    },

    destructor: function () {
        for (var i = 0, len = this._buttonGroupMap.length; i < len; i++) {
            this._buttonGroupMap[i].destroy();
        }

        this._buttonGroupMap = null;
        this._published      = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Adds a button group to the toolbar.
     *
     * @param {Object} group
     * @chainable
     */
    add: function (group) {
        return this._fireToolbarEvent(EVT_ADD, {group: group}, {
            defaultFn: this._defAddFn
        });
    },

    /**
     * Removes a button group from the toolbar.
     *
     * @param {Number} index
     * @chainable
     */
    remove: function (index) {
        return this._fireToolbarEvent(EVT_REMOVE, {index: index}, {
            defaultFn: this._defRemoveFn
        });
    },


    /**
     * Returns a button group by index.
     *
     * @param index
     * @return {Rednose.ButtonGroup}
     */
    getButtonGroup: function (index) {
        return this._buttonGroupMap[index];
    },

    /**
     * Returns a button by ID.
     *
     * @param id
     * @return {Rednose.ButtonGroup}
     */
    getButtonById: function (id) {
        for (var i = 0, len = this._buttonGroupMap.length; i < len; i++) {
            var group = this._buttonGroupMap[i];

            if (group.getButtonById(id)) {
                return group.getButtonById(id);
            }
        }

        return null;
    },

    // -- Button Wrapper Methods -----------------------------------------------

    /**
     * @param {String} id
     * @chainable
     */
    enable: function (id) {
        var button = this.getButtonById(id);

        if (button) {
            button.enable();
        }
         return this;
    },

    /**
     * @param {String} id
     * @chainable
     */
    disable: function (id) {
        var button = this.getButtonById(id);

        if (button) {
            button.disable();
        }

        return this;
    },

    /**
     * @param {String} id
     * @chainable
     */
    activate: function (id) {
        var button = this.getButtonById(id);

        if (button) {
            button.activate();
        }

        return this;
    },

    /**
     * @param {String} id
     * @chainable
     */
    deactivate: function (id) {
        var button = this.getButtonById(id);

        if (button) {
            button.deactivate();
        }

        return this;
    },

    /**
     * @param {String} id
     * @chainable
     */
    toggleActive: function (id) {
        var button = this.getButtonById(id);

        if (button) {
            button.toggleActive();
        }

        return this;
    },

    /**
     * @param {String} id
     * @param {String} value
     * @chainable
     */
    rename: function (id, value) {
        var button = this.getButtonById(id);

        if (button) {
            button.rename(value);
        }

        return this;
    },

    // -- Protected Event Handlers ---------------------------------------------

    /**
     * @param {Object} config
     * @return {Rednose.ButtonGroup}
     * @private
     */
    _createButtonGroup: function (config) {
        var group = new ButtonGroup(config);

        this._buttonGroupMap.push(group);

        return group;
    },

    /**
     * @param {Rednose.ButtonGroup} group
     * @private
     */
    _destroyButtonGroup: function (group) {
        var index = this._buttonGroupMap.indexOf(group);

        group.destroy();

        delete this._buttonGroupMap[index];
    },

    /**
     * Utility method for lazily publishing events,
     *
     * @param {String} name
     * @param {Object} facade
     * @param {Object} options
     * @chainable
     * @private
     */
    _fireToolbarEvent: function (name, facade, options) {
        if (options && options.defaultFn && !this._published[name]) {
            this._published[name] = this.publish(name, {
                defaultFn: options.defaultFn
            });
        }

        this.fire(name, facade);

        return this;
    },

    // -- Default Event Handlers -----------------------------------------------

    /**
     * @param {EventFacade} e
     * @private
     */
    _defAddFn: function (e) {
        this._createButtonGroup(e.group);
    },

    /**
     * @param {EventFacade} e
     * @private
     */
    _defRemoveFn: function (e) {
        var group = this._buttonGroupMap[e.index];

        this._destroyButtonGroup(group);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Toolbar').Base = ToolbarBase;


}, '1.4.2', {"requires": ["rednose-button-group", "base"]});
