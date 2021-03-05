(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/news/home"],{"141c":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={data:function(){return{isCard:!1,loopResult:[]}},mounted:function(){var t=this,n={producttype:1};this.commRequest("6019",n,(function(n){console.log("res: "+JSON.stringify(n)),t.loopResult=n.responseData.loopResult}))},methods:{IsCard:function(t){this.isCard=t.detail.value},getImageurl:function(t){return"http://www.sjyjr.net/static/productinfoImage/"+t}}};n.default=u},6530:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return u}));var r=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.loopResult,(function(n,e){var u=t.__get_orig(n),r=t.getImageurl(n.picon);return{$orig:u,m0:r}})));t.$mp.data=Object.assign({},{$root:{l0:e}})},o=[]},"9f22":function(t,n,e){"use strict";e.r(n);var u=e("141c"),r=e.n(u);for(var o in u)"default"!==o&&function(t){e.d(n,t,(function(){return u[t]}))}(o);n["default"]=r.a},b43f:function(t,n,e){"use strict";e.r(n);var u=e("6530"),r=e("9f22");for(var o in r)"default"!==o&&function(t){e.d(n,t,(function(){return r[t]}))}(o);var a,i=e("f0c5"),c=Object(i["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);n["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/news/home-create-component',
    {
        'pages/news/home-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b43f"))
        })
    },
    [['pages/news/home-create-component']]
]);
