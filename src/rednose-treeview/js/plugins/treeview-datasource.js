/*jshint boss:true, expr:true, onevar:false */

/**
 * @module rednose-treeview
 * @submodule rednose-treeview-datasource
 * @main rednose-treeview-datasource
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
     * @param {String} request
     * @param {Function} success callback
     * @param {Function} failure callback
     */
    load: function (request, success, failure) {
        var ds = this.get('datasource');

        if (ds) {
            ds.sendRequest({
                request : request,
                on: {
                    success: Y.bind(this._onRequestSuccess, this, success),
                    failure: Y.bind(this._onRequestFailure, this, failure)
                }
            });
        }
    },

    // -- Protected Event Handlers ---------------------------------------------

    _onRequestSuccess: function (callback, e) {
        var nodes = (e.response && e.response.results) || [];

        this.get('host').set('nodes', nodes);

        if (callback) {
            callback.call(this);
        }
    },

    _onRequestFailure: function (callback) {
        if (callback) {
            callback.call(this);
        }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.Plugin').TreeViewDataSource = TreeViewDataSource;
