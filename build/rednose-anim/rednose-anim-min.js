YUI.add("rednose-anim",function(e,t){function r(){r.superclass.constructor.apply(this)}var n=.25;r.slideInY=function(e){e.transition({duration:n,easing:"ease-in",height:"0px"},function(){e.setStyle("display","none"),e.setStyle("height","100%")})},r.slideOutY=function(e){e.setStyle("display","block");var t=e.getComputedStyle("height");e.setStyle("height",0),e.transition({duration:n,easing:"ease-out",height:t},function(){e.setStyle("height",null)})},r.fadeOut=function(t){var r=t.cloneNode(!0).set("id",null).setStyle("position","absolute"),i;e.one("body").appendChild(r),r.setXY(t.getXY()),i=new e.Anim({node:r,to:{opacity:0},duration:n,easing:e.Easing.easeOut}),i.on("end",function(){r.remove()}),i.run()},r.slideIn=function(t){var r=t.get("offsetWidth"),i=t.get("offsetHeight"),s;t.setStyle("width","0"),t.setStyle("height","0"),s=new e.Anim({node:t,duration:n,easing:e.Easing.easeOut,to:{width:r,height:i}}),s.run()},r.width=function(t,r){var i=new e.Anim({node:t,to:{width:r},duration:n,easing:e.Easing.easeOut});i.run()},r.vortex=function(t,r,i){var s;s=new e.Anim({node:t,to:{height:20,width:20,opacity:0,left:r,top:i},from:{width:t.get("offsetWidth"),height:t.get("offsetHeight")},duration:n}),s.on("end",function(){t.remove()}),s.run()},r.squeeze=function(t){var r;t.setStyle("opacity",0),r=new e.Anim({node:t,to:{width:0},duration:n,easing:e.Easing.easeOut}),r.on("end",function(){t.remove()}),r.run()},r.morph=function(e,t,n,r){n(e),e.set("innerHTML",t.get("outerHTML")),r(e)},e.namespace("Rednose").Anim=r},"1.6.0",{requires:["anim"]});
