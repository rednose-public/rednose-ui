YUI.add("rednose-dataprovider",function(e,t){var n=e.Rednose.ModelTree,r,i,s,o;DataSourceAttribute=e.Base.create("dataSourceAttribute",e.Model,[],{},{ATTRS:{source:{value:null},name:{value:null}}}),DataSourceAttributeCollection=e.Base.create("dataSourceAttributeCollection",e.Model,[],{},{ATTRS:{source:{value:null},name:{value:null},attributes:{value:[]}}}),r=e.Base.create("dataSource",e.Model,[],{sync:function(t,n,r){t==="create"&&e.io(Routing.generate("rednose_dataprovider_post_data_sources"),{method:"POST",data:e.JSON.stringify(this.toJSON()),on:{success:function(e,t){r(null,t.responseText)},failure:function(t,n){r(e.JSON.parse(n.responseText))}}})},_setAttributes:function(t){var n=this,r=[];return e.Lang.isArray(t)?e.Array.each(t,function(e){r.push(new DataSourceAttribute({source:n,name:e}))}):e.Object.each(t,function(t,i){var s=[];e.Array.each(t,function(e){s.push(new DataSourceAttribute({source:n,name:e}))}),r.push(new DataSourceAttributeCollection({source:n,name:i,attributes:s})),r.push(s)}),r}},{ATTRS:{name:{value:null},identifier:{value:null},type:{value:"pdo"},attributes:{value:[],setter:"_setAttributes",lazyAdd:!1}}}),DatagenSource=e.Base.create("datagenSource",r,[],{},{ATTRS:{url:{value:null},username:{value:null},password:{value:null},section:{value:null}}}),i=e.Base.create("pdoSource",r,[],{},{ATTRS:{dsn:{value:null},username:{value:null},password:{value:null},table:{value:null},query:{value:null},source:{value:"table"}}}),s=e.Base.create("xmlSource",r,[],{},{ATTRS:{xsd:{value:null},xslt:{value:null},xml:{value:null},root:{value:null}}}),o=e.Base.create("dataSourceList",e.ModelList,[],{model:r,getTree:function(){var t=[];return this.each(function(n){var r={label:n.get("name"),data:n,children:[]};e.Array.each(n.get("attributes"),function(t){if(t instanceof DataSourceAttribute)r.children.push({label:t.get("name"),data:t});else if(t instanceof DataSourceAttributeCollection){var n={label:t.get("name"),data:t,children:[]};e.Array.each(t.get("attributes"),function(e){e instanceof DataSourceAttribute&&n.children.push({label:e.get("name"),data:e})}),r.children.push(n)}}),t.push(r)}),new n({items:t,icons:{datagenSource:"icon-list-alt",pdoSource:"icon-align-justify",xmlSource:"icon-file",dataSourceAttribute:"icon-minus",dataSourceAttributeCollection:"icon-th-list"}})},parse:function(t){var n=[];return e.Array.each(e.JSON.parse(t),function(e){switch(e.type){case"dataGen":n.push(new DatagenSource(e));break;case"pdo":n.push(new i(e));break;case"xml":n.push(new s(e))}}),n},sync:function(t,n,r){t==="read"&&e.io(Routing.generate("rednose_dataprovider_data_sources"),{method:"GET",on:{success:function(e,t){r(null,t.responseText)},failure:function(t,n){r(e.JSON.parse(n.responseText))}}})}}),e.namespace("Rednose.DataSource").DataSource=r,e.namespace("Rednose.DataSource").DataSourceAttribute=DataSourceAttribute,e.namespace("Rednose.DataSource").DatagenSource=DatagenSource,e.namespace("Rednose.DataSource").PdoSource=i,e.namespace("Rednose.DataSource").XmlSource=s,e.namespace("Rednose.DataSource").DataSourceList=o;var u;u=e.Base.create("dataProvider",e.Widget,[],{ac:null,template:'<div class="dataprovider-form"><div class="input-append"><input type="text" class="dataprovider-search" placeholder="{placeholder}" /><button class="btn btn dataprovider-button" type="button">{caption}</button></div><div class="ac"></div></div>',formatterTemplate:'<div class="entry"><div class="hd"><img src="{img}" class="photo" /></div><div class="bd"><div class="autocomplete-title">{title}</div><div class="autocomplete-subtitle">{subtitle}</div></div></div>',initializer:function(){var t=this,n=this.get("contentBox"),r="rednose_dataprovider_data_list",i=this.get("dataProviderId"),s=this.get("parameterBag"),o=this.get("placeholder"),u=this.get("buttonCaption"),a=function(n,r){return e.Array.map(r,function(n){return e.Lang.sub(t.formatterTemplate,{img:n.raw.img,title:n.highlighted,subtitle:n.raw.subtitle})})};n.append(e.Lang.sub(this.template,{placeholder:o,caption:u})),n.one(".dataprovider-button").on("click",function(e){t._handleComboButton(e)}),r=Routing.generate(r)+"?id="+i+"&parameterbag="+e.JSON.stringify(s)+"&q={query}&callback={callback}",this.ac=new e.AutoCompleteList({inputNode:n.one(".dataprovider-search"),resultFormatter:a,minQueryLength:0,maxResults:0,resultHighlighter:"phraseMatch",resultListLocator:"results",resultTextLocator:this.get("display_handle"),source:r,render:n.one(".ac")}),this.ac.after("select",function(e){t.fire("selected",e.result)}),this.ac.on("query",function(){n.one(".dataprovider-button").addClass("dataprovider-spinner"),n.one(".dataprovider-button").setHTML("&nbsp;")}),this.ac.after("results",function(){n.one(".dataprovider-button").removeClass("dataprovider-spinner"),n.one(".dataprovider-button").setHTML(t.get("buttonCaption"))})},_handleComboButton:function(e){var t=this.ac;e.stopPropagation(),t.get("visible")?t.hide():(t.get("results").length===0&&t.fire("query"),t.sendRequest(),t.show())}},{ATTRS:{placeholder:{value:"Type here to search\u2026"},buttonCaption:{value:"\u2026"},parameterBag:{value:{}},dataProviderId:{value:"unknown.id"},display_handle:{value:"display_name"}}}),e.namespace("Rednose").DataProvider=u},"1.5.0-DEV",{requires:["autocomplete","autocomplete-filters","autocomplete-highlighters","base","json","model","model-list","rednose-treeview","widget"],skinnable:!0});
