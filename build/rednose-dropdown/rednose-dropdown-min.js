YUI.add("rednose-dropdown",function(e,t){var n;n=e.Base.create("dropdown",e.Bootstrap.Dropdown,[],{initializer:function(){var e=this._node,t=null,n=this.config.dropup?"dropup":"dropdown";e.wrap('<div class="dropdown-wrapper '+n+'"></div>'),e.addClass("dropdown-toggle"),e.setAttribute("data-toggle","dropdown"),this.node=e,t=e.get("parentNode"),t.append(this._buildHTML(this.get("content"))),t.delegate("click",function(t){t.preventDefault(),t.target.hasClass("disabled")!==!0?(t.target.getAttribute("data-id")&&e.dropdown.fire(t.target.getAttribute("data-id")),e.dropdown.toggle()):t.target.blur()},"a"),this.set("node",t)},destructor:function(){this.get("node").replace(this.node),this.node.removeClass("dropdown-toggle"),this.node.removeAttribute("data-toggle"),delete this.node},enable:function(e){this.disable(e)},disable:function(e){var t=this.get("node"),n=t.one("[data-id="+e+"]");n.ancestor("li").hasClass("disabled")?n.ancestor("li").removeClass("disabled"):n.ancestor("li").addClass("disabled")},rename:function(e,t){var n=this.get("node"),r=n.one("[data-id="+e+"]");r.setHTML(t)},_buildHTML:function(t){var n='<ul class="dropdown-menu"></ul>',r=e.Node.create(n);return t===""?t:(e.Array.each(t,function(t){var n=e.Node.create("<li>"),i=e.Node.create('<a href="#">');t.className&&n.addClass(t.className);if(t.title!=="-"){i.set("innerHTML",t.title),i.setAttribute("data-id",t.id);if(t.icon){var s=e.Node.create("<i></i>");s.addClass("icon icon-"+t.icon),i.prepend(s)}n.append(i),t.disabled===!0&&(n.addClass("disabled"),i.addClass("disabled"))}else n.addClass("divider");r.append(n)}),r.get("outerHTML"))}},{NS:"dropdown",ATTRS:{content:{value:[]},node:{value:null}}}),e.namespace("Rednose").Dropdown=n},"1.1.0-DEV",{group:"rednose-ui",requires:["base","node","gallery-bootstrap-dropdown"]});
