YUI.add("history-hash",function(e,t){function p(){p.superclass.constructor.apply(this,arguments)}var n=e.HistoryBase,r=e.Lang,i=e.Array,s=e.Object,o=YUI.namespace("Env.HistoryHash"),u="hash",a,f,l,c=e.config.win,h=e.config.useHistoryHTML5;e.extend(p,n,{_init:function(t){var n=p.parseHash();t=t||{},this._initialState=t.initialState?e.merge(t.initialState,n):n,e.after("hashchange",e.bind(this._afterHashChange,this),c),p.superclass._init.apply(this,arguments)},_change:function(e,t,n){return s.each(t,function(e,n){r.isValue(e)&&(t[n]=e.toString())}),p.superclass._change.call(this,e,t,n)},_storeState:function(e,t){var r=p.decode,i=p.createHash(t);p.superclass._storeState.apply(this,arguments),e!==u&&r(p.getHash())!==r(i)&&p[e===n.SRC_REPLACE?"replaceHash":"setHash"](i)},_afterHashChange:function(e){this._resolveChanges(u,p.parseHash(e.newHash),{})}},{NAME:"historyHash",SRC_HASH:u,hashPrefix:"",_REGEX_HASH:/([^\?#&=]+)=?([^&=]*)/g,createHash:function(e){var t=p.encode,n=[];return s.each(e,function(e,i){r.isValue(e)&&n.push(t(i)+"="+t(e))}),n.join("&")},decode:function(e){return decodeURIComponent(e.replace(/\+/g," "))},encode:function(e){return encodeURIComponent(e).replace(/%20/g,"+")},getHash:e.UA.gecko?function(){var t=e.getLocation(),n=/#(.*)$/.exec(t.href),r=n&&n[1]||"",i=p.hashPrefix;return i&&r.indexOf(i)===0?r.replace(i,""):r}:function(){var t=e.getLocation(),n=t.hash.substring(1),r=p.hashPrefix;return r&&n.indexOf(r)===0?n.replace(r,""):n},getUrl:function(){return location.href},parseHash:function(e){var t=p.decode,n,i,s,o,u,a={},f=p.hashPrefix,l;e=r.isValue(e)?e:p.getHash();if(f){l=e.indexOf(f);if(l===0||l===1&&e.charAt(0)==="#")e=e.replace(f,"")}o=e.match(p._REGEX_HASH)||[];for(n=0,i=o.length;n<i;++n)s=o[n],u=s.split("="),u.length>1?a[t(u[0])]=t(u[1]):a[t(s)]="";return a},replaceHash:function(t){var n=e.getLocation(),r=n.href.replace(/#.*$/,"");t.charAt(0)==="#"&&(t=t.substring(1)),n.replace(r+"#"+(p.hashPrefix||"")+t)},setHash:function(t){var n=e.getLocation();t.charAt(0)==="#"&&(t=t.substring(1)),n.hash=(p.hashPrefix||"")+t}}),a=o._notifiers,a||(a=o._notifiers=[]),e.Event.define("hashchange",{on:function(t,n,r){(t.compareTo(c)||t.compareTo(e.config.doc.body))&&a.push(r)},detach:function(e,t,n){var r=i.indexOf(a,n);r!==-1&&a.splice(r,1)}}),f=p.getHash(),l=p.getUrl(),n.nativeHashChange?o._hashHandle||(o._hashHandle=e.Event.attach("hashchange",function(e){var t=p.getHash(),n=p.getUrl();i.each(a.concat(),function(r){r.fire({_event:e,oldHash:f,oldUrl:l,newHash:t,newUrl:n})}),f=t,l=n},c)):o._hashPoll||(o._hashPoll=e.later(50,null,function(){var e=p.getHash(),t,n;f!==e&&(n=p.getUrl(),t={oldHash:f,oldUrl:l,newHash:e,newUrl:n},f=e,l=n,i.each(a.concat(),function(e){e.fire(t)}))},null,!0)),e.HistoryHash=p;if(h===!1||!e.History&&h!==!0&&(!n.html5||!e.HistoryHTML5))e.History=p},"3.18.0",{requires:["event-synthetic","history-base","yui-later"]});
