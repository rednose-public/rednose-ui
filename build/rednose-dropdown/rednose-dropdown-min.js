YUI.add("rednose-dropdown",function(e,t){function n(t,n){n||(n={}),this.dropdown=t,this.id=n.id||e.stamp(this),this.type=n.type||"item",this.url=n.url||"#",this.children=[],e.mix(this,n)}n.prototype={enable:function(){return this.dropdown.enableItem(this),this},disable:function(){return this.dropdown.disableItem(this),this},rename:function(e){return this.dropdown.renameItem(this,e),this},isDisabled:function(){return this.disabled===!0},hasChildren:function(){return this.children&&this.children.length>0},addChild:function(e){this.children.push(e)}},e.namespace("Rednose").DropdownItem=n;var r="enable",i="disable",s="rename",o="close",u="open";EVT_RESET="reset";var a=e.Base.create("dropdownBase",e.Base,[],{_open:!1,initializer:function(e){this._published={},e.items&&this.reset(e.items)},destructor:function(){this._rootItems=null,this._itemMap=null,this._published=null},reset:function(e){return this._fireDropdownEvent(EVT_RESET,{items:e},{defaultFn:this._defResetFn})},open:function(){return this.isOpen()||this._fireDropdownEvent(u,{},{defaultFn:this._defOpenFn}),this},close:function(){return this.isOpen()&&this._fireDropdownEvent(o,{},{defaultFn:this._defCloseFn}),this},toggle:function(){return this[this.isOpen()?"close":"open"]()},isOpen:function(){return this._open},getItemById:function(e){return this._itemMap[e]},enableItem:function(e){return e.isDisabled()&&this._fireDropdownEvent(r,{item:e},{defaultFn:this._defEnableFn}),this},disableItem:function(e){return e.isDisabled()||this._fireDropdownEvent(i,{item:e},{defaultFn:this._defDisableFn}),this},renameItem:function(e,t){return this._fireDropdownEvent(s,{item:e,title:t},{defaultFn:this._defRenameFn}),this},_createItem:function(t){var n=new e.Rednose.DropdownItem(this,t);if(t.children)for(var r=0,i=t.children.length;r<i;r++)n.addChild(this._createItem(t.children[r]));return n.id in this._itemMap&&(n.id=e.stamp(n)),this._itemMap[n.id]=n,n},_destroyItem:function(e){if(e.hasChildren())for(var t=0,n=e.children.length;t<n;t++)this._destroyItem(e.children[t]);e.dropdown=null,e.children=null,delete this._itemMap[e.id]},_fireDropdownEvent:function(e,t,n){return n&&n.defaultFn&&!this._published[e]&&(this._published[e]=this.publish(e,{defaultFn:n.defaultFn})),this.fire(e,t),this},_defResetFn:function(e){var t=e.items;if(this._rootItems&&this._rootItems.length>0)for(var n=0;n<this._rootItems.length;n++)this._destroyItem(this._rootItems[n]);this._rootItems=[],this._itemMap={};if(t)for(var r=0;r<t.length;r++)this._rootItems.push(this._createItem(t[r]))},_defDisableFn:function(e){e.item.disabled=!0},_defEnableFn:function(e){e.item.disabled=!1},_defRenameFn:function(e){e.item.title=e.title},_defOpenFn:function(e){this._open=!0},_defCloseFn:function(e){this._open=!1}});e.namespace("Rednose").DropdownBase=a;var f=e.Template.Micro,l="select",c=e.Base.create("dropdown",e.Rednose.DropdownBase,[e.View],{templates:{menu:f.compile('<ul class="<%= data.classNames.menu %>"></ul>'),caret:f.compile('<%== data.content %> <span class="<%= data.classNames.caret %>"></span>'),item:f.compile('<% if (data.item.type === "divider") { %><li class="<%= data.classNames.divider %>"></li><% } else { %><li class="<% if (data.item.isDisabled()) { %><%= data.classNames.disabled %> <% } %><% if (data.item.hasChildren()) { %><%= data.classNames.submenu %><% } %>"><% if (data.item.html) { %><%== data.item.html %><% } else { %><a href="<%= data.item.url %>" data-id="<%= data.item.id %>"><% if (data.item.icon) { %><i class="<%= data.classNames.icon %> <%= data.item.icon %>"></i> <% } %><%= data.item.title %></a><% } %></li><% } %>'),content:f.compile('<% if (data.item.icon) { %><i class="<%= data.classNames.icon %> <%= data.item.icon %>"></i> <% } %><%= data.item.title %>')},classNames:{disabled:"disabled",caret:"caret",menu:"dropdown-menu",toggle:"dropdown-toggle",open:"open",divider:"divider",dropdown:"dropdown",dropup:"dropup",icon:"icon",submenu:"dropdown-submenu"},rendered:!1,initializer:function(e){this.onceAfter("initializedChange",function(){this.get("container").addClass(this.classNames.dropdown),this._attachDropdownEvents()})},destructor:function(){this._detachDropdownEvents()},getHTMLNode:function(e){var t=this.get("container");return t.one('[data-id="'+e.id+'"]')},render:function(){var t=this.get("container");return this._rootItems&&t.append(this._renderMenu(this._rootItems)),t.inDoc()||e.one("body").append(t),this.rendered=!0,this},_attachDropdownEvents:function(){this._events||(this._events=[]);var e=this.get("container"),t=this.classNames;this._events.push(this.after({open:this._afterOpen,close:this._afterClose,enable:this._afterEnable,disable:this._afterDisable,rename:this._afterRename,reset:this._afterReset}),e.delegate("click",this._afterItemClick,"."+t.menu+" a",this),e.on("clickoutside",this._onClickOutside,this))},_detachDropdownEvents:function(){(new e.EventHandle(this._events)).detach()},_renderMenu:function(t){var n=e.Node.create(this.templates.menu({classNames:this.classNames}));for(var r=0,i=t.length;r<i;r++)n.append(this._renderItem(t[r]));return n},_renderItem:function(t){var n=e.Node.create(this.templates.item({classNames:this.classNames,item:t}));return t.children&&n.append(this._renderMenu(t.children)),n},_onClickOutside:function(e){this.close()},_afterItemClick:function(e){var t=e.target,n=e.originEvent,r=this.getItemById(t.getAttribute("data-id")),i=l+"#"+r.id;(r.isDisabled()||r.url==="#")&&e.preventDefault();if(r.isDisabled()||r.hasChildren())return;this._published[i]||(this._published[i]=this.publish(i,{defaultFn:this._defItemSelectFn})),this._published[l]||(this._published[l]=this.publish(l,{defaultFn:this._defSelectFn})),this.fire(i,{originEvent:n,item:r})},_afterOpen:function(e){this.rendered||this.render();var t=this.get("container"),n=this.classNames;t.addClass(n.open)},_afterClose:function(e){var t=this.get("container"),n=this.classNames;t.removeClass(n.open)},_afterEnable:function(e){var t=this.getHTMLNode(e.item);t&&t.get("parentNode").removeClass
(this.classNames.disabled)},_afterDisable:function(e){var t=this.getHTMLNode(e.item);t&&t.get("parentNode").addClass(this.classNames.disabled)},_afterRename:function(e){var t=this.getHTMLNode(e.item);t&&t.setContent(this.templates.content({classNames:this.classNames,item:e.item}))},_afterReset:function(e){if(!this.rendered)return;var t=this.get("container"),n=this.classNames;t.one("."+n.menu).remove(),this.render()},_defSelectFn:function(e){e.item.dropdown.toggle()},_defItemSelectFn:function(e){this.fire(l,{originEvent:e.originEvent,item:e.item})}},{NS:"dropdown"});e.namespace("Rednose").Dropdown=c,e.namespace("Rednose.Plugin").Dropdown=e.Base.create("dropdown",e.Rednose.Dropdown,[e.Plugin.Base],{initializer:function(e){this._host=e.host;var t=this.get("container"),n=this.get("dropup"),r=this.classNames;t.addClass(r.dropdown),n&&t.addClass(r.dropup);if(this.get("showOnContext")){this._host.on("contextmenu",this._afterAnchorContextMenu,this);return}this._host.addClass(r.toggle),this.get("showCaret")&&this._host.setHTML(this.templates.caret({classNames:r,content:this._host.getHTML()})),this._host.on("click",this._afterAnchorClick,this)},_positionContainer:function(e,t){var n=this.get("container");n.setStyles({position:"absolute",left:e,top:t})},_afterAnchorContextMenu:function(e){if(e.shiftKey)return;e.preventDefault(),this._positionContainer(e.pageX,e.pageY),this.open()},_afterAnchorClick:function(e){e.preventDefault(),this.toggle()}},{NS:"dropdown",ATTRS:{showCaret:{value:!0,writeOnce:"initOnly"},showOnContext:{value:!1,writeOnce:"initOnly"},dropup:{value:!1,writeOnce:"initOnly"},container:{getter:function(e){return this.get("showOnContext")?this._getContainer(e):this._host.get("parentNode")}}}})},"1.4.0",{requires:["base","node","template-micro","view","node-pluginhost","plugin"]});
