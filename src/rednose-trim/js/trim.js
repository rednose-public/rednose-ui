/*jshint boss:true, expr:true, onevar:false */

var Trim = Y.Base.create('trim', Y.Base, [], {

    templates: {
        payload:
            '<?xml version="1.0" encoding="UTF-8"?>' +
            '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">' +
                '<soap:Body>{body}</soap:Body>' +
            '</soap:Envelope>',

        recordSearch:
            '<Execute xmlns="http://www.towersoft.com/schema/webservice/trim2/">' +
                '<req>' +
                    '<HideVersionNumbers>true</HideVersionNumbers>' +
                    '<ProvideTimingResults>false</ProvideTimingResults>' +
                    '<ForceRealTimeCacheUpdate>false</ForceRealTimeCacheUpdate>' +
                    '<RecordSearch>' +
                        '<IsForUpdate>false</IsForUpdate>' +
                        '<Limit>0</Limit>' +
                        '<Sort1>None</Sort1>' +
                        '<Sort1Descending>false</Sort1Descending>' +
                        '<Sort2>None</Sort2>' +
                        '<Sort2Descending>false</Sort2Descending>' +
                        '<Sort3>None</Sort3>' +
                        '<Sort3Descending>false</Sort3Descending>' +
                        '<FilterFinalizedState>Both</FilterFinalizedState>' +
                        '<Type>All</Type>' +
                        '<RecordStringSearchClause>' +
                            '<Type>RecordNumber</Type>' +
                            '<Arg>{arg}</Arg>' +
                        '</RecordStringSearchClause>' +
                        '<RecordStringSearchClause>' +
                            '<Type>AnyWord</Type>' +
                            '<Arg>{arg}</Arg>' +
                        '</RecordStringSearchClause>' +
                        '<RecordOrSearchClause/>' +
                    '</RecordSearch>' +
                    '<Fetch>' +
                        '<TargetForUpdate>false</TargetForUpdate>' +
                        '<Items>' +
                            '<SpecificationProperty>' +
                                '<Name>recNumber</Name>' +
                            '</SpecificationProperty>' +
                            '<SpecificationProperty>' +
                                '<Name>recTypedTitle</Name>' +
                            '</SpecificationProperty>' +
                        '</Items>' +
                        '<Limit>0</Limit>' +
                        '<Populate>0</Populate>' +
                        '<HideVersion>false</HideVersion>' +
                    '</Fetch>' +
                '</req>' +
            '</Execute>'
    },

    query: function (arg) {
        var templates = this.templates,
            body      = Y.Lang.sub(templates.recordSearch, {arg: arg}),
            payload   = Y.Lang.sub(templates.payload, {body: body}),
            self      = this;

        return Y.Promise(function (resolve) {
            self._invoke(payload).then(function (document) {
                var objects     = document.getElementsByTagName('TrimObject'),
                    trimObjects = [];

                Y.Array.each(objects, function (object) {
                    var trimObject = {};

                    Y.Array.each(object.childNodes[1].childNodes, function (child) {
                        if (child.nodeName === 'Value') {
                            trimObject[child.getAttribute('Name')] = child.getAttribute('Val');
                        }
                    });

                    trimObjects.push(trimObject);
                });

                resolve(trimObjects);
            });
        });
    },

    _invoke: function (payload) {
        var url = this.get('url');

        return Y.Promise(function (resolve) {
            Y.io(url, {
                method: 'POST',
                data: payload,
                on: {
                    success: function (tx, r) {
                        resolve(Y.XML.parse(r.responseText));
                    }
                }
            });
        });
    }
}, {
    ATTRS: {
        url: {
            value: null
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Trim = Trim;

var Form = Y.Base.create('form', Y.View, [], {
    initializer: function () {
        var container = this.get('container'),
            form      = container.one('form'),
            self      = this;

        this.model = {
            sources: {
                'Demo': {
                    records: []
                },

                'Trim': {
                    records: []
                }
            },
            data: {
                'Demo': null,
                'Trim': null
            }
        };

        form.after('change', this._afterFormChange, this);

        this.datasource = new Y.Rednose.Trim({
            url: 'http://trim-dummy.dev/app_dev.php/trimws/trim.asmx'
        });

        // container.all('[data-type=dropdown]').each(function (node) {
        //     console.log(node);
        // });

        var model = this.model;

        this.datagen = new Y.Rednose.Datagen({
            url: 'http://admin:adminpasswd@datagen-standard.dev/app_dev.php',
            section: 'Demo section'
        });

        // Bind buttons.
        container.one('#rednose_form_GegevensGeadresseerde_Sender_Address_Button').on('click', function () {
            self.datagen.query('test').then(function (data) {
                self.updateSource('Demo', data);
            });
        });

        container.one('#rednose_form_TRIM_Trim_Button').on('click', function () {
            self.datasource.query('test').then(function (data) {
                self.updateSource('Trim', data);
            });
        });
    },

    updateSource: function (name, data) {
        var container = this.get('container'),
            model     = this.model,
            self      = this;

        model.sources[name].records = {};

        Y.Array.each(data, function (record) {
            model.sources[name].records[Y.stamp(record)] = record;
        });

        // Update controls for this datasource.
        container.all('[data-datasource]').each(function (node) {
            var source = Y.JSON.parse(node.getData('datasource'));

            if (source.id === name) {
                self._updateSelectNode(node, model.sources[name].records, source.map);
            }
        });
    },

    _afterFormChange: function (e) {
        var node  = e.target,
            model = this.model,
            type  = node.getData('type'),
            value = node.get('type') === 'checkbox' ? node.get('checked').toString() : node.get('value');

        var source = Y.JSON.parse(node.getData('datasource'));

        // Update the record entry for this datasource.
        if (source) {
            if (type === 'dropdown') {
                var selected = node.get('options').item(node.get('selectedIndex')),
                    record   = model.sources[source.id].records[selected.getData('record')];

                // Reset the record entry.
                model.data[source.id] = record;

                // TODO: Update bound controls.
                console.log(model.data);
            }
        }

        console.log(value);
    },

    _updateSelectNode: function (node, data, map) {
        var self = this;

        node.empty();

        Y.Object.each(data, function (record) {
            var value = self._getValueByPath(record, map.value),
                text  = self._getValueByPath(record, map.text);

            node.append(Y.Lang.sub('<option value="{value}" data-record="{record}">{text}</option>', {
                value : value,
                text  : text,
                record: Y.stamp(record),
            }));
        });
    },

    _getValueByPath: function (object, path) {
        var parts = path.split('.');

        for (var i = 0, len = parts.length; i < len; i++) {
            if (typeof object === 'object' && parts[i] in object) {
                object = object[parts[i]];
            } else {
                object = undefined;
                break;
            }
        }

        return object;
    },

    _setValueByPath: function (object, path, value) {
    }
}, {
    ATTRS: {
    }
});

Y.namespace('Rednose').Form = Form;
