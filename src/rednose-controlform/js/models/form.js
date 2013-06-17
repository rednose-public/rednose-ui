var Form;

Form = Y.Base.create('form', Y.Model, [], {

    removeFieldGroup: function(fgId) {
        for (var i in this.get('fieldGroups')) {
            if (this.get('fieldGroups')[i]['id'] == fgId) {
                var fieldGroups = this.get('fieldGroups');

                fieldGroups.splice(i, 1);

                this.set('fieldGroups', fieldGroups);
            }
        }
    },

    getFieldGroup: function(fgId) {
        for (var i in this.get('fieldGroups')) {
            if (this.get('fieldGroups')[i]['id'] == fgId) {
                return this.get('fieldGroups')[i];
            }
        }

        return false;
    }

}, {
    ATTRS: {
        caption: { value: '' },
        fieldGroups: { value: [] }
    }
});

Y.namespace('ControlForm').Form = Form;
