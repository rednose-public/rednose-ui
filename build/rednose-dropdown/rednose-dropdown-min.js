YUI.add("rednose-dropdown",function(e,t){var n;n=e.Base.create("dropdown",e.Widget,[],{initializer:function(e){var t=this.get("sourceNode"),n=t.get("parentNode");t.on("click",this._handleAnchorClick,this),n.delegate("click",this._handleItemClick,".dropdown-menu a",this)},destructor:function(){},toggle:function(){var e=this.get("sourceNode").get("parentNode");e.toggleClass("open"),e.once("clickoutside",function(t){e.toggleClass("open")})},enable:function(e){this.disable(e)},disable:function(e){var t=this.get("node"),n=t.one("[data-id="+e+"]");n.ancestor("li").hasClass("disabled")?(n.removeClass("disabled"),n.ancestor("li").removeClass("disabled")):(n.addClass("disabled"),n.ancestor("li").addClass("disabled"))},rename:function(e,t){var n=this.get("node"),r=n.one("[data-id="+e+"]");r.setHTML(t)},_buildHTML:function(t){var n='<ul class="dropdown-menu"></ul>',r=e.Node.create(n);return t===""?t:(e.Array.each(t,function(t){var n=e.Node.create("<li>"),i=e.Node.create('<a href="#">'),s=t.title;t.className&&n.addClass(t.className),t.title!=="-"?(t.icon&&(s='<i class="icon '+t.icon+'"></i> '+s),i.set("innerHTML",s),i.setAttribute("data-id",t.id),n.append(i),t.disabled===!0&&(n.addClass("disabled"),i.addClass("disabled"))):n.addClass("divider"),r.append(n)}),r.get("outerHTML"))},_handleAnchorClick:function(e){e.preventDefault(),this.toggle()},_handleItemClick:function(e){e.preventDefault();var t=e.target;if(t.get("parentNode").hasClass("disabled")||!t.hasAttribute("data-id"))return;this.fire("select",{id:t.getAttribute("data-id")})}},{NS:"dropdown",ATTRS:{sourceNode:{setter:e.one,writeOnce:"initOnly"},content:{value:null},node:{value:null}}}),e.namespace("Rednose").Dropdown=n},"1.4.0",{requires:["base","node","widget"]});
