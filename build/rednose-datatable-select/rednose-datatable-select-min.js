YUI.add("rednose-datatable-select",function(e,t){function a(){a.superclass.constructor.apply(this,arguments)}function c(){a.superclass.constructor.apply(this,arguments)}var n="selected",r="data",i="columns",s="icon-white",o="data-yui3-record",u="select";a.NAME="dataTableSelectPlugin",a.NS="selectable",a.ATTRS={selectedRow:{value:null}},e.extend(a,e.Plugin.Base,{initializer:function(){var e=this.get("host"),t=e.get("contentBox");this.after("selectedRowChange",this._afterSelectedRowChange,this),t.on("click",this._handleClick,this),t.on("clickoutside",this._handleClickOutside,this)},setSelection:function(e){var t=this.get("host"),n=t.getRow(e);n&&this.set("selectedRow",n)},getSelection:function(){var e=this.get("selectedRow");return e===null?null:this._getModelFromTableRow(e)},_handleClick:function(e){var t=e.target,n=this.get("host");if(t.test("a"))return!1;if(t.ancestor("."+n.getClassName(r)+" tr"))this.set("selectedRow",t.ancestor("."+n.getClassName(r)+" tr"));else{if(t.ancestor("."+n.getClassName(i)))return!1;this.set("selectedRow",null)}return!0},_handleClickOutside:function(){},_afterSelectedRowChange:function(t){var r=this.get("host"),i=t.newVal,o=t.prevVal,a=null;return i===o?!1:(o&&(o.all("td").removeClass(r.getClassName(n)),o.one("i")&&o.one("i").hasClass(s)&&o.one("i").removeClass(s)),e.Lang.isNull(i)===!1&&(i.all("td").addClass(r.getClassName(n)),i.one("i")&&i.one("i").addClass(s),a=this._getModelFromTableRow(i)),r.fire(u,{model:a}),!0)},_getModelFromTableRow:function(e){var t=e.getAttribute(o),n=this.get("host").data;return n.getByClientId(t)}}),e.namespace("Rednose").DataTableSelectPlugin=a;var f="rednose-datatable-col-",l="rednose-datatable-input";c.NAME="dataTableEditRowPlugin",c.NS="editable",e.extend(c,e.Plugin.Base,{_activeInputNode:null,initializer:function(){var e=this,t=this.get("host"),n=t.get("data");this._renderFields(),n.before(["add","remove"],function(){e._updateModel()}),n.after(["add","remove"],function(){e._renderFields()})},getData:function(){return this._updateModel(),this.get("host").get("data")},_renderFields:function(t){var n=this,r=this.get("host"),i=r.get("boundingBox"),s=r.get("columns");e.Array.each(s,function(e){var t=f+e.key;e.editable&&i.all("td."+t).each(function(t){var i=r.getRecord(t.ancestor("tr").getAttribute("data-yui3-record"));n._addField(t,i,e.key)})})},_addField:function(t,n,r){var i=this,s=t.get("text"),o=e.Node.create("<input />");o.set("value",s),o.addClass(l),o.setAttribute("name",r),o.setData("model",n),t.setHTML(""),t.append(o)},_updateModel:function(){var t=this.get("host"),n=t.get("boundingBox"),r=[];n.all("input").each(function(e){r.push({model:e.getData("model"),property:e.get("name"),value:e.get("value")})}),e.Array.each(r,function(e){e.model.set(e.property,e.value)})}}),e.namespace("Rednose").DataTableEditRowPlugin=c},"1.1.0-DEV",{requires:["rednose-datatable","plugin"]});
