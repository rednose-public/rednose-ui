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

    render: function () {
        var container = this.get('container'),
            model     = this.get('model'),
            self      = this;

        this._treeView = new Y.Rednose.TreeView({
            container : container,
            model     : model,
            selectable: true,
            header    : TXT_OBJECT_LIBRARY
        }).render();

        this._treeView.after('select', function (e) {
            e.node.unselect();

            var model = e.node.data;

            if (model && model instanceof Y.Model) {
                self.fire(EVT_SELECT, { model: model });
            }
        });

        return this;
    }
}, {
    ATTRS: {
        model: {
            value: new Y.Rednose.ModelTree({
                items: [
                    {
                        label   : 'Text',
                        data    : new Y.Model(),
                        icon    : 'rednose-icon-text'
                    }, {
                        label   : 'Text Area',
                        data    : new Y.Model(),
                        icon    : 'rednose-icon-textarea'
                    }, {
                        label   : 'Rich Text',
                        data    : new Y.Model(),
                        icon    : 'rednose-icon-textarea'
                    }, {
                        label   : 'Drop-down List',
                        data    : new Y.Model(),
                        icon    : 'rednose-icon-dropdown'
                    }, {
                        label   : 'Radio Button',
                        data    : new Y.Model(),
                        icon    : 'rednose-icon-radio'
                    }, {
                        label   : 'Checkbox',
                        data    : new Y.Model(),
                        icon    : 'rednose-icon-checkbox'
                    }, {
                        label   : 'Date',
                        data    : new Y.Model(),
                        icon    : 'rednose-icon-date'
                    }, {
                        label   : 'Autocomplete',
                        data    : new Y.Model(),
                        icon    : 'rednose-icon-dropdown'
                    }, {
                        label   : 'File',
                        data    : new Y.Model(),
                        icon    : 'rednose-icon-dropdown'
                    }
                ]
            })
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').ObjectLibraryView = ObjectLibraryView;
