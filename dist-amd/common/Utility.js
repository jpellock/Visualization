(function(e,t){typeof define=="function"&&define.amd?define(["d3","require","es6-promise"],t):e.common_Utility=t(e.d3,e.require)})(this,function(e,t){function n(e,t,n,r,i){var s=/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,o=/(^[ ]*|[ ]*$)/g,u=/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,a=/^0x[0-9a-f]+$/i,f=/^0/,l=function(e){return!i&&(""+e).toLowerCase()||""+e},c=l(r?e[r]:e).replace(o,"")||"",h=l(r?t[r]:t).replace(o,"")||"",p=c.replace(s,"\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),d=h.replace(s,"\0$1\0").replace(/\0$/,"").replace(/^\0/,"").split("\0"),v=parseInt(c.match(a),16)||p.length!==1&&c.match(u)&&Date.parse(c),m=parseInt(h.match(a),16)||v&&h.match(u)&&Date.parse(h)||null,g,y;if(m){if(v<m)return n==="ascending"?-1:1;if(v>m)return n==="ascending"?1:-1}for(var b=0,w=Math.max(p.length,d.length);b<w;b++){g=!(p[b]||"").match(f)&&parseFloat(p[b])||p[b]||0,y=!(d[b]||"").match(f)&&parseFloat(d[b])||d[b]||0;if(isNaN(g)!==isNaN(y))return isNaN(g)?1:-1;typeof g!=typeof y&&(g+="",y+="");if(g<y)return n==="ascending"?-1:1;if(g>y)return n==="ascending"?1:-1}return 0}function r(){this.items={}}function i(e){this._widgetElement=e}return r.prototype.clear=function(){for(var e in this.items)this.items[e].element().classed("selected",!1);this.items={}},r.prototype.isEmpty=function(){for(var e in this.items)return!1;return!0},r.prototype.append=function(e){this.items[e._id]=e,e.element().classed("selected",!0)},r.prototype.remove=function(e){this.items[e._id].element().classed("selected",!1),delete this.items[e._id]},r.prototype.isSelected=function(e){return this.items[e._id]!==undefined},r.prototype.get=function(){var e=[];for(var t in this.items)e.push(this.items[t]);return e},r.prototype.set=function(e){this.clear(),e.forEach(function(e,t){this.append(e)},this)},r.prototype.click=function(e,t){t.ctrlKey?this.items[e._id]?this.remove(e):this.append(e):(this.clear(),this.append(e))},i.prototype.enter=function(t,n){var r=this;t.on("click.SimpleSelection",function(t,n){var i=e.select(this),s=i.classed("selected");r._widgetElement.selectAll(".selected").classed("selected",null),s||i.classed("selected",!0)}).on("mouseover.SimpleSelection",function(t,n){e.select(this).classed("over",!0)}).on("mouseout.SimpleSelection",function(t,n){e.select(this).classed("over",null)})},i.prototype.selected=function(t){return e.select(t).classed("selected")},{naturalSort:function(e,t,r,i){return e.slice(0).sort(function(e,s){return n(e,s,t,r,i)})},multiSort:function(t,n){return t.sort(function(t,r){for(var i=0;i<n.length;++i){var s=t[n[i].idx],o=r[n[i].idx];if(s!==o)return n[i].reverse?e.descending(s,o):e.ascending(s,o)}return 0}),t},Selection:r,SimpleSelection:i,urlParams:function(){var e=window.location.search.split("?")[1],t={};return e&&e.split("&").forEach(function(e,n){var r=e.split("=");switch(r.length){case 1:t[decodeURIComponent(r[0])]=undefined;break;case 2:t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]);break;default:throw"Invalid URL Param:  "+e}}),t},endsWith:function(e,t,n){var r=e.toString();if(typeof n!="number"||!isFinite(n)||Math.floor(n)!==n||n>r.length)n=r.length;n-=t.length;var i=r.indexOf(t,n);return i!==-1&&i===n},d3ArrayAdapter:function(e){return{ownerDocument:{createElement:function(t){return{get __data__(){return this.row},set __data__(t){this.row=e[this.index]=t}}},createElementNS:function(e,t){return this.createElement(t)}},querySelectorAll:function(t){if(t)throw"unsupported";var n=this;return e.map(function(t,r){return{ownerDocument:n.ownerDocument,parentNode:n,get __data__(){return t},set __data__(t){e[r]=t}}})},appendChild:function(t){return t.parentNode=this,t.index=e.length,e.push(null),t},insertBefore:function(t,n){var r=e.indexOf(t.__data__),i=e.indexOf(n.__data__);return r>i?e.splice(i,0,e.splice(r,1)[0]):r<i-1&&e.splice(i-1,0,e.splice(r,1)[0]),t},removeChild:function(t){return e.splice(e.indexOf(t.__data__),1),t}}},downloadBlob:function(t,n,r){r=r||"data";var i=new Date,s=e.time.format("%Y-%m-%dT%H_%M_%S"),o=s(i),u=r+"_"+o+"."+t.toLowerCase(),a="";switch(t){case"TSV":a="text/tab-seperated-values";break;case"JSON":a="application/json";break;default:a="text/csv"}var f=document.createElement("a");if(navigator.msSaveBlob)return f=null,navigator.msSaveBlob(new Blob([n],{type:a}),u);if("download"in f)return f.href="data:"+a+","+encodeURIComponent(n),f.setAttribute("download",u),document.body.appendChild(f),setTimeout(function(){f.click(),document.body.removeChild(f)},10),!0;f=null;var l=document.createElement("iframe");return document.body.appendChild(l),l.src="data:"+a+","+encodeURIComponent(n),setTimeout(function(){document.body.removeChild(l)},100),!0},requireWidget:function(e){return new Promise(function(n,r){var i=e.split("."),s="src/"+i[0].split("_").join("/");t([s],function(e){n(i.length>1?e[i[1]]:e)})})}}});