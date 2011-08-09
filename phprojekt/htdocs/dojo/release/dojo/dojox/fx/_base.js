/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojox.fx._base"])dojo._hasResource["dojox.fx._base"]=!0,dojo.provide("dojox.fx._base"),dojo.require("dojo.fx"),dojo.mixin(dojox.fx,{anim:dojo.anim,animateProperty:dojo.animateProperty,fadeTo:dojo._fade,fadeIn:dojo.fadeIn,fadeOut:dojo.fadeOut,combine:dojo.fx.combine,chain:dojo.fx.chain,slideTo:dojo.fx.slideTo,wipeIn:dojo.fx.wipeIn,wipeOut:dojo.fx.wipeOut}),dojox.fx.sizeTo=function(a){var d=a.node=dojo.byId(a.node),c=a.method||"chain";if(!a.duration)a.duration=500;if(c=="chain")a.duration=
Math.floor(a.duration/2);var b,f,g,e,i,j=null,m=function(c){return function(){var d=dojo.getComputedStyle(c),h=d.position,k=d.width,l=d.height;b=h=="absolute"?c.offsetTop:parseInt(d.top)||0;g=h=="absolute"?c.offsetLeft:parseInt(d.left)||0;i=k=="auto"?0:parseInt(k);j=l=="auto"?0:parseInt(l);e=g-Math.floor((a.width-i)/2);f=b-Math.floor((a.height-j)/2);if(h!="absolute"&&h!="relative")d=dojo.coords(c,!0),b=d.y,g=d.x,c.style.position="absolute",c.style.top=b+"px",c.style.left=g+"px"}}(d),d=dojo.animateProperty(dojo.mixin({properties:{height:function(){m();
return{end:a.height||0,start:j}},top:function(){return{start:b,end:f}}}},a)),c=dojo.animateProperty(dojo.mixin({properties:{width:function(){return{start:i,end:a.width||0}},left:function(){return{start:g,end:e}}}},a));return dojo.fx[a.method=="combine"?"combine":"chain"]([d,c])},dojox.fx.slideBy=function(a){var d,c,b=function(a){return function(){var b=dojo.getComputedStyle(a),e=b.position;d=e=="absolute"?a.offsetTop:parseInt(b.top)||0;c=e=="absolute"?a.offsetLeft:parseInt(b.left)||0;if(e!="absolute"&&
e!="relative")b=dojo.coords(a,!0),d=b.y,c=b.x,a.style.position="absolute",a.style.top=d+"px",a.style.left=c+"px"}}(a.node=dojo.byId(a.node));b();a=dojo.animateProperty(dojo.mixin({properties:{top:d+(a.top||0),left:c+(a.left||0)}},a));dojo.connect(a,"beforeBegin",a,b);return a},dojox.fx.crossFade=function(a){var d=a.nodes[0]=dojo.byId(a.nodes[0]),c=dojo.style(d,"opacity"),b=a.nodes[1]=dojo.byId(a.nodes[1]);dojo.style(b,"opacity");return dojo.fx.combine([dojo[c==0?"fadeIn":"fadeOut"](dojo.mixin({node:d},
a)),dojo[c==0?"fadeOut":"fadeIn"](dojo.mixin({node:b},a))])},dojox.fx.highlight=function(a){var d=a.node=dojo.byId(a.node);a.duration=a.duration||400;var c=a.color||"#ffff99",b=dojo.style(d,"backgroundColor");b=="rgba(0, 0, 0, 0)"&&(b="transparent");a=dojo.animateProperty(dojo.mixin({properties:{backgroundColor:{start:c,end:b}}},a));b=="transparent"&&dojo.connect(a,"onEnd",a,function(){d.style.backgroundColor=b});return a},dojox.fx.wipeTo=function(a){a.node=dojo.byId(a.node);var d=a.node,c=d.style,
b=a.width?"width":"height",f={};f[b]={start:function(){c.overflow="hidden";if(c.visibility=="hidden"||c.display=="none")return c[b]="1px",c.display="",c.visibility="",1;else{var a=dojo.style(d,b);return Math.max(a,1)}},end:a[b]};return dojo.animateProperty(dojo.mixin({properties:f},a))};