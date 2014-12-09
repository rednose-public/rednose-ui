/**
 * Includes the metadata for the bundled gallery modules.
 */
YUI.Env[Y.version].groups = YUI.Env[Y.version].groups || {};

YUI.Env[Y.version].groups.gallery = {
    // Load gallery modules from the same directory as the main files.
    base: Y.config.base,

    patterns: {
        'gallery-': {},
        'lang/gallery-': {},
        'gallerycss-': { type: 'css' }
    }
};
