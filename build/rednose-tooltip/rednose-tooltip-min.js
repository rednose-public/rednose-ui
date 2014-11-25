YUI.add("rednose-tooltip",function(e,t){var n=e.Base.create("tooltip",e.Base,[],{template:'<div class="tooltip fade"><div class="tooltip-arrow"></div><div class="tooltip-inner">###</div></div>',initializer:function(){var t=this.get("selectorContainer");t||(t=document.body),e.delegate(["mouseover","mouseout"],this._handleEvent,t,this.get("selector"),this)},_handleEvent:function(e){var t=e.currentTarget,n=e.type;t.getData("tooltipElement")===undefined&&this._addTooltip(t),n==="mouseover"?this._showTooltip(t):this._hideTooltip(t)},_showTooltip:function(t){var n=t.getData("tooltipElement"),r=this._getDimensions(t),i;e.one("body").append(n),i=this._getDimensions(n);switch(this.get("placement").toLowerCase()){case"top":n.setStyle("left",r.x+r.width/2-i.width/2),n.setStyle("top",r.y-i.height);break;case"left":n.setStyle("left",r.x-i.width),n.setStyle("top",r.y-r.height/2);break;case"right":n.setStyle("left",r.x+r.width),n.setStyle("top",r.y-r.height/2);break;case"bottom":n.setStyle("left",r.x+r.width/2-i.width/2),n.setStyle("top",r.y+r.height)}this._fade(t,!0)},_hideTooltip:function(e){this._fade(e,!1)},_fade:function(t,n){var r=t.getData("tooltipElement"),i;n?i=new e.Anim({duration:.2,node:r,from:{opacity:0},to:{opacity:1}}):(i=new e.Anim({duration:.2,node:r,from:{opacity:1},to:{opacity:0}}),i.on("end",function(){r.remove()})),i.run()},_addTooltip:function(t){var n=e.Node.create(this.template);n.addClass(this.get("placement")),n.setStyle("position","absolute"),n.setStyle("left","0"),n.setStyle("top","0"),t.hasAttribute("title")&&n.one(".tooltip-inner").setContent(t.getAttribute("title")),t.setData("tooltipElement",n)},_getDimensions:function(e){return{x:e.getX(),y:e.getY(),width:e.get("offsetWidth"),height:e.get("offsetHeight")}}},{ATTRS:{selectorContainer:{value:null},selector:{value:!1},placement:{value:"top"}}});e.namespace("Rednose").Tooltip=n},"1.6.0",{requires:["base","node","anim"]});
