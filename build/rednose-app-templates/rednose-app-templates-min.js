YUI.add("rednose-app-templates",function(e,t){function n(){}function r(){}function i(){i.superclass.constructor.apply(this)}n.prototype={template:'<div class="rednose-grid rednose-three-column-grid"><div class="rednose-unit-left"></div><div class="rednose-unit-main"></div><div class="rednose-unit-right"></div></div>',initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t),this.set("gridLeft",e.one(".rednose-unit-left")),this.set("gridMain",e.one(".rednose-unit-main")),this.set("gridRight",e.one(".rednose-unit-right")),this.set("viewContainer",this.get("gridMain"))}},n.ATTRS={gridLeft:{value:null},gridMain:{value:null},gridRight:{value:null}},e.namespace("Rednose.Template").ThreeColumn=n,r.prototype={template:'<div class="rednose-grid rednose-three-column-grid"><div class="rednose-unit-left"></div><div class="rednose-unit-main"></div></div>',initializer:function(){var e=this.get("container"),t=this.template;e.setHTML(t),this.set("gridLeft",e.one(".rednose-unit-left")),this.set("gridMain",e.one(".rednose-unit-main")),this.set("viewContainer",this.get("gridMain"))}},n.ATTRS={gridLeft:{value:null},gridMain:{value:null}},e.namespace("Rednose.Template").TwoColumn=r,i.detailApp='<div class="yui3-g rednose-app-detail-container"><div class="yui3-u rednose-app-detail-view"></div></div>',i.masterDetailApp='<div class="yui3-g rednose-app-master-detail-container"><div class="yui3-u rednose-app-master-view"></div><div class="yui3-u rednose-app-detail-view"></div></div>',i.masterDetailGrid='<div class="yui3-g rednose-grid-master-detail-container"><div class="yui3-u rednose-grid-master-view"></div><div class="yui3-u rednose-grid-detail-view"></div></div>',i.viewMessage='<div class="rednose-app-message-container"><div class="rednose-app-message-title">{message}</div><div class="rednose-app-message-body">{subMessage}</div></div>',e.namespace("Rednose").Templates=i},"1.1.0-DEV");
