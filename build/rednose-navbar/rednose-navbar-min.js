YUI.add("rednose-navbar",function(e,t){var n;n=e.Base.create("navbar",e.Widget,[],{templateContainer:'<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container"><a class="brand brand-navbar" data-url="{url}" href="#">{title}</a><ul class="nav"></ul><ul class="nav pull-right"></ui></div></div></div>',templateColumn:'<div class="navbar navbar-inverse navbar-fixed-top rednose-navbar-column"><div class="navbar-inner"><a class="brand brand-navbar rednose-brand" data-url="{url}" href="#">{title}</a><ul class="nav rednose-menu-primary"></ul><ul class="nav pull-right rednose-menu-secondary"></ui></div></div>',dropdownTemplate:'<li class="dropdown{submenu}"><a href="#" class="dropdown-toggle" data-toggle="dropdown">{icon}{title} <{caret}></a><ul class="dropdown-menu"></ul></li>',initializer:function(){var e=this.get("contentBox");e.delegate("click",this._prevent,"a",this),e.delegate("click",this._handleClick,".dropdown-menu a",this),e.delegate("click",this._handleClick,"ul.nav > li.nav-item > a",this),e.delegate("click",this._handleClick,"a.brand",this)},destructor:function(){this.templateContainer=null,this.templateColumn=null,this.dropdownTemplate=null},renderUI:function(){var t=this.get("menu"),n=this.get("menuSecondary"),r=this.get("columnLayout")?this.templateColumn:this.templateContainer,i=this.get("title"),s=this.get("url");this.get("contentBox").setHTML(e.Lang.sub(r,{title:i,url:s})),this._appendMenu(t,!1),this._appendMenu(n,!0)},bindUI:function(){var t=this.get("contentBox");t.all(".dropdown-toggle").each(function(t){t.plug(e.Bootstrap.Dropdown)})},getNode:function(e){var t=this.get("contentBox");return t.one("[data-id="+e+"]")},enable:function(e){this.disable(e,!0)},disable:function(e,t){var n=this.get("contentBox"),r=n.one("[data-id="+e+"]");t?r.ancestor("li").removeClass("disabled"):r.ancestor("li").addClass("disabled")},rename:function(e,t){var n=this.get("contentBox"),r=n.one("[data-id="+e+"]");r.setHTML(t)},createDropdown:function(t,n){var r=this;t.one(".dropdown-menu")===null&&(t.removeClass("nav-item"),t.addClass("dropdown"),t.one("a").addClass("dropdown-toggle"),t.one("a").append("&nbsp;"),t.one("a").append('<b class="caret"></b>'),t.append(e.Node.create('<ul class="dropdown-menu"></ul>'))),e.Array.each(n,function(e){var n=r._createLi(e,t);t.one(".dropdown-menu").append(n)}),t.one("a").plug(e.Bootstrap.Dropdown),t.delegate("click",this._prevent,"a",this),t.delegate("click",this._handleClick,".dropdown-menu a",this),t.delegate("click",this._handleClick,"ul.nav > li.nav-item > a",this)},_appendMenu:function(t,n,r){var i=this.get("contentBox"),s=this;e.Array.each(t,function(t){if(t.items){var o=e.Node.create(e.Lang.sub(s.dropdownTemplate,{title:t.title,icon:t.icon?'<i class="icon icon-white '+t.icon+'"></i> ':"",submenu:typeof r!="undefined"?"-submenu":"",caret:typeof r=="undefined"?"b class=caret":"b"}));e.Array.each(t.items,function(e){u=s._createLi(e,o),o.one(".dropdown-menu").append(u)}),typeof r=="undefined"?i.one(n===!1?".nav":".pull-right").append(o):r.one(".dropdown-menu").append(o)}else{var u=s._createLi(t);u.addClass("nav-item"),i.one(n===!1?".nav":".pull-right").append(u)}})},_createLi:function(t,n){var r=e.Node.create('<li tabindex="-1"></li>');return t.title==="-"?(r.addClass("divider"),r):typeof t.items=="object"?this._appendMenu([t],null,n):t.node instanceof e.Node&&t.node.test("a")?(r.append(t.node),r):(r.append(this._createListItem(t)),typeof t.disabled!="undefined"&&r.addClass("disabled"),r)},_createListItem:function(t){var n=e.Node.create('<a tabindex="-1" href="#"></a>'),r=t.node||t.title;return t.icon&&(r='<i class="icon '+t.icon+'"></i> '+r),n.set("innerHTML",r),typeof t.id!="undefined"&&n.setAttribute("data-id",t.id),typeof t.url!="undefined"&&n.setAttribute("data-url",t.url),typeof t.value!="undefined"&&n.setAttribute("data-value",t.value),n},_handleClick:function(e){var t=e.currentTarget,n=t.getAttribute("data-id"),r=t.getAttribute("data-url"),i=t.getAttribute("data-value");if(t.hasClass("dropdown"))return;if(t.ancestor("li"))if(t.ancestor("li").hasClass("disabled")||t.ancestor("li").hasClass("dropdown-submenu")){t.blur();return}n&&this.fire(n,{value:i}),t.ancestor(".dropdown")&&t.ancestor(".dropdown").one(".dropdown-toggle").simulate("click"),r&&(document.location.href=r)},_prevent:function(e){e.currentTarget.getAttribute("href")==="#"&&e.preventDefault()}},{ATTRS:{title:{value:null},url:{value:""},menu:{value:[]},menuSecondary:{value:[]},columnLayout:{value:!1}}}),e.namespace("Rednose").Navbar=n;var r="btn",i="btn-group",s="active",o="btn-primary",u="disabled",a="float-left",f="float-right",l="close",c=e.Base.create("toolbar",e.View,[],{_buttonMap:{},_evtPrefix:null,initializer:function(e){e||(e={}),this._evtPrefix=e.evtPrefix||c.NAME},destructor:function(){this._buttonMap=null},render:function(){var t=this,n=this.get("buttons"),l=this.get("container");return e.Object.each(n,function(n,c){var h=n.value,p=n.primary,d=n.position?n.position:"left",v=n.disabled,m=n.className,g=n.icon,y=n.title,b=n.hidden,w,E;n.type==="choice"?(w=e.Node.create('<div class="'+i+'"></div>'),v&&w.addClass(u),m&&w.addClass(m),b&&w.hide(),d==="left"&&w.addClass(a),d==="right"&&w.addClass(f),e.Object.each(n.choices,function(n,i){var o=e.Node.create('<button class="'+r+'"></button>');n.icon&&o.append(e.Node.create('<i class="'+n.icon+'"></i>')),h===i&&o.addClass(s),n.title&&o.set("title",n.title),o.on("click",function(n){var r=n.currentTarget;E="button"+e.Rednose.Util.capitalizeFirstLetter(i),r.hasClass(s)===!1&&(r.get("parentNode").get("children").each(function(e){e.hasClass(s)&&e.removeClass(s)}),r.addClass(s),t.fire(t._evtPrefix+":"+E))}),w.append(o)})):(E="button"+e.Rednose.Util.capitalizeFirstLetter(c),w=e.Node.create('<button class="'+r+'"></button>'),p&&w.addClass(o),v&&w.addClass(u),m&&w.addClass(m),y&&w.set("title",y),b&&w.hide(),d==="left"&&w.addClass(a),d==="right"&&w.addClass(f),h&&w.set("text",h),g&&w.append(e.Node.create('<i class="'+
g+'"></i>')),w.on("click",function(e){var n=e.currentTarget;n.hasClass(u)===!1&&t.fire(t._evtPrefix+":"+E)})),l.append(w),t._buttonMap[c]=w}),this},getButton:function(e){return this._buttonMap?this._buttonMap[e]?this._buttonMap[e]:!1:!1},_setButtons:function(t){var n=this,r=this.get("container").one("."+CSS_YUI3_WIDGET_FT),i=this.buttons;e.Object.each(t,function(t,r){n.buttons[r]=e.merge(i[r],t)}),this._buildFooter(),this._rendered&&r.one("div").replace(this._footer)},_getButtons:function(){return this.buttons}},{ATTRS:{buttons:{value:{}}}});e.namespace("Rednose").Toolbar=c},"1.1.0-DEV",{requires:["base","gallery-bootstrap-dropdown","node-event-simulate","node-pluginhost","rednose-navbar-css","rednose-util","widget"]});
