/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.data.OpmlStore"]||(dojo._hasResource["dojox.data.OpmlStore"]=!0,dojo.provide("dojox.data.OpmlStore"),dojo.require("dojo.data.util.simpleFetch"),dojo.require("dojo.data.util.filter"),dojo.declare("dojox.data.OpmlStore",null,{constructor:function(a){this._xmlData=null;this._arrayOfTopLevelItems=[];this._arrayOfAllItems=[];this._metadataNodes=null;this._loadFinished=!1;this.url=a.url;this._opmlData=a.data;if(a.label)this.label=a.label;this._loadInProgress=!1;this._queuedFetches=
[];this._identityMap={};this._identCount=0;this._idProp="_I";if(a&&"urlPreventCache"in a)this.urlPreventCache=a.urlPreventCache?!0:!1},label:"text",url:"",urlPreventCache:!1,_assertIsItem:function(a){if(!this.isItem(a))throw Error("dojo.data.OpmlStore: a function was passed an item argument that was not an item");},_assertIsAttribute:function(a){if(!dojo.isString(a))throw Error("dojox.data.OpmlStore: a function was passed an attribute argument that was not an attribute object nor an attribute name string");
},_removeChildNodesThatAreNotElementNodes:function(a,b){var c=a.childNodes;if(c.length!==0){var d=[],e,f;for(e=0;e<c.length;++e)f=c[e],f.nodeType!=1&&d.push(f);for(e=0;e<d.length;++e)f=d[e],a.removeChild(f);if(b)for(e=0;e<c.length;++e)f=c[e],this._removeChildNodesThatAreNotElementNodes(f,b)}},_processRawXmlTree:function(a){this._loadFinished=!0;this._xmlData=a;var b=a.getElementsByTagName("head")[0];if(b)this._removeChildNodesThatAreNotElementNodes(b),this._metadataNodes=b.childNodes;a=a.getElementsByTagName("body");
if(b=a[0]){this._removeChildNodesThatAreNotElementNodes(b,!0);a=a[0].childNodes;for(b=0;b<a.length;++b){var c=a[b];c.tagName=="outline"&&(this._identityMap[this._identCount]=c,this._identCount++,this._arrayOfTopLevelItems.push(c),this._arrayOfAllItems.push(c),this._checkChildNodes(c))}}},_checkChildNodes:function(a){if(a.firstChild)for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];c.tagName=="outline"&&(this._identityMap[this._identCount]=c,this._identCount++,this._arrayOfAllItems.push(c),
this._checkChildNodes(c))}},_getItemsArray:function(a){return a&&a.deep?this._arrayOfAllItems:this._arrayOfTopLevelItems},getValue:function(a,b,c){this._assertIsItem(a);this._assertIsAttribute(b);return b=="children"?a.firstChild||c:(a=a.getAttribute(b),a!==void 0?a:c)},getValues:function(a,b){this._assertIsItem(a);this._assertIsAttribute(b);var c=[];if(b=="children")for(var d=0;d<a.childNodes.length;++d)c.push(a.childNodes[d]);else a.getAttribute(b)!==null&&c.push(a.getAttribute(b));return c},getAttributes:function(a){this._assertIsItem(a);
for(var b=[],c=a.attributes,d=0;d<c.length;++d){var e=c.item(d);b.push(e.nodeName)}a.childNodes.length>0&&b.push("children");return b},hasAttribute:function(a,b){return this.getValues(a,b).length>0},containsValue:function(a,b,c){var d=void 0;typeof c==="string"&&(d=dojo.data.util.filter.patternToRegExp(c,!1));return this._containsValue(a,b,c,d)},_containsValue:function(a,b,c,d){a=this.getValues(a,b);for(b=0;b<a.length;++b){var e=a[b];if(typeof e==="string"&&d)return e.match(d)!==null;else if(c===
e)return!0}return!1},isItem:function(a){return a&&a.nodeType==1&&a.tagName=="outline"&&a.ownerDocument===this._xmlData},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(){},getLabel:function(a){if(this.isItem(a))return this.getValue(a,this.label)},getLabelAttributes:function(){return[this.label]},_fetchItems:function(a,b){var c=this,d=function(a,d){var e=null;if(a.query){var e=[],h=a.queryOptions?a.queryOptions.ignoreCase:!1,k={},g;for(g in a.query){var i=a.query[g];typeof i==="string"&&
(k[g]=dojo.data.util.filter.patternToRegExp(i,h))}for(h=0;h<d.length;++h){var l=!0,m=d[h];for(g in a.query)i=a.query[g],c._containsValue(m,g,i,k[g])||(l=!1);l&&e.push(m)}}else d.length>0&&(e=d.slice(0,d.length));b(e,a)};if(this._loadFinished)d(a,this._getItemsArray(a.queryOptions));else if(this._loadInProgress)this._queuedFetches.push({args:a,filter:d});else if(this.url!==""){this._loadInProgress=!0;var e=dojo.xhrGet({url:c.url,handleAs:"xml",preventCache:c.urlPreventCache});e.addCallback(function(b){c._processRawXmlTree(b);
d(a,c._getItemsArray(a.queryOptions));c._handleQueuedFetches()});e.addErrback(function(a){throw a;})}else if(this._opmlData)this._processRawXmlTree(this._opmlData),this._opmlData=null,d(a,this._getItemsArray(a.queryOptions));else throw Error("dojox.data.OpmlStore: No OPML source data was provided as either URL or XML data input.");},getFeatures:function(){return{"dojo.data.api.Read":!0,"dojo.data.api.Identity":!0}},getIdentity:function(a){if(this.isItem(a))for(var b in this._identityMap)if(this._identityMap[b]===
a)return b;return null},fetchItemByIdentity:function(a){if(this._loadFinished)c=this._identityMap[a.identity],this.isItem(c)||(c=null),a.onItem&&(d=a.scope?a.scope:dojo.global,a.onItem.call(d,c));else{var b=this;if(this.url!=="")this._loadInProgress?this._queuedFetches.push({args:a}):(this._loadInProgress=!0,c=dojo.xhrGet({url:b.url,handleAs:"xml"}),c.addCallback(function(c){var d=a.scope?a.scope:dojo.global;try{b._processRawXmlTree(c);var j=b._identityMap[a.identity];b.isItem(j)||(j=null);a.onItem&&
a.onItem.call(d,j);b._handleQueuedFetches()}catch(n){a.onError&&a.onError.call(d,n)}}),c.addErrback(function(b){this._loadInProgress=!1;a.onError&&a.onError.call(a.scope?a.scope:dojo.global,b)}));else if(this._opmlData){this._processRawXmlTree(this._opmlData);this._opmlData=null;var c=this._identityMap[a.identity];b.isItem(c)||(c=null);if(a.onItem){var d=a.scope?a.scope:dojo.global;a.onItem.call(d,c)}}}},getIdentityAttributes:function(){return null},_handleQueuedFetches:function(){if(this._queuedFetches.length>
0){for(var a=0;a<this._queuedFetches.length;a++){var b=this._queuedFetches[a],c=b.args;(b=b.filter)?b(c,this._getItemsArray(c.queryOptions)):this.fetchItemByIdentity(c)}this._queuedFetches=[]}},close:function(){}}),dojo.extend(dojox.data.OpmlStore,dojo.data.util.simpleFetch));