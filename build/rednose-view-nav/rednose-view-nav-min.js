YUI.add("rednose-view-nav",function(e,t){var n,r="rednose",i="rednose-view-nav",s="btn",o="btn-primary",u="disabled",a="float-left",f="float-right",l="close",c="yui3-widget-bd",h="yui3-widget-ft",p="buttonClose",n=e.Base.create("viewNav",e.View,[],{title:null,buttons:null,footer:!0,close:!1,padding:!0,_rendered:!1,_body:null,_footer:null,_buttonMap:{},_panel:null,initializer:function(){this._viewNavEventHandles||(this._viewNavEventHandles=[]),this._viewNavEventHandles.push(e.Do.after(this._afterRender,this,"render",this)),this.footer&&this._buildFooter()},destructor:function(){(new e.EventHandle(this._viewNavEventHandles)).detach(),this._panel&&this._panel.destroy(),this.title=null,this.buttons=null,this._footer=null,this._buttonMap=null,this._panel=null},getButton:function(e){return this._buttonMap?this._buttonMap[e]?this._buttonMap[e]:!1:!1},sizeView:function(e){var t,n;n=parseInt(e.getComputedStyle("height"),10),t=n-46-56,this._body.setStyle("height",t),this._body.one(".rednose-unit-left")&&this._body.one(".rednose-unit-left").setStyle("height",t),this._body.one(".rednose-unit-right")&&this._body.one(".rednose-unit-right").setStyle("height",t)},_buildFooter:function(){var t=this,n=this.buttons,r=e.Node.create("<div></div>");e.Object.each(n,function(n,i){var l=n.value,c=n.primary,h=n.position?n.position:"left",p=n.disabled,d=n.className,v=n.icon,m=n.hidden,g="button"+t._capitalizeFirstLetter(i),y=e.Node.create('<button class="'+s+'"></button>');l&&y.set("text",l),v&&y.append(e.Node.create('<i class="'+v+'"></i>')),c&&y.addClass(o),p&&y.addClass(u),d&&y.addClass(d),m&&y.hide(),h==="left"&&y.addClass(a),h==="right"&&y.addClass(f),y.on("click",function(e){var n=e.target;n.hasClass(u)===!1&&t.fire(g)}),r.append(y),t._buttonMap[i]=y}),this._footer=r},_setButtons:function(t){var n=this,r=this.get("container").one("."+h),i=this.buttons;e.Object.each(t,function(t,r){n.buttons[r]=e.merge(i[r],t)}),this._buildFooter(),this._rendered&&r.one("div").replace(this._footer)},_getButtons:function(){return this.buttons},_capitalizeFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},_camelCaseToDash:function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})},_afterRender:function(){var t=this.get("container"),n=this.title,s=e.Node.create("<div></div>"),o=this._footer,u={bodyContent:s},a=this.close,f=this;t.addClass(i),t.get("children").each(function(e){s.append(e)});if(n!==null){var h=e.Node.create('<div style="width: 100%;"><div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+n+"</div>"+"</div>");a&&(h.prepend(e.Node.create('<div style="float: right; white-space: nowrap;"><button class="'+l+'">&times;</button>'+"</div>")),h.one("."+l).on("click",function(){f.fire(p)})),u.headerContent=h}o!==null&&(u.footerContent=o),this._panel=new e.Rednose.NavContainer(u),this._panel.render(t),this._panel.get("boundingBox").one("."+c).addClass(r+"-"+this._camelCaseToDash(this.name)),this.padding===!1&&this._panel.get("boundingBox").one("."+c).setStyle("padding",0),this._body=s;var d=t.get("parentNode");d&&this.sizeView(d),this._rendered=!0}},{ATTRS:{buttons:{setter:"_setButtons",getter:"_getButtons"}}});e.namespace("Rednose.View").Nav=n},"1.1.0-DEV",{requires:["event-custom","rednose-panel","rednose-widget-nav-container","view"]});
