var Dropdown;

Dropdown = Y.Base.create('dropdown', Y.Bootstrap.Dropdown, [], {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        var node      = this._node,
            menuNode  = null,
            content   = this.config.content ? this.config.content : '',
            direction = this.config.dropup ? 'dropup' : 'dropdown';

        node.wrap('<div class="dropdown-wrapper ' + direction + '"></div>');
        node.addClass('dropdown-toggle');
        node.setAttribute('data-toggle', 'dropdown');

        menuNode = node.get('parentNode');
        menuNode.append(Y.Node.create(content));

        // Close the dropdown on click.
        menuNode.delegate('click', function(e) {
            e.preventDefault();
            node.dropdown.toggle();
        }, 'a');

        this.set('menuNode', menuNode);
    }
}, {
    NS : 'dropdown',
    ATTRS : {
        menuNode: null
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Dropdown = Dropdown;
