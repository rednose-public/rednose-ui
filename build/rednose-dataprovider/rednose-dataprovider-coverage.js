if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-dataprovider/rednose-dataprovider.js']) {
   __coverage__['build/rednose-dataprovider/rednose-dataprovider.js'] = {"path":"build/rednose-dataprovider/rednose-dataprovider.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0,"33":0,"34":0,"35":0,"36":0,"37":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":32},"end":{"line":1,"column":51}}},"2":{"name":"(anonymous_2)","line":63,"loc":{"start":{"line":63,"column":17},"end":{"line":63,"column":28}}},"3":{"name":"(anonymous_3)","line":72,"loc":{"start":{"line":72,"column":31},"end":{"line":72,"column":52}}},"4":{"name":"(anonymous_4)","line":73,"loc":{"start":{"line":73,"column":36},"end":{"line":73,"column":54}}},"5":{"name":"(anonymous_5)","line":86,"loc":{"start":{"line":86,"column":58},"end":{"line":86,"column":70}}},"6":{"name":"(anonymous_6)","line":107,"loc":{"start":{"line":107,"column":32},"end":{"line":107,"column":45}}},"7":{"name":"(anonymous_7)","line":113,"loc":{"start":{"line":113,"column":12},"end":{"line":113,"column":25}}},"8":{"name":"(anonymous_8)","line":121,"loc":{"start":{"line":121,"column":12},"end":{"line":121,"column":25}}},"9":{"name":"(anonymous_9)","line":128,"loc":{"start":{"line":128,"column":24},"end":{"line":128,"column":37}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":169,"column":3}},"2":{"start":{"line":5,"column":0},"end":{"line":5,"column":53}},"3":{"start":{"line":7,"column":0},"end":{"line":11,"column":3}},"4":{"start":{"line":13,"column":0},"end":{"line":20,"column":3}},"5":{"start":{"line":22,"column":0},"end":{"line":29,"column":3}},"6":{"start":{"line":31,"column":0},"end":{"line":33,"column":3}},"7":{"start":{"line":35,"column":0},"end":{"line":35,"column":61}},"8":{"start":{"line":36,"column":0},"end":{"line":36,"column":61}},"9":{"start":{"line":37,"column":0},"end":{"line":37,"column":66}},"10":{"start":{"line":38,"column":0},"end":{"line":38,"column":17}},"11":{"start":{"line":40,"column":0},"end":{"line":152,"column":3}},"12":{"start":{"line":64,"column":8},"end":{"line":70,"column":54}},"13":{"start":{"line":72,"column":8},"end":{"line":83,"column":10}},"14":{"start":{"line":73,"column":12},"end":{"line":82,"column":15}},"15":{"start":{"line":74,"column":16},"end":{"line":81,"column":18}},"16":{"start":{"line":85,"column":8},"end":{"line":85,"column":106}},"17":{"start":{"line":86,"column":8},"end":{"line":88,"column":11}},"18":{"start":{"line":87,"column":12},"end":{"line":87,"column":39}},"19":{"start":{"line":90,"column":8},"end":{"line":93,"column":45}},"20":{"start":{"line":95,"column":8},"end":{"line":105,"column":11}},"21":{"start":{"line":107,"column":8},"end":{"line":109,"column":11}},"22":{"start":{"line":108,"column":12},"end":{"line":108,"column":44}},"23":{"start":{"line":111,"column":8},"end":{"line":117,"column":10}},"24":{"start":{"line":114,"column":16},"end":{"line":114,"column":87}},"25":{"start":{"line":115,"column":16},"end":{"line":115,"column":72}},"26":{"start":{"line":119,"column":8},"end":{"line":125,"column":10}},"27":{"start":{"line":122,"column":16},"end":{"line":122,"column":90}},"28":{"start":{"line":123,"column":16},"end":{"line":123,"column":89}},"29":{"start":{"line":129,"column":8},"end":{"line":129,"column":25}},"30":{"start":{"line":131,"column":8},"end":{"line":131,"column":28}},"31":{"start":{"line":133,"column":8},"end":{"line":142,"column":9}},"32":{"start":{"line":134,"column":12},"end":{"line":134,"column":22}},"33":{"start":{"line":136,"column":12},"end":{"line":138,"column":13}},"34":{"start":{"line":137,"column":16},"end":{"line":137,"column":33}},"35":{"start":{"line":140,"column":12},"end":{"line":140,"column":29}},"36":{"start":{"line":141,"column":12},"end":{"line":141,"column":22}},"37":{"start":{"line":154,"column":0},"end":{"line":154,"column":51}}},"branchMap":{"1":{"line":133,"type":"if","locations":[{"start":{"line":133,"column":8},"end":{"line":133,"column":8}},{"start":{"line":133,"column":8},"end":{"line":133,"column":8}}]},"2":{"line":136,"type":"if","locations":[{"start":{"line":136,"column":12},"end":{"line":136,"column":12}},{"start":{"line":136,"column":12},"end":{"line":136,"column":12}}]}},"code":["(function () { YUI.add('rednose-dataprovider', function (Y, NAME) {","","/*jshint boss:true, expr:true, onevar:false */","","var DataSource, PdoSource, XmlSource, DataSourceList;","","DataSource = Y.Base.create('dataSource', Y.Model, [], {}, {","    ATTRS: {","        name    : { value: null },","    }","});","","PdoSource = Y.Base.create('pdoSource', DataSource, [], {}, {","    ATTRS: {","        dsn     : { value: null },","        username: { value: null },","        password: { value: null },","        table   : { value: null }","    }","});","","XmlSource = Y.Base.create('xmlSource', DataSource, [], {}, {","    ATTRS: {","        xsd     : { value: null },","        xslt    : { value: null },","        xml     : { value: null },","        root    : { value: null }","    }","});","","DataSourceList = Y.Base.create('dataSourceList', Y.ModelList, [], {","    model: DataSource","});","","Y.namespace('Rednose.DataSource').PdoSource      = PdoSource;","Y.namespace('Rednose.DataSource').XmlSource      = XmlSource;","Y.namespace('Rednose.DataSource').DataSourceList = DataSourceList;","var DataProvider;","","DataProvider = Y.Base.create('dataProvider', Y.Widget, [], {","    ac: null,","","    template:","        '<div class=\"dataprovider-form\">' +","            '<div class=\"input-append\">' +","                '<input type=\"text\" class=\"dataprovider-search\" placeholder=\"{placeholder}\" />' +","                '<button class=\"btn btn dataprovider-button\" type=\"button\">{caption}</button>' +","            '</div>' +","            '<div class=\"ac\"></div>' +","        '</div>',","","    formatterTemplate:","            '<div class=\"entry\">' +","                '<div class=\"hd\">' +","                    '<img src=\"{img}\" class=\"photo\" />' +","                '</div>' +","                '<div class=\"bd\">' +","                    '<div class=\"autocomplete-title\">{title}</div>' +","                    '<div class=\"autocomplete-subtitle\">{subtitle}</div>' +","                '</div>' +","            '</div>',","","    initializer: function() {","        var self          = this,","            container     = this.get('contentBox'),","            route         = 'rednose_dataprovider_data_list',","            id            = this.get('dataProviderId'),","            parameterBag  = this.get('parameterBag'),","            placeHolder   = this.get('placeholder'),","            buttonCaption = this.get('buttonCaption');","","        var defaultFormatter = function(query, raw) {","            return Y.Array.map(raw, function (result) {","                return Y.Lang.sub(","                    self.formatterTemplate,","                    {","                        img     : result.raw.img,","                        title   : result.highlighted,","                        subtitle: result.raw.subtitle","                    }","                );","            });","        };","","        container.append(Y.Lang.sub(this.template, { placeholder: placeHolder, caption: buttonCaption }));","        container.one('.dataprovider-button').on('click', function(e) {","            self._handleComboButton(e);","        });","","        route =","            Routing.generate(route) + '?id=' + id +","            '&parameterbag=' + Y.JSON.stringify(parameterBag) +","            '&q={query}&callback={callback}';","","        this.ac = new Y.AutoCompleteList({","            inputNode        : container.one('.dataprovider-search'),","            resultFormatter  : defaultFormatter,","            minQueryLength   : 0,","            maxResults       : 0,","            resultHighlighter: 'phraseMatch',","            resultListLocator: 'results',","            resultTextLocator: this.get('display_handle'),","            source           : route,","            render           : container.one('.ac')","        });","","        this.ac.after('select', function (e) {","            self.fire('selected', e.result);","        });","","        this.ac.on(","            \"query\",","            function (e) {","                container.one('.dataprovider-button').addClass('dataprovider-spinner');","                container.one('.dataprovider-button').setHTML('&nbsp;');","            }","        );","","        this.ac.after(","            \"results\",","            function (e) {","                container.one('.dataprovider-button').removeClass('dataprovider-spinner');","                container.one('.dataprovider-button').setHTML(self.get('buttonCaption'));","            }","        );","    },","","    _handleComboButton: function (e) {","        var ac = this.ac;","","        e.stopPropagation();","","        if (ac.get('visible')) {","            ac.hide();","        } else {","            if (ac.get('results').length === 0) {","                ac.fire('query');","            }","","            ac.sendRequest();","            ac.show();","        }","    },","}, {","    ATTRS: {","        placeholder: { value: 'Type here to search…' },","        buttonCaption: { value: '…' },","        parameterBag: { value: {} },","        dataProviderId: { value: 'unknown.id' },","        display_handle: { value: 'display_name' },","    }","});","","Y.namespace('Rednose').DataProvider = DataProvider;","","","}, '1.1.0-DEV', {","    \"requires\": [","        \"autocomplete\",","        \"autocomplete-filters\",","        \"autocomplete-highlighters\",","        \"base\",","        \"json\",","        \"model\",","        \"model-list\",","        \"widget\"","    ],","    \"skinnable\": true","});","","}());"]};
}
var __cov_til7agqktOfSE9WGDZUJbA = __coverage__['build/rednose-dataprovider/rednose-dataprovider.js'];
__cov_til7agqktOfSE9WGDZUJbA.s['1']++;YUI.add('rednose-dataprovider',function(Y,NAME){__cov_til7agqktOfSE9WGDZUJbA.f['1']++;__cov_til7agqktOfSE9WGDZUJbA.s['2']++;var DataSource,PdoSource,XmlSource,DataSourceList;__cov_til7agqktOfSE9WGDZUJbA.s['3']++;DataSource=Y.Base.create('dataSource',Y.Model,[],{},{ATTRS:{name:{value:null}}});__cov_til7agqktOfSE9WGDZUJbA.s['4']++;PdoSource=Y.Base.create('pdoSource',DataSource,[],{},{ATTRS:{dsn:{value:null},username:{value:null},password:{value:null},table:{value:null}}});__cov_til7agqktOfSE9WGDZUJbA.s['5']++;XmlSource=Y.Base.create('xmlSource',DataSource,[],{},{ATTRS:{xsd:{value:null},xslt:{value:null},xml:{value:null},root:{value:null}}});__cov_til7agqktOfSE9WGDZUJbA.s['6']++;DataSourceList=Y.Base.create('dataSourceList',Y.ModelList,[],{model:DataSource});__cov_til7agqktOfSE9WGDZUJbA.s['7']++;Y.namespace('Rednose.DataSource').PdoSource=PdoSource;__cov_til7agqktOfSE9WGDZUJbA.s['8']++;Y.namespace('Rednose.DataSource').XmlSource=XmlSource;__cov_til7agqktOfSE9WGDZUJbA.s['9']++;Y.namespace('Rednose.DataSource').DataSourceList=DataSourceList;__cov_til7agqktOfSE9WGDZUJbA.s['10']++;var DataProvider;__cov_til7agqktOfSE9WGDZUJbA.s['11']++;DataProvider=Y.Base.create('dataProvider',Y.Widget,[],{ac:null,template:'<div class="dataprovider-form">'+'<div class="input-append">'+'<input type="text" class="dataprovider-search" placeholder="{placeholder}" />'+'<button class="btn btn dataprovider-button" type="button">{caption}</button>'+'</div>'+'<div class="ac"></div>'+'</div>',formatterTemplate:'<div class="entry">'+'<div class="hd">'+'<img src="{img}" class="photo" />'+'</div>'+'<div class="bd">'+'<div class="autocomplete-title">{title}</div>'+'<div class="autocomplete-subtitle">{subtitle}</div>'+'</div>'+'</div>',initializer:function(){__cov_til7agqktOfSE9WGDZUJbA.f['2']++;__cov_til7agqktOfSE9WGDZUJbA.s['12']++;var self=this,container=this.get('contentBox'),route='rednose_dataprovider_data_list',id=this.get('dataProviderId'),parameterBag=this.get('parameterBag'),placeHolder=this.get('placeholder'),buttonCaption=this.get('buttonCaption');__cov_til7agqktOfSE9WGDZUJbA.s['13']++;var defaultFormatter=function(query,raw){__cov_til7agqktOfSE9WGDZUJbA.f['3']++;__cov_til7agqktOfSE9WGDZUJbA.s['14']++;return Y.Array.map(raw,function(result){__cov_til7agqktOfSE9WGDZUJbA.f['4']++;__cov_til7agqktOfSE9WGDZUJbA.s['15']++;return Y.Lang.sub(self.formatterTemplate,{img:result.raw.img,title:result.highlighted,subtitle:result.raw.subtitle});});};__cov_til7agqktOfSE9WGDZUJbA.s['16']++;container.append(Y.Lang.sub(this.template,{placeholder:placeHolder,caption:buttonCaption}));__cov_til7agqktOfSE9WGDZUJbA.s['17']++;container.one('.dataprovider-button').on('click',function(e){__cov_til7agqktOfSE9WGDZUJbA.f['5']++;__cov_til7agqktOfSE9WGDZUJbA.s['18']++;self._handleComboButton(e);});__cov_til7agqktOfSE9WGDZUJbA.s['19']++;route=Routing.generate(route)+'?id='+id+'&parameterbag='+Y.JSON.stringify(parameterBag)+'&q={query}&callback={callback}';__cov_til7agqktOfSE9WGDZUJbA.s['20']++;this.ac=new Y.AutoCompleteList({inputNode:container.one('.dataprovider-search'),resultFormatter:defaultFormatter,minQueryLength:0,maxResults:0,resultHighlighter:'phraseMatch',resultListLocator:'results',resultTextLocator:this.get('display_handle'),source:route,render:container.one('.ac')});__cov_til7agqktOfSE9WGDZUJbA.s['21']++;this.ac.after('select',function(e){__cov_til7agqktOfSE9WGDZUJbA.f['6']++;__cov_til7agqktOfSE9WGDZUJbA.s['22']++;self.fire('selected',e.result);});__cov_til7agqktOfSE9WGDZUJbA.s['23']++;this.ac.on('query',function(e){__cov_til7agqktOfSE9WGDZUJbA.f['7']++;__cov_til7agqktOfSE9WGDZUJbA.s['24']++;container.one('.dataprovider-button').addClass('dataprovider-spinner');__cov_til7agqktOfSE9WGDZUJbA.s['25']++;container.one('.dataprovider-button').setHTML('&nbsp;');});__cov_til7agqktOfSE9WGDZUJbA.s['26']++;this.ac.after('results',function(e){__cov_til7agqktOfSE9WGDZUJbA.f['8']++;__cov_til7agqktOfSE9WGDZUJbA.s['27']++;container.one('.dataprovider-button').removeClass('dataprovider-spinner');__cov_til7agqktOfSE9WGDZUJbA.s['28']++;container.one('.dataprovider-button').setHTML(self.get('buttonCaption'));});},_handleComboButton:function(e){__cov_til7agqktOfSE9WGDZUJbA.f['9']++;__cov_til7agqktOfSE9WGDZUJbA.s['29']++;var ac=this.ac;__cov_til7agqktOfSE9WGDZUJbA.s['30']++;e.stopPropagation();__cov_til7agqktOfSE9WGDZUJbA.s['31']++;if(ac.get('visible')){__cov_til7agqktOfSE9WGDZUJbA.b['1'][0]++;__cov_til7agqktOfSE9WGDZUJbA.s['32']++;ac.hide();}else{__cov_til7agqktOfSE9WGDZUJbA.b['1'][1]++;__cov_til7agqktOfSE9WGDZUJbA.s['33']++;if(ac.get('results').length===0){__cov_til7agqktOfSE9WGDZUJbA.b['2'][0]++;__cov_til7agqktOfSE9WGDZUJbA.s['34']++;ac.fire('query');}else{__cov_til7agqktOfSE9WGDZUJbA.b['2'][1]++;}__cov_til7agqktOfSE9WGDZUJbA.s['35']++;ac.sendRequest();__cov_til7agqktOfSE9WGDZUJbA.s['36']++;ac.show();}}},{ATTRS:{placeholder:{value:'Type here to search\u2026'},buttonCaption:{value:'\u2026'},parameterBag:{value:{}},dataProviderId:{value:'unknown.id'},display_handle:{value:'display_name'}}});__cov_til7agqktOfSE9WGDZUJbA.s['37']++;Y.namespace('Rednose').DataProvider=DataProvider;},'1.1.0-DEV',{'requires':['autocomplete','autocomplete-filters','autocomplete-highlighters','base','json','model','model-list','widget'],'skinnable':true});
