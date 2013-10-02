YUI.add("rednose-navbar",function(e,t){var n,r="No title";n=e.Base.create("navbar",e.Widget,[],{template:'<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container"><a class="brand brand-navbar" data-url="{url}" href="#">{title}</a><ul class="nav"></ul><ul class="nav pull-right"></ui></div></div></div>',dropdownTemplate:'<li class="dropdown{submenu}"><a href="#" class="dropdown-toggle" data-toggle="dropdown">{title} <{caret}></a><ul class="dropdown-menu"></ul></li>',initializer:function(){var e=this.get("contentBox");e.delegate("click",this._prevent,"a",this),e.delegate("click",this._handleClick,".dropdown-menu a",this),e.delegate("click",this._handleClick,"ul.nav > li.nav-item > a",this),e.delegate("click",this._handleClick,"a.brand",this)},destructor:function(){this.template=null,this.dropdownTemplate=null},renderUI:function(){var t=this.get("menu"),n=this.get("menuSecondary"),r=this.template,i=this.get("title"),s=this.get("url");this.get("contentBox").setHTML(e.Lang.sub(r,{title:i,url:s})),this._appendMenu(t,!1),this._appendMenu(n,!0)},bindUI:function(){var t=this.get("contentBox");t.all(".dropdown-toggle").each(function(t){t.plug(e.Bootstrap.Dropdown)})},getNode:function(e){var t=this.get("contentBox");return t.one("[data-id="+e+"]")},enable:function(e){this.disable(e,!0)},disable:function(e,t){var n=this.get("contentBox"),r=n.one("[data-id="+e+"]");t?r.ancestor("li").removeClass("disabled"):r.ancestor("li").addClass("disabled")},rename:function(e,t){var n=this.get("contentBox"),r=n.one("[data-id="+e+"]");r.setHTML(t)},createDropdown:function(t,n){var r=this;e.Array.each(n,function(e){var n=r._createLi(e,t);t.one(".dropdown-menu").append(n)}),t.all(".dropdown-menu a").on("click",function(e){r._handleClick(e)}),t.one("a").plug(e.Bootstrap.Dropdown),t.on("click",function(e){e.preventDefault()})},_appendMenu:function(t,n,r){var i=this.get("contentBox"),s=this;e.Array.each(t,function(t){if(t.items){var o=e.Node.create(e.Lang.sub(s.dropdownTemplate,{title:t.title,submenu:typeof r!="undefined"?"-submenu":"",caret:typeof r=="undefined"?"b class=caret":"b"}));e.Array.each(t.items,function(e){u=s._createLi(e,o),o.one(".dropdown-menu").append(u)}),typeof r=="undefined"?i.one(n===!1?".nav":".pull-right").append(o):r.one(".dropdown-menu").append(o)}else{var u=s._createLi(t);u.addClass("nav-item"),i.one(n===!1?".nav":".pull-right").append(u)}})},_createLi:function(t,n){var r=this,i=e.Node.create('<li tabindex="-1"></li>');if(t.title==="-")i.addClass("divider");else{if(typeof t.items=="object"){r._appendMenu(new Array(t),null,n);return}var s=e.Node.create('<a tabindex="-1" href="#">'+t.title+"</a>");typeof t.disabled!="undefined"&&i.addClass("disabled"),i.append(s),typeof t.id!="undefined"&&s.setAttribute("data-id",t.id),typeof t.url!="undefined"&&s.setAttribute("data-url",t.url)}return i},_handleClick:function(e){var t=e.currentTarget,n=t.getAttribute("data-id"),r=t.getAttribute("data-url");if(t.hasClass("dropdown"))return;if(t.ancestor("li"))if(t.ancestor("li").hasClass("disabled")||t.ancestor("li").hasClass("dropdown-submenu")){t.blur();return}n&&this.fire(n),t.ancestor(".dropdown")&&t.ancestor(".dropdown").one(".dropdown-toggle").simulate("click"),r&&(document.location.href=r)},_prevent:function(e){e.preventDefault()}},{ATTRS:{title:{value:r},url:{value:""},menu:{value:[]},menuSecondary:{value:[]}}}),e.namespace("Rednose").Navbar=n},"1.1.0-DEV",{requires:["base","node-pluginhost","gallery-bootstrap-dropdown","widget","node-event-simulate"],skinnable:!0});
