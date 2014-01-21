YUI.add("gallery-sm-tree",function(e,t){var n=e.Lang,r="add",i="clear",s="remove",o=e.Base.create("tree",e.Base,[],{nodeClass:e.Tree.Node,nodeExtensions:[],_isYUITree:!0,_rootNodeConfig:{canHaveChildren:!0},initializer:function(e){e||(e={}),e.nodeClass&&(this.nodeClass=e.nodeClass),e.nodeExtensions&&(this.nodeExtensions=this.nodeExtensions.concat(e.nodeExtensions)),this._published||(this._published={}),this._nodeMap={},this.onceAfter("initializedChange",function(){this._composeNodeClass(),this.clear(e.rootNode,{silent:!0}),e.nodes&&this.insertNode(this.rootNode,e.nodes,{silent:!0})})},destructor:function(){this.destroyNode(this.rootNode,{silent:!0}),this.children=null,this.rootNode=null,this._nodeClass=null,this._nodeMap=null,this._published=null},appendNode:function(t,n,r){return this.insertNode(t,n,e.merge(r,{index:t.children.length,src:"append"}))},clear:function(e,t){return this._fire(i,{rootNode:this.createNode(e||this._rootNodeConfig)},{defaultFn:this._defClearFn,silent:t&&t.silent})},createNode:function(t){t||(t={});if(t._isYUITreeNode)return this._adoptNode(t),t;if(t.children){var n=[];for(var r=0,i=t.children.length;r<i;r++)n.push(this.createNode(t.children[r]));t=e.merge(t,{children:n})}var s=new this._nodeClass(this,t);return this._nodeMap[s.id]=s},destroyNode:function(e,t){var n,r,i;t||(t={});for(r=0,i=e.children.length;r<i;r++)n=e.children[r],n.parent=null,this.destroyNode(n,t);return e.parent&&this.removeNode(e,t),e.children=null,e.data=null,e.state={destroyed:!0},e.tree=null,e._htmlNode=null,e._indexMap=null,delete this._nodeMap[e.id],this},emptyNode:function(e,t){var n=[];while(e.children.length)n.push(this.removeNode(e.children[0],t));return n},getNodeById:function(e){return this._nodeMap[e]},insertNode:function(e,t,i){i||(i={}),e||(e=this.rootNode);var s=i.index;typeof s=="undefined"&&(s=e.children.length);if("length"in t&&n.isArray(t)){var o=[];for(var u=0,a=t.length;u<a;u++)o.push(this.insertNode(e,t[u],i)),"index"in i&&(i.index+=1);return o}return t=this.createNode(t),this._fire(r,{index:s,node:t,parent:e,src:i.src||"insert"},{defaultFn:this._defAddFn,silent:i.silent}),t},prependNode:function(t,n,r){return this.insertNode(t,n,e.merge(r,{index:0,src:"prepend"}))},removeNode:function(e,t){return t||(t={}),this._fire(s,{destroy:!!t.destroy,node:e,parent:e.parent,src:t.src||"remove"},{defaultFn:this._defRemoveFn,silent:t.silent}),e},size:function(){return this.rootNode.size()},toJSON:function(){return this.rootNode.toJSON()},_adoptNode:function(e,t){var n=e.tree;if(n===this)return;for(var r=0,i=e.children.length;r<i;r++)this._adoptNode(e.children[r],{silent:!0});n.removeNode(e,t),delete n._nodeMap[e.id];if(!(e instanceof this._nodeClass)||n._nodeClass!==this._nodeClass)e=this.createNode(e.toJSON());e.tree=this,this._nodeMap[e.id]=e},_composeNodeClass:function(){var t=this.nodeClass,n=this.nodeExtensions,r;if(typeof t=="string"){t=e.Object.getValue(e,t.split("."));if(!t){e.error("Tree: Node class not found: "+t);return}this.nodeClass=t}if(!n.length){this._nodeClass=t;return}r=function(){var e=r._nodeExtensions;t.apply(this,arguments);for(var n=0,i=e.length;n<i;n++)e[n].apply(this,arguments)},e.extend(r,t);for(var i=0,s=n.length;i<s;i++)e.mix(r.prototype,n[i].prototype,!0);r._nodeExtensions=n,this._nodeClass=r},_fire:function(e,t,n){return n&&n.silent?n.defaultFn&&n.defaultFn.call(this,t):(n&&n.defaultFn&&!this._published[e]&&(this._published[e]=this.publish(e,{defaultFn:n.defaultFn})),this.fire(e,t)),this},_removeNodeFromParent:function(e){var t=e.parent,n;t&&(n=t.indexOf(e),n>-1&&(t.children.splice(n,1),t._isIndexStale=!0,e.parent=null))},_defAddFn:function(e){var t=e.node,n=e.parent;t.parent&&this._removeNodeFromParent(t),t.parent=n,n.children.splice(e.index,0,t),n.canHaveChildren=!0,n._isIndexStale=!0},_defClearFn:function(e){var t=e.rootNode;this.rootNode&&this.destroyNode(this.rootNode,{silent:!0}),this._nodeMap={},this._nodeMap[t.id]=t,this.rootNode=t,this.children=t.children},_defRemoveFn:function(e){var t=e.node;e.destroy?this.destroyNode(t,{silent:!0}):e.parent?this._removeNodeFromParent(t):this.rootNode===t&&(this.rootNode=this.createNode(this._rootNodeConfig),this.children=this.rootNode.children)}});e.Tree=e.mix(o,e.Tree)},"1.1.0-DEV",{requires:["base-build","gallery-sm-tree-node"]});
