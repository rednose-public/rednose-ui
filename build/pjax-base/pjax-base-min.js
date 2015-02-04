YUI.add("pjax-base",function(e,t){function s(){}var n=e.config.win,r=e.ClassNameManager.getClassName("pjax"),i="navigate";s.prototype={initializer:function(){this.publish(i,{defaultFn:this._defNavigateFn}),this.get("html5")&&this._pjaxBindUI()},destructor:function(){this._pjaxEvents&&this._pjaxEvents.detach()},navigate:function(t,r){return t=this._resolveURL(t),this._navigate(t,r)?!0:this._hasSameOrigin(t)?this.get("allowFallThrough")?(n.location=t,!0):!1:(e.error("Security error: The new URL must be of the same origin as the current URL."),!1)},_isLinkSameOrigin:function(t){var n=e.getLocation(),r=n.protocol,i=n.hostname,s=parseInt(n.port,10)||null,o;return t.get("protocol")!==r||t.get("hostname")!==i?!1:(o=parseInt(t.get("port"),10)||null,r==="http:"?(s||(s=80),o||(o=80)):r==="https:"&&(s||(s=443),o||(o=443)),o===s)},_navigate:function(t,r){t=this._upgradeURL(t);if(!this.hasRoute(t))return!1;r=e.merge(r,{url:t});var s=this._getURL(),o,u;u=t.replace(/(#.*)$/,function(e,t,n){return o=t,e.substring(n)});if(o&&u===s.replace(/#.*$/,"")){if(!this.get("navigateOnHash"))return!1;r.hash=o}return"replace"in r||(r.replace=t===s),this.get("html5")||r.force?this.fire(i,r):n&&(r.replace?n.location.replace(t):n.location=t),!0},_pjaxBindUI:function(){this._pjaxEvents||(this._pjaxEvents=e.one("body").delegate("click",this._onLinkClick,this.get("linkSelector"),this))},_defNavigateFn:function(e){this[e.replace?"replace":"save"](e.url),n&&this.get("scrollToTop")&&setTimeout(function(){n.scroll(0,0)},1)},_onLinkClick:function(e){var t,n,r;if(e.button!==1||e.ctrlKey||e.metaKey)return;t=e.currentTarget;if(t.get("tagName").toUpperCase()!=="A")return;if(!this._isLinkSameOrigin(t))return;n=t.get("href"),n&&(r=this._navigate(n,{originEvent:e}),r&&e.preventDefault())}},s.ATTRS={linkSelector:{value:"a."+r,writeOnce:"initOnly"},navigateOnHash:{value:!1},scrollToTop:{value:!0},allowFallThrough:{value:!0}},e.PjaxBase=s},"3.18.0",{requires:["classnamemanager","node-event-delegate","router"]});