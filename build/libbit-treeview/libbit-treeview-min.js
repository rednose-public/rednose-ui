YUI.add("libbit-treeview",function(e,t){var n;n=e.Base.create("treeView",e.Widget,[e.Libbit.TreeView.Anim,e.Libbit.TreeView.Filter,e.Libbit.TreeView.DD],{_stateMap:[],_treeNodes:[],selectedNode:null,_iconMap:[],afterEvent:null,openEvent:null,closeEvent:null,selectEvent:null,initializer:function(){var e=this.get("contentBox"),t=this.get("width"),n=this.get("height"),r=this.get("data");e.setStyle("width",t),e.setStyle("height",n),e.setStyle("overflow","auto"),r.get("icons")&&(this._iconMap=r.get("icons")),r&&(this.afterEvent=r.after("load",this._refresh,this))},getNodes:function(){return this._treeNodes},renderUI:function(){var t=this.get("srcNode"),n=e.Node.create('<div class="libbit-treeview-content"></div>'),r=e.stamp(n);n.set("id",r),t.append(n),this.set("treeContainer",n),this._renderTree()},_renderTree:function(){var t=this.get("data"),n;items=t.get("items"),this._treeNodes=[];if(this.get("tree")){n=this.get("tree"),this.openEvent.detach(),this.closeEvent.detach(),this.selectEvent.detach();while(n.rootNode.children.length>0)n.removeNode(n.rootNode.children[0]);for(var r in items)n.insertNode(n.rootNode,items[r])}else n=new e.TreeView({container:this.get("srcNode"),nodes:items}),this.set("tree",n);n.render(),this._processTree(n.rootNode),this._bindEvents()},_bindEvents:function(){var t=this.get("tree"),n=this;t.on("select",function(r){var i=r.node,s=t.getHTMLNode(i),o=i.data;n.get("boundingBox").all(".icon-white").removeClass("icon-white"),e.instanceOf(o,e.Model)&&typeof n._iconMap[o.name]!="undefined"&&(s.addClass("libbit-item-selected"),s.one(".icon").addClass("icon-white")),n.fire("select",{data:s.getData()})}),this.openEvent=t.on("open",function(e){var r=t.getHTMLNode(e.node);n._stateMap.push(parseInt(r.getAttribute("data-yui3-modelId"))),n.fire("expend",e)}),this.closeEvent=t.on("close",function(r){var i=t.getHTMLNode(r.node),s=e.Array.indexOf(n._stateMap,parseInt(i.getAttribute("data-yui3-modelId")));delete n._stateMap[s],n.fire("collapse",r)}),this.selectEvent=t.on("select",function(e){var r=t.getHTMLNode(e.node);n.selectedNode=parseInt(r.getAttribute("data-yui3-modelId")),n.fire("nodeSelected",e)}),this.fire("Finished")},bindUI:function(){var e=this.get("tree");e.on(["open","close"],function(t){var n=e.getHTMLNode(t.node).one(".icon-folder-close");t.type=="treeView:close"&&(n=e.getHTMLNode(t.node).one(".icon-folder-open")),n&&(t.type=="treeView:close"?(n.removeClass("icon-folder-open"),n.addClass("icon-folder-close")):(n.removeClass("icon-folder-close"),n.addClass("icon-folder-open")))})},_refresh:function(){this._renderTree(),this.fire("refresh")},_processTree:function(t){var n=this,r=this.get("tree");t.children.length&&t.open();for(var i in t.children){var s=t.children[i],o=r.getHTMLNode(s);model=s.data,n._treeNodes.push(s);var u=o.get("parentNode").getStyle("margin-left"),a=Number(u.substring(0,u.length-2));a&&(o.setStyle("margin-left",-a),o.one("div").setStyle("padding-left",a*2)),e.instanceOf(model,e.Model)&&(o.setAttribute("data-yui3-modelId",model.get("id")),o.setAttribute("data-yui3-record",model.get("clientId")),typeof n._iconMap[model.name]!="undefined"&&n._setIcon(o,n._iconMap[model.name]),o.setData({model:model})),s.children&&n._processTree(s)}t!==r.rootNode&&(e.Array.indexOf(n._stateMap,t.data.get("id"))===-1&&t.close(),n.selectedNode===t.data.get("id")&&t.select())},_setIcon:function(e,t){e&&(iconNode=e.one(".yui3-treeview-icon"),iconNode&&(iconNode.removeClass("yui3-treeview-icon"),iconNode.addClass(t),iconNode.addClass("icon")))}},{ATTRS:{data:{value:null},tree:{value:null},width:{value:null},height:{value:null},renderLeaves:{value:!0},iconClicked:{value:!1}}}),e.namespace("Libbit").TreeView=n},"1.0.0",{requires:["transition","libbit-model-tree","libbit-treeview-filter","libbit-treeview-anim","libbit-treeview-select","libbit-treeview-dd","widget","gallery-sm-treeview"],skinnable:!0});
