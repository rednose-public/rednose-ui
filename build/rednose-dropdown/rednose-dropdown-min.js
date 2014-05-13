YUI.add("rednose-dropdown",function(e,t){var n=e.Template.Micro,r="select",i=e.Base.create("dropdown",e.Rednose.Dropdown.Base,[e.View],{templates:{menu:n.compile('<ul class="<%= data.classNames.menu %>"></ul>'),caret:n.compile('<%== data.content %> <span class="<%= data.classNames.caret %>"></span>'),item:n.compile('<% if (data.item.type === "divider") { %><li class="<%= data.classNames.divider %>"></li><% } else { %><li class="<% if (data.item.isDisabled()) { %><%= data.classNames.disabled %> <% } %><% if (data.item.hasChildren()) { %><%= data.classNames.submenu %><% } %>"><% if (data.item.html) { %><%== data.item.html %><% } else { %><a href="<%= data.item.url %>" data-id="<%= data.item.id %>"><% if (data.item.icon) { %><i class="<%= data.classNames.icon %> <%= data.item.icon %>"></i> <% } %><%= data.item.title %></a><% } %></li><% } %>'),content:n.compile('<% if (data.item.icon) { %><i class="<%= data.classNames.icon %> <%= data.item.icon %>"></i> <% } %><%= data.item.title %>')},classNames:{disabled:"disabled",caret:"caret",menu:"dropdown-menu",toggle:"dropdown-toggle",open:"open",divider:"divider",dropdown:"dropdown",dropup:"dropup",icon:"icon",submenu:"dropdown-submenu"},rendered:!1,initializer:function(e){this.onceAfter("initializedChange",function(){this.get("container").addClass(this.classNames.dropdown),this._attachDropdownEvents()})},destructor:function(){this._detachDropdownEvents()},getHTMLNode:function(e){var t=this.get("container");return t.one('[data-id="'+e.id+'"]')},render:function(){var t=this.get("container");return this._rootItems&&t.append(this._renderMenu(this._rootItems)),t.inDoc()||e.one("body").append(t),this.rendered=!0,this},_attachDropdownEvents:function(){this._events||(this._events=[]);var t=this.get("container"),n=this.classNames;this._events.push(this.after({open:this._afterOpen,close:this._afterClose,enable:this._afterEnable,disable:this._afterDisable,rename:this._afterRename,reset:this._afterReset}),t.delegate("click",this._afterItemClick,"."+n.menu+" a",this),t.on("clickoutside",this._onClickOutside,this),t.on("mouseupoutside",this._onMouseUpOutside,this),e.one("body").on("contextmenu",this._onBodyContextMenu,this))},_detachDropdownEvents:function(){(new e.EventHandle(this._events)).detach()},_renderMenu:function(t){var n=e.Node.create(this.templates.menu({classNames:this.classNames}));for(var r=0,i=t.length;r<i;r++)n.append(this._renderItem(t[r]));return n},_renderItem:function(t){var n=e.Node.create(this.templates.item({classNames:this.classNames,item:t}));return t.html&&n.one("a")&&n.one("a").setAttribute("data-id",t.id),t.children&&n.append(this._renderMenu(t.children)),n},_onClickOutside:function(e){e.button!==3&&this.close()},_onBodyContextMenu:function(e){var t=this._host||this.get("container");t.contains(e.target)||this.close()},_afterItemClick:function(e){var t=e.currentTarget,n=this.getItemById(t.getAttribute("data-id")),i=r+"#"+n.id;(n.isDisabled()||n.url==="#")&&e.preventDefault();if(n.isDisabled()||n.hasChildren())return;this._published[i]||(this._published[i]=this.publish(i,{defaultFn:this._defItemSelectFn})),this._published[r]||(this._published[r]=this.publish(r,{defaultFn:this._defSelectFn})),this.fire(i,{originEvent:e,item:n})},_afterOpen:function(e){this.rendered||this.render();var t=this.get("container"),n=this.classNames;t.addClass(n.open)},_afterClose:function(e){var t=this.get("container"),n=this.classNames;t.removeClass(n.open)},_afterEnable:function(e){var t=this.getHTMLNode(e.item);t&&t.get("parentNode").removeClass(this.classNames.disabled)},_afterDisable:function(e){var t=this.getHTMLNode(e.item);t&&t.get("parentNode").addClass(this.classNames.disabled)},_afterRename:function(e){var t=this.getHTMLNode(e.item);t&&t.setContent(this.templates.content({classNames:this.classNames,item:e.item}))},_afterReset:function(e){if(!this.rendered)return;var t=this.get("container"),n=this.classNames;t.one("."+n.menu).remove(),this.render()},_defSelectFn:function(e){e.item.dropdown.toggle()},_defItemSelectFn:function(e){this.fire(r,{originEvent:e.originEvent,item:e.item})}},{NS:"dropdown"});e.Rednose.Dropdown=e.mix(i,e.Rednose.Dropdown)},"1.4.0",{requires:["event-outside","node","rednose-dropdown-base","template-micro","view"]});
