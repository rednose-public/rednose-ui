YUI.add("rednose-toolbar-base",function(e,t){var n=e.Rednose.ButtonGroup,r="add",i="remove",s="reset",o=e.Base.create("toolbarBase",e.Base,[],{initializer:function(e){e||(e={}),this._buttonGroupMap=[],this._published={};if(e.groups)for(var t=0,n=e.groups.length;t<n;t++)this.add(e.groups[t])},destructor:function(){for(var e=0,t=this._buttonGroupMap.length;e<t;e++)this._buttonGroupMap[e].destroy();this._buttonGroupMap=null,this._published=null},add:function(e){return this._fireToolbarEvent(r,{group:e},{defaultFn:this._defAddFn})},remove:function(e){return this._fireToolbarEvent(i,{index:e},{defaultFn:this._defRemoveFn})},reset:function(e){return this._fireToolbarEvent(s,{groups:e},{defaultFn:this._defResetFn})},getButtonGroup:function(e){return this._buttonGroupMap[e]},getButtonById:function(e){for(var t=0,n=this._buttonGroupMap.length;t<n;t++){var r=this._buttonGroupMap[t];if(r.getButtonById(e))return r.getButtonById(e)}return null},enable:function(t){if(e.Lang.isArray(t))return e.each(t,function(e){this.enable(e)},this),this;var n=this.getButtonById(t);return n&&n.enable(),this},disable:function(t){if(e.Lang.isArray(t))return e.each(t,function(e){this.disable(e)},this),this;var n=this.getButtonById(t);return n&&n.disable(),this},activate:function(t){if(e.Lang.isArray(t))return e.each(t,function(e){this.activate(e)},this),this;var n=this.getButtonById(t);return n&&n.activate(),this},deactivate:function(t){if(e.Lang.isArray(t))return e.each(t,function(e){this.deactivate(e)},this),this;var n=this.getButtonById(t);return n&&n.deactivate(),this},toggleActive:function(e){var t=this.getButtonById(e);return t&&t.toggleActive(),this},rename:function(e,t){var n=this.getButtonById(e);return n&&n.rename(t),this},_createButtonGroup:function(e){var t=new n(e);return t.addTarget(this),this._buttonGroupMap.push(t),t},_destroyButtonGroup:function(e){var t=this._buttonGroupMap.indexOf(e);e.destroy(),e.removeTarget(this),delete this._buttonGroupMap[t]},_fireToolbarEvent:function(e,t,n){return n&&n.defaultFn&&!this._published[e]&&(this._published[e]=this.publish(e,{defaultFn:n.defaultFn})),this.fire(e,t),this},_defAddFn:function(e){this._createButtonGroup(e.group)},_defRemoveFn:function(e){var t=this._buttonGroupMap[e.index];this._destroyButtonGroup(t)},_defResetFn:function(e){var t=e.groups,n,r;for(n=0,r=this._buttonGroupMap.length;n<r;n++)this._buttonGroupMap[n].destroy();this._buttonGroupMap=[];for(n=0,r=t.length;n<r;n++)this.add(t[n])}});e.namespace("Rednose.Toolbar").Base=o},"1.5.0-DEV",{requires:["rednose-button-group","base"]});
