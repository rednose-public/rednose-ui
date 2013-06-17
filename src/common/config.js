YUI_config = {
    base: '../../../../../yui3/build/',
    lang: 'en',
    filter: 'raw',
    groups: {
        gallery: {
            base: '../../../../../yui3-gallery/build/',
            patterns: {
                'gallery-': {},
                'lang/gallery-': {},
                'gallerycss-': { type: 'css' }
            }
        },
        rednose: {
            base: '../../../../../rednose-ui/build/',
            filter: 'debug',
            patterns:  { 'rednose-': {
                configFn: function (me) {
                    if (/-css/.test(me.name)) {
                        me.type = 'css';
                        me.path = me.path.replace(/\.js/, '.css');
                    }
                }
            }}
        }
    }
};
