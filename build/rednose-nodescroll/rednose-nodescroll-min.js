YUI.add("rednose-nodescroll",function(e,t){var n=25,r="rednose-scroll-view",i="scrolling",s=e.Base.create("nodescroll",e.Base,[],{_anim:null,initializer:function(){var e=this.get("container"),t=this.get("groups");e.addClass(r),this._bindDD(e,t),this.on("drop:over",this._handle,this)},destructor:function(){var e=this.get("container");e.hasClass(r)&&e.removeClass(r),this._anim=null},_bindDD:function(t,n){new e.DD.Drop({node:t,bubbleTargets:this,groups:n})},_handle:function(t){var r=t.drop.get("node"),s=t.drag.mouseXY[1],o=r.get("offsetHeight"),u=n,a=s-u,f=this,l,c;a>o?c=function(){return[0,l.get("scrollTop")+l.get("offsetHeight")]}:a<n?c=function(){return[0,l.get("scrollTop")-l.get("offsetHeight")]}:this._anim&&this._anim.get("running")&&(this._anim.stop(),e.DD.DDM.syncActiveShims(!0)),c&&(l=r,this._anim===null&&(this._anim=new e.Anim({node:l,to:{scroll:c},easing:e.Easing.easeOut,duration:.01*l.get("offsetHeight")})),this._anim.set("to",{scroll:c}),this._anim.run(),this._anim.on("tween",function(){f.fire(i)}),this._anim.on("end",function(){e.DD.DDM.syncActiveShims(!0)}))}},{ATTRS:{container:{value:null},groups:{value:[]}}});e.namespace("Rednose").NodeScroll=s},"1.4.0",{requires:["node","event","dd","anim"]});
