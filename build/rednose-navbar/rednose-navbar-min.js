YUI.add("rednose-navbar",function(e,t){var n,r="click";n=e.Base.create("navbar",e.Widget,[],{templateContainer:'<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container"><a class="brand brand-navbar" data-url="{url}" href="#">{title}</a><ul class="nav rednose-menu-primary"></ul><ul class="nav pull-right rednose-menu-secondary"></ui></div></div></div>',templateColumn:'<div class="navbar navbar-inverse navbar-fixed-top rednose-navbar-column"><div class="navbar-inner"><a class="brand brand-navbar rednose-brand" data-url="{url}" href="#">{title}</a><ul class="nav rednose-menu-primary"></ul><ul class="nav pull-right rednose-menu-secondary"></ui></div></div>',itemTemplate:'<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">{icon}{title} <b class="caret"></a></li>',initializer:function(){this._navbarEvents||(this._navbarEvents=[]),this._published={},this._navbarEvents.push(this.after({"dropdown:click":this._afterDropdownClick}))},destructor:function(){(new e.EventHandle(this._navbarEvents)).detach(),this.templateContainer=null,this.templateColumn=null},renderUI:function(){var t=this.get("menu"),n=this.get("menuSecondary"),r=this.get("columnLayout")?this.templateColumn:this.templateContainer,i=this.get("title"),s=this.get("url"),o=this;this.get("contentBox").setHTML(e.Lang.sub(r,{title:i,url:s})),e.Array.each(t,function(e){o._renderItem(e)}),e.Array.each(n,function(e){o._renderItem(e,"right")})},bindUI:function(){},getNode:function(e){var t=this.get("contentBox");return t.one("[data-id="+e+"]")},enable:function(e){this.disable(e,!0)},disable:function(e,t){var n=this.get("contentBox"),r=n.one("[data-id="+e+"]");t?r.ancestor("li").removeClass("disabled"):r.ancestor("li").addClass("disabled")},rename:function(e,t){var n=this.get("contentBox"),r=n.one("[data-id="+e+"]");r.setHTML(t)},_renderItem:function(t,n){n||(n="left");var r=this.get("contentBox"),i=r.one(n==="left"?".rednose-menu-primary":".rednose-menu-secondary"),s=e.Node.create(e.Lang.sub(this.itemTemplate,{title:t.title,icon:t.icon?'<i class="icon icon-white '+t.icon+'"></i> ':""}));i.append(s);if(t.items){var o=s.one("a");o.plug(e.Rednose.Plugin.Dropdown,{showCaret:!1,items:t.items}),o.dropdown.addTarget(this)}},_appendMenu:function(t,n,r){var i=this.get("contentBox"),s=this;e.Array.each(t,function(t){if(t.items){var o=e.Node.create(e.Lang.sub(s.dropdownTemplate,{title:t.title,icon:t.icon?'<i class="icon icon-white '+t.icon+'"></i> ':"",submenu:typeof r!="undefined"?"-submenu":"",caret:typeof r=="undefined"?"b class=caret":"b"}));e.Array.each(t.items,function(e){u=s._createLi(e,o),o.one(".dropdown-menu").append(u)}),typeof r=="undefined"?i.one(n===!1?".nav":".pull-right").append(o):r.one(".dropdown-menu").append(o)}else{var u=s._createLi(t);u.addClass("nav-item"),i.one(n===!1?".nav":".pull-right").append(u)}})},_createLi:function(t,n){var r=e.Node.create('<li tabindex="-1"></li>');return t.title==="-"?(r.addClass("divider"),r):typeof t.items=="object"?this._appendMenu([t],null,n):t.node instanceof e.Node&&t.node.test("a")?(r.append(t.node),r):(r.append(this._createListItem(t)),typeof t.disabled!="undefined"&&r.addClass("disabled"),r)},_createListItem:function(t){var n=e.Node.create('<a tabindex="-1" href="#"></a>'),r=t.node||t.title;return t.icon&&(r='<i class="icon '+t.icon+'"></i> '+r),n.set("innerHTML",r),typeof t.id!="undefined"&&n.setAttribute("data-id",t.id),typeof t.url!="undefined"&&n.setAttribute("data-url",t.url),typeof t.value!="undefined"&&n.setAttribute("data-value",t.value),n},_handleClick:function(e){var t=e.currentTarget,n=t.getAttribute("data-id"),r=t.getAttribute("data-url"),i=t.getAttribute("data-value");if(t.hasClass("dropdown"))return;if(t.ancestor("li"))if(t.ancestor("li").hasClass("disabled")||t.ancestor("li").hasClass("dropdown-submenu")){t.blur();return}n&&this.fire(n,{value:i}),t.ancestor(".dropdown")&&t.ancestor(".dropdown").one(".dropdown-toggle").simulate("click"),r&&(document.location.href=r)},_prevent:function(e){e.currentTarget.getAttribute("href")==="#"&&e.preventDefault()},_afterDropdownClick:function(e){var t=e.item,n=r+"#"+t.id;this._published[n]||(this._published[n]=this.publish(n,{defaultFn:this._defItemClickFn})),this.fire(n,{originEvent:e,item:t})},_defItemClickFn:function(e){this.fire(r,{originEvent:e.originEvent,item:e.item})}},{ATTRS:{title:{value:null},url:{value:""},menu:{value:[]},menuSecondary:{value:[]},columnLayout:{value:!1}}}),e.namespace("Rednose").Navbar=n},"1.5.0-DEV",{requires:["base","rednose-dropdown-plugin","json","node-event-simulate","node-pluginhost","rednose-util","view","widget"]});
