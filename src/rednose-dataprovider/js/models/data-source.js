/*jshint boss:true, expr:true, onevar:false */

var TreeModel = Y.Rednose.ModelTree,
    DataSource,
    PdoSource,
    XmlSource,
    DataSourceList;

DataSourceAttribute = Y.Base.create('dataSourceAttribute', Y.Model, [], {}, {
    ATTRS: {
        source  : { value: null },
        name    : { value: null },
    }
});

DataSource = Y.Base.create('dataSource', Y.Model, [], {
    sync: function (action, options, callback) {
        switch (action) {
            case 'create':
                Y.io(Routing.generate('rednose_dataprovider_post_data_sources'), {
                    method: 'POST',
                    data: Y.JSON.stringify(this.toJSON()),
                    on : {
                        success : function (tx, r) {
                            callback(null, r.responseText);
                        },
                        failure: function (tx, r) {
                            callback(Y.JSON.parse(r.responseText));
                        }
                    }
                });

            break;
        }
    },

    _setAttributes: function (attributes) {
        var self   = this,
            models = [];

        Y.Array.each(attributes, function (attribute) {
            models.push(new DataSourceAttribute({
                source: self,
                name  : attribute
            }));
        });

        return models;
    }
}, {
    ATTRS: {
        name      : { value: null },
        identifier: { value: null },
        type      : { value: 'pdo' },
        attributes: { value: [], setter: '_setAttributes' },
    }
});

DatagenSource = Y.Base.create('datagenSource', DataSource, [], {}, {
    ATTRS: {
        url     : { value: null },
        username: { value: null },
        password: { value: null },
        section : { value: null }
    }
});

PdoSource = Y.Base.create('pdoSource', DataSource, [], {}, {
    ATTRS: {
        dsn     : { value: null },
        username: { value: null },
        password: { value: null },
        table   : { value: null },
        query   : { value: null },
        source  : { value: 'table' }
    }
});

XmlSource = Y.Base.create('xmlSource', DataSource, [], {}, {
    ATTRS: {
        xsd : { value: null },
        xslt: { value: null },
        xml : { value: null },
        root: { value: null }
    }
});

DataSourceList = Y.Base.create('dataSourceList', Y.ModelList, [], {
    model: DataSource,

    getTree: function () {
        var items = [];

        this.each(function (model) {
            var node = {
                label   : model.get('name'),
                data    : model,
                children: []
            };

            Y.Array.each(model.get('attributes'), function (attribute) {
                node.children.push({
                    label: attribute.get('name'),
                    data : attribute
                });
            });

            items.push(node);
        });

        return new TreeModel({
            items: items,
            icons: {
                'datagenSource'      : 'icon-list-alt',
                'pdoSource'          : 'icon-align-justify',
                'xmlSource'          : 'icon-file',
                'dataSourceAttribute': 'icon-minus'
            }
        });
    },

    parse: function (response) {
        var items = [];

        Y.Array.each(Y.JSON.parse(response), function (item) {
            switch (item.type) {
                case 'dataGen':
                    items.push(new DatagenSource(item));
                    break;
                case 'pdo':
                    items.push(new PdoSource(item));
                    break;
                case 'xml':
                    items.push(new XmlSource(item));
                    break;
            }
        });

        return items;
    },

    sync: function (action, options, callback) {
        if (action === 'read') {
            Y.io(Routing.generate('rednose_dataprovider_data_sources'), {
                method: 'GET',
                on : {
                    success : function (tx, r) {
                        callback(null, r.responseText);
                    },
                    failure: function (tx, r) {
                        callback(Y.JSON.parse(r.responseText));
                    }
                }
            });
        }
    }
});

Y.namespace('Rednose.DataSource').DataSource          = DataSource;
Y.namespace('Rednose.DataSource').DataSourceAttribute = DataSourceAttribute;
Y.namespace('Rednose.DataSource').DatagenSource       = DatagenSource;
Y.namespace('Rednose.DataSource').PdoSource           = PdoSource;
Y.namespace('Rednose.DataSource').XmlSource           = XmlSource;
Y.namespace('Rednose.DataSource').DataSourceList      = DataSourceList;
