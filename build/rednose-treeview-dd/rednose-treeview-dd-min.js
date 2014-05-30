YUI.add("rednose-treeview-dd",function(e,t){var n=e.Base.create("dd",e.Base,[],{_callbacks:{},_ddMap:[],initializer:function(){this._ddMap=[],this.get("dragdrop")&&this._attachDdEvents()},destructor:function(){this._destroyDd(),this._detachDdEvents(),this._callbacks=null,this._ddMap=null},addCallback:function(e,t,n){this._callbacks[e]={callback:t,context:n}},sizeShims:function(){for(var e in this._ddMap)typeof this._ddMap[e].sizeShim=="function"&&this._ddMap[e].sizeShim()},_handleBind:function(e){var t=e.one("."+this.classNames.children).all("[data-rednose-type]:not(.rednose-treeview-drag)"),n=this;t.each(function(e){var t=n.getNodeById(e.getData("node-id")).data;n._createDd(e,t)})},_createDd:function(t,n){var r=this.get("groups"),i=this,s;return n instanceof e.TB.Category&&(r=r.concat([e.stamp(this)])),s=new e.DD.Drag({node:t,data:n,groups:r,bubbleTargets:i}),s.plug(e.Plugin.DDProxy,{moveOnEnd:!1,borderStyle:"none"}),t.addClass("rednose-treeview-drag"),this._ddMap.push(s),s},_attachDdEvents:function(){this._ddEventHandles||(this._ddEventHandles=[]),this._ddEventHandles.push(e.Do.after(this._afterRender,this,"render",this),this.on({"drag:start":this._handleStart}),this.after("open",this._handleDdOpen))},_attachHeaderEvents:function(e){this._ddEventHandles.push(e.on({"drop:enter":this._handleHeaderEnter,"drop:exit":this._handleHeaderExit}))},_detachDdEvents:function(){(new e.EventHandle(this._ddEventHandles)).detach()},_destroyDd:function(){e.Array.each(this._ddMap,function(e){e.destroy()}),this._ddMap.length=0},_afterRender:function(){this._destroyDd(),this._handleBind(this.get("container"))},_handleHeaderEnter:function(e){var t=e.drop.get("node").ancestor(".rednose-treeview-outer-container");t.addClass("rednose-treeview-drop-over-global")},_handleHeaderExit:function(e){var t=e.drop.get("node").ancestor(".rednose-treeview-outer-container");t.hasClass("rednose-treeview-drop-over-global")&&t.removeClass("rednose-treeview-drop-over-global")},_handleDdOpen:function(e){var t=e.node,n=this.getHTMLNode(t);this._handleBind(n)},_handleStart:function(t){var n=t.target,r,i,s;r=n.get("data"),n.get("dragNode").setContent(n.get("node").get("outerHTML")),s=n.get("node"),n._prep(),n.detachAll("drag:start"),i=e.Node.create("<div></div>"),n.set("node",i),n.set("target",!0),n._prep(),this._createDd(s,r)}},{ATTRS:{dragdrop:{value:!1},groups:{value:["rednose-treeview"]}}});e.namespace("Rednose.TreeView").DD=n},"1.5.0-DEV",{requires:["rednose-dd"]});
