/*jshint boss:true, expr:true, evil:true, onevar:false */

var Micro = Y.Template.Micro;

var FormView = Y.Base.create('formView', Y.View, [], {

    templates: {
        form: Micro.compile(
            '<div class="rednose-form-view"><form class="rednose-form form-horizontal"/></div>'
        ),

        section: Micro.compile(
            '<fieldset class="section">' +
                '<% if (data.caption) { %>' +
                    '<legend><%= data.caption %></legend>' +
                '<% } %>' +
            '</fieldset>'
        )
    },

    _controlViewMap: {},

    _controlMap: [],

    destructor: function () {
        Y.Array.each(this._controlMap, function(control) {
            control.destroy();
            control = null;
        });
    },

    render: function () {
        var self      = this,
            container = this.get('container'),
            model     = this.get('model'),
            templates = this.templates;

        this._controlViewMap = [];

        container.setHTML(templates.form());

        model.get('sections').each(function (section) {
            container.one('form').append(self._renderSection(section));
        });

        return this;
    },

    _renderSection: function (section) {
        var self = this,
            node = Y.Node.create(this.templates.section(section.getAttrs()));

        if (section.get('inline')) {
            node.addClass('rednose-form-inline');
        }

        section.get('controls').each(function (control) {
            node.append(self._renderControl(control));
        });

        return node;
    },

    _renderControl: function (control) {
        var controlView = Y.Rednose.Form.ControlViewFactory.create(control),
            self        = this,
            node;

        if (controlView) {
            node = controlView.render().get('container');

            self._controlViewMap[control.get('id')] = controlView;
            control.view = controlView;

            // Add bubble target.
            controlView.addTarget(self);

            // var dd = new Y.DD.Drag({
            //     node: controlContainer,
            //     group: ['rednose-form-designer-form']
            // }).plug(Y.Plugin.DDProxy, {
            //     moveOnEnd: false
            // });

            // dd.on('drag:start', function(e) {
            //     e.target.get('dragNode').setHTML('');
            // });
            // dd.on('drag:drag', function(e) {
            //     self._dragging(e, container.one('fieldset'), controlContainer);
            // });
            // dd.on('drag:end', function() {
            //     self._setSortOrder(container.one('fieldset'));
            // });

            // controlContainer.setData('model', control);

            // container.one('fieldset').append(controlContainer);

            this._controlMap.push(controlView);
        }

        if (control.get('type') === 'image') {
            var imageNode  = Y.Node.create('<img src="http://www.tweedekamer.nl/images/7885_tcm181-114584.jpg"></img>'),
                properties = control.get('properties');

            // if (properties && properties.frame) {
            //     var frame = properties.frame;

            //    imageNode.setStyles({
            //         position: 'absolute',
            //         left    : frame.x + 'px',
            //         top     : frame.y + 'px',
            //         width   : frame.width + 'px',
            //         height  : frame.height + 'px'
            //     });
            // }

            node = Y.Node.create('<div></di>');

            node.append(imageNode);
        }

        return node;
    },

    _dragging: function(e, container, sender) {
        var y = e.currentTarget.mouseXY[1];
        var hit = false;

        container.all('> div').each(function(control) {
            if (sender.get('id') !== control.get('id')) {
                var top = control.getY();
                var bottom = (top + parseInt(control.getComputedStyle('height'), 10));

                if (y > top && y < bottom) {
                    sender.insertBefore(sender, control);

                    hit = true;
                }
            }
        });

        if (hit === false && y > (container.getY() + parseInt(container.getComputedStyle('height'), 10))) {
            container.append(sender);
        }
    },

    _setSortOrder: function(container) {
        var counter = 0,
            controls = [];

        container.all('> div').each(function(node) {
            var control = node.getData('model');

            control.set('sortOrder', counter);
            controls.push(control);

            counter++;
        });

        this.get('model').set('controls', controls);
    },

    _handleAddControl: function (e) {
        this._renderControl(e.model);
    }
}, {
    ATTRS: {
        model: { value: new Y.Rednose.Form.FormModel() }
    }
});

// -- Namespace ----------------------------------------------------------------
Y.namespace('Rednose.FormDesigner').FormView = FormView;
