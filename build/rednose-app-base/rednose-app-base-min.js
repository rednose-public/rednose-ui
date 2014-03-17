YUI.add("rednose-app-base",function(e,t){var n=e.Base.create("appView",e.View,[],{_app:null,destructor:function(){this._app.destroy(),this._app=null},render:function(){var e=this.get("constructor"),t=this.get("container");return this._app=(new e({container:t,transitions:!0})).render(),this._app.addTarget(this),this},sizeView:function(e){this._app&&typeof this._app.sizeView=="function"&&this._app.sizeView(e)}},{ATTRS:{constructor:{value:null}}}),r="rednose-spinner",i=1088,s=640,o=e.Base.create("app",e.App,[],{DEBUG:!1,_activePanel:null,_backgroundView:null,initializer:function(){this.DEBUG&&(e.Transition.fx["app:fadeIn"].duration=1,e.Transition.fx["app:fadeOut"].duration=1,e.Transition.fx["app:slideRight"].duration=1,e.Transition.fx["app:slideLeft"].duration=1),e.Do.after(function(){window.self!==window.top&&typeof (window.parent.openApp()==="function")&&window.parent.openApp()},this,"render",this)},destructor:function(){this._activePanel&&this._activePanel.destroy(),this._activePanel=null},createView:function(t,r){var i=this.getViewInfo(t),s=i&&i.type||e.View,o,u;return o=e.Lang.isString(s)?e.Object.getValue(e,s.split(".")):s,o.superclass.constructor.NAME==="app"?u=new n({constructor:o}):u=new o(r),this._viewInfoMap[e.stamp(u,!0)]=i,u},closeApp:function(){window.self!==window.top&&typeof (window.parent.closeApp()==="function")&&window.parent.closeApp()},popModalView:function(){var e=this.get("activeView"),t=this.getViewInfo(e);t.modal&&this._backgroundView&&this.showView(this._backgroundView)},showView:function(t,n,r,i){var s=this,u=this.getViewInfo(t);if(u.modal||this.get("activeView")&&this.getViewInfo(this.get("activeView")).modal)r=r||{},r.transition=!1;u.lazyload?(o.showSpinner(),e.use(u.lazyload,function(){o.hideSpinner(),o.superclass.showView.apply(s,[t,n,r,i])})):o.superclass.showView.apply(s,[t,n,r,i])},_detachView:function(t){if(!t)return;if(this.getViewInfo(this.get("activeView")).modal){this._backgroundView=t,t.removeTarget(this);return}this._activePanel&&this._activePanel.destroy();var n=this.getViewInfo(t)||{};n.preserve?t.remove():(t.destroy({remove:!0}),delete this._viewInfoMap[e.stamp(t,!0)],t===n.instance&&delete n.instance),t.removeTarget(this)},_attachView:function(t,n){if(!t)return;var r=this.getViewInfo(t),o=this.get("viewContainer");t.addTarget(this),r&&(r.instance=t);if(r.modal)typeof r.instance.get("panel")=="undefined"&&(this._activePanel=new e.Rednose.Panel({srcNode:t.get("container"),width:r.width||i,height:r.height||s}),this._activePanel.render(),typeof t.sizeView=="function"&&t.sizeView(this._activePanel.get("boundingBox")));else{if(this._backgroundView){this._backgroundView=null;return}typeof t.sizeView=="function"&&t.sizeView(o),t.get("container").inDoc()===!1&&o[n?"prepend":"append"](t.get("container"))}}},{ATTRS:{linkSelector:{value:null}}});o.showSpinner=function(){e.one("body").prepend(e.Node.create('<div class="'+r+'"></div>'))},o.hideSpinner=function(){e.all("."+r).remove()},o.MESSAGE_TEMPLATE='<div class="rednose-grid-message-container"><div class="rednose-grid-message-title">{title}</div><div class="rednose-grid-message-body">{subtitle}</div></div>',o.createMessage=function(t,n){return subitle=n||"",e.Node.create(e.Lang.sub(this.MESSAGE_TEMPLATE,{title:t,subtitle:n}))},e.namespace("Rednose").App=o},"1.1.0-DEV",{requires:["app-base","event-custom","rednose-app-templates","rednose-panel"]});
