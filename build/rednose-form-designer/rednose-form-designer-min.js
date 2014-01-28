YUI.add("rednose-form-designer",function(Y,NAME){var TXT_OBJECT_LIBRARY="Object Library",ObjectLibraryView;ObjectLibraryView=Y.Base.create("objectLibraryView",Y.View,[],{template:'<div class="rednose-object-library></div>',_treeView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t)},destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var e=this.get("container"),t=this.get("model");return this._treeView=(new Y.Rednose.TreeView({container:e,model:t,selectable:!1,header:TXT_OBJECT_LIBRARY})).render(),this}},{ATTRS:{model:{value:new Y.Rednose.ModelTree({items:[{label:"Text",data:new Y.Model,icon:"icon-align-justify"},{label:"Text Area",data:new Y.Model,icon:"icon-align-justify"},{label:"Rich Text",data:new Y.Model,icon:"icon-align-justify"},{label:"Drop-down List",data:new Y.Model,icon:"icon-align-justify"},{label:"Radio Button",data:new Y.Model,icon:"icon-align-justify"},{label:"Checkbox",data:new Y.Model,icon:"icon-align-justify"},{label:"Date",data:new Y.Model,icon:"icon-align-justify"},{label:"Autocomplete",data:new Y.Model,icon:"icon-align-justify"},{label:"File",data:new Y.Model,icon:"icon-align-justify"}]})}}}),Y.namespace("Rednose.FormDesigner").ObjectLibraryView=ObjectLibraryView;var TXT_HIERARCHY="Hierarchy",HierarchyView,EVT_SELECT="select";HierarchyView=Y.Base.create("hierarchyView",Y.View,[],{template:'<div class="rednose-hierarchy></div>',_treeView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t)},destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var e=this,t=this.get("container"),n=this.get("model");return this._treeView&&this._treeView.destroy(),t.append('<div class="rednose-treeview"></div>'),this._treeView=new Y.Rednose.TreeView({container:t.one(".rednose-treeview"),model:n.getTree(),selectable:!0,header:TXT_HIERARCHY}),this._treeView.render(),this._treeView.after("select",function(t){t.node.unselect();var n=t.node.data;n&&n instanceof Y.Rednose.Form.ControlModel&&e.fire(EVT_SELECT,{model:n})}),this}},{ATTRS:{model:{value:new Y.Rednose.Form.FormModel}}}),Y.namespace("Rednose.FormDesigner").HierarchyView=HierarchyView;var TXT_DATA_SOURCES="Data Sources",DataSourcesView;DataSourcesView=Y.Base.create("dataSourcesView",Y.View,[],{template:'<div class="rednose-data-sources></div>',_treeView:null,destructor:function(){this._treeView.destroy(),this._treeView=null},render:function(){var e=this,t=this.get("container"),n=this.get("modelList"),r=this.template;return t.setHTML(r),n.load(function(){e._treeView=new Y.Rednose.TreeView({container:t,model:n.getTree(),selectable:!1,header:TXT_DATA_SOURCES}),e._treeView.render()}),this}},{ATTRS:{modelList:{value:new Y.Rednose.DataSource.DataSourceList}}}),Y.namespace("Rednose.FormDesigner").DataSourcesView=DataSourcesView;var TXT_CONTROL_TYPES={text:"Text",textarea:"Text Area",html:"Rich Text",dropdown:"Drop-down List",radio:"Radio Button",checkbox:"Checkbox",date:"Date",autocomplete:"Autocomplete",file:"File"},TXT_OBJECT_ATTRIBUTES="Object Attributes",Micro=Y.Template.Micro,ObjectAttributesView;ObjectAttributesView=Y.Base.create("objectAttributesView",Y.View,[Y.Rednose.View.Nav],{title:TXT_OBJECT_ATTRIBUTES,footer:!1,formTemplate:Micro.compile('<form class="form-vertical"><fieldset><div class="control-group"><label class="control-label" for="id">Identifier</label><div class="controls"><input class="input-block-level" id="id" type="text" readonly value="<%= data.id %>"/></div></div><div class="control-group"><label class="control-label" for="caption">Caption</label><div class="controls"><input class="input-block-level" id="caption" type="text" value="<%= data.caption %>"/></div></div><hr/><div class="control-group"><label class="control-label" for="type">Type</label><div class="controls"><select class="input-block-level" id="type"></select></div></div><hr/><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="required" <% if (data.required) { %>checked<% } %>> Required</label></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="visible" <% if (data.visible) { %>checked<% } %>> Visible</label></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="protected" <% if (data.protected) { %>checked<% } %>> Protected</label></div></div><div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="readonly" <% if (data.readonly) { %>checked<% } %>> Readonly</label></div></div><fieldset></form>'),events:{form:{change:"_handleFormChange"}},render:function(){return this._renderForm(),this},_renderForm:function(){var e=this.get("model"),t=this.get("container");t.empty(),t.append(this.formTemplate(e.getAttrs())),this._renderTypeOptions()},_renderTypeOptions:function(){var e=this.get("model"),t=this.get("container").one("#type");Y.Object.each(TXT_CONTROL_TYPES,function(n,r){var i=Y.Node.create(Y.Lang.sub('<option value="{value}">{label}</option>',{value:r,label:n}));e.get("type")===r&&i.setAttribute("selected","selected"),t.append(i)})},_handleFormChange:function(e){var t=e.target,n=t.get("id"),r=t.get("type")==="checkbox"?t.get("checked"):t.get("value");this.get("model").set(n,r)}},{ATTRS:{model:{value:new Y.Rednose.Form.ControlModel}}}),Y.namespace("Rednose.FormDesigner").ObjectAttributesView=ObjectAttributesView;var FormView;FormView=Y.Base.create("formView",Y.View,[],{template:'<div class="rednose-form-view"><form class="rednose-form form-horizontal"><fieldset><legend>{caption}</legend></fieldset></form></div>',_controlViewMap:{},_expressionMap:[],destructor:function(){this._expressionMap=null},render:function(){var e=this,t=this.get("container"),n=this.get("model"),r=this.template;return this._controlViewMap=[],this._expressionMap=[],t.setHTML(Y.Lang.sub(r,{caption:n.get("caption")})),n.get("controls").each(function(n){
var r=Y.Rednose.Form.ControlViewFactory.create(n);if(r){e._controlViewMap[n.get("id")]=r,n.view=r,r.addTarget(e),r.after("*:change",function(){});var i=n.get("properties").expressions;i&&Y.Object.each(i,function(t){e._expressionMap.push(t)}),t.one("fieldset").append(r.render().get("container"))}}),this},_evalutateExpressions:function(){var self=this,objectDefinitions=[];Y.Object.each(this._controlViewMap,function(e){var t=e.get("model").get("id"),n=Y.JSON.stringify(e.get("model").toJSON());objectDefinitions.push(t+" = "+n)});var lines=[];lines.push("var "+objectDefinitions.join(", ")+";"),lines.push(this._expressionMap.join(" "));var objectMappings=[];Y.Object.each(this._controlViewMap,function(e){var t=e.get("model").get("id");objectMappings.push('"'+t+'": '+t)}),lines.push("var objects = {"+objectMappings.join(", ")+"};");var objects;eval(lines.join(" ")),Y.Object.each(objects,function(e,t){var n=self._controlViewMap[t].get("model");n.setAttrs(e),self._controlViewMap[t].render()})}},{ATTRS:{model:{value:new Y.Rednose.Form.FormModel}}}),Y.namespace("Rednose.FormDesigner").FormView=FormView;var TXT_NAVBAR_CAPTION="Form Designer",FormDesigner;FormDesigner=Y.Base.create("formDesigner",Y.App,[],{views:{form:{type:Y.Rednose.FormDesigner.FormView}},template:'<div class="rednose-grid"><div class="rednose-unit-left"></div><div class="rednose-unit-center"></div><div class="rednose-unit-right"></div></div>',_navbar:null,_gridLeft:null,_gridCenter:null,_gridRight:null,_objectLibraryView:null,_hierarchyView:null,_objectAttributesView:null,_dataSourcesView:null,initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t),this._gridLeft=e.one(".rednose-unit-left"),this._gridCenter=e.one(".rednose-unit-center"),this._gridRight=e.one(".rednose-unit-right"),this._objectLibraryView=new Y.Rednose.FormDesigner.ObjectLibraryView,this._hierarchyView=new Y.Rednose.FormDesigner.HierarchyView,this._objectAttributesView=new Y.Rednose.FormDesigner.ObjectAttributesView,this._dataSourcesView=new Y.Rednose.FormDesigner.DataSourcesView,this._objectLibraryView.addTarget(this),this._hierarchyView.addTarget(this),this._objectAttributesView.addTarget(this),this._dataSourcesView.addTarget(this),this.after("*:select",this._handleControlSelect,this),this.set("viewContainer",this._gridCenter),this._initNavbar(),this.hasRoute(this.getPath())?this.dispatch():console.log("Show `empty` view")},destructor:function(){this._navbar.destroy(),this._navbar=null,this._objectLibraryView.destroy(),this._objectLibraryView=null,this._hierarchyView.destroy(),this._hierarchyView=null,this._dataSourcesView.destroy(),this._dataSourcesView=null,this._objectAttributesView.destroy(),this._objectAttributesView=null,this._gridLeft=null,this._gridCenter=null,this._gridRight=null},render:function(){return FormDesigner.superclass.render.apply(this,arguments),this._navbar.render(),this._gridLeft.append(this._objectLibraryView.render().get("container")),this._gridLeft.append(this._hierarchyView.render().get("container")),this._gridLeft.append(this._dataSourcesView.render().get("container")),this._gridRight.append(this._objectAttributesView.render().get("container")),this},_initNavbar:function(){this._navbar=new Y.Rednose.Navbar({title:TXT_NAVBAR_CAPTION,columnLayout:!0,menu:[{id:"file",title:"File",items:[{id:"save",title:"Save"}]}],menuSecondary:[{title:"Settings",items:[{title:"Log out"}]}]})},handleForm:function(e,t,n){var r=e.params.form,i=this.get("model"),s=this;r===i.get("id")&&!i.isNew()?(e.form=i,n()):(i=new Y.Rednose.Form.FormModel({id:r}),i.load(function(){s.set("model",i),e.form=i,n()}))},showForm:function(e,t){this.showView("form",{model:e.form},{transition:t.transition}),this._hierarchyView.set("model",e.form),this._hierarchyView.render()},_handleControlSelect:function(e){var t=e.model;t&&t instanceof Y.Rednose.Form.ControlModel&&(t.view instanceof Y.Rednose.Form.BaseControlView&&t.view.focus(),this._objectAttributesView.set("model",t),this._objectAttributesView.render())}},{ATTRS:{model:{value:new Y.Rednose.Form.FormModel},routes:{value:[{path:"/:form",callbacks:["handleForm","showForm"]}]}}}),Y.namespace("Rednose.FormDesigner").FormDesigner=FormDesigner},"1.1.0-DEV",{requires:["rednose-app","rednose-controlform","rednose-dataprovider","rednose-form","rednose-navbar","rednose-nodescroll","rednose-treeview"]});
