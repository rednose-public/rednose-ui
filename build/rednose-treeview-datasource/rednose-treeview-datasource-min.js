YUI.add("rednose-treeview-datasource",function(e,t){function n(){n.superclass.constructor.apply(this,arguments)}function r(){r.superclass.constructor.apply(this,arguments)}e.mix(n,{NS:"datasource",NAME:"treeViewDataSource",ATTRS:{datasource:{value:null}}}),e.extend(n,e.Plugin.Base,{load:function(t,n,r){var i=this.get("datasource");i&&i.sendRequest({request:t,on:{success:e.bind(this._onRequestSuccess,this,n),failure:e.bind(this._onRequestFailure,this,r)}})},_onRequestSuccess:function(e,t){var n=t.response&&t.response.results||[];this.get("host").set("nodes",n),e&&e.call(this)},_onRequestFailure:function(e){e&&e.call(this)}}),e.namespace("Rednose.Plugin").TreeViewDataSource=n,e.mix(r,{NS:"datasource",NAME:"multiTreeViewDataSource",ATTRS:{datasource:{value:null}}}),e.extend(r,e.Plugin.Base,{load:function(t,n,r){var i=this.get("datasource");i&&i.sendRequest({request:t,on:{success:e.bind(this._onRequestSuccess,this,n),failure:e.bind(this._onRequestFailure,this,r)}})},_onRequestSuccess:function(e,t){var n=t.response&&t.response.results||[];this.get("host").set("trees",n),e&&e.call(this)},_onRequestFailure:function(e){e&&e.call(this)}}),e.namespace("Rednose.Plugin").MultiTreeViewDataSource=r},"1.6.0",{requires:["plugin"]});
