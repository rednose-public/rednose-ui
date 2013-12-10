YUI.add("rednose-dialog",function(e,t){var n="rednose-widget",r="rednose-dialog",i="pull-right",s="btn",o="btn-warning",u="btn-primary",a="btn-danger",f="btn-info",l="btn-success",c="close",h="OK",p="Cancel",d="default",v="info",m="success",g="warning",y="danger",b="error",w=e.Base.create("dialog",e.Widget,[],{initializer:function(){var t=this;this.after("errorChange",this._setError,this),e.on("keydown",function(e){e.keyCode===27&&t.destroy()})},destructor:function(){this.get("panel")&&this.get("panel").destroy()},alert:function(t){t||(t={});var n=this,r,i;t=e.mix(t,{title:"",text:"",type:d,confirm:h}),r=e.Node.create("<div><p>"+t.text+"</p></div>"),i=(new e.Rednose.Panel({bodyContent:r,headerContent:this._getHeaderContent(t.title),zIndex:this._getHighzIndex(),width:this.get("width"),buttons:[{value:t.confirm,section:e.WidgetStdMod.FOOTER,isDefault:!0,action:function(){n.destroy()},classNames:s+" "+this._getButtonForType(t.type)}]})).render(),this._setPanelStyle(i),this.set("panel",i),i.set("zIndex",this._getHighzIndex())},confirm:function(t,n){t||(t={});var r=this,i,o;t=e.mix(t,{title:"",text:"",type:d,confirm:h,cancel:p}),i=e.Node.create("<div><p>"+t.text+"</p></div>"),o=(new e.Rednose.Panel({bodyContent:i,headerContent:this._getHeaderContent(t.title),zIndex:this._getHighzIndex(),width:this.get("width"),buttons:[{value:t.cancel,section:e.WidgetStdMod.FOOTER,isDefault:!1,action:function(){r.destroy()},classNames:s},{value:t.confirm,section:e.WidgetStdMod.FOOTER,isDefault:!0,action:function(){typeof n=="function"&&n(),r.destroy()},classNames:s+" "+this._getButtonForType(t.type)}]})).render(),this._setPanelStyle(o),this.set("panel",o),o.set("zIndex",this._getHighzIndex())},prompt:function(t,n){t||(t={});var r=this,i,o;t=e.mix(t,{title:"",text:"",dataPath:"input",type:d,confirm:h,cancel:p,value:"",html:null}),t.html?(typeof t.html=="string"?input=e.Node.create(t.html):input=t.html,i=e.Node.create('<form class="form-horizontal"></form>'),i.append(input)):(input=e.Node.create('<input type="text" value="'+t.value+'" data-path="'+t.dataPath+'" id="input">'),i=e.Node.create('<form class="form-horizontal">   <div class="control-group">       <label for="input" class="control-label">'+t.text+"</label>"+'       <div class="controls"></div>'+"   </div>"+"</form>"),i.one(".controls").append(input)),o=(new e.Rednose.Panel({bodyContent:i,headerContent:this._getHeaderContent(t.title),zIndex:this._getHighzIndex(),width:this.get("width"),buttons:[{value:t.cancel,section:e.WidgetStdMod.FOOTER,action:function(){r.destroy()},classNames:s},{value:t.confirm,section:e.WidgetStdMod.FOOTER,isDefault:!0,action:function(){if(typeof n=="function"){var e=t.html?i:i.one("#input").get("value");n(e)===!0&&r.destroy()}},classNames:s+" "+this._getButtonForType(t.type)}]})).render(),i.one("input, textarea, select")!==null&&(i.one("input, textarea, select").on("keydown",function(e){e.button===13&&e.preventDefault()}),i.one("input, textarea, select").on("keyup",function(t){if(t.button===13){t.preventDefault();var n=o.get("buttons");e.Array.each(n.footer,function(e){e.hasClass(u)&&e.simulate("click")})}})),this._setPanelStyle(o),this.set("panel",o),o.set("zIndex",this._getHighzIndex())},_setPanelStyle:function(e){var t=e.get("boundingBox");t.addClass(n),t.addClass(r),t.one(".yui3-widget-buttons").addClass(i),t.all(".yui3-button").each(function(e){e.removeClass("yui3-button").removeClass("yui3-button-primary")})},_getButtonForType:function(e){switch(e){case d:return u;case v:return f;case m:return l;case g:return o;case y:case b:return a;default:return u}},_getHeaderContent:function(t){var n=this,r;return r=e.Node.create('<div style="width: 100%;"><div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+t+"</div>"+"</div>"),r.prepend(e.Node.create('<div style="float: right; white-space: nowrap;"><button class="'+c+'">&times;</button>'+"</div>")),r.one("."+c).on("click",function(){n.destroy()}),r},_setError:function(e){var t=e.newVal,n=this.get("panel").get("boundingBox"),r;n.all(".control-group").each(function(e){e.hasClass("error")&&e.removeClass("error"),e.all(".help-block").remove()}),r=n.one("[data-path="+(t.path||"input")+"]"),r.ancestor(".control-group").addClass("error"),t.message&&r.get("parentNode").append('<span class="help-block">'+t.message+"</span>"),r.focus()},_getHighzIndex:function(){var e=document.getElementsByTagName("*"),t=0;for(var n=0;n<e.length-1;n++)parseInt(e[n].style.zIndex)>t&&(t=parseInt(e[n].style.zIndex));return t+1}},{ATTRS:{error:{value:{}},panel:{value:null},width:{value:500}}});w.alert=function(e){var t=new w;return t.alert(e),t},w.confirm=function(e,t){var n=new w;return n.confirm(e,t),n},w.prompt=function(e,t){var n=new w;return n.prompt(e,t),n},e.namespace("Rednose").Dialog=w},"1.1.0-DEV",{requires:["dd","dd-plugin","json-parse","rednose-dialog-css","rednose-panel","node","node-event-simulate","widget"]});
