YUI.add("rednose-controlform",function(e,t){var n;n=e.Base.create("form",e.Model,[],{removeFieldGroup:function(e){for(var t in this.get("fieldGroups"))if(this.get("fieldGroups")[t]["id"]==e){var n=this.get("fieldGroups");n.splice(t,1),this.set("fieldGroups",n)}},getFieldGroup:function(e){for(var t in this.get("fieldGroups"))if(this.get("fieldGroups")[t].get("id")==e)return this.get("fieldGroups")[t];return!1},_setFieldGroups:function(t){var n=Array();return e.each(t,function(t){var r=Array();e.each(t.fieldGroupItems,function(t){r.push(new e.ControlForm.FieldGroupItem(t))}),t=new e.ControlForm.FieldGroup(t),t.set("fieldGroupItems",r),n.push(t)}),n}},{ATTRS:{caption:{value:""},fieldGroups:{value:[],setter:"_setFieldGroups"}}}),e.namespace("ControlForm").Form=n;var r;r=e.Base.create("formItem",e.Model,[],{},{ATTRS:{template:{value:null},step:{value:0},sortOrder:{value:0},direction:{value:"left"},controlForm:{value:null},fieldGroupOrder:{value:[]}}}),e.namespace("ControlForm").FormItem=r;var r=e.ControlForm.FormItem,n=e.ControlForm.Form,i;i=e.Base.create("formItems",e.ModelList,[],{model:r,parse:function(e){return e.map(function(e){return e.controlForm!==null&&(e.controlForm=new n(e.controlForm)),e})},sync:function(t,n,r){var i=this;t==="read"&&e.io(Routing.generate("rednose_docgen_forms_list",n),{method:"GET",on:{success:function(t,s){i.set("templateId",n.templateId),r(null,e.JSON.parse(s.responseText))}}})},comparator:function(e){return e.get("sortOrder")},setPosition:function(e,t,n){this.updateProperty(e,"sortOrder",t),this.updateProperty(e,"direction",n)},updateProperty:function(e,t,n){this.each(function(r){r.get("id")===e&&r.set(t,n)})},isModified:function(){return!0},addForm:function(t){var n=this,r={id:"tmp_"+Math.round((new Date).getTime()/1e3)+Math.round(Math.random())*999999,direction:"left",controlForm:new e.ControlForm.Form({caption:t,fieldGroups:[]}),sortOrder:n.size(),template:n.get("templateId")};n.add(r)},deleteForm:function(e){var t=this;this.each(function(n){n.get("id")===e&&t.remove(n)})},getFieldGroup:function(e){var t=null;return this.each(function(n){n.get("controlForm").getFieldGroup(e)&&(t=n.get("controlForm").getFieldGroup(e))}),t},deleteFieldGroup:function(e,t){this.each(function(n){n.get("id")===e&&n.get("controlForm").removeFieldGroup(t)})}},{ATTRS:{templateId:{value:null}}}),e.namespace("ControlForm").FormItems=i;var s;s=e.Base.create("fieldContent",e.Model,[],{},{ATTRS:{field:{value:null},content:{value:""}}}),e.namespace("ControlForm").FieldContent=s;var o;o=e.Base.create("fieldGroup",e.Model,[],{},{ATTRS:{name:{value:null},category:{value:null},fieldGroupItems:{value:[]}}}),e.namespace("ControlForm").FieldGroup=o;var u;u=e.Base.create("fieldGroupItem",e.ModelList,[],{},{ATTRS:{field:{value:null},fieldGroup:{value:null},position:{value:0},rules:{value:{}},sortOrder:{value:0}}}),e.namespace("ControlForm").FieldGroupItem=u;var a=e.Template.Micro,f;f=e.Base.create("autoComplete",e.AutoCompleteList,[],{AUTOCOMPLETE_TEMPLATE:a.compile('<a role="menuitem"><img class="avatar size32" src="<%= data.image %>"><span class="title-block"><span class="title"><%== data.title %></span></span><span class="subtitle"><%= data.subtitle %></span></a>'),initializer:function(t){t||(t={}),this.get("inputNode").setAttribute("autocomplete","off");var n=this.AUTOCOMPLETE_TEMPLATE,r=this.get("choices"),i=this.get("datasource"),s=this;i?(this.set("resultListLocator","results"),this.set("resultFormatter",function(t,r){return e.Array.map(r,function(r){var o=s._mapDataProviderData(r.raw,i.map);return o.title=e.Highlight.all(o.title,t),n(o)})}),this.set("resultTextLocator",function(e){return i.map&&i.map.value?e[i.map.value]:e.value}),this.set("source",this._getDataProviderRoute(i.id,i.map&&i.map.title?i.map.title:"title"))):r&&(this.set("resultFormatter",function(t,r){return e.Array.map(r,function(e){return n(e.raw)})}),this.set("resultTextLocator","value"),this.set("source",r))},_getDataProviderRoute:function(e,t){return Routing.generate("rednose_dataprovider_data_list")+"?id="+e+"&q={query}&key="+t+"&callback={callback}"},_mapDataProviderData:function(e,t){return t||(t={}),{title:t.title?e[t.title]:e.title,subtitle:t.subtitle?e[t.subtitle]:e.subtitle,image:t.image?e[t.image]:e.image,value:t.value?e[t.value]:e.value}}},{CSS_PREFIX:"rednose-autocomplete",ATTRS:{maxResults:{value:6},choices:{value:null},datasource:{value:null}}}),e.namespace("Rednose").ControlFormAutoComplete=f;var l;l=e.Base.create("widgetFactory",e.Base,[],{_createWidget:function(t){var n=e.Node.create("<span />");return t.is_date?(new e.Rednose.ControlFormDatepicker({srcNode:n,properties:t})).render():t.is_html?(new e.Rednose.ControlFormRichTextEditor({srcNode:n,properties:t})).render():((new e.Rednose.ControlFormCommon({srcNode:n,properties:t})).render(),n.one("*")&&(n=n.one("*"))),n}}),e.namespace("Rednose").WidgetFactory=l;var c;c=e.Base.create("datepicker",e.Calendar,[],{initializer:function(){var t=this;this.after("render",function(){var n=e.Node.create("<span />"),r=e.Node.create("<input />"),i=e.Node.create("<span />"),s=this.get("contentBox");i.addClass("icon-calendar"),r.addClass("dialogCalendar"),r.setAttribute("readonly","true"),r.on("click",function(){t.showCalendar(r,n)}),n.addClass("calendarWrapper"),n.hide(),n.append(s.one(".yui3-calendar-pane")),n.one(".yui3-calendar-pane").addClass("dialogCalendarPane"),s.append(r),s.append(i),s.append(n),this.set("wrapper",n),t.dateSelected({date:new Date})}),this.on("dateClick",t.dateSelected)},showCalendar:function(e){var t=this.get("wrapper"),n=this.get("properties");if(typeof n.is_date.accepts_input=="undefined")return;var r=!1;t.detach("clickoutside"),t.on("clickoutside",function(){r===!1?r=!0:t.hide()}),t.show(),t.setX(e.getX()),t.setY(e.getY()+parseInt(e.getStyle("height"))+5)},dateSelected:function(e){var t=this.get("wrapper"),n=t.ancestor().one("input");n.set("value",e.date.toLocaleDateString()),n.setAttribute("data-unixtime",e.date.getTime()),t.hide()}},{ATTRS:{wrapper
:{value:null},properties:{value:{}}}}),e.namespace("Rednose").ControlFormDatepicker=c;var h;h=e.Base.create("richTextEditor",e.Widget,[],{render:function(){var e=this.get("properties").input_properties,t="en_US",n=[];e&&(e.styles==="true"&&n.push({name:"styles",items:["Font","FontSize"]}),e.editing==="true"&&n.push({name:"editing",items:["Find","Replace","-","SelectAll"]}),e.clipboard==="true"&&n.push({name:"clipboard",items:["Cut","Copy","Paste","PasteText"]}),e.undoredo==="true"&&n.push({name:"clipboard",items:["Undo","Redo"]}),e.basicstyles==="true"&&n.push({name:"basicstyles",items:["Bold","Italic","Underline","-","RemoveFormat"]}),e.paragraph==="true"&&n.push({name:"paragraph",items:["NumberedList","BulletedList","-","Outdent","Indent"]}),e.insert==="true"&&n.push({name:"links",items:["Link","Unlink"]}),e.tools==="true"&&n.push({name:"tools",items:["Maximize"]}));var r={toolbar:n,removePlugins:"elementspath",resize_enabled:!1,disableNativeSpellChecker:!1,scayt_sLang:t,language:t,height:"100"};return this.get("replace")?CKEDITOR.replace(this.get("srcNode").getDOMNode(),r):CKEDITOR.appendTo(this.get("srcNode").getDOMNode(),r),this}},{ATTRS:{properties:{value:{}},replace:{value:!1}}}),e.namespace("Rednose").ControlFormRichTextEditor=h;var p;p=e.Base.create("common",e.Widget,[],{initializer:function(){},render:function(){var e=this.get("properties");if(typeof e.input_method=="undefined"){this._renderInput();return}switch(e.input_method.inputElement){case"input":this._renderInput();break;case"textarea":this._renderInput(!0);break;case"dropdown":this._renderDropdown();break;case"checkbox":this._renderCheckbox();break;case"radio":this._renderRadio()}},_renderInput:function(t){var n=e.Node.create(t?"<textarea />":"<input />"),r=this._getProperties();r.defaultValue&&n.set("value",r.defaultValue),this.get("srcNode").append(n)},_renderDropdown:function(){var t=e.Node.create("<select />"),n=this._getProperties();if(typeof n.input_restrictions!="undefined")for(var r in n.input_restrictions){var i=n.input_restrictions[r],s=e.Node.create("<option>"+i.name+"</option>");i.value===""?s.setAttribute("value",i.name):s.setAttribute("value",i.value),n.defaultValue&&s.get("innerHTML")===n.defaultValue&&s.setAttribute("selected","selected"),t.append(s)}this.get("srcNode").append(t)},_renderCheckbox:function(){var t=this._getProperties(),n=e.Node.create('<input type="checkbox" />');this.get("srcNode").append(n),t.defaultValue&&n.set("checked",t.defaultValue==="true")},_renderRadio:function(){var t="rand"+Math.floor(Math.random()*1010101)+(new Date).getTime(),n=this._getProperties(),r=e.Node.create('<span class="radioGroup" id="'+t+'" />');if(typeof n.input_restrictions!="undefined"){for(var i in n.input_restrictions){var s=n.input_restrictions[i],o=e.Node.create('<input type="radio" name="'+t+'" />');n.defaultValue&&n.defaultValue===s.name&&o.set("checked",!0),s.value===""?o.setAttribute("value",s.name):o.setAttribute("value",s.value),r.append(o),r.append(e.Node.create(s.name)),r.append(e.Node.create("<br />"))}this.get("srcNode").append(r)}},_getProperties:function(){var e=this.get("properties");return e}},{ATTRS:{properties:{value:{}}}}),e.namespace("Rednose").ControlFormCommon=p;var d;d=e.Base.create("controlForm",e.Base,[e.Rednose.WidgetFactory],{viewTemplate:'<div class="formContainer">   <div class="formContainer_left">&nbsp;</div>   <div class="formContainer_right">&nbsp;</div>   <div class="formContainer_proxy">   </div></div>',initializer:function(){this.on("contextMenu:editLabel",this._editLabel),this.on("contextMenu:deleteForm",this.deleteForm),this.on("contextMenu:deleteFieldGroup",this._deleteFieldGroup),this.on("contextMenu:editFieldGroup",this._editFieldGroup),this.after("stepChange",this._stepChange)},render:function(){var e=this.get("srcNode"),t=this.get("formsModel"),n=this;e.setHTML(this.viewTemplate),e.one(".formContainer").removeClass("formContainer").addClass(this.get("className")),e.one(".formContainer_left").removeClass("formContainer_left").addClass(this.get("className")+"_left"),e.one(".formContainer_right").removeClass("formContainer_right").addClass(this.get("className")+"_right"),t.sort(),t.each(function(e){n._renderForm(e)}),this.set("step",0),this.fire("rendered")},_renderForm:function(t){var n=this,r=this.get("srcNode").one("div"),i=t.get("fieldGroupOrder"),s=t.get("controlForm"),o=s.get("fieldGroups"),u=e.Node.create("<fieldset>"),a=e.Node.create("<legend>");a.set("innerHTML",s.get("caption")),this.get("editMode")&&(u.addClass("editMode"),a.plug(e.Rednose.ContextMenu,{content:[{title:"Rename",id:"editLabel"},{title:"-"},{title:"Remove",id:"deleteForm"}],bubbleTarget:n})),u.append(a),u.set("name",t.get("id")),u.setAttribute("data-step",t.get("step")),e.Array.each(i,function(t){e.Array.each(o,function(e){t===e.get("id")&&n._addFieldGroup(u,e)})});var f=this.get("className")+"_"+t.get("direction");r.one("."+f).append(u)},_addFieldGroup:function(t,n){var r=this,i=e.Node.create("<ul />"),s;s=n.get("fieldGroupItems");if(this.get("editMode")){var o=(new e.DD.Drag({node:i,group:["fieldGroup"]})).plug(e.Plugin.DDConstrained,{constrain2node:t}).plug(e.Plugin.DDProxy,{moveOnEnd:!1});o.on("drag:start",function(e){e.target.get("dragNode").setHTML("")}),o.on("drag:drag",function(e){r._reOrderFieldGroupDD(e,t,i)}),o.on("drag:end",function(){r._reOrderFieldGroup(t)})}i.set("id",n.get("id")),i.setAttribute("name",n.name),i.on(["mouseover","mouseout"],function(){i.toggleClass("fieldGroupHighlight")}),e.Array.each(s,function(t){var n=e.Node.create("<label>"),s=e.Node.create("<li>"),o=r.get("draft");if(!t.get("rules").is_text_value&&!t.get("rules").is_header){controlElement=r._createWidget(t.get("rules")),controlElement.data=t,n.set("innerHTML",t.get("field").name);if(o!==null){var u=o.getValue(t.get("field").id);controlElement.set("value",u)}s.append(n),s.append(controlElement),s.setData("model",t),s.on("click",function(){r.fire("controlSelected",{controlContainer:s})}),i.append(s)}}),this.get("editMode"
)&&i.plug(e.Rednose.ContextMenu,{content:[{title:"Edit",id:"editFieldGroup"},{title:"-"},{title:"Remove",id:"deleteFieldGroup"}],bubbleTarget:r}),t.append(i)},_reOrderFieldGroupDD:function(e,t,n){var r=e.currentTarget.mouseXY[1],i=!1;t.all("ul").each(function(e){if(n.get("id")!==e.get("id")){var t=e.getY(),s=t+parseInt(e.getComputedStyle("height"),10);r>t&&r<s&&(n.insertBefore(n,e),i=!0)}}),i===!1&&r>t.getY()+parseInt(t.getComputedStyle("height"),10)&&t.append(n)},_reOrderFieldGroup:function(e){var t=this.get("formsModel"),n=e.get("name"),r=[];e.all("ul").each(function(){r.push(this.get("id"))}),t.updateProperty(n,"fieldGroupOrder",r)},updateControl:function(e){var t=this.get("formsModel"),n=t.getFieldGroup(e.get("fieldGroup"));if(n.fieldGroupItems)for(var r in n.fieldGroupItems)n.fieldGroupItems[r].id===e.id&&n.fieldGroupItems[r].set("rules",e.rules)},_addFieldGroupToModel:function(e,t){var n=this.get("formsModel");n.each(function(n){if(n.get("id")===e){var r=n.get("controlForm").get("fieldGroups");r.push(t)}})},_stepChange:function(){var e=this,t=this.get("srcNode");t.all("*[data-step]").each(function(t){var n=t.getAttribute("data-step");parseInt(n,10)!==parseInt(e.get("step"),10)?t.hide():t.show()})},ddOver:function(t,n){var r=e.one("#"+n.get("id"));t.type==="drop:over"?r.hasClass("ddOver")===!1&&r.addClass("ddOver"):r.removeClass("ddOver")},ddDrop:function(t,n){var r=this,i=e.DD.DDM.activeDrag,s=e.one("#"+n.get("id"));e.TB.FieldGroup||console.exception&&console.exception("Dependancy error Y.TB.Field not found"),e.instanceOf(i.get("data"),e.TB.FieldGroup)?(fieldGroup=i.get("data"),r._addFieldGroup(s,fieldGroup.getAttrs(),!0),r._addFieldGroupToModel(s.get("name"),fieldGroup),r._reOrderFieldGroup(s)):console.exception&&console.exception("DD Error: Expected a Y.TB.FieldGroup"),s.removeClass("ddOver")},toJSON:function(){var t=this.get("formsModel");return e.JSON.stringify(t)},addForm:function(e){var t=this.get("formsModel");t.addForm(e),this.render()},deleteForm:function(t){var n=this,r=this.get("formsModel"),i=t.node.get("parentNode").get("name");e.Rednose.Dialog.confirm("Delete",'Delete the form "'+t.node.get("innerHTML")+'" and all its fieldgroups?',function(){r.deleteForm(i),n.render()})},_editFieldGroup:function(e){var t=this.get("formsModel").getFieldGroup(e.node.get("id"));this.fire("editFieldGroup",{fieldGroup:t})},_deleteFieldGroup:function(t){var n=this,r=this.get("formsModel"),i=t.node.get("parentNode"),s=i.get("name");e.Rednose.Dialog.confirm("Delete",'Delete the fieldgroup "'+t.node.getAttribute("name")+'"',function(){r.deleteFieldGroup(s,t.node.get("id")),t.node.remove(),n._reOrderFieldGroup(i)})},_editLabel:function(t){var n=this,r=new e.Rednose.Dialog,i=t.node,s=i.get("parentNode").get("name");r.prompt("Form title","Value",i.get("text"),function(e){var t="";n.get("formsModel").each(function(n){if(n.get("id")===s){var r=n.get("controlForm");t=e.one("input").get("value"),t!==""&&(r.set("caption",t),i.set("text",r.get("caption")))}});if(t!=="")return!0;r.set("error",{path:"input",message:""})})},getFieldContent:function(){var t=[],n=this.get("srcNode").all("ul");return n.each(function(n){n.all("li").each(function(n){var r=new e.ControlForm.FieldContent({field:n.getData().field,content:n.one("input, textarea, select").get("value")});t.push(r)})}),t},setFieldContent:function(e){var t=this.get("srcNode").all("li");for(var n in e)t.each(function(t){t.getData().field.id===e[n].get("field").id&&t.one("input, textarea, select").set("value",e[n].get("content"))})}},{ATTRS:{srcNode:{value:null},step:{value:-1},formsModel:{value:null},className:{value:"formContainer"},editMode:{value:!1},draft:{value:null}}}),e.namespace("Rednose").ControlForm=d},"1.1.0-DEV",{requires:["autocomplete","autocomplete-filters","autocomplete-highlighters","base","calendar","dd-constrain","dd-proxy","io","model","model-list","node","rednose-contextmenu","rednose-dialog"]});
