YUI.add("rednose-tree-icon",function(e,t){function n(){}function r(e,t){this._serializable=this._serializable.concat("icon"),"icon"in t&&(this.icon=t.icon)}n.prototype={initializer:function(){this.nodeExtensions=this.nodeExtensions.concat(e.Rednose.Tree.Node.Icon)}},e.namespace("Rednose.Tree").Icon=n,r.prototype={getIcon:function(){return e.Lang.isArray(this.icon)?this.isOpen()?this.icon[0]:this.icon[1]:this.icon}},e.namespace("Rednose.Tree.Node").Icon=r},"1.5.0-DEV",{requires:["tree"]});