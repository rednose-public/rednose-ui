YUI.add("rednose-app-base",function(e,t){var n="rednose-spinner",r=1088,i=640,s="rednose",o=e.Base.create("app",e.App,[],{_activePanel:null,_backgroundView:null,initializer:function(t){t||(t={});var n=this.get("container");t.debug&&(e.Transition.fx["app:fadeIn"].duration=1,e.Transition.fx["app:fadeOut"].duration=1,e.Transition.fx["app:slideRight"].duration=1,e.Transition.fx["app:slideLeft"].duration=1),n.addClass(s+"-"+e.Rednose.Util.camelCaseToDash(this.name))},destructor:function(){this._activePanel&&this._activePanel.destroy(),this._activePanel=null},popModalView:function(){var e=this.get("activeView"),t=this.getViewInfo(e);t.modal&&this._backgroundView&&this.showView(this._backgroundView)},createView:function(t,n){n||(n={});var r=this.getViewInfo(t),i=r&&r.type||e.View,s,o;return n.container=e.Node.create("<div></div>"),n.transitions=this.get("transitions"),s=e.Lang.isString(i)?e.Object.getValue(e,i.split(".")):i,o=new s(n),this._viewInfoMap[e.stamp(o,!0)]=r,o},showView:function(t,n,r,i){var s=this,u=this.getViewInfo(t);if(u.modal||this.get("activeView")&&this.getViewInfo(this.get("activeView")).modal)r=r||{},r.transition=!1;u.lazyload?(o.showSpinner(),e.use(u.lazyload,function(){o.hideSpinner(),o.superclass.showView.apply(s,[t,n,r,i])})):o.superclass.showView.apply(s,[t,n,r,i])},_detachView:function(t){if(!t)return;if(this.getViewInfo(this.get("activeView")).modal){this._backgroundView=t,t.removeTarget(this);return}this._activePanel&&this._activePanel.destroy();var n=this.getViewInfo(t)||{};n.preserve?t.remove():(t.destroy({remove:!0}),delete this._viewInfoMap[e.stamp(t,!0)],t===n.instance&&delete n.instance),t.removeTarget(this)},_attachView:function(t,n){if(!t)return;var s=this.getViewInfo(t),o=this.get("viewContainer");t.addTarget(this),s&&(s.instance=t);if(s.modal)t.after("close",this.popModalView,this),this._activePanel=new e.Rednose.Panel({srcNode:t.get("container"),width:s.width||r,height:s.height||i}),s.top&&this._activePanel.set("top",s.top),this._activePanel.render(),typeof t.sizeView=="function"&&t.sizeView(this._activePanel.get("boundingBox"));else{if(this._backgroundView){this._backgroundView=null;return}t.get("container").inDoc()===!1&&o[n?"prepend":"append"](t.get("container")),typeof t.sizeView=="function"&&t.sizeView(o)}}},{ATTRS:{linkSelector:{value:null}}});o.showSpinner=function(){e.one("body").prepend(e.Node.create('<div class="'+n+'"></div>'))},o.hideSpinner=function(){e.all("."+n).remove()},o.MESSAGE_TEMPLATE='<div class="rednose-grid-message-container"><div class="rednose-grid-message-title">{title}</div><div class="rednose-grid-message-body">{subtitle}</div></div>',o.createMessage=function(t,n){return subitle=n||"",e.Node.create(e.Lang.sub(this.MESSAGE_TEMPLATE,{title:t,subtitle:n}))},o.setTitle=function(t,n){n&&(t=t.concat(" *")),e.one("title")||e.one("head").append(e.Node.create("<title/>")),e.one("title").setHTML(t)},e.Rednose.App=e.mix(o,e.Rednose.App)},"@VERSION@",{requires:["app-base","rednose-panel","rednose-util"]});
