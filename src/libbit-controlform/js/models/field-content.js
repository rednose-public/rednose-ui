var fieldContent;

fieldContent = Y.Base.create('fieldContent', Y.Model, [], {



}, {
    ATTRS: {
        field: { value: null },
        content: { value: '' }
    }
});

Y.namespace('ControlForm').fieldContent = fieldContent;
