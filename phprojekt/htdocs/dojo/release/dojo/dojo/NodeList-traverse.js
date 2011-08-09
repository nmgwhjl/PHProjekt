/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojo.NodeList-traverse"]||(dojo._hasResource["dojo.NodeList-traverse"]=!0,dojo.provide("dojo.NodeList-traverse"),dojo.extend(dojo.NodeList,{_buildArrayFromCallback:function(b){for(var a=[],c=0;c<this.length;c++){var d=b.call(this[c],this[c],a);d&&(a=a.concat(d))}return a},_getUniqueAsNodeList:function(b){for(var a=[],c=0,d;d=b[c];c++)d.nodeType==1&&dojo.indexOf(a,d)==-1&&a.push(d);return this._wrap(a,null,this._NodeListCtor)},_getUniqueNodeListWithParent:function(b,a){var c=this._getUniqueAsNodeList(b),
c=a?dojo._filterQueryResult(c,a):c;return c._stash(this)},_getRelatedUniqueNodes:function(b,a){return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(a),b)},children:function(b){return this._getRelatedUniqueNodes(b,function(a){return dojo._toArray(a.childNodes)})},closest:function(b,a){return this._getRelatedUniqueNodes(null,function(c){do if(dojo._filterQueryResult([c],b,a).length)return c;while(c!=a&&(c=c.parentNode)&&c.nodeType==1);return null})},parent:function(b){return this._getRelatedUniqueNodes(b,
function(a){return a.parentNode})},parents:function(b){return this._getRelatedUniqueNodes(b,function(a){for(var c=[];a.parentNode;)a=a.parentNode,c.push(a);return c})},siblings:function(b){return this._getRelatedUniqueNodes(b,function(a){for(var c=[],b=a.parentNode&&a.parentNode.childNodes,e=0;e<b.length;e++)b[e]!=a&&c.push(b[e]);return c})},next:function(b){return this._getRelatedUniqueNodes(b,function(a){for(a=a.nextSibling;a&&a.nodeType!=1;)a=a.nextSibling;return a})},nextAll:function(b){return this._getRelatedUniqueNodes(b,
function(a){for(var b=[];a=a.nextSibling;)a.nodeType==1&&b.push(a);return b})},prev:function(b){return this._getRelatedUniqueNodes(b,function(a){for(a=a.previousSibling;a&&a.nodeType!=1;)a=a.previousSibling;return a})},prevAll:function(b){return this._getRelatedUniqueNodes(b,function(a){for(var b=[];a=a.previousSibling;)a.nodeType==1&&b.push(a);return b})},andSelf:function(){return this.concat(this._parent)},first:function(){return this._wrap(this[0]&&[this[0]]||[],this)},last:function(){return this._wrap(this.length?
[this[this.length-1]]:[],this)},even:function(){return this.filter(function(b,a){return a%2!=0})},odd:function(){return this.filter(function(b,a){return a%2==0})}}));