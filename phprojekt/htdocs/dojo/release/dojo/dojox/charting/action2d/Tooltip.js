/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.charting.action2d.Tooltip"]||(dojo._hasResource["dojox.charting.action2d.Tooltip"]=!0,dojo.provide("dojox.charting.action2d.Tooltip"),dojo.require("dijit.Tooltip"),dojo.require("dojox.charting.action2d.Base"),dojo.require("dojox.gfx.matrix"),dojo.require("dojox.lang.functional"),dojo.require("dojox.lang.functional.scan"),dojo.require("dojox.lang.functional.fold"),function(){var g=function(a){var b=a.run&&a.run.data&&a.run.data[a.index];return b&&typeof b!="number"&&(b.tooltip||
b.text)?b.tooltip||b.text:a.element=="candlestick"?'<table cellpadding="1" cellspacing="0" border="0" style="font-size:0.9em;"><tr><td>Open:</td><td align="right"><strong>'+a.data.open+'</strong></td></tr><tr><td>High:</td><td align="right"><strong>'+a.data.high+'</strong></td></tr><tr><td>Low:</td><td align="right"><strong>'+a.data.low+'</strong></td></tr><tr><td>Close:</td><td align="right"><strong>'+a.data.close+"</strong></td></tr>"+(a.data.mid!==void 0?'<tr><td>Mid:</td><td align="right"><strong>'+
a.data.mid+"</strong></td></tr>":"")+"</table>":a.element=="bar"?a.x:a.y},e=dojox.lang.functional,h=dojox.gfx.matrix,f=Math.PI/4,i=Math.PI/2;dojo.declare("dojox.charting.action2d.Tooltip",dojox.charting.action2d.Base,{defaultParams:{text:g},optionalParams:{},constructor:function(a,b,d){this.text=d&&d.text?d.text:g;this.connect()},process:function(a){if(a.type==="onplotreset"||a.type==="onmouseout")dijit.hideTooltip(this.aroundRect),this.aroundRect=null,a.type==="onplotreset"&&delete this.angles;else if(a.shape&&
a.type==="onmouseover"){var b={type:"rect"},d=["after","before"];switch(a.element){case "marker":b.x=a.cx;b.y=a.cy;b.width=b.height=1;break;case "circle":b.x=a.cx-a.cr;b.y=a.cy-a.cr;b.width=b.height=2*a.cr;break;case "column":d=["above","below"];case "bar":b=dojo.clone(a.shape.getShape());break;case "candlestick":b.x=a.x;b.y=a.y;b.width=a.width;b.height=a.height;break;default:if(!this.angles)this.angles=typeof a.run.data[0]=="number"?e.map(e.scanl(a.run.data,"+",0),"* 2 * Math.PI / this",e.foldl(a.run.data,
"+",0)):e.map(e.scanl(a.run.data,"a + b.y",0),"* 2 * Math.PI / this",e.foldl(a.run.data,"a + b.y",0));var c=h._degToRad(a.plot.opt.startAngle),c=(this.angles[a.index]+this.angles[a.index+1])/2+c;b.x=a.cx+a.cr*Math.cos(c);b.y=a.cy+a.cr*Math.sin(c);b.width=b.height=1;c<f||(c<i+f?d=["below","above"]:c<Math.PI+f?d=["before","after"]:c<2*Math.PI-f&&(d=["above","below"]))}c=dojo.coords(this.chart.node,!0);b.x+=c.x;b.y+=c.y;b.x=Math.round(b.x);b.y=Math.round(b.y);b.width=Math.ceil(b.width);b.height=Math.ceil(b.height);
this.aroundRect=b;(a=this.text(a))&&dijit.showTooltip(a,this.aroundRect,d)}}})}());