YUI.add("rednose-view-nav",function(e,t){var n,r="rednose",i="rednose-view-nav",s="btn",o="btn-primary",u="disabled",a="float-left",f="float-right",l="close",c="yui3-widget-bd",h="yui3-widget-ft";EVT_BUTTON_CLOSE="buttonClose",n=e.Base.create("viewNav",e.View,[],{title:null,buttons:null,close:!1,padding:!0,_footer:null,_buttonMap:{},_panel:null,initializer:function(){this._viewNavEventHandles||(this._viewNavEventHandles=[]),this._viewNavEventHandles.push(e.Do.after(this._afterRender,this,"render",this)),this._buildFooter()},destructor:function(){(new e.EventHandle(this._viewNavEventHandles)).detach(),this._panel&&this._panel.destroy(),this.title=null,this.buttons=null,this._footer=null,this._buttonMap=null,this._panel=null},getButton:function(e){return this._buttonMap[e]},_buildFooter:function(){var t=this,n=this.buttons;footer=e.Node.create("<div></div>"),e.Object.each(n,function(n,r){var i=n.value,l=n.primary,c=n.position?n.position:"left",h=n.disabled,p=n.className,d=n.icon,v=n.hidden,m="button"+t._capitalizeFirstLetter(r),g=e.Node.create('<button class="'+s+'"></button>');i&&g.set("text",i),d&&g.append(e.Node.create('<i class="'+d+'"></i>')),l&&g.addClass(o),h&&g.addClass(u),p&&g.addClass(p),v&&g.hide(),c==="left"&&g.addClass(a),c==="right"&&g.addClass(f),g.on("click",function(e){var n=e.target;n.hasClass(u)===!1&&t.fire(m)}),footer.append(g),t._buttonMap[r]=g}),this._footer=footer},_setButtons:function(t){var n=this,r=this.get("container").one("."+h),i=this.buttons;e.Object.each(t,function(t,r){n.buttons[r]=e.merge(i[r],t)}),this._buildFooter(),r.one("div").replace(this._footer)},_getButtons:function(){return this.buttons},_capitalizeFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},_camelCaseToDash:function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})},_afterRender:function(){var t=this.get("container"),n=this.title,s=e.Node.create("<div></div>"),o=this._footer,u={bodyContent:s},a=this.close,f=this;t.addClass(i),t.get("children").each(function(e){s.append(e)});if(n!==null){var h=e.Node.create('<div style="width: 100%;"><div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+n+"</div>"+"</div>");a&&(h.prepend(e.Node.create('<div style="float: right; white-space: nowrap;"><button class="'+l+'">&times;</button>'+"</div>")),h.one("."+l).on("click",function(){f.fire(EVT_BUTTON_CLOSE)})),u.headerContent=h}o!==null&&(u.footerContent=o),this._panel=new e.Rednose.NavContainer(u),this._panel.render(t),this._panel.get("boundingBox").one("."+c).addClass(r+"-"+this._camelCaseToDash(this.name)),this.padding===!1&&this._panel.get("boundingBox").one("."+c).setStyle("padding",0)}},{ATTRS:{buttons:{setter:"_setButtons",getter:"_getButtons"}}}),e.namespace("Rednose.View").Nav=n},"1.1.0-DEV",{requires:["event-custom","rednose-widget-nav-container","view"]});
