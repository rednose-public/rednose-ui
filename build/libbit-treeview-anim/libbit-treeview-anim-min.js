YUI.add("libbit-treeview-anim",function(e,t){var n;n=e.Base.create("anim",e.Base,[],{initializer:function(){this.after("open",this._afterExpand,this),this.after("close",this._afterCollapse,this)},_afterCollapse:function(t){var n=t.node,r=this._getChildrenElement(n);r.setStyle("display","block"),e.Libbit.Anim.slideInY(r)},_afterExpand:function(t){var n=t.node,r=this._getChildrenElement(n);r.ancestor(".yui3-treeview").setStyle("overflow","hidden"),r.setStyle("display","block"),e.Libbit.Anim.slideOutY(r)},_getChildrenElement:function(t){var n=this.getHTMLNode(t);return e.Node("#"+n.getAttribute("id")).one("ul")}}),e.namespace("Libbit.TreeView").Anim=n},"1.0.0",{requires:["libbit-anim","libbit-treeview"]});
