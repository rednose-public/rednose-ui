YUI.add("libbit-dropdown",function(e,t){var n;n=e.Base.create("dropdown",e.Bootstrap.Dropdown,[],{initializer:function(){var t=this._node,n=null,r=this.config.content?this.config.content:"",i=this.config.dropup?"dropup":"dropdown";t.wrap('<div class="dropdown-wrapper '+i+'"></div>'),t.addClass("dropdown-toggle"),t.setAttribute("data-toggle","dropdown"),n=t.get("parentNode"),n.append(e.Node.create(r)),n.delegate("click",function(e){e.preventDefault(),t.dropdown.toggle()},"a"),this.set("menuNode",n)}},{NS:"dropdown",ATTRS:{menuNode:null}}),e.namespace("Libbit").Dropdown=n},"1.0.0",{requires:["gallery-bootstrap-dropdown"]});
