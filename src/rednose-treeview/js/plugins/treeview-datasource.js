/*jshint boss:true, expr:true, onevar:false */

/**
 * @module rednose-treeview
 * @submodule rednose-treeview-datasource
 */

/**
 * @class Plugin.TreeViewDataSource
 * @extends Plugin.Base
 */
function TreeViewDataSource() {
    TreeViewDataSource.superclass.constructor.apply(this, arguments);
}

Y.mix(TreeViewDataSource, {
    /**
     * @type {String}
     */
    NS: 'datasource',

    /**
     * @type {String}
     */
    NAME: 'treeViewDataSource',

    ATTRS: {
        /**
         * @type {DataSource}
         */
        datasource: {
            value: null
        }
    }
});

Y.extend(TreeViewDataSource, Y.Plugin.Base, {
    // -- Publid Methods -------------------------------------------------------

    /**
     * @param {Object} config
     */
    load: function (config) {
        config = config || {};

        config.callback = config.callback || {
            success: Y.bind(this._onDataReturn, this),
            failure: Y.bind(this._onDataReturn, this)
        };

        var ds = this.get('datasource');

        if (ds) {
            ds.sendRequest(config);
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    _onDataReturn: function (e) {
        var nodes = (e.response && e.response.results) || [];

        this.get('host').set('nodes', nodes);
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Plugin').TreeViewDataSource = TreeViewDataSource;
