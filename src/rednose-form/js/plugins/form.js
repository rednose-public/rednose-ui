/*jshint boss:true, expr:true, onevar:false */

function FormXML () {}

FormXML.prototype = {
    initializer: function () {
        var form = this.form,
            self = this;

        this._buildXML();

        form.after('change', self._afterXMLFormChange, this);
    },

    getXpathValue: function (query) {
        var result = this.xml.evaluate(query, this.xml, null, XPathResult.ANY_TYPE, null);

        if (result.resultType === 2) {
            return result.stringValue;
        }

        if (result.resultType === 4) {
            return result.iterateNext().textContent;
        }

        return null;
    },

    setXpathValue: function (query, value) {
        var result = this.xml.evaluate(query, this.xml, null, XPathResult.ANY_TYPE, null);

        if (result.resultType === 4) {
            result.iterateNext().textContent = value;
        }
    },

    _buildXML: function () {
        this.xml = Y.XML.parse('<form/>');

        var form = this.form,
            xml  = this.xml,
            self = this;

      form.all('[data-section]').each(function (sectionNode) {
            var sectionName    = sectionNode.getData('section'),
                sectionElement = xml.createElement(sectionName);

            sectionNode.all('[data-name]').each(function (controlNode) {
                var controlName    = controlNode.getData('name'),
                    controlElement = xml.createElement(controlName),
                    value          = self.getNodeValue(controlNode);

                controlElement.appendChild(xml.createTextNode(value));
                sectionElement.appendChild(controlElement);
            });

            xml.documentElement.appendChild(sectionElement);
        });
    },

    _afterXMLFormChange: function () {
        this._buildXML();
    }
};

function FormJSON () {}

FormJSON.prototype = {
    initializer: function () {
        var form = this.form,
            self = this;

        this._buildJSON();

        form.after('change', self._afterJSONFormChange, this);
    },

    _buildJSON: function () {
        this.json = {};

        var form = this.form,
            json = this.json,
            self = this;

      form.all('[data-section]').each(function (sectionNode) {
            var sectionName = sectionNode.getData('section');

            json[sectionName] = {};

            sectionNode.all('[data-name]').each(function (controlNode) {
                var controlName = controlNode.getData('name'),
                    value       = self.getNodeValue(controlNode);

                json[sectionName][controlName] = value;
            });
        });
    },

    _getRootByPath: function (object, path) {
        return path.split('.')[0];
    },

    _getValueByPath: function (object, path) {
        var parts = path.split('.');

        for (var i = 0, len = parts.length; i < len; i++) {
            if (Y.Lang.isObject(object) && parts[i] in object) {
                object = object[parts[i]];
            } else {
                object = undefined;
                break;
            }
        }

        return object;
    },

    _setValueByPath: function (object, path, value) {
        var parts = path.split('.');

        for (var i = 0, len = parts.length; i < len; i++) {
            if (i === len - 1) {
                object[parts[i]] = value;

                break;
            }

            object[parts[i]] || (object[parts[i]] = {});

            object = object[parts[i]];
        }
    },

    _afterJSONFormChange: function () {
        this._buildJSON();
    }
};

function FormConditions () {}

FormConditions.prototype = {
    initializer: function () {
        this.config || (this.config = {});

        var form = this.form,
            self = this;

        form.after('change', self._afterConditionsFormChange, this);

        form.all('[data-conditions]').each(function (node) {
            var config = Y.JSON.parse(node.getData('conditions'));

            self.config[node.get('id')] = config;
        });
    },

    _handleCondition: function (id, config) {
        if (config.hasOwnProperty('visible')) {
            var condition = config.visible,
                node      = this.form.one('#' + id);
                value     = this._compare(this.getXpathValue(condition.a), this.getXpathValue(condition.b), condition.operator);

            this.setNodeVisible(node, value);
        }
    },

    _compare: function (a, b, operator) {
        switch (operator) {
            case '==':
                return (a === b);

            case '!=':
                return (a !== b);
        }

        return null;
    },

    _afterConditionsFormChange: function () {
        var config = this.config;

        for (var id in config) {
            if (config.hasOwnProperty(id)) {
                var conditions = config[id];

                this._handleCondition(id, conditions);
            }
        }
    }
};

function FormDataSources () {}

FormDataSources.prototype = {
    initializer: function () {
        this.scope || (this.scope = {});
        this.dataSources = {};

        var self = this;

        this._loadDataSources().then(function (sources) {
            self._initDataSources(sources);
            self._bindDataSources();
        });
    },

    _setRecord: function (name, object) {
        var self = this;

        // Update the current record.
        this.scope[name] = object;

        this.form.all('[data-bindings]').each(function (node) {
            var bindings = Y.JSON.parse(node.getData('bindings'));

            // Update all controls bound to this record.
            Y.Array.each(bindings, function (binding) {
                if (self._getRootByPath(self.scope, binding) === name) {
                    self.setNodeValue(node, self._getValueByPath(self.scope, binding) || null);
                }
            });

            // TODO: Sync form back to model.
        });
    },

    _loadDataSources: function () {
        return Y.Promise(function (resolve) {
            Y.io(Routing.generate('rednose_dataprovider_data_sources'), {
                method: 'GET',
                on: {
                    success: function (tx, r) {
                        resolve(Y.JSON.parse(r.responseText));
                    }
                }
            });
        });
    },

    _initDataSources: function (sources) {
        var self = this;

        Y.Array.each(sources, function (source) {
            switch (source.type) {
                case 'dataGen':
                    self.dataSources[source.name] = new Y.Rednose.Datagen(source);
                    break;
                case 'trim':
                    self.dataSources[source.name] = new Y.Rednose.Trim(source);
                    break;
            }
        });
    },

    _bindDataSources: function () {
        var sources = this.dataSources,
            self    = this;

        // this.form.all('[data-type=dropdown]').each(function (node) {
        //     if (node.getData('datasource')) {
        //         var config     = Y.JSON.parse(node.getData('datasource')),
        //             datasource = sources[config.id];

        //         if (datasource) {
        //             node.plug(Y.Rednose.Plugin.Form.Dropdown, {
        //                 datasource: datasource,
        //                 map       : config.map,
        //                 parent    : config.parent,
        //                 required  : node.getData('required')
        //             });

        //             node.dropdown.after('select', function (e) {
        //                 self._setRecord(config.id, e.raw);
        //             });
        //         }
        //     }
        // });

        this.form.all('[data-type=autocomplete]').each(function (node) {
            var id         = node.getData('source'),
                map        = Y.JSON.parse(node.getData('map')),
                datasource = sources[id];

            var template = Y.Template.Micro.compile(
                '<a role="menuitem">' +
                    '<% if (data.image) { %>' +
                        '<img class="avatar size32" src="<%= data.image %>">' +
                    '<% } %>' +
                    '<span class="title-block">' +
                        '<span class="title"><%== data.title %></span>' +
                    '</span>' +
                    '<span class="subtitle"><%= data.subtitle %></span>' +
                '</a>'
            );

            Y.Plugin.AutoComplete.CSS_PREFIX = 'rednose-autocomplete';

            node.plug(Y.Plugin.AutoComplete, {
                resultTextLocator: function (result) {
                    return result[map.value];
                },

                resultFormatter: function (query, results) {
                    return Y.Array.map(results, function (result) {
                        return template({
                            title   : Y.Highlight.all(result.raw[map.title], query),
                            subtitle: result.raw[map.subtitle],
                            image   : result.raw[map.image]
                        });
                    });
                },

                source: function (query, callback) {
                    datasource.query({query: query}).then(function (data) {
                        callback(data);
                    });
                }
            });

            node.ac.after('select', function (e) {
                self._setRecord(id, e.result.raw);
            });
        });
    }
};

var Form = Y.Base.create('form', Y.Base, [FormXML, FormJSON, FormConditions, FormDataSources], {
    initializer: function (config) {
        this.form  = config.host;
        this.model = config.model;

        this.form.after('change', this._afterFormChange, this);

        // Initialize widgets.
        this.form.all('[data-type=datetime]').each(function (node) {
            node.one('input').plug(Y.Rednose.Plugin.Datepicker);
        });
    },

    getNodeVisible: function (node) {
        return !node.ancestor('.control-group').getAttribute('hidden');
    },

    setNodeVisible: function (node, value) {
        node.ancestor('.control-group')[value ? 'show' : 'hide']();
    },

    getNodeValue: function (node) {
        var type = node.getData('type');

        var value = (type === 'checkbox') ? node.get('checked').toString() : node.get('value');

        return value;
    },

    setNodeValue: function (node, value) {
        var type = node.getData('type');

        if (type === 'image') {
            node.get('parentNode').one('img').setAttribute('src', value);
        }

        if (value === this.getNodeValue(node)) {
            return;
        }

        node.set('value', value);
    },

    _afterFormChange: function (e) {
        // console.log(e);
    }
}, {
    NS: 'form'
});

Y.namespace('Rednose.Plugin').Form = Y.mix(Form, Y.Rednose.Plugin.Form);
