YUI.add('rednose-loader', function (Y, NAME) {

/* This file is auto-generated by (yogi loader --group rednose-ui --json false --tests false -js js/rednose-ui.js --yes --mix --start ../) */

/*jshint maxlen:900, eqeqeq: false */

/**
 * YUI 3 module metadata
 * @module loader
 * @submodule loader-yui3
 */
YUI.Env[Y.version].modules = YUI.Env[Y.version].modules || {};
Y.mix(YUI.Env[Y.version].modules, {
    "rednose-anim": {
        "group": "rednose-ui",
        "requires": [
            "anim"
        ]
    },
    "rednose-app": {
        "group": "rednose-ui",
        "use": [
            "app-transitions",
            "rednose-app-base",
            "rednose-model-undo",
            "rednose-model-spinner",
            "rednose-view-nav"
        ]
    },
    "rednose-app-base": {
        "group": "rednose-ui",
        "requires": [
            "app-base",
            "event-custom",
            "rednose-app-templates",
            "rednose-panel",
            "rednose-tooltip",
            "rednose-util"
        ]
    },
    "rednose-app-templates": {
        "group": "rednose-ui"
    },
    "rednose-breadcrumb": {
        "group": "rednose-ui",
        "requires": [
            "base",
            "view"
        ]
    },
    "rednose-button": {
        "group": "rednose-ui",
        "requires": [
            "rednose-button-base",
            "template",
            "view"
        ]
    },
    "rednose-button-base": {
        "group": "rednose-ui",
        "requires": [
            "base"
        ]
    },
    "rednose-button-dropdown": {
        "group": "rednose-ui",
        "requires": [
            "rednose-button",
            "rednose-dropdown-plugin"
        ]
    },
    "rednose-button-group": {
        "group": "rednose-ui",
        "requires": [
            "rednose-button-group-base"
        ]
    },
    "rednose-button-group-base": {
        "group": "rednose-ui",
        "requires": [
            "rednose-button"
        ]
    },
    "rednose-contextmenu": {
        "group": "rednose-ui",
        "requires": [
            "base",
            "overlay",
            "panel",
            "plugin",
            "rednose-contextmenu-css",
            "widget"
        ]
    },
    "rednose-contextmenu-css": {
        "group": "rednose-ui",
        "type": "css"
    },
    "rednose-controlform": {
        "group": "rednose-ui",
        "requires": [
            "autocomplete",
            "autocomplete-filters",
            "autocomplete-highlighters",
            "base",
            "calendar",
            "dd-constrain",
            "dd-proxy",
            "io",
            "model",
            "model-list",
            "node",
            "rednose-contextmenu",
            "rednose-dialog",
            "template-micro"
        ]
    },
    "rednose-dataprovider": {
        "group": "rednose-ui",
        "requires": [
            "autocomplete",
            "autocomplete-filters",
            "autocomplete-highlighters",
            "base",
            "json",
            "model",
            "model-list",
            "rednose-treeview",
            "widget"
        ],
        "skinnable": true
    },
    "rednose-datasource-manager": {
        "group": "rednose-ui",
        "requires": [
            "rednose-app",
            "rednose-dataprovider"
        ]
    },
    "rednose-datatable": {
        "group": "rednose-ui",
        "requires": [
            "datatable-base",
            "datatable-scroll",
            "datatable-sort",
            "rednose-util"
        ],
        "skinnable": true,
        "supersedes": [
            "skin-sam-datatable-base"
        ]
    },
    "rednose-datatable-select": {
        "group": "rednose-ui",
        "requires": [
            "rednose-datatable",
            "plugin"
        ]
    },
    "rednose-datepicker-plugin": {
        "group": "rednose-ui",
        "requires": [
            "rednose-datetimepicker-base"
        ]
    },
    "rednose-datetimepicker": {
        "group": "rednose-ui",
        "use": [
            "rednose-datepicker-plugin",
            "rednose-timepicker-plugin"
        ]
    },
    "rednose-datetimepicker-base": {
        "group": "rednose-ui",
        "requires": [
            "base",
            "node",
            "plugin",
            "rednose-datetimepicker-base-css",
            "rednose-jquery"
        ]
    },
    "rednose-datetimepicker-base-css": {
        "group": "rednose-ui",
        "type": "css"
    },
    "rednose-dd": {
        "group": "rednose-ui",
        "requires": [
            "rednose-anim",
            "rednose-dd-css",
            "view"
        ]
    },
    "rednose-dd-css": {
        "group": "rednose-ui",
        "type": "css"
    },
    "rednose-dialog": {
        "group": "rednose-ui",
        "lang": [
            "en",
            "nl"
        ],
        "requires": [
            "dd",
            "dd-plugin",
            "json-parse",
            "rednose-dialog-css",
            "rednose-panel",
            "node",
            "node-event-simulate",
            "widget"
        ]
    },
    "rednose-dialog-css": {
        "group": "rednose-ui",
        "type": "css"
    },
    "rednose-dropdown": {
        "group": "rednose-ui",
        "requires": [
            "event-outside",
            "node",
            "rednose-dropdown-base",
            "template-micro",
            "view"
        ]
    },
    "rednose-dropdown-base": {
        "group": "rednose-ui",
        "requires": [
            "rednose-dropdown-item"
        ]
    },
    "rednose-dropdown-item": {
        "group": "rednose-ui",
        "requires": [
            "base"
        ]
    },
    "rednose-dropdown-plugin": {
        "group": "rednose-ui",
        "requires": [
            "rednose-dropdown",
            "node-pluginhost",
            "plugin"
        ]
    },
    "rednose-form": {
        "group": "rednose-ui",
        "requires": [
            "rednose-controlform",
            "rednose-dataprovider",
            "rednose-form-css",
            "template-micro",
            "uploader"
        ]
    },
    "rednose-form-css": {
        "group": "rednose-ui",
        "type": "css"
    },
    "rednose-form-designer": {
        "group": "rednose-ui",
        "requires": [
            "rednose-app",
            "rednose-datatable-select",
            "rednose-datasource-manager",
            "rednose-dialog",
            "rednose-dropdown",
            "rednose-form",
            "rednose-form-designer-css",
            "rednose-navbar",
            "rednose-nodescroll",
            "rednose-treeview"
        ]
    },
    "rednose-form-designer-css": {
        "group": "rednose-ui",
        "type": "css"
    },
    "rednose-formatter": {
        "group": "rednose-ui"
    },
    "rednose-grid": {
        "group": "rednose-ui",
        "requires": [
            "handlebars",
            "model-list",
            "rednose-contextmenu",
            "rednose-grid-select",
            "rednose-util",
            "view"
        ],
        "skinnable": true
    },
    "rednose-grid-select": {
        "group": "rednose-ui"
    },
    "rednose-jquery": {
        "group": "rednose-ui"
    },
    "rednose-model-spinner": {
        "group": "rednose-ui",
        "requires": [
            "rednose-app-base",
            "model"
        ]
    },
    "rednose-model-tree": {
        "group": "rednose-ui",
        "requires": [
            "model",
            "io"
        ]
    },
    "rednose-model-undo": {
        "group": "rednose-ui",
        "requires": [
            "model"
        ]
    },
    "rednose-navbar": {
        "group": "rednose-ui",
        "requires": [
            "base",
            "gallery-bootstrap-dropdown",
            "json",
            "node-event-simulate",
            "node-pluginhost",
            "rednose-dropdown",
            "rednose-navbar-css",
            "rednose-util",
            "view",
            "widget"
        ]
    },
    "rednose-navbar-css": {
        "group": "rednose-ui",
        "type": "css"
    },
    "rednose-navbar-recent": {
        "group": "rednose-ui",
        "requires": [
            "cookie",
            "plugin",
            "rednose-navbar"
        ]
    },
    "rednose-nodescroll": {
        "group": "rednose-ui",
        "requires": [
            "node",
            "event",
            "dd",
            "anim"
        ]
    },
    "rednose-notifier": {
        "group": "rednose-ui",
        "requires": [
            "rednose-jquery",
            "rednose-notifier-css"
        ]
    },
    "rednose-notifier-css": {
        "group": "rednose-ui",
        "type": "css"
    },
    "rednose-panel": {
        "group": "rednose-ui",
        "requires": [
            "panel",
            "rednose-panel-css"
        ],
        "supersedes": [
            "skin-sam-widget-base",
            "skin-sam-panel"
        ]
    },
    "rednose-panel-css": {
        "group": "rednose-ui",
        "type": "css"
    },
    "rednose-tabview": {
        "group": "rednose-ui",
        "requires": [
            "node"
        ]
    },
    "rednose-timepicker-plugin": {
        "group": "rednose-ui",
        "requires": [
            "rednose-datetimepicker-base"
        ]
    },
    "rednose-tooltip": {
        "group": "rednose-ui",
        "requires": [
            "gallery-bootstrap-tooltip"
        ]
    },
    "rednose-treeview": {
        "group": "rednose-ui",
        "requires": [
            "gallery-sm-treeview",
            "rednose-model-tree",
            "rednose-treeview-anim",
            "rednose-treeview-dd",
            "rednose-treeview-templates",
            "rednose-treeview-select",
            "node"
        ],
        "rollup": 1,
        "skinnable": true,
        "supersedes": [
            "gallery-sm-treeview-templates"
        ]
    },
    "rednose-treeview-anim": {
        "group": "rednose-ui",
        "requires": [
            "rednose-anim",
            "rednose-treeview",
            "transition"
        ]
    },
    "rednose-treeview-dd": {
        "group": "rednose-ui",
        "requires": [
            "rednose-dd",
            "rednose-treeview"
        ]
    },
    "rednose-treeview-select": {
        "group": "rednose-ui",
        "requires": [
            "rednose-treeview"
        ]
    },
    "rednose-treeview-templates": {
        "group": "rednose-ui",
        "requires": [
            "template-micro"
        ]
    },
    "rednose-util": {
        "group": "rednose-ui",
        "requires": [
            "datatype-date"
        ]
    },
    "rednose-view-nav": {
        "group": "rednose-ui",
        "requires": [
            "event-custom",
            "rednose-navbar",
            "rednose-panel",
            "rednose-util",
            "rednose-widget-nav-container",
            "view"
        ]
    },
    "rednose-widget-nav-container": {
        "group": "rednose-ui",
        "requires": [
            "widget",
            "widget-buttons",
            "widget-stdmod"
        ]
    }
});
YUI.Env[Y.version].md5 = '4edc6eb0b00cf269e8b63e0f1c0c29b2';


}, '1.4.0');
