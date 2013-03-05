YUI.add("libbit-contextmenu",function(e,t){var n;n=e.Base.create("contextMenu",e.Plugin.Base,[],{_contextMenu:null,data:null,initializer:function(e){var t=e.host,n=e.content?e.content:"",r=e.bubbleTarget;this._node=t,this._content=this._buildHTML(n),this.addTarget(r),typeof e.data!="undefined"&&(this.data=e.data),t.on("contextmenu",this._handleContextMenu,this)},_buildHTML:function(t){var n='<div class="dropdown open"><ul class="dropdown-menu"></ul></div>',r=e.Node.create(n),i=r.one("ul");if(t=="")return t;for(var s in t){var o=e.Node.create("<li>"),u=e.Node.create('<a href="#">');t[s].title!=="-"?(u.set("innerHTML",t[s].title),u.setAttribute("data-id",t[s].id),o.append(u),t[s].disabled===!0&&(o.addClass("disabled"),u.addClass("disabled"))):o.addClass("divider"),i.append(o)}return r.get("outerHTML")},_handleContextMenu:function(t){var n=this._node,r=this._contextMenu,i=this._content;e.all(".libbit-context-open").each(function(e){e.removeClass(".libbit-context-open"),e.contextMenu.destroy()}),t.preventDefault(),r=new e.Overlay({bodyContent:i,visible:!1,constrain:!0,zIndex:e.all("*").size(),render:!0}),n.addClass("libbit-context-open"),n.contextMenu=r,r.get("boundingBox").addClass("libbit-context-menu"),r.get("boundingBox").setStyle("left",t.pageX),r.get("boundingBox").setStyle("top",t.pageY),r.show(),this._contextMenu=r,this._bindContextMenu()},_bindContextMenu:function(){var e=this,t=this._node,n=this._contextMenu;n.get("boundingBox").all("a").each(function(){this.on(["click","contextmenu"],function(r){var i=r.currentTarget,s={node:t};r.preventDefault(),i.hasClass("disabled")!==!0?(e.data!==null&&(s.data=e.data),e.fire(i.getAttribute("data-id"),s),n.destroy()):i.blur()})}),n.get("boundingBox").all("li").on("mouseenter",function(e){var t=e.currentTarget;t.one("i")&&t.one("i").addClass("icon-white")}),n.get("boundingBox").all("li").on("mouseleave",function(e){var t=e.currentTarget;t.one("i")&&t.one("i").hasClass("icon-white")&&t.one("i").removeClass("icon-white")}),n.get("boundingBox").on("clickoutside",function(e){e.button!==3&&n.destroy()})}},{NS:"contextMenu",ATTRS:{}}),e.namespace("Libbit").ContextMenu=n},"1.0.0",{requires:["base","panel","plugin","widget","overlay"]});
