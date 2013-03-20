YUI.add('libbit-model-undo', function (Y, NAME) {

var Undo;

Undo = Y.Base.create('undo', Y.Model, [], {

    _revisions: [],

    _index: 0,

    initializer: function () {
        var self = this;
        this.on('init', function () {
            self.revisions = [];
            self._index = 0;

            self.addAction();
        });
    },

    addAction: function (label, action) {
        var undo = null,
            redo = null;

        undo = Y.JSON.stringify(this.toJSON());

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

    undo: function () {
        if (this.canUndo()) {
            this._index--;
            this.setAttrs(Y.JSON.parse(this._revisions[this._index].undo));

            return true;
        }

        return false;
    },

    redo: function () {
        if (this.canRedo()) {
            this._index++;
            this.setAttrs(Y.JSON.parse(this._revisions[this._index - 1].redo));

            return true;
        }

        return false;
    },

    canUndo: function () {
        return this._index > 1;
    },

    canRedo: function () {
        return (this._revisions[this._index] !== null) && this._index < this._revisions.length;
    },

    getUndo: function () {
        if (this.canUndo()) {
            return this._revisions[this._index - 1].label;
        }

        return null;
    },

    getRedo: function () {
        if (this.canRedo()) {
            return this._revisions[this._index].label;
        }

        return null;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit.Model').Undo = Undo;


}, '1.0.0', {"requires": ["model"]});
