YUI.add("libbit-treeview-select",function(e,t){var n;n=e.Base.create("selectable",e.Base,[],{initializer:function(){this.get("selectable"),this.after("selectedItemChange",this._afterSelectedItemChange,this)},_setSelectable:function(e){return e===!0&&this._bind(),e},_bind:function(){var e=this.get("contentBox");e.on("click",this._handleClick,this)},_handleClick:function(e){var t=e.target;return t.hasClass("icon-toggle")?!1:(e.target.ancestor(".ygtvtable")?this.set("selectedItem",t.ancestor(".ygtvtable")):this.set("selectedItem",null),!0)},_afterSelectedItemChange:function(t){var n=t.newVal,r=t.prevVal,i=this.get("data"),s=null,o=null,u;return n===r?!1:(r&&(r.all("i")&&r.all("i").removeClass("icon-white"),r.removeClass("treeview-highlight")),e.Lang.isNull(n)===!1&&(u=n.getAttribute("data-yui3-record"),n.all("i")&&n.all("i").addClass("icon-white"),n.addClass("treeview-highlight"),s=i.getByClientId(u),o=i.getLeavesByClientId(u)),this.fire("select",{model:s,leaves:o}),!0)}},{ATTRS:{selectable:{setter:"_setSelectable",value:!1},selectedItem:{value:null}}}),e.namespace("Libbit.TreeView").Selectable=n},"1.0.0");
