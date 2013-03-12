YUI.add("libbit-dd",function(e,t){var n,r;r=e.Base.create("bubbleTarget",e.Base,[],{}),n=e.Base.create("dd",e.View,[],{events:{".libbit-dd-drag":{mouseenter:"_handleMouseEnter",mouseleave:"_handleMouseLeave"}},initializer:function(){e.DD.DDM.set("dragCursor","default"),this.on("drag:start",this._handleStart,this),this.on("drag:end",this._handleEnd,this),this.on("drop:over",this._dropOver,this),this.on("drop:enter",this._dropEnter,this),this.bubbleTarget=new r,this.bubbleTarget.addTarget(this),this.bubbleTarget.on("drop:hit",this._libbitDropHit,this)},_libbitDropHit:function(e){e.drag.get("node").get("parentNode")===null&&e.stopImmediatePropagation()},createDrag:function(t,n){t.addClass("libbit-dd-drag");var r=new e.DD.Drag({node:t,groups:n,bubbleTargets:this,target:!0});return r.plug(e.Plugin.DDProxy,{moveOnEnd:!1,borderStyle:"none"}),r},createDrop:function(t,n){t.addClass("libbit-dd-drop");var r=new e.DD.Drop({node:t,groups:n,bubbleTargets:this});return r},bindGlobalDrop:function(t){var n=this.get("container"),r;n.addClass("libbit-global-drop"),r=new e.DD.Drop({node:n,groups:t,bubbleTargets:this.bubbleTarget}),r.on("drop:enter",this._dropEnterGlobal,this),r.on("drop:over",this._handleScroll,this)},_handleStart:function(e){var t=e.target,n=t.get("node").cloneNode(!0).addClass("libbit-dd-drag-proxy");t.get("dragNode").set("innerHTML",n.get("outerHTML")),t.get("node").addClass("libbit-dd-drag-placeholder")},_handleEnd:function(t){var n=t.target;e.Array.each(n.getTargets(),function(e){n.removeTarget(e)}),n.addTarget(this),n.detach("drag:end",this._handleEnd),n._unprep(),n._prep(),n.get("node").addClass("libbit-dd-drag"),n.get("node").removeClass("libbit-dd-drag-placeholder"),n.get("dragNode").set("innerHTML","")},_dropOver:function(t){var n=t.drop.get("node"),r=t.drag.get("node");if(n.hasClass("libbit-global-drop"))return;n.get("tagName").toLowerCase()!=="li"&&(n.contains(r)||(n.appendChild(r),e.Lang.later(50,e,function(){e.DD.DDM.syncActiveShims(!0)})))},_dropEnter:function(t){var n=t.drag,r=t.drop,i=n.get("node"),s=r.get("node"),o=!1,u=10,a=n.mouseXY,f=r.region,l=f.top+(f.bottom-f.top)/2,c=f.left+(f.right-f.left)/2,h=!1,p=!1,d=!1,v,m;if(s.hasClass("libbit-global-drop"))return;s.get("tagName").toLowerCase()!=="ul"?m=s.ancestor("ul"):m=s;if(m){var g=e.DD.DDM.activeDrag.get("dragNode"),y=m.get("offsetWidth");e.Libbit.Anim.width(g,y)}a[1]<f.top+u&&(p="top"),f.bottom-u<a[1]&&(p="bottom"),f.right-u<a[0]&&(d="right"),a[0]<f.left+u&&(d="left"),h=d,d===!1&&(h=p);switch(h){case"top":v=s.get("nextSibling"),v?s=v:o=!0;break;case"bottom":break;case"right":case"left":}s!==null&&h&&s&&s.get("parentNode")&&(o?s.get("parentNode").appendChild(i):s.get("parentNode").insertBefore(i,s))},_dropEnterGlobal:function(t){if(e.DD.DDM.activeDrag){var n=e.DD.DDM.activeDrag,r=n.get("dragNode"),i=n.get("data"),s,o;if(i.name==="fieldGroup"||i.name==="image"||i.name==="table"){n.on("drag:end",this._handleEnd,this);var o=new e.TB.TemplateItem({asset:i}),u=new e.TB.TemplateItemView({model:o});u.templateModel=this.get("model"),s=u.render().get("container"),s.plug(e.Libbit.ContextMenu,{content:[{title:"Remove from template",id:"removeTemplateItem"},{title:"-"},{title:"Properties",id:"templateItemProperties",disabled:!0}],bubbleTarget:u});var a=s.cloneNode(!0).addClass("libbit-dd-drag-proxy");s.addClass("libbit-dd-drag-placeholder"),s.setData({model:o}),n.get("node").remove(),n.set("node",s),e.Libbit.Anim.morph(r,a,e.Libbit.Anim.fadeOut,e.Libbit.Anim.slideIn)}}},_handleMouseEnter:function(e){var t=e.currentTarget;t.ancestor(".libbit-dd-drag-hover")&&t.ancestor(".libbit-dd-drag-hover").replaceClass("libbit-dd-drag-hover","libbit-dd-drag-hover-disabled"),t.one(".libbit-dd-drag-hover")?t.addClass("libbit-dd-drag-hover-disabled"):t.addClass("libbit-dd-drag-hover")},_handleMouseLeave:function(e){var t=e.currentTarget;t.hasClass("libbit-dd-drag-hover")&&t.removeClass("libbit-dd-drag-hover"),t.ancestor(".libbit-dd-drag-hover-disabled")&&t.ancestor(".libbit-dd-drag-hover-disabled").replaceClass("libbit-dd-drag-hover-disabled","libbit-dd-drag-hover")},_handleScroll:function(t){var n=t.drop.get("node"),r=e.DD.DDM.activeDrag.get("dragNode").getY(),i=n.get("offsetParent"),s=e.one("#main").get("offsetHeight"),o,u,a,f,l=30,c=235,h=40;r<prevY?f="up":f="down",prevY=r,r-h<l&&f==="up"&&(u=i,a=new e.Anim({node:u,to:{scroll:function(e){return[e.get("scrollTop")+e.get("offsetHeight"),0]}},easing:e.Easing.easeOut}),a.run()),r-h>s-l&&f==="down"&&(u=i,a=new e.Anim({node:u,to:{scroll:function(e){return[0,e.get("scrollTop")+e.get("offsetHeight")]}},easing:e.Easing.easeOut}),a.run())}}),e.namespace("Libbit").DD=n},"1.0.0",{requires:["view","libbit-dd-css"]});
