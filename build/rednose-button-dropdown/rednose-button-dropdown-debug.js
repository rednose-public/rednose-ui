YUI.add('rednose-button-dropdown', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

Y.namespace('Rednose.Plugin').ButtonDropdown = Y.Base.create('dropdown', Y.Rednose.Dropdown, [Y.Rednose.Plugin.Dropdown], {
    initializer: function (config) {
        config.host = config.host.get('container');
    }
}, {
    NS: 'dropdown'
});


}, '1.4.2', {"requires": ["rednose-button", "rednose-dropdown-plugin"]});
