(function(e,t){typeof define=="function"&&define.amd?define(["d3","./XYAxis","../api/I2DChart","css!./Column"],t):e.chart_Column=t(e.d3,e.chart_XYAxis,e.api_I2DChart)})(this,function(e,t,n){function r(e){t.call(this),n.call(this)}return r.prototype=Object.create(t.prototype),r.prototype._class+=" chart_Column",r.prototype.implements(n.prototype),r.prototype.publish("paletteID","default","set","Palette ID",r.prototype._palette.switch()),r.prototype.updateChart=function(e,t,n,r,i){var s=this;this._palette=this._palette.switch(this.paletteID());var o=this.svgData.selectAll(".columnRect").data(this._data),u=o.enter().append("rect").attr("class","columnRect").on("click",function(e){s.click(s.rowToObj(e),s._columns[1])}).append("title");o.transition().attr("class","columnRect").attr("x",function(e){return s.x(e[0])}).attr("width",this.x.rangeBand()).attr("y",function(e){return s.y(e[1])}).attr("height",function(e){return i-s.y(e[1])}).style("fill",function(e){return s._palette(e[0])}),u.text(function(e){return e[0]+" ("+e[1]+")"}),o.exit().transition().remove()},r});