YUI.add("rednose-datatable",function(e,t){var n,r="rednose-datatable",i="table",s="table-condensed";n=e.Base.create("dataTable",e.DataTable.Base,[e.DataTable.Scrollable,e.DataTable.Sortable,e.DataTable.ColumnWidths],{initializer:function(){var e=this.get("boundingBox"),t=this.get("condensed");this.after("render",function(){e.one("table").addClass(i),t===!0&&e.one("table").addClass(s)})}},{ATTRS:{condensed:{value:!1}}}),n.CSS_PREFIX=r,e.namespace("Rednose").DataTable=n},"@VERSION@",{requires:["datatable-base","datatable-scroll","datatable-sort","rednose-util"],supersedes:["skin-sam-datatable-base"]});
