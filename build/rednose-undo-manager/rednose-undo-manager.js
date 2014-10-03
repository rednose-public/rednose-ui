YUI.add('rednose-undo-manager', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides the `UndoManager` class.
 *
 * @module rednose-undo-manager
 */

/**
 * @class UndoManager
 * @constructor
 * @extends Base
 * @namespace Rednose
 */

/**
 * Fired when an action is executed, undone or redone.
 *
 * @event mutate
 * @param {Rednose.UndoManager} manager
 * @param {String} src
 */
var EVT_MUTATE = 'mutate';

var UndoManager = Y.Base.create('undoManager', Y.Base, [], {
    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the action stack.
     *
     * @property _actions
     * @type Array
     * @protected
     */

    /**
     * The current action index.
     *
     * @property _index
     * @type Integer
     * @protected
     */

    /**
     * The saved action index.
     *
     * @property _savedIndex
     * @type Integer
     * @protected
     */

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this._actions    = [];
        this._index      = 0;
        this._savedIndex = 0;
    },

    destructor: function () {
        for (var i = 0, len = this._actions.length; i < len; i++) {
            var action = this._actions[i];

            if (typeof action.destroy === 'function') {
                action.destroy();
            }
        }

        this._actions = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Executes an action and pushes it onto the stack.
     *
     * @param {Object} [options]
     * @param {Number} [options.index]
     *     @param {Boolean} [options.silent=false]
     * @chainable
     */
    execute: function (action, options) {
        options || (options = {});

        if (this._index < this._actions.length) {
            this._actions.splice(this._index, this._actions.length - this._index);
        }

        this._actions.push(action);

        this._index = this._actions.length;

        action.execute();

        if (!options.silent) {
            this.fire(EVT_MUTATE, {
                manager: this,
                src    : options.src || 'execute'
            });
        }

        return this;
    },

    /**
     * Executes the previous action.
     *
     * @param {Number} [options.index]
     *     @param {Boolean} [options.silent=false]
     */
    undo: function (options) {
        if (!this.canUndo()) {
            return;
        }

        options || (options = {});

        this._index--;
        this._actions[this._index].undo();

        if (!options.silent) {
            this.fire(EVT_MUTATE, {
                manager: this,
                src    : options.src || 'undo'
            });
        }
    },

    /**
     * Executes the next action.
     *
     * @param {Number} [options.index]
     *     @param {Boolean} [options.silent=false]
     */
    redo: function (options) {
        if (!this.canRedo()) {
            return;
        }

        options || (options = {});

        this._index++;

        var action = this._actions[this._index - 1];

        action[typeof action.redo === 'function' ? 'redo' : 'execute']();

        if (!options.silent) {
            this.fire(EVT_MUTATE, {
                manager: this,
                src    : options.src || 'redo'
            });
        }
    },

    /**
     * Mark the current stack position as saved.
     *
     * @param {Number} [options.index]
     *     @param {Boolean} [options.silent=false]
     */
    save: function (options) {
        options || (options = {});

        this._savedIndex = this._index;

        if (!options.silent) {
            this.fire(EVT_MUTATE, {
                manager: this,
                src    : options.src || 'save'
            });
        }
    },

    /**
     * Clears all actions and resets the index pointers.
     *
     * @param {Number} [options.index]
     *     @param {Boolean} [options.silent=false]
     */
    clear: function (options) {
        options || (options = {});

        for (var i = 0, len = this._actions.length; i < len; i++) {
            var action = this._actions[i];

            if (typeof action.destroy === 'function') {
                action.destroy();
            }
        }

        this._actions    = [];
        this._index      = 0;
        this._savedIndex = 0;

        if (!options.silent) {
            this.fire(EVT_MUTATE, {
                manager: this,
                src    : options.src || 'clear'
            });
        }
    },

    /**
     * Returns whether the object in it's current state is modified or not.
     *
     * @return {Boolean}
     */
    isDirty: function () {
        return this._savedIndex !== this._index;
    },

    /**
     * Returns whether there's a transaction to be undone or not.
     *
     * @return {Boolean}
     */
    canUndo: function () {
        return this._index > 0;
    },

    /**
     * Returns whether there's a transaction to be redone or not.
     *
     * @return {Boolean}
     */
    canRedo: function () {
        return (this._actions[this._index] !== null) && this._index < this._actions.length;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').UndoManager = UndoManager;


}, '1.6.0-dev', {"requires": ["base"]});
