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
        libbit: {
            base: '../../../../../yui3-libbit/build/',
            filter: 'debug',
            patterns:  { 'libbit-': {
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
