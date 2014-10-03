YUI.add("rednose-treeview",function(e,t){var n=e.Base.create("treeView",e.TreeView,[e.TreeView.Sortable,e.Rednose.Tree.Comparable,e.Rednose.Tree.Icon,e.Rednose.TreeView.Anim,e.Rednose.TreeView.DD,e.Rednose.TreeView.Selectable],{templates:e.Rednose.TreeView.Templates,rednoseClassNames:{outer:"rednose-treeview-outer-container",inner:"rednose-treeview-inner-container",icon:"rednose-treeview-icon",header:"nav-header"},initializer:function(t){t||(t={}),e.mix(this.classNames,this.rednoseClassNames,!0),t.sortComparator||(t.sortComparator=function(e){return e.label.toLowerCase()}),t.header&&(this.header=t.header),this._attachEventHandles(),this.onceAfter("initializedChange",function(){t.nodes&&(this.set("nodes",t.nodes),delete t.nodes)})},destructor:function(){this._destroyContainer()},render:function(){var t=this.get("container"),n="ontouchstart"in e.config.win,r=this.header,i=e.Node.create('<div class="'+this.classNames.inner+'"></div>');return t.addClass(this.classNames.treeview),t.addClass(this.classNames[n?"touch":"noTouch"]),t.addClass(this.classNames.outer),t.append(i),r&&i.append('<div class="'+this.classNames.header+'">'+r+"</div>"),this._childrenNode=this.renderChildren(this.rootNode,{container:i}),this.rendered=!0,this},open:function(e){e||(e=this.rootNode);if(e.hasChildren()){e.open();for(var t=0,n=e.children.length;t<n;t++)this.open(e.children[t])}},renameNode:function(e,t){e.label=t;var n;(n=e._htmlNode.one("."+this.classNames.label))&&n.set("text",e.label)},_attachEventHandles:function(){this._treeViewEvents||(this._treeViewEvents=[]),this._treeViewEvents.push(this.after(["open","close"],this._afterToggle,this))},_destroyContainer:function(){var e=this.get("container");e&&e.remove(!0)},_setNodes:function(e){this.clear(null,{silent:!1}),e&&this.insertNode(this.rootNode,e,{silent:!1})},_getNodes:function(){return this.rootNode.toJSON().children||[]},_afterToggle:function(e){if(this.rendered===!1)return;var t=e.node,n=this.getHTMLNode(e.node);t.icon&&n.one("."+this.classNames.icon).set("className",this.classNames.icon+" "+t.getIcon())}},{ATTRS:{nodes:{value:[],setter:"_setNodes",getter:"_getNodes"}}});e.Rednose.TreeView=e.mix(n,e.Rednose.TreeView)},"1.6.0-dev",{requires:["gallery-sm-treeview-sortable","rednose-tree","rednose-treeview-anim","rednose-treeview-datasource","rednose-treeview-dd","rednose-treeview-templates","rednose-treeview-select","node"],supersedes:["gallery-sm-treeview-templates"],rollup:1});
