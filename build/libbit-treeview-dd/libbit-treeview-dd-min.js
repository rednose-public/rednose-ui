YUI.add("libbit-treeview-dd",function(e,t){var n;n=e.Base.create("dd",e.Base,[],{_callbacks:{},_ddMap:[],initializer:function(){var t=this.get("model");this._ddMap=[],this.get("dragdrop")&&(t.on("change",this._destroyDD,this),e.Do.after(this._afterRender,this,"render",this),this.after("open",function(e){var t=e.node,n=this.getHTMLNode(t);this._handleBind(n)},this),this.on("drop:enter",function(e){e.drop.get("node").one(".libbit-treeview-icon")&&e.drop.get("node").one(".libbit-treeview-icon").addClass("icon-white")}),this.on("drop:exit",function(e){e.drop.get("node").get("parentNode").hasClass("yui3-treeview-selected")||e.drop.get("node").all(".icon-white").removeClass("icon-white")}),this.on("drag:start",this._handleStart,this),this.on("drop:hit",this._handleDrop,this))},destructor:function(){this._destroyDD(),this.get("model").detach("change",this._destroyDD()),this._ddMap=null},addCallback:function(e,t,n){this._callbacks[e]={callback:t,context:n}},sizeShims:function(){for(var e in this._ddMap)typeof this._ddMap[e].sizeShim=="function"&&this._ddMap[e].sizeShim()},_destroyDD:function(){for(var e in this._ddMap)this._ddMap[e].destroy();this._ddMap.length=0},_handleBind:function(t){var n=t.one("."+this.classNames.children).all("[data-libbit-type]:not(.libbit-treeview-drag)"),r=this;n.each(function(t){var n=r.getNodeById(t.getData("node-id")).data;r._createDD(t,n);if(n instanceof e.TB.Category){var i=new e.DD.Drop({node:t,groups:r.get("groups"),bubbleTargets:r});t.addClass("libbit-treeview-drop"),t.addClass("libbit-dd-drop"),r._ddMap.push(i)}}),this.header&&this._bindHeader()},_bindHeader:function(){var t=this.get("container"),n;n=new e.DD.Drop({node:t.one(".nav-header"),groups:[e.stamp(this)],bubbleTargets:this}),n.on("drop:enter",function(e){e.drop.get("node").get("parentNode").get("parentNode").addClass("libbit-treeview-drop-over-global")}),n.on("drop:exit",function(){e.all(".libbit-treeview-drop-over-global").removeClass("libbit-treeview-drop-over-global")}),this._ddMap.push(n)},_createDD:function(t,n){var r=this.get("groups"),i=this,s;return n instanceof e.TB.Category&&(r=r.concat([e.stamp(this)])),s=(new e.DD.Drag({node:t,data:n,groups:r,bubbleTargets:i})).plug(e.Plugin.DDProxy,{moveOnEnd:!1,borderStyle:"none"}),t.addClass("libbit-treeview-drag"),this._ddMap.push(s),s},_afterRender:function(){var e=this.get("container");this._destroyDD(),this._handleBind(e)},_handleStart:function(t){var n=t.target,r,i,s,o;r=n.get("data"),n.get("dragNode").setContent(n.get("node").get("outerHTML")),n.get("dragNode").all(".icon-white").removeClass("icon-white"),s=n.get("node"),n._prep(),n.detachAll("drag:start"),i=e.Node.create("<div></div>"),n.set("node",i),n.set("target",!0),n._prep(),o=this._createDD(s,r)},_handleDrop:function(t){var n=this.get("model"),r=t.drag.get("data"),i=t.drop.get("node"),s=i.hasClass("nav-header")?null:this.getNodeById(i.getData("node-id")).data;callback=!1,self=this,e.all(".libbit-treeview-drop-over-global").removeClass("libbit-treeview-drop-over-global"),t.drop.get("node").get("parentNode").hasClass("yui3-treeview-selected")||t.drop.get("node").all(".icon-white").removeClass("icon-white"),e.Array.each(t.drag.get("groups"),function(e){if(e in self._callbacks){var n=self._callbacks[e];t.drop.set("data",s),n.callback.apply(n.context,[t]),callback=!0}});if(callback)return!0;if(r){var o=r instanceof e.TB.Category?"parent":"category",u=r.get(o),a=u?u.id:null,f=s?s.get("id"):null;a!==f&&(r.set(o,s),r.save(function(){n.load()}))}}},{ATTRS:{dragdrop:{value:!1},groups:{value:["libbit-treeview"]}}}),e.namespace("Libbit.TreeView").DD=n},"1.0.0",{requires:["libbit-dd","libbit-treeview"]});
