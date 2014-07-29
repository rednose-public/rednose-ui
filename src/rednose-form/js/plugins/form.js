/*jshint boss:true, expr:true, onevar:false */

function FormXML () {}

FormXML.prototype = {
    initializer: function () {
        var form = this.form,
            self = this;

        this._buildXML();

        form.after('change', self._afterXMLFormChange, this);
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

    _afterJSONFormChange: function () {
        this._buildJSON();

        console.log(this.json);
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

            node.toggleView();
        }
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

Y.namespace('Rednose.Plugin').Form = Y.Base.create('form', Y.Base, [FormXML, FormJSON, FormConditions], {
    initializer: function (config) {
        this.host = config.host;
        this.form = this.host.one('form');

        this.form.after('change', this._afterFormChange, this);
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
