YUI.add("rednose-util",function(e,t){function r(){}var n="\u2026";r.formatLabel=function(e){return e.length>24?e.substr(0,12)+n+e.substr(e.length-12,e.length):e},r.formatDateTime=function(t){return e.Date.format(t,{format:"%x %R"})},r.isAncestor=function(e,t){return t.ancestor("#"+e.get("id"))},r.capitalizeFirstLetter=function(e){return e.charAt(0).toUpperCase()+e.slice(1)},r.camelCaseToDash=function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})},r.round=function(e,t){return typeof t=="undefined"||+t===0?Math.round(e):(e=+e,t=+t,isNaN(e)||typeof t!="number"||t%1!==0?NaN:(e=e.toString().split("e"),e=Math.round(+(e[0]+"e"+(e[1]?+e[1]+t:t))),e=e.toString().split("e"),+(e[0]+"e"+(e[1]?+e[1]-t:-t))))},e.namespace("Rednose").Util=r},"1.6.0",{requires:["datatype-date"]});
