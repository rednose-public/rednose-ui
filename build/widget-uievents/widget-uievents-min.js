YUI.add("widget-uievents",function(e,t){var n="boundingBox",r=e.Widget,i="render",s=e.Lang,o=":",u=e.Widget._uievts=e.Widget._uievts||{};e.mix(r.prototype,{_destroyUIEvents:function(){var t=e.stamp(this,!0);e.each(u,function(n,r){n.instances[t]&&(delete n.instances[t],e.Object.isEmpty(n.instances)&&(n.handle.detach(),u[r]&&delete u[r]))})},UI_EVENTS:e.Node.DOM_EVENTS,_getUIEventNode:function(){return this.get(n)},_createUIEvent:function(t){var n=this._getUIEventNode(),i=e.stamp(n)+t,s=u[i],o;s||(o=n.delegate(t,function(e){var t=r.getByNode(this);t&&t._filterUIEvent(e)&&t.fire(e.type,{domEvent:e})},"."+e.Widget.getClassName()),u[i]=s={instances:{},handle:o}),s.instances[e.stamp(this)]=1},_filterUIEvent:function(e){return e.currentTarget.compareTo(e.container)||e.container.compareTo(this._getUIEventNode())},_getUIEvent:function(e){if(s.isString(e)){var t=this.parseType(e)[1],n,r;return t&&(n=t.indexOf(o),n>-1&&(t=t.substring(n+o.length)),this.UI_EVENTS[t]&&(r=t)),r}},_initUIEvent:function(e){var t=this._getUIEvent(e),n=this._uiEvtsInitQueue||{};t&&!n[t]&&(this._uiEvtsInitQueue=n[t]=1,this.after(i,function(){this._createUIEvent(t),delete this._uiEvtsInitQueue[t]}))},on:function(e){return this._initUIEvent(e),r.superclass.on.apply(this,arguments)},publish:function(e,t){var n=this._getUIEvent(e);return n&&t&&t.defaultFn&&this._initUIEvent(n),r.superclass.publish.apply(this,arguments)}},!0)},"3.18.0",{requires:["node-event-delegate","widget-base"]});
