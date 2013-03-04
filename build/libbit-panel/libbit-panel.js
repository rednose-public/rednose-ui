YUI.add('libbit-panel', function (Y, NAME) {

var Panel;

Panel = Y.Base.create('panel', Y.Panel, [], {

    initializer: function() {
        var container = this.get('boundingBox');
        var self = this;

        this.after('render', function() {
            // Remove the first header (close button).
            var closeButton = container.one('.yui3-button-close');

            if (closeButton) {
                closeButton.ancestor('.yui3-widget-hd').remove();
            }

            // Re-align the modal panel.
            self.move(1, 1);
            self.centered();
        });
    }

});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Libbit').Panel = Panel;


}, '1.0.0', {"requires": ["panel"]});
