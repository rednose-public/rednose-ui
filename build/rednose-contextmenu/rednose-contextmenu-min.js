YUI.add("rednose-contextmenu",function(e,t){var n,r="rednose-context-menu",i="rednose-context-open";CSS_BOOTSTRAP_ICON_WHITE="icon-white",CSS_BOOTSTRAP_DROPDOWN="dropdown",CSS_BOOTSTRAP_DROPDOWN_MENU="dropdown-menu",CSS_BOOTSTRAP_OPEN="open",n=e.Base.create("contextMenu",e.Plugin.Base,[],{data:null,_contextMenu:null,initializer:function(e){var t=e.host,n=e.content?e.content:"",r=e.bubbleTarget;this._node=t,this._content=this._buildHTML(n),r&&this.addTarget(r),typeof e.data!="undefined"&&(this.data=e.data),t.on("contextmenu",this._handleContextMenu,this)},destructor:function(){this._contextMenu&&this._contextMenu.destroy(),this.data=null,this._contextMenu=null},open:function(t,n){var s=this._node,o=this._contextMenu,u=this._content;e.all("."+i).each(function(e){e.contextMenu._contextMenu.destroy()}),o=new e.Overlay({bodyContent:u,visible:!1,constrain:!0,zIndex:e.all("*").size(),render:!0}),s.addClass(i),o.get("boundingBox").addClass(r),o.get("boundingBox").setStyle("left",t),o.get("boundingBox").setStyle("top",n),o.show(),this._contextMenu=o,this._bindContextMenu()},_buildHTML:function(t){var n='<div class="'+CSS_BOOTSTRAP_DROPDOWN+" "+CSS_BOOTSTRAP_OPEN+'">'+'<ul class="'+CSS_BOOTSTRAP_DROPDOWN_MENU+'"></ul>'+"</div>",r=e.Node.create(n),i=r.one("ul");return t===""?t:(e.Array.each(t,function(t){var n=e.Node.create("<li>"),r=e.Node.create('<a href="#">');t.title!=="-"?(r.set("innerHTML",t.title),r.setAttribute("data-id",t.id),n.append(r),t.disabled===!0&&(n.addClass("disabled"),r.addClass("disabled"))):n.addClass("divider"),i.append(n)}),r.get("outerHTML"))},_bindContextMenu:function(){var e=this,t=this._node,n=this._contextMenu;n.get("boundingBox").all("a").each(function(){this.on(["click","contextmenu"],function(r){var i=r.currentTarget,s={node:t};r.preventDefault(),i.hasClass("disabled")!==!0?(e.data!==null&&(s.data=e.data),e.fire(i.getAttribute("data-id"),s),n.destroy()):i.blur()})}),n.get("boundingBox").all("li").on("mouseenter",function(e){var t=e.currentTarget;t.one("i")&&t.one("i").addClass(CSS_BOOTSTRAP_ICON_WHITE)}),n.get("boundingBox").all("li").on("mouseleave",function(e){var t=e.currentTarget;t.one("i")&&t.one("i").hasClass(CSS_BOOTSTRAP_ICON_WHITE)&&t.one("i").removeClass(CSS_BOOTSTRAP_ICON_WHITE)}),n.get("boundingBox").on("clickoutside",function(e){e.button!==3&&n.destroy()})},_handleContextMenu:function(e){var t=e.pageX,n=e.pageY;e.preventDefault(),this.open(t,n)}},{NS:"contextMenu"}),e.namespace("Rednose").ContextMenu=n},"1.1.0-DEV",{group:"rednose-ui",requires:["base","overlay","panel","plugin","rednose-contextmenu-css","widget"]});
