YUI.add("rednose-dropdown-keys",function(e,t){function i(){}var n=e.Template.Micro,r=e.Rednose.Util;i.prototype={initializer:function(){e.Do.after(this._appendKeyCode,this,"_renderContent",this)},formatKeyCode:function(e){var t=e.split("+").map(function(e){return r.capitalizeFirstLetter(e)});return t.join("+")},_appendKeyCode:function(t){if(!t.keyCode)return;var n=e.Do.originalRetVal,r=e.Rednose.Dropdown.Templates,i=e.Rednose.Dropdown.ClassNames;n.append(e.Node.create(r.keyCode({classNames:i,keyCode:this.formatKeyCode(t.keyCode)})))}},e.Rednose.Dropdown.Keys=i,e.Base.mix(e.Rednose.Dropdown,[i]),e.mix(e.Rednose.Dropdown.ClassNames,{keyCode:"rednose-menu-item-key-code"}),e.mix(e.Rednose.Dropdown.Templates,{keyCode:n.compile('<span class="<%= data.classNames.keyCode %>"><%= data.keyCode %></span>')})},"1.5.0-DEV",{requires:["rednose-dropdown","rednose-util"]});