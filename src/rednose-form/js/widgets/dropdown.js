/*jshint boss:true, expr:true, onevar:false */

var Dropdown = Y.Base.create('dropdown', Y.Base, [], {
    OPTION_TEMPLATE: '<option id="{id}">{value}</option>',

    initializer: function () {
        this._dataMap = {};

        var node = this.get('inputNode');

        node.on('change', this._onNodeChange, this);
    },

    render: function () {
        var self       = this,
            node       = this.get('inputNode'),
            dataSource = this.get('datasource');

        Y.io(Routing.generate('rednose_dataprovider_data_list') + '?id=' + dataSource.id, {
            method: 'GET',
            on: {
                success : function (tx, r) {
                    self._updateSelectNode(node, Y.JSON.parse(r.responseText).results);
                }
            }
        });
    },

    _updateSelectNode: function (node, data) {
        var self       = this,
            datasource = this.get('datasource'),
            first      = node.one('option').cloneNode(true);

        node.empty();

        if (first) {
            node.append(first);
        }

        this._dataMap = {};

        Y.Array.each(data, function (record) {
            var id    = self._getArrayValueByKey(record, datasource.map.id),
                value = self._getArrayValueByKey(record, datasource.map.value);

            self._dataMap[id] = record;

            node.append(Y.Lang.sub(self.OPTION_TEMPLATE, {
                id   : id,
                value: value
            }));
        });
    },

    _getArrayValueByKey: function (array, search) {
        for (var key in array) {
            if (array.hasOwnProperty(key)) {
                var value = array[key];

                if (key === search) {
                    return value;
                }

                if (Y.Lang.isObject(value)) {
                    var v = this._getArrayValueByKey(value, search);

                    if (v) {
                        return v;
                    }
                }
            }
        }

        return null;
    },

    _onNodeChange: function (e) {
        var id     = e.target.get('value'),
            record = this._dataMap[id];

        console.log(record || null);
    }
}, {
    ATTRS: {
        /**
         * @attribute inputNode
         * @type Node|HTMLElement|String
         * @initOnly
         */
        inputNode: {
            setter: Y.one,
            writeOnce: 'initOnly'
        },

        /**
         * @type {Object}
         */
        datasource: {
            value: null
        }
    }
});

Y.namespace('Rednose.Form').Dropdown = Dropdown;
