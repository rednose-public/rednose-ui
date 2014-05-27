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

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        this._actions = [];
        this._index   = 0;
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
     * @method execute
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
     *
     * @method undo
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
     *
     * @method redo
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
     * @method canUndo
     */
    canUndo: function () {
        return this._index > 0;
    },

    /**
     * Returns whether there's a transaction to be redone or not.
     *
     * @method canRedo
     */
    canRedo: function () {
        return (this._actions[this._index] !== null) && this._index < this._actions.length;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').UndoManager = UndoManager;
