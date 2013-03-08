YUI.add("libbit-controlform",function(e,t){var n;n=e.Base.create("form",e.Model,[],{removeFieldGroup:function(e){for(var t in this.get("fieldGroups"))if(this.get("fieldGroups")[t]["id"]==e){var n=this.get("fieldGroups");n.splice(t,1),this.set("fieldGroups",n)}},getFieldGroup:function(e){for(var t in this.get("fieldGroups"))if(this.get("fieldGroups")[t]["id"]==e)return this.get("fieldGroups")[t];return!1}},{ATTRS:{caption:{value:""},fieldGroups:{value:[]}}}),e.namespace("ControlForm").Form=n;var r;r=e.Base.create("formItem",e.Model,[],{},{ATTRS:{template:{value:null},sortOrder:{value:0},direction:{value:"left"},controlForm:{value:null},fieldGroupOrder:{value:[]}}}),e.namespace("ControlForm").FormItem=r;var r=e.ControlForm.FormItem,n=e.ControlForm.Form,i;i=e.Base.create("formItems",e.ModelList,[],{model:r,parse:function(e){return e.map(function(e){return e.controlForm!==null&&(e.controlForm=new n(e.controlForm)),e})},sync:function(t,n,r){var i=this;t==="read"&&e.io(Routing.generate("libbit_docgen_forms_list",n),{method:"GET",on:{success:function(t,s){i.set("templateId",n.templateId),r(null,e.JSON.parse(s.responseText))}}})},comparator:function(e){return e.get("sortOrder")},setPosition:function(e,t,n){this.updateProperty(e,"sortOrder",t),this.updateProperty(e,"direction",n)},updateProperty:function(e,t,n){this.each(function(r){r.get("id")==e&&r.set(t,n)})},isModified:function(){return!0},addForm:function(e){var t=this,n={id:"tmp_"+Math.round((new Date).getTime()/1e3)+Math.round(Math.random())*999999,direction:"left",controlForm:new t.model({caption:e,fieldGroups:[]}),sortOrder:t.size(),template:t.get("templateId")};t.add(n)},deleteForm:function(e){var t=this;this.each(function(n){n.get("id")==e&&t.remove(n)})},getFieldGroup:function(e){var e=parseInt(e),t=null;return this.each(function(n){n.get("controlForm").getFieldGroup(e)&&(t=n.get("controlForm").getFieldGroup(e))}),t},deleteFieldGroup:function(e,t){this.each(function(n){n.get("id")==e&&n.get("controlForm").removeFieldGroup(t)})}},{ATTRS:{templateId:{value:null}}}),e.namespace("ControlForm").FormItems=i;var s;s=e.Base.create("fieldContent",e.Model,[],{},{ATTRS:{field:{value:null},content:{value:""}}}),e.namespace("ControlForm").FieldContent=s;var o;o=e.Base.create("datepicker",e.Calendar,[],{initializer:function(){this.after("render",function(){var t=e.Node.create('<span class="calendarWrapper" />'),n=this.get("contentBox");n.prepend(t),t.append(n.one(".yui3-calendar-pane")),t.one(".yui3-calendar-pane").setStyle("display","none"),t.append("<span>This is a calender</span>")})}},{ATTRS:{rules:{value:[]}}}),e.namespace("Libbit").ControlFormDatepicker=o;var u;u=e.Base.create("controlForm",e.Base,[],{viewTemplate:'<div class="formContainer">   <div class="formContainer_left">&nbsp;</div>   <div class="formContainer_right">&nbsp;</div>   <div class="formContainer_proxy">   </div></div>',initializer:function(){var e=this;this.on("contextMenu:editLabel",this._editLabel),this.on("contextMenu:deleteForm",this.deleteForm),this.on("contextMenu:deleteFieldGroup",this._deleteFieldGroup),this.on("contextMenu:editFieldGroup",this._editFieldGroup)},render:function(e){var t=this,n=this.get("srcNode");n.setHTML(this.viewTemplate),n.one(".formContainer").removeClass("formContainer").addClass(this.get("className")),n.one(".formContainer_left").removeClass("formContainer_left").addClass(this.get("className")+"_left"),n.one(".formContainer_right").removeClass("formContainer_right").addClass(this.get("className")+"_right"),e==null?e=this.get("formsModel"):this.set("formsModel",e),e.sort(),e.each(function(e){t._renderForm(e)}),this.fire("rendered")},_renderForm:function(t){var n=this,r=this.get("srcNode").one("div"),i=t.get("fieldGroupOrder"),s=t.get("controlForm"),o=s.get("fieldGroups"),u=e.Node.create("<fieldset>"),a=e.Node.create("<legend>");a.set("innerHTML",s.get("caption")),this.get("editMode")&&(u.addClass("editMode"),a.plug(e.Libbit.ContextMenu,{content:[{title:"Rename",id:"editLabel"},{title:"-"},{title:"Remove",id:"deleteForm"}],bubbleTarget:n})),u.append(a),u.set("name",t.get("id")),e.Array.each(i,function(t){e.Array.each(o,function(e){t==e["id"]&&n.addFieldGroup(u,e)})});var f=r.getAttribute("class")+"_"+t.get("direction");r.one("."+f).append(u)},addFieldGroup:function(t,n){var r=this,i=e.Node.create("<ol />"),s;typeof n["fieldGroupItems"]=="undefined"?s=n.get("fieldGroupItems"):s=n.fieldGroupItems;if(this.get("editMode")){var o=(new e.DD.Drag({node:i,group:["fieldGroup"]})).plug(e.Plugin.DDConstrained,{constrain2node:t}).plug(e.Plugin.DDProxy,{moveOnEnd:!1});o.on("drag:start",function(e){e.target.get("dragNode").setHTML("")}),o.on("drag:drag",function(e){r.reOrderFieldGroupDD(e,t,i)}),o.on("drag:end",function(e){r.reOrderFieldGroup(t)})}i.set("id",n.id),i.setAttribute("name",n.name),i.on(["mouseover","mouseout"],function(e){i.toggleClass("fieldGroupHighlight")}),e.Array.each(s,function(t){var n=e.Node.create("<label>"),s=e.Node.create("<li>"),o=null;o=r._createInputElement(t.rules),o.data=t,n.set("innerHTML",t.field.name),s.append(n),s.append(o),s.setData(t.field),s.on("click",function(e){s.addClass("controlSelected"),r.fire("controlSelected",{controlContainer:s})}),i.append(s)}),this.get("editMode")&&i.plug(e.Libbit.ContextMenu,{content:[{title:"Edit",id:"editFieldGroup"},{title:"-"},{title:"Remove",id:"deleteFieldGroup"}],bubbleTarget:r}),t.append(i)},_createInputElement:function(t){var n;return t.is_date?(n=e.Node.create("<span />"),(new e.Libbit.ControlFormDatepicker({srcNode:n,rules:t})).render()):n=e.Node.create("<input />"),n},reOrderFieldGroupDD:function(e,t,n){var r=e.currentTarget.mouseXY[1],i=!1;t.all("ol").each(function(e){if(n.get("id")!==e.get("id")){var t=e.getY(),s=t+parseInt(e.getComputedStyle("height"));r>t&&r<s&&(n.insertBefore(n,e),i=!0)}}),i==0&&r>t.getY()+parseInt(t.getComputedStyle("height"))&&t.append(n)},reOrderFieldGroup:function(e){var t=this.get("formsModel"),n=e.get("name"),r=[];e.all("ol").each(function(){r.push(this.get("id"))}),t.updateProperty(n,"fieldGroupOrder",r)},addFieldGroupToModel:function(e,t){var n=this,r=this.get("formsModel");r.each(function(n){if(n.get("id")==e){var r=n.get("controlForm").get("fieldGroups");r.push(t)}})},ddOver:function(t,n){var r=e.one("#"+n.get("id"));t.type=="drop:over"?r.hasClass("ddOver")===!1&&r.addClass("ddOver"):r.removeClass("ddOver")},ddDrop:function(t,n){var r=this,i=e.DD.DDM.activeDrag,s=e.one("#"+n.get("id"));e.TB.FieldGroup||console.exception&&console.exception("Dependancy error Y.TB.Field not found"),e.instanceOf(i.get("data"),e.TB.FieldGroup)?(fieldGroup=i.get("data"),r.addFieldGroup(s,fieldGroup.getAttrs(),!0),r.addFieldGroupToModel(s.get("name"),fieldGroup),r.reOrderFieldGroup(s)):console.exception&&console.exception("DD Error: Expected a Y.TB.FieldGroup"),s.removeClass("ddOver")},toJSON:function(){var t=this.get("formsModel");return e.JSON.stringify(t)},addForm:function(e){var t=this.get("formsModel");t.addForm(e),this.render()},deleteForm:function(t){var n=this,r=this.get("formsModel"),i=t.node.get("parentNode").get("name");e.Libbit.Dialog.confirm("Delete",'Delete the form "'+t.node.get("innerHTML")+'" and all its fieldgroups?',function(){r.deleteForm(i),n.render()})},_editFieldGroup:function(e){var t=this.get("formsModel").getFieldGroup(e.node.get("id"));this.fire("editFieldGroup",{fieldGroup:t})},_deleteFieldGroup:function(t){var n=this,r=this.get("formsModel"),i=t.node.get("parentNode"),s=i.get("name");e.Libbit.Dialog.confirm("Delete",'Delete the fieldgroup "'+t.node.getAttribute("name")+'"',function(){r.deleteFieldGroup(s,t.node.get("id")),t.node.remove(),n.reOrderFieldGroup(i)})},_editLabel:function(t){var n=this,r=new e.Libbit.Dialog,i=t.node,s=i.get("parentNode").get("name");r.prompt("Form title","Value",i.get("text"),function(e){var t="";n.get("formsModel").each(function(n){if(n.get("id")==s){var r=n.get("controlForm");t=e.one("input").get("value"),t!==""&&(r.set("caption",t),i.set("text",r.get("caption")))}});if(t!=="")return!0;r.set("error",{path:"input",message:""})})},getFieldContent:function(){var t=[],n=this.get("srcNode").all("ol");return n.each(function(n){n.all("li").each(function(n){var r=new e.ControlForm.FieldContent({field:n.getData(),content:n.one("input, textarea, select").get("value")});t.push(r)})}),t}},{ATTRS:{srcNode:{value:null},formsModel:{value:null},className:{value:"formContainer"},editMode:{value:!1},draftId:{value:null}}}),e.namespace("Libbit").ControlForm=u},"1.0.0",{requires:["calendar","dd-proxy","dd-constrain","node","model-list","model","base","libbit-dialog","libbit-contextmenu"]});
