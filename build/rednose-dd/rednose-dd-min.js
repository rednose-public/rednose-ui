YUI.add("rednose-dd",function(e,t){var n,r;r=e.Base.create("bubbleTarget",e.Base,[],{}),n=e.Base.create("dd",e.View,[],{dropHighlight:!1,events:{".rednose-dd-drag":{mouseenter:"_handleMouseEnter",mouseleave:"_handleMouseLeave"}},initializer:function(){this._ddMap||(this._ddMap=[]),e.DD.DDM.set("dragCursor","default"),this.bubbleTarget=new r,this.bubbleTarget.addTarget(this),this.bubbleTarget.on("drop:hit",this._rednoseDropHit,this)},destructor:function(){e.Array.each(this._ddMap,function(e){e.destroy()}),this._ddMap=[]},createDrag:function(t,n,r){t.addClass("rednose-dd-drag");var i=new e.DD.Drag({node:t,data:r,groups:n,bubbleTargets:this,target:!0});return i.plug(e.Plugin.DDProxy,{moveOnEnd:!1,borderStyle:"none"}),this._ddMap.push(i),i},createDrop:function(t,n,r){t.addClass("rednose-dd-drop");var i=new e.DD.Drop({node:t,data:r,groups:n,bubbleTargets:this});return this._ddMap.push(i),i},_rednoseDropHit:function(e){e.drag.get("node").get("parentNode")===null&&e.stopImmediatePropagation()},_handleStart:function(e){console.log("Handle start rednose-dd");var t=e.target,n=t.get("node").cloneNode(!0).addClass("rednose-dd-drag-proxy");t.get("dragNode").set("innerHTML",n.get("outerHTML")),t.get("node").addClass("rednose-dd-drag-placeholder"),t.get("node").one("div").setStyle("visibility","hidden")},_handleEnd:function(t){var n=t.target;e.Array.each(n.getTargets(),function(e){n.removeTarget(e)}),n.addTarget(this),n.detach("drag:end",this._handleEnd),n._unprep(),n._prep(),n.get("node").addClass("rednose-dd-drag"),n.get("node").removeClass("rednose-dd-drag-placeholder"),n.get("dragNode").set("innerHTML",""),n.get("node").one("div").setStyle("visibility","")},_dropOver:function(t){var n=t.drop.get("node"),r=t.drag.get("node");if(n.hasClass("rednose-global-drop"))return;n.get("tagName").toLowerCase()!=="li"&&(n.contains(r)||(n.appendChild(r),e.DD.DDM.syncActiveShims(!0)))},_dropEnter:function(e){if(!e.drag||!e.drop||e.drop!==e.target)return;e.drop.get("node").get("tagName").toLowerCase()==="li"&&this._moveItem(e.drag,e.drop)},_moveItem:function(t,n){var r=t.get("node"),i=n.get("node"),s=!1,o=10,u=t.mouseXY,a=n.region,f=a.top+(a.bottom-a.top)/2,l=a.left+(a.right-a.left)/2,c=!1,h=!1,p=!1,d,v;if(i.hasClass("rednose-global-drop"))return;i.get("tagName").toLowerCase()!=="ul"?v=i.ancestor("ul"):v=i;if(v){var m=e.DD.DDM.activeDrag.get("dragNode"),g=v.get("offsetWidth");e.Rednose.Anim.width(m,g)}u[1]<a.top+o&&(h="top"),a.bottom-o<u[1]&&(h="bottom"),a.right-o<u[0]&&(p="right"),u[0]<a.left+o&&(p="left"),c=p,p===!1&&(c=h);switch(c){case"top":d=i.get("nextSibling"),d?i=d:s=!0;break;case"bottom":break;case"right":case"left":}i!==null&&c&&i&&i.get("parentNode")&&(s?i.get("parentNode").appendChild(r):i.get("parentNode").insertBefore(r,i),e.DD.DDM.syncActiveShims(!0))},_handleMouseEnter:function(e){var t=e.currentTarget;t.ancestor(".rednose-dd-drag-hover")&&t.ancestor(".rednose-dd-drag-hover").replaceClass("rednose-dd-drag-hover","rednose-dd-drag-hover-disabled"),t.one(".rednose-dd-drag-hover")?t.addClass("rednose-dd-drag-hover-disabled"):t.addClass("rednose-dd-drag-hover")},_handleMouseLeave:function(e){var t=e.currentTarget;t.hasClass("rednose-dd-drag-hover")&&t.removeClass("rednose-dd-drag-hover"),t.ancestor(".rednose-dd-drag-hover-disabled")&&t.ancestor(".rednose-dd-drag-hover-disabled").replaceClass("rednose-dd-drag-hover-disabled","rednose-dd-drag-hover")}}),e.namespace("Rednose").DD=n},"1.1.0-DEV",{requires:["rednose-anim","rednose-dd-css","view"]});
