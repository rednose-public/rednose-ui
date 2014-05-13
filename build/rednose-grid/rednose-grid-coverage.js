if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-grid/rednose-grid.js']) {
   __coverage__['build/rednose-grid/rednose-grid.js'] = {"path":"build/rednose-grid/rednose-grid.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":24},"end":{"line":1,"column":43}}},"2":{"name":"(anonymous_2)","line":30,"loc":{"start":{"line":30,"column":16},"end":{"line":30,"column":28}}},"3":{"name":"(anonymous_3)","line":36,"loc":{"start":{"line":36,"column":12},"end":{"line":36,"column":24}}},"4":{"name":"(anonymous_4)","line":57,"loc":{"start":{"line":57,"column":10},"end":{"line":57,"column":22}}},"5":{"name":"(anonymous_5)","line":64,"loc":{"start":{"line":64,"column":11},"end":{"line":64,"column":23}}},"6":{"name":"(anonymous_6)","line":78,"loc":{"start":{"line":78,"column":27},"end":{"line":78,"column":38}}},"7":{"name":"(anonymous_7)","line":86,"loc":{"start":{"line":86,"column":17},"end":{"line":86,"column":30}}},"8":{"name":"(anonymous_8)","line":106,"loc":{"start":{"line":106,"column":12},"end":{"line":106,"column":24}}},"9":{"name":"(anonymous_9)","line":114,"loc":{"start":{"line":114,"column":21},"end":{"line":114,"column":38}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":146,"column":3}},"2":{"start":{"line":5,"column":0},"end":{"line":6,"column":13}},"3":{"start":{"line":8,"column":0},"end":{"line":103,"column":3}},"4":{"start":{"line":31,"column":8},"end":{"line":31,"column":33}},"5":{"start":{"line":37,"column":8},"end":{"line":38,"column":44}},"6":{"start":{"line":40,"column":8},"end":{"line":40,"column":44}},"7":{"start":{"line":42,"column":8},"end":{"line":48,"column":12}},"8":{"start":{"line":50,"column":8},"end":{"line":50,"column":54}},"9":{"start":{"line":51,"column":8},"end":{"line":51,"column":68}},"10":{"start":{"line":53,"column":8},"end":{"line":53,"column":20}},"11":{"start":{"line":58,"column":8},"end":{"line":58,"column":51}},"12":{"start":{"line":59,"column":8},"end":{"line":59,"column":38}},"13":{"start":{"line":65,"column":8},"end":{"line":68,"column":42}},"14":{"start":{"line":70,"column":8},"end":{"line":70,"column":54}},"15":{"start":{"line":72,"column":8},"end":{"line":82,"column":9}},"16":{"start":{"line":73,"column":12},"end":{"line":73,"column":71}},"17":{"start":{"line":75,"column":12},"end":{"line":75,"column":49}},"18":{"start":{"line":76,"column":12},"end":{"line":76,"column":47}},"19":{"start":{"line":78,"column":12},"end":{"line":81,"column":15}},"20":{"start":{"line":79,"column":16},"end":{"line":79,"column":74}},"21":{"start":{"line":80,"column":16},"end":{"line":80,"column":62}},"22":{"start":{"line":87,"column":8},"end":{"line":87,"column":27}},"23":{"start":{"line":89,"column":8},"end":{"line":91,"column":9}},"24":{"start":{"line":90,"column":12},"end":{"line":90,"column":25}},"25":{"start":{"line":105,"column":0},"end":{"line":130,"column":3}},"26":{"start":{"line":107,"column":8},"end":{"line":110,"column":43}},"27":{"start":{"line":112,"column":8},"end":{"line":112,"column":48}},"28":{"start":{"line":114,"column":8},"end":{"line":119,"column":11}},"29":{"start":{"line":115,"column":12},"end":{"line":115,"column":80}},"30":{"start":{"line":116,"column":12},"end":{"line":116,"column":33}},"31":{"start":{"line":118,"column":12},"end":{"line":118,"column":61}},"32":{"start":{"line":133,"column":0},"end":{"line":133,"column":35}}},"branchMap":{"1":{"line":72,"type":"if","locations":[{"start":{"line":72,"column":8},"end":{"line":72,"column":8}},{"start":{"line":72,"column":8},"end":{"line":72,"column":8}}]},"2":{"line":89,"type":"if","locations":[{"start":{"line":89,"column":8},"end":{"line":89,"column":8}},{"start":{"line":89,"column":8},"end":{"line":89,"column":8}}]}},"code":["(function () { YUI.add('rednose-grid', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","var Grid,","    GridView;","","GridView = Y.Base.create('gridView', Y.View, [], {","","    // Compile our template using Handlebars.","    template: Y.Handlebars.compile(","        '<div class=\"model-grid-container\" title=\"{{ name }}\" data-yui3-record=\"{{ clientId }}\">' +","            '<div class=\"model-grid-icon-container\">' +","                '<div class=\"model-grid-icon-wrapper\">' +","                    '{{#if thumbnail}}' +","                        '<img class=\"model-grid-icon\" alt=\"{{ name }}\" src=\"{{ thumbnail }}\" style=\"width: 110px; height: 156px;\"/>' +","                    '{{else}}' +","                        '<div class=\"model-grid-icon\"></div>' +","                    '{{/if}}' +","                '</div>' +","                '<div class=\"model-grid-footer\">' +","                    '<div class=\"model-grid-name\">{{ label }}</div>' +","                    '<input class=\"edit\" type=\"text\" value=\"{{ name }}\" style=\"visibility: hidden;\"/>' +","                    '<div class=\"model-grid-date\">{{ dateModified }}</div>' +","                '</div>' +","            '</div>' +","        '</div>'","    ),","","    destructor: function () {","        console.log('destruct!');","    },","","    // Render this view in our <li> container, and fill it with the","    // data in our Model.","    render: function () {","        var container   = this.get('container'),","            model       = this.get('model');","","        container.setStyle('float', 'left');","","        container.setHTML(this.template({","            clientId    : model.get('clientId'),","            label       : Y.Rednose.Util.formatLabel(model.get('name')),","            name        : model.get('name'),","            thumbnail   : model.get('thumbnail'),","            dateModified: model.get('date_modified')","        }));","","        this.set('inputNode', container.one('.edit'));","        this.set('footerNode', container.one('.model-grid-footer'));","","        return this;","    },","","    // Turn on editing mode for the Template name by exposing the input field.","    edit: function () {","        this.get('footerNode').addClass('editing');","        this.get('inputNode').focus();","    },","","    // Get the value from our input field while hiding it, and","    // save it to our Model (name attribute) when focus is lost from the field.","    close: function () {","        var value = this.get('inputNode').get('value'),","            self = this,","            editedValue = Y.Escape.html(Y.Lang.trim(value)),","            gridModel = this.get('model');","","        this.get('footerNode').removeClass('editing');","","        if (editedValue) {","            var label = self.get('footerNode').one('.model-grid-name');","","            label.set('innerHTML', 'Loading...');","            gridModel.set('name', editedValue);","","            gridModel.save(function() {","                self.get('inputNode').set('value', gridModel.get('name'));","                label.set('innerHTML', gridModel.get('name'));","            });","        }","    },","","    // Also allow updating the Template's name through the enter key.","    enterUpdate: function (e) {","        var ENTER_KEY = 13;","","        if (e.keyCode === ENTER_KEY) {","            this.close();","        }","    }","}, {","    ATTRS: {","        model: {","            value: []","        },","","        contextMenu: {","            value: false","        }","    }","});","","Grid = Y.Base.create('grid', Y.View, [ Y.Rednose.Grid.Selectable ], {","    render: function () {","        var container   = this.get('container'),","            contextMenu = this.get('contextMenu'),","            self        = this,","            list        = this.get('data');","","        container.addClass('rednose-grid-view');","","        Y.each(list, function (model) {","            var view = new GridView({ model: model, contextMenu: contextMenu });","            view.addTarget(this);","","            container.append(view.render().get('container'));","        });","    }","}, {","    ATTRS: {","        /**","         * The ModelList containing the models to be rendered","         */","        data: {","            value: []","        }","    }","});","","// -- Namespace ----------------------------------------------------------------","Y.namespace('Rednose').Grid = Grid;","","","}, '1.4.1', {","    \"requires\": [","        \"handlebars\",","        \"model-list\",","        \"rednose-contextmenu\",","        \"rednose-grid-select\",","        \"rednose-util\",","        \"view\"","    ],","    \"skinnable\": true","});","","}());"]};
}
var __cov_eE9nNWz5TZFiITJZvoKJCA = __coverage__['build/rednose-grid/rednose-grid.js'];
__cov_eE9nNWz5TZFiITJZvoKJCA.s['1']++;YUI.add('rednose-grid',function(Y,NAME){__cov_eE9nNWz5TZFiITJZvoKJCA.f['1']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['2']++;var Grid,GridView;__cov_eE9nNWz5TZFiITJZvoKJCA.s['3']++;GridView=Y.Base.create('gridView',Y.View,[],{template:Y.Handlebars.compile('<div class="model-grid-container" title="{{ name }}" data-yui3-record="{{ clientId }}">'+'<div class="model-grid-icon-container">'+'<div class="model-grid-icon-wrapper">'+'{{#if thumbnail}}'+'<img class="model-grid-icon" alt="{{ name }}" src="{{ thumbnail }}" style="width: 110px; height: 156px;"/>'+'{{else}}'+'<div class="model-grid-icon"></div>'+'{{/if}}'+'</div>'+'<div class="model-grid-footer">'+'<div class="model-grid-name">{{ label }}</div>'+'<input class="edit" type="text" value="{{ name }}" style="visibility: hidden;"/>'+'<div class="model-grid-date">{{ dateModified }}</div>'+'</div>'+'</div>'+'</div>'),destructor:function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['2']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['4']++;console.log('destruct!');},render:function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['3']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['5']++;var container=this.get('container'),model=this.get('model');__cov_eE9nNWz5TZFiITJZvoKJCA.s['6']++;container.setStyle('float','left');__cov_eE9nNWz5TZFiITJZvoKJCA.s['7']++;container.setHTML(this.template({clientId:model.get('clientId'),label:Y.Rednose.Util.formatLabel(model.get('name')),name:model.get('name'),thumbnail:model.get('thumbnail'),dateModified:model.get('date_modified')}));__cov_eE9nNWz5TZFiITJZvoKJCA.s['8']++;this.set('inputNode',container.one('.edit'));__cov_eE9nNWz5TZFiITJZvoKJCA.s['9']++;this.set('footerNode',container.one('.model-grid-footer'));__cov_eE9nNWz5TZFiITJZvoKJCA.s['10']++;return this;},edit:function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['4']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['11']++;this.get('footerNode').addClass('editing');__cov_eE9nNWz5TZFiITJZvoKJCA.s['12']++;this.get('inputNode').focus();},close:function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['5']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['13']++;var value=this.get('inputNode').get('value'),self=this,editedValue=Y.Escape.html(Y.Lang.trim(value)),gridModel=this.get('model');__cov_eE9nNWz5TZFiITJZvoKJCA.s['14']++;this.get('footerNode').removeClass('editing');__cov_eE9nNWz5TZFiITJZvoKJCA.s['15']++;if(editedValue){__cov_eE9nNWz5TZFiITJZvoKJCA.b['1'][0]++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['16']++;var label=self.get('footerNode').one('.model-grid-name');__cov_eE9nNWz5TZFiITJZvoKJCA.s['17']++;label.set('innerHTML','Loading...');__cov_eE9nNWz5TZFiITJZvoKJCA.s['18']++;gridModel.set('name',editedValue);__cov_eE9nNWz5TZFiITJZvoKJCA.s['19']++;gridModel.save(function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['6']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['20']++;self.get('inputNode').set('value',gridModel.get('name'));__cov_eE9nNWz5TZFiITJZvoKJCA.s['21']++;label.set('innerHTML',gridModel.get('name'));});}else{__cov_eE9nNWz5TZFiITJZvoKJCA.b['1'][1]++;}},enterUpdate:function(e){__cov_eE9nNWz5TZFiITJZvoKJCA.f['7']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['22']++;var ENTER_KEY=13;__cov_eE9nNWz5TZFiITJZvoKJCA.s['23']++;if(e.keyCode===ENTER_KEY){__cov_eE9nNWz5TZFiITJZvoKJCA.b['2'][0]++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['24']++;this.close();}else{__cov_eE9nNWz5TZFiITJZvoKJCA.b['2'][1]++;}}},{ATTRS:{model:{value:[]},contextMenu:{value:false}}});__cov_eE9nNWz5TZFiITJZvoKJCA.s['25']++;Grid=Y.Base.create('grid',Y.View,[Y.Rednose.Grid.Selectable],{render:function(){__cov_eE9nNWz5TZFiITJZvoKJCA.f['8']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['26']++;var container=this.get('container'),contextMenu=this.get('contextMenu'),self=this,list=this.get('data');__cov_eE9nNWz5TZFiITJZvoKJCA.s['27']++;container.addClass('rednose-grid-view');__cov_eE9nNWz5TZFiITJZvoKJCA.s['28']++;Y.each(list,function(model){__cov_eE9nNWz5TZFiITJZvoKJCA.f['9']++;__cov_eE9nNWz5TZFiITJZvoKJCA.s['29']++;var view=new GridView({model:model,contextMenu:contextMenu});__cov_eE9nNWz5TZFiITJZvoKJCA.s['30']++;view.addTarget(this);__cov_eE9nNWz5TZFiITJZvoKJCA.s['31']++;container.append(view.render().get('container'));});}},{ATTRS:{data:{value:[]}}});__cov_eE9nNWz5TZFiITJZvoKJCA.s['32']++;Y.namespace('Rednose').Grid=Grid;},'1.4.1',{'requires':['handlebars','model-list','rednose-contextmenu','rednose-grid-select','rednose-util','view'],'skinnable':true});
