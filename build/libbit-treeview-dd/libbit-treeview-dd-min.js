YUI.add("libbit-treeview-dd",function(e,t){var n;n=e.Base.create("dd",e.Base,[],{_ddMap:[],initializer:function(){var t=this,n=this.get("data");this.get("dragdrop")&&(e.Do.after(this._bindDD,this,"_bindEvents",this),t.on("beforeRefresh",function(){t._destroyDD()}),this.on("drag:start",this._handleStart,this),this.on("drop:hit",this._handleDrop,this),this.on("drop:over",this._setClass,this),this.on("drag:end",this._setClass,this))},sizeShims:function(){for(var e in this._ddMap)typeof this._ddMap[e].sizeShim=="function"&&this._ddMap[e].sizeShim()},_bindDD:function(){var t=this,n=this.get("tree"),r;if(this._treeNodes.length===0)return;r=this._treeNodes,e.each(r,function(r){var i=t.get("data"),s,o,u;o=n.getHTMLNode(r),u=r.data;if(e.instanceOf(u,e.TB.Category)){var a=new e.DD.Drop({node:o,groups:t.get("groups"),bubbleTargets:t});t._ddMap.push(a)}t._createDD(o,u)})},_createDD:function(t,n){var r=this,i;return i=(new e.DD.Drag({node:t,data:n,groups:this.get("groups"),bubbleTargets:r})).plug(e.Plugin.DDProxy,{moveOnEnd:!1,borderStyle:"none"}),this._ddMap.push(i),i},_destroyDD:function(){for(var e in this._ddMap)this._ddMap[e].destroy();this._ddMap=[]},_handleStart:function(t){var n=t.target,r,i,s,o;r=n.get("data"),n.get("dragNode").setContent(n.get("node").one("div").get("outerHTML")),s=n.get("node"),n._prep(),n.detachAll("drag:start"),i=e.Node.create("<div></div>"),n.set("node",i),n.set("target",!0),n._prep(),o=this._createDD(s,r)},_handleDrop:function(t){var n=this.get("data"),r=t.drag.get("data").get("clientId"),i=t.drop.get("node").getAttribute("data-yui3-record"),s=n.getByClientId(r);newCat=n.getByClientId(i),s&&(e.instanceOf(s,e.TB.Category)?s.set("parent",newCat):s.set("category",newCat),s.save(function(){n.load()}))},_setClass:function(e){var t;switch(e.type){case"drop:over":var n=e.drop.get("node");n.hasClass("libbit-content-drop-over")===!1&&((t=this.get("contentBox").one(".libbit-content-drop-over"))&&t.removeClass("libbit-content-drop-over"),n.addClass("libbit-content-drop-over"));break;case"drag:end":(t=this.get("contentBox").one(".libbit-content-drop-over"))&&t.removeClass("libbit-content-drop-over")}}},{ATTRS:{dragdrop:{value:!1},groups:{value:["libbit-treeview"]}}}),e.namespace("Libbit.TreeView").DD=n},"1.0.0",{requires:["dd"]});
