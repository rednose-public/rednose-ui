/*jshint boss:true, expr:true, onevar:false */

var Dropdown = Y.Base.create('dropdown', Y.Base, [], {
    OPTION_TEMPLATE: '<option id="{id}">{value}</option>',

    initializer: function (config) {
        this.host        = config.host;
        this.datasource  = config.datasource;
        this.parent      = config.parent;
        this.parentField = config.parentField;
        this.map         = config.map;

        var self = this;

        console.log(self.map);

        if (config.load === true) {
            var parameters = null;

            this.datasource.query(parameters).then(function (data) {
                console.log(data);
            });
        }

        // this._dataMap = {};

        // var node = this.get('inputNode');

        // node.on('change', this._onNodeChange, this);
        // this.host.append('<option>Test!</option>');

        // this.host.after('change', function (e) { console.log(e); });
    },

    // render: function () {
    //     var self       = this,
    //         node       = this.get('inputNode'),
    //         dataSource = this.get('datasource');

    //     Y.io(Routing.generate('rednose_dataprovider_data_list') + '?id=' + dataSource.id, {
    //         method: 'GET',
    //         on: {
    //             success : function (tx, r) {
    //                 self._updateSelectNode(node, Y.JSON.parse(r.responseText).results);
    //             }
    //         }
    //     });
    // },

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
    NS: 'dropdown'
});

Y.namespace('Rednose.Plugin.Form').Dropdown = Dropdown;
