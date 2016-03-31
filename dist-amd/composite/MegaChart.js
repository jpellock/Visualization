(function(e,t){typeof define=="function"&&define.amd?define(["../layout/Border","../chart/MultiChart","../common/Text","../other/Legend","../layout/Toolbar","../form/Select","../form/Button","../common/Utility"],t):e.composite_MegaChart=t(e.layout_Border,e.chart_MultiChart,e.common_Text,e.other_Legend,e.layout_Toolbar,e.form_Select,e.form_Button,e.common_Utility)})(this,function(e,t,n,r,i,s,o,u){function a(){e.call(this),this._tag="div",this._chart=new t;var r=this;this._chart.click=function(){r.click.apply(this,arguments)},this._toolbar=new i,this._valueTitle=new n,this._domainTitle=new n}return a.prototype=Object.create(e.prototype),a.prototype.constructor=a,a.prototype._class+=" composite_MegaChart",a.prototype._1DChartTypes=t.prototype._1DChartTypes,a.prototype._2DChartTypes=t.prototype._2DChartTypes,a.prototype._NDChartTypes=t.prototype._NDChartTypes,a.prototype._anyChartTypes=t.prototype._anyChartTypes,a.prototype._allChartTypes=t.prototype._allChartTypes,a.prototype.publishReset(),a.prototype.publishProxy("valueAxisTitle","_valueTitle","text"),a.prototype.publishProxy("domainAxisTitle","_domainTitle","text"),a.prototype.publish("legendPosition","right","set","Position of the Legend widget",["none","top","right","bottom","left"],{tags:["Basic"]}),a.prototype.publish("showToolbar",!0,"boolean","Enable/Disable Toolbar widget",null,{tags:["Basic"]}),a.prototype.publish("showChartSelect",!0,"boolean","Show/Hide the chartType dropdown in the toolbar",null,{tags:["Basic"]}),a.prototype.publish("showCSV",!0,"boolean","Show/Hide CSV button",null,{tags:["Basic"]}),a.prototype.publishProxy("title","_toolbar","title"),a.prototype.publish("titleFontSize",null,"number","Title Font Size (px)",null,{tags:["Advanced"],optional:!0}),a.prototype.publish("titleFontColor",null,"html-color","Title Font Color",null,{tags:["Advanced"],optional:!0}),a.prototype.publish("titleFontFamily",null,"string","Title Font Family",null,{tags:["Advanced"],optional:!0}),a.prototype.publish("titleFontBold",!0,"boolean","Enable Bold Title Font",null,{tags:["Advanced"],optional:!0}),a.prototype.publish("titleBackgroundColor",null,"html-color","Background Color",null,{tags:["Intermediate"],optional:!0}),a.prototype.publishProxy("chartType","_chart","chartType"),a.prototype.publishProxy("chart","_chart","chart"),a.prototype.toolbarWidgets=function(e){return arguments.length?(this._toolbar.widgets(e),this):this._toolbar.widgets()},a.prototype.chartTypeDefaults=function(e){return arguments.length?(this._chart.chartTypeDefaults(e),this):this._chart.chartTypeDefaults()},a.prototype.fields=function(e){return arguments.length?(this._chart.fields(e),this):this._chart.fields()},a.prototype.columns=function(e){return arguments.length?(this._chart.columns(e),this):this._chart.columns()},a.prototype.data=function(e){return arguments.length?(this._chart.data(e),this):this._chart.data()},a.prototype.enter=function(t,n){e.prototype.enter.apply(this,arguments);var i=this;this.topShrinkWrap(!1).topPercentage(0).topSize(30),this._csvButton=(new o).id(this.id()+"_csv").value("CSV"),this._csvButton.click=function(e){u.downloadBlob("CSV",i._chart.export("CSV"))},this._chartTypeSelect=(new s).id(this.id()+"_chartType").selectOptions(this._allChartTypes.map(function(e){return[e.id,e.display]})).value(this.chartType()),this._chartTypeSelect.change=function(e){i.chartType(e.value()).render()},this.setContent("center",this._chart),this._legend=(new r).fixedSize(!0).targetWidget(this._chart),this._legend.orientation(["top","bottom"].indexOf(this.legendPosition())!==-1?"horizontal":"vertical"),this._prevLegendPosition=this.legendPosition(),this.valueAxisTitle()&&this.setContent("left",this._valueTitle.rotation(-90)).leftShrinkWrap(!0),this.domainAxisTitle()&&this.setContent("bottom",this._domainTitle).bottomShrinkWrap(!0),this.legendPosition()!=="none"&&this.setContent(this.legendPosition(),this._legend)[this.legendPosition()+"ShrinkWrap"](!0)},a.prototype.update=function(t,n){function i(e,t,n){if(n&&e.indexOf(t)===-1)e.push(t);else{var r=e.indexOf(t);!n&&r>=0&&e.slice(r,1)}}var s=this.toolbarWidgets();i(s,this._csvButton,this.showCSV()),i(s,this._chartTypeSelect,this.showChartSelect()),this.toolbarWidgets(s),this._prevShowToolbar!==this.showToolbar()&&(this.setContent("top",this.showToolbar()?this._toolbar:null),this._prevShowToolbar=this.showToolbar()),this._toolbar.fontSize(this.titleFontSize()).fontColor(this.titleFontColor()).fontFamily(this.titleFontFamily()).fontBold(this.titleFontBold()).backgroundColor(this.titleBackgroundColor()),this._chart.data(this.data()),this._chart.chartType()!==this.chartType()&&this._chart.chartType(this.chartType()),this._prevLegendPosition!==this.legendPosition()&&(this._prevLegendPosition!=="none"&&this.clearContent(this._prevLegendPosition),this._prevLegendPosition=this.legendPosition(),this.legendPosition()!=="none"&&(this._legend=(new r).fixedSize(!0).targetWidget(this.getContent("center")),this.setContent(this.legendPosition(),this._legend),this._legend.orientation(["top","bottom"].indexOf(this.legendPosition())!==-1?"horizontal":"vertical"))),this._contentClasses=this.getContentClasses(),this.valueAxisTitle()&&this._contentClasses.left!=="common_Text"&&this.legendPosition()!=="left"&&this.setContent("left",this._valueTitle.rotation(-90)),this.domainAxisTitle()&&this._contentClasses.bottom!=="common_Text"&&this.legendPosition()!=="bottom"&&this.setContent("bottom",this._domainTitle).bottomShrinkWrap(!0),this._legend.dataFamily(this._chart.getChartDataFamily()),e.prototype.update.apply(this,arguments)},a.prototype.exit=function(t,n){e.prototype.exit.apply(this,arguments)},a.prototype.getContentClasses=function(){var e={},t=this.getContent("top"),n=this.getContent("right"),r=this.getContent("bottom"),i=this.getContent("left");return e.top=t!==null?t.classID():undefined,e.right=n!==null?n.classID():undefined,e.bottom=r!==null?r.classID():undefined,e.left=i!==null?i.classID():undefined,e},a.prototype.click=function(e,t,n){console.log("Click:  "+JSON.stringify(e)+", "+t+", "+n)},a});