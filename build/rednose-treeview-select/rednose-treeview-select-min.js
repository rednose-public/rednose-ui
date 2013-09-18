YUI.add("rednose-treeview-select",function(e,t){var n,r="rednose-treeview-icon",i="icon-white";n=e.Base.create("selectable",e.Base,[],{_selectMap:[],initializer:function(){this.on("select",this._handleSelectState,this),this.on("unselect",this._handleUnSelectState,this),this.after("select",this._handleSelect,this),this.after("unselect",this._handleUnselect,this),this.after("selectableChange",this._afterChange,this),e.Do.after(this._restoreSelectState,this,"render")},destructor:function(){this._selectMap=null},getSelection:function(){var t=[];return e.Array.each(this.getSelectedNodes(),function(e){t.push(e.data)}),t},_restoreSelectState:function(){var t=this.get("container"),n=this;this._selectMap&&this._selectMap.length>0&&e.Array.each(this._selectMap,function(e){var r=n.parseRednoseRecordId(e);t.all("[data-rednose-type="+r[0]+"]").each(function(e){e.getData("rednose-id")===r[1]&&n.getNodeById(e.getData("node-id")).select()})})},_handleSelect:function(t){var n=this.getHTMLNode(t.node),s=t.node.data,o=this.get("model").get("icons");o&&s instanceof e.Model&&o[s.name]&&n.one("."+r).addClass(i)},_handleUnselect:function(e){var t=this.getHTMLNode(e.node);t.one("."+r).hasClass(i)&&t.one("."+r).removeClass(i)},_handleSelectState:function(e){var t=this.generateRednoseRecordId(e.node.data),n=this._selectMap.indexOf(t),r=this.get("selectable");r||e.stopImmediatePropagation(),r&&n===-1&&this._selectMap.push(t)},_handleUnSelectState:function(e){var t=this.generateRednoseRecordId(e.node.data),n=this._selectMap.indexOf(t);n!==-1&&this._selectMap.splice(n,1)},_afterChange:function(){this.unselect()}},{ATTRS:{selectable:{value:!0}}}),e.namespace("Rednose.TreeView").Selectable=n},"1.1.0-DEV",{group:"rednose-ui",requires:["rednose-treeview"]});
