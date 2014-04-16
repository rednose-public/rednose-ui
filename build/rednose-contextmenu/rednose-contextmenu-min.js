YUI.add("rednose-contextmenu",function(e,t){var n,r="rednose-context-menu",i="rednose-context-open",s="icon-white",o="dropdown",u="dropdown-menu",a="open";n=e.Base.create("contextMenu",e.Plugin.Base,[],{data:null,_contextMenu:null,initializer:function(e){var t=e.host,n=e.content?e.content:"",r=e.bubbleTarget;this._node=t,this._content=this._buildHTML(n),r&&this.addTarget(r),typeof e.data!="undefined"&&(this.data=e.data),t.on("contextmenu",this._handleContextMenu,this)},destructor:function(){var e=this.get("host");this._contextMenu&&this._contextMenu.destroy(),this.data=null,this._contextMenu=null,e.detach("contextmenu",this._handleContextMenu)},open:function(t,n){var s=this._node,o=this._contextMenu,u=this._content;e.all("."+i).each(function(e){e.contextMenu._contextMenu&&e.contextMenu._contextMenu.destroy()}),o=new e.Overlay({bodyContent:u,visible:!1,constrain:!0,zIndex:this._getHighzIndex(),render:!0}),s.addClass(i),o.get("boundingBox").addClass(r),o.get("boundingBox").setStyle("left",t),o.get("boundingBox").setStyle("top",n),o.show(),this._contextMenu=o,this._bindContextMenu()},_buildHTML:function(t){var n='<div class="'+o+" "+a+'">'+'<ul class="'+u+'"></ul>'+"</div>",r=e.Node.create(n),i=r.one("ul");return t===""?t:(e.Array.each(t,function(t){var n=e.Node.create("<li>"),r=e.Node.create('<a href="#">'),s=t.title;t.className&&n.addClass(t.className),t.title!=="-"?(t.icon&&(s='<i class="icon icon-'+t.icon+'"></i> '+s),r.set("innerHTML",s),r.setAttribute("data-id",t.id),n.append(r),t.disabled===!0&&(n.addClass("disabled"),r.addClass("disabled"))):n.addClass("divider"),i.append(n)}),r.get("outerHTML"))},_bindContextMenu:function(){var e=this,t=this._node,n=this._contextMenu;n.get("boundingBox").all("a").each(function(){this.on(["click","contextmenu"],function(r){var i=r.currentTarget,s={node:t};r.preventDefault(),i.hasClass("disabled")!==!0?(e.data!==null&&(s.data=e.data),e.fire(i.getAttribute("data-id"),s),n.destroy()):i.blur()})}),n.get("boundingBox").all("li").on("mouseenter",function(e){var t=e.currentTarget;t.one("i")&&t.one("i").addClass(s)}),n.get("boundingBox").all("li").on("mouseleave",function(e){var t=e.currentTarget;t.one("i")&&t.one("i").hasClass(s)&&t.one("i").removeClass(s)}),n.get("boundingBox").on("clickoutside",function(e){e.button!==3&&n.destroy()})},_handleContextMenu:function(e){var t=e.pageX,n=e.pageY;e.preventDefault(),this.open(t,n)},_getHighzIndex:function(){var e=document.getElementsByTagName("*"),t=0;for(var n=0;n<e.length-1;n++)parseInt(e[n].style.zIndex,10)>t&&(t=parseInt(e[n].style.zIndex,10));return t+1}},{NS:"contextMenu"}),e.namespace("Rednose").ContextMenu=n},"1.1.0-DEV",{requires:["base","overlay","panel","plugin","rednose-contextmenu-css","widget"]});
