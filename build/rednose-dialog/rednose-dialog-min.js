YUI.add("rednose-dialog",function(e,t){var n="rednose-widget",r="rednose-dialog",i="pull-left",s="pull-right",o="btn",u="btn-warning",a="btn-primary",f="btn-danger",l="btn-info",c="btn-success",h="close",p="OK",d="Cancel",v="default",m="info",g="success",y="warning",b="danger",w="error",E=e.Base.create("dialog",e.Widget,[],{initializer:function(){var t=this;this.after("errorChange",this._setError,this),e.on("keydown",function(e){e.keyCode===27&&t.destroy()})},destructor:function(){this.get("panel")&&this.get("panel").destroy()},alert:function(t){t||(t={});var n=this,r,i;t=e.mix(t,{title:"",text:"",type:v,confirm:p}),r=e.Node.create("<div><p>"+t.text+"</p></div>"),i=(new e.Rednose.Panel({bodyContent:r,headerContent:this._getHeaderContent(t.title),zIndex:this._getHighzIndex(),width:this.get("width"),buttons:[{value:t.confirm,section:e.WidgetStdMod.FOOTER,isDefault:!0,action:function(){n.destroy()},classNames:o+" "+this._getButtonForType(t.type)}]})).render(),this._setPanelStyle(i),this.set("panel",i),i.set("zIndex",this._getHighzIndex())},confirm:function(t,n){t||(t={});var r=this,i,s;t=e.mix(t,{title:"",text:"",type:v,confirm:p,cancel:d}),i=e.Node.create("<div><p>"+t.text+"</p></div>"),s=(new e.Rednose.Panel({bodyContent:i,headerContent:this._getHeaderContent(t.title),zIndex:this._getHighzIndex(),width:this.get("width"),buttons:[{value:t.cancel,section:e.WidgetStdMod.FOOTER,isDefault:!1,action:function(){r.destroy()},classNames:o},{value:t.confirm,section:e.WidgetStdMod.FOOTER,isDefault:!0,action:function(){typeof n=="function"&&n(),r.destroy()},classNames:o+" "+this._getButtonForType(t.type)}].reverse()})).render(),this._setPanelStyle(s),this.set("panel",s),s.set("zIndex",this._getHighzIndex())},prompt:function(t,n){t||(t={});var r=this,i,s;t=e.mix(t,{title:"",text:"",dataPath:"input",type:v,confirm:p,cancel:d,value:"",html:null}),t.html?(typeof t.html=="string"?input=e.Node.create(t.html):input=t.html,i=e.Node.create('<form class="form-horizontal"></form>'),i.append(input)):(input=e.Node.create('<input type="text" value="'+t.value+'" data-path="'+t.dataPath+'" id="input">'),i=e.Node.create('<form class="form-horizontal">   <div class="control-group">       <label for="input" class="control-label">'+t.text+"</label>"+'       <div class="controls"></div>'+"   </div>"+"</form>"),i.one(".controls").append(input)),s=(new e.Rednose.Panel({bodyContent:i,headerContent:this._getHeaderContent(t.title),zIndex:this._getHighzIndex(),width:this.get("width"),buttons:[{value:t.cancel,section:e.WidgetStdMod.FOOTER,action:function(){r.destroy()},classNames:o},{value:t.confirm,section:e.WidgetStdMod.FOOTER,isDefault:!0,action:function(){if(typeof n=="function"){var e=t.html?i:i.one("#input").get("value");n(e)===!0&&r.destroy()}},classNames:o+" "+this._getButtonForType(t.type)}].reverse()})).render(),i.one("input, textarea, select")!==null&&(i.one("input, textarea, select").on("keydown",function(e){e.button===13&&e.preventDefault()}),i.one("input, textarea, select").on("keyup",function(t){if(t.button===13){t.preventDefault();var n=s.get("buttons");e.Array.each(n.footer,function(e){e.hasClass(a)&&e.simulate("click")})}})),this._setPanelStyle(s),this.set("panel",s),s.set("zIndex",this._getHighzIndex())},addButtons:function(t){if(this.get("panel")){var n=e.guid(),r=this.get("panel").get("boundingBox"),o="btn";for(var u in t){var a=t[u];a.position&&a.position=="right"?o+=" "+s:o+=" "+i,a.classNames&&(o+=" "+a.classNames);var f={name:n,title:a.value,classNames:o,action:a.callback};this.get("panel").addButton(f);if(a.icon){var f=this.get("panel").getButton(n);f.append(e.Node.create('<li class="'+a.icon+'" />'))}}r.all(".yui3-button").each(function(e){e.removeClass("yui3-button").removeClass("yui3-button-primary")})}},_setPanelStyle:function(e){var t=e.get("boundingBox");t.addClass(n),t.addClass(r),t.all(".yui3-widget-buttons").each(function(e){e.removeClass("yui3-widget-buttons")}),t.all(".yui3-button").each(function(e){e.removeClass("yui3-button").removeClass("yui3-button-primary"),e.addClass(s)})},_getButtonForType:function(e){switch(e){case v:return a;case m:return l;case g:return c;case y:return u;case b:case w:return f;default:return a}},_getHeaderContent:function(t){var n=this,r;return r=e.Node.create('<div style="width: 100%;"><div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+t+"</div>"+"</div>"),r.prepend(e.Node.create('<div style="float: right; white-space: nowrap;"><button class="'+h+'">&times;</button>'+"</div>")),r.one("."+h).on("click",function(){n.destroy()}),r},_setError:function(e){var t=e.newVal,n=this.get("panel").get("boundingBox"),r;n.all(".control-group").each(function(e){e.hasClass("error")&&e.removeClass("error"),e.all(".help-block").remove()}),r=n.one("[data-path="+(t.path||"input")+"]"),r.ancestor(".control-group").addClass("error"),t.message&&r.get("parentNode").append('<span class="help-block">'+t.message+"</span>"),r.focus()},_getHighzIndex:function(){var e=document.getElementsByTagName("*"),t=0;for(var n=0;n<e.length-1;n++)parseInt(e[n].style.zIndex)>t&&(t=parseInt(e[n].style.zIndex));return t+1}},{ATTRS:{error:{value:{}},panel:{value:null},width:{value:500}}});E.alert=function(e){var t=new E;return t.alert(e),t},E.confirm=function(e,t){var n=new E;return n.confirm(e,t),n},E.prompt=function(e,t){var n=new E;return n.prompt(e,t),n},e.namespace("Rednose").Dialog=E},"1.3.0",{requires:["dd","dd-plugin","json-parse","rednose-dialog-css","rednose-panel","node","node-event-simulate","widget"]});
