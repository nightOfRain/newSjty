(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/plugin/myCharts"],{"26b5":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("a34a")),r=a(n("a06d"));function a(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,i,r,a,c){try{var u=e[a](c),o=u.value}catch(s){return void n(s)}u.done?t(o):Promise.resolve(o).then(i,r)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var a=e.apply(t,n);function u(e){c(a,i,r,u,o,"next",e)}function o(e){c(a,i,r,u,o,"throw",e)}u(void 0)}))}}var o=function(){n.e("components/u-charts/u-charts").then(function(){return resolve(n("f3fe"))}.bind(null,n)).catch(n.oe)},s={data:function(){return{canvas:!0,cWidth:"",cHeight:"",arr:[]}},components:{uCharts:o},onLoad:function(e){this.init()},onReady:function(){},methods:{init:function(){this.cWidth=e.upx2px(750),this.cHeight=e.upx2px(400),this.getServerData(),this.query()},query:function(){},jump:function(e){},change:function(e,t,n){this.$refs[this.arr[e].id][0].changeData(this.arr[e].id,this.arr[e].opts,t,n)},findFamilyQYByList:function(){var e=this;return u(i.default.mark((function t(){var n,r,a,c;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={loading:!0,url:e.HostURL+e.serviceSRV,data:{p_service:"familySjService",p_method:"findFamilyQYByTotalList",startTime:e.startTime,endTime:e.endTime,regcodes:e.divisionCode[0],pageNo:1,pageSize:10,token:e.token}},t.next=3,e.$api.get(n);case 3:r=t.sent,a=e.$api.ErrTip(r),a&&a.list&&(c={type:"column",categories:[],series:[{name:"户数",data:[]}]},a.list.forEach((function(e){e.name&&e.cnt&&(c.categories.push(e.name),c.series[0].data.push(e.cnt))})),e.$refs[e.arr[2].id][0].changeData(e.arr[2].id,c,"column","group"));case 6:case"end":return t.stop()}}),t)})))()},getServerData:function(){var e=this;return u(i.default.mark((function t(){var n,a,c,u,o,s;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=r.default.getSampleData(),a={enableScroll:!1,unit:"套"},a.categories=n.LineA.categories,a.series=n.LineA.series,c={rotate:!1,enableScroll:!1,unit:"套"},c.categories=n.LineB.categories,c.series=n.LineB.series,u={enableScroll:!1,unit:"套"},u.categories=n.ColumnB.categories,u.series=n.ColumnB.series,o={enableScroll:!1,unit:""},o.categories=n.ColumnMeter.categories,o.series=n.ColumnMeter.series,s=[{group:"商品房预（现）售供应情况分析",title:"兵团商品房预（现）售供应月度情况",btn:[{title:"折线图",type:"line",etype:"straight"},{title:"柱状图",type:"column",etype:"group"},{title:"区域图",type:"area",etype:"curve"}],opts:a,chartType:"line",extraType:"default",id:"c0"},{title:"各师商品房预（现）售供应情况",btn:[{title:"折线图",type:"line",etype:"straight"},{title:"柱状图",type:"column",etype:"group"},{title:"区域图",type:"area",etype:"curve"}],opts:u,chartType:"column",extraType:"group",id:"c1"},{group:"商品房[住宅]预（现）售供应情况分析",title:"兵团商品房预（现）售供应月度情况",opts:o,chartType:"column",extraType:"meter",id:"c2"},{title:"各师商品房预（现）售供应情况",opts:c,chartType:"line",extraType:"curve",id:"c3"},{title:"兵团商品房预（现）售供应月度情况",btn:[{title:"分组图",type:"column",etype:"group"},{title:"堆叠图",type:"column",etype:"stack"},{title:"温度计图",type:"column",etype:"meter"}],opts:u,chartType:"column",extraType:"stack",id:"c4"},{group:"商品房预（现）售供应类别",title:"兵团商品房预（现）售供应月度情况",btn:[{title:"饼状图",type:"pie"},{title:"圆环图",type:"ring"}],opts:n.Pie,chartType:"pie",id:"c5"},{title:"兵团商品房预（现）售供应月度情况",btn:[{title:"饼状图",type:"pie"},{title:"圆环图",type:"ring"}],opts:n.Ring,chartType:"ring",id:"c6"},{title:"兵团商品房预（现）售供应月度情况",opts:n.Gauge,chartType:"gauge",id:"c7"},{title:"兵团商品房预（现）售供应月度情况",btn:[{title:"面积图",type:"rose",etype:"area"},{title:"半径图",type:"rose",etype:"radius"}],opts:n.Pie,chartType:"rose",extraType:"radius",id:"c8"}],e.arr=s;case 15:case"end":return t.stop()}}),t)})))()}}};t.default=s}).call(this,n("543d")["default"])},"2dd3":function(e,t,n){"use strict";n.r(t);var i=n("8ded"),r=n("8af9");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("50bd");var c,u=n("f0c5"),o=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);t["default"]=o.exports},"50bd":function(e,t,n){"use strict";var i=n("b833"),r=n.n(i);r.a},"8af9":function(e,t,n){"use strict";n.r(t);var i=n("26b5"),r=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=r.a},"8ded":function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var r=function(){var e=this,t=e.$createElement;e._self._c},a=[]},aab9:function(e,t,n){"use strict";(function(e){n("9d04");i(n("66fd"));var t=i(n("2dd3"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},b833:function(e,t,n){}},[["aab9","common/runtime","common/vendor"]]]);