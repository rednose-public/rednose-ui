YUI.add("rednose-dropdown-delegate",function(e,t){var n=e.Base.create("dropdown",e.Base,[],{initializer:function(){this._eventHandles||(this._eventHandles=[]),this._instances=[];var e=this.get("container"),t=this.get("nodes");this._eventHandles.push(e.delegate("contextmenu",this._handleContextMenu,t,this))},destructor:function(){(new e.EventHandle(this._eventHandles)).detach(),e.Array.each(this._instances,function(e){e.destroy()}),this._instances=null},_handleContextMenu:function(t){if(t.shiftKey)return;t.preventDefault();var n=t.currentTarget,r=t.pageX,i=t.pageY;if(n.dropdown)return;n.plug(e.Rednose.Plugin.Dropdown,{showOnContext:!0}),this._instances.push(n.dropdown),n.dropdown.addTarget(this),n.dropdown._positionContainer(r,i),n.dropdown.open()}},{NS:"dropdown",ATTRS:{container:{value:e.one("body"),writeOnce:"initOnly"},nodes:{value:".rednose-dropdown",writeOnce:"initOnly"}}});e.namespace("Rednose.Dropdown").Delegate=n},"1.5.0-DEV",{requires:["rednose-dropdown-plugin"]});
