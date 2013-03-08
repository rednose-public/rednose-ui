var Datepicker;

Datepicker = Y.Base.create('datepicker', Y.Calendar, [ ], {

    initializer: function() {
        this.after('render', function() {
            var wrapper = Y.Node.create('<span class="calendarWrapper" />');
            var container = this.get('contentBox');

            container.prepend(wrapper);

            wrapper.append(container.one('.yui3-calendar-pane'));
            wrapper.one('.yui3-calendar-pane').setStyle('display', 'none');
            wrapper.append('<span>This is a calender</span>');
        });
    },

}, {
    ATTRS: {
        rules: { value: [] },
    }
});

Y.namespace('Libbit').ControlFormDatepicker = Datepicker;
