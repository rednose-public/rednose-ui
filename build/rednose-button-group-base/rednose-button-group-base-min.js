YUI.add("rednose-button-group-base",function(e,t){var n="reset",r=e.Base.create("buttonGroupBase",e.Base,[],{initializer:function(e){this._published={},e.buttons&&this.reset(e.buttons)},destructor:function(){if(this._buttonMap&&this._buttonMap.length>0)for(var e=0;e<this._buttonMap.length;e++)this._destroyButton(this._buttonMap[e]);this._buttonMap=null,this._published=null},reset:function(e){return this._published[n]||(this._published[n]=this.publish(n,{defaultFn:this._defResetFn})),this.fire(n,{buttons:e}),this},getButtonById:function(e){return this._buttonMap[e]},_createButton:function(t){var n=new e.Rednose.Button(t);return this._buttonMap[n.id]=n,n.addTarget(this),n},_destroyButton:function(e){e.destroy(),e.removeTarget(this),delete this._buttonMap[e.id]},_defResetFn:function(e){var t=e.buttons,n;if(this._buttonMap&&this._buttonMap.length>0)for(n=0;n<this._buttonMap.length;n++)this._destroyButton(this._buttonMap[n]);this._buttonMap={};if(t)for(n=0;n<t.length;n++)this._createButton(t[n])}});e.namespace("Rednose.ButtonGroup").Base=r},"1.7.0",{requires:["rednose-button"]});
