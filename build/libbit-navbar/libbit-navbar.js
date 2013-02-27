YUI.add('libbit-navbar', function (Y, NAME) {

var Navbar;

Navbar = Y.Base.create('navbar', Y.Widget, [ ], {

    template:
    '<div class="navbar navbar-inverse">' +
    '   <div class="navbar-inner">' +
    '       <a class="brand" href="#"></a>' +
    '   </div>' +
    '</div>',

    renderUI: function() {
        this.get('contentBox').setHTML(this.template);
    }

}, {
    ATTRS: {
        title: { value: 'No title' },
        menu: { value: [] }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Navbar = Navbar;


}, '1.0.0', {"required": []});
