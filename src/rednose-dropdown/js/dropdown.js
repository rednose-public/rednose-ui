var Dropdown;

/**
 * dropup
 * content:
 *     id: handle
 *     title: display name
 *     className: optional CSS class
 *     icon: css Class?
 *     disabled
 */
Dropdown = Y.Base.create('dropdown', Y.Bootstrap.Dropdown, [], {
    // -- Lifecycle methods ----------------------------------------------------

    initializer: function () {
        var node      = this._node,
            menuNode  = null,
            direction = this.config.dropup ? 'dropup' : 'dropdown';

        node.wrap('<div class="dropdown-wrapper ' + direction + '"></div>');
        node.addClass('dropdown-toggle');
        node.setAttribute('data-toggle', 'dropdown');
        this.node = node;

        menuNode = node.get('parentNode');
        menuNode.append(this._buildHTML(
            this.get('content')
        ));

        // Close the dropdown on click.
        menuNode.delegate('click', function(e) {
            e.preventDefault();

            if (e.target.hasClass('disabled') !== true) {
                if (e.target.getAttribute('data-id')) {
                    node.dropdown.fire(e.target.getAttribute('data-id'));
                }

                node.dropdown.toggle();
            } else {
                e.target.blur();
            }
        }, 'a');

        this.set('node', menuNode);
    },

    destructor: function () {
        this.get('node').replace(this.node);

        this.node.removeClass('dropdown-toggle');
        this.node.removeAttribute('data-toggle');

        delete this.node;
    },

    // -- Public methods -------------------------------------------------------

    enable: function (id) {
        // FIXME: Shouldn't we rename this to toggle?
        this.disable(id);
    },

    disable: function (id) {
        var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        if (node.ancestor('li').hasClass('disabled')) {
            node.ancestor('li').removeClass('disabled');
        } else {
            node.ancestor('li').addClass('disabled');
        }
    },

    rename: function (id, title) {
        var container = this.get('node'),
            node = container.one('[data-id=' + id + ']');

        node.setHTML(title);
    },

    // -- Protected methods ----------------------------------------------------

    _buildHTML: function(content) {
        var template = '<ul class="dropdown-menu"></ul>';
        var node = Y.Node.create(template);

        if (content === '') {
            return content;
        }

        for (var i in content) {
            var elLi = Y.Node.create('<li>');
            var elA = Y.Node.create('<a href="#">');

            if (content[i].className) {
                elLi.addClass(content[i].className);
            }

            if (content[i].title !== '-') {
                elA.set('innerHTML', content[i].title);
                elA.setAttribute('data-id', content[i].id);

                if (content[i].icon) {
                    var icon = Y.Node.create('<i></i>');

                    icon.addClass('icon icon-' + content[i].icon);

                    elA.prepend(icon);
                }

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
    }
}, {
    NS : 'dropdown',
    ATTRS : {
        content: { value: [] },
        node: { value: null }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').Dropdown = Dropdown;
