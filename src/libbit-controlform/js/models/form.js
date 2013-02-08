var Form;

Form = Y.Base.create('form', Y.Model, [], {

}, {
    ATTRS: {
        caption: { value: '' },
        fieldGroups: { value: [] }
    }
});

Y.namespace('ControlForm').Form = Form;
