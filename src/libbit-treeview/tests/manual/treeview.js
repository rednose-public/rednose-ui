YUI().use('libbit-treeview',  function (Y) {

    var model = new Y.Libbit.ModelTree({
        items: [
            {label: 'Folder 1', data: new Y.Model({id: 1, name: 'Folder model 1'}), children: [
                {label: 'Item 1', data: new Y.Model({id: 1, name: 'Item model 1'})},
                {label: 'Item 2', data: new Y.Model({id: 2, name: 'Item model 2'})}
            ]},
            {label: 'Folder 2', data: new Y.Model({id: 2, name: 'Folder model 2'})}
        ]
    });

    var treeView = new Y.Libbit.TreeView({
        container: '#mytreeview',
        header   : 'TreeView',
        model    : model
    });

    treeView.render();

    Y.one('#toggleSelectable').on('click', function () {
        treeView.get('selectable') ? treeView.set('selectable', false) : treeView.set('selectable', true);
    });

});
