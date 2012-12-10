YUI.add('libbit-contextmenu', function (Y, NAME) {

var ContextMenu;

ContextMenu = Y.Base.create('contextMenu', Y.Plugin.Base, [], {
    /**
     * State variable, holds a possible active instance.
     */
    _contextMenu: null,

    /**
     * Initializer, gets called upon instance initiation.
     */
    initializer: function (config) {
        var node         = config.host,
            content      = config.content ? config.content : '',
            bubbleTarget = config.bubbleTarget;

        this._node = node;
        this._content = content;
        this.addTarget(bubbleTarget);

        node.on('contextmenu', this._handleContextMenu, this);
    },

    _handleContextMenu: function (e) {
        var node        = this._node,
            contextMenu = this._contextMenu,
            content     = this._content;

        // Remove a previous context menu if it exists, ideally we prolly wanna toggle it.
        Y.all('.libbit-context-open').each(function (node) {
            node.removeClass('.libbit-context-open');
            node.contextMenu.destroy();
        });

        e.preventDefault();

        contextMenu = new Y.Overlay({
            bodyContent: content,
            visible: false,
            constrain: true,
            zIndex: Y.all('*').size(),
            render: true
        });

        node.addClass('libbit-context-open');
        node.contextMenu = contextMenu;

        contextMenu.get('boundingBox').addClass('libbit-context-menu');

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
        contextMenu.get('boundingBox').all('a').on(['click', 'contextmenu'], function (e) {
            var target = e.currentTarget;

            e.preventDefault();

            self.fire(target.getAttribute('data-event'), { node : node });

            contextMenu.destroy();
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

        contextMenu.get('boundingBox').on('clickoutside', function () {
            contextMenu.destroy();
        });
    }

}, {
    NS : 'contextMenu',
    ATTRS : {}
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').ContextMenu = ContextMenu;


}, '1.0.0', {"requires": ["base", "panel", "plugin", "widget"]});
