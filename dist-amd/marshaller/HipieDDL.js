(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/Database","../common/Utility","../other/Comms","../common/Widget","require"],t):e.marshaller_HipieDDL=t(e.d3,e.common_Database,e.common_Utility,e.other_Comms,e.common_Widget,e.require)})(this,function(e,t,n,r,i,s){function u(e,t){var n=e.split("."),r=t;for(var i=0;i<n.length;++i){var s=n[i];if(!r||r[s]===undefined)return!1;r=r[s]}return!0}function a(e){return e?String.fromCharCode(parseInt(e)):e}function f(e,t){this.visualization=e;var n={};for(var r in t)t[r]instanceof Array?t[r].forEach(function(e,t){n[t===0?r:r+"_"+t]=e}):n[r]=t[r];this.mappings=n,this.hasMappings=!1,this.reverseMappings={},this.columns=[],this.columnsIdx={},this.columnsRHS=[],this.columnsRHSIdx={}}function l(e){switch(e){case"bool":case"boolean":return"boolean";case"integer":case"float":case"double":return"number";case"date":case"time":return"time"}return"string"}function c(e,t){f.call(this,e,t),this.columns=["label","weight"],this.columnsIdx={label:0,weight:1},this.init()}function h(e,t){f.call(this,e,t),t.state?(this.columns=["state","weight"],this.columnsIdx={state:0,weight:1}):t.county?(this.columns=["county","weight"],this.columnsIdx={county:0,weight:1}):t.geohash&&(this.columns=["geohash","weight"],this.columnsIdx={geohash:0,weight:1}),this.init()}function p(e,t){f.call(this,e,t),t.state?(this.columns=["state"],this.columnsIdx={state:0}):t.county?(this.columns=["county"],this.columnsIdx={county:0}):t.geohash&&(this.columns=["geohash"],this.columnsIdx={geohash:0}),t.weight.forEach(function(e,t){this.columns.push(e),this.columnsIdx[t===0?"weight":"weight_"+t]=t+1},this),this.init()}function d(e,t){f.call(this,e,t),this.columns=["x","y","weight"],this.columnsIdx={x:0,y:1,weight:2},this.init()}function v(e,t){var n={label:t.x[0]};t.y.forEach(function(e,t){n[e]=e}),f.call(this,e,n),this.init()}function m(e,t){var n={};for(var r in t)t[r].forEach(function(t,r){n[e.label[r]]=t});f.call(this,e,n),this.init()}function g(e,t,n){f.call(this,e,t),this.icon=e.icon||{},this.fields=e.fields||{},this.columns=["uid","label","weight","flags"],this.columnsIdx={uid:0,label:1,weight:2,flags:3},this.init(),this.link=n,this.visualization=e}function y(e,t){this.visualization=e;if(t){this._id=t.id,this._output=t.output,this.mappings=null,t.mappings||console.log("no mappings for:"+e.id+"->"+t.id);switch(this.visualization.type){case"LINE":this.mappings=new v(this.visualization,t.mappings);break;case"TABLE":this.mappings=new m(this.visualization,t.mappings);break;case"GRAPH":this.mappings=new g(this.visualization,t.mappings,t.link);break;case"CHORO":t.mappings.weight instanceof Array&&t.mappings.weight.length?(this.mappings=new p(this.visualization,t.mappings,t.link),t.mappings.weight.length>1&&(this.visualization.type="LINE")):this.mappings=new h(this.visualization,t.mappings,t.link);break;case"HEAT_MAP":this.mappings=new d(this.visualization,t.mappings,t.link);break;default:this.mappings=new c(this.visualization,t.mappings)}this.first=t.first,this.reverse=t.reverse,this.sort=t.sort}}function b(e,t,n){this.visualization=e,this.eventID=t,n&&(this._updates=n.updates,this.mappings=n.mappings)}function w(e,t){this.visualization=e,this.events={};for(var n in t)this.events[n]=new b(e,n,t[n])}function E(e,t){this.dashboard=e,this.id=t.id,this.label=t.label,this.title=t.title||t.id,this.type=t.type,this.icon=t.icon||{},this.fields=t.fields||{},this.properties=t.properties||(t.source?t.source.properties:null)||{},this.source=new y(this,t.source),this.events=new w(this,t.events);if(this.dashboard.marshaller._widgetMappings.has(t.id))this.setWidget(this.dashboard.marshaller._widgetMappings.get(t.id),!0);else{var n=this;switch(this.type){case"CHORO":this.source.mappings.contains("state")?this.loadWidget("src/map/ChoroplethStates",function(e){e.id(t.id).paletteID(t.color)}):this.source.mappings.contains("county")?this.loadWidget("src/map/ChoroplethCounties",function(e){e.id(t.id).paletteID(t.color)}):this.source.mappings.contains("geohash")&&this.loadWidget("src/map/Layered",function(e){e.id(t.id)});break;case"2DCHART":case"PIE":case"BUBBLE":case"BAR":case"WORD_CLOUD":this.loadWidget("src/composite/MegaChart",function(e){e.id(t.id).legendPosition("none").chartType(n.properties.chartType||n.properties.charttype||n.type)});break;case"LINE":this.loadWidget("src/composite/MegaChart",function(e){e.id(t.id).legendPosition("none").chartType(n.properties.chartType||n.properties.charttype||n.type)});break;case"TABLE":this.loadWidget("src/composite/MegaChart",function(e){e.id(t.id).legendPosition("none").showChartSelect(!1).chartType("TABLE").chartTypeProperties({pagination:!0})});break;case"SLIDER":this.loadWidget("src/form/Slider",function(e){e.id(t.id);if(t.range){var n="";for(var r in t.events.events.mappings){n=r;break}e.low(+t.range[0]).high(+t.range[1]).step(+t.range[2]).selectionLabel(n)}});break;case"GRAPH":this.loadWidgets(["src/graph/Graph"],function(e){e.id(t.id).layout("ForceDirected2").applyScaleOnLayout(!0)});break;case"FORM":this.loadWidgets(["src/form/Form","src/form/Input","src/form/Button","src/form/CheckBox","src/form/ColorInput","src/form/Radio","src/form/Range","src/form/Select","src/form/Slider","src/form/TextArea"],function(e,n){var r=n[1],i=n[3],s=n[5],o=n[7],u=n[9];e.id(t.id).inputs(t.fields.map(function(e){var t=[],n=[],a;switch(e.properties.charttype){case"TEXT":a=(new r).type("text");break;case"TEXTAREA":a=new u;break;case"CHECKBOX":a=new i;break;case"RADIO":a=new s;break;case"HIDDEN":a=(new r).type("hidden");break;default:if(e.properties.enumvals){a=new o,n=e.properties.enumvals;for(var f in n)t.push([f,n[f]])}else a=(new r).type("text")}a.name(e.id).label((e.properties?e.properties.label:null)||e.label).value(e.properties.default?e.properties.default:"");if(a instanceof i||a instanceof s){var l=Object.keys(e.properties.enumvals);a.selectOptions(l)}else t.length&&a.selectOptions(t);return a}))});break;case"HEAT_MAP":this.loadWidgets(["src/other/HeatMap"],function(e){e.id(t.id).image(n.properties.imageUrl)});break;default:this.loadWidget("src/common/TextBox",function(e){e.id(t.id).text(n.id+"\n"+"TODO:  "+n.type)})}}}function S(e,t){this.dataSource=e,this.id=t.id,this.from=t.from,this.request={},this.notify=t.notify||[],this.filter=t.filter||[]}function x(e,t,n){this.dashboard=e,this.id=t.id,this.filter=t.filter||[],this.WUID=t.WUID,this.URL=t.URL,this.databomb=t.databomb,this.request={},this._loadedCount=0;var i=this;this.outputs={};var s=[];t.outputs.forEach(function(e){i.outputs[e.id]=new S(i,e),s.push({id:e.id,from:e.from,filter:e.filter||this.filter})},this),this.WUID?this.comms=(new r.HIPIEWorkunit).url(e.marshaller.espUrl._url).proxyMappings(n).hipieResults(s):this.databomb?this.comms=(new r.HIPIEDatabomb).hipieResults(s):this.comms=(new r.HIPIERoxie).url(t.URL).proxyMappings(n)}function T(e,t,n){this.marshaller=e,this.id=t.id,this.title=t.title;var r=this;this.datasources={},this.datasourceTotal=0,t.datasources.forEach(function(e){r.datasources[e.id]=new x(r,e,n),++r.datasourceTotal}),this._visualizations={},this._visualizationArray=[],t.visualizations.forEach(function(e){var t=new E(this,e);this._visualizations[e.id]=t,this._visualizationArray.push(t),this.marshaller._visualizations[e.id]=t,this.marshaller._visualizationArray.push(t)},this),this._visualizationTotal=this._visualizationArray.length}function N(){this._proxyMappings={},this._widgetMappings=e.map(),this._clearDataOnUpdate=!0,this._propogateClear=!1}var o="...loading...";return f.prototype.init=function(){for(var e in this.mappings)this.reverseMappings[this.mappings[e]]=e,this.columnsIdx[e]===undefined&&(this.columns.push(e),this.columnsIdx[e]=this.columns.length-1),this.columnsRHS[this.columnsIdx[e]]=this.mappings[e],this.columnsRHSIdx[this.mappings[e]]=this.columnsIdx[e],this.hasMappings=!0},f.prototype.getFields=function(){return this.visualization.fields?Object.keys(this.mappings).map(function(e){return this.visualization.fields.filter(function(t){return t.id===this.mappings[e]},this).map(function(e){return(new t.Field(e.id)).type(l(e.properties.type)).label(this.reverseMappings[e.id])},this)[0]},this):null},f.prototype.contains=function(e){return this.mappings[e]!==undefined},f.prototype.doMap=function(e){var t=[];for(var n in this.mappings){var r=this.mappings[n];try{var i=e[r];i===undefined&&(i=e[r.toLowerCase()]),t[this.columnsIdx[n]]=i}catch(s){console.log("Invalid Mapping:  "+this.visualization.id+" ["+r+"->"+e+"]")}}return t},f.prototype.doMapAll=function(e){return e.hipieMappings(this.columnsRHS)},f.prototype.getMap=function(e){return this.mappings[e]},f.prototype.getReverseMap=function(e){return this.reverseMappings[e]},c.prototype=Object.create(f.prototype),h.prototype=Object.create(f.prototype),p.prototype=Object.create(f.prototype),d.prototype=Object.create(f.prototype),v.prototype=Object.create(f.prototype),m.prototype=Object.create(f.prototype),g.prototype=Object.create(f.prototype),g.prototype.calcAnnotation=function(e,t,n){function i(e,t){if(e)for(var r in e)switch(r){case"faChar":t.faChar=a(e.faChar);break;case"tooltip":t[r]=e[r];break;case"icon_image_colorFill":case"icon_shape_colorFill":case"icon_shape_colorStroke":n?t[r.split("icon_")[1]]=e[r]:t[r]=e[r];break;case"textbox_image_colorFill":case"textbox_shape_colorFill":case"textbox_shape_colorStroke":n||(t[r]=e[r]);break;case"id":case"valuemappings":case"font":case"charttype":break;default:console.log("Unknown annotation property:  "+r)}}var r={};i(e,r);if(t&&t[e.id]&&e.valuemappings){var s=e.valuemappings[t[e.id]];i(s,r)}for(var o in r)return r;return null},g.prototype.doMapAll=function(e){function o(e,t){var o="uid_"+e[0],u=r[o];u||(u=(new s.Vertex).faChar(n.icon&&n.icon.faChar?a(n.icon.faChar):"").text(e[1]?e[1]:""),u.__hpcc_uid=e[0],r[o]=u,i.push(u));if(t){e[1]&&u.text(e[1]);var f=n.calcAnnotation(n.visualization.icon,t);if(f)for(var l in f)u[l]&&u[l](f[l]);var c=[];n.fields.forEach(function(e){var r=n.calcAnnotation(e,t,!0);r&&c.push(r)}),u.annotationIcons(c)}return u}var t=e.jsonObj(),n=this,r={},i=[],s=this.visualization.widget,u=[];return t.forEach(function(e){var t=n.doMap(e),r=o(t,e);if(e[n.link.childfile]&&e[n.link.childfile].Row){var i=e[n.link.childfile].Row;i.forEach(function(e,t){var i=n.doMap(e),a=o(i);if(r.id()!==a.id()){var f=(new s.Edge).sourceVertex(r).targetVertex(a).sourceMarker("circleFoot").targetMarker("arrowHead");u.push(f)}})}}),{vertices:i,edges:u,merge:!1}},y.prototype.getQualifiedID=function(){return this.visualization.getQualifiedID()+"."+this.id},y.prototype.exists=function(){return this._id},y.prototype.getDatasource=function(){return this.visualization.dashboard.datasources[this._id]},y.prototype.getOutput=function(){var e=this.getDatasource();return e&&e.outputs?e.outputs[this._output]:null},y.prototype.hasData=function(){return this.getOutput().db?!0:!1},y.prototype.getFields=function(){return this.mappings.getFields()},y.prototype.getColumns=function(){return this.mappings.columns},y.prototype.getData=function(){var e=this.getOutput().db,t=this.mappings.doMapAll(e);return t.length&&this.sort&&n.multiSort(t,e.hipieMapSortArray(this.sort)),this.reverse&&t.reverse(),this.first&&t.length>this.first&&(t.length=this.first),t},y.prototype.getXTitle=function(){return this.mappings.columns[0]},y.prototype.getYTitle=function(){return this.mappings.columns.filter(function(e,t){return t>0}).join(" / ")},b.prototype.exists=function(){return this._updates!==undefined},b.prototype.getUpdates=function(){var e=[];return u("_updates",this)&&this._updates instanceof Array&&this._updates.forEach(function(t,n){var r=this.visualization.dashboard.datasources[t.datasource],i=this.visualization.dashboard.getVisualization(t.visualization);e.push({eventID:this.eventID,datasource:r,visualization:i})},this),e},b.prototype.getUpdatesDatasources=function(){var e={},t=[];return this.getUpdatesVisualizations().forEach(function(n,r){var i=n.source.getDatasource();i&&!e[i.id]&&(e[i.id]=!0,t.push(i))},this),t},b.prototype.getUpdatesVisualizations=function(){var e={},t=[];return u("_updates",this)&&this._updates instanceof Array&&this._updates.forEach(function(n,r){var i=this.visualization.dashboard.getVisualization(n.visualization);e[i.id]||(e[i.id]=!0,t.push(i))},this),t},w.prototype.setWidget=function(e){var t=this;for(var n in this.events)e["vertex_"+n]?e["vertex_"+n]=function(e){t.visualization.onEvent(n,t.events[n],e)}:e[n]&&(e[n]=function(e,r,i){t.visualization.onEvent(n,t.events[n],e,r,i)})},w.prototype.exists=function(){return this._updates!==undefined},w.prototype.getUpdates=function(){var e=[];for(var t in this.events)e=e.concat(this.events[t].getUpdates());return e},w.prototype.getUpdatesDatasources=function(){var e=[];for(var t in this.events)e=e.concat(this.events[t].getUpdatesDatasources());return e},w.prototype.getUpdatesVisualizations=function(){var e=[];for(var t in this.events)e=e.concat(this.events[t].getUpdatesVisualizations());return e},E.prototype.getQualifiedID=function(){return this.id},E.prototype.isLoading=function(e,t){return this.widget===null},E.prototype.isLoaded=function(e,t){return this.widget instanceof i},E.prototype.loadWidget=function(e,t){this.loadWidgets([e],t)},E.prototype.loadWidgets=function(e,t){this.widget=null;var n=this;s(e,function(e){n.setWidget(new e),t&&t(n.widget,arguments)})},E.prototype.setWidget=function(e,t){this.widget=e,this.events.setWidget(e);if(!t)for(var n in this.properties)switch(e.classID()){case"chart_MultiChart":case"composite_MegaChart":e.chartTypeProperties()[n]=this.properties[n];break;default:if(this.widget[n])try{this.widget[n](this.properties[n])}catch(r){console.log("Invalid Property:"+this.id+".properties."+n)}}return this.widget},E.prototype.accept=function(e){e.visit(this)},E.prototype.update=function(e){var t=this.getInputVisualizations(),n=[];t.forEach(function(e){for(var t in e._eventValues)n.push(e._eventValues[t])});var r=e||n.join(", "),i=this.widget;while(i&&!i.title)i=i.locateParentWidget();i?i.title(this.title+(r?" ("+r+")":"")).render():this.widget.render()},E.prototype.notify=function(){if(this.source.hasData()&&this.widget){if(!this.widget.fields().length){var e=this.source.getColumns();this.widget.columns(e)}var t=this.source.getData();this.widget.data(t),this.update()}},E.prototype.clear=function(){this.widget&&this.dashboard.marshaller.clearDataOnUpdate()&&(this.widget.data([]),this.source.getOutput().request={}),this.dashboard.marshaller.propogateClear()&&this._eventValues&&(delete this._eventValues,this.events.getUpdatesVisualizations().forEach(function(e){e.clear()})),this.update(o)},E.prototype.onEvent=function(e,t,n,r,i){var s=this;setTimeout(function(){i=i===undefined?!0:i;if(t.exists()){var e={};if(i)for(var r in t.mappings){var o=s.source.mappings&&s.source.mappings.hasMappings?s.source.mappings.getReverseMap(r):r;e[t.mappings[r]]=n[o]}s._eventValues=e;var u={},a=t.getUpdatesVisualizations();a.forEach(function(e){var t=e.source.getDatasource();u[t.id]||(u[t.id]={datasource:t,request:{},updates:[]}),u[t.id].updates.push(e.id),e.getInputVisualizations().forEach(function(e,n){if(e._eventValues)for(var r in e._eventValues)u[t.id].request[r]&&u[t.id].request[r]!==e._eventValues[r]&&console.log("Duplicate Filter, with mismatched value:  "+r+"="+e._eventValues[r]),u[t.id].request[r]=e._eventValues[r],u[t.id].request[r+"_changed"]=e===s}),e.type!=="GRAPH"&&e.clear(),(t.WUID||t.databomb)&&t.fetchData(u[t.id].request,!1,[e.id])});for(var f in u)!u[f].datasource.WUID&&!u[f].datasource.databomb&&u[f].datasource.fetchData(u[f].request,!1,u[f].updates)}},0)},E.prototype.getInputVisualizations=function(){return this.dashboard.marshaller.getVisualizationArray().filter(function(e){var t=e.events.getUpdatesVisualizations();return t.indexOf(this)>=0?!0:!1},this)},S.prototype.getQualifiedID=function(){return this.dataSource.getQualifiedID()+"."+this.id},S.prototype.accept=function(e){e.visit(this)},S.prototype.vizNotify=function(e){this.notify.filter(function(t){return!e||e.indexOf(t)>=0}).forEach(function(e){var t=this.dataSource.dashboard.getVisualization(e);t.notify()},this)},S.prototype.setData=function(e,n,r){this.request=n,this.db=(new t.Grid).jsonObj(e),this.vizNotify(r)},x.prototype.getQualifiedID=function(){return this.dashboard.getQualifiedID()+"."+this.id},x.prototype.accept=function(e){e.visit(this);for(var t in this.outputs)this.outputs[t].accept(e)},x.prototype.fetchData=function(e,t,n){if(!n){n=[];for(var r in this.outputs){var i=this.outputs[r];i.notify.forEach(function(e){(!i.filter||!i.filter.length)&&n.push(e);var t=this.dashboard.getVisualization(e);t.update(o)},this)}}var s=this;this.request.refresh=t?!0:!1,this.filter.forEach(function(t){this.request[t+"_changed"]=e[t+"_changed"]||!1;var n=e[t]===undefined?null:e[t];this.request[t]!==n&&(this.request[t]=n)},this),window.__hpcc_debug&&console.log("fetchData:  "+JSON.stringify(n)+"("+JSON.stringify(e)+")");for(var u in this.request)this.request[u]===null&&delete this.request[u];var a=Date.now();this.comms.call(this.request).then(function(t){var r=500-(Date.now()-a);setTimeout(function(){s.processResponse(t,e,n),++s._loadedCount},r>0?r:0)}).catch(function(e){s.dashboard.marshaller.commsError("DataSource.prototype.fetchData",e)})},x.prototype.processResponse=function(e,t,n){var r={};for(var i in e)r[i.toLowerCase()]=e[i];for(var s in this.outputs){var o=this.outputs[s].from;o||(o=this.outputs[s].id.toLowerCase());if(u(o,e))!u(o+"_changed",e)||u(o+"_changed",e)&&e[o+"_changed"].length&&e[o+"_changed"][0][o+"_changed"]?this.outputs[s].setData(e[o],t,n):this.outputs[s].vizNotify(n);else if(u(o,r))console.log("DDL 'DataSource.From' case is Incorrect"),!u(o+"_changed",r)||u(o+"_changed",r)&&e[o+"_changed"].length&&r[o+"_changed"][0][o+"_changed"]?this.outputs[s].setData(r[o],t,n):this.outputs[s].vizNotify(n);else{var a=[];for(var f in e)a.push(f);console.log("Unable to locate '"+o+"' in response {"+a.join(", ")+"}")}}},T.prototype.getQualifiedID=function(){return this.id},T.prototype.getVisualization=function(e){return this._visualizations[e]||this.marshaller.getVisualization(e)},T.prototype.getVisualizations=function(){return this._visualizations},T.prototype.getVisualizationArray=function(){return this._visualizationArray},T.prototype.getVisualizationTotal=function(){return this._visualizationTotal},T.prototype.accept=function(e){e.visit(this);for(var t in this.datasources)this.datasources[t].accept(e);this._visualizationArray.forEach(function(t){t.accept(e)},this)},T.prototype.allVisualizationsLoaded=function(){var e=this._visualizationArray.filter(function(e){return!e.isLoaded()});return e.length===0},N.prototype.commsDataLoaded=function(){for(var e=0;e<this.dashboardArray.length;e++)for(var t in this.dashboardArray[e].datasources)if(this.dashboardArray[e].datasources[t]._loadedCount===0)return!1;return!0},N.prototype.getVisualization=function(e){return this._visualizations[e]},N.prototype.accept=function(e){e.visit(this),this.dashboardTotal=0;for(var t in this.dashboards)this.dashboards[t].accept(e),++this.dashboardTotal},N.prototype.url=function(e,t){this.espUrl=(new r.ESPUrl).url(e);var n=null,i="HIPIE_DDL";this.espUrl.isWorkunitResult()?(i=this.espUrl._params.ResultName,n=(new r.HIPIEWorkunit).url(e).proxyMappings(this._proxyMappings)):n=(new r.HIPIERoxie).url(e).proxyMappings(this._proxyMappings);var s={refresh:!1},o=this;n.call(s).then(function(e){if(u(i,e))return n.fetchResult(i).then(function(n){var r=n[0][i];o.parse(r,function(){t(e)})}).catch(function(e){o.commsError("Marshaller.prototype.url",e)})}).catch(function(e){o.commsError("Marshaller.prototype.url",e)})},N.prototype.proxyMappings=function(e){return arguments.length?(this._proxyMappings=e,this):this._proxyMappings},N.prototype.widgetMappings=function(e){return arguments.length?(this._widgetMappings=e,this):this._widgetMappings},N.prototype.clearDataOnUpdate=function(e){return arguments.length?(this._clearDataOnUpdate=e,this):this._clearDataOnUpdate},N.prototype.propogateClear=function(e){return arguments.length?(this._propogateClear=e,this):this._propogateClear},N.prototype.parse=function(e,t){var n=this;return this._json=e,this._jsonParsed=JSON.parse(this._json),this.dashboards={},this.dashboardArray=[],this._visualizations={},this._visualizationArray=[],this._jsonParsed.forEach(function(e){var t=new T(n,e,n._proxyMappings);n.dashboards[e.id]=t,n.dashboardArray.push(t)}),this.dashboardTotal=this.dashboardArray.length,this.ready(t),this},N.prototype.getVisualizations=function(){return this._visualizations},N.prototype.getVisualizationArray=function(){return this._visualizationArray},N.prototype.on=function(e,t){if(this[e]===undefined)throw"Method:  "+e+" does not exist.";var n=this[e];return this[e]=function(){n.apply(this,arguments),t.apply(this,arguments)},this},N.prototype.allDashboardsLoaded=function(){return this.dashboardArray.filter(function(e){return!e.allVisualizationsLoaded()}).length===0},N.prototype.ready=function(e){function n(e){t.allDashboardsLoaded()?e():setTimeout(n,100,e)}if(!e)return;var t=this;n(e)},N.prototype.commsError=function(e,t){console.log("Comms Error:\n"+e+"\n"+t)},{exists:u,Marshaller:N,Dashboard:T,DataSource:x,Output:S,Visualization:E}});