YUI.add('rednose-model-undo', function (Y, NAME) {

/**
 * Extension for Model, allows moving forward or backward to a model's snapshot list.
 *
 * @module rednose-app
 * @submodule rednose-model-undo
 */
var Undo;

/**
 * Extension for Model, allows moving forward or backward to a model's snapshot list.
 *
 * @class Undo
 * @namespace Rednose.Model
 * @constructor
 * @extensionfor Model
 */
Undo = Y.Base.create('undo', Y.Model, [], {
    // -- Protected Properties -------------------------------------------------

    /**
     * Stores the model revisions as JSON snapshots.
     *
     * @property _revisions
     * @type Array
     * @protected
     */
    _revisions: [],

    /**
     * The current snapshot index.
     *
     * @property _index
     * @type Integer
     * @protected
     */
    _index: 0,

    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function () {
        var self = this;

        this.on('init', function () {
            self._revisions = [];
            self._index = 0;

            self.addAction();
        });
    },

    destructor: function () {
        this._revisions = null;
    },

    // -- Public Methods -------------------------------------------------------

    /**
     * Push a snapshot of a model transaction onto the stack.
     *
     * @method addAction
     * @param {String} label The label for the undo action.
     * @param {Function} action The model transaction to snapshot.
     */
    addAction: function (label, action) {
        var undo = Y.JSON.stringify(this.toJSON()),
            redo;

        // Allow the label to be omitted.
        if (typeof label === 'function') {
            action = label;
        }

        if (typeof action === 'function') {
            action();
            redo = Y.JSON.stringify(this.toJSON());
        }

        if (this._index < this._revisions.length) {
            this._revisions.splice(this._index, this._revisions.length - this._index);
        }

        this._revisions.push({
            label: label,
            undo: undo,
            redo: redo
        });

        this._index = this._revisions.length;

        this.fire('change');
    },

    /**
     * Reverts the model state to a previous snapshot.
     *
     * @method undo
     */
    undo: function () {
        if (!this.canUndo()) {
            return;
        }

        this._index--;
        this.setAttrs(Y.JSON.parse(this._revisions[this._index].undo));
    },

    /**
     * Reverts the model state to a next snapshot.
     *
     * @method redo
     */
    redo: function () {
        if (!this.canRedo()) {
            return;
        }

        this._index++;
        this.setAttrs(Y.JSON.parse(this._revisions[this._index - 1].redo));
    },

    /**
     * Returns whether there's a transaction to be undone or not.
     *
     * @method canUndo
     */
    canUndo: function () {
        return this._index > 1;
    },

    /**
     * Returns whether there's a transaction to be redone or not.
     *
     * @method canRedo
     */
    canRedo: function () {
        return (this._revisions[this._index] !== null) && this._index < this._revisions.length;
    },

    /**
     * Returns the label of the queued `undo` transaction.
     *
     * @method getUndo
     */
    getUndo: function () {
        if (this.canUndo()) {
            return this._revisions[this._index - 1].label;
        }

        return null;
    },

    /**
     * Returns the label of the queued `redo` transaction.
     *
     * @method getUndo
     */
    getRedo: function () {
        if (this.canRedo()) {
            return this._revisions[this._index].label;
        }

        return null;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Model').Undo = Undo;


}, '1.5.0-DEV', {"requires": ["model"]});
