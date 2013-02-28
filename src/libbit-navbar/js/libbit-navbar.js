var Navbar;

Navbar = Y.Base.create('navbar', Y.Widget, [ ], {

    template:
    '<div class="navbar navbar-inverse">' +
    '   <div class="navbar-inner">' +
    '       <a class="brand" href="#">{{ title }}</a>' +
    '   </div>' +
    '</div>',

    renderUI: function() {
//        this.template = Y.Handlebars.compile(this.template);
console.log(Y.Handlebars);
var template = Y.Handlebars.compile('The pie of the day is {{pie}}!.');
//template({pie: 'Pecan'});
//        this.get('contentBox').setHTML(
//            this.template({ title: this.get('title') })
//        );
    }

}, {
    ATTRS: {
        title: { value: 'No title' },
        menu: { value: [] }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Navbar = Navbar;
