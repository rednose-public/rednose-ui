/*jshint boss:true, expr:true, onevar:false */

function ViewTemplateRuler() {}

ViewTemplateRuler.prototype = {
    initializer: function () {
        var container = this.get('container');

        container.one('.rednose-unit-main').addClass('rednose-ruler-unit-main');
        container.one('.rednose-unit-main').append('<div class="rednose-ruler"></div>');

        this.set('rulerContainer', container.one('.rednose-ruler'));
    }
};

ViewTemplateRuler.ATTRS = {
    /**
     * @attribute toolbarContainer
     * @type Node
     */
    rulerContainer: {
        value: null
    }
};

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.View.Template').Ruler = ViewTemplateRuler;
