YUI.add("rednose-trim",function(e,t){var n=e.Base.create("trim",e.Base,[],{templates:{payload:'<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"><soap:Body>{body}</soap:Body></soap:Envelope>',recordSearch:'<Execute xmlns="http://www.towersoft.com/schema/webservice/trim2/"><req><HideVersionNumbers>true</HideVersionNumbers><ProvideTimingResults>false</ProvideTimingResults><ForceRealTimeCacheUpdate>false</ForceRealTimeCacheUpdate><RecordSearch><IsForUpdate>false</IsForUpdate><Limit>0</Limit><Sort1>None</Sort1><Sort1Descending>false</Sort1Descending><Sort2>None</Sort2><Sort2Descending>false</Sort2Descending><Sort3>None</Sort3><Sort3Descending>false</Sort3Descending><FilterFinalizedState>Both</FilterFinalizedState><Type>All</Type><RecordStringSearchClause><Type>RecordNumber</Type><Arg>{arg}</Arg></RecordStringSearchClause><RecordStringSearchClause><Type>AnyWord</Type><Arg>{arg}</Arg></RecordStringSearchClause><RecordOrSearchClause/></RecordSearch><Fetch><TargetForUpdate>false</TargetForUpdate><Items><SpecificationProperty><Name>recNumber</Name></SpecificationProperty><SpecificationProperty><Name>recTypedTitle</Name></SpecificationProperty></Items><Limit>0</Limit><Populate>0</Populate><HideVersion>false</HideVersion></Fetch></req></Execute>'},query:function(t){var n=this.templates,r=e.Lang.sub(n.recordSearch,{arg:t}),i=e.Lang.sub(n.payload,{body:r}),s=this;return e.Promise(function(t){s._invoke(i).then(function(n){var r=n.getElementsByTagName("TrimObject"),i=[];e.Array.each(r,function(t){var n={};e.Array.each(t.childNodes[1].childNodes,function(e){e.nodeName==="Value"&&(n[e.getAttribute("Name")]=e.getAttribute("Val"))}),i.push(n)}),t(i)})})},_invoke:function(t){var n=this.get("url");return e.Promise(function(r){e.io(n,{method:"POST",data:t,on:{success:function(t,n){r(e.XML.parse(n.responseText))}}})})}},{ATTRS:{url:{value:null}}});e.namespace("Rednose").Trim=n;var r=e.Base.create("form",e.View,[],{initializer:function(){var t=this.get("container"),n=t.one("form"),r=this;this.model={sources:{Demo:{records:[]},Trim:{records:[]}},data:{Demo:null,Trim:null}},n.after("change",this._afterFormChange,this),this.datasource=new e.Rednose.Trim({url:"http://trim-dummy.dev/app_dev.php/trimws/trim.asmx"});var i=this.model;this.datagen=new e.Rednose.Datagen({url:"http://admin:adminpasswd@datagen-standard.dev/app_dev.php",section:"Demo section"}),t.one("#rednose_form_GegevensGeadresseerde_Sender_Address_Button").on("click",function(){r.datagen.query("test").then(function(e){i.sources.Demo.records=e,r.updateSource("Demo")})}),t.one("#rednose_form_TRIM_Trim_Button").on("click",function(){r.datasource.query("test").then(function(e){i.sources.Trim.records=e,r.updateSource("Trim")})})},updateSource:function(t){var n=this.get("container"),r=this.model,i=this;n.all("[data-datasource]").each(function(n){var s=e.JSON.parse(n.getData("datasource"));s.id===t&&i._updateSelectNode(n,r.sources[t].records,s.map)})},_onButtonClick:function(t){var n=t.target,r=n.getData("bindings"),i=this;if(!r)return;e.Array.each(e.JSON.parse(r),function(t){i.datasource.recordSearch("test").then(function(t){var n=i.get("container");n.all("[data-datasource]").each(function(n){var r=e.JSON.parse(n.getData("datasource"));r.id==="Trim"&&(n.empty(),e.Array.each(t,function(t){var s=t[i._parseTemplate(r.map.id)],o=t[i._parseTemplate(r.map.value)];n.append(e.Node.create('<option id="'+s+'">'+o+"</option>"))}))})}),console.log(t)})},_afterFormChange:function(e){var t=e.target,n=t.getData("type"),r=t.get("type")==="checkbox"?t.get("checked").toString():t.get("value");console.log("change!")},_updateSelectNode:function(t,n,r){var i=this;t.empty(),e.Array.each(n,function(n){var s=i._getValueByPath(n,r.value),o=i._getValueByPath(n,r.text);t.append(e.Lang.sub('<option value="{value}">{text}</option>',{value:s,text:o}))})},_getValueByPath:function(e,t){var n=t.split(".");for(var r=0,i=n.length;r<i;r++){if(!(typeof e=="object"&&n[r]in e)){e=undefined;break}e=e[n[r]]}return e},_setValueByPath:function(e,t,n){}},{ATTRS:{}});e.namespace("Rednose").Form=r},"1.5.0-DEV",{requires:["base","io","json","model","promise","view","xml"]});
