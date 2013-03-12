YUI.add('libbit-dd', function (Y, NAME) {

var DD;

DD = Y.Base.create('dd', Y.View, [], {

    initializer: function() {
        var container = this.get('container'),
            drop;

        container.addClass('libbit-global-drop');

        // Global drop object.
        drop = new Y.DD.Drop({
            node   : container,
            groups: ['docgenadmin-templatebuilder'],
            bubbleTargets: this
        });

        // Bind the global drop object.
        drop.on('drop:enter', this._dropEnterGlobal, this);
        // drop.on('drop:over', this._handleScroll, this);
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


}, '1.0.0', {"requires": ["view"]});
