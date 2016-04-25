!function(t,e){"function"==typeof define&&define.amd?define(["es6-promise"],e):t.other_Comms=e()}(this,function(){function t(t){if(!t.trim)return t;var e=t.trim();return""===e||isNaN(e)?e:Number(e)}function e(e){for(var r in e)e[r]=t(e[r]);return e}function r(){this._protocol="http:",this._hostname="localhost"}function s(t){this._mappings=t,this._reverseMappings={};for(var e in this._mappings){this._reverseMappings[e]={};for(var r in this._mappings[e])this._reverseMappings[e][this._mappings[e][r]]=r}}function n(){r.call(this),this._proxyMappings={},this._mappings=new s({}),this._timeout=60}function o(t,e){if(!t||!e)return!1;for(var r=t.split("."),s=e,n=0;n<r.length;++n){var o=r[n];if(void 0===s[o])return!1;s=s[o]}return!0}function i(){n.call(this)}function a(){n.call(this),this._port="8002",this._target="",this._query=""}function u(){n.call(this),this._port="8010",this._wuid="",this._jobname="",this._sequence=null,this._resultName=null,this._resultNameCache={},this._resultNameCacheCount=0}function p(){n.call(this),this._port="8010",this._wuid=null}function h(){n.call(this)}function c(){u.call(this),this._hipieResults={}}function l(){c.call(this)}r.prototype.url=function(t){if(!arguments.length)return this._url;this._url=t;var e=document.createElement("a");e.href=this._url,e.href=e.href;var r={};if(e.search.length){var s=e.search;"?"===s[0]&&(s=s.substring(1)),s=s.split("&"),s.map(function(t){var e=t.split("=");r[decodeURIComponent(e[0])]=decodeURIComponent(e[1])})}for(this._protocol=e.protocol,this._hostname=e.hostname,this._port=e.port,this._pathname=e.pathname;this._pathname.length&&"/"===this._pathname[0];)this._pathname=this._pathname.substring(1);return this._search=e.search,this._params=r,this._hash=e.hash,this._host=e.host,this},r.prototype.protocol=function(t){return arguments.length?(this._protocol=t,this):this._protocol},r.prototype.hostname=function(t){return arguments.length?(this._hostname=t,this):this._hostname},r.prototype.port=function(t){return arguments.length?(this._port=t,this):this._port},r.prototype.pathname=function(t){return arguments.length?(this._pathname=t,this):this._pathname},r.prototype.isWsWorkunits=function(){return this._pathname.toLowerCase().indexOf("wsworkunits")>=0||this._params.Wuid},r.prototype.isWorkunitResult=function(){return this.isWsWorkunits()&&(this._params.Sequence||this._params.ResultName)},r.prototype.isWsEcl=function(){return this._pathname.toLowerCase().indexOf("wsecl")>=0||this._params.QuerySetId&&this._params.Id},r.prototype.isWsWorkunits_GetStats=function(){return this._pathname.toLowerCase().indexOf("wsworkunits/wugetstats")>=0&&this._params.WUID},r.prototype.getUrl=function(t){return t=t||{},(t.protocol?t.protocol:this._protocol)+"//"+(t.hostname?t.hostname:this._hostname)+":"+(t.port?t.port:this._port)+"/"+(t.pathname?t.pathname:this._pathname)},s.prototype.contains=function(t,e){return o(t+"."+e,this._mappings)},s.prototype.mapResult=function(t,e){var r=this._mappings[e];r&&(t[e]=t[e].map(function(t){var e=[];if(r.x&&r.x instanceof Array){e=[];for(var s=0;s<r.x.length;++s)e.push(t[r.y[s]])}else for(var n in r)"label"===r[n]?e[0]=t[n]:"weight"===r[n]&&(e[1]=t[n]);return e},this))},s.prototype.mapResponse=function(t){for(var e in t)this.mapResult(t,e)},n.prototype=Object.create(r.prototype);var m=function(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(encodeURIComponent(r)+"="+encodeURIComponent(t[r]));return e.join("&")};return n.prototype.jsonp=function(t,e,s){var n=this;return new Promise(function(o,i){function a(t){delete window[_],document.body.removeChild(g),s&&(console.log("Deprecated:  callback, use promise (Comms.prototype.jsonp)"),s(t))}for(var u in n._proxyMappings){var p=t.split(u),h=p[0];if(p.length>1){var c=(new r).url(t);t=h+n._proxyMappings[u],e.IP=c._hostname,e.PORT=c._port,p.length>0&&(e.PATH=p[1]);break}}var l=1e3*n.timeout(),f=5e3,_="jsonp_callback_"+Math.round(999999*Math.random());window[_]=function(t){l=0,a(t),o(t)};var g=document.createElement("script");g.src=t+(t.indexOf("?")>=0?"&":"?")+"jsonp="+_+"&"+m(e),document.body.appendChild(g);var y=setInterval(function(){0>=l?clearInterval(y):(l-=f,0>=l?(clearInterval(y),console.log("Request timeout:  "+g.src),a(),i(Error("Request timeout:  "+g.src))):console.log("Request pending ("+l/1e3+" sec):  "+g.src))},f)})},n.prototype.ajax=function(t,e,r){return new Promise(function(s,n){var o=e;r&&(o+="?"+m(r));var i=new XMLHttpRequest;i.onload=function(t){this.status>=200&&this.status<300?s(JSON.parse(this.response)):n(Error(this.statusText))},i.onerror=function(){n(Error(this.statusText))},i.open(t,o),i.setRequestHeader("X-Requested-With","XMLHttpRequest"),i.send()})},n.prototype.get=function(t,e){return this.ajax("GET",t,e)},n.prototype.post=function(t,e){return this.ajax("POST",t,e)},n.prototype.mappings=function(t){return arguments.length?(this._mappings=new s(t),this):this._mappings},n.prototype.proxyMappings=function(t){return arguments.length?(this._proxyMappings=t,this):this._proxyMappings},n.prototype.timeout=function(t){return arguments.length?(this._timeout=t,this):this._timeout},i.prototype=Object.create(n.prototype),i.prototype.cacheCalls=function(t){return arguments.length?(this._cacheCalls=t,this):this._cacheCalls},i.prototype.call=function(t,e){var r=this._url+(this._url.indexOf("?")>=0?"&":"?")+m(t);if(this._cacheCalls){var s=this;return new Promise(function(t,s){var n=JSON.parse(localStorage.getItem("hpcc.viz."+r));if(!n)throw Error("not cached");e&&(console.log("Deprecated:  callback, use promise (Basic.prototype.call)"),e(n)),t(n)})["catch"](function(t){return s.get(r).then(function(t){return localStorage.setItem("hpcc.viz."+r,JSON.stringify(t)),e&&(console.log("Deprecated:  callback, use promise (Basic.prototype.call)"),e(t)),t})})}return localStorage.removeItem("hpcc.viz."+r),this.get(r).then(function(t){return e&&(console.log("Deprecated:  callback, use promise (Basic.prototype.call)"),e(t)),t})},a.prototype=Object.create(n.prototype),a.prototype.url=function(t){var e=n.prototype.url.apply(this,arguments);if(arguments.length){this._port="8010"===this._port?"8002":this._port;for(var r in this._params)switch(r){case"QuerySetId":this.target(this._params[r]);break;case"Id":this.query(this._params[r])}var s,o;this._target||this._query||(s=this._pathname.split("/res/"),s.length>=2&&(o=s[1].split("/"),o.length>=3&&(this.target(o[1]),this.query(o[2])))),this._target||this._query||(s=this._pathname.split("/forms/default/"),s.length>=2&&(o=s[1].split("/"),o.length>=3&&(this.target(o[1]),this.query(o[2]))))}return e},a.prototype.target=function(t){return arguments.length?(this._target=t,this):this._target},a.prototype.query=function(t){return arguments.length?(this._query=t,this):this._query},a.prototype.constructUrl=function(){return n.prototype.getUrl.call(this,{pathname:"WsEcl/submit/query/"+this._target+"/"+this._query+"/json"})},a.prototype.call=function(t,r,s){t=t||{},t.target=t.target||this._target,t.query=t.query||this._query;var n=this,o=this.getUrl({pathname:"WsEcl/submit/query/"+t.target+"/"+t.query+"/json"});return this.jsonp(o,r).then(function(t){for(var r in t){t=t[r].Results;break}if(t.Exception)throw Error(t.Exception.reduce(function(t,e,r,s){return t.length&&(t+="\n"),t+e.Source+" "+e.Code+":  "+e.Message},""));for(r in t)t[r].Row&&(t[r]=t[r].Row.map(e));return n._mappings.mapResponse(t),s&&(console.log("Deprecated:  callback, use promise (WsECL.prototype.call)"),s(t)),t})},a.prototype.send=function(t,e){this.call({target:this._target,query:this._query},t,e)},u.prototype=Object.create(n.prototype),u.prototype.url=function(t){var e=n.prototype.url.apply(this,arguments);if(arguments.length){for(var r in this._params)switch(r){case"Wuid":this.wuid(this._params[r]);break;case"ResultName":this.resultName(this._params[r]);break;case"Sequence":this.sequence(this._params[r])}if(!this._wuid){var s=this._url.split("/res/");if(s.length>=2){var o=s[1].split("/");this.wuid(o[0])}}}return e},u.prototype.wuid=function(t){return arguments.length?(this._wuid=t,this):this._wuid},u.prototype.jobname=function(t){return arguments.length?(this._jobname=t,this):this._jobname},u.prototype.sequence=function(t){return arguments.length?(this._sequence=t,this):this._sequence},u.prototype.resultName=function(t){return arguments.length?(this._resultName=t,this):this._resultName},u.prototype.appendParam=function(t,e,r){return e?(r&&(r+="&"),r+t+"="+e):r},u.prototype.constructUrl=function(){var t=n.prototype.getUrl.call(this,{pathname:"WsWorkunits/res/"+this._wuid+"/"}),e="";return e=this.appendParam("ResultName",this._resultName,e),t+(e?"?"+e:"")},u.prototype._fetchResult=function(t,r,s){t=t||{},t._start=t._start||0,t._count=t._count||-1;var n=this.getUrl({pathname:"WsWorkunits/WUResult.json"}),o={Wuid:t.wuid,ResultName:t.resultname,SuppressXmlSchema:!0,Start:t._start,Count:t._count};this._resultNameCache[t.resultname]={};var i=this;return this.jsonp(n,o).then(function(n){for(var o in n){if(!n[o].Result)throw"No result found.";i._total=n[o].Total,n=n[o].Result;for(var a in n){n=n[a].Row.map(e);break}break}return i._resultNameCache[t.resultname]=n,s||i._mappings.mapResult(i._resultNameCache,t.resultname),r&&(console.log("Deprecated:  callback, use promise (WsWorkunits.prototype._fetchResult)"),r(i._resultNameCache[t.resultname])),i._resultNameCache[t.resultname]})},u.prototype.fetchResult=function(t,e,r){if(t.wuid)return this._fetchResult(t,e,r);if(t.jobname){var s=this;return this.WUQuery(t,function(n){return t.wuid=n[0].Wuid,s._fetchResult(t,e,r)})}},u.prototype.WUQuery=function(t,e){var r=this.getUrl({pathname:"WsWorkunits/WUQuery.json"}),s={Jobname:s.jobname,Count:1};return this._resultNameCache={},this._resultNameCacheCount=0,this.jsonp(r,s).then(function(t){if(!o("WUQueryResponse.Workunits.ECLWorkunit",t))throw"No workunit found.";return t=t.WUQueryResponse.Workunits.ECLWorkunit,e&&(console.log("Deprecated:  callback, use promise (WsWorkunits.prototype.WUQuery)"),e(t)),t})},u.prototype.fetchResultNames=function(t){var e=this.getUrl({pathname:"WsWorkunits/WUInfo.json"}),r={Wuid:this._wuid,TruncateEclTo64k:!0,IncludeExceptions:!1,IncludeGraphs:!1,IncludeSourceFiles:!1,IncludeResults:!0,IncludeResultsViewNames:!1,IncludeVariables:!1,IncludeTimers:!1,IncludeResourceURLs:!1,IncludeDebugValues:!1,IncludeApplicationValues:!1,IncludeWorkflows:!1,IncludeXmlSchemas:!1,SuppressResultSchemas:!0};this._resultNameCache={},this._resultNameCacheCount=0;var s=this;return this.jsonp(e,r).then(function(e){return o("WUInfoResponse.Workunit.Results.ECLResult",e)&&e.WUInfoResponse.Workunit.Results.ECLResult.map(function(t){s._resultNameCache[t.Name]=[],++s._resultNameCacheCount}),t&&(console.log("Deprecated:  callback, use promise (WsWorkunits.prototype.fetchResultNames)"),t(s._resultNameCache)),s._resultNameCache})},u.prototype.fetchResults=function(t,e){var r=this;return this.fetchResultNames().then(function(s){var n=[];for(var o in r._resultNameCache)n.push(r.fetchResult({wuid:r._wuid,resultname:o},null,e));return Promise.all(n).then(function(e){return t&&(console.log("Deprecated:  callback, use promise (WsWorkunits.prototype.fetchResults)"),t(r._resultNameCache)),r._resultNameCache})})},u.prototype.postFilter=function(t,e){var r={};for(var s in e)r[s]=e[s].filter(function(e,r){for(var s in t)if(void 0!==e[s]&&void 0!==t[s]&&e[s]!=t[s])return!1;return!0});return this._mappings.mapResponse(r),r},u.prototype.send=function(t,e){var r=this;this._resultNameCacheCount?e(r.postFilter(t,this._resultNameCache)):this.fetchResults(function(s){e(r.postFilter(t,s))},!0)},p.prototype=Object.create(n.prototype),p.prototype.url=function(t){var e=n.prototype.url.apply(this,arguments);if(arguments.length)for(var r in this._params)switch(r){case"WUID":this.wuid(this._params[r])}return e},p.prototype.wuid=function(t){return arguments.length?(this._wuid=t,this):this._wuid},p.prototype.constructUrl=function(){return n.prototype.getUrl.call(this,{pathname:"WsWorkunits/WUGetStats?WUID="+this._wuid})},p.prototype.send=function(t,e){var r=this.getUrl({pathname:"WsWorkunits/WUGetStats.json?WUID="+this._wuid});return this.jsonp(r,t).then(function(t){return o("WUGetStatsResponse.Statistics.WUStatisticItem",t)?(e&&(console.log("Deprecated:  callback, use promise (WsWorkunits_GetStats.prototype.send)"),e(t.WUGetStatsResponse.Statistics.WUStatisticItem)),t.WUGetStatsResponse.Statistics.WUStatisticItem):(e&&(console.log("Deprecated:  callback, use promise (WsWorkunits_GetStats.prototype.send)"),e([])),[])})},h.prototype=Object.create(n.prototype),h.prototype.fetchResults=function(t,r){var s=this.getUrl({});this._resultNameCache={},this._resultNameCacheCount=0;var n=this;return this.jsonp(s,t).then(function(t){for(var s in t){t=t[s].Results;break}if(t.Exception)throw Error(t.Exception.reduce(function(t,e,r,s){return t.length&&(t+="\n"),t+e.Source+" "+e.Code+":  "+e.Message},""));for(s in t)t[s].Row&&(n._resultNameCache[s]=t[s].Row.map(e),++n._resultNameCacheCount);return r&&(console.log("Deprecated:  callback, use promise (HIPIERoxie.prototype.fetchResults)"),r(n._resultNameCache)),n._resultNameCache})},h.prototype.fetchResult=function(t,e){var r=this;return new Promise(function(s,n){e&&(console.log("Deprecated:  callback, use promise (HIPIERoxie.prototype.fetchResult)"),e(r._resultNameCache[t])),s(r._resultNameCache[t])})},h.prototype.call=function(t,e){return this.fetchResults(t,e)},c.prototype=Object.create(u.prototype),c.prototype.hipieResults=function(t){if(!arguments.length)return this._hipieResults;this._hipieResultsLength=0,this._hipieResults={};var e=this;return t.forEach(function(t){e._hipieResultsLength++,e._hipieResults[t.id]=t}),this},c.prototype.fetchResults=function(t){var e=this;return u.prototype.fetchResultNames.call(this).then(function(r){var s=[];for(var n in e._hipieResults){var o=e._hipieResults[n];s.push(e.fetchResult(o.from))}return Promise.all(s).then(function(r){return t&&(console.log("Deprecated:  callback, use promise (HIPIEWorkunit.prototype.fetchResults)"),t(e._resultNameCache)),e._resultNameCache})})},c.prototype.fetchResult=function(t,e){return u.prototype.fetchResult.call(this,{wuid:this._wuid,resultname:t}).then(function(t){return e&&(console.log("Deprecated:  callback, use promise (HIPIEWorkunit.prototype.fetchResult)"),e(t)),t})},c.prototype.call=function(t,e){if(!t.refresh&&this._resultNameCache&&this._resultNameCacheCount){var r=this;return new Promise(function(s,n){var o={};for(var i in t)void 0!==t[i]&&void 0!==t[i+"_changed"]&&(o[i]=t[i]);var a={};for(var u in r._hipieResults){var p=r._hipieResults[u],h=!0;for(var c in o)if(p.filter.indexOf(c)<0){h=!1;break}h&&(a[p.from]=r._resultNameCache[p.from].filter(function(t){for(var e in o)if(t[e]!=o[e]&&t[e.toLowerCase()]!=o[e])return!1;return!0}))}e&&(console.log("Deprecated:  callback, use promise (HIPIEWorkunit.prototype.call)"),e(a)),s(a)})}return this.fetchResults(e)},l.prototype=Object.create(c.prototype),l.prototype.databomb=function(t){return arguments.length?(this._databomb=t,this):this._databomb},l.prototype.databombOutput=function(t,r){return arguments.length?(this._resultNameCacheCount++,this._databomb instanceof Array?this._resultNameCache[t]=this._databomb.map(e):this._resultNameCache[t]=this._databomb[r].map(e),this):void 0},l.prototype.fetchResults=function(t){var e=this;return new Promise(function(r,s){t&&(console.log("Deprecated:  callback, use promise (HIPIEDatabomb.prototype.fetchResults)"),t(e._resultNameCache)),r(e._resultNameCache)})},{Basic:i,ESPMappings:s,ESPUrl:r,WsECL:a,WsWorkunits:u,HIPIERoxie:h,HIPIEWorkunit:c,HIPIEDatabomb:l,createESPConnection:function(t){t=t||document.URL;var e=(new r).url(t);return e.isWsWorkunits_GetStats()?(new p).url(t):e.isWsWorkunits()?(new u).url(t):e.isWsEcl()?(new a).url(t):null}}});