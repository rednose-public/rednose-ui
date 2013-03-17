YUI.add("libbit-treeview",function(e,t){var n;n=e.Base.create("treeView",e.TreeView,[e.Libbit.TreeView.Anim,e.Libbit.TreeView.DD,e.Libbit.TreeView.Selectable],{_stateMap:[],initializer:function(e){e.nodes=e.model.get("items"),e.header&&(this.header=e.header),this.set("model",e.model),this._attachEventHandles()},destructor:function(){this._detachEventHandles();for(var e in this._stateMap)delete this._stateMap[e];this.get("container").remove().destroy(!0)},render:function(){var t=this.get("container"),n="ontouchstart"in e.config.win,r=this.header;if(!this.rendered){var i=e.Node.create('<div class="libbit-treeview-inner-container"></div>');t.addClass("libbit-treeview-outer-container"),t.append(i),t.addClass(this.classNames.treeview),t.addClass(this.classNames[n?"touch":"noTouch"]),r&&i.append('<div class="nav-header">'+r+"</div>")}return this._childrenNode=this.renderChildren(this.rootNode,{container:t.one(".libbit-treeview-inner-container")}),this.rendered=!0,this},icon:function(t){var n=t.data,r=this.get("model").get("icons"),i="libbit-treeview-icon"+(t.isSelected()?" icon-white":"");if(r&&n instanceof e.Model&&r[n.name]){var s=r[n.name];if(e.Lang.isString(s))return i+" "+s;if(e.Lang.isArray(s))return i+" "+(t.isOpen()?s[0]:s[1])}return i},generateLibbitRecordId:function(t){return t instanceof e.Model?t.name+"_"+t.get("id"):null},parseLibbitRecordId:function(e){return e.split("_")},_attachEventHandles:function(){this._eventHandles||(this._eventHandles=[]);var e=this.get("model");this._eventHandles.push(this.on("open",this._handleExpand,this),this.on("close",this._handleCollapse,this),this.after(["open","close"],this._handleToggle,this),e.after("change",this._handleModelChange,this))},_detachEventHandles:function(){(new e.EventHandle(this._eventHandles)).detach()},_restoreTreeOpenState:function(){var t=this,n=this.rootNode;n.hasChildren()&&this._stateMap&&this._stateMap.length>0&&e.Array.each(n.children,function(e){t._restoreNodeOpenState(e)})},_restoreNodeOpenState:function(t){var n=this.generateLibbitRecordId(t.data),r=e.Array.indexOf(this._stateMap,n);r!==-1&&t.open({silent:!0}),t.hasChildren()&&e.Array.each(t.children,function(e){this._restoreNodeOpenState(e)},this)},_handleToggle:function(e){var t=e.node,n=this.getHTMLNode(e.node);n.one(".libbit-treeview-icon").set("className",this.icon(t))},_handleExpand:function(t){var n=this.generateLibbitRecordId(t.node.data),r=e.Array.indexOf(this._stateMap,n);r===-1&&this._stateMap.push(n)},_handleCollapse:function(t){var n=this.generateLibbitRecordId(t.node.data),r=e.Array.indexOf(this._stateMap,n);r!==-1&&this._stateMap.splice(r,1)},_handleModelChange:function(){var e=this.get("model").get("items");this.clear({silent:!0});if(e){var t=this.insertNode(this.rootNode,e,{silent:!0});this._restoreTreeOpenState(t)}this.rendered&&this.render()}},{ATTRS:{filter:{value:null}}}),e.namespace("Libbit").TreeView=n},"1.0.0",{requires:["gallery-sm-treeview","libbit-model-tree","libbit-treeview-anim","libbit-treeview-dd","libbit-treeview-templates","libbit-treeview-select"],supersedes:["gallery-sm-treeview-templates"],skinnable:!0});
