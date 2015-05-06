YUI.add('rednose-treeview-datasource', function (Y, NAME) {

/*jshint boss:true, expr:true, onevar:false */

'use strict';

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
    // -- Public Methods -------------------------------------------------------

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
        var data = (e.response && e.response.results) || [];

        this.get('host').set('nodes', data.map(function(datum) {
            return {
                id: datum.id,
                label: datum.name,
                icon: datum.icon,
                canHaveChildren: datum.has_children,
                data: datum
            };
        }));

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


}, '@VERSION@', {"requires": ["plugin"]});
