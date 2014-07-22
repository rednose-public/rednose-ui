YUI.add("rednose-datasource",function(e,t){var n,r,i,s,o;DataSourceAttribute=e.Base.create("dataSourceAttribute",e.Model,[],{},{ATTRS:{source:{value:null},name:{value:null}}}),DataSourceAttributeCollection=e.Base.create("dataSourceAttributeCollection",e.Model,[],{},{ATTRS:{source:{value:null},name:{value:null},attributes:{value:[]}}}),n=e.Base.create("dataSource",e.Model,[],{getAttributeList:function(){var t=[];return e.Array.each(this.get("attributes"),function(n){n.type!=="composite"&&t.push(n.name),n.children&&e.Array.each(n.children,function(e){e.type!=="composite"&&t.push(e.name)})}),t},sync:function(t,n,r){t==="create"&&e.io(Routing.generate("rednose_dataprovider_post_data_sources"),{method:"POST",data:e.JSON.stringify(this.toJSON()),on:{success:function(e,t){r(null,t.responseText)},failure:function(t,n){r(e.JSON.parse(n.responseText))}}})}},{ATTRS:{name:{value:null},identifier:{value:null},type:{value:"pdo"},attributes:{value:{}}}}),DatagenSource=e.Base.create("datagenSource",n,[],{},{ATTRS:{url:{value:null},username:{value:null},password:{value:null},section:{value:null}}}),r=e.Base.create("pdoSource",n,[],{},{ATTRS:{dsn:{value:null},username:{value:null},password:{value:null},table:{value:null},query:{value:null},source:{value:"table"}}}),s=e.Base.create("trimSource",n,[],{},{ATTRS:{url:{value:null},query:{value:null}}}),i=e.Base.create("xmlSource",n,[],{},{ATTRS:{xsd:{value:null},xslt:{value:null},xml:{value:null},root:{value:null}}}),o=e.Base.create("dataSourceList",e.ModelList,[],{model:n,icons:{dataGen:"icon-list-alt",pdo:"icon-align-justify",xml:"icon-file",trim:"icon-briefcase"},_getNodes:function(e){var t=[];for(var n=0,r=e.length;n<r;n++){var i=e[n],s,o;switch(i.type){case"composite":o="icon-th-list";break;case"button":o="icon-repeat";break;default:o="icon-minus"}s={label:i.name,icon:o},i.children&&(s.children=this._getNodes(i.children)),t.push(s)}return t},getTree:function(){var e=this,t=[];return this.each(function(n){var r=e._getNodes(n.get("attributes")),i;i={label:n.get("identifier"),icon:e.icons[n.get("type")],children:r},t.push(i)}),t},sync:function(t,n,r){t==="read"&&e.io(Routing.generate("rednose_dataprovider_data_sources"),{method:"GET",on:{success:function(e,t){r(null,t.responseText)},failure:function(t,n){r(e.JSON.parse(n.responseText))}}})}}),e.namespace("Rednose.DataSource").DataSource=n,e.namespace("Rednose.DataSource").DataSourceAttribute=DataSourceAttribute,e.namespace("Rednose.DataSource").DatagenSource=DatagenSource,e.namespace("Rednose.DataSource").PdoSource=r,e.namespace("Rednose.DataSource").XmlSource=i,e.namespace("Rednose.DataSource").TrimSource=s,e.namespace("Rednose.DataSource").DataSourceList=o},"1.5.0-DEV",{requires:["io","model","model-list"]});
