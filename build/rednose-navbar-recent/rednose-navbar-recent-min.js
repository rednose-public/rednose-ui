YUI.add("rednose-navbar-recent",function(e,t){var n="Clear Items",r="recent",i=5,s="clickRecent",o=e.Base.create("navbar",e.Plugin.Base,[],{initializer:function(e){this._scope=e.scope,this._node=e.node;var t=this.get("host");t.after("click",this._afterItemClick,this),t.after("click#clear-items",this._afterRecentClear,this),t.after("render",this._renderMenu,this),this.addTarget(t)},destructor:function(){var e=this.get("host");this.removeTarget(e),this._scope=null,this._node=null},add:function(t,n){var s=e.Cookie.getSub(r,this._scope),o={id:t,title:n},u=e.JSON.parse(s)||[];e.each(u,function(e,t){e.id===o.id&&u.splice(t,1)}),u.unshift(o),u.length>i&&u.pop(),s=e.JSON.stringify(u),e.Cookie.setSub(r,this._scope,s),this.get("host").rendered&&this._renderMenu()},clear:function(){e.Cookie.setSub(r,this._scope,null),this.get("host").rendered&&this._renderMenu()},_renderMenu:function(){var t=this.get("host"),i=t.getItemById(this._node);cookieData=e.JSON.parse(e.Cookie.getSub(r,this._scope)),cookieData&&cookieData.length>0&&cookieData.push({type:"divider"},{id:"clear-items",title:n}),i[cookieData?"enable":"disable"](),i.resetChildren(cookieData)},_afterItemClick:function(e){var t=e.item,n=this._node;t&&t.parent&&t.parent.id===n&&t.id!=="clear-items"&&this.fire(s,{id:t.id,originEvent:e})},_afterRecentClear:function(){this.clear()}},{NS:"recent"});e.namespace("Rednose.Plugin").NavbarRecent=o},"1.5.0-DEV",{requires:["cookie","plugin","rednose-navbar"]});
