YUI.add("rednose-treeview-dd",function(e,t){var n=e.Base.create("dd",e.Base,[],{initializer:function(){this._ddMap=[],this.get("dragdrop")&&this._attachDdEvents()},destructor:function(){this._destroyDd(),this._detachDdEvents(),this._ddMap=null},sizeShims:function(){for(var e in this._ddMap)typeof this._ddMap[e].sizeShim=="function"&&this._ddMap[e].sizeShim()},_handleBind:function(e){var t=this,n=e.one("."+this.classNames.children).all("[data-rednose-type]:not(.rednose-treeview-drag)"),r=this.get("ddTest");n.each(function(e){var n=t.getNodeById(e.getData("node-id"));(r===null||typeof r=="function"&&r(n)===!0)&&t._createDd(e,n)})},_bindHeader:function(){var t=this.get("container"),n;n=new e.DD.Drop({node:t.one(".nav-header"),groups:this.get("groups"),bubbleTargets:this}),this._attachHeaderEvents(n),this._ddMap.push(n)},_createDd:function(t,n){var r=this.get("groups"),i;return n instanceof e.TB.Category&&(r=r.concat([e.stamp(this)])),i=new e.DD.Drag({node:t,data:n,groups:r,bubbleTargets:this}),i.plug(e.Plugin.DDProxy,{moveOnEnd:!1,borderStyle:"none"}),t.addClass("rednose-treeview-drag"),this._ddMap.push(i),i},_attachDdEvents:function(){this._ddEventHandles||(this._ddEventHandles=[]),this._ddEventHandles.push(e.Do.after(this._afterRender,this,"render",this),this.on({"drag:start":this._handleStart}),this.after("open",this._handleDdOpen))},_attachHeaderEvents:function(e){this._ddEventHandles.push(e.on({"drop:enter":this._handleHeaderEnter,"drop:exit":this._handleHeaderExit}))},_detachDdEvents:function(){(new e.EventHandle(this._ddEventHandles)).detach()},_destroyDd:function(){e.Array.each(this._ddMap,function(e){e.destroy()}),this._ddMap.length=0},_afterRender:function(){this._destroyDd(),this._handleBind(this.get("container"))},_handleHeaderEnter:function(e){var t=e.drop.get("node").ancestor(".rednose-treeview-outer-container");t.addClass("rednose-treeview-drop-over-global")},_handleHeaderExit:function(e){var t=e.drop.get("node").ancestor(".rednose-treeview-outer-container");t.hasClass("rednose-treeview-drop-over-global")&&t.removeClass("rednose-treeview-drop-over-global")},_handleDdOpen:function(e){if(!this.rendered)return;var t=e.node,n=this.getHTMLNode(t);this._handleBind(n)},_handleStart:function(t){var n=t.target,r,i,s;r=n.get("data"),n.get("dragNode").setContent(n.get("node").get("outerHTML")),s=n.get("node"),n._prep(),n.detachAll("drag:start"),i=e.Node.create("<div></div>"),n.set("node",i),n.set("target",!0),n._prep(),this._createDd(s,r)}},{ATTRS:{dragdrop:{value:!1},ddTest:{value:null},groups:{value:["rednose-treeview"]}}});e.namespace("Rednose.TreeView").DD=n},"1.6.0-dev",{requires:["dd"]});
