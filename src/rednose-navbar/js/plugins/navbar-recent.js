// WIP

Y.namespace('Rednose.Navbar').Recent = Y.Base.create('recentNavbarPlugin', Y.Plugin.Base, [], {
    // -- Lifecycle Methods ----------------------------------------------------

    initializer: function (config) {
        this._host = config.host;

        var node = this._host.getNode(config.node);
        this.node = node;
        var parent = node.get('parentNode');

        parent.addClass('dropdown-submenu');
        parent.append(Y.Node.create('<ul class="dropdown-menu"></ul>'));

        this._updateMenuEntries(node);
    },

    // -- Public Methods -------------------------------------------------------

    // TODO: Unique cookie.
    // TODO: Specify the number of items as config param.
    addEntry: function (id, label) {
        var cookie   = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),
            attrs    = { id: id, label: label },
            obj      = Y.JSON.parse(cookie) || [];

        // Remove duplicate elements.
        Y.each(obj, function (el, key) {
            if (el.id === attrs.id) {
                obj.splice(key, 1);
            }
        });

        // Prepend.
        obj.unshift(attrs);

        // Keep the size.
        if (obj.length > 5) {
            obj.pop();
        }

        // JSON encode the cookie data.
        cookie = Y.JSON.stringify(obj);

        // Set the sub-cookie.
        Y.Cookie.setSub('docgenadmin', 'templatebuilder', cookie);

        this._updateMenuEntries(this.node);
    },

    _updateMenuEntries: function (node) {
        var self   = this,
            cookie = Y.Cookie.getSub('docgenadmin', 'templatebuilder'),
            ul     = node.ancestor('li').one('ul'),
            obj;

        ul.empty();

        if (cookie) {
            obj = Y.JSON.parse(cookie);

            Y.each(obj, function (item) {
                var li = Y.Node.create('<li><a tabindex="-1" href="#"></a></li>');

                li.one('a').setContent(item.label);
                ul.append(li);

                li.one('a').on('click', function () {
                    self._host.fire(self.node.getAttribute('data-id'), { id: item.id });
                });
            });

            if (obj) {
                ul.append(Y.Node.create('<li class="divider"></li>'));
            }

            var clear = Y.Node.create('<li><a class="menu-clearitems" tabindex="-1" href="#">' + Y.Intl.get('docgenadmin-core').clearitems + '</a></li>');

            if (!Y.Object.size(obj)) {
                clear.addClass('disabled');
            }

            ul.append(clear);

            ul.one('.menu-clearitems').on('click', function (e) {
                // Disable the default URL behaviour.
                e.preventDefault();

                var target = e.currentTarget;

                // Ignore clicking on a disabled node.
                if (target.ancestor('li').hasClass('disabled')) {
                    node.blur();

                    return;
                }

                // Reset cookie and update.
                Y.Cookie.setSub('docgenadmin', 'templatebuilder', null);
                self._updateMenuEntries(node);
            });
        }
    }
}, {
    NS: 'recent'
});
