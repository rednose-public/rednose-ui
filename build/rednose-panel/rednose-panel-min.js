YUI.add("rednose-panel",function(e,t){var n,r=500,i=100,s=1050,o="yui3-button-close",u="yui3-widget-hd";n=e.Base.create("panel",e.Panel,[],{initializer:function(e){e||(e={}),this.set("zIndex",s),this.set("centered",!0),this.set("modal",!0),this.set("hideOn",[]),this.set("width",e.width||r),this.after("render",this._afterRender,this)},_afterRender:function(){var e=this.get("boundingBox"),t=e.one("."+o);t&&t.ancestor("."+u).remove(),e.setStyle("top",i)}}),e.namespace("Rednose").Panel=n},"1.1.0-DEV",{group:"rednose-ui",requires:["panel","rednose-panel-css"],supersedes:["skin-sam-widget-base","skin-sam-panel"]});