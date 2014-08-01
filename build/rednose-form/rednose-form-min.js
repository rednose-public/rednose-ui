YUI.add("rednose-form",function(Y,NAME){function ControlViewFactory(){ControlViewFactory.superclass.constructor.apply(this)}function FormXML(){}function FormJSON(){}function FormConditions(){}function FormDataSources(){}var AutoComplete;AutoComplete=Y.Base.create("autoComplete",Y.AutoCompleteList,[],{AUTOCOMPLETE_TEMPLATE:Y.Template.Micro.compile('<a role="menuitem"><% if (data.image) { %><img class="avatar size32" src="<%= data.image %>"><% } %><span class="title-block"><span class="title"><%== data.title %></span></span><span class="subtitle"><%= data.subtitle %></span></a>'),initializer:function(){var e=this.AUTOCOMPLETE_TEMPLATE,t=this.get("choices"),n=this.get("datasource"),r=this;this.get("inputNode").setAttribute("autocomplete","off"),n?(this.set("resultFormatter",function(t,i){return Y.Array.map(i,function(i){var s=r._mapDataProviderData(i.raw,n.map);return s.title=Y.Highlight.all(s.title,t),e(s)})}),this.set("resultTextLocator",function(e){return r._mapDataProviderData(e,n.map).value}),this.set("source",this._getDataProviderRoute(n.id))):t&&(this.set("resultFormatter",function(t,n){return Y.Array.map(n,function(t){return e(t.raw)})}),this.set("resultTextLocator","value"),this.set("source",t)),this.get("inputNode").on("change",function(e){e.which!==0&&e.stopPropagation()}),this.after("select",function(e){r.set("record",e.result.raw),r.get("inputNode").simulate("change")})},_getDataProviderRoute:function(e){return Routing.generate("rednose_dataprovider_data_list")+"?id="+e+"&q={query}&callback={callback}"},_mapDataProviderData:function(e,t){t||(t={});var n={};for(var r in t)t.hasOwnProperty(r)&&(n[r]=this._parseTemplate(e,t[r]));return n},_parseTemplate:function(e,t){return this._getJSONValue(e,t.replace(/[${}]/g,""))},_getJSONValue:function(e,t){var n=t.split("."),r=e,i;while(i=n.shift()){if(!r.hasOwnProperty(i))return null;r=r[i]}return r}},{CSS_PREFIX:"rednose-autocomplete",ATTRS:{width:{value:!0},maxResults:{value:6},record:{value:null},choices:{value:null},datasource:{value:null}}}),Y.namespace("Rednose").ControlFormAutoComplete=AutoComplete;var Dropdown=Y.Base.create("dropdown",Y.Base,[],{OPTION_TEMPLATE:'<option id="{id}">{value}</option>',initializer:function(){this._dataMap={};var e=this.get("inputNode");e.on("change",this._onNodeChange,this)},render:function(){var e=this,t=this.get("inputNode"),n=this.get("datasource");Y.io(Routing.generate("rednose_dataprovider_data_list")+"?id="+n.id,{method:"GET",on:{success:function(n,r){e._updateSelectNode(t,Y.JSON.parse(r.responseText).results)}}})},_updateSelectNode:function(e,t){var n=this,r=this.get("datasource"),i=e.one("option").cloneNode(!0);e.empty(),i&&e.append(i),this._dataMap={},Y.Array.each(t,function(t){var i=n._getArrayValueByKey(t,r.map.id),s=n._getArrayValueByKey(t,r.map.value);n._dataMap[i]=t,e.append(Y.Lang.sub(n.OPTION_TEMPLATE,{id:i,value:s}))})},_getArrayValueByKey:function(e,t){for(var n in e)if(e.hasOwnProperty(n)){var r=e[n];if(n===t)return r;if(Y.Lang.isObject(r)){var i=this._getArrayValueByKey(r,t);if(i)return i}}return null},_onNodeChange:function(e){var t=e.target.get("value"),n=this._dataMap[t];console.log(n||null)}},{ATTRS:{inputNode:{setter:Y.one,writeOnce:"initOnly"},datasource:{value:null}}});Y.namespace("Rednose.Form").Dropdown=Dropdown;var RichTextEditor;RichTextEditor=Y.Base.create("richTextEditor",Y.Widget,[],{render:function(){var e=this.get("properties").input_properties,t="en_US",n=[];e&&(e.styles==="true"&&n.push({name:"styles",items:["Font","FontSize"]}),e.editing==="true"&&n.push({name:"editing",items:["Find","Replace","-","SelectAll"]}),e.clipboard==="true"&&n.push({name:"clipboard",items:["Cut","Copy","Paste","PasteText"]}),e.undoredo==="true"&&n.push({name:"clipboard",items:["Undo","Redo"]}),e.basicstyles==="true"&&n.push({name:"basicstyles",items:["Bold","Italic","Underline","-","RemoveFormat"]}),e.paragraph==="true"&&n.push({name:"paragraph",items:["NumberedList","BulletedList","-","Outdent","Indent"]}),e.insert==="true"&&n.push({name:"links",items:["Link","Unlink"]}),e.tools==="true"&&n.push({name:"tools",items:["Maximize"]}));var r={toolbar:n,removePlugins:"elementspath",resize_enabled:!1,disableNativeSpellChecker:!1,scayt_sLang:t,language:t,height:"100"};return this.get("replace")?CKEDITOR.replace(this.get("srcNode").getDOMNode(),r):CKEDITOR.appendTo(this.get("srcNode").getDOMNode(),r),this},destructor:function(){CKEDITOR.instances[this.get("srcNode").get("id")].destroy()}},{ATTRS:{properties:{value:{}},replace:{value:!1}}}),Y.namespace("Rednose").ControlFormRichTextEditor=RichTextEditor;var ControlModel=Y.Base.create("controlModel",Y.Model,[],{view:{},_setProperties:function(e){return Array.isArray(e)?{}:e}},{ATTRS:{caption:{value:null},foreign_id:{value:null},type:{value:null},properties:{value:{},setter:"_setProperties"},required:{value:!1},visible:{value:!0},"protected":{value:!1},readonly:{value:!1},sort_order:{value:0},help:{value:null},value:{value:null},binding:{value:null}}});Y.namespace("Rednose.Form").ControlModel=ControlModel;var SectionModel=Y.Base.create("controlModel",Y.Model,[],{getControl:function(e){var t=this.get("controls");for(var n=0,r=t.size();n<r;n++)if(t.item(n).get("name")===e)return t.item(n);return null},_setControls:function(e){var t=new Y.ModelList;return Y.Array.each(e,function(e){Y.instanceOf(e,Y.Rednose.Form.ControlModel)?t.add(e):typeof e=="object"?t.add(new Y.Rednose.Form.ControlModel(e)):t.add(new Y.Rednose.Form.ControlModel(e.getAttrs()))}),t}},{ATTRS:{name:{value:null},caption:{value:null},inline:{value:!1},controls:{value:new Y.ModelList,setter:"_setControls"}}});Y.namespace("Rednose.Form").SectionModel=SectionModel;var FormModel;FormModel=Y.Base.create("formModel",Y.Model,[],{getTree:function(){if(!this.get("id")&&!this.get("caption"))return null;var e={label:this.get("name"),icon:"icon-list-alt",children:[]};return this.get("sections").each(function(t){var n={label:t.get("name"),icon:"icon-align-left",children:[]};t.get("controls").each(function(
e){n.children.push({label:e.get("name"),icon:"icon-minus"})}),e.children.push(n)}),[e]},sync:function(e,t,n){e==="read"&&Y.io(Routing.generate("rednose_framework_forms_read",{id:this.get("id")}),{method:"GET",on:{success:function(e,t){n(null,Y.JSON.parse(t.responseText))},failure:function(e,t){n(Y.JSON.parse(t.responseText))}}})},getControl:function(e){var t=this.get("sections");for(var n=0,r=t.size();n<r;n++)if(t.item(n).getControl(e))return t.item(n).getControl(e);return null},_setSections:function(e){var t=new Y.ModelList({model:SectionModel});return t.reset(e)}},{ATTRS:{name:{value:null},caption:{value:null},identity:{value:null},sections:{value:new Y.ModelList,setter:"_setSections"}}}),Y.namespace("Rednose.Form").FormModel=FormModel;var EVT_SELECT="select";BaseControlView=Y.Base.create("baseControlView",Y.View,[],{events:{"input, select":{focus:"_handleSelect"}},initializer:function(){var e=this.get("model");e.after("change",this.render,this)},focus:function(){var e=this.get("container").one("input");e&&e.focus()},_handleSelect:function(e){e.model=this.get("model"),this.fire(EVT_SELECT,e)}},{ATTRS:{model:{value:new Y.Rednose.Form.ControlModel},value:{value:!1}}}),Y.namespace("Rednose.Form").BaseControlView=BaseControlView;var TextControlView;TextControlView=Y.Base.create("textControlView",Y.Rednose.Form.BaseControlView,[],{template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><input id="{id}" type="text"/></div></div>',_inputNode:null,destructor:function(){this._inputNode=null},render:function(){var e=this.get("container"),t=this.get("model"),n=this.template;e.setHTML(Y.Lang.sub(n,{id:t.get("id"),label:t.get("caption")}));var r=t.get("properties");return r&&r.size&&e.one("input").addClass("input-"+r.size),this._inputNode=e.one("input"),t.get("visible")?e.show():e.hide(),t.get("required")?this._inputNode.setAttribute("required","required"):this._inputNode.hasAttribute("required")&&this._inputNode.removeAttribute("required"),t.get("protected")?this._inputNode.setAttribute("readonly","readonly"):this._inputNode.hasAttribute("readonly")&&this._inputNode.removeAttribute("readonly"),t.get("readonly")?this._inputNode.setAttribute("disabled","disabled"):this._inputNode.hasAttribute("disabled")&&this._inputNode.removeAttribute("disabled"),this}}),Y.namespace("Rednose.Form").TextControlView=TextControlView;var CheckboxControlView;CheckboxControlView=Y.Base.create("checkboxControlView",Y.Rednose.Form.BaseControlView,[],{template:'<div class="control-group"><label for="{id}" class="control-label">{label}</label><div class="controls"><input type="checkbox" id="{id}"></input></div></div>',events:{input:{change:"_handleInputChange"},".checkbox":{click:"_handleSelect"}},_inputNode:null,destructor:function(){this._inputNode=null},render:function(){var e=this.get("container"),t=this.get("model"),n=this.template;return e.setHTML(Y.Lang.sub(n,{id:t.get("id"),label:t.get("caption")})),this.set("value",t.get("value")),this._inputNode=e.one("input"),this._inputNode.set("checked",this.get("value")),t.get("visible")?e.show():e.hide(),this},_handleInputChange:function(){var e=this._inputNode.get("checked");this.set("value",e),this.get("model").set("value",e),this.fire("change",{model:this.get("model"),value:{value:e}})}}),Y.namespace("Rednose.Form").CheckboxControlView=CheckboxControlView;var DropDownControlView;DropDownControlView=Y.Base.create("dropDownControlView",Y.Rednose.Form.BaseControlView,[],{OPTION_TEMPLATE:'<option value="{value}">{label}</option>',template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><select class="input-block-level" id="{id}"></select></div></div>',render:function(){var e=this,t=this.get("container"),n=this.get("model"),r=n.get("properties"),i=this.template;t.setHTML(Y.Lang.sub(i,{id:n.get("id"),label:n.get("caption")}));if(r.datasource){var s=r.datasource;Y.io(Routing.generate("rednose_dataprovider_data_list",{id:s.id}),{method:"GET",on:{success:function(n,r){var i=Y.JSON.parse(r.responseText).results,o=s.map?e._mapDataProviderData(i,s.map):i;e._updateSelectNode(t.one("select"),o)}}})}else r.choices&&this._updateSelectNode(t.one("select"),this._mapChoicesPropertyData(r.choices));return this},_mapChoicesPropertyData:function(e){var t=[];return Y.Object.each(e,function(e,n){t.push({value:n,label:e})}),t},_mapDataProviderData:function(e,t){return Y.Array.map(e,function(e){var n={};return Y.Object.each(t,function(t,r){n[r]=e[t]}),n})},_updateSelectNode:function(e,t){var n=this;Y.Array.each(t,function(t){e.append(Y.Lang.sub(n.OPTION_TEMPLATE,{value:t.value,label:t.label}))})}}),Y.namespace("Rednose.Form").DropDownControlView=DropDownControlView;var TXT_TYPE_TO_SEARCH="Type here to search...",AutocompleteControlView;AutocompleteControlView=Y.Base.create("autoCompleteControlView",Y.Rednose.Form.BaseControlView,[],{AUTOCOMPLETE_TEMPLATE:Y.Template.Micro.compile('<a role="menuitem"><img class="avatar size32" src="<%= data.image %>"><span class="title-block"><span class="title"><%== data.title %></span></span><span class="subtitle"><%= data.subtitle %></span></a>'),template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><input type="text" id="{id}" placeholder="{placeholder}"/></div></div>',_inputNode:null,_autoComplete:null,events:{input:{change:"_handleInputChange"}},destructor:function(){this._autoComplete.destroy(),this._inputNode=null,this._autoComplete=null},render:function(){var e=this.get("container"),t=this.get("model"),n=this.template;e.setHTML(Y.Lang.sub(n,{id:t.get("id"),label:t.get("caption"),placeholder:TXT_TYPE_TO_SEARCH}));var r=t.get("properties");return r&&r.size&&e.one("input").addClass("input-"+r.size),this._inputNode=e.one("input"),t.get("visible")?e.show():e.hide(),this._renderAutoComplete(),this},_renderAutoComplete:function(){var e=this.get("model").get("properties").choices,t=this.get("model"
).get("properties").datasource,n;n={inputNode:this._inputNode,choices:e,datasource:t},this._autoComplete=(new Y.Rednose.ControlFormAutoComplete(n)).render()},_handleInputChange:function(){var e=this._inputNode.get("value");this.set("value",e),this.fire("change",{model:this.get("model"),value:{value:e}})}}),Y.namespace("Rednose.Form").AutocompleteControlView=AutocompleteControlView;var DateTimeControlView;DateTimeControlView=Y.Base.create("dateTimeControlView",Y.Rednose.Form.BaseControlView,[],{OPTION_TEMPLATE:Y.Template.Micro.compile('<option value="<%= data.value %>"<% if (data.selected) { %> selected<% }%>><%= data.label %></option>'),template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls controls-row"><select id="{id}" class="rednose-date-day"></select><select class="rednose-date-month"></select><select class="rednose-date-year"></select><select class="rednose-date-hour"></select>:<select class="rednose-date-minute"></select></div></div>',render:function(){var e=new Date,t=new Date,n=this.get("container"),r=this.get("model"),i=this.template,s;n.setHTML(Y.Lang.sub(i,{id:r.get("id"),label:r.get("caption")}));for(s=1;s<=31;s++)t.setDate(s),n.one(".rednose-date-day").append(this.OPTION_TEMPLATE({value:s,label:Y.Date.format(t,{format:"%d"}),selected:s===e.getDate()}));for(s=0;s<=11;s++)t.setMonth(s),n.one(".rednose-date-month").append(this.OPTION_TEMPLATE({value:s,label:Y.Date.format(t,{format:"%B"}),selected:s===e.getMonth()}));for(s=e.getFullYear()-5;s<=e.getFullYear()+5;s++)t.setFullYear(s),n.one(".rednose-date-year").append(this.OPTION_TEMPLATE({value:s,label:Y.Date.format(t,{format:"%G"}),selected:s===e.getFullYear()}));for(s=0;s<=23;s++)t.setHours(s),n.one(".rednose-date-hour").append(this.OPTION_TEMPLATE({value:s,label:Y.Date.format(t,{format:"%H"}),selected:s===e.getHours()}));for(s=0;s<=59;s++)t.setMinutes(s),n.one(".rednose-date-minute").append(this.OPTION_TEMPLATE({value:s,label:Y.Date.format(t,{format:"%M"}),selected:s===e.getMinutes()}));return this},focus:function(){var e=this.get("container").one("select");e&&e.focus()}}),Y.namespace("Rednose.Form").DateTimeControlView=DateTimeControlView;var TextAreaControlView;TextAreaControlView=Y.Base.create("textAreaControlView",Y.Rednose.Form.BaseControlView,[],{template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><textarea id="{id}"></textarea></div></div>',render:function(){var e=this.get("container"),t=this.get("model"),n=this.template;e.setHTML(Y.Lang.sub(n,{id:t.get("id"),label:t.get("caption")}));var r=t.get("properties");return r&&r.size&&e.one("textarea").addClass("input-"+r.size),r&&r.rows&&e.one("textarea").setAttribute("rows",r.rows),this}}),Y.namespace("Rednose.Form").TextAreaControlView=TextAreaControlView;var RichTextControlView;RichTextControlView=Y.Base.create("richTextControlView",Y.Rednose.Form.BaseControlView,[],{template:'<div class="control-group"><label class="control-label" for="{id}">{label}</label><div class="controls"><textarea class="input-block-level" id="{id}"></textarea></div></div>',_editor:null,_rendered:!1,destructor:function(){this._editor.destroy(),this._editor=null},render:function(){var e=this.get("container"),t=this.get("model"),n=this.template;if(this._rendered)return;return e.setHTML(Y.Lang.sub(n,{id:t.get("id"),label:t.get("caption")})),this._editor=(new Y.Rednose.ControlFormRichTextEditor({srcNode:e.one("textarea"),replace:!0,properties:{input_properties:{styles:"true",clipboard:"true",editing:"true",undoredo:"true"}}})).render(),this._rendered=!0,this}}),Y.namespace("Rednose.Form").RichTextControlView=RichTextControlView;var Micro=Y.Template.Micro,FormView;FormView=Y.Base.create("formView",Y.View,[],{template:Micro.compile("<div class=\"rednose-form-view\"><form class=\"rednose-form form<%= data.horizontal ? '-horizontal' : '' %>\"><fieldset><% if (data.caption) { %><legend><%= data.caption %></legend><% } %></fieldset></form></div>"),_controlViewMap:{},_expressionMap:[],destructor:function(){this.clear(),this._expressionMap=null},render:function(){var e=this,t=this.get("container"),n=this.get("model"),r=this.template;return this._controlViewMap=[],this._expressionMap=[],t.setHTML(r({horizontal:this.get("horizontal"),caption:n.get("caption")})),n.get("controls").each(function(n){var r=Y.Rednose.Form.ControlViewFactory.create(n);if(r){e._controlViewMap[n.get("id")]=r,n.view=r,r.addTarget(e),r.after("*:change",function(){});var i=n.get("properties").expressions;i&&Y.Object.each(i,function(t){e._expressionMap.push(t)}),t.one("fieldset").append(r.render().get("container"))}}),this},clear:function(){Y.Object.each(this._controlViewMap,function(e){e.remove()})},_evalutateExpressions:function(){var self=this,objectDefinitions=[];Y.Object.each(this._controlViewMap,function(e){var t=e.get("model").get("id"),n=Y.JSON.stringify(e.get("model").toJSON());objectDefinitions.push(t+" = "+n)});var lines=[];lines.push("var "+objectDefinitions.join(", ")+";"),lines.push(this._expressionMap.join(" "));var objectMappings=[];Y.Object.each(this._controlViewMap,function(e){var t=e.get("model").get("id");objectMappings.push('"'+t+'": '+t)}),lines.push("var objects = {"+objectMappings.join(", ")+"};");var objects;eval(lines.join(" ")),Y.Object.each(objects,function(e,t){var n=self._controlViewMap[t].get("model");n.setAttrs(e),self._controlViewMap[t].render()})}},{ATTRS:{horizontal:{value:!0},model:{value:new Y.Rednose.Form.FormModel}}}),Y.namespace("Rednose.Form").FormView=FormView;var TYPE_TEXT="text",TYPE_TEXTAREA="textarea",TYPE_HTML="html",TYPE_DATE="date",TYPE_DATETIME="datetime",TYPE_DROPDOWN="dropdown",TYPE_RADIO="radio",TYPE_CHECKBOX="checkbox",TYPE_AUTOCOMPLETE="autocomplete",TYPE_FILE="file";ControlViewFactory.create=function(e){switch(e.get("type")){case TYPE_TEXT:return new Y.Rednose.Form.TextControlView({model:e});case TYPE_DROPDOWN:return new Y.Rednose.Form.DropDownControlView({model:e});case TYPE_TEXTAREA
:return new Y.Rednose.Form.TextAreaControlView({model:e});case TYPE_HTML:return new Y.Rednose.Form.RichTextControlView({model:e});case TYPE_DATE:return null;case TYPE_DATETIME:return new Y.Rednose.Form.DateTimeControlView({model:e});case TYPE_RADIO:return null;case TYPE_CHECKBOX:return new Y.Rednose.Form.CheckboxControlView({model:e});case TYPE_AUTOCOMPLETE:return new Y.Rednose.Form.AutocompleteControlView({model:e});case TYPE_FILE:return null}return null},Y.namespace("Rednose.Form").ControlViewFactory=ControlViewFactory;var Dropdown=Y.Base.create("dropdown",Y.Base,[],{EMPTY_TEMPLATE:"<option value>...</option>",OPTION_TEMPLATE:'<option data-record="{guid}" value="{value}">{text}</option>',initializer:function(e){this._recordMap||(this._recordMap={}),this.record=null,this.host=e.host,this.datasource=e.datasource,this.parent=e.parent,this.parentField=e.parentField,this.required=e.required,this.map=e.map,e.parent||this._queryDatasource(null),this.host.after("change",this._afterHostChange,this);if(this.parent){var t=Y.one("[data-name="+this.parent.id+"]");t.after("change",this._afterParentChange,this),this._processParent()}},_queryDatasource:function(e){var t=this;this.datasource.query(e).then(function(e){t._renderOptions(e)})},_emptyNode:function(){var e=this.host,t=this.required;e.empty(),t||e.append(Y.Node.create(this.EMPTY_TEMPLATE))},_renderOptions:function(e){var t=this,n=this.host,r=this.map;this._recordMap={},n.set("disabled",!1),this._emptyNode(),Y.Array.each(e,function(e){var i=Y.stamp(e);t._recordMap[i]=e,n.append(Y.Lang.sub(t.OPTION_TEMPLATE,{value:e[r.value],text:e[r.text],guid:i}))})},_processParent:function(){var e=this.host,t=this.parent,n=Y.one("[data-name="+t.id+"]"),r=n.get("value"),i={};e.set("disabled",!0);if(r==="")return;i[t.field]=r,this._queryDatasource(i)},_afterHostChange:function(e){var t=e.target.get("options").item(e.target.get("selectedIndex")),n=this._recordMap[t.getData("record")],r=e.target.get("value");this.fire("select",{value:r,raw:n?Y.clone(n):null})},_afterParentChange:function(){this._emptyNode(),this._processParent()}},{NS:"dropdown"});Y.namespace("Rednose.Plugin.Form").Dropdown=Dropdown,FormXML.prototype={initializer:function(){var e=this.form,t=this;this._buildXML(),e.after("change",t._afterXMLFormChange,this)},getXpathValue:function(e){var t=this.xml.evaluate(e,this.xml,null,XPathResult.ANY_TYPE,null);return t.resultType===2?t.stringValue:t.resultType===4?t.iterateNext().textContent:null},setXpathValue:function(e,t){var n=this.xml.evaluate(e,this.xml,null,XPathResult.ANY_TYPE,null);n.resultType===4&&(n.iterateNext().textContent=t)},_buildXML:function(){this.xml=Y.XML.parse("<Rijkshuisstijl/>");var e=this.form,t=this.xml,n=this;e.all("[data-section]").each(function(e){var r=e.getData("section"),i=t.createElement(r);e.all("[data-name]").each(function(e){var r=e.getData("name"),s=t.createElement(r),o=n.getNodeValue(e);s.appendChild(t.createTextNode(o)),i.appendChild(s)}),t.documentElement.appendChild(i)})},_afterXMLFormChange:function(){this._buildXML()}},FormJSON.prototype={initializer:function(){var e=this.form,t=this;this._buildJSON(),e.after("change",t._afterJSONFormChange,this)},_buildJSON:function(){this.json={};var e=this.form,t=this.json,n=this;e.all("[data-section]").each(function(e){var r=e.getData("section");t[r]={},e.all("[data-name]").each(function(e){var i=e.getData("name"),s=n.getNodeValue(e);t[r][i]=s})})},_getRootByPath:function(e,t){return t.split(".")[0]},_getValueByPath:function(e,t){var n=t.split(".");for(var r=0,i=n.length;r<i;r++){if(!(Y.Lang.isObject(e)&&n[r]in e)){e=undefined;break}e=e[n[r]]}return e},_setValueByPath:function(e,t,n){var r=t.split(".");for(var i=0,s=r.length;i<s;i++){if(i===s-1){e[r[i]]=n;break}e[r[i]]||(e[r[i]]={}),e=e[r[i]]}},_afterJSONFormChange:function(){this._buildJSON()}},FormConditions.prototype={initializer:function(){this.config||(this.config={});var e=this.form,t=this;e.after("change",t._afterConditionsFormChange,this),e.all("[data-conditions]").each(function(e){var n=Y.JSON.parse(e.getData("conditions"));t.config[e.get("id")]=n})},_handleCondition:function(e,t){if(t.hasOwnProperty("visible")){var n=t.visible,r=this.form.one("#"+e);value=this._compare(this.getXpathValue(n.a),this.getXpathValue(n.b),n.operator),this.setNodeVisible(r,value)}},_compare:function(e,t,n){switch(n){case"==":return e===t;case"!=":return e!==t}return null},_afterConditionsFormChange:function(){var e=this.config;for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];this._handleCondition(t,n)}}},FormDataSources.prototype={initializer:function(){this.scope||(this.scope={}),this.dataSources={};var e=this;this._loadDataSources().then(function(t){e._initDataSources(t),e._bindDataSources()})},_setRecord:function(e,t){var n=this;this.scope[e]=t,this.form.all("[data-bindings]").each(function(t){var r=Y.JSON.parse(t.getData("bindings"));Y.Array.each(r,function(r){n._getRootByPath(n.scope,r)===e&&n.setNodeValue(t,n._getValueByPath(n.scope,r)||null)})})},_loadDataSources:function(){return Y.Promise(function(e){Y.io(Routing.generate("rednose_dataprovider_data_sources"),{method:"GET",on:{success:function(t,n){e(Y.JSON.parse(n.responseText))}}})})},_initDataSources:function(e){var t=this;Y.Array.each(e,function(e){switch(e.type){case"dataGen":t.dataSources[e.name]=new Y.Rednose.Datagen(e);break;case"trim":t.dataSources[e.name]=new Y.Rednose.Trim(e)}})},_bindDataSources:function(){var e=this.dataSources,t=this;this.form.all("[data-type=dropdown]").each(function(n){if(n.getData("datasource")){var r=Y.JSON.parse(n.getData("datasource")),i=e[r.id];i&&(n.plug(Y.Rednose.Plugin.Form.Dropdown,{datasource:i,map:r.map,parent:r.parent,required:n.getData("required")}),n.dropdown.after("select",function(e){t._setRecord(r.id,e.raw)}))}}),this.form.all("[data-type=autocomplete]").each(function(n){if(n.getData("datasource")){var r=Y.JSON.parse(n.getData("datasource")),i=r.map,s=e[r.id],o=Y.Template.Micro.compile('<a role="menuitem"><% if (data.image) { %><img class="avatar size32" src="<%= data.image %>"><% } %><span class="title-block"><span class="title"><%== data.title %></span></span><span class="subtitle"><%= data.subtitle %></span></a>'
);s&&(Y.Plugin.AutoComplete.CSS_PREFIX="rednose-autocomplete",n.plug(Y.Plugin.AutoComplete,{resultTextLocator:function(e){return e[i.value]},resultFormatter:function(e,t){return Y.Array.map(t,function(t){return o({title:Y.Highlight.all(t.raw[i.title],e),subtitle:t.raw[i.subtitle],image:t.raw[i.image]})})},source:function(e,t){s.query({query:e}).then(function(e){t(e)})}}),n.ac.after("select",function(e){t._setRecord(r.id,e.result.raw)}))}})}};var Form=Y.Base.create("form",Y.Base,[FormXML,FormJSON,FormConditions,FormDataSources],{initializer:function(e){this.form=e.host,this.form.after("change",this._afterFormChange,this)},getNodeVisible:function(e){return!e.ancestor(".control-group").getAttribute("hidden")},setNodeVisible:function(e,t){e.ancestor(".control-group")[t?"show":"hide"]()},getNodeValue:function(e){var t=e.getData("type");if(t==="image")return e.getAttribute("src");var n=t==="checkbox"?e.get("checked").toString():e.get("value");return n},setNodeValue:function(e,t){var n=e.getData("type");if(n==="image"){e.setAttribute("src",t);return}if(t===this.getNodeValue(e))return;e.set("value",t)},_afterFormChange:function(e){}},{NS:"form"});Y.namespace("Rednose.Plugin").Form=Y.mix(Form,Y.Rednose.Plugin.Form)},"1.5.0-DEV",{requires:["autocomplete","highlight","io","model","model-list","rednose-datagen","template-micro","uploader","view","datatype-xml"]});
