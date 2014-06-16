YUI.add("rednose-form-designer",function(Y,NAME){var ConfigureItems;ConfigureItems=Y.Base.create("configureItems",Y.Widget,[Y.Rednose.Dialog],{template:'<div>   <div class="control-group">   </div></div>',_table:null,render:function(){var e=this,t=Y.Node.create(this.template),n=this.get("model").get("properties"),r=[];n.choices&&Y.Object.each(n.choices,function(e,t){r.push({label:e,value:t})}),this._table=new Y.Rednose.DataTable({columns:[{key:"label",label:"Label",editable:!0},{key:"value",label:"Value",editable:!0}],data:r}),this._table.render(t.one(".control-group")),t.one(".control-group").setStyle("width","630px;"),this.prompt({title:"Configure items: "+this.get("model").get("caption"),html:t},function(){var t={},n=e.get("model").get("properties"),r=e._table.hasPlugin("editable").getData();r.each(function(e){t[e.get("value")]=e.get("label")}),n.choices=t,e.get("model").set("properties",n),e.destroy()}),this._table.plug(Y.Rednose.DataTableEditRowPlugin),this._table.plug(Y.Rednose.DataTableSelectPlugin),this.addButtons([{value:"",icon:"icon-plus",position:"left",callback:function(){e._addItem()}},{value:"",icon:"icon-remove",position:"left",callback:function(){e._removeItem()}}])},_addItem:function(){var e=this._table.get("data");e.add({name:"",value:""})},_removeItem:function(){var e=this._table.hasPlugin("selectable").getSelection();e&&e.destroy()}},{ATTRS:{model:{value:null}}}),Y.namespace("Rednose.FormDesigner").ConfigureItems=ConfigureItems;var FormModel=Y.Rednose.Form.FormModel,DataSourceList=Y.Rednose.DataSource.DataSourceList,TXT_DYNAMIC_ITEMS_TITLE="Dynamic Items",TXT_BUTTON_CANCEL="Cancel",TXT_BUTTON_OK="OK",TXT_OPTION_NONE="None",EVT_CLOSE="close",EVT_OK="ok",ConfigureDynamicItemsView=Y.Base.create("configureDynamicItemsView",Y.View,[Y.Rednose.View.Nav],{close:!0,title:TXT_DYNAMIC_ITEMS_TITLE,buttons:{ok:{value:TXT_BUTTON_OK,position:"right",primary:!0},close:{value:TXT_BUTTON_CANCEL,position:"right"}},events:{"#dataSource":{change:"_handleDataSourceSelectChange"}},OPTION_TEMPLATE:'<option value="{value}">{label}</option>',template:'<form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="dataSource">Data Source</label><div class="controls"><select class="input-block-level" id="dataSource"></select></div></div><hr/><div class="control-group"><label class="control-label" for="title">Title</label><div class="controls"><select class="input-block-level" id="title"></select></div></div><div class="control-group"><label class="control-label" for="subtitle">Subtitle</label><div class="controls"><select class="input-block-level" id="subtitle"></select></div></div><div class="control-group"><label class="control-label" for="image">Image</label><div class="controls"><select class="input-block-level" id="image"></select></div></div><div class="control-group"><label class="control-label" for="value">Value</label><div class="controls"><select class="input-block-level" id="value"></select></div></div></fieldset></form>',_dataSourceSelect:null,_titleSelect:null,_subtitleSelect:null,_imageSelect:null,_valueSelect:null,_identifierMap:{},initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t),this._dataSourceSelect=e.one("#dataSource"),this._titleSelect=e.one("#title"),this._subtitleSelect=e.one("#subtitle"),this._imageSelect=e.one("#image"),this._valueSelect=e.one("#value"),this.on("configureDynamicItemsView:buttonClose",this._handleButtonClose,this),this.on("configureDynamicItemsView:buttonOk",this._handleButtonOk,this)},destructor:function(){this._dataSourceSelect=null,this._titleSelect=null,this._subtitleSelect=null,this._imageSelect=null,this._valueSelect=null,this._identifierMap=null},render:function(){var e=this.get("model").get("properties"),t=this.get("dataSourceList"),n=this;return this._identifierMap={},this._updateSelectNode(this._dataSourceSelect,t.map(function(e){return n._identifierMap[e.get("identifier")]=e,{value:e.get("identifier"),label:e.get("name")}})),e.datasource&&this._dataSourceSelect.set("value",e.datasource.id),this._handleDataSourceSelectChange(),this},_bindView:function(){var e=this.get("model"),t=Y.clone(e.get("properties"));if(this._dataSourceSelect.get("value")==="0")t.datasource=undefined;else{t.datasource||(t.datasource={}),t.datasource.id=this._dataSourceSelect.get("value");var n={};this._titleSelect.get("value")!=="0"&&(n.title=this._titleSelect.get("value")),this._subtitleSelect.get("value")!=="0"&&(n.subtitle=this._subtitleSelect.get("value")),this._imageSelect.get("value")!=="0"&&(n.image=this._imageSelect.get("value")),this._valueSelect.get("value")!=="0"&&(n.value=this._valueSelect.get("value")),Y.Object.isEmpty(n)?t.datasource.map=undefined:t.datasource.map=n}e.set("properties",t)},_updateSelectNode:function(e,t){t||(t=[]);var n=this;e.empty(),e.append(Y.Lang.sub(this.OPTION_TEMPLATE,{value:0,label:TXT_OPTION_NONE})),Y.Array.each(t,function(t){e.append(Y.Lang.sub(n.OPTION_TEMPLATE,{value:t.value,label:t.label}))})},_handleDataSourceSelectChange:function(){var e=this._dataSourceSelect.get("value"),t=[];if(e!=="0"){var n=this._identifierMap[e],r=n.get("attributes");t=Y.Array.map(r,function(e){return{value:e.get("name"),label:e.get("name")}})}this._updateSelectNode(this._titleSelect,t),this._updateSelectNode(this._subtitleSelect,t),this._updateSelectNode(this._imageSelect,t),this._updateSelectNode(this._valueSelect,t);var i=this.get("model").get("properties"),s;if(!i.datasource||!i.datasource.map)return;e===i.datasource.id&&(s=i.datasource.map,this._titleSelect.set("value",s.title||"0"),this._subtitleSelect.set("value",s.subtitle||"0"),this._imageSelect.set("value",s.image||"0"),this._valueSelect.set("value",s.value||"0"))},_handleButtonClose:function(){this.fire(EVT_CLOSE)},_handleButtonOk:function(){var e=this.get("model");this._bindView(),this.fire(EVT_OK,{model:e})}},{ATTRS:{model:{value:new FormModel},dataSourceList:{value:new DataSourceList}}});Y.namespace("Rednose.FormDesigner").ConfigureDynamicItemsView=
ConfigureDynamicItemsView;var ObjectLibrary,ObjectLibraryView;ObjectLibrary=Y.Base.create("objectLibrary",Y.Widget,[],{render:function(e,t){return this}},{ATTRS:{items:{value:[{id:"text",title:"Text",icon:"rednose-icon-text"},{id:"textarea",title:"Text Area",icon:"rednose-icon-textarea"},{id:"richtext",title:"Rich Text",icon:"rednose-icon-textarea"},{id:"dropdown",title:"Drop-down List",icon:"rednose-icon-dropdown"},{id:"radio",title:"Radio Button",icon:"rednose-icon-radio"},{id:"checkbox",title:"Checkbox",icon:"rednose-icon-checkbox"},{id:"date",title:"Date",icon:"rednose-icon-date"},{id:"autocomplete",title:"Autocomplete",icon:"rednose-icon-dropdown"},{id:"file",title:"File",icon:"rednose-icon-dropdown"}]}}}),ObjectLibraryView=Y.Base.create("objectLibraryView",Y.View,[Y.Rednose.Dialog],{template:'<div>   <div class="control-group">       <label for="input" class="control-label">Caption</label>       <div class="controls">           <input type="text" data-path="name" value="" id="name">       </div>   </div>   <div class="control-group">       <label for="input" class="control-label">Identifier</label>       <div class="controls">           <input type="text" data-path="foreignId" id="foreignId" />       </div>   </div></div>',render:function(){var e=this,t=this.get("item").title,n=this.get("item").id,r=Y.Node.create(this.template),i=r.one("#foreignId");r.one("input[data-path=name]").on(["keyup","change"],function(t){e._autoFillForeignId(t,i)}),r.one("input[data-path=foreignId]").on(["keyup","change"],function(t){e._foreignIdChange(t)}),this.prompt({title:"Add a new "+t,html:r},function(t){var r=new Y.Rednose.Form.ControlModel({caption:t.one("[data-path=name]").get("value"),foreignId:t.one("[data-path=foreignId]").get("value"),type:n});e.get("model").get("controls").add(r),e.destroy()})},_autoFillForeignId:function(e,t){var n=this._cleanString(e.target.get("value"));t.hasAttribute("data-noautofill")===!1&&t.set("value",n)},_foreignIdChange:function(e){var t=this._cleanString(e.target.get("value"));e.target.set("value",t),e.target.setAttribute("data-noautofill","true"),t===""&&e.target.removeAttribute("data-noautofill")},_cleanString:function(e){return e.replace(/ /g,"_").replace(/\W/g,"_")}},{ATTRS:{item:{value:{}},model:{value:null}}}),Y.namespace("Rednose.FormDesigner").ObjectLibrary=ObjectLibrary,Y.namespace("Rednose.FormDesigner").ObjectLibraryView=ObjectLibraryView;var TXT_HIERARCHY="Hierarchy",TXT_REMOVE_CONTROL="Remove",HierarchyView,EVT_SELECT="select";HierarchyView=Y.Base.create("hierarchyView",Y.View,[],{template:'<div class="rednose-hierarchy></div>',events:{".yui3-treeview-row":{contextmenu:"_handleContextMenu"}},_treeView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t)},destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var e=this,t=this.get("container"),n=this.get("model");return this._treeView&&this._treeView.destroy(),t.append('<div class="rednose-treeview"></div>'),this._treeView=new Y.Rednose.TreeView({container:t.one(".rednose-treeview"),model:n.getTree(),selectable:!0,header:TXT_HIERARCHY}),Y.Array.each(e._treeView.rootNode.children,function(e){e.open()}),this._treeView.render(),this._treeView.after("select",function(t){var n=t.node.data;n&&n instanceof Y.Rednose.Form.ControlModel?e.fire(EVT_SELECT,{model:n}):e.fire(EVT_SELECT,{model:null})}),this},_handleContextMenu:function(e){var t=e.currentTarget;e.preventDefault();if(t.contextMenu)return!1;var n=this._treeView.getNodeById(t.getData("node-id")).data;return n&&n instanceof Y.Rednose.Form.ControlModel&&(t.plug(Y.Rednose.ContextMenu,{content:[{title:TXT_REMOVE_CONTROL,id:"removeControl"}],data:n,bubbleTarget:this}),t.contextMenu._handleContextMenu(e)),!0},_setModel:function(e){var t=e.get("controls");t.after("add",this.render,this)}},{ATTRS:{model:{value:new Y.Rednose.Form.FormModel,setter:"_setModel"}}}),Y.namespace("Rednose.FormDesigner").HierarchyView=HierarchyView;var TXT_DATA_SOURCES="Data Sources",TXT_DATA_SOURCE_EDIT="Edit Data Source",TXT_DATA_SOURCE_DELETE="Delete Data Source",DataSource=Y.Rednose.DataSource.DataSource,DataSourcesView;DataSourcesView=Y.Base.create("dataSourcesView",Y.View,[],{template:'<div class="rednose-data-sources></div>',events:{".yui3-treeview-row":{contextmenu:"_handleContextMenu"}},_treeView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t)},destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var e=this,t=this.get("container"),n=this.get("modelList");return this._treeView&&this._treeView.destroy(),t.append('<div class="rednose-treeview"></div>'),n.load(function(){e._treeView=new Y.Rednose.TreeView({container:t.one(".rednose-treeview"),model:n.getTree(),selectable:!1,header:TXT_DATA_SOURCES}),e._treeView.render()}),this},_handleContextMenu:function(e){var t=e.currentTarget;e.preventDefault();if(t.contextMenu)return!1;var n=this._treeView.getNodeById(t.getData("node-id")).data;n instanceof DataSource&&(t.plug(Y.Rednose.ContextMenu,{content:[{title:TXT_DATA_SOURCE_EDIT,id:"dataSourceEdit"},{title:"-"},{title:TXT_DATA_SOURCE_DELETE,id:"dataSourceDelete"}],data:n,bubbleTarget:this}),t.contextMenu._handleContextMenu(e))}},{ATTRS:{modelList:{value:new Y.Rednose.DataSource.DataSourceList}}}),Y.namespace("Rednose.FormDesigner").DataSourcesView=DataSourcesView;var TXT_CONTROL_TYPES={text:"Text",textarea:"Text Area",html:"Rich Text",dropdown:"Drop-down List",radio:"Radio Button",checkbox:"Checkbox",date:"Date",autocomplete:"Autocomplete",file:"File"},TXT_OBJECT_ATTRIBUTES="Object Attributes",Micro=Y.Template.Micro,ObjectAttributesView;ObjectAttributesView=Y.Base.create("objectAttributesView",Y.View,[Y.Rednose.View.Nav],{title:TXT_OBJECT_ATTRIBUTES,footer:!1,formTemplate:Micro.compile('<form class="form-vertical"><fieldset><div class="control-group"><label class="control-label" for="type">Type</label><div class="controls"><select class="input-block-level" id="type"></select></div></div><hr/><div class="control-group"><label class="control-label" for="id">Identifier</label><div class="controls"><input class="input-block-level" id="id" type="text" readonly value="<%= data.foreignId %>"/></div></div><div class="control-group"><label class="control-label" for="caption">Caption</label><div class="controls"><input class="input-block-level" id="caption" type="text" value="<%= data.caption %>"/></div></div><hr/><div class="control-group"><label class="control-label" for="value">Value</label><div class="controls"><input class="input-block-level" id="value" type="text" value="<%= data.value %>"/></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="required" <% if (data.required) { %>checked<% } %>> Required</label></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="visible" <% if (data.visible) { %>checked<% } %>> Visible</label></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="protected" <% if (data.protected) { %>checked<% } %>> Protected</label></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="readonly" <% if (data.readonly) { %>checked<% } %>> Readonly</label></div></div><% if (data.type == \'dropdown\' || data.type == \'radio\' || data.type == \'autocomplete\') { %><hr/><% } %><% if (data.type == \'dropdown\' || data.type == \'radio\' || data.type == \'autocomplete\') { %><div class="control-group"><label class="control-label" for="configureItems">Items</label><div class="controls"><div class="input-append"><input class="rednose-combo-block-level" type="text" id="items" readonly value="<%= data.properties.choices ? Y.Object.keys(data.properties.choices).length : 0 %> items"><button class="btn dropdown-toggle" id="configureItemsList" type="button" title="Configure Items"><i class="icon-cog"></i> <span class="caret"></span></button></button></div></div></div><% } %><fieldset></form>'
),emptyTemplate:'<div class="alert alert-info">No attributes available</div>',events:{form:{change:"_handleFormChange"}},initializer:function(){this.on("dropdown:configureItems",this._handleConfigureItems,this),this.on("dropdown:configureDynamicItems",this._handleConfigureDynamicItems,this)},render:function(){return this._renderForm(),this},_renderForm:function(){var e=this.get("model"),t=this.get("container");t.empty();if(e){t.append(this.formTemplate(e.getAttrs()));var n=t.one("#configureItemsList");n&&(n.plug(Y.Rednose.Dropdown,{content:[{id:"configureItems",title:"Items",icon:"icon-align-justify"},{id:"configureDynamicItems",title:"Dynamic items",icon:"icon-random"}]}),n.dropdown.addTarget(this)),this._renderTypeOptions()}else t.append(this.emptyTemplate)},_renderTypeOptions:function(){var e=this.get("model"),t=this.get("container").one("#type");Y.Object.each(TXT_CONTROL_TYPES,function(n,r){var i=Y.Node.create(Y.Lang.sub('<option value="{value}">{label}</option>',{value:r,label:n}));e.get("type")===r&&i.setAttribute("selected","selected"),t.append(i)})},_handleFormChange:function(e){var t=e.target,n=t.get("id"),r=t.get("type")==="checkbox"?t.get("checked"):t.get("value");this.get("model").set(n,r),n==="type"&&this.fire("typeChange")},_handleConfigureItems:function(){this.fire("configureItems",{model:this.get("model")})},_handleConfigureDynamicItems:function(){this.fire("configureDynamicItems",{model:this.get("model")})}},{ATTRS:{model:{value:null}}}),Y.namespace("Rednose.FormDesigner").ObjectAttributesView=ObjectAttributesView;var FormView;FormView=Y.Base.create("formView",Y.View,[],{template:'<div class="rednose-form-view"><form class="rednose-form form-horizontal"><fieldset><legend>{caption}</legend></fieldset></form></div>',_controlViewMap:{},_expressionMap:[],_controlMap:[],initializer:function(){var e=this.get("model"),t=e.get("controls");t.after("add",this._handleAddControl,this)},destructor:function(){Y.Array.each(this._controlMap,function(e){e.destroy(),e=null}),this._expressionMap=null},render:function(){var e=this,t=this.get("container"),n=this.get("model"),r=this.template;return this._controlViewMap=[],this._expressionMap=[],t.setHTML(Y.Lang.sub(r,{caption:n.get("caption")})),n.get("controls").each(function(t){e._renderControl(t)}),this},_renderControl:function(e){var t=this.get("container"),n=Y.Rednose.Form.ControlViewFactory.create(e),r=n.render().get("container"),i=this;if(n){i._controlViewMap[e.get("id")]=n,e.view=n,n.addTarget(i),n.after("*:change",function(){});var s=(new Y.DD.Drag({node:r,group:["rednose-form-designer-form"]})).plug(Y.Plugin.DDProxy,{moveOnEnd:!1});s.on("drag:start",function(e){e.target.get("dragNode").setHTML("")}),s.on("drag:drag",function(e){i._dragging(e,t.one("fieldset"),r)}),s.on("drag:end",function(){i._setSortOrder(t.one("fieldset"))}),r.setData("model",e),t.one("fieldset").append(r),this._controlMap.push(n)}},_dragging:function(e,t,n){var r=e.currentTarget.mouseXY[1],i=!1;t.all("> div").each(function(e){if(n.get("id")!==e.get("id")){var t=e.getY(),s=t+parseInt(e.getComputedStyle("height"),10);r>t&&r<s&&(n.insertBefore(n,e),i=!0)}}),i===!1&&r>t.getY()+parseInt(t.getComputedStyle("height"),10)&&t.append(n)},_setSortOrder:function(e){var t=0,n=[];e.all("> div").each(function(e){var r=e.getData("model");r.set("sortOrder",t),n.push(r),t++}),this.get("model").set("controls",n)},_evalutateExpressions:function(){var self=this,objectDefinitions=[];Y.Object.each(this._controlViewMap,function(e){var t=e.get("model").get("foreignId"),n=Y.JSON.stringify(e.get("model").toJSON());objectDefinitions.push(t+" = "+n)});var lines=[];lines.push("var "+objectDefinitions.join(", ")+";"),lines.push(this._expressionMap.join(" "));var objectMappings=[];Y.Object.each(this._controlViewMap,function(e){var t=e.get("model").get("id");objectMappings.push('"'+t+'": '+t)}),lines.push("var objects = {"+objectMappings.join(", ")+"};");var objects;eval(lines.join(" ")),Y.Object.each(objects,function(e,t){var n=self._controlViewMap[t].get("model");n.setAttrs(e),self._controlViewMap[t].render()})},_handleAddControl:function(e){this._renderControl(e.model)}},{ATTRS:{model:{value:new Y.Rednose.Form.FormModel}}}),Y.namespace("Rednose.FormDesigner").FormView=FormView;var TXT_NAVBAR_CAPTION="Form Designer",ConfigureDynamicItems=Y.Rednose.FormDesigner.ConfigureDynamicItemsView,DataSourceManager=Y.Rednose.DataSourceManager.DataSourceManager,Panel=Y.Rednose.Panel,FormDesigner;FormDesigner=Y.Base.create("formDesigner",Y.Rednose.App,[Y.Rednose.View.Template.Navbar,Y.Rednose.View.Template.ThreeColumn],{views:{form:{type:Y.Rednose.FormDesigner.FormView}},_navbar:null,_objectLibrary:null,_hierarchyView:null,_objectAttributesView:null,_dataSourcesView:null,initializer:function(){this._objectLibrary=new Y.Rednose.FormDesigner.ObjectLibrary,this._hierarchyView=new Y.Rednose.FormDesigner.HierarchyView,this._objectAttributesView=new Y.Rednose.FormDesigner.ObjectAttributesView,this._dataSourcesView=new Y.Rednose.FormDesigner.DataSourcesView,this._objectLibrary.addTarget(this),this._hierarchyView.addTarget(this),this._objectAttributesView.addTarget(this),this._dataSourcesView.addTarget(this),this.after("hierarchyView:select",this._handleControlSelect,this),this.after("objectLibrary:objectAdd",this._handleObjectAdd,this),this.after("objectAttributesView:typeChange",this._handleObjectTypeChange,this),this.after("objectAttributesView:configureItems",this._handleConfigureItems,this),this.after("objectAttributesView:configureDynamicItems",this._handleConfigureDynamicItems,this),this.onceAfter("initializedChange",function(){this._initNavbar()}),this.on("navbar:preview",this._handlePreview,this),this.on("navbar:save",this._handleSave,this),this.on("navbar:newDataSource",this._handleNewDataSource,this),this.on("navbar:closeDesigner",this._handleClose,this),this.on("contextMenu:removeControl",this._handleRemoveControl,this),this.on("contextMenu:dataSourceEdit",this._handleDataSourceEdit,this),this.on("contextMenu:dataSourceDelete"
,this._handleDataSourceDelete,this),this.hasRoute(this.getPath())&&this.dispatch()},destructor:function(){this.get("activeView")&&this.get("activeView").destroy(),this._navbar.destroy(),this._navbar=null,this._objectLibrary.destroy(),this._objectLibrary=null,this._hierarchyView.destroy(),this._hierarchyView=null,this._dataSourcesView.destroy(),this._dataSourcesView=null,this._objectAttributesView.destroy(),this._objectAttributesView=null},render:function(){return FormDesigner.superclass.render.apply(this,arguments),this.get("container").addClass("rednose-form-designer"),this._navbar.render(),this._objectLibrary.render(this._navbar,"insert"),this.get("leftContainer").append(this._hierarchyView.render().get("container")),this.get("leftContainer").append(this._dataSourcesView.render().get("container")),this.get("rightContainer").append(this._objectAttributesView.render().get("container")),this.get("model").get("controls").size()>0&&this.showForm(),this},_initNavbar:function(){var e=this.get("navbarContainer");this._navbar=new Y.Rednose.Navbar({container:e,title:TXT_NAVBAR_CAPTION,columnLayout:!0,menu:[{title:"File",items:[{id:"newDataSource",title:"New Data Source..."},{title:"-"},{id:"preview",title:"Preview"},{id:"save",title:"Save"},{title:"-"},{id:"closeDesigner",title:"Close"}]},{id:"insert",title:"Insert"}],menuSecondary:[{title:YUI.Env.user.name,icon:"icon-user",items:[{url:Routing.generate("_security_logout"),title:"Sign out"}]}]}),this._navbar.addTarget(this),this.set("navbar",this._navbar)},handleForm:function(e,t,n){var r=e.params.form,i=this.get("model"),s=this;r===i.get("id")&&!i.isNew()?(e.form=i,n()):(i=new Y.Rednose.Form.FormModel({id:r}),i.load(function(){s.set("model",i),e.form=i,n()}))},showForm:function(e,t){this.get("activeView")&&this.get("activeView").destroy(),e||(e={form:this.get("model")},t={transition:!1}),this.showView("form",{model:e.form},{transition:t.transition}),this._hierarchyView.set("model",e.form),this._hierarchyView.render()},_handleControlSelect:function(e){var t=e.model;t&&t instanceof Y.Rednose.Form.ControlModel&&t.view instanceof Y.Rednose.Form.BaseControlView&&t.view.focus(),this._objectAttributesView.set("model",t),this._objectAttributesView.render()},_handleRemoveControl:function(e){var t=this,n=e.data,r=new Y.Rednose.Dialog;r.confirm({title:"Remove control: "+n.get("caption")+"?",text:"Are you sure you want to remove the control"+n.get("caption")+" connected data may possibly be lost!",type:"warning",confirm:"DELETE"},function(){t.get("model").get("controls").remove(n),t.showForm(),t._handleControlSelect({model:t._objectAttributesView.get("model")})})},_handleObjectTypeChange:function(){this.showForm(),this._handleControlSelect({model:this._objectAttributesView.get("model")})},_handleConfigureItems:function(e){var t=new Y.Rednose.FormDesigner.ConfigureItems({model:e.model});t.render()},_handleConfigureDynamicItems:function(e){var t=e.model;if(!t)return;var n=this._dataSourcesView.get("modelList"),r,i;r=(new ConfigureDynamicItems({model:t,dataSourceList:n})).render(),i=(new Panel({srcNode:r.get("container"),width:500})).render(),r.on(["close","ok"],function(){r.destroy(),i.destroy()})},_handleObjectAdd:function(e){var t=this,n=new Y.Rednose.FormDesigner.ObjectLibraryView({model:this.get("model"),item:e.item});n.on("destroy",function(){t.showForm()}),n.render()},_handleSave:function(){var e=this.get("model");console.log(Y.JSON.stringify(e.toJSON()))},_handlePreview:function(){var e=this.get("model");window.open(Routing.generate("rednose_framework_forms_preview",{id:e.get("id")}),"_blank")},_handleNewDataSource:function(){var e=new DataSourceManager,t=this;e.render(),e.showChoicePage();var n=new Y.Rednose.Panel({srcNode:e.get("container"),width:640});n.render(),e.on("close",function(){e.destroy(),n.destroy()}),e.on("create",function(r){var i=r.model;i.save(function(){e.destroy(),n.destroy(),t._dataSourcesView.render()})})},_handleDataSourceEdit:function(e){var t=e.data,n=new DataSourceManager({model:t}),r=this;n.render(),n.showChoicePage();var i=new Y.Rednose.Panel({srcNode:n.get("container"),width:640});i.render(),n.on("close",function(){n.destroy(),i.destroy()}),n.on("create",function(e){var t=e.model;t.save(function(){n.destroy(),i.destroy(),r._dataSourcesView.render()})})},_handleClose:function(){this.destroy()},_handleDataSourceDelete:function(e){console.log(e)}},{ATTRS:{model:{value:new Y.Rednose.Form.FormModel},navbar:{value:null},routes:{value:[{path:"/:form/edit",callbacks:["handleForm","showForm"]}]}}}),Y.namespace("Rednose").FormDesigner=Y.mix(FormDesigner,Y.Rednose.FormDesigner)},"1.5.0-DEV",{requires:["rednose-app","rednose-datatable-select","rednose-datasource-manager","rednose-dialog","rednose-dropdown","rednose-form","rednose-form-designer-css","rednose-navbar","rednose-nodescroll","rednose-treeview"]});
