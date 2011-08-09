/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojox.grid.EnhancedGrid"])dojo._hasResource["dojox.grid.EnhancedGrid"]=!0,dojo.provide("dojox.grid.EnhancedGrid"),dojo.require("dojox.grid.DataGrid"),dojo.require("dojox.grid.enhanced._PluginManager"),dojo.requireLocalization("dojox.grid.enhanced","EnhancedGrid",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hr,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"),dojo.experimental("dojox.grid.EnhancedGrid"),dojo.declare("dojox.grid.EnhancedGrid",dojox.grid.DataGrid,{plugins:null,
pluginMgr:null,keepSelection:!1,_pluginMgrClass:dojox.grid.enhanced._PluginManager,postMixInProperties:function(){this._nls=dojo.i18n.getLocalization("dojox.grid.enhanced","EnhancedGrid",this.lang);this.inherited(arguments)},postCreate:function(){this.pluginMgr=new this._pluginMgrClass(this);this.pluginMgr.preInit();this.inherited(arguments);this.pluginMgr.postInit()},plugin:function(a){return this.pluginMgr.getPlugin(a)},startup:function(){this.inherited(arguments);this.pluginMgr.startup()},createSelection:function(){this.selection=
new dojox.grid.enhanced.DataSelection(this)},canSort:function(){return!0},doKeyEvent:function(a){try{var b=this.focus.focusView;b.content.decorateEvent(a);a.cell||b.header.decorateEvent(a)}catch(d){}this.inherited(arguments)},doApplyCellEdit:function(a,b,d){d?this.inherited(arguments):this.invalidated[b]=!0},mixin:function(a,b){var d={},c;for(c in b)c=="_inherited"||c=="declaredClass"||c=="constructor"||b.privates&&b.privates[c]||(d[c]=b[c]);dojo.mixin(a,d)},_copyAttr:function(a,b){return!b?void 0:
this.inherited(arguments)},_getHeaderHeight:function(){this.inherited(arguments);return dojo.marginBox(this.viewsHeaderNode).h},_fetch:function(a,b){if(this.items)return this.inherited(arguments);a=a||0;if(this.store&&!this._pending_requests[a]){if(!this._isLoaded&&!this._isLoading)this._isLoading=!0,this.showMessage(this.loadingMessage);this._pending_requests[a]=!0;try{this._storeLayerFetch({start:a,count:this.rowsPerPage,query:this.query,sort:this.getSortProps(),queryOptions:this.queryOptions,isRender:b,
onBegin:dojo.hitch(this,"_onFetchBegin"),onComplete:dojo.hitch(this,"_onFetchComplete"),onError:dojo.hitch(this,"_onFetchError")})}catch(d){this._onFetchError(d,{start:a,count:this.rowsPerPage})}}return 0},_storeLayerFetch:function(a){this.store.fetch(a)},getCellByField:function(a){return dojo.filter(this.layout.cells,function(b){return b.field==a})[0]},onMouseUp:function(){},createView:function(){var a=this.inherited(arguments);if(dojo.isMoz){var b=function(a){var b=a.toUpperCase();return function(a){return a.tagName!=
b}},d=a.header.getCellX;a.header.getCellX=function(c){var g=d.call(a.header,c),e;e=b("th");for(var f=c.target;f&&e(f);f=f.parentNode);(e=f)&&e!==c.target&&dojo.isDescendant(c.target,e)&&(g+=e.firstChild.offsetLeft);return g}}return a},destroy:function(){delete this._nls;this.selection.destroy();this.pluginMgr.destroy();this.inherited(arguments)}}),dojo.provide("dojox.grid.enhanced.DataSelection"),dojo.require("dojox.grid.enhanced.plugins._SelectionPreserver"),dojo.declare("dojox.grid.enhanced.DataSelection",
dojox.grid.DataSelection,{constructor:function(a){if(a.keepSelection)this.preserver=new dojox.grid.enhanced.plugins._SelectionPreserver(this)},_range:function(a,b){this.grid._selectingRange=!0;this.inherited(arguments);this.grid._selectingRange=!1;this.onChanged()},deselectAll:function(a){this.grid._selectingRange=!0;this.inherited(arguments);this.grid._selectingRange=!1;this.onChanged()},destroy:function(){this.preserver&&this.preserver.destroy()}}),dojox.grid.EnhancedGrid.markupFactory=function(a,
b,d,c){return dojox.grid._Grid.markupFactory(a,b,d,dojo.partial(dojox.grid.DataGrid.cell_markupFactory,c))},dojox.grid.EnhancedGrid.registerPlugin=function(a,b){dojox.grid.enhanced._PluginManager.registerPlugin(a,b)};