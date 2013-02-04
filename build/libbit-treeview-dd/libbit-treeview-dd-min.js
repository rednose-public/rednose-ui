YUI.add("libbit-treeview-dd",function(e,t){var n;n=e.Base.create("dd",e.Base,[],{_ddMap:[],initializer:function(){var t=this,n=this.get("data");this.get("dragdrop")&&(e.Do.after(this._bindDD,this,"_bindEvents",this),n.before("load",function(){t._destroyDD()}),this.on("drag:start",this._handleStart,this),this.on("drop:hit",this._handleDrop,this),this.on("drop:over",this._handleOver,this),this.on("drop:enter",this._setClass,this),this.on("drop:exit",this._setClass,this),this.on("drag:end",this._setClass,this))},_bindDD:function(){var t=this,n=this.get("tree"),r;if(this._treeNodes.length===0)return;r=this._treeNodes;var i=new e.DD.Drop({node:this.get("contentBox").ancestor(".yui3-widget-bd"),groups:["libbit-treeview"],bubbleTargets:t});this._ddMap.push(i),e.each(r,function(r){var i=t.get("data"),s,o,u;o=n.getHTMLNode(r),u=r.data;if(e.instanceOf(u,e.TB.Category)){var a=new e.DD.Drop({node:o,groups:["libbit-treeview"],bubbleTargets:t});t._ddMap.push(a)}t._createDD(o,u)})},_handleOver:function(t){var n=t.drop.get("node"),r=e.DD.DDM.activeDrag.get("dragNode").getY(),i=n.get("offsetTop"),s=n.get("offsetHeight"),o,u,a,f;n.hasClass("yui3-widget-bd")&&(o=r-i-20,o>s?f=function(){return[0,u.get("scrollTop")+u.get("offsetHeight")]}:o<15&&(f=function(){return[u.get("scrollTop")+u.get("offsetHeight"),0]}),f&&(u=n,a=new e.Anim({node:u,to:{scroll:f},easing:e.Easing.easeOut}),a.run()))},_createDD:function(t,n){var r=this,i;return i=(new e.DD.Drag({node:t,data:n,groups:["libbit-treeview"],bubbleTargets:r})).plug(e.Plugin.DDProxy,{moveOnEnd:!1,borderStyle:"none"}),this._ddMap.push(i),i},_destroyDD:function(){for(var e in this._ddMap)this._ddMap[e].destroy();this._ddMap=[]},_handleStart:function(t){var n=t.target,r,i,s,o;r=n.get("data"),n.get("dragNode").setContent(n.get("node").one("div").get("outerHTML")),s=n.get("node"),n._prep(),n.detachAll("drag:start"),i=e.Node.create("<div></div>"),n.set("node",i),n.set("target",!0),n._prep(),o=this._createDD(s,r)},_handleDrop:function(t){var n=this.get("data"),r=t.drag.get("data").get("clientId"),i=t.drop.get("node").getAttribute("data-yui3-record"),s=n.getByClientId(r);newCat=n.getByClientId(i),s&&(e.instanceOf(s,e.TB.Category)?s.set("parent",newCat):s.set("category",newCat),s.save(function(){n.load()}))},_setClass:function(t){var n;switch(t.type){case"drop:enter":(n=e.one(".libbit-content-drop-over"))&&n.removeClass("libbit-content-drop-over"),t.drop.get("node").addClass("libbit-content-drop-over");break;case"drop:exit":t.drop.get("node").removeClass("libbit-content-drop-over");break;case"drag:end":(n=e.one(".libbit-content-drop-over"))&&n.removeClass("libbit-content-drop-over")}}},{ATTRS:{dragdrop:{value:!1}}}),e.namespace("Libbit.TreeView").DD=n},"1.0.0",{requires:["dd","anim"]});
