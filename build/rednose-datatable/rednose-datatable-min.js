YUI.add("rednose-datatable",function(e,t){var n,r="rednose-datatable",i="table";n=e.Base.create("dataTable",e.DataTable.Base,[e.DataTable.Scrollable,e.DataTable.Sortable],{initializer:function(){var e=this.get("boundingBox");this.after("render",function(){e.one("table").addClass(i)})}}),n.CSS_PREFIX=r,e.namespace("Rednose").DataTable=n},"1.3.0",{requires:["datatable-base","datatable-scroll","datatable-sort"],supersedes:["skin-sam-datatable-base"],skinnable:!0});
