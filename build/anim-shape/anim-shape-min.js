YUI.add("anim-shape",function(e,t){var n=Number,r,i,s="color",o="stops",u="type",a=function(t,r,i,o,u,a){var f=0,l=e.Anim.getUpdatedColorValue,c,h,p,d=i.length,v=[],m;for(;f<d;f+=1){c=i[f],h=r[f],m={};for(p in c)c.hasOwnProperty(p)&&(p===s?m[p]=e.Color.toHex(l(e.Color.toHex(h[p]),e.Color.toHex(c[p]),o,u,a)):m[p]=a(o,n(h[p]),n(c[p])-n(h[p]),u));v.push(m)}return v},f={set:function(t,r,i,f,l,c,h){var p,d={},v=e.Anim.getUpdatedColorValue,m=a;for(p in f)if(f.hasOwnProperty(p)&&p!==u)switch(p){case s:d[p]=v(i[p],f[p],l,c,h);break;case o:d[p]=m(t,i[p],f[p],l,c,h);break;default:d[p]=h(l,n(i[p]),n(f[p])-n(i[p]),c)}t._node.set(r,d)}};e.Anim.behaviors.fill=f,e.Anim.behaviors.stroke=f,e.Anim.behaviors.transform={set:function(e,t,s,o,u,a,f){var l=e._node,c="",h,p,d,v,m=0,g,y,b;o=r,b=r.length;for(;m<b;++m){d=o[m].concat(),v=s[m].concat(),h=d.shift(),p=v.shift(),y=d.length,c+=h+"(";for(g=0;g<y;++g)c+=f(u,n(v[g]),n(d[g])-n(v[g]),a),g<y-1&&(c+=", ");c+=");"}c&&l.set("transform",c),l._transform=i},get:function(t){var n=t._node,s=n.matrix,o=t.get("to").transform,u=n.get("transform"),a=e.MatrixUtil.getTransformArray(o),f=u?e.MatrixUtil.getTransformArray(u):null,l,c,h,p,d;if(a)if(!f||f.length<1){f=[],h=a.length;for(c=0;c<h;++c)p=a[c][0],f[c]=e.MatrixUtil.getTransformFunctionArray(p);r=a,d=f}else if(e.MatrixUtil.compareTransformSequence(a,f))r=a,d=f;else{l=new e.Matrix,h=a.length;for(c=0;c<h;++c)p=a[c].shift(),p=p==="matrix"?"multiply":p,l[p].apply(l,a[c]);r=l.decompose(),d=s.decompose()}return i=o,d}}},"3.18.0",{requires:["anim-base","anim-easing","anim-color","matrix"]});
