if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-grid/rednose-grid.js']) {
   __coverage__['build/rednose-grid/rednose-grid.js'] = {"path":"build/rednose-grid/rednose-grid.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}},"2":{"name":"(anonymous_2)","line":43,"loc":{"start":{"line":43,"column":12},"end":{"line":43,"column":24}}},"3":{"name":"(anonymous_3)","line":73,"loc":{"start":{"line":73,"column":10},"end":{"line":73,"column":22}}},"4":{"name":"(anonymous_4)","line":80,"loc":{"start":{"line":80,"column":11},"end":{"line":80,"column":23}}},"5":{"name":"(anonymous_5)","line":94,"loc":{"start":{"line":94,"column":27},"end":{"line":94,"column":38}}},"6":{"name":"(anonymous_6)","line":102,"loc":{"start":{"line":102,"column":17},"end":{"line":102,"column":30}}},"7":{"name":"(anonymous_7)","line":122,"loc":{"start":{"line":122,"column":12},"end":{"line":122,"column":24}}},"8":{"name":"(anonymous_8)","line":130,"loc":{"start":{"line":130,"column":21},"end":{"line":130,"column":38}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":166,"column":3}},"2":{"start":{"line":5,"column":0},"end":{"line":6,"column":13}},"3":{"start":{"line":8,"column":0},"end":{"line":119,"column":3}},"4":{"start":{"line":44,"column":8},"end":{"line":46,"column":44}},"5":{"start":{"line":48,"column":8},"end":{"line":48,"column":44}},"6":{"start":{"line":50,"column":8},"end":{"line":56,"column":12}},"7":{"start":{"line":66,"column":8},"end":{"line":66,"column":54}},"8":{"start":{"line":67,"column":8},"end":{"line":67,"column":68}},"9":{"start":{"line":69,"column":8},"end":{"line":69,"column":20}},"10":{"start":{"line":74,"column":8},"end":{"line":74,"column":51}},"11":{"start":{"line":75,"column":8},"end":{"line":75,"column":38}},"12":{"start":{"line":81,"column":8},"end":{"line":84,"column":42}},"13":{"start":{"line":86,"column":8},"end":{"line":86,"column":54}},"14":{"start":{"line":88,"column":8},"end":{"line":98,"column":9}},"15":{"start":{"line":89,"column":12},"end":{"line":89,"column":71}},"16":{"start":{"line":91,"column":12},"end":{"line":91,"column":49}},"17":{"start":{"line":92,"column":12},"end":{"line":92,"column":47}},"18":{"start":{"line":94,"column":12},"end":{"line":97,"column":15}},"19":{"start":{"line":95,"column":16},"end":{"line":95,"column":74}},"20":{"start":{"line":96,"column":16},"end":{"line":96,"column":62}},"21":{"start":{"line":103,"column":8},"end":{"line":103,"column":27}},"22":{"start":{"line":105,"column":8},"end":{"line":107,"column":9}},"23":{"start":{"line":106,"column":12},"end":{"line":106,"column":25}},"24":{"start":{"line":121,"column":0},"end":{"line":150,"column":3}},"25":{"start":{"line":123,"column":8},"end":{"line":126,"column":43}},"26":{"start":{"line":128,"column":8},"end":{"line":128,"column":48}},"27":{"start":{"line":130,"column":8},"end":{"line":135,"column":11}},"28":{"start":{"line":131,"column":12},"end":{"line":131,"column":80}},"29":{"start":{"line":132,"column":12},"end":{"line":132,"column":33}},"30":{"start":{"line":134,"column":12},"end":{"line":134,"column":61}},"31":{"start":{"line":153,"column":0},"end":{"line":153,"column":35}}},"branchMap":{"1":{"line":88,"type":"if","locations":[{"start":{"line":88,"column":8},"end":{"line":88,"column":8}},{"start":{"line":88,"column":8},"end":{"line":88,"column":8}}]},"2":{"line":105,"type":"if","locations":[{"start":{"line":105,"column":8},"end":{"line":105,"column":8}},{"start":{"line":105,"column":8},"end":{"line":105,"column":8}}]}},"code":["(function () { YUI.add('rednose-grid', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","var Grid,","    GridView;","","GridView = Y.Base.create('gridView', Y.View, [], {","","    // Compile our template using Handlebars.","    template: Y.Handlebars.compile(","        '<div class=\"model-grid-container\" title=\"{{ name }}\" data-yui3-record=\"{{ clientId }}\">' +","            '<div class=\"model-grid-icon-container\">' +","                '<div class=\"model-grid-icon-wrapper\">' +","                    '{{#if thumbnail}}' +","                        '<img class=\"model-grid-icon\" alt=\"{{ name }}\" src=\"{{ thumbnail }}\" style=\"width: 110px; height: 156px;\"/>' +","                    '{{else}}' +","                        '<div class=\"model-grid-icon\"></div>' +","                    '{{/if}}' +","                '</div>' +","                '<div class=\"model-grid-footer\">' +","                    '<div class=\"model-grid-name\">{{ label }}</div>' +","                    '<input class=\"edit\" type=\"text\" value=\"{{ name }}\" style=\"visibility: hidden;\"/>' +","                    '<div class=\"model-grid-date\">{{ dateModified }}</div>' +","                '</div>' +","            '</div>' +","        '</div>'","    ),","","    // FIXME","    // events: {","    //     '.model-grid-name': {","    //         click: 'edit'","    //     },","    //     '.edit': {","    //         blur: 'close',","    //         keypress: 'enterUpdate'","    //     }","    // },","","    // Render this view in our <li> container, and fill it with the","    // data in our Model.","    render: function () {","        var container   = this.get('container'),","//            contextMenu = this.get('contextMenu'),","            model       = this.get('model');","","        container.setStyle('float', 'left');","","        container.setHTML(this.template({","            clientId    : model.get('clientId'),","            label       : Y.Rednose.Util.formatLabel(model.get('name')),","            name        : model.get('name'),","            thumbnail   : model.get('thumbnail'),","            dateModified: Y.Rednose.Util.formatDateTime(Y.Date.parse(model.get('date_modified')))","        }));","","        // if (contextMenu !== false) {","        //     container.one('.model-grid-icon-container').plug(Y.Rednose.ContextMenu, {","        //         content: contextMenu,","        //         data: model,","        //         bubbleTarget: this","        //     });","        // }","","        this.set('inputNode', container.one('.edit'));","        this.set('footerNode', container.one('.model-grid-footer'));","","        return this;","    },","","    // Turn on editing mode for the Template name by exposing the input field.","    edit: function () {","        this.get('footerNode').addClass('editing');","        this.get('inputNode').focus();","    },","","    // Get the value from our input field while hiding it, and","    // save it to our Model (name attribute) when focus is lost from the field.","    close: function () {","        var value = this.get('inputNode').get('value'),","            self = this,","            editedValue = Y.Escape.html(Y.Lang.trim(value)),","            gridModel = this.get('model');","","        this.get('footerNode').removeClass('editing');","","        if (editedValue) {","            var label = self.get('footerNode').one('.model-grid-name');","","            label.set('innerHTML', 'Loading...');","            gridModel.set('name', editedValue);","","            gridModel.save(function() {","                self.get('inputNode').set('value', gridModel.get('name'));","                label.set('innerHTML', gridModel.get('name'));","            });","        }","    },","","    // Also allow updating the Template's name through the enter key.","    enterUpdate: function (e) {","        var ENTER_KEY = 13;","","        if (e.keyCode === ENTER_KEY) {","            this.close();","        }","    }","}, {","    ATTRS: {","        model: {","            value: []","        },","","        contextMenu: {","            value: false","        }","    }","});","","Grid = Y.Base.create('grid', Y.View, [ Y.Rednose.Grid.Selectable ], {","    render: function () {","        var container   = this.get('container'),","            contextMenu = this.get('contextMenu'),","            self        = this,","            list        = this.get('data');","","        container.addClass('rednose-grid-view');","","        Y.each(list, function (model) {","            var view = new GridView({ model: model, contextMenu: contextMenu });","            view.addTarget(this);","","            container.append(view.render().get('container'));","        });","    }","}, {","    ATTRS: {","        /**","         * The ModelList containing the models to be rendered","         */","        data: {","            value: []","        },","","        contextMenu: {","            value: false","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Grid = Grid;","","","}, '1.1.0-DEV', {","    \"requires\": [","        \"handlebars\",","        \"model-list\",","        \"rednose-contextmenu\",","        \"rednose-grid-select\",","        \"rednose-util\",","        \"view\"","    ],","    \"skinnable\": true","});","","}());"]};
}
var __cov_eE9nNWz5TZFiITJZvoKJCA = __coverage__['build/rednose-grid/rednose-grid.js'];
__cov_eE9nNWz5TZFiITJZvoKJCA.s['1']++;YUI.add('rednose-grid',function(Y,NAME){__cov_eE9nNWz5TZFiITJZvoKJCA.f['1']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['2']++;var Grid,GridView;__cov_eE9nNWz5TZFiITJZvoKJCA.s['3']++;GridView=Y.Base.create('gridView',Y.View,[],{template:Y.Handlebars.compile('<div class="model-grid-container" title="{{ name }}" data-yui3-record="{{ clientId }}">'+'<div class="model-grid-icon-container">'+'<div class="model-grid-icon-wrapper">'+'{{#if thumbnail}}'+'<img class="model-grid-icon" alt="{{ name }}" src="{{ thumbnail }}" style="width: 110px; height: 156px;"/>'+'{{else}}'+'<div class="model-grid-icon"></div>'+'{{/if}}'+'</div>'+'<div class="model-grid-footer">'+'<div class="model-grid-name">{{ label }}</div>'+'<input class="edit" type="text" value="{{ name }}" style="visibility: hidden;"/>'+'<div class="model-grid-date">{{ dateModified }}</div>'+'</div>'+'</div>'+'</div>'),render:function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['2']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['4']++;var container=this.get('container'),model=this.get('model');__cov_eE9nNWz5TZFiITJZvoKJCA.s['5']++;container.setStyle('float','left');__cov_eE9nNWz5TZFiITJZvoKJCA.s['6']++;container.setHTML(this.template({clientId:model.get('clientId'),label:Y.Rednose.Util.formatLabel(model.get('name')),name:model.get('name'),thumbnail:model.get('thumbnail'),dateModified:Y.Rednose.Util.formatDateTime(Y.Date.parse(model.get('date_modified')))}));__cov_eE9nNWz5TZFiITJZvoKJCA.s['7']++;this.set('inputNode',container.one('.edit'));__cov_eE9nNWz5TZFiITJZvoKJCA.s['8']++;this.set('footerNode',container.one('.model-grid-footer'));__cov_eE9nNWz5TZFiITJZvoKJCA.s['9']++;return this;},edit:function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['3']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['10']++;this.get('footerNode').addClass('editing');__cov_eE9nNWz5TZFiITJZvoKJCA.s['11']++;this.get('inputNode').focus();},close:function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['4']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['12']++;var value=this.get('inputNode').get('value'),self=this,editedValue=Y.Escape.html(Y.Lang.trim(value)),gridModel=this.get('model');__cov_eE9nNWz5TZFiITJZvoKJCA.s['13']++;this.get('footerNode').removeClass('editing');__cov_eE9nNWz5TZFiITJZvoKJCA.s['14']++;if(editedValue){__cov_eE9nNWz5TZFiITJZvoKJCA.b['1'][0]++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['15']++;var label=self.get('footerNode').one('.model-grid-name');__cov_eE9nNWz5TZFiITJZvoKJCA.s['16']++;label.set('innerHTML','Loading...');__cov_eE9nNWz5TZFiITJZvoKJCA.s['17']++;gridModel.set('name',editedValue);__cov_eE9nNWz5TZFiITJZvoKJCA.s['18']++;gridModel.save(function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['5']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['19']++;self.get('inputNode').set('value',gridModel.get('name'));__cov_eE9nNWz5TZFiITJZvoKJCA.s['20']++;label.set('innerHTML',gridModel.get('name'));});}else{__cov_eE9nNWz5TZFiITJZvoKJCA.b['1'][1]++;}},enterUpdate:function(e){__cov_eE9nNWz5TZFiITJZvoKJCA.f['6']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['21']++;var ENTER_KEY=13;__cov_eE9nNWz5TZFiITJZvoKJCA.s['22']++;if(e.keyCode===ENTER_KEY){__cov_eE9nNWz5TZFiITJZvoKJCA.b['2'][0]++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['23']++;this.close();}else{__cov_eE9nNWz5TZFiITJZvoKJCA.b['2'][1]++;}}},{ATTRS:{model:{value:[]},contextMenu:{value:false}}});__cov_eE9nNWz5TZFiITJZvoKJCA.s['24']++;Grid=Y.Base.create('grid',Y.View,[Y.Rednose.Grid.Selectable],{render:function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['7']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['25']++;var container=this.get('container'),contextMenu=this.get('contextMenu'),self=this,list=this.get('data');__cov_eE9nNWz5TZFiITJZvoKJCA.s['26']++;container.addClass('rednose-grid-view');__cov_eE9nNWz5TZFiITJZvoKJCA.s['27']++;Y.each(list,function(model){__cov_eE9nNWz5TZFiITJZvoKJCA.f['8']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['28']++;var view=new GridView({model:model,contextMenu:contextMenu});__cov_eE9nNWz5TZFiITJZvoKJCA.s['29']++;view.addTarget(this);__cov_eE9nNWz5TZFiITJZvoKJCA.s['30']++;container.append(view.render().get('container'));});}},{ATTRS:{data:{value:[]},contextMenu:{value:false}}});__cov_eE9nNWz5TZFiITJZvoKJCA.s['31']++;Y.namespace('Rednose').Grid=Grid;},'1.1.0-DEV',{'requires':['handlebars','model-list','rednose-contextmenu','rednose-grid-select','rednose-util','view'],'skinnable':true});
