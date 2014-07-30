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
        this.xml = Y.XML.parse('<Rijkshuisstijl/>');

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

var Form = Y.Base.create('form', Y.Base, [FormXML, FormJSON, FormConditions], {
    initializer: function (config) {
        this.host = config.host;
        this.form = this.host.one('form');

        this.form.after('change', this._afterFormChange, this);

        this.form.all('[data-type=dropdown]').each(function (node) {
            if (node.getData('datasource')) {
                var datasource = Y.JSON.parse(node.getData('datasource')),

                    config = {
                        map     : datasource.map,
                        required: node.getData('required')
                    };

                if (datasource.id === 'Afdelingen') {
                    // node.parameters = null;

                    config.load = true;

                    config.datasource = new Y.Rednose.Datagen({
                        url    : 'http://admin:adminpasswd@datagen-standard.dev',
                        section: 'Afdelingen',

                        sort: {
                            naam: 'asc'
                        }
                    });
                }

                if (datasource.id === 'Ondertekeningen') {
                    // node.parameters = {
                    //     afdeling: 'DE BEHEERDER VAN HET NEDERLANDS LUCHTVAARTUIGREGISTER'
                    // };

                    config.datasource = new Y.Rednose.Datagen({
                        url    : 'http://admin:adminpasswd@datagen-standard.dev',
                        section: 'Ondertekeningen',

                        fields: [
                            'name',
                            'content'
                        ]
                    });
                }

                node.plug(Y.Rednose.Plugin.Form.Dropdown, config);
            }
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

        if (type === 'image') {
            return node.getAttribute('src');
        }

        var value = (type === 'checkbox') ? node.get('checked').toString() : node.get('value');

        return value;
    },

    setNodeValue: function (node, value) {
        var type = node.getData('type');

        if (type === 'image') {
            node.setAttribute('src', value);
            return;
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
