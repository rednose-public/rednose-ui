/*jshint boss:true, expr:true, onevar:false */

var DataSource,
    PdoSource,
    XmlSource,
    TrimSource,
    DataSourceList;

DataSourceAttribute = Y.Base.create('dataSourceAttribute', Y.Model, [], {}, {
    ATTRS: {
        source: { value: null },
        name  : { value: null }
    }
});

DataSourceAttributeCollection = Y.Base.create('dataSourceAttributeCollection', Y.Model, [], {}, {
    ATTRS: {
        source    : { value: null },
        name      : { value: null },
        attributes: { value: [] }
    }
});

DataSource = Y.Base.create('dataSource', Y.Model, [], {
    // XXX
    getAttributeList: function () {
        var list = [];

        Y.Array.each(this.get('attributes'), function (attr) {
            if (attr.type !== 'composite') {
                list.push(attr.name);
            }

            if (attr.children) {
                Y.Array.each(attr.children, function (attr) {
                    if (attr.type !== 'composite') {
                        list.push(attr.name);
                    }
                });
            }
        });

        return list;
    },

    sync: function (action, options, callback) {
        if (action === 'create') {
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
        }
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
        identifier: {
            value: null
        },

        /**
         * @type {String}
         */
        type: {
            value: 'pdo'
        },

        /**
         * @type {Object}
         */
        attributes: {
            value: {}
        }
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

TrimSource = Y.Base.create('trimSource', DataSource, [], {}, {
    ATTRS: {
        url  : { value: null },
        query: { value: null },
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

    icons: {
        'dataGen': 'icon-list-alt',
        'pdo'    : 'icon-align-justify',
        'xml'    : 'icon-file',
        'trim'   : 'icon-briefcase'
    },

    _getNodes: function (attributes) {
        var nodes = [];

        for (var i = 0, len = attributes.length; i < len; i++) {
            var attribute = attributes[i], node, icon;

            switch (attribute.type) {
                case 'composite':
                    icon = 'icon-th-list';
                    break;
                case 'button':
                    icon = 'icon-repeat';
                    break;
                default:
                    icon = 'icon-minus';
                    break;
            }

            node = {
                label: attribute.name,
                icon : icon
            };

            if (attribute.children) {
                node.children = this._getNodes(attribute.children);
            }

            nodes.push(node);
        }

        return nodes;
    },

    getTree: function () {
        var self  = this,
            items = [];

        this.each(function (model) {
            var children = self._getNodes(model.get('attributes')), node;

            node = {
                label   : model.get('identifier'),
                icon    : self.icons[model.get('type')],
                children: children
            };

            items.push(node);
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
Y.namespace('Rednose.DataSource').TrimSource          = TrimSource;
Y.namespace('Rednose.DataSource').DataSourceList      = DataSourceList;
