YUI.add("rednose-dropdown-keys-mac",function(e,t){function r(){}var n=e.Rednose.Util;r.prototype={_keyMap:{alt:"\u2325",ctrl:"\u2318",shift:"\u21e7"},formatKeyCode:function(e){var t=this,r;return r=e.split("+").map(function(e){return t._keyMap[e]||n.capitalizeFirstLetter(e)}),r.join("")}},e.Rednose.Dropdown.KeysMac=r,e.Base.mix(e.Rednose.Dropdown,[r])},"1.6.0");
