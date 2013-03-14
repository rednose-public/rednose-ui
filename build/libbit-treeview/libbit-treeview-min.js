YUI.add("libbit-treeview",function(e,t){var n;n=e.Base.create("treeView",e.Widget,[e.Libbit.TreeView.Selectable,e.Libbit.TreeView.Anim,e.Libbit.TreeView.Filter,e.Libbit.TreeView.DD],{_stateMap:[],_treeNodes:[],selectedNode:null,_iconMap:[],afterEvent:null,openEvent:null,closeEvent:null,initializer:function(){var e=this.get("contentBox"),t=this.get("width"),n=this.get("height"),r=this.get("data");e.setStyle("width",t),e.setStyle("height",n),e.setStyle("overflow","auto"),r.get("icons")&&(this._iconMap=r.get("icons"))},getNodes:function(){return this._treeNodes},renderUI:function(){this.get("boundingBox").addClass("libbit-treeview-outer-container"),this.get("srcNode").addClass("libbit-treeview-inner-container"),this.get("header")&&this.get("srcNode").prepend('<div class="nav-header">'+this.get("header")+"</div>"),this._renderTree()},_renderTree:function(){var t=this.get("data"),n;items=t.get("items"),this._treeNodes=[];if(this.get("tree")){n=this.get("tree"),this.openEvent.detach(),this.closeEvent.detach();while(n.rootNode.children.length>0)n.removeNode(n.rootNode.children[0]);for(var r in items)n.insertNode(n.rootNode,items[r])}else n=new e.TreeView({container:this.get("srcNode"),nodes:items}),this.set("tree",n);n.render(),this._processTree(n.rootNode),this._bindEvents()},_bindEvents:function(){var t=this.get("tree"),n=this;this.openEvent=t.on("open",function(e){var r=t.getHTMLNode(e.node);n._stateMap.push(parseInt(r.getAttribute("data-yui3-modelId"))),n.fire("expend",e)}),this.closeEvent=t.on("close",function(r){var i=t.getHTMLNode(r.node),s=e.Array.indexOf(n._stateMap,parseInt(i.getAttribute("data-yui3-modelId")));delete n._stateMap[s],n.fire("collapse",r)}),this.fire("Finished")},bindUI:function(){var e=this.get("tree");e.on(["open","close"],function(t){var n=e.getHTMLNode(t.node).one(".icon-folder-close");t.type=="treeView:close"&&(n=e.getHTMLNode(t.node).one(".icon-folder-open")),n&&(t.type=="treeView:close"?(n.removeClass("icon-folder-open"),n.addClass("icon-folder-close")):(n.removeClass("icon-folder-close"),n.addClass("icon-folder-open")))})},refresh:function(){this.fire("beforeRefresh"),this._renderTree(),this.fire("refresh")},_processTree:function(t){var n=this,r=this.get("tree");t.children.length&&t.open();for(var i in t.children){var s=t.children[i],o=r.getHTMLNode(s);model=s.data,n._treeNodes.push(s);var u=0,a=o.ancestor(".yui3-treeview-children");while(a.ancestor(".yui3-treeview-children"))u++,a=a.ancestor(".yui3-treeview-children");if(u>0){var f=u*20;f&&(o.setStyle("marginLeft",-f),o.one("div").setStyle("paddingLeft",f+20),o.ancestor(".yui3-treeview-children").setStyle("marginLeft",f),o.one(".yui3-treeview-indicator").setStyle("marginLeft",f))}e.instanceOf(model,e.Model)&&(o.setAttribute("data-yui3-modelId",model.get("id")),o.setAttribute("data-yui3-record",model.get("clientId")),typeof n._iconMap[model.name]!="undefined"&&n._setIcon(o,n._iconMap[model.name]),o.setData({model:model})),s.children&&n._processTree(s)}t!==r.rootNode&&(e.Array.indexOf(n._stateMap,t.data.get("id"))===-1&&t.close(),n.selectedNode===t.data.get("id")&&t.select())},_setIcon:function(e,t){e&&(iconNode=e.one(".yui3-treeview-icon"),iconNode&&(iconNode.removeClass("yui3-treeview-icon"),iconNode.addClass(t),iconNode.addClass("libbit-treeview-icon")))}},{ATTRS:{header:{value:null},data:{value:null},tree:{value:null},width:{value:null},height:{value:null},renderLeaves:{value:!0},iconClicked:{value:!1}}}),e.namespace("Libbit").TreeView=n},"1.0.0",{requires:["transition","libbit-model-tree","libbit-treeview-filter","libbit-treeview-anim","libbit-treeview-select","libbit-treeview-dd","widget","gallery-sm-treeview"],skinnable:!0});
