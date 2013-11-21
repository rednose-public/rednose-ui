YUI.add("rednose-controlform",function(e,t){var n;n=e.Base.create("form",e.Model,[],{removeFieldGroup:function(e){for(var t in this.get("fieldGroups"))if(this.get("fieldGroups")[t]["id"]==e){var n=this.get("fieldGroups");n.splice(t,1),this.set("fieldGroups",n)}},getFieldGroup:function(e){for(var t in this.get("fieldGroups"))if(this.get("fieldGroups")[t]["id"]==e)return this.get("fieldGroups")[t];return!1}},{ATTRS:{caption:{value:""},fieldGroups:{value:[]}}}),e.namespace("ControlForm").Form=n;var r;r=e.Base.create("formItem",e.Model,[],{},{ATTRS:{template:{value:null},step:{value:0},sortOrder:{value:0},direction:{value:"left"},controlForm:{value:null},fieldGroupOrder:{value:[]}}}),e.namespace("ControlForm").FormItem=r;var r=e.ControlForm.FormItem,n=e.ControlForm.Form,i;i=e.Base.create("formItems",e.ModelList,[],{model:r,parse:function(e){return e.map(function(e){return e.controlForm!==null&&(e.controlForm=new n(e.controlForm)),e})},sync:function(t,n,r){var i=this;t==="read"&&e.io(Routing.generate("rednose_docgen_forms_list",n),{method:"GET",on:{success:function(t,s){i.set("templateId",n.templateId),r(null,e.JSON.parse(s.responseText))}}})},comparator:function(e){return e.get("sortOrder")},setPosition:function(e,t,n){this.updateProperty(e,"sortOrder",t),this.updateProperty(e,"direction",n)},updateProperty:function(e,t,n){this.each(function(r){r.get("id")===e&&r.set(t,n)})},isModified:function(){return!0},addForm:function(t){var n=this,r={id:"tmp_"+Math.round((new Date).getTime()/1e3)+Math.round(Math.random())*999999,direction:"left",controlForm:new e.ControlForm.Form({caption:t,fieldGroups:[]}),sortOrder:n.size(),template:n.get("templateId")};n.add(r)},deleteForm:function(e){var t=this;this.each(function(n){n.get("id")===e&&t.remove(n)})},getFieldGroup:function(e){var e=parseInt(e),t=null;return this.each(function(n){n.get("controlForm").getFieldGroup(e)&&(t=n.get("controlForm").getFieldGroup(e))}),t},deleteFieldGroup:function(e,t){this.each(function(n){n.get("id")===e&&n.get("controlForm").removeFieldGroup(t)})}},{ATTRS:{templateId:{value:null}}}),e.namespace("ControlForm").FormItems=i;var s;s=e.Base.create("fieldContent",e.Model,[],{},{ATTRS:{field:{value:null},content:{value:""}}}),e.namespace("ControlForm").FieldContent=s;var o;o=e.Base.create("datepicker",e.Calendar,[],{initializer:function(){var t=this;this.after("render",function(){var n=e.Node.create("<span />"),r=e.Node.create("<input />"),i=e.Node.create("<span />"),s=this.get("contentBox");i.addClass("icon-calendar"),r.addClass("dialogCalendar"),r.setAttribute("readonly","true"),r.on("click",function(){t.showCalendar(r,n)}),n.addClass("calendarWrapper"),n.hide(),n.append(s.one(".yui3-calendar-pane")),n.one(".yui3-calendar-pane").addClass("dialogCalendarPane"),s.append(r),s.append(i),s.append(n),this.set("wrapper",n),t.dateSelected({date:new Date})}),this.on("dateClick",t.dateSelected)},showCalendar:function(e){var t=this.get("wrapper"),n=this.get("rules");if(typeof n.is_date.accepts_input=="undefined")return;var r=!1;t.detach("clickoutside"),t.on("clickoutside",function(){r===!1?r=!0:t.hide()}),t.show(),t.setX(e.getX()),t.setY(e.getY()+parseInt(e.getStyle("height"))+5)},dateSelected:function(e){var t=this.get("wrapper"),n=t.ancestor().one("input");n.set("value",e.date.toLocaleDateString()),n.setAttribute("data-unixtime",e.date.getTime()),t.hide()}},{ATTRS:{wrapper:{value:null},rules:{value:{}}}}),e.namespace("Rednose").ControlFormDatepicker=o;var u;u=e.Base.create("richTextEditor",e.Widget,[],{render:function(){var e=this.get("rules").input_properties,t=[];e&&(e.styles==="true"&&t.push({name:"styles",items:["Font","FontSize"]}),e.editing==="true"&&t.push({name:"editing",items:["Find","Replace","-","SelectAll"]}),e.clipboard==="true"&&t.push({name:"clipboard",items:["Cut","Copy","Paste","PasteText"]}),e.undoredo==="true"&&t.push({name:"clipboard",items:["Undo","Redo"]}),e.basicstyles==="true"&&t.push({name:"basicstyles",items:["Bold","Italic","Underline","-","RemoveFormat"]}),e.paragraph==="true"&&t.push({name:"paragraph",items:["NumberedList","BulletedList","-","Outdent","Indent"]}),e.insert==="true"&&t.push({name:"links",items:["Link","Unlink"]}),e.tools==="true"&&t.push({name:"tools",items:["Maximize"]})),CKEDITOR.appendTo(this.get("srcNode").getDOMNode(),{toolbar:t,removePlugins:"elementspath",resize_enabled:!1,disableNativeSpellChecker:!1,scayt_sLang:YUI_config.lang,language:YUI_config.lang,height:"100"})}},{ATTRS:{rules:{value:{}}}}),e.namespace("Rednose").ControlFormRichTextEditor=u;var a;a=e.Base.create("common",e.Widget,[],{initializer:function(){},render:function(){var e=this.get("rules");if(typeof e.input_method=="undefined"){this._renderInput();return}switch(e.input_method.inputElement){case"input":this._renderInput();break;case"textarea":this._renderInput(!0);break;case"dropdown":this._renderDropdown();break;case"checkbox":this._renderCheckbox();break;case"radio":this._renderRadio()}},_renderInput:function(t){var n=e.Node.create(t?"<textarea />":"<input />"),r=this._getProperties();r.defaultValue&&n.set("value",r.defaultValue),this.get("srcNode").append(n)},_renderDropdown:function(){var t=e.Node.create("<select />"),n=this.get("rules"),r=this._getProperties();if(typeof n.input_restrictions!="undefined")for(var i in n.input_restrictions){var s=n.input_restrictions[i],o=e.Node.create("<option>"+s.name+"</option>");s.value===""?o.setAttribute("value",s.name):o.setAttribute("value",s.value),r.defaultValue&&o.get("innerHTML")===r.defaultValue&&o.setAttribute("selected","selected"),t.append(o)}this.get("srcNode").append(t)},_renderCheckbox:function(){var t=this._getProperties(),n=e.Node.create('<input type="checkbox" />');this.get("srcNode").append(n),t.defaultValue&&n.set("checked",t.defaultValue==="true")},_renderRadio:function(){var t="rand"+Math.floor(Math.random()*1010101)+(new Date).getTime(),n=this.get("rules"),r=this._getProperties(),i=e.Node.create('<span class="radioGroup" id="'+t+'" />');if(typeof n.input_restrictions!="undefined"
){for(var s in n.input_restrictions){var o=n.input_restrictions[s],u=e.Node.create('<input type="radio" name="'+t+'" />');r.defaultValue&&r.defaultValue===o.name&&u.set("checked",!0),o.value===""?u.setAttribute("value",o.name):u.setAttribute("value",o.value),i.append(u),i.append(e.Node.create(o.name)),i.append(e.Node.create("<br />"))}this.get("srcNode").append(i)}},_getProperties:function(){var e=this.get("rules");if(e.input_properties){var t=e.input_properties;return t}return{}}},{ATTRS:{rules:{value:{}}}}),e.namespace("Rednose").ControlFormCommon=a;var f;f=e.Base.create("controlForm",e.Base,[],{viewTemplate:'<div class="formContainer">   <div class="formContainer_left">&nbsp;</div>   <div class="formContainer_right">&nbsp;</div>   <div class="formContainer_proxy">   </div></div>',initializer:function(){this.on("contextMenu:editLabel",this._editLabel),this.on("contextMenu:deleteForm",this.deleteForm),this.on("contextMenu:deleteFieldGroup",this._deleteFieldGroup),this.on("contextMenu:editFieldGroup",this._editFieldGroup),this.after("stepChange",this._stepChange)},render:function(){var e=this.get("srcNode"),t=this.get("formsModel"),n=this;e.setHTML(this.viewTemplate),e.one(".formContainer").removeClass("formContainer").addClass(this.get("className")),e.one(".formContainer_left").removeClass("formContainer_left").addClass(this.get("className")+"_left"),e.one(".formContainer_right").removeClass("formContainer_right").addClass(this.get("className")+"_right"),t.sort(),t.each(function(e){n._renderForm(e)}),this.set("step",0),this.fire("rendered")},_renderForm:function(t){var n=this,r=this.get("srcNode").one("div"),i=t.get("fieldGroupOrder"),s=t.get("controlForm"),o=s.get("fieldGroups"),u=e.Node.create("<fieldset>"),a=e.Node.create("<legend>");a.set("innerHTML",s.get("caption")),this.get("editMode")&&(u.addClass("editMode"),a.plug(e.Rednose.ContextMenu,{content:[{title:"Rename",id:"editLabel"},{title:"-"},{title:"Remove",id:"deleteForm"}],bubbleTarget:n})),u.append(a),u.set("name",t.get("id")),u.setAttribute("data-step",t.get("step")),e.Array.each(i,function(t){e.Array.each(o,function(e){t===e.id&&n._addFieldGroup(u,e)})});var f=this.get("className")+"_"+t.get("direction");r.one("."+f).append(u)},_addFieldGroup:function(t,n){var r=this,i=e.Node.create("<ul />"),s;typeof n.fieldGroupItems=="undefined"?s=n.get("fieldGroupItems"):s=n.fieldGroupItems;if(this.get("editMode")){var o=(new e.DD.Drag({node:i,group:["fieldGroup"]})).plug(e.Plugin.DDConstrained,{constrain2node:t}).plug(e.Plugin.DDProxy,{moveOnEnd:!1});o.on("drag:start",function(e){e.target.get("dragNode").setHTML("")}),o.on("drag:drag",function(e){r._reOrderFieldGroupDD(e,t,i)}),o.on("drag:end",function(){r._reOrderFieldGroup(t)})}i.set("id",n.id),i.setAttribute("name",n.name),i.on(["mouseover","mouseout"],function(){i.toggleClass("fieldGroupHighlight")}),e.Array.each(s,function(t){var n=e.Node.create("<label>"),s=e.Node.create("<li>"),o=r.get("draft");if(!t.rules.is_text_value&&!t.rules.is_header){controlElement=r._createInputElement(t.rules),controlElement.data=t,n.set("innerHTML",t.field.name);if(o!==null){var u=o.getValue(t.field.id);controlElement.set("value",u)}s.append(n),s.append(controlElement),s.setData(t),s.on("click",function(){r.fire("controlSelected",{controlContainer:s})}),i.append(s)}}),this.get("editMode")&&i.plug(e.Rednose.ContextMenu,{content:[{title:"Edit",id:"editFieldGroup"},{title:"-"},{title:"Remove",id:"deleteFieldGroup"}],bubbleTarget:r}),t.append(i)},_createInputElement:function(t){var n=e.Node.create("<span />");return t.is_date?(new e.Rednose.ControlFormDatepicker({srcNode:n,rules:t})).render():t.is_html?(new e.Rednose.ControlFormRichTextEditor({srcNode:n,rules:t})).render():((new e.Rednose.ControlFormCommon({srcNode:n,rules:t})).render(),n.one("*")&&(n=n.one("*"))),n},_reOrderFieldGroupDD:function(e,t,n){var r=e.currentTarget.mouseXY[1],i=!1;t.all("ul").each(function(e){if(n.get("id")!==e.get("id")){var t=e.getY(),s=t+parseInt(e.getComputedStyle("height"),10);r>t&&r<s&&(n.insertBefore(n,e),i=!0)}}),i===!1&&r>t.getY()+parseInt(t.getComputedStyle("height"),10)&&t.append(n)},_reOrderFieldGroup:function(e){var t=this.get("formsModel"),n=e.get("name"),r=[];e.all("ul").each(function(){r.push(this.get("id"))}),t.updateProperty(n,"fieldGroupOrder",r)},updateControl:function(e){var t=this.get("formsModel"),n=t.getFieldGroup(e.fieldGroup);if(n.fieldGroupItems)for(var r in n.fieldGroupItems)n.fieldGroupItems[r].id===e.id&&(n.fieldGroupItems[r].rules=e.rules)},_addFieldGroupToModel:function(e,t){var n=this.get("formsModel");n.each(function(n){if(n.get("id")===e){var r=n.get("controlForm").get("fieldGroups");r.push(t)}})},_stepChange:function(){var e=this,t=this.get("srcNode");t.all("*[data-step]").each(function(t){var n=t.getAttribute("data-step");parseInt(n,10)!==parseInt(e.get("step"),10)?t.hide():t.show()})},ddOver:function(t,n){var r=e.one("#"+n.get("id"));t.type==="drop:over"?r.hasClass("ddOver")===!1&&r.addClass("ddOver"):r.removeClass("ddOver")},ddDrop:function(t,n){var r=this,i=e.DD.DDM.activeDrag,s=e.one("#"+n.get("id"));e.TB.FieldGroup||console.exception&&console.exception("Dependancy error Y.TB.Field not found"),e.instanceOf(i.get("data"),e.TB.FieldGroup)?(fieldGroup=i.get("data"),r._addFieldGroup(s,fieldGroup.getAttrs(),!0),r._addFieldGroupToModel(s.get("name"),fieldGroup),r._reOrderFieldGroup(s)):console.exception&&console.exception("DD Error: Expected a Y.TB.FieldGroup"),s.removeClass("ddOver")},toJSON:function(){var t=this.get("formsModel");return e.JSON.stringify(t)},addForm:function(e){var t=this.get("formsModel");t.addForm(e),this.render()},deleteForm:function(t){var n=this,r=this.get("formsModel"),i=t.node.get("parentNode").get("name");e.Rednose.Dialog.confirm("Delete",'Delete the form "'+t.node.get("innerHTML")+'" and all its fieldgroups?',function(){r.deleteForm(i),n.render()})},_editFieldGroup:function(e){var t=this.get("formsModel").getFieldGroup(e.node.get("id"));this.fire("editFieldGroup",{fieldGroup
:t})},_deleteFieldGroup:function(t){var n=this,r=this.get("formsModel"),i=t.node.get("parentNode"),s=i.get("name");e.Rednose.Dialog.confirm("Delete",'Delete the fieldgroup "'+t.node.getAttribute("name")+'"',function(){r.deleteFieldGroup(s,t.node.get("id")),t.node.remove(),n._reOrderFieldGroup(i)})},_editLabel:function(t){var n=this,r=new e.Rednose.Dialog,i=t.node,s=i.get("parentNode").get("name");r.prompt("Form title","Value",i.get("text"),function(e){var t="";n.get("formsModel").each(function(n){if(n.get("id")===s){var r=n.get("controlForm");t=e.one("input").get("value"),t!==""&&(r.set("caption",t),i.set("text",r.get("caption")))}});if(t!=="")return!0;r.set("error",{path:"input",message:""})})},getFieldContent:function(){var t=[],n=this.get("srcNode").all("ul");return n.each(function(n){n.all("li").each(function(n){var r=new e.ControlForm.FieldContent({field:n.getData().field,content:n.one("input, textarea, select").get("value")});t.push(r)})}),t},setFieldContent:function(e){var t=this.get("srcNode").all("li");for(var n in e)t.each(function(t){t.getData().field.id===e[n].get("field").id&&t.one("input, textarea, select").set("value",e[n].get("content"))})}},{ATTRS:{srcNode:{value:null},step:{value:-1},formsModel:{value:null},className:{value:"formContainer"},editMode:{value:!1},draft:{value:null}}}),e.namespace("Rednose").ControlForm=f},"1.1.0-DEV",{requires:["io","calendar","dd-proxy","dd-constrain","node","model-list","model","base","rednose-dialog","rednose-contextmenu"]});
