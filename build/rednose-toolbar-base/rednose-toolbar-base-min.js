YUI.add("rednose-toolbar-base",function(e,t){var n=e.Rednose.ButtonGroup,r="add",i="remove",s=e.Base.create("toolbarBase",e.Base,[],{initializer:function(e){e||(e={}),this._buttonGroupMap=[],this._published={};if(e.groups)for(var t=0,n=e.groups.length;t<n;t++)this.add(e.groups[t])},destructor:function(){for(var e=0,t=this._buttonGroupMap.length;e<t;e++)this._buttonGroupMap[e].destroy();this._buttonGroupMap=null,this._published=null},add:function(e){return this._fireToolbarEvent(r,{group:e},{defaultFn:this._defAddFn})},remove:function(e){return this._fireToolbarEvent(i,{index:e},{defaultFn:this._defRemoveFn})},getButtonGroup:function(e){return this._buttonGroupMap[e]},_createButtonGroup:function(e){var t=new n(e);return this._buttonGroupMap.push(t),t},_destroyButtonGroup:function(e){var t=this._buttonGroupMap.indexOf(e);e.destroy(),delete this._buttonGroupMap[t]},_fireToolbarEvent:function(e,t,n){return n&&n.defaultFn&&!this._published[e]&&(this._published[e]=this.publish(e,{defaultFn:n.defaultFn})),this.fire(e,t),this},_defAddFn:function(e){this._createButtonGroup(e.group)},_defRemoveFn:function(e){var t=this._buttonGroupMap[e.index];this._destroyButtonGroup(t)}});e.namespace("Rednose.Toolbar").Base=s},"1.4.0",{requires:["rednose-button-group","base"]});
