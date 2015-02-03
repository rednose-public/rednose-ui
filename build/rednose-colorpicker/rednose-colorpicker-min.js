YUI.add("rednose-colorpicker",function(e,t){var n="update",r=e.Base.create("colorpicker",e.Widget,[],{template:'<div class="input-group"><input class="form-control" type="text" placeholder="Transparant" id="color" value="#FFFFFF" /><div class="input-group-btn"><button title="Configure table" type="button" class="btn btn-default"><i class="glyphicon glyphicon-adjust"></i></button></div></div>',overlayTemplate:'<div class="dropdown-menu"><div id="canvas"></div><div class="color-values">R: <input id="r" />, G: <input id="g" />, B: <input id="b" /></div></div>',_canvas:null,_overlay:null,_imageObj:null,_imageData:null,_mouseActive:!1,_picker:null,initializer:function(){var t=this;this._canvas=e.Node.create('<canvas class="rednose-colorpicker-canvas" height="256" width="256"></canvas>').getDOMNode(),this._picker=e.Node.create('<i class="rednose-colorpicker-pointer"><i>'),this._canvas.addEventListener("mousemove",function(e){t._mouseOver(e)}),this._canvas.addEventListener("mousedown",function(e){t._mouseActive=!0,t._mouseOver(e)}),this._picker.getDOMNode().addEventListener("mousedown",function(){t._mouseActive=!0}),this._canvas.addEventListener("mouseup",function(){t._mouseActive=!1}),this._picker.getDOMNode().addEventListener("mouseup",function(){t._mouseActive=!1}),this.after("colorChange",this._handleColorChange,this)},destructor:function(){this._picker.getDOMNode().removeEventListener("mousemove"),this._canvas.removeEventListener("mousemove"),this._overlay.destroy(),this._overlay.remove()},renderUI:function(){var e=this.get("contentBox");e.addClass("rednose-colorpicker"),e.append(this.template),e.one("input#color").on(["change","keyup"],this._handleColorInputChanged,this),e.one("input#color").on("blur",this._handleColorChange,this),e.one("button").on("click",this._handleColorClicked,this)},_handleColorChange:function(){var e=this.get("color"),t=this.get("hex").toUpperCase(),n=this.get("contentBox").one("#color");if(e===null){n.set("value",""),n.setStyle("backgroundColor","#FFFFFF"),n.setStyle("color","black");return}n.set("value",t),n.setStyle("backgroundColor",t);var r=1-(.299*e.red+.587*e.green+.114*e.blue)/255;r<.5?n.setStyle("color","black"):n.setStyle("color","white");if(this._overlay){var i=this._overlay.one(".color-values > input#r"),s=this._overlay.one(".color-values > input#g"),o=this._overlay.one(".color-values > input#b");i.set("value",e.red),s.set("value",e.green),o.set("value",e.blue)}},_handleColorClicked:function(t){var r=this,i=this.get("contentBox"),s=t.currentTarget,o=null;this._overlay===null?(o=new e.Node.create(this.overlayTemplate),this._renderCanvas(),o.one("div#canvas").append(this._canvas),o.one("div#canvas").append(this._picker),o.on("clickoutside",function(e){e.target!==s&&o.getStyle("display")==="block"&&(o.hide(),r.fire(n))}),o.all("input").on(["keyup","change"],r._onColorValueChange,r),e.one("body").append(o),this._overlay=o):o=this._overlay,o.setStyle("display","block"),o.setStyle("left",i.getX()),o.setStyle("top",s.getY()+parseInt(s.getComputedStyle("height"),10))},_handleColorInputChanged:function(e){var t=e.currentTarget.get("value");t===""&&(this.set("color",null),this.fire(n)),t.match(/^#([0-9a-f]{6})$/i)&&(this.set("hex",t.toUpperCase()),this.fire(n))},_onColorValueChange:function(){var e=this._overlay.one(".color-values > input#r"),t=this._overlay.one(".color-values > input#g"),n=this._overlay.one(".color-values > input#b"),r={};r.red=parseInt(e.get("value"),10)||0,r.green=parseInt(t.get("value"),10)||0,r.blue=parseInt(n.get("value"),10)||0,this._picker.setStyle("display","none"),this.set("color",r)},_mouseOver:function(e){if(this._mouseActive===!0){var t=this._canvas.getBoundingClientRect(),n=Math.round(e.clientX-t.left),r=Math.round(e.clientY-t.top);this._setPicker(e.clientX-3,e.clientY-3),this.set("color",this._getColor(n,r))}},_getColor:function(e,t){var n=this._canvas.getContext("2d"),r=this._imageObj;this._imageData===null&&(this._imageData=n.getImageData(0,0,r.height,r.width));var i=this._imageData.data,s=i[(r.width*t+e)*4],o=i[(r.width*t+e)*4+1],u=i[(r.width*t+e)*4+2];return{red:s,green:o,blue:u}},_renderCanvas:function(){var t=this,n=this.get("contentBox"),r=e.Node.create('<canvas height="0" width="0" class="buffer" />'),i=this._canvas.getContext("2d"),s=new Image;n.one("canvas.buffer")===null&&n.append(r),n.append(this._canvas);var o=r.getStyle("backgroundImage").replace("url(","").replace(/'/,"").replace(/"/g,"").replace(/[)]/g,"");s.onload=function(){i.drawImage(s,0,0),t._imageObj=s},s.src=o},_setPicker:function(e,t){this._picker.setStyle("display","block"),this._picker.setX(e),this._picker.setY(t)},_setHex:function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t!==null&&(this.set("color",{red:parseInt(t[1],16),green:parseInt(t[2],16),blue:parseInt(t[3],16)}),this._picker.setStyle("display","none")),null},_getHex:function(){var e=this.get("color"),t=[];if(e===null)return"";t=[e.red.toString(),e.green.toString(),e.blue.toString()];var n="#"+("0"+parseInt(t[0],10).toString(16)).slice(-2)+("0"+parseInt(t[1],10).toString(16)).slice(-2)+("0"+parseInt(t[2],10).toString(16)).slice(-2);return n}},{ATTRS:{color:{value:{green:255,red:255,blue:255}},hex:{value:null,getter:"_getHex",setter:"_setHex"}}});e.namespace("Rednose").Colorpicker=r},"@VERSION@",{requires:["base","event","node","widget"]});
