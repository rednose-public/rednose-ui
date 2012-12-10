YUI.add('libbit-model-tree-test', function (Y) {

var Assert = Y.Assert,
    suite;

// -- Suite --------------------------------------------------------------------
suite = new Y.Test.Suite('model-tree');


// -- Model ----------------------------------------------------------------
suite.add(new Y.Test.Case({
    name: 'Basic',

    setUp : function () {
        var container  = Y.one('#container'),
            items;

        this.model = new Y.Libbit.ModelTree(),

        this.category1 = new Y.Model();
        this.category2 = new Y.Model();
        this.fieldGroup1 = new Y.Model();
        this.fieldGroup2 = new Y.Model();

        items = [
             {
                 label   : "Category 1",
                 data    : this.category1,
                 children: [
                     {
                         label   : "Category 2",
                         data    : this.category2,
                         children: [
                             {
                                 label   : "Field group 2",
                                 data    : this.fieldGroup2,
                                 children: []
                             }
                         ]
                     },
                     {
                         label   : "Field group 1",
                         data    : this.fieldGroup1,
                         children: []
                     }
                 ]
             }
         ];

         this.model.set('items', items);
    },

    tearDown: function () {
        this.model.destroy();
        this.category1.destroy();
        this.category2.destroy();
        this.fieldGroup1.destroy();
        this.fieldGroup2.destroy();
        delete this.model;
        delete this.category1;
        delete this.category2;
        delete this.fieldGroup1;
        delete this.fieldGroup2;
    },

    'Smoke test': function () {
        var items = this.model.get('items');

        Assert.isObject(items);
    },

    'Labels should be set': function () {
        var items = this.model.get('items');

        Assert.areEqual(items[0].label, 'Category 1');
        Assert.areEqual(items[0].children[0].label, 'Category 2');
        Assert.areEqual(items[0].children[1].label, 'Field group 1');
        Assert.areEqual(items[0].children[0].children[0].label, 'Field group 2');
    },

    'Tree should contain models': function () {
        var items = this.model.get('items');

        Assert.areSame(items[0].data, this.category1);
        Assert.areSame(items[0].children[0].data, this.category2);
        Assert.areSame(items[0].children[1].data, this.fieldGroup1);
        Assert.areSame(items[0].children[0].children[0].data, this.fieldGroup2);
    },

    'Get by clientID should return a model or null': function () {
        var model = this.model;

        Assert.isNull(model.getByClientId('nonexistent_id'));

        Assert.areSame(model.getByClientId(this.category1.get('clientId')), this.category1);
        Assert.areSame(model.getByClientId(this.category2.get('clientId')), this.category2);
        Assert.areSame(model.getByClientId(this.fieldGroup1.get('clientId')), this.fieldGroup1);
        Assert.areSame(model.getByClientId(this.fieldGroup2.get('clientId')), this.fieldGroup2);
    }
}));

Y.Test.Runner.add(suite);

}, '@VERSION@', {
    requires: ['test', 'node-event-simulate']
});
