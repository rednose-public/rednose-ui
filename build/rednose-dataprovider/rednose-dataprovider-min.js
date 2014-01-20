YUI.add("rednose-dataprovider",function(e,t){var n,r,i,s;n=e.Base.create("dataSource",e.Model,[],{},{ATTRS:{name:{value:null}}}),r=e.Base.create("pdoSource",n,[],{},{ATTRS:{dsn:{value:null},username:{value:null},password:{value:null},table:{value:null}}}),i=e.Base.create("xmlSource",n,[],{},{ATTRS:{xsd:{value:null},xslt:{value:null},xml:{value:null},root:{value:null}}}),s=e.Base.create("dataSourceList",e.ModelList,[],{model:n}),e.namespace("Rednose.DataSource").PdoSource=r,e.namespace("Rednose.DataSource").XmlSource=i,e.namespace("Rednose.DataSource").DataSourceList=s;var o;o=e.Base.create("dataProvider",e.Widget,[],{ac:null,template:'<div class="dataprovider-form"><div class="input-append"><input type="text" class="dataprovider-search" placeholder="{placeholder}" /><button class="btn btn dataprovider-button" type="button">{caption}</button></div><div class="ac"></div></div>',formatterTemplate:'<div class="entry"><div class="hd"><img src="{img}" class="photo" /></div><div class="bd"><div class="autocomplete-title">{title}</div><div class="autocomplete-subtitle">{subtitle}</div></div></div>',initializer:function(){var t=this,n=this.get("contentBox"),r="rednose_dataprovider_data_list",i=this.get("dataProviderId"),s=this.get("parameterBag"),o=this.get("placeholder"),u=this.get("buttonCaption"),a=function(n,r){return e.Array.map(r,function(n){return e.Lang.sub(t.formatterTemplate,{img:n.raw.img,title:n.highlighted,subtitle:n.raw.subtitle})})};n.append(e.Lang.sub(this.template,{placeholder:o,caption:u})),n.one(".dataprovider-button").on("click",function(e){t._handleComboButton(e)}),r=Routing.generate(r)+"?id="+i+"&parameterbag="+e.JSON.stringify(s)+"&q={query}&callback={callback}",this.ac=new e.AutoCompleteList({inputNode:n.one(".dataprovider-search"),resultFormatter:a,minQueryLength:0,maxResults:0,resultHighlighter:"phraseMatch",resultListLocator:"results",resultTextLocator:this.get("display_handle"),source:r,render:n.one(".ac")}),this.ac.after("select",function(e){t.fire("selected",e.result)}),this.ac.on("query",function(e){n.one(".dataprovider-button").addClass("dataprovider-spinner"),n.one(".dataprovider-button").setHTML("&nbsp;")}),this.ac.after("results",function(e){n.one(".dataprovider-button").removeClass("dataprovider-spinner"),n.one(".dataprovider-button").setHTML(t.get("buttonCaption"))})},_handleComboButton:function(e){var t=this.ac;e.stopPropagation(),t.get("visible")?t.hide():(t.get("results").length===0&&t.fire("query"),t.sendRequest(),t.show())}},{ATTRS:{placeholder:{value:"Type here to search\u2026"},buttonCaption:{value:"\u2026"},parameterBag:{value:{}},dataProviderId:{value:"unknown.id"},display_handle:{value:"display_name"}}}),e.namespace("Rednose").DataProvider=o},"1.1.0-DEV",{requires:["autocomplete","autocomplete-filters","autocomplete-highlighters","base","json","model","model-list","widget"],skinnable:!0});
