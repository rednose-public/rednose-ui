YUI.add("rednose-dialog-template",function(e,t){function r(){}var n=e.Template.Micro;r.prototype={baseTemplate:'<form class="form-horizontal"></form>',tabTemplate:n.compile('<fieldset><div id="<%= data.id %>"></div></fieldset>'),inputTemplate:n.compile('<div class="control-group"><label><span class="control-label"><%= data.title %> <small><%= data.sub_title %></small></span><div class="controls"><input type="text" data-path="<%= data.id %>" id="<%= data.id %>" name="<%= data.id %>" placeholder="<%= data.title %>" value="<%= data.value %>"></div></label></div>'),selectTemplate:n.compile('<div class="control-group"><label class="control-label"><span class="control-label"><%= data.title %> <small><%= data.sub_title %></small></span><div class="controls"><select data-path="<%= data.id %>" id="<%= data.id %>" name="<%= data.id %>"><% Y.Object.each(data.options, function (option, i) { %><option <%= option.selected ? \'selected="selected"\' : \'\' %> value="<%= option.value %>"><%= option.title %></option><% }); %></select></div></label></div>'),textareaTemplate:n.compile('<div class="control-group"><label class="control-label"><span class="control-label"><%= data.title %> <small><%= data.sub_title %></small></span><div class="controls"><textarea data-path="<%= data.id %>" id="<%= data.id %>" name="<%= data.id %>" placeholder="<%= data.title %>"><%= data.value %></textarea></div></label></div>'),initializer:function(){this._TemplateEvents=[e.Do.before(this._beforeFocusInput,this,"_focusInput",this)],this.template=e.Node.create(this.baseTemplate)},destructor:function(){(new e.EventHandle(this._TemplateEvents)).detach()},_beforeFocusInput:function(){var t=e.Object.isEmpty(this.get("tabs")),n=e.Object.isEmpty(this.get("properties"));t===!1&&this._createTabs(),n===!1&&this._createTemplate(),t===!1&&this._renderTabs(),(t===!1||n===!1)&&this.panel.set("bodyContent",this.template)},_createTabs:function(){var t=this,n=this.get("tabs");e.Object.each(n,function(e){t.template.append(t.tabTemplate(e))})},_createTemplate:function(){var t=this,n=this.get("properties"),r=e.Object.isEmpty(this.get("tabs")),i;e.Object.each(n,function(e){switch(e.type){case"input":i=t.inputTemplate;break;case"select":i=t.selectTemplate;break;case"textarea":i=t.textareaTemplate;break;default:i=function(){console.error('Type "%s" in property "%s" is not supported.',e.type,e.title)}}e.tab&&r===!1?t.template.one("#"+e.tab).append(i(e)):t.template.append(i(e))})},_renderTabs:function(){var t=this.template,n=this.get("tabs");e.Object.each(n,function(e,n){n==="0"&&(e.active=!0),e.container=t.one("div#"+e.id)}),this.tabView=new e.Rednose.TabView({tabs:n}),this.tabView.render(t)}},r.ATTRS={tabs:{value:[]},properties:{value:[]}},e.Rednose.Dialog.Template=r,e.Base.mix(e.Rednose.Dialog,[r])},"1.5.0-DEV",{requires:["template-micro","rednose-tabview"]});
