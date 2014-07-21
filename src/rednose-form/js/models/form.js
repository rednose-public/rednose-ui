/*jshint boss:true, expr:true, onevar:false */

var ControlModel = Y.Base.create('controlModel', Y.Model, [], {
    view: {},

    _setProperties: function (value) {
        if (Array.isArray(value)) {
            return {};
        } else {
            return value;
        }
    }
}, {
    ATTRS: {
        caption   : { value: null },
        foreign_id: { value: null },
        type      : { value: null },
        properties: {
            value : {},
            setter: '_setProperties'
        },
        required  : { value: false },
        visible   : { value: true },
        protected : { value: false },
        readonly  : { value: false },
        sort_order: { value: 0 },
        help      : { value: null },

        /**
         * @type {String}
         */
        value: {
            value: null
        },

        /**
         * @type {String}
         */
        binding: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').ControlModel = ControlModel;

var SectionModel = Y.Base.create('controlModel', Y.Model, [], {
    getControl: function (foreignId) {
        var controls = this.get('controls');

        for (var i = 0, len = controls.size(); i < len; i++) {
            if (controls.item(i).get('name') === foreignId) {
                return controls.item(i);
            }
        }

        return null;
    },

    _setControls: function (value) {
        var list = new Y.ModelList();

        Y.Array.each(value, function (v) {
            if (Y.instanceOf(v, Y.Rednose.Form.ControlModel)) {
                list.add(v);
            } else if (typeof(v) === 'object') {
                list.add(new Y.Rednose.Form.ControlModel(v));
            } else {
                list.add(new Y.Rednose.Form.ControlModel(v.getAttrs()));
            }
        });

        return list;
    }
}, {
    ATTRS: {
        /**
         * @type {String}
         */
        name: {
            value: null
        },

        /**
         * @type {String}
         */
        caption: {
            value: null
        },

        /**
         * @type {Boolean}
         */
        inline: {
            value: false
        },

        /**
         * @type {ModelList}
         */
        controls: {
            value : new Y.ModelList(),
            setter: '_setControls'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').SectionModel = SectionModel;

var FormModel;

FormModel = Y.Base.create('formModel', Y.Model, [], {
    getTree: function () {
        if (!this.get('id') && !this.get('caption')) {
            return null;
        }

        var rootNode = {
            label   : this.get('name'),
            icon    : 'icon-list-alt',
            children: []
        };

        this.get('sections').each(function (section) {
            var sectionNode = {
                label   : section.get('name'),
                icon    : 'icon-align-left',
                children: []
            };

            section.get('controls').each(function (control) {
                sectionNode.children.push({
                    label: control.get('name'),
                    icon : 'icon-minus'
                });
            });

            rootNode.children.push(sectionNode);
        });

        return [rootNode];
    },

    sync: function (action, options, callback) {
        if (action === 'read') {
            Y.io(Routing.generate('rednose_framework_forms_read', {'id': this.get('id')}), {
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

    getControl: function (foreignId) {
        var sections = this.get('sections');

        for (var i = 0, len = sections.size(); i < len; i++) {
            if (sections.item(i).getControl(foreignId)) {
                return sections.item(i).getControl(foreignId);
            }
        }

        return null;
    },

    _setSections: function (value) {
        var list = new Y.ModelList({model: SectionModel});

        return list.reset(value);
    }

}, {
    ATTRS: {
        /**
         * @type {String}
         */
        name: {
            value: null
        },

        /**
         * @type {String}
         */
        caption: {
            value: null
        },

        /**
         * @type {String}
         */
        identity: {
            value: null
        },

        /**
         * @type {ModelList}
         */
        sections: {
            value : new Y.ModelList(),
            setter: '_setSections'
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Form').FormModel = FormModel;
