YUI.add("rednose-tabview",function(e,t){var n;n=e.Base.create("tabView",e.Widget,[],{template:'<div class="tabbable"><ul class="nav nav-tabs"></ul></div><div class="tab-content"></div>',itemTemplate:"<li><a></a></li>",paneTemplate:'<div class="tab-pane"></div>',initializer:function(){this.after("errorChange",this._setError,this)},renderUI:function(){var t=this,n=this.get("tabs"),r=this.get("contentBox");r.append(this.template);var i=r.one(".tab-content");e.each(n,function(n){var s=e.Node.create(t.itemTemplate),o=s.one("a"),u=e.Node.create(t.paneTemplate);o.on("click",t._handleTabClick,t),o.setAttribute("id",n.id),o.setHTML(n.title),u.append(n.container),u.setAttribute("id",n.id),i.append(u),n.active&&(u.addClass("active"),s.addClass("active")),r.one("ul").append(s)})},showTab:function(e){return this.hideTab(e,!1)},hideTab:function(e,t){var n=this.get("contentBox"),r=n.one("#"+e);return r?(t?r.show():r.hide(),!0):!1},_handleTabClick:function(e){var t=e.currentTarget,n=t.getAttribute("id"),r=this.get("contentBox");r.all(".active").removeClass("active"),t.get("parentNode").addClass("active"),r.one("div#"+n).addClass("active"),this.fire("click",{tabNode:t.get("parentNode")})},_setError:function(t){var n=t.newVal,r=this.get("contentBox");r.all(".text-error").removeClass("text-error"),e.each(n,function(e){r.one("a#"+e).addClass("text-error")})}},{ATTRS:{tabs:{value:{}},error:{value:[]}}}),e.namespace("Rednose").TabView=n},"1.5.0-DEV",{requires:["node"]});
