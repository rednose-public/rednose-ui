YUI.add("rednose-navbar",function(e,t){var n,r="click";n=e.Base.create("navbar",e.View,[],{templateContainer:'<div class="navbar navbar-inverse navbar-fixed-top"><div class="navbar-inner"><div class="container"><a class="brand brand-navbar" href="{url}">{title}</a><ul class="nav rednose-menu-primary"></ul><ul class="nav pull-right rednose-menu-secondary"></ui></div></div></div>',templateColumn:'<div class="navbar navbar-inverse navbar-fixed-top rednose-navbar-column"><div class="navbar-inner"><a class="brand brand-navbar rednose-brand" data-url="{url}" href="#">{title}</a><ul class="nav rednose-menu-primary"></ul><ul class="nav pull-right rednose-menu-secondary"></ui></div></div>',itemTemplate:'<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">{icon}{title} <b class="caret"></a></li>',rendered:!1,initializer:function(){this._navbarEvents||(this._navbarEvents=[]),this._published={},this._dropdownMap=[];var e=this.get("container");this._navbarEvents.push(this.after({"dropdown:click":this._afterDropdownClick}),e.delegate("click",this._onBrandClick,".brand",this))},destructor:function(){(new e.EventHandle(this._navbarEvents)).detach(),this.templateContainer=null,this.templateColumn=null},render:function(){var t=this.get("menu"),n=this.get("menuSecondary"),r=this.get("columnLayout")?this.templateColumn:this.templateContainer,i=this.get("title"),s=this.get("url"),o=this;return this.get("container").setHTML(e.Lang.sub(r,{title:i,url:s})),e.Array.each(t,function(e){o._renderItem(e)}),e.Array.each(n,function(e){o._renderItem(e,"right")}),this.rendered=!0,this},enable:function(t){if(e.Lang.isArray(t))return e.each(t,function(e){this.enable.call(this,e)},this),this;var n=this.getItemById(t);n&&n.enable()},disable:function(t){if(e.Lang.isArray(t))return e.each(t,function(e){this.disable.call(this,e)},this),this;var n=this.getItemById(t);n&&n.disable()},rename:function(e,t){var n=this.getItemById(e);n&&n.rename(t)},_renderItem:function(t,n){n||(n="left");var r=this.get("container"),i=r.one(n==="left"?".rednose-menu-primary":".rednose-menu-secondary"),s=e.Node.create(e.Lang.sub(this.itemTemplate,{title:t.title,icon:t.icon?'<i class="icon icon-white '+t.icon+'"></i> ':""}));i.append(s);if(t.items){var o=s.one("a");o.plug(e.Rednose.Plugin.Dropdown,{showCaret:!1,items:t.items}),o.dropdown.addTarget(this),this._dropdownMap.push(o.dropdown)}},getItemById:function(e){for(var t=0,n=this._dropdownMap.length;t<n;t++){var r=this._dropdownMap[t],i=r.getItemById(e);if(i)return i}return null},_onBrandClick:function(e){var t=e.currentTarget;t.getAttribute("href")==="#"&&e.preventDefault()},_afterDropdownClick:function(e){var t=e.item,n=r+"#"+t.id;this._published[n]||(this._published[n]=this.publish(n,{defaultFn:this._defItemClickFn})),this.fire(n,{originEvent:e,item:t})},_defItemClickFn:function(e){this.fire(r,{originEvent:e.originEvent,item:e.item})}},{ATTRS:{title:{value:null},url:{value:"#"},menu:{value:[]},menuSecondary:{value:[]},columnLayout:{value:!1}}}),e.namespace("Rednose").Navbar=n},"1.5.0-DEV",{requires:["rednose-dropdown-plugin","json","node-event-simulate","node-pluginhost","rednose-util","view"]});
