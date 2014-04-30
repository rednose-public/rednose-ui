YUI.add("rednose-dropdown",function(e,t){var n="select",r=e.Base.create("dropdown",e.View,[],{initializer:function(e){var t=this.get("srcNode"),n=this.get("anchorNode"),r=this.get("items"),i=this.get("dropup"),s;t?(s=t.get("parentNode"),t.on("click",this._handleAnchorClick,this),s.delegate("click",this._handleItemClick,".dropdown-menu a",this),this.set("anchorNode",t)):(s=n.get("parentNode"),s.addClass(i?"dropup":"dropdown"),n.addClass("dropdown-toggle"),n.setAttribute("data-toggle","dropdown"),this.get("showCaret")&&n.setContent(n.getContent()+' <span class="caret"></span>'),s.append(this._buildHTML(r)),n.on("click",this._handleAnchorClick,this),s.delegate("click",this._handleItemClick,".dropdown-menu a",this))},destructor:function(){},toggle:function(){var e=this.get("anchorNode").get("parentNode");e.toggleClass("open"),e.once("clickoutside",function(t){e.toggleClass("open")})},enable:function(e){this.disable(e)},disable:function(e){var t=this.get("node"),n=t.one("[data-id="+e+"]");n.ancestor("li").hasClass("disabled")?(n.removeClass("disabled"),n.ancestor("li").removeClass("disabled")):(n.addClass("disabled"),n.ancestor("li").addClass("disabled"))},rename:function(e,t){var n=this.get("node"),r=n.one("[data-id="+e+"]");r.setHTML(t)},_buildHTML:function(t){var n='<ul class="dropdown-menu"></ul>',r=e.Node.create(n);return e.Array.each(t,function(t){var n=e.Node.create("<li>"),i=e.Node.create('<a href="#">'),s=t.title;t.className&&n.addClass(t.className),t.title!=="-"?(t.icon&&(s='<i class="icon '+t.icon+'"></i> '+s),i.set("innerHTML",s),i.setAttribute("data-id",t.id),n.append(i),t.disabled===!0&&(n.addClass("disabled"),i.addClass("disabled"))):n.addClass("divider"),r.append(n)}),r.get("outerHTML")},_handleAnchorClick:function(e){e.preventDefault(),this.toggle()},_handleItemClick:function(e){e.preventDefault();var t=e.target;if(t.get("parentNode").hasClass("disabled"))return;this.toggle(),this.fire(n,{originEvent:e.originEvent,id:t.hasAttribute("data-id")?t.getAttribute("data-id"):null}),t.hasAttribute("data-id")&&this.fire(n+"#"+t.getAttribute("data-id"),{originEvent:e.originEvent,id:t.getAttribute("data-id")})}},{NS:"dropdown",ATTRS:{srcNode:{setter:e.one,writeOnce:"initOnly"},anchorNode:{setter:e.one},items:{value:null},showCaret:{value:!0},dropup:{value:!1}}});e.namespace("Rednose").Dropdown=r},"1.4.0",{requires:["base","node","view"]});
