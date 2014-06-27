YUI.add("rednose-ruler-base",function(e,t){var n=e.Base.create("ruler",e.View,[],{initializer:function(){var t=this,n=this.get("container");this.sizeType=this.get("vertical")?"height":"width",this.styleType=this.get("vertical")?"top":"left",e.after("windowresize",function(){t.render()}),this._pixelMillimeter()},destructor:function(){},render:function(){var e=this.get("container"),t=this.get("vertical")?"rednose-vertical-ruler":"rednose-horizontal-ruler";return e.addClass(t),e.setStyle(this.sizeType,this.get("maxWidth")+"mm"),this._renderRuler(),this},_renderRuler:function(){var t=this.get("container"),n=e.Node.create('<div class="inner-ruler" />');t.setHTML(n);var r=this.get("maxWidth"),i=0,s;n.setHTML("");while(i<=r)i%10===0?(s=e.Node.create('<div class="tickLabel"><span>'+(this.get("centimeter")?i/10:i)+"</span></div>"),s.setStyle(this.styleType,i+"mm"),n.append(s)):i%5===0?(s=e.Node.create('<div class="tickMajor" />'),s.setStyle(this.styleType,i+"mm"),n.append(s)):i%1===0&&(s=e.Node.create('<div class="tickMinor" />'),s.setStyle(this.styleType,i+"mm"),n.append(s)),i+=1},_pixelMillimeter:function(t){if(!this._ratio){var n=this.get("container"),r=e.Node.create('<div style="width: 1mm;" />'),i;n.append(r),this._ratio=parseFloat(r.getComputedStyle("width")),r.remove(!0),r.destroy()}return t/this._ratio}},{ATTRS:{vertical:{value:!1},centimeter:{value:!1},maxWidth:{value:null}}});e.namespace("Rednose.Ruler").Base=n,e.Rednose.Ruler=e.mix(e.Base.create("ruler",n,[]),e.Rednose.Ruler,!0)},"1.5.0-DEV",{requires:["node","event-resize","view"]});