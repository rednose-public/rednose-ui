YUI.add("rednose-dropdown-plugin",function(e,t){var n=e.Template.Micro;e.namespace("Rednose.Plugin").Dropdown=e.Base.create("dropdown",e.Rednose.Dropdown,[e.Plugin.Base],{initializer:function(t){this._host=t.host;var n=this.get("container"),r=this.get("dropup"),i=e.Rednose.Dropdown.ClassNames,s=e.Rednose.Dropdown.Templates;n.addClass(i.dropdown),r&&n.addClass(i.dropup);if(this.get("showOnContext")){this._host.on("contextmenu",this._onAnchorContextMenu,this);return}this._host.addClass(i.toggle),this.get("showCaret")&&this._host.setHTML(s.caret({classNames:i,content:this._host.getHTML()})),this._host.on("click",this._onAnchorClick,this)},positionContainer:function(e,t){var n=this.get("container");this.pageX=e,this.pageY=t,n.setStyles({position:"absolute",left:e,top:t})},_onAnchorContextMenu:function(e){if(e.shiftKey)return;e.preventDefault(),this.get("propagate")&&e.stopPropagation(),this.positionContainer(e.pageX,e.pageY),this.open()},_onAnchorClick:function(e){e.preventDefault(),this.toggle()}},{NS:"dropdown",ATTRS:{showCaret:{value:!0,writeOnce:"initOnly"},showOnContext:{value:!1,writeOnce:"initOnly"},dropup:{value:!1,writeOnce:"initOnly"},propagate:{value:!0,writeOnce:"initOnly"},container:{getter:function(e){return this.get("showOnContext")?this._getContainer(e):this._host.get("parentNode")}}}}),e.mix(e.Rednose.Dropdown.ClassNames,{caret:"caret",dropup:"dropup"}),e.mix(e.Rednose.Dropdown.Templates,{caret:n.compile('<%== data.content %> <span class="<%= data.classNames.caret %>"></span>')})},"1.5.0-DEV",{requires:["rednose-dropdown","node-pluginhost","plugin"]});
