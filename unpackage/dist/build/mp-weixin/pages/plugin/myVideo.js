(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/plugin/myVideo"],{"7b5a":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},u=[]},"8ff2":function(t,n,e){"use strict";e.r(n);var o=e("7b5a"),a=e("b9fc");for(var u in a)"default"!==u&&function(t){e.d(n,t,(function(){return a[t]}))}(u);var r,c=e("f0c5"),i=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);n["default"]=i.exports},a8e5:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{src:"",danmuList:[{text:"第 1s 出现的弹幕",color:"#ff0000",time:1},{text:"第 3s 出现的弹幕",color:"#ff00ff",time:3}],danmuValue:"",videoUrl:""}},onReady:function(n){this.videoContext=t.createVideoContext("myVideo")},onLoad:function(){},methods:{sendDanmu:function(){this.videoContext.sendDanmu({text:this.danmuValue,color:this.getRandomColor()}),this.danmuValue=""},videoErrorCallback:function(n){t.showModal({content:n.target.errMsg,showCancel:!1})},getRandomColor:function(){for(var t=[],n=0;n<3;++n){var e=Math.floor(256*Math.random()).toString(16);e=1==e.length?"0"+e:e,t.push(e)}return"#"+t.join("")},chooseVideo:function(){var n=this;t.chooseVideo({count:1,sourceType:["camera","album"],success:function(t){n.videoUrl=t.tempFilePath}})}}};n.default=e}).call(this,e("543d")["default"])},b9fc:function(t,n,e){"use strict";e.r(n);var o=e("a8e5"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=a.a},bd32:function(t,n,e){"use strict";(function(t){e("9d04");o(e("66fd"));var n=o(e("8ff2"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["bd32","common/runtime","common/vendor"]]]);