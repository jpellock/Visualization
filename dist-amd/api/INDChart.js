(function(e,t){typeof define=="function"&&define.amd?define(["../common/Palette"],t):e.api_INDChart=t(e.common_Palette)})(this,function(e){function t(){}return t.prototype._palette=e.ordinal("default"),t.prototype.testData=function(){return this.columns(["Subject","Year 1","Year 2","Year 3"]),this.data([["Geography",75,68,65],["English",45,55,52],["Math",98,92,90],["Science",66,60,66]]),this},t.prototype.click=function(e,t){console.log("Click:  "+JSON.stringify(e)+", "+t)},t});