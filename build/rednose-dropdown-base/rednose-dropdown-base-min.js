YUI.add("rednose-dropdown-base",function(e,t){var n="enable",r="disable",i="rename",s="close",o="open",u="activate",a="deactivate",f="reset",l="resetChildren",c=e.Base.create("dropdownBase",e.Base,[],{_open:!1,initializer:function(t){this._id=e.stamp(this),this._published={},t.items&&this.reset(t.items)},destructor:function(){c.instance===this&&delete c.instance,this._rootItems=null,this._itemMap=null,this._published=null},reset:function(e){return this._fireDropdownEvent(f,{items:e},{defaultFn:this._defResetFn})},open:function(){return this.isOpen()||this._fireDropdownEvent(o,{dropdown:this,node:this.get("host")},{defaultFn:this._defOpenFn}),this},close:function(){return this.isOpen()&&this._fireDropdownEvent(s,{},{defaultFn:this._defCloseFn}),this},toggle:function(){return this[this.isOpen()?"close":"open"]()},isOpen:function(){return this._open},getItemById:function(e){return this._itemMap[e]},getItems:function(){return e.Object.values(this._itemMap)},enableItem:function(e){return e.isDisabled()&&this._fireDropdownEvent(n,{item:e},{defaultFn:this._defEnableFn}),this},disableItem:function(e){return e.isDisabled()||this._fireDropdownEvent(r,{item:e},{defaultFn:this._defDisableFn}),this},activateItem:function(e){return e.isActive()||this._fireDropdownEvent(u,{item:e},{defaultFn:this._defActivateFn}),this},deactivateItem:function(e){return e.isActive()&&this._fireDropdownEvent(a,{item:e},{defaultFn:this._defDeactivateFn}),this},renameItem:function(e,t){return this._fireDropdownEvent(i,{item:e,title:t},{defaultFn:this._defRenameFn}),this},resetItemChildren:function(e,t){return this._fireDropdownEvent(l,{item:e,children:t},{defaultFn:this._defResetChildrenFn}),this},_createItem:function(t){var n=new e.Rednose.Dropdown.Item(this,t);if(t.children)for(var r=0,i=t.children.length;r<i;r++)n.addChild(this._createItem(t.children[r]));return n.id in this._itemMap&&(n.id=e.stamp(n)),this._itemMap[n.id]=n,n},_destroyItem:function(e){if(e.hasChildren())for(var t=0,n=e.children.length;t<n;t++)this._destroyItem(e.children[t]);e.dropdown=null,e.children=null,e.parent=null,delete this._itemMap[e.id]},_fireDropdownEvent:function(e,t,n){return n&&n.defaultFn&&!this._published[e]&&(this._published[e]=this.publish(e,{defaultFn:n.defaultFn})),this.fire(e,t),this},_defResetFn:function(e){var t=e.items;if(this._rootItems&&this._rootItems.length>0)for(var n=0;n<this._rootItems.length;n++)this._destroyItem(this._rootItems[n]);this._rootItems=[],this._itemMap={};if(t)for(var r=0;r<t.length;r++)this._rootItems.push(this._createItem(t[r]))},_defDisableFn:function(e){e.item.disabled=!0},_defEnableFn:function(e){e.item.disabled=!1},_defRenameFn:function(e){e.item.title=e.title},_defOpenFn:function(){c.instance&&c.instance.close(),c.instance=this,this._open=!0},_defCloseFn:function(){this._open=!1},_defActivateFn:function(e){e.item.active=!0},_defDeactivateFn:function(e){delete e.item.active},_defResetChildrenFn:function(e){var t=e.item,n=e.children;if(t.children&&t.children.length>0)for(var r=0;r<t.children.length;r++)this._destroyItem(t.children[r]);t.children=[];if(n)for(var i=0;i<n.length;i++)t.addChild(this._createItem(n[i]))}});e.namespace("Rednose.Dropdown").Base=c},"1.8.0",{requires:["rednose-dropdown-item"]});
