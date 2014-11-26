if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-base/rednose-base.js']) {
   __coverage__['build/rednose-base/rednose-base.js'] = {"path":"build/rednose-base/rednose-base.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0},"b":{"1":[0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}},"2":{"name":"(anonymous_2)","line":174,"loc":{"start":{"line":174,"column":20},"end":{"line":174,"column":33}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":407,"column":16}},"2":{"start":{"line":12,"column":0},"end":{"line":12,"column":62}},"3":{"start":{"line":13,"column":0},"end":{"line":403,"column":3}},"4":{"start":{"line":175,"column":4},"end":{"line":175,"column":37}},"5":{"start":{"line":404,"column":0},"end":{"line":404,"column":60}}},"branchMap":{"1":{"line":12,"type":"binary-expr","locations":[{"start":{"line":12,"column":29},"end":{"line":12,"column":55}},{"start":{"line":12,"column":59},"end":{"line":12,"column":61}}]}},"code":["(function () { YUI.add('rednose-base', function (Y, NAME) {","","/* This file is auto-generated by (yogi loader --json js/rednose-loader.json --tests false -js js/rednose-loader.js --yes --mix --start ../) */","","/*jshint maxlen:900, eqeqeq: false */","","/**"," * YUI 3 module metadata"," * @module loader"," * @submodule loader-yui3"," */","YUI.Env[Y.version].modules = YUI.Env[Y.version].modules || {};","Y.mix(YUI.Env[Y.version].modules, {","    \"rednose-anim\": {","        \"requires\": [","            \"anim\"","        ]","    },","    \"rednose-app\": {","        \"use\": [","            \"app-transitions\",","            \"rednose-app-base\",","            \"rednose-model-spinner\",","            \"rednose-view-nav\",","            \"rednose-view-templates\"","        ]","    },","    \"rednose-app-base\": {","        \"requires\": [","            \"app-base\",","            \"rednose-panel\",","            \"rednose-util\"","        ]","    },","    \"rednose-breadcrumb\": {","        \"requires\": [","            \"base\",","            \"view\"","        ]","    },","    \"rednose-button\": {","        \"requires\": [","            \"rednose-button-base\",","            \"template\",","            \"view\"","        ]","    },","    \"rednose-button-base\": {","        \"requires\": [","            \"base\"","        ]","    },","    \"rednose-button-dropdown\": {","        \"requires\": [","            \"rednose-button\",","            \"rednose-dropdown-plugin\"","        ]","    },","    \"rednose-button-group\": {","        \"requires\": [","            \"rednose-button-group-base\"","        ]","    },","    \"rednose-button-group-base\": {","        \"requires\": [","            \"rednose-button\"","        ]","    },","    \"rednose-colorpicker\": {","        \"requires\": [","            \"base\",","            \"event\",","            \"node\",","            \"widget\"","        ]","    },","    \"rednose-datatable\": {","        \"requires\": [","            \"datatable-base\",","            \"datatable-scroll\",","            \"datatable-sort\",","            \"rednose-util\"","        ],","        \"supersedes\": [","            \"skin-sam-datatable-base\"","        ]","    },","    \"rednose-datatable-select\": {","        \"requires\": [","            \"event-outside\",","            \"rednose-datatable\",","            \"plugin\"","        ]","    },","    \"rednose-datepicker-plugin\": {","        \"requires\": [","            \"rednose-datetimepicker-base\"","        ]","    },","    \"rednose-datetimepicker\": {","        \"use\": [","            \"rednose-datepicker-plugin\",","            \"rednose-timepicker-plugin\"","        ]","    },","    \"rednose-datetimepicker-base\": {","        \"requires\": [","            \"base\",","            \"node\",","            \"plugin\",","            \"rednose-datetimepicker-base-css\",","            \"rednose-jquery\"","        ]","    },","    \"rednose-datetimepicker-base-css\": {","        \"type\": \"css\"","    },","    \"rednose-dialog\": {","        \"use\": [","            \"rednose-dialog-base\",","            \"rednose-dialog-template\"","        ]","    },","    \"rednose-dialog-base\": {","        \"lang\": [","            \"en\",","            \"nl\"","        ],","        \"requires\": [","            \"base\",","            \"rednose-panel\",","            \"rednose-toolbar\"","        ]","    },","    \"rednose-dialog-template\": {","        \"requires\": [","            \"template-micro\",","            \"rednose-tabview\"","        ]","    },","    \"rednose-dropdown\": {","        \"requires\": [","            \"event-outside\",","            \"node\",","            \"rednose-dropdown-base\",","            \"template-micro\",","            \"view\"","        ]","    },","    \"rednose-dropdown-base\": {","        \"requires\": [","            \"rednose-dropdown-item\"","        ]","    },","    \"rednose-dropdown-delegate\": {","        \"requires\": [","            \"rednose-dropdown-plugin\"","        ]","    },","    \"rednose-dropdown-item\": {","        \"requires\": [","            \"base\"","        ]","    },","    \"rednose-dropdown-keys\": {","        \"requires\": [","            \"rednose-dropdown\",","            \"rednose-util\"","        ]","    },","    \"rednose-dropdown-keys-mac\": {","        \"condition\": {","            \"name\": \"rednose-dropdown-keys-mac\",","            \"test\": function (Y) {","    return (Y.UA.os === 'macintosh');","},","            \"trigger\": \"rednose-dropdown-keys\"","        }","    },","    \"rednose-dropdown-plugin\": {","        \"requires\": [","            \"rednose-dropdown\",","            \"node-pluginhost\",","            \"plugin\"","        ]","    },","    \"rednose-formatter\": {},","    \"rednose-grid\": {","        \"requires\": [","            \"handlebars\",","            \"model-list\",","            \"rednose-grid-select\",","            \"rednose-util\",","            \"view\"","        ]","    },","    \"rednose-grid-select\": {},","    \"rednose-jquery\": {},","    \"rednose-model-spinner\": {","        \"requires\": [","            \"model\",","            \"rednose-app-base\"","        ]","    },","    \"rednose-navbar\": {","        \"use\": [","            \"rednose-navbar-keys\",","            \"rednose-navbar-recent\"","        ]","    },","    \"rednose-navbar-base\": {","        \"requires\": [","            \"json\",","            \"node-pluginhost\",","            \"rednose-dropdown-plugin\",","            \"view\"","        ]","    },","    \"rednose-navbar-keys\": {","        \"requires\": [","            \"event-custom\",","            \"rednose-dropdown-keys\",","            \"rednose-navbar-base\"","        ]","    },","    \"rednose-navbar-recent\": {","        \"requires\": [","            \"cookie\",","            \"plugin\",","            \"rednose-navbar-base\"","        ]","    },","    \"rednose-nodescroll\": {","        \"requires\": [","            \"node\",","            \"event\",","            \"dd\",","            \"anim\"","        ]","    },","    \"rednose-notifier\": {","        \"requires\": [","            \"rednose-jquery\",","            \"rednose-notifier-css\"","        ]","    },","    \"rednose-notifier-css\": {","        \"type\": \"css\"","    },","    \"rednose-panel\": {","        \"requires\": [","            \"panel\"","        ],","        \"supersedes\": [","            \"skin-sam-widget-base\",","            \"skin-sam-panel\"","        ]","    },","    \"rednose-ruler\": {","        \"use\": [","            \"rednose-ruler-dd\"","        ]","    },","    \"rednose-ruler-base\": {","        \"requires\": [","            \"node\",","            \"event-resize\",","            \"view\"","        ]","    },","    \"rednose-ruler-dd\": {","        \"requires\": [","            \"rednose-ruler-base\",","            \"resize\",","            \"datatype-number\"","        ]","    },","    \"rednose-tabview\": {","        \"requires\": [","            \"node\"","        ]","    },","    \"rednose-timepicker-plugin\": {","        \"requires\": [","            \"rednose-datetimepicker-base\"","        ]","    },","    \"rednose-toolbar\": {","        \"requires\": [","            \"rednose-toolbar-base\"","        ]","    },","    \"rednose-toolbar-base\": {","        \"requires\": [","            \"rednose-button-group\",","            \"base\"","        ]","    },","    \"rednose-tooltip\": {","        \"requires\": [","            \"base\",","            \"node\",","            \"anim\"","        ]","    },","    \"rednose-tree\": {","        \"use\": [","            \"rednose-tree-comparable\",","            \"rednose-tree-icon\"","        ]","    },","    \"rednose-tree-comparable\": {","        \"requires\": [","            \"tree\"","        ]","    },","    \"rednose-tree-icon\": {","        \"requires\": [","            \"tree\"","        ]","    },","    \"rednose-treeview\": {","        \"requires\": [","            \"gallery-sm-treeview-sortable\",","            \"rednose-tree\",","            \"rednose-treeview-anim\",","            \"rednose-treeview-datasource\",","            \"rednose-treeview-dd\",","            \"rednose-treeview-templates\",","            \"rednose-treeview-select\",","            \"node\"","        ],","        \"rollup\": 1,","        \"supersedes\": [","            \"gallery-sm-treeview-templates\"","        ]","    },","    \"rednose-treeview-anim\": {","        \"requires\": [","            \"rednose-anim\",","            \"transition\"","        ]","    },","    \"rednose-treeview-datasource\": {","        \"requires\": [","            \"plugin\"","        ]","    },","    \"rednose-treeview-dd\": {","        \"requires\": [","            \"dd\"","        ]","    },","    \"rednose-treeview-multi\": {","        \"requires\": [","            \"rednose-treeview\"","        ]","    },","    \"rednose-treeview-select\": {","        \"requires\": [","            \"base\",","            \"event-outside\"","        ]","    },","    \"rednose-treeview-templates\": {","        \"requires\": [","            \"template-micro\"","        ]","    },","    \"rednose-undo-manager\": {","        \"requires\": [","            \"base\"","        ]","    },","    \"rednose-util\": {","        \"requires\": [","            \"datatype-date\"","        ]","    },","    \"rednose-view-nav\": {","        \"requires\": [","            \"event-custom\",","            \"rednose-toolbar\",","            \"rednose-panel\",","            \"rednose-util\",","            \"rednose-widget-nav-container\",","            \"template-micro\",","            \"view\"","        ]","    },","    \"rednose-view-templates\": {","        \"requires\": [","            \"view\"","        ]","    },","    \"rednose-widget-nav-container\": {","        \"requires\": [","            \"widget\",","            \"widget-buttons\",","            \"widget-stdmod\"","        ]","    }","});","YUI.Env[Y.version].md5 = 'acf8181ee8c39ff51befaed73fcd6496';","","","}, '@VERSION@');","","}());"]};
}
var __cov_hJJ8aPv$d9B$FScln7nfrA = __coverage__['build/rednose-base/rednose-base.js'];
__cov_hJJ8aPv$d9B$FScln7nfrA.s['1']++;YUI.add('rednose-base',function(Y,NAME){__cov_hJJ8aPv$d9B$FScln7nfrA.f['1']++;__cov_hJJ8aPv$d9B$FScln7nfrA.s['2']++;YUI.Env[Y.version].modules=(__cov_hJJ8aPv$d9B$FScln7nfrA.b['1'][0]++,YUI.Env[Y.version].modules)||(__cov_hJJ8aPv$d9B$FScln7nfrA.b['1'][1]++,{});__cov_hJJ8aPv$d9B$FScln7nfrA.s['3']++;Y.mix(YUI.Env[Y.version].modules,{'rednose-anim':{'requires':['anim']},'rednose-app':{'use':['app-transitions','rednose-app-base','rednose-model-spinner','rednose-view-nav','rednose-view-templates']},'rednose-app-base':{'requires':['app-base','rednose-panel','rednose-util']},'rednose-breadcrumb':{'requires':['base','view']},'rednose-button':{'requires':['rednose-button-base','template','view']},'rednose-button-base':{'requires':['base']},'rednose-button-dropdown':{'requires':['rednose-button','rednose-dropdown-plugin']},'rednose-button-group':{'requires':['rednose-button-group-base']},'rednose-button-group-base':{'requires':['rednose-button']},'rednose-colorpicker':{'requires':['base','event','node','widget']},'rednose-datatable':{'requires':['datatable-base','datatable-scroll','datatable-sort','rednose-util'],'supersedes':['skin-sam-datatable-base']},'rednose-datatable-select':{'requires':['event-outside','rednose-datatable','plugin']},'rednose-datepicker-plugin':{'requires':['rednose-datetimepicker-base']},'rednose-datetimepicker':{'use':['rednose-datepicker-plugin','rednose-timepicker-plugin']},'rednose-datetimepicker-base':{'requires':['base','node','plugin','rednose-datetimepicker-base-css','rednose-jquery']},'rednose-datetimepicker-base-css':{'type':'css'},'rednose-dialog':{'use':['rednose-dialog-base','rednose-dialog-template']},'rednose-dialog-base':{'lang':['en','nl'],'requires':['base','rednose-panel','rednose-toolbar']},'rednose-dialog-template':{'requires':['template-micro','rednose-tabview']},'rednose-dropdown':{'requires':['event-outside','node','rednose-dropdown-base','template-micro','view']},'rednose-dropdown-base':{'requires':['rednose-dropdown-item']},'rednose-dropdown-delegate':{'requires':['rednose-dropdown-plugin']},'rednose-dropdown-item':{'requires':['base']},'rednose-dropdown-keys':{'requires':['rednose-dropdown','rednose-util']},'rednose-dropdown-keys-mac':{'condition':{'name':'rednose-dropdown-keys-mac','test':function(Y){__cov_hJJ8aPv$d9B$FScln7nfrA.f['2']++;__cov_hJJ8aPv$d9B$FScln7nfrA.s['4']++;return Y.UA.os==='macintosh';},'trigger':'rednose-dropdown-keys'}},'rednose-dropdown-plugin':{'requires':['rednose-dropdown','node-pluginhost','plugin']},'rednose-formatter':{},'rednose-grid':{'requires':['handlebars','model-list','rednose-grid-select','rednose-util','view']},'rednose-grid-select':{},'rednose-jquery':{},'rednose-model-spinner':{'requires':['model','rednose-app-base']},'rednose-navbar':{'use':['rednose-navbar-keys','rednose-navbar-recent']},'rednose-navbar-base':{'requires':['json','node-pluginhost','rednose-dropdown-plugin','view']},'rednose-navbar-keys':{'requires':['event-custom','rednose-dropdown-keys','rednose-navbar-base']},'rednose-navbar-recent':{'requires':['cookie','plugin','rednose-navbar-base']},'rednose-nodescroll':{'requires':['node','event','dd','anim']},'rednose-notifier':{'requires':['rednose-jquery','rednose-notifier-css']},'rednose-notifier-css':{'type':'css'},'rednose-panel':{'requires':['panel'],'supersedes':['skin-sam-widget-base','skin-sam-panel']},'rednose-ruler':{'use':['rednose-ruler-dd']},'rednose-ruler-base':{'requires':['node','event-resize','view']},'rednose-ruler-dd':{'requires':['rednose-ruler-base','resize','datatype-number']},'rednose-tabview':{'requires':['node']},'rednose-timepicker-plugin':{'requires':['rednose-datetimepicker-base']},'rednose-toolbar':{'requires':['rednose-toolbar-base']},'rednose-toolbar-base':{'requires':['rednose-button-group','base']},'rednose-tooltip':{'requires':['base','node','anim']},'rednose-tree':{'use':['rednose-tree-comparable','rednose-tree-icon']},'rednose-tree-comparable':{'requires':['tree']},'rednose-tree-icon':{'requires':['tree']},'rednose-treeview':{'requires':['gallery-sm-treeview-sortable','rednose-tree','rednose-treeview-anim','rednose-treeview-datasource','rednose-treeview-dd','rednose-treeview-templates','rednose-treeview-select','node'],'rollup':1,'supersedes':['gallery-sm-treeview-templates']},'rednose-treeview-anim':{'requires':['rednose-anim','transition']},'rednose-treeview-datasource':{'requires':['plugin']},'rednose-treeview-dd':{'requires':['dd']},'rednose-treeview-multi':{'requires':['rednose-treeview']},'rednose-treeview-select':{'requires':['base','event-outside']},'rednose-treeview-templates':{'requires':['template-micro']},'rednose-undo-manager':{'requires':['base']},'rednose-util':{'requires':['datatype-date']},'rednose-view-nav':{'requires':['event-custom','rednose-toolbar','rednose-panel','rednose-util','rednose-widget-nav-container','template-micro','view']},'rednose-view-templates':{'requires':['view']},'rednose-widget-nav-container':{'requires':['widget','widget-buttons','widget-stdmod']}});__cov_hJJ8aPv$d9B$FScln7nfrA.s['5']++;YUI.Env[Y.version].md5='acf8181ee8c39ff51befaed73fcd6496';},'@VERSION@');
