YUI.add("rednose-form",function(e,t){function C(){C.superclass.constructor.apply(this)}var n=e.Rednose.ModelTree,r;r=e.Base.create("controlModel",e.Model,[],{view:{},_getValue:function(e){return e===null?!1:e}},{ATTRS:{caption:{value:null},type:{value:null},properties:{value:{}},required:{value:!1},visible:{value:!0},"protected":{value:!1},readonly:{value:!1},value:{value:null,getter:"_getValue"}}}),e.namespace("Rednose.Form").ControlModel=r;var i;i=e.Base.create("formModel",e.Model,[],{getTree:function(){var t={label:this.get("caption"),data:new e.Model,icon:"icon-list-alt",children:[]};return!this.get("id")&&!this.get("caption")?new n:(this.get("controls").each(function(e){t.children.push({label:e.get("id"),data:e,icon:"icon-minus"})}),new n({items:t}))},sync:function(t,n,r){t==="read"&&e.io(Routing.generate("rednose_flowgen_process_form",{id:this.get("id")}),{method:"GET",on:{success:function(t,n){r(null,e.JSON.parse(n.responseText))},failure:function(t,n){r(e.JSON.parse(n.responseText))}}})},_setControls:function(t){var n=new e.ModelList;return e.Array.each(t,function(t){n.add(new e.Rednose.Form.ControlModel(t))}),n}},{ATTRS:{caption:{value:null},controls:{value:new e.ModelList,setter:"_setControls"}}}),e.namespace("Rednose.Form").FormModel=i;var s="select";BaseControlView=e.Base.create("baseControlView",e.View,[],{events:{"input, select":{focus:"_handleSelect"}},initializer:function(){var e=this.get("model");e.after("change",this.render,this)},focus:function(){var e=this.get("container").one("input");e&&e.focus()},_handleSelect:function(e){e.model=this.get("model"),this.fire(s,e)}},{ATTRS:{model:{value:new e.Rednose.Form.ControlModel},value:{value:!1}}}),e.namespace("Rednose.Form").BaseControlView=BaseControlView;var o;o=e.Base.create("textControlView",e.Rednose.Form.BaseControlView,[],{template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><input class="input-block-level" id="{id}" type="text"/></div></div>',_inputNode:null,destructor:function(){this._inputNode=null},render:function(){var t=this.get("container"),n=this.get("model"),r=this.template;return t.setHTML(e.Lang.sub(r,{id:n.get("id"),label:n.get("caption")})),this._inputNode=t.one("input"),n.get("visible")?t.show():t.hide(),n.get("required")?this._inputNode.setAttribute("required","required"):this._inputNode.hasAttribute("required")&&this._inputNode.removeAttribute("required"),n.get("protected")?this._inputNode.setAttribute("readonly","readonly"):this._inputNode.hasAttribute("readonly")&&this._inputNode.removeAttribute("readonly"),n.get("readonly")?this._inputNode.setAttribute("disabled","disabled"):this._inputNode.hasAttribute("disabled")&&this._inputNode.removeAttribute("disabled"),this}}),e.namespace("Rednose.Form").TextControlView=o;var u;u=e.Base.create("checkboxControlView",e.Rednose.Form.BaseControlView,[],{template:'<div class="control-group"><div class="controls"><label class="checkbox"><input type="checkbox" id="{id}"> {label}</label></div></div>',events:{input:{change:"_handleInputChange"},".checkbox":{click:"_handleSelect"}},_inputNode:null,destructor:function(){this._inputNode=null},render:function(){var t=this.get("container"),n=this.get("model"),r=this.template;return t.setHTML(e.Lang.sub(r,{id:n.get("id"),label:n.get("caption")})),this.set("value",n.get("value")),this._inputNode=t.one("input"),this._inputNode.set("checked",this.get("value")),n.get("visible")?t.show():t.hide(),this},_handleInputChange:function(){var e=this._inputNode.get("checked");this.set("value",e),this.get("model").set("value",e),this.fire("change",{model:this.get("model"),value:{value:e}})}}),e.namespace("Rednose.Form").CheckboxControlView=u;var a;a=e.Base.create("dropDownControlView",e.Rednose.Form.BaseControlView,[],{OPTION_TEMPLATE:'<option value="{value}">{label}</option>',template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><select class="input-block-level" id="{id}"></select></div></div>',render:function(){var t=this,n=this.get("container"),r=this.get("model"),i=r.get("properties"),s=this.template;n.setHTML(e.Lang.sub(s,{label:r.get("id"),caption:r.get("caption")}));if(i.datasource){var o=i.datasource;e.io(Routing.generate("rednose_dataprovider_data_list",{id:o.id}),{method:"GET",on:{success:function(r,i){var s=e.JSON.parse(i.responseText).results,u=o.map?t._mapDataProviderData(s,o.map):s;t._updateSelectNode(n.one("select"),u)}}})}else i.choices&&this._updateSelectNode(n.one("select"),this._mapChoicesPropertyData(i.choices));return this},_mapChoicesPropertyData:function(t){var n=[];return e.Object.each(t,function(e,t){n.push({value:t,label:e})}),n},_mapDataProviderData:function(t,n){return e.Array.map(t,function(t){var r={};return e.Object.each(n,function(e,n){r[n]=t[e]}),r})},_updateSelectNode:function(t,n){var r=this;e.Array.each(n,function(n){t.append(e.Lang.sub(r.OPTION_TEMPLATE,{value:n.value,label:n.label}))})}}),e.namespace("Rednose.Form").DropDownControlView=a;var f="Type here to search...",l=e.Template.Micro,c=e.Rednose.ControlFormAutoComplete,h;h=e.Base.create("autoCompleteControlView",e.Rednose.Form.BaseControlView,[],{OPTION_TEMPLATE:'<option value="{value}">{label}</option>',AUTOCOMPLETE_TEMPLATE:l.compile('<a role="menuitem"><img class="avatar size32" src="<%= data.image %>"><span class="title-block"><span class="title"><%== data.title %></span></span><span class="subtitle"><%= data.subtitle %></span></a>'),template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><input type="text" class="input-block-level" id="{id}" placeholder="{placeholder}"/></div></div>',_inputNode:null,_autoComplete:null,events:{input:{change:"_handleInputChange"}},destructor:function(){this._autoComplete.destroy(),this._inputNode=null,this._autoComplete=null},render:function(){var t=this.get("container"),n=this.get("model"),r=this.template;return t.setHTML(e.Lang.sub(r,{
id:n.get("id"),label:n.get("caption"),placeholder:f})),this._inputNode=t.one("input"),n.get("visible")?t.show():t.hide(),this._renderAutoComplete(),this},_renderAutoComplete:function(){var t=this,n=this.AUTOCOMPLETE_TEMPLATE,r=this.get("model").get("properties").choices,i=this.get("model").get("properties").datasource,s;s={inputNode:this._inputNode,maxResults:6},i?s=e.merge(s,{resultListLocator:"results",resultFormatter:function(r,s){return e.Array.map(s,function(s){var o=t._mapDataProviderData(s.raw,i.map);return o.title=e.Highlight.all(o.title,r),n(o)})},resultTextLocator:function(e){return i.map&&i.map.value?e[i.map.value]:e.value},source:this._getDataProviderRoute(i.id,i.map&&i.map.title?i.map.title:"title")}):r&&(s=e.merge(s,{resultFormatter:function(t,r){return e.Array.map(r,function(e){return n(e.raw)})},resultTextLocator:"value",source:r})),this._autoComplete=(new c(s)).render(),this._autoComplete.after("select",function(){t._handleInputChange()})},_getDataProviderRoute:function(e,t){return Routing.generate("rednose_dataprovider_data_list")+"?id="+e+"&q={query}&key="+t+"&callback={callback}"},_mapDataProviderData:function(e,t){return t||(t={}),{title:t.title?e[t.title]:e.title,subtitle:t.subtitle?e[t.subtitle]:e.subtitle,image:t.image?e[t.image]:e.image,value:t.value?e[t.value]:e.value}},_handleInputChange:function(){var e=this._inputNode.get("value");this.set("value",e),this.fire("change",{model:this.get("model"),value:{value:e}})}}),e.namespace("Rednose.Form").AutocompleteControlView=h;var l=e.Template.Micro,p;p=e.Base.create("dateTimeControlView",e.Rednose.Form.BaseControlView,[],{OPTION_TEMPLATE:l.compile('<option value="<%= data.value %>"<% if (data.selected) { %> selected<% }%>><%= data.label %></option>'),template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls controls-row"><select id="{id}" class="rednose-date-day"></select><select class="rednose-date-month"></select><select class="rednose-date-year"></select><select class="rednose-date-hour"></select>:<select class="rednose-date-minute"></select></div></div>',render:function(){var t=new Date,n=new Date,r=this.get("container"),i=this.get("model"),s=this.template;r.setHTML(e.Lang.sub(s,{id:i.get("id"),label:i.get("caption")}));for(var o=1;o<=31;o++)n.setDate(o),r.one(".rednose-date-day").append(this.OPTION_TEMPLATE({value:o,label:e.Date.format(n,{format:"%d"}),selected:o===t.getDate()}));for(var o=0;o<=11;o++)n.setMonth(o),r.one(".rednose-date-month").append(this.OPTION_TEMPLATE({value:o,label:e.Date.format(n,{format:"%B"}),selected:o===t.getMonth()}));for(var o=t.getFullYear()-5;o<=t.getFullYear()+5;o++)n.setFullYear(o),r.one(".rednose-date-year").append(this.OPTION_TEMPLATE({value:o,label:e.Date.format(n,{format:"%G"}),selected:o===t.getFullYear()}));for(var o=0;o<=23;o++)n.setHours(o),r.one(".rednose-date-hour").append(this.OPTION_TEMPLATE({value:o,label:e.Date.format(n,{format:"%H"}),selected:o===t.getHours()}));for(var o=0;o<=59;o++)n.setMinutes(o),r.one(".rednose-date-minute").append(this.OPTION_TEMPLATE({value:o,label:e.Date.format(n,{format:"%M"}),selected:o===t.getMinutes()}));return this},focus:function(){var e=this.get("container").one("select");e&&e.focus()}}),e.namespace("Rednose.Form").DateTimeControlView=p;var d;d=e.Base.create("textAreaControlView",e.Rednose.Form.BaseControlView,[],{template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><textarea rows="3" class="input-block-level" id="{id}"></textarea></div></div>',render:function(){var t=this.get("container"),n=this.get("model"),r=this.template;return t.setHTML(e.Lang.sub(r,{id:n.get("id"),label:n.get("caption")})),this}}),e.namespace("Rednose.Form").TextAreaControlView=d;var v;v=e.Base.create("richTextControlView",e.Rednose.Form.BaseControlView,[],{template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><textarea class="input-block-level" id="{id}"></textarea></div></div>',_editor:null,_rendered:!1,destructor:function(){this._editor.destroy(),this._editor=null},render:function(){var t=this.get("container"),n=this.get("model"),r=this.template;if(this._rendered)return;return t.setHTML(e.Lang.sub(r,{id:n.get("id"),label:n.get("caption")})),this._editor=(new e.Rednose.ControlFormRichTextEditor({srcNode:t.one("textarea"),replace:!0,properties:{input_properties:{styles:"true",clipboard:"true",editing:"true",undoredo:"true"}}})).render(),this._rendered=!0,this}}),e.namespace("Rednose.Form").RichTextControlView=v;var m="text",g="textarea",y="html",b="date",w="datetime",E="dropdown",S="radio",x="checkbox",T="autocomplete",N="file";C.create=function(t){switch(t.get("type")){case m:return new e.Rednose.Form.TextControlView({model:t});case E:return new e.Rednose.Form.DropDownControlView({model:t});case g:return new e.Rednose.Form.TextAreaControlView({model:t});case y:return new e.Rednose.Form.RichTextControlView({model:t});case b:return null;case w:return new e.Rednose.Form.DateTimeControlView({model:t});case S:return null;case x:return new e.Rednose.Form.CheckboxControlView({model:t});case T:return new e.Rednose.Form.AutocompleteControlView({model:t});case N:return null}return null},e.namespace("Rednose.Form").ControlViewFactory=C},"1.1.0-DEV",{requires:["rednose-controlform","rednose-dataprovider","rednose-form-css","template-micro","uploader"]});
