YUI.add("libbit-controlform",function(e,t){var n;n=e.Base.create("controlForm",e.Base,[],{model:null,render:function(e){var t=this;e==null?e=this.get("formsModel"):this.set("formsModel",e),e.each(function(e){t.renderForm(e)}),t.model=e},renderForm:function(t){var n=this,r=this.get("formContainer"),i=t.get("controlForm"),s=i.get("fieldGroups"),o=e.Node.create("<fieldset>"),u=e.Node.create("<legend>");u.set("innerHTML",i.get("caption")),u.on("dblclick",function(){n.editLabel(u)}),o.append(u),o.set("name",t.get("id")),e.Array.each(s,function(e){n.addFieldGroup(o,e)});var a=r.getAttribute("class")+"_"+t.get("direction");r.one("."+a)!=null?r.one("."+a).append(o):r.append(o)},addFieldGroup:function(t,n){var r=e.Node.create("<ol>"),i;typeof n["fieldGroupItems"]=="undefined"?i=n.get("fieldGroupItems"):i=n.fieldGroupItems,r.set("id",n.id),e.Array.each(i,function(t){var n=e.Node.create("<label>"),i=e.Node.create("<li>"),s=null;s=e.Node.create("<input />"),n.set("innerHTML",t.field.name),i.append(n),i.append(s),r.append(i)}),t.append(r)},addFieldGroupToModel:function(e,t){this.model.each(function(n){if(n.get("id")==e){var r=n.get("controlForm").get("fieldGroups");r.push(t)}})},ddOver:function(t,n){var r=e.one("#"+n.get("id"));t.type=="drop:over"?r.hasClass("ddOver")===!1&&r.addClass("ddOver"):r.removeClass("ddOver")},ddDrop:function(t,n){var r=this,i=e.DD.DDM.activeDrag,s=e.one("#"+n.get("id"));e.TB.FieldGroup||console.exception&&console.exception("Dependancy error Y.TB.Field not found"),e.instanceOf(i.get("data"),e.TB.FieldGroup)?(fieldGroup=i.get("data"),r.addFieldGroup(s,fieldGroup,!0),r.addFieldGroupToModel(s.get("name"),fieldGroup)):console.exception&&console.exception("DD Error: Expected a Y.TB.FieldGroup"),s.removeClass("ddOver")},editLabel:function(t){var n=this,r=t.get("parentNode").get("name");e.Libbit.Dialog.prompt("Form title","Value",function(e){return n.model.each(function(n){if(n.get("id")==r){var i=n.get("controlForm");i.set("caption",e),t.set("text",i.get("caption"))}}),!0},t.get("text"))}},{ATTRS:{formContainer:{value:null},formsModel:{value:null}}}),e.namespace("Libbit").ControlForm=n},"1.0.0",{requires:["node","model-list","model","base","libbit-dialog"]});
