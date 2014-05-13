YUI.add("rednose-datasource-manager",function(e,t){var n=e.Rednose.DataSource.DataSource,r=e.Template.Micro,i=e.Base.create("choicePageView",e.View,[],{template:r.compile('<form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="identifier">Identifier</label><div class="controls"><input class="input-block-level" id="identifier" type="text" value="<%= data.get("identifier") %>"<% if (!data.isNew()) {%> disabled<% } %>/></div></div><div class="control-group"><label class="control-label" for="name">Name</label><div class="controls"><input class="input-block-level" id="name" type="text" value="<%= data.get("name") %>"/></div></div><div class="control-group"><label class="control-label">Type</label><div class="controls"><label class="radio"><input type="radio" name="type" value="pdo" <% if (data.get("type") == "pdo") { %>checked<% } %><% if (!data.isNew()) {%> disabled<% } %>/>Database</label><label class="radio"><input type="radio" name="type" value="dataGen" <% if (data.get("type") == "dataGen") { %>checked<% } %><% if (!data.isNew()) {%> disabled<% } %>/>DataGen</label><label class="radio"><input type="radio" name="type" value="xml" <% if (data.get("type") == "xml") { %>checked<% } %><% if (!data.isNew()) {%> disabled<% } %>/>XML Data</label></div></div></fieldset></form>'),events:{form:{change:"_handleFormChange"}},render:function(){var e=this.get("container"),t=this.template,n=this.get("model");return e.setHTML(t(n)),this},_handleFormChange:function(e){var t=e.target,n=t.get("type")==="radio"?t.get("name"):t.get("id");value=t.get("type")==="checkbox"?t.get("checked"):t.get("value"),this.get("model").set(n,value)}},{ATTRS:{model:{value:new n}}}),s=e.Rednose.DataSource.DatagenSource,o=e.Base.create("dataGenGenericPageView",e.View,[],{template:'<form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="url">URL</label><div class="controls"><input class="input-block-level" id="url" type="text"/></div></div><div class="control-group"><label class="control-label" for="username">Username</label><div class="controls"><input class="input-block-level" id="username" type="text"/></div></div><div class="control-group"><label class="control-label" for="password">Password</label><div class="controls"><input class="input-block-level" id="password" type="password"/></div></div></fieldset></form>',render:function(){var e=this.get("container"),t=this.template;return e.setHTML(t),this}},{ATTRS:{model:{value:new s}}}),s=e.Rednose.DataSource.DatagenSource,u=e.Base.create("dataGenSourcePageView",e.View,[],{OPTION_TEMPLATE:'<option id="{id}">{value}</option>',template:'<form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="section">Section</label><div class="controls"><select class="input-block-level" id="section"></select></div></div></fieldset></form>',render:function(){var e=this.get("container"),t=this.template;return e.setHTML(t),this._refreshSections(),this},updateSelectNode:function(t,n){var r=this;t.empty(),e.Array.each(n,function(n){t.append(e.Lang.sub(r.OPTION_TEMPLATE,{id:n,value:n}))})},_refreshSections:function(){var t=this,n=this.get("container").one("#section");e.io(Routing.generate("rednose_dataprovider_operations_list_sections"),{method:"POST",data:"url=http://datagen-standard.dev&username=admin&password=adminpasswd",on:{success:function(r,i){t.updateSelectNode(n,e.JSON.parse(i.responseText))}}})}},{ATTRS:{model:{value:new s}}}),a=e.Rednose.DataSource.PdoSource,r=e.Template.Micro,f=e.Base.create("pdoGenericPageView",e.View,[],{template:r.compile('<form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="dsn">DSN</label><div class="controls"><input class="input-block-level" id="dsn" type="text" value="<%= data.dsn %>"/></div></div><div class="control-group"><label class="control-label" for="username">Username</label><div class="controls"><input class="input-block-level" id="username" type="text" value="<%= data.username %>"/></div></div><div class="control-group"><label class="control-label" for="password">Password</label><div class="controls"><input class="input-block-level" id="password" type="password" value="<%= data.password %>"/></div></div></fieldset></form>'),events:{form:{change:"_handleFormChange"}},render:function(){var e=this.get("container"),t=this.template,n=this.get("model");return e.setHTML(t(n.getAttrs())),this},_handleFormChange:function(e){var t=e.target,n=t.get("type")==="radio"?t.get("name"):t.get("id");value=t.get("type")==="checkbox"?t.get("checked"):t.get("value"),this.get("model").set(n,value)}},{ATTRS:{model:{value:new a}}}),a=e.Rednose.DataSource.PdoSource,r=e.Template.Micro,l=e.Base.create("pdoSourcePageView",e.View,[],{OPTION_TEMPLATE:r.compile('<option id="<%= data.id %>"<% if (data.selected) {%> selected<% }%>><%= data.value %></option>'),template:r.compile('<form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label radio inline"><input type="radio" name="source" value="table" data-radio-group="source"<% if (data.source == "table") { %> checked<% } %>/> Table</label><div class="controls"><select class="input-block-level" id="table" data-radio="source"<% if (data.source != "table") { %> disabled<% } %>></select></div></div><div class="control-group"><label class="control-label radio inline"><input type="radio" name="source" value="query" data-radio-group="source"<% if (data.source == "query") { %> checked<% } %>/> Query</label><div class="controls"><textarea rows="3" spellcheck="false" class="input-block-level" id="query" data-radio="source"<% if (data.source != "query") { %> disabled<% } %>><%= data.query %></textarea ></div></div></fieldset></form>'),events:{form:{change:"_handleFormChange"},"[data-radio-group]":{change:"_handleRadio"}},render:function(){var e=this.get("container"),t=this.template,n=this.get("model");return e.setHTML(t(n.getAttrs())),this._refreshTables
(),this},disableNode:function(e,t){if(t){e.setAttribute("disabled");return}e.hasAttribute("disabled")&&e.removeAttribute("disabled")},updateSelectNode:function(t,n){var r=this,i=this.get("model");t.empty(),e.Array.each(n,function(e){t.append(r.OPTION_TEMPLATE({id:e,value:e,selected:i.get("table")===e}))})},_refreshTables:function(){var t=this,n=this.get("container").one("#table");e.io(Routing.generate("rednose_dataprovider_operations_list_tables"),{method:"POST",data:"dsn=mysql:host=localhost;dbname=libbit_flowgen&username=root&password=root",on:{success:function(r,i){t.updateSelectNode(n,e.JSON.parse(i.responseText))}}})},_handleRadio:function(e){var t=this,n=e.target.get("value"),r=this.get("container");r.all("[data-radio-group]").each(function(e){var r=e.ancestor("div").one("[data-radio]"),i=r.get("id")!==n;t.disableNode(r,i),!i&&r.focus()})},_handleFormChange:function(e){var t=e.target,n=t.get("type")==="radio"?t.get("name"):t.get("id");value=t.get("type")==="checkbox"?t.get("checked"):t.get("value"),this.get("model").set(n,value)}},{ATTRS:{model:{value:new a}}}),c=e.Rednose.DataSource.XmlSource,h=e.Base.create("xmlPageView",e.View,[],{UPLOADER_TEMPLATE:'<button class="btn" type="button" title="Upload"><i class="icon-upload"></i></button>',UPLOADER_CONFIG:{width:40,height:30,uploadURL:Routing.generate("rednose_framework_files_upload"),buttonClassNames:{disabled:"disabled"}},template:'<form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="xsd">XML Schema</label><div class="controls"><div class="input-append input-block-level"><input type="text" id="xsd" readonly><div id="xsd-uploader" class="uploader-container"></div></div></div></div><div class="control-group"><label class="control-label" for="xslt">XSLT File</label><div class="controls"><div class="input-append input-block-level"><input type="text" id="xslt" readonly><div id="xsl-uploader" class="uploader-container"></div></div></div></div><div class="control-group"><label class="control-label" for="xml">XML Data</label><div class="controls"><div class="input-append input-block-level"><input type="text" id="xml" readonly><div id="xml-uploader" class="uploader-container"></div></div></div></div><div class="control-group"><label class="control-label" for="root">Root Element</label><div class="controls"><input class="input-block-level" id="root" type="text"/></div></div></fieldset></form>',initializer:function(){e.Uploader.SELECT_FILES_BUTTON=this.UPLOADER_TEMPLATE},render:function(){var t=this.get("container"),n=this.template;return t.setHTML(n),this._bindUploader((new e.Uploader(this.UPLOADER_CONFIG)).render(t.one("#xsd-uploader"))),this._bindUploader((new e.Uploader(this.UPLOADER_CONFIG)).render(t.one("#xsl-uploader"))),this._bindUploader((new e.Uploader(this.UPLOADER_CONFIG)).render(t.one("#xml-uploader"))),this},_bindUploader:function(e){e.after("fileselect",this._afterFileSelect,this),e.on("uploadstart",this._onUploadStart,this),e.on("uploadcomplete",this._onUploadComplete,this),e.on("uploaderror",this._onUploadError,this),e.on("alluploadscomplete",this._onAllUploadsComplete,this)},_updateInputForUploader:function(e,t,n){var r=e.get("srcNode").ancestor(".controls").one("input");r.set("value",t),r.setAttribute("data-upload-id",n)},_afterFileSelect:function(e){var t=e.target,n=t.get("fileList");n.length>0&&t.uploadAll()},_onUploadStart:function(e){var t=e.target;t.set("enabled",!1)},_onUploadComplete:function(e){var t=e.target,n=e.file,r=e.data;t.set("enabled",!0),this._updateInputForUploader(t,n.get("name"),r)},_onUploadError:function(e){var t=e.target,n=e.statusCode;text=e.statusText,t.set("enabled",!0),console.log(n),console.log(text)},_onAllUploadsComplete:function(e){var t=e.target;t.set("enabled",!0),t.set("fileList",[])}},{ATTRS:{model:{value:new c}}}),p=e.Base.create("app",e.App,[],{views:{choicePage:{type:i,preserve:!1},pdoGenericPage:{type:f,parent:"choicePage",preserve:!1},pdoSourcePage:{type:l,parent:"pdoGenericPage",preserve:!1},dataGenGenericPage:{type:o,parent:"choicePage",preserve:!1},dataGenSourcePage:{type:u,parent:"dataGenGenericPage",preserve:!1},xmlPage:{type:h,parent:"choicePage",preserve:!1}}}),d="New Data Source",v="Next",m="Back",g="Cancel",y="Create",n=e.Rednose.DataSource.DataSource,s=e.Rednose.DataSource.DatagenSource,a=e.Rednose.DataSource.PdoSource,c=e.Rednose.DataSource.XmlSource,b=e.Base.create("dataSourceManager",e.View,[e.Rednose.View.Nav],{_app:null,title:d,close:!0,initializer:function(){this.on("dataSourceManager:buttonChoice",this.showChoicePage,this),this.on("dataSourceManager:buttonChoose",this._handleButtonChoose,this),this.on("dataSourceManager:buttonPdoGeneric",this.showPdoGenericPage,this),this.on("dataSourceManager:buttonPdoSource",this.showPdoSourcePage,this),this.on("dataSourceManager:buttonDataGenGeneric",this.showDataGenGenericPage,this),this.on("dataSourceManager:buttonDataGenSource",this.showDataGenSourcePage,this),this.on("dataSourceManager:buttonClose",this._handleButtonClose,this),this.on("dataSourceManager:buttonCreate",this._handleButtonCreate,this)},render:function(){var e=this.get("container");return this._app=(new p({container:e,transitions:!0})).render(),this},showChoicePage:function(){var e=this._app.get("activeView"),t=e?{}:{transition:!1},n;e&&this.set("model",e.get("model")),n=this.get("model"),this._app.showView("choicePage",{model:n},t),this._updateButtons({choose:{value:v,position:"right",primary:!0},close:{value:g,position:"left"}})},showPdoGenericPage:function(){var e=this._app.get("activeView").get("model");this.set("model",e),this._app.showView("pdoGenericPage",{model:e}),this._updateButtons({pdoSource:{value:v,position:"right",primary:!0},choice:{value:m,position:"right"},close:{value:g,position:"left"}})},showPdoSourcePage:function(){var e=this._app.get("activeView").get("model");this.set("model",e),this._app.showView("pdoSourcePage",{model:e}),this._updateButtons({create:{value:y,position:"right",primary:!0},pdoGeneric
:{value:m,position:"right"},close:{value:g,position:"left"}})},showDataGenGenericPage:function(){var e=this._app.get("activeView").get("model");this.set("model",e),this._app.showView("dataGenGenericPage",{model:e}),this._updateButtons({dataGenSource:{value:v,position:"right",primary:!0},choice:{value:m,position:"right"},close:{value:g,position:"left"}})},showDataGenSourcePage:function(){var e=this._app.get("activeView").get("model");this.set("model",e),this._app.showView("dataGenSourcePage",{model:e}),this._updateButtons({create:{value:y,position:"right",primary:!0},dataGenGeneric:{value:m,position:"right"},close:{value:g,position:"left"}})},showXMLPage:function(){var e=this._app.get("activeView").get("model");this.set("model",e),this._app.showView("xmlPage",{model:e}),this._updateButtons({create:{value:y,position:"right",primary:!0},choice:{value:m,position:"right"},close:{value:g,position:"left"}})},_updateButtons:function(e){this.buttons={},this.set("buttons",e)},_handleButtonChoose:function(){var e=this._app.get("activeView"),t=e.get("model"),n=["id","identifier","name","type"];switch(t.get("type")){case"dataGen":t instanceof s||(t=new s(t.getAttrs(n))),e.set("model",t),this.showDataGenGenericPage();break;case"pdo":t instanceof a||(t=new a(t.getAttrs(n))),e.set("model",t),this.showPdoGenericPage();break;case"xml":t instanceof c||(t=new c(t.getAttrs(n))),e.set("model",t),this.showXMLPage()}},_handleButtonClose:function(){this.fire("close")},_handleButtonCreate:function(){var e=this._app.get("activeView").get("model");this.fire("create",{model:e})}},{ATTRS:{model:{value:new n}}});e.namespace("Rednose.DataSourceManager").DataSourceManager=b},"1.4.1",{requires:["rednose-app","rednose-dataprovider"]});
