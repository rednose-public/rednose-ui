/*jshint boss:true, expr:true, onevar:false */

var TreeModel = Y.Rednose.ModelTree,
    ControlModel;

ControlModel = Y.Base.create('controlModel', Y.Model, [], {
    view: {},

    _getValue: function (value) {
        if (value === null) {
            return false;
        }

        return value;
    }
}, {
    ATTRS: {
        caption:    { value: null },
        type:       { value: null },
        properties: { value: {} },
        required:   { value: null },
        visible:    { value: null },
        protected:  { value: null },
        readonly:   { value: null },
        // XXX
        value   :   { value: null, getter: '_getValue' }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').ControlModel = ControlModel;

var FormModel;

FormModel = Y.Base.create('formModel', Y.Model, [], {
    getTree: function () {
        var items = {
            label   : this.get('caption'),
            data    : new Y.Model(),
            icon    : 'icon-list-alt',
            children: []
        };

        // XXX
        if (!this.get('id') && !this.get('caption')) {
            return new TreeModel();
        }

        this.get('controls').each(function (model) {
            items.children.push({
                label   : model.get('id'),
                data    : model,
                icon    : 'icon-minus'
            });
        });

        return new TreeModel({ items: items });
    },

    sync: function (action, options, callback) {
        if (action === 'read') {
            Y.io(Routing.generate('rednose_flowgen_process_form', {'id': this.get('id')}), {
                method: 'GET',
                on : {
                    success : function (tx, r) {
                        callback(null, Y.JSON.parse(r.responseText));
                    },
                    failure : function (tx, r) {
                        callback(Y.JSON.parse(r.responseText));
                    }
                }
            });
        }
    },

    _setControls: function (value) {
        var list = new Y.ModelList();

        Y.Array.each(value, function (v) {
            list.add(new Y.Rednose.Form.ControlModel(v));
        });

        return list;
    }
}, {
    ATTRS: {
        caption : { value: null },
        controls: {
            value : new Y.ModelList(),
            setter: '_setControls'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').FormModel = FormModel;
