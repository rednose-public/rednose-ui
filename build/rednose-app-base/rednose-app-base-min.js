YUI.add("rednose-app-base",function(e,t){var n="rednose-spinner",r=e.Base.create("app",e.App,[],{_activePanel:null,initializer:function(){e.Do.after(function(){window.self!==window.top&&typeof (window.parent.openApp()==="function")&&window.parent.openApp()},this,"render",this)},destructor:function(){this._activePanel&&this._activePanel.destroy(),this._activePanel=null},closeApp:function(){window.self!==window.top&&typeof (window.parent.closeApp()==="function")&&window.parent.closeApp()},showView:function(t,n,i,s){var o=this,u=this.getViewInfo(t);if(u.modal||this.get("activeView")&&this.getViewInfo(this.get("activeView")).modal)i=i||{},i.transition=!1;u.lazyload?(r.showSpinner(),e.use(u.lazyload,function(){r.hideSpinner(),r.superclass.showView.apply(o,[t,n,i,s])})):r.superclass.showView.apply(o,[t,n,i,s])},_detachView:function(t){if(!t)return;if(this.getViewInfo(this.get("activeView")).modal){t.removeTarget(this);return}var n=this.getViewInfo(t)||{};n.preserve?t.remove():(t.destroy({remove:!0}),delete this._viewInfoMap[e.stamp(t,!0)],t===n.instance&&delete n.instance),t.removeTarget(this)},_attachView:function(t,n){if(!t)return;var r=this.getViewInfo(t),i=this.get("viewContainer");t.addTarget(this),r&&(r.instance=t),this._activePanel&&this._activePanel.destroy(),r.modal?(this._activePanel=new e.Rednose.Panel({srcNode:t.get("container"),centered:!0,modal:!0,render:!0,zIndex:e.Object.size(this._viewInfoMap),hideOn:[]}),this._activePanel.get("boundingBox").addClass("rednose-app-modal-view")):i[n?"prepend":"append"](t.get("container"))}});r.showSpinner=function(){e.one("body").prepend(e.Node.create('<div class="'+n+'"></div>'))},r.hideSpinner=function(){e.all("."+n).remove()},e.namespace("Rednose").App=r},"1.1.0-DEV",{requires:["app-base","cssgrids","event-custom","handlebars-base","rednose-app-templates","rednose-panel"],skinnable:!0});
