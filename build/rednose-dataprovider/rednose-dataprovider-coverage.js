if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/rednose-dataprovider/rednose-dataprovider.js']) {
   __coverage__['build/rednose-dataprovider/rednose-dataprovider.js'] = {"path":"build/rednose-dataprovider/rednose-dataprovider.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":32},"end":{"line":1,"column":51}}},"2":{"name":"(anonymous_2)","line":28,"loc":{"start":{"line":28,"column":17},"end":{"line":28,"column":28}}},"3":{"name":"(anonymous_3)","line":37,"loc":{"start":{"line":37,"column":31},"end":{"line":37,"column":52}}},"4":{"name":"(anonymous_4)","line":38,"loc":{"start":{"line":38,"column":36},"end":{"line":38,"column":54}}},"5":{"name":"(anonymous_5)","line":51,"loc":{"start":{"line":51,"column":58},"end":{"line":51,"column":70}}},"6":{"name":"(anonymous_6)","line":72,"loc":{"start":{"line":72,"column":32},"end":{"line":72,"column":45}}},"7":{"name":"(anonymous_7)","line":78,"loc":{"start":{"line":78,"column":12},"end":{"line":78,"column":25}}},"8":{"name":"(anonymous_8)","line":86,"loc":{"start":{"line":86,"column":12},"end":{"line":86,"column":25}}},"9":{"name":"(anonymous_9)","line":93,"loc":{"start":{"line":93,"column":24},"end":{"line":93,"column":37}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":132,"column":3}},"2":{"start":{"line":3,"column":0},"end":{"line":3,"column":17}},"3":{"start":{"line":5,"column":0},"end":{"line":117,"column":3}},"4":{"start":{"line":29,"column":8},"end":{"line":35,"column":54}},"5":{"start":{"line":37,"column":8},"end":{"line":48,"column":10}},"6":{"start":{"line":38,"column":12},"end":{"line":47,"column":15}},"7":{"start":{"line":39,"column":16},"end":{"line":46,"column":18}},"8":{"start":{"line":50,"column":8},"end":{"line":50,"column":106}},"9":{"start":{"line":51,"column":8},"end":{"line":53,"column":11}},"10":{"start":{"line":52,"column":12},"end":{"line":52,"column":39}},"11":{"start":{"line":55,"column":8},"end":{"line":58,"column":45}},"12":{"start":{"line":60,"column":8},"end":{"line":70,"column":11}},"13":{"start":{"line":72,"column":8},"end":{"line":74,"column":11}},"14":{"start":{"line":73,"column":12},"end":{"line":73,"column":44}},"15":{"start":{"line":76,"column":8},"end":{"line":82,"column":10}},"16":{"start":{"line":79,"column":16},"end":{"line":79,"column":87}},"17":{"start":{"line":80,"column":16},"end":{"line":80,"column":72}},"18":{"start":{"line":84,"column":8},"end":{"line":90,"column":10}},"19":{"start":{"line":87,"column":16},"end":{"line":87,"column":90}},"20":{"start":{"line":88,"column":16},"end":{"line":88,"column":89}},"21":{"start":{"line":94,"column":8},"end":{"line":94,"column":25}},"22":{"start":{"line":96,"column":8},"end":{"line":96,"column":28}},"23":{"start":{"line":98,"column":8},"end":{"line":107,"column":9}},"24":{"start":{"line":99,"column":12},"end":{"line":99,"column":22}},"25":{"start":{"line":101,"column":12},"end":{"line":103,"column":13}},"26":{"start":{"line":102,"column":16},"end":{"line":102,"column":33}},"27":{"start":{"line":105,"column":12},"end":{"line":105,"column":29}},"28":{"start":{"line":106,"column":12},"end":{"line":106,"column":22}},"29":{"start":{"line":119,"column":0},"end":{"line":119,"column":51}}},"branchMap":{"1":{"line":98,"type":"if","locations":[{"start":{"line":98,"column":8},"end":{"line":98,"column":8}},{"start":{"line":98,"column":8},"end":{"line":98,"column":8}}]},"2":{"line":101,"type":"if","locations":[{"start":{"line":101,"column":12},"end":{"line":101,"column":12}},{"start":{"line":101,"column":12},"end":{"line":101,"column":12}}]}},"code":["(function () { YUI.add('rednose-dataprovider', function (Y, NAME) {","","var DataProvider;","","DataProvider = Y.Base.create('dataProvider', Y.Widget, [], {","    ac: null,","","    template:","        '<div class=\"dataprovider-form\">' +","            '<div class=\"input-append\">' +","                '<input type=\"text\" class=\"dataprovider-search\" placeholder=\"{placeholder}\" />' +","                '<button class=\"btn btn dataprovider-button\" type=\"button\">{caption}</button>' +","            '</div>' +","            '<div class=\"ac\"></div>' +","        '</div>',","","    formatterTemplate:","            '<div class=\"entry\">' +","                '<div class=\"hd\">' +","                    '<img src=\"{img}\" class=\"photo\" />' +","                '</div>' +","                '<div class=\"bd\">' +","                    '<div class=\"autocomplete-title\">{title}</div>' +","                    '<div class=\"autocomplete-subtitle\">{subtitle}</div>' +","                '</div>' +","            '</div>',","","    initializer: function() {","        var self          = this,","            container     = this.get('contentBox'),","            route         = 'rednose_dataprovider_data_list',","            id            = this.get('dataProviderId'),","            parameterBag  = this.get('parameterBag'),","            placeHolder   = this.get('placeholder'),","            buttonCaption = this.get('buttonCaption');","","        var defaultFormatter = function(query, raw) {","            return Y.Array.map(raw, function (result) {","                return Y.Lang.sub(","                    self.formatterTemplate,","                    {","                        img     : result.raw.img,","                        title   : result.highlighted,","                        subtitle: result.raw.subtitle","                    }","                );","            });","        };","","        container.append(Y.Lang.sub(this.template, { placeholder: placeHolder, caption: buttonCaption }));","        container.one('.dataprovider-button').on('click', function(e) {","            self._handleComboButton(e);","        });","","        route =","            Routing.generate(route) + '?id=' + id +","            '&parameterbag=' + Y.JSON.stringify(parameterBag) +","            '&q={query}&callback={callback}';","","        this.ac = new Y.AutoCompleteList({","            inputNode        : container.one('.dataprovider-search'),","            resultFormatter  : defaultFormatter,","            minQueryLength   : 0,","            maxResults       : 0,","            resultHighlighter: 'phraseMatch',","            resultListLocator: 'results',","            resultTextLocator: this.get('display_handle'),","            source           : route,","            render           : container.one('.ac')","        });","","        this.ac.after('select', function (e) {","            self.fire('selected', e.result);","        });","","        this.ac.on(","            \"query\",","            function (e) {","                container.one('.dataprovider-button').addClass('dataprovider-spinner');","                container.one('.dataprovider-button').setHTML('&nbsp;');","            }","        );","","        this.ac.after(","            \"results\",","            function (e) {","                container.one('.dataprovider-button').removeClass('dataprovider-spinner');","                container.one('.dataprovider-button').setHTML(self.get('buttonCaption'));","            }","        );","    },","","    _handleComboButton: function (e) {","        var ac = this.ac;","","        e.stopPropagation();","","        if (ac.get('visible')) {","            ac.hide();","        } else {","            if (ac.get('results').length === 0) {","                ac.fire('query');","            }","","            ac.sendRequest();","            ac.show();","        }","    },","}, {","    ATTRS: {","        placeholder: { value: 'Type here to search…' },","        buttonCaption: { value: '…' },","        parameterBag: { value: {} },","        dataProviderId: { value: 'unknown.id' },","        display_handle: { value: 'display_name' },","    }","});","","Y.namespace('Rednose').DataProvider = DataProvider;","","","}, '1.1.0-DEV', {","    \"requires\": [","        \"base\",","        \"json\",","        \"widget\",","        \"autocomplete\",","        \"autocomplete-filters\",","        \"autocomplete-highlighters\"","    ],","    \"skinnable\": true","});","","}());"]};
}
var __cov_til7agqktOfSE9WGDZUJbA = __coverage__['build/rednose-dataprovider/rednose-dataprovider.js'];
__cov_til7agqktOfSE9WGDZUJbA.s['1']++;YUI.add('rednose-dataprovider',function(Y,NAME){__cov_til7agqktOfSE9WGDZUJbA.f['1']++;__cov_til7agqktOfSE9WGDZUJbA.s['2']++;var DataProvider;__cov_til7agqktOfSE9WGDZUJbA.s['3']++;DataProvider=Y.Base.create('dataProvider',Y.Widget,[],{ac:null,template:'<div class="dataprovider-form">'+'<div class="input-append">'+'<input type="text" class="dataprovider-search" placeholder="{placeholder}" />'+'<button class="btn btn dataprovider-button" type="button">{caption}</button>'+'</div>'+'<div class="ac"></div>'+'</div>',formatterTemplate:'<div class="entry">'+'<div class="hd">'+'<img src="{img}" class="photo" />'+'</div>'+'<div class="bd">'+'<div class="autocomplete-title">{title}</div>'+'<div class="autocomplete-subtitle">{subtitle}</div>'+'</div>'+'</div>',initializer:function(){__cov_til7agqktOfSE9WGDZUJbA.f['2']++;__cov_til7agqktOfSE9WGDZUJbA.s['4']++;var self=this,container=this.get('contentBox'),route='rednose_dataprovider_data_list',id=this.get('dataProviderId'),parameterBag=this.get('parameterBag'),placeHolder=this.get('placeholder'),buttonCaption=this.get('buttonCaption');__cov_til7agqktOfSE9WGDZUJbA.s['5']++;var defaultFormatter=function(query,raw){__cov_til7agqktOfSE9WGDZUJbA.f['3']++;__cov_til7agqktOfSE9WGDZUJbA.s['6']++;return Y.Array.map(raw,function(result){__cov_til7agqktOfSE9WGDZUJbA.f['4']++;__cov_til7agqktOfSE9WGDZUJbA.s['7']++;return Y.Lang.sub(self.formatterTemplate,{img:result.raw.img,title:result.highlighted,subtitle:result.raw.subtitle});});};__cov_til7agqktOfSE9WGDZUJbA.s['8']++;container.append(Y.Lang.sub(this.template,{placeholder:placeHolder,caption:buttonCaption}));__cov_til7agqktOfSE9WGDZUJbA.s['9']++;container.one('.dataprovider-button').on('click',function(e){__cov_til7agqktOfSE9WGDZUJbA.f['5']++;__cov_til7agqktOfSE9WGDZUJbA.s['10']++;self._handleComboButton(e);});__cov_til7agqktOfSE9WGDZUJbA.s['11']++;route=Routing.generate(route)+'?id='+id+'&parameterbag='+Y.JSON.stringify(parameterBag)+'&q={query}&callback={callback}';__cov_til7agqktOfSE9WGDZUJbA.s['12']++;this.ac=new Y.AutoCompleteList({inputNode:container.one('.dataprovider-search'),resultFormatter:defaultFormatter,minQueryLength:0,maxResults:0,resultHighlighter:'phraseMatch',resultListLocator:'results',resultTextLocator:this.get('display_handle'),source:route,render:container.one('.ac')});__cov_til7agqktOfSE9WGDZUJbA.s['13']++;this.ac.after('select',function(e){__cov_til7agqktOfSE9WGDZUJbA.f['6']++;__cov_til7agqktOfSE9WGDZUJbA.s['14']++;self.fire('selected',e.result);});__cov_til7agqktOfSE9WGDZUJbA.s['15']++;this.ac.on('query',function(e){__cov_til7agqktOfSE9WGDZUJbA.f['7']++;__cov_til7agqktOfSE9WGDZUJbA.s['16']++;container.one('.dataprovider-button').addClass('dataprovider-spinner');__cov_til7agqktOfSE9WGDZUJbA.s['17']++;container.one('.dataprovider-button').setHTML('&nbsp;');});__cov_til7agqktOfSE9WGDZUJbA.s['18']++;this.ac.after('results',function(e){__cov_til7agqktOfSE9WGDZUJbA.f['8']++;__cov_til7agqktOfSE9WGDZUJbA.s['19']++;container.one('.dataprovider-button').removeClass('dataprovider-spinner');__cov_til7agqktOfSE9WGDZUJbA.s['20']++;container.one('.dataprovider-button').setHTML(self.get('buttonCaption'));});},_handleComboButton:function(e){__cov_til7agqktOfSE9WGDZUJbA.f['9']++;__cov_til7agqktOfSE9WGDZUJbA.s['21']++;var ac=this.ac;__cov_til7agqktOfSE9WGDZUJbA.s['22']++;e.stopPropagation();__cov_til7agqktOfSE9WGDZUJbA.s['23']++;if(ac.get('visible')){__cov_til7agqktOfSE9WGDZUJbA.b['1'][0]++;__cov_til7agqktOfSE9WGDZUJbA.s['24']++;ac.hide();}else{__cov_til7agqktOfSE9WGDZUJbA.b['1'][1]++;__cov_til7agqktOfSE9WGDZUJbA.s['25']++;if(ac.get('results').length===0){__cov_til7agqktOfSE9WGDZUJbA.b['2'][0]++;__cov_til7agqktOfSE9WGDZUJbA.s['26']++;ac.fire('query');}else{__cov_til7agqktOfSE9WGDZUJbA.b['2'][1]++;}__cov_til7agqktOfSE9WGDZUJbA.s['27']++;ac.sendRequest();__cov_til7agqktOfSE9WGDZUJbA.s['28']++;ac.show();}}},{ATTRS:{placeholder:{value:'Type here to search\u2026'},buttonCaption:{value:'\u2026'},parameterBag:{value:{}},dataProviderId:{value:'unknown.id'},display_handle:{value:'display_name'}}});__cov_til7agqktOfSE9WGDZUJbA.s['29']++;Y.namespace('Rednose').DataProvider=DataProvider;},'1.1.0-DEV',{'requires':['base','json','widget','autocomplete','autocomplete-filters','autocomplete-highlighters'],'skinnable':true});
