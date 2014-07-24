YUI.add("rednose-trim",function(e,t){var n=e.Base.create("trim",e.Base,[],{templates:{payload:'<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"><soap:Body>{body}</soap:Body></soap:Envelope>',recordSearch:'<Execute xmlns="http://www.towersoft.com/schema/webservice/trim2/"><req><HideVersionNumbers>true</HideVersionNumbers><ProvideTimingResults>false</ProvideTimingResults><ForceRealTimeCacheUpdate>false</ForceRealTimeCacheUpdate><RecordSearch><IsForUpdate>false</IsForUpdate><Limit>0</Limit><Sort1>None</Sort1><Sort1Descending>false</Sort1Descending><Sort2>None</Sort2><Sort2Descending>false</Sort2Descending><Sort3>None</Sort3><Sort3Descending>false</Sort3Descending><FilterFinalizedState>Both</FilterFinalizedState><Type>All</Type><RecordStringSearchClause><Type>RecordNumber</Type><Arg>{arg}</Arg></RecordStringSearchClause><RecordStringSearchClause><Type>AnyWord</Type><Arg>{arg}</Arg></RecordStringSearchClause><RecordOrSearchClause/></RecordSearch><Fetch><TargetForUpdate>false</TargetForUpdate><Items><SpecificationProperty><Name>recNumber</Name></SpecificationProperty><SpecificationProperty><Name>recTypedTitle</Name></SpecificationProperty></Items><Limit>0</Limit><Populate>0</Populate><HideVersion>false</HideVersion></Fetch></req></Execute>'},query:function(t){var n=this.templates,r=e.Lang.sub(n.recordSearch,{arg:t}),i=e.Lang.sub(n.payload,{body:r}),s=this;return e.Promise(function(t){s._invoke(i).then(function(n){var r=n.getElementsByTagName("TrimObject"),i=[];e.Array.each(r,function(t){var n={};e.Array.each(t.childNodes[1].childNodes,function(e){e.nodeName==="Value"&&(n[e.getAttribute("Name")]=e.getAttribute("Val"))}),i.push(n)}),t(i)})})},_invoke:function(t){var n=this.get("url");return e.Promise(function(r){e.io(n,{method:"POST",data:t,on:{success:function(t,n){r(e.XML.parse(n.responseText))}}})})}},{ATTRS:{url:{value:null}}});e.namespace("Rednose").Trim=n;var r=e.Base.create("form",e.View,[],{initializer:function(){var t=this.get("container"),n=t.one("form"),r=this;this.model={sources:{Demo:{records:[]},Trim:{records:[]}},data:{Demo:null,Trim:null}},n.after("change",this._afterFormChange,this),this.datasource=new e.Rednose.Trim({url:"http://trim-dummy.dev/trimws/trim.asmx"}),this.updateModel(),this.datagen=new e.Rednose.Datagen({url:"http://admin:adminpasswd@datagen-standard.dev",section:"Demo section"}),t.all("[data-type=autocomplete]").each(function(t){t.plug(e.Plugin.AutoComplete,{resultHighlighter:"phraseMatch",source:"http://admin:adminpasswd@datagen-standard.dev/api/datagen/sections/Kamerleden/records?query={query}&callback={callback}"}),t.ac.after("select",function(t){var n=t.result.raw;r.model.data.Kamerleden=e.clone(n),r.updateForm(),r.updateModel()})})},updateSource:function(t,n){var r=this.get("container"),i=this.model,s=this;i.sources[t].records={},e.Array.each(n,function(n){i.sources[t].records[e.stamp(n)]=n}),r.all("[data-datasource]").each(function(n){var r=e.JSON.parse(n.getData("datasource"));r.id===t&&s._updateSelectNode(n,i.sources[t].records,r.map)})},updateModel:function(){var t=this.get("container"),n=this;t.all("[data-path]").each(function(t){var r=t.getData("path");n._setValueByPath(n.model.data,r,n.getNodeValue(t));if(t.getData("bindings")){var i=e.JSON.parse(t.getData("bindings"));e.Array.each(i,function(e){n._setValueByPath(n.model.data,e,n.getNodeValue(t))})}}),console.log(this.model)},updateForm:function(){var t=this.get("container"),n=this.model,r=this;t.all("[data-bindings]").each(function(t){var i=e.JSON.parse(t.getData("bindings"));e.Array.each(i,function(e){r.setNodeValue(t,r._getValueByPath(n.data,e))})})},getNodeValue:function(e){var t=e.getData("type");if(t==="image")return e.getAttribute("src");var n=t==="checkbox"?e.get("checked").toString():e.get("value");return n===""?null:n},setNodeValue:function(e,t){t===""&&(t=null);var n=e.getData("type");if(n==="image"){e.setAttribute("src",t);return}if(t===this.getNodeValue(e))return;if(t===null||t===undefined)t="";e.set("value",t)},_afterFormChange:function(t){var n=t.target,r=n.getData("type"),i=this.model;this.updateModel();if(n.getData("datasource")){var s=e.JSON.parse(n.getData("datasource"));if(r==="dropdown"){var o=n.get("options").item(n.get("selectedIndex")),u=i.sources[s.id].records[o.getData("record")];i.data[s.id]=u?e.clone(u):null}}this.updateForm(),this.updateModel()},_updateSelectNode:function(t,n,r){var i=this;t.empty(),t.append(e.Lang.sub('<option value="{value}">{text}</option>',{value:"",text:"..."})),e.Object.each(n,function(n){var s=i._getValueByPath(n,r.value),o=i._getValueByPath(n,r.text);t.append(e.Lang.sub('<option value="{value}" data-record="{record}">{text}</option>',{value:s,text:o,record:e.stamp(n)}))})},_getValueByPath:function(t,n){var r=n.split(".");for(var i=0,s=r.length;i<s;i++){if(!(e.Lang.isObject(t)&&r[i]in t)){t=undefined;break}t=t[r[i]]}return t},_setValueByPath:function(e,t,n){var r=t.split(".");for(var i=0,s=r.length;i<s;i++){if(i===s-1){e[r[i]]=n;break}e[r[i]]||(e[r[i]]={}),e=e[r[i]]}}});e.namespace("Rednose").Form=r},"1.5.0-DEV",{requires:["autocomplete","base","io","json","model","promise","view","xml"]});
