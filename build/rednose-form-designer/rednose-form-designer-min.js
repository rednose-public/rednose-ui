YUI.add("rednose-form-designer",function(Y,NAME){var ConfigureItems;ConfigureItems=Y.Base.create("configureItems",Y.Widget,[Y.Rednose.Dialog],{template:'<div>   <div class="control-group">   </div></div>',_table:null,render:function(){var e=this,t=Y.Node.create(this.template),n=this.get("model").get("properties"),r=[];n.choices&&(console.log(n.choices),Y.Object.each(n.choices,function(e,t){r.push({label:e,value:t})})),this._table=new Y.Rednose.DataTable({columns:[{key:"label",label:"Label",editable:!0},{key:"value",label:"Value",editable:!0}],data:r}),this._table.render(t.one(".control-group")),t.one(".control-group").setStyle("width","630px;"),this.prompt({title:"Configure items: "+this.get("model").get("caption"),html:t},function(t){var n={},r=e.get("model").get("properties"),i=e._table.hasPlugin("editable").getData();i.each(function(e){n[e.get("value")]=e.get("label")}),r.choices=n,e.get("model").set("properties",r),e.destroy()}),this._table.plug(Y.Rednose.DataTableEditRowPlugin),this._table.plug(Y.Rednose.DataTableSelectPlugin),this.addButtons([{value:"",icon:"icon-plus",position:"left",callback:function(){e._addItem()}},{value:"",icon:"icon-remove",position:"left",callback:function(){e._removeItem()}}])},_addItem:function(){var e=this._table.get("data");e.add({name:"",value:""})},_removeItem:function(){alert("delete")}},{ATTRS:{model:{value:null}}}),Y.namespace("Rednose.FormDesigner").ConfigureItems=ConfigureItems;var TXT_OBJECT_LIBRARY="Object Library",EVT_SELECT="select",ObjectLibraryView;ObjectLibraryView=Y.Base.create("objectLibraryView",Y.View,[],{template:'<div class="rednose-object-library></div>',_treeView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t)},destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var e=this.get("container"),t=this.get("model"),n=this;return this._treeView=(new Y.Rednose.TreeView({container:e,model:t,selectable:!0,header:TXT_OBJECT_LIBRARY})).render(),this._treeView.after("select",function(e){e.node.unselect();var t=e.node.data;t&&t instanceof Y.Model&&n.fire(EVT_SELECT,{model:t})}),this}},{ATTRS:{model:{value:new Y.Rednose.ModelTree({items:[{label:"Text",data:new Y.Model,icon:"rednose-icon-text"},{label:"Text Area",data:new Y.Model,icon:"rednose-icon-textarea"},{label:"Rich Text",data:new Y.Model,icon:"rednose-icon-textarea"},{label:"Drop-down List",data:new Y.Model,icon:"rednose-icon-dropdown"},{label:"Radio Button",data:new Y.Model,icon:"rednose-icon-radio"},{label:"Checkbox",data:new Y.Model,icon:"rednose-icon-checkbox"},{label:"Date",data:new Y.Model,icon:"rednose-icon-date"},{label:"Autocomplete",data:new Y.Model,icon:"rednose-icon-dropdown"},{label:"File",data:new Y.Model,icon:"rednose-icon-dropdown"}]})}}}),Y.namespace("Rednose.FormDesigner").ObjectLibraryView=ObjectLibraryView;var TXT_HIERARCHY="Hierarchy",HierarchyView,EVT_SELECT="select";HierarchyView=Y.Base.create("hierarchyView",Y.View,[],{template:'<div class="rednose-hierarchy></div>',_treeView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t)},destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var e=this,t=this.get("container"),n=this.get("model");return this._treeView&&this._treeView.destroy(),t.append('<div class="rednose-treeview"></div>'),this._treeView=new Y.Rednose.TreeView({container:t.one(".rednose-treeview"),model:n.getTree(),selectable:!0,header:TXT_HIERARCHY}),this._treeView.render(),this._treeView.after("select",function(t){t.node.unselect();var n=t.node.data;n&&n instanceof Y.Rednose.Form.ControlModel&&e.fire(EVT_SELECT,{model:n})}),this},_setModel:function(e){var t=e.get("controls");t.after("add",this.render,this)}},{ATTRS:{model:{value:new Y.Rednose.Form.FormModel,setter:"_setModel"}}}),Y.namespace("Rednose.FormDesigner").HierarchyView=HierarchyView;var TXT_DATA_SOURCES="Data Sources",TXT_DATA_SOURCE_EDIT="Edit Data Source",TXT_DATA_SOURCE_DELETE="Delete Data Source",DataSource=Y.Rednose.DataSource.DataSource,DataSourcesView;DataSourcesView=Y.Base.create("dataSourcesView",Y.View,[],{template:'<div class="rednose-data-sources></div>',events:{".yui3-treeview-row":{contextmenu:"_handleContextMenu"}},_treeView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t)},destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var e=this,t=this.get("container"),n=this.get("modelList");return this._treeView&&this._treeView.destroy(),t.append('<div class="rednose-treeview"></div>'),n.load(function(){e._treeView=new Y.Rednose.TreeView({container:t.one(".rednose-treeview"),model:n.getTree(),selectable:!1,header:TXT_DATA_SOURCES}),e._treeView.render()}),this},_handleContextMenu:function(e){var t=e.currentTarget;e.preventDefault();if(t.contextMenu)return!1;var n=this._treeView.getNodeById(t.getData("node-id")).data;n instanceof DataSource&&(t.plug(Y.Rednose.ContextMenu,{content:[{title:TXT_DATA_SOURCE_EDIT,id:"dataSourceEdit"},{title:"-"},{title:TXT_DATA_SOURCE_DELETE,id:"dataSourceDelete"}],data:n,bubbleTarget:this}),t.contextMenu._handleContextMenu(e))}},{ATTRS:{modelList:{value:new Y.Rednose.DataSource.DataSourceList}}}),Y.namespace("Rednose.FormDesigner").DataSourcesView=DataSourcesView;var TXT_CONTROL_TYPES={text:"Text",textarea:"Text Area",html:"Rich Text",dropdown:"Drop-down List",radio:"Radio Button",checkbox:"Checkbox",date:"Date",autocomplete:"Autocomplete",file:"File"},TXT_OBJECT_ATTRIBUTES="Object Attributes",Micro=Y.Template.Micro,ObjectAttributesView;ObjectAttributesView=Y.Base.create("objectAttributesView",Y.View,[Y.Rednose.View.Nav],{title:TXT_OBJECT_ATTRIBUTES,footer:!1,formTemplate:Micro.compile('<form class="form-vertical"><fieldset><div class="control-group"><label class="control-label" for="id">Identifier</label><div class="controls"><input class="input-block-level" id="id" type="text" readonly value="<%= data.foreignId %>"/></div></div><div class="control-group"><label class="control-label" for="caption">Caption</label><div class="controls"><input class="input-block-level" id="caption" type="text" value="<%= data.caption %>"/></div></div><div class="control-group"><label class="control-label" for="value">Value</label><div class="controls"><input class="input-block-level" id="value" type="text" value="<%= data.value %>"/></div></div><hr/><div class="control-group"><label class="control-label" for="type">Type</label><div class="controls"><select class="input-block-level" id="type"></select></div></div><% if (data.type == \'dropdown\' || data.type == \'radio\') { %><div class="control-group"><label class="control-label" for="type"></label><div class="controls"><input type="button" class="btn" value="Configure items" id="configureItems" /></div></div><% } %><hr/><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="required" <% if (data.required) { %>checked<% } %>> Required</label></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="visible" <% if (data.visible) { %>checked<% } %>> Visible</label></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="protected" <% if (data.protected) { %>checked<% } %>> Protected</label></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="readonly" <% if (data.readonly) { %>checked<% } %>> Readonly</label></div></div><fieldset></form>'
),events:{form:{change:"_handleFormChange"},"#configureItems":{click:"_handleConfigureItems"}},render:function(){return this._renderForm(),this},_renderForm:function(){var e=this,t=this.get("model"),n=this.get("container");n.empty(),n.append(this.formTemplate(t.getAttrs())),this._renderTypeOptions()},_renderTypeOptions:function(){var e=this.get("model"),t=this.get("container").one("#type");Y.Object.each(TXT_CONTROL_TYPES,function(n,r){var i=Y.Node.create(Y.Lang.sub('<option value="{value}">{label}</option>',{value:r,label:n}));e.get("type")===r&&i.setAttribute("selected","selected"),t.append(i)})},_handleFormChange:function(e){var t=e.target,n=t.get("id"),r=t.get("type")==="checkbox"?t.get("checked"):t.get("value");this.get("model").set(n,r),n=="type"&&this.fire("typeChange")},_handleConfigureItems:function(){this.fire("configureItems",{model:this.get("model")})}},{ATTRS:{model:{value:new Y.Rednose.Form.ControlModel}}}),Y.namespace("Rednose.FormDesigner").ObjectAttributesView=ObjectAttributesView;var FormView;FormView=Y.Base.create("formView",Y.View,[],{template:'<div class="rednose-form-view"><form class="rednose-form form-horizontal"><fieldset><legend>{caption}</legend></fieldset></form></div>',_controlViewMap:{},_expressionMap:[],_controlMap:[],initializer:function(){var e=this.get("model"),t=e.get("controls");t.after("add",this._handleAddControl,this)},destructor:function(){Y.Array.each(this._controlMap,function(e){e.destroy(),e=null}),this._expressionMap=null},render:function(){var e=this,t=this.get("container"),n=this.get("model"),r=this.template;return this._controlViewMap=[],this._expressionMap=[],t.setHTML(Y.Lang.sub(r,{caption:n.get("caption")})),n.get("controls").each(function(t){e._renderControl(t)}),this},_renderControl:function(e){var t=this.get("container"),n=Y.Rednose.Form.ControlViewFactory.create(e),r=this;n&&(r._controlViewMap[e.get("id")]=n,e.view=n,n.addTarget(r),n.after("*:change",function(){}),t.one("fieldset").append(n.render().get("container")),this._controlMap.push(n))},_evalutateExpressions:function(){var self=this,objectDefinitions=[];Y.Object.each(this._controlViewMap,function(e){var t=e.get("model").get("foreignId"),n=Y.JSON.stringify(e.get("model").toJSON());objectDefinitions.push(t+" = "+n)});var lines=[];lines.push("var "+objectDefinitions.join(", ")+";"),lines.push(this._expressionMap.join(" "));var objectMappings=[];Y.Object.each(this._controlViewMap,function(e){var t=e.get("model").get("id");objectMappings.push('"'+t+'": '+t)}),lines.push("var objects = {"+objectMappings.join(", ")+"};");var objects;eval(lines.join(" ")),Y.Object.each(objects,function(e,t){var n=self._controlViewMap[t].get("model");n.setAttrs(e),self._controlViewMap[t].render()})},_handleAddControl:function(e){this._renderControl(e.model)}},{ATTRS:{model:{value:new Y.Rednose.Form.FormModel}}}),Y.namespace("Rednose.FormDesigner").FormView=FormView;var TXT_NAVBAR_CAPTION="Form Designer",DataSourceManager=Y.Rednose.DataSourceManager.DataSourceManager,FormDesigner;FormDesigner=Y.Base.create("formDesigner",Y.App,[Y.Rednose.Template.ThreeColumn],{views:{form:{type:Y.Rednose.FormDesigner.FormView}},_navbar:null,_objectLibraryView:null,_hierarchyView:null,_objectAttributesView:null,_dataSourcesView:null,initializer:function(){this._objectLibraryView=new Y.Rednose.FormDesigner.ObjectLibraryView,this._hierarchyView=new Y.Rednose.FormDesigner.HierarchyView,this._objectAttributesView=new Y.Rednose.FormDesigner.ObjectAttributesView,this._dataSourcesView=new Y.Rednose.FormDesigner.DataSourcesView,this._objectLibraryView.addTarget(this),this._hierarchyView.addTarget(this),this._objectAttributesView.addTarget(this),this._dataSourcesView.addTarget(this),this.after("hierarchyView:select",this._handleControlSelect,this),this.after("objectLibraryView:select",this._handleObjectAdd,this),this.after("objectAttributesView:typeChange",this._handleObjectTypeChange,this),this.after("objectAttributesView:configureItems",this._handleConfigureItems,this),this._initNavbar(),this.on("navbar:preview",this._handlePreview,this),this.on("navbar:save",this._handleSave,this),this.on("navbar:newDataSource",this._handleNewDataSource,this),this.on("navbar:closeDesigner",this._handleClose,this),this.on("contextMenu:dataSourceEdit",this._handleDataSourceEdit,this),this.on("contextMenu:dataSourceDelete",this._handleDataSourceDelete,this),this.hasRoute(this.getPath())&&this.dispatch()},destructor:function(){this.get("activeView")&&this.get("activeView").destroy(),this._navbar.destroy(),this._navbar=null,this._objectLibraryView.destroy(),this._objectLibraryView=null,this._hierarchyView.destroy(),this._hierarchyView=null,this._dataSourcesView.destroy(),this._dataSourcesView=null,this._objectAttributesView.destroy(),this._objectAttributesView=null},render:function(){return FormDesigner.superclass.render.apply(this,arguments),this.get("container").addClass("rednose-form-designer"),this._navbar.render(this.get("container")),this.get("gridLeft").append(this._objectLibraryView.render().get("container")),this.get("gridLeft").append(this._hierarchyView.render().get("container")),this.get("gridLeft").append(this._dataSourcesView.render().get("container")),this.get("gridRight").append(this._objectAttributesView.render().get("container")),this.get("model").get("controls").size()>0&&this.showForm(),this},_initNavbar:function(){this._navbar=new Y.Rednose.Navbar({title:TXT_NAVBAR_CAPTION,columnLayout:!0,menu:[{title:"File",items:[{id:"newDataSource",title:"New Data Source..."},{title:"-"},{id:"preview",title:"Preview"},{id:"save",title:"Save"},{title:"-"},{id:"closeDesigner",title:"Close"}]}],menuSecondary:[{title:YUI.Env.user.name,icon:"user",items:[{url:Routing.generate("_security_logout"),title:"Sign out"}]}]}),this._navbar.addTarget(this),this.set("navbar",this._navbar)},handleForm:function(e,t,n){var r=e.params.form,i=this.get("model"),s=this;r===i.get("id")&&!i.isNew()?(e.form=i,n()):(i=new Y.Rednose.Form.FormModel({id:r}),i.load(function(
){s.set("model",i),e.form=i,n()}))},showForm:function(e,t){this.get("activeView")&&this.get("activeView").destroy(),e||(e={form:this.get("model")},t={transition:!1}),this.showView("form",{model:e.form},{transition:t.transition}),this._hierarchyView.set("model",e.form),this._hierarchyView.render()},_handleControlSelect:function(e){var t=e.model;t&&t instanceof Y.Rednose.Form.ControlModel&&(t.view instanceof Y.Rednose.Form.BaseControlView&&t.view.focus(),this._objectAttributesView.set("model",t),this._objectAttributesView.render())},_handleObjectTypeChange:function(){this.showForm(),this._handleControlSelect({model:this._objectAttributesView.get("model")})},_handleConfigureItems:function(e){var t=new Y.Rednose.FormDesigner.ConfigureItems({model:e.model});t.render()},_handleObjectAdd:function(){var e=this.get("model"),t=e.get("controls");t.add(new Y.Rednose.Form.ControlModel({type:"text"}))},_handleSave:function(){var e=this.get("model");console.log(Y.JSON.stringify(e.toJSON()))},_handlePreview:function(){var e=this.get("model");window.open(Routing.generate("rednose_framework_forms_preview",{id:e.get("id")}),"_blank")},_handleNewDataSource:function(){var e=new DataSourceManager,t=this;e.render(),e.showChoicePage();var n=new Y.Rednose.Panel({srcNode:e.get("container"),width:640});n.render(),e.on("close",function(){e.destroy(),n.destroy()}),e.on("create",function(r){var i=r.model;i.save(function(){e.destroy(),n.destroy(),t._dataSourcesView.render()})})},_handleDataSourceEdit:function(e){var t=e.data,n=new DataSourceManager({model:t}),r=this;n.render(),n.showChoicePage();var i=new Y.Rednose.Panel({srcNode:n.get("container"),width:640});i.render(),n.on("close",function(){n.destroy(),i.destroy()}),n.on("create",function(e){var t=e.model;t.save(function(){n.destroy(),i.destroy(),r._dataSourcesView.render()})})},_handleClose:function(){this.destroy()},_handleDataSourceDelete:function(e){console.log(e)}},{ATTRS:{model:{value:new Y.Rednose.Form.FormModel},navbar:{value:null},routes:{value:[{path:"/:form/edit",callbacks:["handleForm","showForm"]}]}}}),Y.namespace("Rednose.FormDesigner").FormDesigner=FormDesigner},"1.1.0-DEV",{requires:["rednose-app","rednose-datasource-manager","rednose-dialog","rednose-form","rednose-form-designer-css","rednose-navbar","rednose-nodescroll","rednose-treeview"]});
