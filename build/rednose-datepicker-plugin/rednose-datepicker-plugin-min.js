YUI.add("rednose-datepicker-plugin",function(e,t){e.namespace("Rednose.Plugin").Datepicker=e.Base.create("datepicker",e.Base,[e.Plugin.Base],{_element:null,initializer:function(t){this._host=t.host;var n=e.config.lang||null,r=$(this._host.getDOMNode());r.datepicker({language:n})},_getDate:function(){return this._element._date},_setDate:function(e){return this._element.setDate(e),e}},{NS:"datepicker",ATTRS:{date:{value:null,getter:"_getDate",setter:"_setDate"}}})},"1.7.0",{requires:["rednose-datetimepicker-base"]});
