/*jshint boss:true, expr:true, onevar:false */

var DataSource, PdoSource, XmlSource, DataSourceList;

DataSource = Y.Base.create('dataSource', Y.Model, [], {}, {
    ATTRS: {
        name      : { value: null },
        attributes: { value: [] },
    }
});

PdoSource = Y.Base.create('pdoSource', DataSource, [], {}, {
    ATTRS: {
        dsn     : { value: null },
        username: { value: null },
        password: { value: null },
        table   : { value: null }
    }
});

XmlSource = Y.Base.create('xmlSource', DataSource, [], {}, {
    ATTRS: {
        xsd     : { value: null },
        xslt    : { value: null },
        xml     : { value: null },
        root    : { value: null }
    }
});

DataSourceList = Y.Base.create('dataSourceList', Y.ModelList, [], {
    model: DataSource
});

Y.namespace('Rednose.DataSource').PdoSource      = PdoSource;
Y.namespace('Rednose.DataSource').XmlSource      = XmlSource;
Y.namespace('Rednose.DataSource').DataSourceList = DataSourceList;
