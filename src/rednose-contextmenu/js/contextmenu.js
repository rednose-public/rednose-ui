/*jshint boss:true, expr:true, onevar:false */

var ContextMenu;

ContextMenu = Y.Base.create('contextMenu', Y.Plugin.Base, [], {
    /**
     * State variable, holds a possible active instance.
     */
    _contextMenu: null,

    /**
     * Optional data object, to pass with the event
     */
     data: null,

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function (config) {
        var node         = config.host,
            content      = config.content ? config.content : '',
            bubbleTarget = config.bubbleTarget;

        this._node = node;
        this._content = this._buildHTML(content);
        this.addTarget(bubbleTarget);

        if (typeof config.data !== 'undefined') {
            this.data = config.data;
        }

        node.on('contextmenu', this._handleContextMenu, this);
    },

    _buildHTML: function(content) {
        var template = '<div class="dropdown open"><ul class="dropdown-menu"></ul></div>';
        var node = Y.Node.create(template);
        var ul = node.one('ul');

        if (content === '') {
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

            ul.append(elLi);
        }

        return node.get('outerHTML');
    },

    _handleContextMenu: function (e) {
        var node        = this._node,
            contextMenu = this._contextMenu,
            content     = this._content;

        // Remove a previous context menu if it exists, ideally we prolly wanna toggle it.
        Y.all('.rednose-context-open').each(function (node) {
            node.contextMenu._contextMenu.destroy();
        });

        e.preventDefault();

        contextMenu = new Y.Overlay({
            bodyContent: content,
            visible: false,
            constrain: true,
            zIndex: Y.all('*').size(),
            render: true
        });

        node.addClass('rednose-context-open');

        contextMenu.get('boundingBox').addClass('rednose-context-menu');
        contextMenu.get('boundingBox').setStyle('left', e.pageX);
        contextMenu.get('boundingBox').setStyle('top', e.pageY);
        contextMenu.show();

        this._contextMenu = contextMenu;
        this._bindContextMenu();
    },

    _bindContextMenu: function () {
        var self         = this,
            node         = this._node,
            contextMenu  = this._contextMenu;

        // Bind the menu events
        contextMenu.get('boundingBox').all('a').each(function() {
            this.on(['click', 'contextmenu'], function (e) {
                var target = e.currentTarget,
                    args = { node: node };

                e.preventDefault();

                if (target.hasClass('disabled') !== true) {
                    if (self.data !== null) {
                        args.data = self.data;
                    }

                    self.fire(target.getAttribute('data-id'), args);

                    contextMenu.destroy();
                } else {
                    target.blur();
                }
            });
        });

        contextMenu.get('boundingBox').all('li').on('mouseenter', function (e) {
            var node = e.currentTarget;

            if (node.one('i')) {
                node.one('i').addClass('icon-white');
            }
        });

        contextMenu.get('boundingBox').all('li').on('mouseleave', function (e) {
            var node = e.currentTarget;

            if (node.one('i') && node.one('i').hasClass('icon-white')) {
                node.one('i').removeClass('icon-white');
            }
        });

        contextMenu.get('boundingBox').on('clickoutside', function (e) {
            // Dont allow the rightclick mousebutton to hide the contextMenu
            // In some cases a browser (tested on FF17) will fire false positives and
            // immediately hide the contextmenu again.
            if (e.button !== 3) {
                contextMenu.destroy();
            }
        });
    }

}, {
    NS : 'contextMenu',
    ATTRS : {}
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').ContextMenu = ContextMenu;
