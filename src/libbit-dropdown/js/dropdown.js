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
        menuNode.append(this._buildHTML(
            this.get('content')
        ));

        // Close the dropdown on click.
        menuNode.delegate('click', function(e) {
            e.preventDefault();

            if (e.target.getAttribute('data-id')) {
                node.dropdown.fire(e.target.getAttribute('data-id'));
            }

            node.dropdown.toggle();
        }, 'a');

        this.set('node', menuNode);
    },

    _buildHTML: function(content) {
        var template = '<ul class="dropdown-menu"></ul>';
        var node = Y.Node.create(template);

        if (content == '') {
            return content;
        }

        for (var i in content) {
            var elLi = Y.Node.create('<li>');
            var elA = Y.Node.create('<a href="#">');

            if (content[i].title !== '-') {
                elA.set('innerHTML', content[i].title);
                elA.setAttribute('data-id', content[i].id);

                elLi.append(elA);

                if (content[i].disabled === true) {
                    elLi.addClass('disabled');
                    elA.addClass('disabled');
                }
            } else {
                elLi.addClass('divider');
            }

            node.append(elLi);
        }

        return node.get('outerHTML');
    },

    enable: function(id) {
        this.disable(id);
    },

    disable: function(id) {
        var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        if (node.ancestor('li').hasClass('disabled')) {
            node.ancestor('li').removeClass('disabled');
        } else {
            node.ancestor('li').addClass('disabled');
        }
    },

    rename: function(id, title) {
        var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        node.setHTML(title);
    }
}, {
    NS : 'dropdown',
    ATTRS : {
        content: { value: [] },
        node: { value: null }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Dropdown = Dropdown;
