YUI.add("libbit-dialog",function(e,t){var n;n=e.Base.create("dialog",e.Widget,[],{initializer:function(){var t=this;this.after("errorChange",this._setError,this),e.on("keydown",function(e){e.keyCode===27&&t.destroy()})},destructor:function(){this.get("panel")&&this.get("panel").destroy()},_setError:function(e){var t=e.newVal,n=this.get("panel").get("boundingBox"),r;n.all(".control-group").each(function(e){e.hasClass("error")&&e.removeClass("error"),e.all(".help-block").remove()}),r=n.one("[data-path="+t.path+"]"),r.ancestor(".control-group").addClass("error"),t.message&&r.get("parentNode").append('<span class="help-block">'+t.message+"</span>"),r.focus()},hide:function(){this.destroy()},prompt:function(t,n,r,i,s,o){var u=this,a,f;o=typeof o!="undefined"?o:"OK",r===null&&(r=""),s?(typeof s=="string"?input=e.Node.create(s):input=s,a=e.Node.create('<form action="#" class="form-horizontal"></form>'),a.append(input)):(input=e.Node.create('<input type="text" value="'+r+'" data-path="input" id="input">'),a=e.Node.create('<form action="#" class="form-horizontal">   <div class="icon icon_absolute dialog_prompt_icon"></div>   <div class="control-group">       <label for="input" class="control-label">'+n+"</label>"+'       <div class="controls"></div>'+"   </div>"+"</form>"),a.one(".controls").append(input)),f=(new e.Libbit.Panel({bodyContent:a,headerContent:t,zIndex:e.all("*").size(),width:this.get("width"),buttons:[{value:"Cancel",section:e.WidgetStdMod.FOOTER,action:function(){u.destroy()},classNames:"btn"},{value:o,section:e.WidgetStdMod.FOOTER,isDefault:!0,action:function(){i!==null&&i(a)===!0&&u.destroy()},classNames:"btn btn-primary"}],centered:!0,modal:!0,visible:!0})).render(),a.one("input,textarea,select").focus().select(),a.one("input,textarea,select").on("keyup",function(e){if(e.button===13){var t=f.get("buttons");for(var n in t.footer){var r=t.footer[n];r.hasClass("btn-primary")&&r.simulate("click")}}}),f.get("boundingBox").addClass("libbit-dialog"),f.get("boundingBox").all(".yui3-button").each(function(){this.removeClass("yui3-button").removeClass("yui3-button-primary")}),this.set("panel",f)},confirm:function(t,n,r,i,s){var o=this,u,a;i=typeof i!="undefined"?i:!1,s=typeof s!="undefined"?s:"OK",u=e.Node.create('<div class="icon '+(i?"dialog_warning_icon":"dialog_prompt_icon")+'"></div>'+"<div><p>"+n+"</p></div>"),a=(new e.Libbit.Panel({bodyContent:u,headerContent:t,zIndex:e.all("*").size(),width:this.get("width"),buttons:[{value:"Cancel",section:e.WidgetStdMod.FOOTER,isDefault:!1,action:function(){o.destroy()},classNames:"btn"},{value:s,section:e.WidgetStdMod.FOOTER,isDefault:!0,action:function(){r&&r(),o.destroy()},classNames:"btn "+(i?"btn-warning":"btn-primary")}],centered:!0,modal:!0,visible:!0})).render(),a.get("boundingBox").addClass("libbit-dialog"),a.get("boundingBox").all(".yui3-button").each(function(){this.removeClass("yui3-button").removeClass("yui3-button-primary")}),this.set("panel",a)},error:function(t,n,r){var i=this,s,o;r?s=e.Node.create('<div class="icon dialog_warning_icon"></div><div><p>'+n+"</p></div>"):s=e.Node.create('<div class="icon dialog_error_icon"></div><div><p>'+n+"</p></div>"),o=(new e.Libbit.Panel({bodyContent:s,headerContent:t,zIndex:e.all("*").size(),width:this.get("width"),buttons:[{value:"OK",section:e.WidgetStdMod.FOOTER,isDefault:!0,action:function(){i.destroy()},classNames:"btn "+(r?"btn-warning":"btn-danger")}],centered:!0,modal:!0,visible:!0})).render(),o.get("boundingBox").addClass("rednose-widget"),o.get("boundingBox").addClass("libbit-dialog"),o.get("boundingBox").all(".yui3-button").each(function(){this.removeClass("yui3-button").removeClass("yui3-button-primary")}),this.set("panel",o)}},{ATTRS:{error:{value:{}},panel:{value:null},width:{value:500}}}),n.confirm=function(e,t,r,i,s){var o=new n;return o.confirm(e,t,r,i,s),o},n.error=function(e,t,r){var i=new n;return i.error(e,t,r),i},e.namespace("Libbit").Dialog=n},"1.0.0",{requires:["dd","dd-plugin","json-parse","libbit-css","libbit-panel","node","node-event-simulate","widget"],skinnable:!0});
