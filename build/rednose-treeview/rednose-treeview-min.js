YUI.add("rednose-treeview",function(e,t){var n,r="rednose-treeview-outer-container",i="rednose-treeview-inner-container",s="rednose-treeview-icon",o="icon-white",u="nav-header";n=e.Base.create("treeView",e.TreeView,[e.Rednose.TreeView.Anim,e.Rednose.TreeView.DD,e.Rednose.TreeView.Selectable],{_stateMap:[],initializer:function(t){t||(t={});var n=t.model||new e.Rednose.ModelTree;t.nodes=n.get("items"),t.header&&(this.header=t.header),this._stateMap=[],this.set("model",n),this._attachEventHandles()},destructor:function(){this._detachEventHandles(),this._stateMap=null,this._destroyContainer()},render:function(){var t=this.get("container"),n="ontouchstart"in e.config.win,s=this.header,o=e.Node.create('<div class="'+i+'"></div>');return t.addClass(this.classNames.treeview),t.addClass(this.classNames[n?"touch":"noTouch"]),t.addClass(r),t.append(o),s&&o.append('<div class="'+u+'">'+s+"</div>"),this._childrenNode=this.renderChildren(this.rootNode,{container:o}),this.rendered=!0,this},icon:function(t){var n=t.data,r=this.get("model").get("icons"),i=s;if(r&&n instanceof e.Model&&r[n.name]){var u=r[n.name];this.get("selectable")&&t.isSelected()&&(i+=" "+o);if(e.Lang.isString(u))return i+" "+u;if(e.Lang.isArray(u))return i+" "+(t.isOpen()?u[0]:u[1])}return e.Lang.isString(t.icon)?i+" "+t.icon:i},generateRednoseRecordId:function(t){return t instanceof e.Model?t.name+"_"+t.get("id"):null},parseRednoseRecordId:function(e){return e.split("_")},_attachEventHandles:function(){this._eventHandles||(this._eventHandles=[]);var t=this.get("model");this._eventHandles.push(this.on("open",this._handleExpand,this),this.on("close",this._handleCollapse,this),this.after(["open","close"],this._handleToggle,this),t.after("change",this._handleModelChange,this),e.Do.after(this._afterRender,this,"render",this),this.after("open",this._handleMarginCorrection,this))},_detachEventHandles:function(){(new e.EventHandle(this._eventHandles)).detach()},_restoreTreeOpenState:function(){var t=this,n=this.rootNode;n.hasChildren()&&this._stateMap&&this._stateMap.length>0&&e.Array.each(n.children,function(e){t._restoreNodeOpenState(e)})},_restoreNodeOpenState:function(t){var n=this.generateRednoseRecordId(t.data),r=this._stateMap.indexOf(n);r!==-1&&t.open({silent:!0}),t.hasChildren()&&e.Array.each(t.children,function(e){this._restoreNodeOpenState(e)},this)},_destroyContainer:function(){var e=this.get("container");e&&e.remove(!0)},_getHTMLNodeDepth:function(e){var t=this,n;return n=e.ancestors(function(e){return e.hasClass(t.classNames.node)}),n.size()},_correctMargin:function(e){var t=this._getHTMLNodeDepth(e);e.setStyle("margin-left",t*-20),e.one("."+this.classNames.indicator).setStyle("margin-left",t*20),e.one("."+s)&&e.one("."+s).setStyle("margin-left",t*20),this._correctChildrenMargin(e)},_correctChildrenMargin:function(e){var t=this._getHTMLNodeDepth(e);e.one("."+this.classNames.children)&&e.one("."+this.classNames.children).setStyle("margin-left",20+t*20)},_handleModelChange:function(){var t=this.get("model").get("items");this.clear(!1,{silent:!0});if(this.rendered){var n=this.get("container").get("childNodes");delete this._childrenNode,n.remove(),e.later(150,e,function(){n.destroy(!0)})}t&&(treeNodes=this.insertNode(this.rootNode,t,{silent:!0}),this._restoreTreeOpenState()),this.rendered&&this.render()},_handleToggle:function(e){if(this.rendered===!1)return;var t=e.node,n=this.getHTMLNode(e.node);n.one("."+s).set("className",this.icon(t)),n.hasClass("yui3-treeview-selected")&&n.one("."+s).addClass(o)},_handleExpand:function(e){var t=this.generateRednoseRecordId(e.node.data),n=this._stateMap.indexOf(t);n===-1&&this._stateMap.push(t)},_handleCollapse:function(e){var t=this.generateRednoseRecordId(e.node.data),n=this._stateMap.indexOf(t);n!==-1&&this._stateMap.splice(n,1)},_afterRender:function(){var e=this.get("container").all("."+this.classNames.node),t=this;e.each(function(e){t._correctMargin(e)})},_handleMarginCorrection:function(t){var n=t.node,r=this;this.rendered&&(this._correctChildrenMargin(r.getHTMLNode(n)),e.Array.each(n.children,function(e){r._correctMargin(r.getHTMLNode(e))}))}}),e.namespace("Rednose").TreeView=n},"1.1.0-DEV",{requires:["gallery-sm-treeview","rednose-model-tree","rednose-treeview-anim","rednose-treeview-dd","rednose-treeview-templates","rednose-treeview-select","node"],supersedes:["gallery-sm-treeview-templates"],rollup:1,skinnable:!0});
