YUI.add("rednose-grid",function(e,t){var n,r;r=e.Base.create("gridView",e.View,[],{template:e.Handlebars.compile('<div class="model-grid-container" title="{{ name }}" data-yui3-record="{{ clientId }}"><div class="model-grid-icon-container"><div class="model-grid-icon-wrapper">{{#if thumbnail}}<img class="model-grid-icon" alt="{{ name }}" src="{{ thumbnail }}" style="width: 110px; height: 156px;"/>{{else}}<div class="model-grid-icon"></div>{{/if}}</div><div class="model-grid-footer"><div class="model-grid-name">{{ label }}</div><input class="edit" type="text" value="{{ name }}" style="visibility: hidden;"/><div class="model-grid-date">{{ footer }}</div></div></div></div>'),initializer:function(){var e=this.get("model");e.after("change",this.render,this)},render:function(){var t=this.get("container"),n=this.get("model"),r=this.get("config")||{},i={};i.data=n.toJSON(),t.setStyle("float","left");var s={clientId:n.get("clientId")};typeof r.thumbnail=="function"&&(s.thumbnail=r.thumbnail(i));if(typeof r.label=="function"){var o=r.label(i);s.label=o&&e.Rednose.Util.formatLabel(o),s.name=o}return typeof r.footer=="function"&&(s.footer=r.footer(i)),t.setHTML(this.template(s)),this.set("inputNode",t.one(".edit")),this.set("footerNode",t.one(".model-grid-footer")),this},edit:function(){this.get("footerNode").addClass("editing"),this.get("inputNode").focus()},close:function(){var t=this.get("inputNode").get("value"),n=this,r=e.Escape.html(e.Lang.trim(t)),i=this.get("model");this.get("footerNode").removeClass("editing");if(r){var s=n.get("footerNode").one(".model-grid-name");s.set("innerHTML","Loading..."),i.set("name",r),i.save(function(){n.get("inputNode").set("value",i.get("name")),s.set("innerHTML",i.get("name"))})}},enterUpdate:function(e){var t=13;e.keyCode===t&&this.close()}},{ATTRS:{model:{value:null},config:{value:null}}}),n=e.Base.create("grid",e.View,[e.Rednose.Grid.Selectable],{defaultConfig:{thumbnail:function(e){return e.data.thumbnail},label:function(e){return e.data.name},footer:function(e){return e.data.date_modified}},initializer:function(){var e=this.get("container");this.get("openOnClick")&&e.on("click",this._onContainerClick,this)},render:function(){var t=this.get("container"),n=this.get("data"),i=this.get("config")||this.defaultConfig;t.addClass("rednose-grid-view"),e.each(n,function(e){var n=new r({model:e,config:i});n.addTarget(this),t.append(n.render().get("container"))})},_onContainerClick:function(e){if(!e.target.hasClass("model-grid-icon"))return;e.stopImmediatePropagation();var t=e.target.ancestor(".model-grid-icon-container"),n=this._getModelFromGridItem(t);this.fire("open",{model:n})}},{ATTRS:{openOnClick:{value:!1,writeOnce:"initOnly"},data:{value:[]},config:{value:null}}}),e.namespace("Rednose").Grid=n},"1.6.0-dev",{requires:["handlebars","model-list","rednose-grid-select","rednose-util","view"]});
