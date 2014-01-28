YUI.add("rednose-navbar",function(e,t){var n;n=e.Base.create("navbar",e.Widget,[],{templateContainer:'<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container"><a class="brand brand-navbar" data-url="{url}" href="#">{title}</a><ul class="nav"></ul><ul class="nav pull-right"></ui></div></div></div>',templateColumn:'<div class="navbar navbar-inverse navbar-fixed-top rednose-navbar-column"><div class="navbar-inner"><a class="brand brand-navbar rednose-brand" data-url="{url}" href="#">{title}</a><ul class="nav rednose-menu-primary"></ul><ul class="nav pull-right rednose-menu-secondary"></ui></div></div>',dropdownTemplate:'<li class="dropdown{submenu}"><a href="#" class="dropdown-toggle" data-toggle="dropdown">{title} <{caret}></a><ul class="dropdown-menu"></ul></li>',initializer:function(){var e=this.get("contentBox");e.delegate("click",this._prevent,"a",this),e.delegate("click",this._handleClick,".dropdown-menu a",this),e.delegate("click",this._handleClick,"ul.nav > li.nav-item > a",this),e.delegate("click",this._handleClick,"a.brand",this)},destructor:function(){this.templateContainer=null,this.templateColumn=null,this.dropdownTemplate=null},renderUI:function(){var t=this.get("menu"),n=this.get("menuSecondary"),r=this.get("columnLayout")?this.templateColumn:this.templateContainer,i=this.get("title"),s=this.get("url");this.get("contentBox").setHTML(e.Lang.sub(r,{title:i,url:s})),this._appendMenu(t,!1),this._appendMenu(n,!0)},bindUI:function(){var t=this.get("contentBox");t.all(".dropdown-toggle").each(function(t){t.plug(e.Bootstrap.Dropdown)})},getNode:function(e){var t=this.get("contentBox");return t.one("[data-id="+e+"]")},enable:function(e){this.disable(e,!0)},disable:function(e,t){var n=this.get("contentBox"),r=n.one("[data-id="+e+"]");t?r.ancestor("li").removeClass("disabled"):r.ancestor("li").addClass("disabled")},rename:function(e,t){var n=this.get("contentBox"),r=n.one("[data-id="+e+"]");r.setHTML(t)},createDropdown:function(t,n){var r=this;e.Array.each(n,function(e){var n=r._createLi(e,t);t.one(".dropdown-menu").append(n)}),t.all(".dropdown-menu a").on("click",function(e){r._handleClick(e)}),t.one("a").plug(e.Bootstrap.Dropdown),t.all("a").on("click",function(e){r._prevent(e)})},_appendMenu:function(t,n,r){var i=this.get("contentBox"),s=this;e.Array.each(t,function(t){if(t.items){var o=e.Node.create(e.Lang.sub(s.dropdownTemplate,{title:t.title,submenu:typeof r!="undefined"?"-submenu":"",caret:typeof r=="undefined"?"b class=caret":"b"}));e.Array.each(t.items,function(e){u=s._createLi(e,o),o.one(".dropdown-menu").append(u)}),typeof r=="undefined"?i.one(n===!1?".nav":".pull-right").append(o):r.one(".dropdown-menu").append(o)}else{var u=s._createLi(t);u.addClass("nav-item"),i.one(n===!1?".nav":".pull-right").append(u)}})},_createLi:function(t,n){var r=this,s=e.Node.create('<li tabindex="-1"></li>');return t.title==="-"?(s.addClass("divider"),s):typeof t.items=="object"?r._appendMenu(new Array(i),null,n):t.node instanceof e.Node&&t.node.test("a")?(s.append(t.node),s):(s.append(this._createListItem(t)),typeof t.disabled!="undefined"&&s.addClass("disabled"),s)},_createListItem:function(t){var n=e.Node.create('<a tabindex="-1" href="#"></a>'),r=t.node||t.title;return t.icon&&(r='<i class="icon icon-'+t.icon+'"></i> '+r),n.set("innerHTML",r),typeof t.id!="undefined"&&n.setAttribute("data-id",t.id),typeof t.url!="undefined"&&n.setAttribute("data-url",t.url),n},_handleClick:function(e){var t=e.currentTarget,n=t.getAttribute("data-id"),r=t.getAttribute("data-url");if(t.hasClass("dropdown"))return;if(t.ancestor("li"))if(t.ancestor("li").hasClass("disabled")||t.ancestor("li").hasClass("dropdown-submenu")){t.blur();return}n&&this.fire(n),t.ancestor(".dropdown")&&t.ancestor(".dropdown").one(".dropdown-toggle").simulate("click"),r&&(document.location.href=r)},_prevent:function(e){e.currentTarget.getAttribute("href")==="#"&&e.preventDefault()}},{ATTRS:{title:{value:null},url:{value:""},menu:{value:[]},menuSecondary:{value:[]},columnLayout:{value:!1}}}),e.namespace("Rednose").Navbar=n},"1.1.0-DEV",{requires:["base","gallery-bootstrap-dropdown","node-event-simulate","node-pluginhost","rednose-navbar-css","widget"]});
