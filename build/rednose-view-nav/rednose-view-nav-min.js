YUI.add("rednose-view-nav",function(e,t){var n,r="rednose",i="rednose-view-nav",s="btn",o="btn-group",u="active",a="btn-primary",f="disabled",l="float-left",c="float-right",h="close",p="yui3-widget-bd",d="yui3-widget-ft",v="buttonClose",m="load";n=e.Base.create("viewNav",e.View,[],{title:null,buttons:null,footer:!0,close:!1,padding:!1,_rendered:!1,_body:null,_footer:null,_panel:null,toolbar:null,initializer:function(){this._viewNavEventHandles||(this._viewNavEventHandles=[]),this._viewNavEventHandles.push(e.Do.after(this._afterRender,this,"render",this)),this.footer&&this._buildFooter()},destructor:function(){(new e.EventHandle(this._viewNavEventHandles)).detach(),this._panel&&this._panel.destroy(),this.title=null,this.buttons=null,this._footer=null,this._panel=null,this._toolbar&&this._toolbar.destroy(),this._toolbar=null},getButton:function(e){return this.toolbar._buttonMap?this.toolbar._buttonMap[e]?this.toolbar._buttonMap[e]:!1:!1},sizeView:function(e){var t=parseInt(e.get("offsetHeight"),10);if(isNaN(t))return;this.title&&(t-=46),this.buttons&&(t-=56),this._body.set("offsetHeight",t),this._body.one(".rednose-unit-left")&&this._body.one(".rednose-unit-left").setStyle("height",t),this._body.one(".rednose-unit-right")&&this._body.one(".rednose-unit-right").setStyle("height",t),this._body.one(".rednose-unit-right")&&this._body.one(".rednose-unit-right").setStyle("top",46),this.fire(m)},_buildFooter:function(){this._footer=e.Node.create("<div></div>"),this.toolbar=(new e.Rednose.Toolbar({container:this._footer,buttons:this.buttons,evtPrefix:this.name})).render(),this.toolbar.addTarget(this)},_setButtons:function(t){var n=this,r=this.get("container").one("."+d),i=this.buttons;e.Object.each(t,function(t,r){n.buttons[r]=e.merge(i[r],t)}),this._buildFooter(),this._rendered&&r.one("div").replace(this._footer)},_getButtons:function(){return this.buttons},_afterRender:function(){var t=this.get("container"),n=this.title,s=e.Node.create("<div></div>"),o=this._footer,u={bodyContent:s},a=this.close,f=this;t.addClass(i),t.get("children").each(function(e){s.append(e)});if(n!==null){var l=e.Node.create('<div style="width: 100%;"><div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">'+n+"</div>"+"</div>");a&&(l.prepend(e.Node.create('<div style="float: right; white-space: nowrap;"><button class="'+h+'">&times;</button>'+"</div>")),l.one("."+h).on("click",function(){f.fire(v)})),u.headerContent=l}o!==null&&(u.footerContent=o),this._panel=new e.Rednose.NavContainer(u),this._panel.render(t),this._panel.get("boundingBox").one("."+p).addClass(r+"-"+e.Rednose.Util.camelCaseToDash(this.name)),this.padding===!1&&this._panel.get("boundingBox").one("."+p).setStyle("padding",0),this._body=s,this.footer?t.one(".yui3-widget-ft")&&t.one(".yui3-widget-ft").show():t.one(".yui3-widget-ft")&&t.one(".yui3-widget-ft").hide();var c=t.get("parentNode");c&&this.sizeView(c),this._rendered=!0}},{ATTRS:{buttons:{setter:"_setButtons",getter:"_getButtons"}}}),e.namespace("Rednose.View").Nav=n},"1.1.0-DEV",{requires:["event-custom","rednose-navbar","rednose-panel","rednose-util","rednose-widget-nav-container","view"]});
