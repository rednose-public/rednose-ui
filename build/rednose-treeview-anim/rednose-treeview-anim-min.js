YUI.add("rednose-treeview-anim",function(e,t){var n=e.Base.create("anim",e.Base,[],{initializer:function(){this.after("open",this._afterExpand,this),this.after("close",this._afterCollapse,this)},_getChildrenElement:function(t){var n=this.getHTMLNode(t);return e.Node("#"+n.getAttribute("id")).one("ul")},_afterCollapse:function(t){if(!this.rendered||!this.get("animated"))return;var n=t.node,r=this._getChildrenElement(n);r.setStyle("display","block"),e.Rednose.Anim.slideInY(r)},_afterExpand:function(t){if(!this.rendered||!this.get("animated"))return;var n=t.node,r=this._getChildrenElement(n);r.ancestor(".yui3-treeview").setStyle("overflow","hidden"),r.setStyle("display","block"),e.Rednose.Anim.slideOutY(r)}},{ATTRS:{animated:{value:!0}}});e.namespace("Rednose.TreeView").Anim=n},"1.5.0-DEV",{requires:["rednose-anim","transition"]});
