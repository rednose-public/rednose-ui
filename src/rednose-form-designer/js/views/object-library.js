/*jshint boss:true, expr:true, onevar:false */

var TXT_OBJECT_LIBRARY = 'Object Library';

var EVT_SELECT = 'select';

var ObjectLibrary,
    ObjectLibraryView;

ObjectLibrary = Y.Base.create('objectLibrary', Y.Widget, [], {

    render: function (navBar, parentId) {
        var self = this,
            items = this.get('items'),
            parentNode = navBar.getNode(parentId).get('parentNode');

        navBar.createDropdown(parentNode, items);

        for (var i in items) {
            navBar.on(items[i].id, function(e) {
                self.fire('objectAdd', { item: items[i] });
            });
        }

        return this;
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

ObjectLibraryView = Y.Base.create('objectLibraryView', Y.View, [ Y.Rednose.Dialog ], {
    template:
        '<div>' +
        '   <div class="control-group">' +
        '       <label for="input" class="control-label">Provide a name:</label>' +
        '       <div class="controls">' +
        '           <input type="text" data-path="name" value="" id="name">' +
        '       </div>' +
        '   </div>' +
        '   <div class="control-group">' +
        '       <label for="input" class="control-label">Foreign id:</label>' +
        '       <div class="controls">' +
        '           <input type="text" data-path="foreignId" id="foreignId" />' +
        '       </div>' +
        '   </div>' +
        '</div>',

    render: function() {
        var self      = this,
            name      = '',
            view      = Y.Node.create(this.template),
            foreignId = view.one('#foreignId');

        view.one('input[data-path=name]').on(
            ['keyup', 'change'],
            function (e) {
                self._autoFillForeignId(e, foreignId);
            }
        );

        view.one('input[data-path=foreignId]').on(
            ['keyup', 'change'],
            function(e) {
                self._foreignIdChange(e);
            }
        );

        this.prompt({
            title: 'Add new ' + name,
            html: view
        }, function(form) {
             var control = new Y.Rednose.Form.ControlModel({
                caption: form.one('[data-path=name]').get('value'),
                foreignId: form.one('[data-path=foreignId]').get('value'),
                type: type
             });

            self.get('panel').destroy();
        });
    },

    _autoFillForeignId: function(e, foreignId) {
        var value = this._cleanString(e.target.get('value'));

        if (foreignId.hasAttribute('data-noautofill') === false) {
            foreignId.set('value', value);
        }
    },

    _foreignIdChange: function(e) {
        var value = this._cleanString(e.target.get('value'));

        e.target.set('value', value);
        e.target.setAttribute('data-noautofill', 'true');

        if (value === '') {
            e.target.removeAttribute('data-noautofill');
        }
    },

    _cleanString: function(value) {
        return value
            .replace(/ /g, '_')
            .replace(/\W/g, '_');
    }
}, {
    ATTRS: {
        item: { value: {} },
        model: { value: null }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').ObjectLibrary = ObjectLibrary;
Y.namespace('Rednose.FormDesigner').ObjectLibraryView = ObjectLibraryView;
