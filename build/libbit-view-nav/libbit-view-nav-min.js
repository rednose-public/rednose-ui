YUI.add("libbit-view-nav",function(e,t){var n;n=e.Base.create("nav",e.View,[],{title:null,buttons:null,_footer:null,_buttonMap:{},initializer:function(){e.Do.after(this._afterRender,this,"render",this),this._buildFooter()},getButton:function(e){return this._buttonMap[e]},_afterRender:function(){var t=this.get("container"),n=this.title,r=e.Node.create("<div></div>"),i=this._footer,s={bodyContent:r},o;t.get("children").each(function(e){r.append(e)}),n!==null&&(s.headerContent=n),i!==null&&(s.footerContent=i),o=new e.Libbit.NavContainer(s),o.get("contentBox").addClass("libbit-view-nav"),o.render(t)},_buildFooter:function(){var t=this,n=this.buttons;footer=e.Node.create("<div></div>"),e.Object.each(n,function(n,r){var i=n.value,s=n.primary,o=n.position?n.position:"left",u=n.title?n.title:i?i:null,a=n.disabled,f=n.className,l=n.icon,c="button"+t._capitalizeFirstLetter(r),h=e.Node.create('<button class="btn"></button>');i&&h.set("text",i),u&&h.set("title",u),l&&h.append(e.Node.create('<i class="'+l+'"></i>')),s&&h.addClass("btn-primary"),a&&h.addClass("disabled"),f&&h.addClass(f),h.addClass("float-"+o),h.on("click",function(e){var n=e.target;n.hasClass("disabled")===!1&&t.fire(c)}),footer.append(h),t._buttonMap[r]=h}),this._footer=footer},_capitalizeFirstLetter:function(e){return e.charAt(0).toUpperCase()+e.slice(1)},_setButtons:function(t){var n=this,r=this.get("container").one(".yui3-widget-ft"),i=this.buttons;e.Object.each(t,function(t,r){n.buttons[r]=e.merge(i[r],t)}),this._buildFooter(),r.one("div").replace(this._footer)},_getButtons:function(){return this.buttons}},{ATTRS:{buttons:{setter:"_setButtons",getter:"_getButtons"}}}),e.namespace("Libbit.View").Nav=n},"1.0.0",{requires:["event-custom","libbit-nav-container","libbit-view-nav-css","view"]});
