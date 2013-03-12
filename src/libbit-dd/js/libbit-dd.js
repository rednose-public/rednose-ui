var DD;

DD = Y.Base.create('dd', Y.View, [], {

    initializer: function() {
    },

    /**
     * Create a new drag instance from a DOM node.
     */
    createDrag: function (node, groups) {
        var dd = new Y.DD.Drag({
            node         : node,
            groups: groups,
            bubbleTargets: this,
            target       : true
        });

        dd.plug(Y.Plugin.DDProxy, {
            moveOnEnd  : false,
            borderStyle: 'none'
        });

        return dd;
    },

    /**
     * Create a new drop instance from a DOM node.
     */
    createDrop: function (node, groups) {
        var dd = new Y.DD.Drop({
            node        : node,
            //padding     : '20 0',
            groups: groups,
            bubbleTargets: this
        });

        return dd;
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').DD = DD;
