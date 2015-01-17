/*jshint boss:true, expr:true, onevar:false */

/**
 * Provides a generic tabview.
 *
 * @module rednose-tabview
 */

/**
 * @event click
 */
var EVT_CLICK = 'click';

/**
 * Provides a generic tabview.
 *
 * @class TabView
 * @namespace Rednose
 * @constructor
 * @extends TabView
 */
var TabView = Y.Base.create('tabView', Y.Widget, [], {
    // -- Public Properties ----------------------------------------------------

    template:
        '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            '</ul>' +
        '</div>' +
        '<div class="tab-content">' +
        '</div>',

    itemTemplate: '<li><a></a></li>',

    paneTemplate: '<div class="tab-pane"></div>',

    initializer: function () {
        this.after('errorChange', this._setError, this);
    },

    // -- Lifecycle Methods ----------------------------------------------------

    renderUI: function () {
        var self      = this,
            tabs      = this.get('tabs'),
            container = this.get('contentBox');

        container.append(this.template);

        var paneContainer = container.one('.tab-content');

        Y.each(tabs, function(tab) {
            var li   = Y.Node.create(self.itemTemplate),
                a    = li.one('a'),
                pane = Y.Node.create(self.paneTemplate);

            a.on('click', self._handleTabClick, self);
            a.setAttribute('id', tab.id);
            a.setHTML(tab.title);

            pane.append(tab.container);
            pane.setAttribute('id', tab.id);
            paneContainer.append(pane);

            if (tab.active) {
                pane.addClass('active');
                li.addClass('active');
            }

            container.one('ul').append(li);
        });
    },

    showTab: function (id) {
        return this.hideTab(id, false);
    },

    hideTab: function (id, _hide) {
        var container = this.get('contentBox'),
            tab       = container.one('#' + id);

        if (tab) {
            if (_hide) {
                tab.show();
            } else {
                tab.hide();
            }

            return true;
        }

        return false;
    },

    // -- Protected Methods ----------------------------------------------------

    _handleTabClick: function (e) {
        var a         = e.currentTarget,
            id        = a.getAttribute('id'),
            container = this.get('contentBox');

        container.all('.active').removeClass('active');

        a.get('parentNode').addClass('active');
        container.one('div#' + id).addClass('active');

        this.fire(EVT_CLICK, {
            id     : id,
            tabNode: a.get('parentNode')
        });
    },

    /**
     * Fired when the `error` property changes.
     *
     * @private
     */
    _setError: function (e) {
        var errors = e.newVal,
            container = this.get('contentBox'),
            clicked = false;

        container.all('.text-error').removeClass('text-error');

        Y.each(errors, function(error) {
            container.one('a#' + error).addClass('text-error');

            if (clicked === false) {
                container.one('a#' + error).simulate('click');

                clicked = true;
            }
        });
    }
}, {
    ATTRS: {
        tabs: { value: {} },
        error: { value: [] }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose').TabView = TabView;
