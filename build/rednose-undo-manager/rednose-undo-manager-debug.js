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
     * @param {Object} action
     * @chainable
     */
    execute: function (action) {
        if (this._index < this._actions.length) {
            this._actions.splice(this._index, this._actions.length - this._index);
        }

        this._actions.push(action);

        this._index = this._actions.length;

        action.execute();

        this.fire(EVT_MUTATE, {
            manager: this
        });

        return this;
    },

    /**
     * Executes the previous action.
     */
    undo: function () {
        if (!this.canUndo()) {
            return;
        }

        this._index--;
        this._actions[this._index].undo();

        this.fire(EVT_MUTATE, {
            manager: this
        });
    },

    /**
     * Executes the next action.
     */
    redo: function () {
        if (!this.canRedo()) {
            return;
        }

        this._index++;

        var action = this._actions[this._index - 1];

        action[typeof action.redo === 'function' ? 'redo' : 'execute']();

        this.fire(EVT_MUTATE, {
            manager: this
        });
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
    },

    /**
     * Mark the current stack position as saved.
     */
    save: function () {
        this._savedIndex = this._index;

        this.fire(EVT_MUTATE, {
            manager: this
        });
    },

    /**
     * Returns whether the object in it's current state is modified or not.
     *
     * @return {Boolean}
     */
    isDirty: function () {
        return this._savedIndex !== this._index;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').UndoManager = UndoManager;


}, '1.5.0-DEV', {"requires": ["base"]});
