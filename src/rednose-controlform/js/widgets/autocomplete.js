/*jshint boss:true, expr:true, onevar:false */

var AutoComplete;

AutoComplete = Y.Base.create('autoComplete', Y.AutoCompleteList, [], {
    initializer: function () {
        this.get('inputNode').setAttribute('autocomplete', 'off');
    }
}, {
    CSS_PREFIX: 'rednose-autocomplete'
});

Y.namespace('Rednose').ControlFormAutoComplete = AutoComplete;
