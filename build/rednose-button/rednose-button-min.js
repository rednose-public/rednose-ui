YUI.add("rednose-button",function(e,t){var n=e.Template.Micro,r="click",i=e.Base.create("button",e.Rednose.Button.Base,[e.View],{containerTemplate:"<button />",templates:{content:n.compile('<% if (data.button.icon) { %><i class="<%= data.classNames.icon %> <%= data.button.icon %>"></i> <% } %><%= data.button.value %>')},classNames:{btn:"btn",icon:"icon",disabled:"disabled",hidden:"hidden",active:"active"},initializer:function(e){this.toggle=e.toggle||!1,this._attachButtonEvents()},destructor:function(){this._detachButtonEvents()},render:function(){var e=this.get("container"),t=this.classNames;return e.addClass(this.classNames.btn),this.title&&e.setAttribute("title",this.title),this.disabled&&e.addClass(t.disabled),this.active&&e.addClass(t.active),this.type!=="default"&&e.addClass(t.btn+"-"+this.type),this.hidden&&this.hide(),e.setContent(this.templates.content({classNames:this.classNames,button:this})),this},_attachButtonEvents:function(){this._buttonEvents||(this._buttonEvents=[]);var e=this.get("container");this._buttonEvents.push(this.after({enable:this._afterEnable,disable:this._afterDisable,show:this._afterShow,hide:this._afterHide,rename:this._afterRename,activate:this._afterActivate,deactivate:this._afterDeactivate}),e.on("click",this._onButtonClick,this))},_detachButtonEvents:function(){(new e.EventHandle(this._buttonEvents)).detach()},_onButtonClick:function(e){if(this.isDisabled())return;this._fireButtonEvent(r,{button:this,originEvent:e},{defaultFn:this._defClickFn})},_afterEnable:function(){var e=this.get("container"),t=this.classNames;e.removeClass(t.disabled)},_afterDisable:function(){var e=this.get("container"),t=this.classNames;e.addClass(t.disabled)},_afterShow:function(){var e=this.get("container"),t=this.classNames;e.removeClass(t.hidden)},_afterHide:function(){var e=this.get("container"),t=this.classNames;e.addClass(t.hidden)},_afterActivate:function(){var e=this.get("container"),t=this.classNames;e.addClass(t.active)},_afterDeactivate:function(){var e=this.get("container"),t=this.classNames;e.removeClass(t.active)},_afterRename:function(){var e=this.get("container"),t=this.classNames;e.setContent(this.templates.content({classNames:t,button:this}))},_defClickFn:function(){this.toggle&&this.toggleActive()}});e.Rednose.Button=e.mix(i,e.Rednose.Button)},"1.5.0-DEV",{requires:["rednose-button-base","template","view"]});
