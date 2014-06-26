/*jshint boss:true, expr:true, onevar:false */

var Dropdown = Y.Base.create('dropdown', Y.Base, [], {
    OPTION_TEMPLATE: '<option id="{id}">{value}</option>',

    render: function () {
        console.log(this.get('inputNode'));
    },

    _refreshSections: function () {
        // var self        = this,
        //     sectionNode = this.get('container').one('#section');

        // Y.io(Routing.generate('rednose_dataprovider_operations_list_sections'), {
        //     method: 'POST',
        //     data  : 'url=http://datagen-standard.dev&username=admin&password=adminpasswd',
        //     on    : {
        //         success : function (tx, r) {
        //             self.updateSelectNode(sectionNode, Y.JSON.parse(r.responseText));
        //         }
        //     }
        // });
    }
}, {
    ATTRS: {
        /**
         * @attribute inputNode
         * @type Node|HTMLElement|String
         * @initOnly
         */
        inputNode: {
            setter: Y.one,
            writeOnce: 'initOnly'
        }
    }
});

Y.namespace('Rednose.Form').Dropdown = Dropdown;
