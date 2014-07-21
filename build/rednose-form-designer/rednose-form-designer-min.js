YUI.add("rednose-form-designer",function(e,t){var n;n=e.Base.create("configureItems",e.Widget,[e.Rednose.Dialog],{template:'<div>   <div class="control-group">   </div></div>',_table:null,render:function(){var t=this,n=e.Node.create(this.template),r=this.get("model").get("properties"),i=[];r.choices&&e.Object.each(r.choices,function(e,t){i.push({label:e,value:t})}),this._table=new e.Rednose.DataTable({columns:[{key:"label",label:"Label",editable:!0},{key:"value",label:"Value",editable:!0}],data:i}),this._table.render(n.one(".control-group")),n.one(".control-group").setStyle("width","630px;"),this.prompt({title:"Configure items: "+this.get("model").get("caption"),html:n},function(){var e={},n=t.get("model").get("properties"),r=t._table.hasPlugin("editable").getData();r.each(function(t){e[t.get("value")]=t.get("label")}),n.choices=e,t.get("model").set("properties",n),t.destroy()}),this._table.plug(e.Rednose.DataTableEditRowPlugin),this._table.plug(e.Rednose.DataTableSelectPlugin),this.addButtons([{value:"",icon:"icon-plus",position:"left",callback:function(){t._addItem()}},{value:"",icon:"icon-remove",position:"left",callback:function(){t._removeItem()}}])},_addItem:function(){var e=this._table.get("data");e.add({name:"",value:""})},_removeItem:function(){var e=this._table.hasPlugin("selectable").getSelection();e&&e.destroy()}},{ATTRS:{model:{value:null}}}),e.namespace("Rednose.FormDesigner").ConfigureItems=n;var r=e.Rednose.Form.FormModel,i=e.Rednose.DataSource.DataSourceList,s="Dynamic Items",o="Cancel",u="OK",a="None",f="close",l="ok",c=e.Base.create("configureDynamicItemsView",e.View,[e.Rednose.View.Nav],{fixed:!1,close:!0,padding:!0,title:s,buttonGroups:[{position:"right",buttons:[{id:"ok",value:u,type:"primary"}]},{position:"right",buttons:[{id:"close",value:o}]}],events:{"#dataSource":{change:"_handleDataSourceSelectChange"}},OPTION_TEMPLATE:'<option value="{value}">{label}</option>',template:'<form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="dataSource">Data Source</label><div class="controls"><select class="input-block-level" id="dataSource"></select></div></div><hr/><div class="control-group"><label class="control-label" for="title">Title</label><div class="controls"><select class="input-block-level" id="title"></select></div></div><div class="control-group"><label class="control-label" for="subtitle">Subtitle</label><div class="controls"><select class="input-block-level" id="subtitle"></select></div></div><div class="control-group"><label class="control-label" for="image">Image</label><div class="controls"><select class="input-block-level" id="image"></select></div></div><div class="control-group"><label class="control-label" for="value">Value</label><div class="controls"><select class="input-block-level" id="value"></select></div></div></fieldset></form>',_dataSourceSelect:null,_titleSelect:null,_subtitleSelect:null,_imageSelect:null,_valueSelect:null,_identifierMap:{},initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t),this._dataSourceSelect=e.one("#dataSource"),this._titleSelect=e.one("#title"),this._subtitleSelect=e.one("#subtitle"),this._imageSelect=e.one("#image"),this._valueSelect=e.one("#value"),this.after("toolbar:click#close",this._handleButtonClose,this),this.after("toolbar:click#ok",this._handleButtonOk,this)},destructor:function(){this._dataSourceSelect=null,this._titleSelect=null,this._subtitleSelect=null,this._imageSelect=null,this._valueSelect=null,this._identifierMap=null},render:function(){var e=this.get("model").get("properties"),t=this.get("dataSourceList"),n=this;return this._identifierMap={},this._updateSelectNode(this._dataSourceSelect,t.map(function(e){return n._identifierMap[e.get("identifier")]=e,{value:e.get("identifier"),label:e.get("name")}})),e.datasource&&this._dataSourceSelect.set("value",e.datasource.id),this._handleDataSourceSelectChange(),this},_bindView:function(){var t=this.get("model"),n=e.clone(t.get("properties"));if(this._dataSourceSelect.get("value")==="0")n.datasource=undefined;else{n.datasource||(n.datasource={}),n.datasource.id=this._dataSourceSelect.get("value");var r={};this._titleSelect.get("value")!=="0"&&(r.title=this._titleSelect.get("value")),this._subtitleSelect.get("value")!=="0"&&(r.subtitle=this._subtitleSelect.get("value")),this._imageSelect.get("value")!=="0"&&(r.image=this._imageSelect.get("value")),this._valueSelect.get("value")!=="0"&&(r.value=this._valueSelect.get("value")),e.Object.isEmpty(r)?n.datasource.map=undefined:n.datasource.map=r}t.set("properties",n)},_updateSelectNode:function(t,n){n||(n=[]);var r=this;t.empty(),t.append(e.Lang.sub(this.OPTION_TEMPLATE,{value:0,label:a})),e.Array.each(n,function(n){t.append(e.Lang.sub(r.OPTION_TEMPLATE,{value:n.value,label:n.label}))})},_handleDataSourceSelectChange:function(){var t=this._dataSourceSelect.get("value"),n=[];if(t!=="0"){var r=this._identifierMap[t],i=r.getAttributeList();n=e.Array.map(i,function(e){return{value:e,label:e}})}this._updateSelectNode(this._titleSelect,n),this._updateSelectNode(this._subtitleSelect,n),this._updateSelectNode(this._imageSelect,n),this._updateSelectNode(this._valueSelect,n);var s=this.get("model").get("properties"),o;if(!s.datasource||!s.datasource.map)return;t===s.datasource.id&&(o=s.datasource.map,this._titleSelect.set("value",o.title||"0"),this._subtitleSelect.set("value",o.subtitle||"0"),this._imageSelect.set("value",o.image||"0"),this._valueSelect.set("value",o.value||"0"))},_handleButtonClose:function(){this.fire(f)},_handleButtonOk:function(){var e=this.get("model");this._bindView(),this.fire(l,{model:e})}},{ATTRS:{model:{value:new r},dataSourceList:{value:new i}}});e.namespace("Rednose.FormDesigner").ConfigureDynamicItemsView=c;var h,p;h=e.Base.create("objectLibrary",e.Widget,[],{render:function(e,t){return this}},{ATTRS:{items:{value:[{id:"text",title:"Text",icon:"rednose-icon-text"},{id:"textarea",title:"Text Area",icon:"rednose-icon-textarea"},{id
:"richtext",title:"Rich Text",icon:"rednose-icon-textarea"},{id:"dropdown",title:"Drop-down List",icon:"rednose-icon-dropdown"},{id:"radio",title:"Radio Button",icon:"rednose-icon-radio"},{id:"checkbox",title:"Checkbox",icon:"rednose-icon-checkbox"},{id:"date",title:"Date",icon:"rednose-icon-date"},{id:"autocomplete",title:"Autocomplete",icon:"rednose-icon-dropdown"},{id:"file",title:"File",icon:"rednose-icon-dropdown"}]}}}),p=e.Base.create("objectLibraryView",e.View,[e.Rednose.Dialog],{template:'<div>   <div class="control-group">       <label for="input" class="control-label">Caption</label>       <div class="controls">           <input type="text" data-path="name" value="" id="name">       </div>   </div>   <div class="control-group">       <label for="input" class="control-label">Identifier</label>       <div class="controls">           <input type="text" data-path="foreignId" id="foreignId" />       </div>   </div></div>',render:function(){var t=this,n=this.get("item").title,r=this.get("item").id,i=e.Node.create(this.template),s=i.one("#foreignId");i.one("input[data-path=name]").on(["keyup","change"],function(e){t._autoFillForeignId(e,s)}),i.one("input[data-path=foreignId]").on(["keyup","change"],function(e){t._foreignIdChange(e)}),this.prompt({title:"Add a new "+n,html:i},function(n){var i=new e.Rednose.Form.ControlModel({caption:n.one("[data-path=name]").get("value"),foreignId:n.one("[data-path=foreignId]").get("value"),type:r});t.get("model").get("controls").add(i),t.destroy()})},_autoFillForeignId:function(e,t){var n=this._cleanString(e.target.get("value"));t.hasAttribute("data-noautofill")===!1&&t.set("value",n)},_foreignIdChange:function(e){var t=this._cleanString(e.target.get("value"));e.target.set("value",t),e.target.setAttribute("data-noautofill","true"),t===""&&e.target.removeAttribute("data-noautofill")},_cleanString:function(e){return e.replace(/ /g,"_").replace(/\W/g,"_")}},{ATTRS:{item:{value:{}},model:{value:null}}}),e.namespace("Rednose.FormDesigner").ObjectLibrary=h,e.namespace("Rednose.FormDesigner").ObjectLibraryView=p;var d="Hierarchy",v="Remove",m="select",g=e.Base.create("hierarchyView",e.View,[],{template:'<div class="rednose-hierarchy></div>',events:{".yui3-treeview-row":{contextmenu:"_handleContextMenu"}},_treeView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t)},destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var t=this,n=this.get("container"),r=this.get("model");return this._treeView&&this._treeView.destroy(),n.append('<div class="rednose-treeview"></div>'),this._treeView=new e.Rednose.TreeView({container:n.one(".rednose-treeview"),nodes:r.getTree(),selectable:!0,header:d}),this._treeView.open(),this._treeView.render(),this._treeView.after("select",function(e){t.fire(m,{node:e.node})}),this},_handleContextMenu:function(t){var n=t.currentTarget;t.preventDefault();if(n.contextMenu)return!1;var r=this._treeView.getNodeById(n.getData("node-id")).data;return r&&r instanceof e.Rednose.Form.ControlModel&&(n.plug(e.Rednose.ContextMenu,{content:[{title:v,id:"removeControl"}],data:r,bubbleTarget:this}),n.contextMenu._handleContextMenu(t)),!0},_setModel:function(e){var t=e.get("controls");t.after("add",this.render,this)}},{ATTRS:{model:{value:new e.Rednose.Form.FormModel}}});e.namespace("Rednose.FormDesigner").HierarchyView=g;var y=e.Base.create("dataControlsView",e.View,[],{destructor:function(){this._treeView&&this._treeView.destroy(),this._treeView=null},render:function(){var t=this.get("container"),n=this.get("identity"),r=this;if(!n)return this;t.setStyle("height","100%"),t.setStyle("overflow","auto"),t.append('<div class="rednose-treeview"></div>'),this._treeView=new e.Rednose.TreeView({container:t.one(".rednose-treeview"),selectable:!1,header:"Data controls"}),this._treeView.plug(e.Rednose.Plugin.TreeViewDataSource,{datasource:new e.Docgen.DataSource({source:Routing.generate("rednose_docgen_get_identities")})}),this._treeView.render(),this._treeView.datasource.load("/"+n+"/controls",function(){r._treeView.set("animated",!1),r._treeView.open(),r._treeView.set("animated",!0)})}},{ATTRS:{identity:{value:null}}});e.namespace("Rednose.FormDesigner").DataControlsView=y;var b="Data Sources",w="Edit Data Source",E="Delete Data Source",S=e.Rednose.DataSource.DataSource,x;x=e.Base.create("dataSourcesView",e.View,[],{template:'<div class="rednose-data-sources></div>',events:{".yui3-treeview-row":{contextmenu:"_handleContextMenu"}},_treeView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t)},destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var t=this,n=this.get("container"),r=this.get("modelList");return this._treeView&&this._treeView.destroy(),n.append('<div class="rednose-treeview"></div>'),r.load(function(){t._treeView=new e.Rednose.TreeView({container:n.one(".rednose-treeview"),nodes:r.getTree(),selectable:!1,header:b}),t._treeView.render()}),this},_handleContextMenu:function(t){var n=t.currentTarget;t.preventDefault();if(n.contextMenu)return!1;var r=this._treeView.getNodeById(n.getData("node-id")).data;r instanceof S&&(n.plug(e.Rednose.ContextMenu,{content:[{title:w,id:"dataSourceEdit"},{title:"-"},{title:E,id:"dataSourceDelete"}],data:r,bubbleTarget:this}),n.contextMenu._handleContextMenu(t))}},{ATTRS:{modelList:{value:new e.Rednose.DataSource.DataSourceList}}}),e.namespace("Rednose.FormDesigner").DataSourcesView=x;var T={text:"Text",textarea:"Text Area",html:"Rich Text",dropdown:"Drop-down List",radio:"Radio Button",checkbox:"Checkbox",date:"Date",autocomplete:"Autocomplete",file:"File"},N=e.Template.Micro,C;C=e.Base.create("objectAttributesView",e.Rednose.Dialog,[],{footer:!1,padding:!0,formTemplate:N.compile('<form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="type">Type</label><div class="controls"><select class="input-block-level" id="type"></select></div></div><hr/><div class="control-group"><label class="control-label" for="id">Name</label><div class="controls"><input class="input-block-level" id="name" type="text" value="<%= data.name %>"/></div></div><div class="control-group"><label class="control-label" for="caption">Caption</label><div class="controls"><input class="input-block-level" id="caption" type="text" value="<%= data.caption %>"/></div></div><hr/><div class="control-group"><label class="control-label" for="value">Value</label><div class="controls"><input class="input-block-level" id="value" type="text" value="<%= data.value %>"/></div></div><div class="control-group"><label class="control-label">Required</label><div class="controls"><input type="checkbox" id="required" <% if (data.required) { %>checked<% } %>></input></div></div><div class="control-group"><label class="control-label">Visible</label><div class="controls"><input type="checkbox" id="visible" <% if (data.visible) { %>checked<% } %>></input></div></div><div class="control-group"><label class="control-label">Protected</label><div class="controls"><input type="checkbox" id="protected" <% if (data.protected) { %>checked<% } %>></input></div></div><div class="control-group"><label class="control-label">Readonly</label><div class="controls"><input type="checkbox" id="readonly" <% if (data.readonly) { %>checked<% } %>></input></div></div><% if (data.type == \'dropdown\' || data.type == \'radio\' || data.type == \'autocomplete\') { %><hr/><div class="control-group"><label class="control-label" for="configureItems">Items</label><div class="controls"><div class="input-append"><input class="rednose-combo-block-level" type="text" id="items" readonly value="<%= data.properties.choices ? Y.Object.keys(data.properties.choices).length : 0 %> items"><button class="btn dropdown-toggle" id="configureItemsList" type="button" title="Configure Items"><i class="icon-cog"></i> <span class="caret"></span></button></button></div></div></div><% } %><hr/><div class="control-group"><label class="control-label" for="binding">Binding</label><div class="controls"><input class="input-block-level" id="binding" type="text" value="<%= data.binding %>"/></div></div><fieldset></form>'
),emptyTemplate:'<div class="alert alert-info">No attributes available</div>',events:{form:{change:"_handleFormChange"}},initializer:function(){this.on("dropdown:click#configureItems",this._handleConfigureItems,this),this.on("dropdown:click#configureDynamicItems",this._handleConfigureDynamicItems,this)},render:function(){var t=this.get("model");return this.node=e.Node.create(this.formTemplate(t.getAttrs())),this._renderForm(),this.prompt({title:"Control properties",html:this.node}),this},_renderForm:function(){var t=this.get("model"),n=this.node;if(t){n.append(this.formTemplate(t.getAttrs()));var r=n.one("#configureItemsList");r&&(r.plug(e.Rednose.Plugin.Dropdown,{showCaret:!1,items:[{id:"configureItems",title:"Items",icon:"icon-align-justify"},{id:"configureDynamicItems",title:"Dynamic items",icon:"icon-random"}]}),r.dropdown.addTarget(this)),this._renderTypeOptions()}else n.append(this.emptyTemplate)},_renderTypeOptions:function(){var t=this.get("model"),n=this.node.one("#type");e.Object.each(T,function(r,i){var s=e.Node.create(e.Lang.sub('<option value="{value}">{label}</option>',{value:i,label:r}));t.get("type")===i&&s.setAttribute("selected","selected"),n.append(s)})},_handleFormChange:function(e){var t=e.target,n=t.get("id"),r=t.get("type")==="checkbox"?t.get("checked"):t.get("value");this.get("model").set(n,r),n==="type"&&this.fire("typeChange")},_handleConfigureItems:function(){this.fire("configureItems",{model:this.get("model")})},_handleConfigureDynamicItems:function(){this.fire("configureDynamicItems",{model:this.get("model")})}},{ATTRS:{model:{value:null}}}),e.namespace("Rednose.FormDesigner").ObjectAttributesView=C;var N=e.Template.Micro,k=e.Base.create("formView",e.View,[],{templates:{form:N.compile('<div class="rednose-form-view"><form class="rednose-form form-horizontal"/></div>'),section:N.compile('<fieldset class="section"><% if (data.caption) { %><legend><%= data.caption %></legend><% } %></fieldset>')},_controlViewMap:{},_controlMap:[],destructor:function(){e.Array.each(this._controlMap,function(e){e.destroy(),e=null})},render:function(){var e=this,t=this.get("container"),n=this.get("model"),r=this.templates;return this._controlViewMap=[],t.setHTML(r.form()),n.get("sections").each(function(n){t.one("form").append(e._renderSection(n))}),this},_renderSection:function(t){var n=this,r=e.Node.create(this.templates.section(t.getAttrs()));return t.get("inline")&&r.addClass("rednose-form-inline"),t.get("controls").each(function(e){r.append(n._renderControl(e))}),r},_renderControl:function(t){var n=e.Rednose.Form.ControlViewFactory.create(t),r=this,i;n&&(i=n.render().get("container"),r._controlViewMap[t.get("id")]=n,t.view=n,n.addTarget(r),this._controlMap.push(n));if(t.get("type")==="image"){var s=e.Node.create('<img src="http://www.tweedekamer.nl/images/7885_tcm181-114584.jpg"></img>'),o=t.get("properties");i=e.Node.create("<div></di>"),i.append(s)}return i},_dragging:function(e,t,n){var r=e.currentTarget.mouseXY[1],i=!1;t.all("> div").each(function(e){if(n.get("id")!==e.get("id")){var t=e.getY(),s=t+parseInt(e.getComputedStyle("height"),10);r>t&&r<s&&(n.insertBefore(n,e),i=!0)}}),i===!1&&r>t.getY()+parseInt(t.getComputedStyle("height"),10)&&t.append(n)},_setSortOrder:function(e){var t=0,n=[];e.all("> div").each(function(e){var r=e.getData("model");r.set("sortOrder",t),n.push(r),t++}),this.get("model").set("controls",n)},_handleAddControl:function(e){this._renderControl(e.model)}},{ATTRS:{model:{value:new e.Rednose.Form.FormModel}}});e.namespace("Rednose.FormDesigner").FormView=k;var L=e.Rednose.FormDesigner.ConfigureDynamicItemsView,A=e.Rednose.Panel,O=e.Base.create("formDesigner",e.Rednose.App,[],{views:{form:{type:e.Rednose.FormDesigner.FormView}},_handleRemoveControl:function(t){var n=this,r=t.data,i=new e.Rednose.Dialog;i.confirm({title:"Remove control: "+r.get("caption")+"?",text:"Are you sure you want to remove the control"+r.get("caption")+" connected data may possibly be lost!",type:"warning",confirm:"DELETE"},function(){n.get("model").get("controls").remove(r),n.showForm(),n._handleControlSelect({model:n._objectAttributesView.get("model")})})},_handleObjectTypeChange:function(){this.showForm(),this._handleControlSelect({model:this._objectAttributesView.get("model")})},_handleConfigureItems:function(t){var n=new e.Rednose.FormDesigner.ConfigureItems({model:t.model});n.render()},_handleConfigureDynamicItems:function(e){var t=e.model;if(!t)return;var n=this._dataSourcesView.get("modelList"),r,i;r=(new L({model:t,dataSourceList:n})).render(),i=(new A({srcNode:r.get("container"),width:500})).render(),r.on(["close","ok"],function(){r.destroy(),i.destroy()})},_handleClose:function(){this.destroy()}},{ATTRS:{model:{value:new e.Rednose.Form.FormModel}}});e.namespace("Rednose.FormDesigner").Base=O,e.Rednose.FormDesigner.ControlItems=[{id:"text",title:"Text",icon:"rednose-icon-text"},{id:"textarea",title:"Text Area",icon:"rednose-icon-textarea"},{id:"richtext",title:"Rich Text",icon:"rednose-icon-textarea"},{type:"divider"},{id:"dropdown",title:"Drop-down List",icon:"rednose-icon-dropdown"},{id:"radio",title:"Radio Button",icon:"rednose-icon-radio"},{id:"checkbox",title:"Checkbox",icon:"rednose-icon-checkbox"},{type:"divider"},{id:"date",title:"Date",icon:"rednose-icon-date"},{id:"autocomplete",title:"Autocomplete",icon:"rednose-icon-dropdown"},{id:"file",title:"File",icon:"rednose-icon-dropdown"}];var M=e.Base.create("formDesigner",e.Rednose.FormDesigner.Base,[e.Rednose.View.Template.SingleView,e.Rednose.View.Template.Toolbar,e.Rednose.View.Nav],{title:"Form",footer:!1,close:!0,initializer:function(){this.onceAfter("initializedChange",function(){this._initializeToolbar()}),this.once("ready",function(){this.get("model").get("controls").size()>0&&this.showForm()})},_initializeToolbar:function(){this.toolbar=(new e.Rednose.Toolbar({container:this.get("toolbarContainer"),groups:[{buttons:[{id:"actions",value:"Actions"}]},{buttons:[{id:"undo",icon:"icon-arrow-left",title:"Undo",disabled
:!0},{id:"redo",icon:"icon-arrow-right",title:"Redo",disabled:!0}]},{buttons:[{id:"insert",icon:"icon-plus",title:"Insert"}]}]})).render(),this.toolbar.getButtonById("actions").plug(e.Rednose.Plugin.ButtonDropdown,{items:[{id:"newDataSource",title:"New Data Source..."},{type:"divider"},{id:"preview",title:"Preview"},{id:"save",title:"Save"}]}),this.toolbar.getButtonById("insert").plug(e.Rednose.Plugin.ButtonDropdown,{items:e.Rednose.FormDesigner.ControlItems}),this.toolbar.addTarget(this)}});e.namespace("Rednose").FormDesigner=e.mix(M,e.Rednose.FormDesigner);var _=e.Base.create("formDesigner",e.Rednose.FormDesigner.Base,[e.Rednose.View.Template.Navbar,e.Rednose.View.Template.ThreeColumn],{appViews:{dataSource:{type:"Rednose.DataSourceManager",modal:!0,width:640}},_objectLibrary:null,_hierarchyView:null,_dataSourcesView:null,_dataControlsView:null,initializer:function(){e.mix(this.views,this.appViews),this._objectLibrary=new e.Rednose.FormDesigner.ObjectLibrary,this._hierarchyView=new e.Rednose.FormDesigner.HierarchyView,this._dataSourcesView=new e.Rednose.FormDesigner.DataSourcesView,this._dataControlsView=new e.Rednose.FormDesigner.DataControlsView,this._objectLibrary.addTarget(this),this._hierarchyView.addTarget(this),this._dataSourcesView.addTarget(this),this._dataControlsView.addTarget(this),this.after({"navbar:click#preview":this._handlePreview,"navbar:click#save":this._handleSave,"navbar:click#newDataSource":this._handleNewDataSource,"hierarchyView:select":this._handleControlSelect,"objectLibrary:objectAdd":this._handleObjectAdd}),this.after("objectAttributesView:typeChange",this._handleObjectTypeChange,this),this.after("objectAttributesView:configureItems",this._handleConfigureItems,this),this.after("objectAttributesView:configureDynamicItems",this._handleConfigureDynamicItems,this),this.onceAfter("initializedChange",function(){this._initializeNavbar()}),this.once("ready",function(){this.get("leftContainer").append(this._hierarchyView.render().get("container")),this.get("leftContainer").append(this._dataSourcesView.render().get("container")),this.get("rightContainer").append(this._dataControlsView.render().get("container")),this.hasRoute(this.getPath())&&this.dispatch()})},destructor:function(){this._objectLibrary.destroy(),this._objectLibrary=null,this._hierarchyView.destroy(),this._hierarchyView=null,this._dataSourcesView.destroy(),this._dataSourcesView=null,this._dataControlsView.destroy(),this._dataControlsView=null,this.navbar.destroy(),this.navbar=null},_initializeNavbar:function(){this.navbar=(new e.Rednose.Navbar({container:this.get("navbarContainer"),title:"Form Designer",columnLayout:!0,menu:e.Rednose.FormDesigner.NavbarItems,menuSecondary:[{title:YUI.Env.user.name,icon:"icon-user",items:[{url:Routing.generate("_security_logout"),title:"Sign out"}]}]})).render(),this.navbar.addTarget(this)},_handlePreview:function(){var e=this.get("model");window.open(Routing.generate("rednose_framework_forms_preview",{id:e.get("id")}),"_blank")},_handleSave:function(){var t=this.get("model");console.log(e.JSON.stringify(t.toJSON()))},_handleNewDataSource:function(){this.showView("dataSource")},_handleControlSelect:function(t){var n=t.node,r=this.get("model"),i=new e.Rednose.FormDesigner.ObjectAttributesView({model:r.getControl(n.label)});i.render()},_handleObjectAdd:function(t){var n=this,r=new e.Rednose.FormDesigner.ObjectLibraryView({model:this.get("model"),item:t.item});r.on("destroy",function(){n.showForm()}),r.render()},_handleDataSourceEdit:function(t){var n=t.data,r=new DataSourceManager({model:n}),i=this;r.render(),r.showChoicePage();var s=new e.Rednose.Panel({srcNode:r.get("container"),width:640});s.render(),r.on("close",function(){r.destroy(),s.destroy()}),r.on("create",function(e){var t=e.model;t.save(function(){r.destroy(),s.destroy(),i._dataSourcesView.render()})})},_handleDataSourceDelete:function(e){console.log(e)},handleForm:function(t,n,r){var i=t.params.id,s=this.get("model"),o=this;i===s.get("id")&&!s.isNew()?(t.form=s,r()):(s=new e.Rednose.Form.FormModel({id:i}),s.load(function(){o.set("model",s),t.form=s,r()}))},showForm:function(e,t){this.get("activeView")&&this.get("activeView").destroy(),e||(e={form:this.get("model")},t={transition:!1}),this.showView("form",{model:e.form},{transition:t.transition}),this._hierarchyView&&(this._hierarchyView.set("model",e.form),this._hierarchyView.render()),this._dataControlsView&&(this._dataControlsView.set("identity",e.form.get("identity")),this._dataControlsView.render())}},{ATTRS:{routes:{value:[{path:"/:id/edit",callbacks:["handleForm","showForm"]}]}}});e.namespace("Rednose.FormDesigner").App=_,e.Rednose.FormDesigner.NavbarItems=[{title:"File",large:!0,items:[{id:"newDataSource",title:"New Data Source...",keyCode:"ctrl+d"},{type:"divider"},{id:"preview",title:"Preview"},{id:"save",title:"Save"}]},{title:"Insert",items:e.Rednose.FormDesigner.ControlItems}]},"1.5.0-DEV",{requires:["docgenadmin-core","rednose-app","rednose-button-dropdown","rednose-datatable-select","rednose-datasource-manager","rednose-dialog","rednose-dropdown","rednose-form","rednose-form-designer-css","rednose-navbar","rednose-nodescroll","rednose-treeview"]});
