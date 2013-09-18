if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/loader-rednose/loader-rednose.js']) {
   __coverage__['build/loader-rednose/loader-rednose.js'] = {"path":"build/loader-rednose/loader-rednose.js","s":{"1":0,"2":0,"3":0,"4":0},"b":{"1":[0,0]},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":26},"end":{"line":1,"column":45}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":285,"column":16}},"2":{"start":{"line":12,"column":0},"end":{"line":12,"column":62}},"3":{"start":{"line":13,"column":0},"end":{"line":281,"column":3}},"4":{"start":{"line":282,"column":0},"end":{"line":282,"column":60}}},"branchMap":{"1":{"line":12,"type":"binary-expr","locations":[{"start":{"line":12,"column":29},"end":{"line":12,"column":55}},{"start":{"line":12,"column":59},"end":{"line":12,"column":61}}]}},"code":["(function () { YUI.add('loader-rednose', function (Y, NAME) {","","/* This file is auto-generated by (yogi loader --yes --mix --start ../) */","","/*jshint maxlen:900, eqeqeq: false */","","/**"," * YUI 3 module metadata"," * @module loader"," * @submodule loader-yui3"," */","YUI.Env[Y.version].modules = YUI.Env[Y.version].modules || {};","Y.mix(YUI.Env[Y.version].modules, {","    \"rednose-anim\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"anim\"","        ]","    },","    \"rednose-app\": {","        \"use\": [","            \"rednose-app-base\",","            \"rednose-model-undo\",","            \"rednose-model-spinner\",","            \"rednose-view-nav\"","        ]","    },","    \"rednose-app-base\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"app-base\",","            \"cssgrids\",","            \"event-custom\",","            \"handlebars-base\",","            \"rednose-app-templates\",","            \"rednose-panel\"","        ],","        \"skinnable\": true","    },","    \"rednose-breadcrumb\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\",","            \"view\"","        ]","    },","    \"rednose-contextmenu\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\",","            \"panel\",","            \"plugin\",","            \"widget\",","            \"overlay\"","        ]","    },","    \"rednose-controlform\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"calendar\",","            \"dd-proxy\",","            \"dd-constrain\",","            \"node\",","            \"model-list\",","            \"model\",","            \"base\",","            \"rednose-dialog\",","            \"rednose-contextmenu\"","        ]","    },","    \"rednose-css\": {","        \"group\": \"rednose-ui\",","        \"type\": \"css\"","    },","    \"rednose-datatable\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"datatable-base\",","            \"datatable-scroll\",","            \"datatable-sort\"","        ],","        \"skinnable\": true,","        \"supersedes\": [","            \"skin-sam-datatable-base\"","        ]","    },","    \"rednose-datatable-select\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-datatable\",","            \"plugin\"","        ]","    },","    \"rednose-dd\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-anim\",","            \"rednose-dd-css\",","            \"view\"","        ]","    },","    \"rednose-dd-css\": {","        \"group\": \"rednose-ui\",","        \"type\": \"css\"","    },","    \"rednose-dialog\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"dd\",","            \"dd-plugin\",","            \"json-parse\",","            \"rednose-css\",","            \"rednose-panel\",","            \"node\",","            \"node-event-simulate\",","            \"widget\"","        ],","        \"skinnable\": true","    },","    \"rednose-dropdown\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\",","            \"rednose-css\",","            \"node\",","            \"gallery-bootstrap-dropdown\"","        ]","    },","    \"rednose-grid\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"handlebars\",","            \"rednose-grid-select\",","            \"rednose-contextmenu\",","            \"model-list\",","            \"view\"","        ],","        \"skinnable\": true","    },","    \"rednose-grid-select\": {","        \"group\": \"rednose-ui\"","    },","    \"rednose-jquery\": {","        \"group\": \"rednose-ui\"","    },","    \"rednose-model-spinner\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-app-base\",","            \"model\"","        ]","    },","    \"rednose-model-tree\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"model\",","            \"io\"","        ]","    },","    \"rednose-model-undo\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"model\"","        ]","    },","    \"rednose-navbar\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"base\",","            \"node-pluginhost\",","            \"gallery-bootstrap-dropdown\",","            \"handlebars\",","            \"widget\"","        ],","        \"skinnable\": true","    },","    \"rednose-navbar-recent\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"cookie\",","            \"plugin\",","            \"rednose-navbar\"","        ]","    },","    \"rednose-nodescroll\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"node\",","            \"event\",","            \"dd\",","            \"anim\"","        ]","    },","    \"rednose-notifier\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-jquery\",","            \"rednose-notifier-css\"","        ]","    },","    \"rednose-notifier-css\": {","        \"group\": \"rednose-ui\",","        \"type\": \"css\"","    },","    \"rednose-panel\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"panel\"","        ],","        \"supersedes\": [","            \"skin-sam-widget-base\",","            \"skin-sam-panel\"","        ]","    },","    \"rednose-tooltip\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"gallery-bootstrap-tooltip\"","        ]","    },","    \"rednose-treeview\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"gallery-sm-treeview\",","            \"rednose-model-tree\",","            \"rednose-treeview-anim\",","            \"rednose-treeview-dd\",","            \"rednose-treeview-templates\",","            \"rednose-treeview-select\",","            \"node\"","        ],","        \"rollup\": 1,","        \"skinnable\": true,","        \"supersedes\": [","            \"gallery-sm-treeview-templates\"","        ]","    },","    \"rednose-treeview-anim\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-anim\",","            \"rednose-treeview\",","            \"transition\"","        ]","    },","    \"rednose-treeview-dd\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-dd\",","            \"rednose-treeview\"","        ]","    },","    \"rednose-treeview-select\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"rednose-treeview\"","        ]","    },","    \"rednose-treeview-templates\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"template-micro\"","        ]","    },","    \"rednose-view-nav\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"event-custom\",","            \"rednose-widget-nav-container\",","            \"view\"","        ]","    },","    \"rednose-widget-nav-container\": {","        \"group\": \"rednose-ui\",","        \"requires\": [","            \"widget\",","            \"widget-buttons\",","            \"widget-stdmod\"","        ]","    }","});","YUI.Env[Y.version].md5 = '95908884d0390ab8c9a0da1e85dcfcdd';","","","}, '1.1.0-DEV');","","}());"]};
}
var __cov_04DBruJ95wnBWr7_wv9udw = __coverage__['build/loader-rednose/loader-rednose.js'];
__cov_04DBruJ95wnBWr7_wv9udw.s['1']++;YUI.add('loader-rednose',function(Y,NAME){__cov_04DBruJ95wnBWr7_wv9udw.f['1']++;__cov_04DBruJ95wnBWr7_wv9udw.s['2']++;YUI.Env[Y.version].modules=(__cov_04DBruJ95wnBWr7_wv9udw.b['1'][0]++,YUI.Env[Y.version].modules)||(__cov_04DBruJ95wnBWr7_wv9udw.b['1'][1]++,{});__cov_04DBruJ95wnBWr7_wv9udw.s['3']++;Y.mix(YUI.Env[Y.version].modules,{'rednose-anim':{'group':'rednose-ui','requires':['anim']},'rednose-app':{'use':['rednose-app-base','rednose-model-undo','rednose-model-spinner','rednose-view-nav']},'rednose-app-base':{'group':'rednose-ui','requires':['app-base','cssgrids','event-custom','handlebars-base','rednose-app-templates','rednose-panel'],'skinnable':true},'rednose-breadcrumb':{'group':'rednose-ui','requires':['base','view']},'rednose-contextmenu':{'group':'rednose-ui','requires':['base','panel','plugin','widget','overlay']},'rednose-controlform':{'group':'rednose-ui','requires':['calendar','dd-proxy','dd-constrain','node','model-list','model','base','rednose-dialog','rednose-contextmenu']},'rednose-css':{'group':'rednose-ui','type':'css'},'rednose-datatable':{'group':'rednose-ui','requires':['datatable-base','datatable-scroll','datatable-sort'],'skinnable':true,'supersedes':['skin-sam-datatable-base']},'rednose-datatable-select':{'group':'rednose-ui','requires':['rednose-datatable','plugin']},'rednose-dd':{'group':'rednose-ui','requires':['rednose-anim','rednose-dd-css','view']},'rednose-dd-css':{'group':'rednose-ui','type':'css'},'rednose-dialog':{'group':'rednose-ui','requires':['dd','dd-plugin','json-parse','rednose-css','rednose-panel','node','node-event-simulate','widget'],'skinnable':true},'rednose-dropdown':{'group':'rednose-ui','requires':['base','rednose-css','node','gallery-bootstrap-dropdown']},'rednose-grid':{'group':'rednose-ui','requires':['handlebars','rednose-grid-select','rednose-contextmenu','model-list','view'],'skinnable':true},'rednose-grid-select':{'group':'rednose-ui'},'rednose-jquery':{'group':'rednose-ui'},'rednose-model-spinner':{'group':'rednose-ui','requires':['rednose-app-base','model']},'rednose-model-tree':{'group':'rednose-ui','requires':['model','io']},'rednose-model-undo':{'group':'rednose-ui','requires':['model']},'rednose-navbar':{'group':'rednose-ui','requires':['base','node-pluginhost','gallery-bootstrap-dropdown','handlebars','widget'],'skinnable':true},'rednose-navbar-recent':{'group':'rednose-ui','requires':['cookie','plugin','rednose-navbar']},'rednose-nodescroll':{'group':'rednose-ui','requires':['node','event','dd','anim']},'rednose-notifier':{'group':'rednose-ui','requires':['rednose-jquery','rednose-notifier-css']},'rednose-notifier-css':{'group':'rednose-ui','type':'css'},'rednose-panel':{'group':'rednose-ui','requires':['panel'],'supersedes':['skin-sam-widget-base','skin-sam-panel']},'rednose-tooltip':{'group':'rednose-ui','requires':['gallery-bootstrap-tooltip']},'rednose-treeview':{'group':'rednose-ui','requires':['gallery-sm-treeview','rednose-model-tree','rednose-treeview-anim','rednose-treeview-dd','rednose-treeview-templates','rednose-treeview-select','node'],'rollup':1,'skinnable':true,'supersedes':['gallery-sm-treeview-templates']},'rednose-treeview-anim':{'group':'rednose-ui','requires':['rednose-anim','rednose-treeview','transition']},'rednose-treeview-dd':{'group':'rednose-ui','requires':['rednose-dd','rednose-treeview']},'rednose-treeview-select':{'group':'rednose-ui','requires':['rednose-treeview']},'rednose-treeview-templates':{'group':'rednose-ui','requires':['template-micro']},'rednose-view-nav':{'group':'rednose-ui','requires':['event-custom','rednose-widget-nav-container','view']},'rednose-widget-nav-container':{'group':'rednose-ui','requires':['widget','widget-buttons','widget-stdmod']}});__cov_04DBruJ95wnBWr7_wv9udw.s['4']++;YUI.Env[Y.version].md5='95908884d0390ab8c9a0da1e85dcfcdd';},'1.1.0-DEV');
