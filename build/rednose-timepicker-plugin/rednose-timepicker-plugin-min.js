YUI.add("rednose-timepicker-plugin",function(e,t){e.namespace("Rednose.Plugin").Timepicker=e.Base.create("timepicker",e.Base,[e.Plugin.Base],{_element:null,initializer:function(t){this._host=t.host;var n=e.config.lang||null,r=$(this._host.getDOMNode());r.datetimepicker({pickTime:!0,language:n}),this._element=r.data("datetimepicker"),this._element.setDate(this._element.getDate())},_getDate:function(){return this._element.getDate()},_setDate:function(e){return this._element.setDate(e),e}},{NS:"timepicker",ATTRS:{date:{value:null,getter:"_getDate",setter:"_setDate"}}})},"1.4.0",{requires:["rednose-datetimepicker-base"]});
