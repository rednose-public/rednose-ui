if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-loader/rednose-loader.js']) {
   __coverage__['build/rednose-loader/rednose-loader.js'] = {"path":"build/rednose-loader/rednose-loader.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0},"b":{"1":[0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":26},"end":{"line":1,"column":45}}},"2":{"name":"(anonymous_2)","line":198,"loc":{"start":{"line":198,"column":20},"end":{"line":198,"column":33}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":472,"column":16}},"2":{"start":{"line":12,"column":0},"end":{"line":12,"column":62}},"3":{"start":{"line":13,"column":0},"end":{"line":468,"column":3}},"4":{"start":{"line":199,"column":4},"end":{"line":199,"column":37}},"5":{"start":{"line":469,"column":0},"end":{"line":469,"column":60}}},"branchMap":{"1":{"line":12,"type":"binary-expr","locations":[{"start":{"line":12,"column":29},"end":{"line":12,"column":55}},{"start":{"line":12,"column":59},"end":{"line":12,"column":61}}]}},"code":["(function () { YUI.add('rednose-loader', function (Y, NAME) {","","/* This file is auto-generated by (yogi loader --group rednose-ui --json false --tests false -js js/rednose-ui.js --yes --mix --start ../) */","","/*jshint maxlen:900, eqeqeq: false */","","/**"," * YUI 3 module metadata"," * @module loader"," * @submodule loader-yui3"," */","YUI.Env[Y.version].modules = YUI.Env[Y.version].modules || {};","Y.mix(YUI.Env[Y.version].modules, {","    \"rednose-anim\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"anim\"","        ]","    },","    \"rednose-app\": {","        \"group\": \"rednose-ui\",","        \"use\": [","            \"app-transitions\",","            \"rednose-app-base\",","            \"rednose-model-spinner\",","            \"rednose-view-nav\",","            \"rednose-view-templates\"","        ]","    },","    \"rednose-app-base\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"app-base\",","            \"rednose-panel\",","            \"rednose-util\"","        ]","    },","    \"rednose-breadcrumb\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\",","            \"view\"","        ]","    },","    \"rednose-button\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-button-base\",","            \"template\",","            \"view\"","        ]","    },","    \"rednose-button-base\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\"","        ]","    },","    \"rednose-button-dropdown\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-button\",","            \"rednose-dropdown-plugin\"","        ]","    },","    \"rednose-button-group\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-button-group-base\"","        ]","    },","    \"rednose-button-group-base\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-button\"","        ]","    },","    \"rednose-colorpicker\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\",","            \"event\",","            \"node\",","            \"widget\"","        ]","    },","    \"rednose-datatable\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"datatable-base\",","            \"datatable-scroll\",","            \"datatable-sort\",","            \"rednose-util\"","        ],","        \"supersedes\": [","            \"skin-sam-datatable-base\"","        ]","    },","    \"rednose-datatable-select\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"event-outside\",","            \"rednose-datatable\",","            \"plugin\"","        ]","    },","    \"rednose-datepicker-plugin\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-datetimepicker-base\"","        ]","    },","    \"rednose-datetimepicker\": {","        \"group\": \"rednose-ui\",","        \"use\": [","            \"rednose-datepicker-plugin\",","            \"rednose-timepicker-plugin\"","        ]","    },","    \"rednose-datetimepicker-base\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\",","            \"node\",","            \"plugin\",","            \"rednose-datetimepicker-base-css\",","            \"rednose-jquery\"","        ]","    },","    \"rednose-datetimepicker-base-css\": {","        \"group\": \"rednose-ui\",","        \"type\": \"css\"","    },","    \"rednose-dialog\": {","        \"group\": \"rednose-ui\",","        \"use\": [","            \"rednose-dialog-base\",","            \"rednose-dialog-template\"","        ]","    },","    \"rednose-dialog-base\": {","        \"group\": \"rednose-ui\",","        \"lang\": [","            \"en\",","            \"nl\"","        ],","        \"requires\": [","            \"base\",","            \"rednose-panel\",","            \"rednose-toolbar\"","        ]","    },","    \"rednose-dialog-template\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"template-micro\",","            \"rednose-tabview\"","        ]","    },","    \"rednose-dropdown\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"event-outside\",","            \"node\",","            \"rednose-dropdown-base\",","            \"template-micro\",","            \"view\"","        ]","    },","    \"rednose-dropdown-base\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-dropdown-item\"","        ]","    },","    \"rednose-dropdown-delegate\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-dropdown-plugin\"","        ]","    },","    \"rednose-dropdown-item\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\"","        ]","    },","    \"rednose-dropdown-keys\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-dropdown\",","            \"rednose-util\"","        ]","    },","    \"rednose-dropdown-keys-mac\": {","        \"condition\": {","            \"name\": \"rednose-dropdown-keys-mac\",","            \"test\": function (Y) {","    return (Y.UA.os === 'macintosh');","},","            \"trigger\": \"rednose-dropdown-keys\"","        },","        \"group\": \"rednose-ui\"","    },","    \"rednose-dropdown-plugin\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-dropdown\",","            \"node-pluginhost\",","            \"plugin\"","        ]","    },","    \"rednose-formatter\": {","        \"group\": \"rednose-ui\"","    },","    \"rednose-grid\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"handlebars\",","            \"model-list\",","            \"rednose-grid-select\",","            \"rednose-util\",","            \"view\"","        ]","    },","    \"rednose-grid-select\": {","        \"group\": \"rednose-ui\"","    },","    \"rednose-jquery\": {","        \"group\": \"rednose-ui\"","    },","    \"rednose-model-spinner\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"model\",","            \"rednose-app-base\"","        ]","    },","    \"rednose-navbar\": {","        \"group\": \"rednose-ui\",","        \"use\": [","            \"rednose-navbar-keys\",","            \"rednose-navbar-recent\"","        ]","    },","    \"rednose-navbar-base\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"json\",","            \"node-pluginhost\",","            \"rednose-dropdown-plugin\",","            \"view\"","        ]","    },","    \"rednose-navbar-keys\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"event-custom\",","            \"rednose-dropdown-keys\",","            \"rednose-navbar-base\"","        ]","    },","    \"rednose-navbar-recent\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"cookie\",","            \"plugin\",","            \"rednose-navbar-base\"","        ]","    },","    \"rednose-nodescroll\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"node\",","            \"event\",","            \"dd\",","            \"anim\"","        ]","    },","    \"rednose-notifier\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-jquery\",","            \"rednose-notifier-css\"","        ]","    },","    \"rednose-notifier-css\": {","        \"group\": \"rednose-ui\",","        \"type\": \"css\"","    },","    \"rednose-panel\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"panel\"","        ],","        \"supersedes\": [","            \"skin-sam-widget-base\",","            \"skin-sam-panel\"","        ]","    },","    \"rednose-ruler\": {","        \"group\": \"rednose-ui\",","        \"use\": [","            \"rednose-ruler-dd\"","        ]","    },","    \"rednose-ruler-base\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"node\",","            \"event-resize\",","            \"view\"","        ]","    },","    \"rednose-ruler-dd\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-ruler-base\",","            \"resize\",","            \"datatype-number\"","        ]","    },","    \"rednose-tabview\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"node\"","        ]","    },","    \"rednose-timepicker-plugin\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-datetimepicker-base\"","        ]","    },","    \"rednose-toolbar\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-toolbar-base\"","        ]","    },","    \"rednose-toolbar-base\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-button-group\",","            \"base\"","        ]","    },","    \"rednose-tooltip\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\",","            \"node\",","            \"anim\"","        ]","    },","    \"rednose-tree\": {","        \"group\": \"rednose-ui\",","        \"use\": [","            \"rednose-tree-comparable\",","            \"rednose-tree-icon\"","        ]","    },","    \"rednose-tree-comparable\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"tree\"","        ]","    },","    \"rednose-tree-icon\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"tree\"","        ]","    },","    \"rednose-treeview\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"gallery-sm-treeview-sortable\",","            \"rednose-tree\",","            \"rednose-treeview-anim\",","            \"rednose-treeview-datasource\",","            \"rednose-treeview-dd\",","            \"rednose-treeview-templates\",","            \"rednose-treeview-select\",","            \"node\"","        ],","        \"rollup\": 1,","        \"supersedes\": [","            \"gallery-sm-treeview-templates\"","        ]","    },","    \"rednose-treeview-anim\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-anim\",","            \"transition\"","        ]","    },","    \"rednose-treeview-datasource\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"plugin\"","        ]","    },","    \"rednose-treeview-dd\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"dd\"","        ]","    },","    \"rednose-treeview-multi\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-treeview\"","        ]","    },","    \"rednose-treeview-select\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\",","            \"event-outside\"","        ]","    },","    \"rednose-treeview-templates\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"template-micro\"","        ]","    },","    \"rednose-undo-manager\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\"","        ]","    },","    \"rednose-util\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"datatype-date\"","        ]","    },","    \"rednose-view-nav\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"event-custom\",","            \"rednose-toolbar\",","            \"rednose-panel\",","            \"rednose-util\",","            \"rednose-widget-nav-container\",","            \"template-micro\",","            \"view\"","        ]","    },","    \"rednose-view-templates\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"view\"","        ]","    },","    \"rednose-widget-nav-container\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"widget\",","            \"widget-buttons\",","            \"widget-stdmod\"","        ]","    }","});","YUI.Env[Y.version].md5 = '1ea9ce6e9bcf952f82a5ddf2793f8a85';","","","}, '1.6.0-dev');","","}());"]};
}
var __cov_6w8j85n1fN9nSqc9kkAeRA = __coverage__['build/rednose-loader/rednose-loader.js'];
__cov_6w8j85n1fN9nSqc9kkAeRA.s['1']++;YUI.add('rednose-loader',function(Y,NAME){__cov_6w8j85n1fN9nSqc9kkAeRA.f['1']++;__cov_6w8j85n1fN9nSqc9kkAeRA.s['2']++;YUI.Env[Y.version].modules=(__cov_6w8j85n1fN9nSqc9kkAeRA.b['1'][0]++,YUI.Env[Y.version].modules)||(__cov_6w8j85n1fN9nSqc9kkAeRA.b['1'][1]++,{});__cov_6w8j85n1fN9nSqc9kkAeRA.s['3']++;Y.mix(YUI.Env[Y.version].modules,{'rednose-anim':{'group':'rednose-ui','requires':['anim']},'rednose-app':{'group':'rednose-ui','use':['app-transitions','rednose-app-base','rednose-model-spinner','rednose-view-nav','rednose-view-templates']},'rednose-app-base':{'group':'rednose-ui','requires':['app-base','rednose-panel','rednose-util']},'rednose-breadcrumb':{'group':'rednose-ui','requires':['base','view']},'rednose-button':{'group':'rednose-ui','requires':['rednose-button-base','template','view']},'rednose-button-base':{'group':'rednose-ui','requires':['base']},'rednose-button-dropdown':{'group':'rednose-ui','requires':['rednose-button','rednose-dropdown-plugin']},'rednose-button-group':{'group':'rednose-ui','requires':['rednose-button-group-base']},'rednose-button-group-base':{'group':'rednose-ui','requires':['rednose-button']},'rednose-colorpicker':{'group':'rednose-ui','requires':['base','event','node','widget']},'rednose-datatable':{'group':'rednose-ui','requires':['datatable-base','datatable-scroll','datatable-sort','rednose-util'],'supersedes':['skin-sam-datatable-base']},'rednose-datatable-select':{'group':'rednose-ui','requires':['event-outside','rednose-datatable','plugin']},'rednose-datepicker-plugin':{'group':'rednose-ui','requires':['rednose-datetimepicker-base']},'rednose-datetimepicker':{'group':'rednose-ui','use':['rednose-datepicker-plugin','rednose-timepicker-plugin']},'rednose-datetimepicker-base':{'group':'rednose-ui','requires':['base','node','plugin','rednose-datetimepicker-base-css','rednose-jquery']},'rednose-datetimepicker-base-css':{'group':'rednose-ui','type':'css'},'rednose-dialog':{'group':'rednose-ui','use':['rednose-dialog-base','rednose-dialog-template']},'rednose-dialog-base':{'group':'rednose-ui','lang':['en','nl'],'requires':['base','rednose-panel','rednose-toolbar']},'rednose-dialog-template':{'group':'rednose-ui','requires':['template-micro','rednose-tabview']},'rednose-dropdown':{'group':'rednose-ui','requires':['event-outside','node','rednose-dropdown-base','template-micro','view']},'rednose-dropdown-base':{'group':'rednose-ui','requires':['rednose-dropdown-item']},'rednose-dropdown-delegate':{'group':'rednose-ui','requires':['rednose-dropdown-plugin']},'rednose-dropdown-item':{'group':'rednose-ui','requires':['base']},'rednose-dropdown-keys':{'group':'rednose-ui','requires':['rednose-dropdown','rednose-util']},'rednose-dropdown-keys-mac':{'condition':{'name':'rednose-dropdown-keys-mac','test':function(Y){__cov_6w8j85n1fN9nSqc9kkAeRA.f['2']++;__cov_6w8j85n1fN9nSqc9kkAeRA.s['4']++;return Y.UA.os==='macintosh';},'trigger':'rednose-dropdown-keys'},'group':'rednose-ui'},'rednose-dropdown-plugin':{'group':'rednose-ui','requires':['rednose-dropdown','node-pluginhost','plugin']},'rednose-formatter':{'group':'rednose-ui'},'rednose-grid':{'group':'rednose-ui','requires':['handlebars','model-list','rednose-grid-select','rednose-util','view']},'rednose-grid-select':{'group':'rednose-ui'},'rednose-jquery':{'group':'rednose-ui'},'rednose-model-spinner':{'group':'rednose-ui','requires':['model','rednose-app-base']},'rednose-navbar':{'group':'rednose-ui','use':['rednose-navbar-keys','rednose-navbar-recent']},'rednose-navbar-base':{'group':'rednose-ui','requires':['json','node-pluginhost','rednose-dropdown-plugin','view']},'rednose-navbar-keys':{'group':'rednose-ui','requires':['event-custom','rednose-dropdown-keys','rednose-navbar-base']},'rednose-navbar-recent':{'group':'rednose-ui','requires':['cookie','plugin','rednose-navbar-base']},'rednose-nodescroll':{'group':'rednose-ui','requires':['node','event','dd','anim']},'rednose-notifier':{'group':'rednose-ui','requires':['rednose-jquery','rednose-notifier-css']},'rednose-notifier-css':{'group':'rednose-ui','type':'css'},'rednose-panel':{'group':'rednose-ui','requires':['panel'],'supersedes':['skin-sam-widget-base','skin-sam-panel']},'rednose-ruler':{'group':'rednose-ui','use':['rednose-ruler-dd']},'rednose-ruler-base':{'group':'rednose-ui','requires':['node','event-resize','view']},'rednose-ruler-dd':{'group':'rednose-ui','requires':['rednose-ruler-base','resize','datatype-number']},'rednose-tabview':{'group':'rednose-ui','requires':['node']},'rednose-timepicker-plugin':{'group':'rednose-ui','requires':['rednose-datetimepicker-base']},'rednose-toolbar':{'group':'rednose-ui','requires':['rednose-toolbar-base']},'rednose-toolbar-base':{'group':'rednose-ui','requires':['rednose-button-group','base']},'rednose-tooltip':{'group':'rednose-ui','requires':['base','node','anim']},'rednose-tree':{'group':'rednose-ui','use':['rednose-tree-comparable','rednose-tree-icon']},'rednose-tree-comparable':{'group':'rednose-ui','requires':['tree']},'rednose-tree-icon':{'group':'rednose-ui','requires':['tree']},'rednose-treeview':{'group':'rednose-ui','requires':['gallery-sm-treeview-sortable','rednose-tree','rednose-treeview-anim','rednose-treeview-datasource','rednose-treeview-dd','rednose-treeview-templates','rednose-treeview-select','node'],'rollup':1,'supersedes':['gallery-sm-treeview-templates']},'rednose-treeview-anim':{'group':'rednose-ui','requires':['rednose-anim','transition']},'rednose-treeview-datasource':{'group':'rednose-ui','requires':['plugin']},'rednose-treeview-dd':{'group':'rednose-ui','requires':['dd']},'rednose-treeview-multi':{'group':'rednose-ui','requires':['rednose-treeview']},'rednose-treeview-select':{'group':'rednose-ui','requires':['base','event-outside']},'rednose-treeview-templates':{'group':'rednose-ui','requires':['template-micro']},'rednose-undo-manager':{'group':'rednose-ui','requires':['base']},'rednose-util':{'group':'rednose-ui','requires':['datatype-date']},'rednose-view-nav':{'group':'rednose-ui','requires':['event-custom','rednose-toolbar','rednose-panel','rednose-util','rednose-widget-nav-container','template-micro','view']},'rednose-view-templates':{'group':'rednose-ui','requires':['view']},'rednose-widget-nav-container':{'group':'rednose-ui','requires':['widget','widget-buttons','widget-stdmod']}});__cov_6w8j85n1fN9nSqc9kkAeRA.s['5']++;YUI.Env[Y.version].md5='1ea9ce6e9bcf952f82a5ddf2793f8a85';},'1.6.0-dev');
