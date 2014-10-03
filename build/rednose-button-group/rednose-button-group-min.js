YUI.add("rednose-button-group",function(e,t){var n="click",r="change",i=e.Base.create("buttonGroup",e.Rednose.ButtonGroup.Base,[e.View],{classNames:{group:"btn-group",vertical:"btn-group-vertical",left:"pull-left",right:"pull-right"},initializer:function(e){this.type=e.type||"default",this.position=e.position||"left",this._value=null,this._attachButtonGroupEvents()},destructor:function(){this._detachButtonGroupEvents()},_attachButtonGroupEvents:function(){this._buttonGroupEvents||(this._buttonGroupEvents=[]),this.type!=="default"&&this._buttonGroupEvents.push(this.after("button:click",this._afterButtonClick,this),this.after("button:activate",this._afterButtonActivate,this)),this._buttonGroupEvents.push(this.after(["button:show","button:hide"],this._afterButtonVisibilityChange,this))},_detachButtonGroupEvents:function(){(new e.EventHandle(this._buttonGroupEvents)).detach()},render:function(){var t=this.get("container"),n=this.classNames;return t.addClass(n.group),this.get("vertical")&&t.addClass(n.vertical),t.addClass(this.position==="right"?n.right:n.left),e.Object.each(this._buttonMap,function(e){t.append(e.render().get("container"))}),this},getValue:function(){var t=[];return e.Object.each(this._buttonMap,function(e){e.isActive()&&t.push(e.id)}),this.type==="radio"?t[0]||null:t},_afterButtonClick:function(e){var t=e.button;switch(this.type){case"radio":this._prevButton&&this._prevButton.deactivate(),t.activate();break;case"checkbox":t.toggleActive()}this._published[n]||(this._published[n]=this.publish(n,{defaultFn:this._defClickFn})),this.fire(n,{button:t}),this._prevButton=t},_afterButtonActivate:function(e){this._prevButton=e.button},_defClickFn:function(){var e=this.getValue();e!==this._prevVal&&this.fire(r,{value:this.getValue()}),this._prevVal=e},_afterButtonVisibilityChange:function(){var t=!1,n=null;e.Object.each(this._buttonMap,function(e){var r=e.get("container");e.hidden===!1&&t===!1?(r.addClass("first"),t=!0):r.removeClass("first"),e.visible===!0&&(n=r),r.removeClass("last")}),n&&n.addClass("last")}},{ATTRS:{vertical:{value:!1,writeOnce:"initOnly"}}});e.Rednose.ButtonGroup=e.mix(i,e.Rednose.ButtonGroup)},"1.6.0-dev",{requires:["rednose-button-group-base"]});
