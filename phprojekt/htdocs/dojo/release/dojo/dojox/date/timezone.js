/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.date.timezone"]||(dojo._hasResource["dojox.date.timezone"]=!0,dojo.experimental("dojox.date.timezone"),dojo.provide("dojox.date.timezone"),dojo.require("dojo.date.locale"),function(g){function w(a){a=a||{};i=g.mixin(i,a.zones||{});p=g.mixin(p,a.rules||{})}function F(a){console.error("Error loading zone file:",a);throw a;}function n(a){r[a]=!0;g.xhrGet({url:G+"/"+a,sync:!0,handleAs:"olson-zoneinfo",load:w,error:F})}function x(a){throw Error('Timezone "'+a+'" is either incorrect, or not loaded in the timezone registry.');
}function s(a){var c=H[a];if(!c&&(c=a.split("/")[0],c=I[c],!c)){var e=i[a];if(typeof e=="string")return s(e);else if(r.backward)x(a);else return n("backward"),s(a)}return c}function t(a){a=a.match(/(\d+)(?::0*(\d*))?(?::0*(\d*))?([su])?$/);if(!a)return null;a[1]=parseInt(a[1],10);a[2]=a[2]?parseInt(a[2],10):0;a[3]=a[3]?parseInt(a[3],10):0;return a}function o(a,c,e,d,b,f,g){return Date.UTC(a,c,e,d,b,f)+(g||0)*6E4}function q(a){var c=t(a);if(c===null)return 0;c=(a.indexOf("-")===0?-1:1)*((c[1]*60+c[2])*
60+c[3])*1E3;return-c/60/1E3}function y(a,c,e){var d=z[a[3].substr(0,3).toLowerCase()],b=a[4],f=t(a[5]);f[4]=="u"&&(e=0);if(isNaN(b))if(b.substr(0,4)=="last")return b=A[b.substr(4,3).toLowerCase()],a=new Date(o(c,d+1,1,f[1]-24,f[2],f[3],e)),e=g.date.add(a,"minute",-e).getUTCDay(),b=b>e?b-e-7:b-e,b!==0&&(a=g.date.add(a,"hour",b*24)),a;else{if(b=A[b.substr(0,3).toLowerCase()],b!="undefined")if(a[4].substr(3,2)==">=")return a=new Date(o(c,d,parseInt(a[4].substr(5),10),f[1],f[2],f[3],e)),e=g.date.add(a,
"minute",-e).getUTCDay(),b=b<e?b-e+7:b-e,b!==0&&(a=g.date.add(a,"hour",b*24)),a;else if(b.substr(3,2)=="<=")return a=new Date(o(c,d,parseInt(a[4].substr(5),10),f[1],f[2],f[3],e)),e=g.date.add(a,"minute",-e).getUTCDay(),b=b>e?b-e-7:b-e,b!==0&&(a=g.date.add(a,"hour",b*24)),a}else return a=new Date(o(c,d,parseInt(b,10),f[1],f[2],f[3],e));return null}function J(a,c){var e=[];g.forEach(p[a[1]]||[],function(d){for(var b=0;b<2;b++)switch(d[b]){case "min":d[b]=B;break;case "max":d[b]=u;break;case "only":break;
default:if(d[b]=parseInt(d[b],10),isNaN(d[b]))throw Error("Invalid year found on rule");}typeof d[6]=="string"&&(d[6]=q(d[6]));(d[0]<=c&&d[1]>=c||d[0]==c&&d[1]=="only")&&e.push({r:d,d:y(d,c,a[0])})});return e}function K(a,c){for(var e=v[a]=[],d=0;d<c.length;d++){var b=c[d],f=e[d]=[],l=null,k=null,h=[];typeof b[0]=="string"&&(b[0]=q(b[0]));d===0?f[0]=Date.UTC(B,0,1,0,0,0,0):(f[0]=e[d-1][1],l=c[d-1],k=e[d-1],h=k[2]);for(var j=(new Date(f[0])).getUTCFullYear(),m=b[3]?parseInt(b[3],10):u,i=[];j<=m;j++)i=
i.concat(J(b,j));i.sort(function(a,b){return g.date.compare(a.d,b.d)});for(j=0;m=i[j];j++){var p=j>0?i[j-1]:null;if(m.r[5].indexOf("u")<0&&m.r[5].indexOf("s")<0)if(j===0&&d>0)m.d=h.length?g.date.add(m.d,"minute",h[h.length-1].r[6]):g.date.compare(new Date(k[1]),m.d,"date")===0?new Date(k[1]):g.date.add(m.d,"minute",q(l[1]));else if(j>0)m.d=g.date.add(m.d,"minute",p.r[6])}f[2]=i;if(b[3]){var k=parseInt(b[3],10),h=z[(b[4]||"Jan").substr(0,3).toLowerCase()],j=parseInt(b[5]||"1",10),l=t(b[6]||"0"),n=
f[1]=o(k,h,j,l[1],l[2],l[3],l[4]=="u"?0:b[0]);isNaN(n)&&(n=f[1]=y([0,0,0,b[4],b[5],b[6]||"0"],k,l[4]=="u"?0:b[0]).getTime());k=g.filter(i,function(a,b){var c=b>0?i[b-1].r[6]*6E4:0;return a.d.getTime()<n+c});l[4]!="u"&&l[4]!="s"&&(f[1]+=k.length?k[k.length-1].r[6]*6E4:q(b[1])*6E4)}else f[1]=Date.UTC(u,11,31,23,59,59,999)}}function C(a,c){for(var e=c,d=i[e];typeof d=="string";)e=d,d=i[e];if(!d){if(!r.backward)return n("backward",!0),C(a,c);x(e)}v[c]||K(c,d);for(var e=v[c],b=a.getTime(),f=0,g;g=e[f];f++)if(b>=
g[0]&&b<g[1])return{zone:d[f],range:e[f],idx:f};throw Error('No Zone found for "'+c+'" on '+a);}var h=g.config,L=["africa","antarctica","asia","australasia","backward","etcetera","europe","northamerica","pacificnew","southamerica"],B=1835,u=2038,r={},i={},v={},p={},G=h.timezoneFileBasePath||g.moduleUrl("dojox.date","zoneinfo"),D=h.timezoneLoadingScheme||"preloadAll",h=h.defaultZoneFile||(D=="preloadAll"?L:"northamerica");g._contentHandlers["olson-zoneinfo"]=function(a){for(var a=g._contentHandlers.text(a).split("\n"),
c=[],e="",d=null,e=null,b={zones:{},rules:{}},f=0;f<a.length;f++)if(c=a[f],c.match(/^\s/)&&(c="Zone "+d+c),c=c.split("#")[0],c.length>3)switch(c=c.split(/\s+/),e=c.shift(),e){case "Zone":d=c.shift();c[0]&&(b.zones[d]||(b.zones[d]=[]),b.zones[d].push(c));break;case "Rule":e=c.shift();b.rules[e]||(b.rules[e]=[]);b.rules[e].push(c);break;case "Link":if(b.zones[c[1]])throw Error("Error with Link "+c[1]);b.zones[c[1]]=c[0]}return b};var z={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,
dec:11},A={sun:0,mon:1,tue:2,wed:3,thu:4,fri:5,sat:6},I={EST:"northamerica",MST:"northamerica",HST:"northamerica",EST5EDT:"northamerica",CST6CDT:"northamerica",MST7MDT:"northamerica",PST8PDT:"northamerica",America:"northamerica",Pacific:"australasia",Atlantic:"europe",Africa:"africa",Indian:"africa",Antarctica:"antarctica",Asia:"asia",Australia:"australasia",Europe:"europe",WET:"europe",CET:"europe",MET:"europe",EET:"europe"},H={"Pacific/Honolulu":"northamerica","Atlantic/Bermuda":"northamerica",
"Atlantic/Cape_Verde":"africa","Atlantic/St_Helena":"africa","Indian/Kerguelen":"antarctica","Indian/Chagos":"asia","Indian/Maldives":"asia","Indian/Christmas":"australasia","Indian/Cocos":"australasia","America/Danmarkshavn":"europe","America/Scoresbysund":"europe","America/Godthab":"europe","America/Thule":"europe","Asia/Yekaterinburg":"europe","Asia/Omsk":"europe","Asia/Novosibirsk":"europe","Asia/Krasnoyarsk":"europe","Asia/Irkutsk":"europe","Asia/Yakutsk":"europe","Asia/Vladivostok":"europe",
"Asia/Sakhalin":"europe","Asia/Magadan":"europe","Asia/Kamchatka":"europe","Asia/Anadyr":"europe","Africa/Ceuta":"europe","America/Argentina/Buenos_Aires":"southamerica","America/Argentina/Cordoba":"southamerica","America/Argentina/Tucuman":"southamerica","America/Argentina/La_Rioja":"southamerica","America/Argentina/San_Juan":"southamerica","America/Argentina/Jujuy":"southamerica","America/Argentina/Catamarca":"southamerica","America/Argentina/Mendoza":"southamerica","America/Argentina/Rio_Gallegos":"southamerica",
"America/Argentina/Ushuaia":"southamerica","America/Aruba":"southamerica","America/La_Paz":"southamerica","America/Noronha":"southamerica","America/Belem":"southamerica","America/Fortaleza":"southamerica","America/Recife":"southamerica","America/Araguaina":"southamerica","America/Maceio":"southamerica","America/Bahia":"southamerica","America/Sao_Paulo":"southamerica","America/Campo_Grande":"southamerica","America/Cuiaba":"southamerica","America/Porto_Velho":"southamerica","America/Boa_Vista":"southamerica",
"America/Manaus":"southamerica","America/Eirunepe":"southamerica","America/Rio_Branco":"southamerica","America/Santiago":"southamerica","Pacific/Easter":"southamerica","America/Bogota":"southamerica","America/Curacao":"southamerica","America/Guayaquil":"southamerica","Pacific/Galapagos":"southamerica","Atlantic/Stanley":"southamerica","America/Cayenne":"southamerica","America/Guyana":"southamerica","America/Asuncion":"southamerica","America/Lima":"southamerica","Atlantic/South_Georgia":"southamerica",
"America/Paramaribo":"southamerica","America/Port_of_Spain":"southamerica","America/Montevideo":"southamerica","America/Caracas":"southamerica"},E={US:"S",Chatham:"S",NZ:"S",NT_YK:"S",Edm:"S",Salv:"S",Canada:"S",StJohns:"S",TC:"S",Guat:"S",Mexico:"S",Haiti:"S",Barb:"S",Belize:"S",CR:"S",Moncton:"S",Swift:"S",Hond:"S",Thule:"S",NZAQ:"S",Zion:"S",ROK:"S",PRC:"S",Taiwan:"S",Ghana:"GMT",SL:"WAT",Chicago:"S",Detroit:"S",Vanc:"S",Denver:"S",Halifax:"S",Cuba:"S",Indianapolis:"S",Starke:"S",Marengo:"S",Pike:"S",
Perry:"S",Vincennes:"S",Pulaski:"S",Louisville:"S",CA:"S",Nic:"S",Menominee:"S",Mont:"S",Bahamas:"S",NYC:"S",Regina:"S",Resolute:"ES",DR:"S",Toronto:"S",Winn:"S"};g.setObject("dojox.date.timezone",{getTzInfo:function(a,c){if(D=="lazyLoad"){var e=s(c);if(e)r[e]||n(e);else throw Error("Not a valid timezone ID.");}var d=C(a,c),e=d.zone[0],b,f=-1;b=d.range[2]||[];for(var g=a.getTime(),h=0,o;o=b[h];h++)g>=o.d.getTime()&&(f=h);b=f>=0?b[f].r:null;e+=b?b[6]:p[d.zone[1]]&&d.idx>0?q(i[c][d.idx-1][1]):q(d.zone[1]);
g=d.zone;f=g[2];f.indexOf("%s")>-1?(b?(d=b[7],d=="-"&&(d="")):g[1]in E?d=E[g[1]]:d.idx>0?(d=i[c][d.idx-1][2],d=d.indexOf("%s")<0?f.replace("%s","S")==d?"S":"":""):d="",d=f.replace("%s",d)):f.indexOf("/")>-1?(d=f.split("/"),d=b?d[b[6]===0?0:1]:d[0]):d=f;return{tzOffset:e,tzAbbr:d}},loadZoneData:function(a){w(a)},getAllZones:function(){var a=[],c;for(c in i)a.push(c);a.sort();return a}});typeof h=="string"&&h&&(h=[h]);g.isArray(h)&&g.forEach(h,function(a){n(a)});var M=g.date.locale.format,N=g.date.locale._getZone;
g.date.locale.format=function(a,c){c=c||{};if(c.timezone&&!c._tzInfo)c._tzInfo=dojox.date.timezone.getTzInfo(a,c.timezone);if(c._tzInfo)var e=a.getTimezoneOffset()-c._tzInfo.tzOffset,a=new Date(a.getTime()+e*6E4);return M.call(this,a,c)};g.date.locale._getZone=function(a,c,e){return e._tzInfo?c?e._tzInfo.tzAbbr:e._tzInfo.tzOffset:N.call(this,a,c,e)}}(dojo));