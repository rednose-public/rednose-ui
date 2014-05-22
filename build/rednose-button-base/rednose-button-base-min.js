YUI.add("rednose-button-base",function(e,t){var n="enable",r="disable",i="show",s="hide",o="rename",u="activate",a="deactivate",f=e.Base.create("buttonBase",e.Base,[],{initializer:function(t){this._published={},this.type=t.type||"default",this.disabled=t.disabled||!1,this.hidden=t.hidden||!1,this.active=t.active||!1,e.mix(this,t)},destructor:function(){this._published=null},enable:function(){return this.isDisabled()&&this._fireButtonEvent(n,{button:this},{defaultFn:this._defEnableFn}),this},disable:function(){return this.isDisabled()||this._fireButtonEvent(r,{button:this},{defaultFn:this._defDisableFn}),this},show:function(){return this._fireButtonEvent(i,{button:this},{defaultFn:this._defShowFn}),this},hide:function(){return this._fireButtonEvent(s,{button:this},{defaultFn:this._defHideFn}),this},activate:function(){return this.isActive()||this._fireButtonEvent(u,{button:this},{defaultFn:this._defActivateFn}),this},deactivate:function(){return this.isActive()&&this._fireButtonEvent(a,{button:this},{defaultFn:this._defDeactivateFn}),this},toggleActive:function(){return this[this.isActive()?"deactivate":"activate"]()},rename:function(e){return this._fireButtonEvent(o,{button:this,value:e},{defaultFn:this._defRenameFn})},isDisabled:function(){return this.disabled===!0},isActive:function(){return this.active===!0},_fireButtonEvent:function(e,t,n){return n&&n.defaultFn&&!this._published[e]&&(this._published[e]=this.publish(e,{defaultFn:n.defaultFn})),this.fire(e,t),this},_defDisableFn:function(){this.disabled=!0},_defEnableFn:function(){this.disabled=!1},_defShowFn:function(e){this.visible=!1},_defShowFn:function(e){this.visible=!0},_defActivateFn:function(){this.active=!0},_defDeactivateFn:function(){this.active=!1},_defRenameFn:function(e){this.value=e.value}});e.namespace("Rednose.Button").Base=f},"1.5.0-DEV",{requires:["base"]});
