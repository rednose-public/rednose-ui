var Dropdown;

Dropdown = Y.Base.create('dropdown', Y.Bootstrap.Dropdown, [], {
    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function () {
        var node      = this._node,
            content   = this.config.content ? this.config.content : '',
            direction = this.config.dropup ? 'dropup' : 'dropdown';

        node.wrap('<div class="dropdown-wrapper ' + direction + '"></div>');
        node.addClass('dropdown-toggle');
        node.setAttribute('data-toggle', 'dropdown');

        node.get('parentNode').append(Y.Node.create(content));

        // Close the dropdown on click.
        node.get('parentNode').all('a').on('click', function (e) {
             e.preventDefault();
             node.dropdown.toggle();
        });
    }
}, {
    NS : 'dropdown',
    ATTRS : {}
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Dropdown = Dropdown;
