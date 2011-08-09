/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.sketch.Figure"]||(dojo._hasResource["dojox.sketch.Figure"]=!0,dojo.provide("dojox.sketch.Figure"),dojo.experimental("dojox.sketch"),dojo.require("dojox.gfx"),dojo.require("dojox.sketch.UndoStack"),function(){var d=dojox.sketch;d.tools={};d.registerTool=function(a,b){d.tools[a]=b};d.Figure=function(a){var b=this;this.annCounter=1;this.shapes=[];this.imageSrc=this.image=null;this.size={w:0,h:0};this.node=this.group=this.surface=null;this.zoomFactor=1;this.tools=null;this.obj=
{};dojo.mixin(this,a);this.selected=[];this.hasSelections=function(){return this.selected.length>0};this.isSelected=function(a){for(var e=0;e<b.selected.length;e++)if(b.selected[e]==a)return!0;return!1};this.select=function(a){if(!b.isSelected(a))b.clearSelections(),b.selected=[a];a.setMode(d.Annotation.Modes.View);a.setMode(d.Annotation.Modes.Edit)};this.deselect=function(a){for(var e=-1,c=0;c<b.selected.length;c++)if(b.selected[c]==a){e=c;break}e>-1&&(a.setMode(d.Annotation.Modes.View),b.selected.splice(e,
1));return a};this.clearSelections=function(){for(var a=0;a<b.selected.length;a++)b.selected[a].setMode(d.Annotation.Modes.View);b.selected=[]};this.replaceSelection=function(a,e){if(b.isSelected(e)){for(var c=-1,d=0;d<b.selected.length;d++)if(b.selected[d]==e){c=d;break}c>-1&&b.selected.splice(c,1,a)}else b.select(a)};this._cshape=this._absEnd=this._end=this._start=this._ctool=this._startPoint=this._prevState=this._action=this._lp=this._ctr=this._c=null;this._dblclick=function(a){var c=b._fromEvt(a);
if(c)b.onDblClickShape(c,a)};this._keydown=function(a){var c=!1;if(a.ctrlKey)if(a.keyCode===90||a.keyCode===122)b.undo(),c=!0;else if(a.keyCode===89||a.keyCode===121)b.redo(),c=!0;if(a.keyCode===46||a.keyCode===8)b._delete(b.selected),c=!0;c&&dojo.stopEvent(a)};this._md=function(a){dojox.gfx.renderer=="vml"&&b.node.focus();var c=b._fromEvt(a);b._startPoint={x:a.pageX,y:a.pageY};b._ctr=dojo.position(b.node);var d={x:b.node.scrollLeft,y:b.node.scrollTop};b._ctr={x:b._ctr.x-d.x,y:b._ctr.y-d.y};var d=
a.clientX-b._ctr.x,g=a.clientY-b._ctr.y;b._lp={x:d,y:g};b._start={x:d,y:g};b._end={x:d,y:g};b._absEnd={x:d,y:g};if(c){if(c.type&&c.type()!="Anchor")b.isSelected(c)?b._sameShapeSelected=!0:(b.select(c),b._sameShapeSelected=!1);c.beginEdit();b._c=c}else b.clearSelections(),b._ctool.onMouseDown(a)};this._mm=function(a){if(b._ctr){var c=a.clientX-b._ctr.x,d=a.clientY-b._ctr.y,g=c-b._lp.x,j=d-b._lp.y;b._absEnd={x:c,y:d};if(b._c)b._c.setBinding({dx:g/b.zoomFactor,dy:j/b.zoomFactor}),b._lp={x:c,y:d};else if(b._end=
{x:g,y:j},c={x:Math.min(b._start.x,b._absEnd.x),y:Math.min(b._start.y,b._absEnd.y),width:Math.abs(b._start.x-b._absEnd.x),height:Math.abs(b._start.y-b._absEnd.y)},c.width&&c.height)b._ctool.onMouseMove(a,c)}};this._mu=function(a){if(b._c)b._c.endEdit();else b._ctool.onMouseUp(a);b._c=b._ctr=b._lp=b._action=b._prevState=b._startPoint=null;b._cshape=b._start=b._end=b._absEnd=null};this.initUndoStack()};var c=d.Figure.prototype;c.initUndoStack=function(){this.history=new d.UndoStack(this)};c.setTool=
function(a){this._ctool=a};c.gridSize=0;c._calCol=function(a){return this.gridSize?Math.round(a/this.gridSize)*this.gridSize:a};c._delete=function(a,b){for(var c=0;c<a.length;c++)if(a[c].setMode(d.Annotation.Modes.View),a[c].destroy(b),this.remove(a[c]),this._remove(a[c]),!b)a[c].onRemove();a.splice(0,a.length)};c.onDblClickShape=function(a,b){if(a.onDblClick)a.onDblClick(b)};c.onCreateShape=function(){};c.onBeforeCreateShape=function(){};c.initialize=function(a){this.node=a;this.surface=dojox.gfx.createSurface(a,
this.size.w,this.size.h);this.group=this.surface.createGroup();this._cons=[];var b=this.surface.getEventSource();this._cons.push(dojo.connect(b,"ondraggesture",dojo.stopEvent),dojo.connect(b,"ondragenter",dojo.stopEvent),dojo.connect(b,"ondragover",dojo.stopEvent),dojo.connect(b,"ondragexit",dojo.stopEvent),dojo.connect(b,"ondragstart",dojo.stopEvent),dojo.connect(b,"onselectstart",dojo.stopEvent),dojo.connect(b,"onmousedown",this._md),dojo.connect(b,"onmousemove",this._mm),dojo.connect(b,"onmouseup",
this._mu),dojo.connect(b,"onclick",this,"onClick"),dojo.connect(b,"ondblclick",this._dblclick),dojo.connect(a,"onkeydown",this._keydown));this.image=this.group.createImage({width:this.imageSize.w,height:this.imageSize.h,src:this.imageSrc})};c.destroy=function(a){if(this.node)a||(this.history&&this.history.destroy(),this._subscribed&&(dojo.unsubscribe(this._subscribed),delete this._subscribed)),dojo.forEach(this._cons,dojo.disconnect),this._cons=[],dojo.empty(this.node),this.group=this.surface=null,
this.obj={},this.shapes=[]};c.nextKey=function(){return"annotation-"+this.annCounter++};c.draw=function(){};c.zoom=function(a){this.zoomFactor=a/100;this.surface.setDimensions(this.size.w*this.zoomFactor,this.size.h*this.zoomFactor);this.group.setTransform(dojox.gfx.matrix.scale(this.zoomFactor,this.zoomFactor));for(a=0;a<this.shapes.length;a++)this.shapes[a].zoom(this.zoomFactor)};c.getFit=function(){return Math.min((this.node.parentNode.offsetWidth-5)/this.size.w,(this.node.parentNode.offsetHeight-
5)/this.size.h)*100};c.unzoom=function(){this.zoomFactor=1;this.surface.setDimensions(this.size.w,this.size.h);this.group.setTransform()};c._add=function(a){this.obj[a._key]=a};c._remove=function(a){this.obj[a._key]&&delete this.obj[a._key]};c._get=function(a){a&&a.indexOf("bounding")>-1?a=a.replace("-boundingBox",""):a&&a.indexOf("-labelShape")>-1&&(a=a.replace("-labelShape",""));return this.obj[a]};c._keyFromEvt=function(a){var b=a.target.id+"";if(b.length==0){a=a.target.parentNode;for(b=this.surface.getEventSource();a&&
a.id.length==0&&a!=b;)a=a.parentNode;b=a.id}return b};c._fromEvt=function(a){return this._get(this._keyFromEvt(a))};c.add=function(a){for(var b=0;b<this.shapes.length;b++)if(this.shapes[b]==a)return!0;this.shapes.push(a);return!0};c.remove=function(a){for(var b=-1,c=0;c<this.shapes.length;c++)if(this.shapes[c]==a){b=c;break}b>-1&&this.shapes.splice(b,1);return a};c.getAnnotator=function(a){for(var b=0;b<this.shapes.length;b++)if(this.shapes[b].id==a)return this.shapes[b];return null};c.convert=function(a,
b){var c=b+"Annotation";if(d[c]){var e=a.type(),l=a.id,g=a.label,j=a.mode,f,h,k,i;switch(e){case "Preexisting":case "Lead":i={dx:a.transform.dx,dy:a.transform.dy};f={x:a.start.x,y:a.start.y};h={x:a.end.x,y:a.end.y};k={x:h.x-(h.x-f.x)/2,y:h.y-(h.y-f.y)/2};break;case "SingleArrow":case "DoubleArrow":i={dx:a.transform.dx,dy:a.transform.dy};f={x:a.start.x,y:a.start.y};h={x:a.end.x,y:a.end.y};k={x:a.control.x,y:a.control.y};break;case "Underline":i={dx:a.transform.dx,dy:a.transform.dy},f={x:a.start.x,
y:a.start.y},k={x:f.x+50,y:f.y+50},h={x:f.x+100,y:f.y+100}}c=new d[c](this,l);if(c.type()=="Underline")c.transform={dx:i.dx+f.x,dy:i.dy+f.y};else{if(c.transform)c.transform=i;if(c.start)c.start=f}if(c.end)c.end=h;if(c.control)c.control=k;c.label=g;c.token=dojo.lang.shallowCopy(a.token);c.initialize();this.replaceSelection(c,a);this._remove(a);this.remove(a);a.destroy();c.setMode(j)}};c.setValue=function(a){var b=this.node;this.load(dojox.xml.DomParser.parse(a),b)};c.load=function(a,b){this.surface&&
this.destroy(!0);var c=a.documentElement;this.size={w:parseFloat(c.getAttribute("width"),10),h:parseFloat(c.getAttribute("height"),10)};var c=c.childrenByName("g")[0],d=c.childrenByName("image")[0];this.imageSize={w:parseFloat(d.getAttribute("width"),10),h:parseFloat(d.getAttribute("height"),10)};this.imageSrc=d.getAttribute("xlink:href");this.initialize(b);c=c.childrenByName("g");for(d=0;d<c.length;d++)this._loadAnnotation(c[d]);if(this._loadDeferred)this._loadDeferred.callback(this),this._loadDeferred=
null;this.onLoad()};c.onLoad=function(){};c.onClick=function(){};c._loadAnnotation=function(a){var b=a.getAttribute("dojoxsketch:type")+"Annotation";return d[b]?(b=new d[b](this,a.id),b.initialize(a),this.nextKey(),b.setMode(d.Annotation.Modes.View),this._add(b),b):null};c.onUndo=function(){};c.onBeforeUndo=function(){};c.onRedo=function(){};c.onBeforeRedo=function(){};c.undo=function(){this.history&&(this.onBeforeUndo(),this.history.undo(),this.onUndo())};c.redo=function(){this.history&&(this.onBeforeRedo(),
this.history.redo(),this.onRedo())};c.serialize=function(){for(var a='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:dojoxsketch="http://dojotoolkit.org/dojox/sketch" width="'+this.size.w+'" height="'+this.size.h+'"><g><image xlink:href="'+this.imageSrc+'" x="0" y="0" width="'+this.size.w+'" height="'+this.size.h+'" />',b=0;b<this.shapes.length;b++)a+=this.shapes[b].serialize();a+="</g></svg>";return a};c.getValue=c.serialize}());