YUI.add("libbit-treeview",function(e,t){var n;n=e.Base.create("treeView",e.TreeView,[e.Libbit.TreeView.Anim,e.Libbit.TreeView.DD,e.Libbit.TreeView.Selectable],{_stateMap:[],initializer:function(e){e||(e={}),!e.model,e.nodes=e.model.get("items"),e.header&&(this.header=e.header),this._stateMap=[],this.set("model",e.model),this._attachEventHandles()},destructor:function(){this._detachEventHandles(),this._stateMap=null,this._destroyContainer()},render:function(){var t=this.get("container"),n="ontouchstart"in e.config.win,r=this.header,i=e.Node.create('<div class="libbit-treeview-inner-container"></div>');return t.addClass(this.classNames.treeview),t.addClass(this.classNames[n?"touch":"noTouch"]),t.addClass("libbit-treeview-outer-container"),t.append(i),r&&i.append('<div class="nav-header">'+r+"</div>"),this._childrenNode=this.renderChildren(this.rootNode,{container:i}),this.rendered=!0,this},icon:function(t){var n=t.data,r=this.get("model").get("icons"),i="libbit-treeview-icon"+(this.get("selectable")&&t.isSelected()?" icon-white":"");if(r&&n instanceof e.Model&&r[n.name]){var s=r[n.name];if(e.Lang.isString(s))return i+" "+s;if(e.Lang.isArray(s))return i+" "+(t.isOpen()?s[0]:s[1])}return i},generateLibbitRecordId:function(t){return t instanceof e.Model?t.name+"_"+t.get("id"):null},parseLibbitRecordId:function(e){return e.split("_")},_attachEventHandles:function(){this._eventHandles||(this._eventHandles=[]);var e=this.get("model");this._eventHandles.push(this.on("open",this._handleExpand,this),this.on("close",this._handleCollapse,this),this.after(["open","close"],this._handleToggle,this),e.after("change",this._handleModelChange,this))},_detachEventHandles:function(){(new e.EventHandle(this._eventHandles)).detach()},_restoreTreeOpenState:function(){var t=this,n=this.rootNode;n.hasChildren()&&this._stateMap&&this._stateMap.length>0&&e.Array.each(n.children,function(e){t._restoreNodeOpenState(e)})},_restoreNodeOpenState:function(t){var n=this.generateLibbitRecordId(t.data),r=this._stateMap.indexOf(n);r!==-1&&t.open({silent:!0}),t.hasChildren()&&e.Array.each(t.children,function(e){this._restoreNodeOpenState(e)},this)},_handleModelChange:function(){var t=this.get("model").get("items");this.clear(!1,{silent:!0});if(this.rendered){var n=this.get("container").get("childNodes");delete this._childrenNode,n.remove(),e.later(150,e,function(){n.destroy(!0)})}t&&(treeNodes=this.insertNode(this.rootNode,t,{silent:!0}),this._restoreTreeOpenState()),this.rendered&&this.render()},_handleToggle:function(e){var t=e.node,n=this.getHTMLNode(e.node);n.one(".libbit-treeview-icon").set("className",this.icon(t))},_handleExpand:function(e){var t=this.generateLibbitRecordId(e.node.data),n=this._stateMap.indexOf(t);n===-1&&this._stateMap.push(t)},_handleCollapse:function(e){var t=this.generateLibbitRecordId(e.node.data),n=this._stateMap.indexOf(t);n!==-1&&this._stateMap.splice(n,1)},_destroyContainer:function(){var e=this.get("container");e&&e.remove(!0)}}),e.namespace("Libbit").TreeView=n},"1.0.0",{requires:["gallery-sm-treeview","libbit-model-tree","libbit-treeview-anim","libbit-treeview-dd","libbit-treeview-templates","libbit-treeview-select","node"],supersedes:["gallery-sm-treeview-templates"],skinnable:!0});
