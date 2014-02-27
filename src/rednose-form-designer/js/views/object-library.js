/*jshint boss:true, expr:true, onevar:false */

var TXT_OBJECT_LIBRARY = 'Object Library';

var EVT_SELECT = 'select';

var ObjectLibraryView;

ObjectLibraryView = Y.Base.create('objectLibraryView', Y.View, [], {

    template: '<div class="rednose-object-library></div>',

    _treeView: null,

    initializer: function () {
        var container = this.get('container'),
            template  = this.template;

        container.setHTML(template);
    },

    destructor: function () {
        this._treeView.destroy();

        this._treeView = null;
    },

    render: function (navBar, parentId) {
        var self = this,
            items = this.get('items'),
            parentNode = navBar.getNode(parentId).get('parentNode');

        navBar.createDropdown(parentNode, items);

        for (var i in items) {
            navBar.on(items[i].id, function() {
                self._handleNewObject();
            });
        }

        return this;
    },

    _handleNewObject: function() {
        alert('Clicked');
    }
}, {
    ATTRS: {
        items: {
            value:
                [{
                    id    : 'text',
                    title : 'Text',
                    icon  : 'rednose-icon-text'
                }, {
                    id    : 'textarea',
                    title : 'Text Area',
                    icon  : 'rednose-icon-textarea'
                }, {
                    id    : 'richtext',
                    title : 'Rich Text',
                    icon  : 'rednose-icon-textarea'
                }, {
                    id    : 'dropdown',
                    title : 'Drop-down List',
                    icon  : 'rednose-icon-dropdown'
                }, {
                    id    : 'radio',
                    title : 'Radio Button',
                    icon  : 'rednose-icon-radio'
                }, {
                    id    : 'checkbox',
                    title : 'Checkbox',
                    icon  : 'rednose-icon-checkbox'
                }, {
                    id    : 'date',
                    title : 'Date',
                    icon  : 'rednose-icon-date'
                }, {
                    id    : 'autocomplete',
                    title : 'Autocomplete',
                    icon  : 'rednose-icon-dropdown'
                }, {
                    id    : 'file',
                    title : 'File',
                    icon  : 'rednose-icon-dropdown'
                }]
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').ObjectLibraryView = ObjectLibraryView;
