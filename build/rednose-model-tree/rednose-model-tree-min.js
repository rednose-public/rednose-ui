YUI.add("rednose-model-tree",function(e,t){var n;n=e.Base.create("modelTree",e.Model,[],{_items:[],getByType:function(e){var t=this._items;return this._treeFindByType(e,t)},getByAttr:function(e,t,n){var r=this._items,i=this._treeFind(n,r,t,e);return i?i.data:null},filterByAttr:function(e,t,n){var r=this._items;return this._treeFilter(n,r,t,e)},getByClientId:function(e){var t=this._items,n=this._treeFind(e,t);return n?n.data:null},getLeavesByClientId:function(t){var n=this._items,r=this._treeFind(t,n),i=[];return e.Array.each(r.children,function(t){e.Lang.isArray(t.children)===!1&&i.push(t.data)}),i},getBranches:function(){var e=this._items,t=this._findBranches(e);return t},_findBranches:function(t){var n=this,r=[];return e.Array.each(t,function(t){var i={};e.instanceOf(t.data,e.TB.Category)&&(i.label=t.label,i.data=t.data,t.children&&(i.children=n._findBranches(t.children)),r.push(i))}),r},_treeFind:function(t,n,r,i){var s=this,o=null;return r=r||"clientId",e.Array.each(n,function(n){n.data.get(r)===t&&(!i||n.data.name===i)&&(o=n),e.Lang.isNull(o)&&n.children&&(o=s._treeFind(t,n.children,r,i))}),o},_treeFindByType:function(t,n,r){var i=this;return r=r||[],e.Array.each(n,function(e){e.data.name===t&&r.push(e.data),e.children&&(r=i._treeFindByType(t,e.children,r))}),r},_treeFilter:function(t,n,r,i){var s=this,o=[];return r=r||"clientId",e.Array.each(n,function(n){var u={};if(n.data.name!==i||e.Array.indexOf(t,n.data.get(r))!==-1)u.label=n.label,u.data=n.data,n.children&&(u.children=s._treeFilter(t,n.children,r,i)),o.push(u)}),o},_setItems:function(e){this._items=e},_getItems:function(){var e=this.get("filter");return e&&e.type?this.filterByAttr(e.type,e.attr,e.value):this._items}},{ATTRS:{items:{setter:"_setItems",getter:"_getItems"},filter:{value:{}}}}),e.namespace("Rednose").ModelTree=n},"1.3.0",{requires:["model","io"]});
