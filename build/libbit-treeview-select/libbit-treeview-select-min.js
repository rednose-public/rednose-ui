YUI.add("libbit-treeview-select",function(e,t){var n;n=e.Base.create("selectable",e.Base,[],{selectEvent:null,initializer:function(){this.after("render",this._afterRender,this)},_afterRender:function(){var t=this;this.selectEvent&&this.selectEvent.detach(),t.get("selectable")?(this.get("tree").on("select",function(n){var r=n.node,i=t.get("tree").getHTMLNode(r),s=r.data;t.get("boundingBox").all(".icon-white").removeClass("icon-white"),e.instanceOf(s,e.Model)&&typeof t._iconMap[s.name]!="undefined"&&(i.addClass("libbit-item-selected"),i.one(".libbit-treeview-icon").addClass("icon-white")),t.fire("select",{data:i.getData()})}),t.selectEvent=t.get("tree").on("select",function(e){var n=t.get("tree").getHTMLNode(e.node);t.selectedNode=parseInt(n.getAttribute("data-yui3-modelId")),t.fire("nodeSelected",e)})):t.get("tree").detach("select",t.get("tree")._afterSelect)}},{ATTRS:{selectable:{value:!0}}}),e.namespace("Libbit.TreeView").Selectable=n},"1.0.0");
